import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const cartasBase = [
  { id: 1, texto: "🐱" },
  { id: 2, texto: "🐶" },
];
const cartas = [...cartasBase, ...cartasBase].sort(() => Math.random() - 0.5);

export default function JuegoMemoriaScreen() {
  const router = useRouter();
  const [abiertas, setAbiertas] = useState<number[]>([]);
  const [encontradas, setEncontradas] = useState<number[]>([]);
  const [bloqueado, setBloqueado] = useState(false);

  const handleCarta = (idx: number) => {
    if (bloqueado || abiertas.includes(idx) || encontradas.includes(cartas[idx].id)) return;
    const nuevas = [...abiertas, idx];
    setAbiertas(nuevas);
    if (nuevas.length === 2) {
      setBloqueado(true);
      setTimeout(() => {
        if (cartas[nuevas[0]].id === cartas[nuevas[1]].id) {
          setEncontradas((prev) => [...prev, cartas[nuevas[0]].id]);
        }
        setAbiertas([]);
        setBloqueado(false);
      }, 800);
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
      <Text style={styles.title}>Juego de Memoria</Text>
      <View style={styles.cartasRow}>
        {cartas.map((c, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.carta,
              abiertas.includes(idx) || encontradas.includes(c.id) ? styles.cartaAbierta : null,
            ]}
            onPress={() => handleCarta(idx)}
            disabled={abiertas.includes(idx) || encontradas.includes(c.id)}
          >
            <Text style={styles.cartaTexto}>
              {abiertas.includes(idx) || encontradas.includes(c.id) ? c.texto : "?"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {encontradas.length === cartasBase.length && <Text style={styles.correct}>¡Completado!</Text>}
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
  cartasRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  carta: {
    width: 54,
    height: 54,
    backgroundColor: "#bbb",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  cartaAbierta: {
    backgroundColor: "#fff176",
  },
  cartaTexto: {
    fontSize: 28,
    fontWeight: "bold",
  },
  correct: {
    color: "#388e3c",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
});
