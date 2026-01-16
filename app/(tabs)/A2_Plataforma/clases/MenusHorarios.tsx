import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenusHorarios() {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const exercises = [
    {
      type: 'menu',
      title: 'Menú del Restaurante',
      titleAr: 'قائمة المطعم',
      content: `MENÚ DEL DÍA
Primer plato:
- Ensalada mixta: 8€
- Sopa del día: 7€
- Pasta: 9€

Segundo plato:
- Pollo asado: 12€
- Pescado: 14€
- Paella: 15€

Postre:
- Flan: 4€
- Fruta: 3€`,
      question: '¿Cuánto cuesta la paella?',
      questionAr: 'كم تكلف الباييلا؟',
      options: [
        { text: '12€', ar: '12 يورو' },
        { text: '14€', ar: '14 يورو' },
        { text: '15€', ar: '15 يورو' },
        { text: '9€', ar: '9 يورو' }
      ],
      correct: 2
    },
    {
      type: 'horario',
      title: 'Horario de Autobuses',
      titleAr: 'جدول الحافلات',
      content: `LÍNEA 5
Lunes a Viernes:
6:00 - 22:00 (cada 15 min)
22:00 - 24:00 (cada 30 min)

Sábados y Domingos:
7:00 - 23:00 (cada 20 min)`,
      question: '¿Con qué frecuencia pasan los autobuses los sábados?',
      questionAr: 'كم مرة تمر الحافلات يوم السبت؟',
      options: [
        { text: 'Cada 15 minutos', ar: 'كل 15 دقيقة' },
        { text: 'Cada 20 minutos', ar: 'كل 20 دقيقة' },
        { text: 'Cada 30 minutos', ar: 'كل 30 دقيقة' },
        { text: 'Cada hora', ar: 'كل ساعة' }
      ],
      correct: 1
    },
    {
      type: 'menu',
      title: 'Menú de Cafetería',
      titleAr: 'قائمة المقهى',
      content: `CAFETERÍA
Bebidas:
- Café: 1,50€
- Té: 1,50€
- Zumo: 2,50€
- Agua: 1,00€

Bocadillos:
- Jamón: 3,50€
- Queso: 3,00€
- Mixto: 4,00€`,
      question: '¿Cuál es el bocadillo más caro?',
      questionAr: 'ما هو الساندويتش الأغلى؟',
      options: [
        { text: 'Jamón', ar: 'لحم الخنزير' },
        { text: 'Queso', ar: 'الجبن' },
        { text: 'Mixto', ar: 'مختلط' },
        { text: 'Todos cuestan igual', ar: 'كلها بنفس السعر' }
      ],
      correct: 2
    },
    {
      type: 'horario',
      title: 'Horario de Biblioteca',
      titleAr: 'جدول المكتبة',
      content: `BIBLIOTECA MUNICIPAL
Lunes a Viernes: 9:00 - 21:00
Sábados: 10:00 - 14:00
Domingos: Cerrado

Préstamo de libros:
Hasta 2 semanas`,
      question: '¿A qué hora cierra la biblioteca los sábados?',
      questionAr: 'في أي ساعة تغلق المكتبة يوم السبت؟',
      options: [
        { text: 'A las 21:00', ar: 'في 21:00' },
        { text: 'A las 14:00', ar: 'في 14:00' },
        { text: 'A las 10:00', ar: 'في 10:00' },
        { text: 'Está cerrada', ar: 'مغلقة' }
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
    setShowResults(true);
    AsyncStorage.setItem('A2_MenusHorarios_Completed', 'true').catch(console.error);
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
              ? '¡Excelente! Puedes leer y entender menús y horarios correctamente.'
              : 'Sigue practicando. Los menús y horarios son muy útiles en la vida diaria.'}
          </Text>
          <Text style={styles.resultsTextAr}>
            {percentage >= 70
              ? 'ممتاز! يمكنك قراءة وفهم القوائم والجداول بشكل صحيح.'
              : 'تابع التدريب. القوائم والجداول مفيدة جداً في الحياة اليومية.'}
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
          <Text style={styles.title}>Menús y Horarios</Text>
          <Text style={styles.titleAr}>القوائم والجداول</Text>
          <Text style={styles.progress}>{currentExercise + 1} / {exercises.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Ionicons 
              name={exercise.type === 'menu' ? "restaurant" : "time"} 
              size={30} 
              color="#79A890" 
            />
            <View style={styles.exerciseTitleContainer}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseTitleAr}>{exercise.titleAr}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentBox}>
              <Text style={styles.contentText}>{exercise.content}</Text>
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
             debes poder encontrar información específica en menús y horarios de uso cotidiano.
            </Text>
            <Text style={styles.infoTextAr}>
                يجب أن تكون قادراً على العثور على معلومات محددة في القوائم والجداول اليومية.
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
  contentContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  contentBox: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#79A890',
    borderRadius: 8,
    padding: 20,
    width: '100%',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'monospace',
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





























