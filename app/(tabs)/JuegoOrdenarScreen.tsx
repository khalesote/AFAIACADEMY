import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Definición de palabras por nivel (cada nivel tiene 20 palabras, cada vez más largas)
const niveles = [
  // Nivel 1: palabras cortas (4 letras)
  [
    "CASA",
    "LUNA",
    "ROSA",
    "CAMA",
    "MESA",
    "SOL",
    "PERA",
    "GATO",
    "PATO",
    "RANA",
    "NUBE",
    "DADO",
    "BESO",
    "CINE",
    "FARO",
    "JUGO",
    "LEON",
    "MOTO",
    "OSO",
    "RUTA",
  ],
  // Nivel 2: palabras de 5 letras
  [
    "PLUMA",
    "FLORO",
    "SALSA",
    "NIEVE",
    "MANGO",
    "LIBRO",
    "SILLA",
    "RATON",
    "ARBOL",
    "PIANO",
    "QUESO",
    "TIGRE",
    "BOLSA",
    "CAMPO",
    "FRESA",
    "GRANO",
    "HUEVO",
    "JUEGO",
    "LAPIZ",
    "MONTA",
  ],
  // Nivel 3: palabras de 6 letras
  [
    "ESCUDO",
    "BOTELLA",
    "CEREZA",
    "DURAZO",
    "FANTAS",
    "GALLINA",
    "HELADO",
    "IGLESI",
    "JARDIN",
    "KILOSO",
    "LENTES",
    "MANZAN",
    "NARIZO",
    "OREJAS",
    "PALOMA",
    "QUESOS",
    "RATONA",
    "SABANA",
    "TOMATE",
    "UNIDOS",
  ],
  // Nivel 4: palabras de 7 letras
  [
    "ANIMALO",
    "BANDERA",
    "CASCADA",
    "DESAYUN",
    "ESCUELA",
    "FAMILIA",
    "GIRASOL",
    "HORMIGA",
    "IMAGEN",
    "JUGADOR",
    "KILOMET",
    "LADRILLO",
    "MARTILLO",
    "NATILLA",
    "OPINION",
    "PANTALL",
    "QUIMICA",
    "REFRIGO",
    "SANDIAS",
    "TERRAZA",
  ],
  // Nivel 5: palabras de 8 letras o más
  [
    "ALEGRIAS",
    "BIBLIOTE",
    "CAMPANAS",
    "DIFICULT",
    "EDIFICIO",
    "FOTOGRAF",
    "GIGANTES",
    "HERRAMIE",
    "INVIERNO",
    "JARDINES",
    "KILOGRAM",
    "LIMONADA",
    "MISTERIO",
    "NAVEGADO",
    "ORQUESTA",
    "PREGUNTA",
    "QUIMICOS",
    "RELOJERO",
    "SOMBRERO",
    "TRAVESIA",
  ],
];

// Devuelve una copia mezclada del array
function mezclar(arr: string[]) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

export default function JuegoOrdenarScreen() {
  const router = useRouter();
  // Estados para nivel y palabra actual
  const [nivel, setNivel] = useState(0); // 0 = primer nivel
  const [indicePalabra, setIndicePalabra] = useState(0);
  const [letras, setLetras] = useState(() => mezclar(niveles[0][0].split("")));
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [completado, setCompletado] = useState(false);

  // Palabra actual del nivel
  const palabraActual = niveles[nivel][indicePalabra];

  // Cuando cambia el nivel o palabra, reinicia letras y selección
  React.useEffect(() => {
    setSeleccion([]);
    setLetras(mezclar(palabraActual.split("")));
    setFeedback("");
    setCompletado(false);
  }, [nivel, indicePalabra]);

  const handleLetra = (l: string, idx: number) => {
    setSeleccion([...seleccion, l]);
    setLetras(letras.filter((_, i) => i !== idx));
  };

  React.useEffect(() => {
    if (seleccion.length === palabraActual.length) {
      if (seleccion.join("") === palabraActual) {
        setFeedback("¡Correcto!");
        setCompletado(true);
        setTimeout(() => {
          if (indicePalabra < niveles[nivel].length - 1) {
            setIndicePalabra(indicePalabra + 1);
          } else if (nivel < niveles.length - 1) {
            setNivel(nivel + 1);
            setIndicePalabra(0);
          } else {
            // Juego completado
            setFeedback("¡Completaste todos los niveles!");
          }
        }, 1000);
      } else {
        setFeedback("Intenta de nuevo");
        setTimeout(() => {
          setSeleccion([]);
          setLetras(mezclar(palabraActual.split("")));
          setFeedback("");
        }, 1000);
      }
    }
  }, [seleccion]);

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
      <Text style={styles.title}>
        Nivel {nivel + 1} - Palabra {indicePalabra + 1}/20
      </Text>
      <Text style={styles.title}>Ordena las letras para formar la palabra:</Text>
      <View style={styles.letrasRow}>
        {letras.map((l, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.letraBtn}
            onPress={() => handleLetra(l, idx)}
            disabled={completado}
          >
            <Text style={styles.letraTxt}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.letrasRow}>
        {seleccion.map((l, idx) => (
          <View key={idx} style={styles.letraBtnSel}>
            <Text style={styles.letraTxt}>{l}</Text>
          </View>
        ))}
      </View>
      {feedback ? (
        <Text style={feedback === "¡Correcto!" ? styles.correct : styles.incorrect}>
          {feedback}
        </Text>
      ) : null}
      <Text style={{ marginTop: 20 }}>
        Las palabras se vuelven más largas y difíciles en cada nivel.
      </Text>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  letrasRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  letraBtn: {
    backgroundColor: "#90caf9",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  letraBtnSel: {
    backgroundColor: "#ffb74d",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  letraTxt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
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
