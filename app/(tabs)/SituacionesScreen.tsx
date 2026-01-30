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
        activeOpacity={0.85}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a la Pantalla de Inicio</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Situaciones Cotidianas</Text>
      {categorias.map((cat) => (
        <TouchableOpacity
          key={cat.key}
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: "/DialogoScreen",
              params: { categoria: cat.key },
            })
          }
          activeOpacity={0.9}
        >
          <View style={styles.row}>
            {typeof cat.icon === "number" ? (
              <Image source={cat.icon} style={styles.imageIcon} />
            ) : (
              <Ionicons
                name={cat.icon as any}
                size={28}
                color="#FFD700"
                style={{ marginRight: 12 }}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.textoEs}>{cat.es}</Text>
              <Text style={styles.textoAr}>{cat.ar}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFD700" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  volverBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
  volverBtnText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  boton: {
    backgroundColor: '#0f0f0f',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  textoEs: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '700',
    marginBottom: 4,
  },
  textoAr: {
    fontSize: 18,
    color: '#E6C94C',
    fontWeight: '600',
    fontFamily: 'System',
    writingDirection: 'rtl',
  },
  imageIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
    tintColor: '#FFD700',
    resizeMode: 'contain',
  },
});
