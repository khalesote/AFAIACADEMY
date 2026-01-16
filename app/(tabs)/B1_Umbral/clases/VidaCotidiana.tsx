import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function VidaCotidiana() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[14] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 14);
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
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué actividad es típica de la mañana?',
      opciones: ['Despertarse', 'Cenar', 'Dormir', 'Trabajar de noche'],
      respuesta_correcta: 'Despertarse'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "madrugar"?',
      opciones: ['Levantarse tarde', 'Levantarse temprano', 'Dormir mucho', 'Trabajar de noche'],
      respuesta_correcta: 'Levantarse temprano'
    },
    {
      tipo: 'vocabulario',
      titulo: 'أوقات النشاطات اليومية',
      pares: [
        { izquierda: 'Despertarse', derecha: 'الصباح' },
        { izquierda: 'Almorzar', derecha: 'الظهر' },
        { izquierda: 'Cenar', derecha: 'المساء' },
        { izquierda: 'Dormir', derecha: 'الليل' }
      ],
      opciones: [
        'Despertarse', 'Almorzar', 'Cenar', 'Dormir',
        'الصباح', 'الظهر', 'المساء', 'الليل'
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es la mejor manera de organizar el tiempo?',
      opciones: ['Hacer todo de una vez', 'Planificar y priorizar', 'Dejar todo para el último momento', 'No hacer nada'],
      respuesta_correcta: 'Planificar y priorizar'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué actividad ayuda a tener más energía?',
      opciones: ['Dormir todo el día', 'Ejercicio matutino', 'Comer mucho', 'No hacer nada'],
      respuesta_correcta: 'Ejercicio matutino'
    },
    {
      tipo: 'vocabulario',
      titulo: 'فوائد الروتين اليومي',
      pares: [
        { izquierda: 'Ejercicio matutino', derecha: 'المزيد من الطاقة' },
        { izquierda: 'Planificar el día', derecha: 'تقليل التوتر' },
        { izquierda: 'Dormir 8 horas', derecha: 'راحة أفضل' },
        { izquierda: 'Comer saludable', derecha: 'صحة أفضل' }
      ],
      opciones: [
        'Ejercicio matutino', 'Planificar el día', 'Dormir 8 horas', 'Comer saludable',
        'المزيد من الطاقة', 'تقليل التوتر', 'راحة أفضل', 'صحة أفضل'
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tener una rutina establecida"?',
      opciones: ['Hacer cosas diferentes cada día', 'Seguir un horario fijo', 'No hacer nada', 'Trabajar sin descanso'],
      respuesta_correcta: 'Seguir un horario fijo'
    },
    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "priorizar"?',
      opciones: ['Hacer todo al mismo tiempo', 'Dar importancia a lo más importante', 'No hacer nada', 'Dejar todo para después'],
      respuesta_correcta: 'Dar importancia a lo más importante'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "tarea"?',
      opciones: ['Un descanso', 'Una actividad que hay que hacer', 'Un juego', 'Una comida'],
      respuesta_correcta: 'Una actividad que hay que hacer'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "organizar"?',
      opciones: ['Desordenar todo', 'Poner en orden y estructura', 'Romper cosas', 'No hacer nada'],
      respuesta_correcta: 'Poner en orden y estructura'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "descansar"?',
      opciones: ['Trabajar sin parar', 'Tomar un tiempo para relajarse', 'Correr mucho', 'Estudiar todo el día'],
      respuesta_correcta: 'Tomar un tiempo para relajarse'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "hábito"?',
      opciones: ['Algo que haces una sola vez', 'Una acción que repites regularmente', 'Un accidente', 'Un error'],
      respuesta_correcta: 'Una acción que repites regularmente'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "disciplina"?',
      opciones: ['Hacer lo que quieras', 'Seguir reglas y ser constante', 'No hacer nada', 'Ser desordenado'],
      respuesta_correcta: 'Seguir reglas y ser constante'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "equilibrio"?',
      opciones: ['Hacer solo una cosa', 'Mantener balance entre diferentes aspectos', 'Trabajar sin parar', 'No hacer nada'],
      respuesta_correcta: 'Mantener balance entre diferentes aspectos'
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "evaluar"?',
      opciones: ['Ignorar algo', 'Examinar y valorar algo', 'Destruir algo', 'No hacer nada'],
      respuesta_correcta: 'Examinar y valorar algo'
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "cumplir"?',
      opciones: ['No hacer nada', 'Llevar a cabo o completar algo', 'Romper algo', 'Ignorar algo'],
      respuesta_correcta: 'Llevar a cabo o completar algo'
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "planificar"?',
      opciones: ['Hacer las cosas sin pensar', 'Organizar y preparar algo con anticipación', 'No hacer nada', 'Destruir planes'],
      respuesta_correcta: 'Organizar y preparar algo con anticipación'
    },

    // Ejercicio 16: Vocabulario
    {
      tipo: 'vocabulario',
      titulo: 'أوقات النشاطات اليومية',
      pares: [
        { izquierda: 'Despertarse', derecha: 'الصباح' },
        { izquierda: 'Almorzar', derecha: 'الظهر' },
        { izquierda: 'Cenar', derecha: 'المساء' },
        { izquierda: 'Dormir', derecha: 'الليل' }
      ],
      opciones: [
        'Despertarse', 'Almorzar', 'Cenar', 'Dormir',
        'الصباح', 'الظهر', 'المساء', 'الليل'
      ]
    },

    // Ejercicio 17: Vocabulario
    {
      tipo: 'vocabulario',
      titulo: 'فوائد الروتين اليومي',
      pares: [
        { izquierda: 'Ejercicio matutino', derecha: 'المزيد من الطاقة' },
        { izquierda: 'Planificar el día', derecha: 'تقليل التوتر' },
        { izquierda: 'Dormir 8 horas', derecha: 'راحة أفضل' },
        { izquierda: 'Comer saludable', derecha: 'صحة أفضل' }
      ],
      opciones: [
        'Ejercicio matutino', 'Planificar el día', 'Dormir 8 horas', 'Comer saludable',
        'المزيد من الطاقة', 'تقليل التوتر', 'راحة أفضل', 'صحة أفضل'
      ]
    },

    // Ejercicio 18: Vocabulario
    {
      tipo: 'vocabulario',
      titulo: 'مفاهيم الحياة اليومية',
      pares: [
        { izquierda: 'Horario', derecha: 'جدول زمني' },
        { izquierda: 'Tarea', derecha: 'مهمة' },
        { izquierda: 'Priorizar', derecha: 'تحديد الأولويات' },
        { izquierda: 'Equilibrio', derecha: 'توازن' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es importante para crear rutinas efectivas?',
      opciones: ['Hacer todo de una vez', 'Ser consistente y empezar pequeño', 'No hacer nada', 'Copiar rutinas de otros'],
      respuesta_correcta: 'Ser consistente y empezar pequeño'
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué beneficio principal tienen las rutinas?',
      opciones: ['Aumentar el estrés', 'Reducir el estrés y mejorar la productividad', 'Perder tiempo', 'Ser menos organizado'],
      respuesta_correcta: 'Reducir el estrés y mejorar la productividad'
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
        source={{ uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80' }}
        style={styles.image}
        accessibilityLabel="Imagen de vida cotidiana y rutinas"
      />
      <Text style={styles.title}>🏠 Vida cotidiana y rutinas</Text>
      <Text style={styles.titleAr}>🏠 الحياة اليومية والروتين</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la vida cotidiana</Text>
        <Text style={styles.sectionText}>
          La vida cotidiana está llena de rutinas y hábitos que nos ayudan a organizar 
          nuestro tiempo, mantener un equilibrio entre trabajo, descanso y actividades 
          personales, y crear una estructura que nos permite ser más productivos y felices.
          {"\n\n"}
          Las rutinas diarias incluyen actividades esenciales como despertarse, asearse, 
          desayunar, trabajar o estudiar, hacer ejercicio, comer, descansar y dormir. 
          Estas actividades forman la base de nuestro bienestar físico y mental.
          {"\n\n"}
          Cada persona tiene sus propias rutinas según su estilo de vida, trabajo, 
          familia, edad y preferencias personales. Lo importante es encontrar el 
          equilibrio que funcione mejor para cada uno.
        </Text>
        <Text style={styles.sectionTextAr}>
          الحياة اليومية مليئة بالروتين والعادات التي تساعدنا على تنظيم
          وقتنا والحفاظ على التوازن بين العمل والراحة والأنشطة
          الشخصية وخلق هيكل يسمح لنا بأن نكون أكثر إنتاجية وسعادة.
          {"\n\n"}
          تشمل الروتين اليومي أنشطة أساسية مثل الاستيقاظ والاغتسال
          والإفطار والعمل أو الدراسة وممارسة الرياضة والأكل والراحة
          والنوم. هذه الأنشطة تشكل أساس رفاهيتنا الجسدية والعقلية.
          {"\n\n"}
          لكل شخص روتينه الخاص حسب نمط حياته وعمله وأسرته
          وعمره وتفضيلاته الشخصية. المهم هو إيجاد التوازن
          الذي يعمل بشكل أفضل لكل شخص.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de la vida cotidiana</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⏰ Tiempo y organización:</Text>{"\n"}
          rutina = روتين{"\n"}
          horario = جدول زمني{"\n"}
          tarea = مهمة{"\n"}
          organizar = ينظم{"\n"}
          planificar = يخطط{"\n"}
          priorizar = يعطي الأولوية{"\n"}
          cumplir = ينفذ{"\n"}
          evaluar = يقيم{"\n"}
          equilibrio = توازن{"\n"}
          disciplina = انضباط
          {"\n\n"}
          <Text style={styles.subtitle}>🏠 Actividades diarias:</Text>{"\n"}
          despertarse = يستيقظ{"\n"}
          levantarse = ينهض{"\n"}
          asearse = يغتسل{"\n"}
          ducharse = يستحم{"\n"}
          vestirse = يلبس{"\n"}
          desayunar = يتناول الإفطار{"\n"}
          almorzar = يتناول الغداء{"\n"}
          cenar = يتناول العشاء{"\n"}
          descansar = يستريح{"\n"}
          dormir = ينام
          {"\n\n"}
          <Text style={styles.subtitle}>💪 Bienestar y salud:</Text>{"\n"}
          ejercicio = تمرين{"\n"}
          deporte = رياضة{"\n"}
          entrenar = يتدرب{"\n"}
          estirar = يتمدد{"\n"}
          relajarse = يسترخي{"\n"}
          meditar = يتأمل{"\n"}
          respirar = يتنفس{"\n"}
          hidratarse = يرطب{"\n"}
          alimentarse = يتغذى{"\n"}
          cuidarse = يعتني بنفسه
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 Productividad y metas:</Text>{"\n"}
          objetivo = هدف{"\n"}
          meta = غاية{"\n"}
          propósito = غرض{"\n"}
          logro = إنجاز{"\n"}
          progreso = تقدم{"\n"}
          mejora = تحسين{"\n"}
          desarrollo = تطوير{"\n"}
          crecimiento = نمو{"\n"}
          éxito = نجاح{"\n"}
          superación = تجاوز
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⏰ الوقت والتنظيم:</Text>{"\n"}
          روتين = rutina{"\n"}
          جدول زمني = horario{"\n"}
          مهمة = tarea{"\n"}
          ينظم = organizar{"\n"}
          يخطط = planificar{"\n"}
          يعطي الأولوية = priorizar{"\n"}
          ينفذ = cumplir{"\n"}
          يقيم = evaluar{"\n"}
          توازن = equilibrio{"\n"}
          انضباط = disciplina
          {"\n\n"}
          <Text style={styles.subtitle}>🏠 الأنشطة اليومية:</Text>{"\n"}
          يستيقظ = despertarse{"\n"}
          ينهض = levantarse{"\n"}
          يغتسل = asearse{"\n"}
          يستحم = ducharse{"\n"}
          يلبس = vestirse{"\n"}
          يتناول الإفطار = desayunar{"\n"}
          يتناول الغداء = almorzar{"\n"}
          يتناول العشاء = cenar{"\n"}
          يستريح = descansar{"\n"}
          ينام = dormir
          {"\n\n"}
          <Text style={styles.subtitle}>💪 الرفاهية والصحة:</Text>{"\n"}
          تمرين = ejercicio{"\n"}
          رياضة = deporte{"\n"}
          يتدرب = entrenar{"\n"}
          يتمدد = estirar{"\n"}
          يسترخي = relajarse{"\n"}
          يتأمل = meditar{"\n"}
          يتنفس = respirar{"\n"}
          يرطب = hidratarse{"\n"}
          يتغذى = alimentarse{"\n"}
          يعتني بنفسه = cuidarse
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 الإنتاجية والأهداف:</Text>{"\n"}
          هدف = objetivo{"\n"}
          غاية = meta{"\n"}
          غرض = propósito{"\n"}
          إنجاز = logro{"\n"}
          تقدم = progreso{"\n"}
          تحسين = mejora{"\n"}
          تطوير = desarrollo{"\n"}
          نمو = crecimiento{"\n"}
          نجاح = éxito{"\n"}
          تجاوز = superación
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏰ Tipos de rutinas diarias</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌅 Rutinas matutinas:</Text>{"\n"}
          • <Text style={styles.benefit}>Despertarse a una hora fija:</Text> Mantener horarios regulares{"\n"}
          • <Text style={styles.benefit}>Hacer ejercicio o estiramientos:</Text> Activar el cuerpo{"\n"}
          • <Text style={styles.benefit}>Ducharse y vestirse:</Text> Prepararse para el día{"\n"}
          • <Text style={styles.benefit}>Desayunar saludablemente:</Text> Energía para la mañana{"\n"}
          • <Text style={styles.benefit}>Planificar el día:</Text> Organizar actividades{"\n"}
          • <Text style={styles.benefit}>Meditar o respirar:</Text> Centrarse mentalmente
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Rutinas laborales:</Text>{"\n"}
          • <Text style={styles.benefit}>Revisar emails y agenda:</Text> Organizar prioridades{"\n"}
          • <Text style={styles.benefit}>Priorizar tareas importantes:</Text> Enfocarse en lo esencial{"\n"}
          • <Text style={styles.benefit}>Tomar descansos regulares:</Text> Mantener energía{"\n"}
          • <Text style={styles.benefit}>Mantener el espacio de trabajo organizado:</Text> Productividad{"\n"}
          • <Text style={styles.benefit}>Hidratarse regularmente:</Text> Cuidar la salud{"\n"}
          • <Text style={styles.benefit}>Revisar logros del día:</Text> Evaluar progreso
          {"\n\n"}
          <Text style={styles.subtitle}>🌙 Rutinas nocturnas:</Text>{"\n"}
          • <Text style={styles.benefit}>Cenar temprano:</Text> Mejor digestión{"\n"}
          • <Text style={styles.benefit}>Preparar cosas para el día siguiente:</Text> Reducir estrés matutino{"\n"}
          • <Text style={styles.benefit}>Relajarse antes de dormir:</Text> Lectura, música suave{"\n"}
          • <Text style={styles.benefit}>Dormir 7-8 horas:</Text> Descanso completo{"\n"}
          • <Text style={styles.benefit}>Evitar pantallas antes de dormir:</Text> Mejor calidad de sueño{"\n"}
          • <Text style={styles.benefit}>Crear ambiente tranquilo:</Text> Temperatura y luz adecuadas
          {"\n\n"}
          <Text style={styles.subtitle}>🏠 Rutinas domésticas:</Text>{"\n"}
          • <Text style={styles.benefit}>Limpiar y organizar:</Text> Mantener orden{"\n"}
          • <Text style={styles.benefit}>Hacer la compra:</Text> Planificar comidas{"\n"}
          • <Text style={styles.benefit}>Cocinar comidas saludables:</Text> Nutrición equilibrada{"\n"}
          • <Text style={styles.benefit}>Lavar ropa regularmente:</Text> Higiene personal{"\n"}
          • <Text style={styles.benefit}>Cuidar plantas o mascotas:</Text> Responsabilidades{"\n"}
          • <Text style={styles.benefit}>Revisar facturas y pagos:</Text> Organización financiera
          {"\n\n"}
          <Text style={styles.subtitle}>💪 Rutinas de bienestar:</Text>{"\n"}
          • <Text style={styles.benefit}>Ejercicio físico regular:</Text> Mantener forma{"\n"}
          • <Text style={styles.benefit}>Meditación o yoga:</Text> Bienestar mental{"\n"}
          • <Text style={styles.benefit}>Hidratación adecuada:</Text> Beber agua regularmente{"\n"}
          • <Text style={styles.benefit}>Alimentación saludable:</Text> Nutrición balanceada{"\n"}
          • <Text style={styles.benefit}>Tiempo al aire libre:</Text> Conectar con la naturaleza{"\n"}
          • <Text style={styles.benefit}>Socializar con amigos/familia:</Text> Bienestar emocional
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌅 الروتين الصباحي:</Text>{"\n"}
          • <Text style={styles.benefit}>الاستيقاظ في وقت محدد:</Text> الحفاظ على جداول منتظمة{"\n"}
          • <Text style={styles.benefit}>ممارسة الرياضة أو التمدد:</Text> تفعيل الجسم{"\n"}
          • <Text style={styles.benefit}>الاستحمام وارتداء الملابس:</Text> الاستعداد لليوم{"\n"}
          • <Text style={styles.benefit}>تناول إفطار صحي:</Text> طاقة للصباح{"\n"}
          • <Text style={styles.benefit}>تخطيط اليوم:</Text> تنظيم الأنشطة{"\n"}
          • <Text style={styles.benefit}>التأمل أو التنفس:</Text> التركيز عقلياً
          {"\n\n"}
          <Text style={styles.subtitle}>💼 الروتين المهني:</Text>{"\n"}
          • <Text style={styles.benefit}>مراجعة البريد الإلكتروني والجدول:</Text> تنظيم الأولويات{"\n"}
          • <Text style={styles.benefit}>إعطاء الأولوية للمهام المهمة:</Text> التركيز على الأساسي{"\n"}
          • <Text style={styles.benefit}>أخذ فترات راحة منتظمة:</Text> الحفاظ على الطاقة{"\n"}
          • <Text style={styles.benefit}>الحفاظ على مكان العمل منظم:</Text> الإنتاجية{"\n"}
          • <Text style={styles.benefit}>الترطيب المنتظم:</Text> العناية بالصحة{"\n"}
          • <Text style={styles.benefit}>مراجعة إنجازات اليوم:</Text> تقييم التقدم
          {"\n\n"}
          <Text style={styles.subtitle}>🌙 الروتين الليلي:</Text>{"\n"}
          • <Text style={styles.benefit}>تناول العشاء مبكراً:</Text> هضم أفضل{"\n"}
          • <Text style={styles.benefit}>تحضير الأشياء لليوم التالي:</Text> تقليل التوتر الصباحي{"\n"}
          • <Text style={styles.benefit}>الاسترخاء قبل النوم:</Text> قراءة، موسيقى هادئة{"\n"}
          • <Text style={styles.benefit}>النوم 7-8 ساعات:</Text> راحة كاملة{"\n"}
          • <Text style={styles.benefit}>تجنب الشاشات قبل النوم:</Text> جودة نوم أفضل{"\n"}
          • <Text style={styles.benefit}>خلق بيئة هادئة:</Text> درجة حرارة وإضاءة مناسبة
          {"\n\n"}
          <Text style={styles.subtitle}>🏠 الروتين المنزلي:</Text>{"\n"}
          • <Text style={styles.benefit}>التنظيف والتنظيم:</Text> الحفاظ على النظام{"\n"}
          • <Text style={styles.benefit}>التسوق:</Text> تخطيط الوجبات{"\n"}
          • <Text style={styles.benefit}>طبخ وجبات صحية:</Text> تغذية متوازنة{"\n"}
          • <Text style={styles.benefit}>غسل الملابس بانتظام:</Text> النظافة الشخصية{"\n"}
          • <Text style={styles.benefit}>العناية بالنباتات أو الحيوانات الأليفة:</Text> المسؤوليات{"\n"}
          • <Text style={styles.benefit}>مراجعة الفواتير والمدفوعات:</Text> التنظيم المالي
          {"\n\n"}
          <Text style={styles.subtitle}>💪 روتين الرفاهية:</Text>{"\n"}
          • <Text style={styles.benefit}>التمرين البدني المنتظم:</Text> الحفاظ على اللياقة{"\n"}
          • <Text style={styles.benefit}>التأمل أو اليوغا:</Text> الرفاهية العقلية{"\n"}
          • <Text style={styles.benefit}>الترطيب المناسب:</Text> شرب الماء بانتظام{"\n"}
          • <Text style={styles.benefit}>التغذية الصحية:</Text> تغذية متوازنة{"\n"}
          • <Text style={styles.benefit}>الوقت في الهواء الطلق:</Text> التواصل مع الطبيعة{"\n"}
          • <Text style={styles.benefit}>التواصل الاجتماعي مع الأصدقاء/العائلة:</Text> الرفاهية العاطفية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles para la vida cotidiana</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⏰ Hablando del tiempo:</Text>{"\n"}
          • "¿A qué hora te levantas?" = في أي ساعة تستيقظ؟{"\n"}
          • "¿Cuál es tu rutina matutina?" = ما هو روتينك الصباحي؟{"\n"}
          • "¿Cómo organizas tu día?" = كيف تنظم يومك؟{"\n"}
          • "¿Tienes algún horario fijo?" = هل لديك جدول ثابت؟{"\n"}
          • "¿Qué haces normalmente por la mañana?" = ماذا تفعل عادة في الصباح؟
          {"\n\n"}
          <Text style={styles.subtitle}>🏠 Actividades domésticas:</Text>{"\n"}
          • "¿Quién hace las tareas de casa?" = من يقوم بأعمال المنزل؟{"\n"}
          • "¿Cuándo limpias tu habitación?" = متى تنظف غرفتك؟{"\n"}
          • "¿Quién cocina en tu casa?" = من يطبخ في بيتك؟{"\n"}
          • "¿Haces la compra semanalmente?" = هل تتسوق أسبوعياً؟{"\n"}
          • "¿Tienes alguna responsabilidad en casa?" = هل لديك مسؤولية في البيت؟
          {"\n\n"}
          <Text style={styles.subtitle}>💪 Bienestar y salud:</Text>{"\n"}
          • "¿Haces ejercicio regularmente?" = هل تمارس الرياضة بانتظام؟{"\n"}
          • "¿Cuántas horas duermes?" = كم ساعة تنام؟{"\n"}
          • "¿Qué comes normalmente?" = ماذا تأكل عادة؟{"\n"}
          • "¿Tienes algún hobby?" = هل لديك هواية؟{"\n"}
          • "¿Cómo te relajas?" = كيف تسترخي؟
          {"\n\n"}
          <Text style={styles.subtitle}>📋 Organización y productividad:</Text>{"\n"}
          • "¿Cómo planificas tu semana?" = كيف تخطط أسبوعك؟{"\n"}
          • "¿Usas alguna agenda o aplicación?" = هل تستخدم جدول أو تطبيق؟{"\n"}
          • "¿Cómo priorizas tus tareas?" = كيف تعطي الأولوية لمهامك؟{"\n"}
          • "¿Qué haces cuando tienes mucho trabajo?" = ماذا تفعل عندما يكون لديك عمل كثير؟{"\n"}
          • "¿Cómo manejas el estrés?" = كيف تتعامل مع التوتر؟
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 Metas y objetivos:</Text>{"\n"}
          • "¿Cuáles son tus objetivos diarios?" = ما هي أهدافك اليومية؟{"\n"}
          • "¿Qué quieres mejorar en tu rutina?" = ماذا تريد تحسينه في روتينك؟{"\n"}
          • "¿Tienes alguna meta a largo plazo?" = هل لديك هدف طويل المدى؟{"\n"}
          • "¿Cómo mides tu progreso?" = كيف تقيس تقدمك؟{"\n"}
          • "¿Qué te motiva cada día?" = ما الذي يحفزك كل يوم؟
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⏰ التحدث عن الوقت:</Text>{"\n"}
          • "في أي ساعة تستيقظ؟" = ¿A qué hora te levantas?{"\n"}
          • "ما هو روتينك الصباحي؟" = ¿Cuál es tu rutina matutina?{"\n"}
          • "كيف تنظم يومك؟" = ¿Cómo organizas tu día?{"\n"}
          • "هل لديك جدول ثابت؟" = ¿Tienes algún horario fijo?{"\n"}
          • "ماذا تفعل عادة في الصباح؟" = ¿Qué haces normalmente por la mañana?
          {"\n\n"}
          <Text style={styles.subtitle}>🏠 الأنشطة المنزلية:</Text>{"\n"}
          • "من يقوم بأعمال المنزل؟" = ¿Quién hace las tareas de casa?{"\n"}
          • "متى تنظف غرفتك؟" = ¿Cuándo limpias tu habitación?{"\n"}
          • "من يطبخ في بيتك؟" = ¿Quién cocina en tu casa?{"\n"}
          • "هل تتسوق أسبوعياً؟" = ¿Haces la compra semanalmente?{"\n"}
          • "هل لديك مسؤولية في البيت؟" = ¿Tienes alguna responsabilidad en casa?
          {"\n\n"}
          <Text style={styles.subtitle}>💪 الرفاهية والصحة:</Text>{"\n"}
          • "هل تمارس الرياضة بانتظام؟" = ¿Haces ejercicio regularmente?{"\n"}
          • "كم ساعة تنام؟" = ¿Cuántas horas duermes?{"\n"}
          • "ماذا تأكل عادة؟" = ¿Qué comes normalmente?{"\n"}
          • "هل لديك هواية؟" = ¿Tienes algún hobby?{"\n"}
          • "كيف تسترخي؟" = ¿Cómo te relajas?
          {"\n\n"}
          <Text style={styles.subtitle}>📋 التنظيم والإنتاجية:</Text>{"\n"}
          • "كيف تخطط أسبوعك؟" = ¿Cómo planificas tu semana?{"\n"}
          • "هل تستخدم جدول أو تطبيق؟" = ¿Usas alguna agenda o aplicación?{"\n"}
          • "كيف تعطي الأولوية لمهامك؟" = ¿Cómo priorizas tus tareas?{"\n"}
          • "ماذا تفعل عندما يكون لديك عمل كثير؟" = ¿Qué haces cuando tienes mucho trabajo?{"\n"}
          • "كيف تتعامل مع التوتر؟" = ¿Cómo manejas el estrés?
          {"\n\n"}
          <Text style={styles.subtitle}>🎯 الأهداف والمقاصد:</Text>{"\n"}
          • "ما هي أهدافك اليومية؟" = ¿Cuáles son tus objetivos diarios?{"\n"}
          • "ماذا تريد تحسينه في روتينك؟" = ¿Qué quieres mejorar en tu rutina?{"\n"}
          • "هل لديك هدف طويل المدى؟" = ¿Tienes alguna meta a largo plazo?{"\n"}
          • "كيف تقيس تقدمك؟" = ¿Cómo mides tu progreso?{"\n"}
          • "ما الذي يحفزك كل يوم؟" = ¿Qué te motiva cada día?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Gestión efectiva del tiempo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📅 Técnicas de planificación:</Text>{"\n"}
          • <Text style={styles.benefit}>Método Pomodoro:</Text> Trabajar 25 minutos, descansar 5{"\n"}
          • <Text style={styles.benefit}>Matriz de Eisenhower:</Text> Priorizar por urgencia e importancia{"\n"}
          • <Text style={styles.benefit}>Time blocking:</Text> Asignar bloques de tiempo específicos{"\n"}
          • <Text style={styles.benefit}>Planificación semanal:</Text> Revisar y planificar cada domingo{"\n"}
          • <Text style={styles.benefit}>Lista de tareas:</Text> Escribir y tachar actividades completadas
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ Maximizar la productividad:</Text>{"\n"}
          • <Text style={styles.benefit}>Identificar horas pico:</Text> Trabajar en tus mejores momentos{"\n"}
          • <Text style={styles.benefit}>Eliminar distracciones:</Text> Apagar notificaciones{"\n"}
          • <Text style={styles.benefit}>Tareas más difíciles primero:</Text> Comenzar con lo complejo{"\n"}
          • <Text style={styles.benefit}>Descansos regulares:</Text> Evitar el agotamiento{"\n"}
          • <Text style={styles.benefit}>Revisión diaria:</Text> Evaluar logros y ajustar
          {"\n\n"}
          <Text style={styles.subtitle}>🔄 Adaptación y flexibilidad:</Text>{"\n"}
          • <Text style={styles.benefit}>Plan B siempre listo:</Text> Alternativas para imprevistos{"\n"}
          • <Text style={styles.benefit}>Ajustar según el día:</Text> Adaptarse a la energía disponible{"\n"}
          • <Text style={styles.benefit}>Ser realista:</Text> No sobrecargar la agenda{"\n"}
          • <Text style={styles.benefit}>Aprender de los errores:</Text> Mejorar continuamente{"\n"}
          • <Text style={styles.benefit}>Celebrar logros:</Text> Reconocer el progreso
          {"\n\n"}
          <Text style={styles.subtitle}>🧠 Bienestar mental:</Text>{"\n"}
          • <Text style={styles.benefit}>Tiempo para uno mismo:</Text> Actividades de autocuidado{"\n"}
          • <Text style={styles.benefit}>Límites saludables:</Text> Saber decir "no"{"\n"}
          • <Text style={styles.benefit}>Desconexión digital:</Text> Tiempo sin pantallas{"\n"}
          • <Text style={styles.benefit}>Reflexión diaria:</Text> Meditar sobre el día{"\n"}
          • <Text style={styles.benefit}>Gratitud:</Text> Apreciar lo que se tiene
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📅 تقنيات التخطيط:</Text>{"\n"}
          • <Text style={styles.benefit}>طريقة بومودورو:</Text> العمل 25 دقيقة، راحة 5{"\n"}
          • <Text style={styles.benefit}>مصفوفة أيزنهاور:</Text> إعطاء الأولوية حسب الاستعجال والأهمية{"\n"}
          • <Text style={styles.benefit}>حجب الوقت:</Text> تخصيص كتل زمنية محددة{"\n"}
          • <Text style={styles.benefit}>التخطيط الأسبوعي:</Text> مراجعة وتخطيط كل أحد{"\n"}
          • <Text style={styles.benefit}>قائمة المهام:</Text> كتابة وشطب الأنشطة المكتملة
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ تعظيم الإنتاجية:</Text>{"\n"}
          • <Text style={styles.benefit}>تحديد ساعات الذروة:</Text> العمل في أفضل لحظاتك{"\n"}
          • <Text style={styles.benefit}>إزالة المشتتات:</Text> إيقاف الإشعارات{"\n"}
          • <Text style={styles.benefit}>المهام الأصعب أولاً:</Text> البدء بالمعقد{"\n"}
          • <Text style={styles.benefit}>فترات راحة منتظمة:</Text> تجنب الإرهاق{"\n"}
          • <Text style={styles.benefit}>مراجعة يومية:</Text> تقييم الإنجازات والتعديل
          {"\n\n"}
          <Text style={styles.subtitle}>🔄 التكيف والمرونة:</Text>{"\n"}
          • <Text style={styles.benefit}>الخطة البديلة جاهزة دائماً:</Text> بدائل للطوارئ{"\n"}
          • <Text style={styles.benefit}>التعديل حسب اليوم:</Text> التكيف مع الطاقة المتاحة{"\n"}
          • <Text style={styles.benefit}>الواقعية:</Text> عدم إرهاق الجدول{"\n"}
          • <Text style={styles.benefit}>التعلم من الأخطاء:</Text> التحسين المستمر{"\n"}
          • <Text style={styles.benefit}>الاحتفال بالإنجازات:</Text> الاعتراف بالتقدم
          {"\n\n"}
          <Text style={styles.subtitle}>🧠 الرفاهية العقلية:</Text>{"\n"}
          • <Text style={styles.benefit}>وقت للذات:</Text> أنشطة العناية بالنفس{"\n"}
          • <Text style={styles.benefit}>حدود صحية:</Text> معرفة قول "لا"{"\n"}
          • <Text style={styles.benefit}>فصل رقمي:</Text> وقت بدون شاشات{"\n"}
          • <Text style={styles.benefit}>تأمل يومي:</Text> التفكير في اليوم{"\n"}
          • <Text style={styles.benefit}>الامتنان:</Text> تقدير ما لديك
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido sobre la vida cotidiana y las rutinas con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته حول الحياة اليومية والروتين مع هذه التمارين التفاعلية.</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    padding: 10,
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
    minHeight: 40,
    width: '100%',
  },
  inputLabel: {
    marginTop: 8,
    fontSize: 15,
    color: '#79A890',
    fontWeight: '500',
  },
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
