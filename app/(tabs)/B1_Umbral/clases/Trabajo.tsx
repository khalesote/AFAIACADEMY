import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Trabajo() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[0] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 0);
    }
    // Navegar directamente a la siguiente unidad (Vivienda)
    router.push('/B1_Umbral/clases/Vivienda');
  };

  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué palabra se refiere al dinero que recibes por tu trabajo?',
      opciones: ['Jornada', 'Salario', 'Entrevista', 'Profesión'],
      respuesta_correcta: 'Salario'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "profesión"?',
      opciones: ['Un lugar de trabajo', 'Una actividad laboral que requiere formación específica', 'Un salario', 'Una entrevista'],
      respuesta_correcta: 'Una actividad laboral que requiere formación específica'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada término laboral con su definición:',
      pares: [
        { izquierda: 'Jornada laboral', derecha: 'Horario de trabajo diario' },
        { izquierda: 'Salario', derecha: 'Remuneración económica por el trabajo' },
        { izquierda: 'Entrevista', derecha: 'Conversación para evaluar candidatos' },
        { izquierda: 'Currículum', derecha: 'Documento con experiencia y formación' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "contrato de trabajo"?',
      opciones: ['Un salario', 'Un documento que establece las condiciones laborales', 'Una entrevista', 'Una profesión'],
      respuesta_correcta: 'Un documento que establece las condiciones laborales'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "desempleo"?',
      opciones: ['Tener un trabajo', 'No tener trabajo remunerado', 'Cambiar de trabajo', 'Buscar trabajo'],
      respuesta_correcta: 'No tener trabajo remunerado'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada sector laboral con su descripción:',
      pares: [
        { izquierda: 'Tecnología', derecha: 'Sector con salarios más altos' },
        { izquierda: 'Sanidad', derecha: 'Cuidado de la salud' },
        { izquierda: 'Educación', derecha: 'Enseñanza y formación' },
        { izquierda: 'Turismo', derecha: 'Servicios hoteleros y de viajes' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es el "salario mínimo"?',
      opciones: ['El salario más alto', 'La remuneración mínima legal por hora de trabajo', 'Un tipo de contrato', 'Una profesión'],
      respuesta_correcta: 'La remuneración mínima legal por hora de trabajo'
    },
    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "jornada laboral"?',
      opciones: ['El salario', 'Las horas de trabajo diarias', 'La entrevista', 'El contrato'],
      respuesta_correcta: 'Las horas de trabajo diarias'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "currículum vitae"?',
      opciones: ['Un contrato', 'Un documento con experiencia y formación', 'Un salario', 'Una entrevista'],
      respuesta_correcta: 'Un documento con experiencia y formación'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "empresa"?',
      opciones: ['Un trabajador', 'Una organización que ofrece productos o servicios', 'Un salario', 'Una profesión'],
      respuesta_correcta: 'Una organización que ofrece productos o servicios'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "jefe"?',
      opciones: ['Un compañero de trabajo', 'La persona que dirige un equipo o departamento', 'Un cliente', 'Un proveedor'],
      respuesta_correcta: 'La persona que dirige un equipo o departamento'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "formación"?',
      opciones: ['El salario', 'La educación y preparación para un trabajo', 'La entrevista', 'El contrato'],
      respuesta_correcta: 'La educación y preparación para un trabajo'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es "experiencia laboral"?',
      opciones: ['El salario', 'El tiempo trabajando en una profesión', 'La entrevista', 'La formación'],
      respuesta_correcta: 'El tiempo trabajando en una profesión'
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "sector laboral"?',
      opciones: ['Un tipo de contrato', 'Un área específica de actividad económica', 'Un tipo de salario', 'Una profesión'],
      respuesta_correcta: 'Un área específica de actividad económica'
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es "teletrabajo"?',
      opciones: ['Trabajar en una oficina', 'Trabajar desde casa usando tecnología', 'Trabajar en la calle', 'Trabajar en una fábrica'],
      respuesta_correcta: 'Trabajar desde casa usando tecnología'
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "promoción laboral"?',
      opciones: ['Cambiar de trabajo', 'Ascender a un puesto mejor en la misma empresa', 'Renunciar al trabajo', 'Buscar trabajo'],
      respuesta_correcta: 'Ascender a un puesto mejor en la misma empresa'
    },

    // Ejercicio 16: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada sector laboral con su descripción:',
      pares: [
        { izquierda: '💻 Tecnología', derecha: 'Sector con salarios más altos' },
        { izquierda: '🏥 Sanidad', derecha: 'Cuidado de la salud' },
        { izquierda: '📚 Educación', derecha: 'Enseñanza y formación' },
        { izquierda: '🏨 Turismo', derecha: 'Servicios hoteleros y de viajes' }
      ]
    },

    // Ejercicio 17: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada derecho laboral con su descripción:',
      pares: [
        { izquierda: '💰 Salario mínimo', derecha: 'Remuneración mínima legal garantizada' },
        { izquierda: '⏰ Jornada máxima', derecha: 'Límite de horas de trabajo semanales' },
        { izquierda: '🏖️ Vacaciones', derecha: 'Días de descanso pagados' },
        { izquierda: '🏥 Seguridad social', derecha: 'Cobertura médica y pensiones' }
      ]
    },

    // Ejercicio 18: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada paso del proceso de búsqueda de empleo:',
      pares: [
        { izquierda: '📄 Preparar CV', derecha: 'Documentar experiencia y formación' },
        { izquierda: '🔍 Buscar ofertas', derecha: 'Revisar portales de empleo' },
        { izquierda: '🤝 Entrevista', derecha: 'Conversar con el empleador' },
        { izquierda: '✍️ Firmar contrato', derecha: 'Establecer condiciones laborales' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es importante en una entrevista de trabajo?',
      opciones: ['Llegar tarde', 'No prepararse', 'Mostrar profesionalidad y confianza', 'No hacer preguntas'],
      respuesta_correcta: 'Mostrar profesionalidad y confianza'
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué ventaja tiene el trabajo en España?',
      opciones: ['No hay derechos laborales', 'Protección legal y beneficios sociales', 'Solo trabajo temporal', 'Sin vacaciones'],
      respuesta_correcta: 'Protección legal y beneficios sociales'
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
        source={{ uri: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de trabajo y oficina"
      />
      
      <Text style={styles.title}>💼 Trabajo y profesiones</Text>
      <Text style={styles.titleAr}>💼 العمل والمهن</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia del trabajo</Text>
        <Text style={styles.sectionText}>
          El trabajo es fundamental para el desarrollo personal, económico y social. 
          Proporciona no solo ingresos económicos, sino también satisfacción personal, 
          desarrollo de habilidades y contribución a la sociedad.
          {"\n\n"}
          El mercado laboral español ofrece oportunidades en diversos sectores, 
          desde la tecnología hasta los servicios, cada uno con sus propias 
          características, requisitos y perspectivas de crecimiento.
          {"\n\n"}
          Es esencial conocer los derechos laborales, el proceso de búsqueda de empleo, 
          las diferentes opciones profesionales disponibles y las tendencias del mercado laboral.
        </Text>
        <Text style={styles.sectionTextAr}>
          العمل أساسي للتطور الشخصي والاقتصادي والاجتماعي.
          يوفر ليس فقط الدخل الاقتصادي، بل أيضاً الرضا الشخصي
          وتطوير المهارات والمساهمة في المجتمع.
          {"\n\n"}
          سوق العمل الإسباني يوفر فرصاً في قطاعات متنوعة،
          من التكنولوجيا إلى الخدمات، كل منها له خصائصه
          ومتطلباته وآفاق نموه الخاصة.
          {"\n\n"}
          من الضروري معرفة الحقوق العمالية وعملية البحث عن العمل
          والخيارات المهنية المختلفة المتاحة واتجاهات سوق العمل.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial del trabajo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💼 Conceptos básicos:</Text>{"\n"}
          trabajo = عمل{"\n"}
          profesión = مهنة{"\n"}
          empleo = وظيفة{"\n"}
          salario = راتب{"\n"}
          contrato = عقد{"\n"}
          jornada laboral = ساعات العمل{"\n"}
          entrevista = مقابلة{"\n"}
          currículum = سيرة ذاتية
          {"\n\n"}
          <Text style={styles.subtitle}>👥 Personas en el trabajo:</Text>{"\n"}
          jefe = مدير{"\n"}
          compañero = زميل{"\n"}
          empleado = موظف{"\n"}
          cliente = عميل{"\n"}
          proveedor = مورد{"\n"}
          supervisor = مشرف{"\n"}
          director = مدير{"\n"}
          secretario = سكرتير
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 Lugares de trabajo:</Text>{"\n"}
          oficina = مكتب{"\n"}
          empresa = شركة{"\n"}
          fábrica = مصنع{"\n"}
          tienda = متجر{"\n"}
          hospital = مستشفى{"\n"}
          escuela = مدرسة{"\n"}
          banco = بنك{"\n"}
          restaurante = مطعم
          {"\n\n"}
          <Text style={styles.subtitle}>📈 Desarrollo profesional:</Text>{"\n"}
          formación = تدريب{"\n"}
          experiencia = خبرة{"\n"}
          promoción = ترقية{"\n"}
          desempleo = بطالة{"\n"}
          sector = قطاع{"\n"}
          especialización = تخصص{"\n"}
          competencias = كفاءات{"\n"}
          habilidades = مهارات
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💼 المفاهيم الأساسية:</Text>{"\n"}
          عمل = trabajo{"\n"}
          مهنة = profesión{"\n"}
          وظيفة = empleo{"\n"}
          راتب = salario{"\n"}
          عقد = contrato{"\n"}
          ساعات العمل = jornada laboral{"\n"}
          مقابلة = entrevista{"\n"}
          سيرة ذاتية = currículum
          {"\n\n"}
          <Text style={styles.subtitle}>👥 الأشخاص في العمل:</Text>{"\n"}
          مدير = jefe{"\n"}
          زميل = compañero{"\n"}
          موظف = empleado{"\n"}
          عميل = cliente{"\n"}
          مورد = proveedor{"\n"}
          مشرف = supervisor{"\n"}
          مدير = director{"\n"}
          سكرتير = secretario
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 أماكن العمل:</Text>{"\n"}
          مكتب = oficina{"\n"}
          شركة = empresa{"\n"}
          مصنع = fábrica{"\n"}
          متجر = tienda{"\n"}
          مستشفى = hospital{"\n"}
          مدرسة = escuela{"\n"}
          بنك = banco{"\n"}
          مطعم = restaurante
          {"\n\n"}
          <Text style={styles.subtitle}>📈 التطور المهني:</Text>{"\n"}
          تدريب = formación{"\n"}
          خبرة = experiencia{"\n"}
          ترقية = promoción{"\n"}
          بطالة = desempleo{"\n"}
          قطاع = sector{"\n"}
          تخصص = especialización{"\n"}
          كفاءات = competencias{"\n"}
          مهارات = habilidades
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💼 Sectores laborales principales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💻 Tecnología:</Text>{"\n"}
          • <Text style={styles.benefit}>Desarrollo de software:</Text> Programación y creación de aplicaciones{"\n"}
          • <Text style={styles.benefit}>Análisis de datos:</Text> Interpretación de información empresarial{"\n"}
          • <Text style={styles.benefit}>Ciberseguridad:</Text> Protección de sistemas informáticos{"\n"}
          • <Text style={styles.benefit}>Inteligencia artificial:</Text> Desarrollo de sistemas inteligentes{"\n"}
          • <Text style={styles.benefit}>Marketing digital:</Text> Promoción online de productos
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Sanidad:</Text>{"\n"}
          • <Text style={styles.benefit}>Medicina:</Text> Diagnóstico y tratamiento de enfermedades{"\n"}
          • <Text style={styles.benefit}>Enfermería:</Text> Cuidado directo de pacientes{"\n"}
          • <Text style={styles.benefit}>Farmacia:</Text> Dispensación de medicamentos{"\n"}
          • <Text style={styles.benefit}>Psicología:</Text> Salud mental y bienestar{"\n"}
          • <Text style={styles.benefit}>Fisioterapia:</Text> Rehabilitación física
          {"\n\n"}
          <Text style={styles.subtitle}>📚 Educación:</Text>{"\n"}
          • <Text style={styles.benefit}>Docencia:</Text> Enseñanza en diferentes niveles{"\n"}
          • <Text style={styles.benefit}>Formación profesional:</Text> Capacitación laboral{"\n"}
          • <Text style={styles.benefit}>Investigación:</Text> Desarrollo de conocimiento{"\n"}
          • <Text style={styles.benefit}>Administración educativa:</Text> Gestión de centros{"\n"}
          • <Text style={styles.benefit}>Psicopedagogía:</Text> Orientación educativa
          {"\n\n"}
          <Text style={styles.subtitle}>🏨 Turismo y hostelería:</Text>{"\n"}
          • <Text style={styles.benefit}>Hotelería:</Text> Gestión de alojamientos{"\n"}
          • <Text style={styles.benefit}>Restauración:</Text> Servicios de comida y bebida{"\n"}
          • <Text style={styles.benefit}>Agencias de viajes:</Text> Organización de viajes{"\n"}
          • <Text style={styles.benefit}>Guía turístico:</Text> Acompañamiento de visitantes{"\n"}
          • <Text style={styles.benefit}>Eventos:</Text> Organización de actividades
          {"\n\n"}
          <Text style={styles.subtitle}>🏭 Industria y construcción:</Text>{"\n"}
          • <Text style={styles.benefit}>Ingeniería:</Text> Diseño y desarrollo técnico{"\n"}
          • <Text style={styles.benefit}>Construcción:</Text> Edificación y obras{"\n"}
          • <Text style={styles.benefit}>Manufactura:</Text> Producción industrial{"\n"}
          • <Text style={styles.benefit}>Mantenimiento:</Text> Reparación de equipos{"\n"}
          • <Text style={styles.benefit}>Logística:</Text> Gestión de almacenes y transporte
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💻 التكنولوجيا:</Text>{"\n"}
          • <Text style={styles.benefit}>تطوير البرمجيات:</Text> برمجة وإنشاء التطبيقات{"\n"}
          • <Text style={styles.benefit}>تحليل البيانات:</Text> تفسير المعلومات التجارية{"\n"}
          • <Text style={styles.benefit}>الأمن السيبراني:</Text> حماية الأنظمة المعلوماتية{"\n"}
          • <Text style={styles.benefit}>الذكاء الاصطناعي:</Text> تطوير الأنظمة الذكية{"\n"}
          • <Text style={styles.benefit}>التسويق الرقمي:</Text> الترويج الإلكتروني للمنتجات
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 الصحة:</Text>{"\n"}
          • <Text style={styles.benefit}>الطب:</Text> تشخيص وعلاج الأمراض{"\n"}
          • <Text style={styles.benefit}>التمريض:</Text> رعاية مباشرة للمرضى{"\n"}
          • <Text style={styles.benefit}>الصيدلة:</Text> صرف الأدوية{"\n"}
          • <Text style={styles.benefit}>علم النفس:</Text> الصحة العقلية والرفاهية{"\n"}
          • <Text style={styles.benefit}>العلاج الطبيعي:</Text> إعادة التأهيل البدني
          {"\n\n"}
          <Text style={styles.subtitle}>📚 التعليم:</Text>{"\n"}
          • <Text style={styles.benefit}>التدريس:</Text> التعليم في مستويات مختلفة{"\n"}
          • <Text style={styles.benefit}>التدريب المهني:</Text> التأهيل المهني{"\n"}
          • <Text style={styles.benefit}>البحث:</Text> تطوير المعرفة{"\n"}
          • <Text style={styles.benefit}>الإدارة التعليمية:</Text> إدارة المراكز{"\n"}
          • <Text style={styles.benefit}>علم النفس التربوي:</Text> التوجيه التربوي
          {"\n\n"}
          <Text style={styles.subtitle}>🏨 السياحة والضيافة:</Text>{"\n"}
          • <Text style={styles.benefit}>الفنادق:</Text> إدارة الإقامات{"\n"}
          • <Text style={styles.benefit}>المطاعم:</Text> خدمات الطعام والشراب{"\n"}
          • <Text style={styles.benefit}>وكالات السفر:</Text> تنظيم الرحلات{"\n"}
          • <Text style={styles.benefit}>دليل سياحي:</Text> مرافقة الزوار{"\n"}
          • <Text style={styles.benefit}>الفعاليات:</Text> تنظيم الأنشطة
          {"\n\n"}
          <Text style={styles.subtitle}>🏭 الصناعة والبناء:</Text>{"\n"}
          • <Text style={styles.benefit}>الهندسة:</Text> التصميم والتطوير التقني{"\n"}
          • <Text style={styles.benefit}>البناء:</Text> البناء والأشغال{"\n"}
          • <Text style={styles.benefit}>التصنيع:</Text> الإنتاج الصناعي{"\n"}
          • <Text style={styles.benefit}>الصيانة:</Text> إصلاح المعدات{"\n"}
          • <Text style={styles.benefit}>اللوجستية:</Text> إدارة المستودعات والنقل
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚖️ Derechos laborales en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💰 Remuneración:</Text>{"\n"}
          • <Text style={styles.benefit}>Salario mínimo:</Text> 1.080€ mensuales (2024){"\n"}
          • <Text style={styles.benefit}>Pago de horas extra:</Text> Remuneración adicional{"\n"}
          • <Text style={styles.benefit}>Pagas extra:</Text> 14 pagas al año{"\n"}
          • <Text style={styles.benefit}>Incentivos:</Text> Bonificaciones por objetivos
          {"\n\n"}
          <Text style={styles.subtitle}>⏰ Horarios y descansos:</Text>{"\n"}
          • <Text style={styles.benefit}>Jornada laboral:</Text> Máximo 40 horas semanales{"\n"}
          • <Text style={styles.benefit}>Descanso diario:</Text> 12 horas entre jornadas{"\n"}
          • <Text style={styles.benefit}>Descanso semanal:</Text> Mínimo 1 día y medio{"\n"}
          • <Text style={styles.benefit}>Pausas:</Text> Descansos durante la jornada
          {"\n\n"}
          <Text style={styles.subtitle}>🏖️ Vacaciones y permisos:</Text>{"\n"}
          • <Text style={styles.benefit}>Vacaciones:</Text> Mínimo 22 días laborables{"\n"}
          • <Text style={styles.benefit}>Permisos retribuidos:</Text> Días pagados por eventos{"\n"}
          • <Text style={styles.benefit}>Maternidad:</Text> 16 semanas de permiso{"\n"}
          • <Text style={styles.benefit}>Paternidad:</Text> 16 semanas de permiso{"\n"}
          • <Text style={styles.benefit}>Enfermedad:</Text> Permisos por incapacidad
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Protección social:</Text>{"\n"}
          • <Text style={styles.benefit}>Seguridad social:</Text> Cobertura médica y pensiones{"\n"}
          • <Text style={styles.benefit}>Accidentes laborales:</Text> Protección en el trabajo{"\n"}
          • <Text style={styles.benefit}>Desempleo:</Text> Prestación por paro{"\n"}
          • <Text style={styles.benefit}>Formación continua:</Text> Derecho a formación
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💰 الأجور:</Text>{"\n"}
          • <Text style={styles.benefit}>الحد الأدنى للأجور:</Text> 1080€ شهرياً (2024){"\n"}
          • <Text style={styles.benefit}>دفع الساعات الإضافية:</Text> أجر إضافي{"\n"}
          • <Text style={styles.benefit}>الرواتب الإضافية:</Text> 14 راتباً سنوياً{"\n"}
          • <Text style={styles.benefit}>الحوافز:</Text> مكافآت حسب الأهداف
          {"\n\n"}
          <Text style={styles.subtitle}>⏰ الجداول والراحة:</Text>{"\n"}
          • <Text style={styles.benefit}>ساعات العمل:</Text> حد أقصى 40 ساعة أسبوعياً{"\n"}
          • <Text style={styles.benefit}>الراحة اليومية:</Text> 12 ساعة بين المناوبات{"\n"}
          • <Text style={styles.benefit}>الراحة الأسبوعية:</Text> حد أدنى يوم ونصف{"\n"}
          • <Text style={styles.benefit}>الاستراحات:</Text> فترات راحة خلال المناوبة
          {"\n\n"}
          <Text style={styles.subtitle}>🏖️ الإجازات والإذن:</Text>{"\n"}
          • <Text style={styles.benefit}>الإجازات:</Text> حد أدنى 22 يوم عمل{"\n"}
          • <Text style={styles.benefit}>الإذن المدفوع:</Text> أيام مدفوعة للأحداث{"\n"}
          • <Text style={styles.benefit}>الأمومة:</Text> 16 أسبوع إجازة{"\n"}
          • <Text style={styles.benefit}>الأبوة:</Text> 16 أسبوع إجازة{"\n"}
          • <Text style={styles.benefit}>المرض:</Text> إجازات بسبب العجز
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 الحماية الاجتماعية:</Text>{"\n"}
          • <Text style={styles.benefit}>الضمان الاجتماعي:</Text> تغطية طبية ومعاشات{"\n"}
          • <Text style={styles.benefit}>حوادث العمل:</Text> حماية في العمل{"\n"}
          • <Text style={styles.benefit}>البطالة:</Text> إعانة البطالة{"\n"}
          • <Text style={styles.benefit}>التدريب المستمر:</Text> الحق في التدريب
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Proceso de búsqueda de empleo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📄 Preparación de documentos:</Text>{"\n"}
          1. <Text style={styles.tip}>Currículum vitae:</Text> Documento con experiencia y formación{"\n"}
          2. <Text style={styles.tip}>Carta de presentación:</Text> Explicar motivación e interés{"\n"}
          3. <Text style={styles.tip}>Portfolio:</Text> Muestras de trabajo (si aplica){"\n"}
          4. <Text style={styles.tip}>Certificados:</Text> Diplomas y certificaciones{"\n"}
          5. <Text style={styles.tip}>Referencias:</Text> Contactos de empleadores anteriores
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 Búsqueda activa:</Text>{"\n"}
          1. <Text style={styles.tip}>Portales de empleo:</Text> InfoJobs, LinkedIn, Indeed{"\n"}
          2. <Text style={styles.tip}>Redes profesionales:</Text> Contactos y recomendaciones{"\n"}
          3. <Text style={styles.tip}>Empresas directamente:</Text> Enviar CV a empresas{"\n"}
          4. <Text style={styles.tip}>Agencias de empleo:</Text> Servicios de intermediación{"\n"}
          5. <Text style={styles.tip}>Ferias de empleo:</Text> Eventos presenciales
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 Entrevistas de trabajo:</Text>{"\n"}
          1. <Text style={styles.tip}>Investigación:</Text> Conocer la empresa y el puesto{"\n"}
          2. <Text style={styles.tip}>Preparación:</Text> Practicar respuestas comunes{"\n"}
          3. <Text style={styles.tip}>Presentación:</Text> Vestimenta y puntualidad{"\n"}
          4. <Text style={styles.tip}>Comunicación:</Text> Mostrar confianza y profesionalidad{"\n"}
          5. <Text style={styles.tip}>Preguntas:</Text> Preparar preguntas para el entrevistador
          {"\n\n"}
          <Text style={styles.subtitle}>✅ Seguimiento:</Text>{"\n"}
          1. <Text style={styles.tip}>Agradecimiento:</Text> Enviar email de agradecimiento{"\n"}
          2. <Text style={styles.tip}>Seguimiento:</Text> Contactar después de la entrevista{"\n"}
          3. <Text style={styles.tip}>Evaluación:</Text> Analizar el proceso para mejorar{"\n"}
          4. <Text style={styles.tip}>Persistencia:</Text> Continuar buscando activamente
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📄 تحضير الوثائق:</Text>{"\n"}
          1. <Text style={styles.tip}>السيرة الذاتية:</Text> وثيقة بالخبرة والتكوين{"\n"}
          2. <Text style={styles.tip}>رسالة التقديم:</Text> شرح الدافع والاهتمام{"\n"}
          3. <Text style={styles.tip}>ملف الأعمال:</Text> عينات من العمل (إن أمكن){"\n"}
          4. <Text style={styles.tip}>الشهادات:</Text> الدبلومات والشهادات{"\n"}
          5. <Text style={styles.tip}>المراجع:</Text> اتصالات أصحاب العمل السابقين
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 البحث النشط:</Text>{"\n"}
          1. <Text style={styles.tip}>مواقع التوظيف:</Text> InfoJobs، LinkedIn، Indeed{"\n"}
          2. <Text style={styles.tip}>الشبكات المهنية:</Text> الاتصالات والتوصيات{"\n"}
          3. <Text style={styles.tip}>الشركات مباشرة:</Text> إرسال السيرة الذاتية للشركات{"\n"}
          4. <Text style={styles.tip}>وكالات التوظيف:</Text> خدمات الوساطة{"\n"}
          5. <Text style={styles.tip}>معارض التوظيف:</Text> فعاليات شخصية
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 مقابلات العمل:</Text>{"\n"}
          1. <Text style={styles.tip}>البحث:</Text> معرفة الشركة والمنصب{"\n"}
          2. <Text style={styles.tip}>التحضير:</Text> ممارسة الإجابات الشائعة{"\n"}
          3. <Text style={styles.tip}>العرض:</Text> الملابس والدقة في المواعيد{"\n"}
          4. <Text style={styles.tip}>التواصل:</Text> إظهار الثقة والاحترافية{"\n"}
          5. <Text style={styles.tip}>الأسئلة:</Text> تحضير أسئلة للمقابل
          {"\n\n"}
          <Text style={styles.subtitle}>✅ المتابعة:</Text>{"\n"}
          1. <Text style={styles.tip}>الشكر:</Text> إرسال بريد إلكتروني شكر{"\n"}
          2. <Text style={styles.tip}>المتابعة:</Text> الاتصال بعد المقابلة{"\n"}
          3. <Text style={styles.tip}>التقييم:</Text> تحليل العملية للتحسين{"\n"}
          4. <Text style={styles.tip}>المثابرة:</Text> الاستمرار في البحث النشط
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles sobre trabajo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🔍 Buscar trabajo:</Text>{"\n"}
          • "¿Tienes alguna oferta de trabajo?" = هل لديك أي عرض عمل؟{"\n"}
          • "¿Dónde puedo encontrar trabajo?" = أين يمكنني العثور على عمل؟{"\n"}
          • "¿Qué requisitos necesitas?" = ما المتطلبات التي تحتاجها؟{"\n"}
          • "¿Cuál es el salario?" = ما هو الراتب؟{"\n"}
          • "¿Qué horario tienes?" = ما هو جدولك الزمني؟
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 En la entrevista:</Text>{"\n"}
          • "¿Puedo hacerte algunas preguntas?" = هل يمكنني طرح بعض الأسئلة عليك؟{"\n"}
          • "¿Cuáles son las responsabilidades del puesto?" = ما هي مسؤوليات المنصب؟{"\n"}
          • "¿Hay posibilidades de promoción?" = هل هناك إمكانيات للترقية؟{"\n"}
          • "¿Cuándo sabré la respuesta?" = متى سأعرف الإجابة؟{"\n"}
          • "¿Necesitas alguna referencia?" = هل تحتاج أي مرجع؟
          {"\n\n"}
          <Text style={styles.subtitle}>💼 En el trabajo:</Text>{"\n"}
          • "¿Puedes ayudarme con esto?" = هل يمكنك مساعدتي في هذا؟{"\n"}
          • "¿Cuándo necesitas esto terminado?" = متى تحتاج هذا منجزاً؟{"\n"}
          • "¿Puedo tomar un descanso?" = هل يمكنني أخذ استراحة؟{"\n"}
          • "¿Tienes alguna sugerencia?" = هل لديك أي اقتراح؟{"\n"}
          • "¿Cómo puedo mejorar?" = كيف يمكنني التحسن؟
          {"\n\n"}
          <Text style={styles.subtitle}>📞 Llamadas de trabajo:</Text>{"\n"}
          • "Hola, llamo por el anuncio de trabajo" = مرحباً، أتصل بخصوص إعلان العمل{"\n"}
          • "¿Está disponible el puesto?" = هل المنصب متاح؟{"\n"}
          • "¿Puedo enviar mi currículum?" = هل يمكنني إرسال سيرتي الذاتية؟{"\n"}
          • "¿Cuándo puedo tener una entrevista?" = متى يمكنني إجراء مقابلة؟{"\n"}
          • "Gracias por su tiempo" = شكراً لوقتك
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🔍 البحث عن عمل:</Text>{"\n"}
          • "هل لديك أي عرض عمل؟" = ¿Tienes alguna oferta de trabajo?{"\n"}
          • "أين يمكنني العثور على عمل؟" = ¿Dónde puedo encontrar trabajo?{"\n"}
          • "ما المتطلبات التي تحتاجها؟" = ¿Qué requisitos necesitas?{"\n"}
          • "ما هو الراتب؟" = ¿Cuál es el salario?{"\n"}
          • "ما هو جدولك الزمني؟" = ¿Qué horario tienes?
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 في المقابلة:</Text>{"\n"}
          • "هل يمكنني طرح بعض الأسئلة عليك؟" = ¿Puedo hacerte algunas preguntas?{"\n"}
          • "ما هي مسؤوليات المنصب؟" = ¿Cuáles son las responsabilidades del puesto?{"\n"}
          • "هل هناك إمكانيات للترقية؟" = ¿Hay posibilidades de promoción?{"\n"}
          • "متى سأعرف الإجابة؟" = ¿Cuándo sabré la respuesta?{"\n"}
          • "هل تحتاج أي مرجع؟" = ¿Necesitas alguna referencia?
          {"\n\n"}
          <Text style={styles.subtitle}>💼 في العمل:</Text>{"\n"}
          • "هل يمكنك مساعدتي في هذا؟" = ¿Puedes ayudarme con esto?{"\n"}
          • "متى تحتاج هذا منجزاً؟" = ¿Cuándo necesitas esto terminado?{"\n"}
          • "هل يمكنني أخذ استراحة؟" = ¿Puedo tomar un descanso?{"\n"}
          • "هل لديك أي اقتراح؟" = ¿Tienes alguna sugerencia?{"\n"}
          • "كيف يمكنني التحسن؟" = ¿Cómo puedo mejorar?
          {"\n\n"}
          <Text style={styles.subtitle}>📞 مكالمات العمل:</Text>{"\n"}
          • "مرحباً، أتصل بخصوص إعلان العمل" = Hola, llamo por el anuncio de trabajo{"\n"}
          • "هل المنصب متاح؟" = ¿Está disponible el puesto?{"\n"}
          • "هل يمكنني إرسال سيرتي الذاتية؟" = ¿Puedo enviar mi currículum?{"\n"}
          • "متى يمكنني إجراء مقابلة؟" = ¿Cuándo puedo tener una entrevista?{"\n"}
          • "شكراً لوقتك" = Gracias por su tiempo
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Trabajo en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📊 Mercado laboral:</Text>{"\n"}
          • <Text style={styles.benefit}>Sectores en crecimiento:</Text> Tecnología, turismo, sanidad{"\n"}
          • <Text style={styles.benefit}>Trabajo temporal:</Text> Contratos de duración determinada{"\n"}
          • <Text style={styles.benefit}>Teletrabajo:</Text> Trabajo remoto muy extendido{"\n"}
          • <Text style={styles.benefit}>Emprendimiento:</Text> Apoyo a nuevos negocios{"\n"}
          • <Text style={styles.benefit}>Formación continua:</Text> Importancia del reciclaje profesional
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Tipos de contrato:</Text>{"\n"}
          • <Text style={styles.benefit}>Indefinido:</Text> Sin fecha de finalización{"\n"}
          • <Text style={styles.benefit}>Temporal:</Text> Con fecha de finalización{"\n"}
          • <Text style={styles.benefit}>A tiempo parcial:</Text> Menos de 40 horas semanales{"\n"}
          • <Text style={styles.benefit}>Prácticas:</Text> Para estudiantes y recién graduados{"\n"}
          • <Text style={styles.benefit}>Formación:</Text> Para aprender un oficio
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 Empresas y sectores:</Text>{"\n"}
          • <Text style={styles.benefit}>Multinacionales:</Text> Empresas internacionales{"\n"}
          • <Text style={styles.benefit}>PYMES:</Text> Pequeñas y medianas empresas{"\n"}
          • <Text style={styles.benefit}>Sector público:</Text> Administración del Estado{"\n"}
          • <Text style={styles.benefit}>Startups:</Text> Empresas tecnológicas emergentes{"\n"}
          • <Text style={styles.benefit}>Cooperativas:</Text> Empresas de economía social
          {"\n\n"}
          <Text style={styles.subtitle}>📈 Tendencias actuales:</Text>{"\n"}
          • <Text style={styles.benefit}>Digitalización:</Text> Transformación digital de empresas{"\n"}
          • <Text style={styles.benefit}>Sostenibilidad:</Text> Trabajos relacionados con el medio ambiente{"\n"}
          • <Text style={styles.benefit}>Envejecimiento:</Text> Oportunidades en cuidado de mayores{"\n"}
          • <Text style={styles.benefit}>Internacionalización:</Text> Empresas con presencia global{"\n"}
          • <Text style={styles.benefit}>Flexibilidad:</Text> Horarios y condiciones más flexibles
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📊 سوق العمل:</Text>{"\n"}
          • <Text style={styles.benefit}>القطاعات النامية:</Text> التكنولوجيا، السياحة، الصحة{"\n"}
          • <Text style={styles.benefit}>العمل المؤقت:</Text> عقود مدة محددة{"\n"}
          • <Text style={styles.benefit}>العمل عن بعد:</Text> العمل عن بعد منتشر جداً{"\n"}
          • <Text style={styles.benefit}>ريادة الأعمال:</Text> دعم الأعمال الجديدة{"\n"}
          • <Text style={styles.benefit}>التدريب المستمر:</Text> أهمية إعادة التأهيل المهني
          {"\n\n"}
          <Text style={styles.subtitle}>💼 أنواع العقود:</Text>{"\n"}
          • <Text style={styles.benefit}>غير محدد المدة:</Text> بدون تاريخ انتهاء{"\n"}
          • <Text style={styles.benefit}>مؤقت:</Text> بتاريخ انتهاء{"\n"}
          • <Text style={styles.benefit}>بدوام جزئي:</Text> أقل من 40 ساعة أسبوعياً{"\n"}
          • <Text style={styles.benefit}>التدريب:</Text> للطلاب والخريجين الجدد{"\n"}
          • <Text style={styles.benefit}>التكوين:</Text> لتعلم حرفة
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 الشركات والقطاعات:</Text>{"\n"}
          • <Text style={styles.benefit}>الشركات متعددة الجنسيات:</Text> شركات دولية{"\n"}
          • <Text style={styles.benefit}>الشركات الصغيرة والمتوسطة:</Text> الشركات الصغيرة والمتوسطة{"\n"}
          • <Text style={styles.benefit}>القطاع العام:</Text> إدارة الدولة{"\n"}
          • <Text style={styles.benefit}>الشركات الناشئة:</Text> شركات تكنولوجية ناشئة{"\n"}
          • <Text style={styles.benefit}>التعاونيات:</Text> شركات الاقتصاد الاجتماعي
          {"\n\n"}
          <Text style={styles.subtitle}>📈 الاتجاهات الحالية:</Text>{"\n"}
          • <Text style={styles.benefit}>الرقمنة:</Text> التحول الرقمي للشركات{"\n"}
          • <Text style={styles.benefit}>الاستدامة:</Text> أعمال متعلقة بالبيئة{"\n"}
          • <Text style={styles.benefit}>الشيخوخة:</Text> فرص في رعاية المسنين{"\n"}
          • <Text style={styles.benefit}>العولمة:</Text> شركات بحضور عالمي{"\n"}
          • <Text style={styles.benefit}>المرونة:</Text> جداول وشروط أكثر مرونة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Consejos para el éxito laboral</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎯 Desarrollo profesional:</Text>{"\n"}
          • <Text style={styles.tip}>Formación continua:</Text> Mantener conocimientos actualizados{"\n"}
          • <Text style={styles.tip}>Especialización:</Text> Desarrollar expertise en áreas específicas{"\n"}
          • <Text style={styles.tip}>Redes profesionales:</Text> Construir contactos útiles{"\n"}
          • <Text style={styles.tip}>Mentoría:</Text> Buscar guía de profesionales experimentados{"\n"}
          • <Text style={styles.tip}>Certificaciones:</Text> Obtener títulos reconocidos
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 Habilidades blandas:</Text>{"\n"}
          • <Text style={styles.tip}>Comunicación:</Text> Expresarse claramente y escuchar{"\n"}
          • <Text style={styles.tip}>Trabajo en equipo:</Text> Colaborar efectivamente{"\n"}
          • <Text style={styles.tip}>Liderazgo:</Text> Motivar y dirigir equipos{"\n"}
          • <Text style={styles.tip}>Resolución de problemas:</Text> Encontrar soluciones creativas{"\n"}
          • <Text style={styles.tip}>Adaptabilidad:</Text> Ajustarse a cambios
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ Productividad:</Text>{"\n"}
          • <Text style={styles.tip}>Gestión del tiempo:</Text> Organizar tareas eficientemente{"\n"}
          • <Text style={styles.tip}>Priorización:</Text> Enfocarse en lo importante{"\n"}
          • <Text style={styles.tip}>Herramientas digitales:</Text> Usar tecnología para mejorar{"\n"}
          • <Text style={styles.tip}>Automatización:</Text> Optimizar procesos repetitivos{"\n"}
          • <Text style={styles.tip}>Evaluación continua:</Text> Medir y mejorar resultados
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 Crecimiento personal:</Text>{"\n"}
          • <Text style={styles.tip}>Autoconocimiento:</Text> Identificar fortalezas y debilidades{"\n"}
          • <Text style={styles.tip}>Objetivos claros:</Text> Definir metas profesionales{"\n"}
          • <Text style={styles.tip}>Resiliencia:</Text> Superar dificultades con determinación{"\n"}
          • <Text style={styles.tip}>Equilibrio vida-trabajo:</Text> Mantener bienestar personal{"\n"}
          • <Text style={styles.tip}>Pasión por aprender:</Text> Mantener curiosidad intelectual
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎯 التطور المهني:</Text>{"\n"}
          • <Text style={styles.tip}>التدريب المستمر:</Text> الحفاظ على المعرفة محدثة{"\n"}
          • <Text style={styles.tip}>التخصص:</Text> تطوير الخبرة في مجالات محددة{"\n"}
          • <Text style={styles.tip}>الشبكات المهنية:</Text> بناء اتصالات مفيدة{"\n"}
          • <Text style={styles.tip}>الإرشاد:</Text> البحث عن توجيه من محترفين ذوي خبرة{"\n"}
          • <Text style={styles.tip}>الشهادات:</Text> الحصول على ألقاب معترف بها
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 المهارات الناعمة:</Text>{"\n"}
          • <Text style={styles.tip}>التواصل:</Text> التعبير بوضوح والاستماع{"\n"}
          • <Text style={styles.tip}>العمل الجماعي:</Text> التعاون بفعالية{"\n"}
          • <Text style={styles.tip}>القيادة:</Text> تحفيز وتوجيه الفرق{"\n"}
          • <Text style={styles.tip}>حل المشاكل:</Text> إيجاد حلول إبداعية{"\n"}
          • <Text style={styles.tip}>التكيف:</Text> التكيف مع التغييرات
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ الإنتاجية:</Text>{"\n"}
          • <Text style={styles.tip}>إدارة الوقت:</Text> تنظيم المهام بكفاءة{"\n"}
          • <Text style={styles.tip}>الأولوية:</Text> التركيز على المهم{"\n"}
          • <Text style={styles.tip}>الأدوات الرقمية:</Text> استخدام التكنولوجيا للتحسين{"\n"}
          • <Text style={styles.tip}>الأتمتة:</Text> تحسين العمليات المتكررة{"\n"}
          • <Text style={styles.tip}>التقييم المستمر:</Text> قياس وتحسين النتائج
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 النمو الشخصي:</Text>{"\n"}
          • <Text style={styles.tip}>معرفة الذات:</Text> تحديد نقاط القوة والضعف{"\n"}
          • <Text style={styles.tip}>أهداف واضحة:</Text> تحديد الأهداف المهنية{"\n"}
          • <Text style={styles.tip}>المرونة:</Text> تجاوز الصعوبات بالتصميم{"\n"}
          • <Text style={styles.tip}>توازن الحياة والعمل:</Text> الحفاظ على الرفاهية الشخصية{"\n"}
          • <Text style={styles.tip}>الشغف بالتعلم:</Text> الحفاظ على الفضول الفكري
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
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
