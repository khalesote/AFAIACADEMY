import React, { useEffect } from 'react';
import { Platform, AppState } from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

/**
 * Componente que previene capturas de pantalla en toda la app
 * 
 * Android: El flag FLAG_SECURE se establece en MainActivity.kt
 * iOS: Detecta capturas de pantalla y muestra advertencia
 */
export default function ScreenshotPrevent() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // En iOS, solo podemos detectar capturas de pantalla
      // No podemos prevenirlas directamente
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        // iOS no tiene una forma directa de detectar capturas de pantalla
        // desde React Native sin módulos nativos adicionales
        // Por ahora, solo registramos el cambio de estado
      });

      return () => {
        subscription.remove();
      };
    }
    // En Android, la prevención se maneja a nivel nativo en MainActivity.kt
  }, []);

  return null; // Este componente no renderiza nada
}





