import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { userDB } from '../utils/userDatabase';
import { STRIPE_FORMACION } from '../config/stripeFormacion';
import { asyncSafe } from '../utils/asyncSafe';

const PRECIO_NORMAL = 10; // 10 euros
const DESCUENTO_ESCUELA = 0.5; // 50% de descuento
interface FormacionPaymentProps {
  onPaymentSuccess?: () => void;
  emailForRegistration?: string;
}

export default function FormacionPayment({ onPaymentSuccess, emailForRegistration }: FormacionPaymentProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tieneDescuento, setTieneDescuento] = useState(false);
  const [precioFinal, setPrecioFinal] = useState(PRECIO_NORMAL);
  // Cargar el usuario actual y verificar descuento
  useEffect(() => {
    let isMounted = true;
    
    const verificarDescuento = async () => {
      try {
        setLoading(true);
        
        // 1. Obtener el usuario actual
        const user = await userDB.getCurrentUser();
        console.log('=== VERIFICANDO DESCUENTO ===');
        console.log('Usuario actual:', {
          email: user?.email,
          matriculado: user?.matriculado,
          matriculado_escuela_virtual: user?.matriculado_escuela_virtual
        });
        
        if (!user) {
          console.log('No se pudo obtener el usuario actual');
          return;
        }
        
        // 2. Verificar si el usuario tiene derecho a descuento
        // Verificar tanto matriculado_escuela_virtual como matriculado para mayor robustez
        const tieneDerechoADescuento = user.matriculado_escuela_virtual === true || user.matriculado === true;
        
        console.log('=== ESTADO DE MATRÍCULA ===');
        console.log('Usuario:', user.email);
        console.log('Matriculado en escuela virtual:', user.matriculado_escuela_virtual);
        console.log('Matriculado:', user.matriculado);
        console.log('Tiene derecho a descuento?', tieneDerechoADescuento);
        
        // 3. Aplicar descuento si corresponde
        if (isMounted) {
          if (tieneDerechoADescuento) {
            const precioConDescuento = PRECIO_NORMAL * (1 - DESCUENTO_ESCUELA);
            setTieneDescuento(true);
            setPrecioFinal(precioConDescuento);
            console.log(`✅ Descuento aplicado (${DESCUENTO_ESCUELA * 100}%) - Precio final: ${precioConDescuento}€`);
          } else {
            setTieneDescuento(false);
            setPrecioFinal(PRECIO_NORMAL);
            console.log(`ℹ️ Sin descuento aplicable - Precio normal: ${PRECIO_NORMAL}€`);
          }
        }
        
      } catch (error) {
        console.error('Error al verificar descuento:', error);
        if (isMounted) {
          setError('Error al verificar descuento');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    verificarDescuento();
    
    // Configurar un intervalo para verificar cambios periódicamente (cada 5 segundos)
    const intervalId = setInterval(verificarDescuento, 5000);
    
    // Limpiar al desmontar
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handlePayment = async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 1. Crear el PaymentIntent en el backend
      const response = await fetch(`${STRIPE_FORMACION.API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(precioFinal * 100), // Convertir a céntimos
          currency: 'eur', // Euros
          description: 'Acceso a Formación Profesional' + (tieneDescuento ? ' (50% descuento)' : ''),
          tipo: 'formacion-profesional',
          bloque: 'formacion-profesional',
          returnUrl: STRIPE_FORMACION.RETURN_URL,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const { clientSecret } = await response.json();
      
      if (!clientSecret) {
        throw new Error('No se recibió el clientSecret del servidor');
      }

      // 2. Inicializar la hoja de pago
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Academia de Inmigrantes',
        style: 'automatic',
        appearance: {
          colors: {
            primary: '#4CAF50',
          },
        },
      });

      if (initError) {
        throw initError;
      }

      // 3. Mostrar la hoja de pago
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        // El usuario canceló el pago
        if (paymentError.code === 'Canceled') {
          return;
        }
        throw paymentError;
      }

      // 4. Pago exitoso - Registrar usuario y guardar acceso
      console.log('💰 Procesando pago exitoso...');

      // Verificar si el usuario está autenticado
      const firebaseModule = await asyncSafe(() => import('firebase/auth'), { context: 'FormacionPayment/firebase-auth' });
      if (!firebaseModule) {
        throw new Error('No se pudo cargar firebase/auth');
      }
      const { getAuth } = firebaseModule;
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        console.log('✅ Usuario ya autenticado:', currentUser.email);

        // Actualizar estado de matrícula
        const userServiceModule = await asyncSafe(() => import('../services/userService'), { context: 'FormacionPayment/UserService-update' });
        if (!userServiceModule) {
          throw new Error('No se pudo cargar services/userService');
        }
        const { UserService } = userServiceModule;
        const { success: updateSuccess } = await UserService.updateUserProfile({
          matriculado: true,
          matriculado_escuela_virtual: true
        });

        if (updateSuccess) {
          console.log('✅ Estado de matrícula actualizado en Firestore');
          console.log('🔍 Datos actualizados del usuario:', {
            uid: currentUser.uid,
            email: currentUser.email,
            matriculado_escuela_virtual: true
          });

          // Verificar inmediatamente si los datos se guardaron correctamente
          setTimeout(async () => {
            try {
              const userServiceModuleTimeout = await asyncSafe(() => import('../services/userService'), { context: 'FormacionPayment/UserService-timeout' });
              if (!userServiceModuleTimeout) {
                return;
              }
              const { UserService } = userServiceModuleTimeout;
              const verificationProfile = await UserService.getCurrentUser();
              console.log('🔍 Verificación inmediata - Datos en Firestore:', {
                matriculado_escuela_virtual: verificationProfile?.matriculado_escuela_virtual,
                email: verificationProfile?.email
              });
            } catch (error) {
              console.error('❌ Error en verificación inmediata:', error);
            }
          }, 1000);

          // Forzar actualización del contexto después de actualizar el perfil
          setTimeout(async () => {
            try {
              console.log('🔄 Forzando actualización del contexto...');
              // El contexto se actualizará automáticamente en el siguiente render
            } catch (error) {
              console.log('⚠️ Error en actualización forzada:', error);
            }
          }, 1000);
        } else {
          console.log('❌ Error actualizando estado de matrícula');
        }
      } else {
        console.log('❌ Usuario no autenticado después del pago');

        // Intentar registro automático con email proporcionado o intentar obtener del contexto
        let emailToUse = emailForRegistration;

        if (!emailToUse) {
          // Intentar obtener email del contexto de usuario si existe
          try {
            const userDbModule = await asyncSafe(() => import('../utils/userDatabase'), { context: 'FormacionPayment/userDatabase' });
            if (userDbModule?.userDB) {
              const currentUserData = await userDbModule.userDB.getCurrentUser();
              if (currentUserData?.email) {
                emailToUse = currentUserData.email;
                console.log('📧 Email obtenido del contexto:', emailToUse);
              }
            }
          } catch (error) {
            console.log('⚠️ No se pudo obtener email del contexto');
          }
        }

        if (emailToUse) {
          console.log('🔄 Intentando registro automático con email:', emailToUse);

          const userServiceModule = await asyncSafe(() => import('../services/userService'), { context: 'FormacionPayment/UserService-autoRegister' });
          if (!userServiceModule) {
            throw new Error('No se pudo cargar services/userService');
          }
          const { UserService } = userServiceModule;

          const { user, error, isNewUser } = await UserService.autoRegisterAfterPayment({
            email: emailToUse,
            firstName: 'Usuario',
            lastName: 'Formación Profesional',
            nivelMatricula: 'Formación Profesional'
          });

          if (error) {
            console.error('❌ Error en registro automático:', error);
          } else {
            console.log(isNewUser ? '✅ Nuevo usuario registrado' : '✅ Usuario existente actualizado');

            // Forzar actualización del contexto después del registro automático
            setTimeout(async () => {
              try {
                console.log('🔄 Forzando actualización del contexto después del registro automático...');
                // El contexto se actualizará automáticamente en el siguiente render
              } catch (error) {
                console.log('⚠️ Error en actualización después del registro:', error);
              }
            }, 1000);
          }
        } else {
          console.log('⚠️ No hay email disponible para registro automático');
        }
      }

      // Guardar acceso local
      const accessData = {
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        expira: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      };

      await AsyncStorage.setItem('@acceso_formacion_profesional', JSON.stringify(accessData));
      console.log('💾 Acceso guardado en almacenamiento local');

      // Llamar al callback de éxito si existe
      if (onPaymentSuccess) {
        onPaymentSuccess();
      } else {
        router.replace('/(tabs)/PreFormacionScreen');
      }
      
    } catch (err) {
      console.error('Error en el proceso de pago:', err);
      setError('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {tieneDescuento && (
        <View style={styles.descuentosContainer}>
          <Text style={styles.precioOriginal}>{`${PRECIO_NORMAL.toFixed(2)}€`}</Text>
          <View style={styles.descuentosBadge}>
            <Text style={styles.descuentosText}>50% OFF</Text>
          </View>
        </View>
      )}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>
          {precioFinal.toFixed(2)}€ / año
        </Text>
        {tieneDescuento && (
          <Text style={styles.descuentosAplicado}>
            {' '}(Ahorras 50%)
          </Text>
        )}
      </View>
      <Text style={styles.description}>
        Acceso completo a todos los cursos de formación profesional
        {tieneDescuento && (
          <Text style={styles.descuentoText}>
            {' '}(Descuento por estar matriculado en la escuela virtual)
          </Text>
        )} por un año.
      </Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Pagar ahora
          </Text>
        )}
      </TouchableOpacity>
      
      <Text style={styles.securityText}>
        Pago seguro procesado por Stripe
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  descuentoText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  descuentosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  precioOriginal: {
    fontSize: 18,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  descuentosBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  descuentosText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  descuentosAplicado: {
    color: '#FF9800',
    fontSize: 14,
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  securityText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  errorText: {
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  }
});
