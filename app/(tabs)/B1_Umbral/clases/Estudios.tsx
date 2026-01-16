import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Estudios() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[6] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 6);
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
    // Ejercicio 1: Vocabulario - Términos educativos
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada término educativo con su definición',
      pares: [
        { izquierda: '📚 Asignatura', derecha: 'Materia o disciplina que se estudia' },
        { izquierda: '📝 Examen', derecha: 'Prueba para evaluar conocimientos' },
        { izquierda: '💰 Beca', derecha: 'Ayuda económica para estudiar' },
        { izquierda: '📋 Matrícula', derecha: 'Inscripción oficial en un centro' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué palabra se refiere al documento que permite estudiar en una universidad?',
      opciones: ['Examen', 'Matrícula', 'Asignatura', 'Beca'],
      respuesta_correcta: 'Matrícula'
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "asignatura"?',
      opciones: ['Un examen', 'Una materia o disciplina que se estudia', 'Una beca', 'Un título'],
      respuesta_correcta: 'Una materia o disciplina que se estudia'
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "ESO"?',
      opciones: ['Educación Superior Obligatoria', 'Educación Secundaria Obligatoria', 'Educación Superior Oficial', 'Educación Secundaria Oficial'],
      respuesta_correcta: 'Educación Secundaria Obligatoria'
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "aprobar" un examen?',
      opciones: ['Suspender', 'Obtener una nota suficiente para pasar', 'Repetir', 'Estudiar'],
      respuesta_correcta: 'Obtener una nota suficiente para pasar'
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "beca"?',
      opciones: ['Un examen', 'Una ayuda económica para estudiar', 'Una asignatura', 'Un título'],
      respuesta_correcta: 'Una ayuda económica para estudiar'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "suspender" un examen?',
      opciones: ['Aprobar', 'No obtener la nota mínima para pasar', 'Estudiar mucho', 'Presentarse al examen'],
      respuesta_correcta: 'No obtener la nota mínima para pasar'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "Selectividad"?',
      opciones: ['Un tipo de beca', 'Prueba de acceso a la universidad', 'Una asignatura', 'Un título universitario'],
      respuesta_correcta: 'Prueba de acceso a la universidad'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "carrera universitaria"?',
      opciones: ['Un trabajo', 'Estudios superiores en una disciplina', 'Un deporte', 'Una actividad extraescolar'],
      respuesta_correcta: 'Estudios superiores en una disciplina'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "profesor"?',
      opciones: ['Un estudiante', 'Una persona que enseña', 'Un libro', 'Una asignatura'],
      respuesta_correcta: 'Una persona que enseña'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "nota de corte"?',
      opciones: ['La nota más alta', 'Puntuación mínima para acceder a una carrera', 'La nota media', 'La nota más baja'],
      respuesta_correcta: 'Puntuación mínima para acceder a una carrera'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es "Bachillerato"?',
      opciones: ['Educación primaria', 'Preparación para la universidad', 'Educación universitaria', 'Formación profesional'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "alumno"?',
      opciones: ['Un profesor', 'Una persona que estudia', 'Un libro', 'Una asignatura'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es "Formación Profesional"?',
      opciones: ['Solo estudios universitarios', 'Estudios prácticos para trabajar', 'Solo estudios de bachillerato', 'Solo estudios primarios'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "graduarse"?',
      opciones: ['Suspender', 'Terminar exitosamente unos estudios', 'Empezar a estudiar', 'Cambiar de carrera'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Niveles educativos
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada nivel educativo con su descripción',
      pares: [
        { izquierda: '🏫 Primaria', derecha: 'Educación básica de 6 a 12 años' },
        { izquierda: '🏢 ESO', derecha: 'Educación secundaria de 12 a 16 años' },
        { izquierda: '🎓 Bachillerato', derecha: 'Preparación para la universidad' },
        { izquierda: '🏛️ Universidad', derecha: 'Educación superior y especializada' }
      ]
    },

    // Ejercicio 17: Vocabulario - Tipos de becas
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de beca con su característica',
      pares: [
        { izquierda: '🏆 Beca por notas', derecha: 'Para estudiantes con buenas calificaciones' },
        { izquierda: '💰 Beca económica', derecha: 'Para familias con bajos ingresos' },
        { izquierda: '✈️ Beca de movilidad', derecha: 'Para estudiar en el extranjero' },
        { izquierda: '🎯 Beca deportiva', derecha: 'Para deportistas destacados' }
      ]
    },

    // Ejercicio 18: Vocabulario - Conceptos académicos
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada concepto con su significado',
      pares: [
        { izquierda: '📊 Nota', derecha: 'Calificación o puntuación' },
        { izquierda: '📅 Curso', derecha: 'Año académico' },
        { izquierda: '📖 Título', derecha: 'Diploma oficial de estudios' },
        { izquierda: '🎯 Objetivo', derecha: 'Meta o propósito académico' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "estudiar"?',
      opciones: ['Solo dormir', 'Aprender y adquirir conocimientos', 'Solo jugar', 'Solo trabajar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es importante para tener éxito en los estudios?',
      opciones: ['Solo dormir mucho', 'Organización, esfuerzo y constancia', 'Solo tener suerte', 'Solo copiar'],
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
        source={{ uri: 'https://images.unsplash.com/photo-1523240797355-351f22a86b98?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de estudios y educación"
      />
      
      <Text style={styles.title}>📚 Estudios y educación</Text>
      <Text style={styles.titleAr}>📚 الدراسة والتعليم</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Contexto educativo en España</Text>
        <Text style={styles.sectionText}>
          España cuenta con un sistema educativo moderno y accesible que ofrece múltiples 
          oportunidades de formación. La educación es obligatoria hasta los 16 años y 
          gratuita en centros públicos, garantizando el acceso universal a la formación básica.
          {"\n\n"}
          El sistema educativo español está reconocido internacionalmente y ofrece 
          diferentes vías de formación: académica, profesional y técnica, adaptándose 
          a las necesidades y capacidades de cada estudiante.
        </Text>
        <Text style={styles.sectionTextAr}>
          إسبانيا لديها نظام تعليمي حديث ومتاح يوفر فرص تدريب متعددة.
          التعليم إلزامي حتى سن 16 ومجاني في المراكز العامة، مما يضمن الوصول العالمي للتدريب الأساسي.
          {"\n\n"}
          النظام التعليمي الإسباني معترف به دولياً ويوفر طرق تدريب مختلفة:
          أكاديمية ومهنية وتقنية، تتكيف مع احتياجات وقدرات كل طالب.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏫 Sistema educativo español</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎒 Educación Primaria:</Text>{"\n"}
          • <Text style={styles.benefit}>Edad:</Text> De 6 a 12 años{"\n"}
          • <Text style={styles.benefit}>Características:</Text> Obligatoria y gratuita{"\n"}
          • <Text style={styles.benefit}>Objetivo:</Text> Educación básica fundamental{"\n"}
          • <Text style={styles.benefit}>Contenido:</Text> Desarrollo de habilidades básicas
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 Educación Secundaria (ESO):</Text>{"\n"}
          • <Text style={styles.benefit}>Edad:</Text> De 12 a 16 años{"\n"}
          • <Text style={styles.benefit}>Características:</Text> Obligatoria y gratuita{"\n"}
          • <Text style={styles.benefit}>Objetivo:</Text> Preparación para estudios superiores{"\n"}
          • <Text style={styles.benefit}>Contenido:</Text> Orientación académica y profesional
          {"\n\n"}
          <Text style={styles.subtitle}>🎓 Bachillerato:</Text>{"\n"}
          • <Text style={styles.benefit}>Edad:</Text> De 16 a 18 años{"\n"}
          • <Text style={styles.benefit}>Características:</Text> No obligatorio{"\n"}
          • <Text style={styles.benefit}>Objetivo:</Text> Preparación para la universidad{"\n"}
          • <Text style={styles.benefit}>Modalidades:</Text> Ciencias, Humanidades, Artes
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎒 التعليم الابتدائي:</Text>{"\n"}
          • <Text style={styles.benefit}>العمر:</Text> من 6 إلى 12 سنة{"\n"}
          • <Text style={styles.benefit}>الخصائص:</Text> إلزامي ومجاني{"\n"}
          • <Text style={styles.benefit}>الهدف:</Text> تعليم أساسي أساسي{"\n"}
          • <Text style={styles.benefit}>المحتوى:</Text> تطوير المهارات الأساسية
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 التعليم الثانوي (ESO):</Text>{"\n"}
          • <Text style={styles.benefit}>العمر:</Text> من 12 إلى 16 سنة{"\n"}
          • <Text style={styles.benefit}>الخصائص:</Text> إلزامي ومجاني{"\n"}
          • <Text style={styles.benefit}>الهدف:</Text> التحضير للدراسات العليا{"\n"}
          • <Text style={styles.benefit}>المحتوى:</Text> التوجيه الأكاديمي والمهني
          {"\n\n"}
          <Text style={styles.subtitle}>🎓 البكالوريا:</Text>{"\n"}
          • <Text style={styles.benefit}>العمر:</Text> من 16 إلى 18 سنة{"\n"}
          • <Text style={styles.benefit}>الخصائص:</Text> غير إلزامي{"\n"}
          • <Text style={styles.benefit}>الهدف:</Text> التحضير للجامعة{"\n"}
          • <Text style={styles.benefit}>التخصصات:</Text> علوم، إنسانيات، فنون
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏛️ Educación superior en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎓 Universidad:</Text>{"\n"}
          • <Text style={styles.benefit}>Grados:</Text> 4 años de estudios superiores{"\n"}
          • <Text style={styles.benefit}>Máster:</Text> Especialización de 1-2 años{"\n"}
          • <Text style={styles.benefit}>Doctorado:</Text> Investigación avanzada{"\n"}
          • <Text style={styles.benefit}>Acceso:</Text> Selectividad (PAU) + nota de corte
          {"\n\n"}
          <Text style={styles.subtitle}>🔧 Formación Profesional:</Text>{"\n"}
          • <Text style={styles.benefit}>FP Básica:</Text> Para estudiantes de 15-17 años{"\n"}
          • <Text style={styles.benefit}>FP Grado Medio:</Text> 2 años de formación práctica{"\n"}
          • <Text style={styles.benefit}>FP Grado Superior:</Text> 2 años, acceso a universidad{"\n"}
          • <Text style={styles.benefit}>Ventajas:</Text> Formación práctica y rápida inserción laboral
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 Enseñanzas artísticas:</Text>{"\n"}
          • <Text style={styles.benefit}>Música:</Text> Conservatorios profesionales{"\n"}
          • <Text style={styles.benefit}>Danza:</Text> Escuelas de danza{"\n"}
          • <Text style={styles.benefit}>Artes plásticas:</Text> Escuelas de arte{"\n"}
          • <Text style={styles.benefit}>Diseño:</Text> Escuelas de diseño
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎓 الجامعة:</Text>{"\n"}
          • <Text style={styles.benefit}>الدرجات:</Text> 4 سنوات من الدراسات العليا{"\n"}
          • <Text style={styles.benefit}>الماجستير:</Text> تخصص من 1-2 سنة{"\n"}
          • <Text style={styles.benefit}>الدكتوراه:</Text> بحث متقدم{"\n"}
          • <Text style={styles.benefit}>الالتحاق:</Text> الانتقاء (PAU) + درجة القطع
          {"\n\n"}
          <Text style={styles.subtitle}>🔧 التدريب المهني:</Text>{"\n"}
          • <Text style={styles.benefit}>FP الأساسي:</Text> للطلاب من 15-17 سنة{"\n"}
          • <Text style={styles.benefit}>FP المستوى المتوسط:</Text> سنتان من التدريب العملي{"\n"}
          • <Text style={styles.benefit}>FP المستوى العالي:</Text> سنتان، الالتحاق بالجامعة{"\n"}
          • <Text style={styles.benefit}>المزايا:</Text> تدريب عملي وإدراج سريع في العمل
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 التعليمات الفنية:</Text>{"\n"}
          • <Text style={styles.benefit}>الموسيقى:</Text> معاهد موسيقية احترافية{"\n"}
          • <Text style={styles.benefit}>الرقص:</Text> مدارس الرقص{"\n"}
          • <Text style={styles.benefit}>الفنون البصرية:</Text> مدارس الفن{"\n"}
          • <Text style={styles.benefit}>التصميم:</Text> مدارس التصميم
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Acceso a la universidad</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📋 Requisitos principales:</Text>{"\n"}
          • <Text style={styles.benefit}>Bachillerato:</Text> Completar estudios de bachillerato{"\n"}
          • <Text style={styles.benefit}>Selectividad (PAU):</Text> Superar la prueba de acceso{"\n"}
          • <Text style={styles.benefit}>Nota de corte:</Text> Puntuación mínima requerida{"\n"}
          • <Text style={styles.benefit}>Preinscripción:</Text> Solicitud de plaza universitaria
          {"\n\n"}
          <Text style={styles.subtitle}>📝 Proceso de matrícula:</Text>{"\n"}
          • <Text style={styles.benefit}>Matrícula:</Text> Formalización de la inscripción{"\n"}
          • <Text style={styles.benefit}>Documentación:</Text> DNI, título de bachillerato{"\n"}
          • <Text style={styles.benefit}>Pago:</Text> Tasas universitarias{"\n"}
          • <Text style={styles.benefit}>Becas:</Text> Ayudas económicas disponibles
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📋 المتطلبات الرئيسية:</Text>{"\n"}
          • <Text style={styles.benefit}>البكالوريا:</Text> إكمال دراسات البكالوريا{"\n"}
          • <Text style={styles.benefit}>الانتقاء (PAU):</Text> اجتياز امتحان الالتحاق{"\n"}
          • <Text style={styles.benefit}>درجة القطع:</Text> الحد الأدنى المطلوب{"\n"}
          • <Text style={styles.benefit}>التسجيل المسبق:</Text> طلب مقعد جامعي
          {"\n\n"}
          <Text style={styles.subtitle}>📝 عملية التسجيل:</Text>{"\n"}
          • <Text style={styles.benefit}>التسجيل:</Text> إضفاء الطابع الرسمي على التسجيل{"\n"}
          • <Text style={styles.benefit}>الوثائق:</Text> الهوية، شهادة البكالوريا{"\n"}
          • <Text style={styles.benefit}>الدفع:</Text> الرسوم الجامعية{"\n"}
          • <Text style={styles.benefit}>المنح:</Text> المساعدات الاقتصادية المتاحة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Tipos de becas y ayudas</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏆 Becas por rendimiento académico:</Text>{"\n"}
          • <Text style={styles.benefit}>Requisitos:</Text> Para estudiantes con buenas notas{"\n"}
          • <Text style={styles.benefit}>Cobertura:</Text> Total o parcial de matrícula{"\n"}
          • <Text style={styles.benefit}>Nota mínima:</Text> Generalmente 8.0 o superior
          {"\n\n"}
          <Text style={styles.subtitle}>💰 Becas por situación económica:</Text>{"\n"}
          • <Text style={styles.benefit}>Requisitos:</Text> Para familias con bajos ingresos{"\n"}
          • <Text style={styles.benefit}>Cobertura:</Text> Matrícula, alojamiento, material{"\n"}
          • <Text style={styles.benefit}>Evaluación:</Text> Recursos familiares y renta
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ Becas de movilidad:</Text>{"\n"}
          • <Text style={styles.benefit}>Erasmus+:</Text> Para estudiar en el extranjero{"\n"}
          • <Text style={styles.benefit}>Intercambios:</Text> Programas internacionales{"\n"}
          • <Text style={styles.benefit}>Duración:</Text> De 3 meses a 1 año académico
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 Becas específicas:</Text>{"\n"}
          • <Text style={styles.benefit}>Deportivas:</Text> Para deportistas destacados{"\n"}
          • <Text style={styles.benefit}>Artísticas:</Text> Para estudiantes de arte{"\n"}
          • <Text style={styles.benefit}>Investigación:</Text> Para proyectos de investigación
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏆 منح الأداء الأكاديمي:</Text>{"\n"}
          • <Text style={styles.benefit}>المتطلبات:</Text> للطلاب ذوي الدرجات الجيدة{"\n"}
          • <Text style={styles.benefit}>التغطية:</Text> كاملة أو جزئية للتسجيل{"\n"}
          • <Text style={styles.benefit}>الحد الأدنى:</Text> عادة 8.0 أو أعلى
          {"\n\n"}
          <Text style={styles.subtitle}>💰 منح الوضع الاقتصادي:</Text>{"\n"}
          • <Text style={styles.benefit}>المتطلبات:</Text> للأسر ذات الدخل المنخفض{"\n"}
          • <Text style={styles.benefit}>التغطية:</Text> تسجيل، سكن، مواد{"\n"}
          • <Text style={styles.benefit}>التقييم:</Text> الموارد العائلية والدخل
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ منح التنقل:</Text>{"\n"}
          • <Text style={styles.benefit}>إيراسموس+:</Text> للدراسة في الخارج{"\n"}
          • <Text style={styles.benefit}>التبادلات:</Text> برامج دولية{"\n"}
          • <Text style={styles.benefit}>المدة:</Text> من 3 أشهر إلى سنة أكاديمية
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 منح محددة:</Text>{"\n"}
          • <Text style={styles.benefit}>رياضية:</Text> للرياضيين المتميزين{"\n"}
          • <Text style={styles.benefit}>فنية:</Text> لطلاب الفن{"\n"}
          • <Text style={styles.benefit}>بحثية:</Text> لمشاريع البحث
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de estudios</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📝 Conceptos básicos:</Text>{"\n"}
          estudios = دراسة{"\n"}
          educación = تعليم{"\n"}
          asignatura = مادة دراسية{"\n"}
          examen = امتحان{"\n"}
          matrícula = تسجيل{"\n"}
          beca = منحة دراسية{"\n"}
          carrera = تخصص{"\n"}
          universidad = جامعة
          {"\n\n"}
          <Text style={styles.subtitle}>🏫 Centros educativos:</Text>{"\n"}
          instituto = معهد{"\n"}
          colegio = مدرسة{"\n"}
          escuela = مدرسة{"\n"}
          facultad = كلية{"\n"}
          campus = حرم جامعي{"\n"}
          biblioteca = مكتبة{"\n"}
          laboratorio = مختبر
          {"\n\n"}
          <Text style={styles.subtitle}>📊 Evaluación:</Text>{"\n"}
          aprobar = نجح{"\n"}
          suspender = رسب{"\n"}
          nota = درجة{"\n"}
          calificación = تقييم{"\n"}
          media = متوسط{"\n"}
          sobresaliente = ممتاز{"\n"}
          notable = جيد جداً
          {"\n\n"}
          <Text style={styles.subtitle}>👥 Personas:</Text>{"\n"}
          profesor = مدرس{"\n"}
          alumno = طالب{"\n"}
          estudiante = طالب{"\n"}
          director = مدير{"\n"}
          tutor = معلم{"\n"}
          compañero = زميل{"\n"}
          graduado = متخرج
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📝 المفاهيم الأساسية:</Text>{"\n"}
          دراسة = estudios{"\n"}
          تعليم = educación{"\n"}
          مادة دراسية = asignatura{"\n"}
          امتحان = examen{"\n"}
          تسجيل = matrícula{"\n"}
          منحة دراسية = beca{"\n"}
          تخصص = carrera{"\n"}
          جامعة = universidad
          {"\n\n"}
          <Text style={styles.subtitle}>🏫 المراكز التعليمية:</Text>{"\n"}
          معهد = instituto{"\n"}
          مدرسة = colegio{"\n"}
          مدرسة = escuela{"\n"}
          كلية = facultad{"\n"}
          حرم جامعي = campus{"\n"}
          مكتبة = biblioteca{"\n"}
          مختبر = laboratorio
          {"\n\n"}
          <Text style={styles.subtitle}>📊 التقييم:</Text>{"\n"}
          نجح = aprobar{"\n"}
          رسب = suspender{"\n"}
          درجة = nota{"\n"}
          تقييم = calificación{"\n"}
          متوسط = media{"\n"}
          ممتاز = sobresaliente{"\n"}
          جيد جداً = notable
          {"\n\n"}
          <Text style={styles.subtitle}>👥 الأشخاص:</Text>{"\n"}
          مدرس = profesor{"\n"}
          طالب = alumno{"\n"}
          طالب = estudiante{"\n"}
          مدير = director{"\n"}
          معلم = tutor{"\n"}
          زميل = compañero{"\n"}
          متخرج = graduado
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles para estudios</Text>
        <Text style={styles.sectionText}>
          • "¿Qué carrera estudias?" = ما التخصص الذي تدرسه؟{"\n"}
          • "¿En qué universidad estudias?" = في أي جامعة تدرس؟{"\n"}
          • "¿Qué asignaturas tienes este curso?" = ما المواد التي لديك هذا العام؟{"\n"}
          • "¿Cómo te va en los estudios?" = كيف تسير دراستك؟{"\n"}
          • "¿Tienes beca para estudiar?" = هل لديك منحة للدراسة؟{"\n"}
          • "¿Qué nota sacaste en el examen?" = ما الدرجة التي حصلت عليها في الامتحان？{"\n"}
          • "¿Cuándo tienes las vacaciones?" = متى لديك العطل؟{"\n"}
          • "¿Qué quieres estudiar en el futuro?" = ماذا تريد أن تدرس في المستقبل؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "ما التخصص الذي تدرسه؟" = ¿Qué carrera estudias?{"\n"}
          • "في أي جامعة تدرس؟" = ¿En qué universidad estudias?{"\n"}
          • "ما المواد التي لديك هذا العام؟" = ¿Qué asignaturas tienes este curso?{"\n"}
          • "كيف تسير دراستك؟" = ¿Cómo te va en los estudios?{"\n"}
          • "هل لديك منحة للدراسة؟" = ¿Tienes beca para estudiar?{"\n"}
          • "ما الدرجة التي حصلت عليها في الامتحان؟" = ¿Qué nota sacaste en el examen?{"\n"}
          • "متى لديك العطل؟" = ¿Cuándo tienes las vacaciones?{"\n"}
          • "ماذا تريد أن تدرس في المستقبل؟" = ¿Qué quieres estudiar en el futuro?
        </Text>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para el éxito académico</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📅 Organización del tiempo:</Text>{"\n"}
          • <Text style={styles.tip}>Planificar:</Text> Crear un horario de estudio{"\n"}
          • <Text style={styles.tip}>Priorizar:</Text> Estudiar lo más importante primero{"\n"}
          • <Text style={styles.tip}>Descansar:</Text> Tomar pausas regulares{"\n"}
          • <Text style={styles.tip}>Ser constante:</Text> Estudiar todos los días
          {"\n\n"}
          <Text style={styles.subtitle}>📖 Técnicas de estudio:</Text>{"\n"}
          • <Text style={styles.tip}>Subrayar:</Text> Marcar información importante{"\n"}
          • <Text style={styles.tip}>Resumir:</Text> Hacer esquemas y resúmenes{"\n"}
          • <Text style={styles.tip}>Repasar:</Text> Revisar material regularmente{"\n"}
          • <Text style={styles.tip}>Practicar:</Text> Hacer ejercicios y problemas
          {"\n\n"}
          <Text style={styles.subtitle}>🧠 Hábitos saludables:</Text>{"\n"}
          • <Text style={styles.tip}>Dormir bien:</Text> 7-8 horas de sueño{"\n"}
          • <Text style={styles.tip}>Alimentarse:</Text> Comida saludable y equilibrada{"\n"}
          • <Text style={styles.tip}>Ejercicio:</Text> Actividad física regular{"\n"}
          • <Text style={styles.tip}>Relajación:</Text> Técnicas de manejo del estrés
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📅 تنظيم الوقت:</Text>{"\n"}
          • <Text style={styles.tip}>التخطيط:</Text> إنشاء جدول دراسة{"\n"}
          • <Text style={styles.tip}>الأولوية:</Text> دراسة الأهم أولاً{"\n"}
          • <Text style={styles.tip}>الراحة:</Text> أخذ فترات راحة منتظمة{"\n"}
          • <Text style={styles.tip}>الاستمرارية:</Text> الدراسة كل يوم
          {"\n\n"}
          <Text style={styles.subtitle}>📖 تقنيات الدراسة:</Text>{"\n"}
          • <Text style={styles.tip}>التأكيد:</Text> تحديد المعلومات المهمة{"\n"}
          • <Text style={styles.tip}>التلخيص:</Text> عمل مخططات وملخصات{"\n"}
          • <Text style={styles.tip}>المراجعة:</Text> مراجعة المواد بانتظام{"\n"}
          • <Text style={styles.tip}>الممارسة:</Text> عمل تمارين ومشاكل
          {"\n\n"}
          <Text style={styles.subtitle}>🧠 عادات صحية:</Text>{"\n"}
          • <Text style={styles.tip}>النوم الجيد:</Text> 7-8 ساعات نوم{"\n"}
          • <Text style={styles.tip}>التغذية:</Text> طعام صحي ومتوازن{"\n"}
          • <Text style={styles.tip}>التمرين:</Text> نشاط بدني منتظم{"\n"}
          • <Text style={styles.tip}>الاسترخاء:</Text> تقنيات إدارة التوتر
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎓 Carreras universitarias populares</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💻 Tecnología e Informática:</Text>{"\n"}
          • <Text style={styles.benefit}>Ingeniería Informática:</Text> Programación y sistemas{"\n"}
          • <Text style={styles.benefit}>Ingeniería de Telecomunicaciones:</Text> Comunicaciones{"\n"}
          • <Text style={styles.benefit}>Ciencias de la Computación:</Text> Algoritmos y software
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Ciencias de la Salud:</Text>{"\n"}
          • <Text style={styles.benefit}>Medicina:</Text> Diagnóstico y tratamiento{"\n"}
          • <Text style={styles.benefit}>Enfermería:</Text> Cuidado de pacientes{"\n"}
          • <Text style={styles.benefit}>Farmacia:</Text> Medicamentos y química
          {"\n\n"}
          <Text style={styles.subtitle}>💰 Economía y Empresa:</Text>{"\n"}
          • <Text style={styles.benefit}>Administración de Empresas:</Text> Gestión empresarial{"\n"}
          • <Text style={styles.benefit}>Economía:</Text> Análisis económico{"\n"}
          • <Text style={styles.benefit}>Finanzas:</Text> Gestión financiera
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 Humanidades y Artes:</Text>{"\n"}
          • <Text style={styles.benefit}>Filología:</Text> Lenguas y literatura{"\n"}
          • <Text style={styles.benefit}>Historia:</Text> Estudio del pasado{"\n"}
          • <Text style={styles.benefit}>Bellas Artes:</Text> Creación artística
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💻 التكنولوجيا والمعلوماتية:</Text>{"\n"}
          • <Text style={styles.benefit}>هندسة المعلوماتية:</Text> البرمجة والأنظمة{"\n"}
          • <Text style={styles.benefit}>هندسة الاتصالات:</Text> الاتصالات{"\n"}
          • <Text style={styles.benefit}>علوم الحاسوب:</Text> الخوارزميات والبرمجيات
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 علوم الصحة:</Text>{"\n"}
          • <Text style={styles.benefit}>الطب:</Text> التشخيص والعلاج{"\n"}
          • <Text style={styles.benefit}>التمريض:</Text> رعاية المرضى{"\n"}
          • <Text style={styles.benefit}>الصيدلة:</Text> الأدوية والكيمياء
          {"\n\n"}
          <Text style={styles.subtitle}>💰 الاقتصاد والأعمال:</Text>{"\n"}
          • <Text style={styles.benefit}>إدارة الأعمال:</Text> الإدارة التجارية{"\n"}
          • <Text style={styles.benefit}>الاقتصاد:</Text> التحليل الاقتصادي{"\n"}
          • <Text style={styles.benefit}>المالية:</Text> الإدارة المالية
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 الإنسانيات والفنون:</Text>{"\n"}
          • <Text style={styles.benefit}>اللغات:</Text> اللغات والأدب{"\n"}
          • <Text style={styles.benefit}>التاريخ:</Text> دراسة الماضي{"\n"}
          • <Text style={styles.benefit}>الفنون الجميلة:</Text> الإبداع الفني
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته مع هذه التمارين التفاعلية.</Text>
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
    color: '#ff6f00',
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
