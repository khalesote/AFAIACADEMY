# Academia de Inmigrantes

## 1. Presentación General

La **Academia de Inmigrantes** es una plataforma educativa móvil desarrollada con React Native y Expo. Su objetivo principal es acompañar a personas migrantes en su proceso de integración lingüística, cultural y administrativa en España. La aplicación ofrece itinerarios formativos por niveles, recursos interactivos, herramientas de gestión personal y acceso a servicios de asesoría especializada.

## 2. Público Objetivo

- Migrantes que necesitan aprender o fortalecer su dominio del español.
- Personas que requieren orientación en trámites de extranjería, empleo y formación profesional.
- Entidades colaboradoras (ONGs, asesores) que buscan un recurso centralizado para acompañar procesos formativos.

## 3. Arquitectura y Tecnologías

- **Framework**: Expo (React Native).
- **Lenguaje**: TypeScript/JavaScript.
- **Navegación**: `expo-router` (stack y tabs).
- **Persistencia local**: `@react-native-async-storage/async-storage`.
- **Servicios externos**: `fetchLatestNews()` consume fuentes externas para noticias de inmigración.
- **Iconografía**: `@expo/vector-icons` (Ionicons, FontAwesome5, MaterialCommunityIcons).
- **Estilos**: `StyleSheet` de React Native con apoyo de `LinearGradient`.

## 4. Estructura de Navegación

- **Home Screen** (`app/index.tsx`): punto de entrada con promociones, noticias, accesos rápidos y widgets de contacto.
- **School Screen** (`app/(tabs)/SchoolScreen.tsx`): vista académica central con niveles A1–B2, seguimiento de progreso y tutor virtual.
- **Pestañas específicas** (carpeta `app/(tabs)/`): módulos temáticos como asesoría, biblioteca, juegos, cursos profesionales y recursos culturales.
- **Pantallas independientes**: secciones que se abren desde accesos rápidos o menús contextuales (ej. `CafeLiterarioScreen.tsx`, `CreadorCVScreen.tsx`).

## 5. Funcionalidades Detalladas

### 5.1 Inicio (`HomeScreenContent` en `app/index.tsx`)
- **Ticker bilingüe** (español/árabe) con promociones y recordatorios.
- **Noticias dinámicas**: lista actualizable desde `fetchLatestNews()` con scroll automático.
- **Accesos rápidos** a módulos clave: Café Literario, Noticias de Inmigración, Cuentos, Juegos, Agenda, Pre-formación, Creador de CV, etc.
- **Widget de contacto** con acceso directo a `AsesoriaScreen`.
- **Gestión de usuario**: carga datos desde `userStorage`, distingue administradores.
- **Sincronización de progreso**: utiliza `useEffect` para inicializar estado A1–B2 y pruebas de AsyncStorage.

### 5.2 Escuela Virtual (`app/(tabs)/SchoolScreen.tsx`)
- **Tutor Virtual Bot**: mensajes motivacionales en español y árabe.
- **Evaluación automática**: función `evaluacionAutomatica` para calcular puntuaciones.
- **Control de matrícula**: desbloqueo de niveles según estado guardado en AsyncStorage.
- **Modal de progreso** y recordatorios de matriculación.
- **Acceso a cursos por nivel**: rutas hacia módulos A1, A2, B1 y B2.

### 5.3 Niveles A1–B2
- Directorios `app/(tabs)/A1_Acceso`, `A2_Plataforma`, `B1_Umbral`, `B2_Avanzado`.
- Cada nivel incluye:
  - **Unidades didácticas** con navegación secuencial.
  - **Botones destacados** para Expresión Oral, Vocabulario, etc.
  - **Comprobación de progreso** (indicadores `oralPassed`, `diplomaReady`).
  - **Estilos personalizados** alineados a la nueva paleta (`#9DC3AA`, `#1976d2`, `#fbc02d`, etc.).

### 5.4 Juegos de Tareas
- Pantalla base: `app/(tabs)/JuegosDeTareasScreen.tsx`.
- Acceso a minijuegos educativos:
  - Juego de Letras (`JuegoAlfabetoScreen.tsx`)
  - Juego de Emparejar (`JuegoEmparejarScreen.tsx`)
  - Juego de Palabras (`JuegoPalabrasScreen.tsx`)
  - Juego de Colores (`JuegoColoresScreen.tsx`)
- Botón de retorno configurado a la pantalla principal (`router.replace('/')`).

### 5.5 Recursos Culturales y Literarios
- **Café Literario** (`CafeLiterarioScreen.tsx`): diálogos guiados por unidades, botón de regreso a inicio, textos bilingües.
- **Cuentos Populares Españoles** (`CuentosPopularesScreen.tsx`):  donde se listan relatos con lectura textual, botón "Escuchar en español" usando `expo-speech`, descrito en español y árabe.
- **Módulos adicionales**: Música, Teatro, Museos, Cultura General, entre otros.

### 5.6 Asesoría de Inmigración (`AsesoriaScreen.tsx`)
- **Formulario bilingüe** con campos obligatorios.
- **Radio buttons** para seleccionar cita presencial o telefónica.
- **Formato automático de fecha** (`formatDate`) que inserta barras `DD/MM/AAAA`.
- **Envío de solicitudes** vía API `https://academia-backend-s9np.onrender.com/api/enviar-solicitud-asesoria`.
- **Indicadores de carga** y alertas contextualizadas.

### 5.7 Herramientas Profesionales
- **Creador de CV** (`CreadorCVScreen.tsx`): asistente en pasos para generar currículum.
- **Cursos de formación profesional**: múltiples pantallas (`CursoCocinaScreen.tsx`, `CursoElectricidadScreen.tsx`, etc.) con contenidos extensos, guías y enlaces.
- **Pre-formación SEPE** (`PreFormacionScreen.tsx`): recursos para empleabilidad.

### 5.8 Biblioteca Digital y Recursos Lingüísticos
- **BibliotecaDigitalScreen.tsx**: acceso a libros y materiales descargables.
- **Diccionario y fonética** (`DiccionarioScreen.tsx`, `FoneticaMenuScreen.tsx`, `FoneticaPronunciacionScreen.tsx`).
- **Ejercicios de gramática** (`GramaticaScreen.tsx`), cursos temáticos e interacciones multimedia.

### 5.9 Noticias y Comunidad
- **NoticiasInmigracionScreen.tsx**: módulo dedicado a noticias con filtrado y visualización detallada.
- **Comunidad y Ayudas**: pantallas `ComunidadInfoScreen.tsx`, `AyudasONGScreen.tsx`, `AbogadosExtranjeriaScreen.tsx`, `CarpetaCiudadanaScreen.tsx`, entre otras.

## 6. Servicios de Datos y Estado

- **Contexts**: `useUserProgress` gestiona progreso global (niveles, diplomas, unidades).
- **Storage**: combinación de AsyncStorage y funciones utilitarias (`userStorage`, `unitProgress`).
- **Integración externa**: llamadas fetch en `newsService` para noticias; envío de formularios a backend propio.

## 7. Experiencia de Usuario

- Diseño adaptado con paleta verde agua (`#9DC3AA`) y variantes.
- Interfaces bilingües (español/árabe) en textos clave.
- Botones de regreso claros (`router.replace('/')` o `router.back()`).
- Indicadores visuales para estados de progreso y cargas (`ActivityIndicator`).

## 8. Seguridad y Cumplimiento

- Recolección de datos mínimo para solicitudes.
- Responsabilidad de proteger datos mediante HTTPS y manejo seguro en backend (ver `Comisiones_Tecnicas.md` para política de protección y comisiones).

## 9. Documentación Complementaria

- **Comisiones Técnicas**: `Comisiones_Tecnicas.md` describe los comités y responsabilidades institucionales.
- **Marketing**: `marketing-poster.js` genera visuales promocionales.
- **Scripts auxiliares**: `abrir_carteles.bat` para abrir recursos desde Windows.

## 10. Próximos Pasos (Sugerencias)

- Implementar autenticación robusta y roles diferenciados.
- Añadir analíticas de uso para medir participación.
- Optimizar carga de noticias con caché persistente.
- Internacionalizar toda la interfaz usando i18n.
- Generar pruebas automáticas y pipeline CI/CD.

---

**Fecha**: 22 de octubre de 2025  
**Responsable de documentación**: Equipo técnico de la Academia de Inmigrantes
