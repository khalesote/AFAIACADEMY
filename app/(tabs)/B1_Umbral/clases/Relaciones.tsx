import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Relaciones() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[19] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 19);
    }
    Alert.alert(
      'Unidad finalizada',
      'Vuelve al menú de B1 para continuar con la siguiente unidad.\nارجع إلى قائمة مستوى B1 لمتابعة الوحدة التالية.',
      [
        { text: 'Seguir estudiando', style: 'cancel' },
        { text: 'Ir al menú B1 / الذهاب إلى قائمة B1', onPress: () => router.replace('/B1_Umbral') }
      ]
    );
  };

  const ejercicios = [
    // Ejercicio 1: Vocabulario - Relacionar tipos de relaciones con sus características
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de relación con su característica principal:',
      pares: [
        { izquierda: '👨‍👩‍👧‍👦 Familia', derecha: 'Relación por parentesco o adopción' },
        { izquierda: '👫 Amistad', derecha: 'Relación afectiva basada en confianza' },
        { izquierda: '💕 Pareja', derecha: 'Relación romántica y emocional' },
        { izquierda: '👥 Compañeros', derecha: 'Relación en el trabajo o estudios' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "amistad"?',
      opciones: ['Una relación de trabajo', 'Una relación afectiva entre personas', 'Una relación familiar', 'Una relación comercial'],
      respuesta_correcta: 'Una relación afectiva entre personas'
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "relación de pareja"?',
      opciones: ['Una amistad casual', 'Una relación romántica entre dos personas', 'Una relación de trabajo', 'Una relación familiar'],
      respuesta_correcta: 'Una relación romántica entre dos personas'
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "confianza" en una relación?',
      opciones: ['Desconfiar del otro', 'Creer en la honestidad y lealtad del otro', 'Ignorar al otro', 'Controlar al otro'],
      respuesta_correcta: 'Creer en la honestidad y lealtad del otro'
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "comunicación" en las relaciones?',
      opciones: ['Ignorar al otro', 'Intercambiar información y sentimientos', 'Solo hablar de trabajo', 'Evitar conversaciones'],
      respuesta_correcta: 'Intercambiar información y sentimientos'
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "empatía"?',
      opciones: ['Ignorar los sentimientos del otro', 'Ponerse en el lugar del otro y entender sus sentimientos', 'Solo pensar en uno mismo', 'Criticar al otro'],
      respuesta_correcta: 'Ponerse en el lugar del otro y entender sus sentimientos'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "respeto" en una relación?',
      opciones: ['Ignorar al otro', 'Valorar las diferencias y opiniones del otro', 'Controlar al otro', 'Despreciar al otro'],
      respuesta_correcta: 'Valorar las diferencias y opiniones del otro'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es el "compromiso" en una relación?',
      opciones: ['Abandonar', 'Mantener promesas y acuerdos', 'Ignorar', 'Evitar responsabilidades'],
      respuesta_correcta: 'Mantener promesas y acuerdos'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "honestidad"?',
      opciones: ['Mentir', 'Ser sincero y transparente', 'Ocultar la verdad', 'Engañar'],
      respuesta_correcta: 'Ser sincero y transparente'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "lealtad"?',
      opciones: ['Traicionar', 'Ser fiel y mantener la confianza', 'Abandonar', 'Desertar'],
      respuesta_correcta: 'Ser fiel y mantener la confianza'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "apoyo" en una relación?',
      opciones: ['Abandonar', 'Estar presente en momentos difíciles', 'Ignorar', 'Desertar'],
      respuesta_correcta: 'Estar presente en momentos difíciles'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "comprensión"?',
      opciones: ['Ignorar', 'Entender y aceptar al otro', 'Criticar', 'Juzgar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "cariño"?',
      opciones: ['Odio', 'Afecto y amor hacia alguien', 'Desprecio', 'Indiferencia'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es el "compañerismo"?',
      opciones: ['Soledad', 'Espíritu de colaboración y amistad', 'Individualismo', 'Egoísmo'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "escuchar activamente"?',
      opciones: ['Ignorar', 'Prestar atención completa y mostrar interés', 'Interrumpir', 'Distraerse'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Valores en las relaciones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada valor con su importancia en las relaciones:',
      pares: [
        { izquierda: '🤝 Respeto', derecha: 'Valorar las diferencias del otro' },
        { izquierda: '❤️ Empatía', derecha: 'Ponerse en el lugar del otro' },
        { izquierda: '🤞 Compromiso', derecha: 'Mantener las promesas y acuerdos' },
        { izquierda: '💎 Honestidad', derecha: 'Ser sincero y transparente' }
      ]
    },

    // Ejercicio 17: Vocabulario - Habilidades de comunicación
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada habilidad de comunicación con su beneficio:',
      pares: [
        { izquierda: '👂 Escuchar', derecha: 'Entender mejor al otro' },
        { izquierda: '💬 Expresar', derecha: 'Comunicar sentimientos claramente' },
        { izquierda: '❓ Preguntar', derecha: 'Mostrar interés y curiosidad' },
        { izquierda: '🤗 Validar', derecha: 'Reconocer los sentimientos del otro' }
      ]
    },

    // Ejercicio 18: Vocabulario - Etapas de una relación
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada etapa de una relación con su característica:',
      pares: [
        { izquierda: '🌱 Inicio', derecha: 'Conocimiento y descubrimiento' },
        { izquierda: '🌿 Desarrollo', derecha: 'Construcción de confianza' },
        { izquierda: '🌳 Madurez', derecha: 'Relación estable y profunda' },
        { izquierda: '🔄 Crecimiento', derecha: 'Evolución y adaptación' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "validar" en una relación?',
      opciones: ['Ignorar', 'Reconocer y aceptar los sentimientos del otro', 'Criticar', 'Despreciar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es importante para mantener relaciones saludables?',
      opciones: ['Solo pensar en uno mismo', 'Comunicación, respeto y compromiso mutuo', 'Solo criticar', 'Solo ignorar'],
      respuestaCorrecta: 1
    }
  ];

  return (
    <ScrollView style={{ backgroundColor: '#f5f7fa' }} contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B1_Umbral')}
        accessibilityLabel="Volver al menú B1: Umbral"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de relaciones humanas"
      />
      
      <Text style={styles.title}>💕 Relaciones humanas</Text>
      <Text style={styles.titleAr}>💕 العلاقات الإنسانية</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de las relaciones humanas</Text>
        <Text style={styles.sectionText}>
          Las relaciones humanas son fundamentales para nuestro bienestar emocional, 
          psicológico y social. A través de ellas desarrollamos nuestra identidad, 
          aprendemos a comunicarnos y construimos una red de apoyo que nos sostiene 
          en los momentos difíciles.
          {"\n\n"}
          Las relaciones saludables nos proporcionan felicidad, seguridad emocional 
          y un sentido de pertenencia que es esencial para el desarrollo humano 
          y la calidad de vida.
        </Text>
        <Text style={styles.sectionTextAr}>
          العلاقات الإنسانية أساسية لرفاهيتنا العاطفية
          والنفسية والاجتماعية. من خلالها نطور هويتنا،
          نتعلم التواصل ونبني شبكة دعم تدعمنا
          في الأوقات الصعبة.
          {"\n\n"}
          العلاقات الصحية تمنحنا السعادة والأمان العاطفي
          وشعور الانتماء الذي هو أساسي للتطور البشري
          وجودة الحياة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Tipos de relaciones humanas</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>👨‍👩‍👧‍👦 Relaciones familiares:</Text>{"\n"}
          • <Text style={styles.benefit}>Padres e hijos:</Text> Relación de cuidado y aprendizaje{"\n"}
          • <Text style={styles.benefit}>Hermanos:</Text> Compañeros de vida y crecimiento{"\n"}
          • <Text style={styles.benefit}>Abuelos y nietos:</Text> Conexión intergeneracional{"\n"}
          • <Text style={styles.benefit}>Tíos y primos:</Text> Familia extendida y apoyo
          {"\n\n"}
          <Text style={styles.subtitle}>👫 Relaciones de amistad:</Text>{"\n"}
          • <Text style={styles.benefit}>Amigos de la infancia:</Text> Compañeros de crecimiento{"\n"}
          • <Text style={styles.benefit}>Amigos del trabajo:</Text> Apoyo profesional y personal{"\n"}
          • <Text style={styles.benefit}>Amigos de la universidad:</Text> Compañeros de aprendizaje{"\n"}
          • <Text style={styles.benefit}>Amigos del barrio:</Text> Comunidad local y cercanía
          {"\n\n"}
          <Text style={styles.subtitle}>💕 Relaciones de pareja:</Text>{"\n"}
          • <Text style={styles.benefit}>Noviazgo:</Text> Etapa de conocimiento romántico{"\n"}
          • <Text style={styles.benefit}>Matrimonio:</Text> Compromiso legal y emocional{"\n"}
          • <Text style={styles.benefit}>Relación estable:</Text> Compañerismo duradero{"\n"}
          • <Text style={styles.benefit}>Relación a distancia:</Text> Amor sin fronteras
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>👨‍👩‍👧‍👦 العلاقات العائلية:</Text>{"\n"}
          • <Text style={styles.benefit}>الآباء والأبناء:</Text> علاقة رعاية وتعلم{"\n"}
          • <Text style={styles.benefit}>الإخوة:</Text> رفقاء الحياة والنمو{"\n"}
          • <Text style={styles.benefit}>الأجداد والأحفاد:</Text> ارتباط بين الأجيال{"\n"}
          • <Text style={styles.benefit}>الأعمام والأبناء:</Text> عائلة ممتدة ودعم
          {"\n\n"}
          <Text style={styles.subtitle}>👫 علاقات الصداقة:</Text>{"\n"}
          • <Text style={styles.benefit}>أصدقاء الطفولة:</Text> رفقاء النمو{"\n"}
          • <Text style={styles.benefit}>أصدقاء العمل:</Text> دعم مهني وشخصي{"\n"}
          • <Text style={styles.benefit}>أصدقاء الجامعة:</Text> رفقاء التعلم{"\n"}
          • <Text style={styles.benefit}>أصدقاء الحي:</Text> مجتمع محلي وقرب
          {"\n\n"}
          <Text style={styles.subtitle}>💕 علاقات الشريك:</Text>{"\n"}
          • <Text style={styles.benefit}>الخطوبة:</Text> مرحلة المعرفة الرومانسية{"\n"}
          • <Text style={styles.benefit}>الزواج:</Text> التزام قانوني وعاطفي{"\n"}
          • <Text style={styles.benefit}>علاقة مستقرة:</Text> رفقة دائمة{"\n"}
          • <Text style={styles.benefit}>علاقة عن بعد:</Text> حب بلا حدود
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤝 Valores fundamentales en las relaciones</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💎 Valores básicos:</Text>{"\n"}
          • <Text style={styles.benefit}>Respeto:</Text> Valorar las diferencias y opiniones del otro{"\n"}
          • <Text style={styles.benefit}>Confianza:</Text> Creer en la honestidad y lealtad{"\n"}
          • <Text style={styles.benefit}>Honestidad:</Text> Ser sincero y transparente{"\n"}
          • <Text style={styles.benefit}>Lealtad:</Text> Ser fiel y mantener la confianza
          {"\n\n"}
          <Text style={styles.subtitle}>❤️ Valores emocionales:</Text>{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Entender los sentimientos del otro{"\n"}
          • <Text style={styles.benefit}>Comprensión:</Text> Aceptar y entender al otro{"\n"}
          • <Text style={styles.benefit}>Apoyo:</Text> Estar presente en momentos difíciles{"\n"}
          • <Text style={styles.benefit}>Cariño:</Text> Mostrar afecto y amor
          {"\n\n"}
          <Text style={styles.subtitle}>🤞 Valores de compromiso:</Text>{"\n"}
          • <Text style={styles.benefit}>Compromiso:</Text> Mantener promesas y acuerdos{"\n"}
          • <Text style={styles.benefit}>Responsabilidad:</Text> Asumir consecuencias de acciones{"\n"}
          • <Text style={styles.benefit}>Compañerismo:</Text> Espíritu de colaboración{"\n"}
          • <Text style={styles.benefit}>Solidaridad:</Text> Apoyo mutuo en dificultades
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💎 قيم أساسية:</Text>{"\n"}
          • <Text style={styles.benefit}>احترام:</Text> تقدير الاختلافات وآراء الآخر{"\n"}
          • <Text style={styles.benefit}>ثقة:</Text> الإيمان بالصدق والولاء{"\n"}
          • <Text style={styles.benefit}>صدق:</Text> أن تكون صادقاً وشفافاً{"\n"}
          • <Text style={styles.benefit}>ولاء:</Text> أن تكون وفياً والحفاظ على الثقة
          {"\n\n"}
          <Text style={styles.subtitle}>❤️ قيم عاطفية:</Text>{"\n"}
          • <Text style={styles.benefit}>تعاطف:</Text> فهم مشاعر الآخر{"\n"}
          • <Text style={styles.benefit}>فهم:</Text> قبول وفهم الآخر{"\n"}
          • <Text style={styles.benefit}>دعم:</Text> التواجد في الأوقات الصعبة{"\n"}
          • <Text style={styles.benefit}>حب:</Text> إظهار العاطفة والحب
          {"\n\n"}
          <Text style={styles.subtitle}>🤞 قيم الالتزام:</Text>{"\n"}
          • <Text style={styles.benefit}>التزام:</Text> الحفاظ على الوعود والاتفاقات{"\n"}
          • <Text style={styles.benefit}>مسؤولية:</Text> تحمل عواقب الأفعال{"\n"}
          • <Text style={styles.benefit}>رفقة:</Text> روح التعاون{"\n"}
          • <Text style={styles.benefit}>تضامن:</Text> دعم متبادل في الصعوبات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Habilidades de comunicación efectiva</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>👂 Escuchar activamente:</Text>{"\n"}
          • <Text style={styles.tip}>Prestar atención completa:</Text> Mirar a los ojos, no distraerse{"\n"}
          • <Text style={styles.tip}>No interrumpir:</Text> Dejar que termine de hablar{"\n"}
          • <Text style={styles.tip}>Hacer preguntas:</Text> Mostrar interés genuino{"\n"}
          • <Text style={styles.tip}>Resumir y confirmar:</Text> Verificar lo entendido
          {"\n\n"}
          <Text style={styles.subtitle}>💭 Expresar sentimientos:</Text>{"\n"}
          • <Text style={styles.tip}>Usar "yo" en lugar de "tú":</Text> "Me siento..." no "Tú me haces..."{"\n"}
          • <Text style={styles.tip}>Ser específico:</Text> Explicar la situación concreta{"\n"}
          • <Text style={styles.tip}>Ser honesto:</Text> Decir la verdad con respeto{"\n"}
          • <Text style={styles.tip}>Elegir el momento:</Text> Buscar el tiempo adecuado
          {"\n\n"}
          <Text style={styles.subtitle}>🤗 Validación emocional:</Text>{"\n"}
          • <Text style={styles.tip}>Reconocer sentimientos:</Text> "Entiendo que te sientas..."{"\n"}
          • <Text style={styles.tip}>No minimizar:</Text> Evitar "No es para tanto"{"\n"}
          • <Text style={styles.tip}>Mostrar empatía:</Text> Conectar con las emociones{"\n"}
          • <Text style={styles.tip}>Ofrecer apoyo:</Text> "Estoy aquí para ti"
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>👂 الاستماع النشط:</Text>{"\n"}
          • <Text style={styles.tip}>إيلاء اهتمام كامل:</Text> النظر في العينين، عدم التشتت{"\n"}
          • <Text style={styles.tip}>عدم المقاطعة:</Text> السماح له بإنهاء الكلام{"\n"}
          • <Text style={styles.tip}>طرح أسئلة:</Text> إظهار اهتمام حقيقي{"\n"}
          • <Text style={styles.tip}>تلخيص وتأكيد:</Text> التحقق من ما تم فهمه
          {"\n\n"}
          <Text style={styles.subtitle}>💭 التعبير عن المشاعر:</Text>{"\n"}
          • <Text style={styles.tip}>استخدام "أنا" بدلاً من "أنت":</Text> "أشعر..." وليس "أنت تجعلني..."{"\n"}
          • <Text style={styles.tip}>أن تكون محدداً:</Text> شرح الموقف المحدد{"\n"}
          • <Text style={styles.tip}>أن تكون صادقاً:</Text> قول الحقيقة باحترام{"\n"}
          • <Text style={styles.tip}>اختيار الوقت:</Text> البحث عن الوقت المناسب
          {"\n\n"}
          <Text style={styles.subtitle}>🤗 التحقق العاطفي:</Text>{"\n"}
          • <Text style={styles.tip}>التعرف على المشاعر:</Text> "أفهم أنك تشعر..."{"\n"}
          • <Text style={styles.tip}>عدم التقليل:</Text> تجنب "ليس بهذا القدر"{"\n"}
          • <Text style={styles.tip}>إظهار التعاطف:</Text> التواصل مع المشاعر{"\n"}
          • <Text style={styles.tip}>تقديم الدعم:</Text> "أنا هنا من أجلك"
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 Etapas del desarrollo de relaciones</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌱 Etapa de inicio:</Text>{"\n"}
          • <Text style={styles.benefit}>Conocimiento:</Text> Descubrir intereses comunes{"\n"}
          • <Text style={styles.benefit}>Primeras impresiones:</Text> Evaluar compatibilidad{"\n"}
          • <Text style={styles.benefit}>Conversaciones iniciales:</Text> Intercambiar información básica{"\n"}
          • <Text style={styles.benefit}>Exploración:</Text> Descubrir gustos y valores
          {"\n\n"}
          <Text style={styles.subtitle}>🌿 Etapa de desarrollo:</Text>{"\n"}
          • <Text style={styles.benefit}>Construcción de confianza:</Text> Crear vínculos emocionales{"\n"}
          • <Text style={styles.benefit}>Compartir experiencias:</Text> Crear recuerdos juntos{"\n"}
          • <Text style={styles.benefit}>Establecer rutinas:</Text> Crear hábitos compartidos{"\n"}
          • <Text style={styles.benefit}>Resolución de conflictos:</Text> Aprender a manejar diferencias
          {"\n\n"}
          <Text style={styles.subtitle}>🌳 Etapa de madurez:</Text>{"\n"}
          • <Text style={styles.benefit}>Relación estable:</Text> Vínculo profundo y duradero{"\n"}
          • <Text style={styles.benefit}>Apoyo mutuo:</Text> Cuidado recíproco{"\n"}
          • <Text style={styles.benefit}>Crecimiento conjunto:</Text> Evolución como equipo{"\n"}
          • <Text style={styles.benefit}>Compromiso a largo plazo:</Text> Planificación de futuro
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌱 مرحلة البداية:</Text>{"\n"}
          • <Text style={styles.benefit}>معرفة:</Text> اكتشاف اهتمامات مشتركة{"\n"}
          • <Text style={styles.benefit}>انطباعات أولية:</Text> تقييم التوافق{"\n"}
          • <Text style={styles.benefit}>محادثات أولية:</Text> تبادل معلومات أساسية{"\n"}
          • <Text style={styles.benefit}>استكشاف:</Text> اكتشاف الأذواق والقيم
          {"\n\n"}
          <Text style={styles.subtitle}>🌿 مرحلة التطور:</Text>{"\n"}
          • <Text style={styles.benefit}>بناء الثقة:</Text> خلق روابط عاطفية{"\n"}
          • <Text style={styles.benefit}>مشاركة تجارب:</Text> خلق ذكريات معاً{"\n"}
          • <Text style={styles.benefit}>إقامة روتين:</Text> خلق عادات مشتركة{"\n"}
          • <Text style={styles.benefit}>حل النزاعات:</Text> تعلم إدارة الاختلافات
          {"\n\n"}
          <Text style={styles.subtitle}>🌳 مرحلة النضج:</Text>{"\n"}
          • <Text style={styles.benefit}>علاقة مستقرة:</Text> رابطة عميقة ودائمة{"\n"}
          • <Text style={styles.benefit}>دعم متبادل:</Text> رعاية متبادلة{"\n"}
          • <Text style={styles.benefit}>نمو مشترك:</Text> تطور كفريق{"\n"}
          • <Text style={styles.benefit}>التزام طويل المدى:</Text> تخطيط المستقبل
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de relaciones</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>👥 Conceptos básicos:</Text>{"\n"}
          relación = علاقة{"\n"}
          amistad = صداقة{"\n"}
          pareja = شريك/شريكة{"\n"}
          familia = عائلة{"\n"}
          compañero = رفيق{"\n"}
          novio/novia = خطيب/خطيبة{"\n"}
          esposo/esposa = زوج/زوجة{"\n"}
          hermano/hermana = أخ/أخت
          {"\n\n"}
          <Text style={styles.subtitle}>💎 Valores fundamentales:</Text>{"\n"}
          confianza = ثقة{"\n"}
          respeto = احترام{"\n"}
          honestidad = صدق{"\n"}
          lealtad = ولاء{"\n"}
          empatía = تعاطف{"\n"}
          comprensión = فهم{"\n"}
          compromiso = التزام{"\n"}
          apoyo = دعم
          {"\n\n"}
          <Text style={styles.subtitle}>💬 Comunicación:</Text>{"\n"}
          comunicación = تواصل{"\n"}
          escuchar = استماع{"\n"}
          hablar = كلام{"\n"}
          expresar = التعبير{"\n"}
          entender = فهم{"\n"}
          explicar = شرح{"\n"}
          preguntar = سؤال{"\n"}
          responder = إجابة
          {"\n\n"}
          <Text style={styles.subtitle}>❤️ Emociones:</Text>{"\n"}
          cariño = حب{"\n"}
          amor = حب{"\n"}
          afecto = عاطفة{"\n"}
          ternura = رقة{"\n"}
          pasión = شغف{"\n"}
          felicidad = سعادة{"\n"}
          alegría = فرح{"\n"}
          gratitud = امتنان
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>👥 المفاهيم الأساسية:</Text>{"\n"}
          علاقة = relación{"\n"}
          صداقة = amistad{"\n"}
          شريك/شريكة = pareja{"\n"}
          عائلة = familia{"\n"}
          رفيق = compañero{"\n"}
          خطيب/خطيبة = novio/novia{"\n"}
          زوج/زوجة = esposo/esposa{"\n"}
          أخ/أخت = hermano/hermana
          {"\n\n"}
          <Text style={styles.subtitle}>💎 القيم الأساسية:</Text>{"\n"}
          ثقة = confianza{"\n"}
          احترام = respeto{"\n"}
          صدق = honestidad{"\n"}
          ولاء = lealtad{"\n"}
          تعاطف = empatía{"\n"}
          فهم = comprensión{"\n"}
          التزام = compromiso{"\n"}
          دعم = apoyo
          {"\n\n"}
          <Text style={styles.subtitle}>💬 التواصل:</Text>{"\n"}
          تواصل = comunicación{"\n"}
          استماع = escuchar{"\n"}
          كلام = hablar{"\n"}
          التعبير = expresar{"\n"}
          فهم = entender{"\n"}
          شرح = explicar{"\n"}
          سؤال = preguntar{"\n"}
          إجابة = responder
          {"\n\n"}
          <Text style={styles.subtitle}>❤️ المشاعر:</Text>{"\n"}
          حب = cariño{"\n"}
          حب = amor{"\n"}
          عاطفة = afecto{"\n"}
          رقة = ternura{"\n"}
          شغف = pasión{"\n"}
          سعادة = felicidad{"\n"}
          فرح = alegría{"\n"}
          امتنان = gratitud
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles sobre relaciones</Text>
        <Text style={styles.sectionText}>
          • "¿Qué hace que una amistad sea especial?" = ما الذي يجعل الصداقة خاصة؟{"\n"}
          • "¿Cómo mantienes una buena comunicación?" = كيف تحافظ على تواصل جيد؟{"\n"}
          • "¿Qué valores son importantes en una relación?" = ما القيم المهمة في العلاقة؟{"\n"}
          • "¿Cómo puedes ser más empático?" = كيف يمكنك أن تكون أكثر تعاطفاً؟{"\n"}
          • "¿Qué significa la confianza para ti?" = ما معنى الثقة بالنسبة لك؟{"\n"}
          • "¿Cómo resuelves conflictos en tus relaciones?" = كيف تحل النزاعات في علاقاتك؟{"\n"}
          • "¿Qué aprendes de tus relaciones?" = ماذا تتعلم من علاقاتك؟{"\n"}
          • "¿Cómo puedes mejorar tus relaciones?" = كيف يمكنك تحسين علاقاتك؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "ما الذي يجعل الصداقة خاصة؟" = ¿Qué hace que una amistad sea especial?{"\n"}
          • "كيف تحافظ على تواصل جيد؟" = ¿Cómo mantienes una buena comunicación?{"\n"}
          • "ما القيم المهمة في العلاقة؟" = ¿Qué valores son importantes en una relación?{"\n"}
          • "كيف يمكنك أن تكون أكثر تعاطفاً؟" = ¿Cómo puedes ser más empático?{"\n"}
          • "ما معنى الثقة بالنسبة لك؟" = ¿Qué significa la confianza para ti?{"\n"}
          • "كيف تحل النزاعات في علاقاتك؟" = ¿Cómo resuelves conflictos en tus relaciones?{"\n"}
          • "ماذا تتعلم من علاقاتك؟" = ¿Qué aprendes de tus relaciones?{"\n"}
          • "كيف يمكنك تحسين علاقاتك؟" = ¿Cómo puedes mejorar tus relaciones?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Relaciones en la cultura española</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>👨‍👩‍👧‍👦 Familia española:</Text>{"\n"}
          • <Text style={styles.benefit}>Familia extensa:</Text> Importancia de tíos, primos y abuelos{"\n"}
          • <Text style={styles.benefit}>Comidas familiares:</Text> Reuniones dominicales tradicionales{"\n"}
          • <Text style={styles.benefit}>Respeto a mayores:</Text> Valoración de la experiencia{"\n"}
          • <Text style={styles.benefit}>Apoyo intergeneracional:</Text> Cuidado mutuo entre generaciones
          {"\n\n"}
          <Text style={styles.subtitle}>👫 Amistades españolas:</Text>{"\n"}
          • <Text style={styles.benefit}>Amigos de toda la vida:</Text> Relaciones duraderas{"\n"}
          • <Text style={styles.benefit}>Tertulias:</Text> Conversaciones en cafés y bares{"\n"}
          • <Text style={styles.benefit}>Fiestas y celebraciones:</Text> Momentos de unión{"\n"}
          • <Text style={styles.benefit}>Apoyo en dificultades:</Text> Solidaridad en momentos difíciles
          {"\n\n"}
          <Text style={styles.subtitle}>💕 Relaciones de pareja:</Text>{"\n"}
          • <Text style={styles.benefit}>Romanticismo:</Text> Expresión abierta de sentimientos{"\n"}
          • <Text style={styles.benefit}>Compromiso:</Text> Valoración del matrimonio y la familia{"\n"}
          • <Text style={styles.benefit}>Pasión:</Text> Intensidad emocional en las relaciones{"\n"}
          • <Text style={styles.benefit}>Tradición y modernidad:</Text> Equilibrio entre valores
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>👨‍👩‍👧‍👦 العائلة الإسبانية:</Text>{"\n"}
          • <Text style={styles.benefit}>عائلة ممتدة:</Text> أهمية الأعمام والأبناء والأجداد{"\n"}
          • <Text style={styles.benefit}>وجبات عائلية:</Text> لقاءات الأحد التقليدية{"\n"}
          • <Text style={styles.benefit}>احترام الكبار:</Text> تقدير الخبرة{"\n"}
          • <Text style={styles.benefit}>دعم بين الأجيال:</Text> رعاية متبادلة بين الأجيال
          {"\n\n"}
          <Text style={styles.subtitle}>👫 الصداقات الإسبانية:</Text>{"\n"}
          • <Text style={styles.benefit}>أصدقاء مدى الحياة:</Text> علاقات دائمة{"\n"}
          • <Text style={styles.benefit}>محادثات:</Text> محادثات في المقاهي والحانات{"\n"}
          • <Text style={styles.benefit}>حفلات واحتفالات:</Text> لحظات اتحاد{"\n"}
          • <Text style={styles.benefit}>دعم في الصعوبات:</Text> تضامن في الأوقات الصعبة
          {"\n\n"}
          <Text style={styles.subtitle}>💕 علاقات الشريك:</Text>{"\n"}
          • <Text style={styles.benefit}>رومانسية:</Text> التعبير المفتوح عن المشاعر{"\n"}
          • <Text style={styles.benefit}>التزام:</Text> تقدير الزواج والعائلة{"\n"}
          • <Text style={styles.benefit}>شغف:</Text> كثافة عاطفية في العلاقات{"\n"}
          • <Text style={styles.benefit}>تقليد وحداثة:</Text> توازن بين القيم
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته مع هذه التمارين التفاعلية.</Text>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
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
    lineHeight: 24,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    writingDirection: 'rtl',
    marginBottom: 2,
    fontFamily: 'System',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  tip: {
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  dialogueTitle: {
    fontWeight: 'bold',
    color: '#79A890',
    fontSize: 18,
  },
  speaker: {
    fontWeight: 'bold',
    color: '#79A890',
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
