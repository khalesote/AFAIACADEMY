import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const audios = [
  { palabra: "Gato", opciones: ["Gato", "Perro", "Pájaro"], correcta: "Gato" },
  {
    palabra: "Perro",
    opciones: ["Gato", "Perro", "Pájaro"],
    correcta: "Perro",
  },
];

export default function JuegoAudioScreen() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState("");
  const actual = audios[indice];

  const handleSeleccion = (opcion: string) => {
    if (opcion === actual.correcta) {
      setFeedback("¡Correcto!");
      setTimeout(() => {
        setFeedback("");
        setIndice((i) => (i + 1) % audios.length);
      }, 800);
    } else {
      setFeedback("Intenta de nuevo");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)/JuegosDeTareasScreen")}
        >
          <Ionicons name="arrow-back" size={28} color="#2c3e50" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>¿Qué palabra escuchas? (simulado)</Text>
      <Text style={styles.audioSimulado}>🔊 {actual.palabra}</Text>
      <View style={styles.optionsRow}>
        {actual.opciones.map((op) => (
          <TouchableOpacity key={op} style={styles.optionBtn} onPress={() => handleSeleccion(op)}>
            <Text style={styles.optionText}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {feedback ? (
        <Text style={feedback === "¡Correcto!" ? styles.correct : styles.incorrect}>
          {feedback}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
    minHeight: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  audioSimulado: {
    fontSize: 32,
    marginBottom: 24,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  optionBtn: {
    backgroundColor: "#1976d2",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginHorizontal: 6,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  correct: {
    color: "#388e3c",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
  incorrect: {
    color: "#d32f2f",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
});
