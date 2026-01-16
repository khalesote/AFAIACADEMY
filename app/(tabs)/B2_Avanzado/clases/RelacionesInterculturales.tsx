import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Relaciones Interculturales - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué son las relaciones interculturales?",
    opciones: ["Solo relaciones entre países", "Interacciones entre personas de diferentes culturas", "Solo viajes", "Solo intercambios"],
    respuesta_correcta: "Interacciones entre personas de diferentes culturas"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la empatía intercultural?",
    opciones: ["Solo sentir", "Capacidad de comprender y compartir sentimientos de otras culturas", "Solo simpatizar", "Solo entender"],
    respuesta_correcta: "Capacidad de comprender y compartir sentimientos de otras culturas"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un prejuicio cultural?",
    opciones: ["Solo una opinión", "Juicio negativo preconcebido sobre una cultura", "Solo una idea", "Solo una creencia"],
    respuesta_correcta: "Juicio negativo preconcebido sobre una cultura"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la integración cultural?",
    opciones: ["Solo mezclar", "Proceso de incorporación respetuosa a una nueva cultura", "Solo adaptarse", "Solo cambiar"],
    respuesta_correcta: "Proceso de incorporación respetuosa a una nueva cultura"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la diversidad cultural?",
    opciones: ["Solo diferencias", "Variedad de culturas y tradiciones en una sociedad", "Solo variedad", "Solo pluralidad"],
    respuesta_correcta: "Variedad de culturas y tradiciones en una sociedad"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un estereotipo cultural?",
    opciones: ["Solo una imagen", "Creencia simplificada y generalizada sobre una cultura", "Solo una idea", "Solo una creencia"],
    respuesta_correcta: "Creencia simplificada y generalizada sobre una cultura"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la tolerancia cultural?",
    opciones: ["Solo aguantar", "Respeto y aceptación de las diferencias culturales", "Solo soportar", "Solo aceptar"],
    respuesta_correcta: "Respeto y aceptación de las diferencias culturales"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la convivencia intercultural?",
    opciones: ["Solo vivir juntos", "Coexistencia pacífica entre diferentes culturas", "Solo compartir", "Solo estar juntos"],
    respuesta_correcta: "Coexistencia pacífica entre diferentes culturas"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un malentendido cultural?",
    opciones: ["Solo confusión", "Interpretación incorrecta debido a diferencias culturales", "Solo error", "Solo equivocación"],
    respuesta_correcta: "Interpretación incorrecta debido a diferencias culturales"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el diálogo intercultural?",
    opciones: ["Solo conversar", "Comunicación respetuosa entre diferentes culturas", "Solo hablar", "Solo discutir"],
    respuesta_correcta: "Comunicación respetuosa entre diferentes culturas"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el choque cultural?",
    opciones: ["Solo conflicto", "Conflicto que surge de diferencias culturales", "Solo problema", "Solo desacuerdo"],
    respuesta_correcta: "Conflicto que surge de diferencias culturales"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué son los valores culturales?",
    opciones: ["Solo principios", "Creencias y principios compartidos por una cultura", "Solo ideas", "Solo creencias"],
    respuesta_correcta: "Creencias y principios compartidos por una cultura"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la comunicación intercultural?",
    opciones: ["Solo hablar", "Intercambio de información entre diferentes culturas", "Solo comunicar", "Solo transmitir"],
    respuesta_correcta: "Intercambio de información entre diferentes culturas"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la competencia intercultural?",
    opciones: ["Solo habilidad", "Capacidad de interactuar efectivamente con otras culturas", "Solo competencia", "Solo capacidad"],
    respuesta_correcta: "Capacidad de interactuar efectivamente con otras culturas"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la sensibilidad cultural?",
    opciones: ["Solo sensibilidad", "Consciencia y respeto por las diferencias culturales", "Solo conciencia", "Solo respeto"],
    respuesta_correcta: "Consciencia y respeto por las diferencias culturales"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la mediación intercultural?",
    opciones: ["Solo mediar", "Proceso de facilitar la comunicación entre culturas", "Solo facilitar", "Solo ayudar"],
    respuesta_correcta: "Proceso de facilitar la comunicación entre culturas"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la identidad cultural?",
    opciones: ["Solo identidad", "Sentido de pertenencia a una cultura específica", "Solo pertenencia", "Solo sentido"],
    respuesta_correcta: "Sentido de pertenencia a una cultura específica"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto intercultural con su definición correcta:",
    pares: [
      { izquierda: "Empatía intercultural", derecha: "Comprender sentimientos de otras culturas" },
      { izquierda: "Prejuicio cultural", derecha: "Juicio negativo preconcebido sobre una cultura" },
      { izquierda: "Integración cultural", derecha: "Incorporación respetuosa a una nueva cultura" },
      { izquierda: "Diversidad cultural", derecha: "Variedad de culturas en una sociedad" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada habilidad intercultural con su característica principal:",
    pares: [
      { izquierda: "Tolerancia cultural", derecha: "Respeto y aceptación de diferencias" },
      { izquierda: "Diálogo intercultural", derecha: "Comunicación respetuosa entre culturas" },
      { izquierda: "Competencia intercultural", derecha: "Interactuar efectivamente con otras culturas" },
      { izquierda: "Sensibilidad cultural", derecha: "Consciencia y respeto por diferencias" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada proceso intercultural con su función principal:",
    pares: [
      { izquierda: "Convivencia intercultural", derecha: "Coexistencia pacífica entre culturas" },
      { izquierda: "Mediación intercultural", derecha: "Facilitar comunicación entre culturas" },
      { izquierda: "Comunicación intercultural", derecha: "Intercambio de información entre culturas" },
      { izquierda: "Identidad cultural", derecha: "Sentido de pertenencia a una cultura" }
    ]
  }
];

export default function RelacionesInterculturales() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[10] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 10);
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
        <Text style={styles.title}>🌍 Relaciones Interculturales</Text>
        <Text style={styles.titleAr}>العلاقات بين الثقافات</Text>
        <Text style={styles.subtitle}>Comunicación y convivencia entre culturas</Text>
        <Text style={styles.subtitleAr}>التواصل والتعايش بين الثقافات</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de las relaciones interculturales</Text>
        <Text style={styles.sectionText}>
          Las relaciones interculturales son fundamentales en nuestro mundo 
          globalizado, donde la diversidad cultural es una realidad cotidiana. 
          La capacidad de interactuar efectivamente con personas de diferentes 
          culturas es esencial para el desarrollo personal y social.
          {"\n\n"}
          En un contexto de creciente movilidad internacional, migración y 
          conectividad global, las habilidades interculturales se han convertido 
          en competencias clave para el éxito en diversos ámbitos: educativo, 
          laboral, social y personal. La empatía, el respeto y la comprensión 
          mutua son pilares fundamentales.
          {"\n\n"}
          Las relaciones interculturales enriquecen nuestras perspectivas, 
          amplían nuestros horizontes y nos permiten aprender de las diferencias. 
          Son una oportunidad para construir puentes de entendimiento y 
          colaboración en un mundo cada vez más interconectado.
        </Text>
        <Text style={styles.sectionTextAr}>
          العلاقات بين الثقافات أساسية في عالمنا المعولم، حيث التنوع الثقافي
          واقع يومي. القدرة على التفاعل بفعالية مع أشخاص من ثقافات مختلفة
          ضرورية للتطور الشخصي والاجتماعي.
          {"\n\n"}
          في سياق تنقل دولي متزايد وهجرة وترابط عالمي، المهارات بين الثقافات
          أصبحت كفاءات أساسية للنجاح في مجالات مختلفة: تعليمية، مهنية،
          اجتماعية وشخصية. التعاطف والاحترام والفهم المتبادل ركائز أساسية.
          {"\n\n"}
          العلاقات بين الثقافات تثري منظوراتنا، توسع آفاقنا وتسمح لنا
          بالتعلم من الاختلافات. إنها فرصة لبناء جسور الفهم والتعاون
          في عالم متزايد الترابط.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de relaciones interculturales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🤝 Conceptos básicos:</Text>{"\n"}
          relaciones interculturales = علاقات بين ثقافات{"\n"}
          diversidad cultural = تنوع ثقافي{"\n"}
          integración = اندماج{"\n"}
          convivencia = تعايش{"\n"}
          diálogo = حوار{"\n"}
          comunicación = تواصل{"\n"}
          interacción = تفاعل{"\n"}
          intercambio = تبادل{"\n"}
          colaboración = تعاون{"\n"}
          cooperación = تعاون
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💭 Actitudes y valores:</Text>{"\n"}
          respeto = احترام{"\n"}
          tolerancia = تسامح{"\n"}
          empatía = تعاطف{"\n"}
          comprensión = فهم{"\n"}
          aceptación = قبول{"\n"}
          apertura = انفتاح{"\n"}
          sensibilidad = حساسية{"\n"}
          solidaridad = تضامن{"\n"}
          igualdad = مساواة{"\n"}
          justicia = عدالة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚫 Obstáculos y desafíos:</Text>{"\n"}
          prejuicio = تحامل{"\n"}
          estereotipo = صورة نمطية{"\n"}
          discriminación = تمييز{"\n"}
          racismo = عنصرية{"\n"}
          xenofobia = كره الأجانب{"\n"}
          malentendido = سوء فهم{"\n"}
          choque cultural = صدام ثقافي{"\n"}
          conflicto = نزاع{"\n"}
          barrera = حاجز{"\n"}
          obstáculo = عقبة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎯 Habilidades y competencias:</Text>{"\n"}
          competencia intercultural = كفاءة بين ثقافات{"\n"}
          comunicación intercultural = تواصل بين ثقافات{"\n"}
          mediación = وساطة{"\n"}
          negociación = تفاوض{"\n"}
          adaptabilidad = تكيف{"\n"}
          flexibilidad = مرونة{"\n"}
          creatividad = إبداع{"\n"}
          pensamiento crítico = تفكير نقدي{"\n"}
          resolución de conflictos = حل النزاعات{"\n"}
          trabajo en equipo = عمل جماعي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌏 Elementos culturales:</Text>{"\n"}
          cultura = ثقافة{"\n"}
          tradición = تقليد{"\n"}
          costumbre = عادة{"\n"}
          valores = قيم{"\n"}
          creencias = معتقدات{"\n"}
          identidad = هوية{"\n"}
          patrimonio = تراث{"\n"}
          folclore = فلكلور{"\n"}
          ritual = طقس{"\n"}
          celebración = احتفال
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🤝 المفاهيم الأساسية:</Text>{"\n"}
          علاقات بين ثقافات = relaciones interculturales{"\n"}
          تنوع ثقافي = diversidad cultural{"\n"}
          اندماج = integración{"\n"}
          تعايش = convivencia{"\n"}
          حوار = diálogo{"\n"}
          تواصل = comunicación{"\n"}
          تفاعل = interacción{"\n"}
          تبادل = intercambio{"\n"}
          تعاون = colaboración{"\n"}
          تعاون = cooperación
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💭 المواقف والقيم:</Text>{"\n"}
          احترام = respeto{"\n"}
          تسامح = tolerancia{"\n"}
          تعاطف = empatía{"\n"}
          فهم = comprensión{"\n"}
          قبول = aceptación{"\n"}
          انفتاح = apertura{"\n"}
          حساسية = sensibilidad{"\n"}
          تضامن = solidaridad{"\n"}
          مساواة = igualdad{"\n"}
          عدالة = justicia
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚫 العقبات والتحديات:</Text>{"\n"}
          تحامل = prejuicio{"\n"}
          صورة نمطية = estereotipo{"\n"}
          تمييز = discriminación{"\n"}
          عنصرية = racismo{"\n"}
          كره الأجانب = xenofobia{"\n"}
          سوء فهم = malentendido{"\n"}
          صدام ثقافي = choque cultural{"\n"}
          نزاع = conflicto{"\n"}
          حاجز = barrera{"\n"}
          عقبة = obstáculo
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎯 المهارات والكفاءات:</Text>{"\n"}
          كفاءة بين ثقافات = competencia intercultural{"\n"}
          تواصل بين ثقافات = comunicación intercultural{"\n"}
          وساطة = mediación{"\n"}
          تفاوض = negociación{"\n"}
          تكيف = adaptabilidad{"\n"}
          مرونة = flexibilidad{"\n"}
          إبداع = creatividad{"\n"}
          تفكير نقدي = pensamiento crítico{"\n"}
          حل النزاعات = resolución de conflictos{"\n"}
          عمل جماعي = trabajo en equipo
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌏 العناصر الثقافية:</Text>{"\n"}
          ثقافة = cultura{"\n"}
          تقليد = tradición{"\n"}
          عادة = costumbre{"\n"}
          قيم = valores{"\n"}
          معتقدات = creencias{"\n"}
          هوية = identidad{"\n"}
          تراث = patrimonio{"\n"}
          فلكلور = folclore{"\n"}
          طقس = ritual{"\n"}
          احتفال = celebración
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Tipos de relaciones interculturales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🏫 Ámbito educativo:</Text>{"\n"}
          • <Text style={styles.benefit}>Intercambios estudiantiles:</Text> Programas de movilidad internacional{"\n"}
          • <Text style={styles.benefit}>Aulas multiculturales:</Text> Entornos educativos diversos{"\n"}
          • <Text style={styles.benefit}>Programas de inmersión:</Text> Aprendizaje en contextos culturales{"\n"}
          • <Text style={styles.benefit}>Colaboración académica:</Text> Proyectos internacionales{"\n"}
          • <Text style={styles.benefit}>Formación intercultural:</Text> Desarrollo de competencias{"\n"}
          • <Text style={styles.benefit}>Investigación comparativa:</Text> Estudios entre culturas
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 Ámbito laboral:</Text>{"\n"}
          • <Text style={styles.benefit}>Equipos multiculturales:</Text> Trabajo con diversidad cultural{"\n"}
          • <Text style={styles.benefit}>Negociaciones internacionales:</Text> Acuerdos entre culturas{"\n"}
          • <Text style={styles.benefit}>Expatriación:</Text> Trabajo en contextos culturales diferentes{"\n"}
          • <Text style={styles.benefit}>Cooperación empresarial:</Text> Alianzas internacionales{"\n"}
          • <Text style={styles.benefit}>Servicios interculturales:</Text> Atención a clientes diversos{"\n"}
          • <Text style={styles.benefit}>Consultoría cultural:</Text> Asesoramiento especializado
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏘️ Ámbito social:</Text>{"\n"}
          • <Text style={styles.benefit}>Comunidades multiculturales:</Text> Vecindarios diversos{"\n"}
          • <Text style={styles.benefit}>Organizaciones comunitarias:</Text> Grupos de apoyo intercultural{"\n"}
          • <Text style={styles.benefit}>Eventos culturales:</Text> Celebración de la diversidad{"\n"}
          • <Text style={styles.benefit}>Mediación comunitaria:</Text> Resolución de conflictos{"\n"}
          • <Text style={styles.benefit}>Programas de integración:</Text> Apoyo a inmigrantes{"\n"}
          • <Text style={styles.benefit}>Voluntariado intercultural:</Text> Servicio a la comunidad
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Ámbito internacional:</Text>{"\n"}
          • <Text style={styles.benefit}>Diplomacia cultural:</Text> Relaciones entre países{"\n"}
          • <Text style={styles.benefit}>Cooperación al desarrollo:</Text> Proyectos internacionales{"\n"}
          • <Text style={styles.benefit}>Organizaciones internacionales:</Text> Trabajo en entidades globales{"\n"}
          • <Text style={styles.benefit}>Misiones humanitarias:</Text> Ayuda en contextos culturales{"\n"}
          • <Text style={styles.benefit}>Turismo responsable:</Text> Viajes respetuosos{"\n"}
          • <Text style={styles.benefit}>Comercio internacional:</Text> Negocios entre culturas
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💻 Ámbito digital:</Text>{"\n"}
          • <Text style={styles.benefit}>Redes sociales globales:</Text> Conectividad intercultural{"\n"}
          • <Text style={styles.benefit}>Plataformas educativas:</Text> Aprendizaje online multicultural{"\n"}
          • <Text style={styles.benefit}>Comunidades virtuales:</Text> Grupos online diversos{"\n"}
          • <Text style={styles.benefit}>Colaboración remota:</Text> Trabajo virtual internacional{"\n"}
          • <Text style={styles.benefit}>Contenido multicultural:</Text> Medios digitales diversos{"\n"}
          • <Text style={styles.benefit}>Gamificación intercultural:</Text> Juegos educativos culturales
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🏫 المجال التعليمي:</Text>{"\n"}
          • <Text style={styles.benefit}>تبادلات طلابية:</Text> برامج التنقل الدولي{"\n"}
          • <Text style={styles.benefit}>فصول متعددة الثقافات:</Text> بيئات تعليمية متنوعة{"\n"}
          • <Text style={styles.benefit}>برامج الانغماس:</Text> تعلم في سياقات ثقافية{"\n"}
          • <Text style={styles.benefit}>تعاون أكاديمي:</Text> مشاريع دولية{"\n"}
          • <Text style={styles.benefit}>تكوين بين ثقافات:</Text> تطوير الكفاءات{"\n"}
          • <Text style={styles.benefit}>بحث مقارن:</Text> دراسات بين الثقافات
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 المجال المهني:</Text>{"\n"}
          • <Text style={styles.benefit}>فرق متعددة الثقافات:</Text> عمل مع تنوع ثقافي{"\n"}
          • <Text style={styles.benefit}>تفاوض دولي:</Text> اتفاقات بين الثقافات{"\n"}
          • <Text style={styles.benefit}>إيفاد للخارج:</Text> عمل في سياقات ثقافية مختلفة{"\n"}
          • <Text style={styles.benefit}>تعاون تجاري:</Text> تحالفات دولية{"\n"}
          • <Text style={styles.benefit}>خدمات بين ثقافات:</Text> رعاية عملاء متنوعين{"\n"}
          • <Text style={styles.benefit}>استشارات ثقافية:</Text> إرشاد متخصص
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏘️ المجال الاجتماعي:</Text>{"\n"}
          • <Text style={styles.benefit}>مجتمعات متعددة الثقافات:</Text> أحياء متنوعة{"\n"}
          • <Text style={styles.benefit}>منظمات مجتمعية:</Text> مجموعات دعم بين ثقافات{"\n"}
          • <Text style={styles.benefit}>أحداث ثقافية:</Text> احتفال بالتنوع{"\n"}
          • <Text style={styles.benefit}>وساطة مجتمعية:</Text> حل النزاعات{"\n"}
          • <Text style={styles.benefit}>برامج اندماج:</Text> دعم المهاجرين{"\n"}
          • <Text style={styles.benefit}>تطوع بين ثقافات:</Text> خدمة المجتمع
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 المجال الدولي:</Text>{"\n"}
          • <Text style={styles.benefit}>دبلوماسية ثقافية:</Text> علاقات بين البلدان{"\n"}
          • <Text style={styles.benefit}>تعاون من أجل التنمية:</Text> مشاريع دولية{"\n"}
          • <Text style={styles.benefit}>منظمات دولية:</Text> عمل في كيانات عالمية{"\n"}
          • <Text style={styles.benefit}>مهام إنسانية:</Text> مساعدة في سياقات ثقافية{"\n"}
          • <Text style={styles.benefit}>سياحة مسؤولة:</Text> سفر محترم{"\n"}
          • <Text style={styles.benefit}>تجارة دولية:</Text> أعمال بين الثقافات
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💻 المجال الرقمي:</Text>{"\n"}
          • <Text style={styles.benefit}>شبكات اجتماعية عالمية:</Text> ترابط بين ثقافات{"\n"}
          • <Text style={styles.benefit}>منصات تعليمية:</Text> تعلم عبر الإنترنت متعدد الثقافات{"\n"}
          • <Text style={styles.benefit}>مجتمعات افتراضية:</Text> مجموعات متنوعة عبر الإنترنت{"\n"}
          • <Text style={styles.benefit}>تعاون عن بعد:</Text> عمل افتراضي دولي{"\n"}
          • <Text style={styles.benefit}>محتوى متعدد الثقافات:</Text> وسائل رقمية متنوعة{"\n"}
          • <Text style={styles.benefit}>ألعاب بين ثقافات:</Text> ألعاب تعليمية ثقافية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Estrategias para mejorar las relaciones interculturales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🗣️ Comunicación efectiva:</Text>{"\n"}
          • <Text style={styles.benefit}>Escucha activa:</Text> Prestar atención sin prejuicios{"\n"}
          • <Text style={styles.benefit}>Lenguaje claro:</Text> Evitar ambigüedades y malentendidos{"\n"}
          • <Text style={styles.benefit}>Comunicación no verbal:</Text> Atención a gestos y expresiones{"\n"}
          • <Text style={styles.benefit}>Preguntas abiertas:</Text> Fomentar el diálogo profundo{"\n"}
          • <Text style={styles.benefit}>Feedback constructivo:</Text> Retroalimentación respetuosa{"\n"}
          • <Text style={styles.benefit}>Adaptación lingüística:</Text> Ajustar el lenguaje según el contexto
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🧠 Desarrollo de competencias:</Text>{"\n"}
          • <Text style={styles.benefit}>Autoconciencia cultural:</Text> Reconocer sesgos propios{"\n"}
          • <Text style={styles.benefit}>Conocimiento cultural:</Text> Aprender sobre otras culturas{"\n"}
          • <Text style={styles.benefit}>Habilidades de adaptación:</Text> Flexibilidad ante cambios{"\n"}
          • <Text style={styles.benefit}>Pensamiento crítico:</Text> Evaluar perspectivas diferentes{"\n"}
          • <Text style={styles.benefit}>Creatividad:</Text> Encontrar soluciones innovadoras{"\n"}
          • <Text style={styles.benefit}>Resolución de conflictos:</Text> Manejar desacuerdos constructivamente
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Construcción de relaciones:</Text>{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Ponerse en el lugar del otro{"\n"}
          • <Text style={styles.benefit}>Respeto mutuo:</Text> Valorar las diferencias{"\n"}
          • <Text style={styles.benefit}>Confianza:</Text> Construir relaciones sólidas{"\n"}
          • <Text style={styles.benefit}>Colaboración:</Text> Trabajar juntos hacia objetivos comunes{"\n"}
          • <Text style={styles.benefit}>Celebración de la diversidad:</Text> Apreciar las diferencias{"\n"}
          • <Text style={styles.benefit}>Inclusión:</Text> Asegurar participación equitativa
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🛠️ Herramientas prácticas:</Text>{"\n"}
          • <Text style={styles.benefit}>Mediación intercultural:</Text> Facilitar la comunicación{"\n"}
          • <Text style={styles.benefit}>Programas de formación:</Text> Desarrollar competencias{"\n"}
          • <Text style={styles.benefit}>Eventos culturales:</Text> Crear espacios de encuentro{"\n"}
          • <Text style={styles.benefit}>Redes de apoyo:</Text> Conectar personas y recursos{"\n"}
          • <Text style={styles.benefit}>Recursos educativos:</Text> Materiales de aprendizaje{"\n"}
          • <Text style={styles.benefit}>Evaluación continua:</Text> Medir el progreso y ajustar
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🗣️ تواصل فعال:</Text>{"\n"}
          • <Text style={styles.benefit}>استماع نشط:</Text> الانتباه بدون تحامل{"\n"}
          • <Text style={styles.benefit}>لغة واضحة:</Text> تجنب الغموض وسوء الفهم{"\n"}
          • <Text style={styles.benefit}>تواصل غير لفظي:</Text> الانتباه للإيماءات والتعبيرات{"\n"}
          • <Text style={styles.benefit}>أسئلة مفتوحة:</Text> تشجيع الحوار العميق{"\n"}
          • <Text style={styles.benefit}>تغذية راجعة بناءة:</Text> ردود فعل محترمة{"\n"}
          • <Text style={styles.benefit}>تكيف لغوي:</Text> تعديل اللغة حسب السياق
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🧠 تطوير الكفاءات:</Text>{"\n"}
          • <Text style={styles.benefit}>وعي ثقافي ذاتي:</Text> الاعتراف بالتحيزات الشخصية{"\n"}
          • <Text style={styles.benefit}>معرفة ثقافية:</Text> التعلم عن الثقافات الأخرى{"\n"}
          • <Text style={styles.benefit}>مهارات التكيف:</Text> مرونة أمام التغييرات{"\n"}
          • <Text style={styles.benefit}>تفكير نقدي:</Text> تقييم وجهات نظر مختلفة{"\n"}
          • <Text style={styles.benefit}>إبداع:</Text> إيجاد حلول مبتكرة{"\n"}
          • <Text style={styles.benefit}>حل النزاعات:</Text> إدارة الخلافات ببناء
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 بناء العلاقات:</Text>{"\n"}
          • <Text style={styles.benefit}>تعاطف:</Text> وضع النفس في مكان الآخر{"\n"}
          • <Text style={styles.benefit}>احترام متبادل:</Text> تقدير الاختلافات{"\n"}
          • <Text style={styles.benefit}>ثقة:</Text> بناء علاقات قوية{"\n"}
          • <Text style={styles.benefit}>تعاون:</Text> العمل معاً نحو أهداف مشتركة{"\n"}
          • <Text style={styles.benefit}>احتفال بالتنوع:</Text> تقدير الاختلافات{"\n"}
          • <Text style={styles.benefit}>شمول:</Text> ضمان مشاركة عادلة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🛠️ أدوات عملية:</Text>{"\n"}
          • <Text style={styles.benefit}>وساطة بين ثقافات:</Text> تسهيل التواصل{"\n"}
          • <Text style={styles.benefit}>برامج تكوين:</Text> تطوير الكفاءات{"\n"}
          • <Text style={styles.benefit}>أحداث ثقافية:</Text> خلق مساحات لقاء{"\n"}
          • <Text style={styles.benefit}>شبكات دعم:</Text> ربط الناس والموارد{"\n"}
          • <Text style={styles.benefit}>موارد تعليمية:</Text> مواد تعليمية{"\n"}
          • <Text style={styles.benefit}>تقييم مستمر:</Text> قياس التقدم والتعديل
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre relaciones interculturales</Text>
        <Text style={styles.dialogo}>
          — ¿Qué dificultades pueden surgir en una relación intercultural? ¿Cómo se pueden superar?{"\n\n"}
          — Las principales dificultades incluyen malentendidos por diferencias en la comunicación, prejuicios culturales y barreras lingüísticas. Para superarlas, es fundamental practicar la empatía, mantener una mente abierta y estar dispuesto a aprender continuamente sobre otras culturas. La comunicación clara y el respeto mutuo son claves.{"\n\n"}
          — ¿Has vivido un choque cultural? ¿Cómo lo afrontaste?{"\n\n"}
          — Sí, experimenté un choque cultural cuando trabajé en un equipo internacional. Las diferencias en estilos de comunicación y toma de decisiones fueron desafiantes. Lo afronté preguntando directamente sobre las expectativas culturales, observando las dinámicas del grupo y adaptando gradualmente mi estilo de comunicación para ser más efectivo en ese contexto multicultural.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما هي الصعوبات التي قد تظهر في العلاقات بين الثقافات؟ وكيف يمكن تجاوزها؟{"\n\n"}
          — الصعوبات الرئيسية تشمل سوء فهم بسبب اختلافات في التواصل، تحامل ثقافي وعقبات لغوية. لتجاوزها، من الضروري ممارسة التعاطف، الحفاظ على عقل منفتح والاستعداد للتعلم باستمرار عن الثقافات الأخرى. التواصل الواضح والاحترام المتبادل أساسيان.{"\n\n"}
          — هل مررت بصدام ثقافي؟ كيف تعاملت معه؟{"\n\n"}
          — نعم، مررت بصدام ثقافي عندما عملت في فريق دولي. الاختلافات في أنماط التواصل واتخاذ القرارات كانت تحديات. تعاملت معه بالسؤال مباشرة عن التوقعات الثقافية، مراقبة ديناميكيات المجموعة والتكيف تدريجياً مع أسلوب تواصلي لأكون أكثر فعالية في ذلك السياق متعدد الثقافات.
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
