import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  // Replace these with your actual Firebase config values
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyAvyKrByXcclQNLfZIyyyn3Hc5fWutMiBY",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "academia-inmigrantes-movil.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "academia-inmigrantes-movil",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "academia-inmigrantes-movil.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "366110120529",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:366110120529:android:ad147c976b206ac1bbf670",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// Initialize Firebase

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const authInstance = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestoreInstance = getFirestore(firebaseApp);
const storageInstance = getStorage(firebaseApp);

const firebaseInitialized = true;

export const auth = authInstance;
export const firestore = firestoreInstance;
export const storage = storageInstance;

export const isFirebaseInitialized = () => firebaseInitialized;
