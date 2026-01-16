import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRouter, useFocusEffect } from "expo-router";
import { alfabetos, imagenes } from "./indice";
import { Audio } from 'expo-av';

const aciertoAudio = require("../../assets/images/acierto.mp3");
const errorAudio = require("../../assets/images/error.mp3");

function shuffleArray(array: string[]): string[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function JuegoAlfabetoScreen() {
  const router = useRouter();
  const [nivel, setNivel] = useState(1);
  const [indicePalabra, setIndicePalabra] = useState(0);
  const [palabrasNivel, setPalabrasNivel] = useState<any[]>([]);
  const [letrasDesordenadas, setLetrasDesordenadas] = useState<string[]>([]);
  const [respuesta, setRespuesta] = useState<string[]>([]);
  const [tiempo, setTiempo] = useState(15);
  const [estadoRespuesta, setEstadoRespuesta] = useState<"correcto" | "incorrecto" | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reiniciar el juego cada vez que se entra a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      setNivel(1);
      setIndicePalabra(0);
      setEstadoRespuesta(null);
      setRespuesta([]);
      setTiempo(15);
      if (timerRef.current) clearTimeout(timerRef.current);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [])
  );

  // Inicializar palabras del nivel
  useEffect(() => {
    // Nivel 1: todas las palabras/letras del alfabeto
    if (nivel === 1) {
      setPalabrasNivel(alfabetos);
    } else {
      // Si tienes más niveles, puedes ajustar aquí
      setPalabrasNivel([]);
    }
    setIndicePalabra(0);
    setEstadoRespuesta(null);
    setRespuesta([]);
    setTiempo(15);
  }, [nivel]);

  // Inicializar letras desordenadas y resetear respuesta
  useEffect(() => {
    if (!palabrasNivel.length) return;
    const palabraActual = palabrasNivel[indicePalabra];
    if (!palabraActual) return;
    const letras = palabraActual.ejemplo.replace(/\s/g, "").split("");
    setLetrasDesordenadas(shuffleArray(letras));
    setRespuesta([]);
    setEstadoRespuesta(null);
    setTiempo(15);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [palabrasNivel, indicePalabra]);

  // Temporizador: solo corre si estadoRespuesta es null
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (estadoRespuesta !== null) return;
    if (tiempo === 0) {
      reproducirAudio(errorAudio);
      setEstadoRespuesta("incorrecto");
      // No redirigir automáticamente, solo mostrar el error
      return;
    }
    timerRef.current = setTimeout(() => {
      setTiempo((t) => t - 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tiempo, estadoRespuesta]);

  // Comprobar respuesta
  useEffect(() => {
    if (!palabrasNivel.length) return;
    if (estadoRespuesta !== null) return;
    const palabraActual = palabrasNivel[indicePalabra];
    if (!palabraActual) return;
    const palabraCorrecta = palabraActual.ejemplo.replace(/\s/g, "");
    if (respuesta.length === palabraCorrecta.length) {
      if (respuesta.join("") === palabraCorrecta) {
        reproducirAudio(aciertoAudio);
        setEstadoRespuesta("correcto");
      } else {
        reproducirAudio(errorAudio);
        setEstadoRespuesta("incorrecto");
        // No redirigir automáticamente, solo mostrar el error
      }
    }
  }, [respuesta, palabrasNivel, indicePalabra, estadoRespuesta]);

  const seleccionarLetra = (letra: string, idx: number) => {
    if (estadoRespuesta !== null) return;
    setRespuesta([...respuesta, letra]);
    setLetrasDesordenadas(letrasDesordenadas.filter((_, i) => i !== idx));
  };

  const reproducirAudio = async (audioFile: any) => {
    try {
      const { sound } = await Audio.Sound.createAsync(audioFile);
      await sound.playAsync();
      setTimeout(() => sound.unloadAsync(), 2000);
    } catch (e) {}
  };

  // Siguiente palabra: solo resetea estado y temporizador
  const handleSiguientePalabra = () => {
    setIndicePalabra((i) => i + 1);
    setEstadoRespuesta(null);
    setRespuesta([]);
    setTiempo(15);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (!palabrasNivel.length) return <Text>Cargando juego...</Text>;
  const palabraActual = palabrasNivel[indicePalabra];
  if (!palabraActual) return <Text>Letra no encontrada</Text>;
  const imagenSource = imagenes[palabraActual.imagen];

  // ¿Nivel completado?
  const nivelCompletado =
    indicePalabra === palabrasNivel.length - 1 && estadoRespuesta === "correcto";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/(tabs)/JuegosDeTareasScreen")}
        >
          <Ionicons name="arrow-back" size={28} color="#FFD700" />
        </TouchableOpacity>
      </View>
      <Text style={styles.timer}>{tiempo}s</Text>
      <Text style={{ fontSize: 18, marginBottom: 4 }}>
        Nivel: {nivel} | Palabra: {indicePalabra + 1}/{palabrasNivel.length}
      </Text>
      {imagenSource && <Image source={imagenSource} style={styles.imagen} resizeMode="contain" />}
      <View style={styles.letrasContainer}>
        {letrasDesordenadas.map((l, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.letraBtn}
            onPress={() => seleccionarLetra(l, idx)}
            disabled={estadoRespuesta !== null}
          >
            <Text style={styles.letraTxt}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.respuestaContainer}>
        {respuesta.map((l, idx) => (
          <View key={idx} style={styles.letraBtn}>
            <Text style={styles.letraTxt}>{l}</Text>
          </View>
        ))}
      </View>
      {estadoRespuesta === "correcto" && (
        <>
          <Text
            style={{
              color: "green",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            ¡Correcto!
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: 16,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            ¡Excelente trabajo! Has formado la palabra correctamente.
          </Text>
        </>
      )}
      {estadoRespuesta === "incorrecto" && (
        <>
          <Text
            style={{
              color: "red",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Incorrecto
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: 16,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            La respuesta correcta era: {palabraActual.ejemplo}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#000", borderWidth: 1, borderColor: "#FFD700" }]}
              onPress={() => {
                setEstadoRespuesta(null);
                setRespuesta([]);
                setTiempo(15);
                // Reordenar las letras para el nuevo intento
                const letras = palabraActual.ejemplo.replace(/\s/g, "").split("");
                setLetrasDesordenadas(shuffleArray(letras));
              }}
            >
              <Text style={[styles.buttonText, { color: "#FFD700" }]}>Intentar de nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#000", borderWidth: 1, borderColor: "#FFD700" }]}
              onPress={() => {
                setEstadoRespuesta(null);
                setRespuesta([]);
                setTiempo(15);
                handleSiguientePalabra();
              }}
            >
              <Text style={[styles.buttonText, { color: "#FFD700" }]}>Siguiente palabra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {nivelCompletado ? (
        <>
          <Text
            style={{
              color: "#388e3c",
              fontSize: 24,
              fontWeight: "bold",
              marginVertical: 12,
            }}
          >
            ¡Nivel completado!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#000", borderWidth: 1, borderColor: "#FFD700" }]}
              onPress={() => setNivel((n) => n + 1)}
            >
              <Text style={[styles.buttonText, { color: "#FFD700" }]}>Siguiente nivel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#000", borderWidth: 1, borderColor: "#FFD700" }]}
              onPress={() => router.replace("/(tabs)/JuegosDeTareasScreen")}
            >
              <Text style={[styles.buttonText, { color: "#FFD700" }]}>Volver a juegos</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {estadoRespuesta === "correcto" && indicePalabra < palabrasNivel.length - 1 && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#000", borderWidth: 1, borderColor: "#FFD700", alignSelf: "center" }]}
              onPress={handleSiguientePalabra}
            >
              <Text style={[styles.buttonText, { color: "#FFD700" }]}>Siguiente palabra</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      
      {/* Botón para salir del juego en cualquier momento */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 60,
          right: 20,
          backgroundColor: "#000",
          borderWidth: 1,
          borderColor: "#FFD700",
          padding: 8,
          borderRadius: 20,
        }}
        onPress={() => router.replace("/(tabs)/JuegosDeTareasScreen")}
      >
        <Ionicons name="close" size={24} color="#FFD700" />
      </TouchableOpacity>
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
    padding: 24,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 8,
  },
  imagen: {
    width: 180,
    height: 180,
    marginVertical: 16,
  },
  letrasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
    justifyContent: "center",
  },
  respuestaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
    minHeight: 40,
    justifyContent: "center",
  },
  letraBtn: {
    backgroundColor: "#e3e3e3",
    borderRadius: 8,
    padding: 12,
    margin: 4,
    minWidth: 36,
    alignItems: "center",
  },
  letraTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
