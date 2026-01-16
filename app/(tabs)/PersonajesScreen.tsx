import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const personajes = [
  {
    nombre: "Isabel la Católica",
    ar: "إيزابيل الكاثوليكية",
    descripcion: "Reina de Castilla y Aragón, impulsora del descubrimiento de América.",
    descripcionAr: "ملكة قشتالة وأراغون، ساهمت في اكتشاف أمريكا.",
  },
  {
    nombre: "Pablo Picasso",
    ar: "بابلو بيكاسو",
    descripcion: "Pintor y escultor, uno de los artistas más influyentes del siglo XX.",
    descripcionAr: "رسام ونحات، من أكثر الفنانين تأثيرًا في القرن العشرين.",
  },
  {
    nombre: "Adolfo Suárez",
    ar: "أدولفو سواريث",
    descripcion: "Primer presidente del Gobierno de la democracia española.",
    descripcionAr: "أول رئيس حكومة في الديمقراطية الإسبانية.",
  },
  {
    nombre: "Severo Ochoa",
    ar: "سيفيرو أوتشوا",
    descripcion: "Científico, Premio Nobel de Medicina.",
    descripcionAr: "عالم، حاصل على جائزة نوبل في الطب.",
  },
  {
    nombre: "Federico García Lorca",
    ar: "فيديريكو غارسيا لوركا",
    descripcion: "Poeta y dramaturgo, figura clave de la Generación del 27.",
    descripcionAr: "شاعر وكاتب مسرحي، شخصية بارزة في جيل 27.",
  },
  {
    nombre: "Clara Campoamor",
    ar: "كلارا كامبوامور",
    descripcion: "Política y defensora de los derechos de la mujer.",
    descripcionAr: "سياسية ومدافعة عن حقوق المرأة.",
  },
  {
    nombre: "Salvador Dalí",
    ar: "سلفادور دالي",
    descripcion: "Pintor surrealista de fama internacional.",
    descripcionAr: "رسام سريالي ذو شهرة عالمية.",
  },
  {
    nombre: "Francisco Franco",
    ar: "فرانسيسكو فرانكو",
    descripcion: "Militar y dictador, gobernó España entre 1939 y 1975.",
    descripcionAr: "عسكري وديكتاتور، حكم إسبانيا بين 1939 و1975.",
  },
  {
    nombre: "Santiago Ramón y Cajal",
    ar: "سانتياغو رامون إي كاخال",
    descripcion: "Científico, Premio Nobel de Medicina.",
    descripcionAr: "عالم، حاصل على جائزة نوبل في الطب.",
  },
  {
    nombre: "Rosalía de Castro",
    ar: "روزاليا دي كاسترو",
    descripcion: "Poetisa gallega, figura clave del Rexurdimento.",
    descripcionAr: "شاعرة جاليثية، شخصية رئيسية في حركة النهضة الجاليثية.",
  },
];

export default function PersonajesScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/CulturaGeneralScreen")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a Cultura General</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Ionicons name="people" size={36} color="#79A890" />
        <Text style={styles.title}>Personajes españoles</Text>
        <Text style={styles.titleAr}>شخصيات إسبانية</Text>
      </View>
      {personajes.map((p, idx) => (
        <View style={styles.personajeItem} key={idx}>
          <View style={{ flex: 1 }}>
            <Text style={styles.personajeNombre}>{p.nombre}</Text>
            <Text style={styles.personajeAr}>{p.ar}</Text>
            <Text style={styles.descripcion}>{p.descripcion}</Text>
            <Text style={styles.descripcionAr}>{p.descripcionAr}</Text>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#79A890",
    marginTop: 6,
    textAlign: "center",
  },
  titleAr: {
    fontSize: 18,
    color: "#79A890",
    fontWeight: "bold",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 10,
    textAlign: "center",
  },
  personajeItem: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  personajeNombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  personajeAr: {
    fontSize: 17,
    color: "#79A890",
    fontWeight: "bold",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 2,
  },
  descripcion: {
    fontSize: 15,
    color: "#444",
    marginTop: 2,
    fontStyle: "italic",
  },
  descripcionAr: {
    fontSize: 15,
    color: "#79A890",
    marginTop: 2,
    fontStyle: "italic",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
});
