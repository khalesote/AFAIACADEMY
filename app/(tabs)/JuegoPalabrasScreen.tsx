import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Pregunta = {
  tipo: "vocab" | "gram";
  texto: string;
  opciones: string[];
  respuesta: string;
};

const preguntas: Pregunta[] = [
  // Vocabulario básico
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Casa"?',
    opciones: ["بيت", "مدرسة", "شجرة"],
    respuesta: "بيت",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Escuela"?',
    opciones: ["شجرة", "مدرسة", "قلم"],
    respuesta: "مدرسة",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Libro"?',
    opciones: ["قلم", "كتاب", "ولد"],
    respuesta: "كتاب",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Niño"?',
    opciones: ["ولد", "بنت", "بيت"],
    respuesta: "ولد",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Niña"?',
    opciones: ["ولد", "بنت", "شجرة"],
    respuesta: "بنت",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Árbol"?',
    opciones: ["مدرسة", "شجرة", "بيت"],
    respuesta: "شجرة",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Pluma"?',
    opciones: ["قلم", "كتاب", "ولد"],
    respuesta: "قلم",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Mesa"?',
    opciones: ["كرسي", "طاولة", "باب"],
    respuesta: "طاولة",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Silla"?',
    opciones: ["كرسي", "نافذة", "قلم"],
    respuesta: "كرسي",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "Ventana"?',
    opciones: ["باب", "نافذة", "بيت"],
    respuesta: "نافذة",
  },

  // Gramática: artículos y género
  {
    tipo: "gram",
    texto: '¿Cómo se escribe "la casa" en árabe?',
    opciones: ["البيت", "المدرسة", "الشجرة"],
    respuesta: "البيت",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se escribe "el libro" en árabe?',
    opciones: ["الكتاب", "القلم", "الولد"],
    respuesta: "الكتاب",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se escribe "la niña" en árabe?',
    opciones: ["البنت", "الولد", "الشجرة"],
    respuesta: "البنت",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se escribe "la escuela" en árabe?',
    opciones: ["المدرسة", "الشجرة", "البيت"],
    respuesta: "المدرسة",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se escribe "el árbol" en árabe?',
    opciones: ["المدرسة", "الشجرة", "البيت"],
    respuesta: "الشجرة",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el artículo definido en español para "casa"?',
    opciones: ["El", "La", "Los"],
    respuesta: "La",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el artículo definido en español para "libro"?',
    opciones: ["El", "La", "Las"],
    respuesta: "El",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el plural de "la casa" en español?',
    opciones: ["las casas", "los casas", "las casa"],
    respuesta: "las casas",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el plural de "el árbol" en español?',
    opciones: ["los árboles", "las árboles", "los árbol"],
    respuesta: "los árboles",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el plural de "el libro" en español?',
    opciones: ["los libros", "las libros", "los libro"],
    respuesta: "los libros",
  },

  // Pronombres personales
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "yo"?',
    opciones: ["أنا", "أنت", "هو"],
    respuesta: "أنا",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "tú (masculino)"?',
    opciones: ["هي", "أنت", "نحن"],
    respuesta: "أنت",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "él"?',
    opciones: ["هو", "هي", "أنتم"],
    respuesta: "هو",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "ella"?',
    opciones: ["هو", "هي", "أنتم"],
    respuesta: "هي",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "nosotros"?',
    opciones: ["أنتم", "نحن", "هم"],
    respuesta: "نحن",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "vosotros"?',
    opciones: ["أنتم", "نحن", "هم"],
    respuesta: "أنتم",
  },
  {
    tipo: "vocab",
    texto: '¿Cuál es la traducción de "ellos"?',
    opciones: ["هم", "أنتم", "نحن"],
    respuesta: "هم",
  },

  // Gramática: concordancia y uso
  {
    tipo: "gram",
    texto: '¿Qué pronombre corresponde a "ella" en árabe?',
    opciones: ["هو", "هي", "هم"],
    respuesta: "هي",
  },
  {
    tipo: "gram",
    texto: '¿Qué pronombre corresponde a "nosotros" en árabe?',
    opciones: ["أنتم", "نحن", "هم"],
    respuesta: "نحن",
  },
  {
    tipo: "gram",
    texto: '¿Qué pronombre corresponde a "ellos" en árabe?',
    opciones: ["هم", "هو", "هي"],
    respuesta: "هم",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se dice "mi casa" en árabe?',
    opciones: ["بيتي", "بيتك", "بيتنا"],
    respuesta: "بيتي",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se dice "nuestra escuela" en árabe?',
    opciones: ["مدرستنا", "مدرستي", "مدرستكم"],
    respuesta: "مدرستنا",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se dice "su libro" (de él) en árabe?',
    opciones: ["كتابه", "كتابي", "كتابنا"],
    respuesta: "كتابه",
  },
  {
    tipo: "gram",
    texto: '¿Cómo se dice "su casa" (de ella) en árabe?',
    opciones: ["بيتها", "بيته", "بيتي"],
    respuesta: "بيتها",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el femenino de "niño" en español?',
    opciones: ["niña", "niños", "niñas"],
    respuesta: "niña",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el masculino de "niña" en español?',
    opciones: ["niño", "niñas", "niños"],
    respuesta: "niño",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el plural de "la niña" en español?',
    opciones: ["las niñas", "los niñas", "las niña"],
    respuesta: "las niñas",
  },
  {
    tipo: "gram",
    texto: '¿Cuál es el plural de "el niño" en español?',
    opciones: ["los niños", "las niños", "los niño"],
    respuesta: "los niños",
  },
];

export default function JuegoPalabrasScreen() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  const preguntaActual = preguntas[indice];

  const handleRespuesta = (opcion: string) => {
    if (opcion === preguntaActual.respuesta) {
      setScore(score + 1);
      setFeedback("¡Correcto!");
      setTimeout(() => {
        setFeedback("");
        if (indice === preguntas.length - 1) {
          setFinalizado(true);
        } else {
          setIndice(indice + 1);
        }
      }, 700);
    } else {
      setFeedback("Incorrecto. Intenta otra vez.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)/JuegosDeTareasScreen")}
        >
          <Ionicons name="arrow-back" size={28} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Juego de Palabras - Nivel 1</Text>
      </View>
      <Text style={{ fontSize: 16, color: "#555", marginBottom: 16 }}>
        Traducción y gramática entre español y árabe
      </Text>
      {!finalizado && (
        <View style={styles.quizBox}>
          <Text style={styles.question}>{preguntaActual.texto}</Text>
          {preguntaActual.opciones.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.optionButton}
              onPress={() => handleRespuesta(opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
          {feedback ? (
            <Text style={feedback === "¡Correcto!" ? styles.correct : styles.incorrect}>
              {feedback}
            </Text>
          ) : null}
        </View>
      )}
      {finalizado && (
        <View style={styles.quizBox}>
          <Text style={styles.finalText}>¡Felicidades! Has completado el nivel 1 🎉</Text>
          <Text style={styles.finalScore}>
            Puntuación: {score}/{preguntas.length}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#222",
  },
  quizBox: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#333",
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 14,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  correct: {
    color: "#388e3c",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  incorrect: {
    color: "#d32f2f",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  finalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    textAlign: "center",
  },
  finalScore: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "bold",
    textAlign: "center",
  },
});
