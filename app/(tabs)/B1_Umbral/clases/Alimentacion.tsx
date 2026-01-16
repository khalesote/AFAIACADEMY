import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de ejercicios para Alimentación - Nivel B1
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué significa 'desayuno' en árabe? (ماذا تعني 'فطور' بالعربية؟)",
    opciones: ["غداء", "فطور", "عشاء", "وجبة"],
    respuestaCorrecta: 1,
    explicacion: "'Desayuno' significa 'فطور' en árabe, que es la primera comida del día",
    explicacionAr: "'فطور' تعني 'فطور' بالعربية، وهي الوجبة الأولى في اليوم"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cuál es la comida principal del día en España? (ما هي الوجبة الرئيسية في اليوم في إسبانيا؟)",
    opciones: ["Desayuno", "Almuerzo", "Cena", "Merienda"],
    respuestaCorrecta: 1,
    explicacion: "En España, el almuerzo es la comida principal del día, se come entre las 2 y las 4 de la tarde",
    explicacionAr: "في إسبانيا، الغداء هو الوجبة الرئيسية في اليوم، يُتناول بين الساعة 2 و4 مساءً"
  },
  
  // Ejercicio 5: Reflexión
  {
    tipo: "reflexion",
    titulo: "Describe tus hábitos alimenticios y las diferencias con España",
    texto: "Escribe sobre tus hábitos alimenticios y las diferencias que has notado con la alimentación española. (اكتب عن عاداتك الغذائية والاختلافات التي لاحظتها مع التغذية الإسبانية)"
  },
  
  // Ejercicio 6: Vocabulario
  {
    tipo: "vocabulario",
    titulo: "Relaciona las comidas con su traducción en árabe",
    pares: [
      {"izquierda": "Desayuno", "derecha": "فطور"},
      {"izquierda": "Almuerzo", "derecha": "غداء"},
      {"izquierda": "Cena", "derecha": "عشاء"},
      {"izquierda": "Merienda", "derecha": "وجبة خفيفة"},
      {"izquierda": "Comida", "derecha": "طعام"}
    ]
  }
];

export default function Alimentacion() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[18] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 18);
    }
    Alert.alert(
      'Unidad finalizada',
      'Vuelve al menú de B1 para continuar con la siguiente unidad.\nارجع إلى قائمة مستوى B1 لمتابعة الوحدة التالية.',
      [
        { text: 'Seguir estudiando', style: 'cancel' },
        { text: 'Ir al menú B1 / الذهاب إلى قائمة B1', onPress: () => router.replace('/B1_Umbral') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#79A890" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="restaurant" size={50} color="#79A890" />
          <Text style={styles.title}>Alimentación y Gastronomía</Text>
          <Text style={styles.titleAr}>التغذية والمطبخ</Text>
          <Text style={styles.subtitle}>Hábitos alimenticios y cultura gastronómica española</Text>
          <Text style={styles.subtitleAr}>العادات الغذائية والثقافة المطبخية الإسبانية</Text>
        </View>
      </View>

      {/* Contenido Principal */}
      <View style={styles.content}>
        {/* Contexto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contexto y Objetivos</Text>
          <Text style={styles.sectionTitleAr}>السياق والأهداف</Text>
          <Text style={styles.sectionText}>
            En esta unidad aprenderás sobre los hábitos alimenticios españoles, la gastronomía tradicional 
            y las diferencias culturales en la alimentación. Es fundamental para entender la cultura 
            española y comunicarte sobre comida y restaurantes.
          </Text>
          <Text style={styles.sectionTextAr}>
            في هذه الوحدة ستتعلم عن العادات الغذائية الإسبانية والمطبخ التقليدي 
            والاختلافات الثقافية في التغذية. هذا أساسي لفهم الثقافة الإسبانية 
            والتواصل حول الطعام والمطاعم.
          </Text>
        </View>

        {/* Vocabulario Clave */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulario Clave</Text>
          <Text style={styles.sectionTitleAr}>المفردات الأساسية</Text>
          
          <View style={styles.vocabularyGrid}>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Desayuno</Text>
              <Text style={styles.vocabArabic}>فطور</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Almuerzo</Text>
              <Text style={styles.vocabArabic}>غداء</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Cena</Text>
              <Text style={styles.vocabArabic}>عشاء</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Merienda</Text>
              <Text style={styles.vocabArabic}>وجبة خفيفة</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Paella</Text>
              <Text style={styles.vocabArabic}>بايلا</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Tapas</Text>
              <Text style={styles.vocabArabic}>تاباس</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Gastronomía</Text>
              <Text style={styles.vocabArabic}>مطبخ</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabSpanish}>Restaurante</Text>
              <Text style={styles.vocabArabic}>مطعم</Text>
            </View>
          </View>
        </View>

        {/* Ejemplo de Diálogo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo de Diálogo</Text>
          <Text style={styles.sectionTitleAr}>مثال على حوار</Text>
          
          <View style={styles.dialogContainer}>
            <View style={styles.dialogLine}>
              <Text style={styles.dialogPerson}>Carlos:</Text>
              <Text style={styles.dialogText}>¿Qué sueles desayunar?</Text>
            </View>
            <View style={styles.dialogLine}>
              <Text style={styles.dialogPerson}>Fatima:</Text>
              <Text style={styles.dialogText}>Normalmente desayuno pan con aceite y zumo de naranja.</Text>
            </View>
            <View style={styles.dialogLine}>
              <Text style={styles.dialogPerson}>Carlos:</Text>
              <Text style={styles.dialogText}>¿Te gusta la comida española?</Text>
            </View>
            <View style={styles.dialogLine}>
              <Text style={styles.dialogPerson}>Fatima:</Text>
              <Text style={styles.dialogText}>Me encanta la paella y las tapas. ¿Cuál es tu plato favorito?</Text>
            </View>
            <View style={styles.dialogLine}>
              <Text style={styles.dialogPerson}>Carlos:</Text>
              <Text style={styles.dialogText}>Me gusta mucho la tortilla española y el jamón ibérico.</Text>
            </View>
          </View>
        </View>

        {/* Actividad de Reflexión */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad de Reflexión</Text>
          <Text style={styles.sectionTitleAr}>نشاط التأمل</Text>
          <Text style={styles.sectionText}>
            Piensa en las diferencias entre la alimentación de tu país y la española. 
            ¿Qué te gusta más? ¿Qué te resulta extraño? ¿Cómo adaptas tus hábitos?
          </Text>
          <Text style={styles.sectionTextAr}>
            فكر في الاختلافات بين تغذية بلدك والإسبانية. 
            ما الذي يعجبك أكثر؟ ما الذي يبدو غريبًا لك؟ كيف تتكيف مع عاداتك؟
          </Text>
        </View>

        {/* Ejercicios Interactivos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejercicios Interactivos</Text>
          <Text style={styles.sectionTitleAr}>تمارين تفاعلية</Text>
          <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
        </View>

        {/* Actividad Final */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad Final</Text>
          <Text style={styles.sectionTitleAr}>النشاط النهائي</Text>
          <Text style={styles.sectionText}>
            Planifica un menú típico español para una semana. Incluye desayuno, almuerzo, cena y merienda. 
            Explica por qué elegiste cada plato y qué representa en la cultura española.
          </Text>
          <Text style={styles.sectionTextAr}>
            خطط لقائمة إسبانية تقليدية لأسبوع كامل. قم بتضمين الفطور والغداء والعشاء والوجبة الخفيفة.
          </Text>
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
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'right',
    writingDirection: 'rtl',
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
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonGradient: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  vocabularyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
});

