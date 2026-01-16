# MEMORIA DEL PROGRAMA
## Academia de Inmigrantes - Aplicación Móvil

**Autor:** KHALED MERSAOUI  
**Fecha:** 02 de diciembre de 2025  
**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN DEL PROGRAMA

### 1.1. Nombre del Programa
**Academia de Inmigrantes**

### 1.2. Tipo de Obra
Aplicación móvil multiplataforma (Android e iOS) para educación y formación de inmigrantes.

### 1.3. Autor
**KHALED MERSAOUI**

### 1.4. Fecha de Creación
02 de diciembre de 2025

### 1.5. Lenguaje de Programación
- TypeScript / JavaScript
- React Native (Expo Framework)

---

## 2. DESCRIPCIÓN DEL PROGRAMA

### 2.1. Objetivo Principal
La **Academia de Inmigrantes** es una plataforma educativa móvil integral diseñada para acompañar a personas migrantes en su proceso de integración lingüística, cultural y administrativa en España. La aplicación ofrece itinerarios formativos estructurados por niveles, recursos interactivos, herramientas de gestión personal y acceso a servicios de asesoría especializada.

### 2.2. Público Objetivo
- Migrantes que necesitan aprender o fortalecer su dominio del español
- Personas que requieren orientación en trámites de extranjería, empleo y formación profesional
- Entidades colaboradoras (ONGs, asesores) que buscan un recurso centralizado para acompañar procesos formativos

### 2.3. Características Principales
- **Sistema de aprendizaje de español** estructurado en niveles A1, A2, B1 y B2 según el Marco Común Europeo de Referencia (MCER)
- **Profesor Virtual** con tutoría automatizada y mensajes motivacionales bilingües
- **Sistema de ejercicios interactivos** y evaluación automática
- **Formación profesional** con 17 cursos especializados
- **Generador de CVs** profesional con plantillas Europass
- **Sistema de pagos integrado** (Stripe y Cecabank)
- **Recursos culturales y literarios** (Café Literario, Cuentos, Museos)
- **Asesoría personalizada** para trámites de inmigración
- **Biblioteca digital** con materiales descargables

---

## 3. ARQUITECTURA Y TECNOLOGÍAS

### 3.1. Framework y Plataformas
- **Framework:** Expo (React Native)
- **Plataformas:** Android e iOS
- **Navegación:** expo-router (file-based routing con stack y tabs)
- **Lenguaje:** TypeScript / JavaScript (ES6+)

### 3.2. Tecnologías y Librerías Principales

#### Frontend
- **React Native:** Framework base para desarrollo móvil
- **Expo:** SDK y herramientas de desarrollo
- **TypeScript:** Lenguaje de programación tipado
- **expo-router:** Sistema de navegación basado en archivos
- **@react-native-async-storage/async-storage:** Persistencia local de datos
- **expo-av:** Reproducción de audio y video
- **expo-speech:** Síntesis de voz para pronunciación
- **expo-camera:** Acceso a cámara para reconocimiento facial
- **@expo/vector-icons:** Iconografía (Ionicons, FontAwesome5, MaterialCommunityIcons)
- **expo-linear-gradient:** Gradientes para diseño visual

#### Backend y Servicios
- **Node.js:** Servidor backend
- **Express:** Framework web para API
- **Firebase:** Autenticación y base de datos en tiempo real
- **Stripe:** Sistema de pagos online
- **Cecabank:** Pasarela de pagos alternativa

#### Seguridad
- **Reconocimiento facial:** Para verificación de identidad en exámenes
- **Prevención de capturas:** Protección contra screenshots durante exámenes
- **HTTPS:** Comunicación segura con servidores

### 3.3. Estructura del Proyecto

```
AcademiaDeInmigrantesNuevaV2/
├── app/                    # Pantallas y navegación
│   ├── (tabs)/            # Pantallas con navegación por pestañas
│   │   ├── SchoolScreen.tsx      # Escuela Virtual
│   │   ├── PreFormacionScreen.tsx # Formación Profesional
│   │   ├── A1_Acceso/            # Nivel A1
│   │   ├── A2_Plataforma/        # Nivel A2
│   │   ├── B1_Umbral/            # Nivel B1
│   │   └── B2_Avanzado/          # Nivel B2
│   ├── components/        # Componentes reutilizables
│   └── assets/            # Recursos multimedia
├── components/            # Componentes globales
├── utils/                 # Utilidades y funciones auxiliares
├── contexts/              # Contextos de React (estado global)
├── services/             # Servicios de API
├── hooks/                 # Custom hooks
├── config/                # Configuración
└── academia-backend/      # Servidor backend Node.js
```

---

## 4. FUNCIONALIDADES DETALLADAS

### 4.1. Módulo: Escuela Virtual

#### 4.1.1. Sistema de Niveles (A1, A2, B1, B2)
- **Navegación por niveles:** Desbloqueo secuencial basado en progreso
- **Unidades didácticas:** Contenido estructurado por temas
- **Seguimiento de progreso:** Sistema de guardado local con AsyncStorage
- **Evaluación automática:** Cálculo de puntuaciones y resultados
- **Diplomas:** Generación de certificados al completar niveles

#### 4.1.2. Profesor Virtual
- **Tutor Virtual Bot:** Mensajes motivacionales en español y árabe
- **Seguimiento personalizado:** Recordatorios y consejos adaptados al progreso
- **Evaluación continua:** Feedback automático sobre el rendimiento

#### 4.1.3. Ejercicios Interactivos
- **Crucigramas:** Ejercicios de vocabulario
- **Emparejamiento:** Asociación de conceptos
- **Comprensión auditiva:** Ejercicios con audio
- **Expresión oral:** Prácticas de pronunciación con reconocimiento de voz
- **Expresión escrita:** Ejercicios de redacción

### 4.2. Módulo: PreFormación Profesional

#### 4.2.1. Cursos Profesionales
17 cursos especializados:
- Electricidad
- Fontanería
- Cocina
- Jardinería
- Cuidado de Mayores
- Informática
- Comercio
- Almacén
- Y más...

#### 4.2.2. Generador de CVs
- **Asistente paso a paso:** Wizard de 5 pasos
- **Plantillas Europass:** Formato oficial europeo
- **Bilingüe:** Español y árabe
- **Exportación PDF:** Descarga directa del currículum

#### 4.2.3. Agenda y Gestión
- **Calendario de cursos:** Organización de formación
- **Recordatorios:** Notificaciones de clases y eventos
- **Seguimiento de asistencia:** Control de participación

### 4.3. Módulo: Recursos Culturales

#### 4.3.1. Café Literario
- **Diálogos guiados:** Conversaciones estructuradas por unidades
- **Contenido bilingüe:** Español y árabe
- **Interactividad:** Navegación por temas

#### 4.3.2. Biblioteca Digital
- **Libros descargables:** Materiales educativos en PDF
- **Cuentos populares:** Literatura española adaptada
- **Recursos multimedia:** Audio y video educativo

#### 4.3.3. Cultura General
- **Museos:** Información sobre museos españoles
- **Música:** Recursos musicales educativos
- **Teatro:** Contenido teatral adaptado

### 4.4. Módulo: Asesoría y Soporte

#### 4.4.1. Asesoría de Inmigración
- **Formulario bilingüe:** Solicitud de citas
- **Citas presenciales o telefónicas:** Flexibilidad de atención
- **Integración con backend:** Envío automático de solicitudes

#### 4.4.2. Noticias de Inmigración
- **Feed de noticias:** Actualizaciones relevantes
- **Filtrado:** Búsqueda por categorías
- **Visualización detallada:** Artículos completos

### 4.5. Módulo: Sistema de Pagos

#### 4.5.1. Integración Stripe
- **Payment Intents:** Creación de intenciones de pago
- **Checkout seguro:** Proceso de pago protegido
- **Confirmación automática:** Activación de acceso tras pago

#### 4.5.2. Integración Cecabank
- **Pasarela de pago:** Alternativa a Stripe
- **Firma digital:** Seguridad en transacciones
- **Confirmación de pagos:** Webhooks y callbacks

### 4.6. Módulo: Seguridad

#### 4.6.1. Reconocimiento Facial
- **Verificación de identidad:** Durante exámenes
- **Prevención de fraude:** Control de acceso

#### 4.6.2. Prevención de Capturas
- **Bloqueo de screenshots:** Durante exámenes
- **Protección de contenido:** Seguridad de datos

---

## 5. ESPECIFICACIONES TÉCNICAS

### 5.1. Requisitos del Sistema

#### Para Desarrollo
- **Node.js:** Versión 18 o superior
- **npm o yarn:** Gestor de paquetes
- **Expo CLI:** Herramientas de desarrollo
- **Android Studio:** Para desarrollo Android (opcional)
- **Xcode:** Para desarrollo iOS (solo macOS, opcional)

#### Para Usuarios Finales
- **Android:** Versión 6.0 (API 23) o superior
- **iOS:** Versión 13.0 o superior
- **Conexión a Internet:** Para funcionalidades online
- **Permisos:** Cámara, micrófono, almacenamiento

### 5.2. Almacenamiento de Datos

#### Local (AsyncStorage)
- Progreso de usuario por niveles
- Estado de unidades completadas
- Resultados de exámenes
- Configuraciones de usuario
- Accesos y permisos

#### Remoto (Firebase)
- Datos de usuario
- Historial de pagos
- Solicitudes de asesoría
- Sincronización entre dispositivos

### 5.3. APIs y Servicios Externos

#### Backend Propio
- **URL Base:** `https://academia-backend-s9np.onrender.com`
- **Endpoints:**
  - `/api/enviar-solicitud-asesoria`
  - `/api/create-payment-intent`
  - `/api/payment/confirm`

#### Servicios de Terceros
- **Stripe:** Pagos online
- **Cecabank:** Pasarela de pagos
- **Firebase:** Autenticación y base de datos
- **News Service:** Fuentes de noticias

---

## 6. PROCESO DE DESARROLLO

### 6.1. Metodología
Desarrollo iterativo con enfoque en:
- **Modularidad:** Componentes reutilizables
- **Mantenibilidad:** Código limpio y documentado
- **Escalabilidad:** Arquitectura preparada para crecimiento
- **Usabilidad:** Interfaz intuitiva y accesible

### 6.2. Control de Versiones
- **Git:** Sistema de control de versiones
- **Estructura de commits:** Mensajes descriptivos
- **Ramas:** Desarrollo, staging, producción

### 6.3. Testing
- **Pruebas manuales:** En dispositivos reales
- **Validación de funcionalidades:** Por módulo
- **Pruebas de integración:** Flujos completos

---

## 7. JUSTIFICACIÓN DE LA NO INCLUSIÓN DEL EJECUTABLE

### 7.1. Razones Técnicas

La aplicación **Academia de Inmigrantes** es una aplicación móvil desarrollada con **React Native y Expo**, que requiere un proceso de compilación específico para cada plataforma (Android e iOS). Los ejecutables generados son:

1. **Específicos de plataforma:** Requieren compilación separada para Android (.apk/.aab) e iOS (.ipa)
2. **Tamaño considerable:** Los ejecutables compilados superan ampliamente el límite de 30 MB establecido
3. **Dependencias externas:** Requieren certificados de firma y configuración específica del entorno de desarrollo

### 7.2. Alternativa Propuesta

En lugar del ejecutable, se proporciona:

1. **Código fuente completo:** Todo el código necesario para generar los ejecutables
2. **Instrucciones de compilación:** Documentación para generar los ejecutables
3. **Configuración de proyecto:** Archivos de configuración (package.json, app.json, eas.json)
4. **Scripts de build:** Scripts para automatizar la compilación

### 7.3. Proceso de Generación del Ejecutable

Para generar los ejecutables, se requiere:

#### Android:
```bash
npm install
npx expo prebuild
cd android
./gradlew assembleRelease
```

#### iOS:
```bash
npm install
npx expo prebuild
cd ios
xcodebuild -workspace AcademiaDeInmigrantes.xcworkspace -scheme AcademiaDeInmigrantes -configuration Release
```

### 7.4. Información Adicional

- **Bundle ID Android:** `com.academiadeinmigrantes`
- **Bundle ID iOS:** `com.academiadeinmigrantes`
- **Versión:** 1.0.0
- **SDK Version:** Expo SDK 53.0.0

El código fuente proporcionado contiene toda la información necesaria para compilar y ejecutar la aplicación en ambas plataformas.

---

## 8. INNOVACIÓN Y CARACTERÍSTICAS DIFERENCIADORAS

### 8.1. Características Únicas
- **Sistema bilingüe completo:** Español y árabe en toda la interfaz
- **Profesor Virtual:** Tutoría automatizada con mensajes personalizados
- **Reconocimiento facial:** Para seguridad en exámenes
- **Integración de pagos:** Stripe
- **Generador de CVs profesional:** Con plantillas Europass
- **17 cursos de formación profesional:** Especializados para inmigrantes

### 8.2. Valor Educativo
- **Metodología MCER:** Estructura oficial de niveles de idioma
- **Contenido adaptado:** Específico para necesidades de inmigrantes
- **Recursos culturales:** Integración cultural además de lingüística
- **Formación profesional:** Enfoque en empleabilidad

---

## 9. CONCLUSIÓN

La aplicación **Academia de Inmigrantes** representa una solución integral para la integración de inmigrantes en España, combinando educación lingüística, formación profesional y recursos culturales en una plataforma móvil accesible y fácil de usar.

El código fuente proporcionado contiene toda la implementación necesaria para compilar, ejecutar y mantener la aplicación en producción, cumpliendo con los estándares de desarrollo moderno y las mejores prácticas de la industria.

---

**Firma del Autor:**  
KHALED MERSAOUI

**Fecha:** 02 de diciembre de 2025

---

## ANEXOS

### Anexo A: Estructura de Archivos Principales
- `app/index.tsx`: Pantalla principal
- `app/(tabs)/SchoolScreen.tsx`: Escuela Virtual
- `app/(tabs)/PreFormacionScreen.tsx`: Formación Profesional
- `utils/userDatabase.ts`: Gestión de usuarios
- `contexts/UserProgressContext.tsx`: Estado global de progreso

### Anexo B: Configuración de Dependencias
Ver archivo `package.json` para lista completa de dependencias y versiones.

### Anexo C: Documentación Técnica Adicional
- `Documentacion_App.md`: Documentación técnica detallada
- `README.md`: Guía de inicio rápido
- `TECHNICAL_STUDY.md`: Estudio técnico completo

























