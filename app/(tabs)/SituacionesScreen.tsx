import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const categorias = [
  {
    key: "viajar-tren",
    es: "Viajar en tren",
    ar: "السفر بالقطار",
    icon: "train-outline",
    color: "#1976d2",
  },
  {
    key: "ir-mercado",
    es: "Ir al mercado",
    ar: "الذهاب إلى السوق",
    icon: "cart-outline",
    color: "#388e3c",
  },
  {
    key: "ir-ayuntamiento",
    es: "Ir al ayuntamiento",
    ar: "الذهاب إلى البلدية",
    icon: "business-outline",
    color: "#fbc02d",
  },
  {
    key: "ir-hospital",
    es: "Ir al hospital",
    ar: "الذهاب إلى المستشفى",
    icon: "medkit-outline",
    color: "#d32f2f",
  },
  {
    key: "trabajar-campo",
    es: "Trabajar en el campo",
    ar: "العمل في الحقل",
    icon: "leaf-outline",
    color: "#43a047",
  },
  {
    key: "buscar-trabajo",
    es: "Buscar trabajo",
    ar: "البحث عن عمل",
    icon: "briefcase-outline",
    color: "#512da8",
  },
  {
    key: "escuela-hijos",
    es: "Ir a la escuela de los hijos",
    ar: "الذهاب إلى مدرسة الأبناء",
    icon: "school-outline",
    color: "#1976d2",
  },
  {
    key: "buscar-vivienda",
    es: "Buscar vivienda",
    ar: "البحث عن سكن",
    icon: "home-outline",
    color: "#388e3c",
  },
  {
    key: "tramites-extranjeria",
    es: "Trámites en extranjería",
    ar: "إجراءات الهجرة",
    icon: "document-text-outline",
    color: "#fbc02d",
  },
  {
    key: "ir-comisaria",
    es: "Ir a la comisaría",
    ar: "الذهاب إلى مركز الشرطة",
    icon: "shield-outline",
    color: "#d32f2f",
  },
  {
    key: "abrir-cuenta",
    es: "Abrir cuenta bancaria",
    ar: "فتح حساب بنكي",
    icon: "card-outline",
    color: "#43a047",
  },
  {
    key: "transporte-publico",
    es: "Usar transporte público",
    ar: "استخدام وسائل النقل العام",
    icon: "bus-outline",
    color: "#512da8",
  },
  {
    key: "ir-correos",
    es: "Ir a correos",
    ar: "الذهاب إلى البريد",
    icon: "mail-outline",
    color: "#1976d2",
  },
  {
    key: "compras-online",
    es: "Hacer compras online",
    ar: "الشراء عبر الإنترنت",
    icon: require("../../assets/images/carrito.png"),
    color: "#fbc02d",
  },
  {
    key: "clases-espanol",
    es: "Asistir a clases de español",
    ar: "حضور دروس اللغة الإسبانية",
    icon: "book-outline",
    color: "#d32f2f",
  },
  {
    key: "ayuda-social",
    es: "Buscar ayuda social",
    ar: "البحث عن المساعدة الاجتماعية",
    icon: require("../../assets/images/corazon.png"),
    color: "#43a047",
  },
  {
    key: "ir-farmacia",
    es: "Visitar una farmacia",
    ar: "زيارة الصيدلية",
    icon: require("../../assets/images/botiquin.png"),
    color: "#512da8",
  },
  {
    key: "empadronamiento",
    es: "Solicitar empadronamiento",
    ar: "طلب التسجيل في البلدية",
    icon: require("../../assets/images/portapapeles.png"),
    color: "#1976d2",
  },
  {
    key: "vecinos",
    es: "Relacionarse con vecinos",
    ar: "التعامل مع الجيران",
    icon: "people-outline",
    color: "#388e3c",
  },
  {
    key: "emergencias",
    es: "Emergencias",
    ar: "الطوارئ",
    icon: "alert-circle-outline",
    color: "#d32f2f",
  },
];

export default function SituacionesScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a la Pantalla de Inicio</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Situaciones Corrientes</Text>
      {categorias.map((cat, idx) => (
        <TouchableOpacity
          key={cat.key}
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: "/DialogoScreen",
              params: { categoria: cat.key },
            })
          }
        >
          <View style={styles.row}>
            {typeof cat.icon === "number" ? (
              <Image source={cat.icon} style={{ width: 32, height: 32, marginRight: 10 }} />
            ) : (
              <Ionicons
                name={cat.icon as any}
                size={32}
                color={cat.color}
                style={{ marginRight: 10 }}
              />
            )}
            <View>
              <Text style={styles.textoEs}>{cat.es}</Text>
              <Text style={styles.textoAr}>{cat.ar}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1976d2",
  },
  boton: {
    backgroundColor: "#e3e3e3",
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoEs: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 6,
  },
  textoAr: {
    fontSize: 20,
    color: "#388e3c",
    fontWeight: "bold",
    fontFamily: "System", // Puedes cambiar la fuente si tienes una árabe
    writingDirection: "rtl",
  },
});
