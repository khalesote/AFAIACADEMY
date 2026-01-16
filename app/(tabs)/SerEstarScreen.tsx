import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function SerEstarScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.backButton} onPress={() => router.replace("/GramaticaScreen")}>
        {"← Volver"}
      </Text>
      <Text style={styles.titulo}>Ser y Estar</Text>
      <Text style={styles.intro}>
        En español existen dos verbos que equivalen a "يكون" (kāna) en árabe:{" "}
        <Text style={styles.ser}>ser</Text> y <Text style={styles.estar}>estar</Text>. Cada uno se
        usa en contextos diferentes.
      </Text>
      <Text style={styles.seccion}>¿Cuándo se usa "ser"?</Text>
      <Text style={styles.texto}>
        "Ser" se usa para características permanentes, identidad, origen, profesión, hora y fecha,
        posesión, y material:
      </Text>
      <View style={styles.ejemplosBox}>
        <Text style={styles.ejemplo}>
          <Text style={styles.ser}>Soy</Text> estudiante. (profesión)
        </Text>
        <Text style={styles.ejemplo}>
          <Text style={styles.ser}>Eres</Text> de México. (origen)
        </Text>
        <Text style={styles.ejemplo}>
          <Text style={styles.ser}>Es</Text> alto. (característica)
        </Text>
        <Text style={styles.ejemplo}>
          <Text style={styles.ser}>Son</Text> las cinco. (hora)
        </Text>
      </View>
      <Text style={styles.seccion}>¿Cuándo se usa "estar"?</Text>
      <Text style={styles.texto}>
        "Estar" se usa para estados temporales, ubicación, emociones, salud, y acciones en progreso:
      </Text>
      <View style={styles.ejemplosBox}>
        <Text style={styles.ejemplo}>
          <Text style={styles.estar}>Estoy</Text> cansado. (estado temporal)
        </Text>
        <Text style={styles.ejemplo}>
          <Text style={styles.estar}>Estamos</Text> en casa. (ubicación)
        </Text>
        <Text style={styles.ejemplo}>
          <Text style={styles.estar}>Está</Text> feliz. (emoción)
        </Text>
        <Text style={styles.ejemplo}>
          <Text style={styles.estar}>Están</Text> enfermos. (salud)
        </Text>
      </View>
      <Text style={styles.seccion}>Diferencias sutiles y consejos</Text>
      <Text style={styles.texto}>
        A veces, la elección entre <Text style={styles.ser}>ser</Text> y{" "}
        <Text style={styles.estar}>estar</Text> cambia totalmente el significado:
      </Text>
      <Text style={styles.texto}>
        <Text style={styles.ser}>Es</Text> listo. (inteligente) /{" "}
        <Text style={styles.estar}>Está</Text> listo. (preparado)
      </Text>
      <Text style={styles.texto}>
        <Text style={styles.ser}>Es</Text> aburrido. (aburrido como persona) /{" "}
        <Text style={styles.estar}>Está</Text> aburrido. (se siente aburrido ahora)
      </Text>
      <Text style={styles.textoAr}>
        أحيانًا اختيار "ser" أو "estar" يغيّر المعنى تمامًا:
        <Text style={styles.ser}>هو ذكي</Text> (es listo) /{" "}
        <Text style={styles.estar}>هو جاهز</Text> (está listo)
        <Text style={styles.ser}>هو ممل</Text> (es aburrido) /{" "}
        <Text style={styles.estar}>يشعر بالملل</Text> (está aburrido)
      </Text>

      <Text style={styles.seccion}>Expresiones fijas</Text>
      <Text style={styles.texto}>
        Algunas expresiones usan siempre uno de los dos: - <Text style={styles.ser}>Ser</Text>{" "}
        necesario, ser posible, ser tarde, ser de Madrid. - <Text style={styles.estar}>Estar</Text>{" "}
        de acuerdo, estar de pie, estar de vacaciones, estar en casa.
      </Text>
      <Text style={styles.textoAr}>
        بعض التعابير تستخدم دائمًا أحد الفعلين: - ser: ضروري، ممكن، متأخر، من مدريد. - estar: متفق،
        واقف، في عطلة، في المنزل.
      </Text>

      <Text style={styles.seccion}>Errores comunes</Text>
      <Text style={styles.texto}>
        No digas: <Text style={styles.ser}>Soy</Text> en casa. Di:{" "}
        <Text style={styles.estar}>Estoy</Text> en casa. No digas:{" "}
        <Text style={styles.estar}>Está</Text> médico. Di: <Text style={styles.ser}>Es</Text>{" "}
        médico.
      </Text>
      <Text style={styles.textoAr}>
        أخطاء شائعة: لا تقل: soy en casa → الصحيح: estoy en casa لا تقل: está médico → الصحيح: es
        médico
      </Text>

      <Text style={styles.seccion}>Trucos para recordar</Text>
      <Text style={styles.texto}>
        - <Text style={styles.ser}>Ser</Text> para lo permanente,{" "}
        <Text style={styles.estar}>estar</Text> para lo temporal. -{" "}
        <Text style={styles.ser}>Ser</Text> para identidad y origen,{" "}
        <Text style={styles.estar}>estar</Text> para estados y lugares.
      </Text>
      <Text style={styles.textoAr}>
        حيلة للتذكر: ser للأشياء الدائمة أو الهوية، estar للحالات المؤقتة أو المكان.
      </Text>

      <Text style={styles.seccion}>Motivación</Text>
      <Text style={styles.texto}>
        ¡No te preocupes si cometes errores! Incluso los nativos dudan a veces. Con práctica y
        atención, dominarás el uso de ser y estar.
      </Text>
      <Text style={styles.textoAr}>
        لا تقلق إذا أخطأت! حتى الناطقين الأصليين يخطئون أحيانًا. مع الممارسة والانتباه ستتقن الفرق
        بين ser و estar.
      </Text>

      <Text style={styles.subtitulo}>Conjugación completa de "ser"</Text>
      <ScrollView horizontal style={{ marginBottom: 12 }}>
        <View>
          <Text style={styles.tablaCell}>
            <Text style={{ fontWeight: "bold" }}>Tiempo</Text> Yo Tú Él/Ella/Ud. Nosotros Vosotros
            Ellos/Uds.
          </Text>
          <Text style={styles.tablaCell}>Presente soy eres es somos sois son</Text>
          <Text style={styles.tablaCell}>Pretérito fui fuiste fue fuimos fuisteis fueron</Text>
          <Text style={styles.tablaCell}>Imperfecto era eras era éramos erais eran</Text>
          <Text style={styles.tablaCell}>Futuro seré serás será seremos seréis serán</Text>
          <Text style={styles.tablaCell}>
            Condicional sería serías sería seríamos seríais serían
          </Text>
          <Text style={styles.tablaCell}>Subj. Pres. sea seas sea seamos seáis sean</Text>
          <Text style={styles.tablaCell}>
            Subj. Imp. fuera fueras fuera fuéramos fuerais fueran
          </Text>
          <Text style={styles.tablaCell}>
            Subj. Fut. fuere fueres fuere fuéremos fuereis fueren
          </Text>
          <Text style={styles.tablaCell}>
            Perf. Comp. he sido has sido ha sido hemos sido habéis sido han sido
          </Text>
          <Text style={styles.tablaCell}>
            Pluscuam. había sido habías sido había sido habíamos sido habíais sido habían sido
          </Text>
          <Text style={styles.tablaCell}>
            Fut. Perf. habré sido habrás sido habrá sido habremos sido habréis sido habrán sido
          </Text>
          <Text style={styles.tablaCell}>
            Cond. Perf. habría sido habrías sido habría sido habríamos sido habríais sido habrían
            sido
          </Text>
        </View>
      </ScrollView>

      <Text style={styles.subtitulo}>Conjugación completa de "estar"</Text>
      <ScrollView horizontal style={{ marginBottom: 12 }}>
        <View>
          <Text style={styles.tablaCell}>
            <Text style={{ fontWeight: "bold" }}>Tiempo</Text> Yo Tú Él/Ella/Ud. Nosotros Vosotros
            Ellos/Uds.
          </Text>
          <Text style={styles.tablaCell}>Presente estoy estás está estamos estáis están</Text>
          <Text style={styles.tablaCell}>
            Pretérito estuve estuviste estuvo estuvimos estuvisteis estuvieron
          </Text>
          <Text style={styles.tablaCell}>
            Imperfecto estaba estabas estaba estábamos estabais estaban
          </Text>
          <Text style={styles.tablaCell}>
            Futuro estaré estarás estará estaremos estaréis estarán
          </Text>
          <Text style={styles.tablaCell}>
            Condicional estaría estarías estaría estaríamos estaríais estarían
          </Text>
          <Text style={styles.tablaCell}>Subj. Pres. esté estés esté estemos estéis estén</Text>
          <Text style={styles.tablaCell}>
            Subj. Imp. estuviera estuvieras estuviera estuviéramos estuvierais estuvieran
          </Text>
          <Text style={styles.tablaCell}>
            Subj. Fut. estuviere estuvieres estuviere estuviéremos estuviereis estuvieren
          </Text>
          <Text style={styles.tablaCell}>
            Perf. Comp. he estado has estado ha estado hemos estado habéis estado han estado
          </Text>
          <Text style={styles.tablaCell}>
            Pluscuam. había estado habías estado había estado habíamos estado habíais estado habían
            estado
          </Text>
          <Text style={styles.tablaCell}>
            Fut. Perf. habré estado habrás estado habrá estado habremos estado habréis estado habrán
            estado
          </Text>
          <Text style={styles.tablaCell}>
            Cond. Perf. habría estado habrías estado habría estado habríamos estado habríais estado
            habrían estado
          </Text>
        </View>
      </ScrollView>

      <Text style={styles.seccion}>Traducción al árabe</Text>
      <Text style={styles.textoAr}>
        في الإسبانية يوجد فعلان بمعنى "يكون": <Text style={styles.ser}>ser</Text> و{" "}
        <Text style={styles.estar}>estar</Text>. يُستخدم "ser" للصفات الدائمة أو الأصل أو المهنة أو
        الوقت أو الملكية. يُستخدم "estar" للحالات المؤقتة أو الموقع أو المشاعر أو الصحة أو الأفعال
        المستمرة.
      </Text>
      <Text style={styles.subtitulo}>Conjugación en presente</Text>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Yo soy</Text>
        <Text style={styles.tablaCellAr}>أنا أكون (ser)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Tú eres</Text>
        <Text style={styles.tablaCellAr}>أنتَ/أنتِ تكون (ser)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Él/Ella es</Text>
        <Text style={styles.tablaCellAr}>هو/هي يكون (ser)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Nosotros somos</Text>
        <Text style={styles.tablaCellAr}>نحن نكون (ser)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Vosotros sois</Text>
        <Text style={styles.tablaCellAr}>أنتم تكونون (ser)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Ellos son</Text>
        <Text style={styles.tablaCellAr}>هم يكونون (ser)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Yo estoy</Text>
        <Text style={styles.tablaCellAr}>أنا أكون (estar)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Tú estás</Text>
        <Text style={styles.tablaCellAr}>أنتَ/أنتِ تكون (estar)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Él/Ella está</Text>
        <Text style={styles.tablaCellAr}>هو/هي يكون (estar)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Nosotros estamos</Text>
        <Text style={styles.tablaCellAr}>نحن نكون (estar)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Vosotros estáis</Text>
        <Text style={styles.tablaCellAr}>أنتم تكونون (estar)</Text>
      </View>
      <View style={styles.tablaRow}>
        <Text style={styles.tablaCell}>Ellos están</Text>
        <Text style={styles.tablaCellAr}>هم يكونون (estar)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 6,
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    overflow: "hidden",
  },
  container: {
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 18,
    textAlign: "center",
  },
  intro: {
    fontSize: 18,
    color: "#222",
    marginBottom: 12,
  },
  seccion: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 14,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginBottom: 4,
  },
  texto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
    textAlign: "left",
  },
  textoAr: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
  ser: {
    color: "#000",
    fontWeight: "bold",
  },
  estar: {
    color: "#000",
    fontWeight: "bold",
  },
  ejemplosBox: {
    backgroundColor: "#f9fbe7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  ejemplo: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  tablaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tablaCell: {
    fontSize: 16,
    color: "#222",
    flex: 1,
    fontWeight: "bold",
  },
  tablaCellAr: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    fontWeight: "bold",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
});
