import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Speech from "expo-speech";
import { alfabetos } from "./indice";
import { categorias } from "./SituacionesScreen";
import { OBJETOS } from "./DialogoScreen";
import { useRouter } from "expo-router";
import { Audio } from 'expo-av';

// Generar pares mezclados para el juego
// Mezcla pares de vocabulario de situaciones y objetos
type Categoria = {
  key: string;
  es: string;
  ar: string;
  icon: string;
  color: string;
};
type Objeto = {
  es: string;
  ar: string;
  icon: string;
  color: string;
  iconLib?: "Ionicons" | "MaterialCommunityIcons";
};
type Par = {
  tipo:
    | "situacion"
    | "objeto"
    | "vocab"
    | "gram"
    | "cultura"
    | "ciencia"
    | "avanzado"
    | "emocion"
    | "medioambiente"
    | "sociedad"
    | "filosofia";
  es: string;
  ar: string;
  id: string;
};
type Tarjeta = { tipo: "es" | "ar"; valor: string; id: string };

// Pares por nivel (puedes personalizar las palabras)
const PARES_NIVELES: Par[][] = [
  // Nivel 1: Vocabulario básico
  [
    { tipo: "vocab", es: "Casa", ar: "بيت", id: "nv1-casa" },
    { tipo: "vocab", es: "Libro", ar: "كتاب", id: "nv1-libro" },
    { tipo: "vocab", es: "Mesa", ar: "طاولة", id: "nv1-mesa" },
    { tipo: "vocab", es: "Niño", ar: "ولد", id: "nv1-nino" },
    { tipo: "vocab", es: "Agua", ar: "ماء", id: "nv1-agua" },
  ],
  // Nivel 2: Gramática (adjetivos, verbos)
  [
    { tipo: "gram", es: "Grande", ar: "كبير", id: "nv2-grande" },
    { tipo: "gram", es: "Pequeño", ar: "صغير", id: "nv2-pequeno" },
    { tipo: "gram", es: "Rápido", ar: "سريع", id: "nv2-rapido" },
    { tipo: "gram", es: "Hablar", ar: "يتكلم", id: "nv2-hablar" },
    { tipo: "gram", es: "Comer", ar: "يأكل", id: "nv2-comer" },
  ],
  // Nivel 3: Cultura general
  [
    { tipo: "cultura", es: "España", ar: "إسبانيا", id: "nv3-espana" },
    { tipo: "cultura", es: "Madrid", ar: "مدريد", id: "nv3-madrid" },
    { tipo: "cultura", es: "Museo", ar: "متحف", id: "nv3-museo" },
    { tipo: "cultura", es: "Fiesta", ar: "حفلة", id: "nv3-fiesta" },
    { tipo: "cultura", es: "Teatro", ar: "مسرح", id: "nv3-teatro" },
  ],
  // Nivel 4: Situaciones cotidianas
  [
    { tipo: "situacion", es: "Mercado", ar: "سوق", id: "nv4-mercado" },
    { tipo: "situacion", es: "Escuela", ar: "مدرسة", id: "nv4-escuela" },
    { tipo: "situacion", es: "Hospital", ar: "مستشفى", id: "nv4-hospital" },
    { tipo: "situacion", es: "Banco", ar: "بنك", id: "nv4-banco" },
    { tipo: "situacion", es: "Restaurante", ar: "مطعم", id: "nv4-restaurante" },
  ],
  // Nivel 5: Vocabulario avanzado
  [
    { tipo: "avanzado", es: "Desafío", ar: "تحدي", id: "nv5-desafio" },
    { tipo: "avanzado", es: "Aprendizaje", ar: "تعلم", id: "nv5-aprendizaje" },
    { tipo: "avanzado", es: "Cultura", ar: "ثقافة", id: "nv5-cultura" },
    { tipo: "avanzado", es: "Motivación", ar: "دافع", id: "nv5-motivacion" },
    { tipo: "avanzado", es: "Éxito", ar: "نجاح", id: "nv5-exito" },
  ],
  // Nivel 6: Ciencia y tecnología
  [
    { tipo: "ciencia", es: "Microscopio", ar: "مجهر", id: "nv6-microscopio" },
    { tipo: "ciencia", es: "Energía", ar: "طاقة", id: "nv6-energia" },
    { tipo: "ciencia", es: "Robótica", ar: "روبوتات", id: "nv6-robotica" },
    { tipo: "ciencia", es: "Genética", ar: "علم الوراثة", id: "nv6-genetica" },
    {
      tipo: "ciencia",
      es: "Nanotecnología",
      ar: "تقنية النانو",
      id: "nv6-nanotecnologia",
    },
  ],
  // Nivel 7: Emociones y sentimientos
  [
    { tipo: "emocion", es: "Esperanza", ar: "أمل", id: "nv7-esperanza" },
    { tipo: "emocion", es: "Ansiedad", ar: "قلق", id: "nv7-ansiedad" },
    { tipo: "emocion", es: "Orgullo", ar: "فخر", id: "nv7-orgullo" },
    { tipo: "emocion", es: "Vergüenza", ar: "خجل", id: "nv7-verguenza" },
    { tipo: "emocion", es: "Empatía", ar: "تعاطف", id: "nv7-empatia" },
  ],
  // Nivel 8: Medio ambiente y naturaleza
  [
    {
      tipo: "medioambiente",
      es: "Biodiversidad",
      ar: "تنوع بيولوجي",
      id: "nv8-biodiversidad",
    },
    { tipo: "medioambiente", es: "Desierto", ar: "صحراء", id: "nv8-desierto" },
    {
      tipo: "medioambiente",
      es: "Ecosistema",
      ar: "نظام بيئي",
      id: "nv8-ecosistema",
    },
    {
      tipo: "medioambiente",
      es: "Sostenibilidad",
      ar: "استدامة",
      id: "nv8-sostenibilidad",
    },
    {
      tipo: "medioambiente",
      es: "Reciclaje",
      ar: "تدوير",
      id: "nv8-reciclaje",
    },
  ],
  // Nivel 9: Sociedad y política
  [
    {
      tipo: "sociedad",
      es: "Democracia",
      ar: "ديمقراطية",
      id: "nv9-democracia",
    },
    { tipo: "sociedad", es: "Justicia", ar: "عدالة", id: "nv9-justicia" },
    { tipo: "sociedad", es: "Derechos", ar: "حقوق", id: "nv9-derechos" },
    { tipo: "sociedad", es: "Libertad", ar: "حرية", id: "nv9-libertad" },
    { tipo: "sociedad", es: "Igualdad", ar: "مساواة", id: "nv9-igualdad" },
  ],
  // Nivel 10: Filosofía y valores
  [
    { tipo: "filosofia", es: "Ética", ar: "أخلاق", id: "nv10-etica" },
    { tipo: "filosofia", es: "Sabiduría", ar: "حكمة", id: "nv10-sabiduria" },
    { tipo: "filosofia", es: "Existencia", ar: "وجود", id: "nv10-existencia" },
    { tipo: "filosofia", es: "Conciencia", ar: "وعي", id: "nv10-conciencia" },
    { tipo: "filosofia", es: "Virtud", ar: "فضيلة", id: "nv10-virtud" },
  ],
];

function mezclarParesNivel(nivel: number): Tarjeta[] {
  const pares = PARES_NIVELES[nivel] || [];
  const seleccion = pares.sort(() => Math.random() - 0.5); // Mezclar
  const tarjetasEs: Tarjeta[] = seleccion.map((p: Par) => ({
    tipo: "es",
    valor: p.es,
    id: p.id,
  }));
  const tarjetasAr: Tarjeta[] = seleccion.map((p: Par) => ({
    tipo: "ar",
    valor: p.ar,
    id: p.id,
  }));
  const tarjetas: Tarjeta[] = [...tarjetasEs, ...tarjetasAr].sort(() => Math.random() - 0.5);
  return tarjetas;
}

function mezclarPares(): Tarjeta[] {
  // 1. Extraer pares de situaciones corrientes
  const situacionesPares: Par[] = categorias.map((cat: Categoria) => ({
    tipo: "situacion",
    es: cat.es,
    ar: cat.ar,
    id: "sit-" + cat.key,
  }));

  // 2. Extraer pares de objetos y herramientas
  const objetosPares: Par[] = [];
  Object.keys(OBJETOS).forEach((key: string) => {
    OBJETOS[key].forEach((obj: Objeto) => {
      objetosPares.push({
        tipo: "objeto",
        es: obj.es,
        ar: obj.ar,
        id: "obj-" + key + "-" + obj.es,
      });
    });
  });

  // 3. Unir y seleccionar aleatoriamente hasta 10 pares (puedes ajustar este número)
  const todosPares: Par[] = [...situacionesPares, ...objetosPares];
  const seleccion: Par[] = todosPares.sort(() => Math.random() - 0.5).slice(0, 10);

  // 4. Crear tarjetas: una por español, una por árabe
  const tarjetasEs: Tarjeta[] = seleccion.map((p: Par) => ({
    tipo: "es",
    valor: p.es,
    id: p.id,
  }));
  const tarjetasAr: Tarjeta[] = seleccion.map((p: Par) => ({
    tipo: "ar",
    valor: p.ar,
    id: p.id,
  }));
  const tarjetas: Tarjeta[] = [...tarjetasEs, ...tarjetasAr].sort(() => Math.random() - 0.5);
  return tarjetas;
}

export default function JuegoEmparejarScreen() {
  const [nivel, setNivel] = useState(0); // Nivel actual (0-4)
  const [preview, setPreview] = useState(true);
  const router = useRouter();
  const [tarjetas, setTarjetas] = useState(() => mezclarParesNivel(0));
  React.useEffect(() => {
    setPreview(true);
    const timer = setTimeout(() => setPreview(false), 2000);
    return () => clearTimeout(timer);
  }, [nivel]);

  const [seleccionadas, setSeleccionadas] = useState<any[]>([]);
  const [acertadas, setAcertadas] = useState<string[]>([]);
  const [intentos, setIntentos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const handleSeleccion = (tarjeta: Tarjeta, idx: number) => {
    if (acertadas.includes(tarjeta.id) || seleccionadas.some((s: any) => s.idx === idx)) return;
    const nuevas = [...seleccionadas, { ...tarjeta, idx }];
    setSeleccionadas(nuevas);
    if (nuevas.length === 2) {
      setIntentos(intentos + 1);
      if (nuevas[0].id === nuevas[1].id && nuevas[0].tipo !== nuevas[1].tipo) {
        // Sonido de acierto
        Audio.Sound.createAsync(require("../../assets/images/acierto.mp3"), {
          shouldPlay: true,
        });
        setTimeout(() => {
          setAcertadas([...acertadas, nuevas[0].id]);
          setSeleccionadas([]);
        }, 600);
      } else {
        setTimeout(() => setSeleccionadas([]), 900);
      }
    }
  };

  const reiniciar = () => {
    setNivel(0);
    setTarjetas(mezclarParesNivel(0));
    setSeleccionadas([]);
    setAcertadas([]);
    setIntentos(0);
    setFinalizado(false);
  };

  const siguienteNivel = () => {
    if (nivel < PARES_NIVELES.length - 1) {
      setNivel(nivel + 1);
      setTarjetas(mezclarParesNivel(nivel + 1));
      setSeleccionadas([]);
      setAcertadas([]);
      setIntentos(0);
    } else {
      setFinalizado(true);
    }
  };

  const completado = acertadas.length === tarjetas.length / 2;

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
      alignItems: "center",
      paddingVertical: 24,
      backgroundColor: "#fff",
      minHeight: "100%",
    },
    titulo: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#1976d2",
      marginBottom: 10,
    },
    subtitulo: {
      fontSize: 18,
      color: "#333",
      marginBottom: 18,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 20,
      gap: 8,
    },
    carta: {
      width: 90,
      height: 60,
      backgroundColor: "#e3e3e3",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      margin: 6,
      elevation: 2,
    },
    cartaActiva: {
      backgroundColor: "#ffd600",
    },
    textoCarta: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#333",
    },
    intentos: {
      fontSize: 18,
      color: "#d32f2f",
      marginVertical: 10,
    },
    completado: {
      fontSize: 24,
      color: "#388e3c",
      fontWeight: "bold",
      marginBottom: 8,
    },
    botonReiniciar: {
      backgroundColor: "#1976d2",
      borderRadius: 8,
      paddingHorizontal: 18,
      paddingVertical: 10,
      marginBottom: 10,
    },
    textoBoton: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    },
    botonSalir: {
      backgroundColor: "#d32f2f",
      borderRadius: 8,
      paddingHorizontal: 18,
      paddingVertical: 10,
    },
    textoBotonSalir: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    },
  });

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
      <Text style={styles.titulo}>Nivel {nivel + 1} / 5</Text>
      <View style={styles.grid}>
        {tarjetas.map((tarjeta: Tarjeta, idx: number) => {
          const acertada = acertadas.includes(tarjeta.id);
          const seleccionada = seleccionadas.some((s: any) => s.idx === idx);
          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.carta,
                acertada
                  ? { backgroundColor: "#43a047" }
                  : seleccionada
                    ? styles.cartaActiva
                    : null,
              ]}
              onPress={() => {
                handleSeleccion(tarjeta, idx);
                // Leer en voz alta al tocar
                const lang = tarjeta.tipo === "ar" ? "ar" : "es";
                Speech.speak(tarjeta.valor, { language: lang });
              }}
              disabled={seleccionada || acertada || seleccionadas.length === 2}
            >
              <Text style={styles.textoCarta}>{tarjeta.valor}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.intentos}>Intentos: {intentos}</Text>
      {completado && !finalizado && (
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Text style={styles.completado}>¡Nivel completado!</Text>
          <TouchableOpacity style={styles.botonReiniciar} onPress={siguienteNivel}>
            <Text style={styles.textoBoton}>Siguiente nivel</Text>
          </TouchableOpacity>
        </View>
      )}
      {finalizado && (
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Text style={styles.completado}>¡Juego completado!</Text>
          <TouchableOpacity style={styles.botonReiniciar} onPress={reiniciar}>
            <Text style={styles.textoBoton}>Jugar de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonSalir}
            onPress={() => router.replace("/(tabs)/JuegosDeTareasScreen")}
          >
            <Text style={styles.textoBotonSalir}>Volver a juegos</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Exportar para uso en otros archivos
export { mezclarPares };

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
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: "#333",
    marginBottom: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  carta: {
    width: 90,
    height: 60,
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    elevation: 2,
  },
  cartaActiva: {
    backgroundColor: "#ffd600",
  },
  textoCarta: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  intentos: {
    fontSize: 18,
    color: "#d32f2f",
    marginVertical: 10,
  },
  completado: {
    fontSize: 24,
    color: "#388e3c",
    fontWeight: "bold",
    marginBottom: 8,
  },
  botonReiniciar: {
    backgroundColor: "#1976d2",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 10,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  botonSalir: {
    backgroundColor: "#d32f2f",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  textoBotonSalir: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
