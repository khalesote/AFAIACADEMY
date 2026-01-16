import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import auth from '@react-native-firebase/auth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const primary = useThemeColor({}, 'tint');

  const handleReset = async () => {
    setLoading(true);
    setMensaje('');
    try {
      await auth().sendPasswordResetEmail(email);
      setMensaje('¡Revisa tu correo para restablecer tu contraseña!');
    } catch (error) {
      setMensaje('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: primary, opacity: (loading || !email) ? 0.6 : 1 }]}
        onPress={handleReset}
        disabled={loading || !email}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar enlace de recuperación'}</Text>
      </TouchableOpacity>
      <Text style={[styles.message, { color: primary }]}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 15,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
