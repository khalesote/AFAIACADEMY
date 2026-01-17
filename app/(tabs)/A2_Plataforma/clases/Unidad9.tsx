import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '@/app/components/AudioButton';
import EjerciciosInteractivos from '@/app/components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = require('../../../../assets/unidades_y_examenes.json');

export default function Unidad9() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 8;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué necesitas para alquilar un piso en España?',
      opciones: ["Contrato de arrendamiento y fianza", "Permiso de conducir", "Tarjeta de la biblioteca", "Carné de estudiante"],
      respuesta_correcta: "Contrato de arrendamiento y fianza",
      explicacion: "Para alquilar un piso necesitas firmar un contrato de arrendamiento y pagar una fianza (normalmente equivalente a un mes de alquiler)."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "gastos de comunidad"?',
      opciones: ["Gastos de mantenimiento del edificio", "Gastos de la compra", "Gastos de transporte", "Gastos de ocio"],
      respuesta_correcta: "Gastos de mantenimiento del edificio",
      explicacion: "Los gastos de comunidad cubren los gastos de limpieza, mantenimiento y otros servicios comunes del edificio."
    },
    // Conversión de rellenar huecos (conceptos de vivienda)
    {
      tipo: 'opcion_multiple',
      enunciado: 'El ___ es el documento que regula el alquiler.',
      opciones: ["contrato", "recibo", "IBI", "DNI"],
      respuesta_correcta: "contrato",
      explicacion: 'El contrato regula condiciones, duración y obligaciones.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'La ___ es el dinero que se paga al firmar el contrato.',
      opciones: ["fianza", "hipoteca", "pensión", "nómina"],
      respuesta_correcta: "fianza",
      explicacion: 'La fianza suele equivaler a un mes de alquiler.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'El ___ es el pago mensual por vivir en el piso.',
      opciones: ["alquiler", "IBI", "seguro", "comunidad"],
      respuesta_correcta: "alquiler",
      explicacion: 'Alquiler = renta mensual de la vivienda.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es el IBI?',
      opciones: ["Impuesto sobre Bienes Inmuebles", "Seguro del hogar", "Gastos de comunidad", "Depósito de garantía"],
      respuesta_correcta: "Impuesto sobre Bienes Inmuebles",
      explicacion: "El IBI es un impuesto municipal que se paga por ser propietario de una vivienda o local."
    },
    // Conversión del diálogo de búsqueda de piso
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Cuándo quieres ___ el piso?',
      opciones: ["visitarlo", "comprarlo ahora", "mudarte", "pintarlo"],
      respuesta_correcta: "visitarlo",
      explicacion: 'Primero se concierta una visita.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Podría ser mañana por la ___?',
      opciones: ["tarde", "mañana", "madrugada", "medianoche"],
      respuesta_correcta: "tarde",
      explicacion: 'Horario habitual para visitas.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— La dirección es Calle Mayor 10, ___ 3ºB.',
      opciones: ["puerta", "ventana", "ascensor", "garaje"],
      respuesta_correcta: "puerta",
      explicacion: 'Se especifica puerta 3ºB.'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona términos de vivienda con su descripción (ES → AR como apoyo)',
      pares: [
        { izquierda: 'fianza', derecha: 'depósito de garantía / تأمين' },
        { izquierda: 'gastos de comunidad', derecha: 'mantenimiento del edificio / مصاريف العمارة' },
        { izquierda: 'IBI', derecha: 'impuesto municipal / ضريبة عقارية' },
        { izquierda: 'contrato de arrendamiento', derecha: 'regula el alquiler / عقد إيجار' }
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
    // Navegar directamente a la siguiente unidad (Unidad10)
    router.push('/A2_Plataforma/clases/Unidad10');
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
        {/* CONTENIDO DIDÁCTICO - VIVIENDA Y HOGAR */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de vivienda y hogar"
        />
        <Text style={styles.title}>Unidad 9: Vivienda y hogar</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 9: Vivienda y hogar" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 9: السكن والمنزل</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario relacionado con la vivienda, el alquiler y la convivencia en España.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario relacionado con la vivienda, el alquiler y la convivencia en España." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم مفردات تتعلق بالسكن، الإيجار والتعايش في إسبانيا.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Verbos de vivienda (alquilar, comprar, mudarse, reformar){"\n"}• Expresar necesidad (necesitar, tener que, haber que){"\n"}• Preposiciones de lugar (en, sobre, bajo, entre, al lado de)</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Verbos de vivienda: alquilar, comprar, mudarse, reformar. Expresar necesidad: necesitar, tener que, haber que. Preposiciones de lugar: en, sobre, bajo, entre, al lado de." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أفعال السكن (يستأجر، يشتري، ينتقل، يرمم){"\n"}• التعبير عن الحاجة (يحتاج، يجب أن، يتوجب){"\n"}• حروف الجر للمكان (في، على، تحت، بين، بجانب)</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Tipos de vivienda: piso, casa, apartamento, estudio, ático{"\n"}• Partes de la casa: salón, cocina, baño, habitación, terraza{"\n"}• Documentos: contrato de arrendamiento, fianza, recibos, IBI{"\n"}• Mobiliario: sofá, cama, armario, mesa, silla</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Tipos de vivienda: piso, casa, apartamento, estudio, ático. Partes de la casa: salón, cocina, baño, habitación, terraza. Documentos: contrato de arrendamiento, fianza, recibos, IBI. Mobiliario: sofá, cama, armario, mesa, silla." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أنواع السكن: شقة، منزل، شقة صغيرة، شقة علوية{"\n"}• أجزاء المنزل: صالة، مطبخ، حمام، غرفة، شرفة{"\n"}• وثائق: عقد إيجار، وديعة، فواتير، ضريبة العقار{"\n"}• الأثاث: أريكة، سرير، خزانة، طاولة، كرسي</Text>
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
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Interesado:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Hola, vengo a ver el piso que anuncian.</Text>
                <AudioButton text="Hola, vengo a ver el piso que anuncian." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>مرحباً، جئت لرؤية الشقة المعلن عنها.</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Agente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Pase, por favor. El piso tiene 80 metros cuadrados, dos habitaciones, un baño, cocina equipada y un pequeño balcón.</Text>
                <AudioButton text="Pase, por favor. El piso tiene 80 metros cuadrados, dos habitaciones, un baño, cocina equipada y un pequeño balcón." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>تفضل بالدخول. الشقة مساحتها 80 متراً مربعاً، غرفتان، حمام، مطبخ مجهز وشرفة صغيرة.</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Interesado:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿El precio incluye gastos de comunidad?</Text>
                <AudioButton text="¿El precio incluye gastos de comunidad?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل السعر يشمل مصاريف العمارة؟</Text>
            </View>

            {/* Línea 4 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Agente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>No, los gastos de comunidad son aparte, unos 50€ al mes.</Text>
                <AudioButton text="No, los gastos de comunidad son aparte, unos 50 euros al mes." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لا، مصاريف العمارة منفصلة، حوالي 50 يورو شهرياً.</Text>
            </View>

            {/* Línea 5 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Interesado:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Y cuánto es la fianza?</Text>
                <AudioButton text="¿Y cuánto es la fianza?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>وما هو مبلغ الضمان؟</Text>
            </View>

            {/* Línea 6 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Agente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Un mes de alquiler como fianza, más el primer mes por adelantado.</Text>
                <AudioButton text="Un mes de alquiler como fianza, más el primer mes por adelantado." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>ضمان بقيمة إيجار شهر، بالإضافة إلى إيجار الشهر الأول مقدماً.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Visita una inmobiliaria y pide información{"\n"}2. Lee un contrato de alquiler{"\n"}3. Haz una lista de muebles para amueblar una casa</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Visita una inmobiliaria y pide información. Lee un contrato de alquiler. Haz una lista de muebles para amueblar una casa." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. قم بزيارة وكالة عقارات واسأل عن المعلومات{"\n"}2. اقرأ عقد إيجار{"\n"}3. أعد قائمة بالأثاث لتأثيث منزل</Text>
        </View>
        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Busco un piso de dos habitaciones.</Text>
                <AudioButton text="Busco un piso de dos habitaciones." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أبحث عن شقة بغرفتين.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿La fianza es de un mes?</Text>
                <AudioButton text="¿La fianza es de un mes?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>هل التأمين شهر واحد؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Los gastos de comunidad están incluidos.</Text>
                <AudioButton text="Los gastos de comunidad están incluidos." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>مصاريف العمارة مشمولة.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Quiero visitar el piso mañana por la tarde.</Text>
                <AudioButton text="Quiero visitar el piso mañana por la tarde." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أريد زيارة الشقة غداً مساءً.</Text>
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
