import { useEffect } from 'react';
import { Platform, NativeModules, AppState } from 'react-native';

/**
 * Utilidad para prevenir capturas de pantalla en toda la app
 * 
 * Android: Usa FLAG_SECURE para bloquear capturas
 * iOS: Detecta capturas y muestra advertencia
 */

// Para Android, necesitamos un módulo nativo
// Por ahora, usaremos una solución híbrida

let screenshotListener: (() => void) | null = null;

/**
 * Activa la prevención de capturas de pantalla
 */
export function enableScreenshotPrevention() {
  if (Platform.OS === 'android') {
    // En Android, el flag se establece a nivel nativo
    // Intentar usar un módulo nativo si está disponible
    try {
      const { ScreenshotPrevent } = NativeModules;
      if (ScreenshotPrevent) {
        ScreenshotPrevent.enable();
      }
    } catch (error) {
      console.warn('Módulo de prevención de capturas no disponible:', error);
    }
  } else if (Platform.OS === 'ios') {
    // En iOS, solo podemos detectar capturas
    // La detección se maneja en el componente
  }
}

/**
 * Desactiva la prevención de capturas de pantalla
 */
export function disableScreenshotPrevention() {
  if (Platform.OS === 'android') {
    try {
      const { ScreenshotPrevent } = NativeModules;
      if (ScreenshotPrevent) {
        ScreenshotPrevent.disable();
      }
    } catch (error) {
      console.warn('Módulo de prevención de capturas no disponible:', error);
    }
  }
}

/**
 * Hook para prevenir capturas de pantalla en un componente
 */
export function usePreventScreenshot(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    enableScreenshotPrevention();

    return () => {
      disableScreenshotPrevention();
    };
  }, [enabled]);
}






