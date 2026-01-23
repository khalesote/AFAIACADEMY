import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { validateExamenNacionalidadCode } from '../utils/accessCodes';

interface ExamenNacionalidadAccessCodeInputProps {
  documento?: string;
  onCodeValid: (code: string) => void;
  onCancel: () => void;
}

export default function ExamenNacionalidadAccessCodeInput({
  documento,
  onCodeValid,
  onCancel,
}: ExamenNacionalidadAccessCodeInputProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidateCode = async () => {
    if (!code.trim()) {
      setError('Por favor, introduce un código de acceso');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await validateExamenNacionalidadCode(code.trim(), documento);

      if (result.valid) {
        // Código válido - llamar al callback
        onCodeValid(code.trim());
      } else {
        // Código inválido - mostrar error
        setError(result.message);
        Alert.alert(
          'Código inválido',
          result.message,
          [{ text: 'OK' }]
        );
      }
    } catch (error: any) {
      console.error('Error validando código:', error);
      const errorMessage = error?.message || 'Error al validar el código. Por favor, inténtalo de nuevo.';
      setError(errorMessage);
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="key" size={32} color="#9DC3AA" />
          <Text style={styles.title}>Código de Acceso</Text>
          <Text style={styles.titleAr}>رمز الوصول</Text>
        </View>

        <Text style={styles.description}>
          Introduce el código de acceso que recibiste para acceder al examen de nacionalidad CCSE.
        </Text>
        <Text style={styles.descriptionAr}>
          أدخل رمز الوصول الذي تلقيته للوصول إلى امتحان الجنسية CCSE.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={code}
            onChangeText={(text) => {
              setCode(text);
              setError(null);
            }}
            placeholder="Ej: EXAMEN2024-001"
            placeholderTextColor="#999"
            autoCapitalize="characters"
            editable={!loading}
          />
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color="#f44336" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
            <Text style={styles.cancelButtonTextAr}>إلغاء</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.validateButton, loading && styles.buttonDisabled]}
            onPress={handleValidateCode}
            disabled={loading || !code.trim()}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.validateButtonText}>Validar</Text>
                <Text style={styles.validateButtonTextAr}>التحقق</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={16} color="#666" />
          <Text style={styles.infoText}>
            Si tienes un código de acceso, introdúcelo aquí. Si no tienes código, puedes realizar el pago.
          </Text>
          <Text style={styles.infoTextAr}>
            إذا كان لديك رمز وصول، أدخله هنا. إذا لم يكن لديك رمز، يمكنك إجراء الدفع.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  titleAr: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  descriptionAr: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#f44336',
    marginLeft: 6,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  cancelButtonTextAr: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  validateButton: {
    backgroundColor: '#9DC3AA',
    flexDirection: 'row',
    gap: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  validateButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  validateButtonTextAr: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
  infoBox: {
    backgroundColor: '#f0f8f4',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  infoTextAr: {
    fontSize: 11,
    color: '#999',
    marginLeft: 8,
    flex: 1,
    lineHeight: 14,
    marginTop: 4,
  },
});





