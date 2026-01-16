import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
// @ts-ignore
const window = typeof global !== "undefined" ? global.window : undefined;
import * as Speech from "expo-speech";
import { useLocalSearchParams, useRouter } from "expo-router";

// Importa el objeto alfabetos y las imágenes desde indice.tsx
import { alfabetos, imagenes } from "./indice";

export default function LetraScreen() {
  const { letra } = useLocalSearchParams();
  const router = useRouter();
  const item = alfabetos.find((a) => a.letra === letra);
  if (!item) return <Text>Letra no encontrada</Text>;
  const imagenSource = imagenes[item.imagen];

  const hablar = () => {
    Speech.speak(`${item.letra}. Ejemplo: ${item.ejemplo}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(tabs)/indice")} style={styles.volverBtn}>
        <Text style={styles.volverTxt}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.letra}>{item.letra}</Text>
      <Text style={styles.arabe}>{item.arabe}</Text>
      <Text style={styles.ejemplo}>
        {item.ejemplo} — <Text style={styles.traduccion}>{item.traduccion}</Text>
      </Text>
      {imagenSource && <Image source={imagenSource} style={styles.imagen} resizeMode="contain" />}
      <Button title="Escuchar" onPress={hablar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  volverBtn: {
    position: "absolute",
    top: 32,
    left: 16,
    padding: 8,
    zIndex: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  volverTxt: {
    fontSize: 18,
    color: "#333",
  },
  letra: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 12,
  },
  arabe: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 12,
  },
  ejemplo: {
    fontSize: 28,
    color: "#333",
    marginBottom: 12,
  },
  traduccion: {
    fontSize: 28,
    color: "#388e3c",
    fontWeight: "bold",
  },
  imagen: {
    width: 180,
    height: 180,
    marginVertical: 16,
  },
});

// Exporta alfabetos e imagenes para usarlos en otros archivos
export { alfabetos, imagenes };
