import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

export default function ViajesLargos() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[15] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 15);
    }
    Alert.alert(
      'Unidad finalizada',
      'Vuelve al menú de B2 para continuar con la siguiente unidad.\nارجع إلى قائمة مستوى B2 لمتابعة الوحدة التالية.',
      [
        { text: 'Seguir estudiando', style: 'cancel' },
        { text: 'Ir al menú B2 / الذهاب إلى قائمة B2', onPress: () => router.replace('/B2_Avanzado') }
      ]
    );
  };

  const ejercicios = [
    // Ejercicios de opción múltiple (17)
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "nostalgia" en el contexto de los viajes largos?',
      opciones: [
        'Sentimiento de añoranza por el lugar de origen',
        'Excitación por conocer nuevos lugares',
        'Miedo a viajar en avión',
        'Deseo de regresar a casa inmediatamente'
      ],
      respuestaCorrecta: 0,
      explicacion: 'La nostalgia es el sentimiento de añoranza y melancolía por el lugar de origen, especialmente común en viajes largos.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es el "choque cultural"?',
      opciones: [
        'Un accidente durante el viaje',
        'Conflicto entre diferentes sistemas culturales',
        'Problemas con el transporte',
        'Dificultades con el idioma local'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El choque cultural es el conflicto que surge al enfrentarse a diferentes sistemas culturales, costumbres y valores.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una estrategia efectiva para adaptarse a una nueva cultura?',
      opciones: [
        'Aislarse completamente',
        'Mantener una mente abierta y aprender sobre las costumbres locales',
        'Solo relacionarse con personas de tu país',
        'Ignorar las diferencias culturales'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Mantener una mente abierta y aprender sobre las costumbres locales es fundamental para una adaptación exitosa.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "intercambio cultural"?',
      opciones: [
        'Cambiar dinero en el banco',
        'Compartir experiencias entre diferentes culturas',
        'Intercambiar regalos',
        'Cambiar de hotel'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El intercambio cultural es el proceso de compartir experiencias, conocimientos y tradiciones entre diferentes culturas.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un desafío común en viajes largos?',
      opciones: [
        'Solo problemas de transporte',
        'Adaptación cultural, barreras lingüísticas y extrañar el hogar',
        'Solo problemas económicos',
        'Solo diferencias climáticas'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Los viajes largos presentan múltiples desafíos: adaptación cultural, barreras lingüísticas y extrañar el hogar.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "adaptación cultural"?',
      opciones: [
        'Cambiar completamente tu personalidad',
        'Proceso de ajuste a nuevas condiciones culturales',
        'Olvidar tu cultura de origen',
        'Solo aprender el idioma local'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La adaptación cultural es el proceso de ajuste a nuevas condiciones culturales manteniendo tu identidad.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una ventaja de los viajes largos?',
      opciones: [
        'Solo ahorrar dinero',
        'Desarrollo personal, nuevas perspectivas y crecimiento cultural',
        'Solo conocer lugares turísticos',
        'Solo mejorar el idioma'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Los viajes largos ofrecen desarrollo personal, nuevas perspectivas y crecimiento cultural significativo.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "integración cultural"?',
      opciones: [
        'Olvidar tu cultura de origen',
        'Proceso de incorporarse activamente a una nueva sociedad',
        'Solo vivir en otro país',
        'Solo aprender el idioma'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La integración cultural es el proceso de incorporarse activamente a una nueva sociedad manteniendo elementos de tu cultura.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una estrategia para manejar la nostalgia?',
      opciones: [
        'Ignorar completamente los sentimientos',
        'Mantener contacto con familiares y crear nuevas rutinas',
        'Regresar inmediatamente a casa',
        'Aislarse de la nueva cultura'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Mantener contacto con familiares y crear nuevas rutinas ayuda a manejar la nostalgia de manera saludable.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "empatía cultural"?',
      opciones: [
        'Sentir lástima por otras culturas',
        'Capacidad de entender y respetar diferentes perspectivas culturales',
        'Solo aprender sobre otras culturas',
        'Visitar museos culturales'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La empatía cultural es la capacidad de entender y respetar diferentes perspectivas y valores culturales.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un beneficio del intercambio cultural?',
      opciones: [
        'Solo mejorar el idioma',
        'Desarrollo de habilidades interculturales y mayor tolerancia',
        'Solo conocer lugares nuevos',
        'Solo hacer amigos'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El intercambio cultural desarrolla habilidades interculturales y fomenta mayor tolerancia y comprensión.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "resiliencia cultural"?',
      opciones: [
        'Resistencia física durante el viaje',
        'Capacidad de adaptarse y recuperarse de desafíos culturales',
        'Solo aguantar las dificultades',
        'Solo sobrevivir en otro país'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La resiliencia cultural es la capacidad de adaptarse y recuperarse de los desafíos que presenta una nueva cultura.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una fase común en la adaptación cultural?',
      opciones: [
        'Solo la fase de luna de miel',
        'Luna de miel, choque cultural, adaptación y aceptación',
        'Solo el choque cultural',
        'Solo la aceptación final'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La adaptación cultural típicamente incluye: luna de miel, choque cultural, adaptación y aceptación.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "competencia intercultural"?',
      opciones: [
        'Solo hablar varios idiomas',
        'Habilidad para interactuar efectivamente con personas de diferentes culturas',
        'Solo conocer muchas culturas',
        'Solo viajar frecuentemente'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La competencia intercultural es la habilidad para interactuar efectivamente con personas de diferentes culturas.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una estrategia para superar barreras lingüísticas?',
      opciones: [
        'Solo usar traductores automáticos',
        'Aprender frases básicas, usar gestos y mantener una actitud positiva',
        'Solo hablar más alto',
        'Solo evitar la comunicación'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Aprender frases básicas, usar gestos y mantener una actitud positiva son estrategias efectivas.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "cosmopolitismo"?',
      opciones: [
        'Solo vivir en ciudades grandes',
        'Mentalidad abierta y aprecio por la diversidad cultural global',
        'Solo viajar por el mundo',
        'Solo conocer muchas personas'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El cosmopolitismo es una mentalidad abierta y aprecio por la diversidad cultural global.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un desafío específico de los viajes largos en España?',
      opciones: [
        'Solo el clima',
        'Adaptarse a los horarios españoles, la siesta y las costumbres sociales',
        'Solo el idioma',
        'Solo la comida'
      ],
      respuestaCorrecta: 1,
      explicacion: 'En España, los viajeros deben adaptarse a horarios específicos, la siesta y costumbres sociales únicas.'
    },
    // Ejercicios de vocabulario (3)
    {
      tipo: 'vocabulario',
      titulo: 'مراحل التكيف الثقافي',
      pares: [
        { izquierda: 'Luna de miel', derecha: 'قمر العسل' },
        { izquierda: 'Choque cultural', derecha: 'صدمة ثقافية' },
        { izquierda: 'Adaptación', derecha: 'تكيف' },
        { izquierda: 'Aceptación', derecha: 'تقبل' },
        { izquierda: 'Integración', derecha: 'اندماج' }
      ],
      opciones: [
        'Luna de miel', 'Choque cultural', 'Adaptación', 'Aceptación', 'Integración',
        'قمر العسل', 'صدمة ثقافية', 'تكيف', 'تقبل', 'اندماج'
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'تحديات السفر الطويل',
      pares: [
        { izquierda: 'Barreras lingüísticas', derecha: 'حواجز لغوية' },
        { izquierda: 'Nostalgia', derecha: 'حنين للوطن' },
        { izquierda: 'Choque cultural', derecha: 'صدمة ثقافية' },
        { izquierda: 'Soledad', derecha: 'وحدة' },
        { izquierda: 'Diferencias culturales', derecha: 'اختلافات ثقافية' }
      ],
      opciones: [
        'Barreras lingüísticas', 'Nostalgia', 'Choque cultural', 'Soledad', 'Diferencias culturales',
        'حواجز لغوية', 'حنين للوطن', 'صدمة ثقافية', 'وحدة', 'اختلافات ثقافية'
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'فوائد السفر الطويل',
      pares: [
        { izquierda: 'Desarrollo personal', derecha: 'تطوير شخصي' },
        { izquierda: 'Nuevas perspectivas', derecha: 'وجهات نظر جديدة' },
        { izquierda: 'Crecimiento cultural', derecha: 'نمو ثقافي' },
        { izquierda: 'Habilidades interculturales', derecha: 'مهارات بين الثقافات' },
        { izquierda: 'Independencia', derecha: 'استقلالية' }
      ],
      opciones: [
        'Desarrollo personal', 'Nuevas perspectivas', 'Crecimiento cultural', 'Habilidades interculturales', 'Independencia',
        'تطوير شخصي', 'وجهات نظر جديدة', 'نمو ثقافي', 'مهارات بين الثقافات', 'استقلالية'
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B2_Avanzado')}
        accessibilityLabel="Volver al menú B2: Avanzado"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de viajes largos y experiencias interculturales"
      />

      <Text style={styles.title}>✈️ Viajes Largos y Experiencias Interculturales</Text>
      <Text style={styles.titleAr}>الرحلات الطويلة والتجارب بين الثقافات</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌟 Importancia de los Viajes Largos</Text>
        <Text style={styles.sectionText}>
          Los viajes largos representan una oportunidad única para el crecimiento personal y el desarrollo de habilidades interculturales. Permiten sumergirse en nuevas culturas, desafiar perspectivas limitadas y desarrollar una comprensión más profunda del mundo. Estas experiencias transforman no solo nuestra visión del mundo, sino también nuestra identidad personal.
        </Text>
        <Text style={styles.sectionTextAr}>
          تمثل الرحلات الطويلة فرصة فريدة للنمو الشخصي وتطوير المهارات بين الثقافات. تسمح بالانغماس في ثقافات جديدة، وتحدي وجهات النظر المحدودة وتطوير فهم أعمق للعالم. هذه التجارب تحول ليس فقط رؤيتنا للعالم، بل أيضاً هويتنا الشخصية.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📚 Vocabulario Esencial</Text>
        
        <Text style={styles.sectionSubtitle}>🌍 Experiencias Culturales</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Nostalgia</Text> = حنين - Sentimiento de añoranza por el lugar de origen{'\n'}
          • <Text style={styles.benefit}>Choque cultural</Text> = صدمة ثقافية - Conflicto entre diferentes sistemas culturales{'\n'}
          • <Text style={styles.benefit}>Adaptación</Text> = تكيف - Proceso de ajuste a nuevas condiciones{'\n'}
          • <Text style={styles.benefit}>Integración</Text> = اندماج - Incorporación activa a una nueva sociedad{'\n'}
          • <Text style={styles.benefit}>Intercambio cultural</Text> = تبادل ثقافي - Compartir experiencias entre culturas
        </Text>

        <Text style={styles.sectionSubtitle}>🧳 Aspectos del Viaje</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Cosmopolitismo</Text> = عالمية - Mentalidad abierta a la diversidad global{'\n'}
          • <Text style={styles.benefit}>Resiliencia cultural</Text> = المرونة الثقافية - Capacidad de adaptarse a desafíos culturales{'\n'}
          • <Text style={styles.benefit}>Competencia intercultural</Text> = الكفاءة بين الثقافات - Habilidad para interactuar entre culturas{'\n'}
          • <Text style={styles.benefit}>Empatía cultural</Text> = التعاطف الثقافي - Entender diferentes perspectivas culturales{'\n'}
          • <Text style={styles.benefit}>Perspectiva global</Text> = منظور عالمي - Visión amplia del mundo
        </Text>

        <Text style={styles.sectionSubtitle}>💬 Comunicación Intercultural</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Barreras lingüísticas</Text> = حواجز لغوية - Obstáculos en la comunicación{'\n'}
          • <Text style={styles.benefit}>Gestos universales</Text> = إيماءات عالمية - Comunicación no verbal{'\n'}
          • <Text style={styles.benefit}>Contexto cultural</Text> = السياق الثقافي - Entorno cultural de la comunicación{'\n'}
          • <Text style={styles.benefit}>Sensibilidad cultural</Text> = الحساسية الثقافية - Conciencia de diferencias culturales{'\n'}
          • <Text style={styles.benefit}>Diálogo intercultural</Text> = حوار بين الثقافات - Conversación entre culturas
        </Text>

        <Text style={styles.sectionSubtitle}>🏠 Aspectos Emocionales</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Extrañar</Text> = اشتياق - Sentir añoranza por el hogar{'\n'}
          • <Text style={styles.benefit}>Soledad</Text> = وحدة - Sentimiento de aislamiento{'\n'}
          • <Text style={styles.benefit}>Independencia</Text> = استقلالية - Capacidad de valerse por sí mismo{'\n'}
          • <Text style={styles.benefit}>Confianza</Text> = ثقة - Seguridad en las propias capacidades{'\n'}
          • <Text style={styles.benefit}>Apertura mental</Text> = انفتاح ذهني - Disposición a nuevas experiencias
        </Text>

        <Text style={styles.sectionSubtitle}>🎯 Habilidades Desarrolladas</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Flexibilidad</Text> = مرونة - Capacidad de adaptarse a cambios{'\n'}
          • <Text style={styles.benefit}>Tolerancia</Text> = تسامح - Aceptación de diferencias{'\n'}
          • <Text style={styles.benefit}>Curiosidad</Text> = فضول - Deseo de aprender y explorar{'\n'}
          • <Text style={styles.benefit}>Paciencia</Text> = صبر - Capacidad de esperar y perseverar{'\n'}
          • <Text style={styles.benefit}>Autonomía</Text> = استقلالية - Capacidad de tomar decisiones propias
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎯 Fases de la Adaptación Cultural</Text>
        
        <Text style={styles.sectionSubtitle}>🌙 Fase de Luna de Miel</Text>
        <Text style={styles.sectionText}>
          Esta fase inicial se caracteriza por la fascinación y entusiasmo por todo lo nuevo. El viajero experimenta una sensación de aventura y descubrimiento, idealizando la nueva cultura y sintiendo que todo es emocionante y diferente. Es un período de alta energía y optimismo.
        </Text>

        <Text style={styles.sectionSubtitle}>⚡ Fase de Choque Cultural</Text>
        <Text style={styles.sectionText}>
          En esta fase, la realidad comienza a imponerse. Las diferencias culturales se vuelven frustrantes, aparecen barreras lingüísticas, y el viajero puede sentirse confundido, irritado o deprimido. Es normal experimentar nostalgia y desear regresar al entorno familiar.
        </Text>

        <Text style={styles.sectionSubtitle}>🔄 Fase de Adaptación</Text>
        <Text style={styles.sectionText}>
          Gradualmente, el viajero comienza a ajustarse a las nuevas condiciones. Desarrolla estrategias para manejar los desafíos, aprende más sobre la cultura local, y comienza a sentirse más cómodo en el nuevo entorno. La confianza y las habilidades interculturales mejoran.
        </Text>

        <Text style={styles.sectionSubtitle}>✅ Fase de Aceptación</Text>
        <Text style={styles.sectionText}>
          En esta fase, el viajero acepta las diferencias culturales sin juzgarlas. Desarrolla una comprensión más profunda de la nueva cultura y puede apreciar tanto las similitudes como las diferencias. Se siente más integrado y cómodo en el nuevo entorno.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🛡️ Estrategias para Viajes Largos</Text>
        
        <Text style={styles.sectionSubtitle}>📋 Preparación Antes del Viaje</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Investigación cultural</Text>: Aprender sobre costumbres, valores y tradiciones{'\n'}
          • <Text style={styles.benefit}>Preparación lingüística</Text>: Aprender frases básicas y expresiones comunes{'\n'}
          • <Text style={styles.benefit}>Expectativas realistas</Text>: Entender que habrá desafíos y momentos difíciles{'\n'}
          • <Text style={styles.benefit}>Red de apoyo</Text>: Identificar recursos y contactos en el destino{'\n'}
          • <Text style={styles.benefit}>Planificación financiera</Text>: Asegurar estabilidad económica durante el viaje
        </Text>

        <Text style={styles.sectionSubtitle}>🎯 Durante el Viaje</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Mente abierta</Text>: Mantener disposición para aprender y experimentar{'\n'}
          • <Text style={styles.benefit}>Paciencia</Text>: Entender que la adaptación toma tiempo{'\n'}
          • <Text style={styles.benefit}>Comunicación efectiva</Text>: Usar gestos, traductores y creatividad{'\n'}
          • <Text style={styles.benefit}>Rutinas saludables</Text>: Mantener hábitos que proporcionen estabilidad{'\n'}
          • <Text style={styles.benefit}>Conexión con la comunidad</Text>: Participar en actividades locales
        </Text>

        <Text style={styles.sectionSubtitle}>💪 Manejo de Desafíos</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Gestión de la nostalgia</Text>: Mantener contacto con seres queridos{'\n'}
          • <Text style={styles.benefit}>Superación de barreras</Text>: Buscar recursos y ayuda cuando sea necesario{'\n'}
          • <Text style={styles.benefit}>Desarrollo de resiliencia</Text>: Aprender de las dificultades{'\n'}
          • <Text style={styles.benefit}>Cuidado emocional</Text>: Reconocer y manejar las emociones{'\n'}
          • <Text style={styles.benefit}>Celebración de logros</Text>: Reconocer el progreso y los éxitos
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🇪🇸 Experiencias Interculturales en España</Text>
        
        <Text style={styles.sectionSubtitle}>🕐 Adaptación a los Horarios Españoles</Text>
        <Text style={styles.sectionText}>
          España tiene horarios únicos que pueden ser desconcertantes para viajeros internacionales. La siesta, las comidas tardías (almuerzo a las 14:00, cena a las 21:00) y la vida nocturna activa requieren adaptación. Los comercios cierran durante la siesta y reabren por la tarde.
        </Text>

        <Text style={styles.sectionSubtitle}>🍽️ Costumbres Sociales y Gastronómicas</Text>
        <Text style={styles.sectionText}>
          La comida es un aspecto central de la cultura española. Las comidas son eventos sociales que pueden durar horas. Es común compartir tapas, y la sobremesa (conversación después de comer) es una tradición importante. El vino y la cerveza son parte integral de las comidas sociales.
        </Text>

        <Text style={styles.sectionSubtitle}>🗣️ Comunicación y Expresividad</Text>
        <Text style={styles.sectionText}>
          Los españoles son conocidos por su expresividad y comunicación directa. Los gestos son importantes, y el contacto físico (besos en la mejilla, abrazos) es común en saludos. La comunicación puede parecer ruidosa y apasionada para quienes no están acostumbrados.
        </Text>

        <Text style={styles.sectionSubtitle}>🎉 Fiestas y Tradiciones</Text>
        <Text style={styles.sectionText}>
          España tiene un calendario rico en fiestas y tradiciones. Desde las Fallas de Valencia hasta la Feria de Abril en Sevilla, cada región tiene sus propias celebraciones. Participar en estas tradiciones es una excelente manera de sumergirse en la cultura local.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💬 Diálogo de Ejemplo: Adaptación Cultural</Text>
        <Text style={styles.dialogo}>
          <Text style={styles.benefit}>Ahmed:</Text> "Llevo tres meses en España y al principio todo me parecía fascinante, pero ahora me siento un poco abrumado por las diferencias culturales."{'\n\n'}
          <Text style={styles.benefit}>María:</Text> "Es completamente normal. ¿Qué aspectos te están resultando más difíciles de adaptar?"{'\n\n'}
          <Text style={styles.benefit}>Ahmed:</Text> "Los horarios de las comidas y la forma tan directa de comunicarse. En mi cultura somos más reservados."{'\n\n'}
          <Text style={styles.benefit}>María:</Text> "Entiendo. ¿Has intentado participar en alguna actividad local? Eso puede ayudarte a sentirte más integrado."{'\n\n'}
          <Text style={styles.benefit}>Ahmed:</Text> "Tienes razón. Creo que necesito ser más paciente conmigo mismo y recordar que la adaptación toma tiempo."
        </Text>
        <Text style={styles.dialogoAr}>
          <Text style={styles.benefit}>أحمد:</Text> "أقضي ثلاثة أشهر في إسبانيا وفي البداية بدا كل شيء مثيراً، لكن الآن أشعر بالإرهاق قليلاً من الاختلافات الثقافية."{'\n\n'}
          <Text style={styles.benefit}>ماريا:</Text> "هذا طبيعي تماماً. ما هي الجوانب التي تجد صعوبة أكبر في التكيف معها؟"{'\n\n'}
          <Text style={styles.benefit}>أحمد:</Text> "أوقات الوجبات وطريقة التواصل المباشرة. في ثقافتي نحن أكثر تحفظاً."{'\n\n'}
          <Text style={styles.benefit}>ماريا:</Text> "أفهم. هل حاولت المشاركة في أي نشاط محلي؟ يمكن أن يساعدك ذلك على الشعور بمزيد من الاندماج."{'\n\n'}
          <Text style={styles.benefit}>أحمد:</Text> "أنت محقة. أعتقد أنني بحاجة إلى مزيد من الصبر مع نفسي وتذكر أن التكيف يحتاج وقتاً."
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎯 Enfoque en el Crecimiento Personal</Text>
        <Text style={styles.sectionText}>
          Los viajes largos son una oportunidad única para el desarrollo personal. A través de la exposición a diferentes culturas, desarrollamos habilidades interculturales, aumentamos nuestra tolerancia y comprensión, y construimos una perspectiva más amplia del mundo. Estas experiencias nos transforman en personas más empáticas, flexibles y culturalmente competentes.
        </Text>
        <Text style={styles.sectionTextAr}>
          الرحلات الطويلة فرصة فريدة للنمو الشخصي. من خلال التعرض لثقافات مختلفة، نطور مهارات بين الثقافات، ونزيد تسامحنا وفهمنا، ونبني منظوراً أوسع للعالم. هذه التجارب تحولنا إلى أشخاص أكثر تعاطفاً ومرونة وكفاءة ثقافية.
        </Text>
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
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 3,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  titleAr: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    writingDirection: 'rtl',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  dialogo: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  dialogoAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  benefit: {
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
    width: '100%',
    overflow: 'hidden',
  },
  finishButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
});
