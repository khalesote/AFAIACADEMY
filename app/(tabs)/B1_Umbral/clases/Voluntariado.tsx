import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de ejercicios para Voluntariado - Nivel B1
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'voluntariado'?",
    opciones: ["Trabajo obligatorio", "Trabajo voluntario sin pago", "Trabajo bien pagado", "Trabajo temporal"],
    respuesta_correcta: "Trabajo voluntario sin pago"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'solidaridad'?",
    opciones: ["Ayudar a otros sin esperar nada a cambio", "Ganar dinero", "Competir con otros", "Trabajar solo"],
    respuesta_correcta: "Ayudar a otros sin esperar nada a cambio"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'ONG'?",
    opciones: ["Organización No Gubernamental", "Oficina Nacional de Gobierno", "Organización Nacional General", "Oficina No Gubernamental"],
    respuesta_correcta: "Organización No Gubernamental"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es un beneficio del voluntariado?",
    opciones: ["Ganar mucho dinero", "Desarrollar habilidades sociales", "Tener más tiempo libre", "Evitar responsabilidades"],
    respuesta_correcta: "Desarrollar habilidades sociales"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Dónde puedes encontrar oportunidades de voluntariado?",
    opciones: ["Solo en hospitales", "Solo en escuelas", "En Internet, ayuntamientos y centros sociales", "Solo en iglesias"],
    respuesta_correcta: "En Internet, ayuntamientos y centros sociales"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'colaborar'?",
    opciones: ["Trabajar solo", "Trabajar en equipo", "Competir", "Descansar"],
    respuesta_correcta: "Trabajar en equipo"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'compromiso'?",
    opciones: ["Una promesa", "Un contrato", "Una obligación o responsabilidad", "Un regalo"],
    respuesta_correcta: "Una obligación o responsabilidad"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'impacto'?",
    opciones: ["Un golpe", "Un efecto o influencia", "Un sonido", "Un color"],
    respuesta_correcta: "Un efecto o influencia"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'motivación'?",
    opciones: ["Un motor", "Una razón o impulso", "Una máquina", "Una herramienta"],
    respuesta_correcta: "Una razón o impulso"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'gratificación'?",
    opciones: ["Un pago", "Una recompensa o satisfacción", "Un castigo", "Una multa"],
    respuesta_correcta: "Una recompensa o satisfacción"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué tipo de voluntariado se enfoca en ayudar a personas mayores?",
    opciones: ["Voluntariado social", "Voluntariado educativo", "Voluntariado medioambiental", "Voluntariado deportivo"],
    respuesta_correcta: "Voluntariado social"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué tipo de voluntariado incluye limpieza de playas?",
    opciones: ["Voluntariado social", "Voluntariado educativo", "Voluntariado medioambiental", "Voluntariado sanitario"],
    respuesta_correcta: "Voluntariado medioambiental"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué tipo de voluntariado incluye donación de sangre?",
    opciones: ["Voluntariado social", "Voluntariado educativo", "Voluntariado sanitario", "Voluntariado cultural"],
    respuesta_correcta: "Voluntariado sanitario"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué habilidad se desarrolla más en el voluntariado?",
    opciones: ["Cocinar", "Conducir", "Comunicación", "Nadar"],
    respuesta_correcta: "Comunicación"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'comunidad'?",
    opciones: ["Una persona", "Un grupo de personas que viven juntas", "Un edificio", "Una calle"],
    respuesta_correcta: "Un grupo de personas que viven juntas"
  },
  
  // Ejercicio 16: Vocabulario
  {
    tipo: "vocabulario",
    titulo: "أنواع التطوع",
    pares: [
      { izquierda: "Social", derecha: "اجتماعي" },
      { izquierda: "Educativo", derecha: "تعليمي" },
      { izquierda: "Medioambiental", derecha: "بيئي" },
      { izquierda: "Sanitario", derecha: "صحي" }
    ],
    opciones: [
      "Social", "Educativo", "Medioambiental", "Sanitario",
      "اجتماعي", "تعليمي", "بيئي", "صحي"
    ]
  },
  
  // Ejercicio 17: Vocabulario
  {
    tipo: "vocabulario",
    titulo: "مصطلحات التطوع",
    pares: [
      { izquierda: "Colaborar", derecha: "يتعاون" },
      { izquierda: "Compromiso", derecha: "التزام" },
      { izquierda: "Impacto", derecha: "تأثير" },
      { izquierda: "Motivación", derecha: "دافع" }
    ],
    opciones: [
      "Colaborar", "Compromiso", "Impacto", "Motivación",
      "يتعاون", "التزام", "تأثير", "دافع"
    ]
  },
  
  // Ejercicio 18: Vocabulario
  {
    tipo: "vocabulario",
    titulo: "فوائد التطوع",
    pares: [
      { izquierda: "Desarrollo personal", derecha: "تنمية شخصية" },
      { izquierda: "Habilidades sociales", derecha: "مهارات اجتماعية" },
      { izquierda: "Experiencia laboral", derecha: "خبرة عملية" },
      { izquierda: "Conocimiento cultural", derecha: "معرفة ثقافية" }
    ],
    opciones: [
      "Desarrollo personal", "Habilidades sociales", "Experiencia laboral", "Conocimiento cultural",
      "تنمية شخصية", "مهارات اجتماعية", "خبرة عملية", "معرفة ثقافية"
    ]
  },
  
  // Ejercicio 19: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'experiencia'?",
    opciones: ["Un experimento", "Conocimiento adquirido por práctica", "Una teoría", "Una idea"],
    respuesta_correcta: "Conocimiento adquirido por práctica"
  },
  
  // Ejercicio 20: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'beneficio'?",
    opciones: ["Un problema", "Una ventaja o provecho", "Una desventaja", "Una dificultad"],
    respuesta_correcta: "Una ventaja o provecho"
  }
];

export default function Voluntariado() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[15] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 15);
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
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B1_Umbral')}
        accessibilityLabel="Volver al menú B1: Umbral"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80' }}
        style={styles.image}
        accessibilityLabel="Imagen de voluntariado y participación social"
      />
      
      <Text style={styles.title}>🤝 Voluntariado y participación social</Text>
      <Text style={styles.titleAr}>🤝 التطوع والمشاركة الاجتماعية</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia del voluntariado</Text>
        <Text style={styles.sectionText}>
          El voluntariado es una forma fundamental de contribuir a la sociedad y 
          desarrollar habilidades personales y sociales. Es una expresión de 
          solidaridad y compromiso con el bien común que beneficia tanto a quienes 
          reciben la ayuda como a quienes la ofrecen.
          {"\n\n"}
          En España, el voluntariado tiene una larga tradición y está regulado por 
          leyes específicas que protegen los derechos de los voluntarios y establecen 
          las responsabilidades de las organizaciones. Es una forma importante de 
          integración social, especialmente para inmigrantes que quieren contribuir 
          a su nueva comunidad.
          {"\n\n"}
          El voluntariado también es una excelente manera de mejorar el español, 
          conocer gente nueva, desarrollar habilidades profesionales y crear redes 
          sociales en el nuevo país.
        </Text>
        <Text style={styles.sectionTextAr}>
          التطوع هو وسيلة أساسية للمساهمة في المجتمع وتطوير
          المهارات الشخصية والاجتماعية. إنه تعبير عن التضامن
          والالتزام بالخير العام الذي يفيد كل من يتلقى المساعدة
          ومن يقدمها.
          {"\n\n"}
          في إسبانيا، التطوع له تقليد طويل ويخضع لقوانين
          محددة تحمي حقوق المتطوعين وتحدد مسؤوليات المنظمات.
          إنه وسيلة مهمة للتكامل الاجتماعي، خاصة للمهاجرين
          الذين يريدون المساهمة في مجتمعهم الجديد.
          {"\n\n"}
          التطوع أيضاً وسيلة ممتازة لتحسين الإسبانية والتعرف
          على أشخاص جدد وتطوير المهارات المهنية وإنشاء
          شبكات اجتماعية في البلد الجديد.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial del voluntariado</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🤝 Conceptos básicos:</Text>{"\n"}
          voluntariado = تطوع{"\n"}
          solidaridad = تضامن{"\n"}
          ONG = منظمة غير حكومية{"\n"}
          ayudar = يساعد{"\n"}
          colaborar = يتعاون{"\n"}
          participar = يشارك{"\n"}
          contribuir = يساهم{"\n"}
          compromiso = التزام{"\n"}
          responsabilidad = مسؤولية{"\n"}
          dedicación = تفاني
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Aspectos organizativos:</Text>{"\n"}
          organización = منظمة{"\n"}
          proyecto = مشروع{"\n"}
          programa = برنامج{"\n"}
          actividad = نشاط{"\n"}
          tarea = مهمة{"\n"}
          horario = جدول زمني{"\n"}
          formación = تدريب{"\n"}
          coordinador = منسق{"\n"}
          equipo = فريق{"\n"}
          reunión = اجتماع
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 Beneficios y resultados:</Text>{"\n"}
          beneficio = فائدة{"\n"}
          experiencia = تجربة{"\n"}
          impacto = تأثير{"\n"}
          motivación = دافع{"\n"}
          gratificación = مكافأة{"\n"}
          satisfacción = رضا{"\n"}
          aprendizaje = تعلم{"\n"}
          crecimiento = نمو{"\n"}
          desarrollo = تطوير{"\n"}
          superación = تطور
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Ámbitos de acción:</Text>{"\n"}
          social = اجتماعي{"\n"}
          educativo = تعليمي{"\n"}
          sanitario = صحي{"\n"}
          medioambiental = بيئي{"\n"}
          cultural = ثقافي{"\n"}
          deportivo = رياضي{"\n"}
          humanitario = إنساني{"\n"}
          comunitario = مجتمعي{"\n"}
          internacional = دولي{"\n"}
          local = محلي
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🤝 المفاهيم الأساسية:</Text>{"\n"}
          تطوع = voluntariado{"\n"}
          تضامن = solidaridad{"\n"}
          منظمة غير حكومية = ONG{"\n"}
          يساعد = ayudar{"\n"}
          يتعاون = colaborar{"\n"}
          يشارك = participar{"\n"}
          يساهم = contribuir{"\n"}
          التزام = compromiso{"\n"}
          مسؤولية = responsabilidad{"\n"}
          تفاني = dedicación
          {"\n\n"}
          <Text style={styles.subtitle}>💼 الجوانب التنظيمية:</Text>{"\n"}
          منظمة = organización{"\n"}
          مشروع = proyecto{"\n"}
          برنامج = programa{"\n"}
          نشاط = actividad{"\n"}
          مهمة = tarea{"\n"}
          جدول زمني = horario{"\n"}
          تدريب = formación{"\n"}
          منسق = coordinador{"\n"}
          فريق = equipo{"\n"}
          اجتماع = reunión
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 الفوائد والنتائج:</Text>{"\n"}
          فائدة = beneficio{"\n"}
          تجربة = experiencia{"\n"}
          تأثير = impacto{"\n"}
          دافع = motivación{"\n"}
          مكافأة = gratificación{"\n"}
          رضا = satisfacción{"\n"}
          تعلم = aprendizaje{"\n"}
          نمو = crecimiento{"\n"}
          تطوير = desarrollo{"\n"}
          تطور = superación
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 مجالات العمل:</Text>{"\n"}
          اجتماعي = social{"\n"}
          تعليمي = educativo{"\n"}
          صحي = sanitario{"\n"}
          بيئي = medioambiental{"\n"}
          ثقافي = cultural{"\n"}
          رياضي = deportivo{"\n"}
          إنساني = humanitario{"\n"}
          مجتمعي = comunitario{"\n"}
          دولي = internacional{"\n"}
          محلي = local
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤝 Tipos de voluntariado y actividades</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏠 Voluntariado social:</Text>{"\n"}
          • <Text style={styles.benefit}>Comedores sociales:</Text> Servir comidas a personas necesitadas{"\n"}
          • <Text style={styles.benefit}>Refugios:</Text> Ayudar a personas sin hogar{"\n"}
          • <Text style={styles.benefit}>Apoyo a mayores:</Text> Acompañamiento y ayuda a personas mayores{"\n"}
          • <Text style={styles.benefit}>Centros de acogida:</Text> Apoyo a inmigrantes y refugiados{"\n"}
          • <Text style={styles.benefit}>Programas de inclusión:</Text> Ayuda a personas con discapacidad{"\n"}
          • <Text style={styles.benefit}>Apoyo familiar:</Text> Ayuda a familias en dificultades
          {"\n\n"}
          <Text style={styles.subtitle}>📚 Voluntariado educativo:</Text>{"\n"}
          • <Text style={styles.benefit}>Apoyo escolar:</Text> Ayudar con tareas y estudios{"\n"}
          • <Text style={styles.benefit}>Alfabetización:</Text> Enseñar a leer y escribir{"\n"}
          • <Text style={styles.benefit}>Clases de idiomas:</Text> Enseñar español a inmigrantes{"\n"}
          • <Text style={styles.benefit}>Tutorías:</Text> Apoyo individualizado a estudiantes{"\n"}
          • <Text style={styles.benefit}>Actividades extraescolares:</Text> Talleres y actividades educativas{"\n"}
          • <Text style={styles.benefit}>Bibliotecas:</Text> Ayuda en bibliotecas públicas
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 Voluntariado medioambiental:</Text>{"\n"}
          • <Text style={styles.benefit}>Limpieza de playas:</Text> Recoger basura de playas y costas{"\n"}
          • <Text style={styles.benefit}>Reforestación:</Text> Plantar árboles y cuidar bosques{"\n"}
          • <Text style={styles.benefit}>Reciclaje:</Text> Promover el reciclaje y la sostenibilidad{"\n"}
          • <Text style={styles.benefit}>Protección animal:</Text> Cuidar animales abandonados{"\n"}
          • <Text style={styles.benefit}>Huertos urbanos:</Text> Mantener jardines comunitarios{"\n"}
          • <Text style={styles.benefit}>Educación ambiental:</Text> Concienciar sobre el medio ambiente
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Voluntariado sanitario:</Text>{"\n"}
          • <Text style={styles.benefit}>Hospitales:</Text> Acompañamiento a pacientes{"\n"}
          • <Text style={styles.benefit}>Campañas de salud:</Text> Promoción de hábitos saludables{"\n"}
          • <Text style={styles.benefit}>Donación de sangre:</Text> Participar en campañas de donación{"\n"}
          • <Text style={styles.benefit}>Apoyo psicológico:</Text> Acompañamiento emocional{"\n"}
          • <Text style={styles.benefit}>Prevención:</Text> Campañas de prevención de enfermedades{"\n"}
          • <Text style={styles.benefit}>Emergencias:</Text> Apoyo en situaciones de emergencia
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Voluntariado cultural:</Text>{"\n"}
          • <Text style={styles.benefit}>Museos:</Text> Guías y apoyo en museos{"\n"}
          • <Text style={styles.benefit}>Bibliotecas:</Text> Ayuda en bibliotecas públicas{"\n"}
          • <Text style={styles.benefit}>Eventos culturales:</Text> Organización de festivales{"\n"}
          • <Text style={styles.benefit}>Teatro y música:</Text> Participación en actividades artísticas{"\n"}
          • <Text style={styles.benefit}>Patrimonio:</Text> Protección del patrimonio cultural{"\n"}
          • <Text style={styles.benefit}>Intercambio cultural:</Text> Promover la diversidad cultural
          {"\n\n"}
          <Text style={styles.subtitle}>⚽ Voluntariado deportivo:</Text>{"\n"}
          • <Text style={styles.benefit}>Entrenamiento:</Text> Ayudar en entrenamientos deportivos{"\n"}
          • <Text style={styles.benefit}>Competiciones:</Text> Apoyo en eventos deportivos{"\n"}
          • <Text style={styles.benefit}>Actividades físicas:</Text> Organizar actividades deportivas{"\n"}
          • <Text style={styles.benefit}>Deporte adaptado:</Text> Deporte para personas con discapacidad{"\n"}
          • <Text style={styles.benefit}>Deporte inclusivo:</Text> Deporte para todos los colectivos{"\n"}
          • <Text style={styles.benefit}>Promoción del deporte:</Text> Fomentar la práctica deportiva
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏠 التطوع الاجتماعي:</Text>{"\n"}
          • <Text style={styles.benefit}>مطاعم خيرية:</Text> تقديم وجبات للأشخاص المحتاجين{"\n"}
          • <Text style={styles.benefit}>ملاجئ:</Text> مساعدة الأشخاص بلا مأوى{"\n"}
          • <Text style={styles.benefit}>دعم كبار السن:</Text> مرافقة ومساعدة كبار السن{"\n"}
          • <Text style={styles.benefit}>مراكز الاستقبال:</Text> دعم المهاجرين واللاجئين{"\n"}
          • <Text style={styles.benefit}>برامج الإدماج:</Text> مساعدة الأشخاص ذوي الإعاقة{"\n"}
          • <Text style={styles.benefit}>الدعم العائلي:</Text> مساعدة العائلات في صعوبات
          {"\n\n"}
          <Text style={styles.subtitle}>📚 التطوع التعليمي:</Text>{"\n"}
          • <Text style={styles.benefit}>الدعم المدرسي:</Text> المساعدة في الواجبات والدراسات{"\n"}
          • <Text style={styles.benefit}>محو الأمية:</Text> تعليم القراءة والكتابة{"\n"}
          • <Text style={styles.benefit}>دروس اللغات:</Text> تعليم الإسبانية للمهاجرين{"\n"}
          • <Text style={styles.benefit}>التدريس الخصوصي:</Text> دعم فردي للطلاب{"\n"}
          • <Text style={styles.benefit}>الأنشطة اللامنهجية:</Text> ورش عمل وأنشطة تعليمية{"\n"}
          • <Text style={styles.benefit}>المكتبات:</Text> المساعدة في المكتبات العامة
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 التطوع البيئي:</Text>{"\n"}
          • <Text style={styles.benefit}>تنظيف الشواطئ:</Text> جمع القمامة من الشواطئ والسواحل{"\n"}
          • <Text style={styles.benefit}>إعادة التشجير:</Text> زراعة الأشجار والعناية بالغابات{"\n"}
          • <Text style={styles.benefit}>إعادة التدوير:</Text> تعزيز إعادة التدوير والاستدامة{"\n"}
          • <Text style={styles.benefit}>حماية الحيوانات:</Text> العناية بالحيوانات المهملة{"\n"}
          • <Text style={styles.benefit}>الحدائق الحضرية:</Text> الحفاظ على الحدائق المجتمعية{"\n"}
          • <Text style={styles.benefit}>التعليم البيئي:</Text> التوعية حول البيئة
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 التطوع الصحي:</Text>{"\n"}
          • <Text style={styles.benefit}>المستشفيات:</Text> مرافقة المرضى{"\n"}
          • <Text style={styles.benefit}>الحملات الصحية:</Text> تعزيز العادات الصحية{"\n"}
          • <Text style={styles.benefit}>التبرع بالدم:</Text> المشاركة في حملات التبرع{"\n"}
          • <Text style={styles.benefit}>الدعم النفسي:</Text> المرافقة العاطفية{"\n"}
          • <Text style={styles.benefit}>الوقاية:</Text> حملات الوقاية من الأمراض{"\n"}
          • <Text style={styles.benefit}>الطوارئ:</Text> الدعم في حالات الطوارئ
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 التطوع الثقافي:</Text>{"\n"}
          • <Text style={styles.benefit}>المتاحف:</Text> المرشدين والدعم في المتاحف{"\n"}
          • <Text style={styles.benefit}>المكتبات:</Text> المساعدة في المكتبات العامة{"\n"}
          • <Text style={styles.benefit}>الأحداث الثقافية:</Text> تنظيم المهرجانات{"\n"}
          • <Text style={styles.benefit}>المسرح والموسيقى:</Text> المشاركة في الأنشطة الفنية{"\n"}
          • <Text style={styles.benefit}>التراث:</Text> حماية التراث الثقافي{"\n"}
          • <Text style={styles.benefit}>التبادل الثقافي:</Text> تعزيز التنوع الثقافي
          {"\n\n"}
          <Text style={styles.subtitle}>⚽ التطوع الرياضي:</Text>{"\n"}
          • <Text style={styles.benefit}>التدريب:</Text> المساعدة في التدريبات الرياضية{"\n"}
          • <Text style={styles.benefit}>المنافسات:</Text> الدعم في الأحداث الرياضية{"\n"}
          • <Text style={styles.benefit}>الأنشطة البدنية:</Text> تنظيم الأنشطة الرياضية{"\n"}
          • <Text style={styles.benefit}>الرياضة التكيفية:</Text> الرياضة للأشخاص ذوي الإعاقة{"\n"}
          • <Text style={styles.benefit}>الرياضة الشاملة:</Text> الرياضة لجميع الفئات{"\n"}
          • <Text style={styles.benefit}>تعزيز الرياضة:</Text> تشجيع ممارسة الرياضة
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Beneficios y desarrollo personal</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>👤 Desarrollo personal:</Text>{"\n"}
          • <Text style={styles.benefit}>Autoestima y confianza:</Text> Mejorar la percepción de uno mismo{"\n"}
          • <Text style={styles.benefit}>Sentido de propósito:</Text> Encontrar significado en ayudar a otros{"\n"}
          • <Text style={styles.benefit}>Crecimiento emocional:</Text> Desarrollar empatía y compasión{"\n"}
          • <Text style={styles.benefit}>Superación personal:</Text> Salir de la zona de confort{"\n"}
          • <Text style={styles.benefit}>Valores personales:</Text> Fortalecer principios éticos{"\n"}
          • <Text style={styles.benefit}>Bienestar psicológico:</Text> Reducir estrés y ansiedad
          {"\n\n"}
          <Text style={styles.subtitle}>🗣️ Habilidades sociales:</Text>{"\n"}
          • <Text style={styles.benefit}>Comunicación:</Text> Mejorar la expresión y escucha activa{"\n"}
          • <Text style={styles.benefit}>Trabajo en equipo:</Text> Colaborar con personas diversas{"\n"}
          • <Text style={styles.benefit}>Liderazgo:</Text> Desarrollar habilidades de dirección{"\n"}
          • <Text style={styles.benefit}>Resolución de conflictos:</Text> Manejar situaciones difíciles{"\n"}
          • <Text style={styles.benefit}>Empatía:</Text> Entender las necesidades de otros{"\n"}
          • <Text style={styles.benefit}>Adaptabilidad:</Text> Ajustarse a diferentes entornos
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Experiencia laboral:</Text>{"\n"}
          • <Text style={styles.benefit}>Competencias valoradas:</Text> Habilidades buscadas por empresas{"\n"}
          • <Text style={styles.benefit}>Referencias profesionales:</Text> Contactos para el futuro laboral{"\n"}
          • <Text style={styles.benefit}>Experiencia práctica:</Text> Aplicar conocimientos en situaciones reales{"\n"}
          • <Text style={styles.benefit}>Networking:</Text> Crear redes profesionales{"\n"}
          • <Text style={styles.benefit}>CV enriquecido:</Text> Mejorar el currículum vitae{"\n"}
          • <Text style={styles.benefit}>Orientación profesional:</Text> Descubrir nuevas carreras
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Conocimiento cultural:</Text>{"\n"}
          • <Text style={styles.benefit}>Diversidad cultural:</Text> Conocer diferentes culturas{"\n"}
          • <Text style={styles.benefit}>Realidades sociales:</Text> Entender problemas sociales{"\n"}
          • <Text style={styles.benefit}>Perspectivas diferentes:</Text> Ver el mundo desde otros puntos de vista{"\n"}
          • <Text style={styles.benefit}>Integración social:</Text> Participar activamente en la sociedad{"\n"}
          • <Text style={styles.benefit}>Conciencia social:</Text> Desarrollar responsabilidad ciudadana{"\n"}
          • <Text style={styles.benefit}>Aprendizaje intercultural:</Text> Valorar la diversidad
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 Redes sociales:</Text>{"\n"}
          • <Text style={styles.benefit}>Nuevas amistades:</Text> Conocer personas con intereses similares{"\n"}
          • <Text style={styles.benefit}>Apoyo mutuo:</Text> Crear relaciones de ayuda recíproca{"\n"}
          • <Text style={styles.benefit}>Comunidad:</Text> Sentirse parte de un grupo{"\n"}
          • <Text style={styles.benefit}>Contactos útiles:</Text> Redes para oportunidades futuras{"\n"}
          • <Text style={styles.benefit}>Socialización:</Text> Combatir la soledad y el aislamiento{"\n"}
          • <Text style={styles.benefit}>Sentido de pertenencia:</Text> Integrarse en la comunidad local
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>👤 التطوير الشخصي:</Text>{"\n"}
          • <Text style={styles.benefit}>الثقة بالنفس والاعتزاز:</Text> تحسين إدراك الذات{"\n"}
          • <Text style={styles.benefit}>إحساس بالهدف:</Text> إيجاد معنى في مساعدة الآخرين{"\n"}
          • <Text style={styles.benefit}>النمو العاطفي:</Text> تطوير التعاطف والرحمة{"\n"}
          • <Text style={styles.benefit}>التطور الشخصي:</Text> الخروج من منطقة الراحة{"\n"}
          • <Text style={styles.benefit}>القيم الشخصية:</Text> تعزيز المبادئ الأخلاقية{"\n"}
          • <Text style={styles.benefit}>الرفاهية النفسية:</Text> تقليل التوتر والقلق
          {"\n\n"}
          <Text style={styles.subtitle}>🗣️ المهارات الاجتماعية:</Text>{"\n"}
          • <Text style={styles.benefit}>التواصل:</Text> تحسين التعبير والاستماع النشط{"\n"}
          • <Text style={styles.benefit}>العمل الجماعي:</Text> التعاون مع أشخاص متنوعين{"\n"}
          • <Text style={styles.benefit}>القيادة:</Text> تطوير مهارات الإدارة{"\n"}
          • <Text style={styles.benefit}>حل النزاعات:</Text> التعامل مع المواقف الصعبة{"\n"}
          • <Text style={styles.benefit}>التعاطف:</Text> فهم احتياجات الآخرين{"\n"}
          • <Text style={styles.benefit}>التكيف:</Text> التكيف مع البيئات المختلفة
          {"\n\n"}
          <Text style={styles.subtitle}>💼 الخبرة العملية:</Text>{"\n"}
          • <Text style={styles.benefit}>الكفاءات المقدرة:</Text> مهارات تبحث عنها الشركات{"\n"}
          • <Text style={styles.benefit}>المراجع المهنية:</Text> جهات اتصال للمستقبل المهني{"\n"}
          • <Text style={styles.benefit}>الخبرة العملية:</Text> تطبيق المعرفة في مواقف حقيقية{"\n"}
          • <Text style={styles.benefit}>الشبكات المهنية:</Text> إنشاء شبكات مهنية{"\n"}
          • <Text style={styles.benefit}>السيرة الذاتية المحسنة:</Text> تحسين السيرة الذاتية{"\n"}
          • <Text style={styles.benefit}>التوجيه المهني:</Text> اكتشاف مهن جديدة
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 المعرفة الثقافية:</Text>{"\n"}
          • <Text style={styles.benefit}>التنوع الثقافي:</Text> معرفة ثقافات مختلفة{"\n"}
          • <Text style={styles.benefit}>الواقعيات الاجتماعية:</Text> فهم المشاكل الاجتماعية{"\n"}
          • <Text style={styles.benefit}>وجهات نظر مختلفة:</Text> رؤية العالم من زوايا أخرى{"\n"}
          • <Text style={styles.benefit}>التكامل الاجتماعي:</Text> المشاركة النشطة في المجتمع{"\n"}
          • <Text style={styles.benefit}>الوعي الاجتماعي:</Text> تطوير المسؤولية المدنية{"\n"}
          • <Text style={styles.benefit}>التعلم بين الثقافات:</Text> تقدير التنوع
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 الشبكات الاجتماعية:</Text>{"\n"}
          • <Text style={styles.benefit}>صداقات جديدة:</Text> التعرف على أشخاص لديهم اهتمامات مشتركة{"\n"}
          • <Text style={styles.benefit}>الدعم المتبادل:</Text> إنشاء علاقات مساعدة متبادلة{"\n"}
          • <Text style={styles.benefit}>المجتمع:</Text> الشعور بالانتماء لمجموعة{"\n"}
          • <Text style={styles.benefit}>جهات اتصال مفيدة:</Text> شبكات للفرص المستقبلية{"\n"}
          • <Text style={styles.benefit}>التنشئة الاجتماعية:</Text> مكافحة الوحدة والعزلة{"\n"}
          • <Text style={styles.benefit}>إحساس بالانتماء:</Text> الاندماج في المجتمع المحلي
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.bold}>María:</Text> ¿Has participado en algún voluntariado? ¿Qué aprendiste?{"\n"}
          <Text style={styles.bold}>Ahmed:</Text> Sí, ayudé en un comedor social durante 6 meses. Fue muy enriquecedor.{"\n"}
          <Text style={styles.bold}>María:</Text> ¿Qué te motivó a hacerlo?{"\n"}
          <Text style={styles.bold}>Ahmed:</Text> Quería contribuir a la comunidad y mejorar mi español.{"\n"}
          <Text style={styles.bold}>María:</Text> ¿Qué habilidades desarrollaste?{"\n"}
          <Text style={styles.bold}>Ahmed:</Text> Mejoré la comunicación, el trabajo en equipo y la empatía.
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.bold}>ماريا:</Text> هل شاركت في عمل تطوعي؟ ماذا تعلمت؟{"\n"}
          <Text style={styles.bold}>أحمد:</Text> نعم، ساعدت في مطعم خيري لمدة 6 أشهر. كانت تجربة مفيدة جدًا.{"\n"}
          <Text style={styles.bold}>ماريا:</Text> ما الذي دفعك للقيام بذلك؟{"\n"}
          <Text style={styles.bold}>أحمد:</Text> أردت المساهمة في المجتمع وتحسين لغتي الإسبانية.{"\n"}
          <Text style={styles.bold}>ماريا:</Text> ما المهارات التي طورتها؟{"\n"}
          <Text style={styles.bold}>أحمد:</Text> حسنت التواصل والعمل الجماعي والتعاطف.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cómo encontrar oportunidades de voluntariado</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.bold}>Internet:</Text> Buscar en páginas web de ONGs y plataformas de voluntariado{"\n"}
          • <Text style={styles.bold}>Ayuntamiento:</Text> Consultar programas municipales de voluntariado{"\n"}
          • <Text style={styles.bold}>Centros sociales:</Text> Preguntar en centros comunitarios y asociaciones{"\n"}
          • <Text style={styles.bold}>Redes sociales:</Text> Seguir organizaciones en redes sociales{"\n"}
          • <Text style={styles.bold}>Universidades:</Text> Consultar programas de voluntariado universitario{"\n"}
          • <Text style={styles.bold}>Iglesias y mezquitas:</Text> Muchas organizaciones religiosas tienen programas
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.bold}>الإنترنت:</Text> البحث في مواقع المنظمات غير الحكومية ومنصات التطوع{"\n"}
          • <Text style={styles.bold}>البلدية:</Text> استشارة برامج التطوع البلدية{"\n"}
          • <Text style={styles.bold}>المراكز الاجتماعية:</Text> السؤال في المراكز المجتمعية والجمعيات{"\n"}
          • <Text style={styles.bold}>وسائل التواصل:</Text> متابعة المنظمات في وسائل التواصل الاجتماعي{"\n"}
          • <Text style={styles.bold}>الجامعات:</Text> استشارة برامج التطوع الجامعي{"\n"}
          • <Text style={styles.bold}>الكنائس والمساجد:</Text> العديد من المنظمات الدينية لديها برامج
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles para el voluntariado</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🤝 Iniciando el voluntariado:</Text>{"\n"}
          • "Me gustaría participar en un proyecto de voluntariado" = أود المشاركة في مشروع تطوعي{"\n"}
          • "¿Qué tipo de ayuda necesitan?" = ما نوع المساعدة التي تحتاجونها؟{"\n"}
          • "¿Cuántas horas a la semana puedo dedicar?" = كم ساعة في الأسبوع يمكنني تخصيصها؟{"\n"}
          • "¿Necesito alguna formación previa?" = هل أحتاج تدريب مسبق؟{"\n"}
          • "¿Qué beneficios obtengo como voluntario?" = ما الفوائد التي أحصل عليها كمتطوع؟{"\n"}
          • "¿Puedo empezar de inmediato?" = هل يمكنني البدء فوراً؟
          {"\n\n"}
          <Text style={styles.subtitle}>📋 Información y organización:</Text>{"\n"}
          • "¿Cuál es el horario de trabajo?" = ما هو جدول العمل؟{"\n"}
          • "¿Qué tareas específicas realizaré?" = ما المهام المحددة التي سأقوم بها؟{"\n"}
          • "¿Hay algún coordinador o supervisor?" = هل هناك منسق أو مشرف؟{"\n"}
          • "¿Necesito traer algo especial?" = هل أحتاج إحضار شيء خاص؟{"\n"}
          • "¿Hay reuniones o formación obligatoria?" = هل هناك اجتماعات أو تدريب إلزامي؟{"\n"}
          • "¿Cómo me comunico si tengo problemas?" = كيف أتواصل إذا واجهت مشاكل؟
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 Motivación y compromiso:</Text>{"\n"}
          • "Estoy muy motivado para ayudar" = أنا متحمس جداً للمساعدة{"\n"}
          • "Quiero contribuir a la comunidad" = أريد المساهمة في المجتمع{"\n"}
          • "Me interesa mucho este proyecto" = أنا مهتم جداً بهذا المشروع{"\n"}
          • "Puedo comprometerme a largo plazo" = يمكنني الالتزام على المدى الطويل{"\n"}
          • "Tengo experiencia en este campo" = لدي خبرة في هذا المجال{"\n"}
          • "Estoy dispuesto a aprender" = أنا مستعد للتعلم
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 Trabajo en equipo:</Text>{"\n"}
          • "¿Cómo puedo colaborar mejor?" = كيف يمكنني التعاون بشكل أفضل؟{"\n"}
          • "¿Quién es mi contacto directo?" = من هو جهة اتصالي المباشرة؟{"\n"}
          • "¿Hay otros voluntarios en el proyecto?" = هل هناك متطوعون آخرون في المشروع؟{"\n"}
          • "¿Cómo funciona la coordinación?" = كيف تعمل التنسيق؟{"\n"}
          • "¿Puedo sugerir mejoras?" = هل يمكنني اقتراح تحسينات؟{"\n"}
          • "¿Cómo se evalúa mi trabajo?" = كيف يتم تقييم عملي؟
          {"\n\n"}
          <Text style={styles.subtitle}>📞 Comunicación y seguimiento:</Text>{"\n"}
          • "¿Cómo me mantengo informado?" = كيف أبقى على اطلاع؟{"\n"}
          • "¿Hay un grupo de WhatsApp?" = هل هناك مجموعة واتساب؟{"\n"}
          • "¿Con qué frecuencia hay reuniones?" = كم مرة تكون الاجتماعات؟{"\n"}
          • "¿Cómo reporto mi trabajo?" = كيف أبلغ عن عملي؟{"\n"}
          • "¿Puedo contactar fuera del horario?" = هل يمكنني الاتصال خارج ساعات العمل؟{"\n"}
          • "¿Hay un sistema de feedback?" = هل هناك نظام للتقييم؟
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🤝 بدء التطوع:</Text>{"\n"}
          • "أود المشاركة في مشروع تطوعي" = Me gustaría participar en un proyecto de voluntariado{"\n"}
          • "ما نوع المساعدة التي تحتاجونها؟" = ¿Qué tipo de ayuda necesitan?{"\n"}
          • "كم ساعة في الأسبوع يمكنني تخصيصها؟" = ¿Cuántas horas a la semana puedo dedicar?{"\n"}
          • "هل أحتاج تدريب مسبق؟" = ¿Necesito alguna formación previa?{"\n"}
          • "ما الفوائد التي أحصل عليها كمتطوع؟" = ¿Qué beneficios obtengo como voluntario?{"\n"}
          • "هل يمكنني البدء فوراً؟" = ¿Puedo empezar de inmediato?
          {"\n\n"}
          <Text style={styles.subtitle}>📋 المعلومات والتنظيم:</Text>{"\n"}
          • "ما هو جدول العمل؟" = ¿Cuál es el horario de trabajo?{"\n"}
          • "ما المهام المحددة التي سأقوم بها؟" = ¿Qué tareas específicas realizaré?{"\n"}
          • "هل هناك منسق أو مشرف؟" = ¿Hay algún coordinador o supervisor?{"\n"}
          • "هل أحتاج إحضار شيء خاص؟" = ¿Necesito traer algo especial?{"\n"}
          • "هل هناك اجتماعات أو تدريب إلزامي؟" = ¿Hay reuniones o formación obligatoria?{"\n"}
          • "كيف أتواصل إذا واجهت مشاكل؟" = ¿Cómo me comunico si tengo problemas?
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 الدافع والالتزام:</Text>{"\n"}
          • "أنا متحمس جداً للمساعدة" = Estoy muy motivado para ayudar{"\n"}
          • "أريد المساهمة في المجتمع" = Quiero contribuir a la comunidad{"\n"}
          • "أنا مهتم جداً بهذا المشروع" = Me interesa mucho este proyecto{"\n"}
          • "يمكنني الالتزام على المدى الطويل" = Puedo comprometerme a largo plazo{"\n"}
          • "لدي خبرة في هذا المجال" = Tengo experiencia en este campo{"\n"}
          • "أنا مستعد للتعلم" = Estoy dispuesto a aprender
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 العمل الجماعي:</Text>{"\n"}
          • "كيف يمكنني التعاون بشكل أفضل؟" = ¿Cómo puedo colaborar mejor?{"\n"}
          • "من هو جهة اتصالي المباشرة؟" = ¿Quién es mi contacto directo?{"\n"}
          • "هل هناك متطوعون آخرون في المشروع؟" = ¿Hay otros voluntarios en el proyecto?{"\n"}
          • "كيف تعمل التنسيق؟" = ¿Cómo funciona la coordinación?{"\n"}
          • "هل يمكنني اقتراح تحسينات؟" = ¿Puedo sugerir mejoras?{"\n"}
          • "كيف يتم تقييم عملي؟" = ¿Cómo se evalúa mi trabajo?
          {"\n\n"}
          <Text style={styles.subtitle}>📞 التواصل والمتابعة:</Text>{"\n"}
          • "كيف أبقى على اطلاع؟" = ¿Cómo me mantengo informado?{"\n"}
          • "هل هناك مجموعة واتساب؟" = ¿Hay un grupo de WhatsApp?{"\n"}
          • "كم مرة تكون الاجتماعات؟" = ¿Con qué frecuencia hay reuniones?{"\n"}
          • "كيف أبلغ عن عملي؟" = ¿Cómo reporto mi trabajo?{"\n"}
          • "هل يمكنني الاتصال خارج ساعات العمل؟" = ¿Puedo contactar fuera del horario?{"\n"}
          • "هل هناك نظام للتقييم؟" = ¿Hay un sistema de feedback?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Proceso de búsqueda de oportunidades de voluntariado</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎯 Fase de autoevaluación:</Text>{"\n"}
          • <Text style={styles.benefit}>Identificar intereses:</Text> Qué te apasiona y motiva{"\n"}
          • <Text style={styles.benefit}>Evaluar habilidades:</Text> Qué sabes hacer bien{"\n"}
          • <Text style={styles.benefit}>Definir disponibilidad:</Text> Cuánto tiempo puedes dedicar{"\n"}
          • <Text style={styles.benefit}>Establecer objetivos:</Text> Qué quieres lograr{"\n"}
          • <Text style={styles.benefit}>Considerar limitaciones:</Text> Qué no puedes hacer{"\n"}
          • <Text style={styles.benefit}>Reflexionar sobre valores:</Text> Qué causas te importan
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 Fase de búsqueda:</Text>{"\n"}
          • <Text style={styles.benefit}>Portales especializados:</Text> Hacesfalta.org, Voluntariado.net{"\n"}
          • <Text style={styles.benefit}>Redes sociales:</Text> Facebook, LinkedIn, grupos locales{"\n"}
          • <Text style={styles.benefit}>Ayuntamientos:</Text> Programas municipales de voluntariado{"\n"}
          • <Text style={styles.benefit}>Centros sociales:</Text> Asociaciones y ONGs locales{"\n"}
          • <Text style={styles.benefit}>Universidades:</Text> Programas de voluntariado universitario{"\n"}
          • <Text style={styles.benefit}>Boca a boca:</Text> Recomendaciones de conocidos
          {"\n\n"}
          <Text style={styles.subtitle}>📞 Fase de contacto:</Text>{"\n"}
          • <Text style={styles.benefit}>Contactar organizaciones:</Text> Llamar, escribir o visitar{"\n"}
          • <Text style={styles.benefit}>Preguntar información:</Text> Horarios, tareas, requisitos{"\n"}
          • <Text style={styles.benefit}>Solicitar entrevista:</Text> Conocer el proyecto en persona{"\n"}
          • <Text style={styles.benefit}>Visitar instalaciones:</Text> Ver el lugar de trabajo{"\n"}
          • <Text style={styles.benefit}>Conocer al equipo:</Text> Hablar con coordinadores{"\n"}
          • <Text style={styles.benefit}>Clarificar dudas:</Text> Resolver todas las preguntas
          {"\n\n"}
          <Text style={styles.subtitle}>📋 Fase de formalización:</Text>{"\n"}
          • <Text style={styles.benefit}>Firmar acuerdo:</Text> Documento de compromiso{"\n"}
          • <Text style={styles.benefit}>Recibir formación:</Text> Capacitación inicial{"\n"}
          • <Text style={styles.benefit}>Conocer protocolos:</Text> Normas y procedimientos{"\n"}
          • <Text style={styles.benefit}>Establecer horarios:</Text> Definir días y horas{"\n"}
          • <Text style={styles.benefit}>Recibir materiales:</Text> Equipamiento necesario{"\n"}
          • <Text style={styles.benefit}>Conocer contactos:</Text> Personas de referencia
          {"\n\n"}
          <Text style={styles.subtitle}>🚀 Fase de inicio:</Text>{"\n"}
          • <Text style={styles.benefit}>Primer día:</Text> Presentación y orientación{"\n"}
          • <Text style={styles.benefit}>Acompañamiento:</Text> Trabajar con voluntarios experimentados{"\n"}
          • <Text style={styles.benefit}>Aprendizaje gradual:</Text> Ir asumiendo responsabilidades{"\n"}
          • <Text style={styles.benefit}>Integración:</Text> Sentirse parte del equipo{"\n"}
          • <Text style={styles.benefit}>Feedback inicial:</Text> Evaluación de los primeros días{"\n"}
          • <Text style={styles.benefit}>Ajustes:</Text> Adaptar tareas según capacidades
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎯 مرحلة التقييم الذاتي:</Text>{"\n"}
          • <Text style={styles.benefit}>تحديد الاهتمامات:</Text> ما يثير شغفك وتحفيزك{"\n"}
          • <Text style={styles.benefit}>تقييم المهارات:</Text> ما تجيد فعله{"\n"}
          • <Text style={styles.benefit}>تحديد التوفر:</Text> كم وقت يمكنك تخصيصه{"\n"}
          • <Text style={styles.benefit}>تحديد الأهداف:</Text> ما تريد تحقيقه{"\n"}
          • <Text style={styles.benefit}>مراعاة القيود:</Text> ما لا يمكنك فعله{"\n"}
          • <Text style={styles.benefit}>التفكير في القيم:</Text> ما القضايا التي تهمك
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 مرحلة البحث:</Text>{"\n"}
          • <Text style={styles.benefit}>المواقع المتخصصة:</Text> هاسفالتا.أورج، فولونتاريادو.نت{"\n"}
          • <Text style={styles.benefit}>الشبكات الاجتماعية:</Text> فيسبوك، لينكد إن، مجموعات محلية{"\n"}
          • <Text style={styles.benefit}>البلديات:</Text> برامج التطوع البلدية{"\n"}
          • <Text style={styles.benefit}>المراكز الاجتماعية:</Text> الجمعيات والمنظمات غير الحكومية المحلية{"\n"}
          • <Text style={styles.benefit}>الجامعات:</Text> برامج التطوع الجامعي{"\n"}
          • <Text style={styles.benefit}>التوصيات الشفهية:</Text> توصيات من معارف
          {"\n\n"}
          <Text style={styles.subtitle}>📞 مرحلة الاتصال:</Text>{"\n"}
          • <Text style={styles.benefit}>الاتصال بالمنظمات:</Text> الاتصال، الكتابة أو الزيارة{"\n"}
          • <Text style={styles.benefit}>طلب المعلومات:</Text> الجداول الزمنية، المهام، المتطلبات{"\n"}
          • <Text style={styles.benefit}>طلب مقابلة:</Text> معرفة المشروع شخصياً{"\n"}
          • <Text style={styles.benefit}>زيارة المرافق:</Text> رؤية مكان العمل{"\n"}
          • <Text style={styles.benefit}>معرفة الفريق:</Text> التحدث مع المنسقين{"\n"}
          • <Text style={styles.benefit}>توضيح الشكوك:</Text> حل جميع الأسئلة
          {"\n\n"}
          <Text style={styles.subtitle}>📋 مرحلة الرسمية:</Text>{"\n"}
          • <Text style={styles.benefit}>توقيع الاتفاق:</Text> وثيقة الالتزام{"\n"}
          • <Text style={styles.benefit}>استلام التدريب:</Text> التدريب الأولي{"\n"}
          • <Text style={styles.benefit}>معرفة البروتوكولات:</Text> القواعد والإجراءات{"\n"}
          • <Text style={styles.benefit}>تحديد الجداول الزمنية:</Text> تحديد الأيام والساعات{"\n"}
          • <Text style={styles.benefit}>استلام المواد:</Text> المعدات اللازمة{"\n"}
          • <Text style={styles.benefit}>معرفة جهات الاتصال:</Text> الأشخاص المرجعيون
          {"\n\n"}
          <Text style={styles.subtitle}>🚀 مرحلة البدء:</Text>{"\n"}
          • <Text style={styles.benefit}>اليوم الأول:</Text> التعريف والتوجيه{"\n"}
          • <Text style={styles.benefit}>المرافقة:</Text> العمل مع متطوعين ذوي خبرة{"\n"}
          • <Text style={styles.benefit}>التعلم التدريجي:</Text> تحمل المسؤوليات تدريجياً{"\n"}
          • <Text style={styles.benefit}>الاندماج:</Text> الشعور بالانتماء للفريق{"\n"}
          • <Text style={styles.benefit}>التقييم الأولي:</Text> تقييم الأيام الأولى{"\n"}
          • <Text style={styles.benefit}>التعديلات:</Text> تكييف المهام حسب القدرات
        </Text>
      </View>

      {/* Sección de Ejercicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios de práctica</Text>
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
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 24,
    alignItems: 'center',
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
    lineHeight: 22,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    writingDirection: 'rtl',
    marginBottom: 2,
    fontFamily: 'System',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#455a64',
    marginTop: 10,
    marginBottom: 5,
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
