// Archivo migrado automáticamente desde el proyecto original

export default {
  expo: {
    name: "AcademiaDeInmigrantes",
    slug: "AcademiaDeInmigrantes",
    scheme: "academiadeinmigrantes",
    version: "1.0.0",
    sdkVersion: "53.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    extra: {
      eas: {
        projectId: "15c37d2b-a97f-460a-9d93-28928e8db742"
      }
    },
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/icon.png",
          color: "#ffffff",
          sounds: [],
          android: {
            sound: true,
            vibrate: true
          }
        }
      ],
      ["@react-native-community/datetimepicker", false]
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.academiadeinmigrantes",
      infoPlist: {
        NSMicrophoneUsageDescription: "La app necesita acceso al micrófono para la prueba oral de los exámenes.",
        NSSpeechRecognitionUsageDescription: "La app necesita acceder al reconocimiento de voz para transcribir tu habla en la prueba oral."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.academiadeinmigrantes",
      googleServicesFile: "./android/app/google-services.json",
      permissions: [
        "RECORD_AUDIO",
        "POST_NOTIFICATIONS",
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE",
        "WAKE_LOCK"
      ],
      useNextNotificationsApi: true
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
};
