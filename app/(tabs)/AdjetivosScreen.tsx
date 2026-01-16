import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function AdjetivosScreen() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<any>({});
  const [feedback, setFeedback] = useState<any>({});

  const handleInput = (idx: number, value: string) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: value }));
  };

  const checkAnswer = (idx: number, correcta: string) => {
    const userAnswer = respuestas[idx] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === correcta.toLowerCase();
    setFeedback((prev: any) => ({ ...prev, [idx]: isCorrect ? '¡Correcto!' : 'Incorrecto' }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/GramaticaScreen")}
      >
        <Text style={styles.backButtonText}>{"← Volver"}</Text>
      </TouchableOpacity>
      
      <Text style={styles.titulo}>Adjetivos en español</Text>
      
      {/* Definición */}
      <Text style={styles.regla}>¿Qué es un adjetivo?</Text>
      <Text style={styles.texto}>
        Un adjetivo es una palabra que describe o califica a un sustantivo, indicando sus
        características, cualidades o estados. Los adjetivos nos ayudan a ser más específicos y precisos en nuestra comunicación.
      </Text>
      <Text style={styles.textoAr}>
        الصفة هي كلمة تصف أو تحدد اسمًا، وتبين خصائصه أو حالته أو صفاته. تساعدنا الصفات على أن نكون أكثر تحديدًا ودقة في تواصلنا.
      </Text>

      {/* Tipos de adjetivos */}
      <Text style={styles.seccion}>Tipos de adjetivos</Text>
      
      <Text style={styles.subtitulo}>1. Adjetivos calificativos - الصفات النوعية</Text>
      <Text style={styles.texto}>
        Indican una cualidad o característica del sustantivo. Son los más comunes y expresivos.
      </Text>
      <Text style={styles.textoAr}>
        تدل على صفة أو خاصية للاسم. هي الأكثر شيوعًا وتعبيرًا.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • casa grande / منزل كبير{"\n"}
        • niño inteligente / طفل ذكي{"\n"}
        • mujer hermosa / امرأة جميلة{"\n"}
        • libro interesante / كتاب مثير للاهتمام{"\n"}
        • comida deliciosa / طعام لذيذ{"\n"}
        • día soleado / يوم مشمس
      </Text>

      <Text style={styles.subtitulo}>2. Adjetivos demostrativos - الصفات الإشارية</Text>
      <Text style={styles.texto}>
        Señalan la ubicación del sustantivo respecto al hablante en el espacio o tiempo.
      </Text>
      <Text style={styles.textoAr}>
        تشير إلى موقع الاسم بالنسبة للمتكلم في المكان أو الزمان.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • este libro (cerca del hablante) / هذا الكتاب (قريب من المتكلم){"\n"}
        • esa mesa (cerca del oyente) / تلك الطاولة (قريب من المستمع){"\n"}
        • aquel niño (lejos de ambos) / ذلك الطفل (بعيد عن كليهما){"\n"}
        • estos días (tiempo presente) / هذه الأيام (الوقت الحالي){"\n"}
        • aquellas vacaciones (tiempo pasado) / تلك العطلات (الوقت الماضي)
      </Text>

      <Text style={styles.subtitulo}>3. Adjetivos posesivos - الصفات الملكية</Text>
      <Text style={styles.texto}>
        Indican pertenencia o posesión. Se adaptan al género y número del sustantivo.
      </Text>
      <Text style={styles.textoAr}>
        تدل على الملكية أو الانتماء. تتكيف مع نوع وعدد الاسم.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • mi casa / بيتي{"\n"}
        • tu amigo / صديقك{"\n"}
        • su coche / سيارته{"\n"}
        • nuestra familia / عائلتنا{"\n"}
        • vuestro trabajo / عملكم{"\n"}
        • sus libros / كتبهم
      </Text>

      <Text style={styles.subtitulo}>4. Adjetivos numerales - الصفات العددية</Text>
      <Text style={styles.texto}>
        Expresan cantidad u orden. Se dividen en cardinales y ordinales.
      </Text>
      <Text style={styles.textoAr}>
        تعبر عن الكمية أو الترتيب. تنقسم إلى أعداد أساسية وترتيبية.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Cardinales (أساسية):</Text>{"\n"}
        • dos libros / كتابان{"\n"}
        • cinco personas / خمسة أشخاص{"\n"}
        • veinte años / عشرون سنة{"\n"}
        <Text style={styles.ejemploLabel}>Ordinales (ترتيبية):</Text>{"\n"}
        • primer lugar / المركز الأول{"\n"}
        • segunda vez / المرة الثانية{"\n"}
        • tercer intento / المحاولة الثالثة
      </Text>

      <Text style={styles.subtitulo}>5. Adjetivos indefinidos - الصفات النكرة</Text>
      <Text style={styles.texto}>
        Expresan cantidad o identidad de manera vaga o imprecisa.
      </Text>
      <Text style={styles.textoAr}>
        تدل على كمية أو هوية غير محددة.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • algunos niños / بعض الأطفال{"\n"}
        • muchas personas / كثير من الناس{"\n"}
        • pocos libros / قليل من الكتب{"\n"}
        • varios amigos / عدة أصدقاء{"\n"}
        • ningún problema / لا مشكلة{"\n"}
        • toda la familia / العائلة كلها
      </Text>

      {/* Reglas de concordancia */}
      <Text style={styles.seccion}>Reglas de concordancia - قواعد المطابقة</Text>
      
      <Text style={styles.subtitulo}>1. Concordancia en género - المطابقة في النوع</Text>
      <Text style={styles.texto}>
        El adjetivo debe coincidir en género (masculino/femenino) con el sustantivo.
      </Text>
      <Text style={styles.textoAr}>
        يجب أن تتطابق الصفة في النوع (مذكر/مؤنث) مع الاسم.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • niño alto / ولد طويل{"\n"}
        • niña alta / بنت طويلة{"\n"}
        • hombre trabajador / رجل مجتهد{"\n"}
        • mujer trabajadora / امرأة مجتهدة{"\n"}
        • libro interesante / كتاب مثير للاهتمام{"\n"}
        • película interesante / فيلم مثير للاهتمام
      </Text>

      <Text style={styles.subtitulo}>2. Concordancia en número - المطابقة في العدد</Text>
      <Text style={styles.texto}>
        El adjetivo debe coincidir en número (singular/plural) con el sustantivo.
      </Text>
      <Text style={styles.textoAr}>
        يجب أن تتطابق الصفة في العدد (مفرد/جمع) مع الاسم.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • casa grande / منزل كبير{"\n"}
        • casas grandes / منازل كبيرة{"\n"}
        • coche rápido / سيارة سريعة{"\n"}
        • coches rápidos / سيارات سريعة{"\n"}
        • niño inteligente / طفل ذكي{"\n"}
        • niños inteligentes / أطفال أذكياء
      </Text>

      <Text style={styles.subtitulo}>3. Posición del adjetivo - موقع الصفة</Text>
      <Text style={styles.texto}>
        En español, el adjetivo puede ir antes o después del sustantivo, dependiendo del significado.
      </Text>
      <Text style={styles.textoAr}>
        في الإسبانية، يمكن أن تأتي الصفة قبل أو بعد الاسم، حسب المعنى.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Después del sustantivo (después del nombre):</Text>{"\n"}
        • casa grande (tamaño) / منزل كبير (الحجم){"\n"}
        • libro interesante (cualidad) / كتاب مثير للاهتمام (الصفة){"\n"}
        <Text style={styles.ejemploLabel}>Antes del sustantivo (قبل الاسم):</Text>{"\n"}
        • gran casa (énfasis) / منزل عظيم (تأكيد){"\n"}
        • pobre hombre (compasión) / رجل مسكين (شفقة){"\n"}
        • viejo amigo (antigüedad) / صديق قديم (القدم)
      </Text>

      {/* Grados del adjetivo */}
      <Text style={styles.seccion}>Grados del adjetivo - درجات الصفة</Text>
      
      <Text style={styles.subtitulo}>1. Grado positivo - الدرجة الإيجابية</Text>
      <Text style={styles.texto}>
        Expresa la cualidad sin comparación: alto, inteligente, hermoso.
      </Text>
      <Text style={styles.textoAr}>
        يعبر عن الصفة بدون مقارنة: طويل، ذكي، جميل.
      </Text>

      <Text style={styles.subtitulo}>2. Grado comparativo - الدرجة المقارنة</Text>
      <Text style={styles.texto}>
        Compara dos elementos usando más, menos o igual de.
      </Text>
      <Text style={styles.textoAr}>
        يقارن عنصرين باستخدام أكثر، أقل أو مساوي.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • más alto que / أطول من{"\n"}
        • menos inteligente que / أقل ذكاءً من{"\n"}
        • igual de hermoso que / جميل مثل{"\n"}
        • tan rápido como / سريع مثل
      </Text>

      <Text style={styles.subtitulo}>3. Grado superlativo - الدرجة العظمى</Text>
      <Text style={styles.texto}>
        Expresa el máximo grado de una cualidad.
      </Text>
      <Text style={styles.textoAr}>
        يعبر عن أعلى درجة من الصفة.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • el más alto / الأطول{"\n"}
        • la más inteligente / الأذكى{"\n"}
        • muy hermoso / جميل جدًا{"\n"}
        • extremadamente rápido / سريع للغاية
      </Text>

      {/* Adjetivos irregulares */}
      <Text style={styles.seccion}>Adjetivos irregulares - الصفات الشاذة</Text>
      <Text style={styles.texto}>
        Algunos adjetivos tienen formas irregulares en su comparación.
      </Text>
      <Text style={styles.textoAr}>
        بعض الصفات لها أشكال شاذة في مقارنتها.
      </Text>
      <Text style={styles.ejemplo}>
        <Text style={styles.ejemploLabel}>Ejemplos:</Text>{"\n"}
        • bueno → mejor → el mejor / جيد → أفضل → الأفضل{"\n"}
        • malo → peor → el peor / سيء → أسوأ → الأسوأ{"\n"}
        • grande → mayor → el mayor / كبير → أكبر → الأكبر{"\n"}
        • pequeño → menor → el menor / صغير → أصغر → الأصغر
      </Text>

      {/* Ejercicios interactivos */}
      <Text style={styles.seccion}>Ejercicios - تمارين</Text>
      
      <View style={styles.ejercicio}>
        <Text style={styles.ejercicioTitulo}>Ejercicio 1: Completa con el adjetivo correcto</Text>
        <Text style={styles.ejercicioTexto}>
          Completa: "El niño es muy _____ (inteligente)"{"\n"}
          اكمل: "الطفل ذكي جدًا"
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu respuesta..."
          value={respuestas[1] || ''}
          onChangeText={(text) => handleInput(1, text)}
        />
        <TouchableOpacity 
          style={styles.botonVerificar}
          onPress={() => checkAnswer(1, 'inteligente')}
        >
          <Text style={styles.botonTexto}>Verificar</Text>
        </TouchableOpacity>
        {feedback[1] && (
          <Text style={[styles.feedback, { color: feedback[1] === '¡Correcto!' ? '#388e3c' : '#d32f2f' }]}>
            {feedback[1]}
          </Text>
        )}
      </View>

      <View style={styles.ejercicio}>
        <Text style={styles.ejercicioTitulo}>Ejercicio 2: Concordancia en género</Text>
        <Text style={styles.ejercicioTexto}>
          Completa: "La mujer es _____ (trabajador)"{"\n"}
          اكمل: "المرأة مجتهدة"
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu respuesta..."
          value={respuestas[2] || ''}
          onChangeText={(text) => handleInput(2, text)}
        />
        <TouchableOpacity 
          style={styles.botonVerificar}
          onPress={() => checkAnswer(2, 'trabajadora')}
        >
          <Text style={styles.botonTexto}>Verificar</Text>
        </TouchableOpacity>
        {feedback[2] && (
          <Text style={[styles.feedback, { color: feedback[2] === '¡Correcto!' ? '#388e3c' : '#d32f2f' }]}>
            {feedback[2]}
          </Text>
        )}
      </View>

      <View style={styles.ejercicio}>
        <Text style={styles.ejercicioTitulo}>Ejercicio 3: Concordancia en número</Text>
        <Text style={styles.ejercicioTexto}>
          Completa: "Los libros son _____ (interesante)"{"\n"}
          اكمل: "الكتب مثيرة للاهتمام"
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu respuesta..."
          value={respuestas[3] || ''}
          onChangeText={(text) => handleInput(3, text)}
        />
        <TouchableOpacity 
          style={styles.botonVerificar}
          onPress={() => checkAnswer(3, 'interesantes')}
        >
          <Text style={styles.botonTexto}>Verificar</Text>
        </TouchableOpacity>
        {feedback[3] && (
          <Text style={[styles.feedback, { color: feedback[3] === '¡Correcto!' ? '#388e3c' : '#d32f2f' }]}>
            {feedback[3]}
          </Text>
        )}
      </View>

      {/* Consejos prácticos */}
      <Text style={styles.seccion}>Consejos prácticos - نصائح عملية</Text>
      <Text style={styles.texto}>
        • Los adjetivos de nacionalidad no llevan mayúscula: español, francés, italiano{"\n"}
        • Los colores son adjetivos: rojo, azul, verde{"\n"}
        • Algunos adjetivos cambian de significado según su posición{"\n"}
        • Los adjetivos de tamaño suelen ir después del sustantivo{"\n"}
        • Los adjetivos de opinión suelen ir después del sustantivo
      </Text>
      <Text style={styles.textoAr}>
        • صفات الجنسية لا تأخذ حرف كبير: إسباني، فرنسي، إيطالي{"\n"}
        • الألوان صفات: أحمر، أزرق، أخضر{"\n"}
        • بعض الصفات تتغير معناها حسب موقعها{"\n"}
        • صفات الحجم عادة تأتي بعد الاسم{"\n"}
        • صفات الرأي عادة تأتي بعد الاسم
      </Text>

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
  },
  backButtonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
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
  },
  seccion: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 24,
    marginBottom: 12,
    textAlign: "left",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 6,
  },
  texto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    textAlign: "left",
    lineHeight: 22,
  },
  textoAr: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
    lineHeight: 22,
  },
  ejemplo: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#000",
  },
  ejemploLabel: {
    fontWeight: "bold",
    color: "#000",
  },
  ejercicio: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  ejercicioTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  ejercicioTexto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  botonVerificar: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  botonTexto: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedback: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});
