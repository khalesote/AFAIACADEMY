import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BIZUM_CONFIG, getBizumPrice, getBizumTotalPrice, calculateBizumIVA, validateBizumConfig, BizumLevel } from '../config/bizum';
import { PaymentInfo } from '../config/stripe';

interface BizumPaymentProps {
  level: BizumLevel;
  amount?: number;
  description?: string;
  customerEmail?: string;
  customerPhone?: string;
  onPaymentSuccess: (paymentInfo: PaymentInfo) => void;
  onPaymentCancel: () => void;
}

export default function BizumPayment({
  level,
  amount,
  description,
  customerEmail,
  customerPhone,
  onPaymentSuccess,
  onPaymentCancel,
}: BizumPaymentProps) {
  const [loading, setLoading] = useState(false);
  const basePrice = amount ? amount / 1.21 : getBizumPrice(level); // Si viene amount, calcular base
  const iva = calculateBizumIVA(basePrice);
  const totalPrice = amount || getBizumTotalPrice(level);
  const priceLabel = totalPrice.toFixed(2);

  const handlePayment = async () => {
    if (loading) return;

    try {
      // Validar configuración
      const validation = validateBizumConfig();
      if (!validation.isValid) {
        const errorMsg = `Configuración de Bizum incompleta: ${validation.errors.join(', ')}. Por favor, configura las credenciales de Bizum.`;
        console.error('❌', errorMsg);
        Alert.alert(
          'Bizum no configurado',
          errorMsg + '\n\nNecesitas contratar el servicio Bizum con tu banco y configurar las credenciales.',
          [
            { text: 'Entendido', style: 'default' },
            {
              text: 'Ver documentación',
              onPress: () => {
                // Abrir documentación o guía
                Alert.alert(
                  'Configuración de Bizum',
                  'Para usar Bizum necesitas:\n\n' +
                  '1. Contratar Bizum para empresas con tu banco\n' +
                  '2. Obtener credenciales de API\n' +
                  '3. Configurar variables de entorno:\n' +
                  '   - EXPO_PUBLIC_BIZUM_MERCHANT_ID\n' +
                  '   - EXPO_PUBLIC_BIZUM_API_KEY\n' +
                  '   - EXPO_PUBLIC_BIZUM_SECRET_KEY\n\n' +
                  'Contacta con tu banco para más información.'
                );
              }
            }
          ]
        );
        return;
      }

      setLoading(true);
      console.log('🔄 Iniciando pago con Bizum...');

      // 1. Crear solicitud de pago en el backend
      const endpoint = `${BIZUM_CONFIG.API_URL}/api/bizum/create-payment`;
      
      console.log('📤 Enviando petición a:', endpoint);
      console.log('📦 Datos:', {
        amount: totalPrice,
        basePrice,
        iva,
        level,
        customerEmail,
        customerPhone,
        description: description || `Pago ${level}`,
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          level,
          description: description || `Pago ${level}`,
          customerEmail,
          customerPhone,
          returnUrl: BIZUM_CONFIG.RETURN_URL,
        }),
      });

      console.log('📥 Respuesta recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en la respuesta:', errorText);
        throw new Error(`Error del servidor: ${response.status} - ${errorText || 'Sin detalles'}`);
      }

      const responseData = await response.json();
      console.log('🔑 Datos de la respuesta:', responseData);

      // 2. Procesar respuesta según el método de integración
      // Opción A: Si el backend devuelve una URL de redirección
      if (responseData.paymentUrl) {
        console.log('🔗 Abriendo URL de pago Bizum...');
        const canOpen = await Linking.canOpenURL(responseData.paymentUrl);
        
        if (canOpen) {
          await Linking.openURL(responseData.paymentUrl);
          // El pago se completará y el backend notificará vía webhook
          // Por ahora, asumimos éxito (en producción deberías verificar el estado)
          Alert.alert(
            'Redirigiendo a Bizum',
            'Serás redirigido a la app de Bizum para completar el pago. Vuelve a la app cuando termines.',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
                onPress: () => {
                  setLoading(false);
                  onPaymentCancel();
                },
              },
              {
                text: 'Continuar',
                onPress: async () => {
                  // En producción, deberías verificar el estado del pago
                  // mediante polling o webhooks
                  setLoading(false);
                  // Simular éxito por ahora (reemplazar con verificación real)
                  setTimeout(() => {
                    const paymentInfo: PaymentInfo = {
                      id: responseData.paymentId || `bizum_${Date.now()}`,
                      amount: totalPrice,
                      currency: 'eur',
                      status: 'pending', // Cambiar a 'succeeded' cuando se confirme
                      level: level,
                      userId: 'usuario_actual',
                      timestamp: new Date().toISOString(),
                      paymentMethod: 'bizum',
                    };
                    onPaymentSuccess(paymentInfo);
                  }, 2000);
                },
              },
            ]
          );
        } else {
          throw new Error('No se puede abrir la URL de Bizum');
        }
      }
      // Opción B: Si el backend devuelve un código QR o datos para mostrar
      else if (responseData.qrCode || responseData.phoneNumber) {
        console.log('📱 Mostrando opciones de pago Bizum...');
        
        // Mostrar instrucciones para pagar con Bizum
        Alert.alert(
          'Pagar con Bizum',
          `Para completar el pago:\n\n` +
          (responseData.phoneNumber
            ? `1. Abre la app de Bizum\n2. Envía ${totalPrice.toFixed(2)}€ al número: ${responseData.phoneNumber}\n3. Usa el concepto: ${responseData.reference || level}\n\n`
            : '') +
          (responseData.qrCode
            ? `O escanea este código QR desde la app de Bizum`
            : '') +
          `\n\nUna vez completado el pago, recibirás confirmación.`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => {
                setLoading(false);
                onPaymentCancel();
              },
            },
            {
              text: 'Ya pagué',
              onPress: async () => {
                // Verificar estado del pago
                if (responseData.paymentId) {
                  const verifyResponse = await fetch(
                    `${BIZUM_CONFIG.API_URL}/api/bizum/verify-payment/${responseData.paymentId}`
                  );
                  
                  if (verifyResponse.ok) {
                    const verifyData = await verifyResponse.json();
                    if (verifyData.status === 'succeeded') {
                      const paymentInfo: PaymentInfo = {
                        id: responseData.paymentId,
                        amount: totalPrice,
                        currency: 'eur',
                        status: 'succeeded',
                        level: level,
                        userId: 'usuario_actual',
                        timestamp: new Date().toISOString(),
                        paymentMethod: 'bizum',
                      };
                      setLoading(false);
                      onPaymentSuccess(paymentInfo);
                    } else {
                      Alert.alert(
                        'Pago pendiente',
                        'El pago aún no se ha confirmado. Por favor, espera unos momentos o verifica que hayas completado el pago en Bizum.'
                      );
                      setLoading(false);
                    }
                  } else {
                    Alert.alert(
                      'Error',
                      'No se pudo verificar el estado del pago. Por favor, intenta de nuevo.'
                    );
                    setLoading(false);
                  }
                } else {
                  setLoading(false);
                }
              },
            },
          ]
        );
      }
      // Opción C: Si el backend maneja todo internamente
      else if (responseData.status === 'succeeded' || responseData.paymentId) {
        console.log('✅ Pago procesado exitosamente');
        const paymentInfo: PaymentInfo = {
          id: responseData.paymentId || `bizum_${Date.now()}`,
          amount: totalPrice,
          currency: 'eur',
          status: responseData.status || 'succeeded',
          level: level,
          userId: 'usuario_actual',
          timestamp: new Date().toISOString(),
          paymentMethod: 'bizum',
        };
        setLoading(false);
        onPaymentSuccess(paymentInfo);
      } else {
        throw new Error('Respuesta del servidor no válida');
      }
    } catch (error: any) {
      console.error('❌ Error en pago Bizum:', error);
      const errorMsg = error.message || 'Error al procesar el pago con Bizum';
      Alert.alert('Error', errorMsg);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="phone-portrait" size={40} color="#00A3E0" />
        </View>
        <Text style={styles.title}>Pago con Bizum</Text>
        <Text style={styles.description}>
          {description || `Pago para ${level}`}
        </Text>
        <Text style={styles.amount}>€{priceLabel}</Text>
        <Text style={styles.breakdown}>
          Base: €{basePrice.toFixed(2)} + IVA (21%): €{iva.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        <LinearGradient
          colors={['#00A3E0', '#0088CC']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="phone-portrait" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Pagar con Bizum</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.note}>
        Pago instantáneo y seguro a través de Bizum. Necesitas tener la app de Bizum instalada.
      </Text>

      {!validateBizumConfig().isValid && (
        <View style={styles.warningContainer}>
          <Ionicons name="warning" size={16} color="#FF9800" />
          <Text style={styles.warningText}>
            Bizum requiere configuración. Contacta con tu banco para obtener las credenciales.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00A3E0',
    marginBottom: 5,
  },
  breakdown: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  warningText: {
    fontSize: 12,
    color: '#E65100',
    marginLeft: 8,
    flex: 1,
  },
});

























