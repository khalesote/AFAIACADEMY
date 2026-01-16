import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cuentos breves / párrafos para lectura en voz alta (B2)
const PARRAFOS_B2: string[] = [
  'En una tarde de otoño, un periodista recorrió los barrios históricos de la ciudad para entrevistar a los vecinos acerca de los cambios urbanísticos. Entre fachadas restauradas y plazas renovadas, muchos recordaban la vida de antes, cuando el mercado se llenaba al amanecer.',
  'Durante la última década, los trenes de alta velocidad han reducido distancias y conectado regiones. No obstante, los pueblos pequeños reclaman inversiones en líneas locales para no quedar aislados del resto del país.',
  'En un taller comunitario, voluntarios enseñan a personas mayores a usar aplicaciones de videollamadas. Gracias a ello, pueden hablar con familiares emigrados y compartir momentos cotidianos sin importar la distancia.',
  'Una cooperativa agrícola apostó por el cultivo ecológico y la venta directa. Con el tiempo, fidelizó a clientes que valoran la trazabilidad de los productos y el respeto por el entorno rural.',
  'En la biblioteca del barrio, un club de lectura reúne cada mes a personas de distintas edades y países. Debaten novelas contemporáneas y clásicos, fomentando el pensamiento crítico y el diálogo intercultural.'
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
      setWebPromptText(PARRAFOS_B2[idx]);
      setWebMode(true);
    } catch {}
  };

  const handleStartLectura = async () => {
    try {
      setOralIndex(0);
      setOralScores([0,0,0,0,0]);
      setWebPercent(null);
      setWebPromptText(PARRAFOS_B2[0]);
      setWebMode(true);
    } catch (e) {
      Alert.alert('Error', 'No se pudo iniciar la lectura.');
    }
  };

  const handleNextLectura = async () => {
    const score = typeof webPercent === 'number' ? Math.round(webPercent) : 0;
    setOralScores(prev => { const arr=[...prev]; arr[oralIndex]=score; return arr; });
    if (oralIndex < PARRAFOS_B2.length - 1) {
      const next = oralIndex + 1; setOralIndex(next); setWebPromptText(PARRAFOS_B2[next]); setWebPercent(null);
    } else {
      setWebMode(false);
      const aprobadas = oralScores.filter(s => s === 100).length;
      Alert.alert('Práctica terminada', `Lecturas al 100%: ${aprobadas}/5. Puedes repetir cuando quieras.`);
    }
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
        <h3>Lectura en voz alta (Reconocimiento web)</h3>
        <div class="prompt">
          <div style="font-weight:600; color:#ff9800; margin-bottom:6px;">Texto a leer</div>
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

  return (
    <LinearGradient colors={['#79A890', '#9DC3AA']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <View style={{ width: '100%' }}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerBack} onPress={() => router.push('/B2_Avanzado')}>
              <Ionicons name="arrow-back" size={24} color="#79A890" />
            </TouchableOpacity>
            <Ionicons name="school" size={64} color="#fff" />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Prácticas de Expresión Oral B2</Text>
            <Text style={styles.cardText}>Lee en voz alta 5 párrafos. Verás tu porcentaje de coincidencia en tiempo real.</Text>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#fff' }]} onPress={handleStartLectura}>
            <Text style={[styles.buttonText, { color: '#1976d2' }]}>Lectura secuencial (5 párrafos)</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', marginTop: 8 }}>
            {PARRAFOS_B2.map((p, idx) => (
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
                    style={[styles.micButton, { backgroundColor: '#79A890' }]} onPress={() => openLecturaAt(idx)}>
                    <Ionicons name="mic" size={20} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.micButtonText}>Leer (Web)</Text>
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
                <View style={{ padding:12, backgroundColor:'#1976d2' }}>
                  <Text style={{ color:'#fff', fontWeight:'bold', textAlign:'center' }}>Lectura B2 (práctica)</Text>
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
                        const prev = oralIndex - 1; setOralIndex(prev); setWebPromptText(PARRAFOS_B2[prev]); setWebPercent(null);
                      }
                    }}>
                      <Text style={[styles.buttonText, { color:'#333' }]}>Anterior</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor:'#1976d2', flex:1, marginLeft:6 }]} onPress={handleNextLectura}>
                      <Text style={styles.buttonText}>{oralIndex < PARRAFOS_B2.length - 1 ? 'Siguiente' : 'Finalizar'}</Text>
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
    color: '#ff9800',
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
