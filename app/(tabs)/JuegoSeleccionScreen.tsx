import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JuegoSeleccionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juego Selección</Text>
      {/* Agrega aquí tu contenido */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
