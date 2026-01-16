import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Platform, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { requestMicrophonePermission } from '../../utils/requestMicrophonePermission';

const PALABRAS_Y_FRASES = [
  'Tres tristes tigres tragan trigo en un trigal',
  'Pedro Pérez pintor pinta preciosos paisajes por poca plata para poder partir para París',
  'El cielo está enladrillado, ¿quién lo desenladrillará?',
  'Erre con erre guitarra, erre con erre barril',
  'Pablito clavó un clavito, ¿qué clavito clavó Pablito?',
  'Mi mamá me mima, mi mamá me ama',
  'Rápido ruedan los carros cargados de azúcar al ferrocarril',
  'Juan junta juncos junto a la zanja',
  'Compadre, cómprame un coco, compadre, coco no compro',
  'El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha cortado',
  'El amor todo lo puede',
  'La rana rema en el río',
  'Parangaricutirimícuaro',
  'Otorrinolaringólogo',
  'Supercalifragilisticoespialidoso',
  'Hoy es un buen día para aprender español',
  'El rey de Constantinopla se quiere descontantinopolizar',
  'El que poco coco come, poco coco compra',
  'Si el caracol tuviera cara como tiene el caracol',
  'Me han dicho que has dicho un dicho, un dicho que he dicho yo',
  'El hipopótamo Hipo está con hipo, ¿quién le quita el hipo al hipopótamo Hipo?',
  'Pancha plancha con cuatro planchas, ¿con cuántas planchas Pancha plancha?',
  'El vino vino, pero el vino no vino vino, el vino vino vinagre',
  'Cómo quieres que te quiera si el que quiero que me quiera no me quiere como quiero que me quiera',
  'Cuando cuentes cuentos, cuenta cuántos cuentos cuentas',
  'Si tu gusto gustara del gusto que gusta mi gusto, mi gusto gustaría del gusto que gusta tu gusto',
  'El perro de Rita me irrita, dile a Rita que cambie el perro de Rita por una perrita',
  'La bruja piruja prepara un brebaje en un frasco',
  'El otorrinolaringólogo de Parangaricutirimícuaro no pudo con el supercalifragilisticoespialidoso',
];

import { useRouter } from 'expo-router';

const FoneticaJuegoReconocimientoScreen = () => {
  const router = useRouter();
  
  const [grabandoIndex, setGrabandoIndex] = useState<number | null>(null);
  const [webMode, setWebMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [transcripts, setTranscripts] = useState<string[]>(Array(PALABRAS_Y_FRASES.length).fill(''));
  const [percents, setPercents] = useState<(number | null)[]>(Array(PALABRAS_Y_FRASES.length).fill(null));

  const iniciarGrabacion = async (index: number) => {
    setGrabandoIndex(index);
    await abrirReconocimiento(index);
    setGrabandoIndex(null);
  };

  const abrirReconocimiento = async (index: number) => {
    const granted = await requestMicrophonePermission();
    if (!granted) {
      Alert.alert('Permiso requerido', 'Debes conceder acceso al micrófono para usar esta función.');
      return;
    }
    setCurrentIndex(index);
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
        .start { background: #1976d2; }
        .stop { background: #e53935; }
        .box { background: #f5f5f5; padding: 12px; border-radius: 8px; margin-top: 12px; }
        .prompt { background: #fff3e0; border-left: 4px solid #ff9800; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
      </style>
    </head>
    <body>
      <h3>Reconocimiento Web (beta)</h3>
      <div class="prompt">
        <div style="font-weight:600; color:#ff9800; margin-bottom:6px;">Texto a leer</div>
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
          function send(type, payload){ try { RN.postMessage(JSON.stringify({ type, payload })); } catch(e) {} }
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
              for (let i = e.resultIndex; i < e.results.length; i++) { txt += e.results[i][0].transcript + ' '; }
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

  const currentPrompt = currentIndex !== null ? PALABRAS_Y_FRASES[currentIndex] : '';
  const currentPercent = currentIndex !== null ? percents[currentIndex] : null;

  const getFeedback = (percent: number | null) => {
    if (percent === null) return null;
    if (percent >= 90) return { text: '¡Enhorabuena!', emoji: '😄', color: '#2e7d32' };
    if (percent >= 70) return { text: 'Muy bien, sigue así', emoji: '🙂', color: '#2e7d32' };
    if (percent >= 50) return { text: 'Bien, puedes mejorar', emoji: '😐', color: '#f9a825' };
    return { text: 'Sigue intentando', emoji: '😕', color: '#c62828' };
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.itemContainer}>
      {/** Feedback visible por frase */}
      {getFeedback(percents[index]) && (
        <View style={styles.feedbackRow}>
          <Text style={[styles.feedbackText, { color: getFeedback(percents[index])?.color }]}>
            {getFeedback(percents[index])?.text}
          </Text>
          <Text style={styles.feedbackEmoji}>{getFeedback(percents[index])?.emoji}</Text>
        </View>
      )}
      <Text style={styles.text}>{item}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => iniciarGrabacion(index)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={grabandoIndex === index ? ['#d32f2f', '#b71c1c'] : ['#9DC3AA', '#79A890']}
            style={styles.botonGradient}
          >
            <Text style={styles.botonTexto}>{grabandoIndex === index ? 'Iniciando...' : 'Grabar'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.transcriptBox}>
        <Text style={styles.transcriptLabel}>Tu transcripción:</Text>
        <Text style={styles.transcriptText}>{transcripts[index] || '—'}</Text>
        <Text style={[styles.transcriptLabel, { marginTop: 6 }]}>
          Coincidencia: {typeof percents[index] === 'number' ? `${percents[index]}%` : '—'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Flecha de regreso */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/FoneticaMenuScreen')}
      >
        <Text style={{ fontSize: 28 }}>←</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Practica tu pronunciación</Text>
      <Text style={styles.tituloAr}>تدرب على نطقك</Text>
      <FlatList
        data={PALABRAS_Y_FRASES}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
      />
      <Text style={styles.instruccion}>
        Graba tu pronunciación y usa el reconocimiento de voz para recibir feedback inmediato.
      </Text>
      <Modal visible={webMode} animationType="slide" onRequestClose={() => setWebMode(false)}>
        <View style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setWebMode(false)}>
              <Text style={styles.modalHeaderText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Reconocimiento Web (beta)</Text>
            <View style={{ width: 24 }} />
          </View>
          {!!currentPrompt && (
            <View style={styles.modalPrompt}>
              <Text style={styles.modalPromptLabel}>Texto a leer</Text>
              <Text style={styles.modalPromptText}>{currentPrompt}</Text>
            </View>
          )}
          <WebView
            originWhitelist={["*"]}
            source={{ html: buildWebSpeechHTML(currentPrompt) }}
            onMessage={(event) => {
              try {
                const data = JSON.parse(event.nativeEvent.data || '{}');
                if (data?.type === 'result') {
                  const txt = String(data.payload || '');
                  if (currentIndex !== null) {
                    setTranscripts((prev) => {
                      const arr = [...prev];
                      arr[currentIndex] = txt;
                      return arr;
                    });
                    const score = scoreSimilarity(txt, currentPrompt);
                    setPercents((prev) => {
                      const arr = [...prev];
                      arr[currentIndex] = score;
                      return arr;
                    });
                  }
                } else if (data?.type === 'error') {
                  Alert.alert('Reconocimiento web', String(data.payload || 'Error'));
                }
              } catch {}
            }}
            onPermissionRequest={(e: any) => {
              try { e.grant(e.resources); } catch {}
            }}
          />
          <View style={styles.modalFeedback}>
            {typeof currentPercent === 'number' && (
              <>
                {currentPercent === 100 ? (
                  <Text style={[styles.modalFeedbackText, { color: '#2e7d32' }]}>¡Enhorabuena!</Text>
                ) : (
                  <>
                    <Text style={[styles.modalFeedbackText, { color: '#c62828' }]}>Sigue intentando</Text>
                    <Text style={[styles.modalFeedbackText, { color: '#c62828', fontSize: 14, writingDirection: 'rtl' }]}>واصل المحاولة</Text>
                  </>
                )}
                <Text style={styles.modalEmoji}>
                  {currentPercent === 100 ? '😄' : (currentPercent >= 50 ? '🙂' : '😐')}
                </Text>
                <Text style={[styles.modalPercent, { color: currentPercent >= 70 ? '#2e7d32' : '#c62828' }]}>
                  {currentPercent}%
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 36 : 60,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 36 : 60,
    left: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#79A890',
  },
  tituloAr: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#79A890',
    writingDirection: 'rtl',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    elevation: 2,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boton: {
    borderRadius: 8,
    marginRight: 10,
    overflow: 'hidden',
    flex: 1,
  },
  botonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  transcriptBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  transcriptLabel: {
    fontSize: 12,
    color: '#555',
  },
  transcriptText: {
    fontSize: 14,
    color: '#222',
    marginTop: 4,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackEmoji: {
    fontSize: 22,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#3f51b5',
  },
  modalHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalHeaderTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalPrompt: {
    padding: 10,
    backgroundColor: '#fff3e0',
  },
  modalPromptLabel: {
    color: '#ff6f00',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalPromptText: {
    color: '#333',
  },
  modalFeedback: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalFeedbackText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 6,
  },
  modalPercent: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  instruccion: {
    marginTop: 24,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});

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

export default FoneticaJuegoReconocimientoScreen;
