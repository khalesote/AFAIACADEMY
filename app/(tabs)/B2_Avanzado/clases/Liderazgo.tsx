import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Liderazgo y Emprendimiento - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el liderazgo?",
    opciones: ["Solo dar órdenes", "Capacidad de influir y guiar a otros hacia objetivos comunes", "Solo ser jefe", "Solo tener poder"],
    respuesta_correcta: "Capacidad de influir y guiar a otros hacia objetivos comunes"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el emprendimiento?",
    opciones: ["Solo tener dinero", "Proceso de crear y desarrollar un negocio o proyecto innovador", "Solo trabajar", "Solo invertir"],
    respuesta_correcta: "Proceso de crear y desarrollar un negocio o proyecto innovador"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la innovación?",
    opciones: ["Solo inventar cosas", "Proceso de crear nuevas ideas, productos o métodos que aportan valor", "Solo cambiar", "Solo mejorar"],
    respuesta_correcta: "Proceso de crear nuevas ideas, productos o métodos que aportan valor"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la resiliencia?",
    opciones: ["Solo ser fuerte", "Capacidad de adaptarse y recuperarse ante las adversidades", "Solo aguantar", "Solo resistir"],
    respuesta_correcta: "Capacidad de adaptarse y recuperarse ante las adversidades"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la visión estratégica?",
    opciones: ["Solo ver lejos", "Capacidad de anticipar el futuro y planificar acciones a largo plazo", "Solo soñar", "Solo imaginar"],
    respuesta_correcta: "Capacidad de anticipar el futuro y planificar acciones a largo plazo"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la motivación?",
    opciones: ["Solo animar", "Proceso que impulsa a las personas a actuar y perseguir objetivos", "Solo felicitar", "Solo premiar"],
    respuesta_correcta: "Proceso que impulsa a las personas a actuar y perseguir objetivos"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el trabajo en equipo?",
    opciones: ["Solo trabajar juntos", "Colaboración coordinada de personas para lograr objetivos comunes", "Solo reunirse", "Solo hablar"],
    respuesta_correcta: "Colaboración coordinada de personas para lograr objetivos comunes"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la toma de decisiones?",
    opciones: ["Solo elegir", "Proceso de seleccionar entre alternativas para resolver problemas", "Solo decidir", "Solo votar"],
    respuesta_correcta: "Proceso de seleccionar entre alternativas para resolver problemas"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el mentoring?",
    opciones: ["Solo enseñar", "Proceso de guía y acompañamiento de una persona experimentada", "Solo explicar", "Solo corregir"],
    respuesta_correcta: "Proceso de guía y acompañamiento de una persona experimentada"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la iniciativa?",
    opciones: ["Solo empezar", "Capacidad de tomar la iniciativa y actuar proactivamente", "Solo proponer", "Solo sugerir"],
    respuesta_correcta: "Capacidad de tomar la iniciativa y actuar proactivamente"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la comunicación efectiva?",
    opciones: ["Solo hablar", "Transmisión clara y eficiente de ideas y mensajes", "Solo escribir", "Solo escuchar"],
    respuesta_correcta: "Transmisión clara y eficiente de ideas y mensajes"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la gestión del cambio?",
    opciones: ["Solo cambiar", "Proceso de planificar e implementar transformaciones organizacionales", "Solo modificar", "Solo alterar"],
    respuesta_correcta: "Proceso de planificar e implementar transformaciones organizacionales"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la inteligencia emocional?",
    opciones: ["Solo ser inteligente", "Capacidad de reconocer y gestionar emociones propias y ajenas", "Solo ser empático", "Solo ser sensible"],
    respuesta_correcta: "Capacidad de reconocer y gestionar emociones propias y ajenas"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el pensamiento estratégico?",
    opciones: ["Solo pensar", "Capacidad de analizar situaciones complejas y planificar a largo plazo", "Solo planificar", "Solo analizar"],
    respuesta_correcta: "Capacidad de analizar situaciones complejas y planificar a largo plazo"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la delegación efectiva?",
    opciones: ["Solo repartir trabajo", "Asignar responsabilidades y autoridad de manera eficiente", "Solo mandar", "Solo distribuir"],
    respuesta_correcta: "Asignar responsabilidades y autoridad de manera eficiente"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la gestión del riesgo?",
    opciones: ["Solo evitar riesgos", "Proceso de identificar, evaluar y gestionar amenazas potenciales", "Solo arriesgar", "Solo prevenir"],
    respuesta_correcta: "Proceso de identificar, evaluar y gestionar amenazas potenciales"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el desarrollo de talento?",
    opciones: ["Solo contratar", "Proceso de potenciar las habilidades y competencias de las personas", "Solo formar", "Solo capacitar"],
    respuesta_correcta: "Proceso de potenciar las habilidades y competencias de las personas"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto de liderazgo con su definición correcta:",
    pares: [
      { izquierda: "Liderazgo", derecha: "Influir y guiar hacia objetivos comunes" },
      { izquierda: "Emprendimiento", derecha: "Crear y desarrollar proyectos innovadores" },
      { izquierda: "Innovación", derecha: "Crear nuevas ideas que aportan valor" },
      { izquierda: "Resiliencia", derecha: "Adaptarse y recuperarse ante adversidades" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada habilidad de liderazgo con su característica principal:",
    pares: [
      { izquierda: "Comunicación efectiva", derecha: "Transmisión clara de ideas y mensajes" },
      { izquierda: "Inteligencia emocional", derecha: "Reconocer y gestionar emociones" },
      { izquierda: "Pensamiento estratégico", derecha: "Analizar situaciones complejas" },
      { izquierda: "Delegación efectiva", derecha: "Asignar responsabilidades eficientemente" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada proceso de gestión con su función principal:",
    pares: [
      { izquierda: "Gestión del cambio", derecha: "Planificar transformaciones organizacionales" },
      { izquierda: "Gestión del riesgo", derecha: "Identificar y evaluar amenazas potenciales" },
      { izquierda: "Desarrollo de talento", derecha: "Potenciar habilidades y competencias" },
      { izquierda: "Mentoring", derecha: "Guía y acompañamiento de personas experimentadas" }
    ]
  }
];

export default function Liderazgo() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[13] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 13);
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

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#79A890" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>👑 Liderazgo y Emprendimiento</Text>
        <Text style={styles.titleAr}>القيادة وريادة الأعمال</Text>
        <Text style={styles.subtitle}>Desarrollo de habilidades directivas y espíritu emprendedor</Text>
        <Text style={styles.subtitleAr}>تطوير المهارات الإدارية والروح الريادية</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia del liderazgo y el emprendimiento</Text>
        <Text style={styles.sectionText}>
          El liderazgo y el emprendimiento son habilidades fundamentales en el 
          mundo actual, donde la capacidad de inspirar, guiar y crear valor es 
          esencial para el éxito personal y profesional. Un buen líder no solo 
          dirige, sino que inspira y empodera a su equipo.
          {"\n\n"}
          El emprendimiento representa la capacidad de identificar oportunidades, 
          asumir riesgos calculados y crear soluciones innovadoras que generen 
          valor para la sociedad. Es una mentalidad que combina creatividad, 
          perseverancia y visión estratégica para transformar ideas en realidad.
          {"\n\n"}
          En un mundo cada vez más complejo y cambiante, las habilidades de 
          liderazgo y emprendimiento son cruciales para adaptarse a los nuevos 
          desafíos, crear oportunidades y contribuir al desarrollo sostenible 
          de las organizaciones y la sociedad.
        </Text>
        <Text style={styles.sectionTextAr}>
          القيادة وريادة الأعمال مهارات أساسية في العالم الحالي، حيث القدرة
          على الإلهام والتوجيه وخلق القيمة ضرورية للنجاح الشخصي والمهني.
          القائد الجيد لا يقود فقط، بل يلهم ويمكّن فريقه.
          {"\n\n"}
          ريادة الأعمال تمثل القدرة على تحديد الفرص، تحمل المخاطر المحسوبة
          وخلق حلول مبتكرة تولد قيمة للمجتمع. إنها عقلية تجمع الإبداع
          والمثابرة والرؤية الاستراتيجية لتحويل الأفكار إلى واقع.
          {"\n\n"}
          في عالم متزايد التعقيد والتغيير، مهارات القيادة وريادة الأعمال
          حاسمة للتكيف مع التحديات الجديدة، خلق الفرص والمساهمة في
          التنمية المستدامة للمنظمات والمجتمع.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de liderazgo y emprendimiento</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>👑 Conceptos de liderazgo:</Text>{"\n"}
          liderazgo = قيادة{"\n"}
          líder = قائد{"\n"}
          visión = رؤية{"\n"}
          misión = مهمة{"\n"}
          valores = قيم{"\n"}
          autoridad = سلطة{"\n"}
          influencia = تأثير{"\n"}
          motivación = تحفيز{"\n"}
          inspiración = إلهام{"\n"}
          empoderamiento = تمكين
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 Emprendimiento e innovación:</Text>{"\n"}
          emprendimiento = ريادة الأعمال{"\n"}
          emprendedor = رائد أعمال{"\n"}
          innovación = ابتكار{"\n"}
          creatividad = إبداع{"\n"}
          iniciativa = مبادرة{"\n"}
          oportunidad = فرصة{"\n"}
          riesgo = مخاطرة{"\n"}
          plan de negocio = خطة عمل{"\n"}
          startup = شركة ناشئة{"\n"}
          modelo de negocio = نموذج عمل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Trabajo en equipo:</Text>{"\n"}
          equipo = فريق{"\n"}
          colaboración = تعاون{"\n"}
          sinergia = تكامل{"\n"}
          comunicación = تواصل{"\n"}
          coordinación = تنسيق{"\n"}
          delegación = تفويض{"\n"}
          responsabilidad = مسؤولية{"\n"}
          confianza = ثقة{"\n"}
          respeto = احترام{"\n"}
          diversidad = تنوع
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎯 Gestión y estrategia:</Text>{"\n"}
          estrategia = استراتيجية{"\n"}
          planificación = تخطيط{"\n"}
          organización = تنظيم{"\n"}
          control = مراقبة{"\n"}
          evaluación = تقييم{"\n"}
          mejora continua = تحسين مستمر{"\n"}
          gestión del cambio = إدارة التغيير{"\n"}
          gestión del riesgo = إدارة المخاطر{"\n"}
          calidad = جودة{"\n"}
          eficiencia = كفاءة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💡 Habilidades personales:</Text>{"\n"}
          inteligencia emocional = ذكاء عاطفي{"\n"}
          resiliencia = مرونة{"\n"}
          adaptabilidad = تكيف{"\n"}
          flexibilidad = مرونة{"\n"}
          perseverancia = مثابرة{"\n"}
          determinación = عزم{"\n"}
          autoconfianza = ثقة بالنفس{"\n"}
          autodisciplina = انضباط ذاتي{"\n"}
          aprendizaje continuo = تعلم مستمر{"\n"}
          desarrollo personal = تطوير شخصي
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>👑 مفاهيم القيادة:</Text>{"\n"}
          قيادة = liderazgo{"\n"}
          قائد = líder{"\n"}
          رؤية = visión{"\n"}
          مهمة = misión{"\n"}
          قيم = valores{"\n"}
          سلطة = autoridad{"\n"}
          تأثير = influencia{"\n"}
          تحفيز = motivación{"\n"}
          إلهام = inspiración{"\n"}
          تمكين = empoderamiento
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 ريادة الأعمال والابتكار:</Text>{"\n"}
          ريادة الأعمال = emprendimiento{"\n"}
          رائد أعمال = emprendedor{"\n"}
          ابتكار = innovación{"\n"}
          إبداع = creatividad{"\n"}
          مبادرة = iniciativa{"\n"}
          فرصة = oportunidad{"\n"}
          مخاطرة = riesgo{"\n"}
          خطة عمل = plan de negocio{"\n"}
          شركة ناشئة = startup{"\n"}
          نموذج عمل = modelo de negocio
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 العمل الجماعي:</Text>{"\n"}
          فريق = equipo{"\n"}
          تعاون = colaboración{"\n"}
          تكامل = sinergia{"\n"}
          تواصل = comunicación{"\n"}
          تنسيق = coordinación{"\n"}
          تفويض = delegación{"\n"}
          مسؤولية = responsabilidad{"\n"}
          ثقة = confianza{"\n"}
          احترام = respeto{"\n"}
          تنوع = diversidad
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎯 الإدارة والاستراتيجية:</Text>{"\n"}
          استراتيجية = estrategia{"\n"}
          تخطيط = planificación{"\n"}
          تنظيم = organización{"\n"}
          مراقبة = control{"\n"}
          تقييم = evaluación{"\n"}
          تحسين مستمر = mejora continua{"\n"}
          إدارة التغيير = gestión del cambio{"\n"}
          إدارة المخاطر = gestión del riesgo{"\n"}
          جودة = calidad{"\n"}
          كفاءة = eficiencia
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💡 المهارات الشخصية:</Text>{"\n"}
          ذكاء عاطفي = inteligencia emocional{"\n"}
          مرونة = resiliencia{"\n"}
          تكيف = adaptabilidad{"\n"}
          مرونة = flexibilidad{"\n"}
          مثابرة = perseverancia{"\n"}
          عزم = determinación{"\n"}
          ثقة بالنفس = autoconfianza{"\n"}
          انضباط ذاتي = autodisciplina{"\n"}
          تعلم مستمر = aprendizaje continuo{"\n"}
          تطوير شخصي = desarrollo personal
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Estilos de liderazgo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>👑 Liderazgo transformacional:</Text>{"\n"}
          • <Text style={styles.benefit}>Inspiración:</Text> Motiva e inspira a través de una visión compartida{"\n"}
          • <Text style={styles.benefit}>Estimulación intelectual:</Text> Fomenta la creatividad e innovación{"\n"}
          • <Text style={styles.benefit}>Consideración individualizada:</Text> Atiende las necesidades de cada persona{"\n"}
          • <Text style={styles.benefit}>Influencia idealizada:</Text> Sirve como modelo de comportamiento{"\n"}
          • <Text style={styles.benefit}>Empoderamiento:</Text> Delega responsabilidades y autoridad{"\n"}
          • <Text style={styles.benefit}>Desarrollo de talento:</Text> Invierte en el crecimiento del equipo
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Liderazgo participativo:</Text>{"\n"}
          • <Text style={styles.benefit}>Colaboración:</Text> Involucra al equipo en la toma de decisiones{"\n"}
          • <Text style={styles.benefit}>Comunicación abierta:</Text> Fomenta el diálogo y la transparencia{"\n"}
          • <Text style={styles.benefit}>Consenso:</Text> Busca acuerdos entre diferentes perspectivas{"\n"}
          • <Text style={styles.benefit}>Aprendizaje colectivo:</Text> Aprovecha la diversidad de conocimientos{"\n"}
          • <Text style={styles.benefit}>Responsabilidad compartida:</Text> Distribuye la responsabilidad{"\n"}
          • <Text style={styles.benefit}>Desarrollo de capacidades:</Text> Fortalece las habilidades del equipo
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ Liderazgo situacional:</Text>{"\n"}
          • <Text style={styles.benefit}>Adaptabilidad:</Text> Ajusta el estilo según la situación{"\n"}
          • <Text style={styles.benefit}>Diagnóstico:</Text> Evalúa el nivel de madurez del equipo{"\n"}
          • <Text style={styles.benefit}>Flexibilidad:</Text> Cambia de enfoque según las necesidades{"\n"}
          • <Text style={styles.benefit}>Desarrollo progresivo:</Text> Guía el crecimiento del equipo{"\n"}
          • <Text style={styles.benefit}>Autonomía gradual:</Text> Incrementa la independencia{"\n"}
          • <Text style={styles.benefit}>Soporte contextual:</Text> Proporciona ayuda cuando es necesaria
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 Liderazgo servicial:</Text>{"\n"}
          • <Text style={styles.benefit}>Servicio al equipo:</Text> Prioriza las necesidades de los demás{"\n"}
          • <Text style={styles.benefit}>Humildad:</Text> Reconoce las contribuciones del equipo{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Comprende las perspectivas y sentimientos{"\n"}
          • <Text style={styles.benefit}>Desarrollo de otros:</Text> Invierte en el crecimiento personal{"\n"}
          • <Text style={styles.benefit}>Comunidad:</Text> Construye un sentido de pertenencia{"\n"}
          • <Text style={styles.benefit}>Propósito compartido:</Text> Alinea objetivos personales y organizacionales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 Liderazgo emprendedor:</Text>{"\n"}
          • <Text style={styles.benefit}>Visión innovadora:</Text> Identifica oportunidades únicas{"\n"}
          • <Text style={styles.benefit}>Toma de riesgos:</Text> Asume desafíos calculados{"\n"}
          • <Text style={styles.benefit}>Perseverancia:</Text> Mantiene el enfoque ante las dificultades{"\n"}
          • <Text style={styles.benefit}>Creatividad:</Text> Genera soluciones originales{"\n"}
          • <Text style={styles.benefit}>Resiliencia:</Text> Se recupera de los fracasos{"\n"}
          • <Text style={styles.benefit}>Aprendizaje continuo:</Text> Se adapta a los cambios
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>👑 القيادة التحويلية:</Text>{"\n"}
          • <Text style={styles.benefit}>إلهام:</Text> يحفز ويلهم من خلال رؤية مشتركة{"\n"}
          • <Text style={styles.benefit}>تحفيز فكري:</Text> يشجع الإبداع والابتكار{"\n"}
          • <Text style={styles.benefit}>اهتمام فردي:</Text> يلبي احتياجات كل شخص{"\n"}
          • <Text style={styles.benefit}>تأثير مثالي:</Text> يخدم كنموذج سلوكي{"\n"}
          • <Text style={styles.benefit}>تمكين:</Text> يفوض المسؤوليات والسلطة{"\n"}
          • <Text style={styles.benefit}>تطوير المواهب:</Text> يستثمر في نمو الفريق
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 القيادة التشاركية:</Text>{"\n"}
          • <Text style={styles.benefit}>تعاون:</Text> يشرك الفريق في اتخاذ القرارات{"\n"}
          • <Text style={styles.benefit}>تواصل مفتوح:</Text> يشجع الحوار والشفافية{"\n"}
          • <Text style={styles.benefit}>إجماع:</Text> يبحث عن اتفاقات بين وجهات نظر مختلفة{"\n"}
          • <Text style={styles.benefit}>تعلم جماعي:</Text> يستفيد من تنوع المعارف{"\n"}
          • <Text style={styles.benefit}>مسؤولية مشتركة:</Text> يوزع المسؤولية{"\n"}
          • <Text style={styles.benefit}>تطوير القدرات:</Text> يقوي مهارات الفريق
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ القيادة الموقفية:</Text>{"\n"}
          • <Text style={styles.benefit}>تكيف:</Text> يعدل الأسلوب حسب الموقف{"\n"}
          • <Text style={styles.benefit}>تشخيص:</Text> يقيم مستوى نضج الفريق{"\n"}
          • <Text style={styles.benefit}>مرونة:</Text> يغير النهج حسب الاحتياجات{"\n"}
          • <Text style={styles.benefit}>تطور تدريجي:</Text> يوجه نمو الفريق{"\n"}
          • <Text style={styles.benefit}>استقلالية تدريجية:</Text> يزيد الاستقلالية{"\n"}
          • <Text style={styles.benefit}>دعم سياقي:</Text> يوفر المساعدة عند الحاجة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 القيادة الخادمة:</Text>{"\n"}
          • <Text style={styles.benefit}>خدمة الفريق:</Text> يعطي أولوية لاحتياجات الآخرين{"\n"}
          • <Text style={styles.benefit}>تواضع:</Text> يعترف بمساهمات الفريق{"\n"}
          • <Text style={styles.benefit}>تعاطف:</Text> يفهم وجهات النظر والمشاعر{"\n"}
          • <Text style={styles.benefit}>تطوير الآخرين:</Text> يستثمر في النمو الشخصي{"\n"}
          • <Text style={styles.benefit}>مجتمع:</Text> يبني شعوراً بالانتماء{"\n"}
          • <Text style={styles.benefit}>هدف مشترك:</Text> يمحاذي الأهداف الشخصية والتنظيمية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 القيادة الريادية:</Text>{"\n"}
          • <Text style={styles.benefit}>رؤية مبتكرة:</Text> يحدد فرصاً فريدة{"\n"}
          • <Text style={styles.benefit}>تحمل المخاطر:</Text> يتحمل تحديات محسوبة{"\n"}
          • <Text style={styles.benefit}>مثابرة:</Text> يحافظ على التركيز أمام الصعوبات{"\n"}
          • <Text style={styles.benefit}>إبداع:</Text> يولد حلولاً أصلية{"\n"}
          • <Text style={styles.benefit}>مرونة:</Text> يتعافى من الفشل{"\n"}
          • <Text style={styles.benefit}>تعلم مستمر:</Text> يتكيف مع التغييرات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Habilidades clave para el liderazgo y emprendimiento</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🗣️ Comunicación y relaciones:</Text>{"\n"}
          • <Text style={styles.benefit}>Comunicación efectiva:</Text> Transmitir ideas de manera clara y persuasiva{"\n"}
          • <Text style={styles.benefit}>Escucha activa:</Text> Comprender las necesidades y perspectivas{"\n"}
          • <Text style={styles.benefit}>Inteligencia emocional:</Text> Gestionar emociones propias y ajenas{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Conectar con las experiencias de otros{"\n"}
          • <Text style={styles.benefit}>Negociación:</Text> Alcanzar acuerdos beneficiosos{"\n"}
          • <Text style={styles.benefit}>Networking:</Text> Construir relaciones profesionales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🧠 Pensamiento estratégico:</Text>{"\n"}
          • <Text style={styles.benefit}>Análisis estratégico:</Text> Evaluar situaciones complejas{"\n"}
          • <Text style={styles.benefit}>Planificación:</Text> Diseñar estrategias a largo plazo{"\n"}
          • <Text style={styles.benefit}>Toma de decisiones:</Text> Elegir entre alternativas{"\n"}
          • <Text style={styles.benefit}>Resolución de problemas:</Text> Encontrar soluciones creativas{"\n"}
          • <Text style={styles.benefit}>Pensamiento crítico:</Text> Evaluar información objetivamente{"\n"}
          • <Text style={styles.benefit}>Innovación:</Text> Generar ideas originales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ Gestión y ejecución:</Text>{"\n"}
          • <Text style={styles.benefit}>Gestión de proyectos:</Text> Planificar y ejecutar iniciativas{"\n"}
          • <Text style={styles.benefit}>Delegación:</Text> Asignar responsabilidades eficientemente{"\n"}
          • <Text style={styles.benefit}>Gestión del tiempo:</Text> Optimizar el uso del tiempo{"\n"}
          • <Text style={styles.benefit}>Gestión del cambio:</Text> Implementar transformaciones{"\n"}
          • <Text style={styles.benefit}>Gestión del riesgo:</Text> Identificar y mitigar amenazas{"\n"}
          • <Text style={styles.benefit}>Control de calidad:</Text> Asegurar estándares de excelencia
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌟 Desarrollo personal:</Text>{"\n"}
          • <Text style={styles.benefit}>Autoconocimiento:</Text> Comprender fortalezas y debilidades{"\n"}
          • <Text style={styles.benefit}>Resiliencia:</Text> Adaptarse a las adversidades{"\n"}
          • <Text style={styles.benefit}>Aprendizaje continuo:</Text> Mantenerse actualizado{"\n"}
          • <Text style={styles.benefit}>Autodisciplina:</Text> Mantener el enfoque y la constancia{"\n"}
          • <Text style={styles.benefit}>Mentoring:</Text> Guiar y desarrollar a otros{"\n"}
          • <Text style={styles.benefit}>Liderazgo personal:</Text> Gestionar el propio desarrollo
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🗣️ التواصل والعلاقات:</Text>{"\n"}
          • <Text style={styles.benefit}>تواصل فعال:</Text> نقل الأفكار بطريقة واضحة ومقنعة{"\n"}
          • <Text style={styles.benefit}>استماع نشط:</Text> فهم الاحتياجات ووجهات النظر{"\n"}
          • <Text style={styles.benefit}>ذكاء عاطفي:</Text> إدارة المشاعر الشخصية والآخرين{"\n"}
          • <Text style={styles.benefit}>تعاطف:</Text> التواصل مع تجارب الآخرين{"\n"}
          • <Text style={styles.benefit}>تفاوض:</Text> الوصول لاتفاقات مفيدة{"\n"}
          • <Text style={styles.benefit}>شبكات:</Text> بناء علاقات مهنية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🧠 التفكير الاستراتيجي:</Text>{"\n"}
          • <Text style={styles.benefit}>تحليل استراتيجي:</Text> تقييم المواقف المعقدة{"\n"}
          • <Text style={styles.benefit}>تخطيط:</Text> تصميم استراتيجيات طويلة المدى{"\n"}
          • <Text style={styles.benefit}>اتخاذ القرارات:</Text> الاختيار بين البدائل{"\n"}
          • <Text style={styles.benefit}>حل المشاكل:</Text> إيجاد حلول إبداعية{"\n"}
          • <Text style={styles.benefit}>تفكير نقدي:</Text> تقييم المعلومات بموضوعية{"\n"}
          • <Text style={styles.benefit}>ابتكار:</Text> توليد أفكار أصلية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ الإدارة والتنفيذ:</Text>{"\n"}
          • <Text style={styles.benefit}>إدارة المشاريع:</Text> تخطيط وتنفيذ المبادرات{"\n"}
          • <Text style={styles.benefit}>تفويض:</Text> تعيين المسؤوليات بكفاءة{"\n"}
          • <Text style={styles.benefit}>إدارة الوقت:</Text> تحسين استخدام الوقت{"\n"}
          • <Text style={styles.benefit}>إدارة التغيير:</Text> تنفيذ التحولات{"\n"}
          • <Text style={styles.benefit}>إدارة المخاطر:</Text> تحديد وتخفيف التهديدات{"\n"}
          • <Text style={styles.benefit}>مراقبة الجودة:</Text> ضمان معايير التميز
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌟 التطور الشخصي:</Text>{"\n"}
          • <Text style={styles.benefit}>معرفة الذات:</Text> فهم نقاط القوة والضعف{"\n"}
          • <Text style={styles.benefit}>مرونة:</Text> التكيف مع الشدائد{"\n"}
          • <Text style={styles.benefit}>تعلم مستمر:</Text> البقاء محدثاً{"\n"}
          • <Text style={styles.benefit}>انضباط ذاتي:</Text> الحفاظ على التركيز والثبات{"\n"}
          • <Text style={styles.benefit}>إرشاد:</Text> توجيه وتطوير الآخرين{"\n"}
          • <Text style={styles.benefit}>قيادة شخصية:</Text> إدارة التطور الذاتي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre liderazgo y emprendimiento</Text>
        <Text style={styles.dialogo}>
          — ¿Qué cualidades debe tener un buen líder? ¿Te gustaría emprender un negocio?{"\n\n"}
          — En mi opinión, un buen líder debe tener visión estratégica, capacidad de comunicación efectiva, inteligencia emocional y la habilidad de inspirar y motivar a su equipo. Respecto al emprendimiento, sí me interesa mucho la idea de crear algo propio, aunque reconozco que requiere mucha dedicación, perseverancia y capacidad de asumir riesgos.{"\n\n"}
          — ¿Qué harías si tuvieras que liderar un grupo con opiniones muy diferentes?{"\n\n"}
          — Buscaría puntos en común y fomentaría el diálogo abierto. Es importante crear un ambiente donde todas las voces sean escuchadas y valoradas. También aplicaría técnicas de facilitación para guiar la discusión hacia soluciones constructivas, y si fuera necesario, tomaría decisiones basadas en el consenso del grupo.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما هي صفات القائد الجيد؟ هل ترغب في بدء مشروع خاص؟{"\n\n"}
          — في رأيي، يجب أن يكون للقائد الجيد رؤية استراتيجية، قدرة على التواصل الفعال، ذكاء عاطفي ومهارة إلهام وتحفيز فريقه. بالنسبة لريادة الأعمال، نعم أهتم كثيراً بفكرة خلق شيء خاص، رغم أنني أعترف أنها تتطلب الكثير من التفاني والمثابرة والقدرة على تحمل المخاطر.{"\n\n"}
          — ماذا ستفعل إذا كان عليك قيادة مجموعة ذات آراء مختلفة جداً؟{"\n\n"}
          — سأبحث عن نقاط مشتركة وأشجع الحوار المفتوح. من المهم خلق بيئة حيث تُسمع وتُقدر جميع الأصوات. سأطبق أيضاً تقنيات التيسير لتوجيه النقاش نحو حلول بناءة، وإذا لزم الأمر، سأتخذ قرارات مبنية على إجماع المجموعة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Ejercicios Interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
      </View>

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
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#79A890',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleAr: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  dialogo: {
    fontSize: 16,
    color: '#79A890',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  dialogoAr: {
    fontSize: 16,
    color: '#79A890',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
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
