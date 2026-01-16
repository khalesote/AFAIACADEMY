import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function VerbosScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/GramaticaScreen")}
        >
          <Text style={styles.backButtonText}>{"← Volver"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Verbos regulares en español</Text>
        <Text style={styles.regla}>Regla general:</Text>
        <Text style={styles.texto}>
          Los verbos regulares en español se agrupan en tres conjugaciones según la terminación de
          su infinitivo: -AR, -ER y -IR. Cada grupo sigue un patrón específico para formar las
          distintas personas.
        </Text>
        <Text style={styles.textoAr}>
          الأفعال المنتظمة في الإسبانية تنقسم إلى ثلاث مجموعات حسب نهاية المصدر: -AR، -ER، -IR. كل
          مجموعة لها قاعدة تصريف خاصة بها.
        </Text>

        {/* Tabla de conjugación -AR */}
        <Text style={styles.regla}>Conjugación del verbo "trabajar" (-AR):</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>trabajo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>trabajas</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>trabaja</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>trabajamos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>trabajáis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>trabajan</Text>
          </Text>
        </View>

        {/* Tabla de conjugación -ER */}
        <Text style={styles.regla}>Conjugación del verbo "comer" (-ER):</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>como</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>comes</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>come</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>comemos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>coméis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>comen</Text>
          </Text>
        </View>

        {/* Tabla de conjugación -IR */}
        <Text style={styles.regla}>Conjugación del verbo "vivir" (-IR):</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>vivo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>vives</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>vive</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>vivimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>vivís</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>viven</Text>
          </Text>
        </View>

        {/* Verbos regulares con diptongo */}
        <Text style={styles.regla}>Verbos regulares con diptongo</Text>
        <Text style={styles.texto}>
          Los verbos con diptongo son aquellos que, al conjugarse, cambian la vocal de la raíz en
          algunas formas. El cambio ocurre en todas las personas excepto nosotros/as y vosotros/as.
          Los diptongos más comunes son:
          <Text style={{ fontWeight: "bold" }}> e → ie</Text> (pensar → pienso),{" "}
          <Text style={{ fontWeight: "bold" }}> o → ue</Text> (dormir → duermo), y{" "}
          <Text style={{ fontWeight: "bold" }}> u → ue</Text> (jugar → juego). También existen otros
          como <Text style={{ fontWeight: "bold" }}> e → i</Text> (pedir → pido). Este cambio sucede
          solo cuando la sílaba acentuada es la raíz.
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Ejemplo:</Text> El verbo "pensar" se conjuga: yo{" "}
          <Text style={styles.verbo}>pienso</Text>, tú <Text style={styles.verbo}>piensas</Text>, él{" "}
          <Text style={styles.verbo}>piensa</Text>, pero nosotros{" "}
          <Text style={styles.verbo}>pensamos</Text> (sin diptongo).
        </Text>
        <Text style={styles.textoAr}>
          الأفعال ذات الديفتونغو هي الأفعال التي يتغير فيها حرف العلة في الجذر عند التصريف في بعض
          الضمائر. يحدث هذا التغيير في جميع الضمائر ما عدا "nosotros/as" و"vosotros/as". أكثر
          التغييرات شيوعًا هي:
          <Text style={{ fontWeight: "bold" }}> e ← ie</Text> (pensar ← pienso)،{" "}
          <Text style={{ fontWeight: "bold" }}> o ← ue</Text> (dormir ← duermo)، و{" "}
          <Text style={{ fontWeight: "bold" }}> u ← ue</Text> (jugar ← juego). أحيانًا يوجد أيضًا{" "}
          <Text style={{ fontWeight: "bold" }}> e ← i</Text> (pedir ← pido). يحدث هذا التغيير فقط
          عندما تكون المقطع الصوتي المشدد هو الجذر.
        </Text>
        <Text style={styles.textoAr}>
          <Text style={{ fontWeight: "bold" }}>مثال:</Text> الفعل "pensar" يُصرف: yo{" "}
          <Text style={styles.verbo}>pienso</Text>، tú <Text style={styles.verbo}>piensas</Text>، él{" "}
          <Text style={styles.verbo}>piensa</Text>، لكن nosotros{" "}
          <Text style={styles.verbo}>pensamos</Text> (بدون ديفتونغو).
        </Text>
        {/* Nota sobre el tiempo verbal */}
        <Text style={[styles.texto, { fontStyle: "italic", color: "#888", marginBottom: 6 }]}>
          Todas las conjugaciones mostradas están en{" "}
          <Text style={{ fontWeight: "bold" }}>presente de indicativo</Text>.
        </Text>
        <Text
          style={[
            styles.textoAr,
            {
              fontStyle: "italic",
              color: "#888",
              marginTop: -8,
              marginBottom: 8,
            },
          ]}
        >
          جميع التصريفات المعروضة هنا في زمن <Text style={{ fontWeight: "bold" }}>حاضر</Text>{" "}
          (Presente de indicativo).
        </Text>
        {/* Tabla de ejemplos de verbos con diptongo */}
        <View style={styles.tablaContainer}>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>e → ie</Text>
            <Text style={styles.tablaCelda}>
              <Text style={{ fontWeight: "bold" }}>Infinitivo / Árabe / yo / nosotros</Text>
            </Text>
            <Text style={styles.tablaCelda}>pensar / يفكر / pienso / pensamos</Text>
            <Text style={styles.tablaCelda}>cerrar / يغلق / cierro / cerramos</Text>
            <Text style={styles.tablaCelda}>empezar / يبدأ / empiezo / empezamos</Text>
            <Text style={styles.tablaCelda}>entender / يفهم / entiendo / entendemos</Text>
            <Text style={styles.tablaCelda}>preferir / يفضل / prefiero / preferimos</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>o → ue</Text>
            <Text style={styles.tablaCelda}>
              <Text style={{ fontWeight: "bold" }}>Infinitivo / Árabe / yo / nosotros</Text>
            </Text>
            <Text style={styles.tablaCelda}>dormir / ينام / duermo / dormimos</Text>
            <Text style={styles.tablaCelda}>poder / يستطيع / puedo / podemos</Text>
            <Text style={styles.tablaCelda}>volver / يعود / vuelvo / volvemos</Text>
            <Text style={styles.tablaCelda}>contar / يعد / cuento / contamos</Text>
            <Text style={styles.tablaCelda}>costar / يكلف / cuesto / costamos</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>u → ue &amp; e → i</Text>
            <Text style={styles.tablaCelda}>
              <Text style={{ fontWeight: "bold" }}>Infinitivo / Árabe / yo / nosotros</Text>
            </Text>
            <Text style={styles.tablaCelda}>jugar / يلعب / juego / jugamos</Text>
            <Text style={styles.tablaCelda}>pedir / يطلب / pido / pedimos</Text>
            <Text style={styles.tablaCelda}>servir / يخدم / sirvo / servimos</Text>
            <Text style={styles.tablaCelda}>repetir / يكرر / repito / repetimos</Text>
            <Text style={styles.tablaCelda}>medir / يقيس / mido / medimos</Text>
          </View>
        </View>

        {/* Ejemplo de conjugación diptongo - pensar */}
        <Text style={styles.regla}>Conjugación del verbo "pensar" (e &rarr; ie):</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>pienso</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>piensas</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>piensa</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>pensamos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>pensáis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>piensan</Text>
          </Text>
        </View>
        {/* Ejemplo de conjugación diptongo - dormir */}
        <Text style={styles.regla}>Conjugación del verbo "dormir" (o &rarr; ue):</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>duermo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>duermes</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>duerme</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>dormimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>dormís</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>duermen</Text>
          </Text>
        </View>
        {/* Ejemplo de conjugación diptongo - jugar */}
        <Text style={styles.regla}>Conjugación del verbo "jugar" (u &rarr; ue):</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>juego</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>juegas</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>juega</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>jugamos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>jugáis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>juegan</Text>
          </Text>
        </View>

        {/* Verbos irregulares en presente */}
        <Text style={styles.regla}>Verbos irregulares en presente</Text>
        <Text style={styles.texto}>
          Los verbos irregulares no siguen los patrones de conjugación regulares y pueden cambiar la
          raíz, la terminación o ambos. Son muy frecuentes y es importante aprenderlos de memoria.
          Algunas irregularidades comunes son: - Cambios en la raíz (e → ie, o → ue, e → i) -
          Cambios sólo en la primera persona (yo) - Terminaciones irregulares
        </Text>
        <Text style={styles.textoAr}>
          الأفعال غير المنتظمة في الإسبانية لا تتبع قواعد التصريف العادية، وقد يتغير الجذر أو
          النهاية أو كلاهما. هذه الأفعال شائعة جدًا ويجب حفظها. من أشهر التغييرات: - تغيير في الجذر
          (مثلاً: e ← ie، o ← ue، e ← i) - تغيير فقط في صيغة "yo" - نهايات غير منتظمة
        </Text>
        <Text style={styles.subtitulo}>
          Ejemplos de verbos irregulares y sus conjugaciones en presente
        </Text>
        <View style={styles.tablaContainer}>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Tener</Text>
            <Text style={styles.tablaCelda}>yo tengo</Text>
            <Text style={styles.tablaCelda}>tú tienes</Text>
            <Text style={styles.tablaCelda}>él/ella tiene</Text>
            <Text style={styles.tablaCelda}>nosotros tenemos</Text>
            <Text style={styles.tablaCelda}>vosotros tenéis</Text>
            <Text style={styles.tablaCelda}>ellos tienen</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Decir</Text>
            <Text style={styles.tablaCelda}>yo digo</Text>
            <Text style={styles.tablaCelda}>tú dices</Text>
            <Text style={styles.tablaCelda}>él/ella dice</Text>
            <Text style={styles.tablaCelda}>nosotros decimos</Text>
            <Text style={styles.tablaCelda}>vosotros decís</Text>
            <Text style={styles.tablaCelda}>ellos dicen</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Ir</Text>
            <Text style={styles.tablaCelda}>yo voy</Text>
            <Text style={styles.tablaCelda}>tú vas</Text>
            <Text style={styles.tablaCelda}>él/ella va</Text>
            <Text style={styles.tablaCelda}>nosotros vamos</Text>
            <Text style={styles.tablaCelda}>vosotros vais</Text>
            <Text style={styles.tablaCelda}>ellos van</Text>
          </View>
        </View>
        <View style={styles.tablaContainer}>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Hacer</Text>
            <Text style={styles.tablaCelda}>yo hago</Text>
            <Text style={styles.tablaCelda}>tú haces</Text>
            <Text style={styles.tablaCelda}>él/ella hace</Text>
            <Text style={styles.tablaCelda}>nosotros hacemos</Text>
            <Text style={styles.tablaCelda}>vosotros hacéis</Text>
            <Text style={styles.tablaCelda}>ellos hacen</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Ver</Text>
            <Text style={styles.tablaCelda}>yo veo</Text>
            <Text style={styles.tablaCelda}>tú ves</Text>
            <Text style={styles.tablaCelda}>él/ella ve</Text>
            <Text style={styles.tablaCelda}>nosotros vemos</Text>
            <Text style={styles.tablaCelda}>vosotros veis</Text>
            <Text style={styles.tablaCelda}>ellos ven</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Salir</Text>
            <Text style={styles.tablaCelda}>yo salgo</Text>
            <Text style={styles.tablaCelda}>tú sales</Text>
            <Text style={styles.tablaCelda}>él/ella sale</Text>
            <Text style={styles.tablaCelda}>nosotros salimos</Text>
            <Text style={styles.tablaCelda}>vosotros salís</Text>
            <Text style={styles.tablaCelda}>ellos salen</Text>
          </View>
        </View>
        <View style={styles.tablaContainer}>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Poner</Text>
            <Text style={styles.tablaCelda}>yo pongo</Text>
            <Text style={styles.tablaCelda}>tú pones</Text>
            <Text style={styles.tablaCelda}>él/ella pone</Text>
            <Text style={styles.tablaCelda}>nosotros ponemos</Text>
            <Text style={styles.tablaCelda}>vosotros ponéis</Text>
            <Text style={styles.tablaCelda}>ellos ponen</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Traer</Text>
            <Text style={styles.tablaCelda}>yo traigo</Text>
            <Text style={styles.tablaCelda}>tú traes</Text>
            <Text style={styles.tablaCelda}>él/ella trae</Text>
            <Text style={styles.tablaCelda}>nosotros traemos</Text>
            <Text style={styles.tablaCelda}>vosotros traéis</Text>
            <Text style={styles.tablaCelda}>ellos traen</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>Dar</Text>
            <Text style={styles.tablaCelda}>yo doy</Text>
            <Text style={styles.tablaCelda}>tú das</Text>
            <Text style={styles.tablaCelda}>él/ella da</Text>
            <Text style={styles.tablaCelda}>nosotros damos</Text>
            <Text style={styles.tablaCelda}>vosotros dais</Text>
            <Text style={styles.tablaCelda}>ellos dan</Text>
          </View>
        </View>

        {/* Ejemplos de frases */}
        <Text style={styles.regla}>Ejemplos en frases:</Text>
        <View style={styles.ejemploFraseBox}>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>trabajo</Text> en
            una tienda. <Text style={styles.traduccionAr}>أنا أعمل في متجر.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>bailas</Text> muy
            bien. <Text style={styles.traduccionAr}>أنتَ ترقص جيدًا.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Nosotros</Text>{" "}
            <Text style={styles.verbo}>enseñamos</Text> español.{" "}
            <Text style={styles.traduccionAr}>نحن نُعلّم الإسبانية.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Ella</Text> <Text style={styles.verbo}>come</Text> fruta.{" "}
            <Text style={styles.traduccionAr}>هي تأكل الفاكهة.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Vosotros</Text> <Text style={styles.verbo}>leéis</Text>{" "}
            libros. <Text style={styles.traduccionAr}>أنتم تقرأون كتبًا.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>aprendo</Text>{" "}
            árabe. <Text style={styles.traduccionAr}>أنا أتعلم العربية.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>vives</Text> en
            Madrid. <Text style={styles.traduccionAr}>أنتَ تعيش في مدريد.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Ellos</Text> <Text style={styles.verbo}>escriben</Text>{" "}
            cartas. <Text style={styles.traduccionAr}>هم يكتبون رسائل.</Text>
          </Text>
          <Text style={styles.ejemploFrase}>
            <Text style={styles.pronombre}>Nosotros</Text> <Text style={styles.verbo}>abrimos</Text>{" "}
            la puerta. <Text style={styles.traduccionAr}>نحن نفتح الباب.</Text>
          </Text>
        </View>

        {/* Tablas de ejemplos adicionales */}
        <View style={styles.tablaContainer}>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>-AR</Text>
            <Text style={styles.tablaCelda}>
              <Text style={{ fontWeight: "bold" }}>Infinitivo / Árabe / "yo"</Text>
            </Text>
            <Text style={styles.tablaCelda}>cantar / يغني / yo canto - أنا أغني</Text>
            <Text style={styles.tablaCelda}>mirar / ينظر / yo miro - أنا أنظر</Text>
            <Text style={styles.tablaCelda}>escuchar / يسمع / yo escucho - أنا أسمع</Text>
            <Text style={styles.tablaCelda}>visitar / يزور / yo visito - أنا أزور</Text>
            <Text style={styles.tablaCelda}>llamar / يتصل / yo llamo - أنا أتصل</Text>
            <Text style={styles.tablaCelda}>viajar / يسافر / yo viajo - أنا أسافر</Text>
            <Text style={styles.tablaCelda}>cocinar / يطبخ / yo cocino - أنا أطبخ</Text>
            <Text style={styles.tablaCelda}>nadar / يسبح / yo nado - أنا أسبح</Text>
            <Text style={styles.tablaCelda}>pintar / يرسم / yo pinto - أنا أرسم</Text>
            <Text style={styles.tablaCelda}>enseñar / يُعلّم / yo enseño - أنا أُعلّم</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>-ER</Text>
            <Text style={styles.tablaCelda}>
              <Text style={{ fontWeight: "bold" }}>Infinitivo / Árabe / "yo"</Text>
            </Text>
            <Text style={styles.tablaCelda}>comer / يأكل / yo como - أنا آكل</Text>
            <Text style={styles.tablaCelda}>leer / يقرأ / yo leo - أنا أقرأ</Text>
            <Text style={styles.tablaCelda}>beber / يشرب / yo bebo - أنا أشرب</Text>
            <Text style={styles.tablaCelda}>aprender / يتعلم / yo aprendo - أنا أتعلم</Text>
            <Text style={styles.tablaCelda}>correr / يركض / yo corro - أنا أركض</Text>
            <Text style={styles.tablaCelda}>vender / يبيع / yo vendo - أنا أبيع</Text>
            <Text style={styles.tablaCelda}>romper / يكسر / yo rompo - أنا أكسر</Text>
            <Text style={styles.tablaCelda}>creer / يعتقد / yo creo - أنا أعتقد</Text>
            <Text style={styles.tablaCelda}>comprender / يفهم / yo comprendo - أنا أفهم</Text>
            <Text style={styles.tablaCelda}>temer / يخاف / yo temo - أنا أخاف</Text>
            <Text style={styles.tablaCelda}>correr / يركض / yo corro - أنا أركض</Text>
            <Text style={styles.tablaCelda}>deber / يجب / yo debo - يجب أن</Text>
            <Text style={styles.tablaCelda}>sorprender / يفاجئ / yo sorprendo - أنا أفاجئ</Text>
            <Text style={styles.tablaCelda}>poseer / يملك / yo poseo - أنا أملك</Text>
            <Text style={styles.tablaCelda}>prometer / يعد / yo prometo - أنا أعد</Text>
          </View>
          <View style={styles.tablaCol}>
            <Text style={styles.tablaTitulo}>-IR</Text>
            <Text style={styles.tablaCelda}>
              <Text style={{ fontWeight: "bold" }}>Infinitivo / Árabe / "yo"</Text>
            </Text>
            <Text style={styles.tablaCelda}>vivir / يعيش / yo vivo - أنا أعيش</Text>
            <Text style={styles.tablaCelda}>escribir / يكتب / yo escribo - أنا أكتب</Text>
            <Text style={styles.tablaCelda}>abrir / يفتح / yo abro - أنا أفتح</Text>
            <Text style={styles.tablaCelda}>recibir / يستلم / yo recibo - أنا أستلم</Text>
            <Text style={styles.tablaCelda}>permitir / يسمح / yo permito - أنا أسمح</Text>
            <Text style={styles.tablaCelda}>decidir / يقرر / yo decido - أنا أقرر</Text>
            <Text style={styles.tablaCelda}>subir / يصعد / yo subo - أنا أصعد</Text>
            <Text style={styles.tablaCelda}>compartir / يشارك / yo comparto - أنا أشارك</Text>
            <Text style={styles.tablaCelda}>asistir / يحضر / yo asisto - أنا أحضر</Text>
            <Text style={styles.tablaCelda}>insistir / يصرّ / yo insisto - أنا أصرّ</Text>
            <Text style={styles.tablaCelda}>omitir / يهمل / yo omito - أنا أهمل</Text>
            <Text style={styles.tablaCelda}>cumplir / ينجز / yo cumplo - أنا أنجز</Text>
            <Text style={styles.tablaCelda}>discutir / يناقش / yo discuto - أنا أناقش</Text>
            <Text style={styles.tablaCelda}>existir / يوجد / yo existo - أنا أوجد</Text>
            <Text style={styles.tablaCelda}>unir / يوحّد / yo uno - أنا أوحّد</Text>
          </View>
        </View>
        {/* Pasado simple de los verbos regulares */}
        <Text style={styles.subtitulo}>
          El pasado simple (pretérito perfecto simple) de los verbos regulares
        </Text>
        <Text style={styles.texto}>
          El pretérito perfecto simple se usa para hablar de acciones terminadas en el pasado. Es el
          tiempo más común para contar hechos del pasado en español.
        </Text>
        <Text style={styles.textoAr}>
          يُستعمل الماضي البسيط (pretérito perfecto simple) للتحدث عن أحداث انتهت في الماضي. هو
          الزمن الأكثر استخدامًا لرواية أحداث الماضي في الإسبانية.
        </Text>

        {/* Reglas de conjugación */}
        <Text style={styles.regla}>Reglas de conjugación</Text>
        <Text style={styles.texto}>
          -AR: raíz + é, aste, ó, amos, asteis, aron{"\n"}
          -ER/-IR: raíz + í, iste, ió, imos, isteis, ieron
        </Text>
        <Text style={styles.textoAr}>
          الأفعال التي تنتهي بـ -AR: الجذر + é, aste, ó, amos, asteis, aron
          {"\n"}
          الأفعال التي تنتهي بـ -ER أو -IR: الجذر + í, iste, ió, imos, isteis, ieron
        </Text>

        {/* Ejemplo -AR */}
        <Text style={styles.regla}>Ejemplo: "trabajar" (-AR)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>trabajé</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>trabajaste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>trabajó</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>trabajamos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>trabajasteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>trabajaron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          Ayer <Text style={styles.verbo}>trabajé</Text> en la oficina.
        </Text>
        <Text style={styles.textoAr}>
          بالأمس <Text style={styles.verbo}>عملتُ</Text> في المكتب.
        </Text>

        {/* Ejemplo -ER */}
        <Text style={styles.regla}>Ejemplo: "comer" (-ER)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>comí</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>comiste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>comió</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>comimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>comisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>comieron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          El sábado pasado <Text style={styles.verbo}>comimos</Text> pizza.
        </Text>
        <Text style={styles.textoAr}>
          يوم السبت الماضي <Text style={styles.verbo}>أكلنا</Text> البيتزا.
        </Text>

        {/* Ejemplo -IR */}
        <Text style={styles.regla}>Ejemplo: "vivir" (-IR)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>viví</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>viviste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>vivió</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>vivimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>vivisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>vivieron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          Hace años <Text style={styles.verbo}>viví</Text> en Marruecos.
        </Text>
        <Text style={styles.textoAr}>
          منذ سنوات <Text style={styles.verbo}>عشتُ</Text> في المغرب.
        </Text>

        {/* Otros ejemplos de conjugación en pasado */}
        <Text style={styles.subtitulo}>Más ejemplos de conjugación en pasado</Text>

        {/* Ejemplo -AR: estudiar */}
        <Text style={styles.regla}>Ejemplo: "estudiar" (-AR)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>estudié</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>estudiaste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>estudió</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>estudiamos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>estudiasteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>estudiaron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          El año pasado <Text style={styles.verbo}>estudié</Text> español.
        </Text>
        <Text style={styles.textoAr}>
          السنة الماضية <Text style={styles.verbo}>درستُ</Text> الإسبانية.
        </Text>

        {/* Ejemplo -ER: aprender */}
        <Text style={styles.regla}>Ejemplo: "aprender" (-ER)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>aprendí</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>aprendiste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>aprendió</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>aprendimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>aprendisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>aprendieron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          ¿Cuándo <Text style={styles.verbo}>aprendiste</Text> a conducir?
        </Text>
        <Text style={styles.textoAr}>
          متى <Text style={styles.verbo}>تعلمتَ</Text> القيادة؟
        </Text>

        {/* Ejemplo -IR: escribir */}
        <Text style={styles.regla}>Ejemplo: "escribir" (-IR)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>escribí</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>escribiste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>escribió</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>escribimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>escribisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>escribieron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          Ayer <Text style={styles.verbo}>escribimos</Text> una carta.
        </Text>
        <Text style={styles.textoAr}>
          بالأمس <Text style={styles.verbo}>كتبنا</Text> رسالة.
        </Text>

        {/* Verbos irregulares en pasado */}
        <Text style={styles.subtitulo}>Verbos irregulares en pasado</Text>
        <Text style={styles.texto}>
          Algunos verbos son irregulares en el pretérito perfecto simple y cambian su raíz o
          terminaciones. Aquí tienes tres de los más comunes:
        </Text>
        <Text style={styles.textoAr}>
          بعض الأفعال غير منتظمة في الماضي البسيط وتغيّر جذرها أو نهاياتها. إليك ثلاثة من أكثرها
          شيوعًا:
        </Text>

        {/* Tener */}
        <Text style={styles.regla}>Ejemplo: "tener"</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>tuve</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>tuviste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>tuvo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>tuvimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>tuvisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>tuvieron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          Ayer <Text style={styles.verbo}>tuve</Text> una reunión importante.
        </Text>
        <Text style={styles.textoAr}>
          بالأمس <Text style={styles.verbo}>كان عندي</Text> اجتماع مهم.
        </Text>

        {/* Ir */}
        <Text style={styles.regla}>Ejemplo: "ir"</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>fui</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>fuiste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>fue</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>fuimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>fuisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>fueron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          El domingo pasado <Text style={styles.verbo}>fuimos</Text> al parque.
        </Text>
        <Text style={styles.textoAr}>
          الأحد الماضي <Text style={styles.verbo}>ذهبنا</Text> إلى الحديقة.
        </Text>

        {/* Hacer */}
        <Text style={styles.regla}>Ejemplo: "hacer"</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> <Text style={styles.verbo}>hice</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> <Text style={styles.verbo}>hiciste</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text>{" "}
            <Text style={styles.verbo}>hizo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text>{" "}
            <Text style={styles.verbo}>hicimos</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text>{" "}
            <Text style={styles.verbo}>hicisteis</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text>{" "}
            <Text style={styles.verbo}>hicieron</Text>
          </Text>
        </View>
        <Text style={styles.texto}>
          La semana pasada <Text style={styles.verbo}>hice</Text> un pastel.
        </Text>
        <Text style={styles.textoAr}>
          الأسبوع الماضي <Text style={styles.verbo}>حضّرتُ</Text> كعكة.
        </Text>

        {/* Imperfecto */}
        <Text style={styles.subtitulo}>El imperfecto</Text>
        <Text style={styles.texto}>
          El imperfecto se usa para describir acciones habituales en el pasado, situaciones,
          descripciones o acciones en progreso en el pasado.
        </Text>
        <Text style={styles.textoAr}>
          يُستعمل الماضي الناقص (imperfecto) لوصف العادات، الحالات، أو الأفعال المستمرة في الماضي.
        </Text>

        <Text style={styles.regla}>Reglas de conjugación</Text>
        <Text style={styles.texto}>-AR: raíz + aba, abas, aba, ábamos, abais, aban</Text>
        <Text style={styles.texto}>-ER/-IR: raíz + ía, ías, ía, íamos, íais, ían</Text>
        <Text style={styles.textoAr}>
          الأفعال التي تنتهي بـ -AR: الجذر + aba, abas, aba, ábamos, abais, aban. الأفعال التي تنتهي
          بـ -ER أو -IR: الجذر + ía, ías, ía, íamos, íais, ían.
        </Text>

        {/* Ejemplo: trabajar */}
        <Text style={styles.regla}>Ejemplo: "trabajar" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> trabajaba
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> trabajabas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> trabajaba
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> trabajábamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> trabajabais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> trabajaban
          </Text>
        </View>
        <Text style={styles.texto}>
          Cuando era niño, <Text style={styles.verbo}>trabajaba</Text> en el campo.
        </Text>
        <Text style={styles.textoAr}>
          عندما كنت صغيرًا، <Text style={styles.verbo}>كنت أعمل</Text> في الحقل.
        </Text>

        {/* Ejemplo: comer */}
        <Text style={styles.regla}>Ejemplo: "comer" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> comía
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> comías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> comía
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> comíamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> comíais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> comían
          </Text>
        </View>
        <Text style={styles.texto}>
          Siempre <Text style={styles.verbo}>comíamos</Text> juntos los domingos.
        </Text>
        <Text style={styles.textoAr}>
          كنا <Text style={styles.verbo}>نأكل</Text> معًا كل يوم أحد.
        </Text>

        {/* Ejemplo: vivir */}
        <Text style={styles.regla}>Ejemplo: "vivir" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> vivía
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vivías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> vivía
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> vivíamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> vivíais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vivían
          </Text>
        </View>
        <Text style={styles.texto}>
          Antes <Text style={styles.verbo}>vivíamos</Text> en un pueblo pequeño.
        </Text>
        <Text style={styles.textoAr}>
          كنا <Text style={styles.verbo}>نعيش</Text> في قرية صغيرة.
        </Text>

        <Text style={styles.regla}>Verbos irregulares en imperfecto</Text>
        <Text style={styles.texto}>
          Solo hay tres verbos irregulares: ir (iba, ibas, ...), ser (era, eras, ...), ver (veía,
          veías, ...).
        </Text>
        <Text style={styles.textoAr}>
          هناك ثلاثة أفعال فقط غير منتظمة في هذا الزمن: ir (iba)، ser (era)، ver (veía).
        </Text>

        {/* Ir */}
        <Text style={styles.regla}>Ejemplo: "ir" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> iba
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> ibas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> iba
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> íbamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> ibais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> iban
          </Text>
        </View>
        <Text style={styles.texto}>
          De niño <Text style={styles.verbo}>iba</Text> al parque cada día.
        </Text>
        <Text style={styles.textoAr}>
          عندما كنت صغيرًا <Text style={styles.verbo}>كنت أذهب</Text> إلى الحديقة كل يوم.
        </Text>

        {/* Ser */}
        <Text style={styles.regla}>Ejemplo: "ser" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> era
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> eras
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> era
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> éramos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> erais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> eran
          </Text>
        </View>
        <Text style={styles.texto}>
          Mi abuela <Text style={styles.verbo}>era</Text> muy amable.
        </Text>
        <Text style={styles.textoAr}>
          جدتي <Text style={styles.verbo}>كانت</Text> طيبة جدًا.
        </Text>

        {/* Ver */}
        <Text style={styles.regla}>Ejemplo: "ver" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> veía
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> veías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> veía
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> veíamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> veíais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> veían
          </Text>
        </View>
        <Text style={styles.texto}>
          Siempre <Text style={styles.verbo}>veíamos</Text> la televisión después de cenar.
        </Text>
        <Text style={styles.textoAr}>
          كنا <Text style={styles.verbo}>نشاهد</Text> التلفاز دائمًا بعد العشاء.
        </Text>

        {/* Pluscuamperfecto */}
        <Text style={styles.subtitulo}>Pluscuamperfecto</Text>
        <Text style={styles.texto}>
          El pluscuamperfecto se usa para expresar una acción pasada que ocurrió antes de otra
          acción también pasada. Equivale a "ya había..." en español o "كنت قد..." en árabe.
        </Text>
        <Text style={styles.textoAr}>
          يُستعمل الماضي التام (pluscuamperfecto) للتعبير عن فعل حدث قبل فعل آخر في الماضي. يُشبه
          "كنت قد..." في العربية.
        </Text>

        <Text style={styles.regla}>Regla de formación</Text>
        <Text style={styles.texto}>
          haber (imperfecto) + participio pasado del verbo principal.
        </Text>
        <Text style={styles.textoAr}>
          صيغة الفعل haber في الماضي الناقص + اسم المفعول للفعل الرئيسي.
        </Text>

        <Text style={styles.regla}>Conjugación de "haber" (imperfecto)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> había
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> habías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> había
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> habíamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> habíais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> habían
          </Text>
        </View>

        <Text style={styles.regla}>Ejemplos</Text>
        <Text style={styles.texto}>
          Cuando llegué, ellos <Text style={styles.verbo}>ya habían salido</Text>.
        </Text>
        <Text style={styles.textoAr}>
          عندما وصلت، <Text style={styles.verbo}>كانوا قد خرجوا</Text> بالفعل.
        </Text>
        <Text style={styles.texto}>
          Nunca <Text style={styles.verbo}>había probado</Text> comida mexicana antes.
        </Text>
        <Text style={styles.textoAr}>
          لم <Text style={styles.verbo}>أكن قد جربتُ</Text> الطعام المكسيكي من قبل.
        </Text>
        <Text style={styles.texto}>
          Ella <Text style={styles.verbo}>había estudiado</Text> español antes de viajar.
        </Text>
        <Text style={styles.textoAr}>
          كانت <Text style={styles.verbo}>قد درست</Text> الإسبانية قبل السفر.
        </Text>

        <Text style={styles.regla}>¿Cuándo se usa?</Text>
        <Text style={styles.texto}>
          Se usa para hablar de una acción pasada anterior a otra acción pasada. Ejemplo: Cuando
          llegué a casa, mi madre ya había cocinado.
        </Text>
        <Text style={styles.textoAr}>
          يُستخدم للحديث عن فعل حدث قبل فعل آخر في الماضي. مثال: عندما وصلت إلى المنزل، كانت أمي قد
          طبخت.
        </Text>

        <Text style={styles.regla}>Diferencias con otros tiempos</Text>
        <Text style={styles.texto}>
          El pluscuamperfecto indica anterioridad respecto a otra acción pasada. El imperfecto
          describe acciones habituales o en progreso en el pasado. El perfecto habla de acciones
          pasadas relacionadas con el presente.
        </Text>
        <Text style={styles.textoAr}>
          الزمن التام الماضي يُظهر أن الفعل حدث قبل فعل آخر في الماضي. الماضي الناقص لوصف العادات أو
          الحالات. الماضي القريب للأفعال المرتبطة بالحاضر.
        </Text>

        {/* Ejemplos con verbos irregulares en pluscuamperfecto */}
        <Text style={styles.regla}>Ejemplos con verbos irregulares en pluscuamperfecto</Text>
        <Text style={styles.texto}>
          Cuando llegué, él ya <Text style={styles.verbo}>había hecho</Text> la tarea. (hacer)
        </Text>
        <Text style={styles.textoAr}>
          عندما وصلت، كان <Text style={styles.verbo}>قد أنجز</Text> الواجب بالفعل.
        </Text>
        <Text style={styles.texto}>
          Nunca <Text style={styles.verbo}>había dicho</Text> eso antes. (decir)
        </Text>
        <Text style={styles.textoAr}>
          لم <Text style={styles.verbo}>أكن قد قلتُ</Text> ذلك من قبل.
        </Text>
        <Text style={styles.texto}>
          Cuando salimos, ya <Text style={styles.verbo}>había puesto</Text> la mesa. (poner)
        </Text>
        <Text style={styles.textoAr}>
          عندما خرجنا، كان <Text style={styles.verbo}>قد وضع</Text> الطاولة بالفعل.
        </Text>

        {/* Tabla comparativa de tiempos compuestos */}
        <Text style={styles.regla}>
          Comparación visual: Pluscuamperfecto, Imperfecto y Perfecto
        </Text>
        <View style={[styles.tablaConjugacionBox, { marginBottom: 8 }]}>
          <Text style={styles.tablaCelda}>
            <Text style={{ fontWeight: "bold" }}>Tiempo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={{ fontWeight: "bold" }}>Ejemplo</Text>
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={{ fontWeight: "bold" }}>Traducción árabe</Text>
          </Text>
        </View>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>Pluscuamperfecto</Text>
          <Text style={styles.tablaCelda}>
            Cuando llegué, <Text style={styles.verbo}>habían comido</Text>.
          </Text>
          <Text style={styles.tablaCelda}>
            عندما وصلت، <Text style={styles.verbo}>كانوا قد أكلوا</Text>.
          </Text>
        </View>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>Imperfecto</Text>
          <Text style={styles.tablaCelda}>
            Cuando era niño, <Text style={styles.verbo}>comía</Text> mucho pan.
          </Text>
          <Text style={styles.tablaCelda}>
            عندما كنت صغيرًا، <Text style={styles.verbo}>كنت آكل</Text> الكثير من الخبز.
          </Text>
        </View>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>Perfecto</Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.verbo}>He comido</Text> pizza hoy.
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.verbo}>أكلتُ</Text> بيتزا اليوم.
          </Text>
        </View>

        {/* Presente perfecto */}
        <Text style={styles.subtitulo}>Presente perfecto</Text>
        <Text style={styles.texto}>
          El presente perfecto se usa para hablar de acciones que han ocurrido en un pasado reciente
          y que tienen relevancia en el presente. Se forma con el verbo "haber" en presente +
          participio del verbo principal.
        </Text>
        <Text style={styles.textoAr}>
          يُستعمل المضارع التام للتحدث عن أحداث وقعت في الماضي القريب ولها علاقة بالحاضر. يتكوّن من
          فعل "haber" في المضارع + اسم المفعول للفعل الرئيسي.
        </Text>

        <Text style={styles.regla}>Conjugación de "haber" en presente</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> he
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> has
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> ha
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> hemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> habéis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> han
          </Text>
        </View>

        <Text style={styles.regla}>Participios regulares</Text>
        <Text style={styles.texto}>
          -AR: raíz + ado (trabajado), -ER/-IR: raíz + ido (comido, vivido)
        </Text>
        <Text style={styles.textoAr}>
          الأفعال التي تنتهي بـ -AR: الجذر + ado (trabajado)، الأفعال التي تنتهي بـ -ER أو -IR:
          الجذر + ido (comido, vivido)
        </Text>

        {/* Ejemplo: trabajar */}
        <Text style={styles.regla}>Ejemplo: "trabajar"</Text>
        <Text style={styles.texto}>
          <Text style={styles.pronombre}>Yo</Text> he trabajado
        </Text>
        <Text style={styles.textoAr}>
          <Text style={styles.pronombre}>أنا</Text> <Text style={styles.verbo}>عملتُ</Text> (he
          trabajado)
        </Text>

        {/* Ejemplo: comer */}
        <Text style={styles.regla}>Ejemplo: "comer"</Text>
        <Text style={styles.texto}>
          <Text style={styles.pronombre}>Nosotros</Text> hemos comido
        </Text>
        <Text style={styles.textoAr}>
          <Text style={styles.pronombre}>نحن</Text> <Text style={styles.verbo}>أكلنا</Text> (hemos
          comido)
        </Text>

        {/* Ejemplo: vivir */}
        <Text style={styles.regla}>Ejemplo: "vivir"</Text>
        <Text style={styles.texto}>
          <Text style={styles.pronombre}>Ellos</Text> han vivido
        </Text>
        <Text style={styles.textoAr}>
          <Text style={styles.pronombre}>هم</Text> <Text style={styles.verbo}>عاشوا</Text> (han
          vivido)
        </Text>

        {/* Reglas y notas sobre el presente perfecto */}
        <Text style={styles.regla}>¿Cómo se forma el participio pasado?</Text>
        <Text style={styles.texto}>El participio pasado se forma así:</Text>
        <Text style={styles.texto}>
          -AR: raíz + <Text style={styles.verbo}>ado</Text> (ej: trabajado, estudiado)
        </Text>
        <Text style={styles.texto}>
          -ER/-IR: raíz + <Text style={styles.verbo}>ido</Text> (ej: comido, vivido, aprendido)
        </Text>
        <Text style={styles.textoAr}>
          اسم المفعول يُصاغ هكذا: الأفعال التي تنتهي بـ -AR: الجذر + ado (trabajado)، الأفعال التي
          تنتهي بـ -ER أو -IR: الجذر + ido (comido, vivido)
        </Text>

        <Text style={styles.regla}>Participios irregulares comunes</Text>
        <Text style={styles.texto}>
          <Text style={styles.verbo}>escrito</Text> (escribir),{" "}
          <Text style={styles.verbo}>dicho</Text> (decir), <Text style={styles.verbo}>hecho</Text>{" "}
          (hacer), <Text style={styles.verbo}>visto</Text> (ver),{" "}
          <Text style={styles.verbo}>puesto</Text> (poner), <Text style={styles.verbo}>vuelto</Text>{" "}
          (volver), <Text style={styles.verbo}>roto</Text> (romper),{" "}
          <Text style={styles.verbo}>abierto</Text> (abrir)
        </Text>
        <Text style={styles.textoAr}>
          بعض أسماء المفعول غير المنتظمة: escrito (كتب)، dicho (قال)، hecho (فعل/حضّر)، visto (رأى)،
          puesto (وضع)، vuelto (عاد)، roto (كسر)، abierto (فتح)
        </Text>

        <Text style={styles.regla}>Uso del verbo "haber"</Text>
        <Text style={styles.texto}>
          "Haber" es un verbo auxiliar: nunca lleva significado propio aquí, solo sirve para formar
          el tiempo compuesto. Siempre va antes del participio y nunca se separan.
        </Text>
        <Text style={styles.textoAr}>
          فعل "haber" هو فعل مساعد: لا يحمل معنى خاص هنا، فقط يُستخدم لتكوين الزمن المركب ويأتي
          دائمًا قبل اسم المفعول ولا يفصل بينهما.
        </Text>

        <Text style={styles.regla}>Adverbios frecuentes en el presente perfecto</Text>
        <Text style={styles.texto}>
          ya (بالفعل), todavía no (ليس بعد), nunca (أبدًا), alguna vez (مرة), varias veces (عدة
          مرات), siempre (دائمًا), recientemente (مؤخرًا), hoy (اليوم), esta semana (هذا الأسبوع),
          este mes (هذا الشهر), este año (هذه السنة)
        </Text>

        <Text style={styles.regla}>Ejemplos con adverbios</Text>
        <Text style={styles.texto}>
          ¿<Text style={styles.verbo}>Has</Text> <Text style={styles.verbo}>comido</Text>{" "}
          <Text style={styles.verbo}>alguna vez</Text> sushi?
        </Text>
        <Text style={styles.textoAr}>
          هل <Text style={styles.verbo}>أكلتَ</Text> السوشي <Text style={styles.verbo}>من قبل</Text>
          ؟
        </Text>
        <Text style={styles.texto}>
          Yo <Text style={styles.verbo}>nunca</Text> <Text style={styles.verbo}>he viajado</Text> a
          Asia.
        </Text>
        <Text style={styles.textoAr}>
          أنا <Text style={styles.verbo}>لم أسافر</Text> إلى آسيا{" "}
          <Text style={styles.verbo}>أبدًا</Text>.
        </Text>
        <Text style={styles.texto}>
          ¿<Text style={styles.verbo}>Has</Text> <Text style={styles.verbo}>hecho</Text> tu tarea{" "}
          <Text style={styles.verbo}>ya</Text>?
        </Text>
        <Text style={styles.textoAr}>
          هل <Text style={styles.verbo}>أنجزتَ</Text> واجبك <Text style={styles.verbo}>بالفعل</Text>
          ؟
        </Text>
        <Text style={styles.texto}>
          Nosotros <Text style={styles.verbo}>hemos visto</Text> esa película{" "}
          <Text style={styles.verbo}>varias veces</Text>.
        </Text>
        <Text style={styles.textoAr}>
          نحن <Text style={styles.verbo}>شاهدنا</Text> ذلك الفيلم{" "}
          <Text style={styles.verbo}>عدة مرات</Text>.
        </Text>

        {/* Ejemplos con adverbios de tiempo específicos */}
        <Text style={styles.regla}>Ejemplos con los adverbios de tiempo</Text>
        {/* Hoy */}
        <Text style={styles.texto}>
          Hoy <Text style={styles.verbo}>he estudiado</Text> mucho.
        </Text>
        <Text style={styles.textoAr}>
          اليوم <Text style={styles.verbo}>درستُ</Text> كثيرًا.
        </Text>
        {/* Esta semana */}
        <Text style={styles.texto}>
          Esta semana <Text style={styles.verbo}>he ido</Text> al médico dos veces.
        </Text>
        <Text style={styles.textoAr}>
          هذا الأسبوع <Text style={styles.verbo}>ذهبتُ</Text> إلى الطبيب مرتين.
        </Text>
        {/* Este mes */}
        <Text style={styles.texto}>
          Este mes <Text style={styles.verbo}>hemos comprado</Text> un coche nuevo.
        </Text>
        <Text style={styles.textoAr}>
          هذا الشهر <Text style={styles.verbo}>اشترينا</Text> سيارة جديدة.
        </Text>
        {/* Este año */}
        <Text style={styles.texto}>
          Este año <Text style={styles.verbo}>he aprendido</Text> mucho español.
        </Text>
        <Text style={styles.textoAr}>
          هذه السنة <Text style={styles.verbo}>تعلمتُ</Text> الكثير من الإسبانية.
        </Text>
        {/* Futuro simple */}
        <Text style={styles.subtitulo}>Futuro simple</Text>
        <Text style={styles.texto}>
          El futuro simple se usa para hablar de acciones que ocurrirán más adelante. Se forma
          añadiendo las terminaciones al infinitivo del verbo.
        </Text>
        <Text style={styles.textoAr}>
          يُستعمل المستقبل البسيط للتحدث عن أحداث ستحدث لاحقًا. يتكوّن بإضافة النهايات إلى المصدر.
        </Text>

        <Text style={styles.regla}>
          Terminaciones del futuro para todos los grupos (-AR, -ER, -IR)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> -é
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> -ás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> -á
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> -emos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> -éis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> -án
          </Text>
        </View>

        {/* Ejemplo: trabajar */}
        <Text style={styles.regla}>Ejemplo: "trabajar" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> trabajaré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> trabajarás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> trabajará
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> trabajaremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> trabajaréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> trabajarán
          </Text>
        </View>
        <Text style={styles.texto}>
          Mañana <Text style={styles.verbo}>trabajaré</Text> en casa.
        </Text>
        <Text style={styles.textoAr}>
          غدًا <Text style={styles.verbo}>سأعمل</Text> في المنزل.
        </Text>

        {/* Ejemplo: comer */}
        <Text style={styles.regla}>Ejemplo: "comer" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> comeré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> comerás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> comerá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> comeremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> comeréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> comerán
          </Text>
        </View>
        <Text style={styles.texto}>
          Esta noche <Text style={styles.verbo}>comeremos</Text> pizza.
        </Text>
        <Text style={styles.textoAr}>
          هذه الليلة <Text style={styles.verbo}>سوف نأكل</Text> بيتزا.
        </Text>

        {/* Ejemplo: vivir */}
        <Text style={styles.regla}>Ejemplo: "vivir" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> viviré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vivirás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> vivirá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> viviremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> viviréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vivirán
          </Text>
        </View>
        <Text style={styles.texto}>
          En el futuro <Text style={styles.verbo}>vivirán</Text> en otro país.
        </Text>
        <Text style={styles.textoAr}>
          في المستقبل <Text style={styles.verbo}>سيعيشون</Text> في بلد آخر.
        </Text>

        <Text style={styles.regla}>Nota sobre verbos irregulares</Text>
        <Text style={styles.texto}>
          Algunos verbos tienen raíces irregulares en el futuro, por ejemplo: tener → tendré, salir
          → saldré, hacer → haré, decir → diré, poder → podré, venir → vendré.
        </Text>
        <Text style={styles.textoAr}>
          بعض الأفعال جذورها غير منتظمة في المستقبل: tener → tendré، salir → saldré، hacer → haré،
          decir → diré، poder → podré، venir → vendré.
        </Text>

        {/* Conjugaciones de verbos irregulares en futuro */}
        <Text style={styles.subtitulo}>Ejemplos de verbos irregulares en futuro</Text>

        {/* Tener */}
        <Text style={styles.regla}>"tener" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> tendré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> tendrás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> tendrá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> tendremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> tendréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> tendrán
          </Text>
        </View>
        <Text style={styles.texto}>
          El año que viene <Text style={styles.verbo}>tendré</Text> más tiempo libre.
        </Text>
        <Text style={styles.textoAr}>
          السنة القادمة <Text style={styles.verbo}>سيكون لدي</Text> وقت فراغ أكثر.
        </Text>

        {/* Salir */}
        <Text style={styles.regla}>"salir" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> saldré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> saldrás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> saldrá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> saldremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> saldréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> saldrán
          </Text>
        </View>
        <Text style={styles.texto}>
          Esta noche <Text style={styles.verbo}>saldré</Text> con mis amigos.
        </Text>
        <Text style={styles.textoAr}>
          هذه الليلة <Text style={styles.verbo}>سأخرج</Text> مع أصدقائي.
        </Text>

        {/* Hacer */}
        <Text style={styles.regla}>"hacer" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> haré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> harás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> hará
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> haremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> haréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> harán
          </Text>
        </View>
        <Text style={styles.texto}>
          ¿Qué <Text style={styles.verbo}>harás</Text> mañana?
        </Text>
        <Text style={styles.textoAr}>
          ماذا <Text style={styles.verbo}>ستفعل</Text> غدًا؟
        </Text>

        {/* Decir */}
        <Text style={styles.regla}>"decir" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> diré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> dirás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> dirá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> diremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> diréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> dirán
          </Text>
        </View>
        <Text style={styles.texto}>
          Te <Text style={styles.verbo}>diré</Text> la verdad.
        </Text>
        <Text style={styles.textoAr}>سأقول لك الحقيقة.</Text>

        {/* Poder */}
        <Text style={styles.regla}>"poder" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> podré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> podrás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> podrá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> podremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> podréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> podrán
          </Text>
        </View>
        <Text style={styles.texto}>
          No <Text style={styles.verbo}>podré</Text> ir a la fiesta.
        </Text>
        <Text style={styles.textoAr}>
          لن <Text style={styles.verbo}>أستطيع</Text> الذهاب إلى الحفلة.
        </Text>

        {/* Venir */}
        <Text style={styles.regla}>"venir" (futuro)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> vendré
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vendrás
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> vendrá
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> vendremos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> vendréis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vendrán
          </Text>
        </View>
        <Text style={styles.texto}>
          ¿<Text style={styles.verbo}>Vendrás</Text> a la reunión mañana?
        </Text>
        <Text style={styles.textoAr}>
          هل <Text style={styles.verbo}>ستأتي</Text> إلى الاجتماع غدًا؟
        </Text>

        <Text style={styles.regla}>Adverbios frecuentes en el futuro</Text>
        <Text style={styles.texto}>
          mañana (غدًا), pronto (قريبًا), después (بعد), la próxima semana (الأسبوع القادم), el año
          que viene (السنة القادمة), algún día (يومًا ما)
        </Text>
        <Text style={styles.texto}>
          Ejemplo: <Text style={styles.verbo}>Mañana</Text>{" "}
          <Text style={styles.verbo}>viajaré</Text> a Madrid.
        </Text>
        <Text style={styles.textoAr}>
          <Text style={styles.verbo}>غدًا</Text> <Text style={styles.verbo}>سأسافر</Text> إلى مدريد.
        </Text>
        {/* Subjuntivo */}
        <Text style={[styles.tituloSubjuntivo, { marginTop: 24 }]}>El subjuntivo</Text>
        <Text style={styles.texto}>
          El subjuntivo es un modo verbal que expresa deseos, dudas, emociones, hipótesis,
          recomendaciones o acciones no reales. Es fundamental en español para hablar de situaciones
          que no son seguras o que dependen de otra acción.
        </Text>
        <Text style={styles.textoAr}>
          صيغة الـ Subjuntivo هي صيغة فعلية تُستخدم للتعبير عن الرغبات، الشكوك، المشاعر، الافتراضات،
          أو الأفعال غير الواقعية. هي مهمة جدًا في اللغة الإسبانية للحديث عن أشياء غير مؤكدة أو
          مرتبطة بفعل آخر.
        </Text>

        <Text style={styles.regla}>¿Por qué es importante el subjuntivo?</Text>
        <Text style={styles.texto}>
          El subjuntivo es esencial para expresar subjetividad, influencia, duda, negación y
          emociones. Sin él, el significado de muchas frases cambiaría totalmente.
        </Text>
        <Text style={styles.textoAr}>
          الـ Subjuntivo ضروري للتعبير عن الذاتية، التأثير، الشك، النفي والمشاعر. بدونه يتغير معنى
          كثير من الجمل.
        </Text>

        <Text style={styles.regla}>¿Cuándo se usa el subjuntivo?</Text>
        <Text style={styles.texto}>Se usa en frases subordinadas después de expresiones de:</Text>
        <Text style={styles.texto}>• Deseo: Quiero que vengas.</Text>
        <Text style={styles.texto}>• Duda: No creo que llueva.</Text>
        <Text style={styles.texto}>• Emoción: Me alegra que estés aquí.</Text>
        <Text style={styles.texto}>• Consejo: Es mejor que estudies.</Text>
        <Text style={styles.texto}>• Negación: No pienso que sea verdad.</Text>
        <Text style={styles.texto}>• Expresiones impersonales: Es posible que llegue tarde.</Text>
        <Text style={styles.textoAr}>
          يُستخدم بعد عبارات الرغبة، الشك، المشاعر، النصيحة، النفي، أو التعبيرات غير الشخصية.
        </Text>

        {/* Presente de subjuntivo */}
        <Text style={styles.subtitulo}>Presente de subjuntivo</Text>
        <Text style={styles.texto}>
          Para formar el presente de subjuntivo, se toma la primera persona del singular del
          presente de indicativo, se elimina la terminación -o, y se añaden las terminaciones:
        </Text>
        <Text style={styles.texto}>-AR: e, es, e, emos, éis, en</Text>
        <Text style={styles.texto}>-ER/-IR: a, as, a, amos, áis, an</Text>
        <Text style={styles.textoAr}>
          لصياغة الحاضر من الـ Subjuntivo: نأخذ المتكلم المفرد من الحاضر، نحذف النهاية -o ونضيف
          النهايات: للأفعال -AR: e, es, e, emos, éis, en. للأفعال -ER/-IR: a, as, a, amos, áis, an.
        </Text>

        <Text style={styles.regla}>Situaciones de uso del presente de subjuntivo</Text>
        <Text style={styles.texto}>
          1. Deseos: Espero que tengas un buen día.{" "}
          <Text style={styles.textoAr}>أتمنى أن يكون يومك جيدًا.</Text>
        </Text>
        <Text style={styles.texto}>
          2. Dudas: Dudo que él venga. <Text style={styles.textoAr}>أشك أنه سيأتي.</Text>
        </Text>
        <Text style={styles.texto}>
          3. Emociones: Me alegra que aprendas español.{" "}
          <Text style={styles.textoAr}>يسعدني أنك تتعلم الإسبانية.</Text>
        </Text>
        <Text style={styles.texto}>
          4. Recomendaciones: Te recomiendo que estudies más.{" "}
          <Text style={styles.textoAr}>أنصحك أن تدرس أكثر.</Text>
        </Text>
        <Text style={styles.texto}>
          5. Negación: No creo que sea cierto.{" "}
          <Text style={styles.textoAr}>لا أعتقد أن ذلك صحيح.</Text>
        </Text>
        <Text style={styles.texto}>
          6. Expresiones impersonales: Es importante que llegues a tiempo.{" "}
          <Text style={styles.textoAr}>من المهم أن تصل في الوقت المناسب.</Text>
        </Text>

        {/* Ejemplo de conjugación: hablar */}
        <Text style={styles.regla}>Ejemplo: "hablar" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> hable
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> hables
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> hable
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> hablemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> habléis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> hablen
          </Text>
        </View>
        {/* Ejemplo de conjugación: comer */}
        <Text style={styles.regla}>Ejemplo: "comer" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> coma
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> comas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> coma
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> comamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> comáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> coman
          </Text>
        </View>
        {/* Ejemplo de conjugación: vivir */}
        <Text style={styles.regla}>Ejemplo: "vivir" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> viva
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vivas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> viva
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> vivamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> viváis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vivan
          </Text>
        </View>

        {/* Nota sobre verbos irregulares */}
        <Text style={styles.regla}>Verbos irregulares y con cambios en el subjuntivo</Text>
        <Text style={styles.texto}>
          Algunos verbos tienen cambios de raíz o terminaciones irregulares en el subjuntivo. Es
          importante memorizar sus formas.
        </Text>
        <Text style={styles.textoAr}>
          بعض الأفعال تتغير جذورها أو نهاياتها في الـ Subjuntivo. من المهم حفظ هذه التصريفات.
        </Text>

        {/* Tener */}
        <Text style={styles.regla}>Ejemplo: "tener" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> tenga
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> tengas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> tenga
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> tengamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> tengáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> tengan
          </Text>
        </View>
        <Text style={styles.texto}>
          Espero que <Text style={styles.verbo}>tengas</Text> suerte.
        </Text>
        <Text style={styles.textoAr}>
          أتمنى أن <Text style={styles.verbo}>يكون لديك</Text> حظ.
        </Text>

        {/* Ir */}
        <Text style={styles.regla}>Ejemplo: "ir" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> vaya
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vayas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> vaya
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> vayamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> vayáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vayan
          </Text>
        </View>
        <Text style={styles.texto}>
          Es posible que <Text style={styles.verbo}>vaya</Text> mañana.
        </Text>
        <Text style={styles.textoAr}>
          من الممكن أن <Text style={styles.verbo}>أذهب</Text> غدًا.
        </Text>

        {/* Ser */}
        <Text style={styles.regla}>Ejemplo: "ser" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> sea
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> seas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> sea
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> seamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> seáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> sean
          </Text>
        </View>
        <Text style={styles.texto}>
          No creo que <Text style={styles.verbo}>sea</Text> verdad.
        </Text>
        <Text style={styles.textoAr}>
          لا أظن أن ذلك <Text style={styles.verbo}>صحيح</Text>.
        </Text>

        {/* Estar */}
        <Text style={styles.regla}>Ejemplo: "estar" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> esté
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> estés
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> esté
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> estemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> estéis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> estén
          </Text>
        </View>
        <Text style={styles.texto}>
          Ojalá <Text style={styles.verbo}>estemos</Text> juntos pronto.
        </Text>
        <Text style={styles.textoAr}>
          أتمنى أن <Text style={styles.verbo}>نكون</Text> معًا قريبًا.
        </Text>

        {/* Saber */}
        <Text style={styles.regla}>Ejemplo: "saber" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> sepa
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> sepas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> sepa
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> sepamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> sepáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> sepan
          </Text>
        </View>
        <Text style={styles.texto}>
          Dudo que <Text style={styles.verbo}>sepa</Text> la respuesta.
        </Text>
        <Text style={styles.textoAr}>
          أشك أنه <Text style={styles.verbo}>يعرف</Text> الجواب.
        </Text>

        {/* Hacer */}
        <Text style={styles.regla}>Ejemplo: "hacer" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> haga
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> hagas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> haga
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> hagamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> hagáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> hagan
          </Text>
        </View>
        <Text style={styles.texto}>
          Es bueno que <Text style={styles.verbo}>hagas</Text> ejercicio.
        </Text>
        <Text style={styles.textoAr}>
          من الجيد أن <Text style={styles.verbo}>تمارس</Text> الرياضة.
        </Text>

        {/* Decir */}
        <Text style={styles.regla}>Ejemplo: "decir" (presente de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> diga
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> digas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> diga
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> digamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> digáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> digan
          </Text>
        </View>
        <Text style={styles.texto}>
          No quiero que <Text style={styles.verbo}>digas</Text> nada.
        </Text>
        <Text style={styles.textoAr}>
          لا أريدك أن <Text style={styles.verbo}>تقول</Text> شيئًا.
        </Text>

        {/* Pensar (cambio vocálico) */}
        <Text style={styles.regla}>
          Ejemplo: "pensar" (presente de subjuntivo, cambio vocálico e→ie)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> piense
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> pienses
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> piense
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> pensemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> penséis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> piensen
          </Text>
        </View>
        <Text style={styles.texto}>
          No creo que <Text style={styles.verbo}>piense</Text> igual que tú.
        </Text>
        <Text style={styles.textoAr}>
          لا أعتقد أنه <Text style={styles.verbo}>يفكر</Text> مثلك.
        </Text>

        {/* Pedir (e→i) */}
        <Text style={styles.regla}>
          Ejemplo: "pedir" (presente de subjuntivo, cambio vocálico e→i)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> pida
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> pidas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> pida
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> pidamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> pidáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> pidan
          </Text>
        </View>
        <Text style={styles.texto}>
          Quiero que me <Text style={styles.verbo}>pidas</Text> ayuda si la necesitas.
        </Text>
        <Text style={styles.textoAr}>
          أريدك أن <Text style={styles.verbo}>تطلب</Text> المساعدة إذا احتجتها.
        </Text>

        {/* Dormir (o→ue/u) */}
        <Text style={styles.regla}>
          Ejemplo: "dormir" (presente de subjuntivo, cambio vocálico o→ue/u)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> duerma
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> duermas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> duerma
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> durmamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> durmáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> duerman
          </Text>
        </View>
        <Text style={styles.texto}>
          Espero que <Text style={styles.verbo}>duermas</Text> bien.
        </Text>
        <Text style={styles.textoAr}>
          أتمنى أن <Text style={styles.verbo}>تنام</Text> جيدًا.
        </Text>

        {/* Jugar (u→ue) */}
        <Text style={styles.regla}>
          Ejemplo: "jugar" (presente de subjuntivo, cambio vocálico u→ue)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> juegue
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> juegues
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> juegue
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> juguemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> juguéis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> jueguen
          </Text>
        </View>
        <Text style={styles.texto}>
          Ojalá <Text style={styles.verbo}>juegues</Text> con nosotros mañana.
        </Text>
        <Text style={styles.textoAr}>
          أتمنى أن <Text style={styles.verbo}>تلعب</Text> معنا غدًا.
        </Text>

        {/* Buscar (c→qu) */}
        <Text style={styles.regla}>
          Ejemplo: "buscar" (presente de subjuntivo, cambio ortográfico c→qu)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> busque
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> busques
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> busque
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> busquemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> busquéis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> busquen
          </Text>
        </View>
        <Text style={styles.texto}>
          Es importante que <Text style={styles.verbo}>busques</Text> la verdad.
        </Text>
        <Text style={styles.textoAr}>
          من المهم أن <Text style={styles.verbo}>تبحث</Text> عن الحقيقة.
        </Text>

        {/* Llegar (g→gu) */}
        <Text style={styles.regla}>
          Ejemplo: "llegar" (presente de subjuntivo, cambio ortográfico g→gu)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> llegue
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> llegues
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> llegue
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> lleguemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> lleguéis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> lleguen
          </Text>
        </View>
        <Text style={styles.texto}>
          Espero que <Text style={styles.verbo}>llegues</Text> a tiempo.
        </Text>
        <Text style={styles.textoAr}>
          أتمنى أن <Text style={styles.verbo}>تصل</Text> في الوقت المناسب.
        </Text>

        {/* Empezar (e→ie, z→c) */}
        <Text style={styles.regla}>
          Ejemplo: "empezar" (presente de subjuntivo, cambio vocálico e→ie y ortográfico z→c)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> empiece
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> empieces
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> empiece
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> empecemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> empecéis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> empiecen
          </Text>
        </View>
        <Text style={styles.texto}>
          Es mejor que <Text style={styles.verbo}>empieces</Text> pronto.
        </Text>
        <Text style={styles.textoAr}>
          من الأفضل أن <Text style={styles.verbo}>تبدأ</Text> مبكرًا.
        </Text>

        {/* Sentir (e→ie/i) */}
        <Text style={styles.regla}>
          Ejemplo: "sentir" (presente de subjuntivo, cambio vocálico e→ie/i)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> sienta
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> sientas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> sienta
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> sintamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> sintáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> sientan
          </Text>
        </View>
        <Text style={styles.texto}>
          Me alegra que <Text style={styles.verbo}>sientas</Text> mejor.
        </Text>
        <Text style={styles.textoAr}>
          يسعدني أنك <Text style={styles.verbo}>تشعر</Text> بتحسن.
        </Text>

        {/* Construir (i→y) */}
        <Text style={styles.regla}>
          Ejemplo: "construir" (presente de subjuntivo, cambio ortográfico i→y)
        </Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> construya
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> construyas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> construya
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> construyamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> construyáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> construyan
          </Text>
        </View>
        <Text style={styles.texto}>
          Dudo que <Text style={styles.verbo}>construyan</Text> la casa este año.
        </Text>
        <Text style={styles.textoAr}>
          أشك أنهم <Text style={styles.verbo}>سيبنون</Text> المنزل هذا العام.
        </Text>

        {/* Presente perfecto de subjuntivo */}
        <Text style={styles.tituloSubjuntivo}>Presente perfecto de subjuntivo</Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>¿Qué es?</Text> Es un tiempo compuesto que expresa
          acciones pasadas relacionadas con el presente, en contextos de duda, emoción o deseo. Se
          forma con el verbo "haber" en presente de subjuntivo + participio.
        </Text>
        <Text style={styles.textoAr}>
          زمن مركب يُستخدم للتعبير عن أفعال حدثت في الماضي ولها علاقة بالحاضر، في سياق الشك أو
          المشاعر أو الرغبة. يتكون من فعل "haber" في المضارع subjuntivo + اسم الفاعل للفعل الرئيسي.
        </Text>

        <Text style={styles.regla}>Formación</Text>
        <Text style={styles.texto}>Presente de subjuntivo de "haber" + participio del verbo.</Text>
        <Text style={styles.textoAr}>تصريف "haber" في المضارع subjuntivo + اسم الفاعل للفعل.</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> haya
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> hayas
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> haya
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> hayamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> hayáis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> hayan
          </Text>
        </View>

        <Text style={styles.regla}>Ejemplos con verbos regulares</Text>
        <Text style={styles.texto}>
          Espero que <Text style={styles.verbo}>hayas trabajado</Text> mucho.
        </Text>
        <Text style={styles.textoAr}>
          أتمنى أنك <Text style={styles.verbo}>قد عملت</Text> كثيرًا.
        </Text>
        <Text style={styles.texto}>
          Dudo que <Text style={styles.verbo}>hayamos comido</Text> suficiente.
        </Text>
        <Text style={styles.textoAr}>
          أشك أننا <Text style={styles.verbo}>قد أكلنا</Text> بما فيه الكفاية.
        </Text>
        <Text style={styles.texto}>
          Me alegra que <Text style={styles.verbo}>hayas vivido</Text> en España.
        </Text>
        <Text style={styles.textoAr}>
          يسعدني أنك <Text style={styles.verbo}>قد عشت</Text> في إسبانيا.
        </Text>

        <Text style={styles.regla}>Ejemplos con verbos irregulares</Text>
        <Text style={styles.texto}>
          No creo que <Text style={styles.verbo}>hayan hecho</Text> la tarea.
        </Text>
        <Text style={styles.textoAr}>
          لا أظن أنهم <Text style={styles.verbo}>قد قاموا</Text> بالواجب.
        </Text>
        <Text style={styles.texto}>
          Es posible que <Text style={styles.verbo}>hayas dicho</Text> la verdad.
        </Text>
        <Text style={styles.textoAr}>
          من الممكن أنك <Text style={styles.verbo}>قد قلت</Text> الحقيقة.
        </Text>
        <Text style={styles.texto}>
          Dudo que <Text style={styles.verbo}>hayamos visto</Text> esa película.
        </Text>
        <Text style={styles.textoAr}>
          أشك أننا <Text style={styles.verbo}>قد شاهدنا</Text> ذلك الفيلم.
        </Text>

        <Text style={styles.regla}>¿Cuándo se usa?</Text>
        <Text style={styles.texto}>
          - Para expresar acciones pasadas con relevancia en el presente, en contextos de subjuntivo
          (duda, emoción, deseo, etc.).
        </Text>
        <Text style={styles.texto}>
          - Después de expresiones como: "Espero que...", "Dudo que...", "Es posible que..."
        </Text>
        <Text style={styles.textoAr}>
          - للتعبير عن أفعال حدثت في الماضي ولها علاقة بالحاضر في سياق الشك أو المشاعر أو الرغبة. -
          بعد تعابير مثل: "أتمنى أن..."، "أشك أن..."، "من الممكن أن..."
        </Text>

        {/* Imperfecto de subjuntivo */}
        <Text style={styles.tituloSubjuntivo}>Imperfecto de subjuntivo</Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>¿Qué es?</Text> Es un tiempo verbal que expresa
          acciones pasadas en contextos de duda, deseo, emoción, cortesía o situaciones hipotéticas.
          Se usa en oraciones subordinadas después de ciertos verbos y expresiones.
        </Text>
        <Text style={styles.textoAr}>
          زمن يُستخدم للتعبير عن أفعال في الماضي في سياق الشك أو الرغبة أو المجاملة أو الحالات
          الافتراضية. يُستخدم غالبًا في الجمل التابعة بعد أفعال أو تعابير معينة.
        </Text>

        <Text style={styles.regla}>Formación</Text>
        <Text style={styles.texto}>
          Se forma a partir de la tercera persona plural del pretérito perfecto simple, quitando
          "-ron" y añadiendo las terminaciones:
        </Text>
        <Text style={styles.texto}>
          - <Text style={{ fontWeight: "bold" }}>-ra</Text>: ra, ras, ra, ramos, rais, ran
        </Text>
        <Text style={styles.texto}>
          - <Text style={{ fontWeight: "bold" }}>-se</Text> (menos común): se, ses, se, semos, seis,
          sen
        </Text>
        <Text style={styles.textoAr}>
          يتم تصريفه من صيغة الجمع الغائب في الماضي البسيط (هم)، بحذف "-ron" وإضافة النهايات أعلاه.
        </Text>

        {/* Trabajar */}
        <Text style={styles.regla}>Ejemplo: "trabajar" (imperfecto de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> trabajara / trabajase
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> trabajaras / trabajases
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> trabajara / trabajase
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> trabajáramos / trabajásemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> trabajarais / trabajaseis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> trabajaran / trabajasen
          </Text>
        </View>
        <Text style={styles.texto}>
          Si <Text style={styles.verbo}>trabajara</Text> más, tendría más dinero.
        </Text>
        <Text style={styles.textoAr}>
          لو <Text style={styles.verbo}>عملتُ</Text> أكثر، لكان لدي مال أكثر.
        </Text>

        {/* Comer */}
        <Text style={styles.regla}>Ejemplo: "comer" (imperfecto de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> comiera / comiese
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> comieras / comieses
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> comiera / comiese
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> comiéramos / comiésemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> comierais / comieseis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> comieran / comiesen
          </Text>
        </View>
        <Text style={styles.texto}>
          Me alegraría si <Text style={styles.verbo}>comieras</Text> con nosotros.
        </Text>
        <Text style={styles.textoAr}>
          سأكون سعيدًا إذا <Text style={styles.verbo}>أكلتَ</Text> معنا.
        </Text>

        {/* Vivir */}
        <Text style={styles.regla}>Ejemplo: "vivir" (imperfecto de subjuntivo)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> viviera / viviese
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vivieras / vivieses
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> viviera / viviese
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> viviéramos / viviésemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> vivierais / vivieseis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vivieran / viviesen
          </Text>
        </View>
        <Text style={styles.texto}>
          Ojalá <Text style={styles.verbo}>vivieras</Text> cerca de mí.
        </Text>
        <Text style={styles.textoAr}>
          يا ليتك <Text style={styles.verbo}>كنت تعيش</Text> قريبًا مني.
        </Text>

        <Text style={styles.regla}>¿Cuándo se usa?</Text>
        <Text style={styles.texto}>
          - Después de "que" cuando el verbo principal está en pasado o condicional: "Quería que
          vinieras".
        </Text>
        <Text style={styles.texto}>
          - En oraciones condicionales irreales: "Si tuviera dinero, viajaría".
        </Text>
        <Text style={styles.texto}>- Para expresar cortesía: "Quisiera hablar con usted".</Text>
        <Text style={styles.textoAr}>
          - بعد "que" عندما يكون الفعل الرئيسي في الماضي أو الشرط: "أردت أن تأتي". - في الجمل
          الشرطية غير الواقعية: "لو كان لدي مال، لسافرت". - للتعبير عن المجاملة: "أود أن أتكلم معك".
        </Text>

        {/* Pluscuamperfecto de subjuntivo */}
        <Text style={styles.tituloSubjuntivo}>Pluscuamperfecto de subjuntivo</Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>¿Qué es?</Text> Es un tiempo compuesto que expresa
          acciones pasadas anteriores a otra acción pasada, en contextos de duda, deseo, hipótesis o
          emoción. Se forma con el verbo "haber" en imperfecto de subjuntivo + participio.
        </Text>
        <Text style={styles.textoAr}>
          زمن مركب يُستخدم للتعبير عن فعل حدث قبل فعل آخر في الماضي، في سياق الشك أو الرغبة أو
          الفرضية أو المشاعر. يتكون من فعل "haber" في الماضي subjuntivo + اسم الفاعل للفعل الرئيسي.
        </Text>

        <Text style={styles.regla}>Formación</Text>
        <Text style={styles.texto}>
          Imperfecto de subjuntivo de "haber" + participio del verbo.
        </Text>
        <Text style={styles.textoAr}>تصريف "haber" في الماضي subjuntivo + اسم الفاعل للفعل.</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> hubiera / hubiese
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> hubieras / hubieses
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> hubiera / hubiese
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> hubiéramos / hubiésemos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> hubierais / hubieseis
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> hubieran / hubiesen
          </Text>
        </View>

        <Text style={styles.regla}>Ejemplos con verbos regulares</Text>
        <Text style={styles.texto}>
          Si <Text style={styles.verbo}>hubieras trabajado</Text> más, habrías terminado antes.
        </Text>
        <Text style={styles.textoAr}>
          لو <Text style={styles.verbo}>كنت قد عملت</Text> أكثر، لكنت أنهيت أبكر.
        </Text>
        <Text style={styles.texto}>
          No creía que <Text style={styles.verbo}>hubiéramos comido</Text> tanto.
        </Text>
        <Text style={styles.textoAr}>
          لم أكن أظن أننا <Text style={styles.verbo}>قد أكلنا</Text> كثيرًا.
        </Text>
        <Text style={styles.texto}>
          Me habría alegrado si <Text style={styles.verbo}>hubieras vivido</Text> en mi ciudad.
        </Text>
        <Text style={styles.textoAr}>
          كنت سأفرح لو <Text style={styles.verbo}>كنت قد عشت</Text> في مدينتي.
        </Text>

        <Text style={styles.regla}>Ejemplos con verbos irregulares</Text>
        <Text style={styles.texto}>
          Si <Text style={styles.verbo}>hubieras hecho</Text> la tarea, habrías aprobado.
        </Text>
        <Text style={styles.textoAr}>
          لو <Text style={styles.verbo}>كنت قد أنجزت</Text> الواجب، لكنت نجحت.
        </Text>
        <Text style={styles.texto}>
          No pensaba que <Text style={styles.verbo}>hubieran dicho</Text> eso.
        </Text>
        <Text style={styles.textoAr}>
          لم أكن أظن أنهم <Text style={styles.verbo}>قالوا</Text> ذلك.
        </Text>
        <Text style={styles.texto}>
          Ojalá <Text style={styles.verbo}>hubiéramos visto</Text> esa película.
        </Text>
        <Text style={styles.textoAr}>
          يا ليتنا <Text style={styles.verbo}>كنا قد شاهدنا</Text> ذلك الفيلم.
        </Text>

        <Text style={styles.regla}>¿Cuándo se usa?</Text>
        <Text style={styles.texto}>
          - Para expresar una acción pasada anterior a otra también pasada, en contexto de
          subjuntivo.
        </Text>
        <Text style={styles.texto}>
          - En oraciones condicionales irreales del pasado: "Si hubiera sabido, habría venido".
        </Text>
        <Text style={styles.texto}>
          - Después de expresiones de emoción, duda o deseo en pasado.
        </Text>
        <Text style={styles.textoAr}>
          - للتعبير عن فعل حدث قبل فعل آخر في الماضي في سياق الشك أو الرغبة أو الفرضية. - في الجمل
          الشرطية غير الواقعية في الماضي: "لو كنت قد علمت، لجئت". - بعد تعابير المشاعر أو الشك أو
          الرغبة في الماضي.
        </Text>

        {/* Más ejemplos de pluscuamperfecto de subjuntivo */}
        <Text style={styles.regla}>Más ejemplos</Text>
        <Text style={styles.texto}>
          Ojalá <Text style={styles.verbo}>hubieras venido</Text> a la fiesta.
        </Text>
        <Text style={styles.textoAr}>
          يا ليتك <Text style={styles.verbo}>كنت قد أتيت</Text> إلى الحفلة.
        </Text>
        <Text style={styles.texto}>
          Si <Text style={styles.verbo}>hubiéramos estudiado</Text> más, habríamos aprobado el
          examen.
        </Text>
        <Text style={styles.textoAr}>
          لو <Text style={styles.verbo}>كنا قد درسنا</Text> أكثر، لكنا نجحنا في الامتحان.
        </Text>
        <Text style={styles.texto}>
          No pensé que <Text style={styles.verbo}>hubieras dicho</Text> eso.
        </Text>
        <Text style={styles.textoAr}>
          لم أظن أنك <Text style={styles.verbo}>قلت</Text> ذلك.
        </Text>
        <Text style={styles.texto}>
          Me habría gustado que <Text style={styles.verbo}>hubieras conocido</Text> a mi familia.
        </Text>
        <Text style={styles.textoAr}>
          كنت سأحب لو <Text style={styles.verbo}>كنت قد تعرفت</Text> على عائلتي.
        </Text>
        <Text style={styles.texto}>
          ¿Había alguien que <Text style={styles.verbo}>hubiera visto</Text> el accidente?
        </Text>
        <Text style={styles.textoAr}>
          هل كان هناك أحد <Text style={styles.verbo}>قد شاهد</Text> الحادث؟
        </Text>
        <Text style={styles.texto}>
          No era posible que <Text style={styles.verbo}>hubieran llegado</Text> tan rápido.
        </Text>
        <Text style={styles.textoAr}>
          لم يكن من الممكن أنهم <Text style={styles.verbo}>وصلوا</Text> بهذه السرعة.
        </Text>
        <Text style={styles.texto}>
          Si tú <Text style={styles.verbo}>hubieras sabido</Text> la verdad, ¿habrías actuado
          diferente?
        </Text>
        <Text style={styles.textoAr}>
          لو أنك <Text style={styles.verbo}>كنت قد علمت</Text> الحقيقة، هل كنت ستتصرف بشكل مختلف؟
        </Text>
        <Text style={styles.texto}>
          Le habría pedido ayuda si <Text style={styles.verbo}>hubiera tenido</Text> tiempo.
        </Text>
        <Text style={styles.textoAr}>
          كنت سأطلب مساعدته لو <Text style={styles.verbo}>كان لديه</Text> وقت.
        </Text>

        {/* Condicional simple */}
        <Text style={styles.tituloSubjuntivo}>Condicional simple</Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>¿Qué es?</Text> Es un tiempo verbal que expresa
          acciones hipotéticas, deseos, consejos o situaciones futuras en relación con el pasado. Se
          usa para expresar cortesía o probabilidad en el pasado.
        </Text>
        <Text style={styles.textoAr}>
          زمن يُستخدم للتعبير عن الأفعال الافتراضية أو الرغبات أو النصائح أو الأحداث المستقبلية
          بالنسبة للماضي. يُستخدم أيضًا للمجاملة أو الاحتمال في الماضي.
        </Text>

        <Text style={styles.regla}>Formación</Text>
        <Text style={styles.texto}>
          Infinitivo del verbo + terminaciones: ía, ías, ía, íamos, íais, ían (las mismas para -ar,
          -er, -ir).
        </Text>
        <Text style={styles.textoAr}>
          يتم إضافة النهايات إلى المصدر: ía, ías, ía, íamos, íais, ían (لنفس النهايات مع جميع
          الأفعال).
        </Text>

        {/* Trabajar */}
        <Text style={styles.regla}>Ejemplo: "trabajar" (condicional simple)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> trabajaría
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> trabajarías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> trabajaría
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> trabajaríamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> trabajaríais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> trabajarían
          </Text>
        </View>
        <Text style={styles.texto}>
          Si pudiera, <Text style={styles.verbo}>trabajaría</Text> en otro país.
        </Text>
        <Text style={styles.textoAr}>
          لو استطعت، <Text style={styles.verbo}>كنت سأعمل</Text> في بلد آخر.
        </Text>

        {/* Comer */}
        <Text style={styles.regla}>Ejemplo: "comer" (condicional simple)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> comería
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> comerías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> comería
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> comeríamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> comeríais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> comerían
          </Text>
        </View>
        <Text style={styles.texto}>
          En tu lugar, <Text style={styles.verbo}>comería</Text> más sano.
        </Text>
        <Text style={styles.textoAr}>
          لو كنت مكانك، <Text style={styles.verbo}>كنت سأأكل</Text> طعامًا صحيًا أكثر.
        </Text>

        {/* Vivir */}
        <Text style={styles.regla}>Ejemplo: "vivir" (condicional simple)</Text>
        <View style={styles.tablaConjugacionBox}>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Yo</Text> viviría
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Tú</Text> vivirías
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Él/Ella/Usted</Text> viviría
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Nosotros/as</Text> viviríamos
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Vosotros/as</Text> viviríais
          </Text>
          <Text style={styles.tablaCelda}>
            <Text style={styles.pronombre}>Ellos/Ellas/Ustedes</Text> vivirían
          </Text>
        </View>
        <Text style={styles.texto}>
          Me <Text style={styles.verbo}>viviría</Text> en la playa si pudiera.
        </Text>
        <Text style={styles.textoAr}>
          كنت <Text style={styles.verbo}>سأعيش</Text> في الشاطئ لو استطعت.
        </Text>

        <Text style={styles.regla}>¿Cuándo se usa?</Text>
        <Text style={styles.texto}>
          - Para expresar acciones hipotéticas o irreales: "Si tuviera dinero, viajaría".
        </Text>
        <Text style={styles.texto}>- Para dar consejos: "Yo que tú, estudiaría más".</Text>
        <Text style={styles.texto}>
          - Para expresar deseos o cortesía: "¿Podrías ayudarme?" "Me gustaría viajar".
        </Text>
        <Text style={styles.texto}>
          - Para expresar probabilidad en el pasado: "Dijo que llegaría tarde".
        </Text>
        <Text style={styles.textoAr}>
          - للتعبير عن الأفعال الافتراضية أو غير الواقعية: "لو كان لدي مال، لسافرت". - لإعطاء
          النصائح: "لو كنت مكانك، كنت سأدرس أكثر". - للتعبير عن الرغبات أو المجاملة: "هل يمكنك
          مساعدتي؟" "كنت أحب أن أسافر". - للتعبير عن الاحتمال في الماضي: "قال إنه سيصل متأخرًا".
        </Text>

        {/* Explicaciones avanzadas del condicional simple */}
        <Text style={styles.regla}>Más explicaciones y reglas</Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Diferencias con el futuro:</Text> El condicional
          expresa una acción hipotética o dependiente de una condición, mientras que el futuro
          expresa una acción que ocurrirá con certeza.
        </Text>
        <Text style={styles.textoAr}>
          الشرط يُعبر عن فعل افتراضي أو يعتمد على شرط، أما المستقبل فيعبر عن فعل سيحدث بالتأكيد.
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Estructura típica de la oración condicional:</Text>{" "}
          "Si" + imperfecto de subjuntivo + condicional simple.
        </Text>
        <Text style={styles.texto}>
          Ejemplo: Si <Text style={styles.verbo}>tuviera</Text> tiempo,{" "}
          <Text style={styles.verbo}>viajaría</Text> más.
        </Text>
        <Text style={styles.textoAr}>
          مثال: إذا <Text style={styles.verbo}>كان لدي وقت</Text>،{" "}
          <Text style={styles.verbo}>لكنت سأسافر</Text> أكثر.
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>
            Verbos irregulares frecuentes en el condicional:
          </Text>{" "}
          decir (diría), hacer (haría), poder (podría), poner (pondría), querer (querría), saber
          (sabría), salir (saldría), tener (tendría), venir (vendría), haber (habría), caber
          (cabría), valer (valdría).
        </Text>
        <Text style={styles.textoAr}>
          بعض الأفعال غير المنتظمة في الشرط: decir (diría), hacer (haría), poder (podría), poner
          (pondría), querer (querría), saber (sabría), salir (saldría), tener (tendría), venir
          (vendría), haber (habría), caber (cabría), valer (valdría).
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Cortesía y probabilidad:</Text> El condicional se usa
          para pedir algo de manera educada o expresar probabilidad en el pasado.
        </Text>
        <Text style={styles.texto}>
          Ejemplo de cortesía: ¿<Text style={styles.verbo}>Podrías</Text> ayudarme? / ¿
          <Text style={styles.verbo}>Querría</Text> usted algo más?
        </Text>
        <Text style={styles.textoAr}>
          مثال على المجاملة: هل <Text style={styles.verbo}>يمكنك</Text> مساعدتي؟ / هل{" "}
          <Text style={styles.verbo}>تريد</Text> شيئًا آخر؟
        </Text>
        <Text style={styles.texto}>
          Ejemplo de probabilidad en el pasado: Serían las ocho cuando llegó. (Probablemente eran
          las ocho...)
        </Text>
        <Text style={styles.textoAr}>
          مثال على الاحتمال في الماضي: ربما كانت الساعة الثامنة عندما وصل.
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Nota cultural:</Text> En español, el condicional es
          muy común para sonar más educado y menos directo.
        </Text>
        <Text style={styles.textoAr}>
          ملاحظة ثقافية: استخدام الشرط شائع لجعل الطلبات أكثر أدبًا وأقل مباشرة.
        </Text>

        {/* Conclusión general sobre los verbos */}
        <Text style={styles.tituloSubjuntivo}>Conclusión general sobre los verbos</Text>
        <Text style={styles.texto}>
          Dominar los verbos en español requiere práctica constante y atención a los diferentes
          tiempos y modos. Comprender las reglas, estudiar los ejemplos y exponerse al idioma en
          situaciones reales te ayudará a comunicarte con confianza y precisión. ¡No te rindas y
          sigue practicando!
        </Text>
        <Text style={styles.textoAr}>
          إتقان الأفعال في اللغة الإسبانية يتطلب ممارسة مستمرة والانتباه إلى الأزمنة والصيغ
          المختلفة. فهم القواعد ودراسة الأمثلة والتعرض للغة في مواقف حقيقية سيساعدك على التواصل بثقة
          ودقة. لا تستسلم واستمر في التدريب!
        </Text>

        {/* Más ejemplos para cada pronombre */}
        <Text style={styles.tituloSubjuntivo}>Ejemplos por pronombre personal</Text>
        {/* Yo */}
        <Text style={styles.regla}>Yo</Text>
        <Text style={styles.texto}>Yo estudio español todos los días. (presente)</Text>
        <Text style={styles.textoAr}>أنا أدرس الإسبانية كل يوم.</Text>
        <Text style={styles.texto}>Ayer yo comí paella. (pretérito perfecto simple)</Text>
        <Text style={styles.textoAr}>بالأمس أكلت الباييلا.</Text>
        {/* Tú */}
        <Text style={styles.regla}>Tú</Text>
        <Text style={styles.texto}>Tú hablas muy bien. (presente)</Text>
        <Text style={styles.textoAr}>أنت تتكلم جيدًا.</Text>
        <Text style={styles.texto}>¿Tú fuiste al cine? (pretérito perfecto simple)</Text>
        <Text style={styles.textoAr}>هل ذهبت إلى السينما؟</Text>
        {/* Él/Ella/Usted */}
        <Text style={styles.regla}>Él / Ella / Usted</Text>
        <Text style={styles.texto}>Él vive en Madrid. (presente)</Text>
        <Text style={styles.textoAr}>هو يعيش في مدريد.</Text>
        <Text style={styles.texto}>Ella escribió una carta. (pretérito perfecto simple)</Text>
        <Text style={styles.textoAr}>هي كتبت رسالة.</Text>
        <Text style={styles.texto}>¿Usted quiere café? (presente, formal)</Text>
        <Text style={styles.textoAr}>هل تريد القهوة؟ (صيغة رسمية)</Text>
        {/* Nosotros/as */}
        <Text style={styles.regla}>Nosotros / Nosotras</Text>
        <Text style={styles.texto}>Nosotros aprendemos juntos. (presente)</Text>
        <Text style={styles.textoAr}>نحن نتعلم معًا.</Text>
        <Text style={styles.texto}>
          Nosotras fuimos al parque. (pretérito perfecto simple, femenino)
        </Text>
        <Text style={styles.textoAr}>نحن (الإناث) ذهبنا إلى الحديقة.</Text>
        {/* Vosotros/as */}
        <Text style={styles.regla}>Vosotros / Vosotras</Text>
        <Text style={styles.texto}>¿Vosotros venís mañana? (presente, España)</Text>
        <Text style={styles.textoAr}>هل ستأتون غدًا؟</Text>
        <Text style={styles.texto}>
          Vosotras habéis terminado la tarea. (pretérito perfecto compuesto, femenino)
        </Text>
        <Text style={styles.textoAr}>أنتن أنهيتن الواجب.</Text>
        {/* Ellos/Ellas/Ustedes */}
        <Text style={styles.regla}>Ellos / Ellas / Ustedes</Text>
        <Text style={styles.texto}>Ellos juegan al fútbol. (presente)</Text>
        <Text style={styles.textoAr}>هم يلعبون كرة القدم.</Text>
        <Text style={styles.texto}>
          Ellas estudiaron medicina. (pretérito perfecto simple, femenino)
        </Text>
        <Text style={styles.textoAr}>هن درسن الطب.</Text>
        <Text style={styles.texto}>
          ¿Ustedes van a viajar? (futuro perifrástico, formal/plural)
        </Text>
        <Text style={styles.textoAr}>هل ستسافرون؟ (صيغة رسمية/جمع)</Text>
        {/* Explicación y ejemplos de artículos y pronombres */}
        <Text style={styles.tituloSubjuntivo}>Artículos y pronombres: explicación y ejemplos</Text>
        <Text style={styles.regla}>Artículos definidos</Text>
        <Text style={styles.texto}>
          Los artículos definidos son: el, la, los, las. Se usan para hablar de algo conocido o
          específico.
        </Text>
        <Text style={styles.textoAr}>
          أدوات التعريف: el, la, los, las. تُستخدم للحديث عن شيء معروف أو محدد.
        </Text>
        <Text style={styles.texto}>Ejemplo: El libro está en la mesa.</Text>
        <Text style={styles.textoAr}>الكتاب على الطاولة.</Text>
        <Text style={styles.texto}>Ejemplo: Las niñas juegan en el parque.</Text>
        <Text style={styles.textoAr}>البنات يلعبن في الحديقة.</Text>
        <Text style={styles.regla}>Artículos indefinidos</Text>
        <Text style={styles.texto}>
          Los artículos indefinidos son: un, una, unos, unas. Se usan para hablar de algo no
          conocido o no específico.
        </Text>
        <Text style={styles.textoAr}>
          أدوات النكرة: un, una, unos, unas. تُستخدم للحديث عن شيء غير معروف أو غير محدد.
        </Text>
        <Text style={styles.texto}>Ejemplo: Quiero un coche.</Text>
        <Text style={styles.textoAr}>أريد سيارة.</Text>
        <Text style={styles.texto}>Ejemplo: Hay unas manzanas en la nevera.</Text>
        <Text style={styles.textoAr}>هناك بعض التفاح في الثلاجة.</Text>
        <Text style={styles.regla}>Notas de uso</Text>
        <Text style={styles.texto}>
          No se usa artículo con profesiones después de ser ("Soy médico"), pero sí si hay adjetivo
          ("Soy un buen médico").
        </Text>
        <Text style={styles.textoAr}>
          لا يُستخدم أداة مع المهن بعد فعل ser (أنا طبيب)، إلا إذا كان هناك صفة (أنا طبيب جيد).
        </Text>
        <Text style={styles.regla}>Pronombres personales</Text>
        <Text style={styles.texto}>
          Los pronombres personales son: yo, tú, él, ella, usted, nosotros/as, vosotros/as, ellos,
          ellas, ustedes. Se usan para referirse a las personas que hablan o de las que se habla.
        </Text>
        <Text style={styles.textoAr}>
          ضمائر الفاعل: yo, tú, él, ella, usted, nosotros/as, vosotros/as, ellos, ellas, ustedes.
          تُستخدم للإشارة إلى المتكلم أو المخاطب أو الغائب.
        </Text>
        <Text style={styles.texto}>Ejemplo: Tú eres mi amigo.</Text>
        <Text style={styles.textoAr}>أنت صديقي.</Text>
        <Text style={styles.texto}>Ejemplo: Nosotros vamos al cine.</Text>
        <Text style={styles.textoAr}>نحن نذهب إلى السينما.</Text>
        <Text style={styles.texto}>Ejemplo: Ellas estudian mucho.</Text>
        <Text style={styles.textoAr}>هن يدرسن كثيرًا.</Text>
        <Text style={styles.regla}>Más ejemplos variados</Text>
        <Text style={styles.texto}>La casa es grande. (artículo definido)</Text>
        <Text style={styles.textoAr}>البيت كبير.</Text>
        <Text style={styles.texto}>Un niño corre en el parque. (artículo indefinido)</Text>
        <Text style={styles.textoAr}>ولد يجري في الحديقة.</Text>
        <Text style={styles.texto}>
          Vosotros tenéis una pregunta. (pronombre personal + artículo indefinido)
        </Text>
        <Text style={styles.textoAr}>أنتم لديكم سؤال.</Text>
        <Text style={styles.texto}>
          Ustedes son los profesores. (pronombre personal + artículo definido)
        </Text>
        <Text style={styles.textoAr}>أنتم الأساتذة.</Text>

        {/* Pronombres posesivos */}
        <Text style={styles.tituloSubjuntivo}>Pronombres posesivos</Text>
        <Text style={styles.texto}>
          Indican posesión o pertenencia. Ejemplos: mi, tu, su, nuestro/a, vuestro/a, su
          (singular/plural y masculino/femenino según el poseedor y lo poseído).
        </Text>
        <Text style={styles.textoAr}>
          ضمائر الملكية: mi, tu, su, nuestro/a, vuestro/a, su. تُستخدم للدلالة على الملكية.
        </Text>
        <Text style={styles.texto}>Ejemplo: Mi casa es grande.</Text>
        <Text style={styles.textoAr}>بيتي كبير.</Text>
        <Text style={styles.texto}>Ejemplo: Sus amigos son simpáticos.</Text>
        <Text style={styles.textoAr}>أصدقاؤه/أصدقاؤها لطفاء.</Text>
        <Text style={styles.texto}>Ejemplo: Nuestra profesora es española.</Text>
        <Text style={styles.textoAr}>معلمتنا إسبانية.</Text>

        {/* Pronombres demostrativos */}
        <Text style={styles.tituloSubjuntivo}>Pronombres demostrativos</Text>
        <Text style={styles.texto}>
          Señalan la distancia respecto al hablante: este/a (cerca), ese/a (media distancia),
          aquel/la (lejos). También existen en plural.
        </Text>
        <Text style={styles.textoAr}>
          ضمائر الإشارة: este/a, ese/a, aquel/la. تُستخدم للدلالة على القرب أو البعد.
        </Text>
        <Text style={styles.texto}>Ejemplo: Este es mi libro. (cerca)</Text>
        <Text style={styles.textoAr}>هذا كتابي.</Text>
        <Text style={styles.texto}>Ejemplo: Esos son tus zapatos. (media distancia)</Text>
        <Text style={styles.textoAr}>تلك هي حذاؤك.</Text>
        <Text style={styles.texto}>Ejemplo: Aquella casa es antigua. (lejos)</Text>
        <Text style={styles.textoAr}>ذلك البيت قديم.</Text>

        {/* Pronombres reflexivos */}
        <Text style={styles.tituloSubjuntivo}>Pronombres reflexivos</Text>
        <Text style={styles.texto}>
          Se usan cuando la acción recae sobre el sujeto. Ejemplos: me, te, se, nos, os, se.
        </Text>
        <Text style={styles.textoAr}>
          ضمائر الانعكاس: me, te, se, nos, os, se. تُستخدم عندما يعود الفعل على الفاعل نفسه.
        </Text>
        <Text style={styles.texto}>Ejemplo: Yo me levanto temprano.</Text>
        <Text style={styles.textoAr}>أنا أستيقظ مبكرًا.</Text>
        <Text style={styles.texto}>Ejemplo: Ellos se lavan las manos.</Text>
        <Text style={styles.textoAr}>هم يغسلون أيديهم.</Text>
        <Text style={styles.texto}>¿Tú te llamas Ahmed?</Text>
        <Text style={styles.textoAr}>هل اسمك أحمد؟</Text>

        {/* Pronombres de objeto directo */}
        <Text style={styles.tituloSubjuntivo}>Pronombres de objeto directo</Text>
        <Text style={styles.texto}>
          Sustituyen al complemento directo: me, te, lo/la, nos, os, los/las.
        </Text>
        <Text style={styles.textoAr}>
          ضمائر المفعول به المباشر: me, te, lo/la, nos, os, los/las.
        </Text>
        <Text style={styles.texto}>Ejemplo: ¿Tienes el libro? Sí, lo tengo.</Text>
        <Text style={styles.textoAr}>هل عندك الكتاب؟ نعم، عندي إياه.</Text>
        <Text style={styles.texto}>Ejemplo: Te veo todos los días.</Text>
        <Text style={styles.textoAr}>أراك كل يوم.</Text>

        {/* Pronombres de objeto indirecto */}
        <Text style={styles.tituloSubjuntivo}>Pronombres de objeto indirecto</Text>
        <Text style={styles.texto}>
          Indican a quién o para quién va la acción: me, te, le, nos, os, les.
        </Text>
        <Text style={styles.textoAr}>ضمائر المفعول غير المباشر: me, te, le, nos, os, les.</Text>
        <Text style={styles.texto}>Ejemplo: Le doy el regalo a María.</Text>
        <Text style={styles.textoAr}>أعطي الهدية لماريا.</Text>
        <Text style={styles.texto}>Nos escriben cartas.</Text>
        <Text style={styles.textoAr}>يكتبون لنا رسائل.</Text>

        {/* Pronombres relativos */}
        <Text style={styles.tituloSubjuntivo}>Pronombres relativos</Text>
        <Text style={styles.texto}>
          Unen dos frases y se refieren a un elemento anterior: que, quien, cuyo, el que, la que,
          los que, las que, lo que.
        </Text>
        <Text style={styles.textoAr}>
          ضمائر الوصل: que, quien, cuyo، ... تُستخدم للربط بين جملتين.
        </Text>
        <Text style={styles.texto}>Ejemplo: La chica que canta es mi hermana.</Text>
        <Text style={styles.textoAr}>الفتاة التي تغني هي أختي.</Text>
        <Text style={styles.texto}>El libro que leí es interesante.</Text>
        <Text style={styles.textoAr}>الكتاب الذي قرأته ممتع.</Text>

        {/* Pronombres interrogativos */}
        <Text style={styles.tituloSubjuntivo}>Pronombres interrogativos</Text>
        <Text style={styles.texto}>
          Sirven para preguntar: qué, quién, cuál, cuánto, dónde, cómo.
        </Text>
        <Text style={styles.textoAr}>ضمائر الاستفهام: qué, quién, cuál, cuánto, dónde, cómo.</Text>
        <Text style={styles.texto}>Ejemplo: ¿Quién viene a la fiesta?</Text>
        <Text style={styles.textoAr}>من سيأتي إلى الحفلة؟</Text>
        <Text style={styles.texto}>¿Dónde vives?</Text>
        <Text style={styles.textoAr}>أين تعيش؟</Text>

        {/* Ejercicios prácticos */}
        <Text style={styles.tituloSubjuntivo}>Ejercicios prácticos</Text>
        <Text style={styles.texto}>
          1. Completa con el pronombre correcto: - _______ (yo) tengo un coche. (posesivo) -
          ¿_______ (tú) quieres café? (personal) - Este es el libro _______ (que) compré. (relativo)
          - ¿_______ (quién) es tu profesor? (interrogativo) - María _______ (se) levanta temprano.
          (reflexivo) - No veo a Juan. ¿_______ (lo) has visto? (objeto directo) - Pedro _______
          (le) escribe una carta a su madre. (objeto indirecto)
        </Text>
        <Text style={styles.textoAr}>
          ١. أكمل بالجملة الصحيحة: - _______ لدي سيارة. (ملكي) - هل _______ تريد القهوة؟ (فاعل) -
          هذا هو الكتاب _______ اشتريته. (واصل) - من هو معلمك؟ (استفهام) - ماريا _______ تستيقظ
          مبكرًا. (انعكاسي) - لا أرى خوان. هل _______ رأيته؟ (مفعول مباشر) - بيدرو _______ يكتب
          رسالة لأمه. (مفعول غير مباشر)
        </Text>

        {/* Sección de adjetivos */}
        <Text style={styles.tituloSubjuntivo}>Adjetivos en español: explicación y ejemplos</Text>
        <Text style={styles.regla}>¿Qué es un adjetivo?</Text>
        <Text style={styles.texto}>
          Un adjetivo es una palabra que describe o califica a un sustantivo. Indica cualidades,
          cantidad, posesión, demostración, etc.
        </Text>
        <Text style={styles.textoAr}>
          الصِّفَة هي كلمة تصف أو تحدد الاسم. تشير إلى الصفات، الكمية، الملكية، الإشارة، إلخ.
        </Text>

        <Text style={styles.regla}>Reglas de concordancia</Text>
        <Text style={styles.texto}>
          El adjetivo concuerda en género (masculino/femenino) y número (singular/plural) con el
          sustantivo.
        </Text>
        <Text style={styles.textoAr}>
          تتفق الصفة مع الاسم في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع).
        </Text>
        <Text style={styles.texto}>Ejemplo: Niño alto / Niña alta / Niños altos / Niñas altas</Text>
        <Text style={styles.textoAr}>ولد طويل / بنت طويلة / أولاد طوال / بنات طويلات</Text>

        <Text style={styles.regla}>Tipos de adjetivos</Text>
        <Text style={styles.texto}>
          • Calificativos: expresan cualidades (bonito, grande, inteligente).
        </Text>
        <Text style={styles.textoAr}>صفات النوعية: جميل، كبير، ذكي...</Text>
        <Text style={styles.texto}>Ejemplo: El coche rojo es rápido.</Text>
        <Text style={styles.textoAr}>السيارة الحمراء سريعة.</Text>
        <Text style={styles.texto}>• Demostrativos: indican distancia (este, esa, aquellos).</Text>
        <Text style={styles.textoAr}>صفات الإشارة: هذا، تلك، أولئك...</Text>
        <Text style={styles.texto}>Ejemplo: Esa casa es nueva.</Text>
        <Text style={styles.textoAr}>تلك البيت جديد.</Text>
        <Text style={styles.texto}>• Posesivos: indican pertenencia (mi, tu, su, nuestro).</Text>
        <Text style={styles.textoAr}>صفات الملكية: لي، لك، له، لنا...</Text>
        <Text style={styles.texto}>Ejemplo: Nuestra profesora es simpática.</Text>
        <Text style={styles.textoAr}>معلمتنا لطيفة.</Text>
        <Text style={styles.texto}>
          • Numerales: indican cantidad exacta (dos, primero, triple).
        </Text>
        <Text style={styles.textoAr}>صفات العدد: اثنان، الأول، ثلاثي...</Text>
        <Text style={styles.texto}>Ejemplo: Tengo tres hermanos.</Text>
        <Text style={styles.textoAr}>لدي ثلاثة إخوة.</Text>
        <Text style={styles.texto}>
          • Indefinidos: cantidad no exacta (algún, ningún, muchos, varios).
        </Text>
        <Text style={styles.textoAr}>صفات النكرة: بعض، كثير، عدة...</Text>
        <Text style={styles.texto}>Ejemplo: Hay muchos estudiantes en la clase.</Text>
        <Text style={styles.textoAr}>هناك العديد من الطلاب في الفصل.</Text>

        <Text style={styles.regla}>Colocación del adjetivo</Text>
        <Text style={styles.texto}>
          Generalmente va después del sustantivo: "libro interesante". A veces, antes para enfatizar
          o por estilo: "gran hombre".
        </Text>
        <Text style={styles.textoAr}>
          عادة تأتي الصفة بعد الاسم: "كتاب ممتع". أحيانًا قبل الاسم للتأكيد: "رجل عظيم".
        </Text>

        <Text style={styles.regla}>Notas y errores frecuentes</Text>
        <Text style={styles.texto}>
          • No olvides la concordancia: "niña alto" es incorrecto, debe ser "niña alta".
        </Text>
        <Text style={styles.textoAr}>يجب الانتباه للاتفاق بين الاسم والصفة.</Text>
        <Text style={styles.texto}>
          • Algunos adjetivos cambian de significado según la posición: "pobre hombre" (desgraciado)
          vs "hombre pobre" (sin dinero).
        </Text>
        <Text style={styles.textoAr}>بعض الصفات يتغير معناها حسب موقعها في الجملة.</Text>

        <Text style={styles.regla}>Más ejemplos variados</Text>
        <Text style={styles.texto}>La niña pequeña juega en el jardín.</Text>
        <Text style={styles.textoAr}>البنت الصغيرة تلعب في الحديقة.</Text>
        <Text style={styles.texto}>Compré una camisa blanca y unos pantalones negros.</Text>
        <Text style={styles.textoAr}>اشتريت قميصًا أبيض وبنطالًا أسود.</Text>
        <Text style={styles.texto}>Es un día soleado y feliz.</Text>
        <Text style={styles.textoAr}>إنه يوم مشمس وسعيد.</Text>
        <Text style={styles.texto}>Busco algún libro interesante.</Text>
        <Text style={styles.textoAr}>أبحث عن كتاب ممتع.</Text>
        <Text style={styles.texto}>Mis amigos son simpáticos y trabajadores.</Text>
        <Text style={styles.textoAr}>أصدقائي لطفاء ومجتهدون.</Text>

        {/* Comparativos y superlativos */}
        <Text style={styles.tituloSubjuntivo}>Adjetivos comparativos y superlativos</Text>
        <Text style={styles.regla}>Comparativos</Text>
        <Text style={styles.texto}>
          Se usan para comparar dos elementos. Formas principales: - más + adjetivo + que
          (superioridad) - menos + adjetivo + que (inferioridad) - tan + adjetivo + como (igualdad)
        </Text>
        <Text style={styles.textoAr}>
          تُستخدم للمقارنة بين شيئين: - más + الصفة + que (للتفوق) - menos + الصفة + que (للنقص) -
          tan + الصفة + como (للمساواة)
        </Text>
        <Text style={styles.texto}>Ejemplo: Ana es más alta que María.</Text>
        <Text style={styles.textoAr}>آنا أطول من ماريا.</Text>
        <Text style={styles.texto}>Ejemplo: Este libro es menos interesante que aquel.</Text>
        <Text style={styles.textoAr}>هذا الكتاب أقل إثارة من ذلك.</Text>
        <Text style={styles.texto}>Ejemplo: Pedro es tan inteligente como Luis.</Text>
        <Text style={styles.textoAr}>بيدرو ذكي مثل لويس.</Text>

        <Text style={styles.regla}>Superlativos</Text>
        <Text style={styles.texto}>
          Se usan para expresar el grado máximo de una cualidad dentro de un grupo. Formas: -
          el/la/los/las + más/menos + adjetivo + de - Superlativo absoluto: adjetivo + ísimo/a/os/as
        </Text>
        <Text style={styles.textoAr}>
          تُستخدم للتعبير عن أعلى درجة من الصفة: - el/la/los/las + más/menos + الصفة + de - الصفة +
          ísimo/a/os/as (للتأكيد الشديد)
        </Text>
        <Text style={styles.texto}>Ejemplo: Lucía es la más simpática de la clase.</Text>
        <Text style={styles.textoAr}>لوسيا هي ألطف واحدة في الصف.</Text>
        <Text style={styles.texto}>Ejemplo: Este coche es el menos caro del mercado.</Text>
        <Text style={styles.textoAr}>هذه السيارة هي الأقل ثمناً في السوق.</Text>
        <Text style={styles.texto}>Ejemplo: El pastel está riquísimo.</Text>
        <Text style={styles.textoAr}>الكيك لذيذ جداً.</Text>
        <Text style={styles.texto}>Los niños son felicísimos hoy.</Text>
        <Text style={styles.textoAr}>الأطفال سعداء جداً اليوم.</Text>

        {/* Adjetivos irregulares */}
        <Text style={styles.tituloSubjuntivo}>
          Adjetivos comparativos y superlativos irregulares
        </Text>
        <Text style={styles.texto}>
          Algunos adjetivos tienen formas irregulares para el comparativo y el superlativo:
        </Text>
        <Text style={styles.textoAr}>بعض الصفات لها أشكال غير منتظمة في المقارنة والتفضيل.</Text>
        <Text style={styles.texto}>- bueno → mejor (comparativo), el/la mejor (superlativo)</Text>
        <Text style={styles.texto}>- malo → peor (comparativo), el/la peor (superlativo)</Text>
        <Text style={styles.texto}>- grande → mayor (comparativo), el/la mayor (superlativo)</Text>
        <Text style={styles.texto}>- pequeño → menor (comparativo), el/la menor (superlativo)</Text>
        <Text style={styles.textoAr}>
          - bueno → mejor (أفضل) - malo → peor (أسوأ) - grande → mayor (أكبر) - pequeño → menor
          (أصغر)
        </Text>
        <Text style={styles.texto}>Ejemplo: Este restaurante es mejor que aquel.</Text>
        <Text style={styles.textoAr}>هذا المطعم أفضل من ذلك.</Text>
        <Text style={styles.texto}>Ejemplo: Hoy el tiempo es peor que ayer.</Text>
        <Text style={styles.textoAr}>اليوم الطقس أسوأ من البارحة.</Text>
        <Text style={styles.texto}>Ejemplo: Mi hermano mayor vive en Madrid.</Text>
        <Text style={styles.textoAr}>أخي الأكبر يعيش في مدريد.</Text>
        <Text style={styles.texto}>Ejemplo: Esta es la menor de la familia.</Text>
        <Text style={styles.textoAr}>هذه أصغر واحدة في العائلة.</Text>

        {/* Tabla resumen */}
        <Text style={styles.tituloSubjuntivo}>Tabla resumen de comparativos y superlativos</Text>
        <View style={[styles.tablaConjugacionBox, { marginBottom: 12 }]}>
          <View style={styles.tablaFila}>
            <Text style={[styles.tablaCelda, { fontWeight: "bold", flex: 1.2 }]}>Adjetivo</Text>
            <Text style={[styles.tablaCelda, { fontWeight: "bold" }]}>Comparativo</Text>
            <Text style={[styles.tablaCelda, { fontWeight: "bold" }]}>Superlativo</Text>
          </View>
          <View style={styles.tablaFila}>
            <Text style={styles.tablaCelda}>bueno</Text>
            <Text style={styles.tablaCelda}>mejor</Text>
            <Text style={styles.tablaCelda}>el/la mejor</Text>
          </View>
          <View style={styles.tablaFila}>
            <Text style={styles.tablaCelda}>malo</Text>
            <Text style={styles.tablaCelda}>peor</Text>
            <Text style={styles.tablaCelda}>el/la peor</Text>
          </View>
          <View style={styles.tablaFila}>
            <Text style={styles.tablaCelda}>grande</Text>
            <Text style={styles.tablaCelda}>mayor</Text>
            <Text style={styles.tablaCelda}>el/la mayor</Text>
          </View>
          <View style={styles.tablaFila}>
            <Text style={styles.tablaCelda}>pequeño</Text>
            <Text style={styles.tablaCelda}>menor</Text>
            <Text style={styles.tablaCelda}>el/la menor</Text>
          </View>
          <View style={styles.tablaFila}>
            <Text style={styles.tablaCelda}>bonito</Text>
            <Text style={styles.tablaCelda}>más bonito</Text>
            <Text style={styles.tablaCelda}>el más bonito</Text>
          </View>
        </View>
        <Text style={styles.textoAr}>جدول ملخص لأشكال المقارنة والتفضيل لبعض الصفات.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tablaFila: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 3,
  },
  tituloSubjuntivo: {
    color: "#8e44ad", // morado destacado
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  tablaConjugacionBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    marginTop: 4,
  },
  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 6,
  },
  backButtonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
  ejemploFraseBox: {
    marginVertical: 14,
    backgroundColor: "#f9fbe7",
    borderRadius: 8,
    padding: 10,
  },
  ejemploFrase: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
    flexWrap: "wrap",
  },
  pronombre: {
    color: "#000",
    fontWeight: "bold",
  },
  verbo: {
    color: "#000",
    fontWeight: "bold",
  },
  traduccionAr: {
    color: "#b28704",
    fontStyle: "italic",
    marginLeft: 6,
    writingDirection: "rtl",
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
  regla: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginBottom: 4,
    textAlign: "center",
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
  tablaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 8,
  },
  tablaCol: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  tablaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fbc02d",
    marginBottom: 8,
    textAlign: "center",
  },
  tablaCelda: {
    fontSize: 15,
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 4,
    width: "100%",
  },
});
