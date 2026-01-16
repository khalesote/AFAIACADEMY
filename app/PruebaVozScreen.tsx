import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { requestMicrophonePermission } from '../utils/requestMicrophonePermission';

const PruebaVozScreen = () => {

  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Lógica de grabación y subida a AssemblyAI
  const recordingRef = useRef<Audio.Recording | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [uploading, setUploading] = useState(false);

  const startRecording = async () => {
    setResults([]);
    setError('');
    try {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        setError('Permiso de micrófono denegado. Actívalo en los ajustes del sistema.');
        return;
      }
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
    } catch (e: any) {
      setError(e.message || 'Error desconocido');
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      const recording = recordingRef.current;
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) {
        setError('No se pudo obtener el archivo de audio.');
        return;
      }
      setUploading(true);
      // Subir audio a AssemblyAI
      const response = await uploadAudioToAssemblyAI(uri);
      setUploading(false);
      if (response && response.upload_url) {
        setError('Audio subido correctamente. Transcribiendo...');
        // Lanzar transcripción automática
        await transcribeWithAssemblyAI(response.upload_url);
      } else {
        setError('Error al subir el audio.');
      }
    } catch (e: any) {
      setError(e.message || 'Error al finalizar la grabación');
    }
  };

  // Función para transcribir audio usando AssemblyAI
  const transcribeWithAssemblyAI = async (audioUrl: string) => {
    try {
      const apiKey = 'a388c315ac3447159beac5a45da60f20';
      // Crear transcripción
      const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'authorization': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: audioUrl,
          language_code: 'es',
        }),
      });
      const transcriptData = await transcriptRes.json();
      if (!transcriptData.id) {
        setError('No se pudo crear la transcripción.');
        return;
      }
      // Polling hasta que esté lista
      let status = transcriptData.status;
      let text = '';
      let attempts = 0;
      while (status !== 'completed' && status !== 'failed' && attempts < 20) {
        await new Promise(res => setTimeout(res, 3000)); // Espera 3s
        const pollRes = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptData.id}`, {
          headers: { 'authorization': apiKey },
        });
        const pollData = await pollRes.json();
        status = pollData.status;
        if (status === 'completed') {
          text = pollData.text;
        } else if (status === 'failed') {
          setError('La transcripción falló.');
          return;
        }
        attempts++;
        setError('Transcribiendo...');
      }
      if (status === 'completed') {
        setResults([text]);
        setError('');
      } else {
        setError('La transcripción tardó demasiado.');
      }
    } catch (err) {
      setError('Error durante la transcripción');
    }
  };

  // Función para subir audio a AssemblyAI
  const uploadAudioToAssemblyAI = async (uri: string) => {
    try {
      const apiKey = 'a388c315ac3447159beac5a45da60f20'; // AssemblyAI API Key
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileUri = fileInfo.uri;
      const file = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      // Convertir base64 a binario compatible con fetch en React Native
      const binary = Uint8Array.from(atob(file), c => c.charCodeAt(0));
      const res = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'authorization': apiKey,
          'transfer-encoding': 'chunked',
          'content-type': 'application/octet-stream',
        },
        body: binary,
      });
      const data = await res.json();
      return data;
    } catch (err) {
      setError('Error subiendo el audio a AssemblyAI');
      return null;
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba de Voz</Text>
      <TouchableOpacity
        style={[styles.button, isRecording && styles.buttonActive]}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>{isRecording ? 'Detener' : 'Grabar y analizar'}</Text>
      </TouchableOpacity>
      {uploading && <ActivityIndicator size="large" color="#795548" style={{ marginBottom: 16 }} />}
      {uploading && <Text style={styles.label}>Subiendo o transcribiendo audio...</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.label}>Texto reconocido:</Text>
      {results.map((r, i) => (
        <Text key={i} style={styles.result}>{r}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#795548',
  },
  button: {
    backgroundColor: '#795548',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonActive: {
    backgroundColor: '#a1887f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  result: {
    fontSize: 18,
    color: '#222',
    marginVertical: 2,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    fontSize: 16,
  },
});

export default PruebaVozScreen;
