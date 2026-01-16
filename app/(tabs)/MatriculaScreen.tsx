import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useUser } from '@/contexts/UserContext';
import AccessCodeInput from '../../components/AccessCodeInput';
import StripePayment from '../../components/StripePayment';
import { MaterialIcons } from '@expo/vector-icons';
import { markAccessCodeAsUsed, initializeAccessCodes } from '../../utils/accessCodes';
import { UserService } from '../../services/userService';
import { auth } from '../../config/firebase';

const ENROLLMENT_PRICES: Record<string, number> = {
  MATRICULA_A1: 36,
  MATRICULA_A2: 48,
  MATRICULA_B1: 60,
  MATRICULA_B2: 80,
  MATRICULA_A1A2: 60,
  MATRICULA_B1B2: 120,
};

// Definir la interfaz para los datos del formulario
interface FormData {
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string;
  provincia: string;
  telefono: string;
  tipoDocumento: string;
  documento: string;
  email?: string;
}

type EnrollmentLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'A1A2' | 'B1B2';

export default function MatriculaScreen() {
  const router = useRouter();
  const { progress, markUnitCompleted, unlockLevel } = useUserProgress();
  const { user: firebaseUser, isAuthenticated } = useUser();
  const { level: selectedLevelParam } = useLocalSearchParams<{ level?: string }>();
  
  const [selectedLevel, setSelectedLevel] = useState<EnrollmentLevel>('A1');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [safeFormData, setSafeFormData] = useState<FormData>({
    nombre: '',
    apellido1: '',
    apellido2: '',
    fechaNacimiento: '',
    provincia: '',
    telefono: '',
    tipoDocumento: '',
    documento: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'payment' | 'code'>('payment');

  useEffect(() => {
    if (selectedLevelParam) {
      setSelectedLevel(selectedLevelParam as EnrollmentLevel);
    }
    loadFormData();
    initializeAccessCodes();
  }, [selectedLevelParam]);

  const loadFormData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('matriculaFormData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        setSafeFormData({
          nombre: parsed.nombre || '',
          apellido1: parsed.apellido1 || '',
          apellido2: parsed.apellido2 || '',
          fechaNacimiento: parsed.fechaNacimiento || '',
          provincia: parsed.provincia || '',
          telefono: parsed.telefono || '',
          tipoDocumento: parsed.tipoDocumento || '',
          documento: parsed.documento || '',
          email: parsed.email || ''
        });
      }
    } catch (error) {
      console.error('Error cargando datos del formulario:', error);
    }
  };

  const handleSelectLevel = (level: EnrollmentLevel) => {
    setSelectedLevel(level);
  };

  const handlePaymentSuccess = async (paymentInfo: any) => {
    console.log('✅ Pago exitoso:', paymentInfo);
    
    try {
      setIsLoading(true);
      
      console.log('📝 Desbloqueando niveles para:', selectedLevel);
      
      // Desbloquear niveles según la matrícula seleccionada
      if (selectedLevel === 'A1' || selectedLevel === 'A1A2') {
        unlockLevel('A1');
        console.log('✅ Nivel A1 desbloqueado');
      }
      if (selectedLevel === 'A2' || selectedLevel === 'A1A2') {
        unlockLevel('A2');
        console.log('✅ Nivel A2 desbloqueado');
      }
      if (selectedLevel === 'B1' || selectedLevel === 'B1B2') {
        unlockLevel('B1');
        console.log('✅ Nivel B1 desbloqueado');
      }
      if (selectedLevel === 'B2' || selectedLevel === 'B1B2') {
        unlockLevel('B2');
        console.log('✅ Nivel B2 desbloqueado');
      }
      
      // Guardar información del pago en AsyncStorage
      await AsyncStorage.setItem('lastPayment', JSON.stringify({
        ...paymentInfo,
        level: selectedLevel,
        timestamp: new Date().toISOString()
      }));

      // Guardar información de matrícula en Firebase si el usuario está autenticado
      if (firebaseUser && 'uid' in firebaseUser) {
        try {
          await UserService.updateUserProfile({
            matriculado: true,
            matriculado_escuela_virtual: true,
            nivelMatricula: selectedLevel,
            fechaMatricula: new Date().toISOString()
          });
          console.log('✅ Matrícula guardada en Firebase');
        } catch (firebaseError) {
          console.error('⚠️ Error guardando en Firebase (no crítico):', firebaseError);
        }
      }

      Alert.alert(
        '✅ Matrícula Exitosa',
        `¡Felicidades! Tu matrícula para ${selectedLevel} ha sido procesada correctamente.`,
        [
          {
            text: 'Ir a la Escuela Virtual',
            onPress: () => router.replace({
              pathname: '/(tabs)/SchoolScreen',
              params: { 
                refresh: Date.now(),
                matriculado: selectedLevel
              }
            })
          }
        ]
      );
    } catch (error) {
      console.error('Error procesando matrícula:', error);
      Alert.alert('Error', 'Hubo un error al procesar tu matrícula. Por favor, contacta soporte.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeValid = async (code: string) => {
    try {
      setIsLoading(true);
      
      // Simular validación de código (sin usar markAccessCodeAsUsed)
      console.log('� Validando código:', code);
      
      // Guardar información del código en AsyncStorage
      await AsyncStorage.setItem('lastCodeUsed', JSON.stringify({
        code: code,
        level: selectedLevel,
        timestamp: new Date().toISOString()
      }));

      Alert.alert(
        '✅ Código Válido',
        `¡Felicidades! Tu código ha sido validado y tienes acceso a ${selectedLevel}.`,
        [
          {
            text: 'Ir a la Escuela Virtual',
            onPress: () => router.replace('/(tabs)/SchoolScreen')
          }
        ]
      );
    } catch (error) {
      console.error('Error validando código:', error);
      Alert.alert('Error', 'Hubo un error al validar tu código. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Siempre mostrar el formulario, incluso si no hay datos guardados
  // El usuario puede completar los datos directamente en la pantalla

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Selecciona tu matrícula</Text>
        
        <View style={styles.dataContainer}>
          {safeFormData.nombre ? (
            <>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Nombre:</Text>
                <Text style={styles.dataValue}>
                  {safeFormData.nombre} {safeFormData.apellido1} {safeFormData.apellido2 || ''}
                </Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Documento:</Text>
                <Text style={styles.dataValue}>
                  {safeFormData.tipoDocumento} {safeFormData.documento}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                ⚠️ No se encontraron datos del formulario.
              </Text>
              <Text style={styles.noDataSubtext}>
                Por favor, completa el formulario de matrícula primero.
              </Text>
              <TouchableOpacity
                style={styles.formButton}
                onPress={() => router.push('/')}
              >
                <Text style={styles.formButtonText}>Ir al Formulario</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Opciones de matrícula */}
        <View style={styles.enrollmentOptions}>
          <Text style={styles.sectionSubtitleBlack}>Niveles Individuales</Text>
          
          {/* Matrícula A1 */}
          <TouchableOpacity 
            style={[
              styles.enrollmentOption, 
              selectedLevel === 'A1' && styles.selectedOption
            ]}
            onPress={() => handleSelectLevel('A1')}
          >
            <View style={styles.optionHeader}>
              <MaterialIcons 
                name={selectedLevel === 'A1' ? 'lock-open' : 'lock-outline'} 
                size={24} 
                color={selectedLevel === 'A1' ? '#4CAF50' : '#666'} 
              />
              <Text style={styles.optionTitle}>Nivel A1</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{ENROLLMENT_PRICES.MATRICULA_A1}€</Text>
                <View style={styles.discountedPriceContainer}>
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_A1 * 0.5).toFixed(0)}€</Text>
                  <Text style={styles.ivaText}> + IVA</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso al nivel A1: Acceso</Text>
          </TouchableOpacity>

          {/* Matrícula A2 */}
          <TouchableOpacity 
            style={[
              styles.enrollmentOption, 
              selectedLevel === 'A2' && styles.selectedOption
            ]}
            onPress={() => handleSelectLevel('A2')}
          >
            <View style={styles.optionHeader}>
              <MaterialIcons 
                name={selectedLevel === 'A2' ? 'lock-open' : 'lock-outline'} 
                size={24} 
                color={selectedLevel === 'A2' ? '#4CAF50' : '#666'} 
              />
              <Text style={styles.optionTitle}>Nivel A2</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{ENROLLMENT_PRICES.MATRICULA_A2}€</Text>
                <View style={styles.discountedPriceContainer}>
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_A2 * 0.5).toFixed(0)}€</Text>
                  <Text style={styles.ivaText}> + IVA</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso al nivel A2: Plataforma</Text>
          </TouchableOpacity>

          {/* Matrícula B1 */}
          <TouchableOpacity 
            style={[
              styles.enrollmentOption, 
              selectedLevel === 'B1' && styles.selectedOption
            ]}
            onPress={() => handleSelectLevel('B1')}
          >
            <View style={styles.optionHeader}>
              <MaterialIcons 
                name={selectedLevel === 'B1' ? 'lock-open' : 'lock-outline'} 
                size={24} 
                color={selectedLevel === 'B1' ? '#4CAF50' : '#666'} 
              />
              <Text style={styles.optionTitle}>Nivel B1</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{ENROLLMENT_PRICES.MATRICULA_B1}€</Text>
                <View style={styles.discountedPriceContainer}>
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_B1 * 0.5).toFixed(0)}€</Text>
                  <Text style={styles.ivaText}> + IVA</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso al nivel B1: Umbral</Text>
          </TouchableOpacity>

          {/* Matrícula B2 */}
          <TouchableOpacity 
            style={[
              styles.enrollmentOption, 
              selectedLevel === 'B2' && styles.selectedOption
            ]}
            onPress={() => handleSelectLevel('B2')}
          >
            <View style={styles.optionHeader}>
              <MaterialIcons 
                name={selectedLevel === 'B2' ? 'lock-open' : 'lock-outline'} 
                size={24} 
                color={selectedLevel === 'B2' ? '#4CAF50' : '#666'} 
              />
              <Text style={styles.optionTitle}>Nivel B2</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{ENROLLMENT_PRICES.MATRICULA_B2}€</Text>
                <View style={styles.discountedPriceContainer}>
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_B2 * 0.5).toFixed(0)}€</Text>
                  <Text style={styles.ivaText}> + IVA</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso al nivel B2: Avanzado</Text>
          </TouchableOpacity>

          {/* Paquetes Combinados */}
          <Text style={styles.sectionSubtitleBlack}>Paquetes Combinados</Text>
          
          {/* Matrícula A1+A2 */}
          <TouchableOpacity 
            style={[
              styles.enrollmentOption, 
              selectedLevel === 'A1A2' && styles.selectedOption
            ]}
            onPress={() => handleSelectLevel('A1A2')}
          >
            <View style={styles.optionHeader}>
              <MaterialIcons 
                name={selectedLevel === 'A1A2' ? 'lock-open' : 'lock-outline'} 
                size={24} 
                color={selectedLevel === 'A1A2' ? '#4CAF50' : '#666'} 
              />
              <Text style={styles.optionTitle}>Paquete A1 + A2</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{ENROLLMENT_PRICES.MATRICULA_A1A2}€</Text>
                <View style={styles.discountedPriceContainer}>
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_A1A2 * 0.5).toFixed(0)}€</Text>
                  <Text style={styles.ivaText}> + IVA</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso completo a niveles A1 y A2</Text>
          </TouchableOpacity>

          {/* Matrícula B1+B2 */}
          <TouchableOpacity 
            style={[
              styles.enrollmentOption, 
              selectedLevel === 'B1B2' && styles.selectedOption
            ]}
            onPress={() => handleSelectLevel('B1B2')}
          >
            <View style={styles.optionHeader}>
              <MaterialIcons 
                name={selectedLevel === 'B1B2' ? 'lock-open' : 'lock-outline'} 
                size={24} 
                color={selectedLevel === 'B1B2' ? '#4CAF50' : '#666'} 
              />
              <Text style={styles.optionTitle}>Paquete B1 + B2</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>{ENROLLMENT_PRICES.MATRICULA_B1B2}€</Text>
                <View style={styles.discountedPriceContainer}>
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_B1B2 * 0.5).toFixed(0)}€</Text>
                  <Text style={styles.ivaText}> + IVA</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso completo a niveles B1 y B2</Text>
          </TouchableOpacity>
        </View>

        {/* Método de pago */}
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.sectionTitle}>Método de pago</Text>
          
          <View style={styles.paymentMethodButtons}>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === 'payment' && styles.paymentMethodButtonActive
              ]}
              onPress={() => setPaymentMethod('payment')}
            >
              <Text style={[
                styles.paymentMethodButtonText,
                paymentMethod === 'payment' && styles.paymentMethodButtonTextActive
              ]}>
                💳 Pago Online
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === 'code' && styles.paymentMethodButtonActive
              ]}
              onPress={() => setPaymentMethod('code')}
            >
              <Text style={[
                styles.paymentMethodButtonText,
                paymentMethod === 'code' && styles.paymentMethodButtonTextActive
              ]}>
                🎫 Código de Acceso
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Proceso de pago o código */}
        {paymentMethod === 'payment' ? (
          <View style={styles.paymentContainer}>
            <StripePayment
              level={selectedLevel}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentCancel={() => setPaymentMethod('code')}
            />
            {isLoading && (
              <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 10 }} />
            )}
          </View>
        ) : (
          <AccessCodeInput
            documento={safeFormData.documento}
            onCodeValid={handleCodeValid}
            onCancel={() => setPaymentMethod('payment')}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionSubtitleBlack: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
    marginTop: 20,
  },
  dataContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dataValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  enrollmentOptions: {
    marginBottom: 20,
  },
  enrollmentOption: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  priceContainer: {
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountedPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ivaText: {
    fontSize: 12,
    color: '#666',
  },
  discountBadge: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '600',
    marginTop: 5,
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethodButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  paymentMethodButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  paymentMethodButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  paymentMethodButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  paymentMethodButtonTextActive: {
    color: '#4CAF50',
  },
  paymentContainer: {
    marginTop: 20,
  },
  paymentProviderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentProviderButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  paymentProviderButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  paymentProviderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  paymentProviderTextActive: {
    color: '#4CAF50',
  },
  securityText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 10,
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 10,
  },
  noDataSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  formButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  formButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
});
