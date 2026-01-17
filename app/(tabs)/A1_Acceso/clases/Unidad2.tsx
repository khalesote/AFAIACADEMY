import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import AudioButton from '../../../components/AudioButton';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Unidad2() {
  const router = useRouter();
  const { progress: userProgress, markUnitCompleted } = useUserProgress();
  const levelProgress = userProgress.A1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[1] ?? false;
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState<{correct: number; total: number}>({ correct: 0, total: 0 });

  useEffect(() => {
    setSaved(alreadyCompleted);
  }, [alreadyCompleted]);

  const handleFinish = async () => {
    if (!alreadyCompleted) {
      await markUnitCompleted('A1', 1);
      setSaved(true);
      
      // Mostrar alerta con opción de ir a Unidad 3
      Alert.alert(
        '¡Unidad 2 completada! 🎉',
        'La Unidad 3 ha sido desbloqueada.\nتم فتح الوحدة 3.',
        [
          {
            text: 'Ir a Unidad 3',
            onPress: () => router.replace('/A1_Acceso/clases/Unidad3')
          },
          {
            text: 'Quedarme aquí',
            style: 'cancel'
          }
        ]
      );
    } else {
      Alert.alert(
        'Unidad 2 ya completada',
        'Ya has completado esta unidad.\nلقد أكملت هذه الوحدة بالفعل.',
        [
          {
            text: 'Ir a Unidad 3',
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
      pregunta: "¿Cómo se dice 'familia' en árabe?",
      opciones: ["عائلة", "أب", "أم", "أخ"],
      respuestaCorrecta: 0,
      explicacion: "'Familia' significa 'عائلة' en árabe",
      explicacionAr: "'Familia' تعني 'عائلة' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Quién es el padre de tu padre? (من هو والد والدك؟)",
      opciones: ["Tu hermano", "Tu abuelo", "Tu tío", "Tu primo"],
      respuestaCorrecta: 1,
      explicacion: "El padre de tu padre es tu abuelo paterno",
      explicacionAr: "والد والدك هو جدك لأبيك"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los miembros de la familia en español con su traducción en árabe",
      pares: [
        {"izquierda": "Padre", "derecha": "أب"},
        {"izquierda": "Madre", "derecha": "أم"},
        {"izquierda": "Hermano", "derecha": "أخ"},
        {"izquierda": "Hermana", "derecha": "أخت"},
        {"izquierda": "Hijo", "derecha": "ابن"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los números de familia con su escritura",
      pares: [
        {"izquierda": "Tengo un hijo", "derecha": "عندي ابن واحد"},
        {"izquierda": "Tengo dos hermanos", "derecha": "عندي أخوان"},
        {"izquierda": "Tengo tres tías", "derecha": "عندي ثلاث عمات"},
        {"izquierda": "Tengo cuatro primos", "derecha": "عندي أربعة أبناء عم"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuál es el plural de 'hermano'?",
      opciones: ["Hermanas", "Hermanos", "Hijos", "Padres"],
      respuestaCorrecta: 1,
      explicacion: "El plural de 'hermano' es 'hermanos'",
      explicacionAr: "جمع 'أخ' هو 'أخوان' أو 'إخوة'"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'padre' en árabe?",
      opciones: ["أب", "أم", "أخ", "أخت"],
      respuestaCorrecta: 0,
      explicacion: "'Padre' significa 'أب' en árabe",
      explicacionAr: "'أب' تعني 'padre' بالعربية"
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
          <Ionicons name="people" size={50} color="#79A890" />
          <Text style={styles.title}>Unidad 2: Mi Familia</Text>
          <Text style={styles.titleAr}>الوحدة 2: عائلتي</Text>
          <Text style={styles.subtitle}>Aprende a hablar sobre tu familia en español</Text>
          <Text style={styles.subtitleAr}>تعلم التحدث عن عائلتك بالإسبانية</Text>
        </View>
      </View>

      {/* Contenido Principal */}
      <View style={styles.content}>
        {/* Frases útiles sobre la familia */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Frases Útiles sobre la Familia</Text>
            <AudioButton 
              text="Frases Útiles sobre la Familia" 
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>عبارات مفيدة عن العائلة</Text>
          
          <View style={styles.phrasesContainer}>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Tengo una familia grande</Text>
              <Text style={styles.phraseArabic}>{"عندي عائلة كبيرة"}</Text>
              <AudioButton 
                text="Tengo una familia grande" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Tengo una familia pequeña</Text>
              <Text style={styles.phraseArabic}>{"عندي عائلة صغيرة"}</Text>
              <AudioButton 
                text="Tengo una familia pequeña" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Vivo con mis padres</Text>
              <Text style={styles.phraseArabic}>{"أعيش مع والدي"}</Text>
              <AudioButton 
                text="Vivo con mis padres" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Mi hermana es mayor</Text>
              <Text style={styles.phraseArabic}>{"أختي أكبر"}</Text>
              <AudioButton 
                text="Mi hermana es mayor" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Mi hermano es menor</Text>
              <Text style={styles.phraseArabic}>{"أخي أصغر"}</Text>
              <AudioButton 
                text="Mi hermano es menor" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Quiero mucho a mi familia</Text>
              <Text style={styles.phraseArabic}>{"أحب عائلتي كثيراً"}</Text>
              <AudioButton 
                text="Quiero mucho a mi familia" 
                size="small"
                showText={false}
                color="#79A890"
              />
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
              <Text style={styles.vocabSpanish}>Familia</Text>
              <Text style={styles.vocabArabic}>عائلة</Text>
              <AudioButton 
                text="Familia" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Padre</Text>
              <Text style={styles.vocabArabic}>أب</Text>
              <AudioButton 
                text="Padre" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Madre</Text>
              <Text style={styles.vocabArabic}>أم</Text>
              <AudioButton 
                text="Madre" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Hermano</Text>
              <Text style={styles.vocabArabic}>أخ</Text>
              <AudioButton 
                text="Hermano" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Hermana</Text>
              <Text style={styles.vocabArabic}>أخت</Text>
              <AudioButton 
                text="Hermana" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Hijo</Text>
              <Text style={styles.vocabArabic}>ابن</Text>
              <AudioButton 
                text="Hijo" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Hija</Text>
              <Text style={styles.vocabArabic}>ابنة</Text>
              <AudioButton 
                text="Hija" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Abuelo</Text>
              <Text style={styles.vocabArabic}>جد</Text>
              <AudioButton 
                text="Abuelo" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Abuela</Text>
              <Text style={styles.vocabArabic}>جدة</Text>
              <AudioButton 
                text="Abuela" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Tío</Text>
              <Text style={styles.vocabArabic}>عم/خال</Text>
              <AudioButton 
                text="Tío" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Tía</Text>
              <Text style={styles.vocabArabic}>عمة/خالة</Text>
              <AudioButton 
                text="Tía" 
                size="small"
                showText={false}
                color="#79A890"
              />
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Primo</Text>
              <Text style={styles.vocabArabic}>ابن عم/خال</Text>
              <AudioButton 
                text="Primo" 
                size="small"
                showText={false}
                color="#79A890"
              />
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
          
          <View style={styles.contentWithAudio}>
            <AudioButton 
              text="¿Tienes familia en España? Sí, tengo un hermano que vive en Madrid. ¿Y tus padres? ¿Dónde viven? Mis padres viven en Argelia con mi hermana. ¿Los visitas a menudo? Sí, los visito dos veces al año."
              size="medium"
              color="#79A890"
            />
          </View>
          
          <View style={styles.dialogContainer}>
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ana:</Text>
                <Text style={styles.dialogText}>¿Tienes familia en España?</Text>
                <AudioButton 
                  text="¿Tienes familia en España?" 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>آنا: هل لديك عائلة في إسبانيا؟</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Karim:</Text>
                <Text style={styles.dialogText}>Sí, tengo un hermano que vive en Madrid.</Text>
                <AudioButton 
                  text="Sí, tengo un hermano que vive en Madrid." 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>كريم: نعم، عندي أخ يعيش في مدريد.</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ana:</Text>
                <Text style={styles.dialogText}>¿Y tus padres? ¿Dónde viven?</Text>
                <AudioButton 
                  text="¿Y tus padres? ¿Dónde viven?" 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>آنا: ووالداك؟ أين يعيشان؟</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Karim:</Text>
                <Text style={styles.dialogText}>Mis padres viven en Argelia con mi hermana.</Text>
                <AudioButton 
                  text="Mis padres viven en Argelia con mi hermana." 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>كريم: والداي يعيشان في الجزائر مع أختي.</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ana:</Text>
                <Text style={styles.dialogText}>¿Los visitas a menudo?</Text>
                <AudioButton 
                  text="¿Los visitas a menudo?" 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>آنا: هل تزورهم كثيراً؟</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Karim:</Text>
                <Text style={styles.dialogText}>Sí, los visito dos veces al año.</Text>
                <AudioButton 
                  text="Sí, los visito dos veces al año." 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>كريم: نعم، أزورهم مرتين في السنة.</Text>
            </View>
          </View>
        </View>

        {/* Ejemplo de Diálogo 2 */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Ejemplo de Diálogo 2</Text>
            <AudioButton 
              text="¿Cuántos hermanos tienes? Tengo dos hermanos y una hermana. ¿Viven contigo? Uno vive conmigo y los otros viven con mis padres. ¿Os visitáis a menudo? Sí, nos vemos los fines de semana."
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>مثال على حوار 2</Text>

          <View style={styles.contentWithAudio}>
            <AudioButton 
              text="¿Cuántos hermanos tienes? Tengo dos hermanos y una hermana. ¿Viven contigo? Uno vive conmigo y los otros viven con mis padres. ¿Os visitáis a menudo? Sí, nos vemos los fines de semana."
              size="medium"
              color="#79A890"
            />
          </View>

          <View style={styles.dialogContainer}>
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Sofía:</Text>
                <Text style={styles.dialogText}>¿Cuántos hermanos tienes?</Text>
                <AudioButton 
                  text="¿Cuántos hermanos tienes?" 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>صوفيا: كم لديك من الإخوة؟</Text>
            </View>

            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Yousef:</Text>
                <Text style={styles.dialogText}>Tengo dos hermanos y una hermana.</Text>
                <AudioButton 
                  text="Tengo dos hermanos y una hermana." 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>يوسف: لديّ أخوان وأخت واحدة.</Text>
            </View>

            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Sofía:</Text>
                <Text style={styles.dialogText}>¿Viven contigo?</Text>
                <AudioButton 
                  text="¿Viven contigo?" 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>صوفيا: هل يعيشون معك؟</Text>
            </View>

            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Yousef:</Text>
                <Text style={styles.dialogText}>Uno vive conmigo y los otros viven con mis padres.</Text>
                <AudioButton 
                  text="Uno vive conmigo y los otros viven con mis padres." 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>يوسف: واحد يعيش معي والآخرون يعيشون مع والديّ.</Text>
            </View>

            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Sofía:</Text>
                <Text style={styles.dialogText}>¿Os visitáis a menudo?</Text>
                <AudioButton 
                  text="¿Os visitáis a menudo?" 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>صوفيا: هل تزورون بعضكم البعض كثيرًا؟</Text>
            </View>

            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Yousef:</Text>
                <Text style={styles.dialogText}>Sí, nos vemos los fines de semana.</Text>
                <AudioButton 
                  text="Sí, nos vemos los fines de semana." 
                  size="small"
                  showText={false}
                  color="#79A890"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>يوسف: نعم، نلتقي في عطلة نهاية الأسبوع.</Text>
            </View>
          </View>
        </View>

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
            {/* Verbo tener */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>1. El verbo 'tener'</Text>
              <Text style={styles.grammarTitleAr}>الفعل 'tener'</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Tengo dos hermanos</Text>
                <AudioButton 
                  text="Tengo dos hermanos" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لدي أخوان"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Tengo una hermana</Text>
                <AudioButton 
                  text="Tengo una hermana" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لدي أخت"}</Text>
            </View>

            {/* Adjetivos */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>2. Adjetivos para describir personas</Text>
              <Text style={styles.grammarTitleAr}>الصفات لوصف الأشخاص</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>simpático, trabajador, alto, bajo</Text>
                <AudioButton 
                  text="simpático, trabajador" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لطيف، مجتهد، طويل، قصير"}</Text>
            </View>

            {/* Posesivos */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>3. Posesivos</Text>
              <Text style={styles.grammarTitleAr}>ضمائر الملكية</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>mi, tu, su - mi familia, tu hermano</Text>
                <AudioButton 
                  text="mi familia" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لي، لك، له - عائلتي، أخوك"}</Text>
            </View>
          </View>
        </View>

        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Ejemplos escritos</Text>
            <AudioButton text="Ejemplos escritos" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTitleAr}>أمثلة مكتوبة</Text>

          <View style={styles.phrasesContainer}>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Tengo una familia grande</Text>
              <AudioButton text="Tengo una familia grande" size="small" showText={false} color="#79A890" />
              <Text style={styles.phraseArabic}>عندي عائلة كبيرة</Text>
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Vivo con mis padres</Text>
              <AudioButton text="Vivo con mis padres" size="small" showText={false} color="#79A890" />
              <Text style={styles.phraseArabic}>أعيش مع والديّ</Text>
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Mi hermana es mayor</Text>
              <AudioButton text="Mi hermana es mayor" size="small" showText={false} color="#79A890" />
              <Text style={styles.phraseArabic}>أختي أكبر</Text>
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Mi hermano es menor</Text>
              <AudioButton text="Mi hermano es menor" size="small" showText={false} color="#79A890" />
              <Text style={styles.phraseArabic}>أخي أصغر</Text>
            </View>
          </View>
        </View>

        {/* Ejercicios Interactivos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejercicios Interactivos</Text>
          <Text style={styles.sectionTitleAr}>تمارين تفاعلية</Text>
          {/* Barra de progreso */}
          {(
            () => {
              const pct = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
              const fillColor = pct < 34 ? '#e53935' : pct < 67 ? '#fb8c00' : '#79A890';
              return (
                <View style={styles.progressContainer}>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: fillColor }]} />
                  </View>
                  <Text style={styles.progressLabel}>{pct}%</Text>
                </View>
              );
            }
          )()}
          <EjerciciosInteractivos 
            ejercicios={ejercicios}
            onComplete={handleFinish}
            onProgressChange={(p) => setProgress(p)}
          />
        </View>

        <View style={styles.finishContainer}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.finishButtonGradient}
            >
              <Text style={styles.finishButtonText}>Unidad finalizada</Text>
              <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
            </LinearGradient>
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
    marginBottom: 8,
    alignItems: 'flex-start',
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
  },
  titleWithAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  phrasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  phraseItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  phraseSpanish: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 5,
    textAlign: 'center',
  },
  phraseArabic: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  contentWithAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dialogLineWithTranslation: {
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  dialogTranslationLine: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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
  // Progress bar styles
  progressContainer: {
    width: '100%',
    marginTop: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressLabel: {
    width: 40,
    textAlign: 'right',
    fontSize: 12,
    color: '#333',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 12,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  finishButtonGradient: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    writingDirection: 'rtl',
  },
});
