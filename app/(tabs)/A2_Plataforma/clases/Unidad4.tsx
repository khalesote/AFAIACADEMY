import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '../../../components/AudioButton';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useRouter } from 'expo-router';
import UnidadCard from './UnidadCard';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = require('../../../assets/unidades_y_examenes.json');

export default function Unidad4() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 3;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;
  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué necesitas pedir al terminar de comer en un restaurante?',
      opciones: ["La cuenta", "El menú", "La carta", "La reserva"],
      respuesta_correcta: "La cuenta",
      explicacion: "Al terminar de comer, se pide 'la cuenta' para pagar."
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "sin gluten" en un menú?',
      opciones: ["No contiene trigo, cebada ni centeno", "No tiene sal", "No lleva azúcar", "Es vegetariano"],
      respuesta_correcta: "No contiene trigo, cebada ni centeno",
      explicacion: "'Sin gluten' indica que el plato no contiene proteínas de ciertos cereales como el trigo."
    },
    // Conversión del ejercicio de rellenar a opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: 'En el restaurante: "¿Han ___ mesa?"',
      opciones: ["reservado", "pagado", "llegado", "salido"],
      respuesta_correcta: "reservado",
      explicacion: 'La frase correcta es: "¿Han reservado mesa?"'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'En el restaurante: "¿Tienen ___?"',
      opciones: ["menú", "propina", "reserva", "cuenta"],
      respuesta_correcta: "menú",
      explicacion: 'Se pide el menú para ver los platos disponibles.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'De primer plato quiero la ___.',
      opciones: ["ensalada", "cuenta", "jarra", "mesa"],
      respuesta_correcta: "ensalada",
      explicacion: 'Es un plato de comida, no un objeto del servicio.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "del tiempo" en un menú de frutas?',
      opciones: ["De temporada", "A temperatura ambiente", "Congelada", "Cocida"],
      respuesta_correcta: "De temporada",
      explicacion: "'Del tiempo' se refiere a frutas o verduras que son propias de la temporada actual."
    },
    // Conversión del ejercicio de completar pedido
    {
      tipo: 'opcion_multiple',
      enunciado: 'De ___ quiero el gazpacho.',
      opciones: ["entrante", "segundo", "postre", "bebida"],
      respuesta_correcta: "entrante",
      explicacion: 'El gazpacho suele servirse como entrante o primer plato.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'De ___ el filete con patatas.',
      opciones: ["segundo", "entrante", "postre", "café"],
      respuesta_correcta: "segundo",
      explicacion: 'El filete con patatas es un plato principal (segundo).'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Y de ___ un flan.',
      opciones: ["postre", "entrante", "segundo", "pan"],
      respuesta_correcta: "postre",
      explicacion: 'El flan es un postre.'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada plato con su categoría (ES → AR como apoyo)',
      pares: [
        { izquierda: 'gazpacho (sopa fría)', derecha: 'entrante / مقبلات' },
        { izquierda: 'filete con patatas', derecha: 'segundo / الطبق الرئيسي' },
        { izquierda: 'flan', derecha: 'postre / حلوى' },
        { izquierda: 'agua / refresco', derecha: 'bebida / مشروب' }
      ]
    }
  ];
  const [respuestas, setRespuestas] = useState<any>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const opcionesMezcladasRef = useRef<Record<number, string[]>>({});

  const handleInput = (idx: number, value: string | string[]) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: value }));
  };

  // eliminado: checkRellenarHuecos (no se usa al eliminar ejercicios de completar)

  const checkOpcionMultiple = (idx: number, correcta: string, seleccion: string) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: seleccion }));
    setFeedback((prev: any) => ({ ...prev, [idx]: seleccion === correcta ? '¡Correcto!' : 'Incorrecto' }));
  };

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A2', unitIndex);
    }
    // Navegar directamente a la siguiente unidad (Unidad5)
    router.push('/A2_Plataforma/clases/Unidad5');
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
        {/* CONTENIDO DIDÁCTICO - COMIDA Y RESTAURANTES */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1170&q=80' }}
          style={styles.image}
          accessibilityLabel="Imagen de un restaurante"
        />
        <Text style={styles.title}>Unidad 4: Comida y restaurantes</Text>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <AudioButton text="Unidad 4: Comida y restaurantes" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.titleAr}>الوحدة 4: الطعام والمطاعم</Text>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Contexto</Text>
            <AudioButton text="Contexto" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Aprende vocabulario para leer menús, hacer pedidos en restaurantes y expresar preferencias alimenticias.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Aprende vocabulario para leer menús, hacer pedidos en restaurantes y expresar preferencias alimenticias." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>تعلم المفردات المتعلقة بقراءة القوائم، وطلب الطعام في المطاعم، والتعبير عن التفضيلات الغذائية.</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Gramática</Text>
            <AudioButton text="Gramática" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Verbos de cocina (cortar, freír, hervir, hornear, mezclar){"\n"}• Expresar gustos y preferencias (me gusta, prefiero, odio){"\n"}• Pedir y dar indicaciones (¿Me trae...?, Quisiera..., ¿Me pone...?)</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Verbos de cocina: cortar, freír, hervir, hornear, mezclar. Expresar gustos y preferencias: me gusta, prefiero, odio. Pedir y dar indicaciones: ¿Me trae?, Quisiera, ¿Me pone?" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أفعال الطبخ (يقطع، يقلي، يغلي، يخبز، يخلط){"\n"}• التعبير عن الأذواق والتفضيلات (يعجبني، أفضل، أكره){"\n"}• طلب الطعام وإعطاء التعليمات (هل يمكنك أن تأتي بـ...؟، أود...، هل يمكنك وضع...؟)</Text>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario</Text>
            <AudioButton text="Vocabulario" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>• Tipos de restaurantes: asador, italiano, chino, de comida rápida, vegetariano{"\n"}• Partes del menú: entrantes, primeros, segundos, postres, bebidas{"\n"}• Expresiones: menú del día, cubierto, propina, alergias, sin gluten, sin lactosa</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Tipos de restaurantes: asador, italiano, chino, de comida rápida, vegetariano. Partes del menú: entrantes, primeros, segundos, postres, bebidas. Expresiones: menú del día, cubierto, propina, alergias, sin gluten, sin lactosa." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>• أنواع المطاعم: مشويات، إيطالي، صيني، وجبات سريعة، نباتي{"\n"}• أقسام القائمة: مقبلات، أطباق رئيسية، حلويات، مشروبات{"\n"}• تعابير: قائمة اليوم، أدوات المائدة، بقشيش، حساسية، خالٍ من الغلوتين، خالٍ من اللاكتوز</Text>
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
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Cliente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Buenas noches, ¿tienen mesa para dos?</Text>
                <AudioButton text="Buenas noches, ¿tienen mesa para dos?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>مساء الخير، هل لديكم طاولة لشخصين؟</Text>
            </View>

            {/* Línea 2 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Camarero:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Sí, pásenme por aquí. Tomen asiento.</Text>
                <AudioButton text="Sí, pásenme por aquí. Tomen asiento." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، تفضلوا من هنا. اجلسوا من فضلكم.</Text>
            </View>

            {/* Línea 3 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Cliente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Tienen menú en inglés?</Text>
                <AudioButton text="¿Tienen menú en inglés?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل لديكم قائمة باللغة الإنجليزية؟</Text>
            </View>

            {/* Línea 4 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Camarero:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Sí, aquí lo tiene. ¿Quieren algo para beber?</Text>
                <AudioButton text="Sí, aquí lo tiene. ¿Quieren algo para beber?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، ها هي. هل تريدون شيئاً للشرب؟</Text>
            </View>

            {/* Línea 5 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Cliente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Una botella de agua y una jarra de sangría, por favor.</Text>
                <AudioButton text="Una botella de agua y una jarra de sangría, por favor." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>زجاجة ماء وجرة سانجريا من فضلك.</Text>
            </View>

            {/* Línea 6 */}
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Camarero:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>¿Han decidido ya?</Text>
                <AudioButton text="¿Han decidido ya?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل قررتم الطلب؟</Text>
            </View>

            {/* Línea 7 */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={[styles.sectionText, { fontWeight: 'bold', color: '#79A890' }]}>Cliente:</Text>
                <Text style={[styles.sectionText, { flex: 1 }]}>Sí, de primero tomaremos ensalada y croquetas, y de segundo, paella y solomillo.</Text>
                <AudioButton text="Sí, de primero tomaremos ensalada y croquetas, y de segundo, paella y solomillo." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، كطبق أول سنأخذ سلطة وكروكيت، وكطبق رئيسي بايلا وقطعة لحم.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad práctica</Text>
            <AudioButton text="Actividad práctica" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>1. Haz una lista de tus comidas favoritas{"\n"}2. Practica pedir en un restaurante{"\n"}3. Aprende a leer etiquetas de alimentos</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Haz una lista de tus comidas favoritas. Practica pedir en un restaurante. Aprende a leer etiquetas de alimentos." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>1. أعد قائمة بأطعمتك المفضلة{"\n"}2. تدرب على الطلب في المطعم{"\n"}3. تعلم قراءة ملصقات المواد الغذائية</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Vocabulario clave</Text>
            <AudioButton text="Vocabulario clave" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>
            • carta = قائمة الأطباق{"\n"}
            • menú del día = قائمة اليوم{"\n"}
            • entrante = مقبلات / primer plato = الطبق الأول / segundo = الطبق الرئيسي / postre = حلوى{"\n"}
            • bebida = مشروب / jarra = إبريق / botella = زجاجة{"\n"}
            • cuenta = الفاتورة / propina = بقشيش{"\n"}
            • reserva = حجز / mesa para dos = طاولة لشخصين{"\n"}
            • sin gluten = خالٍ من الغلوتين / sin lactosa = خالٍ من اللاكتوز
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="carta, menú del día, entrante, primer plato, segundo, postre. bebida, jarra, botella. cuenta, propina. reserva, mesa para dos. sin gluten, sin lactosa." size="small" showText={false} color="#79A890" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Expresiones del cliente</Text>
            <AudioButton text="Expresiones del cliente" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>
            • ¿Nos trae la carta, por favor? = هل تجلب لنا القائمة من فضلك؟{"\n"}
            • Quisiera/Para mí…, de primero/segundo… = أود/بالنسبة لي…، كطبق أول/ثان…{"\n"}
            • ¿Tiene menú del día? = هل لديكم قائمة اليوم؟{"\n"}
            • ¿Puede recomendarnos algo? = هل يمكنك أن توصي لنا بشيء؟{"\n"}
            • La cuenta, por favor. = الحساب، من فضلك.
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Nos trae la carta, por favor? Quisiera, para mí, de primero, de segundo. ¿Tiene menú del día? ¿Puede recomendarnos algo? La cuenta, por favor." size="small" showText={false} color="#79A890" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Expresiones del camarero</Text>
            <AudioButton text="Expresiones del camarero" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>
            • ¿Han reservado/¿Tienen reserva? = هل لديكم حجز؟{"\n"}
            • ¿Qué van a tomar? = ماذا ستتناولون؟{"\n"}
            • ¿Algo para beber? = أي شيء للشرب؟{"\n"}
            • ¿Cómo lo quieren, poco hecho, al punto o muy hecho? = كيف تريدونه، نصف ناضج أم متوسط أم ناضج جداً؟{"\n"}
            • ¿Desean postre o café? = هل ترغبون في حلوى أو قهوة؟
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Han reservado? ¿Tienen reserva? ¿Qué van a tomar? ¿Algo para beber? ¿Cómo lo quieren, poco hecho, al punto o muy hecho? ¿Desean postre o café?" size="small" showText={false} color="#79A890" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Alergias e intolerancias</Text>
            <AudioButton text="Alergias e intolerancias" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>
            • Soy alérgico/a a los frutos secos. = لدي حساسية من المكسرات.{"\n"}
            • ¿Este plato contiene gluten/lácteos/huevo? = هل يحتوي هذا الطبق على غلوتين/ألبان/بيض؟{"\n"}
            • ¿Tienen opciones vegetarianas/veganas/sin gluten? = هل لديكم خيارات نباتية/نباتية صارمة/خالٍ من الغلوتين؟
          </Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Soy alérgico a los frutos secos. ¿Este plato contiene gluten, lácteos o huevo? ¿Tienen opciones vegetarianas, veganas o sin gluten?" size="small" showText={false} color="#79A890" />
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
            <AudioButton text="Ejemplo de interacción" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>— ¿Dónde vives? — Vivo en un piso en el centro. — ¿Cuántas habitaciones tiene? — Tiene tres habitaciones, cocina y baño. — ¿Te gusta tu casa? — Sí, es muy cómoda.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="¿Dónde vives? Vivo en un piso en el centro. ¿Cuántas habitaciones tiene? Tiene tres habitaciones, cocina y baño. ¿Te gusta tu casa? Sí, es muy cómoda." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>— أين تسكن؟ — أسكن في شقة في المركز. — كم غرفة فيها؟ — فيها ثلاث غرف ومطبخ وحمام. — هل تحب منزلك؟ — نعم، مريح جدا.</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>Actividad</Text>
            <AudioButton text="Actividad" size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionText}>Describe tu casa ideal: qué tipo de vivienda te gustaría, cuántas habitaciones, dónde estaría ubicada.</Text>
          <View style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AudioButton text="Describe tu casa ideal: qué tipo de vivienda te gustaría, cuántas habitaciones, dónde estaría ubicada." size="small" showText={false} color="#79A890" />
          </View>
          <Text style={styles.sectionTextAr}>صف منزلك المثالي: ما نوع السكن الذي تريده، كم غرفة، أين سيكون موقعه.</Text>
        </View>

        {/* Ejemplos escritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <View style={{ gap: 10 }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Nos trae la carta, por favor?</Text>
                <AudioButton text="¿Nos trae la carta, por favor?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>هل تجلب لنا القائمة من فضلك؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>Quisiera una ensalada de primero y paella de segundo.</Text>
                <AudioButton text="Quisiera una ensalada de primero y paella de segundo." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>أود سلطة كطبق أول وباييّا كطبق رئيسي.</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>¿Tienen opciones sin gluten?</Text>
                <AudioButton text="¿Tienen opciones sin gluten?" size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>هل لديكم خيارات خالية من الغلوتين؟</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionText}>La cuenta, por favor.</Text>
                <AudioButton text="La cuenta, por favor." size="small" showText={false} color="#79A890" />
              </View>
              <Text style={styles.sectionTextAr}>الحساب، من فضلك.</Text>
            </View>
          </View>
        </View>
        {/* EJERCICIOS INTERACTIVOS */}
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#79A890', marginTop: 24}}>Ejercicios / تمارين</Text>
        {ejercicios.length === 0 && <Text style={{color:'#d32f2f'}}>No hay ejercicios para esta unidad.</Text>}
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
