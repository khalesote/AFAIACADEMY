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

interface PagoFormacionProfesionalProps {
  onPagoExitoso: (infoPago: any) => void;
  onCancelar: () => void;
}

export default function PagoFormacionProfesional({
  onPagoExitoso,
  onCancelar,
}: PagoFormacionProfesionalProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading) return;

    Alert.alert(
      'Pago de Formación Profesional',
      '¿Deseas simular el pago exitoso de la Formación Profesional?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: onCancelar },
        {
          text: 'Simular Pago',
          onPress: async () => {
            setLoading(true);
            // Simular proceso de pago
            setTimeout(() => {
              const infoPago = {
                paymentIntentId: `pi_formacion_${Date.now()}`,
                amount: 15000, // 150€
                currency: 'eur',
                status: 'succeeded',
              };
              setLoading(false);
              onPagoExitoso(infoPago);
            }, 2000);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="school" size={40} color="#9DC3AA" />
        <Text style={styles.title}>Formación Profesional</Text>
        <Text style={styles.subtitle}>Acceso completo a todos los cursos profesionales</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>€150.00</Text>
        <Text style={styles.priceDescription}>Pago único, acceso ilimitado</Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.featureTitle}>Incluye:</Text>
        <Text style={styles.feature}>• Más de 20 cursos profesionales</Text>
        <Text style={styles.feature}>• Certificados de finalización</Text>
        <Text style={styles.feature}>• Acceso offline</Text>
        <Text style={styles.feature}>• Actualizaciones gratuitas</Text>
      </View>

      <TouchableOpacity
        style={[styles.payButton, loading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        <LinearGradient
          colors={['#9DC3AA', '#79A890']}
          style={styles.payButtonGradient}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="card" size={24} color="#fff" />
              <Text style={styles.payButtonText}>Pagar Formación Profesional</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancelar}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9DC3AA',
    marginBottom: 5,
  },
  priceDescription: {
    fontSize: 14,
    color: '#666',
  },
  features: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  feature: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
  payButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonGradient: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});
