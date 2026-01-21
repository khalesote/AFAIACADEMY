import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { validateAccessCode } from '../utils/accessCodes';

interface AccessCodeInputB2Props {
  documento: string;
  onCodeValid: (code: string) => void;
  onCancel?: () => void;
}

export default function AccessCodeInputB2({ documento, onCodeValid, onCancel }: AccessCodeInputB2Props) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = async () => {
    if (!code.trim()) {
      setError('Por favor, introduce un código de acceso');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🔍 AccessCodeInputB2: Validando código:', code, 'para nivel: B2');
      const result = await validateAccessCode(code, 'B2', documento);
      console.log('🔍 AccessCodeInputB2: Resultado:', result);
      
      if (result.valid) {
        console.log('✅ AccessCodeInputB2: Código válido');
        onCodeValid(code);
      } else {
        console.log('❌ AccessCodeInputB2: Código inválido:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error validando código:', error);
      setError('Error al validar el código. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="key-outline" size={24} color="#9DC3AA" style={styles.icon} />
        <Text style={styles.title}>Código de Acceso - Nivel B2</Text>
      </View>
      
      <Text style={styles.description}>
        Si tienes un código de acceso para el nivel B2, introdúcelo aquí para matricularte sin pagar.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={code}
          onChangeText={(text) => {
            setCode(text.toUpperCase());
            setError('');
          }}
          placeholder="Introduce tu código de acceso B2"
          placeholderTextColor="#999"
          autoCapitalize="characters"
          editable={!loading}
        />
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color="#ff4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.validateButton, loading && styles.disabledButton]}
          onPress={handleValidate}
          disabled={loading || !code.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.validateButtonText}>Validar Código</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        Cada código solo puede usarse una vez y está asociado a tu documento de identidad.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textTransform: 'uppercase',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  validateButton: {
    backgroundColor: '#9DC3AA',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  disabledButton: {
    opacity: 0.6,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 12,
    color: '#888',
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
