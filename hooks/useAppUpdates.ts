import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import * as Application from 'expo-application';
import { openSettings } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  downloadLatestUpdate,
  fetchUpdateMetadata,
  UpdateMetadata,
  UpdateServiceError,
} from '../services/updateService';

const LAST_UPDATE_KEY = 'app:last_update_version';
const HIDE_DELAY_MS = 4000;
const UNKNOWN_SOURCES_INTENT = 'android.settings.MANAGE_UNKNOWN_APP_SOURCES';

type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'up_to_date'
  | 'downloading'
  | 'downloaded'
  | 'error';

export interface UseAppUpdatesState {
  status: UpdateStatus;
  version?: string;
  localUri?: string;
  error?: string;
}

export interface UseAppUpdatesOptions {
  auto?: boolean;
}

function getMetadataVersionKey(metadata: UpdateMetadata): string {
  if (metadata.version) return metadata.version;
  if (metadata.updatedAt) return metadata.updatedAt.toISOString();
  return metadata.downloadUrl;
}

function parseAndroidVersion(): number {
  const version = Platform.Version;
  if (typeof version === 'number') {
    return version;
  }
  const parsed = parseInt(`${version}`, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

async function openUnknownSourcesSettings() {
  const packageName = Application.applicationId;
  try {
    const params = packageName ? { data: `package:${packageName}` } : undefined;
    await IntentLauncher.startActivityAsync(UNKNOWN_SOURCES_INTENT, params);
  } catch (settingsError) {
    console.warn('No se pudo abrir la pantalla de orígenes desconocidos', settingsError);
    try {
      await openSettings();
    } catch (openSettingsError) {
      console.warn('No se pudo abrir la configuración del sistema', openSettingsError);
    }
  }
}

function alertInstallPermissionRequired() {
  Alert.alert(
    'Permiso requerido',
    'Android necesita que autorices a Academia de Inmigrantes como fuente desconocida para instalar actualizaciones.',
    [
      {
        text: 'Abrir ajustes',
        onPress: () => {
          openUnknownSourcesSettings();
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]
  );
}

function isUnknownSourcesError(error: unknown): boolean {
  if (!error) return false;
  const message = typeof error === 'string' ? error : (error as Error)?.message;
  if (!message) return false;
  return (
    message.includes('REQUEST_INSTALL_PACKAGES') ||
    message.includes('Permission Denial') ||
    message.includes('MANAGE_UNKNOWN_APP_SOURCES')
  );
}

function getInstallerIntentAction(): string {
  return parseAndroidVersion() >= 26
    ? 'android.intent.action.INSTALL_PACKAGE'
    : 'android.intent.action.VIEW';
}

export function useAppUpdates(options: UseAppUpdatesOptions = {}) {
  const { auto = true } = options;
  const [state, setState] = useState<UseAppUpdatesState>({ status: 'idle' });
  const checkingRef = useRef(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastDownloadUriRef = useRef<string | null>(null);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setState((prev) => (prev.status === 'downloaded' ? { status: 'idle' } : prev));
      hideTimerRef.current = null;
    }, HIDE_DELAY_MS);
  }, []);

  const launchInstaller = useCallback(async (localUri: string) => {
    try {
      const contentUri = await FileSystem.getContentUriAsync(localUri);
      await IntentLauncher.startActivityAsync(getInstallerIntentAction(), {
        data: contentUri,
        flags: 1 | 0x10000000, // FLAG_GRANT_READ_URI_PERMISSION | FLAG_ACTIVITY_NEW_TASK
        type: 'application/vnd.android.package-archive',
      });
      return true;
    } catch (installError) {
      console.error('Error lanzando instalador:', installError);
      if (isUnknownSourcesError(installError)) {
        alertInstallPermissionRequired();
      } else {
        Alert.alert(
          'Instalación requerida',
          'Descargamos la actualización pero Android bloqueó la instalación automática. Abre el APK desde tus descargas o inténtalo nuevamente tras autorizar “Fuentes desconocidas”.'
        );
      }
      return false;
    }
  }, []);

  const checkForUpdates = useCallback(async () => {
    if (checkingRef.current) return;
    checkingRef.current = true;
    setState({ status: 'checking' });

    try {
      const metadata = await fetchUpdateMetadata();
      const versionKey = getMetadataVersionKey(metadata);
      setState((prev) => ({ ...prev, version: metadata.version ?? versionKey }));

      const lastVersion = await AsyncStorage.getItem(LAST_UPDATE_KEY);
      if (lastVersion === versionKey) {
        setState({ status: 'up_to_date', version: metadata.version ?? versionKey });
        return;
      }

      setState({ status: 'downloading', version: metadata.version ?? versionKey });
      const filename = metadata.version
        ? `update-${metadata.version}.apk`
        : `update-${Date.now()}.apk`;

      const result = await downloadLatestUpdate(filename);
      await AsyncStorage.setItem(LAST_UPDATE_KEY, versionKey);
      lastDownloadUriRef.current = result.localUri;

      setState({
        status: 'downloaded',
        version: metadata.version ?? versionKey,
        localUri: result.localUri,
      });

      if (Platform.OS === 'android' && result.localUri) {
        await launchInstaller(result.localUri);
      }

      scheduleHide();
    } catch (error: any) {
      console.error('Error comprobando actualizaciones:', error);
      const message =
        error instanceof UpdateServiceError ? error.message : 'No se pudo descargar la actualización.';
      setState({ status: 'error', error: message });
    } finally {
      checkingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (auto) {
      checkForUpdates();
    }
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [auto, checkForUpdates]);

  const installDownloadedUpdate = useCallback(async () => {
    const targetUri = state.localUri || lastDownloadUriRef.current;
    if (!targetUri) {
      Alert.alert(
        'Sin descargas',
        'Aún no hemos descargado ninguna actualización o el archivo fue eliminado.'
      );
      return false;
    }

    if (Platform.OS !== 'android') {
      Alert.alert('Solo Android', 'La instalación automática solo está disponible en Android.');
      return false;
    }

    return launchInstaller(targetUri);
  }, [launchInstaller, state.localUri]);

  return {
    state,
    checkForUpdates,
    installDownloadedUpdate,
  };
}
