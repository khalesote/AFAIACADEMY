import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import AudioButton from '../../../components/AudioButton';
import { useUserProgress } from '@/contexts/UserProgressContext';

export default function Unidad4() {
  const router = useRouter();
  const { progress: userProgress, markUnitCompleted } = useUserProgress();
  const levelProgress = userProgress.A1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[3] ?? false;
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState<{correct: number; total: number}>({ correct: 0, total: 0 });

  useEffect(() => {
    setSaved(alreadyCompleted);
  }, [alreadyCompleted]);

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A1', 3);
      setSaved(true);
      
      // Mostrar alerta con opción de ir a Unidad 5
      Alert.alert(
        '¡Unidad 4 completada! 🎉',
        'La Unidad 5 ha sido desbloqueada.\nتم فتح الوحدة 5.',
        [
          {
            text: 'Ir a Unidad 5',
            onPress: () => router.replace('/(tabs)/A1_Acceso')
          },
          {
            text: 'Quedarme aquí',
            style: 'cancel'
          }
        ]
      );
    } else {
      Alert.alert(
        'Unidad 4 ya completada',
        'Ya has completado esta unidad.\nلقد أكملت هذه الوحدة بالفعل.',
        [
          {
            text: 'Ir a Unidad 5',
            onPress: () => router.replace('/(tabs)/A1_Acceso')
          },
          {
            text: 'Quedarme aquí',
            style: 'cancel'
          }
        ]
      );
    }
  };
  
  const ejercicios = [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué te gusta hacer en tu tiempo libre? (ماذا تحب أن تفعل في وقت فراغك؟)",
      opciones: ["Me gusta leer y escuchar música", "Tengo 30 años", "Vivo en Barcelona", "Soy estudiante"],
      respuestaCorrecta: 0,
      explicacion: "'Me gusta' se usa para expresar preferencias y gustos",
      explicacionAr: "'أحب' تُستخدم للتعبير عن التفضيلات والأذواق"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuál es tu comida favorita? (ما هو طعامك المفضل؟)",
      opciones: ["Me gusta la paella y el cuscús", "Tengo dos hermanos", "Soy de Marruecos", "Estoy casado"],
      respuestaCorrecta: 0,
      explicacion: "La pregunta pide información sobre comida, no sobre familia o estado civil",
      explicacionAr: "السؤال يطلب معلومات عن الطعام، وليس عن العائلة أو الحالة الاجتماعية"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los pasatiempos en árabe con su traducción al español",
      pares: [
        {"izquierda": "القراءة", "derecha": "Leer"},
        {"izquierda": "السباحة", "derecha": "Nadar"},
        {"izquierda": "الطبخ", "derecha": "Cocinar"},
        {"izquierda": "الرسم", "derecha": "Dibujar"},
        {"izquierda": "اللعب", "derecha": "Jugar"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las comidas en árabe con su traducción al español",
      pares: [
        {"izquierda": "الغداء", "derecha": "Comida"},
        {"izquierda": "العشاء", "derecha": "Cena"},
        {"izquierda": "الفطور", "derecha": "Desayuno"},
        {"izquierda": "السلطة", "derecha": "Ensalada"},
        {"izquierda": "الفاكهة", "derecha": "Fruta"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cómo se dice 'me gusta' en árabe?",
      opciones: ["أحب", "أريد", "أحتاج", "أعرف"],
      respuestaCorrecta: 0,
      explicacion: "'Me gusta' significa 'أحب' en árabe, se usa para expresar preferencias",
      explicacionAr: "'Me gusta' تعني 'أحب' بالعربية، وتُستخدم للتعبير عن التفضيلات"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
          onPress={() => router.replace('/(tabs)/A1_Acceso')}
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="happy" size={50} color="#79A890" />
          <View style={styles.titleWithAudio}>
            <Text style={styles.title}>Unidad 4: Tiempo Libre y Comidas</Text>
            <AudioButton 
              text="Unidad 4: Tiempo Libre y Comidas" 
              size="medium"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.titleAr}>الوحدة 4: وقت الفراغ والوجبات</Text>
          <View style={styles.titleWithAudio}>
            <Text style={styles.subtitle}>Aprende a hablar sobre tus pasatiempos y comidas favoritas</Text>
            <AudioButton 
              text="Aprende a hablar sobre tus pasatiempos y comidas favoritas" 
              size="small"
              showText={false}
              color="#4CAF50"
            />
          </View>
          <Text style={styles.subtitleAr}>تعلم التحدث عن هواياتك وأطعمتك المفضلة</Text>
        </View>
      </View>

      {/* Contenido Principal */}
      <View style={styles.content}>
        {/* Gramática Básica */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Gramática Básica</Text>
            <AudioButton 
              text="Gramática Básica" 
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>قواعد أساسية</Text>
          
          <View style={styles.grammarContainer}>
            {/* Me gusta / No me gusta */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>1. Expresar gustos</Text>
              <Text style={styles.grammarTitleAr}>التعبير عن الأذواق</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Me gusta la música</Text>
                <AudioButton 
                  text="Me gusta la música" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"أحب الموسيقى"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>❌ No me gusta cocinar</Text>
                <AudioButton 
                  text="No me gusta cocinar" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لا أحب الطبخ"}</Text>
            </View>

            {/* Plural */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>2. Me gustan (plural)</Text>
              <Text style={styles.grammarTitleAr}>الجمع</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Me gustan los deportes</Text>
                <AudioButton 
                  text="Me gustan los deportes" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"أحب الرياضة"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Me gustan las frutas</Text>
                <AudioButton 
                  text="Me gustan las frutas" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"أحب الفواكه"}</Text>
            </View>

            {/* Artículos */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>3. Artículos (el, la, los, las)</Text>
              <Text style={styles.grammarTitleAr}>أدوات التعريف</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>🔵 EL libro (masculino singular)</Text>
                <AudioButton 
                  text="EL libro" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"الكتاب (مذكر مفرد)"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>🔴 LA comida (femenino singular)</Text>
                <AudioButton 
                  text="LA comida" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"الطعام (مؤنث مفرد)"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>🔵 LOS deportes (masculino plural)</Text>
                <AudioButton 
                  text="LOS deportes" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"الرياضة (مذكر جمع)"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>🔴 LAS frutas (femenino plural)</Text>
                <AudioButton 
                  text="LAS frutas" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"الفواكه (مؤنث جمع)"}</Text>
            </View>

            {/* Artículos indefinidos */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>4. Artículos indefinidos (un, una, unos, unas)</Text>
              <Text style={styles.grammarTitleAr}>أدوات النكرة</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Quiero una ensalada</Text>
                <AudioButton text="Quiero una ensalada" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أريد سلطة</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Compré unas frutas</Text>
                <AudioButton text="Compré unas frutas" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>اشتريت بعض الفواكه</Text>
            </View>

            {/* Concordancia con gustar */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>5. Concordancia con "gustar"</Text>
              <Text style={styles.grammarTitleAr}>اتفاق الفعل مع الشيء المحبوب</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Me gusta la paella (singular)</Text>
                <AudioButton text="Me gusta la paella" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أحب الباييّا (مفرد)</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Me gustan las películas (plural)</Text>
                <AudioButton text="Me gustan las películas" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أحب الأفلام (جمع)</Text>
            </View>

            {/* Comidas: con y sin artículo */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>6. Comidas: con y sin artículo</Text>
              <Text style={styles.grammarTitleAr}>الوجبات: مع الأداة وبدونها</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Desayuno café (general)</Text>
                <AudioButton text="Desayuno café" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أتناول القهوة في الإفطار (بشكل عام)</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ La cena está lista (específico)</Text>
                <AudioButton text="La cena está lista" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>العشاء جاهز (محدد)</Text>
            </View>

            {/* Contracciones al / del */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>7. Contracciones: a + el = al / de + el = del</Text>
              <Text style={styles.grammarTitleAr}>الدمج: إلى + الـ = إلى الـ (al) / من + الـ = من الـ (del)</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Voy al gimnasio</Text>
                <AudioButton text="Voy al gimnasio" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أذهب إلى النادي الرياضي</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Vengo del mercado</Text>
                <AudioButton text="Vengo del mercado" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>آتي من السوق</Text>
            </View>

            {/* Nota profesiones */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>8. Nota: profesiones (sin artículo)</Text>
              <Text style={styles.grammarTitleAr}>ملاحظة: المهن (بدون أداة)</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Soy estudiante</Text>
                <AudioButton text="Soy estudiante" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أنا طالب</Text>

              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>✅ Soy un estudiante aplicado (con adjetivo)</Text>
                <AudioButton text="Soy un estudiante aplicado" size="small" showText={false} color="#4CAF50" />
              </View>
              <Text style={styles.grammarTextAr}>أنا طالب مجتهد</Text>
            </View>
          </View>
        </View>

        {/* Vocabulario Clave */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Vocabulario Clave</Text>
            <AudioButton 
              text="Vocabulario Clave" 
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>المفردات الأساسية</Text>
          
          <View style={styles.vocabularyGrid}>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Me gusta</Text>
                <AudioButton 
                  text="Me gusta" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>أحب</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Leer</Text>
                <AudioButton 
                  text="Leer" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>قراءة</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Nadar</Text>
                <AudioButton 
                  text="Nadar" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>سباحة</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Cocinar</Text>
                <AudioButton 
                  text="Cocinar" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>طبخ</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Dibujar</Text>
                <AudioButton 
                  text="Dibujar" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>رسم</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Jugar</Text>
                <AudioButton 
                  text="Jugar" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>لعب</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Comida</Text>
                <AudioButton 
                  text="Comida" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>طعام</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Desayuno</Text>
                <AudioButton 
                  text="Desayuno" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>فطور</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Cena</Text>
                <AudioButton 
                  text="Cena" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>عشاء</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Ensalada</Text>
                <AudioButton 
                  text="Ensalada" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>سلطة</Text>
            </View>
          </View>
        </View>

        {/* Ejemplo de Diálogo */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Ejemplo de Diálogo</Text>
            <AudioButton 
              text="Ejemplo de Diálogo" 
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>مثال على حوار</Text>
          
          {/* Audio para todo el diálogo */}
          <View style={styles.contentWithAudio}>
            <Text style={styles.dialogTitle}>Conversación completa:</Text>
            <AudioButton 
              text="¿Qué te gusta hacer en tu tiempo libre? Me gusta leer y escuchar música. ¿Y qué comida te gusta más? Me encanta la comida argelina y la paella. ¡Qué interesante! ¿Te gusta cocinar? Sí, me gusta mucho cocinar platos tradicionales." 
              size="medium"
              showText={false}
              color="#79A890"
            />
          </View>
          
          <View style={styles.dialogContainer}>
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>María:</Text>
                <Text style={styles.dialogText}>¿Qué te gusta hacer en tu tiempo libre?</Text>
                <AudioButton 
                  text="¿Qué te gusta hacer en tu tiempo libre?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"ماذا تحب أن تفعل في وقت فراغك؟"}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ahmed:</Text>
                <Text style={styles.dialogText}>Me gusta leer y escuchar música.</Text>
                <AudioButton 
                  text="Me gusta leer y escuchar música." 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"أحب القراءة والاستماع إلى الموسيقى."}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>María:</Text>
                <Text style={styles.dialogText}>¿Y qué comida te gusta más?</Text>
                <AudioButton 
                  text="¿Y qué comida te gusta más?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"وما هو الطعام الذي تحبه أكثر؟"}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ahmed:</Text>
                <Text style={styles.dialogText}>Me encanta la comida argelina y la paella.</Text>
                <AudioButton 
                  text="Me encanta la comida argelina y la paella." 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"أعشق الطعام الجزائري والباييا."}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>María:</Text>
                <Text style={styles.dialogText}>¡Qué interesante! ¿Te gusta cocinar?</Text>
                <AudioButton 
                  text="¡Qué interesante! ¿Te gusta cocinar?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"كم هذا مثير للاهتمام! هل تحب الطبخ؟"}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ahmed:</Text>
                <Text style={styles.dialogText}>Sí, me gusta mucho cocinar platos tradicionales.</Text>
                <AudioButton 
                  text="Sí, me gusta mucho cocinar platos tradicionales." 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"نعم، أحب كثيراً طبخ الأطباق التقليدية."}</Text>
            </View>
          </View>
        </View>

        {/* Frases Útiles sobre Tiempo Libre y Comidas */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Frases Útiles sobre Tiempo Libre y Comidas</Text>
            <AudioButton 
              text="Frases Útiles sobre Tiempo Libre y Comidas" 
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>عبارات مفيدة حول وقت الفراغ والطعام</Text>
          
          <View style={styles.phrasesContainer}>
            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>¿Qué te gusta hacer?</Text>
                <AudioButton 
                  text="¿Qué te gusta hacer?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"ماذا تحب أن تفعل؟"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Me gusta mucho...</Text>
                <AudioButton 
                  text="Me gusta mucho" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"أحب كثيراً..."}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>No me gusta nada...</Text>
                <AudioButton 
                  text="No me gusta nada" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"لا أحب إطلاقاً..."}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>En mi tiempo libre...</Text>
                <AudioButton 
                  text="En mi tiempo libre" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"في وقت فراغي..."}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>¿Cuál es tu comida favorita?</Text>
                <AudioButton 
                  text="¿Cuál es tu comida favorita?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"ما هو طعامك المفضل؟"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Mi comida favorita es...</Text>
                <AudioButton 
                  text="Mi comida favorita es" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"طعامي المفضل هو..."}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>¿Te gusta cocinar?</Text>
                <AudioButton 
                  text="¿Te gusta cocinar?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"هل تحب الطبخ؟"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Sí, me encanta cocinar</Text>
                <AudioButton 
                  text="Sí, me encanta cocinar" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"نعم، أعشق الطبخ"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>¿Qué desayunas normalmente?</Text>
                <AudioButton 
                  text="¿Qué desayunas normalmente?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"ماذا تتناول عادة في الإفطار؟"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Para cenar prefiero...</Text>
                <AudioButton 
                  text="Para cenar prefiero" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"للعشاء أفضل..."}</Text>
            </View>
          </View>
        </View>

        {/* Ejercicios Interactivos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejercicios Interactivos</Text>
          <Text style={styles.sectionTitleAr}>تمارين تفاعلية</Text>
            <EjerciciosInteractivos
            ejercicios={ejercicios}
            onComplete={handleFinish}
            onProgressChange={(p) => setProgress(p)}
          />
        </View>

        <View style={styles.finishContainer}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Unidad finalizada</Text>
            <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  titleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleAr: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTextAr: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  vocabularyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  vocabItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    minWidth: '48%',
    alignItems: 'center',
  },
  vocabSpanish: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 4,
  },
  vocabArabic: {
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
  },
  dialogContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  dialogLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dialogPerson: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginRight: 8,
    minWidth: 60,
  },
  dialogText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
    marginRight: 12,
  },
  titleWithAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  grammarContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  grammarItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
  },
  grammarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 4,
  },
  grammarTitleAr: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 12,
  },
  grammarExample: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f8f0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  grammarText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  grammarTextAr: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  vocabAudioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  contentWithAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f8f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  dialogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    flex: 1,
  },
  dialogLineWithTranslation: {
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dialogTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 8,
    paddingRight: 8,
  },
  dialogTranslationLine: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 8,
    backgroundColor: '#e8f5e8',
    padding: 8,
    borderRadius: 4,
  },
  finishButton: {
    backgroundColor: '#79A890',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  finishContainer: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: 'center',
  },
  phrasesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  phraseItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  phraseSpanish: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  phraseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  phraseArabic: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
    backgroundColor: '#e8f5e8',
    padding: 8,
    borderRadius: 4,
  },
});
