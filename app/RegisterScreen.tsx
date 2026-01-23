import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { UserService } from '../services/userService';
import { useUser } from '../contexts/UserContext';
import FormularioDatosPersonales from './(tabs)/FormularioDatosPersonales';

export default function RegisterScreen() {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePersonalDataComplete = async (data: any) => {
    // Validar contraseña antes de registrar
    if (!password || password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!data.email || !data.email.includes('@')) {
      Alert.alert('Error', 'El correo electrónico es requerido y debe ser válido');
      return;
    }

    // Agregar las contraseñas a los datos
    const dataWithPassword = {
      ...data,
      password,
      confirmPassword
    };

    try {
      setLoading(true);

      const { user, error } = await UserService.registerUser({
        firstName: data.nombre.trim(),
        lastName: data.apellido1.trim(),
        email: data.email.trim(),
        password: password,
        apellido2: data.apellido2 || '',
        telefono: data.telefono || '',
        provincia: data.provincia || '',
        localidad: data.localidad || '',
        documento: data.documento || '',
        tipoDocumento: data.tipoDocumento || 'NIE',
        fechaNacimiento: data.fechaNacimiento || '',
        nivelEspanol: typeof data.nivelEspanol === 'number' ? data.nivelEspanol : null,
        nivelEstudios: data.nivelEstudios || ''
      });

      if (error) {
        Alert.alert('Error de registro', error);
      } else if (user) {
        console.log('✅ Usuario registrado exitosamente:', user.id);
        
        // Esperar un momento para que Firebase Auth se actualice
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Refrescar el contexto del usuario para que se actualice con los datos de Firestore
        try {
          await refreshUser();
          console.log('✅ Contexto de usuario actualizado después del registro');
        } catch (refreshError) {
          console.error('⚠️ Error al refrescar contexto:', refreshError);
        }
        
        Alert.alert(
          '¡Registro exitoso!',
          'Tu cuenta ha sido creada correctamente con todos tus datos. Ya puedes iniciar sesión.',
          [
            {
              text: 'Iniciar Sesión',
              onPress: () => router.replace('/')
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Error inesperado durante el registro');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Creando cuenta...</Text>
      </View>
    );
  }

  // Wrapper para interceptar onComplete y validar contraseñas
  const handleFormComplete = (data: any) => {
    // Validar contraseña antes de proceder
    if (!password || password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Si las contraseñas son válidas, proceder con el registro
    handlePersonalDataComplete(data);
  };

  // Mostrar directamente FormularioDatosPersonales con campos de contraseña integrados
  return (
    <FormularioDatosPersonales
      modo="matriculas"
      onComplete={handleFormComplete}
      onCancel={() => {
        router.replace('/LoginScreen');
      }}
      initialData={{}}
      showPasswordFields={true}
      password={password}
      confirmPassword={confirmPassword}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
});
