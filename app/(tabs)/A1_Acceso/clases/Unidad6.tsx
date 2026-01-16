import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import AudioButton from '../../../components/AudioButton';
import { useUserProgress } from '@/contexts/UserProgressContext';

export default function Unidad6() {
  const router = useRouter();
  const { progress: userProgress, markUnitCompleted } = useUserProgress();
  const levelProgress = userProgress.A1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[5] ?? false;
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState<{correct: number; total: number}>({ correct: 0, total: 0 });

  useEffect(() => {
    setSaved(alreadyCompleted);
  }, [alreadyCompleted]);

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A1', 5);
      setSaved(true);
      
      // Mostrar alerta con opción de ir a Unidad 7
      Alert.alert(
        '¡Unidad 6 completada! 🎉',
        'La Unidad 7 ha sido desbloqueada.\nتم فتح الوحدة 7.',
        [
          {
            text: 'Ir a Unidad 7',
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
        'Unidad 6 ya completada',
        'Ya has completado esta unidad.\nلقد أكملت هذه الوحدة بالفعل.',
        [
          {
            text: 'Ir a Unidad 7',
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
      pregunta: "¿Cómo te sientes hoy? (كيف تشعر اليوم؟)",
      opciones: ["Estoy contento/contenta", "Tengo 25 años", "Voy al médico", "Me gusta el café"],
      respuestaCorrecta: 0,
      explicacion: "Para preguntar por el estado de ánimo usamos '¿Cómo te sientes?'",
      explicacionAr: "للسؤال عن الحالة المزاجية نستخدم '¿Cómo te sientes؟'"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué te duele? (ماذا يؤلمك؟)",
      opciones: ["Me duele la cabeza", "Tengo un perro", "Vivo en el centro", "Estudio español"],
      respuestaCorrecta: 0,
      explicacion: "Para preguntar por el dolor usamos '¿Qué te duele?'",
      explicacionAr: "للسؤال عن الألم نستخدم '¿Qué te duele؟'"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las emociones con su traducción en árabe",
      pares: [
        {"izquierda": "Feliz", "derecha": "سعيد"},
        {"izquierda": "Triste", "derecha": "حزين"},
        {"izquierda": "Enojado", "derecha": "غاضب"},
        {"izquierda": "Asustado", "derecha": "خائف"},
        {"izquierda": "Cansado", "derecha": "متعب"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las partes del cuerpo con su traducción",
      pares: [
        {"izquierda": "Cabeza", "derecha": "رأس"},
        {"izquierda": "Brazo", "derecha": "ذراع"},
        {"izquierda": "Barriga", "derecha": "بطن"},
        {"izquierda": "Pierna", "derecha": "رجل"},
        {"izquierda": "Espalda", "derecha": "ظهر"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "Si alguien dice 'Me duele la cabeza', ¿qué le pasa? (إذا قال شخص 'يؤلمني رأسي'، ما الذي يحدث له؟)",
      opciones: ["Tiene dolor de cabeza", "Está contento", "Tiene hambre", "Quiere dormir"],
      respuestaCorrecta: 0,
      explicacion: "'Me duele la cabeza' significa que la persona tiene dolor de cabeza",
      explicacionAr: "'يؤلمني رأسي' يعني أن الشخص يعاني من صداع"
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
          <Ionicons name="heart" size={50} color="#79A890" />
          <View style={styles.titleWithAudio}>
            <Text style={styles.title}>Unidad 6: Emociones y Salud</Text>
            <AudioButton 
              text="Unidad 6: Emociones y Salud" 
              size="medium"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.titleAr}>الوحدة 6: المشاعر والصحة</Text>
          <View style={styles.titleWithAudio}>
            <Text style={styles.subtitle}>Aprende a expresar emociones y hablar sobre tu salud</Text>
            <AudioButton 
              text="Aprende a expresar emociones y hablar sobre tu salud" 
              size="small"
              showText={false}
              color="#4CAF50"
            />
          </View>
          <Text style={styles.subtitleAr}>تعلم التعبير عن المشاعر والتحدث عن صحتك</Text>
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
            {/* Expresar emociones */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>1. Expresar emociones</Text>
              <Text style={styles.grammarTitleAr}>التعبير عن المشاعر</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Estoy + emoción</Text>
                <AudioButton 
                  text="Estoy contento" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"أنا + المشاعر"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Me siento + emoción</Text>
                <AudioButton 
                  text="Me siento triste" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"أشعر بـ + المشاعر"}</Text>
            </View>

            {/* Hablar de dolor */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>2. Expresar dolor</Text>
              <Text style={styles.grammarTitleAr}>التعبير عن الألم</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Me duele + parte del cuerpo</Text>
                <AudioButton 
                  text="Me duele la cabeza" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"يؤلمني + جزء من الجسم"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Tengo dolor de + parte</Text>
                <AudioButton 
                  text="Tengo dolor de espalda" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لدي ألم في + الجزء"}</Text>
            </View>

            {/* Estado de salud */}
            <View style={styles.grammarItem}>
              <Text style={styles.grammarTitle}>3. Hablar de salud</Text>
              <Text style={styles.grammarTitleAr}>التحدث عن الصحة</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Estoy enfermo/a</Text>
                <AudioButton 
                  text="Estoy enfermo" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"أنا مريض/مريضة"}</Text>
              
              <View style={styles.grammarExample}>
                <Text style={styles.grammarText}>Tengo + síntoma</Text>
                <AudioButton 
                  text="Tengo fiebre" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.grammarTextAr}>{"لدي + العرض"}</Text>
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
                <Text style={styles.vocabSpanish}>Me siento</Text>
                <AudioButton 
                  text="Me siento" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>أشعر</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Estoy enfermo</Text>
                <AudioButton 
                  text="Estoy enfermo" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>أنا مريض/مريضة</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Me duele</Text>
                <AudioButton 
                  text="Me duele" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>يؤلمني</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>La cabeza</Text>
                <AudioButton 
                  text="La cabeza" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>الرأس</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>La fiebre</Text>
                <AudioButton 
                  text="La fiebre" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>الحمى</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>La medicina</Text>
                <AudioButton 
                  text="La medicina" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>الدواء</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>El médico</Text>
                <AudioButton 
                  text="El médico" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>الطبيب</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Contento</Text>
                <AudioButton 
                  text="Contento" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>سعيد/سعيدة</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Triste</Text>
                <AudioButton 
                  text="Triste" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>حزين</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Cansado</Text>
                <AudioButton 
                  text="Cansado" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>متعب/متعبة</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Nervioso</Text>
                <AudioButton 
                  text="Nervioso" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>متوتر/متوترة</Text>
            </View>
            <View style={styles.vocabItem}>
              <View style={styles.vocabAudioContainer}>
                <Text style={styles.vocabSpanish}>Tranquilo</Text>
                <AudioButton 
                  text="Tranquilo" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.vocabArabic}>هادئ/هادئة</Text>
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
              text="Hola, ¿cómo estás? No muy bien, tengo fiebre. Lo siento, ¿quieres que llame a un médico? Sí, por favor, me duele mucho la cabeza. ¿Tomaste alguna medicina? Sí, pero no me hace efecto." 
              size="medium"
              showText={false}
              color="#79A890"
            />
          </View>
          
          <View style={styles.dialogContainer}>
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>María:</Text>
                <Text style={styles.dialogText}>Hola, ¿cómo estás?</Text>
                <AudioButton 
                  text="Hola, ¿cómo estás?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"مرحباً، كيف حالك؟"}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ahmed:</Text>
                <Text style={styles.dialogText}>No muy bien, tengo fiebre.</Text>
                <AudioButton 
                  text="No muy bien, tengo fiebre." 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"ليس بخير، لدي حمى."}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>María:</Text>
                <Text style={styles.dialogText}>Lo siento, ¿quieres que llame a un médico?</Text>
                <AudioButton 
                  text="Lo siento, ¿quieres que llame a un médico?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"آسفة، هل تريد أن أتصل بطبيب؟"}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ahmed:</Text>
                <Text style={styles.dialogText}>Sí, por favor, me duele mucho la cabeza.</Text>
                <AudioButton 
                  text="Sí, por favor, me duele mucho la cabeza." 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"نعم، من فضلك، رأسي يؤلمني كثيراً."}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>María:</Text>
                <Text style={styles.dialogText}>¿Tomaste alguna medicina?</Text>
                <AudioButton 
                  text="¿Tomaste alguna medicina?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"هل تناولت أي دواء؟"}</Text>
            </View>
            
            <View style={styles.dialogLineWithTranslation}>
              <View style={styles.dialogLine}>
                <Text style={styles.dialogPerson}>Ahmed:</Text>
                <Text style={styles.dialogText}>Sí, pero no me hace efecto.</Text>
                <AudioButton 
                  text="Sí, pero no me hace efecto." 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.dialogTranslationLine}>{"نعم، لكنه لا يؤثر علي."}</Text>
            </View>
          </View>
        </View>

        {/* Frases Útiles sobre Emociones y Salud */}
        <View style={styles.section}>
          <View style={styles.titleWithAudio}>
            <Text style={styles.sectionTitle}>Frases Útiles sobre Emociones y Salud</Text>
            <AudioButton 
              text="Frases Útiles sobre Emociones y Salud" 
              size="small"
              showText={false}
              color="#79A890"
            />
          </View>
          <Text style={styles.sectionTitleAr}>عبارات مفيدة حول المشاعر والصحة</Text>
          
          <View style={styles.phrasesContainer}>
            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>¿Cómo te sientes?</Text>
                <AudioButton 
                  text="¿Cómo te sientes?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"كيف تشعر؟"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Me siento muy bien</Text>
                <AudioButton 
                  text="Me siento muy bien" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"أشعر بحالة جيدة جداً"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>No me siento bien</Text>
                <AudioButton 
                  text="No me siento bien" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"لا أشعر بحالة جيدة"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Estoy enfermo/a</Text>
                <AudioButton 
                  text="Estoy enfermo" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"أنا مريض/مريضة"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Me duele la cabeza</Text>
                <AudioButton 
                  text="Me duele la cabeza" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"يؤلمني رأسي"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Tengo fiebre</Text>
                <AudioButton 
                  text="Tengo fiebre" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"لدي حمى"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Necesito un médico</Text>
                <AudioButton 
                  text="Necesito un médico" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"أحتاج إلى طبيب"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Estoy muy cansado/a</Text>
                <AudioButton 
                  text="Estoy muy cansado" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"أنا متعب/متعبة جداً"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>Me siento mejor</Text>
                <AudioButton 
                  text="Me siento mejor" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"أشعر بتحسن"}</Text>
            </View>

            <View style={styles.phraseItem}>
              <View style={styles.phraseSpanish}>
                <Text style={styles.phraseText}>¿Qué te duele?</Text>
                <AudioButton 
                  text="¿Qué te duele?" 
                  size="small"
                  showText={false}
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.phraseArabic}>{"ماذا يؤلمك؟"}</Text>
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
              <Text style={styles.phraseSpanish}>Estoy contento / Estoy cansado</Text>
              <AudioButton text="Estoy contento" size="small" showText={false} color="#4CAF50" />
              <Text style={styles.phraseArabic}>أنا سعيد / أنا متعب</Text>
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Me duele la cabeza</Text>
              <AudioButton text="Me duele la cabeza" size="small" showText={false} color="#4CAF50" />
              <Text style={styles.phraseArabic}>رأسي يؤلمني</Text>
            </View>
            <View style={styles.phraseItem}>
              <Text style={styles.phraseSpanish}>Voy al médico</Text>
              <AudioButton text="Voy al médico" size="small" showText={false} color="#4CAF50" />
              <Text style={styles.phraseArabic}>أذهب إلى الطبيب</Text>
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
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  dialogPerson: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginRight: 8,
    minWidth: 80,
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
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
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
