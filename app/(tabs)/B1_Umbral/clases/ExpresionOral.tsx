import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';

const PREGUNTAS = [
  {
    es: "¿Qué opinas sobre el uso de la tecnología en la vida diaria?",
    ar: "ما رأيك في استخدام التكنولوجيا في الحياة اليومية؟"
  },
  {
    es: "¿Cuál ha sido tu mejor experiencia de viaje y por qué?",
    ar: "ما هي أفضل تجربة سفر مررت بها ولماذا؟"
  },
  {
    es: "¿Qué consejos darías para llevar una vida saludable?",
    ar: "ما النصائح التي تقدمها لعيش حياة صحية؟"
  },
  {
    es: "¿Qué importancia tiene aprender idiomas en el mundo actual?",
    ar: "ما أهمية تعلم اللغات في العالم الحالي؟"
  },
  {
    es: "Describe una situación en la que resolviste un problema importante.",
    ar: "صف موقفاً حللت فيه مشكلة مهمة."
  }
];

// Párrafos/relatos históricos para lectura en voz alta (B1)
const PARRAFOS_LECTURA: string[] = [
  'En 1492, Cristóbal Colón emprendió un viaje que cambiaría la historia. Zarpó desde el puerto de Palos con tres carabelas y, tras semanas en alta mar, llegó a un continente desconocido para los europeos.',
  'Durante la Edad de Oro de la literatura española, autores como Miguel de Cervantes y Lope de Vega escribieron obras que marcaron un antes y un después en la cultura hispana. El ingenioso hidalgo Don Quijote de la Mancha es quizá el ejemplo más famoso.',
  'En muchas ciudades de España, las plazas han sido lugares de encuentro y comercio durante siglos. Allí se celebraban ferias, mercados y fiestas populares que fortalecían los lazos de la comunidad.',
  'La ruta de peregrinación del Camino de Santiago ha atraído a viajeros de todo el mundo desde la Edad Media. Más allá del motivo religioso, muchos caminan para descubrir paisajes, historias y, sobre todo, a sí mismos.',
  'A principios del siglo XX, la llegada de nuevas corrientes artísticas transformó la pintura y la arquitectura. Figuras como Pablo Picasso y Antoni Gaudí exploraron formas innovadoras que siguen inspirando a generaciones.'
];

// NOTA IMPORTANTE

const NotaWhatsApp = () => (
  <Text style={{
    backgroundColor: '#ffe082',
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 18,
    padding: 14,
    borderRadius: 10,
  }}>
    ENVIAR AL WHATSAPP DEL PROFESOR PARA EVALUACIÓN (INDICAR NOMBRE Y APELLIDO)
    {'\n'}
    أرسل إلى واتساب الأستاذ للتقييم (يُرجى ذكر الاسم واللقب)
  </Text>
);

export default function ExpresionOral() {
  const router = useRouter();
  const [preguntaIdx, setPreguntaIdx] = useState(0); // legacy, no UI usage

  // Estado para lectura en voz alta con WebView (reconocimiento de voz)
  const [webMode, setWebMode] = useState(false);
  const [oralIndex, setOralIndex] = useState(0);
  const [oralScores, setOralScores] = useState<number[]>([0,0,0,0,0]);
  const [webPromptText, setWebPromptText] = useState('');
  const [webPercent, setWebPercent] = useState<number | null>(null);


  const openLecturaAt = (idx: number) => {
    try {
      setOralIndex(idx);
      setOralScores([0,0,0,0,0]);
      setWebPercent(null);
      setWebPromptText(PARRAFOS_LECTURA[idx]);
      setWebMode(true);
    } catch {}
  };

  const getPreview = (s: string) => {
    const words = (s || '').split(/\s+/).filter(Boolean);
    return words.slice(0, 10).join(' ') + (words.length > 10 ? '…' : '');
  };

  const handleStartLectura = async () => {
    try {
      setOralIndex(0);
      setOralScores([0,0,0,0,0]);
      setWebPercent(null);
      setWebPromptText(PARRAFOS_LECTURA[0]);
      setWebMode(true);
    } catch (e) {
      Alert.alert('Error', 'No se pudo iniciar la lectura.');
    }
  };

  const handleNextLectura = async () => {
    const score = typeof webPercent === 'number' ? Math.round(webPercent) : 0;
    setOralScores(prev => { const arr=[...prev]; arr[oralIndex]=score; return arr; });
    const filled = oralScores.map((v,i)=> (i===oralIndex ? score : v));
    const aprobadas = filled.filter(v => v === 100).length;
    if (oralIndex < PARRAFOS_LECTURA.length - 1) {
      const next = oralIndex + 1; setOralIndex(next); setWebPromptText(PARRAFOS_LECTURA[next]); setWebPercent(null);
    } else {
      setWebMode(false);
      Alert.alert('Práctica terminada', `Lecturas al 100%: ${aprobadas}/5. Puedes repetir cuando quieras.`);
    }
  };

  // HTML para WebView con Web Speech API (lectura en voz alta)
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
          .prompt { background: #fff3e0; border-left: 4px solid #333; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <h3>Lectura en voz alta (Reconocimiento web)</h3>
        <div style="color:#555; font-size:14px; margin-bottom:8px;">Lee el siguiente párrafo en voz alta. El reconocimiento se inicia automáticamente; si no, pulsa "Hablar".</div>
        <div class="prompt">
          <div style="font-weight:600; color:#333; margin-bottom:6px;">Texto a leer</div>
          <div id="target">${(promptText || '').replace(/</g,'&lt;')}</div>
        </div>
        <button class="btn start" id="start">Hablar</button>
        <button class="btn stop" id="stop">Detener</button>
        <div class="box">
          <div id="status">Listo</div>
          <div id="out" style="margin-top:8px"></div>
        </div>
        <div style="text-align:center; margin-top:12px;">
          <div id="pct" style="font-size:56px; font-weight:bold; color:#c62828;">0%</div>
        </div>
        <script>
          (function(){
            const RN = window.ReactNativeWebView;
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            let rec = null;
            const status = document.getElementById('status');
            const out = document.getElementById('out');
            const pctEl = document.getElementById('pct');
            const norm = (s) => (s||'').toLowerCase().normalize('NFC').replace(/[^a-záéíóúüñ\s]/g,'').trim();
            const target = norm(${JSON.stringify(''+(typeof promptText==='string'?promptText:''))});
            function scoreSimilarity(user, model){
              const u = norm(user).split(/\s+/).filter(Boolean);
              const m = norm(model).split(/\s+/).filter(Boolean);
              if (m.length === 0) return 0;
              const setU = new Set(u); let hits = 0; for (const w of m) if (setU.has(w)) hits++;
              return Math.min(100, Math.round((hits / m.length) * 100));
            }
            function send(type, payload){ try { RN.postMessage(JSON.stringify({ type, payload })); } catch(e) {} }
            if (!SR) { status.textContent = 'Web Speech no disponible'; send('error','no-sr'); }
            else {
              rec = new SR(); rec.lang='es-ES'; rec.interimResults=true; rec.maxAlternatives=1;
              rec.onstart=()=>{ status.textContent='Grabando...'; send('status','start'); };
              rec.onend=()=>{ status.textContent='Detenido'; send('status','end'); };
              rec.onerror=(e)=>{ status.textContent='Error: '+(e.error||''); send('error',e.error||'error'); };
              rec.onresult=(e)=>{ let txt=''; for(let i=e.resultIndex;i<e.results.length;i++){ txt += e.results[i][0].transcript+' '; }
                out.textContent=txt.trim(); const p=scoreSimilarity(txt.trim(), target); pctEl.textContent=p+'%'; send('result',{ text: txt.trim(), percent: p }); };
            }
            document.getElementById('start').onclick=()=>{ try{ rec && rec.start(); }catch(e){} };
            document.getElementById('stop').onclick=()=>{ try{ rec && rec.stop(); }catch(e){} };
            setTimeout(()=>{ try{ rec && rec.start(); }catch(e){} }, 300);
          })();
        </script>
      </body>
    </html>
  `;

  // (Pronunciación/transliteración eliminada por petición)

  return (
    <LinearGradient colors={['#79A890', '#9DC3AA']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <View style={{ width: '100%' }}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerBack} onPress={() => router.push('/B1_Umbral')}>
              <Ionicons name="arrow-back" size={24} color="#79A890" />
            </TouchableOpacity>
            <Ionicons name="school" size={64} color="#fff" />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Prácticas de Expresión Oral B1</Text>
            <Text style={styles.cardText}>Lee en voz alta 5 párrafos. Verás tu porcentaje de coincidencia en tiempo real.</Text>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#fff' }]} onPress={handleStartLectura}>
            <Text style={[styles.buttonText, { color: '#79A890' }]}>Lectura secuencial (5 párrafos)</Text>
          </TouchableOpacity>
          {/* Tarjetas con textos completos (estilo A1/A2) */}
          <View style={{ width: '100%', marginTop: 8 }}>
            {PARRAFOS_LECTURA.map((p, idx) => (
              <View key={idx} style={styles.promptCard}>
                <View style={styles.promptHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.promptEs}>Párrafo {idx + 1}</Text>
                  </View>
                </View>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleTitle}>Texto</Text>
                  <Text style={styles.exampleText}>{p}</Text>
                </View>
                <View style={styles.micRow}>
                  <TouchableOpacity
                    style={[styles.micButton, { backgroundColor: '#79A890' }]}
                    onPress={() => openLecturaAt(idx)}
                  >
                    <Ionicons name="mic" size={20} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.micButtonText}>Hablar{"\n"}<Text style={{ fontSize: 12, writingDirection: 'rtl' }}>تحدث</Text></Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

      {webMode && (
        <Modal visible transparent animationType="fade" onRequestClose={() => setWebMode(false)}>
          <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' }}>
            <View style={{ backgroundColor:'#fff', borderRadius:12, width:'92%', maxHeight:'86%', overflow:'hidden' }}>
              <View style={{ padding:12, backgroundColor:'#79A890' }}>
                <Text style={{ color:'#fff', fontWeight:'bold', textAlign:'center' }}>Lectura B1 (práctica)</Text>
              </View>
              <View style={{ height: 420 }}>
                <WebView
                  originWhitelist={["*"]}
                  source={{ html: buildWebSpeechHTML(webPromptText) }}
                  onMessage={(event) => {
                    try {
                      const data = JSON.parse(event.nativeEvent.data);
                      if (data?.type === 'result' && typeof data?.payload?.percent === 'number') {
                        setWebPercent(Math.round(data.payload.percent));
                      }
                    } catch {}
                  }}
                />
              </View>
              <View style={{ padding:12 }}>
                <Text style={{ textAlign:'center', marginBottom:8 }}>Lecturas al 100%: {oralScores.filter(s => s === 100).length} / 5</Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                  <TouchableOpacity style={[styles.button, { backgroundColor:'#e0e0e0', flex:1, marginRight:6 }]} onPress={() => {
                    if (oralIndex > 0) {
                      const prev = oralIndex - 1; setOralIndex(prev); setWebPromptText(PARRAFOS_LECTURA[prev]); setWebPercent(null);
                    }
                  }}>
                    <Text style={[styles.buttonText, { color:'#333' }]}>Anterior</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor:'#79A890', flex:1, marginLeft:6 }]} onPress={handleNextLectura}>
                    <Text style={styles.buttonText}>{oralIndex < PARRAFOS_LECTURA.length - 1 ? 'Siguiente' : 'Finalizar'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setWebMode(false)} style={{ marginTop:8, alignSelf:'center' }}>
                  <Text style={{ color:'#1976d2' }}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 24 },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
    marginBottom: 4,
  },
  avisoText: {
    color: '#79A890',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  cambiarPreguntaBtn: {
    backgroundColor: '#e3eafc',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 6,
  },
  cambiarPreguntaTxt: {
    color: '#79A890',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  backButtonText: {
    color: '#79A890',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // container already defined above; do not redefine
  headerBack: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 2,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginTop: 12,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 18,
    textAlign: 'center',
  },
  cardText: {
    color: '#fff',
    textAlign: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4, textAlign: 'center' },
  titleAr: { fontSize: 18, color: '#79A890', textAlign: 'right', writingDirection: 'rtl', marginBottom: 8, marginTop: 2 },
  text: { fontSize: 16, marginBottom: 4, textAlign: 'center' },
  textAr: { fontSize: 16, marginBottom: 14, color: '#79A890', textAlign: 'center', writingDirection: 'rtl' },
  button: {
    backgroundColor: '#79A890',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  // A1/A2-style prompt card and reading controls
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
  exampleBox: {
    backgroundColor: '#fff3e0',
    borderLeftWidth: 4,
    borderLeftColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
  },
  micRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
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

});
