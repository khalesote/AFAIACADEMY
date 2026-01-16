import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { PaymentInfo } from '../config/stripe';
import { STRIPE_MATRICULAS, getMatriculaPrice, MatriculaLevel } from '../config/stripeMatriculas';

type StripeError = {
  code?: string;
  message: string;
  stack?: string;
  response?: {
    data?: any;
  };
};

interface StripePaymentProps {
  level: MatriculaLevel;

  onPaymentSuccess: (paymentInfo: PaymentInfo) => void;
  onPaymentCancel: () => void;
}

export default function StripePayment({ level, onPaymentSuccess, onPaymentCancel }: StripePaymentProps) {
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const price = getMatriculaPrice(level);
  const priceLabel = price.toFixed(2);

  const handlePayment = async () => {
    if (loading) return;
    
    try {
      console.log('🔄 Iniciando pago...');
      setLoading(true);

      // 1. Crear Payment Intent
      const amount = price;
      const endpoint = `${STRIPE_MATRICULAS.API_URL}/api/create-payment-intent`;
      
      console.log('📤 Enviando petición a:', endpoint);
      console.log('📦 Datos:', { amount, level });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          amount,
          description: `Matrícula ${level} (50% descuento)`,
          level,
        }),
      });

      console.log('📥 Respuesta recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en la respuesta:', errorText);
        throw new Error(`Error del servidor: ${response.status} - ${response.statusText || 'Sin detalles'}`);
      }

      const responseData = await response.json();
      console.log('🔑 Datos de la respuesta:', responseData);
      
      const { clientSecret, paymentIntentId } = responseData;
      
      if (!clientSecret) {
        console.error('❌ No se recibió clientSecret en la respuesta');
        throw new Error('No se pudo iniciar el proceso de pago. Faltan datos necesarios.');
      }

      // 2. Inicializar la hoja de pago
      console.log('🛠️ Inicializando hoja de pago...');
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Academia de Inmigrantes',
        returnURL: STRIPE_MATRICULAS.RETURN_URL,
        style: 'alwaysLight',
        googlePay: {
          merchantCountryCode: 'ES',
          testEnv: true, // Usar entorno de pruebas
        },
      });

      if (error) {
        console.error('❌ Error al inicializar la hoja de pago:', error);
        throw error;
      }

      // 3. Mostrar la hoja de pago
      console.log('💳 Mostrando hoja de pago...');
      const { error: paymentError } = await presentPaymentSheet();
      
      if (paymentError) {
        if (paymentError.code === 'Canceled') {
          console.log('⏹️ Pago cancelado por el usuario');
          onPaymentCancel();
          return;
        }
        console.error('❌ Error en la hoja de pago:', paymentError);
        throw paymentError;
      }

      // 4. Pago exitoso
      console.log('✅ Pago exitoso, creando registro...');
      const paymentInfo: PaymentInfo = {
        id: paymentIntentId || `pi_${Date.now()}`,
        amount,
        currency: 'eur',
        status: 'succeeded',
        clientSecret: clientSecret,
        level: level,
        userId: 'usuario_actual',
        timestamp: new Date().toISOString(),
      };

      console.log('🎉 Pago completado con éxito:', paymentInfo);
      onPaymentSuccess(paymentInfo);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      const errorCode = (error as StripeError)?.code || 'unknown';
      
      console.error('❌ Error en el proceso de pago:', {
        message: errorMessage,
        code: errorCode,
        stack: (error as Error)?.stack,
        response: (error as StripeError)?.response?.data
      });
      
      Alert.alert(
        'Error en el pago', 
        errorMessage || 'No se pudo completar el pago. Por favor, inténtalo de nuevo.',
        [{ text: 'Aceptar', onPress: onPaymentCancel }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Pagar {priceLabel} €
          </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.securityText}>
        Pago seguro con Stripe
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  securityText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});