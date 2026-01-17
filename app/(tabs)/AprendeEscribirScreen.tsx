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
  { id: 'frase-1', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Yo vivo en Madrid', speakAr: 'اكتب الجملة: Yo vivo en Madrid' },
  { id: 'frase-2', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Me llamo Ana', speakAr: 'اكتب الجملة: Me llamo Ana' },
  { id: 'frase-3', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Tengo una casa pequeña', speakAr: 'اكتب الجملة: Tengo una casa pequeña' },
  { id: 'frase-4', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Mi amigo trabaja hoy', speakAr: 'اكتب الجملة: Mi amigo trabaja hoy' },
  { id: 'frase-5', titleEs: 'Frases', titleAr: 'جمل', targetText: 'El niño juega en el parque', speakAr: 'اكتب الجملة: El niño juega en el parque' },
  { id: 'frase-6', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Voy al médico por la mañana', speakAr: 'اكتب الجملة: Voy al médico por la mañana' },
  { id: 'frase-7', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Necesito una cita para hoy', speakAr: 'اكتب الجملة: Necesito una cita para hoy' },
  { id: 'frase-8', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Mi hermana vive en Sevilla', speakAr: 'اكتب الجملة: Mi hermana vive en Sevilla' },
  { id: 'frase-9', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Tenemos clase a las nueve', speakAr: 'اكتب الجملة: Tenemos clase a las nueve' },
  { id: 'frase-10', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Quiero aprender español', speakAr: 'اكتب الجملة: Quiero aprender español' },
  { id: 'frase-11', titleEs: 'Frases', titleAr: 'جمل', targetText: 'La tienda está abierta', speakAr: 'اكتب الجملة: La tienda está abierta' },
  { id: 'frase-12', titleEs: 'Frases', titleAr: 'جمل', targetText: 'El autobús llega tarde', speakAr: 'اكتب الجملة: El autobús llega tarde' },
  { id: 'frase-13', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Necesito comprar pan', speakAr: 'اكتب الجملة: Necesito comprar pan' },
  { id: 'frase-14', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Mi familia es muy grande', speakAr: 'اكتب الجملة: Mi familia es muy grande' },
  { id: 'frase-15', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Me gusta escuchar música', speakAr: 'اكتب الجملة: Me gusta escuchar música' },
  { id: 'frase-16', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Hoy hace mucho frío', speakAr: 'اكتب الجملة: Hoy hace mucho frío' },
  { id: 'frase-17', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Busco trabajo en Madrid', speakAr: 'اكتب الجملة: Busco trabajo en Madrid' },
  { id: 'frase-18', titleEs: 'Frases', titleAr: 'جمل', targetText: 'El profesor es muy amable', speakAr: 'اكتب الجملة: El profesor es muy amable' },
  { id: 'frase-19', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Quiero un café con leche', speakAr: 'اكتب الجملة: Quiero un café con leche' },
  { id: 'frase-20', titleEs: 'Frases', titleAr: 'جمل', targetText: 'Mañana vamos al mercado', speakAr: 'اكتب الجملة: Mañana vamos al mercado' },
];

const normalizeText = (text: string) => (text || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9ñáéíóúü\s]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const calcSimilarityPercent = (a: string, b: string) => {
  if (!a && !b) return 100;
  if (!a || !b) return 0;
  const s1 = a;
  const s2 = b;
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i += 1) dp[i][0] = i;
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  const distance = dp[m][n];
  const maxLen = Math.max(m, n) || 1;
  return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
};

const getInstructionByType = (titleEs: string) => {
  if (titleEs === 'Letra') {
    return 'Escribe la letra grande y separada. No la pegues a otras letras.';
  }
  if (titleEs === 'Sílabas') {
    return 'Escribe la sílaba en mayúsculas y bien separada.';
  }
  if (titleEs === 'Palabras') {
    return 'Escribe la palabra completa en una sola línea y con letras claras.';
  }
  return 'Escribe la frase completa con espacios entre palabras.';
};

export default function AprendeEscribirScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [matched, setMatched] = useState<boolean | null>(null);
  const [similarity, setSimilarity] = useState<number | null>(null);

  const current = useMemo(() => EXERCISES[index], [index]);

  const speakArabic = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'ar-SA', rate: 0.9 });
  };

  const getIntroArabic = (titleEs: string, targetText: string) => {
    if (titleEs === 'Letra') {
      return `من فضلك اكتب الحرف ${targetText} كبيراً وبشكل منفصل، ولا تكتبه ملاصقاً لحروف أخرى.`;
    }
    if (titleEs === 'Sílabas') {
      return `من فضلك اكتب المقطع ${targetText} بحروف كبيرة وواضحة.`;
    }
    if (titleEs === 'Palabras') {
      return `من فضلك اكتب كلمة ${targetText} كاملة في سطر واحد وبحروف واضحة.`;
    }
    return `من فضلك اكتب الجملة التالية كاملة مع ترك مسافة بين الكلمات: ${targetText}.`;
  };

  const handleStart = () => {
    const intro =
      'من فضلك خذ ورقة من الدفتر، اكتب الجملة التي تراها مع احترام الخطوط، ثم التقط صورة وأرسلها للتقييم.';
    speakArabic(intro);
    setTimeout(() => speakArabic(current.speakAr), 1500);
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
      setSimilarity(null);

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
      const similarityValue = calcSimilarityPercent(normalizedDetected, normalizedExpected);

      setLastResult(detectedText || 'No se detectó texto en la imagen.');
      setMatched(matchedResult ?? fallbackMatched);
      setSimilarity(similarityValue);

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
      setSimilarity(null);
      handleStart();
      return;
    }
    speakArabic('ممتاز! لقد أنهيت هذا المستوى. استمر في التقدم');
    Alert.alert('¡Muy bien!', 'Has completado este nivel. ¡Sigue con el siguiente!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  React.useEffect(() => {
    handleStart();
  }, [current.id]);

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
        <View pointerEvents="none" style={styles.linedPaper}>
          {Array.from({ length: 3 }).map((_, groupIndex) => {
            const baseTop = 48 + groupIndex * 96;
            const gap = 8;
            return (
              <View key={`group-${groupIndex}`}>
                <View style={[styles.linedThin, { top: baseTop - gap * 3 }]} />
                <View style={[styles.linedThin, { top: baseTop - gap * 2 }]} />
                <View style={[styles.linedThin, { top: baseTop - gap }]} />
                <View style={[styles.linedThick, { top: baseTop }]} />
                <View style={[styles.linedThin, { top: baseTop + gap }]} />
                <View style={[styles.linedThin, { top: baseTop + gap * 2 }]} />
                <View style={[styles.linedThin, { top: baseTop + gap * 3 }]} />
              </View>
            );
          })}
          <Text style={styles.sampleText}>{current.targetText}</Text>
        </View>
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
          {typeof similarity === 'number' && (
            <Text style={styles.precisionText}>Precisión estimada: {similarity}%</Text>
          )}
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginBottom: 18,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 320,
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
  linedPaper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
  },
  linedThin: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#cfcfcf',
  },
  linedThick: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#7ecbff',
  },
  sampleText: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: 48 - 18,
    color: '#000',
    fontSize: 16,
    lineHeight: 22,
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
  precisionText: {
    color: '#FFD700',
    marginTop: 8,
    fontWeight: '600',
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
