import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AnunciosProspectos() {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const exercises = [
    {
      title: 'Anuncio de Trabajo',
      titleAr: 'إعلان عمل',
      announcement: `SE BUSCA
CAMARERO/A
Restaurante en el centro
Horario: Tarde y noche
Salario: 1200€/mes
Contacto: 912345678`,
      question: '¿Qué información puedes encontrar en este anuncio?',
      questionAr: 'ما المعلومات التي يمكنك العثور عليها في هذا الإعلان؟',
      options: [
        { text: 'Tipo de trabajo, horario y salario', ar: 'نوع العمل، الجدول والراتب' },
        { text: 'Dirección del restaurante', ar: 'عنوان المطعم' },
        { text: 'Menú del restaurante', ar: 'قائمة المطعم' },
        { text: 'Precios de los platos', ar: 'أسعار الأطباق' }
      ],
      correct: 0
    },
    {
      title: 'Prospecto de Medicamento',
      titleAr: 'نشرة دواء',
      announcement: `MEDICAMENTO PARA EL DOLOR
Tomar 1 comprimido cada 8 horas
No tomar con el estómago vacío
Conservar en lugar fresco
Consultar al médico si persiste`,
      question: '¿Cuándo debes tomar este medicamento?',
      questionAr: 'متى يجب أن تأخذ هذا الدواء؟',
      options: [
        { text: 'Cada 4 horas', ar: 'كل 4 ساعات' },
        { text: 'Cada 8 horas', ar: 'كل 8 ساعات' },
        { text: 'Solo por la mañana', ar: 'فقط في الصباح' },
        { text: 'Cuando quieras', ar: 'عندما تريد' }
      ],
      correct: 1
    },
    {
      title: 'Anuncio de Venta',
      titleAr: 'إعلان بيع',
      announcement: `VENDEMOS
Piso de 3 habitaciones
Zona centro, 2º piso
Precio: 150.000€
Llamar: 612345678`,
      question: '¿Qué tipo de información contiene este anuncio?',
      questionAr: 'ما نوع المعلومات التي يحتوي عليها هذا الإعلان؟',
      options: [
        { text: 'Información sobre un piso en venta', ar: 'معلومات عن شقة للبيع' },
        { text: 'Oferta de trabajo', ar: 'عرض عمل' },
        { text: 'Menú de restaurante', ar: 'قائمة مطعم' },
        { text: 'Horario de autobuses', ar: 'جدول الحافلات' }
      ],
      correct: 0
    },
    {
      title: 'Prospecto de Curso',
      titleAr: 'نشرة دورة',
      announcement: `CURSO DE ESPAÑOL
Niveles: A1, A2, B1
Duración: 3 meses
Precio: 300€
Inicio: 15 de septiembre`,
      question: '¿Qué información puedes encontrar sobre el curso?',
      questionAr: 'ما المعلومات التي يمكنك العثور عليها حول الدورة؟',
      options: [
        { text: 'Niveles, duración, precio y fecha de inicio', ar: 'المستويات، المدة، السعر وتاريخ البدء' },
        { text: 'Solo el precio', ar: 'السعر فقط' },
        { text: 'Dirección del centro', ar: 'عنوان المركز' },
        { text: 'Horario de clases', ar: 'جدول الحصص' }
      ],
      correct: 0
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
    AsyncStorage.setItem('A2_Anuncios_Completed', 'true').catch(console.error);
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
              ? '¡Excelente! Puedes encontrar información específica en anuncios y prospectos.'
              : 'Sigue practicando. Es importante entender anuncios y prospectos en la vida diaria.'}
          </Text>
          <Text style={styles.resultsTextAr}>
            {percentage >= 70
              ? 'ممتاز! يمكنك العثور على معلومات محددة في الإعلانات والنشرات.'
              : 'تابع التدريب. من المهم فهم الإعلانات والنشرات في الحياة اليومية.'}
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
          <Text style={styles.title}>Anuncios y Prospectos</Text>
          <Text style={styles.titleAr}>الإعلانات والنشرات</Text>
          <Text style={styles.progress}>{currentExercise + 1} / {exercises.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Ionicons name="megaphone" size={30} color="#79A890" />
            <View style={styles.exerciseTitleContainer}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseTitleAr}>{exercise.titleAr}</Text>
            </View>
          </View>

          <View style={styles.announcementContainer}>
            <View style={styles.announcementBox}>
              <Text style={styles.announcementText}>{exercise.announcement}</Text>
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
              debes poder encontrar información específica en anuncios publicitarios y prospectos.
            </Text>
            <Text style={styles.infoTextAr}>
               يجب أن تكون قادراً على العثور على معلومات محددة في الإعلانات والنشرات.
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
  announcementContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  announcementBox: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#79A890',
    borderRadius: 8,
    padding: 20,
    width: '100%',
  },
  announcementText: {
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





























