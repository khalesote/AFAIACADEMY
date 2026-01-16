# Explicación del Sistema de Prueba y Verificación con TikTok

Este documento explica el funcionamiento del sistema de prueba y verificación implementado en la aplicación.

## Propósito

El propósito principal de este sistema es permitir a los usuarios probar la aplicación por un tiempo limitado antes de requerirles interactuar con nuestro canal de TikTok para obtener acceso completo y continuo.

## Período de Prueba

- Al instalar la aplicación por primera vez, los usuarios obtienen un período de prueba de **2 horas**.
- Durante este tiempo, la aplicación es completamente funcional.
- Se muestra en la pantalla de verificación el tiempo restante de prueba en formato "Xh Ym", que se actualiza cada minuto.
- Los archivos involucrados en el manejo del tiempo de prueba son `app/utils/installationVerification.ts` y `app/components/TikTokVerification.tsx`.

## Después del Período de Prueba

- Una vez transcurridas las 2 horas de prueba, la aplicación restringirá el acceso y mostrará la pantalla de verificación de TikTok.
- El mensaje en la pantalla cambiará para indicar que deben descargar la versión completa de la aplicación desde TikTok.

## Verificación con TikTok

- En la pantalla de verificación, hay un botón que dirige al usuario a nuestro perfil de TikTok.
- La intención es que el usuario interactúe con nuestro contenido (ver un video, seguir, etc.).
- Al hacer clic en el botón de TikTok y regresar a la aplicación, el sistema marca la instalación como "verificada" almacenando un estado en `AsyncStorage` (`installation_verified`).
- Una vez verificada, la aplicación funcionará de manera indefinida sin restricciones de tiempo.

## Archivos Clave

- `app/utils/installationVerification.ts`: Contiene la lógica para verificar la instalación, manejar el tiempo de primer lanzamiento, calcular el tiempo restante de prueba y marcar la instalación como verificada.
- `app/components/TikTokVerification.tsx`: Es el componente de interfaz de usuario que muestra el estado de verificación, el tiempo restante de prueba y el botón para ir a TikTok. 