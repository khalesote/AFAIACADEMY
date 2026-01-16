import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import { requestMicrophonePermission } from '../../utils/requestMicrophonePermission';

const { width: screenWidth } = Dimensions.get('window');

// Vocales del español
const vocales = ['A', 'E', 'I', 'O', 'U'];

// Categorías gramaticales con explicaciones
const categoriasGramaticales = [
  {
    categoria: 'Nombre (Sustantivo)',
    categoriaAr: 'الاسم',
    explicacion: 'Es una palabra que nombra personas, animales, cosas o ideas. Ejemplo: casa, perro, María',
    explicacionAr: 'هي كلمة تسمي الأشخاص والحيوانات والأشياء أو الأفكار. مثال: منزل، كلب، ماريا',
    ejemplos: [
      { es: 'La casa es grande', ar: 'المنزل كبير', palabraDestacada: 'casa' },
      { es: 'El gato duerme mucho', ar: 'القط ينام كثيرًا', palabraDestacada: 'gato' },
      { es: 'La mesa está limpia', ar: 'الطاولة نظيفة', palabraDestacada: 'mesa' },
      { es: 'María estudia español', ar: 'ماريا تدرس الإسبانية', palabraDestacada: 'María' },
      { es: 'El libro es interesante', ar: 'الكتاب مثير للاهتمام', palabraDestacada: 'libro' },
      { es: 'La escuela está cerca', ar: 'المدرسة قريبة', palabraDestacada: 'escuela' },
      { es: 'El perro juega en el parque', ar: 'الكلب يلعب في الحديقة', palabraDestacada: 'perro' },
      { es: 'El niño lee un cuento', ar: 'الطفل يقرأ قصة', palabraDestacada: 'niño' },
    ],
  },
  {
    categoria: 'Verbo',
    categoriaAr: 'الفعل',
    explicacion: 'Expresa una acción o estado. Ejemplo: correr, comer, ser, estar',
    explicacionAr: 'يعبر عن فعل أو حالة. مثال: يجري، يأكل، يكون، يكون موجود',
    ejemplos: [
      { es: 'Yo como pan', ar: 'أنا آكل خبز', palabraDestacada: 'como' },
      { es: 'Ella corre rápido', ar: 'هي تجري بسرعة', palabraDestacada: 'corre' },
      { es: 'Nosotros estudiamos mucho', ar: 'نحن ندرس كثيرًا', palabraDestacada: 'estudiamos' },
      { es: 'Tú trabajas en una oficina', ar: 'أنت تعمل في مكتب', palabraDestacada: 'trabajas' },
      { es: 'Ellos juegan fútbol', ar: 'هم يلعبون كرة القدم', palabraDestacada: 'juegan' },
      { es: 'Nosotros vivimos en Madrid', ar: 'نحن نعيش في مدريد', palabraDestacada: 'vivimos' },
      { es: 'Yo hablo español', ar: 'أنا أتكلم الإسبانية', palabraDestacada: 'hablo' },
      { es: 'Ella escucha música', ar: 'هي تستمع إلى الموسيقى', palabraDestacada: 'escucha' },
    ],
  },
  {
    categoria: 'Adjetivo',
    categoriaAr: 'الصفة',
    explicacion: 'Describe las características de un nombre. Ejemplo: grande, pequeño, bonito, rojo',
    explicacionAr: 'يصف خصائص الاسم. مثال: كبير، صغير، جميل، أحمر',
    ejemplos: [
      { es: 'La casa grande', ar: 'المنزل الكبير', palabraDestacada: 'grande' },
      { es: 'El coche rojo', ar: 'السيارة الحمراء', palabraDestacada: 'rojo' },
      { es: 'Un libro interesante', ar: 'كتاب مثير للاهتمام', palabraDestacada: 'interesante' },
      { es: 'Una manzana roja', ar: 'تفاحة حمراء', palabraDestacada: 'roja' },
      { es: 'El perro pequeño', ar: 'الكلب الصغير', palabraDestacada: 'pequeño' },
      { es: 'Una mesa nueva', ar: 'طاولة جديدة', palabraDestacada: 'nueva' },
      { es: 'El niño feliz', ar: 'الطفل السعيد', palabraDestacada: 'feliz' },
      { es: 'La puerta abierta', ar: 'الباب المفتوح', palabraDestacada: 'abierta' },
    ],
  },
  {
    categoria: 'Pronombre',
    categoriaAr: 'الضمير',
    explicacion: 'Reemplaza al nombre para evitar repetirlo. Ejemplo: yo, tú, él, ella, nosotros',
    explicacionAr: 'يحل محل الاسم لتجنب تكراره. مثال: أنا، أنت، هو، هي، نحن',
    ejemplos: [
      { es: 'Yo voy a la escuela', ar: 'أنا أذهب إلى المدرسة', palabraDestacada: 'Yo' },
      { es: 'Ella lee un libro', ar: 'هي تقرأ كتابًا', palabraDestacada: 'Ella' },
      { es: 'Nosotros comemos juntos', ar: 'نحن نأكل معًا', palabraDestacada: 'Nosotros' },
      { es: 'Tú estudias mucho', ar: 'أنت تدرس كثيرًا', palabraDestacada: 'Tú' },
      { es: 'Él trabaja aquí', ar: 'هو يعمل هنا', palabraDestacada: 'Él' },
      { es: 'Vosotros sois amigos', ar: 'أنتم أصدقاء', palabraDestacada: 'Vosotros' },
      { es: 'Ellos van al parque', ar: 'هم يذهبون إلى الحديقة', palabraDestacada: 'Ellos' },
      { es: 'Nosotras hablamos español', ar: 'نحن نتكلم الإسبانية', palabraDestacada: 'Nosotras' },
    ],
  },
  {
    categoria: 'Complemento Directo',
    categoriaAr: 'المفعول به',
    explicacion: 'Es la persona o cosa que recibe directamente la acción del verbo. Responde a: ¿Qué? o ¿Quién?',
    explicacionAr: 'هو الشخص أو الشيء الذي يتلقى الفعل مباشرة. يجيب على: ماذا؟ أو من؟',
    ejemplos: [
      { es: 'María come manzanas', ar: 'ماريا تأكل التفاح', palabraDestacada: 'manzanas' },
      { es: 'Yo veo la película', ar: 'أرى الفيلم', palabraDestacada: 'película' },
      { es: 'Ella compra flores', ar: 'هي تشتري الزهور', palabraDestacada: 'flores' },
      { es: 'Nosotros estudiamos español', ar: 'نحن ندرس الإسبانية', palabraDestacada: 'español' },
      { es: 'Tú lees un libro', ar: 'أنت تقرأ كتابًا', palabraDestacada: 'libro' },
      { es: 'Él compra pan', ar: 'هو يشتري خبز', palabraDestacada: 'pan' },
      { es: 'Ellos buscan trabajo', ar: 'هم يبحثون عن عمل', palabraDestacada: 'trabajo' },
      { es: 'Yo tengo un gato', ar: 'أنا لدي قط', palabraDestacada: 'gato' },
    ],
  },
];

// Ejercicios de ordenar palabras
const ejerciciosOrdenar = [
  {
    id: 1,
    oracionCorrecta: 'La casa es grande',
    palabrasDesordenadas: ['grande', 'es', 'La', 'casa'],
    categoria: 'Sujeto + Verbo + Adjetivo',
    categoriaAr: 'فاعل + فعل + صفة',
  },
  {
    id: 2,
    oracionCorrecta: 'Yo como pan',
    palabrasDesordenadas: ['pan', 'Yo', 'como'],
    categoria: 'Pronombre + Verbo + Complemento',
    categoriaAr: 'ضمير + فعل + مفعول',
  },
  {
    id: 3,
    oracionCorrecta: 'El gato duerme mucho',
    palabrasDesordenadas: ['duerme', 'El', 'mucho', 'gato'],
    categoria: 'Artículo + Sujeto + Verbo + Adverbio',
    categoriaAr: 'أداة تعريف + فاعل + فعل + ظرف',
  },
  {
    id: 4,
    oracionCorrecta: 'María compra flores rojas',
    palabrasDesordenadas: ['flores', 'María', 'compra', 'rojas'],
    categoria: 'Sujeto + Verbo + Complemento + Adjetivo',
    categoriaAr: 'فاعل + فعل + مفعول + صفة',
  },
  {
    id: 5,
    oracionCorrecta: 'Nosotros estudiamos español',
    palabrasDesordenadas: ['español', 'Nosotros', 'estudiamos'],
    categoria: 'Pronombre + Verbo + Complemento',
    categoriaAr: 'ضمير + فعل + مفعول',
  },
  {
    id: 6,
    oracionCorrecta: 'El niño lee un libro',
    palabrasDesordenadas: ['libro', 'El', 'lee', 'niño', 'un'],
    categoria: 'Artículo + Sujeto + Verbo + Artículo + Complemento',
    categoriaAr: 'أداة تعريف + فاعل + فعل + أداة تعريف + مفعول',
  },
  {
    id: 7,
    oracionCorrecta: 'Ella vive en Madrid',
    palabrasDesordenadas: ['en', 'Ella', 'Madrid', 'vive'],
    categoria: 'Pronombre + Verbo + Preposición + Lugar',
    categoriaAr: 'ضمير + فعل + حرف جر + مكان',
  },
  {
    id: 8,
    oracionCorrecta: 'Tú tienes un gato pequeño',
    palabrasDesordenadas: ['pequeño', 'Tú', 'tienes', 'un', 'gato'],
    categoria: 'Pronombre + Verbo + Artículo + Complemento + Adjetivo',
    categoriaAr: 'ضمير + فعل + أداة تعريف + مفعول + صفة',
  },
  {
    id: 9,
    oracionCorrecta: 'La mesa está limpia',
    palabrasDesordenadas: ['La', 'limpia', 'está', 'mesa'],
    categoria: 'Artículo + Sujeto + Verbo + Adjetivo',
    categoriaAr: 'أداة تعريف + فاعل + فعل + صفة',
  },
  {
    id: 10,
    oracionCorrecta: 'Nosotros comemos en el restaurante',
    palabrasDesordenadas: ['comemos', 'Nosotros', 'el', 'en', 'restaurante'],
    categoria: 'Pronombre + Verbo + Preposición + Artículo + Lugar',
    categoriaAr: 'ضمير + فعل + حرف جر + أداة تعريف + مكان',
  },
  {
    id: 11,
    oracionCorrecta: 'Yo trabajo todos los días',
    palabrasDesordenadas: ['los', 'Yo', 'trabajo', 'todos', 'días'],
    categoria: 'Pronombre + Verbo + Adjetivo + Artículo + Sustantivo',
    categoriaAr: 'ضمير + فعل + صفة + أداة تعريف + اسم',
  },
  {
    id: 12,
    oracionCorrecta: 'El perro juega en el parque',
    palabrasDesordenadas: ['parque', 'El', 'en', 'juega', 'perro', 'el'],
    categoria: 'Artículo + Sujeto + Verbo + Preposición + Artículo + Lugar',
    categoriaAr: 'أداة تعريف + فاعل + فعل + حرف جر + أداة تعريف + مكان',
  },
  {
    id: 13,
    oracionCorrecta: 'Ella estudia mucho español',
    palabrasDesordenadas: ['mucho', 'Ella', 'español', 'estudia'],
    categoria: 'Pronombre + Verbo + Adverbio + Complemento',
    categoriaAr: 'ضمير + فعل + ظرف + مفعول',
  },
  {
    id: 14,
    oracionCorrecta: 'La escuela está cerca de mi casa',
    palabrasDesordenadas: ['cerca', 'casa', 'La', 'de', 'está', 'escuela', 'mi'],
    categoria: 'Artículo + Sujeto + Verbo + Adjetivo + Preposición + Pronombre + Complemento',
    categoriaAr: 'أداة تعريف + فاعل + فعل + صفة + حرف جر + ضمير + مفعول',
  },
  {
    id: 15,
    oracionCorrecta: 'Tú compras pan en la panadería',
    palabrasDesordenadas: ['panadería', 'Tú', 'en', 'compras', 'la', 'pan'],
    categoria: 'Pronombre + Verbo + Complemento + Preposición + Artículo + Lugar',
    categoriaAr: 'ضمير + فعل + مفعول + حرف جر + أداة تعريف + مكان',
  },
];

// Dígrafos y combinaciones comunes
const combinaciones = [
  { combinacion: 'CH', ejemplo: 'chico', pronunciacion: 'che', explicacion: 'Dígrafo. Se pronuncia como "ch" en inglés. Ejemplo: chico, mucho' },
  { combinacion: 'LL', ejemplo: 'llave', pronunciacion: 'elle', explicacion: 'Dígrafo. Sonido suave similar a "y". Ejemplo: llave, calle' },
  { combinacion: 'RR', ejemplo: 'perro', pronunciacion: 'erre doble', explicacion: 'Dígrafo. Sonido fuerte y vibrante de la R. Ejemplo: perro, carro' },
  { combinacion: 'QU', ejemplo: 'queso', pronunciacion: 'cu', explicacion: 'Siempre va seguido de "U" y se pronuncia como "K". Ejemplo: queso, que' },
  { combinacion: 'GU', ejemplo: 'guerra', pronunciacion: 'gue', explicacion: 'Cuando va con E o I, la U se pronuncia. Ejemplo: guerra, guía' },
  { combinacion: 'BL', ejemplo: 'blanco', pronunciacion: 'ble', explicacion: 'Grupo consonántico: B + L. Ejemplo: blanco, blusa' },
  { combinacion: 'BR', ejemplo: 'brazo', pronunciacion: 'bre', explicacion: 'Grupo consonántico: B + R. Ejemplo: brazo, libro' },
  { combinacion: 'TR', ejemplo: 'tres', pronunciacion: 'tre', explicacion: 'Grupo consonántico: T + R. Ejemplo: tres, tren' },
  { combinacion: 'GR', ejemplo: 'grande', pronunciacion: 'gre', explicacion: 'Grupo consonántico: G + R. Ejemplo: grande, grupo' },
  { combinacion: 'PR', ejemplo: 'precio', pronunciacion: 'pre', explicacion: 'Grupo consonántico: P + R. Ejemplo: precio, primo' },
];

// Alfabeto español con información de pronunciación e iconos
const alfabeto = [
  { letra: 'A', palabra: 'amigo', pronunciacion: 'a', icono: 'people' },
  { letra: 'B', palabra: 'barco', pronunciacion: 'be', icono: 'boat-outline' },
  { letra: 'C', palabra: 'casa', pronunciacion: 'ce', icono: 'home' },
  { letra: 'D', palabra: 'dado', pronunciacion: 'de', icono: 'square-outline' },
  { letra: 'E', palabra: 'elefante', pronunciacion: 'e', icono: 'happy-outline' },
  { letra: 'F', palabra: 'fuego', pronunciacion: 'efe', icono: 'flame' },
  { letra: 'G', palabra: 'gato', pronunciacion: 'ge', icono: 'paw' },
  { letra: 'H', palabra: 'helado', pronunciacion: 'hache', icono: 'snow-outline' },
  { letra: 'I', palabra: 'isla', pronunciacion: 'i', icono: 'water-outline' },
  { letra: 'J', palabra: 'jugo', pronunciacion: 'jota', icono: 'wine-outline' },
  { letra: 'K', palabra: 'kilo', pronunciacion: 'ka', icono: 'scale-outline' },
  { letra: 'L', palabra: 'luz', pronunciacion: 'ele', icono: 'bulb' },
  { letra: 'M', palabra: 'mesa', pronunciacion: 'eme', icono: 'restaurant-outline' },
  { letra: 'N', palabra: 'niño', pronunciacion: 'ene', icono: 'person' },
  { letra: 'Ñ', palabra: 'ñu', pronunciacion: 'eñe', icono: 'paw' },
  { letra: 'O', palabra: 'ojo', pronunciacion: 'o', icono: 'eye' },
  { letra: 'P', palabra: 'perro', pronunciacion: 'pe', icono: 'paw' },
  { letra: 'Q', palabra: 'queso', pronunciacion: 'cu', icono: 'cube-outline' },
  { letra: 'R', palabra: 'rosa', pronunciacion: 'erre', icono: 'flower-outline' },
  { letra: 'S', palabra: 'sol', pronunciacion: 'ese', icono: 'sunny' },
  { letra: 'T', palabra: 'taza', pronunciacion: 'te', icono: 'cafe-outline' },
  { letra: 'U', palabra: 'uva', pronunciacion: 'u', icono: 'ellipse-outline' },
  { letra: 'V', palabra: 'vaso', pronunciacion: 'uve', icono: 'water-outline' },
  { letra: 'W', palabra: 'wifi', pronunciacion: 'uve doble', icono: 'wifi' },
  { letra: 'X', palabra: 'xilófono', pronunciacion: 'equis', icono: 'musical-notes' },
  { letra: 'Y', palabra: 'yate', pronunciacion: 'ye', icono: 'boat-outline' },
  { letra: 'Z', palabra: 'zapato', pronunciacion: 'zeta', icono: 'footsteps-outline' },
];

// HTML para reconocimiento de voz
const buildWebSpeechHTML = (targetLetter: string, targetWord: string, mode: 'letter' | 'word') => {
  const target = mode === 'letter' ? targetLetter.toLowerCase() : targetWord.toLowerCase();
  const isLetterMode = mode === 'letter';
  
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { 
            font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; 
            padding: 16px; 
            background: #f5f5f5;
          }
          .btn { 
            padding: 12px 18px; 
            border-radius: 8px; 
            color: #fff; 
            border: 0; 
            margin: 8px 4px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
          .start { background: #79A890; }
          .stop { background: #e53935; }
          .box { 
            background: #fff; 
            padding: 16px; 
            border-radius: 8px; 
            margin-top: 12px;
            border: 2px solid #e0e0e0;
          }
          .prompt { 
            background: #fff3e0; 
            border-left: 4px solid #000; 
            padding: 16px; 
            border-radius: 8px; 
            margin-bottom: 12px;
            font-size: 20px;
            font-weight: 600;
          }
          .target-letter {
            font-size: 72px;
            text-align: center;
            color: #000;
            margin: 20px 0;
            font-weight: bold;
          }
          #status {
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
          }
          #out {
            color: #666;
            font-size: 18px;
            min-height: 24px;
          }
          #pct {
            font-size: 64px;
            font-weight: bold;
            text-align: center;
            margin-top: 16px;
          }
        </style>
      </head>
      <body>
        <h3 style="text-align: center; color: #000;">Práctica de Pronunciación</h3>
        <div class="prompt">
          <div style="font-weight:600; color:#333; margin-bottom:12px;">Pronuncia la ${isLetterMode ? 'letra' : 'palabra'}:</div>
          ${isLetterMode ? `<div class="target-letter">${targetLetter}</div>` : `<div style="font-size: 32px; text-align: center; font-weight: bold; color: #000;">${targetWord}</div>`}
        </div>
        <div style="text-align: center;">
          <button class="btn start" id="start">🎤 Hablar</button>
          <button class="btn stop" id="stop">⏹ Detener</button>
        </div>
        <div class="box">
          <div id="status">Listo para grabar</div>
          <div id="out" style="margin-top:8px"></div>
        </div>
        <div style="text-align:center; margin-top:12px;">
          <div id="pct" style="color: #000;">0%</div>
        </div>
        <script>
          (function(){
            const RN = window.ReactNativeWebView;
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            let rec = null;
            const status = document.getElementById('status');
            const out = document.getElementById('out');
            const pctEl = document.getElementById('pct');
            const norm = (s) => (s||'').toLowerCase().normalize('NFD').replace(/[^a-záéíóúüñ\\s]/g,'').trim();
            const target = norm(${JSON.stringify(target)});
            
            function scoreSimilarity(user, model){
              const u = norm(user);
              const m = norm(model);
              if (m.length === 0) return 0;
              ${isLetterMode ? `
              // Para letras, comparación exacta o por primera letra
              if (u === m) return 100;
              if (u.includes(m) || m.includes(u)) return 70;
              if (u.charAt(0) === m.charAt(0)) return 80;
              return 0;
              ` : `
              // Para palabras, comparación por palabras
              const uWords = u.split(/\\s+/).filter(Boolean);
              const mWords = m.split(/\\s+/).filter(Boolean);
              if (mWords.length === 0) return 0;
              const setU = new Set(uWords);
              let hits = 0;
              for (const w of mWords) {
                if (setU.has(w)) hits++;
              }
              return Math.min(100, Math.round((hits / mWords.length) * 100));
              `}
            }
            
            function send(type, payload){ 
              try { 
                RN.postMessage(JSON.stringify({ type, payload })); 
              } catch(e) {} 
            }
            
            if (!SR) { 
              status.textContent = 'Reconocimiento de voz no disponible en este dispositivo'; 
              send('error','no-sr'); 
            } else {
              rec = new SR(); 
              rec.lang='es-ES'; 
              rec.interimResults=true; 
              rec.maxAlternatives=1;
              
              rec.onstart=()=>{ 
                status.textContent='🎤 Grabando...'; 
                status.style.color = '#000';
                send('status','start'); 
              };
              
              rec.onend=()=>{ 
                status.textContent='Detenido'; 
                status.style.color = '#666';
                send('status','end'); 
              };
              
              rec.onerror=(e)=>{ 
                status.textContent='Error: '+(e.error||''); 
                status.style.color = '#e53935';
                send('error',e.error||'error'); 
              };
              
              rec.onresult=(e)=>{ 
                let txt=''; 
                for(let i=e.resultIndex;i<e.results.length;i++){ 
                  txt += e.results[i][0].transcript+' '; 
                }
                out.textContent=txt.trim(); 
                const p=scoreSimilarity(txt.trim(), target); 
                pctEl.textContent=p+'%';
                pctEl.style.color = p === 100 ? '#2e7d32' : (p >= 70 ? '#000' : '#e53935');
                send('result',{ text: txt.trim(), percent: p }); 
              };
            }
            
            document.getElementById('start').onclick=()=>{ 
              try{ 
                rec && rec.start(); 
              }catch(e){
                status.textContent='Error al iniciar. Intenta de nuevo.';
              } 
            };
            
            document.getElementById('stop').onclick=()=>{ 
              try{ 
                rec && rec.stop(); 
              }catch(e){} 
            };
          })();
        </script>
      </body>
    </html>
  `;
};

export default function AlfabetizacionScreen() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<typeof alfabeto[0] | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'letter' | 'word'>('letter');
  const [voicePercent, setVoicePercent] = useState<number | null>(null);
  
  // Estados para ejercicios de ordenar
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [palabrasSeleccionadas, setPalabrasSeleccionadas] = useState<string[]>([]);
  const [palabrasDisponibles, setPalabrasDisponibles] = useState<string[]>([]);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);
  const [ejercicioCorrecto, setEjercicioCorrecto] = useState<boolean | null>(null);

  // Reproducir pronunciación de la letra
  const playLetterPronunciation = (item: typeof alfabeto[0]) => {
    Speech.stop();
    Speech.speak(item.pronunciacion, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  // Reproducir palabra ejemplo
  const playWordPronunciation = (item: typeof alfabeto[0]) => {
    Speech.stop();
    Speech.speak(item.palabra, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 0.7,
    });
  };

  // Reproducir combinación
  const playCombinacionPronunciation = (combinacion: typeof combinaciones[0]) => {
    Speech.stop();
    Speech.speak(combinacion.combinacion, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  // Reproducir ejemplo de combinación
  const playCombinacionEjemplo = (combinacion: typeof combinaciones[0]) => {
    Speech.stop();
    Speech.speak(combinacion.ejemplo, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 0.7,
    });
  };

  // Inicializar ejercicio de ordenar
  React.useEffect(() => {
    if (ejerciciosOrdenar[ejercicioActual]) {
      const ejercicio = ejerciciosOrdenar[ejercicioActual];
      // Mezclar las palabras
      const mezcladas = [...ejercicio.palabrasDesordenadas].sort(() => Math.random() - 0.5);
      setPalabrasDisponibles(mezcladas);
      setPalabrasSeleccionadas([]);
      setEjercicioCompletado(false);
      setEjercicioCorrecto(null);
    }
  }, [ejercicioActual]);

  // Manejar selección de palabra en ejercicio
  const handleSeleccionarPalabra = (palabra: string, index: number) => {
    if (ejercicioCompletado) return;
    setPalabrasSeleccionadas([...palabrasSeleccionadas, palabra]);
    setPalabrasDisponibles(palabrasDisponibles.filter((_, i) => i !== index));
  };

  // Remover palabra de la selección
  const handleRemoverPalabra = (palabra: string, index: number) => {
    if (ejercicioCompletado) return;
    setPalabrasSeleccionadas(palabrasSeleccionadas.filter((_, i) => i !== index));
    setPalabrasDisponibles([...palabrasDisponibles, palabra]);
  };

  // Verificar ejercicio
  const verificarEjercicio = () => {
    const ejercicio = ejerciciosOrdenar[ejercicioActual];
    const oracionUsuario = palabrasSeleccionadas.join(' ');
    const esCorrecto = oracionUsuario.toLowerCase() === ejercicio.oracionCorrecta.toLowerCase();
    setEjercicioCorrecto(esCorrecto);
    setEjercicioCompletado(true);
    if (esCorrecto) {
      Speech.speak('¡Correcto!', { language: 'es-ES' });
    }
  };

  // Siguiente ejercicio
  const siguienteEjercicio = () => {
    if (ejercicioActual < ejerciciosOrdenar.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
    } else {
      setEjercicioActual(0);
    }
  };

  // Iniciar práctica de pronunciación
  const handlePracticePronunciation = async (item: typeof alfabeto[0], mode: 'letter' | 'word') => {
    try {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        Alert.alert(
          'Permiso requerido',
          'Necesitas conceder permiso al micrófono para practicar la pronunciación.'
        );
        return;
      }
      setSelectedLetter(item);
      setPracticeMode(mode);
      setVoicePercent(null);
      setShowVoiceModal(true);
    } catch (e) {
      Alert.alert('Error', 'No se pudo iniciar el reconocimiento de voz.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#FFD700" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Alfabetización</Text>
          <Text style={styles.headerTitleAr}>محو الأمية</Text>
          <Text style={styles.headerSubtitle}>Aprende a leer y escribir en español</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introBox}>
          <Ionicons name="school" size={48} color="#000" />
          <Text style={styles.introTitle}>Bienvenido a Alfabetización</Text>
          <Text style={styles.introText}>
            Aprende el alfabeto español letra por letra. Escucha la pronunciación y práctica hablando.
          </Text>
          <Text style={styles.introTextAr}>
            تعلم الحروف الأسبانية حرفًا بحرف. استمع إلى النطق وتمرن على الكلام.
          </Text>
        </View>

        {/* Grid de letras */}
        <Text style={styles.sectionTitle}>Alfabeto Español</Text>
        <View style={styles.lettersGrid}>
          {alfabeto.map((item, index) => (
            <View key={index} style={styles.letterCardContainer}>
              <TouchableOpacity
                style={styles.letterCard}
                onPress={() => {
                  setSelectedLetter(item);
                  playLetterPronunciation(item);
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#000', '#000']}
                  style={[styles.letterGradient, { borderWidth: 1, borderColor: '#FFD700' }]}
                >
                  <Ionicons name={item.icono as any} size={32} color="#FFD700" style={styles.letterIcon} />
                  <Text style={styles.letterText}>{item.letra}</Text>
                  <Text style={styles.wordText}>{item.palabra}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.micButton}
                onPress={() => handlePracticePronunciation(item, 'letter')}
                activeOpacity={0.8}
              >
                <Ionicons name="mic" size={20} color="#FFD700" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Sección de Vocales */}
        <View style={styles.educationalSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="volume-high" size={32} color="#000" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitleLarge}>Vocales</Text>
              <Text style={styles.sectionTitleAr}>حروف العلة</Text>
            </View>
          </View>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Las <Text style={styles.boldText}>vocales</Text> son los sonidos básicos del español. Hay 5 vocales:
            </Text>
            <View style={styles.vocalesContainer}>
              {vocales.map((vocal, idx) => (
                <View key={idx} style={styles.vocalBadge}>
                  <Text style={styles.vocalText}>{vocal}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.explanationText}>
              Las vocales forman el núcleo de las sílabas. Cada palabra en español tiene al menos una vocal.
            </Text>
            <Text style={styles.explanationTextAr}>
              حروف العلة هي الأصوات الأساسية في الإسبانية. هناك 5 حروف علة. حروف العلة تشكل نواة المقاطع. كل كلمة في الإسبانية لها حرف علة واحد على الأقل.
            </Text>
          </View>
        </View>

        {/* Sección de Consonantes */}
        <View style={styles.educationalSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="text" size={32} color="#000" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitleLarge}>Consonantes</Text>
              <Text style={styles.sectionTitleAr}>الحروف الساكنة</Text>
            </View>
          </View>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Las <Text style={styles.boldText}>consonantes</Text> son todas las demás letras del alfabeto. Se pronuncian junto con las vocales para formar palabras.
            </Text>
            <Text style={styles.explanationText}>
              Ejemplos: B, C, D, F, G, H, J, K, L, M, N, Ñ, P, Q, R, S, T, V, W, X, Y, Z
            </Text>
            <Text style={styles.explanationTextAr}>
              الحروف الساكنة هي باقي أحرف الأبجدية. تُنطق مع حروف العلة لتشكيل الكلمات.
            </Text>
          </View>
        </View>

        {/* Sección de Combinaciones */}
        <View style={styles.educationalSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="link" size={32} color="#000" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitleLarge}>Combinaciones de Letras</Text>
              <Text style={styles.sectionTitleAr}>تركيبات الحروف</Text>
            </View>
          </View>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Algunas letras se combinan para crear sonidos especiales. Estas combinaciones tienen pronunciaciones específicas:
            </Text>
            <Text style={styles.explanationTextAr}>
              بعض الأحرف تترابط لإنشاء أصوات خاصة. هذه التركيبات لها نطق محدد:
            </Text>
          </View>

          {/* Lista de combinaciones */}
          <View style={styles.combinacionesList}>
            {combinaciones.map((combi, idx) => (
              <View key={idx} style={styles.combinacionCard}>
                <View style={styles.combinacionHeader}>
                  <View style={styles.combinacionLetras}>
                    <Text style={styles.combinacionText}>{combi.combinacion}</Text>
                  </View>
                  <View style={styles.combinacionActions}>
                    <TouchableOpacity
                      style={styles.smallAudioBtn}
                      onPress={() => playCombinacionPronunciation(combi)}
                    >
                      <Ionicons name="volume-high" size={18} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.combinacionBody}>
                  <Text style={styles.combinacionEjemplo}>
                    Ejemplo: <Text style={styles.boldText}>{combi.ejemplo}</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.ejemploAudioBtn}
                    onPress={() => playCombinacionEjemplo(combi)}
                  >
                    <Ionicons name="play-circle" size={20} color="#000" />
                    <Text style={styles.ejemploAudioText}>Escuchar palabra</Text>
                  </TouchableOpacity>
                  <Text style={styles.combinacionExplicacion}>{combi.explicacion}</Text>
                  <Text style={styles.combinacionPronunciacion}>
                    Se pronuncia: <Text style={styles.boldText}>"{combi.pronunciacion}"</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Sección de Gramática Básica */}
        <View style={styles.educationalSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={32} color="#000" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitleLarge}>Gramática Básica</Text>
              <Text style={styles.sectionTitleAr}>النحو الأساسي</Text>
            </View>
          </View>

          {/* Categorías Gramaticales */}
          {categoriasGramaticales.map((cat, idx) => (
            <View key={idx} style={styles.gramaticaCard}>
              <View style={styles.gramaticaHeader}>
                <Text style={styles.gramaticaCategoria}>{cat.categoria}</Text>
                <Text style={styles.gramaticaCategoriaAr}>{cat.categoriaAr}</Text>
              </View>
              <Text style={styles.gramaticaExplicacion}>{cat.explicacion}</Text>
              <Text style={styles.gramaticaExplicacionAr}>{cat.explicacionAr}</Text>
              <View style={styles.ejemplosContainer}>
                <Text style={styles.ejemplosTitulo}>Ejemplos / أمثلة:</Text>
                {cat.ejemplos.map((ej, ejIdx) => {
                  // Resaltar la palabra destacada en rojo
                  const palabras = ej.es.split(' ');
                  const palabraDestacadaLower = ej.palabraDestacada.toLowerCase();
                  
                  return (
                    <View key={ejIdx} style={styles.ejemploItem}>
                      <Text style={styles.ejemploTexto}>
                        {palabras.map((palabra, pIdx) => {
                          const palabraLimpia = palabra.replace(/[.,!?;:]/g, '');
                          const esDestacada = palabraLimpia.toLowerCase() === palabraDestacadaLower;
                          return (
                            <Text key={pIdx}>
                              {esDestacada ? (
                                <Text style={styles.palabraDestacada}>{palabra}</Text>
                              ) : (
                                palabra
                              )}
                              {pIdx < palabras.length - 1 ? ' ' : ''}
                            </Text>
                          );
                        })}
                      </Text>
                      <Text style={styles.ejemploTextoAr}>{ej.ar}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        {/* Sección de Explicación del Orden de Palabras */}
        <View style={styles.educationalSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book-outline" size={32} color="#000" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitleLarge}>Orden de las Palabras en Español</Text>
              <Text style={styles.sectionTitleAr}>ترتيب الكلمات في الإسبانية</Text>
            </View>
          </View>
          
          {/* Explicación sobre el orden de palabras */}
          <View style={styles.ordenExplicacionBox}>
            <View style={styles.ordenReglaItem}>
              <Ionicons name="arrow-forward" size={24} color="#000" />
              <View style={styles.ordenReglaTexto}>
                <Text style={styles.ordenReglaTitulo}>1. Orden básico de la oración</Text>
                <Text style={styles.ordenReglaDescripcion}>
                  En español, el orden más común es: <Text style={styles.palabraDestacada}>Sujeto + Verbo + Complemento</Text>
                </Text>
                <Text style={styles.ordenReglaEjemplo}>Ejemplo: "María come pan" (María = sujeto, come = verbo, pan = complemento)</Text>
                <Text style={styles.ordenReglaEjemploAr}>مثال: "ماريا تأكل خبز" (ماريا = الفاعل، تأكل = الفعل، خبز = المفعول به)</Text>
              </View>
            </View>

            <View style={styles.ordenReglaItem}>
              <Ionicons name="arrow-forward" size={24} color="#000" />
              <View style={styles.ordenReglaTexto}>
                <Text style={styles.ordenReglaTitulo}>2. Artículos antes del sustantivo</Text>
                <Text style={styles.ordenReglaDescripcion}>
                  Los artículos (el, la, un, una) siempre van <Text style={styles.palabraDestacada}>antes</Text> del sustantivo.
                </Text>
                <Text style={styles.ordenReglaEjemplo}>Ejemplo: "el gato", "la casa", "un libro"</Text>
                <Text style={styles.ordenReglaEjemploAr}>مثال: "القط"، "المنزل"، "كتاب"</Text>
              </View>
            </View>

            <View style={styles.ordenReglaItem}>
              <Ionicons name="arrow-forward" size={24} color="#000" />
              <View style={styles.ordenReglaTexto}>
                <Text style={styles.ordenReglaTitulo}>3. Adjetivos después del sustantivo</Text>
                <Text style={styles.ordenReglaDescripcion}>
                  En español, los adjetivos generalmente van <Text style={styles.palabraDestacada}>después</Text> del sustantivo.
                </Text>
                <Text style={styles.ordenReglaEjemplo}>Ejemplo: "casa grande", "gato pequeño", "libro interesante"</Text>
                <Text style={styles.ordenReglaEjemploAr}>مثال: "منزل كبير"، "قط صغير"، "كتاب مثير للاهتمام"</Text>
              </View>
            </View>

            <View style={styles.ordenReglaItem}>
              <Ionicons name="information-circle" size={24} color="#000" />
              <View style={styles.ordenReglaTexto}>
                <Text style={styles.ordenReglaTitulo}>4. ¿Por qué es importante el orden?</Text>
                <Text style={styles.ordenReglaDescripcion}>
                  El orden correcto hace que la oración tenga sentido y sea fácil de entender. Aunque en español podemos cambiar el orden a veces, el orden estándar es el más común.
                </Text>
                <Text style={styles.ordenReglaEjemploAr}>
                  الترتيب الصحيح يجعل الجملة منطقية وسهلة الفهم. على الرغم من أنه يمكننا تغيير الترتيب أحيانًا في الإسبانية، إلا أن الترتيب القياسي هو الأكثر شيوعًا.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sección de Práctica - Ordenar Palabras */}
        <View style={styles.educationalSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="puzzle" size={32} color="#000" />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitleLarge}>Practica: Ordena las Palabras</Text>
              <Text style={styles.sectionTitleAr}>تمرين: رتب الكلمات</Text>
            </View>
          </View>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Toca las palabras en el orden correcto para formar una oración. Usa las reglas que aprendiste arriba.
            </Text>
            <Text style={styles.explanationTextAr}>
              اضغط على الكلمات بالترتيب الصحيح لتشكيل جملة. استخدم القواعد التي تعلمتها أعلاه.
            </Text>
          </View>

          {ejerciciosOrdenar[ejercicioActual] && (
            <View style={styles.ejercicioContainer}>
              <View style={styles.ejercicioInfo}>
                <Text style={styles.ejercicioCategoria}>
                  {ejerciciosOrdenar[ejercicioActual].categoria}
                </Text>
                <Text style={styles.ejercicioCategoriaAr}>
                  {ejerciciosOrdenar[ejercicioActual].categoriaAr}
                </Text>
                <Text style={styles.ejercicioNumero}>
                  Ejercicio {ejercicioActual + 1} / {ejerciciosOrdenar.length}
                </Text>
              </View>

              {/* Área de palabras seleccionadas (oración) */}
              <View style={styles.oracionContainer}>
                <Text style={styles.oracionLabel}>Tu oración:</Text>
                <View style={styles.palabrasSeleccionadasContainer}>
                  {palabrasSeleccionadas.length === 0 ? (
                    <Text style={styles.placeholderText}>Toca las palabras para ordenarlas</Text>
                  ) : (
                    palabrasSeleccionadas.map((palabra, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.palabraSeleccionada}
                        onPress={() => handleRemoverPalabra(palabra, idx)}
                        disabled={ejercicioCompletado}
                      >
                        <Text style={styles.palabraSeleccionadaTexto}>{palabra}</Text>
                        {!ejercicioCompletado && (
                          <Ionicons name="close-circle" size={20} color="#e53935" />
                        )}
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              </View>

              {/* Palabras disponibles */}
              <View style={styles.palabrasDisponiblesContainer}>
                <Text style={styles.palabrasDisponiblesLabel}>Palabras disponibles:</Text>
                <View style={styles.palabrasGrid}>
                  {palabrasDisponibles.map((palabra, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.palabraDisponible}
                      onPress={() => handleSeleccionarPalabra(palabra, idx)}
                      disabled={ejercicioCompletado}
                    >
                      <Text style={styles.palabraDisponibleTexto}>{palabra}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Botones de acción */}
              <View style={styles.ejercicioActions}>
                <TouchableOpacity
                  style={[
                    styles.verificarBtn,
                    ejercicioCompletado && styles.verificarBtnDisabled,
                  ]}
                  onPress={verificarEjercicio}
                  disabled={ejercicioCompletado || palabrasSeleccionadas.length === 0}
                >
                  <Text style={styles.verificarBtnText}>Verificar</Text>
                </TouchableOpacity>
                {ejercicioCompletado && (
                  <TouchableOpacity style={styles.siguienteBtn} onPress={siguienteEjercicio}>
                    <Text style={styles.siguienteBtnText}>Siguiente</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Feedback */}
              {ejercicioCompletado && (
                <View
                  style={[
                    styles.feedbackEjercicio,
                    ejercicioCorrecto ? styles.feedbackCorrecto : styles.feedbackIncorrecto,
                  ]}
                >
                  <Ionicons
                    name={ejercicioCorrecto ? 'checkmark-circle' : 'close-circle'}
                    size={32}
                    color={ejercicioCorrecto ? '#2e7d32' : '#e53935'}
                  />
                  <Text style={styles.feedbackEjercicioTexto}>
                    {ejercicioCorrecto
                      ? '¡Correcto!'
                      : `Incorrecto. La respuesta correcta es: "${ejerciciosOrdenar[ejercicioActual].oracionCorrecta}"`}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Instrucciones */}
        <View style={styles.instructionsBox}>
          <Ionicons name="information-circle" size={32} color="#000" />
          <Text style={styles.instructionsTitle}>¿Cómo usar?</Text>
          <Text style={styles.instructionItem}>1. Toca una letra para escuchar su pronunciación</Text>
          <Text style={styles.instructionItem}>2. Toca el ícono 🎤 en cada letra para practicar</Text>
          <Text style={styles.instructionItem}>3. El sistema te dirá qué tan bien pronunciaste</Text>
        </View>
      </ScrollView>

      {/* Modal de práctica de pronunciación */}
      {selectedLetter && (
        <Modal
          visible={showVoiceModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowVoiceModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {practiceMode === 'letter' ? `Práctica: Letra ${selectedLetter.letra}` : `Práctica: ${selectedLetter.palabra}`}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowVoiceModal(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Botones de acción */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.audioBtn]}
                  onPress={() => {
                    if (practiceMode === 'letter') {
                      playLetterPronunciation(selectedLetter);
                    } else {
                      playWordPronunciation(selectedLetter);
                    }
                  }}
                >
                  <Ionicons name="volume-high" size={24} color="#FFD700" />
                  <Text style={styles.actionBtnText}>Escuchar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.modeBtn]}
                  onPress={() => setPracticeMode(practiceMode === 'letter' ? 'word' : 'letter')}
                >
                  <Ionicons 
                    name={practiceMode === 'letter' ? 'text' : 'library'} 
                    size={24} 
                    color="#FFD700" 
                  />
                  <Text style={styles.actionBtnText}>
                    {practiceMode === 'letter' ? 'Palabra' : 'Letra'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* WebView para reconocimiento de voz */}
              <View style={styles.webViewContainer}>
                <WebView
                  originWhitelist={["*"]}
                  source={{
                    html: buildWebSpeechHTML(
                      selectedLetter.letra,
                      selectedLetter.palabra,
                      practiceMode
                    ),
                  }}
                  onMessage={(event) => {
                    try {
                      const data = JSON.parse(event.nativeEvent.data || '{}');
                      if (data?.type === 'result' && typeof data?.payload?.percent === 'number') {
                        setVoicePercent(Math.round(data.payload.percent));
                      } else if (data?.type === 'error') {
                        Alert.alert('Error', 'No se pudo iniciar el reconocimiento de voz.');
                      }
                    } catch (e) {}
                  }}
                  onPermissionRequest={(e: any) => {
                    try {
                      e.grant(e.resources);
                    } catch {}
                  }}
                />
              </View>

              {/* Feedback visual */}
              {typeof voicePercent === 'number' && (
                <View style={styles.feedbackContainer}>
                  {voicePercent === 100 ? (
                    <>
                      <Ionicons name="checkmark-circle" size={64} color="#2e7d32" />
                      <Text style={[styles.feedbackText, styles.successText]}>
                        ¡Excelente! Pronunciación perfecta
                      </Text>
                    </>
                  ) : voicePercent >= 70 ? (
                    <>
                      <Ionicons name="checkmark-circle-outline" size={64} color="#000" />
                      <Text style={[styles.feedbackText, styles.goodText]}>
                        ¡Bien! Sigue practicando
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="close-circle-outline" size={64} color="#e53935" />
                      <Text style={[styles.feedbackText, styles.badText]}>
                        Inténtalo de nuevo
                      </Text>
                    </>
                  )}
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerTitleAr: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  introBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  introTextAr: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    direction: 'rtl',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  lettersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  letterCardContainer: {
    width: (screenWidth - 48) / 3,
    marginBottom: 12,
    position: 'relative',
  },
  letterCard: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  micButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  letterGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  letterIcon: {
    marginBottom: 8,
  },
  letterText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  wordText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  instructionsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 12,
  },
  instructionItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 24,
  },
  educationalSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  sectionTitleLarge: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  explanationBox: {
    marginTop: 8,
  },
  explanationText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 12,
  },
  explanationTextAr: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'right',
    direction: 'rtl',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  vocalesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 16,
    gap: 12,
  },
  vocalBadge: {
    backgroundColor: '#000',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vocalText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  combinacionesList: {
    marginTop: 16,
  },
  combinacionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  combinacionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  combinacionLetras: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  combinacionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  combinacionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  smallAudioBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  combinacionBody: {
    marginTop: 8,
  },
  combinacionEjemplo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  ejemploAudioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 6,
  },
  ejemploAudioText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
    fontWeight: '600',
  },
  combinacionExplicacion: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  combinacionPronunciacion: {
    fontSize: 15,
    color: '#333',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '92%',
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },
  audioBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  modeBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  actionBtnText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  webViewContainer: {
    height: 400,
    backgroundColor: '#f5f5f5',
  },
  feedbackContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  successText: {
    color: '#2e7d32',
  },
  goodText: {
    color: '#000',
  },
  badText: {
    color: '#e53935',
  },
  gramaticaCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  gramaticaHeader: {
    marginBottom: 12,
  },
  gramaticaCategoria: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  gramaticaCategoriaAr: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    direction: 'rtl',
  },
  gramaticaExplicacion: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  gramaticaExplicacionAr: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'right',
    direction: 'rtl',
    marginBottom: 12,
  },
  ejemplosContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  ejemplosTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  ejemploItem: {
    marginBottom: 8,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#000',
  },
  ejemploTexto: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  ejemploTextoAr: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    direction: 'rtl',
  },
  palabraDestacada: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  palabraDestacada: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ejercicioContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
  },
  ejercicioInfo: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  ejercicioCategoria: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  ejercicioCategoriaAr: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    direction: 'rtl',
    marginBottom: 8,
  },
  ejercicioNumero: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  oracionContainer: {
    marginBottom: 24,
  },
  oracionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  palabrasSeleccionadasContainer: {
    minHeight: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
  },
  palabraSeleccionada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  palabraSeleccionadaTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  palabrasDisponiblesContainer: {
    marginBottom: 20,
  },
  palabrasDisponiblesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  palabrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  palabraDisponible: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  palabraDisponibleTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  ejercicioActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  verificarBtn: {
    flex: 1,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificarBtnDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  verificarBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  siguienteBtn: {
    flex: 1,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  siguienteBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  feedbackEjercicio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    gap: 12,
  },
  feedbackCorrecto: {
    backgroundColor: '#e8f5e9',
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  feedbackIncorrecto: {
    backgroundColor: '#ffebee',
    borderWidth: 2,
    borderColor: '#e53935',
  },
  feedbackEjercicioTexto: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ordenExplicacionBox: {
    marginTop: 16,
  },
  ordenReglaItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  ordenReglaTexto: {
    flex: 1,
    marginLeft: 12,
  },
  ordenReglaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  ordenReglaDescripcion: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  ordenReglaEjemplo: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 6,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#9DC3AA',
  },
  ordenReglaEjemploAr: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'right',
    direction: 'rtl',
    paddingRight: 12,
    borderRightWidth: 3,
    borderRightColor: '#9DC3AA',
  },
});

