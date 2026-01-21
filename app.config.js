// Archivo migrado automáticamente desde el proyecto original

export default {
  expo: {
    name: "AcademiaDeInmigrantes",
    slug: "AcademiaDeInmigrantes",
    scheme: "academiadeinmigrantes",
    version: "1.0.0",
    splash: {
      image: "./assets/images/logo.jpg",
      resizeMode: "cover",
      backgroundColor: "#ffffff"
    },
    android: {
      package: "com.calatorao.academiadeinmigrantes",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      }
    },
    plugins: [
      "@react-native-community/datetimepicker"
    ],
    extra: {
      eas: {
        projectId: "15c37d2b-a97f-460a-9d93-28928e8db742"
      }
    }
  }
};
