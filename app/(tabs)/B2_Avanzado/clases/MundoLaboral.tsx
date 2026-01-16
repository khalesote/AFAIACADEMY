import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Mundo Laboral - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un contrato laboral?",
    opciones: ["Solo un papel", "Acuerdo legal entre empleador y trabajador que establece condiciones", "Solo una promesa", "Solo un documento"],
    respuesta_correcta: "Acuerdo legal entre empleador y trabajador que establece condiciones"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la jornada laboral?",
    opciones: ["Solo el tiempo de trabajo", "Período de tiempo que el trabajador dedica a sus funciones", "Solo las horas", "Solo el horario"],
    respuesta_correcta: "Período de tiempo que el trabajador dedica a sus funciones"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la conciliación laboral?",
    opciones: ["Solo conciliar", "Equilibrio entre vida laboral y personal", "Solo balancear", "Solo organizar"],
    respuesta_correcta: "Equilibrio entre vida laboral y personal"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el teletrabajo?",
    opciones: ["Solo trabajar desde casa", "Modalidad laboral que permite trabajar desde ubicaciones remotas", "Solo trabajo online", "Solo trabajo digital"],
    respuesta_correcta: "Modalidad laboral que permite trabajar desde ubicaciones remotas"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el salario?",
    opciones: ["Solo dinero", "Retribución económica por el trabajo realizado", "Solo pago", "Solo sueldo"],
    respuesta_correcta: "Retribución económica por el trabajo realizado"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué son los derechos laborales?",
    opciones: ["Solo derechos", "Garantías legales que protegen al trabajador", "Solo protecciones", "Solo beneficios"],
    respuesta_correcta: "Garantías legales que protegen al trabajador"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es un sindicato?",
    opciones: ["Solo un grupo", "Organización que defiende los derechos de los trabajadores", "Solo una asociación", "Solo un colectivo"],
    respuesta_correcta: "Organización que defiende los derechos de los trabajadores"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la flexibilidad laboral?",
    opciones: ["Solo ser flexible", "Adaptabilidad en horarios y condiciones de trabajo", "Solo adaptarse", "Solo cambiar"],
    respuesta_correcta: "Adaptabilidad en horarios y condiciones de trabajo"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la promoción laboral?",
    opciones: ["Solo subir", "Ascenso a un puesto de mayor responsabilidad y mejor remuneración", "Solo mejorar", "Solo avanzar"],
    respuesta_correcta: "Ascenso a un puesto de mayor responsabilidad y mejor remuneración"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el desempleo?",
    opciones: ["Solo no trabajar", "Situación de falta de empleo remunerado", "Solo estar parado", "Solo no tener trabajo"],
    respuesta_correcta: "Situación de falta de empleo remunerado"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la movilidad laboral?",
    opciones: ["Solo moverse", "Capacidad de cambiar de trabajo o ubicación geográfica", "Solo cambiar", "Solo trasladarse"],
    respuesta_correcta: "Capacidad de cambiar de trabajo o ubicación geográfica"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la formación continua?",
    opciones: ["Solo estudiar", "Aprendizaje permanente para mantener competencias actualizadas", "Solo aprender", "Solo capacitarse"],
    respuesta_correcta: "Aprendizaje permanente para mantener competencias actualizadas"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el networking profesional?",
    opciones: ["Solo hacer contactos", "Construcción de redes de contactos profesionales", "Solo relacionarse", "Solo conectar"],
    respuesta_correcta: "Construcción de redes de contactos profesionales"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la rotación laboral?",
    opciones: ["Solo cambiar", "Movimiento de trabajadores entre diferentes puestos o empresas", "Solo moverse", "Solo trasladarse"],
    respuesta_correcta: "Movimiento de trabajadores entre diferentes puestos o empresas"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la productividad laboral?",
    opciones: ["Solo producir", "Eficiencia en la relación entre resultados y recursos utilizados", "Solo eficiencia", "Solo rendimiento"],
    respuesta_correcta: "Eficiencia en la relación entre resultados y recursos utilizados"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el acoso laboral?",
    opciones: ["Solo molestar", "Conducta hostil y sistemática en el entorno de trabajo", "Solo intimidar", "Solo presionar"],
    respuesta_correcta: "Conducta hostil y sistemática en el entorno de trabajo"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la igualdad laboral?",
    opciones: ["Solo igualdad", "Tratamiento equitativo sin discriminación en el trabajo", "Solo equidad", "Solo justicia"],
    respuesta_correcta: "Tratamiento equitativo sin discriminación en el trabajo"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto laboral con su definición correcta:",
    pares: [
      { izquierda: "Contrato laboral", derecha: "Acuerdo legal entre empleador y trabajador" },
      { izquierda: "Jornada laboral", derecha: "Período de tiempo dedicado al trabajo" },
      { izquierda: "Teletrabajo", derecha: "Modalidad de trabajo desde ubicaciones remotas" },
      { izquierda: "Salario", derecha: "Retribución económica por el trabajo" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada derecho laboral con su característica principal:",
    pares: [
      { izquierda: "Derechos laborales", derecha: "Garantías legales que protegen al trabajador" },
      { izquierda: "Sindicato", derecha: "Organización que defiende derechos de trabajadores" },
      { izquierda: "Conciliación laboral", derecha: "Equilibrio entre vida laboral y personal" },
      { izquierda: "Flexibilidad laboral", derecha: "Adaptabilidad en horarios y condiciones" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto de desarrollo laboral con su función principal:",
    pares: [
      { izquierda: "Promoción laboral", derecha: "Ascenso a puesto de mayor responsabilidad" },
      { izquierda: "Formación continua", derecha: "Aprendizaje permanente para mantener competencias" },
      { izquierda: "Networking profesional", derecha: "Construcción de redes de contactos" },
      { izquierda: "Movilidad laboral", derecha: "Capacidad de cambiar de trabajo o ubicación" }
    ]
  }
];

export default function MundoLaboral() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[1] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 1);
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
        <Text style={styles.title}>💼 Mundo Laboral y Empleo</Text>
        <Text style={styles.titleAr}>عالم العمل والوظائف</Text>
        <Text style={styles.subtitle}>Desarrollo profesional y condiciones laborales</Text>
        <Text style={styles.subtitleAr}>التطور المهني وشروط العمل</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia del mundo laboral</Text>
        <Text style={styles.sectionText}>
          El mundo laboral es fundamental en la sociedad actual, ya que no solo 
          proporciona medios de subsistencia, sino que también contribuye al 
          desarrollo personal, la realización profesional y la construcción de 
          identidad social.
          {"\n\n"}
          Las condiciones laborales, los derechos de los trabajadores y las 
          oportunidades de desarrollo profesional son aspectos cruciales que 
          determinan la calidad de vida de las personas. Un entorno laboral 
          saludable, justo y equitativo es esencial para el bienestar individual 
          y colectivo.
          {"\n\n"}
          En un mundo globalizado y tecnológicamente avanzado, el mercado laboral 
          evoluciona constantemente, presentando nuevos desafíos y oportunidades. 
          La adaptabilidad, la formación continua y la flexibilidad se han 
          convertido en competencias esenciales para el éxito profesional.
        </Text>
        <Text style={styles.sectionTextAr}>
          عالم العمل أساسي في المجتمع الحالي، حيث لا يوفر فقط وسائل العيش،
          بل يساهم أيضاً في التطور الشخصي والتحقق المهني وبناء الهوية الاجتماعية.
          {"\n\n"}
          شروط العمل وحقوق العمال وفرص التطور المهني جوانب حاسمة تحدد
          جودة حياة الناس. بيئة عمل صحية وعادلة ومنصفة ضرورية للرفاه
          الفردي والجماعي.
          {"\n\n"}
          في عالم معولم ومتقدم تكنولوجياً، سوق العمل يتطور باستمرار،
          مقدماً تحديات وفرصاً جديدة. التكيف والتكوين المستمر والمرونة
          أصبحت كفاءات أساسية للنجاح المهني.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial del mundo laboral</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>📋 Contratos y condiciones:</Text>{"\n"}
          contrato = عقد{"\n"}
          jornada laboral = دوام عمل{"\n"}
          salario = راتب{"\n"}
          sueldo = أجر{"\n"}
          nómina = كشف راتب{"\n"}
          vacaciones = إجازة{"\n"}
          baja médica = إجازة مرضية{"\n"}
          permiso = إذن{"\n"}
          horario = جدول عمل{"\n"}
          turno = وردية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚖️ Derechos y deberes:</Text>{"\n"}
          derechos laborales = حقوق العمال{"\n"}
          deberes = واجبات{"\n"}
          sindicato = نقابة{"\n"}
          convenio colectivo = اتفاقية جماعية{"\n"}
          huelga = إضراب{"\n"}
          negociación = تفاوض{"\n"}
          representación = تمثيل{"\n"}
          igualdad = مساواة{"\n"}
          discriminación = تمييز{"\n"}
          acoso laboral = مضايقة في العمل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏢 Organización y estructura:</Text>{"\n"}
          empresa = شركة{"\n"}
          departamento = قسم{"\n"}
          jefe = مدير{"\n"}
          compañero = زميل{"\n"}
          equipo = فريق{"\n"}
          reunión = اجتماع{"\n"}
          proyecto = مشروع{"\n"}
          objetivo = هدف{"\n"}
          evaluación = تقييم{"\n"}
          rendimiento = أداء
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📈 Desarrollo profesional:</Text>{"\n"}
          promoción = ترقية{"\n"}
          ascenso = ترقية{"\n"}
          formación = تكوين{"\n"}
          capacitación = تدريب{"\n"}
          experiencia = خبرة{"\n"}
          competencias = كفاءات{"\n"}
          habilidades = مهارات{"\n"}
          networking = شبكات علاقات{"\n"}
          currículum = سيرة ذاتية{"\n"}
          entrevista = مقابلة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Movilidad y flexibilidad:</Text>{"\n"}
          movilidad laboral = تنقل مهني{"\n"}
          teletrabajo = عمل عن بعد{"\n"}
          trabajo híbrido = عمل هجين{"\n"}
          flexibilidad = مرونة{"\n"}
          conciliación = التوفيق{"\n"}
          equilibrio = توازن{"\n"}
          rotación = دوران{"\n"}
          movilidad internacional = تنقل دولي{"\n"}
          expatriación = إيفاد للخارج{"\n"}
          repatriación = إعادة إلى الوطن
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>📋 العقود والشروط:</Text>{"\n"}
          عقد = contrato{"\n"}
          دوام عمل = jornada laboral{"\n"}
          راتب = salario{"\n"}
          أجر = sueldo{"\n"}
          كشف راتب = nómina{"\n"}
          إجازة = vacaciones{"\n"}
          إجازة مرضية = baja médica{"\n"}
          إذن = permiso{"\n"}
          جدول عمل = horario{"\n"}
          وردية = turno
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚖️ الحقوق والواجبات:</Text>{"\n"}
          حقوق العمال = derechos laborales{"\n"}
          واجبات = deberes{"\n"}
          نقابة = sindicato{"\n"}
          اتفاقية جماعية = convenio colectivo{"\n"}
          إضراب = huelga{"\n"}
          تفاوض = negociación{"\n"}
          تمثيل = representación{"\n"}
          مساواة = igualdad{"\n"}
          تمييز = discriminación{"\n"}
          مضايقة في العمل = acoso laboral
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏢 التنظيم والهيكل:</Text>{"\n"}
          شركة = empresa{"\n"}
          قسم = departamento{"\n"}
          مدير = jefe{"\n"}
          زميل = compañero{"\n"}
          فريق = equipo{"\n"}
          اجتماع = reunión{"\n"}
          مشروع = proyecto{"\n"}
          هدف = objetivo{"\n"}
          تقييم = evaluación{"\n"}
          أداء = rendimiento
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📈 التطور المهني:</Text>{"\n"}
          ترقية = promoción{"\n"}
          ترقية = ascenso{"\n"}
          تكوين = formación{"\n"}
          تدريب = capacitación{"\n"}
          خبرة = experiencia{"\n"}
          كفاءات = competencias{"\n"}
          مهارات = habilidades{"\n"}
          شبكات علاقات = networking{"\n"}
          سيرة ذاتية = currículum{"\n"}
          مقابلة = entrevista
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 التنقل والمرونة:</Text>{"\n"}
          تنقل مهني = movilidad laboral{"\n"}
          عمل عن بعد = teletrabajo{"\n"}
          عمل هجين = trabajo híbrido{"\n"}
          مرونة = flexibilidad{"\n"}
          التوفيق = conciliación{"\n"}
          توازن = equilibrio{"\n"}
          دوران = rotación{"\n"}
          تنقل دولي = movilidad internacional{"\n"}
          إيفاد للخارج = expatriación{"\n"}
          إعادة إلى الوطن = repatriación
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Tipos de empleo y modalidades laborales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>💼 Empleo tradicional:</Text>{"\n"}
          • <Text style={styles.benefit}>Empleo fijo:</Text> Contrato indefinido con estabilidad laboral{"\n"}
          • <Text style={styles.benefit}>Empleo temporal:</Text> Contrato por tiempo determinado{"\n"}
          • <Text style={styles.benefit}>Tiempo completo:</Text> Jornada completa de trabajo{"\n"}
          • <Text style={styles.benefit}>Tiempo parcial:</Text> Jornada reducida de trabajo{"\n"}
          • <Text style={styles.benefit}>Trabajo por turnos:</Text> Rotación de horarios{"\n"}
          • <Text style={styles.benefit}>Trabajo nocturno:</Text> Actividad en horario nocturno
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏠 Trabajo remoto y flexible:</Text>{"\n"}
          • <Text style={styles.benefit}>Teletrabajo:</Text> Trabajo desde ubicaciones remotas{"\n"}
          • <Text style={styles.benefit}>Trabajo híbrido:</Text> Combinación de presencial y remoto{"\n"}
          • <Text style={styles.benefit}>Trabajo flexible:</Text> Horarios adaptables{"\n"}
          • <Text style={styles.benefit}>Trabajo por proyectos:</Text> Empleo temporal por objetivos{"\n"}
          • <Text style={styles.benefit}>Freelance:</Text> Trabajo independiente por servicios{"\n"}
          • <Text style={styles.benefit}>Consultoría:</Text> Asesoramiento especializado
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Empleo internacional:</Text>{"\n"}
          • <Text style={styles.benefit}>Expatriación:</Text> Trabajo en el extranjero{"\n"}
          • <Text style={styles.benefit}>Trabajo remoto internacional:</Text> Empleo desde cualquier país{"\n"}
          • <Text style={styles.benefit}>Cooperación internacional:</Text> Proyectos globales{"\n"}
          • <Text style={styles.benefit}>Misiones temporales:</Text> Asignaciones cortas en el extranjero{"\n"}
          • <Text style={styles.benefit}>Trabajo en organizaciones internacionales:</Text> Empleo en entidades globales{"\n"}
          • <Text style={styles.benefit}>Comercio internacional:</Text> Actividades comerciales globales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 Nuevas modalidades:</Text>{"\n"}
          • <Text style={styles.benefit}>Gig economy:</Text> Economía de trabajos temporales{"\n"}
          • <Text style={styles.benefit}>Crowdworking:</Text> Trabajo colaborativo online{"\n"}
          • <Text style={styles.benefit}>Trabajo por objetivos:</Text> Empleo basado en resultados{"\n"}
          • <Text style={styles.benefit}>Coworking:</Text> Espacios de trabajo compartidos{"\n"}
          • <Text style={styles.benefit}>Emprendimiento:</Text> Creación de propio negocio{"\n"}
          • <Text style={styles.benefit}>Autoempleo:</Text> Trabajo por cuenta propia
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>💼 العمل التقليدي:</Text>{"\n"}
          • <Text style={styles.benefit}>عمل ثابت:</Text> عقد غير محدد المدة مع استقرار مهني{"\n"}
          • <Text style={styles.benefit}>عمل مؤقت:</Text> عقد محدد المدة{"\n"}
          • <Text style={styles.benefit}>دوام كامل:</Text> دوام عمل كامل{"\n"}
          • <Text style={styles.benefit}>دوام جزئي:</Text> دوام عمل مخفض{"\n"}
          • <Text style={styles.benefit}>عمل بنظام الورديات:</Text> دوران الجداول{"\n"}
          • <Text style={styles.benefit}>عمل ليلي:</Text> نشاط في الساعات الليلية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏠 العمل عن بعد والمرن:</Text>{"\n"}
          • <Text style={styles.benefit}>عمل عن بعد:</Text> عمل من مواقع بعيدة{"\n"}
          • <Text style={styles.benefit}>عمل هجين:</Text> مزيج من الحضوري والعن بعد{"\n"}
          • <Text style={styles.benefit}>عمل مرن:</Text> جداول قابلة للتكيف{"\n"}
          • <Text style={styles.benefit}>عمل بالمشاريع:</Text> عمل مؤقت بالأهداف{"\n"}
          • <Text style={styles.benefit}>عمل حر:</Text> عمل مستقل بالخدمات{"\n"}
          • <Text style={styles.benefit}>استشارات:</Text> إرشاد متخصص
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 العمل الدولي:</Text>{"\n"}
          • <Text style={styles.benefit}>إيفاد للخارج:</Text> عمل في الخارج{"\n"}
          • <Text style={styles.benefit}>عمل عن بعد دولي:</Text> عمل من أي بلد{"\n"}
          • <Text style={styles.benefit}>تعاون دولي:</Text> مشاريع عالمية{"\n"}
          • <Text style={styles.benefit}>مهام مؤقتة:</Text> مهام قصيرة في الخارج{"\n"}
          • <Text style={styles.benefit}>عمل في منظمات دولية:</Text> عمل في كيانات عالمية{"\n"}
          • <Text style={styles.benefit}>تجارة دولية:</Text> أنشطة تجارية عالمية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 أنماط جديدة:</Text>{"\n"}
          • <Text style={styles.benefit}>اقتصاد العمل المؤقت:</Text> اقتصاد الأعمال المؤقتة{"\n"}
          • <Text style={styles.benefit}>عمل جماعي:</Text> عمل تعاوني عبر الإنترنت{"\n"}
          • <Text style={styles.benefit}>عمل بالأهداف:</Text> عمل مبني على النتائج{"\n"}
          • <Text style={styles.benefit}>عمل مشترك:</Text> مساحات عمل مشتركة{"\n"}
          • <Text style={styles.benefit}>ريادة أعمال:</Text> إنشاء عمل خاص{"\n"}
          • <Text style={styles.benefit}>عمل ذاتي:</Text> عمل لحساب شخصي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Desafíos y oportunidades del mundo laboral actual</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🤖 Automatización y tecnología:</Text>{"\n"}
          • <Text style={styles.benefit}>Transformación digital:</Text> Adaptación a nuevas tecnologías{"\n"}
          • <Text style={styles.benefit}>Inteligencia artificial:</Text> Impacto en empleos tradicionales{"\n"}
          • <Text style={styles.benefit}>Automatización:</Text> Sustitución de tareas repetitivas{"\n"}
          • <Text style={styles.benefit}>Nuevas competencias:</Text> Habilidades digitales requeridas{"\n"}
          • <Text style={styles.benefit}>Reskilling:</Text> Recualificación profesional{"\n"}
          • <Text style={styles.benefit}>Upskilling:</Text> Mejora de competencias existentes
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Globalización:</Text>{"\n"}
          • <Text style={styles.benefit}>Competencia global:</Text> Mercado laboral internacional{"\n"}
          • <Text style={styles.benefit}>Movilidad internacional:</Text> Oportunidades en el extranjero{"\n"}
          • <Text style={styles.benefit}>Diversidad cultural:</Text> Entornos laborales multiculturales{"\n"}
          • <Text style={styles.benefit}>Idiomas:</Text> Competencias lingüísticas valoradas{"\n"}
          • <Text style={styles.benefit}>Adaptabilidad:</Text> Flexibilidad ante cambios{"\n"}
          • <Text style={styles.benefit}>Pensamiento global:</Text> Visión internacional
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚖️ Derechos y bienestar:</Text>{"\n"}
          • <Text style={styles.benefit}>Conciliación laboral:</Text> Equilibrio trabajo-vida{"\n"}
          • <Text style={styles.benefit}>Salud mental:</Text> Bienestar psicológico en el trabajo{"\n"}
          • <Text style={styles.benefit}>Diversidad e inclusión:</Text> Entornos laborales diversos{"\n"}
          • <Text style={styles.benefit}>Igualdad de género:</Text> Oportunidades equitativas{"\n"}
          • <Text style={styles.benefit}>Sostenibilidad:</Text> Trabajo responsable con el medio ambiente{"\n"}
          • <Text style={styles.benefit}>Ética laboral:</Text> Valores y principios en el trabajo
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 Nuevas oportunidades:</Text>{"\n"}
          • <Text style={styles.benefit}>Emprendimiento:</Text> Creación de propios negocios{"\n"}
          • <Text style={styles.benefit}>Economía colaborativa:</Text> Nuevos modelos de trabajo{"\n"}
          • <Text style={styles.benefit}>Trabajo por proyectos:</Text> Empleo basado en objetivos{"\n"}
          • <Text style={styles.benefit}>Flexibilidad horaria:</Text> Adaptación a necesidades personales{"\n"}
          • <Text style={styles.benefit}>Desarrollo continuo:</Text> Aprendizaje permanente{"\n"}
          • <Text style={styles.benefit}>Innovación:</Text> Nuevas formas de trabajar
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🤖 الأتمتة والتكنولوجيا:</Text>{"\n"}
          • <Text style={styles.benefit}>تحول رقمي:</Text> التكيف مع التكنولوجيات الجديدة{"\n"}
          • <Text style={styles.benefit}>ذكاء اصطناعي:</Text> تأثير على الوظائف التقليدية{"\n"}
          • <Text style={styles.benefit}>أتمتة:</Text> استبدال المهام المتكررة{"\n"}
          • <Text style={styles.benefit}>كفاءات جديدة:</Text> المهارات الرقمية المطلوبة{"\n"}
          • <Text style={styles.benefit}>إعادة التأهيل:</Text> إعادة تأهيل مهني{"\n"}
          • <Text style={styles.benefit}>تحسين الكفاءات:</Text> تحسين الكفاءات الموجودة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 العولمة:</Text>{"\n"}
          • <Text style={styles.benefit}>منافسة عالمية:</Text> سوق عمل دولي{"\n"}
          • <Text style={styles.benefit}>تنقل دولي:</Text> فرص في الخارج{"\n"}
          • <Text style={styles.benefit}>تنوع ثقافي:</Text> بيئات عمل متعددة الثقافات{"\n"}
          • <Text style={styles.benefit}>لغات:</Text> كفاءات لغوية مقدرة{"\n"}
          • <Text style={styles.benefit}>تكيف:</Text> مرونة أمام التغييرات{"\n"}
          • <Text style={styles.benefit}>تفكير عالمي:</Text> رؤية دولية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚖️ الحقوق والرفاه:</Text>{"\n"}
          • <Text style={styles.benefit}>التوفيق المهني:</Text> توازن العمل-الحياة{"\n"}
          • <Text style={styles.benefit}>صحة عقلية:</Text> رفاه نفسي في العمل{"\n"}
          • <Text style={styles.benefit}>تنوع وشمول:</Text> بيئات عمل متنوعة{"\n"}
          • <Text style={styles.benefit}>مساواة الجنسين:</Text> فرص عادلة{"\n"}
          • <Text style={styles.benefit}>استدامة:</Text> عمل مسؤول مع البيئة{"\n"}
          • <Text style={styles.benefit}>أخلاقيات العمل:</Text> قيم ومبادئ في العمل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 فرص جديدة:</Text>{"\n"}
          • <Text style={styles.benefit}>ريادة أعمال:</Text> إنشاء أعمال خاصة{"\n"}
          • <Text style={styles.benefit}>اقتصاد تعاوني:</Text> نماذج عمل جديدة{"\n"}
          • <Text style={styles.benefit}>عمل بالمشاريع:</Text> عمل مبني على الأهداف{"\n"}
          • <Text style={styles.benefit}>مرونة في الجداول:</Text> تكيف مع الاحتياجات الشخصية{"\n"}
          • <Text style={styles.benefit}>تطور مستمر:</Text> تعلم دائم{"\n"}
          • <Text style={styles.benefit}>ابتكار:</Text> طرق جديدة للعمل
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre el mundo laboral</Text>
        <Text style={styles.dialogo}>
          — ¿Cuáles son las ventajas y desventajas del teletrabajo? ¿Crees que el mercado laboral es justo?{"\n\n"}
          — El teletrabajo ofrece flexibilidad horaria, ahorro en transporte y mayor autonomía, pero puede dificultar la desconexión laboral y reducir la interacción social. Respecto a la justicia del mercado laboral, creo que hay avances importantes en igualdad y derechos, pero aún persisten desafíos como la brecha salarial y la discriminación que requieren atención continua.{"\n\n"}
          — ¿Qué opinas de la movilidad internacional para encontrar empleo?{"\n\n"}
          — La movilidad internacional es una excelente oportunidad para desarrollar competencias interculturales, aprender nuevos idiomas y ampliar perspectivas profesionales. Sin embargo, también presenta desafíos como la adaptación cultural, la separación familiar y las barreras administrativas que deben considerarse cuidadosamente.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما هي مزايا وعيوب العمل عن بعد؟ هل تعتقد أن سوق العمل عادل؟{"\n\n"}
          — العمل عن بعد يوفر مرونة في الجداول، توفير في النقل واستقلالية أكبر، لكنه قد يصعب الانفصال عن العمل ويقلل التفاعل الاجتماعي. بالنسبة لعدالة سوق العمل، أعتقد أن هناك تقدمات مهمة في المساواة والحقوق، لكن لا تزال هناك تحديات مثل الفجوة في الأجور والتمييز التي تحتاج اهتماماً مستمراً.{"\n\n"}
          — ما رأيك في التنقل الدولي للحصول على وظيفة؟{"\n\n"}
          — التنقل الدولي فرصة ممتازة لتطوير كفاءات بين ثقافية، تعلم لغات جديدة وتوسيع المنظور المهني. لكنه يقدم أيضاً تحديات مثل التكيف الثقافي والانفصال العائلي والعقبات الإدارية التي يجب النظر فيها بعناية.
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
