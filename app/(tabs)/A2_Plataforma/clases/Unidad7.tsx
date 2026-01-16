import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '../../../components/AudioButton';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = require('../../../assets/unidades_y_examenes.json');

export default function Unidad7() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 6;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué necesitas para buscar trabajo en España?',
      opciones: ["Currículum y DNI/NIE", "Libro de familia", "Facturas de servicios", "Recetas médicas"],
      respuesta_correcta: "Currículum y DNI/NIE",
      explicacion: "Para buscar trabajo necesitas un currículum actualizado y tu documento de identidad (DNI o NIE)."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué documento te identifica como trabajador en España?',
      opciones: ["Número de la Seguridad Social", "Número de teléfono", "Número de cuenta bancaria", "Número de pasaporte"],
      respuesta_correcta: "Número de la Seguridad Social",
      explicacion: "El número de la Seguridad Social es tu identificador como trabajador en España."
    },
    // Conversión de rellenar huecos a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: 'Para trabajar necesitas un ___ (permiso/legal).',
      opciones: ["permiso de trabajo", "permiso de conducir", "permiso de residencia temporal", "permiso escolar"],
      respuesta_correcta: "permiso de trabajo",
      explicacion: 'El documento clave es el permiso de trabajo.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'También necesitas un contrato de ___.',
      opciones: ["trabajo", "alquiler", "seguro", "compras"],
      respuesta_correcta: "trabajo",
      explicacion: 'Un contrato de trabajo regula la relación laboral.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'El salario se cobra ___ al mes.',
      opciones: ["una vez", "dos veces", "cada día", "cada semana"],
      respuesta_correcta: "una vez",
      explicacion: 'En general el salario se percibe una vez al mes.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "jornada laboral"?',
      opciones: ["Horas de trabajo al día", "Días de vacaciones", "Sueldo mensual", "Años de experiencia"],
      respuesta_correcta: "Horas de trabajo al día",
      explicacion: "La jornada laboral se refiere al número de horas que se trabaja cada día."
    },
    // Conversión del diálogo laboral a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿En qué ___ trabajas?',
      opciones: ["sector", "ciudad", "curso", "familia"],
      respuesta_correcta: "sector",
      explicacion: 'Se pregunta por el sector profesional.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Soy ___ en un restaurante.',
      opciones: ["camarero/a", "cliente", "dueño", "proveedor"],
      respuesta_correcta: "camarero/a",
      explicacion: 'La profesión indicada en el diálogo es camarero/a.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Trabajo ocho horas con un ___ de media hora.',
      opciones: ["descanso", "sueldo", "contrato", "viaje"],
      respuesta_correcta: "descanso",
      explicacion: 'Hace referencia a una pausa dentro de la jornada.'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona términos laborales con su definición (ES → AR como apoyo)',
      pares: [
        { izquierda: 'contrato', derecha: 'acuerdo laboral / عقد عمل' },
        { izquierda: 'nómina', derecha: 'recibo de salario / إيصال راتب' },
        { izquierda: 'jornada', derecha: 'horas de trabajo / ساعات العمل' },
        { izquierda: 'finiquito', derecha: 'liquidación final / تسوية نهائية' }
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
    // Navegar directamente a la siguiente unidad (Unidad8)
    router.push('/A2_Plataforma/clases/Unidad8');
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
        {/* CONTENIDO DIDÁCTICO - TRABAJO Y PROFESIONES */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de trabajo y profesiones"
        />
        <Text style={styles.title}>Unidad 7: Trabajo y profesiones</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 7: Trabajo y profesiones" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 7: العمل والمهن</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario sobre el mundo laboral, profesiones y documentos necesarios para trabajar en España.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario sobre el mundo laboral, profesiones y documentos necesarios para trabajar en España." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم مفردات عالم العمل، المهن والوثائق اللازمة للعمل في إسبانيا.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Verbos de trabajo (trabajar, cobrar, firmar, solicitar, etc.){"\n"}• Expresar obligación (tener que + infinitivo, hay que + infinitivo){"\n"}• Preguntas sobre trabajo (¿A qué te dedicas? ¿Dónde trabajas? ¿Cuánto ganas?)</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Verbos de trabajo: trabajar, cobrar, firmar, solicitar. Expresar obligación: tener que, hay que. Preguntas sobre trabajo: ¿A qué te dedicas? ¿Dónde trabajas? ¿Cuánto ganas?" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أفعال العمل (يعمل، يتقاضى راتباً، يوقع، يطلب، إلخ){"\n"}• التعبير عن الالتزام (يجب + المصدر){"\n"}• أسئلة عن العمل (ماذا تعمل؟ أين تعمل؟ كم تكسب؟)</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Profesiones: camarero/a, dependiente/a, albañil, conductor/a, enfermero/a{"\n"}• Lugares: oficina, obra, hospital, tienda, restaurante{"\n"}• Documentos: contrato, nómina, finiquito, vida laboral{"\n"}• Términos: salario, horario, vacaciones, baja, despido</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Profesiones: camarero, dependiente, albañil, conductor, enfermero. Lugares: oficina, obra, hospital, tienda, restaurante. Documentos: contrato, nómina, finiquito, vida laboral. Términos: salario, horario, vacaciones, baja, despido." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• المهن: نادل/نادلة، بائع/بائعة، بناء، سائق/سائقة، ممرض/ممرضة{"\n"}• الأماكن: مكتب، موقع بناء، مستشفى، متجر، مطعم{"\n"}• الوثائق: عقد، إفادة راتب، تسوية حساب، تقرير الحياة المهنية{"\n"}• مصطلحات: راتب، جدول عمل، عطلة، إجازة مرضية، فصل من العمل</Text>
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
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Candidato:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Buenos días, vengo por el anuncio del trabajo.</Text>
                <AudioButton text="Buenos días, vengo por el anuncio del trabajo." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>صباح الخير، أتيت بخصوص إعلان العمل.</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Entrevistador:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Perfecto, ¿tienes experiencia como dependiente?</Text>
                <AudioButton text="Perfecto, ¿tienes experiencia como dependiente?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>ممتاز، هل لديك خبرة كبائع؟</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Candidato:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Sí, trabajé dos años en una tienda de ropa.</Text>
                <AudioButton text="Sí, trabajé dos años en una tienda de ropa." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، عملت لمدة سنتين في متجر ملابس.</Text>
            </View>

            {/* Línea 4 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Entrevistador:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>El horario es de mañanas, de 9 a 14h.</Text>
                <AudioButton text="El horario es de mañanas, de 9 a 14h." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>الدوام صباحي، من الساعة 9 إلى 2 ظهراً.</Text>
            </View>

            {/* Línea 5 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Candidato:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿El contrato es a jornada completa?</Text>
                <AudioButton text="¿El contrato es a jornada completa?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل العقد بدوام كامل؟</Text>
            </View>

            {/* Línea 6 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Entrevistador:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>No, es a media jornada, con contrato de 6 meses prorrogables.</Text>
                <AudioButton text="No, es a media jornada, con contrato de 6 meses prorrogables." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لا، هو بنصف دوام، بعقد لمدة 6 أشهر قابل للتمديد.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Escribe tu currículum básico{"\n"}2. Practica una entrevista de trabajo{"\n"}3. Aprende a leer una nómina</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Escribe tu currículum básico. Practica una entrevista de trabajo. Aprende a leer una nómina." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. اكتب سيرتك الذاتية الأساسية{"\n"}2. تدرب على مقابلة عمل{"\n"}3. تعلم قراءة إفادة الراتب</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario clave</Text>
            <AudioButton text="Vocabulario clave" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>autobús = حافلة{"\n"}metro = مترو{"\n"}tren = قطار{"\n"}avión = طائرة{"\n"}billete = تذكرة{"\n"}estación = محطة{"\n"}aeropuerto = مطار{"\n"}hotel = فندق</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="autobús, metro, tren, avión, billete, estación, aeropuerto, hotel" size="small" showText={false} color="#79A890" />
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
            <AudioButton text="Ejemplo de interacción" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>— ¿Cómo voy al centro? — Puedes tomar el autobús número 15 o el metro. — ¿Cuánto cuesta el billete? — El billete cuesta 1,50 euros. — ¿Dónde está la parada? — Está al final de esta calle.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Cómo voy al centro? Puedes tomar el autobús número 15 o el metro. ¿Cuánto cuesta el billete? El billete cuesta 1,50 euros. ¿Dónde está la parada? Está al final de esta calle." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>— كيف أذهب إلى المركز؟ — يمكنك أن تأخذ الحافلة رقم 15 أو المترو. — كم ثمن التذكرة؟ — التذكرة ثمنها 1,50 يورو. — أين المحطة؟ — في نهاية هذا الشارع.</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad</Text>
            <AudioButton text="Actividad" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Planifica un viaje: elige destino, medio de transporte, alojamiento y actividades que harías.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Planifica un viaje: elige destino, medio de transporte, alojamiento y actividades que harías." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>خطط رحلة: اختر وجهة، وسيلة نقل، إقامة والأنشطة التي ستقوم بها.</Text>
        </View>
        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Busco trabajo de camarero.</Text>
                <AudioButton text="Busco trabajo de camarero." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أبحث عن عمل كنادل.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Tengo experiencia en ventas.</Text>
                <AudioButton text="Tengo experiencia en ventas." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>لدي خبرة في المبيعات.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Cuánto es el salario?</Text>
                <AudioButton text="¿Cuánto es el salario?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>كم هو الراتب؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Trabajo a media jornada.</Text>
                <AudioButton text="Trabajo a media jornada." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أعمل بنصف دوام.</Text>
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
