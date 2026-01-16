import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Debates Sociales - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué caracteriza un debate social constructivo?",
    opciones: ["Solo defender tu posición sin escuchar otros", "Intercambiar argumentos respetando diferentes perspectivas", "Evitar temas controvertidos", "Solo usar fuentes oficiales"],
    respuesta_correcta: "Intercambiar argumentos respetando diferentes perspectivas"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la participación ciudadana?",
    opciones: ["Solo votar en elecciones", "Múltiples formas de involucramiento en la vida pública", "Solo protestar en las calles", "Solo leer noticias"],
    respuesta_correcta: "Múltiples formas de involucramiento en la vida pública"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la polarización política?",
    opciones: ["Solo diferencias de opinión", "División extrema de posiciones políticas", "Solo debates parlamentarios", "Solo campañas electorales"],
    respuesta_correcta: "División extrema de posiciones políticas"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la alfabetización mediática?",
    opciones: ["Solo saber leer", "Capacidad de analizar información de manera crítica", "Solo usar redes sociales", "Solo ver televisión"],
    respuesta_correcta: "Capacidad de analizar información de manera crítica"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el pensamiento crítico?",
    opciones: ["Solo criticar todo", "Evaluar información de manera objetiva y reflexiva", "Solo estar en desacuerdo", "Solo cuestionar autoridades"],
    respuesta_correcta: "Evaluar información de manera objetiva y reflexiva"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la desinformación?",
    opciones: ["Solo noticias falsas", "Información falsa o engañosa difundida intencionalmente", "Solo errores periodísticos", "Solo rumores"],
    respuesta_correcta: "Información falsa o engañosa difundida intencionalmente"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el diálogo democrático?",
    opciones: ["Solo discusiones políticas", "Conversación respetuosa entre personas con diferentes opiniones", "Solo debates parlamentarios", "Solo campañas electorales"],
    respuesta_correcta: "Conversación respetuosa entre personas con diferentes opiniones"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la sociedad civil?",
    opciones: ["Solo organizaciones gubernamentales", "Organizaciones y grupos ciudadanos independientes del Estado", "Solo partidos políticos", "Solo sindicatos"],
    respuesta_correcta: "Organizaciones y grupos ciudadanos independientes del Estado"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el activismo social?",
    opciones: ["Solo protestar", "Acción organizada para promover cambios sociales", "Solo escribir en redes sociales", "Solo votar"],
    respuesta_correcta: "Acción organizada para promover cambios sociales"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la democracia participativa?",
    opciones: ["Solo votar cada 4 años", "Sistema donde los ciudadanos participan activamente en decisiones", "Solo democracia representativa", "Solo referendos"],
    respuesta_correcta: "Sistema donde los ciudadanos participan activamente en decisiones"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el consenso?",
    opciones: ["Solo mayoría simple", "Acuerdo general entre diferentes partes", "Solo unanimidad", "Solo compromiso temporal"],
    respuesta_correcta: "Acuerdo general entre diferentes partes"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la libertad de expresión?",
    opciones: ["Solo decir lo que quieras", "Derecho a expresar opiniones sin censura previa", "Solo criticar al gobierno", "Solo libertad de prensa"],
    respuesta_correcta: "Derecho a expresar opiniones sin censura previa"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la tolerancia?",
    opciones: ["Solo aguantar", "Respeto por las diferencias y opiniones ajenas", "Solo indiferencia", "Solo aceptación pasiva"],
    respuesta_correcta: "Respeto por las diferencias y opiniones ajenas"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el pluralismo político?",
    opciones: ["Solo múltiples partidos", "Coexistencia de diferentes ideologías y opiniones", "Solo bipartidismo", "Solo democracia directa"],
    respuesta_correcta: "Coexistencia de diferentes ideologías y opiniones"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la responsabilidad ciudadana?",
    opciones: ["Solo pagar impuestos", "Participación activa y compromiso con la sociedad", "Solo obedecer leyes", "Solo votar"],
    respuesta_correcta: "Participación activa y compromiso con la sociedad"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la transparencia política?",
    opciones: ["Solo informes anuales", "Acceso público a información gubernamental", "Solo declaraciones de impuestos", "Solo debates públicos"],
    respuesta_correcta: "Acceso público a información gubernamental"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la rendición de cuentas?",
    opciones: ["Solo informes financieros", "Obligación de explicar y justificar decisiones públicas", "Solo auditorías", "Solo elecciones"],
    respuesta_correcta: "Obligación de explicar y justificar decisiones públicas"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto democrático con su definición correcta:",
    pares: [
      { izquierda: "Participación ciudadana", derecha: "Involucramiento activo en la vida pública" },
      { izquierda: "Debate constructivo", derecha: "Intercambio respetuoso de argumentos" },
      { izquierda: "Polarización", derecha: "División extrema de opiniones" },
      { izquierda: "Alfabetización mediática", derecha: "Capacidad de analizar información crítica" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada valor democrático con su característica principal:",
    pares: [
      { izquierda: "Tolerancia", derecha: "Respeto por las diferencias" },
      { izquierda: "Libertad de expresión", derecha: "Derecho a opinar sin censura" },
      { izquierda: "Transparencia", derecha: "Acceso público a información" },
      { izquierda: "Responsabilidad", derecha: "Compromiso con la sociedad" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada desafío democrático con su impacto principal:",
    pares: [
      { izquierda: "Desinformación", derecha: "Confusión y manipulación" },
      { izquierda: "Polarización", derecha: "División social extrema" },
      { izquierda: "Apatía ciudadana", derecha: "Falta de participación" },
      { izquierda: "Censura", derecha: "Limitación de libertades" }
    ]
  }
];

export default function DebatesSociales() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[8] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 8);
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
        <Text style={styles.title}>🗣️ Debates Sociales</Text>
        <Text style={styles.titleAr}>المناظرات الاجتماعية</Text>
        <Text style={styles.subtitle}>Participación ciudadana y democracia</Text>
        <Text style={styles.subtitleAr}>المشاركة المواطنة والديمقراطية</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de los debates sociales</Text>
        <Text style={styles.sectionText}>
          Los debates sociales son fundamentales para el funcionamiento de una sociedad 
          democrática saludable. A través del diálogo respetuoso y constructivo, los 
          ciudadanos pueden intercambiar ideas, confrontar diferentes perspectivas y 
          trabajar juntos hacia soluciones comunes a los problemas que afectan a la 
          comunidad.
          {"\n\n"}
          En una sociedad pluralista, es natural que existan diferentes opiniones y 
          puntos de vista sobre temas importantes. Los debates sociales bien conducidos 
          permiten que estas diferencias se expresen de manera constructiva, facilitando 
          la comprensión mutua y la búsqueda de consensos que beneficien a toda la 
          sociedad.
          {"\n\n"}
          La participación ciudadana en debates sociales fortalece la democracia, 
          promueve la transparencia en la toma de decisiones y ayuda a construir una 
          sociedad más justa e inclusiva. Es a través del diálogo que podemos superar 
          las divisiones y trabajar por el bien común.
        </Text>
        <Text style={styles.sectionTextAr}>
          المناظرات الاجتماعية أساسية لعمل مجتمع ديمقراطي صحي. من خلال الحوار
          المحترم والبناء، يمكن للمواطنين تبادل الأفكار، ومواجهة وجهات نظر
          مختلفة والعمل معاً نحو حلول مشتركة للمشاكل التي تؤثر على المجتمع.
          {"\n\n"}
          في مجتمع تعددي، من الطبيعي أن توجد آراء ونقاط نظر مختلفة حول
          المواضيع المهمة. المناظرات الاجتماعية المدارة بشكل جيد تسمح
          لهذه الاختلافات بالتعبير عن نفسها بطريقة بناءة، مما يسهل الفهم
          المتبادل والبحث عن إجماع يفيد المجتمع كله.
          {"\n\n"}
          المشاركة المواطنة في المناظرات الاجتماعية تقوي الديمقراطية،
          وتعزز الشفافية في اتخاذ القرارات وتساعد في بناء مجتمع أكثر
          عدالة وشمولية. من خلال الحوار يمكننا تجاوز الانقسامات والعمل
          من أجل الخير العام.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de debates sociales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🗣️ Conceptos de debate:</Text>{"\n"}
          debate = مناظرة{"\n"}
          argumento = حجة{"\n"}
          perspectiva = وجهة نظر{"\n"}
          controversia = جدل{"\n"}
          discusión = مناقشة{"\n"}
          diálogo = حوار{"\n"}
          consenso = إجماع{"\n"}
          disenso = خلاف{"\n"}
          confrontación = مواجهة{"\n"}
          mediación = وساطة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏛️ Democracia y participación:</Text>{"\n"}
          democracia = ديمقراطية{"\n"}
          participación = مشاركة{"\n"}
          ciudadanía = مواطنة{"\n"}
          derechos = حقوق{"\n"}
          deberes = واجبات{"\n"}
          responsabilidad = مسؤولية{"\n"}
          compromiso = التزام{"\n"}
          activismo = ناشطية{"\n"}
          movilización = تحريك{"\n"}
          empoderamiento = تمكين
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📰 Medios y comunicación:</Text>{"\n"}
          medios de comunicación = وسائل الإعلام{"\n"}
          información = معلومات{"\n"}
          desinformación = معلومات خاطئة{"\n"}
          alfabetización mediática = محو الأمية الإعلامية{"\n"}
          pensamiento crítico = التفكير النقدي{"\n"}
          verificación = التحقق{"\n"}
          fuentes = مصادر{"\n"}
          credibilidad = مصداقية{"\n"}
          objetividad = موضوعية{"\n"}
          imparcialidad = حياد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Valores democráticos:</Text>{"\n"}
          tolerancia = تسامح{"\n"}
          respeto = احترام{"\n"}
          libertad = حرية{"\n"}
          igualdad = مساواة{"\n"}
          justicia = عدالة{"\n"}
          solidaridad = تضامن{"\n"}
          inclusión = شمول{"\n"}
          diversidad = تنوع{"\n"}
          pluralismo = تعددية{"\n"}
          cooperación = تعاون
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚖️ Instituciones y procesos:</Text>{"\n"}
          gobierno = حكومة{"\n"}
          parlamento = برلمان{"\n"}
          elecciones = انتخابات{"\n"}
          partidos políticos = أحزاب سياسية{"\n"}
          sociedad civil = مجتمع مدني{"\n"}
          organizaciones = منظمات{"\n"}
          transparencia = شفافية{"\n"}
          rendición de cuentas = محاسبة{"\n"}
          políticas públicas = سياسات عامة{"\n"}
          gobernanza = حكم
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🗣️ مفاهيم المناظرة:</Text>{"\n"}
          مناظرة = debate{"\n"}
          حجة = argumento{"\n"}
          وجهة نظر = perspectiva{"\n"}
          جدل = controversia{"\n"}
          مناقشة = discusión{"\n"}
          حوار = diálogo{"\n"}
          إجماع = consenso{"\n"}
          خلاف = disenso{"\n"}
          مواجهة = confrontación{"\n"}
          وساطة = mediación
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏛️ الديمقراطية والمشاركة:</Text>{"\n"}
          ديمقراطية = democracia{"\n"}
          مشاركة = participación{"\n"}
          مواطنة = ciudadanía{"\n"}
          حقوق = derechos{"\n"}
          واجبات = deberes{"\n"}
          مسؤولية = responsabilidad{"\n"}
          التزام = compromiso{"\n"}
          ناشطية = activismo{"\n"}
          تحريك = movilización{"\n"}
          تمكين = empoderamiento
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📰 الإعلام والتواصل:</Text>{"\n"}
          وسائل الإعلام = medios de comunicación{"\n"}
          معلومات = información{"\n"}
          معلومات خاطئة = desinformación{"\n"}
          محو الأمية الإعلامية = alfabetización mediática{"\n"}
          التفكير النقدي = pensamiento crítico{"\n"}
          التحقق = verificación{"\n"}
          مصادر = fuentes{"\n"}
          مصداقية = credibilidad{"\n"}
          موضوعية = objetividad{"\n"}
          حياد = imparcialidad
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 القيم الديمقراطية:</Text>{"\n"}
          تسامح = tolerancia{"\n"}
          احترام = respeto{"\n"}
          حرية = libertad{"\n"}
          مساواة = igualdad{"\n"}
          عدالة = justicia{"\n"}
          تضامن = solidaridad{"\n"}
          شمول = inclusión{"\n"}
          تنوع = diversidad{"\n"}
          تعددية = pluralismo{"\n"}
          تعاون = cooperación
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚖️ المؤسسات والعمليات:</Text>{"\n"}
          حكومة = gobierno{"\n"}
          برلمان = parlamento{"\n"}
          انتخابات = elecciones{"\n"}
          أحزاب سياسية = partidos políticos{"\n"}
          مجتمع مدني = sociedad civil{"\n"}
          منظمات = organizaciones{"\n"}
          شفافية = transparencia{"\n"}
          محاسبة = rendición de cuentas{"\n"}
          سياسات عامة = políticas públicas{"\n"}
          حكم = gobernanza
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Tipos de debates sociales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🏛️ Debates políticos:</Text>{"\n"}
          • <Text style={styles.benefit}>Elecciones:</Text> Discusiones sobre candidatos y propuestas{"\n"}
          • <Text style={styles.benefit}>Políticas públicas:</Text> Análisis de medidas gubernamentales{"\n"}
          • <Text style={styles.benefit}>Reformas constitucionales:</Text> Cambios en la estructura del Estado{"\n"}
          • <Text style={styles.benefit}>Presupuestos:</Text> Distribución de recursos públicos{"\n"}
          • <Text style={styles.benefit}>Relaciones internacionales:</Text> Política exterior y acuerdos{"\n"}
          • <Text style={styles.benefit}>Seguridad nacional:</Text> Medidas de protección del Estado
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Debates sociales:</Text>{"\n"}
          • <Text style={styles.benefit}>Derechos humanos:</Text> Protección de libertades fundamentales{"\n"}
          • <Text style={styles.benefit}>Igualdad de género:</Text> Equidad entre hombres y mujeres{"\n"}
          • <Text style={styles.benefit}>Inmigración:</Text> Políticas migratorias e integración{"\n"}
          • <Text style={styles.benefit}>Educación:</Text> Calidad y acceso a la enseñanza{"\n"}
          • <Text style={styles.benefit}>Salud pública:</Text> Sistemas sanitarios y prevención{"\n"}
          • <Text style={styles.benefit}>Vivienda:</Text> Acceso a vivienda digna
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 Debates medioambientales:</Text>{"\n"}
          • <Text style={styles.benefit}>Cambio climático:</Text> Medidas contra el calentamiento global{"\n"}
          • <Text style={styles.benefit}>Energías renovables:</Text> Transición energética sostenible{"\n"}
          • <Text style={styles.benefit}>Conservación:</Text> Protección de ecosistemas{"\n"}
          • <Text style={styles.benefit}>Contaminación:</Text> Reducción de emisiones y residuos{"\n"}
          • <Text style={styles.benefit}>Desarrollo sostenible:</Text> Crecimiento respetuoso con el medio{"\n"}
          • <Text style={styles.benefit}>Biodiversidad:</Text> Preservación de especies
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 Debates económicos:</Text>{"\n"}
          • <Text style={styles.benefit}>Desigualdad económica:</Text> Distribución de la riqueza{"\n"}
          • <Text style={styles.benefit}>Empleo:</Text> Creación de puestos de trabajo{"\n"}
          • <Text style={styles.benefit}>Salarios:</Text> Remuneración justa del trabajo{"\n"}
          • <Text style={styles.benefit}>Impuestos:</Text> Sistema fiscal equitativo{"\n"}
          • <Text style={styles.benefit}>Pensiones:</Text> Sistema de jubilación sostenible{"\n"}
          • <Text style={styles.benefit}>Comercio internacional:</Text> Acuerdos comerciales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 Debates tecnológicos:</Text>{"\n"}
          • <Text style={styles.benefit}>Inteligencia artificial:</Text> Impacto de la IA en la sociedad{"\n"}
          • <Text style={styles.benefit}>Privacidad digital:</Text> Protección de datos personales{"\n"}
          • <Text style={styles.benefit}>Redes sociales:</Text> Influencia en la opinión pública{"\n"}
          • <Text style={styles.benefit}>Automatización:</Text> Impacto en el empleo{"\n"}
          • <Text style={styles.benefit}>Desinformación:</Text> Combate de noticias falsas{"\n"}
          • <Text style={styles.benefit}>Brecha digital:</Text> Acceso a tecnologías
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🏛️ المناظرات السياسية:</Text>{"\n"}
          • <Text style={styles.benefit}>الانتخابات:</Text> مناقشات حول المرشحين والمقترحات{"\n"}
          • <Text style={styles.benefit}>السياسات العامة:</Text> تحليل الإجراءات الحكومية{"\n"}
          • <Text style={styles.benefit}>الإصلاحات الدستورية:</Text> تغييرات في هيكل الدولة{"\n"}
          • <Text style={styles.benefit}>الميزانيات:</Text> توزيع الموارد العامة{"\n"}
          • <Text style={styles.benefit}>العلاقات الدولية:</Text> السياسة الخارجية والاتفاقات{"\n"}
          • <Text style={styles.benefit}>الأمن القومي:</Text> إجراءات حماية الدولة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 المناظرات الاجتماعية:</Text>{"\n"}
          • <Text style={styles.benefit}>حقوق الإنسان:</Text> حماية الحريات الأساسية{"\n"}
          • <Text style={styles.benefit}>مساواة الجنسين:</Text> الإنصاف بين الرجال والنساء{"\n"}
          • <Text style={styles.benefit}>الهجرة:</Text> السياسات الهجرية والاندماج{"\n"}
          • <Text style={styles.benefit}>التعليم:</Text> جودة وإمكانية الوصول للتعليم{"\n"}
          • <Text style={styles.benefit}>الصحة العامة:</Text> الأنظمة الصحية والوقاية{"\n"}
          • <Text style={styles.benefit}>الإسكان:</Text> إمكانية الوصول لسكن لائق
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 المناظرات البيئية:</Text>{"\n"}
          • <Text style={styles.benefit}>التغير المناخي:</Text> إجراءات ضد الاحترار العالمي{"\n"}
          • <Text style={styles.benefit}>الطاقات المتجددة:</Text> التحول الطاقي المستدام{"\n"}
          • <Text style={styles.benefit}>الحفظ:</Text> حماية النظم البيئية{"\n"}
          • <Text style={styles.benefit}>التلوث:</Text> تقليل الانبعاثات والنفايات{"\n"}
          • <Text style={styles.benefit}>التنمية المستدامة:</Text> نمو محترم للبيئة{"\n"}
          • <Text style={styles.benefit}>التنوع البيولوجي:</Text> الحفاظ على الأنواع
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 المناظرات الاقتصادية:</Text>{"\n"}
          • <Text style={styles.benefit}>عدم المساواة الاقتصادية:</Text> توزيع الثروة{"\n"}
          • <Text style={styles.benefit}>العمالة:</Text> خلق فرص العمل{"\n"}
          • <Text style={styles.benefit}>الأجور:</Text> أجر عادل للعمل{"\n"}
          • <Text style={styles.benefit}>الضرائب:</Text> نظام ضريبي عادل{"\n"}
          • <Text style={styles.benefit}>المعاشات:</Text> نظام تقاعد مستدام{"\n"}
          • <Text style={styles.benefit}>التجارة الدولية:</Text> الاتفاقات التجارية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 المناظرات التكنولوجية:</Text>{"\n"}
          • <Text style={styles.benefit}>الذكاء الاصطناعي:</Text> تأثير الذكاء الاصطناعي في المجتمع{"\n"}
          • <Text style={styles.benefit}>الخصوصية الرقمية:</Text> حماية البيانات الشخصية{"\n"}
          • <Text style={styles.benefit}>الشبكات الاجتماعية:</Text> التأثير في الرأي العام{"\n"}
          • <Text style={styles.benefit}>الأتمتة:</Text> التأثير في العمالة{"\n"}
          • <Text style={styles.benefit}>المعلومات الخاطئة:</Text> مكافحة الأخبار الكاذبة{"\n"}
          • <Text style={styles.benefit}>الفجوة الرقمية:</Text> إمكانية الوصول للتكنولوجيات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤝 Habilidades para debates constructivos</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>👂 Habilidades de escucha:</Text>{"\n"}
          • <Text style={styles.benefit}>Escucha activa:</Text> Prestar atención completa al interlocutor{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Comprender las emociones y perspectivas ajenas{"\n"}
          • <Text style={styles.benefit}>Preguntas clarificadoras:</Text> Solicitar aclaraciones cuando sea necesario{"\n"}
          • <Text style={styles.benefit}>Resumen:</Text> Repetir los puntos principales para confirmar comprensión{"\n"}
          • <Text style={styles.benefit}>Validación:</Text> Reconocer los sentimientos y experiencias del otro{"\n"}
          • <Text style={styles.benefit}>Paciencia:</Text> Dar tiempo para que se expresen completamente
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💬 Habilidades de comunicación:</Text>{"\n"}
          • <Text style={styles.benefit}>Claridad:</Text> Expresar ideas de manera comprensible{"\n"}
          • <Text style={styles.benefit}>Concisión:</Text> Ser directo y evitar redundancias{"\n"}
          • <Text style={styles.benefit}>Respeto:</Text> Mantener un tono cordial y constructivo{"\n"}
          • <Text style={styles.benefit}>Ejemplos:</Text> Ilustrar argumentos con casos concretos{"\n"}
          • <Text style={styles.benefit}>Estructura:</Text> Organizar ideas de manera lógica{"\n"}
          • <Text style={styles.benefit}>Adaptación:</Text> Ajustar el lenguaje al público
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🧠 Habilidades de pensamiento:</Text>{"\n"}
          • <Text style={styles.benefit}>Análisis crítico:</Text> Evaluar información de manera objetiva{"\n"}
          • <Text style={styles.benefit}>Pensamiento lógico:</Text> Construir argumentos coherentes{"\n"}
          • <Text style={styles.benefit}>Creatividad:</Text> Buscar soluciones innovadoras{"\n"}
          • <Text style={styles.benefit}>Flexibilidad:</Text> Estar dispuesto a cambiar de opinión{"\n"}
          • <Text style={styles.benefit}>Perspectiva múltiple:</Text> Considerar diferentes ángulos{"\n"}
          • <Text style={styles.benefit}>Reflexión:</Text> Pensar antes de responder
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤲 Habilidades de colaboración:</Text>{"\n"}
          • <Text style={styles.benefit}>Cooperación:</Text> Trabajar hacia objetivos comunes{"\n"}
          • <Text style={styles.benefit}>Negociación:</Text> Buscar acuerdos mutuamente beneficiosos{"\n"}
          • <Text style={styles.benefit}>Mediación:</Text> Ayudar a resolver conflictos{"\n"}
          • <Text style={styles.benefit}>Consenso:</Text> Buscar acuerdos generales{"\n"}
          • <Text style={styles.benefit}>Inclusión:</Text> Asegurar que todas las voces sean escuchadas{"\n"}
          • <Text style={styles.benefit}>Compromiso:</Text> Estar dispuesto a ceder en algunos puntos
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>👂 مهارات الاستماع:</Text>{"\n"}
          • <Text style={styles.benefit}>الاستماع النشط:</Text> إعطاء انتباه كامل للمتحدث{"\n"}
          • <Text style={styles.benefit}>التعاطف:</Text> فهم المشاعر ووجهات نظر الآخرين{"\n"}
          • <Text style={styles.benefit}>أسئلة توضيحية:</Text> طلب توضيحات عند الحاجة{"\n"}
          • <Text style={styles.benefit}>ملخص:</Text> تكرار النقاط الرئيسية لتأكيد الفهم{"\n"}
          • <Text style={styles.benefit}>تأكيد:</Text> الاعتراف بمشاعر وتجارب الآخر{"\n"}
          • <Text style={styles.benefit}>صبر:</Text> إعطاء وقت للتعبير الكامل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💬 مهارات التواصل:</Text>{"\n"}
          • <Text style={styles.benefit}>وضوح:</Text> التعبير عن الأفكار بطريقة مفهومة{"\n"}
          • <Text style={styles.benefit}>إيجاز:</Text> أن تكون مباشراً وتجنب التكرار{"\n"}
          • <Text style={styles.benefit}>احترام:</Text> الحفاظ على نبرة ودية وبناءة{"\n"}
          • <Text style={styles.benefit}>أمثلة:</Text> توضيح الحجج بحالات ملموسة{"\n"}
          • <Text style={styles.benefit}>هيكلة:</Text> تنظيم الأفكار بطريقة منطقية{"\n"}
          • <Text style={styles.benefit}>تكيف:</Text> تعديل اللغة للجمهور
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🧠 مهارات التفكير:</Text>{"\n"}
          • <Text style={styles.benefit}>تحليل نقدي:</Text> تقييم المعلومات بطريقة موضوعية{"\n"}
          • <Text style={styles.benefit}>تفكير منطقي:</Text> بناء حجج متماسكة{"\n"}
          • <Text style={styles.benefit}>إبداع:</Text> البحث عن حلول مبتكرة{"\n"}
          • <Text style={styles.benefit}>مرونة:</Text> الاستعداد لتغيير الرأي{"\n"}
          • <Text style={styles.benefit}>منظور متعدد:</Text> النظر في زوايا مختلفة{"\n"}
          • <Text style={styles.benefit}>تأمل:</Text> التفكير قبل الرد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤲 مهارات التعاون:</Text>{"\n"}
          • <Text style={styles.benefit}>تعاون:</Text> العمل نحو أهداف مشتركة{"\n"}
          • <Text style={styles.benefit}>تفاوض:</Text> البحث عن اتفاقات مفيدة للطرفين{"\n"}
          • <Text style={styles.benefit}>وساطة:</Text> المساعدة في حل النزاعات{"\n"}
          • <Text style={styles.benefit}>إجماع:</Text> البحث عن اتفاقات عامة{"\n"}
          • <Text style={styles.benefit}>شمول:</Text> ضمان سماع جميع الأصوات{"\n"}
          • <Text style={styles.benefit}>تنازل:</Text> الاستعداد للتنازل في بعض النقاط
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre debates sociales</Text>
        <Text style={styles.dialogo}>
          — ¿Qué opinas sobre la importancia de la participación ciudadana en la toma de decisiones políticas?{"\n\n"}
          — En mi opinión, la participación ciudadana es fundamental para una democracia saludable. Sin embargo, creo que debe ir más allá del simple voto y incluir el diálogo constructivo, la educación cívica y la participación en organizaciones comunitarias. Solo así podemos asegurar que las decisiones políticas reflejen realmente las necesidades y aspiraciones de la sociedad.{"\n\n"}
          — ¿Cómo crees que podemos superar la polarización política actual?{"\n\n"}
          — La polarización es un desafío serio, pero creo que se puede superar a través del diálogo respetuoso, la educación cívica y el fomento de espacios donde personas con diferentes opiniones puedan encontrarse y conversar. También es importante promover el pensamiento crítico y la alfabetización mediática para que las personas puedan evaluar la información de manera objetiva.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما رأيك في أهمية المشاركة المواطنة في اتخاذ القرارات السياسية؟{"\n\n"}
          — في رأيي، المشاركة المواطنة أساسية لديمقراطية صحية. لكنني أعتقد أنها يجب أن تتجاوز مجرد التصويت وتشمل الحوار البناء، التربية المدنية والمشاركة في المنظمات المجتمعية. فقط هكذا يمكننا ضمان أن القرارات السياسية تعكس حقاً احتياجات وتطلعات المجتمع.{"\n\n"}
          — كيف تعتقد أننا يمكن أن نتجاوز الاستقطاب السياسي الحالي؟{"\n\n"}
          — الاستقطاب تحدٍ خطير، لكنني أعتقد أنه يمكن تجاوزه من خلال الحوار المحترم، التربية المدنية وتشجيع المساحات حيث يمكن لأشخاص بآراء مختلفة أن يلتقوا ويتحدثوا. من المهم أيضاً تعزيز التفكير النقدي ومحو الأمية الإعلامية حتى يتمكن الناس من تقييم المعلومات بطريقة موضوعية.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Ejercicios Interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
      </View>

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
