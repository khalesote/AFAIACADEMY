/**
 * Plugin para prevenir capturas de pantalla
 * 
 * La funcionalidad principal se implementa en:
 * - Android: MainActivity.kt (FLAG_SECURE)
 * - iOS: No hay forma directa de prevenir, solo detectar
 */
const withPreventScreenshot = (config) => {
  // El flag FLAG_SECURE se establece directamente en MainActivity.kt
  // Este plugin solo marca que la funcionalidad está habilitada
  return config;
};

module.exports = withPreventScreenshot;

