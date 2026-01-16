# 🔄 Plan para Fusionar Contenido Nuevo con Versión Vieja en Git

## 📋 SITUACIÓN ACTUAL

- **Rama actual**: `main` (con muchos cambios sin commitear)
- **Ramas estables disponibles**:
  - `app-estable`
  - `version-estable`
  - `restore-2025-10-04`
  - `rescue-restore`

## 🎯 ESTRATEGIA RECOMENDADA

### Opción 1: Crear Nueva Rama desde Versión Estable (RECOMENDADO)

```bash
# 1. Guardar cambios actuales (opcional, por si acaso)
git stash push -m "Cambios antes de fusionar con version estable"

# 2. Cambiar a la rama estable que funciona
git checkout version-estable
# O la que funcione: app-estable, restore-2025-10-04, etc.

# 3. Crear nueva rama para fusionar
git checkout -b fusion-contenido-nuevo

# 4. Traer archivos específicos de main (solo los nuevos)
# Esto copiará los archivos sin hacer merge completo
git checkout main -- app/(tabs)/PagoFormacionScreen.tsx
git checkout main -- components/BizumPayment.tsx
# ... (repetir para cada archivo nuevo)

# 5. Instalar dependencias nuevas
npm install

# 6. Probar que compile
npx expo start -c
```

### Opción 2: Cherry-pick Commits Específicos

```bash
# 1. Identificar commits con contenido nuevo
git log --oneline main --grep="pago\|payment\|stripe" -10

# 2. Cambiar a versión estable
git checkout version-estable
git checkout -b fusion-contenido-nuevo

# 3. Hacer cherry-pick de commits específicos
git cherry-pick <commit-hash>
```

### Opción 3: Copiar Archivos Manualmente (MÁS SEGURO)

```bash
# 1. Cambiar a versión estable
git checkout version-estable
git checkout -b fusion-contenido-nuevo

# 2. Usar el archivo ARCHIVOS_PARA_COPIAR.md
# Copiar manualmente los archivos listados

# 3. Commit de los cambios
git add .
git commit -m "feat: agregar contenido nuevo y sistema de pagos"
```

## 📝 PASOS DETALLADOS (Opción 3 - Recomendada)

### Paso 1: Identificar la Versión Estable

```bash
# Ver qué rama es la que funciona
git checkout version-estable
# O
git checkout app-estable
# O
git checkout restore-2025-10-04

# Probar que compile
npx expo run:android
# Si funciona, esa es la buena
```

### Paso 2: Crear Rama de Trabajo

```bash
# Desde la rama que funciona
git checkout -b fusion-contenido-nuevo
```

### Paso 3: Copiar Archivos desde main

Usa el archivo `ARCHIVOS_PARA_COPIAR.md` como guía y copia:

```bash
# Ejemplo: copiar archivos de pago
git checkout main -- components/BizumPayment.tsx
# (Ejemplos actualizados sin Cecabank)
# ... etc
```

### Paso 4: Resolver Conflictos (si los hay)

```bash
# Si hay conflictos, resuélvelos manualmente
git status
# Edita los archivos con conflictos
git add .
git commit -m "feat: fusionar contenido nuevo"
```

### Paso 5: Instalar Dependencias

```bash
npm install
# Verificar package.json tiene las dependencias nuevas
```

### Paso 6: Probar

```bash
npx expo start -c
npx expo run:android
```

## 🚨 IMPORTANTE

1. **NO hagas merge completo** de main a la versión estable (traería los problemas de build)
2. **SÍ copia archivos específicos** uno por uno o por carpetas
3. **Guarda tus cambios actuales** con `git stash` antes de empezar
4. **Prueba después de cada grupo** de archivos copiados

## 📦 SCRIPT DE AYUDA

Puedo crear un script que:
1. Identifique automáticamente los archivos nuevos
2. Los copie desde main a la nueva rama
3. Te muestre un resumen de lo copiado

¿Quieres que cree este script?





