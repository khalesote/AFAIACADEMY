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
import CecabankPayment from '../../components/CecabankPayment';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { markAccessCodeAsUsed, initializeAccessCodes, validateAccessCode } from '../../utils/accessCodes';
import { CECABANK_PRICES } from '../../config/cecabank';
import { UserService } from '../../services/userService';
import { auth } from '../../config/firebase';

const ENROLLMENT_PRICES: Record<string, number> = CECABANK_PRICES;

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

type EnrollmentLevel = 'A1' | 'A2' | 'B1' | 'B2';

export default function MatriculaScreen() {
  const router = useRouter();
  const { progress, markUnitCompleted, unlockLevel, reloadProgress } = useUserProgress();
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

  const priceKey = `MATRICULA_${selectedLevel}` as keyof typeof ENROLLMENT_PRICES;
  // Precio especial para A1: 0.01€ (sin descuento)
  const basePrice = selectedLevel === 'A1' ? 0.01 : (ENROLLMENT_PRICES[priceKey] || 0);
  const amount = selectedLevel === 'A1' ? 0.01 : (basePrice * 0.5);
  const operationType = `matricula-${selectedLevel.toLowerCase()}` as string;
  const customerName = `${safeFormData.nombre} ${safeFormData.apellido1} ${safeFormData.apellido2}`.trim();

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
    console.log('✅ [MatriculaScreen] Pago exitoso:', paymentInfo);
    console.log('✅ [MatriculaScreen] Nivel seleccionado:', selectedLevel);
    
    try {
      setIsLoading(true);
      
      const userId = firebaseUser?.uid || null;
      console.log('📝 [MatriculaScreen] Desbloqueando nivel:', selectedLevel, 'para usuario:', userId);
      
      // Desbloquear el nivel seleccionado (esto persiste automáticamente en UserProgressContext)
      await unlockLevel(selectedLevel);
      await reloadProgress();
      console.log('✅ [MatriculaScreen] unlockLevel ejecutado para:', selectedLevel);
      
      // Guardar matrícula en AsyncStorage con clave específica del usuario
      const matriculaKey = userId ? `matricula_${selectedLevel}_completada_${userId}` : `matricula_${selectedLevel}_completada_guest`;
      await AsyncStorage.setItem(matriculaKey, 'true');
      console.log('✅ [MatriculaScreen] Matrícula guardada en AsyncStorage:', matriculaKey);
      
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
            fechaMatricula: new Date().toISOString(),
            nivelesDesbloqueados: {
              [selectedLevel]: true
            }
          });
          console.log('✅ [MatriculaScreen] Matrícula guardada en Firebase');
        } catch (firebaseError) {
          console.error('⚠️ [MatriculaScreen] Error guardando en Firebase (no crítico):', firebaseError);
        }
      }

      // Esperar un momento para asegurar que todo se guardó
      await new Promise(resolve => setTimeout(resolve, 300));

      Alert.alert(
        '✅ Matrícula Exitosa',
        `¡Felicidades! Tu matrícula para ${selectedLevel} ha sido procesada correctamente.`,
        [
          {
            text: 'Ir a la Escuela Virtual',
            onPress: () => {
              console.log('🔄 [MatriculaScreen] Navegando a SchoolScreen con refresh');
              router.replace({
                pathname: '/(tabs)/SchoolScreen',
                params: { 
                  refresh: Date.now(),
                  matriculado: selectedLevel
                }
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('❌ [MatriculaScreen] Error procesando matrícula:', error);
      Alert.alert('Error', 'Hubo un error al procesar tu matrícula. Por favor, contacta soporte.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeValid = async (code: string) => {
    console.log('🚀 ===== handleCodeValid INICIADO =====');
    console.log('🚀 Código recibido:', code);
    console.log('🚀 Nivel seleccionado:', selectedLevel);
    try {
      setIsLoading(true);
      
      const documento = safeFormData.documento || '';
      const userId = firebaseUser?.uid || null;
      
      console.log('🔍 Validando código para nivel:', selectedLevel, 'con documento:', documento || 'sin documento');
      
      const result = await validateAccessCode(code, selectedLevel, documento);
      
      console.log('📋 Resultado de validación:', result);
      
      if (!result.valid) {
        console.log('❌ Código inválido:', result.message);
        Alert.alert('Código Inválido', result.message);
        setIsLoading(false);
        return;
      }
      
      console.log('✅ Código válido, marcando como usado...');
      
      // Marcar el código como usado
      await markAccessCodeAsUsed(code, selectedLevel, documento);
      console.log('✅ Código marcado como usado en Firebase');
      
      // Desbloquear el nivel seleccionado
      console.log('[MatriculaScreen] Iniciando desbloqueo para:', selectedLevel);
      await unlockLevel(selectedLevel);
      await reloadProgress();
      
      // Guardar con claves específicas del usuario
      const matriculaKey = userId ? `matricula_${selectedLevel}_completada_${userId}` : `matricula_${selectedLevel}_completada_guest`;
      const accessCodeKey = userId ? `access_code_${selectedLevel}_valid_${userId}` : `access_code_${selectedLevel}_valid_guest`;
      await AsyncStorage.setItem(matriculaKey, 'true');
      await AsyncStorage.setItem(accessCodeKey, 'true');
      console.log(`✅ Nivel ${selectedLevel} desbloqueado y guardado con claves:`, matriculaKey, accessCodeKey);
      
      // Guardar información del código en AsyncStorage
      await AsyncStorage.setItem('lastCodeUsed', JSON.stringify({
        code: code,
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
            fechaMatricula: new Date().toISOString(),
            nivelesDesbloqueados: {
              [selectedLevel]: true
            }
          });
          console.log('✅ Matrícula guardada en Firebase');
        } catch (firebaseError) {
          console.error('⚠️ Error guardando en Firebase (no crítico):', firebaseError);
        }
      }

      // Esperar un momento para asegurar que todo se guardó
      await new Promise(resolve => setTimeout(resolve, 300));

      Alert.alert(
        '✅ Código Válido',
        `¡Felicidades! Tu código ha sido validado y tienes acceso a ${selectedLevel}.`,
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
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/SchoolScreen')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>
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
          ) : null}
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
                  <Text style={styles.discountedPrice}>0.01€</Text>
                  <Text style={styles.ivaText}> (impuestos incluidos)</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Precio especial de prueba</Text>
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
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_A2 * 0.5).toFixed(2)}€</Text>
                  <Text style={styles.ivaText}> (impuestos incluidos)</Text>
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
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_B1 * 0.5).toFixed(2)}€</Text>
                  <Text style={styles.ivaText}> (impuestos incluidos)</Text>
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
                  <Text style={styles.discountedPrice}>{(ENROLLMENT_PRICES.MATRICULA_B2 * 0.5).toFixed(2)}€</Text>
                  <Text style={styles.ivaText}> (impuestos incluidos)</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>🔥 Descuento tiempo limitado 50%</Text>
            </View>
            <Text style={styles.optionDescription}>Acceso al nivel B2: Avanzado</Text>
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
            <CecabankPayment
              operationType={operationType}
              amount={amount}
              description={`Matrícula ${selectedLevel}`}
              customerEmail={safeFormData.email || undefined}
              customerName={customerName || undefined}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentCancel={() => setPaymentMethod('code')}
              onPaymentError={(error) => Alert.alert('Error de pago', error)}
            />
            {isLoading && (
              <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 10 }} />
            )}
          </View>
        ) : (
          <AccessCodeInput
            key={`access-code-${selectedLevel}`}
            documento={safeFormData.documento}
            level={selectedLevel}
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
  topBar: {
    width: '100%',
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFD700',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
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
    color: '#FFD700',
  },
  dataValue: {
    fontSize: 16,
    color: '#FFD700',
    flex: 1,
    textAlign: 'right',
  },
  enrollmentOptions: {
    marginBottom: 20,
  },
  enrollmentOption: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#333',
  },
  selectedOption: {
    borderColor: '#FFD700',
    backgroundColor: '#222',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 10,
  },
  optionDescription: {
    fontSize: 14,
    color: '#FFD700',
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
    color: '#FFD700',
  },
  ivaText: {
    fontSize: 12,
    color: '#FFD700',
  },
  discountBadge: {
    fontSize: 12,
    color: '#FFD700',
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
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },
  paymentMethodButtonActive: {
    borderColor: '#FFD700',
    backgroundColor: '#222',
  },
  paymentMethodButtonText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
  },
  paymentMethodButtonTextActive: {
    color: '#FFD700',
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
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },
  paymentProviderButtonActive: {
    borderColor: '#FFD700',
    backgroundColor: '#222',
  },
  paymentProviderText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
  },
  paymentProviderTextActive: {
    color: '#FFD700',
  },
  securityText: {
    textAlign: 'center',
    color: '#FFD700',
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
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  noDataSubtext: {
    fontSize: 14,
    color: '#FFD700',
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
