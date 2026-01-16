import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { requestMicrophonePermission } from '../../../../utils/requestMicrophonePermission';
import { Platform, Linking } from 'react-native';

import { useUserProgress } from '@/contexts/UserProgressContext';

// Enunciados orales (A1)
const oralPrompts = [
  'Hola, me llamo Ana.',
  'Vivo en Madrid.',
  'Tengo 25 años.',
  'Soy estudiante.',
  'Me gusta el café.'
];

// Gate de oral usará el mismo set de 5 frases
const oralGatePrompts = oralPrompts;

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
    <div style="color:#555; font-size:14px; margin-bottom:8px;">El reconocimiento se inicia automáticamente. Si no empieza, pulsa "Hablar".</div>
    <div class="prompt">
      <div style="font-weight:600; color:#79A890; margin-bottom:6px;">Texto a leer</div>
      <div id="target">${(promptText || '').replace(/</g,'&lt;')}</div>
    </div>
    <button class="btn start" id="start">Hablar / <span dir="rtl">تحدث</span></button>
    <button class="btn stop" id="stop">Detener / <span dir="rtl">إيقاف</span></button>
    <div class="box">
      <div id="status">Listo</div>
      <div id="out" style="margin-top:8px"></div>
    </div>
    <div style="text-align:center; margin-top:12px;">
      <div id="msg" style="font-size:18px; font-weight:600; color:#c62828"></div>
      <div id="emoji" style="font-size:48px; margin-top:6px;">😐</div>
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
        const msgEl = document.getElementById('msg');
        const norm = (s) => (s||'').toLowerCase().normalize('NFC').replace(/[^a-záéíóúüñ\s]/g,'').trim();
        const target = norm(${JSON.stringify(''+(typeof promptText==='string'?promptText:''))});
        function scoreSimilarity(user, model){
          const u = norm(user).split(/\s+/).filter(Boolean);
          const m = norm(model).split(/\s+/).filter(Boolean);
          if (m.length === 0) return 0;
          const setU = new Set(u);
          let hits = 0; for (const w of m) if (setU.has(w)) hits++;
          return Math.min(100, Math.round((hits / m.length) * 100));
        }
        function renderScore(p){
          pctEl.textContent = p + '%';
          const ok = p === 100;
          pctEl.style.color = ok ? '#2e7d32' : '#c62828';
          msgEl.textContent = ok ? '¡Enhorabuena!' : 'Sigue intentando';
          msgEl.style.color = ok ? '#2e7d32' : '#c62828';
        }
        function send(type, payload){ try { RN.postMessage(JSON.stringify({ type, payload })); } catch(e) {} }
        if (!SR) { status.textContent = 'Web Speech no disponible'; send('error','no-sr'); }
        else {
          rec = new SR(); rec.lang='es-ES'; rec.interimResults=true; rec.maxAlternatives=1;
          rec.onstart=()=>{ status.textContent='Grabando...'; send('status','start'); };
          rec.onend=()=>{ status.textContent='Detenido'; send('status','end'); };
          rec.onerror=(e)=>{ status.textContent='Error: '+(e.error||''); send('error',e.error||'error'); };
          rec.onresult=(e)=>{ let txt=''; for(let i=e.resultIndex;i<e.results.length;i++){ txt += e.results[i][0].transcript+' '; }
            out.textContent=txt.trim(); const p=scoreSimilarity(txt.trim(), target); renderScore(p); send('result',{ text: txt.trim(), percent: p }); };
        }
        document.getElementById('start').onclick=()=>{ try{ rec && rec.start(); }catch(e){} };
        document.getElementById('stop').onclick=()=>{ try{ rec && rec.stop(); }catch(e){} };
        setTimeout(()=>{ try{ rec && rec.start(); }catch(e){} }, 300);
      })();
    </script>
  </body>
  </html>
`;

export default function ExamenOralGateway() {
  const router = useRouter();
  const { progress, markOralPassed, isLoading: progressLoading } = useUserProgress();
  const levelProgress = progress.A1;
  const oralPassed = levelProgress?.oralPassed ?? false;
  const [oralCompleted, setOralCompleted] = useState<boolean>(false);
  // Estados para el modal de examen oral
  const [webMode, setWebMode] = useState(false);
  const [oralGateIndex, setOralGateIndex] = useState(0);
  const [webPromptText, setWebPromptText] = useState('');
  const [webPercent, setWebPercent] = useState<number | null>(null);
  const [oralScores, setOralScores] = useState<number[]>([0,0,0,0,0]);

  useEffect(() => {
    setOralCompleted(oralPassed);
  }, [oralPassed]);

  const handleStartOral = async () => {
    try {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        Alert.alert('Permiso requerido', 'Concede acceso al micrófono para realizar el Examen Oral.');
        return;
      }
      setOralGateIndex(0);
      setOralScores([0,0,0,0,0]);
      setWebPercent(null);
      setWebPromptText(oralGatePrompts[0]);
      setWebMode(true);
      Alert.alert('Examen Oral', 'Se abrió el Examen Oral. Si no ves el modal, recarga la pantalla.');
    } catch (e) {
      Alert.alert('Micrófono', 'No se pudo iniciar el reconocimiento.');
    }
  };

  const handleOralGateNext = async () => {
    const score = typeof webPercent === 'number' ? Math.round(webPercent) : 0;
    setOralScores(prev => { const arr=[...prev]; arr[oralGateIndex]=score; return arr; });
    const filled = oralScores.map((v,i)=> (i===oralGateIndex ? score : v));
    const passedPartial = filled.filter(v => v === 100).length >= 3;
    if (passedPartial) setOralCompleted(true);
    if (oralGateIndex < oralGatePrompts.length - 1) {
      const next = oralGateIndex + 1; setOralGateIndex(next); setWebPromptText(oralGatePrompts[next]); setWebPercent(null);
    } else {
      const passed = filled.filter(v => v === 100).length >= 3;
      setOralCompleted(passed);
      if (passed) {
        await markOralPassed('A1');
      }
      setWebMode(false);
      if (passed) Alert.alert('Oral aprobado', 'Has alcanzado 3 de 5 lecturas con 100%. Ya puedes continuar.'); else Alert.alert('Oral no aprobado', 'Necesitas 3 de 5 lecturas al 100%. Puedes intentarlo de nuevo.');
    }
  };

  // Utilidades para comparar frase objetivo vs transcripción (lectura completa)
  const normalizar = (s: string) => (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\dáéíóúüñ\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const compararFrase = (objetivo: string, transcripcion: string) => {
    const obj = normalizar(objetivo);
    const tra = normalizar(transcripcion);
    if (!obj) return 0;
    const objTokens = obj.split(' ').filter(Boolean);
    const traTokens = new Set(tra.split(' ').filter(Boolean));
    if (objTokens.length === 0) return 0;
    let aciertos = 0;
    objTokens.forEach(tok => { if (traTokens.has(tok)) aciertos++; });
    return aciertos / objTokens.length; // 0..1
  };

  if (progressLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/A1_Acceso')}
      >
        <Ionicons name="arrow-back" size={24} color="#79A890" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="school" size={64} color="#79A890" />
        <Text style={styles.title}>Examen Final A1</Text>
        <Text style={styles.subtitle}>Flujo de evaluación</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Proceso de Examen</Text>
        <Text style={styles.infoText}>
          • Primero debes completar el examen oral{'\n'}
          • Una vez aprobado, se desbloqueará el examen escrito{'\n'}
          • Ambos exámenes son obligatorios para obtener el certificado
        </Text>
      </View>

      {/* Sección del Examen Oral */}
      <View style={[styles.stepContainer, oralCompleted && styles.completedSection]}>
        <View style={styles.stepHeader}>
          <View style={[
            styles.stepIndicator, 
            oralCompleted ? styles.completedStep : styles.currentStep
          ]}>
            {oralCompleted ? (
              <Ionicons name="checkmark" size={20} color="#fff" />
            ) : (
              <Text style={styles.stepNumber}>1</Text>
            )}
          </View>
          <Text style={[
            styles.stepTitle,
            oralCompleted && styles.completedText
          ]}>
            {oralCompleted ? 'Examen Oral Completado' : 'Examen Oral'}
          </Text>
        </View>
        
        <Text style={styles.stepDescription}>
          {oralCompleted 
            ? 'Has completado el examen oral con éxito.'
            : 'Evaluación de expresión oral y pronunciación'}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.actionButton, 
            oralCompleted ? styles.secondaryButton : styles.primaryButton,
            { marginBottom: 10 }
          ]}
          onPress={handleStartOral}
        >
          <Ionicons 
            name={oralCompleted ? "refresh" : "mic"} 
            size={24} 
            color="#fff" 
          />
          <Text style={styles.actionButtonText}>
            {oralCompleted ? 'Reintentar Examen Oral' : 'Iniciar Examen Oral'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sección del Examen Escrito */}
      <View style={[
        styles.stepContainer, 
        !oralCompleted && styles.disabledSection,
        { marginTop: 20, marginBottom: 40 }
      ]}>
        <View style={styles.stepHeader}>
          <View style={[
            styles.stepIndicator, 
            oralCompleted ? styles.currentStep : styles.pendingStep
          ]}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepTitle}>
            Examen Escrito {!oralCompleted && '(Bloqueado)'}
          </Text>
        </View>
        
        <Text style={styles.stepDescription}>
          {oralCompleted 
            ? 'Evaluación de comprensión y gramática'
            : 'Completa el examen oral para desbloquear el examen escrito'}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.actionButton, 
            oralCompleted ? styles.primaryButton : styles.disabledButton,
            { opacity: oralCompleted ? 1 : 0.7 }
          ]}
          onPress={() => router.push('/A1_Acceso/clases/ExamenFinal')}
          disabled={!oralCompleted}
        >
          <Ionicons 
            name="document-text" 
            size={24} 
            color={oralCompleted ? "#fff" : "#666"} 
          />
          <Text style={[
            styles.actionButtonText,
            { color: oralCompleted ? '#fff' : '#666' }
          ]}>
            {oralCompleted ? 'Iniciar Examen Escrito' : 'Examen Escrito Bloqueado'}
          </Text>
        </TouchableOpacity>
      </View>

      {webMode && (
        <Modal visible transparent animationType="fade" onRequestClose={() => setWebMode(false)}>
          <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' }}>
            <View style={{ backgroundColor:'#fff', borderRadius:12, width:'92%', maxHeight:'86%', overflow:'hidden' }}>
              <View style={{ padding:12, backgroundColor:'#79A890' }}>
                <Text style={{ color:'#fff', fontWeight:'bold', textAlign:'center' }}>Examen Oral A1 (3 de 5 al 100%)</Text>
              </View>
              <View style={{ height: 380 }}>
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
                <Text style={{ textAlign:'center', marginBottom:8 }}>Lecturas aprobadas: {oralScores.filter(s => s === 100).length} / 5</Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                  <TouchableOpacity style={[styles.siguienteBtn, { backgroundColor:'#e0e0e0', flex:1, marginRight:6 }]} onPress={() => {
                    if (oralGateIndex > 0) {
                      const prev = oralGateIndex - 1; setOralGateIndex(prev); setWebPromptText(oralGatePrompts[prev]); setWebPercent(null);
                    }
                  }}>
                    <Text style={{ color:'#333', fontWeight:'bold' }}>Anterior</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.siguienteBtn, { backgroundColor:'#79A890', flex:1, marginLeft:6 }]} onPress={handleOralGateNext}>
                    <Text style={{ color:'#fff', fontWeight:'bold' }}>{oralGateIndex < oralGatePrompts.length - 1 ? 'Siguiente' : 'Finalizar'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setWebMode(false)} style={{ marginTop:8, alignSelf:'center' }}>
                  <Text style={{ color:'#79A890' }}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#79A890',
    fontSize: 16,
    marginLeft: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoBox: {
    backgroundColor: '#f0f7ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  stepContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  currentStep: {
    backgroundColor: '#79A890',
  },
  completedStep: {
    backgroundColor: '#4CAF50',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
    marginLeft: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#79A890',
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  completedSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    paddingLeft: 16,
  },
  disabledSection: {
    opacity: 0.7,
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  pendingStep: {
    backgroundColor: '#9e9e9e',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  siguienteBtn: {
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
