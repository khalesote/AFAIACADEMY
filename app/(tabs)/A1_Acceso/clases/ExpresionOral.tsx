import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { requestMicrophonePermission } from '../../../../utils/requestMicrophonePermission';

export default function ExpresionOral() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentExample, setCurrentExample] = useState<number | null>(null);
  const [exampleTranscripts, setExampleTranscripts] = useState<string[]>([]);
  const [webMode, setWebMode] = useState<boolean>(false);
  const [webPromptText, setWebPromptText] = useState<string>('');
  const [webPercent, setWebPercent] = useState<number | null>(null);

  const prompts = [
    {
      es: 'Preséntate (nombre, edad, país)',
      ar: 'قدّم نفسك (الاسم، العمر، البلد)',
      audio: 'Me llamo Ahmed, tengo 28 años y soy de Argelia.'
    },
    {
      es: 'Habla de tu familia (padres, hermanos, con quién vives)',
      ar: 'تحدث عن عائلتك (الوالدان، الإخوة، مع من تعيش)',
      audio: 'Vivo con mi familia. Tengo un hermano y una hermana.'
    },
    {
      es: 'Describe tu casa (habitaciones principales)',
      ar: 'صف بيتك (الغرف الرئيسية)',
      audio: 'Mi casa tiene salón, cocina, baño y dos dormitorios.'
    },
    {
      es: 'Cuenta qué haces en tu tiempo libre',
      ar: 'احْكِ ماذا تفعل في وقت فراغك',
      audio: 'En mi tiempo libre leo y escucho música.'
    },
    {
      es: 'Pide indicaciones para llegar a un lugar',
      ar: 'اطلب إرشادات للوصول إلى مكان',
      audio: 'Disculpe, ¿cómo llego a la estación?'
    },
    {
      es: 'Di cómo te sientes y si necesitas ayuda médica',
      ar: 'قل كيف تشعر وإذا كنت تحتاج مساعدة طبية',
      audio: 'No me siento bien. Me duele la cabeza.'
    },
    {
      es: 'Habla del clima de hoy y de tu estación favorita',
      ar: 'تحدث عن طقس اليوم وفصلك المفضل',
      audio: 'Hoy hace sol. Mi estación favorita es la primavera.'
    },
  ];

  const openWebRecognition = async (promptOverride?: string) => {
    const granted = await requestMicrophonePermission();
    if (!granted) {
      Alert.alert('Permiso requerido', 'Debes conceder acceso al micrófono para usar esta función.');
      return;
    }
    // Definir el texto objetivo a leer
    try {
      if (promptOverride) {
        setWebPromptText(promptOverride);
      } else if (currentExample !== null && prompts[currentExample]) {
        setWebPromptText(prompts[currentExample].audio);
      } else {
        // Texto genérico si no hay ejemplo seleccionado
        setWebPromptText('Di tu nombre, edad y de dónde eres.');
      }
    } catch { setWebPromptText(''); }
    setWebPercent(null);
    setWebMode(true);
  };

  const buildWebSpeechHTML = (promptText: string) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 16px; }
        .btn { padding: 10px 14px; border-radius: 8px; color: #fff; border: 0; margin-right: 8px; }
        .start { background: #79A890; }
        .stop { background: #e53935; }
        .box { background: #f5f5f5; padding: 12px; border-radius: 8px; margin-top: 12px; }
        .prompt { background: #f0f8f0; border-left: 4px solid #79A890; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
      </style>
    </head>
    <body>
      <h3>Reconocimiento Web (beta)</h3>
      <div class="prompt">
        <div style="font-weight:600; color:#79A890; margin-bottom:6px;">Texto a leer</div>
        <div id="target">${promptText.replace(/</g,'&lt;')}</div>
      </div>
      <button class="btn start" id="start">Hablar / <span dir="rtl">تحدث</span></button>
      <button class="btn stop" id="stop">Detener / <span dir="rtl">إيقاف</span></button>
      <div class="box">
        <div id="status">Listo</div>
        <div id="out" style="margin-top:8px"></div>
      </div>
      <script>
        (function(){
          const RN = window.ReactNativeWebView;
          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          let rec = null;
          const status = document.getElementById('status');
          const out = document.getElementById('out');
          function send(type, payload){ try { RN.postMessage(JSON.stringify({ type, payload })); } catch(e) { /* noop */ } }
          if (!SR) {
            status.textContent = 'Web Speech API no disponible en este motor.';
            send('error', 'Web Speech API no disponible');
          } else {
            rec = new SR();
            rec.lang = 'es-ES';
            rec.interimResults = true;
            rec.maxAlternatives = 1;
            rec.onstart = function(){ status.textContent = 'Grabando...'; send('status', 'start'); };
            rec.onend = function(){ status.textContent = 'Detenido'; send('status', 'end'); };
            rec.onerror = function(e){ status.textContent = 'Error: ' + (e.error||''); send('error', e.error||'error'); };
            rec.onresult = function(e){
              let txt = '';
              for (let i = e.resultIndex; i < e.results.length; i++) {
                txt += e.results[i][0].transcript + ' ';
              }
              out.textContent = txt.trim();
              send('result', txt.trim());
            };
          }
          document.getElementById('start').onclick = function(){ try { rec && rec.start(); } catch(e) { send('error', String(e)); } };
          document.getElementById('stop').onclick = function(){ try { rec && rec.stop(); } catch(e) { send('error', String(e)); } };
        })();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/A1_Acceso')}>
          <Ionicons name="arrow-back" size={28} color="#79A890" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="mic" size={50} color="#79A890" />
          <Text style={styles.title}>Expresión Oral A1</Text>
          <Text style={styles.titleAr}>التعبير الشفوي A1</Text>
          <Text style={styles.subtitle}>Practica hablando con guías y audios modelo</Text>
          <Text style={styles.subtitleAr}>تدرّب على التحدث باستخدام إرشادات ونماذج صوتية</Text>
        </View>
      </View>

      {/* Consejos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos de práctica</Text>
        <Text style={styles.sectionTitleAr}>نصائح للتدريب</Text>
        <View style={styles.tipsBox}>
          <Text style={styles.tip}>• Habla en voz alta 2-3 veces cada respuesta.</Text>
          <Text style={styles.tip}>• Imitar el ritmo del audio y la pronunciación.</Text>
          <Text style={styles.tip}>• Usa conectores: y, pero, porque.</Text>
          <Text style={styles.tipAr}>• تكلّم بصوت عالٍ 2-3 مرات لكل إجابة.</Text>
          <Text style={styles.tipAr}>• قُم بتقليد إيقاع الصوت والنطق.</Text>
          <Text style={styles.tipAr}>• استخدم روابط: و، لكن، لأن.</Text>
        </View>
        {/* Aviso eliminado para UI limpia */}
      </View>

      {/* Actividades guiadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lee el texto y comprueba tu español en el resultado de coincidencia</Text>
        <Text style={styles.sectionTitleAr}>أنشطة موجهة</Text>

        {/* Bloque de micrófono eliminado para UI minimalista */}

        {prompts.map((p, i) => (
          <View key={i} style={styles.promptCard}>
            <View style={styles.promptHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.promptEs}>{p.es}</Text>
                <Text style={styles.promptAr}>{p.ar}</Text>
              </View>
              {/* Botones de audio eliminados para UI minimalista */}
            </View>

            <View style={styles.exampleBox}>
              <Text style={styles.exampleTitle}>Modelo</Text>
              <Text style={styles.exampleText}>{p.audio}</Text>
            </View>

            {/* Práctica por ejemplo: lee en voz alta */}
            <View style={styles.micRow}>
              <TouchableOpacity
                style={[styles.micButton, { backgroundColor: '#455a64' }]}
                onPress={() => {
                  setCurrentExample(i);
                  openWebRecognition(p.audio);
                }}
              >
                <Ionicons name="mic" size={20} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.micButtonText}>Hablar{"\n"}<Text style={{ fontSize: 12, writingDirection: 'rtl' }}>تحدث</Text></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.transcriptBox}>
              <Text style={styles.transcriptLabel}>Tu transcripción:</Text>
              <Text style={styles.transcriptText}>{exampleTranscripts[i] || '—'}</Text>
              <Text style={[styles.transcriptLabel, { marginTop: 6 }]}>Coincidencia: {scoreSimilarity(exampleTranscripts[i] || '', p.audio)}%</Text>
            </View>

            <View style={styles.speakingHints}>
              <Text style={styles.hint}>Repite el modelo en voz alta. Luego intenta decir 1 frase extra (por ejemplo: dónde, cuándo, con quién).</Text>
              <Text style={styles.hintAr}>أعد النموذج بصوت عالٍ. ثم حاول إضافة جملة أخرى (مثلاً: أين، متى، مع من).</Text>
            </View>
          </View>
        ))}

        {/* El examen oral finaliza automáticamente */}

        {/* Tarjeta 'Objetivo' eliminada */}
      </View>
    </ScrollView>
    {/* Modal WebView Reconocimiento Web */}
    <Modal visible={webMode} animationType="slide" onRequestClose={() => setWebMode(false)}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#3f51b5' }}>
          <TouchableOpacity onPress={() => setWebMode(false)}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reconocimiento Web (beta)</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Texto objetivo visible también fuera de la WebView */}
        {!!webPromptText && (
          <View style={{ padding: 10, backgroundColor: '#f0f8f0' }}>
            <Text style={{ color: '#ff6f00', fontWeight: 'bold', marginBottom: 4 }}>Texto a leer</Text>
            <Text style={{ color: '#333' }}>{webPromptText}</Text>
          </View>
        )}
        <WebView
          originWhitelist={["*"]}
          source={{ html: buildWebSpeechHTML(webPromptText) }}
          onMessage={(event) => {
            try {
              const data = JSON.parse(event.nativeEvent.data || '{}');
              if (data?.type === 'result') {
                const txt = String(data.payload || '');
                setTranscript(txt);
                if (currentExample !== null) {
                  setExampleTranscripts((prev) => { const arr = [...prev]; arr[currentExample] = txt; return arr; });
                }
                try { setWebPercent(scoreSimilarity(txt, webPromptText)); } catch {}
              } else if (data?.type === 'error') {
                Alert.alert('Reconocimiento web', String(data.payload || 'Error'));
              }
            } catch {}
          }}
          // Conceder permisos de micrófono dentro de la WebView (Android)
          onPermissionRequest={(e: any) => {
            // @ts-ignore: RN WebView types
            try { e.grant(e.resources); } catch {}
          }}
        />
        {/* Porcentaje en tiempo real */}
        <View style={{ paddingVertical: 16, backgroundColor: '#fff', alignItems: 'center' }}>
          {typeof webPercent === 'number' && (
            <>
              {webPercent === 100 ? (
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#2e7d32', marginBottom: 6 }}>¡Enhorabuena!</Text>
              ) : (
                <>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#c62828' }}>Sigue intentando</Text>
                  <Text style={{ fontSize: 16, color: '#c62828', writingDirection: 'rtl', marginBottom: 6 }}>واصل المحاولة</Text>
                </>
              )}
              <Text style={{ fontSize: 48, marginBottom: 6 }}>
                {webPercent === 100 ? '😄' : (webPercent >= 50 ? '🙂' : '😐')}
              </Text>
              <Text style={{ fontSize: 56, fontWeight: 'bold', color: webPercent >= 70 ? '#2e7d32' : '#c62828' }}>{webPercent}%</Text>
            </>
          )}
        </View>
        <View style={{ padding: 12, backgroundColor: '#fff' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#79A890', paddingVertical: 12, borderRadius: 8, alignItems: 'center' }}
            onPress={() => { setWebMode(false); }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Comprobar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  titleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleAr: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTextAr: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  micBox: {
    backgroundColor: '#eef6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  micTitle: {
    fontSize: 14,
    color: '#79A890',
    marginBottom: 8,
    fontWeight: '600',
  },
  micRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  micButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  micButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transcriptBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  transcriptLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  transcriptText: {
    fontSize: 16,
    color: '#333',
  },
  tipsBox: {
    backgroundColor: '#f8f9fa',
    padding: 14,
    borderRadius: 10,
  },
  tip: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  tipAr: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  promptCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  promptEs: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
  },
  promptAr: {
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
  },
  exampleBox: {
    backgroundColor: '#f0f8f0',
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
    padding: 10,
    borderRadius: 8,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
  },
  speakingHints: {
    marginTop: 10,
  },
  hint: {
    fontSize: 13,
    color: '#333',
  },
  hintAr: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  finishButton: {
    marginTop: 10,
    backgroundColor: '#388e3c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Evalúa la coincidencia por palabras entre el modelo y la transcripción del usuario
function scoreSimilarity(user: string, model: string): number {
  const norm = (s: string) => (s || '')
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^a-záéíóúüñ\s]/g, '')
    .trim();
  const u = norm(user).split(/\s+/).filter(Boolean);
  const m = norm(model).split(/\s+/).filter(Boolean);
  if (m.length === 0) return 0;
  let hits = 0;
  const setU = new Set(u);
  for (const w of m) if (setU.has(w)) hits++;
  return Math.min(100, Math.round((hits / m.length) * 100));
}

// Función para verificar si el usuario completó suficientes ejercicios con buena puntuación
const checkOralCompletion = async (prompts: any[], exampleTranscripts: string[]) => {
  try {
    // Verificar si ya está aprobado
    const alreadyPassed = await AsyncStorage.getItem('A1_oral_gate_passed');
    if (alreadyPassed === 'true') {
      return true;
    }

    // Contar cuántos ejercicios tienen buena puntuación (≥70%)
    let goodScores = 0;
    let completedExercises = 0;
    const requiredGoodScores = 5; // Requiere al menos 5 ejercicios con buena puntuación
    const totalExercises = prompts.length;

    for (let i = 0; i < totalExercises; i++) {
      const userTranscript = exampleTranscripts[i] || '';
      if (userTranscript) {
        completedExercises++;
        const score = scoreSimilarity(userTranscript, prompts[i].audio);
        if (score >= 70) {
          goodScores++;
        }
      }
    }

    // Actualizar el progreso del examen oral
    const progress = Math.round((completedExercises / totalExercises) * 100);
    await AsyncStorage.setItem('A1_oral_progress', progress.toString());

    return goodScores >= requiredGoodScores;
  } catch (error) {
    console.error('Error checking oral completion:', error);
    return false;
  }
};

// Función para actualizar el progreso del examen oral
const updateOralProgress = async (completed: number, total: number) => {
  try {
    const progress = Math.round((completed / total) * 100);
    await AsyncStorage.setItem('A1_oral_progress', progress.toString());
    return progress;
  } catch (error) {
    console.error('Error al actualizar el progreso del examen oral:', error);
    return 0;
  }
};

// Función para finalizar el examen oral
const finalizarExamenOral = async (prompts: any[], exampleTranscripts: string[], router: any) => {
  try {
    const completed = await checkOralCompletion(prompts, exampleTranscripts);

    if (completed) {
      // Marcar como aprobado
      await AsyncStorage.setItem('A1_oral_gate_passed', 'true');

      Alert.alert(
        '¡Examen Oral Aprobado!',
        'Has completado exitosamente el examen oral. Ahora puedes acceder al examen escrito.',
        [
          {
            text: 'Continuar al Examen Escrito',
            onPress: () => router.push('/A1_Acceso/clases/ExamenOralGateway')
          }
        ]
      );
    } else {
      // No mostrar alerta de pendiente, solo continuar practicando
      return false;
    }
  } catch (error) {
    Alert.alert('Error', 'Hubo un problema al procesar el examen oral.');
  }
};
