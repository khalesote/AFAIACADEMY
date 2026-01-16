import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CaptchaModalProps {
  visible: boolean;
  onVerify: () => void;
  onClose: () => void;
}

export default function CaptchaModal({ visible, onVerify, onClose }: CaptchaModalProps) {
  const [captchaText, setCaptchaText] = useState('');
  const [captchaCode] = useState(generateCaptcha());
  const [error, setError] = useState('');
  const primary = useThemeColor({}, 'tint');

  function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  const handleVerify = () => {
    if (captchaText === captchaCode) {
      onVerify();
      onClose();
    } else {
      setError('Código incorrecto. Inténtalo de nuevo.');
      setCaptchaText('');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <LinearGradient
            colors={['#9DC3AA', '#79A890']}
            style={styles.gradient}
          >
            <Text style={styles.modalTitle}>Verificación de Seguridad</Text>
            <Text style={styles.modalText}>
              Por favor, introduce el siguiente código para continuar:
            </Text>
            
            <View style={styles.captchaContainer}>
              <Text style={styles.captchaText}>{captchaCode}</Text>
            </View>
            
            <TextInput
              style={styles.input}
              value={captchaText}
              onChangeText={setCaptchaText}
              placeholder="Escribe el código"
              placeholderTextColor="#90CAF9"
              autoCapitalize="characters"
              maxLength={6}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primary }]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primary }]}
                onPress={handleVerify}
              >
                <Text style={styles.buttonText}>Verificar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  gradient: {
    padding: 24,
  },
  modalTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  captchaContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  captchaText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    color: '#1976D2',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#FFCDD2',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
});
