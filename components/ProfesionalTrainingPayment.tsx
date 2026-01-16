import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { STRIPE_FORMACION } from '../config/stripeFormacion';

interface ProfesionalTrainingPaymentProps {
  onPaymentSuccess: (paymentInfo: PaymentInfo) => void;
  onPaymentCancel: () => void;
}

export default function ProfesionalTrainingPayment({ 
  onPaymentSuccess, 
  onPaymentCancel 
}: ProfesionalTrainingPaymentProps) {
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const priceLabel = STRIPE_FORMACION.BASE_PRICE.toFixed(2);

  const handlePayment = async () => {
    if (loading) return;
    
    try {
      console.log('🔄 Iniciando pago para Formación Profesional...');
      setLoading(true);

      // 1. Create Payment Intent
      const response = await fetch(`${STRIPE_FORMACION.API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(STRIPE_FORMACION.BASE_PRICE * 100),
          description: 'Acceso a Formación Profesional',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor');
      }

      const { clientSecret } = await response.json();
      if (!clientSecret) throw new Error('No se recibió clientSecret');

      // 2. Initialize payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Academia de Inmigrantes',
        style: 'alwaysDark',
      });

      if (error) {
        console.error('Error al inicializar el pago:', error);
        throw error;
      }

      // 3. Present payment sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        if (paymentError.code === 'Canceled') {
          console.log('Pago cancelado por el usuario');
          onPaymentCancel();
          return;
        }
        throw paymentError;
      }

      // 4. Payment successful
      const paymentInfo: PaymentInfo = {
        id: `prof_${Date.now()}`,  // Generate a unique ID
        amount: STRIPE_FORMACION.BASE_PRICE,
        currency: 'eur',
        status: 'succeeded',
        clientSecret: `cs_${Math.random().toString(36).substr(2, 10)}`,  // Generate a mock client secret
        level: 'profesional',
        userId: 'current-user-id',  // You should replace this with the actual user ID
        timestamp: new Date().toISOString(),
      };
      
      // Save payment status in AsyncStorage
      await AsyncStorage.setItem('@profesional_training_access', JSON.stringify({
        hasAccess: true,
        paymentDate: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year access
      }));

      onPaymentSuccess(paymentInfo);

    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      Alert.alert(
        'Error en el pago',
        'No se pudo completar el pago. Por favor, inténtalo de nuevo.'
      );
      onPaymentCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso a Formación Profesional</Text>
      <Text style={styles.price}>{priceLabel} €</Text>
      <Text style={styles.description}>
        Obtén acceso completo a todos los cursos de formación profesional por un año.
      </Text>
      
      <TouchableOpacity 
        style={styles.paymentButton} 
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.paymentButtonText}>Pagar con tarjeta</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={onPaymentCancel}
        disabled={loading}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  paymentButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});
