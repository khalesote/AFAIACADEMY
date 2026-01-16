import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { auth } from '../../config/firebase';

type Exercise = {
  id: string;
  titleEs: string;
  titleAr: string;
  targetText: string;
  speakAr: string;
};

const EXERCISES: Exercise[] = [
  { id: 'letra-a', titleEs: 'Letra', titleAr: 'حرف', targetText: 'A', speakAr: 'اكتب الحرف A بالإسبانية' },
  { id: 'letra-e', titleEs: 'Letra', titleAr: 'حرف', targetText: 'E', speakAr: 'اكتب الحرف E بالإسبانية' },
  { id: 'silaba-pa', titleEs: 'Sílabas', titleAr: 'مقاطع', targetText: 'PA', speakAr: 'اكتب المقطع PA بالإسبانية' },
  { id: 'silaba-pe', titleEs: 'Sílabas', titleAr: 'مقاطع', targetText: 'PE', speakAr: 'اكتب المقطع PE بالإسبانية' },
  { id: 'palabra-casa', titleEs: 'Palabras', titleAr: 'كلمات', targetText: 'casa', speakAr: 'اكتب كلمة casa بالإسبانية' },
  { id: 'palabra-amigo', titleEs: 'Palabras', titleAr: 'كلمات', targetText: 'amigo', speakAr: 'اكتب كلمة amigo بالإسبانية' },
  { id: 'frase-1', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Me llamo Ana', speakAr: 'اكتب الجملة: Me llamo Ana' },
  { id: 'frase-2', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Vivo en Madrid', speakAr: 'اكتب الجملة: Vivo en Madrid' },
];

const normalizeText = (text: string) => (text || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9ñáéíóúü\s]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export default function AprendeEscribirScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [matched, setMatched] = useState<boolean | null>(null);

  const current = useMemo(() => EXERCISES[index], [index]);

  const speakArabic = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'ar-SA', rate: 0.9 });
  };

  const handleStart = () => {
    speakArabic('من فضلك خذ ورقة وقلم وابدأ بالكتابة');
    setTimeout(() => speakArabic(current.speakAr), 1200);
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos permiso de cámara para tomar la foto.');
      return;
    }

    try {
      setBusy(true);
      setLastResult(null);
      setMatched(null);

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.3,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const imageUri = result.assets[0].uri;
      const resized = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1024 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
      );
      const userId = auth?.currentUser?.uid || 'anon';
      const base64 = await FileSystem.readAsStringAsync(resized.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const apiBaseUrl = process.env.EXPO_PUBLIC_BACKEND_URL
        || 'https://academia-backend-s9np.onrender.com';
      const response = await fetch(`${apiBaseUrl}/api/ocr-aprende-escribir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          expectedText: current.targetText,
          exerciseId: current.id,
          userId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error OCR');
      }

      const data = await response.json();
      const detectedText = data?.detectedText || '';
      const matchedResult = data?.matched ?? null;
      const normalizedDetected = normalizeText(detectedText);
      const normalizedExpected = normalizeText(current.targetText);
      const fallbackMatched = normalizedExpected
        ? normalizedDetected.includes(normalizedExpected)
        : null;

      setLastResult(detectedText || 'No se detectó texto en la imagen.');
      setMatched(matchedResult ?? fallbackMatched);

      if (matchedResult ?? fallbackMatched) {
        speakArabic('أحسنت! استمر');
      } else {
        speakArabic('حاول مرة أخرى');
      }
    } catch (error) {
      console.error('OCR error:', error);
      Alert.alert('Error', 'No se pudo leer la imagen. Inténtalo de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  const handleNext = () => {
    if (index < EXERCISES.length - 1) {
      setIndex(prev => prev + 1);
      setLastResult(null);
      setMatched(null);
      handleStart();
      return;
    }
    speakArabic('ممتاز! لقد أنهيت هذا المستوى. استمر في التقدم');
    Alert.alert('¡Muy bien!', 'Has completado este nivel. ¡Sigue con el siguiente!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Aprende a Escribir</Text>
      <Text style={styles.subtitle}>التعلّم على الكتابة</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>{current.titleEs}</Text>
        <Text style={styles.cardLabelAr}>{current.titleAr}</Text>
        <Text style={styles.targetText}>{current.targetText}</Text>
        <Text style={styles.helperText}>Escribe el texto en papel y toma una foto.</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleStart}>
          <Ionicons name="volume-high" size={20} color="#000" />
          <Text style={styles.actionButtonText}>Escuchar instrucción</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleTakePhoto} disabled={busy}>
          {busy ? <ActivityIndicator color="#000" /> : <Ionicons name="camera" size={20} color="#000" />}
          <Text style={styles.actionButtonText}>Tomar foto</Text>
        </TouchableOpacity>
      </View>

      {lastResult !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Texto detectado:</Text>
          <Text style={styles.resultText}>{lastResult}</Text>
          {matched !== null && (
            <Text style={[styles.feedback, matched ? styles.ok : styles.fail]}>
              {matched ? '✅ Bien hecho' : '❌ Inténtalo de nuevo'}
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.nextButton, matched ? styles.nextButtonEnabled : styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!matched}
      >
        <Text style={styles.nextButtonText}>Siguiente nivel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    marginBottom: 18,
  },
  card: {
    width: '100%',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginBottom: 18,
  },
  cardLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  cardLabelAr: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 8,
  },
  targetText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  helperText: {
    color: '#d0d0d0',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFD700',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 16,
  },
  resultTitle: {
    color: '#FFD700',
    marginBottom: 8,
  },
  resultText: {
    color: '#fff',
  },
  feedback: {
    marginTop: 10,
    fontWeight: '600',
  },
  ok: {
    color: '#4CAF50',
  },
  fail: {
    color: '#FF6B6B',
  },
  nextButton: {
    marginTop: 18,
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonEnabled: {
    backgroundColor: '#FFD700',
  },
  nextButtonDisabled: {
    backgroundColor: '#444',
  },
  nextButtonText: {
    color: '#000',
    fontWeight: '600',
  },
});
