import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Estudios Superiores - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un máster universitario?",
    opciones: ["Solo un curso de verano", "Estudios de posgrado que profundizan en una especialidad", "Solo un curso de idiomas", "Solo formación profesional"],
    respuesta_correcta: "Estudios de posgrado que profundizan en una especialidad"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es una beca de estudios?",
    opciones: ["Solo un préstamo", "Ayuda económica para financiar estudios", "Solo un descuento", "Solo un trabajo"],
    respuesta_correcta: "Ayuda económica para financiar estudios"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la movilidad académica?",
    opciones: ["Solo viajar", "Programa que permite estudiar en otras universidades", "Solo cambiar de carrera", "Solo hacer prácticas"],
    respuesta_correcta: "Programa que permite estudiar en otras universidades"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el expediente académico?",
    opciones: ["Solo un diploma", "Documento que registra el historial académico completo", "Solo las notas", "Solo el título"],
    respuesta_correcta: "Documento que registra el historial académico completo"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la formación continua?",
    opciones: ["Solo estudiar siempre", "Aprendizaje permanente a lo largo de la vida", "Solo cursos online", "Solo formación profesional"],
    respuesta_correcta: "Aprendizaje permanente a lo largo de la vida"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un doctorado?",
    opciones: ["Solo un máster", "El grado académico más alto que incluye investigación original", "Solo un curso", "Solo una especialización"],
    respuesta_correcta: "El grado académico más alto que incluye investigación original"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la tutoría académica?",
    opciones: ["Solo clases particulares", "Acompañamiento y orientación personalizada del estudiante", "Solo explicar temas", "Solo corregir exámenes"],
    respuesta_correcta: "Acompañamiento y orientación personalizada del estudiante"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la formación a distancia?",
    opciones: ["Solo ver videos", "Modalidad educativa que no requiere presencia física", "Solo estudiar solo", "Solo cursos online"],
    respuesta_correcta: "Modalidad educativa que no requiere presencia física"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la titulación oficial?",
    opciones: ["Solo un certificado", "Grado académico reconocido oficialmente por el Estado", "Solo un diploma", "Solo una constancia"],
    respuesta_correcta: "Grado académico reconocido oficialmente por el Estado"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el intercambio estudiantil?",
    opciones: ["Solo cambiar de universidad", "Programa que permite estudiar temporalmente en otra institución", "Solo viajar", "Solo hacer amigos"],
    respuesta_correcta: "Programa que permite estudiar temporalmente en otra institución"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la especialización?",
    opciones: ["Solo estudiar más", "Enfoque en un área específica de conocimiento", "Solo hacer cursos", "Solo leer libros"],
    respuesta_correcta: "Enfoque en un área específica de conocimiento"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la matrícula universitaria?",
    opciones: ["Solo inscribirse", "Proceso de registro oficial como estudiante", "Solo pagar", "Solo elegir materias"],
    respuesta_correcta: "Proceso de registro oficial como estudiante"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el aprendizaje autónomo?",
    opciones: ["Solo estudiar solo", "Capacidad de aprender de manera independiente y autodirigida", "Solo leer libros", "Solo hacer tareas"],
    respuesta_correcta: "Capacidad de aprender de manera independiente y autodirigida"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la investigación académica?",
    opciones: ["Solo leer libros", "Proceso sistemático de generación de nuevo conocimiento", "Solo hacer experimentos", "Solo escribir"],
    respuesta_correcta: "Proceso sistemático de generación de nuevo conocimiento"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la internacionalización universitaria?",
    opciones: ["Solo tener estudiantes extranjeros", "Proceso de integración global en la educación superior", "Solo enseñar idiomas", "Solo viajar"],
    respuesta_correcta: "Proceso de integración global en la educación superior"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la acreditación académica?",
    opciones: ["Solo un certificado", "Reconocimiento oficial de la calidad de un programa", "Solo una evaluación", "Solo un examen"],
    respuesta_correcta: "Reconocimiento oficial de la calidad de un programa"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la formación dual?",
    opciones: ["Solo estudiar dos carreras", "Sistema que combina formación teórica y práctica laboral", "Solo hacer prácticas", "Solo trabajar"],
    respuesta_correcta: "Sistema que combina formación teórica y práctica laboral"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto académico con su definición correcta:",
    pares: [
      { izquierda: "Máster", derecha: "Estudios de posgrado especializados" },
      { izquierda: "Doctorado", derecha: "Grado académico más alto con investigación" },
      { izquierda: "Beca", derecha: "Ayuda económica para estudios" },
      { izquierda: "Movilidad", derecha: "Estudiar en otras universidades" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada modalidad de estudio con su característica principal:",
    pares: [
      { izquierda: "Formación a distancia", derecha: "No requiere presencia física" },
      { izquierda: "Formación dual", derecha: "Combina teoría y práctica laboral" },
      { izquierda: "Aprendizaje autónomo", derecha: "Estudio independiente y autodirigido" },
      { izquierda: "Formación continua", derecha: "Aprendizaje a lo largo de la vida" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada proceso académico con su función principal:",
    pares: [
      { izquierda: "Matrícula", derecha: "Registro oficial como estudiante" },
      { izquierda: "Tutoría", derecha: "Orientación personalizada del estudiante" },
      { izquierda: "Acreditación", derecha: "Reconocimiento de calidad del programa" },
      { izquierda: "Especialización", derecha: "Enfoque en área específica de conocimiento" }
    ]
  }
];

export default function EstudiosSuperiores() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[9] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 9);
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
        <Text style={styles.title}>🎓 Estudios Superiores</Text>
        <Text style={styles.titleAr}>الدراسات العليا</Text>
        <Text style={styles.subtitle}>Formación continua y desarrollo académico</Text>
        <Text style={styles.subtitleAr}>التكوين المستمر والتطور الأكاديمي</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de los estudios superiores</Text>
        <Text style={styles.sectionText}>
          Los estudios superiores representan una etapa fundamental en el desarrollo 
          personal y profesional. No solo proporcionan conocimientos especializados, 
          sino que también desarrollan habilidades críticas, analíticas y creativas 
          que son esenciales en el mundo actual.
          {"\n\n"}
          La formación continua es cada vez más importante en una sociedad que 
          evoluciona constantemente. Los avances tecnológicos, los cambios en el 
          mercado laboral y las nuevas demandas sociales requieren que los 
          profesionales se mantengan actualizados y adquieran nuevas competencias 
          a lo largo de su vida.
          {"\n\n"}
          Los estudios superiores también abren puertas a oportunidades 
          internacionales, permiten establecer redes profesionales valiosas y 
          contribuyen al desarrollo de una sociedad más educada y preparada para 
          enfrentar los desafíos del futuro.
        </Text>
        <Text style={styles.sectionTextAr}>
          الدراسات العليا تمثل مرحلة أساسية في التطور الشخصي والمهني. لا توفر
          فقط معرفة متخصصة، بل تطور أيضاً مهارات نقدية وتحليلية وإبداعية
          ضرورية في العالم الحالي.
          {"\n\n"}
          التكوين المستمر أصبح أكثر أهمية في مجتمع يتطور باستمرار. التقدم
          التكنولوجي والتغييرات في سوق العمل والمطالب الاجتماعية الجديدة
          تتطلب من المهنيين البقاء محدثين واكتساب كفاءات جديدة طوال حياتهم.
          {"\n\n"}
          الدراسات العليا تفتح أيضاً أبواب الفرص الدولية، وتسمح بإنشاء
          شبكات مهنية قيمة وتساهم في تطوير مجتمع أكثر تعليماً ومستعداً
          لمواجهة تحديات المستقبل.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de estudios superiores</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🎓 Grados académicos:</Text>{"\n"}
          universidad = جامعة{"\n"}
          máster = ماجستير{"\n"}
          doctorado = دكتوراه{"\n"}
          licenciatura = إجازة{"\n"}
          diplomatura = دبلوم{"\n"}
          grado = درجة{"\n"}
          posgrado = دراسات عليا{"\n"}
          especialización = تخصص{"\n"}
          titulación = شهادة{"\n"}
          acreditación = اعتماد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💰 Financiación y becas:</Text>{"\n"}
          beca = منحة{"\n"}
          matrícula = تسجيل{"\n"}
          tasas = رسوم{"\n"}
          préstamo = قرض{"\n"}
          financiación = تمويل{"\n"}
          subvención = منحة{"\n"}
          ayuda económica = مساعدة مالية{"\n"}
          becario = منحة دراسية{"\n"}
          convocatoria = دعوة{"\n"}
          requisitos = شروط
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Movilidad internacional:</Text>{"\n"}
          intercambio = تبادل{"\n"}
          movilidad = تنقل{"\n"}
          programa Erasmus = برنامج إراسموس{"\n"}
          universidad de destino = جامعة الوجهة{"\n"}
          universidad de origen = جامعة المنشأ{"\n"}
          reconocimiento = اعتراف{"\n"}
          equivalencias = معادلات{"\n"}
          expediente académico = السجل الأكاديمي{"\n"}
          créditos = وحدات دراسية{"\n"}
          convocatoria = دعوة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📖 Modalidades de estudio:</Text>{"\n"}
          formación a distancia = تعليم عن بعد{"\n"}
          formación presencial = تعليم حضوري{"\n"}
          formación semipresencial = تعليم شبه حضوري{"\n"}
          formación dual = تعليم مزدوج{"\n"}
          aprendizaje autónomo = تعلم ذاتي{"\n"}
          tutoría = إرشاد أكاديمي{"\n"}
          mentoría = إرشاد{"\n"}
          prácticas = تدريب{"\n"}
          investigación = بحث{"\n"}
          tesis = أطروحة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏛️ Instituciones y servicios:</Text>{"\n"}
          facultad = كلية{"\n"}
          departamento = قسم{"\n"}
          biblioteca = مكتبة{"\n"}
          laboratorio = مختبر{"\n"}
          centro de investigación = مركز بحث{"\n"}
          oficina de relaciones internacionales = مكتب العلاقات الدولية{"\n"}
          servicios estudiantiles = خدمات الطلاب{"\n"}
          asociación de estudiantes = جمعية الطلاب{"\n"}
          consejo académico = مجلس أكاديمي{"\n"}
          rectorado = رئاسة الجامعة
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🎓 الدرجات الأكاديمية:</Text>{"\n"}
          جامعة = universidad{"\n"}
          ماجستير = máster{"\n"}
          دكتوراه = doctorado{"\n"}
          إجازة = licenciatura{"\n"}
          دبلوم = diplomatura{"\n"}
          درجة = grado{"\n"}
          دراسات عليا = posgrado{"\n"}
          تخصص = especialización{"\n"}
          شهادة = titulación{"\n"}
          اعتماد = acreditación
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💰 التمويل والمنح:</Text>{"\n"}
          منحة = beca{"\n"}
          تسجيل = matrícula{"\n"}
          رسوم = tasas{"\n"}
          قرض = préstamo{"\n"}
          تمويل = financiación{"\n"}
          منحة = subvención{"\n"}
          مساعدة مالية = ayuda económica{"\n"}
          منحة دراسية = becario{"\n"}
          دعوة = convocatoria{"\n"}
          شروط = requisitos
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 التنقل الدولي:</Text>{"\n"}
          تبادل = intercambio{"\n"}
          تنقل = movilidad{"\n"}
          برنامج إراسموس = programa Erasmus{"\n"}
          جامعة الوجهة = universidad de destino{"\n"}
          جامعة المنشأ = universidad de origen{"\n"}
          اعتراف = reconocimiento{"\n"}
          معادلات = equivalencias{"\n"}
          السجل الأكاديمي = expediente académico{"\n"}
          وحدات دراسية = créditos{"\n"}
          دعوة = convocatoria
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📖 أنماط الدراسة:</Text>{"\n"}
          تعليم عن بعد = formación a distancia{"\n"}
          تعليم حضوري = formación presencial{"\n"}
          تعليم شبه حضوري = formación semipresencial{"\n"}
          تعليم مزدوج = formación dual{"\n"}
          تعلم ذاتي = aprendizaje autónomo{"\n"}
          إرشاد أكاديمي = tutoría{"\n"}
          إرشاد = mentoría{"\n"}
          تدريب = prácticas{"\n"}
          بحث = investigación{"\n"}
          أطروحة = tesis
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏛️ المؤسسات والخدمات:</Text>{"\n"}
          كلية = facultad{"\n"}
          قسم = departamento{"\n"}
          مكتبة = biblioteca{"\n"}
          مختبر = laboratorio{"\n"}
          مركز بحث = centro de investigación{"\n"}
          مكتب العلاقات الدولية = oficina de relaciones internacionales{"\n"}
          خدمات الطلاب = servicios estudiantiles{"\n"}
          جمعية الطلاب = asociación de estudiantes{"\n"}
          مجلس أكاديمي = consejo académico{"\n"}
          رئاسة الجامعة = rectorado
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Tipos de estudios superiores</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🎓 Grados universitarios:</Text>{"\n"}
          • <Text style={styles.benefit}>Grado en Administración de Empresas:</Text> Gestión empresarial y dirección{"\n"}
          • <Text style={styles.benefit}>Grado en Ingeniería Informática:</Text> Desarrollo de software y sistemas{"\n"}
          • <Text style={styles.benefit}>Grado en Medicina:</Text> Formación médica y atención sanitaria{"\n"}
          • <Text style={styles.benefit}>Grado en Derecho:</Text> Estudios jurídicos y legales{"\n"}
          • <Text style={styles.benefit}>Grado en Psicología:</Text> Comportamiento humano y salud mental{"\n"}
          • <Text style={styles.benefit}>Grado en Educación:</Text> Formación docente y pedagogía
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📚 Másters y posgrados:</Text>{"\n"}
          • <Text style={styles.benefit}>Máster en Dirección de Empresas (MBA):</Text> Gestión ejecutiva{"\n"}
          • <Text style={styles.benefit}>Máster en Inteligencia Artificial:</Text> Tecnologías avanzadas{"\n"}
          • <Text style={styles.benefit}>Máster en Finanzas:</Text> Gestión financiera y mercados{"\n"}
          • <Text style={styles.benefit}>Máster en Marketing Digital:</Text> Estrategias digitales{"\n"}
          • <Text style={styles.benefit}>Máster en Recursos Humanos:</Text> Gestión del talento{"\n"}
          • <Text style={styles.benefit}>Máster en Sostenibilidad:</Text> Desarrollo sostenible
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 Doctorados:</Text>{"\n"}
          • <Text style={styles.benefit}>Doctorado en Ciencias:</Text> Investigación científica{"\n"}
          • <Text style={styles.benefit}>Doctorado en Humanidades:</Text> Investigación en humanidades{"\n"}
          • <Text style={styles.benefit}>Doctorado en Ingeniería:</Text> Investigación tecnológica{"\n"}
          • <Text style={styles.benefit}>Doctorado en Ciencias Sociales:</Text> Investigación social{"\n"}
          • <Text style={styles.benefit}>Doctorado en Ciencias de la Salud:</Text> Investigación médica{"\n"}
          • <Text style={styles.benefit}>Doctorado en Economía:</Text> Investigación económica
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 Formación profesional:</Text>{"\n"}
          • <Text style={styles.benefit}>Ciclos formativos superiores:</Text> Formación técnica especializada{"\n"}
          • <Text style={styles.benefit}>Certificados profesionales:</Text> Acreditación de competencias{"\n"}
          • <Text style={styles.benefit}>Cursos de especialización:</Text> Formación específica{"\n"}
          • <Text style={styles.benefit}>Formación continua:</Text> Actualización profesional{"\n"}
          • <Text style={styles.benefit}>Microcredenciales:</Text> Certificaciones específicas{"\n"}
          • <Text style={styles.benefit}>Badges digitales:</Text> Reconocimientos digitales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Estudios internacionales:</Text>{"\n"}
          • <Text style={styles.benefit}>Programa Erasmus+:</Text> Movilidad europea{"\n"}
          • <Text style={styles.benefit}>Intercambios bilaterales:</Text> Acuerdos entre universidades{"\n"}
          • <Text style={styles.benefit}>Dobles titulaciones:</Text> Grados conjuntos internacionales{"\n"}
          • <Text style={styles.benefit}>Programas de verano:</Text> Cursos intensivos internacionales{"\n"}
          • <Text style={styles.benefit}>Estudios en el extranjero:</Text> Programas completos{"\n"}
          • <Text style={styles.benefit}>Redes universitarias:</Text> Colaboración internacional
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🎓 الدرجات الجامعية:</Text>{"\n"}
          • <Text style={styles.benefit}>إدارة الأعمال:</Text> الإدارة التجارية والتوجيه{"\n"}
          • <Text style={styles.benefit}>هندسة المعلوماتية:</Text> تطوير البرمجيات والأنظمة{"\n"}
          • <Text style={styles.benefit}>الطب:</Text> التكوين الطبي والرعاية الصحية{"\n"}
          • <Text style={styles.benefit}>القانون:</Text> الدراسات القانونية{"\n"}
          • <Text style={styles.benefit}>علم النفس:</Text> السلوك البشري والصحة العقلية{"\n"}
          • <Text style={styles.benefit}>التعليم:</Text> التكوين التعليمي والتربوي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📚 الماجستير والدراسات العليا:</Text>{"\n"}
          • <Text style={styles.benefit}>ماجستير إدارة الأعمال:</Text> الإدارة التنفيذية{"\n"}
          • <Text style={styles.benefit}>ماجستير الذكاء الاصطناعي:</Text> التكنولوجيات المتقدمة{"\n"}
          • <Text style={styles.benefit}>ماجستير المالية:</Text> الإدارة المالية والأسواق{"\n"}
          • <Text style={styles.benefit}>ماجستير التسويق الرقمي:</Text> الاستراتيجيات الرقمية{"\n"}
          • <Text style={styles.benefit}>ماجستير الموارد البشرية:</Text> إدارة المواهب{"\n"}
          • <Text style={styles.benefit}>ماجستير الاستدامة:</Text> التنمية المستدامة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 الدكتوراه:</Text>{"\n"}
          • <Text style={styles.benefit}>دكتوراه في العلوم:</Text> البحث العلمي{"\n"}
          • <Text style={styles.benefit}>دكتوراه في العلوم الإنسانية:</Text> البحث في العلوم الإنسانية{"\n"}
          • <Text style={styles.benefit}>دكتوراه في الهندسة:</Text> البحث التكنولوجي{"\n"}
          • <Text style={styles.benefit}>دكتوراه في العلوم الاجتماعية:</Text> البحث الاجتماعي{"\n"}
          • <Text style={styles.benefit}>دكتوراه في علوم الصحة:</Text> البحث الطبي{"\n"}
          • <Text style={styles.benefit}>دكتوراه في الاقتصاد:</Text> البحث الاقتصادي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 التكوين المهني:</Text>{"\n"}
          • <Text style={styles.benefit}>الدورات التدريبية العليا:</Text> التكوين التقني المتخصص{"\n"}
          • <Text style={styles.benefit}>الشهادات المهنية:</Text> اعتماد الكفاءات{"\n"}
          • <Text style={styles.benefit}>دورات التخصص:</Text> التكوين المحدد{"\n"}
          • <Text style={styles.benefit}>التكوين المستمر:</Text> التحديث المهني{"\n"}
          • <Text style={styles.benefit}>الاعتمادات المصغرة:</Text> الشهادات المحددة{"\n"}
          • <Text style={styles.benefit}>شارات رقمية:</Text> الاعترافات الرقمية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 الدراسات الدولية:</Text>{"\n"}
          • <Text style={styles.benefit}>برنامج إراسموس+:</Text> التنقل الأوروبي{"\n"}
          • <Text style={styles.benefit}>التبادلات الثنائية:</Text> اتفاقات بين الجامعات{"\n"}
          • <Text style={styles.benefit}>الشهادات المزدوجة:</Text> درجات مشتركة دولية{"\n"}
          • <Text style={styles.benefit}>برامج الصيف:</Text> دورات مكثفة دولية{"\n"}
          • <Text style={styles.benefit}>الدراسة في الخارج:</Text> برامج كاملة{"\n"}
          • <Text style={styles.benefit}>الشبكات الجامعية:</Text> التعاون الدولي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para aprovechar los estudios superiores</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>📋 Planificación académica:</Text>{"\n"}
          • <Text style={styles.benefit}>Establece objetivos claros:</Text> Define qué quieres lograr{"\n"}
          • <Text style={styles.benefit}>Organiza tu tiempo:</Text> Crea un calendario de estudio{"\n"}
          • <Text style={styles.benefit}>Prioriza tareas:</Text> Identifica lo más importante{"\n"}
          • <Text style={styles.benefit}>Mantén constancia:</Text> Estudia regularmente{"\n"}
          • <Text style={styles.benefit}>Revisa tu progreso:</Text> Evalúa tus avances{"\n"}
          • <Text style={styles.benefit}>Ajusta tu plan:</Text> Modifica según necesidades
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Participación activa:</Text>{"\n"}
          • <Text style={styles.benefit}>Asiste a clases:</Text> Participa activamente{"\n"}
          • <Text style={styles.benefit}>Haz preguntas:</Text> Aclara tus dudas{"\n"}
          • <Text style={styles.benefit}>Participa en debates:</Text> Comparte tu opinión{"\n"}
          • <Text style={styles.benefit}>Únete a grupos de estudio:</Text> Aprende con otros{"\n"}
          • <Text style={styles.benefit}>Asiste a eventos académicos:</Text> Amplía tu red{"\n"}
          • <Text style={styles.benefit}>Colabora en proyectos:</Text> Desarrolla habilidades
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Oportunidades internacionales:</Text>{"\n"}
          • <Text style={styles.benefit}>Infórmate sobre becas:</Text> Busca oportunidades de financiación{"\n"}
          • <Text style={styles.benefit}>Aprende idiomas:</Text> Mejora tus competencias lingüísticas{"\n"}
          • <Text style={styles.benefit}>Participa en intercambios:</Text> Vive experiencias internacionales{"\n"}
          • <Text style={styles.benefit}>Conecta con estudiantes extranjeros:</Text> Amplía tu perspectiva{"\n"}
          • <Text style={styles.benefit}>Investiga programas internacionales:</Text> Explora opciones{"\n"}
          • <Text style={styles.benefit}>Mantén contactos:</Text> Construye redes internacionales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 Desarrollo profesional:</Text>{"\n"}
          • <Text style={styles.benefit}>Haz prácticas:</Text> Adquiere experiencia laboral{"\n"}
          • <Text style={styles.benefit}>Participa en proyectos de investigación:</Text> Desarrolla habilidades{"\n"}
          • <Text style={styles.benefit}>Asiste a conferencias:</Text> Mantente actualizado{"\n"}
          • <Text style={styles.benefit}>Únete a asociaciones profesionales:</Text> Conecta con el sector{"\n"}
          • <Text style={styles.benefit}>Desarrolla tu marca personal:</Text> Diferenciate{"\n"}
          • <Text style={styles.benefit}>Planifica tu carrera:</Text> Define tu trayectoria
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>📋 التخطيط الأكاديمي:</Text>{"\n"}
          • <Text style={styles.benefit}>حدد أهدافاً واضحة:</Text> عرّف ما تريد تحقيقه{"\n"}
          • <Text style={styles.benefit}>نظم وقتك:</Text> أنشئ جدول دراسة{"\n"}
          • <Text style={styles.benefit}>رتب الأولويات:</Text> حدد الأهم{"\n"}
          • <Text style={styles.benefit}>حافظ على الاستمرارية:</Text> ادرس بانتظام{"\n"}
          • <Text style={styles.benefit}>راجع تقدمك:</Text> قيّم تقدمك{"\n"}
          • <Text style={styles.benefit}>عدّل خطتك:</Text> غيّر حسب الحاجات
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 المشاركة النشطة:</Text>{"\n"}
          • <Text style={styles.benefit}>احضر الدروس:</Text> شارك بنشاط{"\n"}
          • <Text style={styles.benefit}>اطرح أسئلة:</Text> وضح شكوكك{"\n"}
          • <Text style={styles.benefit}>شارك في النقاشات:</Text> شارك رأيك{"\n"}
          • <Text style={styles.benefit}>انضم لمجموعات الدراسة:</Text> تعلم مع الآخرين{"\n"}
          • <Text style={styles.benefit}>احضر الأحداث الأكاديمية:</Text> وسع شبكتك{"\n"}
          • <Text style={styles.benefit}>تعاون في المشاريع:</Text> طور مهاراتك
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 الفرص الدولية:</Text>{"\n"}
          • <Text style={styles.benefit}>اطلع على المنح:</Text> ابحث عن فرص التمويل{"\n"}
          • <Text style={styles.benefit}>تعلم اللغات:</Text> حسّن كفاءاتك اللغوية{"\n"}
          • <Text style={styles.benefit}>شارك في التبادلات:</Text> عش تجارب دولية{"\n"}
          • <Text style={styles.benefit}>تواصل مع الطلاب الأجانب:</Text> وسع منظورك{"\n"}
          • <Text style={styles.benefit}>ابحث عن البرامج الدولية:</Text> استكشف الخيارات{"\n"}
          • <Text style={styles.benefit}>حافظ على الاتصالات:</Text> ابن شبكات دولية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 التطور المهني:</Text>{"\n"}
          • <Text style={styles.benefit}>قم بالتدريب:</Text> اكتسب خبرة عمل{"\n"}
          • <Text style={styles.benefit}>شارك في مشاريع البحث:</Text> طور مهاراتك{"\n"}
          • <Text style={styles.benefit}>احضر المؤتمرات:</Text> ابق محدثاً{"\n"}
          • <Text style={styles.benefit}>انضم للجمعيات المهنية:</Text> تواصل مع القطاع{"\n"}
          • <Text style={styles.benefit}>طور علامتك الشخصية:</Text> تميّز{"\n"}
          • <Text style={styles.benefit}>خطط لمهنتك:</Text> حدد مسارك
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre estudios superiores</Text>
        <Text style={styles.dialogo}>
          — ¿Por qué es importante la formación continua? ¿Qué opinas de estudiar en el extranjero?{"\n\n"}
          — En mi opinión, la formación continua es fundamental en el mundo actual porque los conocimientos se actualizan constantemente. Estudiar en el extranjero es una experiencia invaluable que no solo mejora las competencias lingüísticas, sino que también desarrolla habilidades interculturales y amplía la perspectiva profesional.{"\n\n"}
          — ¿Qué ventajas y desventajas ves en la formación online?{"\n\n"}
          — La formación online ofrece flexibilidad y accesibilidad, permitiendo estudiar desde cualquier lugar y adaptar el ritmo a las necesidades personales. Sin embargo, requiere mucha disciplina y autogestión, y puede carecer de la interacción personal que enriquece la experiencia educativa. Es importante encontrar el equilibrio adecuado.
        </Text>
        <Text style={styles.dialogoAr}>
          — لماذا التكوين المستمر مهم؟ ما رأيك في الدراسة بالخارج؟{"\n\n"}
          — في رأيي، التكوين المستمر أساسي في العالم الحالي لأن المعرفة تتحدث باستمرار. الدراسة في الخارج تجربة لا تقدر بثمن لا تحسن فقط الكفاءات اللغوية، بل تطور أيضاً مهارات بين ثقافية وتوسع المنظور المهني.{"\n\n"}
          — ما هي مزايا وعيوب التعليم عن بعد؟{"\n\n"}
          — التعليم عن بعد يوفر مرونة وإمكانية الوصول، مما يسمح بالدراسة من أي مكان وتكييف الإيقاع مع الاحتياجات الشخصية. لكنه يتطلب انضباطاً كبيراً وإدارة ذاتية، وقد يفتقر للتفاعل الشخصي الذي يثري التجربة التعليمية. من المهم إيجاد التوازن المناسب.
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
