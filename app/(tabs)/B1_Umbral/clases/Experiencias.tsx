import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Experiencias() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[16] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 16);
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
    // Ejercicio 1: Vocabulario - Relacionar experiencias con emociones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada experiencia con la emoción que suele generar:',
      pares: [
        { izquierda: '🎉 Cumpleaños', derecha: 'Alegría y celebración' },
        { izquierda: '😰 Perderse', derecha: 'Miedo y confusión' },
        { izquierda: '🏆 Ganar un premio', derecha: 'Orgullo y satisfacción' },
        { izquierda: '😢 Despedida', derecha: 'Tristeza y nostalgia' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "recuerdo"?',
      opciones: ['Un objeto', 'Una memoria o vivencia del pasado', 'Un lugar', 'Una persona'],
      respuestaCorrecta: 1
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es una "aventura"?',
      opciones: ['Solo un viaje', 'Una experiencia emocionante y arriesgada', 'Un trabajo', 'Una comida'],
      respuestaCorrecta: 1
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "contar" una historia?',
      opciones: ['Solo escribir', 'Narrar o relatar algo que pasó', 'Solo leer', 'Solo escuchar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "emoción"?',
      opciones: ['Solo tristeza', 'Sentimiento intenso (alegría, miedo, etc.)', 'Solo felicidad', 'Solo enojo'],
      respuestaCorrecta: 1
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "anécdota"?',
      opciones: ['Un libro', 'Una historia corta y divertida', 'Una película', 'Una canción'],
      respuestaCorrecta: 1
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "reírse"?',
      opciones: ['Llorar', 'Expresar alegría con risa', 'Gritar', 'Cantar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "aprender" de una experiencia?',
      opciones: ['Solo olvidar', 'Adquirir conocimiento o sabiduría', 'Solo recordar', 'Solo contar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "sorprendente"?',
      opciones: ['Normal', 'Que causa asombro o admiración', 'Aburrido', 'Triste'],
      respuestaCorrecta: 1
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "inolvidable"?',
      opciones: ['Fácil de olvidar', 'Imposible de olvidar', 'Normal', 'Aburrido'],
      respuestaCorrecta: 1
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "divertido"?',
      opciones: ['Triste', 'Que causa risa y entretenimiento', 'Serio', 'Aburrido'],
      respuestaCorrecta: 1
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "emocionante"?',
      opciones: ['Aburrido', 'Que produce emoción y entusiasmo', 'Triste', 'Normal'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "nostalgia"?',
      opciones: ['Solo felicidad', 'Sentimiento de añoranza por el pasado', 'Solo tristeza', 'Solo miedo'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "superar" una dificultad?',
      opciones: ['Evitar', 'Vencer o resolver un problema', 'Ignorar', 'Olvidar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "compartir" una experiencia?',
      opciones: ['Solo guardar', 'Contar a otros lo que viviste', 'Solo olvidar', 'Solo escribir'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Tipos de experiencias
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de experiencia con su descripción:',
      pares: [
        { izquierda: '✈️ Viaje', derecha: 'Desplazamiento a otro lugar' },
        { izquierda: '🎓 Graduación', derecha: 'Finalización de estudios' },
        { izquierda: '💼 Primer trabajo', derecha: 'Inicio de la vida laboral' },
        { izquierda: '🏠 Mudanza', derecha: 'Cambio de residencia' }
      ]
    },

    // Ejercicio 17: Vocabulario - Emociones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada emoción con su expresión:',
      pares: [
        { izquierda: '😊 Alegría', derecha: 'Sentimiento de felicidad' },
        { izquierda: '😰 Miedo', derecha: 'Sentimiento de temor' },
        { izquierda: '😢 Tristeza', derecha: 'Sentimiento de pena' },
        { izquierda: '😡 Enojo', derecha: 'Sentimiento de ira' }
      ]
    },

    // Ejercicio 18: Vocabulario - Momentos de la vida
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada momento de la vida con su característica:',
      pares: [
        { izquierda: '👶 Infancia', derecha: 'Primeros años de vida' },
        { izquierda: '👨‍🎓 Juventud', derecha: 'Período de formación' },
        { izquierda: '👨‍💼 Adultez', derecha: 'Vida independiente' },
        { izquierda: '👴 Vejez', derecha: 'Última etapa de la vida' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "valioso"?',
      opciones: ['Sin importancia', 'Que tiene mucho valor o importancia', 'Barato', 'Común'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "enriquecer" la vida?',
      opciones: ['Hacer más pobre', 'Hacer más rica y completa', 'Hacer más triste', 'Hacer más aburrida'],
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
        source={{ uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de experiencias y anécdotas personales"
      />
      
      <Text style={styles.title}>🌟 Experiencias y anécdotas personales</Text>
      <Text style={styles.titleAr}>🌟 تجارب وحكايات شخصية</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💭 El valor de las experiencias personales</Text>
        <Text style={styles.sectionText}>
          Las experiencias personales son momentos únicos que forman parte de nuestra historia 
          y nos ayudan a crecer como personas. Cada vivencia, ya sea alegre, difícil o sorprendente, 
          contribuye a nuestra formación personal y nos enseña lecciones valiosas.
          {"\n\n"}
          Compartir estas experiencias nos permite conectar con otros, aprender de sus historias 
          y crear vínculos emocionales que enriquecen nuestras relaciones humanas.
        </Text>
        <Text style={styles.sectionTextAr}>
          التجارب الشخصية هي لحظات فريدة تشكل جزءاً من تاريخنا
          وتساعدنا على النمو كأشخاص. كل تجربة، سواء كانت سعيدة أو صعبة أو مفاجئة،
          تساهم في تكويننا الشخصي وتعلمنا دروساً قيمة.
          {"\n\n"}
          مشاركة هذه التجارب تسمح لنا بالتواصل مع الآخرين، والتعلم من قصصهم
          وخلق روابط عاطفية تثري علاقاتنا الإنسانية.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Tipos de experiencias personales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎉 Experiencias de celebración:</Text>{"\n"}
          • <Text style={styles.benefit}>Cumpleaños:</Text> Celebraciones personales{"\n"}
          • <Text style={styles.benefit}>Graduaciones:</Text> Logros académicos{"\n"}
          • <Text style={styles.benefit}>Bodas:</Text> Momentos familiares especiales{"\n"}
          • <Text style={styles.benefit}>Logros:</Text> Metas alcanzadas
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ Experiencias de viaje:</Text>{"\n"}
          • <Text style={styles.benefit}>Viajes turísticos:</Text> Conocer nuevos lugares{"\n"}
          • <Text style={styles.benefit}>Mudanzas:</Text> Cambios de residencia{"\n"}
          • <Text style={styles.benefit}>Emigración:</Text> Cambios de país{"\n"}
          • <Text style={styles.benefit}>Aventuras:</Text> Experiencias emocionantes
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Experiencias laborales:</Text>{"\n"}
          • <Text style={styles.benefit}>Primer trabajo:</Text> Inicio de la vida laboral{"\n"}
          • <Text style={styles.benefit}>Cambios de trabajo:</Text> Nuevas oportunidades{"\n"}
          • <Text style={styles.benefit}>Logros profesionales:</Text> Éxitos en el trabajo{"\n"}
          • <Text style={styles.benefit}>Desafíos laborales:</Text> Superación de dificultades
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎉 تجارب الاحتفال:</Text>{"\n"}
          • <Text style={styles.benefit}>أعياد الميلاد:</Text> احتفالات شخصية{"\n"}
          • <Text style={styles.benefit}>التخرج:</Text> إنجازات أكاديمية{"\n"}
          • <Text style={styles.benefit}>الزواج:</Text> لحظات عائلية خاصة{"\n"}
          • <Text style={styles.benefit}>الإنجازات:</Text> أهداف محققة
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ تجارب السفر:</Text>{"\n"}
          • <Text style={styles.benefit}>رحلات سياحية:</Text> التعرف على أماكن جديدة{"\n"}
          • <Text style={styles.benefit}>الانتقالات:</Text> تغييرات السكن{"\n"}
          • <Text style={styles.benefit}>الهجرة:</Text> تغييرات البلد{"\n"}
          • <Text style={styles.benefit}>المغامرات:</Text> تجارب مثيرة
          {"\n\n"}
          <Text style={styles.subtitle}>💼 التجارب المهنية:</Text>{"\n"}
          • <Text style={styles.benefit}>العمل الأول:</Text> بداية الحياة المهنية{"\n"}
          • <Text style={styles.benefit}>تغييرات العمل:</Text> فرص جديدة{"\n"}
          • <Text style={styles.benefit}>الإنجازات المهنية:</Text> نجاحات في العمل{"\n"}
          • <Text style={styles.benefit}>التحديات المهنية:</Text> تجاوز الصعوبات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>😊 Experiencias emocionales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>😊 Experiencias positivas:</Text>{"\n"}
          • <Text style={styles.benefit}>Alegría:</Text> Momentos de felicidad intensa{"\n"}
          • <Text style={styles.benefit}>Satisfacción:</Text> Logros y cumplimiento{"\n"}
          • <Text style={styles.benefit}>Gratitud:</Text> Apreciación por lo recibido{"\n"}
          • <Text style={styles.benefit}>Amor:</Text> Conexiones emocionales profundas
          {"\n\n"}
          <Text style={styles.subtitle}>😢 Experiencias difíciles:</Text>{"\n"}
          • <Text style={styles.benefit}>Pérdidas:</Text> Momentos de tristeza{"\n"}
          • <Text style={styles.benefit}>Fracasos:</Text> Aprendizaje de errores{"\n"}
          • <Text style={styles.benefit}>Miedos:</Text> Superación de temores{"\n"}
          • <Text style={styles.benefit}>Cambios:</Text> Adaptación a nuevas situaciones
          {"\n\n"}
          <Text style={styles.subtitle}>🤔 Experiencias de aprendizaje:</Text>{"\n"}
          • <Text style={styles.benefit}>Descubrimientos:</Text> Nuevos conocimientos{"\n"}
          • <Text style={styles.benefit}>Crecimiento:</Text> Desarrollo personal{"\n"}
          • <Text style={styles.benefit}>Reflexión:</Text> Pensamiento profundo{"\n"}
          • <Text style={styles.benefit}>Transformación:</Text> Cambios personales
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>😊 التجارب الإيجابية:</Text>{"\n"}
          • <Text style={styles.benefit}>الفرح:</Text> لحظات السعادة الشديدة{"\n"}
          • <Text style={styles.benefit}>الرضا:</Text> الإنجازات والتحقيق{"\n"}
          • <Text style={styles.benefit}>الامتنان:</Text> تقدير ما تم تلقيه{"\n"}
          • <Text style={styles.benefit}>الحب:</Text> روابط عاطفية عميقة
          {"\n\n"}
          <Text style={styles.subtitle}>😢 التجارب الصعبة:</Text>{"\n"}
          • <Text style={styles.benefit}>الخسائر:</Text> لحظات الحزن{"\n"}
          • <Text style={styles.benefit}>الفشل:</Text> التعلم من الأخطاء{"\n"}
          • <Text style={styles.benefit}>المخاوف:</Text> تجاوز المخاوف{"\n"}
          • <Text style={styles.benefit}>التغييرات:</Text> التكيف مع المواقف الجديدة
          {"\n\n"}
          <Text style={styles.subtitle}>🤔 تجارب التعلم:</Text>{"\n"}
          • <Text style={styles.benefit}>الاكتشافات:</Text> معارف جديدة{"\n"}
          • <Text style={styles.benefit}>النمو:</Text> التطور الشخصي{"\n"}
          • <Text style={styles.benefit}>التأمل:</Text> التفكير العميق{"\n"}
          • <Text style={styles.benefit}>التحول:</Text> التغييرات الشخصية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Vocabulario esencial de experiencias</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📝 Conceptos básicos:</Text>{"\n"}
          experiencia = تجربة{"\n"}
          recuerdo = ذكرى{"\n"}
          aventura = مغامرة{"\n"}
          anécdota = حكاية{"\n"}
          historia = قصة{"\n"}
          vivencia = معيشة{"\n"}
          momento = لحظة{"\n"}
          situación = موقف
          {"\n\n"}
          <Text style={styles.subtitle}>😊 Emociones positivas:</Text>{"\n"}
          alegría = فرح{"\n"}
          felicidad = سعادة{"\n"}
          emoción = إثارة{"\n"}
          entusiasmo = حماس{"\n"}
          satisfacción = رضا{"\n"}
          orgullo = فخر{"\n"}
          gratitud = امتنان{"\n"}
          amor = حب
          {"\n\n"}
          <Text style={styles.subtitle}>😢 Emociones difíciles:</Text>{"\n"}
          tristeza = حزن{"\n"}
          miedo = خوف{"\n"}
          enojo = غضب{"\n"}
          frustración = إحباط{"\n"}
          nostalgia = حنين{"\n"}
          soledad = وحدة{"\n"}
          ansiedad = قلق{"\n"}
          decepción = خيبة أمل
          {"\n\n"}
          <Text style={styles.subtitle}>💬 Acciones:</Text>{"\n"}
          contar = يروي{"\n"}
          compartir = يشارك{"\n"}
          recordar = يتذكر{"\n"}
          aprender = يتعلم{"\n"}
          superar = يتجاوز{"\n"}
          disfrutar = يستمتع{"\n"}
          reírse = يضحك{"\n"}
          llorar = يبكي
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📝 المفاهيم الأساسية:</Text>{"\n"}
          تجربة = experiencia{"\n"}
          ذكرى = recuerdo{"\n"}
          مغامرة = aventura{"\n"}
          حكاية = anécdota{"\n"}
          قصة = historia{"\n"}
          معيشة = vivencia{"\n"}
          لحظة = momento{"\n"}
          موقف = situación
          {"\n\n"}
          <Text style={styles.subtitle}>😊 المشاعر الإيجابية:</Text>{"\n"}
          فرح = alegría{"\n"}
          سعادة = felicidad{"\n"}
          إثارة = emoción{"\n"}
          حماس = entusiasmo{"\n"}
          رضا = satisfacción{"\n"}
          فخر = orgullo{"\n"}
          امتنان = gratitud{"\n"}
          حب = amor
          {"\n\n"}
          <Text style={styles.subtitle}>😢 المشاعر الصعبة:</Text>{"\n"}
          حزن = tristeza{"\n"}
          خوف = miedo{"\n"}
          غضب = enojo{"\n"}
          إحباط = frustración{"\n"}
          حنين = nostalgia{"\n"}
          وحدة = soledad{"\n"}
          قلق = ansiedad{"\n"}
          خيبة أمل = decepción
          {"\n\n"}
          <Text style={styles.subtitle}>💬 الأفعال:</Text>{"\n"}
          يروي = contar{"\n"}
          يشارك = compartir{"\n"}
          يتذكر = recordar{"\n"}
          يتعلم = aprender{"\n"}
          يتجاوز = superar{"\n"}
          يستمتع = disfrutar{"\n"}
          يضحك = reírse{"\n"}
          يبكي = llorar
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles para contar experiencias</Text>
        <Text style={styles.sectionText}>
          • "¿Cuál es tu mejor recuerdo?" = ما هي أفضل ذكرى لديك؟{"\n"}
          • "¿Has tenido alguna experiencia divertida?" = هل مررت بتجربة طريفة؟{"\n"}
          • "¿Qué te pasó una vez?" = ماذا حدث لك مرة؟{"\n"}
          • "¿Cuál es tu experiencia más emocionante?" = ما هي تجربتك الأكثر إثارة؟{"\n"}
          • "¿Recuerdas cuando...?" = هل تتذكر عندما...؟{"\n"}
          • "¿Te ha pasado algo similar?" = هل حدث لك شيء مشابه؟{"\n"}
          • "¿Qué aprendiste de esa experiencia?" = ماذا تعلمت من تلك التجربة؟{"\n"}
          • "¿Cómo te sentiste en ese momento?" = كيف شعرت في تلك اللحظة؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "ما هي أفضل ذكرى لديك؟" = ¿Cuál es tu mejor recuerdo?{"\n"}
          • "هل مررت بتجربة طريفة؟" = ¿Has tenido alguna experiencia divertida?{"\n"}
          • "ماذا حدث لك مرة؟" = ¿Qué te pasó una vez?{"\n"}
          • "ما هي تجربتك الأكثر إثارة؟" = ¿Cuál es tu experiencia más emocionante?{"\n"}
          • "هل تتذكر عندما...؟" = ¿Recuerdas cuando...?{"\n"}
          • "هل حدث لك شيء مشابه؟" = ¿Te ha pasado algo similar?{"\n"}
          • "ماذا تعلمت من تلك التجربة؟" = ¿Qué aprendiste de esa experiencia?{"\n"}
          • "كيف شعرت في تلك اللحظة؟" = ¿Cómo te sentiste en ese momento?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Cómo contar experiencias efectivamente</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📅 Estructura de una historia:</Text>{"\n"}
          • <Text style={styles.tip}>Introducción:</Text> Contexto y situación inicial{"\n"}
          • <Text style={styles.tip}>Desarrollo:</Text> Lo que sucedió paso a paso{"\n"}
          • <Text style={styles.tip}>Clímax:</Text> El momento más importante{"\n"}
          • <Text style={styles.tip}>Conclusión:</Text> Resultado y aprendizaje
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Elementos narrativos:</Text>{"\n"}
          • <Text style={styles.tip}>Personajes:</Text> Quién participó en la historia{"\n"}
          • <Text style={styles.tip}>Lugar:</Text> Dónde ocurrió la experiencia{"\n"}
          • <Text style={styles.tip}>Tiempo:</Text> Cuándo sucedió{"\n"}
          • <Text style={styles.tip}>Emociones:</Text> Cómo te sentiste
          {"\n\n"}
          <Text style={styles.subtitle}>💡 Consejos para narrar:</Text>{"\n"}
          • <Text style={styles.tip}>Ser específico:</Text> Dar detalles importantes{"\n"}
          • <Text style={styles.tip}>Usar gestos:</Text> Acompañar con expresiones{"\n"}
          • <Text style={styles.tip}>Mantener interés:</Text> Hacer la historia atractiva{"\n"}
          • <Text style={styles.tip}>Ser auténtico:</Text> Contar la verdad
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📅 هيكل القصة:</Text>{"\n"}
          • <Text style={styles.tip}>المقدمة:</Text> السياق والموقف الأولي{"\n"}
          • <Text style={styles.tip}>التطور:</Text> ما حدث خطوة بخطوة{"\n"}
          • <Text style={styles.tip}>الذروة:</Text> اللحظة الأهم{"\n"}
          • <Text style={styles.tip}>الخاتمة:</Text> النتيجة والتعلم
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 العناصر السردية:</Text>{"\n"}
          • <Text style={styles.tip}>الشخصيات:</Text> من شارك في القصة{"\n"}
          • <Text style={styles.tip}>المكان:</Text> أين حدثت التجربة{"\n"}
          • <Text style={styles.tip}>الوقت:</Text> متى حدثت{"\n"}
          • <Text style={styles.tip}>المشاعر:</Text> كيف شعرت
          {"\n\n"}
          <Text style={styles.subtitle}>💡 نصائح للسرد:</Text>{"\n"}
          • <Text style={styles.tip}>كن محدداً:</Text> أعط تفاصيل مهمة{"\n"}
          • <Text style={styles.tip}>استخدم الإيماءات:</Text> رافق بالتعبيرات{"\n"}
          • <Text style={styles.tip}>حافظ على الاهتمام:</Text> اجعل القصة جذابة{"\n"}
          • <Text style={styles.tip}>كن أصيلاً:</Text> ارو الحقيقة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Ejemplos de experiencias memorables</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎓 Experiencias académicas:</Text>{"\n"}
          • <Text style={styles.benefit}>Primer día de universidad:</Text> Nervios y expectativas{"\n"}
          • <Text style={styles.benefit}>Presentación importante:</Text> Superación del miedo{"\n"}
          • <Text style={styles.benefit}>Graduación:</Text> Orgullo y logro{"\n"}
          • <Text style={styles.benefit}>Aprobación de examen difícil:</Text> Alivio y satisfacción
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ Experiencias de viaje:</Text>{"\n"}
          • <Text style={styles.benefit}>Primer viaje solo:</Text> Independencia y aventura{"\n"}
          • <Text style={styles.benefit}>Perderse en una ciudad:</Text> Desafío y descubrimiento{"\n"}
          • <Text style={styles.benefit}>Conocer gente nueva:</Text> Conexiones humanas{"\n"}
          • <Text style={styles.benefit}>Probar comida local:</Text> Experiencias culturales
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Experiencias laborales:</Text>{"\n"}
          • <Text style={styles.benefit}>Primera entrevista de trabajo:</Text> Nervios y preparación{"\n"}
          • <Text style={styles.benefit}>Primer día en el trabajo:</Text> Nuevos retos{"\n"}
          • <Text style={styles.benefit}>Proyecto exitoso:</Text> Trabajo en equipo{"\n"}
          • <Text style={styles.benefit}>Promoción laboral:</Text> Reconocimiento del esfuerzo
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎓 التجارب الأكاديمية:</Text>{"\n"}
          • <Text style={styles.benefit}>اليوم الأول في الجامعة:</Text> أعصاب وتوقعات{"\n"}
          • <Text style={styles.benefit}>عرض مهم:</Text> تجاوز الخوف{"\n"}
          • <Text style={styles.benefit}>التخرج:</Text> فخر وإنجاز{"\n"}
          • <Text style={styles.benefit}>اجتياز امتحان صعب:</Text> راحة ورضا
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ تجارب السفر:</Text>{"\n"}
          • <Text style={styles.benefit}>الرحلة الأولى وحدي:</Text> استقلالية ومغامرة{"\n"}
          • <Text style={styles.benefit}>الضياع في مدينة:</Text> تحد واكتشاف{"\n"}
          • <Text style={styles.benefit}>التعرف على أناس جدد:</Text> روابط إنسانية{"\n"}
          • <Text style={styles.benefit}>تذوق الطعام المحلي:</Text> تجارب ثقافية
          {"\n\n"}
          <Text style={styles.subtitle}>💼 التجارب المهنية:</Text>{"\n"}
          • <Text style={styles.benefit}>المقابلة الأولى للعمل:</Text> أعصاب وتحضير{"\n"}
          • <Text style={styles.benefit}>اليوم الأول في العمل:</Text> تحديات جديدة{"\n"}
          • <Text style={styles.benefit}>مشروع ناجح:</Text> العمل الجماعي{"\n"}
          • <Text style={styles.benefit}>ترقية مهنية:</Text> اعتراف بالجهد
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 El aprendizaje de las experiencias</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎯 Beneficios de compartir experiencias:</Text>{"\n"}
          • <Text style={styles.benefit}>Conexión humana:</Text> Crear vínculos emocionales{"\n"}
          • <Text style={styles.benefit}>Aprendizaje mutuo:</Text> Aprender de otros{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Entender las emociones ajenas{"\n"}
          • <Text style={styles.benefit}>Crecimiento personal:</Text> Desarrollar perspectiva
          {"\n\n"}
          <Text style={styles.subtitle}>🧠 Procesamiento de experiencias:</Text>{"\n"}
          • <Text style={styles.benefit}>Reflexión:</Text> Pensar sobre lo vivido{"\n"}
          • <Text style={styles.benefit}>Aprendizaje:</Text> Extraer lecciones{"\n"}
          • <Text style={styles.benefit}>Crecimiento:</Text> Desarrollar como persona{"\n"}
          • <Text style={styles.benefit}>Gratitud:</Text> Apreciar las experiencias
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎯 فوائد مشاركة التجارب:</Text>{"\n"}
          • <Text style={styles.benefit}>الرابط الإنساني:</Text> خلق روابط عاطفية{"\n"}
          • <Text style={styles.benefit}>التعلم المتبادل:</Text> التعلم من الآخرين{"\n"}
          • <Text style={styles.benefit}>التعاطف:</Text> فهم مشاعر الآخرين{"\n"}
          • <Text style={styles.benefit}>النمو الشخصي:</Text> تطوير المنظور
          {"\n\n"}
          <Text style={styles.subtitle}>🧠 معالجة التجارب:</Text>{"\n"}
          • <Text style={styles.benefit}>التأمل:</Text> التفكير في ما عاشه{"\n"}
          • <Text style={styles.benefit}>التعلم:</Text> استخراج الدروس{"\n"}
          • <Text style={styles.benefit}>النمو:</Text> التطور كشخص{"\n"}
          • <Text style={styles.benefit}>الامتنان:</Text> تقدير التجارب
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
    color: '#ff7043',
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
