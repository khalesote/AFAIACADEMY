import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

function SaludMental() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[11] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 11);
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
      enunciado: '¿Qué significa el término "resiliencia" en el contexto de la salud mental?',
      opciones: [
        'La capacidad de adaptarse y recuperarse ante situaciones difíciles',
        'Un tipo de terapia psicológica',
        'Un trastorno de ansiedad',
        'Una técnica de meditación'
      ],
      respuestaCorrecta: 0,
      explicacion: 'La resiliencia es la capacidad psicológica de adaptarse y recuperarse ante situaciones adversas, manteniendo el bienestar emocional.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es una señal de alerta importante en salud mental?',
      opciones: [
        'Sentirse feliz ocasionalmente',
        'Cambios significativos en el estado de ánimo',
        'Tener apetito normal',
        'Dormir bien por la noche'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Los cambios significativos en el estado de ánimo pueden indicar problemas de salud mental que requieren atención.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué técnica de relajación se basa en tensar y relajar grupos musculares?',
      opciones: [
        'Meditación trascendental',
        'Respiración diafragmática',
        'Relajación muscular progresiva',
        'Visualización guiada'
      ],
      respuestaCorrecta: 2,
      explicacion: 'La relajación muscular progresiva consiste en tensar y luego relajar sistemáticamente diferentes grupos musculares.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "mindfulness" en español?',
      opciones: [
        'Meditación profunda',
        'Atención plena o conciencia plena',
        'Relajación total',
        'Terapia cognitiva'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Mindfulness significa "atención plena" o "conciencia plena", estar presente en el momento actual sin juzgar.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un síntoma común del burnout o síndrome de desgaste profesional?',
      opciones: [
        'Aumento de la productividad',
        'Fatiga emocional y física crónica',
        'Mejora en las relaciones laborales',
        'Mayor motivación en el trabajo'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El burnout se caracteriza por fatiga emocional y física crónica, junto con sentimientos de ineficacia y despersonalización.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué técnica de respiración se conoce como 4-7-8?',
      opciones: [
        'Inhalar 4 segundos, retener 7, exhalar 8',
        'Inhalar 8 segundos, retener 4, exhalar 7',
        'Inhalar 7 segundos, retener 8, exhalar 4',
        'Inhalar 4 segundos, retener 8, exhalar 7'
      ],
      respuestaCorrecta: 0,
      explicacion: 'La técnica 4-7-8 consiste en inhalar durante 4 segundos, retener la respiración durante 7 segundos y exhalar durante 8 segundos.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la autoestima en el contexto de la salud mental?',
      opciones: [
        'La capacidad de hacer ejercicio físico',
        'La valoración positiva que una persona tiene de sí misma',
        'La habilidad para resolver problemas',
        'El nivel de inteligencia emocional'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La autoestima es la valoración positiva que una persona tiene de sí misma, incluyendo sus capacidades y valía personal.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un recurso de apoyo importante en crisis de salud mental?',
      opciones: [
        'Redes sociales',
        'Líneas de ayuda telefónica para crisis',
        'Aplicaciones de entretenimiento',
        'Programas de televisión'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Las líneas de ayuda telefónica para crisis son recursos vitales que proporcionan apoyo inmediato en situaciones de emergencia.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "empatía" en el contexto de la salud mental?',
      opciones: [
        'La capacidad de sentir las emociones de los demás',
        'Un tipo de terapia psicológica',
        'Una técnica de relajación',
        'Un trastorno de personalidad'
      ],
      respuestaCorrecta: 0,
      explicacion: 'La empatía es la capacidad de comprender y sentir las emociones, pensamientos y experiencias de otras personas.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una estrategia efectiva para manejar el estrés laboral?',
      opciones: [
        'Trabajar más horas',
        'Establecer límites claros entre trabajo y vida personal',
        'Ignorar los problemas',
        'Evitar la comunicación con compañeros'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Establecer límites claros entre trabajo y vida personal es fundamental para prevenir el estrés laboral y mantener el bienestar.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "gratitud" en el contexto del bienestar emocional?',
      opciones: [
        'Un sentimiento de tristeza',
        'La práctica de reconocer y apreciar las cosas positivas',
        'Una técnica de respiración',
        'Un tipo de ansiedad'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La gratitud es la práctica de reconocer y apreciar las cosas positivas en la vida, lo cual mejora el bienestar emocional.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un síntoma de la depresión?',
      opciones: [
        'Aumento del apetito y energía',
        'Pérdida de interés en actividades que antes disfrutabas',
        'Mejora en la concentración',
        'Mayor sociabilidad'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La pérdida de interés en actividades que antes disfrutabas es un síntoma característico de la depresión.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "autocuidado" en salud mental?',
      opciones: [
        'Cuidar solo de los demás',
        'Las acciones que tomamos para mantener nuestro bienestar físico y mental',
        'Ignorar las necesidades propias',
        'Depender completamente de otros'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El autocuidado son las acciones que tomamos activamente para mantener nuestro bienestar físico, mental y emocional.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es una técnica de meditación efectiva para principiantes?',
      opciones: [
        'Meditación de 8 horas continuas',
        'Meditación guiada de 5-10 minutos',
        'Meditación sin instrucciones',
        'Meditación solo en momentos de crisis'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La meditación guiada de 5-10 minutos es ideal para principiantes, ya que proporciona estructura y es fácil de seguir.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es el "optimismo" en el contexto de la salud mental?',
      opciones: [
        'Ignorar los problemas',
        'La tendencia a esperar resultados positivos y ver el lado bueno de las situaciones',
        'Un tipo de depresión',
        'Una técnica de respiración'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El optimismo es la tendencia a esperar resultados positivos y ver el lado bueno de las situaciones, lo cual beneficia la salud mental.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es un recurso de apoyo para la salud mental en España?',
      opciones: [
        'Solo hospitales privados',
        'Centros de salud mental públicos y privados, líneas de ayuda, y asociaciones',
        'Solo terapias alternativas',
        'Solo medicamentos'
      ],
      respuestaCorrecta: 1,
      explicacion: 'En España existen diversos recursos: centros de salud mental públicos y privados, líneas de ayuda, y asociaciones especializadas.'
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "equilibrio emocional"?',
      opciones: [
        'No sentir emociones',
        'La capacidad de mantener un estado emocional estable y saludable',
        'Solo sentir emociones positivas',
        'Ignorar las emociones negativas'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El equilibrio emocional es la capacidad de mantener un estado emocional estable y saludable, manejando tanto emociones positivas como negativas.'
    },
    // Ejercicios de vocabulario (3)
    {
      tipo: 'vocabulario',
      titulo: 'تقنيات الاسترخاء',
      pares: [
        { izquierda: 'Respiración diafragmática', derecha: 'التنفس الحجابي' },
        { izquierda: 'Relajación muscular progresiva', derecha: 'استرخاء العضلات التدريجي' },
        { izquierda: 'Visualización', derecha: 'التخيل' },
        { izquierda: 'Mindfulness', derecha: 'اليقظة الذهنية' },
        { izquierda: 'Yoga', derecha: 'اليوغا' }
      ],
      opciones: [
        'Respiración diafragmática', 'Relajación muscular progresiva', 'Visualización', 'Mindfulness', 'Yoga',
        'التنفس الحجابي', 'استرخاء العضلات التدريجي', 'التخيل', 'اليقظة الذهنية', 'اليوغا'
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'أعراض الاضطرابات النفسية',
      pares: [
        { izquierda: 'Pérdida de interés en actividades', derecha: 'الاكتئاب' },
        { izquierda: 'Preocupación excesiva', derecha: 'اضطراب القلق' },
        { izquierda: 'Cambios drásticos de humor', derecha: 'الاضطراب ثنائي القطب' },
        { izquierda: 'Pensamientos intrusivos', derecha: 'الوسواس القهري' },
        { izquierda: 'Aislamiento social', derecha: 'اضطراب الشخصية' }
      ],
      opciones: [
        'Pérdida de interés en actividades', 'Preocupación excesiva', 'Cambios drásticos de humor', 'Pensamientos intrusivos', 'Aislamiento social',
        'الاكتئاب', 'اضطراب القلق', 'الاضطراب ثنائي القطب', 'الوسواس القهري', 'اضطراب الشخصية'
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'موارد الدعم النفسي',
      pares: [
        { izquierda: 'Líneas de crisis', derecha: 'خطوط الأزمات' },
        { izquierda: 'Psicólogos', derecha: 'أخصائيو علم النفس' },
        { izquierda: 'Grupos de apoyo', derecha: 'مجموعات الدعم' },
        { izquierda: 'Aplicaciones de mindfulness', derecha: 'تطبيقات اليقظة الذهنية' },
        { izquierda: 'Centros comunitarios', derecha: 'المراكز المجتمعية' }
      ],
      opciones: [
        'Líneas de crisis', 'Psicólogos', 'Grupos de apoyo', 'Aplicaciones de mindfulness', 'Centros comunitarios',
        'خطوط الأزمات', 'أخصائيو علم النفس', 'مجموعات الدعم', 'تطبيقات اليقظة الذهنية', 'المراكز المجتمعية'
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
        source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de salud mental y bienestar"
      />

      <Text style={styles.title}>🧠 Salud Mental y Bienestar Emocional</Text>
      <Text style={styles.titleAr}>الصحة النفسية والرفاهية العاطفية</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la Salud Mental</Text>
        <Text style={styles.sectionText}>
          La salud mental es fundamental para nuestro bienestar general y calidad de vida. Incluye nuestro bienestar emocional, psicológico y social, afectando cómo pensamos, sentimos y actuamos. Una buena salud mental nos permite manejar el estrés, relacionarnos con otros, tomar decisiones y disfrutar de la vida.
        </Text>
        <Text style={styles.sectionTextAr}>
          الصحة النفسية أساسية لرفاهيتنا العامة ونوعية حياتنا. تشمل رفاهيتنا العاطفية والنفسية والاجتماعية، وتؤثر على كيفية تفكيرنا وشعورنا وتصرفنا. الصحة النفسية الجيدة تمكننا من إدارة التوتر، والتفاعل مع الآخرين، واتخاذ القرارات والاستمتاع بالحياة.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📚 Vocabulario Esencial</Text>
        
        <Text style={styles.sectionSubtitle}>💭 Estados Emocionales</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Bienestar</Text> = رفاهية - Estado de satisfacción y salud general{'\n'}
          • <Text style={styles.benefit}>Ansiedad</Text> = قلق - Estado de preocupación y nerviosismo{'\n'}
          • <Text style={styles.benefit}>Depresión</Text> = اكتئاب - Trastorno del estado de ánimo{'\n'}
          • <Text style={styles.benefit}>Estrés</Text> = توتر - Respuesta del cuerpo a presiones externas{'\n'}
          • <Text style={styles.benefit}>Equilibrio</Text> = توازن - Estado de armonía y estabilidad
        </Text>

        <Text style={styles.sectionSubtitle}>🧘 Técnicas de Bienestar</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Meditación</Text> = تأمل - Práctica de concentración mental{'\n'}
          • <Text style={styles.benefit}>Mindfulness</Text> = اليقظة الذهنية - Atención plena al presente{'\n'}
          • <Text style={styles.benefit}>Relajación</Text> = استرخاء - Estado de calma y tranquilidad{'\n'}
          • <Text style={styles.benefit}>Respiración</Text> = تنفس - Técnica fundamental de autocuidado{'\n'}
          • <Text style={styles.benefit}>Autocuidado</Text> = العناية الذاتية - Cuidado de uno mismo
        </Text>

        <Text style={styles.sectionSubtitle}>💪 Habilidades Psicológicas</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Resiliencia</Text> = المرونة النفسية - Capacidad de adaptarse a dificultades{'\n'}
          • <Text style={styles.benefit}>Autoestima</Text> = تقدير الذات - Valoración positiva de uno mismo{'\n'}
          • <Text style={styles.benefit}>Empatía</Text> = تعاطف - Capacidad de entender las emociones ajenas{'\n'}
          • <Text style={styles.benefit}>Gratitud</Text> = امتنان - Aprecio por las cosas positivas{'\n'}
          • <Text style={styles.benefit}>Optimismo</Text> = تفاؤل - Tendencia a ver el lado positivo
        </Text>

        <Text style={styles.sectionSubtitle}>🏥 Recursos de Apoyo</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Terapia</Text> = علاج - Tratamiento psicológico profesional{'\n'}
          • <Text style={styles.benefit}>Psicólogo</Text> = طبيب نفسي - Profesional de la salud mental{'\n'}
          • <Text style={styles.benefit}>Apoyo</Text> = دعم - Ayuda y acompañamiento{'\n'}
          • <Text style={styles.benefit}>Crisis</Text> = أزمة - Situación de emergencia emocional{'\n'}
          • <Text style={styles.benefit}>Prevención</Text> = وقاية - Acciones para evitar problemas
        </Text>

        <Text style={styles.sectionSubtitle}>⚡ Señales de Alerta</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Burnout</Text> = الإرهاق المهني - Agotamiento profesional{'\n'}
          • <Text style={styles.benefit}>Aislamiento</Text> = عزلة - Alejamiento de relaciones sociales{'\n'}
          • <Text style={styles.benefit}>Insomnio</Text> = أرق - Dificultad para dormir{'\n'}
          • <Text style={styles.benefit}>Irritabilidad</Text> = تهيج - Facilidad para enojarse{'\n'}
          • <Text style={styles.benefit}>Desesperanza</Text> = يأس - Pérdida de esperanza
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎯 Principales Áreas de la Salud Mental</Text>
        
        <Text style={styles.sectionSubtitle}>🧠 Bienestar Emocional</Text>
        <Text style={styles.sectionText}>
          El bienestar emocional incluye la capacidad de manejar las emociones de manera saludable, desarrollar resiliencia ante las adversidades y mantener una perspectiva positiva de la vida. Es fundamental para construir relaciones saludables y enfrentar los desafíos diarios con confianza.
        </Text>

        <Text style={styles.sectionSubtitle}>💭 Salud Psicológica</Text>
        <Text style={styles.sectionText}>
          La salud psicológica abarca nuestros pensamientos, creencias y procesos cognitivos. Incluye la capacidad de pensar claramente, tomar decisiones informadas, resolver problemas y mantener una autoestima saludable. Es esencial para el desarrollo personal y profesional.
        </Text>

        <Text style={styles.sectionSubtitle}>🤝 Bienestar Social</Text>
        <Text style={styles.sectionText}>
          El bienestar social se refiere a nuestras relaciones interpersonales, sentido de pertenencia y capacidad de contribuir a la comunidad. Incluye habilidades de comunicación, empatía, cooperación y participación social activa y significativa.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🛡️ Estrategias de Prevención y Cuidado</Text>
        
        <Text style={styles.sectionSubtitle}>🌅 Rutinas Diarias de Bienestar</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Meditación matutina</Text>: 10-15 minutos de práctica diaria{'\n'}
          • <Text style={styles.benefit}>Ejercicio físico</Text>: Al menos 30 minutos de actividad moderada{'\n'}
          • <Text style={styles.benefit}>Alimentación saludable</Text>: Dieta equilibrada y nutritiva{'\n'}
          • <Text style={styles.benefit}>Sueño regular</Text>: 7-9 horas de descanso nocturno{'\n'}
          • <Text style={styles.benefit}>Tiempo de ocio</Text>: Actividades que generen placer y satisfacción
        </Text>

        <Text style={styles.sectionSubtitle}>🧘 Técnicas de Relajación</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Respiración diafragmática</Text>: Respiración profunda desde el abdomen{'\n'}
          • <Text style={styles.benefit}>Relajación muscular progresiva</Text>: Tensar y relajar grupos musculares{'\n'}
          • <Text style={styles.benefit}>Visualización</Text>: Imaginar lugares o situaciones relajantes{'\n'}
          • <Text style={styles.benefit}>Mindfulness</Text>: Atención plena al momento presente{'\n'}
          • <Text style={styles.benefit}>Técnica 4-7-8</Text>: Respiración específica para reducir ansiedad
        </Text>

        <Text style={styles.sectionSubtitle}>💪 Desarrollo de Habilidades</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Gestión del estrés</Text>: Identificar y manejar fuentes de presión{'\n'}
          • <Text style={styles.benefit}>Comunicación asertiva</Text>: Expresar necesidades y límites claramente{'\n'}
          • <Text style={styles.benefit}>Resolución de conflictos</Text>: Abordar problemas de manera constructiva{'\n'}
          • <Text style={styles.benefit}>Autocompasión</Text>: Tratarse a uno mismo con amabilidad{'\n'}
          • <Text style={styles.benefit}>Gratitud</Text>: Practicar el reconocimiento de aspectos positivos
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🇪🇸 Salud Mental en España</Text>
        
        <Text style={styles.sectionSubtitle}>🏥 Sistema de Salud Mental</Text>
        <Text style={styles.sectionText}>
          España cuenta con un sistema de salud mental integrado en la sanidad pública, que incluye servicios de psiquiatría, psicología clínica y trabajo social. Los centros de salud mental comunitarios ofrecen atención ambulatoria, mientras que los hospitales proporcionan atención hospitalaria cuando es necesaria.
        </Text>

        <Text style={styles.sectionSubtitle}>📞 Recursos de Emergencia</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Teléfono de la Esperanza</Text>: 717 003 717{'\n'}
          • <Text style={styles.benefit}>Cruz Roja</Text>: 900 22 22 99{'\n'}
          • <Text style={styles.benefit}>Emergencias</Text>: 112{'\n'}
          • <Text style={styles.benefit}>Centros de Crisis</Text>: Disponibles en hospitales principales{'\n'}
          • <Text style={styles.benefit}>Asociaciones</Text>: FEAFES, ANAR, Fundación ANAR
        </Text>

        <Text style={styles.sectionSubtitle}>🎓 Programas Educativos</Text>
        <Text style={styles.sectionText}>
          Las universidades españolas ofrecen programas de formación en salud mental, y existen numerosas organizaciones que promueven la educación en bienestar emocional. Los centros educativos están implementando programas de prevención y detección temprana de problemas de salud mental.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💬 Diálogo de Ejemplo: Buscando Ayuda</Text>
        <Text style={styles.dialogo}>
          <Text style={styles.benefit}>María:</Text> "Últimamente me siento muy abrumada con el trabajo y no puedo dormir bien. ¿Crees que debería buscar ayuda profesional?"{'\n\n'}
          <Text style={styles.benefit}>Carlos:</Text> "Es muy valiente que reconozcas que necesitas apoyo. ¿Has notado otros cambios en tu estado de ánimo o comportamiento?"{'\n\n'}
          <Text style={styles.benefit}>María:</Text> "Sí, he perdido el interés en actividades que antes disfrutaba y me siento constantemente cansada. ¿Dónde puedo buscar ayuda?"{'\n\n'}
          <Text style={styles.benefit}>Carlos:</Text> "Te recomiendo que empieces por tu médico de cabecera. También hay centros de salud mental comunitarios y líneas de ayuda telefónica disponibles 24/7."
        </Text>
        <Text style={styles.dialogoAr}>
          <Text style={styles.benefit}>ماريا:</Text> "أشعر مؤخراً بالإرهاق الشديد من العمل ولا أستطيع النوم جيداً. هل تعتقد أنني يجب أن أطلب مساعدة مهنية؟"{'\n\n'}
          <Text style={styles.benefit}>كارلوس:</Text> "من الشجاعة أن تعترفي بأنك تحتاجين إلى دعم. هل لاحظت تغييرات أخرى في مزاجك أو سلوكك؟"{'\n\n'}
          <Text style={styles.benefit}>ماريا:</Text> "نعم، فقدت الاهتمام بالأنشطة التي كنت أستمتع بها سابقاً وأشعر بالتعب المستمر. أين يمكنني طلب المساعدة؟"{'\n\n'}
          <Text style={styles.benefit}>كارلوس:</Text> "أنصحك أن تبدئي بطبيبك العام. هناك أيضاً مراكز الصحة النفسية المجتمعية وخطوط المساعدة الهاتفية المتاحة على مدار الساعة."
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎯 Enfoque en el Autocuidado</Text>
        <Text style={styles.sectionText}>
          El autocuidado es fundamental para mantener una buena salud mental. Incluye actividades que nutren nuestro bienestar físico, emocional y espiritual. Es importante recordar que cuidar de nosotros mismos no es egoísmo, sino una necesidad para poder cuidar de otros y contribuir positivamente a la sociedad.
        </Text>
        <Text style={styles.sectionTextAr}>
          العناية الذاتية أساسية للحفاظ على صحة نفسية جيدة. تشمل الأنشطة التي تغذي رفاهيتنا الجسدية والعاطفية والروحية. من المهم تذكر أن العناية بأنفسنا ليست أنانية، بل ضرورة لنتمكن من العناية بالآخرين والمساهمة إيجابياً في المجتمع.
        </Text>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />

      <View style={styles.finishContainer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Unidad finalizada</Text>
          <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
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
    backgroundColor: '#79A890',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
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

export default SaludMental;
