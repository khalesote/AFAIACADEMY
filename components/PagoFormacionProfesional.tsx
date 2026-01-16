import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { PaymentInfo } from '../config/stripe';
import { STRIPE_FORMACION } from '../config/stripeFormacion';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PagoFormacionProfesionalProps {
  onPagoExitoso: (infoPago: PaymentInfo) => void;
  onCancelar: () => void;
}

export default function PagoFormacionProfesional({ 
  onPagoExitoso, 
  onCancelar 
}: PagoFormacionProfesionalProps) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const manejarPago = async () => {
    if (cargando) return;
    
    try {
      console.log('Iniciando pago para Formación Profesional...');
      setCargando(true);
      setError(null);

      // 1. Crear intención de pago
      const url = `${STRIPE_FORMACION.API_URL}/api/create-payment-intent`;
      console.log('Conectando a:', url);
      
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          amount: STRIPE_FORMACION.BASE_PRICE,
          currency: 'eur',
          description: 'Acceso a Formación Profesional',
          tipo: 'formacion-profesional',
          bloque: 'formacion-profesional',
          returnUrl: STRIPE_FORMACION.RETURN_URL,
        }),
      });

      const data = await respuesta.json().catch(() => ({}));
      
      if (!respuesta.ok) {
        console.error('Error del servidor:', data);
        throw new Error(`Error del servidor: ${respuesta.status} - ${data.message || 'Error desconocido'}`);
      }

      const { clientSecret, paymentIntentId, amount } = data;

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
        if (paymentError.code === 'Canceled') {
          onCancelar();
          return;
        }
        throw paymentError;
      }

      const paymentInfo: PaymentInfo = {
        id: paymentIntentId || `fp_${Date.now()}`,
        amount: typeof amount === 'number' ? amount / 100 : STRIPE_FORMACION.BASE_PRICE,
        currency: 'eur',
        status: 'succeeded',
        clientSecret,
        level: 'formacion-profesional',
        userId: 'usuario_actual',
        timestamp: new Date().toISOString(),
      };

      // Guardar acceso local
      await AsyncStorage.setItem(
        '@acceso_formacion_profesional',
        JSON.stringify({
          tieneAcceso: true,
          fechaCompra: new Date().toISOString(),
          expira: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      );

      onPagoExitoso(paymentInfo);

    } catch (error: unknown) {
      console.error('Error en el proceso de pago:', error);
      const mensajeError = error instanceof Error
        ? error.message
        : 'No se pudo completar la operación. Verifica tu conexión e inténtalo nuevamente.';

      setError(mensajeError);
      Alert.alert('Error en el pago', mensajeError);
      onCancelar();
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Acceso a Formación Profesional</Text>
      <Text style={estilos.precio}>
        {`${STRIPE_FORMACION.BASE_PRICE.toFixed(2)} €`}
      </Text>
      <Text style={estilos.descripcion}>
        Obtén acceso completo a todos los cursos de formación profesional por un año.
      </Text>

      {error && <Text style={[estilos.descripcion, { color: '#d32f2f' }]}>{error}</Text>}
      
      <TouchableOpacity 
        style={estilos.botonPagar} 
        onPress={manejarPago}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={estilos.textoBotonPagar}>Pagar con tarjeta</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={estilos.botonCancelar}
        onPress={onCancelar}
        disabled={cargando}
      >
        <Text style={estilos.textoBotonCancelar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  precio: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginVertical: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  botonPagar: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotonPagar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonCancelar: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textoBotonCancelar: {
    color: '#666',
    fontSize: 16,
  },
});
