import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const autoresPoetas = [
  {
    nombre: "Miguel de Cervantes",
    nombreAr: "ميغيل دي ثيربانتس",
    imagen: require("../assets/autores/cervantes.jpg"),
    biografia:
      "Considerado el mayor escritor en lengua española. Autor de Don Quijote de la Mancha. Su obra marcó el inicio de la novela moderna.",
    biografiaAr:
      "يعتبر أعظم كاتب باللغة الإسبانية. مؤلف دون كيشوت دي لا مانشا. شكلت أعماله بداية الرواية الحديثة.",
    obras: [
      "Don Quijote de la Mancha",
      "La Galatea",
      "Novelas ejemplares",
      "Los trabajos de Persiles y Sigismunda",
    ],
    obrasAr: [
      "دون كيشوت دي لا مانشا",
      "لا غالاثيا",
      "روايات نموذجية",
      "أعمال بيرسيليس وسيجيسموندا",
    ],
  },
  {
    nombre: "Gabriel García Márquez",
    nombreAr: "غابرييل غارسيا ماركيز",
    imagen: require("../assets/autores/garcia_marquez.jpg"),
    biografia:
      "Escritor colombiano, Premio Nobel de Literatura en 1982. Máximo exponente del realismo mágico latinoamericano.",
    biografiaAr:
      "كاتب كولومبي، حائز على جائزة نوبل للآداب عام 1982. أبرز ممثلي الواقعية السحرية في أمريكا اللاتينية.",
    obras: [
      "Cien años de soledad",
      "El amor en los tiempos del cólera",
      "Crónica de una muerte anunciada",
    ],
    obrasAr: ["مئة عام من العزلة", "الحب في زمن الكوليرا", "قصة موت معلن"],
  },
  {
    nombre: "Federico García Lorca",
    imagen: require("../assets/autores/lorca.jpg"),
    biografia:
      "Poeta y dramaturgo andaluz, figura clave de la Generación del 27. Su obra destaca por su simbolismo y compromiso social.",
    obras: ["Bodas de sangre", "Romancero gitano", "La casa de Bernarda Alba"],
  },
  {
    nombre: "Pablo Neruda",
    imagen: require("../assets/autores/neruda.jpeg"),
    biografia:
      "Poeta chileno, Premio Nobel de Literatura en 1971. Conocido por su poesía apasionada y social.",
    obras: [
      "Veinte poemas de amor y una canción desesperada",
      "Canto general",
      "Residencia en la tierra",
    ],
  },
  {
    nombre: "Jorge Luis Borges",
    imagen: require("../assets/autores/borges.jpg"),
    biografia:
      "Escritor y poeta argentino, uno de los grandes literatos del siglo XX. Maestro del cuento, el ensayo y la poesía.",
    obras: ["Ficciones", "El Aleph", "El libro de arena"],
  },
];

export default function AutoresPoetasScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/CulturaGeneralScreen")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a Cultura General</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Autores y Poetas</Text>
      {autoresPoetas.map((autor, idx) => (
        <View key={idx} style={styles.autorBox}>
          <Image source={autor.imagen} style={styles.autorImagen} />
          <Text style={styles.nombre}>{autor.nombre}</Text>
          {autor.nombreAr && <Text style={styles.nombreAr}>{autor.nombreAr}</Text>}
          <Text style={styles.biografia}>{autor.biografia}</Text>
          {autor.biografiaAr && <Text style={styles.biografiaAr}>{autor.biografiaAr}</Text>}
          <Text style={styles.obrasTitulo}>Obras destacadas:</Text>
          {autor.obras.map((obra, i) => (
            <Text key={i} style={styles.obra}>
              {"• " + obra}
            </Text>
          ))}
          {autor.obrasAr && <Text style={styles.obrasTituloAr}>الأعمال البارزة:</Text>}
          {autor.obrasAr &&
            autor.obrasAr.map((obra, i) => (
              <Text key={i} style={styles.obraAr}>
                {"• " + obra}
              </Text>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  volverBtn: {
    backgroundColor: "#79A890",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 16,
    alignSelf: "flex-start",
    shadowColor: "#0003",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  volverBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  nombreAr: {
    fontSize: 16,
    color: "#79A890",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  biografiaAr: {
    fontSize: 14,
    color: "#79A890",
    marginBottom: 6,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  obrasTituloAr: {
    fontWeight: "bold",
    marginTop: 8,
    color: "#79A890",
    alignSelf: "flex-end",
    textAlign: "right",
    writingDirection: "rtl",
  },
  obraAr: {
    marginRight: 10,
    color: "#333",
    fontSize: 14,
    alignSelf: "flex-end",
    textAlign: "right",
    writingDirection: "rtl",
  },
  container: {
    padding: 24,
    backgroundColor: "#fffbe6",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 20,
    textAlign: "center",
  },
  autorBox: {
    backgroundColor: "#f9e0c7",
    borderRadius: 16,
    marginBottom: 18,
    padding: 16,
    width: "100%",
    shadowColor: "#0002",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    alignItems: "center",
  },
  autorImagen: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "#eee",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 6,
    textAlign: "center",
  },
  biografia: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
    textAlign: "center",
  },
  obrasTitulo: {
    fontWeight: "bold",
    marginTop: 8,
    color: "#79A890",
    alignSelf: "flex-start",
  },
  obra: {
    marginLeft: 10,
    color: "#333",
    fontSize: 14,
    alignSelf: "flex-start",
  },
});
