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
import { STRIPE_EXAMEN_NACIONALIDAD, getExamenNacionalidadTotalPrice, calculateIVA } from '../config/stripeExamenNacionalidad';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StripeError = {
  code?: string;
  message: string;
  stack?: string;
  response?: {
    data?: any;
  };
};

interface ExamenNacionalidadPaymentProps {
  onPaymentSuccess: (paymentInfo: PaymentInfo) => void;
  onPaymentCancel: () => void;
}

export default function ExamenNacionalidadPayment({ onPaymentSuccess, onPaymentCancel }: ExamenNacionalidadPaymentProps) {
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const basePrice = STRIPE_EXAMEN_NACIONALIDAD.BASE_PRICE;
  const iva = calculateIVA(basePrice);
  const totalPrice = getExamenNacionalidadTotalPrice();
  const priceLabel = totalPrice.toFixed(2);

  const handlePayment = async () => {
    if (loading) return;
    
    try {
      console.log('🔄 Iniciando pago para examen de nacionalidad...');
      setLoading(true);

      // 1. Crear Payment Intent (usar precio con IVA)
      const amount = totalPrice;
      const endpoint = `${STRIPE_EXAMEN_NACIONALIDAD.API_URL}/api/create-payment-intent`;
      
      console.log('📤 Enviando petición a:', endpoint);
      console.log('📦 Datos:', { 
        basePrice, 
        iva, 
        totalPrice: amount,
        tipo: 'examen-nacionalidad'
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          amount, 
          description: 'Acceso al Examen de Nacionalidad CCSE',
          tipo: 'examen-nacionalidad'
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
        returnURL: STRIPE_EXAMEN_NACIONALIDAD.RETURN_URL,
        style: 'alwaysLight',
        googlePay: {
          merchantCountryCode: 'ES',
          testEnv: true,
        },
      });

      if (error) {
        console.error('❌ Error inicializando hoja de pago:', error);
        throw error;
      }

      // 3. Mostrar la hoja de pago
      console.log('💳 Mostrando hoja de pago...');
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        if (paymentError.code === 'Canceled') {
          console.log('⚠️ Usuario canceló el pago');
          onPaymentCancel();
          return;
        }
        console.error('❌ Error en el pago:', paymentError);
        throw paymentError;
      }

      // 4. Pago exitoso
      console.log('✅ Pago exitoso!');
      
      // Guardar acceso en AsyncStorage
      await AsyncStorage.setItem('@acceso_examen_nacionalidad', JSON.stringify({
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        paymentIntentId: paymentIntentId || `examen_${Date.now()}`,
      }));

      const paymentInfo: PaymentInfo = {
        id: paymentIntentId || `examen_${Date.now()}`,
        amount: amount,
        currency: 'eur',
        status: 'succeeded',
        clientSecret,
        level: 'examen-nacionalidad',
        userId: 'usuario_actual',
        timestamp: new Date().toISOString(),
      };

      onPaymentSuccess(paymentInfo);
    } catch (error: unknown) {
      console.error('❌ Error en el proceso de pago:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      Alert.alert('Error en el pago', errorMessage);
      onPaymentCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Precio del examen:</Text>
        <Text style={styles.priceValue}>{priceLabel}€</Text>
        <Text style={styles.priceBreakdown}>
          Base: {basePrice.toFixed(2)}€ + IVA (21%): {iva.toFixed(2)}€
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.payButton, loading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.payButtonText}>Pagar {priceLabel}€</Text>
            <Text style={styles.payButtonSubtext}>Acceder al examen CCSE</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.securityText}>
        🔒 Pago seguro con Stripe. Tus datos están protegidos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  priceBreakdown: {
    fontSize: 12,
    color: '#999',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  payButtonSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  securityText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

