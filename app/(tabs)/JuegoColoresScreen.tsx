import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const COLORS = [
  { name: "Rojo", value: "#e74c3c" },
  { name: "Verde", value: "#27ae60" },
  { name: "Azul", value: "#2980b9" },
  { name: "Amarillo", value: "#f1c40f" },
  { name: "Naranja", value: "#e67e22" },
  { name: "Morado", value: "#8e44ad" },
  { name: "Rosa", value: "#fd79a8" },
  { name: "Marrón", value: "#8d5524" },
  { name: "Negro", value: "#222" },
  { name: "Blanco", value: "#fff", border: true },
  { name: "Celeste", value: "#00bcd4" },
  { name: "Turquesa", value: "#1abc9c" },
  { name: "Gris", value: "#7f8c8d" },
  { name: "Beige", value: "#f5e6ca" },
  { name: "Dorado", value: "#ffd700" },
  { name: "Plateado", value: "#c0c0c0" },
  { name: "Violeta", value: "#9b59b6" },
  { name: "Coral", value: "#ff7f50" },
  { name: "Verde Lima", value: "#bfff00" },
  { name: "Azul Marino", value: "#001f3f" },
  { name: "Granate", value: "#800000" },
  { name: "Mostaza", value: "#ffdb58" },
  { name: "Fucsia", value: "#e84393" },
  { name: "Lavanda", value: "#b57edc" },
  { name: "Cian", value: "#00ffff" },
  { name: "Verde Oliva", value: "#808000" },
  { name: "Azul Claro", value: "#add8e6" },
  { name: "Verde Pastel", value: "#77dd77" },
  { name: "Rojo Vino", value: "#b11226" },
  { name: "Azul Acero", value: "#4682b4" },
  { name: "Terracota", value: "#e2725b" },
  { name: "Chocolate", value: "#7b3f00" },
  { name: "Salmon", value: "#fa8072" },
  { name: "Marfil", value: "#fffff0" },
  { name: "Verde Esmeralda", value: "#50c878" },
  { name: "Azul Cobalto", value: "#0047ab" },
  { name: "Magenta", value: "#ff00ff" },
  { name: "Azul Petróleo", value: "#084c61" },
  { name: "Arena", value: "#f4e2d8" },
  { name: "Verde Menta", value: "#98ff98" },
];

function getRandomColorIndex() {
  return Math.floor(Math.random() * COLORS.length);
}

const JuegoColoresScreen = () => {
  const router = useRouter();
  const [targetIdx, setTargetIdx] = useState(getRandomColorIndex());
  const [options, setOptions] = useState(() => {
    const arr = [targetIdx];
    while (arr.length < 4) {
      const idx = getRandomColorIndex();
      if (!arr.includes(idx)) arr.push(idx);
    }
    return arr.sort(() => Math.random() - 0.5);
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const MAX_SCORE = 10;

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === targetIdx) {
      setFeedback("¡Correcto!");
      if (score + 1 >= MAX_SCORE) {
        setTimeout(() => {
          setCompleted(true);
        }, 800);
      } else {
        setTimeout(() => {
          setScore((s) => s + 1);
          nextRound();
        }, 800);
      }
    } else {
      setFeedback("Intenta de nuevo");
      setTimeout(() => {
        setScore(0);
        setCompleted(false);
        nextRound();
      }, 1200);
    }
  };

  const nextRound = () => {
    const newTarget = getRandomColorIndex();
    setTargetIdx(newTarget);
    const arr = [newTarget];
    while (arr.length < 4) {
      const idx = getRandomColorIndex();
      if (!arr.includes(idx)) arr.push(idx);
    }
    setOptions(arr.sort(() => Math.random() - 0.5));
    setSelected(null);
    setFeedback(null);
  };

  const restartGame = () => {
    setScore(0);
    setCompleted(false);
    nextRound();
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
      {completed ? (
        <>
          <Text style={styles.title}>¡Juego completado!</Text>
          <Text style={styles.feedback}>Aciertos seguidos: {MAX_SCORE}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={restartGame}>
            <Text style={styles.nextButtonText}>Jugar de nuevo</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Selecciona el color:{" "}
            <Text style={{ fontWeight: "bold" }}>{COLORS[targetIdx].name}</Text>
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Aciertos seguidos: {score} / {MAX_SCORE}
          </Text>
          <View style={styles.optionsRow}>
            {options.map((idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.colorButton,
                  {
                    backgroundColor: COLORS[idx].value,
                    borderColor: COLORS[idx].border ? "#222" : COLORS[idx].value,
                  },
                  selected === idx &&
                    idx === targetIdx && {
                      borderWidth: 4,
                      borderColor: "#27ae60",
                    },
                  selected === idx &&
                    idx !== targetIdx && {
                      borderWidth: 4,
                      borderColor: "#e74c3c",
                    },
                ]}
                onPress={() => handleSelect(idx)}
                disabled={selected !== null}
              />
            ))}
          </View>
          {feedback && (
            <Text
              style={[
                styles.feedback,
                feedback === "¡Correcto!" ? styles.correct : styles.incorrect,
              ]}
            >
              {feedback}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#2c3e50",
    textAlign: "center",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
    gap: 16,
  },
  colorButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    elevation: 2,
  },
  feedback: {
    fontSize: 20,
    marginTop: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  correct: {
    color: "#27ae60",
  },
  incorrect: {
    color: "#e74c3c",
  },
  nextButton: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 20,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
});

export default JuegoColoresScreen;
