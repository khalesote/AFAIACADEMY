import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ONG_LIST = [
  {
    name: "Cruz Roja Española",
    arabic: "الصليب الأحمر الإسباني",
    web: "https://www.cruzroja.es/",
    email: "informacion@cruzroja.es",
    phone: "900 22 11 22",
    desc: "Ayuda humanitaria, atención sanitaria, apoyo social y asesoramiento legal.",
    descAr: "المساعدات الإنسانية، الرعاية الصحية، الدعم الاجتماعي والاستشارات القانونية.",
  },
  {
    name: "CEAR (Comisión Española de Ayuda al Refugiado)",
    arabic: "اللجنة الإسبانية لمساعدة اللاجئين",
    web: "https://www.cear.es/",
    email: "info@cear.es",
    phone: "915 98 05 35",
    desc: "Defensa y asesoría para refugiados, solicitantes de asilo y migrantes.",
    descAr: "الدفاع والاستشارة للاجئين وطالبي اللجوء والمهاجرين.",
  },
  {
    name: "ACCEM",
    arabic: "أسيم",
    web: "https://www.accem.es/",
    email: "accem@accem.es",
    phone: "900 701 322",
    desc: "Atención, acogida y apoyo a personas inmigrantes y refugiadas.",
    descAr: "الاستقبال والدعم للأشخاص المهاجرين واللاجئين.",
  },
  {
    name: "Cáritas Española",
    arabic: "كاريتاس إسبانيا",
    web: "https://www.caritas.es/",
    email: "info@caritas.es",
    phone: "900 33 99 99",
    desc: "Apoyo social, alimentos, ropa, orientación laboral y acompañamiento.",
    descAr: "الدعم الاجتماعي، الطعام، الملابس، التوجيه المهني والمرافقة.",
  },
  {
    name: "ONG Rescate",
    arabic: "منظمة إنقاذ",
    web: "https://www.ongrescate.org/",
    email: "info@ongrescate.org",
    phone: "914 09 62 24",
    desc: "Asistencia a refugiados e inmigrantes en situación de vulnerabilidad.",
    descAr: "مساعدة اللاجئين والمهاجرين في أوضاع هشة.",
  },
  {
    name: "Fundación Cepaim",
    arabic: "مؤسسة سيبايم",
    web: "https://www.cepaim.org/",
    email: "info@cepaim.org",
    phone: "968 87 53 12",
    desc: "Integración social, vivienda, empleo y apoyo a migrantes.",
    descAr: "الاندماج الاجتماعي، السكن، العمل ودعم المهاجرين.",
  },
  {
    name: "Red Acoge",
    arabic: "شبكة أكوخي",
    web: "https://www.redacoge.org/",
    email: "info@redacoge.org",
    phone: "915 39 81 81",
    desc: "Defensa de derechos y apoyo integral a personas inmigrantes.",
    descAr: "الدفاع عن الحقوق والدعم الشامل للأشخاص المهاجرين.",
  },
];

export default function AyudasONGScreen() {
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f1f8e9" }}
      contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
    >
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#388e3c" />
        <Text
          style={{
            color: "#388e3c",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Volver
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Organizaciones de ayuda a inmigrantes</Text>
      <Text style={styles.titleAr}>منظمات لمساعدة المهاجرين</Text>
      {ONG_LIST.map((ong, idx) => (
        <View key={ong.name} style={styles.card}>
          <Text style={styles.ongName}>{ong.name}</Text>
          <Text style={styles.ongNameAr}>{ong.arabic}</Text>
          <Text style={styles.desc}>{ong.desc}</Text>
          <Text style={styles.descAr}>{ong.descAr}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="globe-outline" size={18} color="#1976d2" />
            <Text style={styles.link} onPress={() => Linking.openURL(ong.web)}>
              {ong.web}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={18} color="#1976d2" />
            <Text style={styles.text}>{ong.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color="#1976d2" />
            <Text style={styles.text}>{ong.phone}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: 2,
    textAlign: "left",
  },
  titleAr: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#00897b",
    marginBottom: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  ongName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1976d2",
  },
  ongNameAr: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#00897b",
    textAlign: "right",
    writingDirection: "rtl",
  },
  desc: {
    color: "#333",
    fontSize: 14,
    marginBottom: 2,
  },
  descAr: {
    color: "#00897b",
    fontSize: 13,
    marginBottom: 6,
    textAlign: "right",
    writingDirection: "rtl",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  link: {
    color: "#1976d2",
    marginLeft: 6,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  text: {
    color: "#333",
    marginLeft: 6,
    fontSize: 13,
  },
});
