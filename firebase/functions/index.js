const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const vision = require('@google-cloud/vision');

initializeApp();

const db = getFirestore();
const visionServiceAccountJson = defineSecret('VISION_SERVICE_ACCOUNT_JSON');

const getVisionClient = () => {
  const raw = visionServiceAccountJson.value();
  if (!raw) {
    return new vision.ImageAnnotatorClient();
  }
  const parsed = JSON.parse(raw);
  return new vision.ImageAnnotatorClient({
    credentials: {
      client_email: parsed.client_email,
      private_key: parsed.private_key,
    },
    projectId: parsed.project_id,
  });
};

const normalizeText = (text = '') => text
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9ñáéíóúü\s]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

exports.ocrAprendeEscribir = onCall(
  {
    region: 'europe-west1',
    timeoutSeconds: 60,
    memory: '1GiB',
    secrets: [visionServiceAccountJson],
  },
  async (request) => {
    const data = request.data || {};
    const storagePath = data.storagePath;
    const expectedText = data.expectedText || '';
    const exerciseId = data.exerciseId || null;
    const userId = data.userId || request.auth?.uid || null;

    if (!storagePath) {
      throw new HttpsError('invalid-argument', 'storagePath requerido');
    }

    try {
      const bucket = getStorage().bucket();
      const file = bucket.file(storagePath);
      const [exists] = await file.exists();
      if (!exists) {
        throw new HttpsError('not-found', 'Imagen no encontrada');
      }

      const [bytes] = await file.download();
      const visionClient = getVisionClient();
      const [result] = await visionClient.textDetection(bytes);
      const detectedText = result?.fullTextAnnotation?.text || '';
      const normalizedDetected = normalizeText(detectedText);
      const normalizedExpected = normalizeText(expectedText);
      const matched = normalizedExpected
        ? normalizedDetected.includes(normalizedExpected)
        : false;

      await db.collection('aprende_escribir_submissions').add({
        storagePath,
        expectedText: expectedText || null,
        detectedText,
        matched,
        exerciseId,
        userId,
        createdAt: FieldValue.serverTimestamp(),
      });

      return {
        detectedText,
        matched,
      };
    } catch (error) {
      console.error('OCR error:', error);
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError('internal', 'No se pudo procesar la imagen');
    }
  }
);
