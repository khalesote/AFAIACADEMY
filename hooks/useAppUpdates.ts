import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  downloadLatestUpdate,
  fetchUpdateMetadata,
  UpdateMetadata,
  UpdateServiceError,
} from '../services/updateService';

const LAST_UPDATE_KEY = 'app:last_update_version';
const HIDE_DELAY_MS = 4000;

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

export function useAppUpdates(options: UseAppUpdatesOptions = {}) {
  const { auto = true } = options;
  const [state, setState] = useState<UseAppUpdatesState>({ status: 'idle' });
  const checkingRef = useRef(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setState((prev) => (prev.status === 'downloaded' ? { status: 'idle' } : prev));
      hideTimerRef.current = null;
    }, HIDE_DELAY_MS);
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
        ? `update-${metadata.version}.bin`
        : `update-${Date.now()}.bin`;

      const result = await downloadLatestUpdate(filename);
      await AsyncStorage.setItem(LAST_UPDATE_KEY, versionKey);

      setState({
        status: 'downloaded',
        version: metadata.version ?? versionKey,
        localUri: result.localUri,
      });
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

  return {
    state,
    checkForUpdates,
  };
}
