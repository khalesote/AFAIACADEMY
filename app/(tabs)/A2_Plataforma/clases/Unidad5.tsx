import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '@/app/components/AudioButton';
import EjerciciosInteractivos from '@/app/components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = require('../../../../assets/unidades_y_examenes.json');

export default function Unidad5() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 4;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué necesitas para plantar un árbol?',
      opciones: ["Una pala", "Un martillo", "Un paraguas", "Un libro"],
      respuesta_correcta: "Una pala",
      explicacion: "Se necesita una pala para hacer un hoyo en la tierra y plantar el árbol."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué animal da leche?',
      opciones: ["La vaca", "El gallo", "El perro", "El gato"],
      respuesta_correcta: "La vaca",
      explicacion: "La vaca es un animal de granja que da leche."
    },
    // Conversión de rellenar huecos a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: 'En el ___ hay muchos árboles',
      opciones: ["campo", "banco", "cine", "supermercado"],
      respuesta_correcta: "campo",
      explicacion: 'El contexto es la naturaleza.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'En el campo hay muchos árboles y ___',
      opciones: ["plantas", "coches", "ascensores", "semáforos"],
      respuesta_correcta: "plantas",
      explicacion: 'Árboles y plantas pertenecen al campo.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Los ___ pastan en el prado',
      opciones: ["animales", "libros", "móviles", "camiones"],
      respuesta_correcta: "animales",
      explicacion: 'Pastorear se asocia a animales.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué se hace con la cosecha?',
      opciones: ["Recoger los frutos", "Cortar el césped", "Regar las plantas", "Podar los árboles"],
      respuesta_correcta: "Recoger los frutos",
      explicacion: "La cosecha es el proceso de recoger los frutos o productos de la tierra."
    },
    // Conversión del diálogo en la granja a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Qué ___ hay en la granja?',
      opciones: ["animales", "coches", "ascensores", "oficinas"],
      respuesta_correcta: "animales",
      explicacion: 'En una granja hay animales.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— Hay vacas, ___ y gallinas.',
      opciones: ["ovejas", "ratones", "gatos salvajes", "tiburones"],
      respuesta_correcta: "ovejas",
      explicacion: 'Animales típicos de granja.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '— ¿Y qué ___ cultivan? (tomates, lechugas, zanahorias)',
      opciones: ["hortalizas", "ordenadores", "metales", "piedras"],
      respuesta_correcta: "hortalizas",
      explicacion: 'Tomates, lechugas y zanahorias son hortalizas.'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona herramienta con su uso (ES → AR como apoyo)',
      pares: [
        { izquierda: 'pala', derecha: 'hacer hoyos / حفر' },
        { izquierda: 'regadera', derecha: 'regar plantas / سقي' },
        { izquierda: 'rastrillo', derecha: 'recoger hojas / جمع الأوراق' },
        { izquierda: 'azada', derecha: 'remover tierra / تقليب التربة' }
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
    // Navegar directamente a la siguiente unidad (Unidad6)
    router.push('/A2_Plataforma/clases/Unidad6');
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
        {/* CONTENIDO DIDÁCTICO - EN EL CAMPO Y LA NATURALEZA */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de un paisaje campestre"
        />
        <Text style={styles.title}>Unidad 5: En el campo y la naturaleza</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 5: En el campo y la naturaleza" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 5: في الريف والطبيعة</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario sobre la vida en el campo, la naturaleza y las actividades agrícolas.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario sobre la vida en el campo, la naturaleza y las actividades agrícolas." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم مفردات الحياة في الريف والطبيعة والأنشطة الزراعية.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Verbos de acción (sembrar, regar, cosechar, podar){"\n"}• Expresar obligación (hay que, tener que, deber){"\n"}• Preguntas sobre cantidades (¿Cuánto? ¿Cuántos? ¿Cuántas?)</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Verbos de acción: sembrar, regar, cosechar, podar. Expresar obligación: hay que, tener que, deber. Preguntas sobre cantidades: ¿Cuánto? ¿Cuántos? ¿Cuántas?" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أفعال الحركة (يزرع، يسقي، يحصد، يقلم){"\n"}• التعبير عن الوجوب (يجب، يتوجب، ينبغي){"\n"}• أسئلة عن الكميات (كم؟ بكم؟)</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Lugares: campo, granja, huerto, bosque, río, montaña{"\n"}• Animales: vaca, oveja, gallina, caballo, cerdo{"\n"}• Cultivos: trigo, maíz, tomate, lechuga, zanahoria{"\n"}• Herramientas: pala, rastrillo, azada, regadera</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Lugares: campo, granja, huerto, bosque, río, montaña. Animales: vaca, oveja, gallina, caballo, cerdo. Cultivos: trigo, maíz, tomate, lechuga, zanahoria. Herramientas: pala, rastrillo, azada, regadera." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أماكن: حقل، مزرعة، حديقة نباتية، غابة، نهر، جبل{"\n"}• حيوانات: بقرة، خروف، دجاجة، حصان، خنزير{"\n"}• محاصيل: قمح، ذرة، طماطم، خس، جزر{"\n"}• أدوات: مجرفة، مذراة، معول، علبة سقي</Text>
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
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona 1:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Qué cultivas en tu huerto?</Text>
                <AudioButton text="¿Qué cultivas en tu huerto?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>ماذا تزرع في حديقتك؟</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona 2:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Ahora tengo tomates, lechugas y pimientos.</Text>
                <AudioButton text="Ahora tengo tomates, lechugas y pimientos." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لدي الآن طماطم وخس وفلفل.</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona 1:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Cuándo se cosechan los tomates?</Text>
                <AudioButton text="¿Cuándo se cosechan los tomates?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>متى يتم حصاد الطماطم؟</Text>
            </View>

            {/* Línea 4 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona 2:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Normalmente en verano, cuando hace calor.</Text>
                <AudioButton text="Normalmente en verano, cuando hace calor." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>عادة في الصيف، عندما يكون الجو حاراً.</Text>
            </View>

            {/* Línea 5 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona 1:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Y qué animales tienes en la granja?</Text>
                <AudioButton text="¿Y qué animales tienes en la granja?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>وما هي الحيوانات التي لديك في المزرعة؟</Text>
            </View>

            {/* Línea 6 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Persona 2:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Tenemos gallinas que ponen huevos y dos vacas que dan leche.</Text>
                <AudioButton text="Tenemos gallinas que ponen huevos y dos vacas que dan leche." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لدينا دجاج يضع البيض وبقرتان تعطيان الحليب.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Haz una lista de frutas y verduras de temporada{"\n"}2. Aprende los nombres de las herramientas del campo{"\n"}3. Describe un día en una granja</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Haz una lista de frutas y verduras de temporada. Aprende los nombres de las herramientas del campo. Describe un día en una granja." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. أعد قائمة بالفواكه والخضروات الموسمية{"\n"}2. تعلم أسماء أدوات الزراعة{"\n"}3. صف يوماً في مزرعة</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario clave</Text>
            <AudioButton text="Vocabulario clave" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>
            • campo = ريف / granja = مزرعة / huerto = حديقة نباتية{"\n"}
            • cosecha = حصاد / cultivo = زراعة / sembrar = يزرع / regar = يسقي{"\n"}
            • hortalizas = خضروات / fruta = فاكهة{"\n"}
            • herramientas: pala = مجرفة / azada = معول / regadera = علبة سقي / rastrillo = مذراة{"\n"}
            • animales: vaca = بقرة / oveja = خروف / gallina = دجاجة / caballo = حصان
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Campo, granja, huerto. Cosecha, cultivo, sembrar, regar. Hortalizas y fruta. Herramientas: pala, azada, regadera, rastrillo. Animales: vaca, oveja, gallina, caballo." size="small" showText={false} color="#79A890" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expresiones útiles (campo)</Text>
          <AudioButton text="Expresiones útiles del campo" size="small" showText={false} color="#79A890" />
          <Text style={styles.sectionText}>
            • ¿Qué cultivas en tu huerto? = ماذا تزرع في حديقتك?{"\n"}
            • Hay que regar por la mañana. = يجب سقي النباتات صباحاً.{"\n"}
            • La cosecha empieza en verano. = يبدأ الحصاد في الصيف.{"\n"}
            • Los animales pastan en el prado. = الحيوانات ترعى في المرعى.
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Qué cultivas en tu huerto? Hay que regar por la mañana. La cosecha empieza en verano. Los animales pastan en el prado." size="small" showText={false} color="#79A890" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Medidas y cantidades</Text>
            <AudioButton text="Medidas y cantidades" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>
            • una docena de huevos = اثنا عشر بيضة{"\n"}
            • un kilo de tomates = كيلو طماطم{"\n"}
            • medio litro de leche = نصف لتر حليب{"\n"}
            • unos cuantos/varios = بعض / عدة
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Una docena de huevos. Un kilo de tomates. Medio litro de leche. Unos cuantos, varios." size="small" showText={false} color="#79A890" />
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
            <AudioButton text="Ejemplo de interacción" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>— ¿Qué te gusta hacer en tu tiempo libre? — Me gusta leer y escuchar música. — ¿Practicas algún deporte? — Sí, juego al fútbol los fines de semana. — ¿Qué planes tienes para el sábado? — Voy al cine con mis amigos.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Qué te gusta hacer en tu tiempo libre? Me gusta leer y escuchar música. ¿Practicas algún deporte? Sí, juego al fútbol los fines de semana. ¿Qué planes tienes para el sábado? Voy al cine con mis amigos." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>— ماذا تحب أن تفعل في وقت فراغك؟ — أحب القراءة والاستماع للموسيقى. — هل تمارس أي رياضة؟ — نعم، ألعب كرة القدم في عطلة نهاية الأسبوع. — ما خططك ليوم السبت؟ — سأذهب إلى السينما مع أصدقائي.</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad</Text>
            <AudioButton text="Actividad" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Describe tus actividades favoritas de tiempo libre: qué te gusta hacer, cuándo las practicas, con quién las compartes.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Describe tus actividades favoritas de tiempo libre: qué te gusta hacer, cuándo las practicas, con quién las compartes." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>صف أنشطتك المفضلة في وقت الفراغ: ماذا تحب أن تفعل، متى تمارسها، مع من تشاركها.</Text>
        </View>
        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>En mi huerto cultivo tomates y lechugas.</Text>
                <AudioButton text="En mi huerto cultivo tomates y lechugas." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>في حديقتي أزرع الطماطم والخس.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Hay vacas y ovejas en la granja.</Text>
                <AudioButton text="Hay vacas y ovejas en la granja." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>هناك أبقار وخراف في المزرعة.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Para la cosecha necesitamos ayuda.</Text>
                <AudioButton text="Para la cosecha necesitamos ayuda." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>نحتاج إلى مساعدة للحصاد.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Dónde está el huerto?</Text>
                <AudioButton text="¿Dónde está el huerto?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أين تقع الحديقة النباتية؟</Text>
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
