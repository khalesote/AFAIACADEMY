import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

type Juego = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const juegos: Juego[] = [
  {
    key: "alfabeto",
    label: "Juego de Letras",
    icon: "text",
  },
  {
    key: "escritura",
    label: "Aprende a Escribir",
    icon: "create",
  },
  {
    key: "emparejar",
    label: "Juego de Emparejar",
    icon: "git-compare",
  },
  {
    key: "palabras",
    label: "Juego de Palabras",
    icon: "chatbubbles",
  },
  {
    key: "colores",
    label: "Juego de Colores",
    icon: "color-palette",
  },
];



type JuegoRoute =
  | "/(tabs)/AdjetivosScreen"
  | "/(tabs)/VerbosScreen"
  | "/(tabs)/AprendeEscribirScreen"
  | "/(tabs)/JuegoAlfabetoScreen"
  | "/(tabs)/JuegoEmparejarScreen"
  | "/(tabs)/JuegoPalabrasScreen"
  | "/(tabs)/JuegoOrdenarScreen"
  | "/(tabs)/JuegoAudioScreen"
  | "/(tabs)/JuegoColoresScreen";
const juegoKeyToRoute: Record<string, JuegoRoute> = {
  adjetivos: "/(tabs)/AdjetivosScreen",
  verbos: "/(tabs)/VerbosScreen",
  alfabeto: "/(tabs)/JuegoAlfabetoScreen",
  escritura: "/(tabs)/AprendeEscribirScreen",
  emparejar: "/(tabs)/JuegoEmparejarScreen",
  palabras: "/(tabs)/JuegoPalabrasScreen",
  ordenar: "/(tabs)/JuegoOrdenarScreen",
  audio: "/(tabs)/JuegoAudioScreen",
  colores: "/(tabs)/JuegoColoresScreen",
};

export default function JuegosDeTareasScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="arrow-back" size={28} color="#FFD700" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Juegos de Tareas</Text>
        <View style={styles.menu}>
          {juegos.map((juego) => (
            <Pressable
              key={juego.key}
              style={styles.botonJuego}
              onPress={() => {
                // Si es la opción de papeles, navegar a la pantalla personalizada
                if (juego.key === "papeles") {
                  router.push("/(tabs)/AprendeGestionarPapelesScreen");
                } else {
                  const route = juegoKeyToRoute[juego.key as keyof typeof juegoKeyToRoute];
                  if (route) {
                    router.push(route);
                  } else {
                    console.warn("Ruta no válida:", juego.key);
                  }
                }
              }}
            >
              {juego.icon && (
                <Ionicons name={juego.icon} size={24} color="#000" style={{ marginBottom: 6 }} />
              )}
              <Text style={styles.textoBotonJuego}>{juego.label}</Text>
            </Pressable>
          ))}
        </View>

      </View>
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
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 36,
    color: "#FFD700",
    letterSpacing: 1,
  },
  menu: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#111",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 16,
  },
  juegoContainer: {
    width: "100%",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#111",
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 18,
  },
  botonVolver: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    marginBottom: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  textoVolver: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  botonJuego: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 18,
    alignItems: "center",
    width: 240,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  textoBotonJuego: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
