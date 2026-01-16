import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagoFormacionProfesional from '../../components/PagoFormacionProfesional';
import FormularioDatosPersonales from './FormularioDatosPersonales';

type FormData = {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  fechaNacimiento: string;
  provincia: string;
  localidad?: string;
  telefono: string;
  tipoDocumento: string;
  documento: string;
};

export default function PagoFormacionScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);

  const manejarPagoExitoso = async (infoPago: any) => {
    try {
      console.log('✅ Pago de Formación Profesional exitoso:', infoPago);

      const accesoData = {
        tieneAcceso: true,
        fechaCompra: new Date().toISOString(),
        expira: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        paymentIntentId: infoPago.paymentIntentId,
        monto: infoPago.amount,
        moneda: infoPago.currency,
        datosUsuario: formData,
      };

      await AsyncStorage.setItem('@acceso_formacion_profesional', JSON.stringify(accesoData));

      Alert.alert(
        '¡Pago Exitoso!',
        'Tu acceso a los cursos de Formación Profesional ha sido activado. Ya puedes acceder a todos los cursos profesionales.',
        [
          {
            text: 'Ver Cursos',
            onPress: () => router.replace('/(tabs)/PreFormacionScreen')
          }
        ]
      );
    } catch (error) {
      console.error('❌ Error al procesar pago exitoso:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al procesar tu pago. Por favor, contacta con soporte.'
      );
    }
  };

  const manejarCancelar = () => {
    Alert.alert(
      'Pago cancelado',
      'El proceso de pago ha sido cancelado. Puedes intentarlo de nuevo cuando desees.',
      [
        {
          text: 'Aceptar',
          onPress: () => router.back()
        }
      ]
    );
  };

  if (!formData) {
    return (
      <FormularioDatosPersonales
        modo="formacion"
        onComplete={(datos) => setFormData(datos)}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <PagoFormacionProfesional
        onPagoExitoso={manejarPagoExitoso}
        onCancelar={manejarCancelar}
      />
    </View>
  );
}
