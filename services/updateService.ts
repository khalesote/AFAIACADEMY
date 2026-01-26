import { doc, getDoc } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';

import { firestore } from '../config/firebase';

const UPDATE_COLLECTION = 'appConfig';
const UPDATE_DOCUMENT = 'updates';

export interface UpdateMetadata {
  downloadUrl: string;
  version?: string;
  updatedAt?: Date;
}

export interface DownloadResult {
  localUri: string;
  metadata: UpdateMetadata;
}

export class UpdateServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateServiceError';
  }
}

export async function fetchUpdateMetadata(): Promise<UpdateMetadata> {
  if (!firestore) {
    throw new UpdateServiceError('Firestore no está inicializado.');
  }

  const docRef = doc(firestore, UPDATE_COLLECTION, UPDATE_DOCUMENT);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new UpdateServiceError('No se encontró el documento de actualizaciones.');
  }

  const data = snapshot.data();
  const downloadUrl: string | undefined = data.downloadUrl;

  if (!downloadUrl) {
    throw new UpdateServiceError('El campo downloadUrl no está definido.');
  }

  return {
    downloadUrl,
    version: data.version,
    updatedAt: data.updatedAt?.toDate?.() ?? undefined,
  };
}

export async function downloadLatestUpdate(
  filename = 'app-update.bin',
): Promise<DownloadResult> {
  const metadata = await fetchUpdateMetadata();
  const localUri = FileSystem.documentDirectory
    ? `${FileSystem.documentDirectory}${filename}`
    : `${FileSystem.cacheDirectory || ''}${filename}`;

  if (!localUri) {
    throw new UpdateServiceError('No se pudo determinar un directorio local para guardar la descarga.');
  }

  const downloadResult = await FileSystem.downloadAsync(metadata.downloadUrl, localUri);

  return {
    localUri: downloadResult.uri,
    metadata,
  };
}
