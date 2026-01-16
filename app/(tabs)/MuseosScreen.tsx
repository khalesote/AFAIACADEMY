import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const museosFamosos = [
  {
    nombre: "Museo del Prado",
    nombreAr: "متحف برادو",
    ciudad: "Madrid",
    ciudadAr: "مدريد",
    descripcion:
      "Uno de los museos de arte más importantes del mundo, famoso por su colección de pintura europea.",
    descripcionAr: "واحد من أهم متاحف الفن في العالم، مشهور بمجموعته من اللوحات الأوروبية.",
    imagen: require("../../assets/museos/prado.jpg"),
  },
  {
    nombre: "Museo Nacional Centro de Arte Reina Sofía",
    nombreAr: "متحف الملكة صوفيا الوطني",
    ciudad: "Madrid",
    ciudadAr: "مدريد",
    descripcion:
      'Especializado en arte moderno y contemporáneo. Alberga el famoso "Guernica" de Picasso.',
    descripcionAr: 'متخصص في الفن الحديث والمعاصر. يضم لوحة "غيرنيكا" الشهيرة لبيكاسو.',
    imagen: require("../../assets/museos/reinasofia.jpg"),
  },
  {
    nombre: "Museo Thyssen-Bornemisza",
    nombreAr: "متحف تيسين-بورنيميسزا",
    ciudad: "Madrid",
    ciudadAr: "مدريد",
    descripcion:
      'Completa el "Triángulo del Arte" de Madrid con una colección diversa de pintura occidental.',
    descripcionAr: 'يكمل "مثلث الفن" في مدريد بمجموعة متنوعة من اللوحات الغربية.',
    imagen: require("../../assets/museos/thyssen.jpg"),
  },
  {
    nombre: "Museo Guggenheim",
    nombreAr: "متحف غوغنهايم",
    ciudad: "Bilbao",
    ciudadAr: "بيلباو",
    descripcion:
      "Icono de la arquitectura contemporánea y el arte moderno, diseñado por Frank Gehry.",
    descripcionAr: "رمز للهندسة المعمارية المعاصرة والفن الحديث، من تصميم فرانك جيري.",
    imagen: require("../../assets/museos/guggenheim.jpg"),
  },
  {
    nombre: "Museo Picasso",
    nombreAr: "متحف بيكاسو",
    ciudad: "Barcelona",
    ciudadAr: "برشلونة",
    descripcion:
      "Dedicado a la obra de Pablo Picasso, con una de las colecciones más completas del artista.",
    descripcionAr: "مكرس لأعمال بابلو بيكاسو، ويضم واحدة من أكثر مجموعاته اكتمالاً.",
    imagen: require("../../assets/museos/picasso.jpg"),
  },
  {
    nombre: "Museo Nacional de Arte de Cataluña (MNAC)",
    nombreAr: "المتحف الوطني للفنون في كاتالونيا",
    ciudad: "Barcelona",
    ciudadAr: "برشلونة",
    descripcion: "Destacado por su colección de arte románico y gótico.",
    descripcionAr: "يشتهر بمجموعته من الفن الروماني والقوطي.",
    imagen: require("../../assets/museos/mnac.jpg"),
  },
  {
    nombre: "Museo de Bellas Artes de Sevilla",
    nombreAr: "متحف الفنون الجميلة في إشبيلية",
    ciudad: "Sevilla",
    ciudadAr: "إشبيلية",
    descripcion:
      "Importante museo de pintura española, especialmente de la escuela sevillana y barroca.",
    descripcionAr: "متحف مهم للفن الإسباني، خاصة المدرسة الإشبيلية والفن الباروكي.",
    imagen: require("../../assets/museos/sevilla.jpg"),
  },
];

export default function MuseosScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/CulturaGeneralScreen")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a Cultura General</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Museos más famosos de España</Text>
      <Text style={styles.tituloAr}>أشهر المتاحف في إسبانيا</Text>
      {museosFamosos.map((museo, idx) => (
        <View key={idx} style={styles.museoBox}>
          {museo.imagen && <Image source={museo.imagen} style={styles.museoImagen} />}
          <Text style={styles.museoNombre}>{museo.nombre}</Text>
          <Text style={styles.museoNombreAr}>{museo.nombreAr}</Text>
          <Text style={styles.museoCiudad}>Ciudad: {museo.ciudad}</Text>
          <Text style={styles.museoCiudadAr}>المدينة: {museo.ciudadAr}</Text>
          <Text style={styles.museoDescripcion}>{museo.descripcion}</Text>
          <Text style={styles.museoDescripcionAr}>{museo.descripcionAr}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  museoImagen: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: "cover",
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
    marginBottom: 10,
    textAlign: "center",
  },
  tituloAr: {
    fontSize: 20,
    color: "#79A890",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  museoBox: {
    backgroundColor: "#e0f2f1",
    borderRadius: 16,
    marginBottom: 18,
    padding: 16,
    width: "100%",
    shadowColor: "#0002",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  museoNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 2,
    textAlign: "center",
  },
  museoNombreAr: {
    fontSize: 16,
    color: "#79A890",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 2,
  },
  museoCiudad: {
    fontSize: 15,
    color: "#79A890",
    textAlign: "center",
  },
  museoCiudadAr: {
    fontSize: 14,
    color: "#79A890",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 4,
  },
  museoDescripcion: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  museoDescripcionAr: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
    marginBottom: 4,
  },
  volverBtn: {
    backgroundColor: "#1976d2",
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
