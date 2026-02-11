# 💰 Opciones GRATUITAS para Compilar iOS sin Pagar

## 📊 **Planes de EAS Build**

### Plan Gratuito de EAS:
- ✅ **Builds PÚBLICOS**: **GRATIS** (ilimitados)
- ❌ **Builds PRIVADOS**: Requiere pago ($29/mes)

### ¿Qué significa "build público"?
- El código fuente se sube a servidores de Expo
- Cualquiera puede ver el código (si tiene acceso)
- **Para apps comerciales**: No es ideal por privacidad

### ¿Qué significa "build privado"?
- El código se mantiene privado
- Solo tú puedes verlo
- Requiere plan de pago    

---

## 🆓 **OPCIÓN 1: GitHub Actions (100% GRATIS)**

### Ventajas:
- ✅ **Completamente gratis**
- ✅ **Código privado** (si tu repo es privado)
- ✅ **Ilimitado**
- ✅ **Automatización** (compila automáticamente)

### Requisitos:
- Cuenta de GitHub (gratis)
- Repositorio del proyecto

### Cómo configurarlo:

#### 1. Crear archivo `.github/workflows/build-ios.yml`:

```yaml
name: Build iOS App

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: macos-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Setup Expo
      uses: expo/expo-github-action@v8
      with:
        expo-version: latest
        token: ${{ secrets.EXPO_TOKEN }}
    
    - name: Build iOS
      run: |
        npx expo prebuild --platform ios --clean
        cd ios
        pod install
        cd ..
        xcodebuild -workspace ios/AcademiaDeInmigrantes.xcworkspace \
          -scheme AcademiaDeInmigrantes \
          -configuration Release \
          -archivePath build/AcademiaDeInmigrantes.xcarchive \
          archive
    
    - name: Export IPA
      run: |
        xcodebuild -exportArchive \
          -archivePath build/AcademiaDeInmigrantes.xcarchive \
          -exportPath build \
          -exportOptionsPlist exportOptions.plist
    
    - name: Upload artifact
      uses: actions/upload-artifact@v3
      with:
        name: ios-app
        path: build/*.ipa
```

#### 2. Crear `exportOptions.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>TU_TEAM_ID</string>
</dict>
</plist>
```

#### 3. Configurar secretos en GitHub:
- Ve a tu repositorio → Settings → Secrets
- Agrega `EXPO_TOKEN` (obtener de: https://expo.dev/accounts/[tu-usuario]/settings/access-tokens)

#### 4. Push al repositorio:
```bash
git add .
git commit -m "Add iOS build workflow"
git push
```

**Resultado**: GitHub compilará tu app automáticamente y podrás descargar el .ipa

---

## 🆓 **OPCIÓN 2: EAS Build Público (GRATIS)**

### Cómo usar EAS Build gratis:

#### 1. Hacer el build público:
```bash
eas build --platform ios --profile production --public
```

El flag `--public` hace que el build sea público y **gratis**.

#### 2. Configurar en `eas.json`:
```json
{
  "build": {
    "production": {
      "autoIncrement": true,
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false,
        "distribution": "store"
      }
    }
  }
}
```

#### 3. Ejecutar:
```bash
eas build --platform ios --profile production --public
```

**Nota**: El código se sube a servidores de Expo, pero el build es gratis.

---

## 🆓 **OPCIÓN 3: Codemagic (Plan Gratuito Limitado)**

### Ventajas:
- ✅ **500 minutos gratis/mes**
- ✅ **Código privado**
- ✅ **Fácil de configurar**

### Limitaciones:
- ⚠️ Solo 500 minutos/mes (suficiente para ~10-15 builds)
- ⚠️ Requiere configuración inicial

### Pasos:
1. Crear cuenta en https://codemagic.io
2. Conectar tu repositorio de GitHub
3. Configurar workflow para iOS
4. Build automático

---

## 🆓 **OPCIÓN 4: AppCircle (Plan Gratuito)**

### Ventajas:
- ✅ **Plan gratuito** con límites generosos
- ✅ **Código privado**
- ✅ **Interfaz fácil**

### Limitaciones:
- ⚠️ Límite de builds por mes (suficiente para proyectos pequeños)

---

## 🆓 **OPCIÓN 5: Bitrise (Plan Gratuito)**

### Ventajas:
- ✅ **200 builds/mes gratis**
- ✅ **Código privado**
- ✅ **Muy confiable**

### Limitaciones:
- ⚠️ Solo 200 builds/mes

---

## 📊 **Comparación de Opciones Gratuitas**

| Opción | Costo | Privacidad | Facilidad | Límites |
|--------|-------|------------|-----------|---------|
| **GitHub Actions** | ✅ Gratis | ✅ Privado | ⚠️ Media | ✅ Ilimitado |
| **EAS Build Público** | ✅ Gratis | ❌ Público | ✅ Muy fácil | ✅ Ilimitado |
| **Codemagic** | ✅ Gratis | ✅ Privado | ✅ Fácil | ⚠️ 500 min/mes |
| **AppCircle** | ✅ Gratis | ✅ Privado | ✅ Fácil | ⚠️ Límite mensual |
| **Bitrise** | ✅ Gratis | ✅ Privado | ✅ Fácil | ⚠️ 200 builds/mes |

---

## 🎯 **MI RECOMENDACIÓN**

### Para tu caso:

**1. Si el código puede ser público (o no te importa):**
   → **EAS Build con flag `--public`** (más fácil)

**2. Si necesitas código privado:**
   → **GitHub Actions** (100% gratis, ilimitado, privado)

---

## 🚀 **Guía Rápida: EAS Build Gratis**

### Paso 1: Instalar EAS CLI
```bash
npm install -g eas-cli
```

### Paso 2: Login
```bash
eas login
```

### Paso 3: Build PÚBLICO (gratis)
```bash
eas build --platform ios --profile production --public
```

**¡Eso es todo!** El build es gratis porque es público.

---

## 🚀 **Guía Rápida: GitHub Actions (Gratis y Privado)**

### Paso 1: Crear workflow
Crear archivo: `.github/workflows/build-ios.yml` (ver código arriba)

### Paso 2: Configurar secretos
- GitHub → Settings → Secrets → New secret
- Nombre: `EXPO_TOKEN`
- Valor: Tu token de Expo

### Paso 3: Push
```bash
git add .github/workflows/build-ios.yml
git commit -m "Add iOS build"
git push
```

**Resultado**: GitHub compila automáticamente y puedes descargar el .ipa

---

## ⚠️ **Importante: Lo que SÍ necesitas pagar**

Independientemente del método de compilación, necesitas:

1. **Cuenta de Apple Developer**: $99/año
   - Necesaria para publicar en App Store
   - No se puede evitar este costo

2. **Certificados iOS**: 
   - EAS los gestiona gratis
   - GitHub Actions requiere configuración manual

---

## ✅ **Resumen**

### Opciones GRATUITAS para compilar:

1. ✅ **EAS Build Público** - Más fácil, pero código público
2. ✅ **GitHub Actions** - Gratis, privado, ilimitado (requiere más configuración)
3. ✅ **Codemagic/AppCircle/Bitrise** - Gratis con límites

### Lo que SÍ cuesta:
- ❌ **Apple Developer Account**: $99/año (obligatorio para App Store)

---

## 💡 **Conclusión**

**NO necesitas pagar por EAS Build** si:
- Usas builds públicos (`--public` flag), O
- Usas GitHub Actions (gratis y privado)

**Solo necesitas pagar**:
- $99/año por cuenta de Apple Developer (para publicar en App Store)

¿Quieres que te ayude a configurar GitHub Actions o EAS Build público?



