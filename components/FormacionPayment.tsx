import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormacionPaymentProps {}

export default function FormacionPayment({}: FormacionPaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading) return;

    Alert.alert(
      'Pago de Formación Profesional',
      '¿Deseas adquirir el acceso anual a la Formación Profesional por 20€?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Pagar 20€',
          onPress: async () => {
            setLoading(true);
            // Simular proceso de pago
            setTimeout(async () => {
              try {
                const accesoData = {
                  tieneAcceso: true,
                  fechaCompra: new Date().toISOString(),
                  expira: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 año
                  paymentIntentId: `pi_formacion_annual_${Date.now()}`,
                  amount: 2000, // 20€
                  currency: 'eur',
                  metodo: 'simulado'
                };

                await AsyncStorage.setItem('@acceso_formacion_profesional', JSON.stringify(accesoData));

                Alert.alert(
                  '¡Pago Exitoso!',
                  'Tu acceso anual a los cursos de Formación Profesional ha sido activado.',
                  [{ text: 'OK' }]
                );
              } catch (error) {
                console.error('Error guardando acceso:', error);
                Alert.alert('Error', 'No se pudo guardar el acceso. Inténtalo de nuevo.');
              } finally {
                setLoading(false);
              }
            }, 2000);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>€20.00</Text>
        <Text style={styles.priceDescription}>Acceso anual ilimitado</Text>
      </View>

      <TouchableOpacity
        style={[styles.payButton, loading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.payButtonGradient}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="card" size={24} color="#fff" />
              <Text style={styles.payButtonText}>Adquirir Acceso Anual</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.note}>
        Pago único por acceso ilimitado durante 1 año a todos los cursos profesionales.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  priceDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  payButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 12,
    width: '100%',
    maxWidth: 280,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  note: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
});
