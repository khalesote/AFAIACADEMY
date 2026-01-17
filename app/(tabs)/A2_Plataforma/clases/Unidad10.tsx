import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '@/app/components/AudioButton';
import EjerciciosInteractivos from '@/app/components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = require('../../../../assets/unidades_y_examenes.json');

export default function Unidad10() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 9;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "reciclar"?',
      opciones: ["Separar los residuos para su reutilización", "Quemar la basura", "Tirar todo a la basura", "Comprar productos nuevos"],
      respuesta_correcta: "Separar los residuos para su reutilización",
      explicacion: "Reciclar significa separar los residuos para que puedan ser procesados y convertidos en nuevos productos."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál de estos es un ejemplo de energía renovable?',
      opciones: ["Energía solar", "Petróleo", "Carbón", "Gas natural"],
      respuesta_correcta: "Energía solar",
      explicacion: "La energía solar es renovable porque proviene del sol, una fuente inagotable a escala humana."
    },
    // Conversión de rellenar huecos (acciones ambientales)
    {
      tipo: 'opcion_multiple',
      enunciado: 'Para cuidar el medio ambiente podemos ___ el agua.',
      opciones: ["ahorrar", "derrochar", "contaminar", "calentar"],
      respuesta_correcta: "ahorrar",
      explicacion: 'El ahorro de agua es una medida básica.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'También podemos ___ la energía.',
      opciones: ["ahorrar", "gastar en exceso", "desperdiciar", "encender siempre"],
      respuesta_correcta: "ahorrar",
      explicacion: 'Reducir el consumo energético ayuda al planeta.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Y ___ los residuos.',
      opciones: ["reciclar", "mezclar", "quemar", "enterrar"],
      respuesta_correcta: "reciclar",
      explicacion: 'Reciclar reduce residuos y contaminación.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la huella de carbono?',
      opciones: ["La cantidad de gases de efecto invernadero que generamos", "La suela de los zapatos", "Un tipo de contaminación acústica", "Un indicador de calidad del aire"],
      respuesta_correcta: "La cantidad de gases de efecto invernadero que generamos",
      explicacion: "La huella de carbono mide el impacto de nuestras actividades en el cambio climático."
    },
    // Conversión del diálogo de sostenibilidad
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Qué haces para ser más ___?',
      opciones: ["sostenible", "rápido", "barato", "ruidoso"],
      respuesta_correcta: "sostenible",
      explicacion: 'El foco es la sostenibilidad.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Intento ___ en bicicleta siempre que puedo.',
      opciones: ["desplazarme", "aparcar", "conducir coche", "viajar en avión"],
      respuesta_correcta: "desplazarme",
      explicacion: 'Desplazarse en bici reduce emisiones.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Compro productos de ___ cercana.',
      opciones: ["producción", "publicidad", "inversión", "combustión"],
      respuesta_correcta: "producción",
      explicacion: 'Apoyar producción local reduce transporte.'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona acción ambiental con su impacto (ES → AR como apoyo)',
      pares: [
        { izquierda: 'reciclar', derecha: 'menos residuos / نفايات أقل' },
        { izquierda: 'ahorrar energía', derecha: 'menos emisiones / انبعاثات أقل' },
        { izquierda: 'usar bicicleta', derecha: 'menos CO₂ en transporte / ثاني أكسيد كربون أقل' },
        { izquierda: 'comprar local', derecha: 'menos transporte / نقل أقل' }
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
    // Esta es la última unidad, volver al menú de A2
    router.replace('/(tabs)/A2_Plataforma');
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
        {/* CONTENIDO DIDÁCTICO - MEDIO AMBIENTE Y SOSTENIBILIDAD */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de medio ambiente y sostenibilidad"
        />
        <Text style={styles.title}>Unidad 10: Medio ambiente y sostenibilidad</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 10: Medio ambiente y sostenibilidad" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 10: البيئة والاستدامة</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario y expresiones relacionadas con el cuidado del medio ambiente y la sostenibilidad en español.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario y expresiones relacionadas con el cuidado del medio ambiente y la sostenibilidad en español." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم المفردات والتعابير المتعلقة بالحفاظ على البيئة والاستدامة باللغة الإسبانية.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Expresar obligación (hay que, se debe, es necesario){"\n"}• Consejos y recomendaciones (deberías, podrías, sería bueno que){"\n"}• Futuro simple para hablar de consecuencias</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Expresar obligación: hay que, se debe, es necesario. Consejos y recomendaciones: deberías, podrías, sería bueno que. Futuro simple para hablar de consecuencias." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• التعبير عن الالتزام (يجب، ينبغي، من الضروري){"\n"}• النصائح والتوصيات (يجب أن تستطيع، يمكنك، سيكون من الجيد أن){"\n"}• المستقبل البسيط للتحدث عن النتائج</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Conceptos: medio ambiente, contaminación, reciclaje, sostenibilidad{"\n"}• Acciones: reducir, reutilizar, reciclar, ahorrar{"\n"}• Energías: solar, eólica, renovable, no renovable{"\n"}• Problemas: cambio climático, deforestación, contaminación, residuos</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Conceptos: medio ambiente, contaminación, reciclaje, sostenibilidad. Acciones: reducir, reutilizar, reciclar, ahorrar. Energías: solar, eólica, renovable, no renovable. Problemas: cambio climático, deforestación, contaminación, residuos." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• مفاهيم: البيئة، التلوث، إعادة التدوير، الاستدامة{"\n"}• إجراءات: تقليل، إعادة استخدام، إعادة تدوير، توفير{"\n"}• الطاقات: شمسية، رياح، متجددة، غير متجددة{"\n"}• مشاكل: تغير المناخ، إزالة الغابات، التلوث، النفايات</Text>
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
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona A:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Qué haces para cuidar el medio ambiente?</Text>
                <AudioButton text="¿Qué haces para cuidar el medio ambiente?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>ماذا تفعلين للعناية بالبيئة؟</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona B:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Pues en casa separamos la basura, usamos bombillas de bajo consumo y tratamos de ahorrar agua.</Text>
                <AudioButton text="Pues en casa separamos la basura, usamos bombillas de bajo consumo y tratamos de ahorrar agua." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>في المنزل نقوم بفصل النفايات، نستخدم مصابيح موفرة للطاقة ونحاول توفير الماء.</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona A:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¡Qué bien! Nosotros también reciclamos y además vamos en bici al trabajo.</Text>
                <AudioButton text="¡Qué bien! Nosotros también reciclamos y además vamos en bici al trabajo." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>جيد جداً! نحن أيضاً نعيد التدوير بالإضافة إلى ذهابنا إلى العمل بالدراجة.</Text>
            </View>

            {/* Línea 4 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona B:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Sí, el transporte es una gran fuente de contaminación. También es importante comprar productos locales.</Text>
                <AudioButton text="Sí, el transporte es una gran fuente de contaminación. También es importante comprar productos locales." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، النقل مصدر كبير للتلوث. من المهم أيضاً شراء منتجات محلية.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Haz una lista de acciones para ahorrar energía en casa{"\n"}2. Visita un punto limpio de reciclaje{"\n"}3. Calcula tu huella de carbono</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Haz una lista de acciones para ahorrar energía en casa. Visita un punto limpio de reciclaje. Calcula tu huella de carbono." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. أعد قائمة بإجراءات لتوفير الطاقة في المنزل{"\n"}2. قم بزيارة نقطة إعادة تدوير نظيفة{"\n"}3. احسب بصمتك الكربونية</Text>
        </View>
        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>En casa reciclamos papel, vidrio y plástico.</Text>
                <AudioButton text="En casa reciclamos papel, vidrio y plástico." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>في المنزل نعيد تدوير الورق والزجاج والبلاستيك.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Intento ahorrar agua y energía.</Text>
                <AudioButton text="Intento ahorrar agua y energía." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أحاول توفير الماء والطاقة.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Voy al trabajo en bicicleta.</Text>
                <AudioButton text="Voy al trabajo en bicicleta." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أذهب إلى العمل بالدراجة.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Es importante comprar productos locales.</Text>
                <AudioButton text="Es importante comprar productos locales." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>من المهم شراء منتجات محلية.</Text>
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
