# 📱 Guía para Generar la Versión iPhone de la App

## Opciones Disponibles

Tienes **3 opciones** para generar la versión iOS de tu app:

---

## 🎯 **OPCIÓN 1: EAS Build (RECOMENDADO para Producción)**

Esta es la opción más fácil y recomendada. EAS Build compila la app en la nube de Expo, por lo que **NO necesitas un Mac**.

### Requisitos Previos:

1. **Cuenta de Expo** (gratuita)
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Cuenta de Apple Developer** (99€/año)
   - Necesaria para publicar en App Store
   - Puedes obtenerla en: https://developer.apple.com

3. **Certificados iOS** (EAS los genera automáticamente)

### Pasos:

#### 1. Instalar EAS CLI
```bash
npm install -g eas-cli
```

#### 2. Iniciar sesión en Expo
```bash
eas login
```

#### 3. Configurar el proyecto (si no está configurado)
```bash
eas build:configure
```

#### 4. Construir para iOS

**Para Testing/Pruebas (sin App Store):**
```bash
eas build --platform ios --profile preview
```

**Para Producción (App Store):**
```bash
eas build --platform ios --profile production
```

#### 5. Descargar el archivo .ipa
- EAS te dará un enlace para descargar el archivo `.ipa`
- Este archivo se puede instalar en dispositivos iOS o subir a App Store Connect

#### 6. Subir a App Store (opcional)
```bash
eas submit --platform ios
```

---

## 🖥️ **OPCIÓN 2: Compilación Local (Requiere Mac)**

Si tienes un **Mac**, puedes compilar localmente:

### Requisitos:

1. **Mac con macOS**
2. **Xcode** instalado (desde App Store)
3. **CocoaPods** instalado:
   ```bash
   sudo gem install cocoapods
   ```

### Pasos:

#### 1. Instalar dependencias
```bash
npm install
```

#### 2. Prebuild (genera carpetas nativas iOS)
```bash
npx expo prebuild --platform ios
```

#### 3. Instalar pods de iOS
```bash
cd ios
pod install
cd ..
```

#### 4. Compilar y ejecutar en simulador
```bash
npm run ios
```

#### 5. Compilar para dispositivo físico
1. Abre el proyecto en Xcode:
   ```bash
   open ios/AcademiaDeInmigrantes.xcworkspace
   ```
2. En Xcode:
   - Selecciona tu dispositivo o "Any iOS Device"
   - Ve a **Product > Archive**
   - Espera a que termine la compilación
   - Se abrirá **Organizer**
   - Haz clic en **Distribute App**
   - Selecciona el método de distribución (App Store, Ad Hoc, etc.)

---

## 🧪 **OPCIÓN 3: Build de Desarrollo (Solo Testing)**

Para probar la app en un dispositivo iOS sin publicarla:

### Pasos:

#### 1. Conectar tu iPhone/iPad
- Conecta el dispositivo por USB
- Confía en el ordenador cuando aparezca el mensaje

#### 2. Compilar y ejecutar
```bash
npm run ios
```

O con Expo:
```bash
npx expo run:ios --device
```

---

## ⚙️ **Configuración Necesaria en `eas.json`**

Tu archivo `eas.json` ya está configurado, pero necesitas actualizar las credenciales de Apple:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "tu-email@ejemplo.com",
        "ascAppId": "TU_APP_ID_DE_APP_STORE_CONNECT",
        "appleTeamId": "TU_TEAM_ID"
      }
    }
  }
}
```

### Cómo obtener estos valores:

1. **Apple ID**: Tu email de Apple Developer
2. **ASC App ID**: 
   - Ve a https://appstoreconnect.apple.com
   - Crea una nueva app
   - Copia el App ID (número de 10 dígitos)
3. **Team ID**:
   - Ve a https://developer.apple.com/account
   - En "Membership", encontrarás tu Team ID

---

## 📋 **Checklist Antes de Compilar**

- [ ] Verificar que `app.json` tiene la configuración iOS correcta
- [ ] Verificar el `bundleIdentifier`: `com.academiadeinmigrantes`
- [ ] Verificar la versión en `app.json` (actualmente: `1.0.0`)
- [ ] Tener icono de la app en `./assets/icon.png` (1024x1024px)
- [ ] Tener splash screen en `./assets/logo.png`
- [ ] Verificar permisos en `app.json` (micrófono, cámara, etc.)
- [ ] Tener cuenta de Apple Developer activa (para producción)

---

## 🚀 **Comandos Rápidos**

### Desarrollo Local (Mac):
```bash
npm run ios
```

### Build con EAS (Recomendado):
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Build para iOS
eas build --platform ios --profile production
```

### Subir a App Store:
```bash
eas submit --platform ios
```

---

## 📝 **Notas Importantes**

1. **Primera vez**: EAS te pedirá configurar credenciales de Apple. Sigue las instrucciones en pantalla.

2. **Certificados**: EAS gestiona automáticamente los certificados iOS. No necesitas hacerlo manualmente.

3. **Tiempo de compilación**: 
   - EAS Build: 15-30 minutos
   - Compilación local: 5-15 minutos (depende de tu Mac)

4. **Costo**:
   - EAS Build: Gratis para builds públicos, $29/mes para builds privados
   - Apple Developer: $99/año (requerido para publicar)

5. **Testing**: Puedes usar TestFlight (gratis) para distribuir la app a testers antes de publicarla.

---

## 🔧 **Solución de Problemas Comunes**

### Error: "No iOS project found"
```bash
npx expo prebuild --platform ios
```

### Error: "Pod install failed"
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Error: "Code signing required"
- Asegúrate de tener una cuenta de Apple Developer
- Configura los certificados en EAS o Xcode

### Error: "Bundle identifier already exists"
- Cambia el `bundleIdentifier` en `app.json`
- O usa el que ya tienes registrado en Apple Developer

---

## 📞 **Soporte**

- Documentación de EAS: https://docs.expo.dev/build/introduction/
- Documentación de Expo iOS: https://docs.expo.dev/workflow/ios-builds/
- Foro de Expo: https://forums.expo.dev/

---

## ✅ **Resumen: Pasos Mínimos para Producción**

1. Instalar EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Build: `eas build --platform ios --profile production`
4. Esperar a que termine (15-30 min)
5. Descargar el .ipa
6. Subir a App Store: `eas submit --platform ios`

**¡Listo!** Tu app estará lista para revisión en App Store Connect.


