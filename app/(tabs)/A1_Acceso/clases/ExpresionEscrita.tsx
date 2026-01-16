import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExpresionEscrita() {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);

  const exercises = [
    {
      title: 'Presentación Personal',
      titleAr: 'التعريف الشخصي',
      instruction: 'Escribe una presentación personal de 3-4 líneas usando las siguientes palabras:',
      instructionAr: 'اكتب تعريفاً شخصياً من 3-4 أسطر باستخدام الكلمات التالية:',
      keywords: ['nombre', 'edad', 'país', 'profesión', 'familia'],
      keywordsAr: ['الاسم', 'العمر', 'البلد', 'المهنة', 'العائلة'],
      example: 'Ejemplo: Me llamo Ana, tengo 25 años y soy de España. Soy profesora y tengo una familia pequeña.',
      exampleAr: 'مثال: اسمي آنا، عمري 25 سنة وأنا من إسبانيا. أنا مدرسة وعندي عائلة صغيرة.'
    },
    {
      title: 'Mi Familia',
      titleAr: 'عائلتي',
      instruction: 'Describe tu familia en 4-5 líneas:',
      instructionAr: 'صف عائلتك في 4-5 أسطر:',
      keywords: ['padres', 'hermanos', 'abuelos', 'vivo con', 'tengo'],
      keywordsAr: ['الوالدان', 'الإخوة', 'الأجداد', 'أعيش مع', 'عندي'],
      example: 'Ejemplo: Tengo una familia grande. Mis padres viven en Marruecos. Tengo dos hermanos y una hermana. Vivo con mi esposa en España.',
      exampleAr: 'مثال: عندي عائلة كبيرة. والداي يعيشان في المغرب. عندي أخوان وأخت واحدة. أعيش مع زوجتي في إسبانيا.'
    },
    {
      title: 'Mi Casa',
      titleAr: 'بيتي',
      instruction: 'Describe tu casa y las habitaciones:',
      instructionAr: 'صف بيتك والغرف:',
      keywords: ['casa', 'habitaciones', 'cocina', 'baño', 'sala'],
      keywordsAr: ['البيت', 'الغرف', 'المطبخ', 'الحمام', 'الصالة'],
      example: 'Ejemplo: Mi casa tiene tres habitaciones. La cocina es grande y moderna. El baño está al lado del dormitorio.',
      exampleAr: 'مثال: بيتي فيه ثلاث غرف. المطبخ كبير وحديث. الحمام بجانب غرفة النوم.'
    },
    {
      title: 'Un Día Normal',
      titleAr: 'يوم عادي',
      instruction: 'Describe qué haces en un día normal:',
      instructionAr: 'صف ماذا تفعل في يوم عادي:',
      keywords: ['me levanto', 'desayuno', 'trabajo', 'como', 'duermo'],
      keywordsAr: ['أستيقظ', 'أتناول الإفطار', 'أعمل', 'آكل', 'أنام'],
      example: 'Ejemplo: Me levanto a las 7. Desayuno café y tostadas. Trabajo de 9 a 5. Por la noche veo televisión.',
      exampleAr: 'مثال: أستيقظ في السابعة. أتناول القهوة والخبز المحمص في الإفطار. أعمل من 9 إلى 5. في المساء أشاهد التلفزيون.'
    }
  ];

  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentExercise] = text;
    setAnswers(newAnswers);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  const resetExercises = () => {
    setCurrentExercise(0);
    setAnswers(['', '', '', '']);
    setShowResults(false);
    setSaved(false);
  };

  useEffect(() => {
    if (showResults && !saved) {
      (async () => {
        try {
          await AsyncStorage.setItem('A1_ExpresionEscrita_Completed', 'true');
          setSaved(true);
        } catch (e) {
          console.warn('No se pudo guardar el progreso de Expresión Escrita', e);
        }
      })();
    }
  }, [showResults, saved]);

  if (showResults) {
    return (
      <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.container}>
        <View style={styles.resultsContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#fff" />
          <Text style={styles.resultsTitle}>¡Ejercicios Completados!</Text>
          <Text style={styles.resultsTitleAr}>تم إنجاز التمارين!</Text>
          
          <Text style={styles.resultsText}>
            Has completado todos los ejercicios de expresión escrita del nivel A1.
          </Text>
          <Text style={styles.resultsTextAr}>
            لقد أكملت جميع تمارين التعبير الكتابي لمستوى A1.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={resetExercises}>
              <Text style={styles.actionButtonText}>Repetir Ejercicios</Text>
              <Text style={styles.actionButtonTextAr}>إعادة التمارين</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#79A890' }]} 
              onPress={() => router.back()}
            >
              <Text style={styles.actionButtonText}>Volver al Menú</Text>
              <Text style={styles.actionButtonTextAr}>العودة للقائمة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  const exercise = exercises[currentExercise];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#79A890" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>Expresión Escrita A1</Text>
          <Text style={styles.titleAr}>التعبير الكتابي A1</Text>
          <Text style={styles.progress}>{currentExercise + 1} / {exercises.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Ionicons name="create" size={30} color="#79A890" />
            <View style={styles.exerciseTitleContainer}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseTitleAr}>{exercise.titleAr}</Text>
            </View>
          </View>

          <View style={styles.instructionContainer}>
            <Text style={styles.instruction}>{exercise.instruction}</Text>
            <Text style={styles.instructionAr}>{exercise.instructionAr}</Text>
          </View>

          <View style={styles.keywordsContainer}>
            <Text style={styles.keywordsTitle}>Palabras clave / الكلمات المفتاحية:</Text>
            <View style={styles.keywordsList}>
              {exercise.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordItem}>
                  <Text style={styles.keyword}>{keyword}</Text>
                  <Text style={styles.keywordAr}>{exercise.keywordsAr[index]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Ejemplo / مثال:</Text>
            <Text style={styles.example}>{exercise.example}</Text>
            <Text style={styles.exampleAr}>{exercise.exampleAr}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tu respuesta / إجابتك:</Text>
            <TextInput
              style={styles.textInput}
              value={answers[currentExercise]}
              onChangeText={handleAnswerChange}
              placeholder="Escribe aquí tu respuesta..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentExercise === 0 && styles.navButtonDisabled]} 
          onPress={previousExercise}
          disabled={currentExercise === 0}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text style={styles.navButtonText}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={nextExercise}>
          <Text style={styles.navButtonText}>
            {currentExercise === exercises.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  titleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  progress: {
    fontSize: 16,
    color: '#79A890',
    fontWeight: 'bold',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
  },
  exerciseTitleAr: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  instructionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  instruction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  instructionAr: {
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  keywordsContainer: {
    marginBottom: 20,
  },
  keywordsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordItem: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  keyword: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
  },
  keywordAr: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  exampleContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  example: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  exampleAr: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    minHeight: 120,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  navButton: {
    backgroundColor: '#79A890',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  resultsTitleAr: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 8,
  },
  resultsText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  resultsTextAr: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 12,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  actionButtonTextAr: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 4,
  },
});
