import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";


function GramaticaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nivel?: string }>();
  const nivel = params.nivel || 'A1';
  
  const getBackRoute = () => {
    switch(nivel) {
      case 'A2':
        return '/(tabs)/A2_Plataforma';
      case 'B1':
        return '/(tabs)/B1_Umbral';
      case 'B2':
        return '/(tabs)/B2_Avanzado';
      default:
        return '/(tabs)/A1_Acceso';
    }
  };
  
  const getBackText = () => {
    switch(nivel) {
      case 'A2':
        return '⟵ Volver al Menú A2';
      case 'B1':
        return '⟵ Volver al Menú B1';
      case 'B2':
        return '⟵ Volver al Menú B2';
      default:
        return '⟵ Volver al Menú A1';
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.volverBtn}
          onPress={() => router.push(getBackRoute() as any)}
        >
          <Text style={styles.volverBtnText}>{getBackText()}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Gramática</Text>

        <View style={styles.temasContainer}>
          <Text style={styles.temasTitulo}>Temas gramaticales</Text>
          <View style={styles.temasBotonesRow}>
            <Text style={styles.temasBoton} onPress={() => router.push("/VerbosScreen")}>
              Verbos
            </Text>
            <Text style={styles.temasBoton} onPress={() => router.push("/AdjetivosScreen")}>
              Adjetivos
            </Text>
            <Text style={styles.temasBoton} onPress={() => router.push("/SerEstarScreen")}>
              Ser y Estar
            </Text>
          </View>
        </View>

        {nivel === 'A2' && (
          <>
            <Text style={styles.seccion}>A2 · Pretérito perfecto compuesto</Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              ¿Cómo hablar de experiencias recientes?
            </Text>
            <Text style={{ marginBottom: 8 }}>
              El pretérito perfecto se forma con <Text style={{ fontWeight: 'bold' }}>haber (presente)</Text> + participio pasado. Se usa para acciones que ocurren en un pasado cercano o con conexión al presente.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              يُستخدم الماضي التام القريب للتحدث عن أحداث قريبة ما زال أثرها أو نتيجتها في الحاضر. الصيغة: فعل haber في المضارع + اسم المفعول.
            </Text>
            <Text style={styles.subtitulo}>Conjugación de HABER</Text>
            {[['Yo', 'he'], ['Tú', 'has'], ['Él/Ella/Usted', 'ha'], ['Nosotros/as', 'hemos'], ['Vosotros/as', 'habéis'], ['Ellos/Ellas/Ustedes', 'han']].map(([pron, form]) => (
              <View key={pron} style={styles.tablaRow}>
                <Text style={styles.tablaCell}>{`${pron} ${form}`}</Text>
                <Text style={styles.tablaCellAr}>{pron === 'Yo' ? 'أنا' : pron === 'Tú' ? 'أنت' : ''}</Text>
              </View>
            ))}
            <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>He visitado Valencia</Text>
              <Text style={styles.tablaCellAr}>لقد زرت فالنسيا</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>¿Has comido ya?</Text>
              <Text style={styles.tablaCellAr}>هل أكلت بالفعل؟</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Aún no hemos terminado</Text>
              <Text style={styles.tablaCellAr}>لم ننتهِ بعد</Text>
            </View>

            <Text style={styles.seccion}>A2 · Pronombres de objeto directo e indirecto</Text>
            <Text style={{ marginBottom: 8 }}>
              En A2 es fundamental combinar pronombres para evitar repetir información. Recuerda que los pronombres van antes del verbo conjugado o unidos al infinitivo/gerundio.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              الضمائر المفعولية المباشرة وغير المباشرة تمنع التكرار وتسبق الفعل. عند اجتماع الضميرين، يأتي غير المباشر قبل المباشر ويتحوّل LE/LES إلى SE أمام LO/LA/LOS/LAS.
            </Text>
            <Text style={styles.subtitulo}>Objeto directo</Text>
            {[
              ['me', 'me'],
              ['te', 'te'],
              ['lo / la', 'إياه / إياها'],
              ['nos', 'إيانا'],
              ['os', 'إياكم'],
              ['los / las', 'إياهم / إياهن'],
            ].map(([es, ar]) => (
              <View key={es} style={styles.tablaRow}>
                <Text style={styles.tablaCell}>{es}</Text>
                <Text style={styles.tablaCellAr}>{ar}</Text>
              </View>
            ))}
            <Text style={styles.subtitulo}>Objeto indirecto</Text>
            {[
              ['me', 'لي'],
              ['te', 'لك'],
              ['le', 'له / لها'],
              ['nos', 'لنا'],
              ['os', 'لكم'],
              ['les', 'لهم'],
            ].map(([es, ar]) => (
              <View key={es} style={styles.tablaRow}>
                <Text style={styles.tablaCell}>{es}</Text>
                <Text style={styles.tablaCellAr}>{ar}</Text>
              </View>
            ))}
            <Text style={styles.subtitulo}>Combinación</Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Se lo explico</Text>
              <Text style={styles.tablaCellAr}>أشرح الأمر له / لها</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>¿Me la puedes traer?</Text>
              <Text style={styles.tablaCellAr}>هل يمكنك أن تحضرها لي؟</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Te las envío luego</Text>
              <Text style={styles.tablaCellAr}>سأرسلها لك لاحقًا</Text>
            </View>

            <Text style={styles.seccion}>A2 · Expresar obligación y recomendación</Text>
            <Text style={{ marginBottom: 8 }}>
              Aprende a diferenciar entre obligación personal, consejo y norma general usando las perífrasis más comunes.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              للتعبير عن الواجب أو النصيحة نستخدم: tener que + مصدر (واجب شخصي)، deber + مصدر (نصيحة قوية)، hay que + مصدر (قاعدة عامة للجميع).
            </Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Tener que + inf.</Text>
              <Text style={styles.tablaCellAr}>عليّ أن / عليك أن</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Deber + inf.</Text>
              <Text style={styles.tablaCellAr}>يجب أن (نصيحة)</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Hay que + inf.</Text>
              <Text style={styles.tablaCellAr}>يجب (على الجميع)</Text>
            </View>
            <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Tengo que estudiar para el examen</Text>
              <Text style={styles.tablaCellAr}>يجب أن أدرس للامتحان</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Debes descansar más</Text>
              <Text style={styles.tablaCellAr}>عليك أن ترتاح أكثر</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Hay que llegar puntual al trabajo</Text>
              <Text style={styles.tablaCellAr}>يجب الوصول في الوقت المحدد إلى العمل</Text>
            </View>
          </>
        )}

        {nivel === 'B1' && (
          <>
            <Text style={styles.seccion}>B1 · Pretérito imperfecto vs. indefinido</Text>
            <Text style={{ marginBottom: 8 }}>
              Refinamos el pasado: el <Text style={{ fontWeight: 'bold' }}>pretérito imperfecto</Text> describe hábitos, descripciones o acciones en progreso; el <Text style={{ fontWeight: 'bold' }}>pretérito indefinido</Text> narra hechos puntuales y terminados.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              نستخدم الماضي الناقص لوصف العادات أو الخلفية، والماضي البسيط للأحداث المنتهية والمحددة في الزمن.
            </Text>
            <Text style={styles.subtitulo}>Usos principales</Text>
            {[['Imperfecto', 'Descripciones, edad, hora, hábitos'], ['Indefinido', 'Acciones puntuales, secuencias, interrupciones']].map(([tiempo, uso]) => (
              <View key={tiempo} style={styles.tablaRow}>
                <Text style={styles.tablaCell}>{tiempo}</Text>
                <Text style={styles.tablaCellAr}>
                  {tiempo === 'Imperfecto' ? 'لوصف الخلفية والروتين' : 'لأحداث منتهية'}
                </Text>
              </View>
            ))}
            <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Cuando era niño, jugaba en la calle.</Text>
              <Text style={styles.tablaCellAr}>عندما كنت طفلاً، كنت ألعب في الشارع.</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Ayer conocí a mis vecinos.</Text>
              <Text style={styles.tablaCellAr}>أمس تعرّفت إلى جيراني.</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Cocinaba cuando llegó mi madre.</Text>
              <Text style={styles.tablaCellAr}>كنت أطبخ عندما وصلت أمي.</Text>
            </View>

            <Text style={styles.seccion}>B1 · Perífrasis verbales útiles</Text>
            <Text style={{ marginBottom: 8 }}>
              En B1 aparecen combinaciones como <Text style={{ fontWeight: 'bold' }}>estar + gerundio</Text> (acción en progreso), <Text style={{ fontWeight: 'bold' }}>seguir + gerundio</Text> (continuidad) o <Text style={{ fontWeight: 'bold' }}>acabar de + infinitivo</Text> (acción recién terminada).
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              التراكيب اللفظية (perífrasis) تجمع بين فعل مساعد وفعل آخر لتحديد الزمن أو الموقف: أكون + اسم فاعل، أواصل + اسم فاعل، أنهي للتو + مصدر.
            </Text>
            {[
              ['Estar + gerundio', 'Estoy estudiando español', 'أدرس الإسبانية الآن'],
              ['Seguir + gerundio', 'Seguimos trabajando aquí', 'ما زلنا نعمل هنا'],
              ['Acabar de + inf.', 'Acabo de llegar', 'توني وصلت'],
            ].map(([titulo, es, ar]) => (
              <View key={titulo} style={styles.tablaRow}>
                <Text style={styles.tablaCell}>{titulo}</Text>
                <Text style={styles.tablaCellAr}>{es} · {ar}</Text>
              </View>
            ))}

            <Text style={styles.seccion}>B1 · Condicionales tipo 1</Text>
            <Text style={{ marginBottom: 8 }}>
              Estructura: <Text style={{ fontWeight: 'bold' }}>Si + presente de indicativo</Text> → <Text style={{ fontWeight: 'bold' }}>futuro / imperativo / presente</Text>. Se usa para situaciones reales o muy probables.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              الجملة الشرطية من النوع الأول تتحدث عن احتمال واقعي: إذا + مضارع → مستقبل أو أمر.
            </Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Si estudias, aprobarás.</Text>
              <Text style={styles.tablaCellAr}>إذا درست ستنجح.</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Si tienes dudas, llámame.</Text>
              <Text style={styles.tablaCellAr}>إذا كان لديك شك، اتصل بي.</Text>
            </View>
          </>
        )}

        {nivel === 'B2' && (
          <>
            <Text style={styles.seccion}>B2 · Subjuntivo presente en oraciones nominales</Text>
            <Text style={{ marginBottom: 8 }}>
              El subjuntivo aparece después de verbos de emoción, deseo o valoración: <Text style={{ fontWeight: 'bold' }}>Espero que vengas</Text>, <Text style={{ fontWeight: 'bold' }}>Es importante que estudien</Text>.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              صيغة المضارع في الإسبانية (subjuntivo) تُستخدم بعد أفعال التعبير عن الرغبة أو المشاعر أو الأحكام: أتمنى أن، مهم أن، أخاف أن...
            </Text>
            <Text style={styles.subtitulo}>Desencadenantes comunes</Text>
            {[
              'Querer que...',
              'Es necesario que...',
              'Me alegra que...',
              'Ojalá que...'
            ].map((frase) => (
              <Text key={frase} style={styles.tablaCell}>{frase}</Text>
            ))}
            <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Quiero que descanses.</Text>
              <Text style={styles.tablaCellAr}>أريدك أن ترتاح.</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Es probable que lleguen tarde.</Text>
              <Text style={styles.tablaCellAr}>من المحتمل أن يصلوا متأخرين.</Text>
            </View>

            <Text style={styles.seccion}>B2 · Estilo indirecto (discurso reportado)</Text>
            <Text style={{ marginBottom: 8 }}>
              Cuando contamos lo que otra persona dijo, ajustamos tiempos y pronombres: <Text style={{ fontWeight: 'bold' }}>"Voy" → dijo que iba</Text>.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              في الأسلوب غير المباشر نغيّر الأزمنة وفقًا لزمن الكلام الأصلي: الحاضر يصبح ماضياً، المستقبل يصبح شرطياً، إلى آخره.
            </Text>
            <Text style={styles.subtitulo}>Transformaciones frecuentes</Text>
            {[
              ['Presente → Pretérito imperfecto', '"Estoy cansado" → dijo que estaba cansado'],
              ['Futuro → Condicional', '"Iré mañana" → comentó que iría al día siguiente'],
              ['Imperativo → Subjuntivo', '"Haz la tarea" → pidió que hiciera la tarea'],
            ].map(([regla, ejemplo]) => (
              <View key={regla} style={styles.tablaRow}>
                <Text style={styles.tablaCell}>{regla}</Text>
                <Text style={styles.tablaCellAr}>{ejemplo}</Text>
              </View>
            ))}

            <Text style={styles.seccion}>B2 · Voz pasiva perifrástica</Text>
            <Text style={{ marginBottom: 8 }}>
              Se forma con <Text style={{ fontWeight: 'bold' }}>ser + participio</Text> y se usa para enfatizar la acción o el resultado: <Text style={{ fontWeight: 'bold' }}>La carta fue enviada</Text>.
            </Text>
            <Text style={{
              marginBottom: 8,
              color: '#79A890',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              شرح بالعربية:
            </Text>
            <Text style={{
              marginBottom: 8,
              writingDirection: 'rtl',
              textAlign: 'right',
              color: '#333',
            }}>
              المبني للمجهول يتكوّن من فعل ser في الزمن المناسب + اسم المفعول، ويتفق الاسم المفعول مع الفاعل الجديد في الجنس والعدد.
            </Text>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>El informe será revisado mañana.</Text>
              <Text style={styles.tablaCellAr}>سيتم مراجعة التقرير غدًا.</Text>
            </View>
            <View style={styles.tablaRow}>
              <Text style={styles.tablaCell}>Las casas fueron construidas en 1950.</Text>
              <Text style={styles.tablaCellAr}>بُنيت المنازل سنة 1950.</Text>
            </View>
          </>
        )}

        {/* Otros temas */}

        {/* Adverbios */}
        <Text style={styles.seccion}>Adverbios</Text>

        {/* Participio pasado */}
        <Text style={styles.seccion}>Participio pasado / اسم المفعول</Text>
        <Text style={{
          marginBottom: 8,
          color: "#79A890",
          fontWeight: "bold",
          fontSize: 16,
        }}>
          ¿Qué es el participio pasado?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          El participio pasado es una forma verbal que se utiliza para formar los tiempos compuestos y la voz pasiva. En español, suele terminar en -ado (para verbos regulares -ar) o -ido (para verbos regulares -er/-ir).
        </Text>
        <Text style={{
          marginBottom: 8,
          color: "#79A890",
          fontWeight: "bold",
          fontSize: 16,
        }}>
          شرح بالعربية:
        </Text>
        <Text style={{
          marginBottom: 8,
          writingDirection: "rtl",
          textAlign: "right",
          color: "#333",
        }}>
          اسم المفعول هو صيغة فعلية تُستخدم لتكوين الأزمنة المركبة (مثل الماضي التام) أو في المبني للمجهول. في الإسبانية، غالبًا ما ينتهي بـ -ado (لأفعال -ar) أو -ido (لأفعال -er/-ir).
        </Text>
        <Text style={styles.subtitulo}>Reglas / القواعد</Text>
        <Text style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Verbos regulares:</Text> Para los verbos terminados en -ar, el participio pasado termina en -ado. Para los verbos terminados en -er o -ir, termina en -ido.
        </Text>
        <Text style={{ marginBottom: 8, writingDirection: "rtl", textAlign: "right" }}>
          <Text style={{ fontWeight: "bold" }}>الأفعال المنتظمة:</Text> إذا كان الفعل ينتهي بـ -ar، يكون اسم المفعول بـ -ado. إذا كان ينتهي بـ -er أو -ir، يكون بـ -ido.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>hablar → hablado</Text>
          <Text style={styles.tablaCellAr}>تحدث → متحدث عنه</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>comer → comido</Text>
          <Text style={styles.tablaCellAr}>أكل → مأكول</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>vivir → vivido</Text>
          <Text style={styles.tablaCellAr}>عاش → معيش</Text>
        </View>
        <Text style={styles.subtitulo}>Verbos irregulares / الأفعال غير المنتظمة</Text>
        <Text style={{ marginBottom: 8 }}>
          Algunos verbos tienen participios pasados irregulares. Por ejemplo:
        </Text>
        <Text style={{ marginBottom: 8, writingDirection: "rtl", textAlign: "right" }}>
          بعض الأفعال لها اسم مفعول غير منتظم. مثلاً:
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>escribir → escrito</Text>
          <Text style={styles.tablaCellAr}>كتب → مكتوب</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>ver → visto</Text>
          <Text style={styles.tablaCellAr}>رأى → مرئي</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>abrir → abierto</Text>
          <Text style={styles.tablaCellAr}>فتح → مفتوح</Text>
        </View>
        <Text style={styles.tablaCellEj}>Ejemplo: He comido pan.</Text>
        <Text style={styles.tablaCellEjAr}>مثال: لقد أكلت خبزًا.</Text>

        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué es un adverbio?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Los adverbios son palabras que modifican el significado de un verbo, un adjetivo u otro
          adverbio. Indican circunstancias como modo, tiempo, lugar, cantidad, afirmación, negación
          o duda.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          الظروف هي كلمات تُستخدم لتوضيح كيفية حدوث الفعل أو متى أو أين أو بدرجة معينة أو للتأكيد أو
          النفي أو الشك.
        </Text>
        <Text style={styles.subtitulo}>Tipos de adverbios / أنواع الظروف</Text>

        {/* Adverbios de modo */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17 }]}>
          Modo (Manera) / الطريقة
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>bien</Text>
          <Text style={styles.tablaCellAr}>جيدًا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>mal</Text>
          <Text style={styles.tablaCellAr}>سيئًا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>despacio</Text>
          <Text style={styles.tablaCellAr}>ببطء</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>rápido</Text>
          <Text style={styles.tablaCellAr}>بسرعة</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: Ella habla <Text style={{ color: "#79A890" }}>rápido</Text>.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: هي تتكلم <Text style={{ color: "#79A890" }}>بسرعة</Text>.
        </Text>

        {/* Adverbios de tiempo */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17, marginTop: 10 }]}>
          Tiempo / الزمن
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>hoy</Text>
          <Text style={styles.tablaCellAr}>اليوم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>ayer</Text>
          <Text style={styles.tablaCellAr}>أمس</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>mañana</Text>
          <Text style={styles.tablaCellAr}>غدًا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>siempre</Text>
          <Text style={styles.tablaCellAr}>دائمًا</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: Llegamos <Text style={{ color: "#79A890" }}>ayer</Text>.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: وصلنا <Text style={{ color: "#79A890" }}>أمس</Text>.
        </Text>

        {/* Adverbios de lugar */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17, marginTop: 10 }]}>
          Lugar / المكان
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>aquí</Text>
          <Text style={styles.tablaCellAr}>هنا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>allí</Text>
          <Text style={styles.tablaCellAr}>هناك</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>cerca</Text>
          <Text style={styles.tablaCellAr}>قريب</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>lejos</Text>
          <Text style={styles.tablaCellAr}>بعيد</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: El libro está <Text style={{ color: "#79A890" }}>aquí</Text>.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: الكتاب <Text style={{ color: "#79A890" }}>هنا</Text>.
        </Text>

        {/* Adverbios de cantidad */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17, marginTop: 10 }]}>
          Cantidad / الكمية
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>mucho</Text>
          <Text style={styles.tablaCellAr}>كثير</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>poco</Text>
          <Text style={styles.tablaCellAr}>قليل</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>bastante</Text>
          <Text style={styles.tablaCellAr}>بما فيه الكفاية</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>demasiado</Text>
          <Text style={styles.tablaCellAr}>كثير جدًا</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: Hay <Text style={{ color: "#79A890" }}>mucho</Text> trabajo.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: يوجد <Text style={{ color: "#79A890" }}>كثير</Text> من العمل.
        </Text>

        {/* Adverbios de afirmación */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17, marginTop: 10 }]}>
          Afirmación / التأكيد
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>sí</Text>
          <Text style={styles.tablaCellAr}>نعم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>también</Text>
          <Text style={styles.tablaCellAr}>أيضًا</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: ¿Vienes? <Text style={{ color: "#79A890" }}>Sí</Text>.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: هل ستأتي؟ <Text style={{ color: "#79A890" }}>نعم</Text>.
        </Text>

        {/* Adverbios de negación */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17, marginTop: 10 }]}>
          Negación / النفي
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>no</Text>
          <Text style={styles.tablaCellAr}>لا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>nunca</Text>
          <Text style={styles.tablaCellAr}>أبدًا</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: <Text style={{ color: "#79A890" }}>No</Text> entiendo.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: <Text style={{ color: "#79A890" }}>لا</Text> أفهم.
        </Text>

        {/* Adverbios de duda */}
        <Text style={[styles.tablaCell, { color: "#79A890", fontSize: 17, marginTop: 10 }]}>
          Duda / الشك
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>quizás</Text>
          <Text style={styles.tablaCellAr}>ربما</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>tal vez</Text>
          <Text style={styles.tablaCellAr}>قد</Text>
        </View>
        <Text style={styles.tablaCellEj}>
          Ejemplo: <Text style={{ color: "#79A890" }}>Quizás</Text> venga mañana.
        </Text>
        <Text style={styles.tablaCellEjAr}>
          مثال: <Text style={{ color: "#79A890" }}>ربما</Text> آتي غدًا.
        </Text>

        {/* Uso de mayúsculas y minúsculas */}
        <Text style={styles.seccion}>Uso de mayúsculas y minúsculas en español</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Alfabeto: Mayúsculas y minúsculas
        </Text>
        <Text style={{ marginBottom: 8 }}>
          A continuación, se muestra cómo se escribe cada letra en mayúscula y minúscula:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <View style={[styles.tablaRow, { backgroundColor: "#f5f5f5" }]}>
            <Text style={[styles.tablaCell, { flex: 0.5 }]}>Letra</Text>
            <Text style={[styles.tablaCell, { flex: 1 }]}>Mayúscula</Text>
            <Text style={[styles.tablaCell, { flex: 1 }]}>Minúscula</Text>
          </View>
          {[
            ["A", "a"],
            ["B", "b"],
            ["C", "c"],
            ["D", "d"],
            ["E", "e"],
            ["F", "f"],
            ["G", "g"],
            ["H", "h"],
            ["I", "i"],
            ["J", "j"],
            ["K", "k"],
            ["L", "l"],
            ["M", "m"],
            ["N", "n"],
            ["Ñ", "ñ"],
            ["O", "o"],
            ["P", "p"],
            ["Q", "q"],
            ["R", "r"],
            ["S", "s"],
            ["T", "t"],
            ["U", "u"],
            ["V", "v"],
            ["W", "w"],
            ["X", "x"],
            ["Y", "y"],
            ["Z", "z"],
          ].map(([may, min], i) => (
            <View key={may} style={styles.tablaRow}>
              <Text style={[styles.tablaCell, { flex: 0.5 }]}>{i + 1}</Text>
              <Text style={[styles.tablaCell, { flex: 1 }]}>{may}</Text>
              <Text style={[styles.tablaCell, { flex: 1 }]}>{min}</Text>
            </View>
          ))}
        </View>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          في اللغة الإسبانية، هناك شكلان لكل حرف: الحرف الكبير (mayúscula) والحرف الصغير
          (minúscula). تُستخدم الحروف الكبيرة في بداية الجمل، وفي الأسماء الخاصة، وبعض الحالات
          الأخرى حسب القواعد.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Reglas principales:
        </Text>
        <Text style={{ marginBottom: 6 }}>
          • La primera palabra de un texto y después de punto.
        </Text>
        <Text style={{ marginBottom: 6 }}>
          • Nombres propios de personas, lugares, instituciones, marcas, etc.
        </Text>
        <Text style={{ marginBottom: 6 }}>• Abreviaturas de tratamientos: Sr., Dra., Lic.</Text>
        <Text style={{ marginBottom: 6 }}>
          • Títulos de obras solo la primera palabra y nombres propios: Cien años de soledad.
        </Text>
        <Text style={{ marginBottom: 6 }}>
          • Días de la semana, meses y gentilicios van con minúscula: lunes, enero, español.
        </Text>
        <Text style={{ marginBottom: 6 }}>
          • Después de dos puntos solo si inicia una cita o un texto independiente.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos</Text>
        <Text style={{ marginBottom: 6 }}>Mañana iremos a Madrid.</Text>
        <Text style={{ marginBottom: 6 }}>El doctor Ramírez llegará el lunes.</Text>
        <Text style={{ marginBottom: 6 }}>Mi libro favorito es “Don Quijote de la Mancha”.</Text>
        <Text style={styles.subtitulo}>Errores comunes</Text>
        <Text style={{ marginBottom: 6 }}>
          Es incorrecto escribir: Vivo en España Y Hablo Español.
        </Text>
        <Text style={{ marginBottom: 16 }}>Lo correcto es: Vivo en España y hablo español.</Text>

        {/* Pronombres posesivos */}
        <Text style={styles.seccion}>Pronombres posesivos</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué son los pronombres posesivos?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Los pronombres posesivos indican a quién pertenece algo. En español cambian según el
          poseedor y el objeto (singular/plural, masculino/femenino).
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          الضمائر الملكية تُستخدم للدلالة على ملكية شيء لشخص. في الإسبانية تتغير حسب المالك والمملوك
          (مفرد/جمع، مذكر/مؤنث). في العربية غالبًا نستخدم ضمائر متصلة أو كلمات مثل: لي، لك، له، لها،
          لنا...
        </Text>
        <Text style={styles.subtitulo}>Tabla de pronombres posesivos</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mi / Mío</Text>
          <Text style={styles.tablaCellAr}>لي / خاصتي</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tu / Tuyo</Text>
          <Text style={styles.tablaCellAr}>لك / خاصتك</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Su / Suyo</Text>
          <Text style={styles.tablaCellAr}>له / لها / خاصته / خاصتها</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nuestro/a</Text>
          <Text style={styles.tablaCellAr}>لنا / خاصتنا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vuestro/a</Text>
          <Text style={styles.tablaCellAr}>لكم / خاصتكم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Su / Suyo (de ellos)</Text>
          <Text style={styles.tablaCellAr}>لهم / خاصتهم</Text>
        </View>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mi casa</Text>
          <Text style={styles.tablaCellAr}>بيتي</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tu libro</Text>
          <Text style={styles.tablaCellAr}>كتابك</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Su amigo</Text>
          <Text style={styles.tablaCellAr}>صديقه / صديقتها</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nuestra familia</Text>
          <Text style={styles.tablaCellAr}>عائلتنا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vuestros coches</Text>
          <Text style={styles.tablaCellAr}>سياراتكم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Sus hijos</Text>
          <Text style={styles.tablaCellAr}>أولادهم</Text>
        </View>

        <Text style={styles.seccion}>Artículos definidos e indefinidos</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué son los artículos?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Los artículos acompañan al sustantivo y pueden ser definidos (el, la, los, las) o
          indefinidos (un, una, unos, unas).
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          الأدوات المعرفة (el, la, los, las) تُستخدم عندما يكون الاسم معروفًا أو محددًا. الأدوات
          النكرة (un, una, unos, unas) تُستخدم عندما يكون الاسم غير محدد أو غير معروف.
        </Text>
        <Text style={styles.subtitulo}>Artículos definidos</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>el</Text>
          <Text style={styles.tablaCellAr}>الـ (مذكر مفرد)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>la</Text>
          <Text style={styles.tablaCellAr}>الـ (مؤنث مفرد)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>los</Text>
          <Text style={styles.tablaCellAr}>الـ (مذكر جمع)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>las</Text>
          <Text style={styles.tablaCellAr}>الـ (مؤنث جمع)</Text>
        </View>
        <Text style={styles.subtitulo}>Artículos indefinidos</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>un</Text>
          <Text style={styles.tablaCellAr}>اسم نكرة مذكر مفرد (بدون أداة في العربية غالبًا)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>una</Text>
          <Text style={styles.tablaCellAr}>اسم نكرة مؤنث مفرد (بدون أداة في العربية غالبًا)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>unos</Text>
          <Text style={styles.tablaCellAr}>بعض (مذكر جمع)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>unas</Text>
          <Text style={styles.tablaCellAr}>بعض (مؤنث جمع)</Text>
        </View>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>El libro</Text>
          <Text style={styles.tablaCellAr}>الكتاب</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Una casa</Text>
          <Text style={styles.tablaCellAr}>منزل (بدون أداة)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Las mesas</Text>
          <Text style={styles.tablaCellAr}>الطاولات</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Unos amigos</Text>
          <Text style={styles.tablaCellAr}>بعض الأصدقاء</Text>
        </View>

        {/* Pronombres */}
        <Text style={styles.seccion}>Pronombres personales</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Yo</Text>
          <Text style={styles.tablaCellAr}>أنا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tú</Text>
          <Text style={styles.tablaCellAr}>أنتَ/أنتِ</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Él</Text>
          <Text style={styles.tablaCellAr}>هو</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ella</Text>
          <Text style={styles.tablaCellAr}>هي</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nosotros/as</Text>
          <Text style={styles.tablaCellAr}>نحن</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vosotros/as</Text>
          <Text style={styles.tablaCellAr}>أنتم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ellos/as</Text>
          <Text style={styles.tablaCellAr}>هم</Text>
        </View>

        {/* Adverbios */}
        <Text style={styles.seccion}>Adverbios comunes</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ahora</Text>
          <Text style={styles.tablaCellAr}>الآن</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Aquí</Text>
          <Text style={styles.tablaCellAr}>هنا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Siempre</Text>
          <Text style={styles.tablaCellAr}>دائماً</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nunca</Text>
          <Text style={styles.tablaCellAr}>أبداً</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Bien</Text>
          <Text style={styles.tablaCellAr}>جيداً</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mal</Text>
          <Text style={styles.tablaCellAr}>سيئاً</Text>
        </View>

        {/* Ser y Estar */}
        <Text style={styles.seccion}>Verbos: Ser y Estar (presente)</Text>
        <Text style={styles.subtitulo}>SER</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Yo soy</Text>
          <Text style={styles.tablaCellAr}>أنا أكون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tú eres</Text>
          <Text style={styles.tablaCellAr}>أنتَ/أنتِ تكون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Él/Ella es</Text>
          <Text style={styles.tablaCellAr}>هو/هي يكون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nosotros somos</Text>
          <Text style={styles.tablaCellAr}>نحن نكون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vosotros sois</Text>
          <Text style={styles.tablaCellAr}>أنتم تكونون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ellos son</Text>
          <Text style={styles.tablaCellAr}>هم يكونون</Text>
        </View>
        <Text style={styles.subtitulo}>ESTAR</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Yo estoy</Text>
          <Text style={styles.tablaCellAr}>أنا أكون (في مكان/حالة)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tú estás</Text>
          <Text style={styles.tablaCellAr}>أنتَ/أنتِ تكون (في مكان/حالة)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Él/Ella está</Text>
          <Text style={styles.tablaCellAr}>هو/هي يكون (في مكان/حالة)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nosotros estamos</Text>
          <Text style={styles.tablaCellAr}>نحن نكون (في مكان/حالة)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vosotros estáis</Text>
          <Text style={styles.tablaCellAr}>أنتم تكونون (في مكان/حالة)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ellos están</Text>
          <Text style={styles.tablaCellAr}>هم يكونون (في مكان/حالة)</Text>
        </View>

        {/* Verbos -ar, -er, -ir */}
        <Text style={styles.seccion}>Conjugación de verbos regulares en presente</Text>
        <Text style={styles.subtitulo}>Verbos -AR (ej: hablar - يتكلم)</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Yo hablo</Text>
          <Text style={styles.tablaCellAr}>أنا أتكلم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tú hablas</Text>
          <Text style={styles.tablaCellAr}>أنتَ/أنتِ تتكلم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Él/Ella habla</Text>
          <Text style={styles.tablaCellAr}>هو/هي يتكلم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nosotros hablamos</Text>
          <Text style={styles.tablaCellAr}>نحن نتكلم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vosotros habláis</Text>
          <Text style={styles.tablaCellAr}>أنتم تتكلمون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ellos hablan</Text>
          <Text style={styles.tablaCellAr}>هم يتكلمون</Text>
        </View>
        <Text style={styles.subtitulo}>Verbos -ER (ej: comer - يأكل)</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Yo como</Text>
          <Text style={styles.tablaCellAr}>أنا آكل</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tú comes</Text>
          <Text style={styles.tablaCellAr}>أنتَ/أنتِ تأكل</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Él/Ella come</Text>
          <Text style={styles.tablaCellAr}>هو/هي يأكل</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nosotros comemos</Text>
          <Text style={styles.tablaCellAr}>نحن نأكل</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vosotros coméis</Text>
          <Text style={styles.tablaCellAr}>أنتم تأكلون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ellos comen</Text>
          <Text style={styles.tablaCellAr}>هم يأكلون</Text>
        </View>
        <Text style={styles.subtitulo}>Verbos -IR (ej: vivir - يعيش)</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Yo vivo</Text>
          <Text style={styles.tablaCellAr}>أنا أعيش</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Tú vives</Text>
          <Text style={styles.tablaCellAr}>أنتَ/أنتِ تعيش</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Él/Ella vive</Text>
          <Text style={styles.tablaCellAr}>هو/هي يعيش</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nosotros vivimos</Text>
          <Text style={styles.tablaCellAr}>نحن نعيش</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vosotros vivís</Text>
          <Text style={styles.tablaCellAr}>أنتم تعيشون</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ellos viven</Text>
          <Text style={styles.tablaCellAr}>هم يعيشون</Text>
        </View>

        {/* Concordancia de adjetivos posesivos */}
        <Text style={styles.seccion}>Concordancia de adjetivos posesivos</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Cómo concuerdan los adjetivos posesivos?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Los adjetivos posesivos (mi, tu, su, nuestro, vuestro, su) concuerdan en género y número
          con el objeto poseído.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          الصفات الملكية تتفق مع الشيء المملوك وليس مع المالك. مثال: كتابي، كتبي، سيارتنا، سياراتنا.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mi libro</Text>
          <Text style={styles.tablaCellAr}>كتابي</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mis libros</Text>
          <Text style={styles.tablaCellAr}>كتبي</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nuestra casa</Text>
          <Text style={styles.tablaCellAr}>بيتنا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Nuestras casas</Text>
          <Text style={styles.tablaCellAr}>بيوتنا</Text>
        </View>

        {/* El uso de "hay" */}
        <Text style={styles.seccion}>El uso de "hay"</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Cuándo se usa "hay"?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          "Hay" se utiliza para indicar la existencia de algo, tanto en singular como en plural.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          "hay" تُستخدم للدلالة على وجود شيء ما (مفرد أو جمع). مثال: يوجد كتاب، يوجد كتب.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Hay una tienda</Text>
          <Text style={styles.tablaCellAr}>يوجد متجر</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Hay muchas personas</Text>
          <Text style={styles.tablaCellAr}>يوجد كثير من الأشخاص</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>No hay leche</Text>
          <Text style={styles.tablaCellAr}>لا يوجد حليب</Text>
        </View>

        {/* Verbos reflexivos */}
        <Text style={styles.seccion}>Verbos reflexivos</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué son los verbos reflexivos?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Los verbos reflexivos indican que la acción recae sobre el propio sujeto. Se usan
          pronombres reflexivos: me, te, se, nos, os, se.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          الأفعال المنعكسة هي التي يعود فيها الفعل على الفاعل نفسه. مثال: أستيقظ، أغسل نفسي.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Me levanto temprano</Text>
          <Text style={styles.tablaCellAr}>أستيقظ مبكرًا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Te llamas Juan</Text>
          <Text style={styles.tablaCellAr}>اسمك خوان</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ella se ducha</Text>
          <Text style={styles.tablaCellAr}>هي تستحم</Text>
        </View>

        {/* Perífrasis verbal "ir a + infinitivo" */}
        <Text style={styles.seccion}>Perífrasis verbal: ir a + infinitivo</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Cómo expresar futuro inmediato?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Se usa "ir a" + verbo en infinitivo para hablar de acciones futuras próximas.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          للتعبير عن المستقبل القريب، نستخدم "ir a" مع الفعل في المصدر. مثال: سوف أذهب، سوف نأكل.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Voy a estudiar</Text>
          <Text style={styles.tablaCellAr}>سأدرس</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vas a viajar</Text>
          <Text style={styles.tablaCellAr}>سوف تسافر</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Vamos a comer</Text>
          <Text style={styles.tablaCellAr}>سوف نأكل</Text>
        </View>

        {/* Comparativos y superlativos */}
        <Text style={styles.seccion}>Comparativos y superlativos</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Cómo comparar cosas y personas?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Para comparar se usan "más ... que", "menos ... que", "tan ... como". Para el superlativo
          se usa "el/la más ...".
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          للمقارنة نستخدم: أكثر من، أقل من، مثل... أما التفضيل: الأكثر، الأفضل.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mi casa es más grande que la tuya</Text>
          <Text style={styles.tablaCellAr}>منزلي أكبر من منزلك</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Juan es tan alto como Pedro</Text>
          <Text style={styles.tablaCellAr}>خوان طويل مثل بيدرو</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ella es la más inteligente de la clase</Text>
          <Text style={styles.tablaCellAr}>هي الأذكى في الصف</Text>
        </View>

        {/* Preposiciones básicas */}
        <Text style={styles.seccion}>Preposiciones básicas</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué son las preposiciones?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          Las preposiciones son palabras que indican relaciones de lugar, tiempo, causa, etc.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          حروف الجر تُستخدم للدلالة على المكان أو الزمان أو السبب. مثال: في، إلى، مع، من.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>en</Text>
          <Text style={styles.tablaCellAr}>في</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>a</Text>
          <Text style={styles.tablaCellAr}>إلى</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>con</Text>
          <Text style={styles.tablaCellAr}>مع</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>de</Text>
          <Text style={styles.tablaCellAr}>من</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>por</Text>
          <Text style={styles.tablaCellAr}>بسبب</Text>
        </View>

        {/* Conjunciones más comunes */}
        <Text style={styles.seccion}>Conjunciones más comunes</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué son las conjunciones?
        </Text>
        <Text style={{ marginBottom: 8 }}>Las conjunciones unen palabras, frases u oraciones.</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          أدوات الربط تُستخدم لربط الكلمات أو الجمل. مثال: و، أو، لكن، لأن.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>y</Text>
          <Text style={styles.tablaCellAr}>و</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>o</Text>
          <Text style={styles.tablaCellAr}>أو</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>pero</Text>
          <Text style={styles.tablaCellAr}>لكن</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>porque</Text>
          <Text style={styles.tablaCellAr}>لأن</Text>
        </View>

        {/* El imperativo */}
        <Text style={styles.seccion}>El imperativo (órdenes y consejos)</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Cómo se dan órdenes o consejos?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          El imperativo se usa para dar órdenes, consejos o instrucciones. Se forma de manera
          diferente para verbos terminados en -ar, -er, -ir y varía según la persona (tú, usted,
          nosotros, vosotros, ustedes).
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          صيغة الأمر تُستخدم لإعطاء أوامر أو نصائح أو تعليمات. تختلف النهاية حسب الفاعل ونوع الفعل
          (ar, er, ir).
        </Text>
        <Text style={styles.subtitulo}>Reglas básicas</Text>
        <Text style={{ marginBottom: 8 }}>
          - Para <Text style={{ fontWeight: "bold" }}>tú</Text>: usa la raíz del verbo y cambia la
          terminación:{"\n"}-ar → -a (habla), -er → -e (come), -ir → -e (vive){"\n"}- Para{" "}
          <Text style={{ fontWeight: "bold" }}>usted</Text>: -ar → -e, -er/-ir → -a{"\n"}- Para{" "}
          <Text style={{ fontWeight: "bold" }}>vosotros/as</Text>: -ar → -ad, -er → -ed, -ir → -id
          {"\n"}- Para <Text style={{ fontWeight: "bold" }}>ustedes</Text>: -ar → -en, -er/-ir → -an
          {"\n"}- Para <Text style={{ fontWeight: "bold" }}>nosotros/as</Text>: -ar → -emos, -er →
          -amos, -ir → -amos
        </Text>
        <Text style={styles.subtitulo}>Conjugación de imperativo regular</Text>
        <Text style={{ fontWeight: "bold", color: "#79A890" }}>Verbo HABLAR (-ar)</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Habla! (tú)</Text>
          <Text style={styles.tablaCellAr}>تكلّمْ</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Hable! (usted)</Text>
          <Text style={styles.tablaCellAr}>تكلّمْ (حضرتك)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Hablemos! (nosotros)</Text>
          <Text style={styles.tablaCellAr}>لنتكلّم</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Hablad! (vosotros)</Text>
          <Text style={styles.tablaCellAr}>تكلّموا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Hablen! (ustedes)</Text>
          <Text style={styles.tablaCellAr}>تكلّموا (أنتم)</Text>
        </View>
        <Text style={{ fontWeight: "bold", color: "#79A890", marginTop: 8 }}>
          Verbo COMER (-er)
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Come! (tú)</Text>
          <Text style={styles.tablaCellAr}>كُلْ</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Coma! (usted)</Text>
          <Text style={styles.tablaCellAr}>كُلْ (حضرتك)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Comamos! (nosotros)</Text>
          <Text style={styles.tablaCellAr}>لنأكل</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Comed! (vosotros)</Text>
          <Text style={styles.tablaCellAr}>كلوا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Coman! (ustedes)</Text>
          <Text style={styles.tablaCellAr}>كلوا (أنتم)</Text>
        </View>
        <Text style={{ fontWeight: "bold", color: "#79A890", marginTop: 8 }}>
          Verbo VIVIR (-ir)
        </Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Vive! (tú)</Text>
          <Text style={styles.tablaCellAr}>عِشْ</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Viva! (usted)</Text>
          <Text style={styles.tablaCellAr}>عِشْ (حضرتك)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Vivamos! (nosotros)</Text>
          <Text style={styles.tablaCellAr}>لنَعِشْ</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Vivid! (vosotros)</Text>
          <Text style={styles.tablaCellAr}>عيشوا</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Vivan! (ustedes)</Text>
          <Text style={styles.tablaCellAr}>عيشوا (أنتم)</Text>
        </View>
        <Text style={styles.subtitulo}>Muchos ejemplos / أمثلة كثيرة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Abre la puerta!</Text>
          <Text style={styles.tablaCellAr}>افتح الباب!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Escribe tu nombre!</Text>
          <Text style={styles.tablaCellAr}>اكتب اسمك!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Escucha la música!</Text>
          <Text style={styles.tablaCellAr}>استمع إلى الموسيقى!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡No corras!</Text>
          <Text style={styles.tablaCellAr}>لا تركض!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Dime la verdad!</Text>
          <Text style={styles.tablaCellAr}>قل لي الحقيقة!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Lávate las manos!</Text>
          <Text style={styles.tablaCellAr}>اغسل يديك!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡No hables tan alto!</Text>
          <Text style={styles.tablaCellAr}>لا تتكلم بصوت عالٍ!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Ten cuidado!</Text>
          <Text style={styles.tablaCellAr}>كن حذراً!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Venga usted mañana!</Text>
          <Text style={styles.tablaCellAr}>تعال غداً (حضرتك)</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡Salid de la clase!</Text>
          <Text style={styles.tablaCellAr}>اخرجوا من الصف!</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¡No lo hagas!</Text>
          <Text style={styles.tablaCellAr}>لا تفعل ذلك!</Text>
        </View>

        {/* El gerundio */}
        <Text style={styles.seccion}>El gerundio</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Qué es el gerundio?
        </Text>
        <Text style={{ marginBottom: 8 }}>
          El gerundio expresa una acción en desarrollo o simultánea a otra. Se forma añadiendo{" "}
          <Text style={{ fontWeight: "bold" }}>-ando</Text> (verbos -ar) o{" "}
          <Text style={{ fontWeight: "bold" }}>-iendo</Text> (verbos -er, -ir) a la raíz del verbo.
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          المصدر المستمر يُستخدم للدلالة على حدث جارٍ أو متزامن مع حدث آخر. تتم إضافة -ando لأفعال
          ar و-iendo لأفعال er/ir.
        </Text>
        <Text style={styles.subtitulo}>Reglas y conjugación</Text>
        <Text style={{ marginBottom: 8 }}>
          - <Text style={{ fontWeight: "bold" }}>-ar</Text> → -ando (hablar → hablando) -{" "}
          <Text style={{ fontWeight: "bold" }}>-er</Text> → -iendo (comer → comiendo) -{" "}
          <Text style={{ fontWeight: "bold" }}>-ir</Text> → -iendo (vivir → viviendo)
        </Text>
        <Text style={styles.subtitulo}>Ejemplos de conjugación</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>hablar → hablando</Text>
          <Text style={styles.tablaCellAr}>يتكلم → يتكلم الآن</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>comer → comiendo</Text>
          <Text style={styles.tablaCellAr}>يأكل → يأكل الآن</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>vivir → viviendo</Text>
          <Text style={styles.tablaCellAr}>يعيش → يعيش الآن</Text>
        </View>
        <Text style={styles.subtitulo}>Muchos ejemplos / أمثلة كثيرة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Estoy leyendo un libro.</Text>
          <Text style={styles.tablaCellAr}>أنا أقرأ كتاباً الآن.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Estamos trabajando.</Text>
          <Text style={styles.tablaCellAr}>نحن نعمل الآن.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>¿Qué estás haciendo?</Text>
          <Text style={styles.tablaCellAr}>ماذا تفعل الآن؟</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Los niños están jugando.</Text>
          <Text style={styles.tablaCellAr}>الأطفال يلعبون الآن.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Sigo aprendiendo español.</Text>
          <Text style={styles.tablaCellAr}>ما زلت أتعلم الإسبانية.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Voy caminando a casa.</Text>
          <Text style={styles.tablaCellAr}>أذهب إلى المنزل مشياً.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Está lloviendo.</Text>
          <Text style={styles.tablaCellAr}>إنها تمطر الآن.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Estamos escuchando música.</Text>
          <Text style={styles.tablaCellAr}>نحن نستمع إلى الموسيقى الآن.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Ella está escribiendo una carta.</Text>
          <Text style={styles.tablaCellAr}>هي تكتب رسالة الآن.</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Voy aprendiendo poco a poco.</Text>
          <Text style={styles.tablaCellAr}>أتعلم شيئاً فشيئاً.</Text>
        </View>

        {/* Futuro simple */}
        <Text style={styles.seccion}>Futuro simple</Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ¿Cómo hablar del futuro?
        </Text>
        <Text style={{ marginBottom: 8 }}></Text>
        <Text
          style={{
            marginBottom: 8,
            color: "#79A890",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          شرح بالعربية:
        </Text>
        <Text
          style={{
            marginBottom: 8,
            writingDirection: "rtl",
            textAlign: "right",
            color: "#333",
          }}
        >
          المستقبل البسيط يُستخدم للتعبير عن أحداث ستقع لاحقًا. مثال: سأذهب، سوف تدرس.
        </Text>
        <Text style={styles.subtitulo}>Ejemplos / أمثلة</Text>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Mañana viajaré a Madrid</Text>
          <Text style={styles.tablaCellAr}>غدًا سأسافر إلى مدريد</Text>
        </View>
        <View style={styles.tablaRow}>
          <Text style={styles.tablaCell}>Estudiarás español</Text>
          <Text style={styles.tablaCellAr}>سوف تدرس الإسبانية</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default GramaticaScreen;

// Estilos para la pantalla de gramática
const styles = StyleSheet.create({
  volverBtn: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
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
  tablaCellEj: {
    fontSize: 15,
    color: "#333",
    marginLeft: 8,
    marginBottom: 2,
    fontStyle: "italic",
  },
  tablaCellEjAr: {
    fontSize: 15,
    color: "#79A890",
    marginRight: 8,
    marginBottom: 8,
    fontStyle: "italic",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
  temasContainer: {
    marginBottom: 28,
    padding: 10,
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    alignItems: "center",
  },
  temasTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  temasBotonesRow: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 12,
  },
  temasBoton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    color: "#FFD700",
    fontWeight: "bold",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    fontSize: 17,
    marginHorizontal: 6,
    overflow: "hidden",
    textAlign: "center",
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
    marginBottom: 24,
    textAlign: "center",
  },
  seccion: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginBottom: 4,
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
    color: "#79A890",
    flex: 1,
    fontWeight: "bold",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
});
