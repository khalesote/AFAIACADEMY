import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";

import banderas from "../../assets/banderas.json";

function reproducir(texto: string, idioma: "es" | "ar") {
  const options: Speech.SpeechOptions = {
    language: idioma === "es" ? "es-ES" : "ar-SA",
    pitch: 1,
    rate: 1,
    voice: undefined, // Se intentará buscar voz masculina luego
  };
  // Intentar obtener voz masculina si está disponible
  Speech.getAvailableVoicesAsync().then((voices) => {
    // Buscar voz mejorada para el idioma
    const voz = voices.find((v) => v.language === options.language && v.quality === "Enhanced");
    if (voz) {
      options.voice = voz.identifier;
    } else {
      // Fallback: cualquier voz para el idioma
      const voz2 = voices.find((v) => v.language === options.language);
      if (voz2) options.voice = voz2.identifier;
    }
    Speech.speak(texto, options);
  });
}

export default function CulturaGeneralScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.push("/")}
      >
        <Text style={styles.volverBtnText}>⟵ Volver a la Pantalla de Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.autoresBtn}
        onPress={() => router.push("/AutoresPoetasScreen")}
      >
        <Text style={styles.autoresBtnText}>Autores y Poetas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.autoresBtn} onPress={() => router.push("/TeatroScreen")}>
        <Text style={styles.autoresBtnText}>Teatro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.autoresBtn} onPress={() => router.push("/MuseosScreen")}>
        <Text style={styles.autoresBtnText}>Museos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.autoresBtn} onPress={() => router.push("/FiestasScreen")}>
        <Text style={styles.autoresBtnText}>Fiestas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.autoresBtn} onPress={() => router.push("/PersonajesScreen")}>
        <Text style={styles.autoresBtnText}>Personajes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.autoresBtn} onPress={() => router.push("/MusicaScreen")}>
        <Text style={styles.autoresBtnText}>Música</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Cultura General</Text>
      <Text style={styles.tituloAr}>الثقافة العامة</Text>
      <Text style={styles.introES}>
        ¡Bienvenido/a a la sección de Cultura General! Aquí encontrarás curiosidades, datos útiles y
        conocimientos básicos sobre España y el mundo hispano, con traducción en árabe.
      </Text>
      <Text style={styles.introAR}>
        مرحبًا بك في قسم الثقافة العامة! ستجد هنا معلومات مفيدة وحقائق ممتعة عن إسبانيا والعالم
        الناطق بالإسبانية، مع الترجمة إلى العربية.
      </Text>

      {/* Superficie */}
      <Text style={styles.descripcion}>
        Superficie: España tiene una superficie de aproximadamente 505.990 km², lo que la convierte
        en el cuarto país más grande de Europa.
      </Text>
      <Text style={styles.descripcionAr}>
        المساحة: تبلغ مساحة إسبانيا حوالي 505,990 كيلومتر مربع، مما يجعلها رابع أكبر دولة في أوروبا.
      </Text>

      {/* Población */}
      <Text style={styles.descripcion}>
        Población: España cuenta con una población de alrededor de 47 millones de habitantes.
      </Text>
      <Text style={styles.descripcionAr}>
        عدد السكان: يبلغ عدد سكان إسبانيا حوالي 47 مليون نسمة.
      </Text>

      {/* Idiomas Hablados */}
      <Text style={styles.descripcion}>
        Idiomas hablados: El idioma oficial es el español o castellano, pero también se hablan otras
        lenguas cooficiales como el catalán, el gallego y el euskera.
      </Text>
      <Text style={styles.descripcionAr}>
        اللغات المحكية: اللغة الرسمية هي الإسبانية (القشتالية)، كما تُستخدم لغات رسمية أخرى مثل
        الكاتالانية، الجاليكية والباسكية.
      </Text>

      {/* Historia breve */}
      <Text style={styles.descripcion}>
        Historia: España tiene una historia muy rica. Fue habitada por íberos, celtas, romanos,
        visigodos y árabes. En 1492, los Reyes Católicos unificaron el país y comenzó la expansión
        colonial.
      </Text>
      <Text style={styles.descripcionAr}>
        التاريخ: لإسبانيا تاريخ غني جدًا. سكنها الإيبيريون، السلتيون، الرومان، القوط الغربيون
        والعرب. في عام 1492 وحد الملوك الكاثوليك البلاد وبدأت مرحلة الاستعمار.
      </Text>

      {/* Cultura y diversidad */}
      <Text style={styles.descripcion}>
        Cultura y diversidad: España es conocida por su diversidad cultural, gastronómica y
        artística, así como por sus fiestas y tradiciones únicas.
      </Text>
      <Text style={styles.descripcionAr}>
        الثقافة والتنوع: تشتهر إسبانيا بتنوعها الثقافي، والمأكولات والفنون، بالإضافة إلى أعيادها
        وتقاليدها الفريدة.
      </Text>

      {/* Clima */}
      <Text style={styles.descripcion}>
        Clima: España tiene una gran variedad de climas. En el norte predomina el clima oceánico, en
        el centro el clima continental y en el sur y la costa mediterránea el clima mediterráneo.
      </Text>
      <Text style={styles.descripcionAr}>
        المناخ: تتمتع إسبانيا بتنوع مناخي كبير. في الشمال يسود المناخ المحيطي، في الوسط المناخ
        القاري، وفي الجنوب والساحل المتوسطي المناخ المتوسطي.
      </Text>

      {/* Economía */}
      <Text style={styles.descripcion}>
        Economía: España es una de las mayores economías de la Unión Europea. Sus sectores
        principales son el turismo, la agricultura, la industria automovilística y los servicios.
      </Text>
      <Text style={styles.descripcionAr}>
        الاقتصاد: إسبانيا من أكبر الاقتصادات في الاتحاد الأوروبي. من أهم القطاعات: السياحة، الزراعة،
        صناعة السيارات والخدمات.
      </Text>

      {/* Regiones y comunidades autónomas */}
      <Text style={styles.descripcion}>
        Regiones: España está dividida en 17 comunidades autónomas y 2 ciudades autónomas (Ceuta y
        Melilla), cada una con identidad y tradiciones propias.
      </Text>
      <Text style={styles.descripcionAr}>
        المناطق: تنقسم إسبانيا إلى 17 منطقة ذاتية الحكم و مدينتين مستقلتين (سبتة ومليلية)، ولكل
        منطقة هويتها وتقاليدها الخاصة.
      </Text>

      {/* Símbolos nacionales */}
      <Text style={styles.descripcion}>
        Símbolos nacionales: La bandera de España es roja y amarilla. El himno nacional se llama
        &quot;Marcha Real&quot; y no tiene letra oficial.
      </Text>
      <Text style={styles.descripcionAr}>
        الرموز الوطنية: علم إسبانيا لونه أحمر وأصفر. النشيد الوطني يسمى &quot;المارش الملكي&quot;
        ولا يحتوي على كلمات رسمية.
      </Text>

      {/* Deportes */}
      <Text style={styles.descripcion}>
        Deportes: El fútbol es el deporte más popular en España. Equipos como el Real Madrid y el FC
        Barcelona son conocidos mundialmente.
      </Text>
      <Text style={styles.descripcionAr}>
        الرياضة: كرة القدم هي الرياضة الأكثر شعبية في إسبانيا. فرق مثل ريال مدريد وبرشلونة معروفة
        عالميًا.
      </Text>

      {/* Turismo */}
      <Text style={styles.descripcion}>
        Turismo: España es uno de los países más visitados del mundo, famosa por sus playas,
        monumentos históricos y su gastronomía.
      </Text>
      <Text style={styles.descripcionAr}>
        السياحة: إسبانيا من أكثر الدول زيارة في العالم، تشتهر بشواطئها، معالمها التاريخية
        ومأكولاتها.
      </Text>

      {/* Inventos españoles */}
      <Text style={styles.descripcion}>
        Inventos españoles: Entre los inventos españoles destacan el submarino, la fregona y el
        chupachups.
      </Text>
      <Text style={styles.descripcionAr}>
        اختراعات إسبانية: من بين الاختراعات الإسبانية البارزة الغواصة، الممسحة و&quot;تشوبا
        تشوبس&quot;.
      </Text>

      {/* Regiones de España y sus características */}
      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Andalucía"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Andalucía</Text>
        <Image source={{ uri: banderas["Andalucía"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          Andalucía es famosa por el flamenco, la alegría de sus fiestas y su gastronomía. El
          flamenco es su música y baile tradicional más conocido.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "Andalucía es famosa por el flamenco, la alegría de sus fiestas y su gastronomía. El flamenco es su música y baile tradicional más conocido.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          الأندلس مشهورة بالفلامنكو، وبهجة احتفالاتها ومأكولاتها. الفلامنكو هو موسيقاها ورقصها
          التقليدي الأكثر شهرة.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "الأندلس مشهورة بالفلامنكو، وبهجة احتفالاتها ومأكولاتها. الفلامنكو هو موسيقاها ورقصها التقليدي الأكثر شهرة.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Cataluña"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Cataluña</Text>
        <Image source={{ uri: banderas["Cataluña"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          Cataluña destaca por su identidad cultural, la sardana como baile típico y una gran
          tradición de música coral y festivales populares.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "Cataluña destaca por su identidad cultural, la sardana como baile típico y una gran tradición de música coral y festivales populares.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          كتالونيا تتميز بهويتها الثقافية، ورقصة السردانا التقليدية، وتقاليد موسيقية كورالية
          ومهرجانات شعبية.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "كتالونيا تتميز بهويتها الثقافية، ورقصة السردانا التقليدية، وتقاليد موسيقية كورالية ومهرجانات شعبية.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Galicia"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Galicia</Text>
        <Image source={{ uri: banderas["Galicia"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          Galicia es conocida por su música de gaitas, danzas tradicionales como la muñeira y una
          cultura celta muy marcada.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "Galicia es conocida por su música de gaitas, danzas tradicionales como la muñeira y una cultura celta muy marcada.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          غاليسيا معروفة بموسيقى القربة (الجيتا)، ورقصات تقليدية مثل المونيرا، وثقافتها السلتية
          البارزة.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "غاليسيا معروفة بموسيقى القربة (الجيتا)، ورقصات تقليدية مثل المونيرا، وثقافتها السلتية البارزة.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["País Vasco"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>País Vasco</Text>
        <Image source={{ uri: banderas["País Vasco"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          El País Vasco tiene una cultura única, con deportes rurales, danzas como el aurresku y una
          rica tradición de música popular vasca.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "El País Vasco tiene una cultura única, con deportes rurales, danzas como el aurresku y una rica tradición de música popular vasca.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          إقليم الباسك لديه ثقافة فريدة، مع رياضات ريفية، رقصات مثل الأوريسكو وتقاليد موسيقية باسكية
          غنية.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "إقليم الباسك لديه ثقافة فريدة، مع رياضات ريفية، رقصات مثل الأوريسكو وتقاليد موسيقية باسكية غنية.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Comunidad Valenciana"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Comunidad Valenciana</Text>
        <Image source={{ uri: banderas["Comunidad Valenciana"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          La Comunidad Valenciana es famosa por las Fallas, la paella y la música de bandas. La
          dolçaina es un instrumento típico de la región.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "La Comunidad Valenciana es famosa por las Fallas, la paella y la música de bandas. La dolçaina es un instrumento típico de la región.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          منطقة فالنسيا مشهورة بمهرجان الفاياس، والباييلا، وموسيقى الفرق النحاسية. الدلساينا آلة
          موسيقية تقليدية في المنطقة.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "منطقة فالنسيا مشهورة بمهرجان الفاياس، والباييلا، وموسيقى الفرق النحاسية. الدلساينا آلة موسيقية تقليدية في المنطقة.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Canarias"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Canarias</Text>
        <Image source={{ uri: banderas["Canarias"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          Canarias tiene una cultura influida por África y América. El timple es un instrumento
          musical típico y el folclore es muy variado.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "Canarias tiene una cultura influida por África y América. El timple es un instrumento musical típico y el folclore es muy variado.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          جزر الكناري لديها ثقافة متأثرة بأفريقيا وأمريكا. التيمبل آلة موسيقية تقليدية والفلكلور
          متنوع جدًا.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "جزر الكناري لديها ثقافة متأثرة بأفريقيا وأمريكا. التيمبل آلة موسيقية تقليدية والفلكلور متنوع جدًا.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Castilla y León"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Castilla y León</Text>
        <Image source={{ uri: banderas["Castilla y León"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          Castilla y León es conocida por la jota, un baile tradicional, y por su patrimonio
          histórico y cultural.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "Castilla y León es conocida por la jota, un baile tradicional, y por su patrimonio histórico y cultural.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          قشتالة وليون معروفة برقصة الجوتا التقليدية، وتراثها التاريخي والثقافي.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "قشتالة وليون معروفة برقصة الجوتا التقليدية، وتراثها التاريخي والثقافي.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.regionHeader}>
        <Image source={{ uri: banderas["Aragón"] }} style={styles.bandera} />
        <Text style={styles.tituloSeccion}>Aragón</Text>
        <Image source={{ uri: banderas["Aragón"] }} style={styles.bandera} />
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcion}>
          Aragón tiene la jota aragonesa como su baile más representativo y una rica tradición de
          música popular.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "Aragón tiene la jota aragonesa como su baile más representativo y una rica tradición de música popular.",
              "es"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.audioRow}>
        <Text style={styles.descripcionAr}>
          أراغون لديها رقصة الجوتا الأراغونية كتعبيرها الأكثر شهرة وتقاليد موسيقية شعبية غنية.
        </Text>
        <TouchableOpacity
          onPress={() =>
            reproducir(
              "أراغون لديها رقصة الجوتا الأراغونية كتعبيرها الأكثر شهرة وتقاليد موسيقية شعبية غنية.",
              "ar"
            )
          }
        >
          <Ionicons name="volume-high" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  volverBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
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
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  autoresBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 18,
    alignSelf: "center",
    shadowColor: "#0003",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  autoresBtnText: {
    color: '#FFD700',
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
    textAlign: "center",
  },
  container: {
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  tituloAr: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  descripcion: {
    fontSize: 17,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  descripcionAr: {
    fontSize: 17,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  introES: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  introAR: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "System",
    writingDirection: "rtl",
  },
  tituloSeccion: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 4,
    textAlign: "center",
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 4,
  },
  bandera: {
    width: 36,
    height: 24,
    resizeMode: "contain",
    marginHorizontal: 6,
  },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 8,
  },
});
