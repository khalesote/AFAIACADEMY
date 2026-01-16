import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
// import * as MailComposer from 'expo-mail-composer';
import { UserService } from '../services/userService';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  
  const router = useRouter();

  const handleAuth = async () => {
    // Validar que los campos no estén vacíos
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Intentando iniciar sesión desde AuthScreen:', {
        email: email.trim(),
        emailLength: email.trim().length,
        passwordLength: password.length,
        passwordDefinida: !!password
      });
      // Iniciar sesión con Firebase
      const result = await UserService.loginUser(email.trim(), password);
      
      if (result.user) {
        console.log('✅ Login exitoso');
        Alert.alert('Éxito', `¡Bienvenido de nuevo, ${result.user.firstName || result.user.name}!`, [
          { text: 'OK', onPress: () => router.replace('/') }
        ]);
      } else {
        console.log('❌ Error en login:', result.error);
        Alert.alert(
          'Error de inicio de sesión', 
          result.error || 'Email o contraseña incorrectos',
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Registrarse', 
              onPress: () => router.push('/RegisterScreen'),
              style: 'default'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      Alert.alert('Error', 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    setLoading(true);

    try {
      // Enviar correo de restablecimiento con Firebase
      if (!auth) {
        Alert.alert('Error', 'Servicio de autenticación no disponible.');
        return;
      }
      
      await sendPasswordResetEmail(auth, resetEmail);
      
      // Mostrar alerta con instrucciones
      Alert.alert(
        'Correo enviado',
        'Te hemos enviado un enlace para restablecer tu contraseña. Por favor, revisa tu correo y sigue las instrucciones. Después de cambiar tu contraseña, podrás iniciar sesión con tu nueva contraseña.',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowForgotPassword(false);
              setResetEmail('');
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('Error restableciendo contraseña:', error);
      
      // Manejar errores específicos de Firebase
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No hay ninguna cuenta registrada con este correo electrónico.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El formato del correo electrónico no es válido.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Demasiados intentos. Por favor, inténtalo de nuevo más tarde.');
      } else {
        Alert.alert('Error', 'Ocurrió un error al restablecer la contraseña. Intenta de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#9DC3AA', '#79A890']}
        style={styles.background}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Iniciar Sesión
            </Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>AFAI</Text>
            <Text style={styles.logoSubtext}>Academia de Inmigrantes</Text>
          </View>

          {/* Form - Solo mostrar campos de login */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => setShowForgotPassword(true)}
            >
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuth}
              disabled={loading}
            >
              <LinearGradient
                colors={['#9DC3AA', '#79A890']}
                style={styles.authButtonGradient}
              >
                {loading ? (
                  <Text style={styles.authButtonText}>Cargando...</Text>
                ) : (
                  <Text style={styles.authButtonText}>Iniciar Sesión</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Botón de Registrarse */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/RegisterScreen')}
              disabled={loading}
            >
              <LinearGradient
                colors={['#fff', '#f5f5f5']}
                style={styles.registerButtonGradient}
              >
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </LinearGradient>

      {/* Modal de Recuperar Contraseña */}
      {showForgotPassword && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                }}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Ingresa tu correo electrónico y recibirás un enlace para restablecer tu contraseña.
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleForgotPassword}
              disabled={loading}
            >
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.resetButtonGradient}
              >
                {loading ? (
                  <Text style={styles.resetButtonText}>Enviando...</Text>
                ) : (
                  <Text style={styles.resetButtonText}>Generar Nueva Contraseña</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 8,
  },
  authButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  authButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerButton: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#9DC3AA',
  },
  registerButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9DC3AA',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#9DC3AA',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resetButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 