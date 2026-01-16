import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExamenNacionalidadPayment from '../../components/ExamenNacionalidadPayment';
import ExamenNacionalidadAccessCodeInput from '../../components/ExamenNacionalidadAccessCodeInput';
import { getExamenNacionalidadTotalPrice } from '../../config/stripeExamenNacionalidad';
import { markExamenNacionalidadCodeAsUsed } from '../../utils/accessCodes';
import { useUser } from '@/contexts/UserContext';

// Importar el JSON de preguntas
const examData = require('../assets/examen_nacionalidad_ccse.json');

interface Pregunta {
  id: number;
  categoria: string;
  categoria_ar?: string;
  pregunta: string;
  pregunta_ar?: string;
  opciones: string[];
  opciones_ar?: string[];
  respuesta_correcta: number;
  explicacion: string;
  explicacion_ar: string;
}

export default function ExamenNacionalidadScreen() {
  const router = useRouter();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState<Pregunta[]>([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [examenIniciado, setExamenIniciado] = useState(false);
  const [examenCompletado, setExamenCompletado] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(45 * 60); // 45 minutos en segundos
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [preguntaExplicacion, setPreguntaExplicacion] = useState<Pregunta | null>(null);
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [verificandoAcceso, setVerificandoAcceso] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'payment' | 'code'>('payment');
  const { user } = useUser();

  useEffect(() => {
    if (examData?.examen_ccse) {
      setPreguntas(examData.examen_ccse as Pregunta[]);
    }
  }, []);

  // Verificar si el usuario ya tiene acceso pagado
  useEffect(() => {
    const verificarAcceso = async () => {
      try {
        const accesoGuardado = await AsyncStorage.getItem('@acceso_examen_nacionalidad');
        if (accesoGuardado) {
          const accesoData = JSON.parse(accesoGuardado);
          setTieneAcceso(accesoData.tieneAcceso === true);
        } else {
          setTieneAcceso(false);
        }
      } catch (error) {
        console.error('Error al verificar acceso:', error);
        setTieneAcceso(false);
      } finally {
        setVerificandoAcceso(false);
      }
    };

    verificarAcceso();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examenIniciado && !examenCompletado && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            finalizarExamen();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examenIniciado, examenCompletado, tiempoRestante]);

  const iniciarExamen = () => {
    if (!tieneAcceso) {
      Alert.alert(
        'Acceso requerido',
        'Debes pagar para acceder al examen de nacionalidad.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Seleccionar 25 preguntas aleatorias
    const preguntasAleatorias = [...preguntas]
      .sort(() => Math.random() - 0.5)
      .slice(0, 25);
    
    setPreguntasSeleccionadas(preguntasAleatorias);
    setRespuestas(new Array(25).fill(-1));
    setPreguntaActual(0);
    setExamenIniciado(true);
    setExamenCompletado(false);
    setMostrarResultados(false);
    setTiempoRestante(45 * 60);
  };

  const handlePaymentSuccess = () => {
    setTieneAcceso(true);
    Alert.alert(
      '¡Pago exitoso!',
      'Ya puedes acceder al examen de nacionalidad.',
      [{ text: 'OK' }]
    );
  };

  const handleCodeValid = async (code: string) => {
    try {
      // Marcar código como usado (si no es código de prueba, requiere documento)
      await markExamenNacionalidadCodeAsUsed(code, user?.documento);
      
      // Guardar acceso en AsyncStorage
      await AsyncStorage.setItem('@acceso_examen_nacionalidad', JSON.stringify({
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        codigoUsado: code,
        metodo: 'codigo'
      }));

      setTieneAcceso(true);
      Alert.alert(
        '¡Código válido!',
        'Ya puedes acceder al examen de nacionalidad.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error al procesar código:', error);
      Alert.alert(
        'Error',
        'No se pudo procesar el código. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const seleccionarRespuesta = (indice: number) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = indice;
    setRespuestas(nuevasRespuestas);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntasSeleccionadas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      finalizarExamen();
    }
  };

  const preguntaAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const finalizarExamen = () => {
    setExamenCompletado(true);
    setExamenIniciado(false);
    calcularResultados();
  };

  const calcularResultados = () => {
    let correctas = 0;
    preguntasSeleccionadas.forEach((pregunta, index) => {
      if (respuestas[index] === pregunta.respuesta_correcta) {
        correctas++;
      }
    });
    
    const porcentaje = Math.round((correctas / 25) * 100);
    const aprobado = correctas >= 15; // Mínimo 15/25 para aprobar
    
    Alert.alert(
      'Examen Completado / تم الانتهاء من الامتحان',
      `Has respondido ${correctas} de 25 preguntas correctamente.\nأجبت على ${correctas} من 25 سؤالًا بشكل صحيح.\n\nPuntuación: ${porcentaje}%\nالنسبة: ${porcentaje}%\n\n${aprobado ? '¡Felicidades! Has aprobado el examen.\nتهانينا! لقد نجحت في الامتحان.' : 'No has alcanzado el mínimo necesario (15/25). Sigue practicando.\nلم تصل إلى الحد الأدنى المطلوب (15/25). استمر في التدريب.'}`,
      [
        {
          text: 'Ver Resultados / عرض النتائج',
          onPress: () => setMostrarResultados(true),
        },
        {
          text: 'Cerrar / إغلاق',
          style: 'cancel',
        },
      ]
    );
  };

  const verExplicacion = (pregunta: Pregunta) => {
    setPreguntaExplicacion(pregunta);
    setMostrarExplicacion(true);
  };

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  // Mostrar loading mientras se verifica el acceso
  if (verificandoAcceso) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9DC3AA" />
        <Text style={styles.loadingText}>Verificando acceso...</Text>
      </View>
    );
  }

  if (!examenIniciado && !examenCompletado) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#9DC3AA" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preparación Examen CCSE</Text>
          <Text style={styles.headerTitleAr}>التحضير لامتحان CCSE</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={48} color="#9DC3AA" />
          <Text style={styles.infoTitle}>Examen CCSE</Text>
          <Text style={styles.infoTitleAr}>امتحان CCSE</Text>
          <Text style={styles.infoText}>
            Prueba de Conocimientos Constitucionales y Socioculturales de España
          </Text>
          <Text style={styles.infoTextAr}>
            اختبار المعرفة الدستورية والاجتماعية والثقافية لإسبانيا
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="document-text" size={24} color="#9DC3AA" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Preguntas:</Text>
              <Text style={styles.detailValue}>25 preguntas</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={24} color="#9DC3AA" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Duración:</Text>
              <Text style={styles.detailValue}>45 minutos</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="checkmark-circle" size={24} color="#9DC3AA" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Para aprobar:</Text>
              <Text style={styles.detailValue}>15/25 (60%)</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="list" size={24} color="#9DC3AA" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Tipo:</Text>
              <Text style={styles.detailValue}>Opción múltiple</Text>
            </View>
          </View>
        </View>

        <View style={styles.categoriesCard}>
          <Text style={styles.categoriesTitle}>Temáticas del examen:</Text>
          <Text style={styles.categoriesTitleAr}>مواضيع الامتحان:</Text>
          <Text style={styles.categoryItem}>• Gobierno, legislación y participación ciudadana (5 preguntas)</Text>
          <Text style={styles.categoryItemAr}>• الحكومة والتشريع والمشاركة المواطنة (5 أسئلة)</Text>
          <Text style={styles.categoryItem}>• Derechos y deberes fundamentales (5 preguntas)</Text>
          <Text style={styles.categoryItemAr}>• الحقوق والواجبات الأساسية (5 أسئلة)</Text>
          <Text style={styles.categoryItem}>• Organización territorial de España (3 preguntas)</Text>
          <Text style={styles.categoryItemAr}>• التنظيم الإقليمي لإسبانيا (3 أسئلة)</Text>
          <Text style={styles.categoryItem}>• Cultura e Historia de España (7 preguntas)</Text>
          <Text style={styles.categoryItemAr}>• الثقافة وتاريخ إسبانيا (7 أسئلة)</Text>
          <Text style={styles.categoryItem}>• Sociedad española (5 preguntas)</Text>
          <Text style={styles.categoryItemAr}>• المجتمع الإسباني (5 أسئلة)</Text>
        </View>

        {!tieneAcceso ? (
          <View style={styles.paymentSection}>
            <View style={styles.paymentInfoCard}>
              <Ionicons name="lock-closed" size={48} color="#9DC3AA" />
              <Text style={styles.paymentInfoTitle}>Acceso al Examen</Text>
              <Text style={styles.paymentInfoText}>
                Para acceder al examen de nacionalidad CCSE, necesitas realizar el pago de {getExamenNacionalidadTotalPrice().toFixed(2)}€ o usar un código de acceso
              </Text>
            </View>

            {/* Selector de método: Pago o Código */}
            <View style={styles.paymentMethodSelector}>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  paymentMethod === 'payment' && styles.paymentMethodButtonActive
                ]}
                onPress={() => setPaymentMethod('payment')}
              >
                <Ionicons 
                  name="card" 
                  size={20} 
                  color={paymentMethod === 'payment' ? '#fff' : '#666'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[
                  styles.paymentMethodText,
                  paymentMethod === 'payment' && styles.paymentMethodTextActive
                ]}>
                  Pagar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  paymentMethod === 'code' && styles.paymentMethodButtonActive
                ]}
                onPress={() => setPaymentMethod('code')}
              >
                <Ionicons 
                  name="key" 
                  size={20} 
                  color={paymentMethod === 'code' ? '#fff' : '#666'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[
                  styles.paymentMethodText,
                  paymentMethod === 'code' && styles.paymentMethodTextActive
                ]}>
                  Código de acceso
                </Text>
              </TouchableOpacity>
            </View>

            {/* Mostrar pago o código según selección */}
            {paymentMethod === 'payment' ? (
              <ExamenNacionalidadPayment
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentCancel={() => {}}
              />
            ) : (
              <ExamenNacionalidadAccessCodeInput
                documento={user?.documento}
                onCodeValid={handleCodeValid}
                onCancel={() => setPaymentMethod('payment')}
              />
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.startButton}
            onPress={iniciarExamen}
          >
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.startButtonGradient}
            >
              <Ionicons name="play-circle" size={32} color="#fff" />
              <Text style={styles.startButtonText}>Iniciar Examen</Text>
              <Text style={styles.startButtonTextAr}>بدء الامتحان</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  if (examenCompletado && mostrarResultados) {
    const correctas = preguntasSeleccionadas.filter(
      (p, i) => respuestas[i] === p.respuesta_correcta
    ).length;
    const porcentaje = Math.round((correctas / 25) * 100);
    const aprobado = correctas >= 15;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setMostrarResultados(false);
              setExamenCompletado(false);
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#9DC3AA" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resultados del Examen</Text>
          <Text style={styles.headerTitleAr}>نتائج الامتحان</Text>
        </View>

        <View style={styles.resultCard}>
          <Ionicons
            name={aprobado ? "checkmark-circle" : "close-circle"}
            size={80}
            color={aprobado ? "#4CAF50" : "#f44336"}
          />
          <Text style={[styles.resultTitle, { color: aprobado ? "#4CAF50" : "#f44336" }]}>
            {aprobado ? "¡Aprobado!" : "No Aprobado"}
          </Text>
          <Text style={[styles.resultTitleAr, { color: aprobado ? "#4CAF50" : "#f44336" }]}>
            {aprobado ? "نجح!" : "لم ينجح"}
          </Text>
          <Text style={styles.resultScore}>
            {correctas} / 25 correctas
          </Text>
          <Text style={styles.resultScoreAr}>
            {correctas} / 25 صحيحة
          </Text>
          <Text style={styles.resultPercentage}>
            {porcentaje}%
          </Text>
        </View>

        <View style={styles.resultsList}>
          {preguntasSeleccionadas.map((pregunta, index) => {
            const respuestaSeleccionada = respuestas[index];
            const esCorrecta = respuestaSeleccionada === pregunta.respuesta_correcta;
            
            return (
              <TouchableOpacity
                key={pregunta.id}
                style={[
                  styles.resultItem,
                  esCorrecta ? styles.resultItemCorrect : styles.resultItemIncorrect,
                ]}
                onPress={() => verExplicacion(pregunta)}
              >
                <Ionicons
                  name={esCorrecta ? "checkmark-circle" : "close-circle"}
                  size={24}
                  color={esCorrecta ? "#4CAF50" : "#f44336"}
                />
                <View style={styles.resultItemText}>
                  <Text style={styles.resultItemQuestion}>
                    Pregunta {index + 1}: {pregunta.pregunta}
                  </Text>
                  {pregunta.pregunta_ar && (
                    <Text style={styles.resultItemQuestionAr}>
                      {pregunta.pregunta_ar}
                    </Text>
                  )}
                  <Text style={styles.resultItemAnswer}>
                    Tu respuesta: {pregunta.opciones[respuestaSeleccionada]}
                  </Text>
                  {pregunta.opciones_ar && pregunta.opciones_ar[respuestaSeleccionada] && (
                    <Text style={styles.resultItemAnswerAr}>
                      {pregunta.opciones_ar[respuestaSeleccionada]}
                    </Text>
                  )}
                  {!esCorrecta && (
                    <>
                      <Text style={styles.resultItemCorrectAnswer}>
                        Correcta: {pregunta.opciones[pregunta.respuesta_correcta]}
                      </Text>
                      {pregunta.opciones_ar && pregunta.opciones_ar[pregunta.respuesta_correcta] && (
                        <Text style={styles.resultItemCorrectAnswerAr}>
                          {pregunta.opciones_ar[pregunta.respuesta_correcta]}
                        </Text>
                      )}
                    </>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => {
            setMostrarResultados(false);
            setExamenCompletado(false);
            setExamenIniciado(false);
          }}
        >
          <LinearGradient
            colors={['#9DC3AA', '#79A890']}
            style={styles.restartButtonGradient}
          >
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.restartButtonText}>Hacer Otro Examen</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const pregunta = preguntasSeleccionadas[preguntaActual];
  const respuestaSeleccionada = respuestas[preguntaActual];

  return (
    <View style={styles.container}>
      <View style={styles.examHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              '¿Salir del examen? / الخروج من الامتحان؟',
              'Si sales ahora, perderás tu progreso.\nإذا خرجت الآن، ستفقد تقدمك.',
              [
                { text: 'Cancelar / إلغاء', style: 'cancel' },
                {
                  text: 'Salir / خروج',
                  style: 'destructive',
                  onPress: () => {
                    setExamenIniciado(false);
                    setExamenCompletado(false);
                  },
                },
              ]
            );
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#9DC3AA" />
        </TouchableOpacity>
        <View style={styles.examHeaderInfo}>
          <Text style={styles.examHeaderText}>
            Pregunta {preguntaActual + 1} de {preguntasSeleccionadas.length}
          </Text>
          <Text style={styles.examHeaderTime}>
            ⏱ {formatearTiempo(tiempoRestante)}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.examContent} contentContainerStyle={styles.examContentContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{pregunta.categoria}</Text>
          {pregunta.categoria_ar && (
            <Text style={styles.categoryBadgeTextAr}>{pregunta.categoria_ar}</Text>
          )}
        </View>

        <Text style={styles.questionText}>{pregunta.pregunta}</Text>
        {pregunta.pregunta_ar && (
          <Text style={styles.questionTextAr}>{pregunta.pregunta_ar}</Text>
        )}

        <View style={styles.optionsContainer}>
          {pregunta.opciones.map((opcion, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                respuestaSeleccionada === index && styles.optionButtonSelected,
              ]}
              onPress={() => seleccionarRespuesta(index)}
            >
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.optionRadio,
                    respuestaSeleccionada === index && styles.optionRadioSelected,
                  ]}
                >
                  {respuestaSeleccionada === index && (
                    <View style={styles.optionRadioInner} />
                  )}
                </View>
                <View style={styles.optionTextContainer}>
                  <Text
                    style={[
                      styles.optionText,
                      respuestaSeleccionada === index && styles.optionTextSelected,
                    ]}
                  >
                    {opcion}
                  </Text>
                  {pregunta.opciones_ar && pregunta.opciones_ar[index] && (
                    <Text
                      style={[
                        styles.optionTextAr,
                        respuestaSeleccionada === index && styles.optionTextArSelected,
                      ]}
                    >
                      {pregunta.opciones_ar[index]}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.examFooter}>
        <TouchableOpacity
          style={[styles.footerButton, preguntaActual === 0 && styles.footerButtonDisabled]}
          onPress={preguntaAnterior}
          disabled={preguntaActual === 0}
        >
          <Ionicons name="chevron-back" size={24} color={preguntaActual === 0 ? "#ccc" : "#9DC3AA"} />
          <Text style={[styles.footerButtonText, preguntaActual === 0 && styles.footerButtonTextDisabled]}>
            Anterior
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.finishButton}
          onPress={finalizarExamen}
        >
          <Ionicons name="checkmark-done" size={24} color="#fff" />
          <Text style={styles.finishButtonText}>Finalizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={siguientePregunta}
        >
          <Text style={styles.footerButtonText}>Siguiente</Text>
          <Ionicons name="chevron-forward" size={24} color="#9DC3AA" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={mostrarExplicacion}
        transparent
        animationType="slide"
        onRequestClose={() => setMostrarExplicacion(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setMostrarExplicacion(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            {preguntaExplicacion && (
              <>
                <Text style={styles.modalTitle}>{preguntaExplicacion.pregunta}</Text>
                {preguntaExplicacion.pregunta_ar && (
                  <Text style={styles.modalTitleAr}>{preguntaExplicacion.pregunta_ar}</Text>
                )}
                <Text style={styles.modalExplanation}>{preguntaExplicacion.explicacion}</Text>
                <Text style={styles.modalExplanationAr}>{preguntaExplicacion.explicacion_ar}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitleAr: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  infoTitleAr: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  infoTextAr: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  categoriesCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoriesTitleAr: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    textAlign: 'right',
  },
  categoryItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  categoryItemAr: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    lineHeight: 18,
    textAlign: 'right',
  },
  startButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
  },
  startButtonGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  startButtonTextAr: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  examHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  examHeaderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  examHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  examHeaderTime: {
    fontSize: 14,
    color: '#f44336',
    marginTop: 4,
  },
  examContent: {
    flex: 1,
  },
  examContentContainer: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: '#9DC3AA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryBadgeTextAr: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 28,
  },
  questionTextAr: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    lineHeight: 24,
    textAlign: 'right',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionButtonSelected: {
    borderColor: '#9DC3AA',
    backgroundColor: '#f0f8f4',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRadioSelected: {
    borderColor: '#9DC3AA',
  },
  optionRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9DC3AA',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#9DC3AA',
  },
  optionTextAr: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
  },
  optionTextArSelected: {
    color: '#79A890',
  },
  examFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  footerButtonDisabled: {
    opacity: 0.5,
  },
  footerButtonText: {
    fontSize: 16,
    color: '#9DC3AA',
    fontWeight: '600',
    marginHorizontal: 5,
  },
  footerButtonTextDisabled: {
    color: '#ccc',
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
  },
  resultTitleAr: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
    color: '#666',
  },
  resultScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  resultScoreAr: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  resultPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9DC3AA',
    marginTop: 10,
  },
  resultsList: {
    marginBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  resultItemCorrect: {
    borderLeftColor: '#4CAF50',
  },
  resultItemIncorrect: {
    borderLeftColor: '#f44336',
  },
  resultItemText: {
    flex: 1,
    marginLeft: 10,
  },
  resultItemQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  resultItemQuestionAr: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'right',
  },
  resultItemAnswer: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  resultItemAnswerAr: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
    marginBottom: 3,
  },
  resultItemCorrectAnswer: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 3,
  },
  resultItemCorrectAnswerAr: {
    fontSize: 11,
    color: '#4CAF50',
    textAlign: 'right',
    marginTop: 2,
  },
  restartButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  restartButtonGradient: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalTitleAr: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'right',
  },
  modalExplanation: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  modalExplanationAr: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  paymentSection: {
    marginTop: 20,
  },
  paymentInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  paymentInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  paymentMethodSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  paymentMethodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  paymentMethodButtonActive: {
    backgroundColor: '#9DC3AA',
    borderColor: '#9DC3AA',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  paymentMethodTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

