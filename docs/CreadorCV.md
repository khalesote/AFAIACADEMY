# Especificación: Creador de Curriculum Bilingüe

## Objetivo
Permitir que cualquier usuario genere un curriculum profesional en pocos pasos, con textos sugeridos en español y árabe, y descargarlo en formato PDF listo para enviar.

## Flujo de Usuario
1. **Pantalla principal** (`app/index.tsx`): Botón destacado "Creador de CV" → Navega a `/(tabs)/CreadorCVScreen`.
2. **Paso 1: Datos personales (Europass)**
   - Campos obligatorios: nombre(s) y apellidos, fecha de nacimiento, nacionalidad, sexo, dirección, teléfono, correo.
   - Imagen opcional (foto tipo carnet) y selección del puesto deseado.
   - Placeholders y ejemplos en español/árabe siguiendo el formato oficial.
3. **Paso 2: Experiencia profesional**
   - Estructura Europass: fecha inicio/fin, cargo, empresa, ciudad/país, responsabilidades principales.
   - Sugerencias bilingües y posibilidad de añadir logros cuantificables.
4. **Paso 3: Educación y formación**
   - Periodo formativo, título obtenido, centro, nivel EQF (opcional) y breve descripción.
   - Botón “Importar cursos de la app” para incorporar módulos completados.
5. **Paso 4: Competencias personales**
   - Idioma materno + otros idiomas con niveles CEFR (A1–C2) en comprensión, habla y escritura.
   - Competencias de comunicación, gestión, relacionadas con el empleo, competencias digitales (clasificadas como en Europass).
   - Campos para certificados o acreditaciones adicionales.
6. **Revisión y exportación**
   - Vista previa con plantilla Europass: cabecera azul, columnas diferenciadas y tipografía similar (Open Sans / Lato).
   - Botones “Descargar PDF”, “Guardar borrador” y “Compartir”.

## Componentes
- `app/(tabs)/CreadorCVScreen.tsx`: Contenedor principal con navegación paso a paso (wizard de 5 pasos).
- `components/CVStepHeader.tsx`: Indicador de progreso.
- `components/CVFormSection.tsx`: Renderiza secciones dinámicas (uso de `FlatList`) con validaciones por paso.
- `components/CVPreview.tsx`: Muestra la plantilla renderizada antes de exportar con formato Europass.
- `hooks/useResumeBuilder.ts`: Maneja estado, validaciones y textos sugeridos.

## Datos por defecto
Ubicación: `utils/defaultResumeData.ts`
- Datos personales ampliados (nacionalidad, fecha de nacimiento, sexo, puesto deseado).
- Objetivos profesionales genéricos (ejemplo: “Profesional responsable con experiencia en atención al cliente...” y su versión árabe).
- Logros sugeridos por sector (hostelería, agricultura, tecnología).
- Competencias personales alineadas con Europass (comunicación, gestión, relacionadas con el empleo, digitales).

## Plantillas
Archivo: `utils/cvTemplates.ts`
- Plantilla 1: Europass clásica (barra lateral izquierda con datos personales y competencias, columna derecha con experiencia y educación).
- Plantilla 2: Variante moderna Europass (cabecera horizontal con color corporativo, tarjetas por sección).

## Exportación PDF
- Uso de `expo-print` para generar PDF a partir de HTML con estilos Europass.
- Exportar datos de `useResumeBuilder` y plantillas seleccionadas.
- Incorporar fuente Open Sans o similar para emular el documento original.
- Guardar archivo en memoria local o compartir via `expo-sharing`.

## Persistencia
- `contexts/UserProgressContext.tsx`: Guardar borradores por usuario.
- `firebase` (opcional): Colección `user_resumes` con datos para reanudar sesión desde otros dispositivos.
- Botón "Guardar borrador" guarda estado actual del formulario.

## Idiomas y localización
- Usar `i18n` existente o crear `utils/localeCV.ts`.
- Todos los textos clave (labels, placeholders, secciones) con versión español/árabe.
- Permitirá exportar CV en español, árabe o mixto según selección del usuario.

## Seguridad y privacidad
- Los datos personales son sensibles. Asegurar:
  - Validaciones client-side (emails, números).
  - Opción de borrado completo del CV.
  - Advertencia sobre compartir datos en dispositivos compartidos.

## Roadmap sugerido
1. Implementar UI y navegación paso a paso con datos locales.
2. Añadir textos sugeridos y traducciones.
3. Integrar exportación PDF básica.
4. Guardado de borradores en contexto/app storage.
5. Opcional: sincronizar con backend para acceso multi-dispositivo.
