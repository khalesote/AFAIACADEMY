import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import FormacionAccessCodeInput from './FormacionAccessCodeInput';
import { markFormacionCodeAsUsed } from '../utils/accessCodes';
import { useUser } from '@/contexts/UserContext';

const PRECIO_BASE = 0.01; // 0.01 euros para pruebas
const IVA_RATE = 0.21; // 21% IVA

interface CursoIndividualPaymentProps {
  curso: {
    key: string;
    label: string;
    labelAr: string;
    descripcion?: string;
    descripcionAr?: string;
    icon: string;
    color: string;
    screen: string;
  };
  onPaymentSuccess: (cursoKey: string) => void;
  onCancel: () => void;
  visible: boolean;
}

export default function CursoIndividualPayment({ 
  curso, 
  onPaymentSuccess, 
  onCancel, 
  visible 
}: CursoIndividualPaymentProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metodoAcceso, setMetodoAcceso] = useState<'pago' | 'codigo'>('pago');

  const basePrice = PRECIO_BASE;
  const iva = basePrice * IVA_RATE;
  const totalPrice = Math.round((basePrice + iva) * 100) / 100;

  const handlePayment = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);

      console.log('💳 Iniciando pago para curso:', curso.key);
      console.log('💰 Precio:', { basePrice, iva, totalPrice });

      // 1. Crear Payment Intent
      const endpoint = 'https://academia-backend-s9np.onrender.com/api/create-payment-intent';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          amount: Math.round(totalPrice * 100), // Stripe usa centavos
          currency: 'eur',
          description: `Curso: ${curso.label}`,
          tipo: 'curso-individual',
          cursoKey: curso.key
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const responseData = await response.json();
      const { clientSecret, paymentIntentId } = responseData;
      
      if (!clientSecret) {
        throw new Error('No se pudo iniciar el proceso de pago.');
      }

      // 2. Inicializar la hoja de pago
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Academia de Inmigrantes',
        returnURL: 'academiadeinmigrantes://stripe-redirect',
      });

      if (initError) {
        throw initError;
      }

      // 3. Mostrar la hoja de pago
      const { error: paymentError } = await presentPaymentSheet();
      
      if (paymentError) {
        if (paymentError.code === 'Canceled') {
          console.log('⏹️ Pago cancelado por el usuario');
          return;
        }
        throw paymentError;
      }

      // 4. Pago exitoso
      console.log('✅ Pago exitoso para curso:', curso.key);
      
      // Guardar acceso al curso en AsyncStorage
      const cursoAccessKey = `@curso_${curso.key}_access`;
      await AsyncStorage.setItem(cursoAccessKey, JSON.stringify({
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        paymentIntentId,
        cursoKey: curso.key,
        cursoLabel: curso.label
      }));

      Alert.alert(
        '¡Pago Exitoso!',
        `Has adquirido el curso "${curso.label}". Ya puedes acceder al contenido completo.`,
        [
          {
            text: 'Ver Curso',
            onPress: () => {
              onPaymentSuccess(curso.key);
            }
          }
        ]
      );

    } catch (err: any) {
      console.error('❌ Error en el proceso de pago:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      Alert.alert('Error en el pago', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeValid = async (code: string) => {
    try {
      if (!user || !user.documento) {
        Alert.alert(
          'Documento Requerido',
          'Necesitas tener tu documento registrado para usar códigos de acceso.',
          [{ text: 'OK' }]
        );
        return;
      }

      await markFormacionCodeAsUsed(code, user.documento);

      // Guardar acceso al curso individual
      const cursoAccessKey = `@curso_${curso.key}_access`;
      await AsyncStorage.setItem(cursoAccessKey, JSON.stringify({
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        cursoKey: curso.key,
        cursoLabel: curso.label,
        metodo: 'codigo',
        codigo: code
      }));

      // También guardar acceso general a formación profesional si no existe
      const accesoGeneral = await AsyncStorage.getItem('@acceso_formacion_profesional');
      if (!accesoGeneral) {
        await AsyncStorage.setItem('@acceso_formacion_profesional', JSON.stringify({
          tieneAcceso: true,
          fechaCompra: new Date().toISOString(),
          expira: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          metodo: 'codigo',
          codigo: code,
        }));
      }

      Alert.alert(
        '¡Acceso Activado!',
        `Has obtenido acceso al curso "${curso.label}" usando el código de acceso.`,
        [
          {
            text: 'Ver Curso',
            onPress: () => {
              onPaymentSuccess(curso.key);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error procesando código:', error);
      Alert.alert(
        'Error',
        'No se pudo procesar el código de acceso. Por favor, inténtalo de nuevo.'
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: curso.color }]}>
              <Ionicons name={curso.icon as any} size={40} color="#fff" />
              <Text style={styles.cursoTitle}>{curso.label}</Text>
            </View>

            {/* Información del curso */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Sobre este curso</Text>
              {curso.descripcion ? (
                <Text style={styles.description}>{curso.descripcion}</Text>
              ) : (
                <Text style={styles.description}>
                  Este curso te proporcionará las habilidades y conocimientos necesarios 
                  para trabajar en este sector. Incluye vocabulario específico, 
                  técnicas prácticas y preparación para el mercado laboral español.
                </Text>
              )}

              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Vocabulario específico del sector</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Técnicas y conocimientos prácticos</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Preparación para el mercado laboral</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Acceso completo al contenido</Text>
                </View>
              </View>
            </View>

            {/* Selector de método de acceso */}
            <View style={styles.metodoSelector}>
              <TouchableOpacity
                style={[
                  styles.metodoButton,
                  metodoAcceso === 'pago' && styles.metodoButtonActive
                ]}
                onPress={() => setMetodoAcceso('pago')}
              >
                <Ionicons 
                  name="card" 
                  size={20} 
                  color={metodoAcceso === 'pago' ? '#fff' : '#666'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[
                  styles.metodoText,
                  metodoAcceso === 'pago' && styles.metodoTextActive
                ]}>
                  Pagar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.metodoButton,
                  metodoAcceso === 'codigo' && styles.metodoButtonActive
                ]}
                onPress={() => setMetodoAcceso('codigo')}
              >
                <Ionicons 
                  name="key" 
                  size={20} 
                  color={metodoAcceso === 'codigo' ? '#fff' : '#666'} 
                  style={{ marginRight: 8 }}
                />
                <Text style={[
                  styles.metodoText,
                  metodoAcceso === 'codigo' && styles.metodoTextActive
                ]}>
                  Código
                </Text>
              </TouchableOpacity>
            </View>

            {metodoAcceso === 'pago' ? (
              <>
                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.payButton, { flex: 1 }]}
                    onPress={handlePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.payButtonText}>Pagar con Stripe</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton, { flex: 1 }]}
                    onPress={onCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.codigoContainer}>
                <FormacionAccessCodeInput
                  documento={user?.documento || ''}
                  onCodeValid={handleCodeValid}
                  onCancel={() => setMetodoAcceso('pago')}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cursoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  benefitsList: {
    marginTop: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  priceBreakdown: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#4CAF50',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  metodoSelector: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  metodoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  metodoButtonActive: {
    backgroundColor: '#9DC3AA',
    borderColor: '#79A890',
  },
  metodoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  metodoTextActive: {
    color: '#fff',
  },
  codigoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

