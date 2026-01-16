import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import { requestMicrophonePermission } from '../utils/requestMicrophonePermission';

export default function TestVoiceScreen() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Aquí irá la lógica de grabación y subida de audio a Google Speech-to-Text
  const start = async () => {
    setResult('');
    setError('');
    try {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        setError('Permiso de micrófono denegado. Actívalo en los ajustes del sistema.');
        return;
      }
      // TODO: grabar audio y enviarlo a Google Speech-to-Text
      setError('Funcionalidad de reconocimiento de voz pendiente de implementar');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || 'Error desconocido');
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Grabar y analizar" onPress={start} />
      <Text style={styles.label}>Reconocido: {result}</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  label: { fontSize: 18, marginTop: 24 },
  error: { color: 'red', marginTop: 16, fontSize: 16 },
});
