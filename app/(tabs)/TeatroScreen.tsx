import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const obrasTeatrales = [
  {
    titulo: "La vida es sueño",
    tituloAr: "الحياة حلم",
    autor: "Pedro Calderón de la Barca",
    autorAr: "بيدرو كالديرون دي لا باركا",
    descripcion:
      "Una de las obras más importantes del Siglo de Oro español. Reflexiona sobre el destino, la libertad y la realidad.",
    descripcionAr:
      "واحدة من أهم أعمال العصر الذهبي الإسباني. تتناول موضوعات القدر والحرية والواقع.",
  },
  {
    titulo: "Don Juan Tenorio",
    tituloAr: "دون خوان تينوريو",
    autor: "José Zorrilla",
    autorAr: "خوسيه ثورييا",
    descripcion: "La versión más famosa del mito de Don Juan, símbolo del romanticismo español.",
    descripcionAr: "أشهر نسخة من أسطورة دون خوان، رمز الرومانسية الإسبانية.",
  },
  {
    titulo: "El burlador de Sevilla y convidado de piedra",
    tituloAr: "المخادع من إشبيلية والضيف الحجري",
    autor: "Tirso de Molina",
    autorAr: "تيرسو دي مولينا",
    descripcion: "Obra fundacional del mito de Don Juan, pieza clave del teatro barroco.",
    descripcionAr: "العمل التأسيسي لأسطورة دون خوان، قطعة أساسية في المسرح الباروكي.",
  },
  {
    titulo: "Bodas de sangre",
    tituloAr: "عرس الدم",
    autor: "Federico García Lorca",
    autorAr: "فيديريكو غارسيا لوركا",
    descripcion:
      "Tragedia rural inspirada en hechos reales, una de las obras más emblemáticas de Lorca.",
    descripcionAr: "مأساة ريفية مستوحاة من أحداث حقيقية، من أشهر أعمال لوركا.",
  },
  {
    titulo: "Yerma",
    tituloAr: "يرما",
    autor: "Federico García Lorca",
    autorAr: "فيديريكو غارسيا لوركا",
    descripcion: "Tragedia poética sobre la maternidad frustrada y el destino social.",
    descripcionAr: "مأساة شعرية عن الأمومة المحبطة والمصير الاجتماعي.",
  },
  {
    titulo: "El sí de las niñas",
    tituloAr: "نعم الفتيات",
    autor: "Leandro Fernández de Moratín",
    autorAr: "لياندرو فرنانديز دي موراتين",
    descripcion:
      "Comedia neoclásica que critica los matrimonios concertados y defiende la libertad de elección.",
    descripcionAr: "كوميديا كلاسيكية تنتقد الزيجات المدبرة وتدافع عن حرية الاختيار.",
  },
  {
    titulo: "Fuenteovejuna",
    tituloAr: "فوينتي أوبيخونا",
    autor: "Lope de Vega",
    autorAr: "لوبي دي فيغا",
    descripcion:
      "Drama histórico basado en hechos reales, símbolo de la justicia colectiva y la resistencia popular.",
    descripcionAr: "دراما تاريخية مستوحاة من أحداث حقيقية، رمز للعدالة الجماعية والمقاومة الشعبية.",
  },
];

export default function TeatroScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/CulturaGeneralScreen")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a Cultura General</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Obras teatrales más famosas de España</Text>
      {obrasTeatrales.map((obra, idx) => (
        <View key={idx} style={styles.obraBox}>
          <Text style={styles.obraTitulo}>{obra.titulo}</Text>
          {obra.tituloAr && <Text style={styles.obraTituloAr}>{obra.tituloAr}</Text>}
          <Text style={styles.obraAutor}>Autor: {obra.autor}</Text>
          {obra.autorAr && <Text style={styles.obraAutorAr}>المؤلف: {obra.autorAr}</Text>}
          <Text style={styles.obraDescripcion}>{obra.descripcion}</Text>
          {obra.descripcionAr && <Text style={styles.obraDescripcionAr}>{obra.descripcionAr}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  obraTituloAr: {
    fontSize: 16,
    color: "#79A890",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  obraAutorAr: {
    fontSize: 14,
    color: "#79A890",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 4,
  },
  obraDescripcionAr: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 4,
  },
  container: {
    padding: 24,
    backgroundColor: "#fffbe6",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 20,
    textAlign: "center",
  },
  obraBox: {
    backgroundColor: "#f9e0c7",
    borderRadius: 16,
    marginBottom: 18,
    padding: 16,
    width: "100%",
    shadowColor: "#0002",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  obraTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 4,
    textAlign: "center",
  },
  obraAutor: {
    fontSize: 15,
    color: "#79A890",
    marginBottom: 4,
    textAlign: "center",
  },
  obraDescripcion: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
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
});
