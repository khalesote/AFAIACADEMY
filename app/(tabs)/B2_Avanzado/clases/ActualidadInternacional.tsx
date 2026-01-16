import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Actualidad Internacional - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es la función principal de un corresponsal internacional?",
    opciones: ["Informar sobre eventos locales únicamente", "Cubrir noticias desde diferentes países y contextos", "Solo escribir artículos de opinión", "Administrar redes sociales"],
    respuesta_correcta: "Cubrir noticias desde diferentes países y contextos"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa el término 'fake news'?",
    opciones: ["Noticias muy importantes", "Información falsa o engañosa difundida como noticia", "Noticias deportivas", "Información científica"],
    respuesta_correcta: "Información falsa o engañosa difundida como noticia"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es el objetivo principal de la diplomacia internacional?",
    opciones: ["Ganar guerras", "Resolver conflictos y mantener relaciones pacíficas entre países", "Imponer ideologías", "Controlar recursos naturales"],
    respuesta_correcta: "Resolver conflictos y mantener relaciones pacíficas entre países"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué organización internacional se encarga de mantener la paz mundial?",
    opciones: ["La Unión Europea", "Las Naciones Unidas", "La OTAN", "La OMS"],
    respuesta_correcta: "Las Naciones Unidas"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'globalización'?",
    opciones: ["Proceso de integración económica y cultural a nivel mundial", "Solo comercio internacional", "Migración de personas", "Cambio climático"],
    respuesta_correcta: "Proceso de integración económica y cultural a nivel mundial"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es el papel de los medios de comunicación en la sociedad?",
    opciones: ["Solo entretener", "Informar, educar y formar opinión pública", "Vender productos", "Controlar gobiernos"],
    respuesta_correcta: "Informar, educar y formar opinión pública"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es una 'cumbre internacional'?",
    opciones: ["Una montaña alta", "Reunión de líderes mundiales para tratar temas importantes", "Conferencia de prensa", "Espectáculo deportivo"],
    respuesta_correcta: "Reunión de líderes mundiales para tratar temas importantes"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'cooperación internacional'?",
    opciones: ["Competencia entre países", "Colaboración entre naciones para resolver problemas comunes", "Guerra entre países", "Aislamiento de países"],
    respuesta_correcta: "Colaboración entre naciones para resolver problemas comunes"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es la importancia de verificar las fuentes de información?",
    opciones: ["Evitar la desinformación y garantizar la credibilidad", "Solo para periodistas", "Perder tiempo", "No es importante"],
    respuesta_correcta: "Evitar la desinformación y garantizar la credibilidad"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el 'periodismo ciudadano'?",
    opciones: ["Periodistas profesionales", "Personas comunes que reportan noticias usando medios digitales", "Gobiernos informando", "Agencias de noticias"],
    respuesta_correcta: "Personas comunes que reportan noticias usando medios digitales"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'impacto global'?",
    opciones: ["Efecto que tiene un evento en todo el mundo", "Solo efectos locales", "Cambio climático", "Economía mundial"],
    respuesta_correcta: "Efecto que tiene un evento en todo el mundo"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es el papel de las redes sociales en las noticias actuales?",
    opciones: ["Solo entretenimiento", "Difundir información rápidamente y facilitar la participación ciudadana", "Reemplazar medios tradicionales", "Controlar la información"],
    respuesta_correcta: "Difundir información rápidamente y facilitar la participación ciudadana"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un 'acuerdo bilateral'?",
    opciones: ["Acuerdo entre tres países", "Pacto entre dos naciones", "Acuerdo comercial", "Tratado de paz"],
    respuesta_correcta: "Pacto entre dos naciones"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'conflicto internacional'?",
    opciones: ["Desacuerdo o enfrentamiento entre países", "Solo guerra", "Competencia deportiva", "Diferencias culturales"],
    respuesta_correcta: "Desacuerdo o enfrentamiento entre países"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es la función de un embajador?",
    opciones: ["Representar a su país en otro país", "Solo viajar", "Hacer turismo", "Estudiar idiomas"],
    respuesta_correcta: "Representar a su país en otro país"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'medios de comunicación'?",
    opciones: ["Canales para transmitir información y noticias", "Solo televisión", "Internet únicamente", "Periódicos impresos"],
    respuesta_correcta: "Canales para transmitir información y noticias"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la 'libertad de prensa'?",
    opciones: ["Derecho de los medios a informar sin censura gubernamental", "Solo para periodistas", "Control de información", "Regulación de medios"],
    respuesta_correcta: "Derecho de los medios a informar sin censura gubernamental"
  },
  
  // Ejercicio 18: Relacionar conceptos
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto con su definición correcta:",
    pares: [
      { izquierda: "Corresponsal", derecha: "Periodista que informa desde el extranjero" },
      { izquierda: "Diplomacia", derecha: "Arte de negociar entre naciones" },
      { izquierda: "Cumbre", derecha: "Reunión de líderes mundiales" },
      { izquierda: "Fake news", derecha: "Información falsa difundida como noticia" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada organización con su función principal:",
    pares: [
      { izquierda: "ONU", derecha: "Mantener la paz mundial" },
      { izquierda: "OMS", derecha: "Salud pública internacional" },
      { izquierda: "UE", derecha: "Integración europea" },
      { izquierda: "OTAN", derecha: "Alianza militar occidental" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada término con su significado:",
    pares: [
      { izquierda: "Globalización", derecha: "Integración económica y cultural mundial" },
      { izquierda: "Cooperación", derecha: "Colaboración entre países" },
      { izquierda: "Mediación", derecha: "Intervención para resolver conflictos" },
      { izquierda: "Alianza", derecha: "Acuerdo de colaboración entre naciones" }
    ]
  }
];

export default function ActualidadInternacional() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[7] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 7);
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
        <Text style={styles.title}>📰 Actualidad Internacional</Text>
        <Text style={styles.titleAr}>الأحداث الدولية</Text>
        <Text style={styles.subtitle}>Medios de comunicación y sociedad</Text>
        <Text style={styles.subtitleAr}>وسائل الإعلام والمجتمع</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Importancia de la actualidad internacional</Text>
        <Text style={styles.sectionText}>
          La actualidad internacional es fundamental para comprender el mundo en el que vivimos y 
          desarrollar una visión global de los acontecimientos que afectan a la humanidad. En la 
          era de la globalización, ningún país puede aislarse completamente de los eventos 
          internacionales, ya que estos tienen repercusiones directas en la economía, la política, 
          la sociedad y la vida cotidiana de las personas.
          {"\n\n"}
          Los medios de comunicación juegan un papel crucial en la difusión de información 
          internacional, permitiendo que los ciudadanos estén informados sobre acontecimientos 
          importantes que ocurren en diferentes partes del mundo. Esta información es esencial 
          para formar opiniones fundamentadas y participar activamente en debates sociales y 
          políticos.
          {"\n\n"}
          La comprensión de la actualidad internacional también es fundamental para el desarrollo 
          de habilidades interculturales, la promoción de la tolerancia y el respeto hacia otras 
          culturas, y la construcción de una sociedad más inclusiva y solidaria.
        </Text>
        <Text style={styles.sectionTextAr}>
          الأحداث الدولية أساسية لفهم العالم الذي نعيش فيه وتطوير
          رؤية عالمية للأحداث التي تؤثر على الإنسانية. في عصر العولمة،
          لا يمكن لأي بلد أن يعزل نفسه تماماً عن الأحداث الدولية، لأن
          هذه لها تداعيات مباشرة على الاقتصاد والسياسة والمجتمع
          والحياة اليومية للأشخاص.
          {"\n\n"}
          تلعب وسائل الإعلام دوراً حاسماً في نشر المعلومات الدولية،
          مما يتيح للمواطنين أن يكونوا على علم بالأحداث المهمة التي
          تحدث في أجزاء مختلفة من العالم. هذه المعلومات أساسية
          لتشكيل آراء مدروسة والمشاركة بنشاط في النقاشات الاجتماعية
          والسياسية.
          {"\n\n"}
          فهم الأحداث الدولية أساسي أيضاً لتطوير المهارات بين الثقافات،
          وتعزيز التسامح والاحترام تجاه الثقافات الأخرى، وبناء
          مجتمع أكثر شمولية وتضامناً.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de la actualidad internacional</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>📰 Medios de comunicación:</Text>{"\n"}
          noticia = خبر{"\n"}
          corresponsal = مراسل{"\n"}
          titular = عنوان رئيسي{"\n"}
          red social = شبكة اجتماعية{"\n"}
          fake news = أخبار مزيفة{"\n"}
          periodismo ciudadano = صحافة المواطن{"\n"}
          libertad de prensa = حرية الصحافة{"\n"}
          fuente = مصدر{"\n"}
          verificación = تحقق{"\n"}
          credibilidad = مصداقية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Diplomacia y relaciones internacionales:</Text>{"\n"}
          diplomacia = دبلوماسية{"\n"}
          embajador = سفير{"\n"}
          consulado = قنصلية{"\n"}
          tratado = معاهدة{"\n"}
          acuerdo bilateral = اتفاق ثنائي{"\n"}
          cumbre internacional = قمة دولية{"\n"}
          mediación = وساطة{"\n"}
          negociación = مفاوضات{"\n"}
          alianza = تحالف{"\n"}
          cooperación = تعاون
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚔️ Conflictos y paz:</Text>{"\n"}
          conflicto = صراع{"\n"}
          guerra = حرب{"\n"}
          paz = سلام{"\n"}
          resolución = حل{"\n"}
          acuerdo = اتفاق{"\n"}
          tregua = هدنة{"\n"}
          armisticio = هدنة{"\n"}
          reconciliación = مصالحة{"\n"}
          diálogo = حوار{"\n"}
          consenso = إجماع
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌐 Organizaciones internacionales:</Text>{"\n"}
          ONU = الأمم المتحدة{"\n"}
          UE = الاتحاد الأوروبي{"\n"}
          OTAN = حلف الناتو{"\n"}
          OMS = منظمة الصحة العالمية{"\n"}
          UNESCO = اليونسكو{"\n"}
          UNICEF = اليونيسيف{"\n"}
          FAO = منظمة الأغذية والزراعة{"\n"}
          OIT = منظمة العمل الدولية{"\n"}
          FMI = صندوق النقد الدولي{"\n"}
          Banco Mundial = البنك الدولي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💥 Impacto y consecuencias:</Text>{"\n"}
          impacto = تأثير{"\n"}
          consecuencias = عواقب{"\n"}
          repercusiones = تداعيات{"\n"}
          efectos = آثار{"\n"}
          influencia = تأثير{"\n"}
          cambio = تغيير{"\n"}
          transformación = تحول{"\n"}
          evolución = تطور{"\n"}
          progreso = تقدم{"\n"}
          desarrollo = تنمية
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>📰 وسائل الإعلام:</Text>{"\n"}
          خبر = noticia{"\n"}
          مراسل = corresponsal{"\n"}
          عنوان رئيسي = titular{"\n"}
          شبكة اجتماعية = red social{"\n"}
          أخبار مزيفة = fake news{"\n"}
          صحافة المواطن = periodismo ciudadano{"\n"}
          حرية الصحافة = libertad de prensa{"\n"}
          مصدر = fuente{"\n"}
          تحقق = verificación{"\n"}
          مصداقية = credibilidad
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 الدبلوماسية والعلاقات الدولية:</Text>{"\n"}
          دبلوماسية = diplomacia{"\n"}
          سفير = embajador{"\n"}
          قنصلية = consulado{"\n"}
          معاهدة = tratado{"\n"}
          اتفاق ثنائي = acuerdo bilateral{"\n"}
          قمة دولية = cumbre internacional{"\n"}
          وساطة = mediación{"\n"}
          مفاوضات = negociación{"\n"}
          تحالف = alianza{"\n"}
          تعاون = cooperación
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚔️ الصراعات والسلام:</Text>{"\n"}
          صراع = conflicto{"\n"}
          حرب = guerra{"\n"}
          سلام = paz{"\n"}
          حل = resolución{"\n"}
          اتفاق = acuerdo{"\n"}
          هدنة = tregua{"\n"}
          مصالحة = reconciliación{"\n"}
          حوار = diálogo{"\n"}
          إجماع = consenso
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌐 المنظمات الدولية:</Text>{"\n"}
          الأمم المتحدة = ONU{"\n"}
          الاتحاد الأوروبي = UE{"\n"}
          حلف الناتو = OTAN{"\n"}
          منظمة الصحة العالمية = OMS{"\n"}
          اليونسكو = UNESCO{"\n"}
          اليونيسيف = UNICEF{"\n"}
          منظمة الأغذية والزراعة = FAO{"\n"}
          منظمة العمل الدولية = OIT{"\n"}
          صندوق النقد الدولي = FMI{"\n"}
          البنك الدولي = Banco Mundial
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💥 التأثير والعواقب:</Text>{"\n"}
          تأثير = impacto{"\n"}
          عواقب = consecuencias{"\n"}
          تداعيات = repercusiones{"\n"}
          آثار = efectos{"\n"}
          تغيير = cambio{"\n"}
          تحول = transformación{"\n"}
          تطور = evolución{"\n"}
          تقدم = progreso{"\n"}
          تنمية = desarrollo
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Tipos de medios de comunicación y su función</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>📺 Medios tradicionales:</Text>{"\n"}
          • <Text style={styles.benefit}>Televisión:</Text> Información audiovisual con gran alcance{"\n"}
          • <Text style={styles.benefit}>Radio:</Text> Información rápida y accesible{"\n"}
          • <Text style={styles.benefit}>Prensa escrita:</Text> Análisis profundo y detallado{"\n"}
          • <Text style={styles.benefit}>Revistas:</Text> Información especializada y análisis{"\n"}
          • <Text style={styles.benefit}>Agencias de noticias:</Text> Fuente primaria de información{"\n"}
          • <Text style={styles.benefit}>Documentales:</Text> Información educativa y cultural
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💻 Medios digitales:</Text>{"\n"}
          • <Text style={styles.benefit}>Internet:</Text> Información instantánea y global{"\n"}
          • <Text style={styles.benefit}>Redes sociales:</Text> Difusión rápida y participación ciudadana{"\n"}
          • <Text style={styles.benefit}>Blogs:</Text> Opiniones personales y análisis independientes{"\n"}
          • <Text style={styles.benefit}>Podcasts:</Text> Información en formato audio{"\n"}
          • <Text style={styles.benefit}>Videoblogs:</Text> Información audiovisual personal{"\n"}
          • <Text style={styles.benefit}>Aplicaciones móviles:</Text> Información accesible en cualquier momento
          {"\n\n"}
          <Text style={styles.subtitle}>📊 Medios especializados:</Text>{"\n"}
          • <Text style={styles.benefit}>Medios económicos:</Text> Información sobre economía y finanzas{"\n"}
          • <Text style={styles.benefit}>Medios deportivos:</Text> Información sobre deportes{"\n"}
          • <Text style={styles.benefit}>Medios científicos:</Text> Información sobre ciencia y tecnología{"\n"}
          • <Text style={styles.benefit}>Medios culturales:</Text> Información sobre arte y cultura{"\n"}
          • <Text style={styles.benefit}>Medios políticos:</Text> Información sobre política{"\n"}
          • <Text style={styles.benefit}>Medios internacionales:</Text> Información sobre asuntos globales
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📺 الوسائل التقليدية:</Text>{"\n"}
          • <Text style={styles.benefit}>التلفزيون:</Text> معلومات سمعية بصرية بنطاق واسع{"\n"}
          • <Text style={styles.benefit}>الراديو:</Text> معلومات سريعة ومتاحة{"\n"}
          • <Text style={styles.benefit}>الصحافة المكتوبة:</Text> تحليل عميق ومفصل{"\n"}
          • <Text style={styles.benefit}>المجلات:</Text> معلومات متخصصة وتحليل{"\n"}
          • <Text style={styles.benefit}>وكالات الأنباء:</Text> مصدر أساسي للمعلومات{"\n"}
          • <Text style={styles.benefit}>الوثائقيات:</Text> معلومات تعليمية وثقافية
          {"\n\n"}
          <Text style={styles.subtitle}>💻 الوسائل الرقمية:</Text>{"\n"}
          • <Text style={styles.benefit}>الإنترنت:</Text> معلومات فورية وعالمية{"\n"}
          • <Text style={styles.benefit}>الشبكات الاجتماعية:</Text> نشر سريع ومشاركة المواطنين{"\n"}
          • <Text style={styles.benefit}>المدونات:</Text> آراء شخصية وتحليلات مستقلة{"\n"}
          • <Text style={styles.benefit}>البودكاست:</Text> معلومات بصيغة صوتية{"\n"}
          • <Text style={styles.benefit}>الفيديوهات:</Text> معلومات سمعية بصرية شخصية{"\n"}
          • <Text style={styles.benefit}>تطبيقات الهاتف:</Text> معلومات متاحة في أي وقت
          {"\n\n"}
          <Text style={styles.subtitle}>📊 الوسائل المتخصصة:</Text>{"\n"}
          • <Text style={styles.benefit}>الوسائل الاقتصادية:</Text> معلومات عن الاقتصاد والمالية{"\n"}
          • <Text style={styles.benefit}>الوسائل الرياضية:</Text> معلومات عن الرياضة{"\n"}
          • <Text style={styles.benefit}>الوسائل العلمية:</Text> معلومات عن العلوم والتكنولوجيا{"\n"}
          • <Text style={styles.benefit}>الوسائل الثقافية:</Text> معلومات عن الفن والثقافة{"\n"}
          • <Text style={styles.benefit}>الوسائل السياسية:</Text> معلومات عن السياسة{"\n"}
          • <Text style={styles.benefit}>الوسائل الدولية:</Text> معلومات عن الشؤون العالمية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 Desafíos de la información en la era digital</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🚨 Desinformación y fake news:</Text>{"\n"}
          • <Text style={styles.benefit}>Propagación rápida:</Text> Las noticias falsas se difunden más rápido que las verdaderas{"\n"}
          • <Text style={styles.benefit}>Algoritmos de redes sociales:</Text> Favorecen contenido emocional y polémico{"\n"}
          • <Text style={styles.benefit}>Cámaras de eco:</Text> Los usuarios solo ven información que confirma sus creencias{"\n"}
          • <Text style={styles.benefit}>Bots y cuentas falsas:</Text> Difunden información manipulada{"\n"}
          • <Text style={styles.benefit}>Deepfakes:</Text> Videos y audios falsos muy realistas{"\n"}
          • <Text style={styles.benefit}>Manipulación política:</Text> Uso de información falsa para influir en elecciones
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 Verificación de fuentes:</Text>{"\n"}
          • <Text style={styles.benefit}>Fact-checking:</Text> Verificación de hechos antes de compartir{"\n"}
          • <Text style={styles.benefit}>Fuentes múltiples:</Text> Contrastar información en diferentes medios{"\n"}
          • <Text style={styles.benefit}>Credibilidad de fuentes:</Text> Evaluar la reputación de los medios{"\n"}
          • <Text style={styles.benefit}>Fecha de publicación:</Text> Verificar que la información sea actual{"\n"}
          • <Text style={styles.benefit}>Contexto completo:</Text> Leer artículos completos, no solo titulares{"\n"}
          • <Text style={styles.benefit}>Pensamiento crítico:</Text> Cuestionar la información antes de creerla
          {"\n\n"}
          <Text style={styles.subtitle}>📱 Alfabetización mediática:</Text>{"\n"}
          • <Text style={styles.benefit}>Educación digital:</Text> Enseñar a evaluar información online{"\n"}
          • <Text style={styles.benefit}>Pensamiento crítico:</Text> Desarrollar habilidades de análisis{"\n"}
          • <Text style={styles.benefit}>Responsabilidad compartida:</Text> Verificar antes de compartir{"\n"}
          • <Text style={styles.benefit}>Herramientas de verificación:</Text> Usar recursos para fact-checking{"\n"}
          • <Text style={styles.benefit}>Diversidad de fuentes:</Text> Consumir información de diferentes perspectivas{"\n"}
          • <Text style={styles.benefit}>Participación activa:</Text> Contribuir a la calidad de la información
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🚨 التضليل والأخبار المزيفة:</Text>{"\n"}
          • <Text style={styles.benefit}>انتشار سريع:</Text> الأخبار المزيفة تنتشر أسرع من الحقيقية{"\n"}
          • <Text style={styles.benefit}>خوارزميات الشبكات الاجتماعية:</Text> تفضل المحتوى العاطفي والمثير للجدل{"\n"}
          • <Text style={styles.benefit}>غرف الصدى:</Text> المستخدمون يرون فقط معلومات تؤكد معتقداتهم{"\n"}
          • <Text style={styles.benefit}>الروبوتات والحسابات المزيفة:</Text> تنشر معلومات محرفة{"\n"}
          • <Text style={styles.benefit}>التزييف العميق:</Text> فيديوهات وملفات صوتية مزيفة واقعية جداً{"\n"}
          • <Text style={styles.benefit}>التلاعب السياسي:</Text> استخدام معلومات مزيفة للتأثير على الانتخابات
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 التحقق من المصادر:</Text>{"\n"}
          • <Text style={styles.benefit}>فحص الحقائق:</Text> التحقق من الحقائق قبل المشاركة{"\n"}
          • <Text style={styles.benefit}>مصادر متعددة:</Text> مقارنة المعلومات في وسائل مختلفة{"\n"}
          • <Text style={styles.benefit}>مصداقية المصادر:</Text> تقييم سمعة الوسائل{"\n"}
          • <Text style={styles.benefit}>تاريخ النشر:</Text> التحقق من أن المعلومات حديثة{"\n"}
          • <Text style={styles.benefit}>السياق الكامل:</Text> قراءة المقالات كاملة، وليس العناوين فقط{"\n"}
          • <Text style={styles.benefit}>التفكير النقدي:</Text> التشكيك في المعلومات قبل تصديقها
          {"\n\n"}
          <Text style={styles.subtitle}>📱 محو الأمية الإعلامية:</Text>{"\n"}
          • <Text style={styles.benefit}>التعليم الرقمي:</Text> تعليم تقييم المعلومات عبر الإنترنت{"\n"}
          • <Text style={styles.benefit}>التفكير النقدي:</Text> تطوير مهارات التحليل{"\n"}
          • <Text style={styles.benefit}>المسؤولية المشتركة:</Text> التحقق قبل المشاركة{"\n"}
          • <Text style={styles.benefit}>أدوات التحقق:</Text> استخدام موارد فحص الحقائق{"\n"}
          • <Text style={styles.benefit}>تنوع المصادر:</Text> استهلاك معلومات من وجهات نظر مختلفة{"\n"}
          • <Text style={styles.benefit}>المشاركة النشطة:</Text> المساهمة في جودة المعلومات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre actualidad internacional</Text>
        <Text style={styles.dialogo}>
          — ¿Qué opinas sobre la cooperación internacional en tiempos de crisis? ¿Crees que los países deberían priorizar sus intereses nacionales o la colaboración global?{"\n\n"}
          — En mi opinión, la cooperación internacional es fundamental, especialmente en crisis globales como la pandemia o el cambio climático. Aunque cada país tiene sus intereses, los desafíos actuales requieren soluciones colectivas. Sin embargo, también entiendo que algunos países prioricen su soberanía nacional.{"\n\n"}
          — ¿Cómo crees que los medios de comunicación influyen en la percepción de estos temas internacionales?{"\n\n"}
          — Los medios tienen una responsabilidad enorme. Pueden tanto informar objetivamente como manipular la opinión pública. Es crucial que los ciudadanos desarrollen pensamiento crítico y verifiquen las fuentes antes de formarse una opinión sobre temas complejos como las relaciones internacionales.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما رأيك في التعاون الدولي في أوقات الأزمات؟ هل تعتقد أن الدول يجب أن تفضل مصالحها الوطنية أم التعاون العالمي؟{"\n\n"}
          — في رأيي، التعاون الدولي أساسي، خاصة في الأزمات العالمية مثل الجائحة أو تغير المناخ. رغم أن كل دولة لها مصالحها، التحديات الحالية تتطلب حلولاً جماعية. لكنني أفهم أيضاً أن بعض الدول تفضل سيادتها الوطنية.{"\n\n"}
          — كيف تعتقد أن وسائل الإعلام تؤثر على إدراك هذه المواضيع الدولية؟{"\n\n"}
          — للوسائل مسؤولية هائلة. يمكنها إما إعلام موضوعي أو التلاعب بالرأي العام. من الضروري أن يطور المواطنون التفكير النقدي والتحقق من المصادر قبل تشكيل رأي حول مواضيع معقدة مثل العلاقات الدولية.
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
