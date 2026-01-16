import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function FiestasScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/CulturaGeneralScreen")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a Cultura General</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Fiestas importantes en España</Text>
      <Text style={styles.tituloAr}>أهم المهرجانات في إسبانيا</Text>

      {/* Andalucía */}
      <Text style={styles.region}>Andalucía</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>Feria de Abril (Sevilla):</Text> Fiesta grande con
        casetas, flamenco y caballos.
      </Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>Semana Santa (Sevilla, Málaga):</Text> Procesiones
        religiosas impresionantes.
      </Text>

      {/* Comunidad Valenciana */}
      <Text style={styles.region}>Comunidad Valenciana</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>Las Fallas (Valencia):</Text> Monumentos gigantes de
        cartón quemados en marzo.
      </Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>La Tomatina (Buñol):</Text> Batalla de tomates en
        agosto.
      </Text>

      {/* Cataluña */}
      <Text style={styles.region}>Cataluña</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>La Mercè (Barcelona):</Text> Fiestas con castells
        (torres humanas) y fuegos artificiales.
      </Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>Sant Jordi:</Text> Día del libro y la rosa (23 de
        abril).
      </Text>

      {/* Madrid */}
      <Text style={styles.region}>Madrid</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>San Isidro:</Text> Fiestas patronales con música y
        chulapos (mayo).
      </Text>

      {/* Galicia */}
      <Text style={styles.region}>Galicia</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>
          Fiesta de Santiago Apóstol (Santiago de Compostela):
        </Text>{" "}
        Celebración religiosa y cultural (25 de julio).
      </Text>

      {/* País Vasco */}
      <Text style={styles.region}>País Vasco</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>Aste Nagusia (Bilbao):</Text> Semana Grande con
        conciertos y fuegos artificiales (agosto).
      </Text>

      {/* Navarra */}
      <Text style={styles.region}>Navarra</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>San Fermín (Pamplona):</Text> Encierro de toros y
        fiestas famosas (julio).
      </Text>

      {/* Canarias */}
      <Text style={styles.region}>Islas Canarias</Text>
      <Text style={styles.festival}>
        <Text style={styles.festivalNombre}>Carnaval de Santa Cruz de Tenerife:</Text> Uno de los
        carnavales más grandes del mundo.
      </Text>

      {/* Traducción árabe breve */}
      <Text style={styles.tituloSecAr}>أمثلة على المهرجانات حسب المناطق:</Text>
      <Text style={styles.festivalAr}>الأندلس: معرض أبريل، أسبوع الآلام.</Text>
      <Text style={styles.festivalAr}>فالنسيا: لاس فاياس، لا توماتينا.</Text>
      <Text style={styles.festivalAr}>كتالونيا: لا ميرسي، سان خوردي.</Text>
      <Text style={styles.festivalAr}>مدريد: سان إيسيدرو.</Text>
      <Text style={styles.festivalAr}>غاليسيا: عيد سانتياغو.</Text>
      <Text style={styles.festivalAr}>إقليم الباسك: أستي ناغوسيا.</Text>
      <Text style={styles.festivalAr}>نافارا: سان فيرمين.</Text>
      <Text style={styles.festivalAr}>جزر الكناري: كرنفال سانتا كروز.</Text>
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
  region: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#79A890",
    marginTop: 16,
    marginBottom: 6,
  },
  festival: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    marginLeft: 10,
  },
  festivalNombre: {
    fontWeight: "bold",
    color: "#79A890",
  },
  tituloSecAr: {
    fontSize: 18,
    color: "#79A890",
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 6,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
  festivalAr: {
    fontSize: 15,
    color: "#79A890",
    marginBottom: 2,
    marginRight: 12,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
});
