import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '../../../components/AudioButton';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = require('../../../../assets/unidades_y_examenes.json');

export default function Unidad8() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 7;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué debes hacer si tienes fiebre?',
      opciones: ["Tomar la temperatura y descansar", "Hacer ejercicio intenso", "Tomar el sol", "Comer comida picante"],
      respuesta_correcta: "Tomar la temperatura y descansar",
      explicacion: "Ante la fiebre, lo recomendable es medir la temperatura, descansar y beber líquidos."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Dónde debes ir para una urgencia médica grave?',
      opciones: ["Al servicio de urgencias del hospital", "A la farmacia", "Al supermercado", "Al centro de salud en horario de consulta"],
      respuesta_correcta: "Al servicio de urgencias del hospital",
      explicacion: "Para emergencias graves hay que acudir al servicio de urgencias del hospital más cercano."
    },
    // Conversión de rellenar huecos a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: 'Para estar sano es importante comer ___',
      opciones: ["sano", "rápido", "tarde", "muy picante"],
      respuesta_correcta: "sano",
      explicacion: 'Una alimentación saludable es clave.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'También es importante hacer ___ regularmente',
      opciones: ["ejercicio", "compras", "siestas largas", "viajes"],
      respuesta_correcta: "ejercicio",
      explicacion: 'La actividad física regular mejora la salud.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Y descansar ___ horas al día',
      opciones: ["ocho", "dos", "doce", "quince"],
      respuesta_correcta: "ocho",
      explicacion: 'Lo recomendado suele ser 7–9 horas.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tener fiebre"?',
      opciones: ["Tener la temperatura corporal alta", "Tener frío", "Estar cansado", "Tener hambre"],
      respuesta_correcta: "Tener la temperatura corporal alta",
      explicacion: "Tener fiebre significa que la temperatura del cuerpo está por encima de lo normal (más de 37°C)."
    },
    // Conversión del diálogo de la farmacia a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '— Hola, tengo ___ de cabeza.',
      opciones: ["fiebre", "dolor", "hambre", "sed"],
      respuesta_correcta: "fiebre",
      explicacion: 'En el diálogo original: fiebre de cabeza.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Me duele la ___.',
      opciones: ["garganta", "mano", "pierna", "espalda"],
      respuesta_correcta: "garganta",
      explicacion: 'Concordancia con el diálogo.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Tome una pastilla cada ___ horas.',
      opciones: ["ocho", "dos", "dieciocho", "cincuenta"],
      respuesta_correcta: "ocho",
      explicacion: 'Frecuencia indicada en el ejercicio original.'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada síntoma con la parte del cuerpo (ES → AR como apoyo)',
      pares: [
        { izquierda: 'dolor', derecha: 'cabeza / رأس' },
        { izquierda: 'garganta inflamada', derecha: 'garganta / حلق' },
        { izquierda: 'mareo', derecha: 'equilibrio / توازن' },
        { izquierda: 'tos', derecha: 'pecho / صدر' }
      ]
    }
  ];
  
  const [respuestas, setRespuestas] = useState<any>({});
  const [feedback, setFeedback] = useState<any>({});
  const opcionesMezcladasRef = useRef<{ [k: number]: string[] }>({});

  const handleInput = (idx: number, value: string | string[]) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: value }));
  };

  // eliminado: checkRellenarHuecos (no se usa)

  const checkOpcionMultiple = (idx: number, correcta: string, seleccion: string) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: seleccion }));
    setFeedback((prev: any) => ({ ...prev, [idx]: seleccion === correcta ? '¡Correcto!' : 'Incorrecto' }));
  };

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A2', unitIndex);
    }
    // Navegar directamente a la siguiente unidad (Unidad9)
    router.push('/A2_Plataforma/clases/Unidad9');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/A2_Plataforma')}
        accessibilityLabel="Volver al menú de unidades"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* CONTENIDO DIDÁCTICO - SALUD Y BIENESTAR */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1505751172876-fa186e5d3a0d?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de salud y bienestar"
        />
        <Text style={styles.title}>Unidad 8: Salud y bienestar</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 8: Salud y bienestar" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 8: الصحة والعافية</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario relacionado con la salud, el cuerpo humano y cómo expresar dolencias en español.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario relacionado con la salud, el cuerpo humano y cómo expresar dolencias en español." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم المفردات المتعلقة بالصحة، جسم الإنسان وكيفية التعبير عن الأمراض باللغة الإسبانية.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Expresar dolencias (tengo dolor de..., me duele/n..., estoy resfriado/a){"\n"}• Verbos de salud (tomar, recetar, doler, sentirse){"\n"}• Consejos de salud (deberías..., es recomendable..., tienes que...)</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Expresar dolencias: tengo dolor de..., me duele, estoy resfriado. Verbos de salud: tomar, recetar, doler, sentirse. Consejos: deberías, es recomendable, tienes que." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• التعبير عن الأمراض (لدي ألم في...، يؤلمني...، أنا مصاب بالزكام){"\n"}• أفعال الصحة (يأخذ، يصف دواءً، يؤلم، يشعر){"\n"}• نصائح صحية (يجب أن...، من المستحسن...، عليك أن...)</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Partes del cuerpo: cabeza, garganta, estómago, espalda, brazo, pierna{"\n"}• Síntomas: fiebre, tos, dolor, mareo, cansancio, alergia{"\n"}• Lugares: hospital, centro de salud, farmacia, urgencias{"\n"}• Profesionales: médico/a, enfermero/a, farmacéutico/a</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Partes del cuerpo: cabeza, garganta, estómago, espalda, brazo, pierna. Síntomas: fiebre, tos, dolor, mareo, cansancio, alergia. Lugares: hospital, centro de salud, farmacia, urgencias. Profesionales: médico, enfermero, farmacéutico." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أجزاء الجسم: رأس، حلق، معدة، ظهر، ذراع، ساق{"\n"}• أعراض: حرارة، سعال، ألم، دوار، تعب، حساسية{"\n"}• أماكن: مستشفى، مركز صحي، صيدلية، طوارئ{"\n"}• المختصون: طبيب/طبيبة، ممرض/ممرضة، صيدلي/صيدلانية</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de diálogo</Text>
            <AudioButton text="Ejemplo de diálogo" size="small" showText={false} color="#79A890" />
          </View>
          {/* Diálogo por líneas con audio y traducción por línea */}
          <View style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
            {/* Línea 1 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Médico:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Buenos días, ¿qué le ocurre?</Text>
                <AudioButton text="Buenos días, ¿qué le ocurre?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>صباح الخير، ما مشكلتك؟</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Paciente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Buenos días, doctor. Tengo fiebre y me duele la garganta.</Text>
                <AudioButton text="Buenos días, doctor. Tengo fiebre y me duele la garganta." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>صباح النور، يا دكتور. لدي حرارة ويؤلمني حلقي.</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Médico:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Desde cuándo tiene estos síntomas?</Text>
                <AudioButton text="¿Desde cuándo tiene estos síntomas?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>منذ متى وأنت تعاني من هذه الأعراض؟</Text>
            </View>

            {/* Línea 4 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Paciente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Desde ayer por la noche. También tengo tos seca.</Text>
                <AudioButton text="Desde ayer por la noche. También tengo tos seca." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>منذ ليلة البارحة. ولدي سعال جاف أيضاً.</Text>
            </View>

            {/* Línea 5 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Médico:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Voy a tomarle la temperatura. Abra la boca y diga 'ah'... Tiene las amígdalas inflamadas.</Text>
                <AudioButton text="Voy a tomarle la temperatura. Abra la boca y diga 'ah'... Tiene las amígdalas inflamadas." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>سأقيس حرارتك. افتح فمك وقل 'آه'... اللوزتان ملتهبتان لديك.</Text>
            </View>

            {/* Línea 6 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Paciente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Es grave, doctor?</Text>
                <AudioButton text="¿Es grave, doctor?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل الوضع خطير، يا دكتور؟</Text>
            </View>

            {/* Línea 7 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Médico:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>No se preocupe, es una faringitis. Le receto antibióticos y reposo.</Text>
                <AudioButton text="No se preocupe, es una faringitis. Le receto antibióticos y reposo." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لا تقلق، إنها التهاب بلعوم. سأصف لك مضاداً حيوياً والراحة.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Aprende las partes del cuerpo{"\n"}2. Practica cómo pedir cita médica{"\n"}3. Lee un prospecto de medicamento</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende las partes del cuerpo. Practica cómo pedir cita médica. Lee un prospecto de medicamento." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. تعلم أجزاء الجسم{"\n"}2. تدرب على كيفية طلب موعد طبي{"\n"}3. اقرأ نشرة دواء</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario clave</Text>
            <AudioButton text="Vocabulario clave" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>cultura = ثقافة{"\n"}arte = فن{"\n"}literatura = أدب{"\n"}música = موسيقى{"\n"}cine = سينما{"\n"}teatro = مسرح{"\n"}museo = متحف{"\n"}concierto = حفل موسيقي</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="cultura, arte, literatura, música, cine, teatro, museo, concierto" size="small" showText={false} color="#79A890" />
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
            <AudioButton text="Ejemplo de interacción" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>— ¿Qué tipo de películas te gustan? — Me gustan las películas de drama y comedia. — ¿Lees mucho? — Sí, especialmente novelas y libros de historia.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Qué tipo de películas te gustan? Me gustan las películas de drama y comedia. ¿Lees mucho? Sí, especialmente novelas y libros de historia." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>— ما نوع الأفلام التي تفضلها؟ — أحب أفلام الدراما والكوميديا. — هل تقرأ كثيرًا؟ — نعم، خاصة الروايات وكتب التاريخ.</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad</Text>
            <AudioButton text="Actividad" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Describe una actividad cultural que te gusta: qué tipo de películas, música o libros prefieres.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Describe una actividad cultural que te gusta: qué tipo de películas, música o libros prefieres." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>صف نشاطًا ثقافيًا تحبه: ما نوع الأفلام أو الموسيقى أو الكتب التي تفضلها.</Text>
        </View>
        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Me duele el estómago.</Text>
                <AudioButton text="Me duele el estómago." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>بطني يؤلمني.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Tengo tos y fiebre.</Text>
                <AudioButton text="Tengo tos y fiebre." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>لدي سعال وحُمّى.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Cómo debo tomar el jarabe?</Text>
                <AudioButton text="¿Cómo debo tomar el jarabe?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>كيف يجب أن أتناول الشراب؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Debes descansar y beber agua.</Text>
                <AudioButton text="Debes descansar y beber agua." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>يجب أن ترتاح وتشرب الماء.</Text>
            </View>
          </View>
        </View>
        {/* EJERCICIOS INTERACTIVOS */}
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#79A890', marginTop: 24}}>Ejercicios / تمارين</Text>
        {ejercicios.length === 0 && <Text style={{color:'#333'}}>No hay ejercicios para esta unidad.</Text>}
        {ejercicios.map((ej: any, idx: number) => (
          <View key={idx} style={{marginBottom: 18, backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12}}>
            <Text style={{fontWeight: 'bold', marginBottom: 6}}>
              {ej.enunciado?.split('(')[0]?.trim()}
            </Text>
            {ej.enunciado?.includes('(') && (
              <Text style={{fontWeight: 'bold', color: '#79A890', marginBottom: 6, textAlign: 'right'}}>
                {ej.enunciado.substring(ej.enunciado.indexOf('(')+1, ej.enunciado.lastIndexOf(')'))}
              </Text>
            )}
            {/* eliminado bloque de rellenar_huecos */}
            {ej.tipo === 'opcion_multiple' && (
              <View>
                {(() => {
                  const opciones = opcionesMezcladasRef.current[idx] ?? (opcionesMezcladasRef.current[idx] = [...(ej.opciones || [])].sort(() => Math.random() - 0.5));
                  return opciones.map((op: string, i: number) => (
                    <TouchableOpacity key={i} style={{padding:8,marginVertical:2,backgroundColor: respuestas[idx]===op?'#79A890':'#eee',borderRadius:5}}
                      onPress={() => checkOpcionMultiple(idx, ej.respuesta_correcta, op)}>
                      <Text style={{color: respuestas[idx]===op?'#fff':'#222'}}>{op}</Text>
                    </TouchableOpacity>
                  ));
                })()}
                {feedback[idx] && <Text style={{marginTop:6, color: feedback[idx]==='¡Correcto!'?'#79A890':'#333'}}>{feedback[idx]==='¡Correcto!'?'¡Correcto! / صحيح':'Incorrecto / خطأ'}</Text>}
              </View>
            )}
            {ej.tipo === 'escribir' && (
              <TextInput
                style={{borderWidth: 1, borderColor: '#bbb', borderRadius: 6, marginBottom: 6, padding: 6, backgroundColor: '#fff', minHeight: 48, textAlignVertical: 'top'}}
                placeholder="Escribe tu respuesta aquí..."
                multiline
                value={respuestas[idx] || ''}
                onChangeText={t => handleInput(idx, t)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
            {ej.tipo === 'relacionar' && (
              <EjerciciosInteractivos ejercicios={[ej]} />
            )}
          </View>
        ))}
        <View style={styles.finishContainer}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.finishButtonGradient}
            >
              <Text style={styles.finishButtonText}>Unidad finalizada</Text>
              <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: {
    position: 'absolute',
    top: 38,
    left: 18,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingTop: 70,
    paddingBottom: 32,
    alignItems: 'center',
    minHeight: '100%',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 18,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 4,
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    writingDirection: 'rtl',
    marginBottom: 2,
    fontFamily: 'System',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonGradient: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
});
