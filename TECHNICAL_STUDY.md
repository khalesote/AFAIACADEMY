# Estudio Técnico de la Aplicación y la Plataforma Web

Este documento presenta un resumen técnico de la aplicación móvil y la plataforma web del proyecto "Academia de Inmigrantes NuevaV2", basado en la estructura y código revisado.

## 1. Aplicación Móvil (App)

La aplicación móvil está desarrollada utilizando el framework **React Native** con **Expo**, lo que permite compilarla para iOS y Android a partir de un único codebase.

### 1.1. Arquitectura y Tecnologías Clave

-   **Framework:** React Native con Expo.
-   **Navegación:** Posiblemente utilizando Expo Router o similar, organizando las pantallas en directorios (e.g., `app/(tabs)/`).
-   **Estado Local/Almacenamiento:** Utiliza `AsyncStorage` para persistir datos localmente en el dispositivo del usuario, como el progreso en los niveles, resultados de exámenes, estado de verificación de TikTok y tiempo de primer lanzamiento.
-   **Interfaz de Usuario:** Construida con componentes de React Native y estilos definidos con `StyleSheet`.
-   **Manejo de Lógica:** Los componentes de pantalla y clases (e.g., en `A2_Plataforma/clases/`) contienen la lógica para la interacción del usuario, manejo de estado, validaciones (como en exámenes simulados) y navegación.
-   **Soporte Multilenguaje:** Implementado con un sistema básico para mostrar textos en diferentes idiomas (visto en `SchoolScreen.tsx`).

### 1.2. Funcionalidades Técnicas Implementadas (Vistas)

-   **Progresión por Niveles:** La lógica para desbloquear niveles (A2, B1, B2) basada en la finalización o aprobación de niveles/exámenes anteriores, gestionada mediante estado local (`AsyncStorage`).
-   **Simulación de Exámenes:** Componentes dedicados para cada examen que manejan las preguntas, respuestas, validación y cálculo de resultados (visto en `ExamenFinal.tsx` para A2 y B2).
-   **Simulación de Pago de Diploma:** Un flujo simplificado (tras la eliminación de Stripe) donde la navegación a `PagoConfirmacionScreen` simula el pago y desbloquea la visualización del diploma (`DiplomaScreen`, `DiplomaGeneradoScreen`). El precio y la navegación se ajustaron recientemente.
-   **Sistema de Verificación con TikTok:** Implementación de un período de prueba basado en el tiempo transcurrido desde el primer lanzamiento (`AsyncStorage`). Muestra el tiempo restante y restringe el acceso tras el período de prueba, dirigiendo al usuario a TikTok. La verificación se marca localmente (`AsyncStorage`) tras interactuar con el enlace de TikTok.
-   **Acceso a Funciones del Dispositivo:** Uso de `Linking` para abrir enlaces externos (como TikTok). Aunque se vieron referencias a `expo-application` y `expo-store-review` para verificación de instalación y solicitud de calificación, persisten errores de linter que indican que estos módulos pueden no estar correctamente configurados o instalados en el entorno actual.

## 2. Plataforma Web

La plataforma web parece enfocada principalmente en la funcionalidad de clases en vivo.

### 2.1. Arquitectura y Tecnologías Clave

-   **Frontend:** Desarrollado con **React** (JSX). Organizado en directorios como `web/frontend/src/pages/`.
-   **Integración de Clases en Vivo:** Utiliza un `<iframe>` para incrustar sesiones de **Jitsi Meet**, permitiendo videoconferencias dinámicas con nombres de sala generados o basados en parámetros.
-   **Base de Datos (Backend As A Service):** Utiliza **Firebase Firestore** para almacenar datos, específicamente para la programación y gestión de clases (colección `clases`).
-   **Manejo de Estado:** Utiliza hooks de React (`useState`, `useEffect`) para manejar el estado de la interfaz de usuario, como el proceso de creación de clases, la carga de datos y la visualización de clases programadas.
-   **Interacción con Base de Datos:** Implementa lógica para añadir nuevas clases a Firestore y para escuchar actualizaciones en tiempo real de la colección `clases` (`onSnapshot`).

### 2.2. Funcionalidades Técnicas Implementadas (Vistas)

-   **Participación en Clases en Vivo:** La página `LiveClass.jsx` permite a los usuarios unirse a una sala de Jitsi Meet dinámica basada en un identificador proporcionado (e.g., en la URL).
-   **Administración de Clases (Básica):** La página `LiveClassAdmin.jsx` proporciona una interfaz para:
    -   Crear nuevas entradas de clases en Firebase Firestore con detalles como fecha, hora, nivel, idioma, contraseña y nombre de sala.
    -   Mostrar una lista de las clases programadas obtenidas de Firestore, ordenadas por fecha/hora.
-   **Pendiente/No Visto en el Código Explorado:** No se ha explorado en detalle la carpeta `web/backend`, por lo que su rol específico y las tecnologías utilizadas allí no están cubiertos en este estudio.

## 3. Consideraciones Técnicas Generales

-   **Separación:** La aplicación móvil y la plataforma web parecen ser aplicaciones separadas con propósitos distintos (aprendizaje autónomo + verificación vs. clases en vivo + administración).
-   **Dependencias:** El proyecto utiliza varias librerías externas, manejadas probablemente a través de `npm` o `yarn`.
-   **Linter/Errores:** Se han observado errores de linter relacionados con la importación de ciertos módulos en la app (`expo-application`, `expo-store-review`), lo que sugiere la necesidad de revisar las dependencias y la configuración del proyecto Expo.

Este estudio técnico proporciona una visión general de la arquitectura y las funcionalidades implementadas hasta ahora, sirviendo como punto de partida para documentación más detallada o presentaciones técnicas. 