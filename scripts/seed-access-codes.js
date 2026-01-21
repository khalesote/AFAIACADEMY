#!/usr/bin/env node

const { initializeApp, getApps, getApp } = require('firebase/app');
const { getFirestore, doc, writeBatch, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const TOTAL_PER_LEVEL = 1000;
const COLLECTION = 'access_codes_valid';

function buildCodes() {
  const codes = [];
  LEVELS.forEach((level) => {
    for (let i = 1; i <= TOTAL_PER_LEVEL; i += 1) {
      const codeNumber = String(i).padStart(4, '0');
      codes.push({ code: `${level}-${codeNumber}`, level });
    }
  });
  return codes;
}

async function main() {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) {
    console.error('Faltan variables Firebase:', missing.join(', '));
    process.exit(1);
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(app);
  const codes = buildCodes();

  const batchSize = 400;
  let batch = writeBatch(firestore);
  let opCount = 0;

  for (const codeInfo of codes) {
    const ref = doc(firestore, COLLECTION, codeInfo.code);
    batch.set(ref, {
      code: codeInfo.code,
      level: codeInfo.level,
      active: true,
      createdAt: serverTimestamp()
    }, { merge: true });
    opCount += 1;

    if (opCount >= batchSize) {
      await batch.commit();
      batch = writeBatch(firestore);
      opCount = 0;
    }
  }

  if (opCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Códigos creados en ${COLLECTION}: ${codes.length}`);
}

main().catch((error) => {
  console.error('Error creando códigos:', error);
  process.exit(1);
});