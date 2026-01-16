import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CarpetaCiudadanaScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#1565c0" />
      </TouchableOpacity>
      <Text style={styles.title}>Carpeta Ciudadana</Text>
      <Text style={styles.titleAr}>الملف المواطن</Text>
      <Text style={styles.text}>
        La Carpeta Ciudadana es una plataforma online donde puedes consultar tus trámites,
        notificaciones y documentos oficiales con la administración pública española.
      </Text>
      <Text style={styles.textAr}>
        "الملف المواطن" هو منصة إلكترونية يمكنك من خلالها مراجعة معاملاتك، إشعاراتك، ووثائقك الرسمية
        مع الإدارة العامة الإسبانية.
      </Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL("https://carpetaciudadana.gob.es")}
      >
        <Ionicons name="open-outline" size={20} color="#fff" />
        <Text style={styles.linkText}>Ir a la Carpeta Ciudadana</Text>
      </TouchableOpacity>
      <Text style={styles.note}>
        Necesitas identificarte con Cl@ve, certificado digital o DNI electrónico para acceder a tus
        datos personales.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 18,
    paddingTop: 36,
  },
  backButton: {
    position: "absolute",
    top: 26,
    left: 12,
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 4,
    marginTop: 8,
    textAlign: "center",
  },
  titleAr: {
    fontSize: 20,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 12,
    writingDirection: "rtl",
    textAlign: "right",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    textAlign: "left",
  },
  textAr: {
    fontSize: 16,
    color: "#1976d2",
    marginBottom: 12,
    writingDirection: "rtl",
    textAlign: "right",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 10,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  note: {
    fontSize: 13,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
});
