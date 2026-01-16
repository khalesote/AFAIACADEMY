import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LetrerosCarteles() {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const exercises = [
    {
      title: 'Letrero de Estación',
      titleAr: 'لافتة المحطة',
      image: '🚇',
      signText: 'ESTACIÓN DE METRO',
      question: '¿Qué significa este letrero?',
      questionAr: 'ماذا يعني هذا اللافتة؟',
      options: [
        { text: 'Lugar para tomar el metro', ar: 'مكان لركوب المترو' },
        { text: 'Tienda de ropa', ar: 'متجر ملابس' },
        { text: 'Restaurante', ar: 'مطعم' },
        { text: 'Hospital', ar: 'مستشفى' }
      ],
      correct: 0
    },
    {
      title: 'Cartel de Prohibido',
      titleAr: 'لافتة ممنوع',
      image: '🚫',
      signText: 'PROHIBIDO FUMAR',
      question: '¿Qué indica este cartel?',
      questionAr: 'ماذا يشير هذا اللافتة؟',
      options: [
        { text: 'Puedes fumar aquí', ar: 'يمكنك التدخين هنا' },
        { text: 'No puedes fumar aquí', ar: 'لا يمكنك التدخين هنا' },
        { text: 'Hay cigarrillos aquí', ar: 'هناك سجائر هنا' },
        { text: 'Tienda de tabaco', ar: 'متجر تبغ' }
      ],
      correct: 1
    },
    {
      title: 'Letrero de Salida',
      titleAr: 'لافتة الخروج',
      image: '🚪',
      signText: 'SALIDA',
      question: '¿Qué significa esta palabra?',
      questionAr: 'ماذا تعني هذه الكلمة؟',
      options: [
        { text: 'Entrada', ar: 'مدخل' },
        { text: 'Salida', ar: 'مخرج' },
        { text: 'Baño', ar: 'حمام' },
        { text: 'Ascensor', ar: 'مصعد' }
      ],
      correct: 1
    },
    {
      title: 'Cartel de Información',
      titleAr: 'لافتة المعلومات',
      image: 'ℹ️',
      signText: 'INFORMACIÓN',
      question: '¿Dónde puedes encontrar este letrero?',
      questionAr: 'أين يمكنك العثور على هذه اللافتة؟',
      options: [
        { text: 'En un hospital', ar: 'في مستشفى' },
        { text: 'En una estación de tren', ar: 'في محطة قطار' },
        { text: 'En un supermercado', ar: 'في سوبر ماركت' },
        { text: 'Todas las anteriores', ar: 'كل ما سبق' }
      ],
      correct: 3
    },
    {
      title: 'Letrero de Emergencia',
      titleAr: 'لافتة الطوارئ',
      image: '🚨',
      signText: 'SALIDA DE EMERGENCIA',
      question: '¿Cuándo usas esta salida?',
      questionAr: 'متى تستخدم هذا المخرج؟',
      options: [
        { text: 'Siempre', ar: 'دائماً' },
        { text: 'Solo en emergencias', ar: 'فقط في حالات الطوارئ' },
        { text: 'Por la noche', ar: 'في الليل' },
        { text: 'Nunca', ar: 'أبداً' }
      ],
      correct: 1
    }
  ];

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentExercise] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswers[currentExercise] === undefined) {
      Alert.alert(
        'Selecciona una respuesta',
        'Por favor, elige una opción antes de continuar.',
        [{ text: 'Entendido / فهمت' }]
      );
      return;
    }

    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  const handleComplete = () => {
    const correctAnswers = exercises.filter((ex, idx) => selectedAnswers[idx] === ex.correct).length;
    const percentage = Math.round((correctAnswers / exercises.length) * 100);
    
    setShowResults(true);
    
    AsyncStorage.setItem('A1_Letreros_Completed', 'true').catch(console.error);
  };

  const handleReset = () => {
    setCurrentExercise(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const correctAnswers = exercises.filter((ex, idx) => selectedAnswers[idx] === ex.correct).length;
    const percentage = Math.round((correctAnswers / exercises.length) * 100);
    
    return (
      <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.container}>
        <View style={styles.resultsContainer}>
          <Ionicons 
            name={percentage >= 70 ? "checkmark-circle" : "alert-circle"} 
            size={80} 
            color="#fff" 
          />
          <Text style={styles.resultsTitle}>¡Ejercicio Completado!</Text>
          <Text style={styles.resultsTitleAr}>تم إنجاز التمرين!</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {correctAnswers} de {exercises.length} correctas
            </Text>
            <Text style={styles.scoreTextAr}>
              {correctAnswers} من {exercises.length} صحيحة
            </Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>

          <Text style={styles.resultsText}>
            {percentage >= 70 
              ? '¡Excelente! Has comprendido los letreros y carteles básicos.'
              : 'Sigue practicando. Los letreros son importantes para la vida diaria.'}
          </Text>
          <Text style={styles.resultsTextAr}>
            {percentage >= 70
              ? 'ممتاز! لقد فهمت اللافتات والملصقات الأساسية.'
              : 'تابع التدريب. اللافتات مهمة للحياة اليومية.'}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleReset}>
              <Text style={styles.actionButtonText}>Repetir Ejercicio</Text>
              <Text style={styles.actionButtonTextAr}>إعادة التمرين</Text>
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
  const selectedAnswer = selectedAnswers[currentExercise];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#79A890" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>Letreros y Carteles</Text>
          <Text style={styles.titleAr}>اللافتات والملصقات</Text>
          <Text style={styles.progress}>{currentExercise + 1} / {exercises.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseEmoji}>{exercise.image}</Text>
            <View style={styles.exerciseTitleContainer}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseTitleAr}>{exercise.titleAr}</Text>
            </View>
          </View>

          <View style={styles.signContainer}>
            <View style={styles.signBox}>
              <Text style={styles.signText}>{exercise.signText}</Text>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>{exercise.question}</Text>
            <Text style={styles.questionAr}>{exercise.questionAr}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {exercise.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.optionButtonSelected
                ]}
                onPress={() => handleSelectAnswer(index)}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.radioButton,
                    selectedAnswer === index && styles.radioButtonSelected
                  ]}>
                    {selectedAnswer === index && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={[
                      styles.optionText,
                      selectedAnswer === index && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                    <Text style={[
                      styles.optionTextAr,
                      selectedAnswer === index && styles.optionTextArSelected
                    ]}>
                      {option.ar}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#79A890" />
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Según el MCER nivel A1, debes poder comprender palabras y nombres conocidos en letreros, carteles y catálogos.
            </Text>
            <Text style={styles.infoTextAr}>
              وفقاً للإطار الأوروبي المرجعي المشترك للمستوى A1، يجب أن تكون قادراً على فهم الكلمات والأسماء المعروفة في اللافتات والملصقات والكتالوجات.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentExercise === 0 && styles.navButtonDisabled]} 
          onPress={handlePrevious}
          disabled={currentExercise === 0}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text style={styles.navButtonText}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
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
    marginBottom: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  exerciseTitleContainer: {
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
  signContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  signBox: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#79A890',
    borderRadius: 8,
    padding: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  signText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  questionAr: {
    fontSize: 16,
    color: '#666',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    borderColor: '#79A890',
    backgroundColor: '#e8f5e9',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#79A890',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#79A890',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  optionTextSelected: {
    color: '#79A890',
    fontWeight: 'bold',
  },
  optionTextAr: {
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  optionTextArSelected: {
    color: '#79A890',
    fontWeight: 'bold',
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1b5e20',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoTextAr: {
    fontSize: 12,
    color: '#1b5e20',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: 18,
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
  scoreContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  scoreTextAr: {
    fontSize: 18,
    color: '#fff',
    writingDirection: 'rtl',
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  resultsText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  resultsTextAr: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 20,
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





























