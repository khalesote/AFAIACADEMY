import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function MusicaScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/CulturaGeneralScreen")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a Cultura General</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Música en España</Text>
      <Text style={styles.tituloAr}>الموسيقى في إسبانيا</Text>
      <Text style={styles.intro}>
        España tiene una gran variedad de estilos musicales tradicionales y modernos. Cada región
        cuenta con su propio folclore y ritmos característicos.
      </Text>
      <Text style={styles.introAr}>
        تتميز إسبانيا بتنوع كبير في الأنماط الموسيقية التقليدية والحديثة، ولكل منطقة موسيقاها
        الشعبية وإيقاعاتها الخاصة.
      </Text>
      <Text style={styles.seccion}>Ejemplos de música por regiones</Text>
      <Text style={styles.region}>Andalucía</Text>
      <Text style={styles.estilo}>
        <Text style={styles.estiloNombre}>Flamenco:</Text> Cante, baile y guitarra. Muy famoso
        internacionalmente.
      </Text>
      <Text style={styles.tema}>Tema: "Entre dos aguas" – Paco de Lucía</Text>
      <Text style={styles.region}>Galicia</Text>
      <Text style={styles.estilo}>
        <Text style={styles.estiloNombre}>Música celta:</Text> Gaitas y danzas tradicionales.
      </Text>
      <Text style={styles.tema}>Tema: "Muiñeira de Chantada" – Tradicional</Text>
      <Text style={styles.region}>Cataluña</Text>
      <Text style={styles.estilo}>
        <Text style={styles.estiloNombre}>Sardana:</Text> Baile tradicional en círculo.
      </Text>
      <Text style={styles.tema}>Tema: "La Santa Espina" – Enric Morera</Text>
      <Text style={styles.region}>País Vasco</Text>
      <Text style={styles.estilo}>
        <Text style={styles.estiloNombre}>Trikitixa:</Text> Acordeón y tamboril.
      </Text>
      <Text style={styles.tema}>Tema: "Trikitixa" – Kepa Junkera</Text>
      <Text style={styles.region}>Castilla y León</Text>
      <Text style={styles.estilo}>
        <Text style={styles.estiloNombre}>Jota:</Text> Baile y música popular.
      </Text>
      <Text style={styles.tema}>Tema: "Jota de la Vendimia" – Tradicional</Text>
      <Text style={styles.seccion}>Música moderna</Text>
      <Text style={styles.estilo}>
        <Text style={styles.estiloNombre}>Pop, rock, rap, reggaetón...</Text> España tiene artistas
        reconocidos internacionalmente como Rosalía, Alejandro Sanz, Pablo Alborán y otros.
      </Text>
      <Text style={styles.seccionAr}>أمثلة على الموسيقى حسب المناطق:</Text>
      <Text style={styles.estiloAr}>الأندلس: الفلامنكو.</Text>
      <Text style={styles.estiloAr}>غاليسيا: موسيقى السلتية (القربة).</Text>
      <Text style={styles.estiloAr}>كتالونيا: السردانا.</Text>
      <Text style={styles.estiloAr}>إقليم الباسك: التريكيتيكسا.</Text>
      <Text style={styles.estiloAr}>قشتالة وليون: الجوتا.</Text>
      <Text style={styles.seccionAr}>موسيقى حديثة: بوب، روك، راب، ريغيتون...</Text>
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
  tema: {
    fontSize: 14,
    color: "#79A890",
    fontStyle: "italic",
    marginBottom: 8,
    marginLeft: 18,
  },
  container: {
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 8,
    textAlign: "center",
  },
  tituloAr: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#79A890",
    marginBottom: 14,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  intro: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  introAr: {
    fontSize: 16,
    color: "#79A890",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  seccion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#79A890",
    marginTop: 18,
    marginBottom: 6,
  },
  seccionAr: {
    fontSize: 16,
    color: "#79A890",
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
  region: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#79A890",
    marginTop: 10,
    marginBottom: 2,
  },
  estilo: {
    fontSize: 15,
    color: "#333",
    marginBottom: 3,
    marginLeft: 10,
  },
  estiloNombre: {
    fontWeight: "bold",
    color: "#79A890",
  },
  estiloAr: {
    fontSize: 14,
    color: "#79A890",
    marginBottom: 2,
    marginRight: 12,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
});
