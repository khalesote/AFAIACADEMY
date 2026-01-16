import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Salud() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[2] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 2);
    }
    // Navegar directamente a la siguiente unidad (Tecnologia)
    router.push('/B1_Umbral/clases/Tecnologia');
  };

  const ejercicios = [
    // Ejercicio 1: Vocabulario - Relacionar síntomas con sus descripciones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada síntoma con su descripción:',
      pares: [
        { izquierda: '🤒 Fiebre', derecha: 'Temperatura corporal elevada' },
        { izquierda: '🤕 Dolor de cabeza', derecha: 'Molestia en la parte superior de la cabeza' },
        { izquierda: '🤧 Tos', derecha: 'Expulsión de aire por la boca' },
        { izquierda: '🤢 Náuseas', derecha: 'Sensación de malestar en el estómago' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué palabra se refiere a la temperatura alta del cuerpo?',
      opciones: ['Dolor', 'Fiebre', 'Tos', 'Mareo'],
      respuesta_correcta: 'Fiebre'
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "dolor de garganta"?',
      opciones: ['Dolor en el estómago', 'Dolor en la garganta', 'Dolor de cabeza', 'Dolor de espalda'],
      respuesta_correcta: 'Dolor en la garganta'
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué número de emergencias se usa en España?',
      opciones: ['911', '112', '999', '061'],
      respuesta_correcta: '112'
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué documento necesitas para acceder a la sanidad pública?',
      opciones: ['DNI', 'Tarjeta Sanitaria Individual', 'Pasaporte', 'Carnet de conducir'],
      respuesta_correcta: 'Tarjeta Sanitaria Individual'
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "receta médica"?',
      opciones: ['Un libro', 'Una orden del médico para medicamentos', 'Un examen', 'Una consulta'],
      respuesta_correcta: 'Una orden del médico para medicamentos'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "prevención" en salud?',
      opciones: ['Curar enfermedades', 'Evitar que aparezcan enfermedades', 'Solo tomar medicamentos', 'Ignorar síntomas'],
      respuesta_correcta: 'Evitar que aparezcan enfermedades'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tratamiento"?',
      opciones: ['Solo medicamentos', 'Conjunto de medidas para curar una enfermedad', 'Solo cirugía', 'Solo reposo'],
      respuesta_correcta: 'Conjunto de medidas para curar una enfermedad'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "consulta médica"?',
      opciones: ['Solo una operación', 'Visita al médico para revisión', 'Solo emergencias', 'Solo farmacia'],
      respuesta_correcta: 'Visita al médico para revisión'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "diagnóstico"?',
      opciones: ['Solo medicamentos', 'Identificación de una enfermedad', 'Solo cirugía', 'Solo reposo'],
      respuesta_correcta: 'Identificación de una enfermedad'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "vacunación"?',
      opciones: ['Solo tomar pastillas', 'Prevención de enfermedades mediante vacunas', 'Solo cirugía', 'Solo reposo'],
      respuesta_correcta: 'Prevención de enfermedades mediante vacunas'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "bienestar"?',
      opciones: ['Solo ausencia de enfermedad', 'Estado de salud física y mental completo', 'Solo ejercicio', 'Solo dieta'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "nutrición"?',
      opciones: ['Solo comer', 'Alimentación adecuada para la salud', 'Solo beber agua', 'Solo vitaminas'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "ejercicio físico"?',
      opciones: ['Solo caminar', 'Actividad física para mantener la salud', 'Solo correr', 'Solo nadar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "higiene"?',
      opciones: ['Solo ducharse', 'Prácticas para mantener la limpieza y salud', 'Solo lavarse las manos', 'Solo cepillarse los dientes'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Profesionales de la salud
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada profesional de la salud con su función:',
      pares: [
        { izquierda: '👨‍⚕️ Médico general', derecha: 'Atiende problemas de salud generales' },
        { izquierda: '🦷 Dentista', derecha: 'Cuida la salud dental y bucal' },
        { izquierda: '💊 Farmacéutico', derecha: 'Vende medicamentos y da consejos' },
        { izquierda: '👩‍⚕️ Enfermero', derecha: 'Ayuda en el cuidado de pacientes' }
      ]
    },

    // Ejercicio 17: Vocabulario - Hábitos saludables
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada hábito saludable con su beneficio:',
      pares: [
        { izquierda: '🏃‍♂️ Ejercicio regular', derecha: 'Fortalece el corazón y músculos' },
        { izquierda: '🥗 Alimentación equilibrada', derecha: 'Proporciona nutrientes necesarios' },
        { izquierda: '😴 Dormir bien', derecha: 'Recupera energía y fortalece el sistema inmune' },
        { izquierda: '🚭 No fumar', derecha: 'Previene enfermedades respiratorias' }
      ]
    },

    // Ejercicio 18: Vocabulario - Partes del cuerpo
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada parte del cuerpo con su función:',
      pares: [
        { izquierda: '🫀 Corazón', derecha: 'Bombea sangre por el cuerpo' },
        { izquierda: '🫁 Pulmones', derecha: 'Respiran oxígeno' },
        { izquierda: '🧠 Cerebro', derecha: 'Controla el cuerpo y pensamientos' },
        { izquierda: '🦴 Huesos', derecha: 'Sostienen y protegen el cuerpo' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "sistema inmune"?',
      opciones: ['Solo defensas del cuerpo', 'Sistema que protege contra enfermedades', 'Solo glóbulos blancos', 'Solo anticuerpos'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es importante para mantener una buena salud?',
      opciones: ['Solo tomar medicamentos', 'Hábitos saludables y prevención', 'Solo ir al médico', 'Solo descansar'],
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
        source={{ uri: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen relacionada con la salud"
      />
      
      <Text style={styles.title}>🏥 Salud y bienestar</Text>
      <Text style={styles.titleAr}>🏥 الصحة والعافية</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la salud</Text>
        <Text style={styles.sectionText}>
          La salud es el bien más preciado que tenemos y es fundamental para disfrutar 
          de una buena calidad de vida. Una buena salud nos permite realizar nuestras 
          actividades diarias, trabajar, estudiar y disfrutar del tiempo libre.
          {"\n\n"}
          Es importante saber cómo cuidar nuestra salud, prevenir enfermedades, 
          comunicarse con profesionales sanitarios y entender el sistema de salud 
          del país donde vivimos.
        </Text>
        <Text style={styles.sectionTextAr}>
          الصحة هي أثمن ما نملك وهي أساسية للتمتع
          بجودة حياة جيدة. الصحة الجيدة تسمح لنا بممارسة
          أنشطتنا اليومية والعمل والدراسة والتمتع بالوقت الحر.
          {"\n\n"}
          من المهم معرفة كيفية العناية بصحتنا والوقاية من الأمراض،
          والتواصل مع المتخصصين الصحيين وفهم نظام الصحة
          في البلد الذي نعيش فيه.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🩺 Sistema sanitario español</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏥 Características principales:</Text>{"\n"}
          • <Text style={styles.benefit}>Cobertura universal:</Text> Para todos los ciudadanos y residentes{"\n"}
          • <Text style={styles.benefit}>Atención gratuita:</Text> Sin coste para el paciente{"\n"}
          • <Text style={styles.benefit}>Atención primaria:</Text> En centros de salud locales{"\n"}
          • <Text style={styles.benefit}>Especialistas:</Text> En hospitales y centros especializados{"\n"}
          • <Text style={styles.benefit}>Urgencias 24h:</Text> Servicio de emergencias continuo
          {"\n\n"}
          <Text style={styles.subtitle}>📋 Documentos necesarios:</Text>{"\n"}
          • <Text style={styles.benefit}>Tarjeta Sanitaria Individual (TSI):</Text> Documento principal{"\n"}
          • <Text style={styles.benefit}>DNI o NIE:</Text> Identificación personal{"\n"}
          • <Text style={styles.benefit}>Empadronamiento:</Text> Registro en el ayuntamiento{"\n"}
          • <Text style={styles.benefit}>Seguridad Social:</Text> Afiliación al sistema
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏥 الخصائص الرئيسية:</Text>{"\n"}
          • <Text style={styles.benefit}>تغطية شاملة:</Text> لجميع المواطنين والمقيمين{"\n"}
          • <Text style={styles.benefit}>رعاية مجانية:</Text> بدون تكلفة للمريض{"\n"}
          • <Text style={styles.benefit}>رعاية أولية:</Text> في مراكز الصحة المحلية{"\n"}
          • <Text style={styles.benefit}>أخصائيون:</Text> في المستشفيات والمراكز المتخصصة{"\n"}
          • <Text style={styles.benefit}>طوارئ 24 ساعة:</Text> خدمة طوارئ مستمرة
          {"\n\n"}
          <Text style={styles.subtitle}>📋 الوثائق المطلوبة:</Text>{"\n"}
          • <Text style={styles.benefit}>بطاقة صحية فردية:</Text> الوثيقة الرئيسية{"\n"}
          • <Text style={styles.benefit}>هوية أو رقم أجنبي:</Text> هوية شخصية{"\n"}
          • <Text style={styles.benefit}>تسجيل في البلدية:</Text> تسجيل في البلدية{"\n"}
          • <Text style={styles.benefit}>الضمان الاجتماعي:</Text> الانضمام للنظام
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚨 Números de emergencia</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📞 Emergencias principales:</Text>{"\n"}
          • <Text style={styles.tip}>112:</Text> Emergencias generales (gratuito, varios idiomas){"\n"}
          • <Text style={styles.tip}>061:</Text> Urgencias sanitarias específicas{"\n"}
          • <Text style={styles.tip}>091:</Text> Policía Nacional{"\n"}
          • <Text style={styles.tip}>092:</Text> Policía Local{"\n"}
          • <Text style={styles.tip}>080:</Text> Bomberos{"\n"}
          • <Text style={styles.tip}>900 102 112:</Text> Emergencias para sordos (SMS)
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Servicios sanitarios:</Text>{"\n"}
          • <Text style={styles.tip}>Centro de salud:</Text> Atención primaria{"\n"}
          • <Text style={styles.tip}>Hospital:</Text> Atención especializada y urgencias{"\n"}
          • <Text style={styles.tip}>Farmacia:</Text> Medicamentos y consejos{"\n"}
          • <Text style={styles.tip}>Ambulancia:</Text> Transporte médico urgente
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📞 الطوارئ الرئيسية:</Text>{"\n"}
          • <Text style={styles.tip}>112:</Text> طوارئ عامة (مجاني، عدة لغات){"\n"}
          • <Text style={styles.tip}>061:</Text> طوارئ صحية محددة{"\n"}
          • <Text style={styles.tip}>091:</Text> الشرطة الوطنية{"\n"}
          • <Text style={styles.tip}>092:</Text> الشرطة المحلية{"\n"}
          • <Text style={styles.tip}>080:</Text> رجال الإطفاء{"\n"}
          • <Text style={styles.tip}>900 102 112:</Text> طوارئ للصم (رسائل نصية)
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 الخدمات الصحية:</Text>{"\n"}
          • <Text style={styles.tip}>مركز صحي:</Text> رعاية أولية{"\n"}
          • <Text style={styles.tip}>مستشفى:</Text> رعاية متخصصة وطوارئ{"\n"}
          • <Text style={styles.tip}>صيدلية:</Text> أدوية ونصائح{"\n"}
          • <Text style={styles.tip}>سيارة إسعاف:</Text> نقل طبي عاجل
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤒 Síntomas y enfermedades comunes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🤕 Síntomas generales:</Text>{"\n"}
          • <Text style={styles.benefit}>Dolor de cabeza:</Text> Molestia en la cabeza{"\n"}
          • <Text style={styles.benefit}>Fiebre:</Text> Temperatura alta del cuerpo{"\n"}
          • <Text style={styles.benefit}>Fatiga:</Text> Cansancio extremo{"\n"}
          • <Text style={styles.benefit}>Mareos:</Text> Sensación de inestabilidad
          {"\n\n"}
          <Text style={styles.subtitle}>🫁 Síntomas respiratorios:</Text>{"\n"}
          • <Text style={styles.benefit}>Tos:</Text> Expulsión de aire por la boca{"\n"}
          • <Text style={styles.benefit}>Dolor de garganta:</Text> Molestia al tragar{"\n"}
          • <Text style={styles.benefit}>Congestión nasal:</Text> Nariz tapada{"\n"}
          • <Text style={styles.benefit}>Dificultad para respirar:</Text> Problemas al inhalar
          {"\n\n"}
          <Text style={styles.subtitle}>🤢 Síntomas digestivos:</Text>{"\n"}
          • <Text style={styles.benefit}>Náuseas:</Text> Sensación de malestar en el estómago{"\n"}
          • <Text style={styles.benefit}>Vómitos:</Text> Expulsión del contenido del estómago{"\n"}
          • <Text style={styles.benefit}>Diarrea:</Text> Deposiciones líquidas frecuentes{"\n"}
          • <Text style={styles.benefit}>Dolor abdominal:</Text> Molestia en el vientre
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🤕 أعراض عامة:</Text>{"\n"}
          • <Text style={styles.benefit}>صداع:</Text> ألم في الرأس{"\n"}
          • <Text style={styles.benefit}>حمى:</Text> ارتفاع درجة حرارة الجسم{"\n"}
          • <Text style={styles.benefit}>إرهاق:</Text> تعب شديد{"\n"}
          • <Text style={styles.benefit}>دوار:</Text> شعور بعدم الاستقرار
          {"\n\n"}
          <Text style={styles.subtitle}>🫁 أعراض تنفسية:</Text>{"\n"}
          • <Text style={styles.benefit}>سعال:</Text> طرد الهواء من الفم{"\n"}
          • <Text style={styles.benefit}>ألم الحلق:</Text> ألم عند البلع{"\n"}
          • <Text style={styles.benefit}>احتقان الأنف:</Text> انسداد الأنف{"\n"}
          • <Text style={styles.benefit}>صعوبة في التنفس:</Text> مشاكل في الاستنشاق
          {"\n\n"}
          <Text style={styles.subtitle}>🤢 أعراض هضمية:</Text>{"\n"}
          • <Text style={styles.benefit}>غثيان:</Text> شعور بالضيق في المعدة{"\n"}
          • <Text style={styles.benefit}>قيء:</Text> طرد محتويات المعدة{"\n"}
          • <Text style={styles.benefit}>إسهال:</Text> براز سائل متكرر{"\n"}
          • <Text style={styles.benefit}>ألم بطني:</Text> ألم في البطن
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💊 Medicamentos y tratamientos</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💊 Tipos de medicamentos:</Text>{"\n"}
          • <Text style={styles.benefit}>Analgésicos:</Text> Para el dolor (paracetamol, ibuprofeno){"\n"}
          • <Text style={styles.benefit}>Antibióticos:</Text> Para infecciones bacterianas{"\n"}
          • <Text style={styles.benefit}>Antiinflamatorios:</Text> Para reducir inflamación{"\n"}
          • <Text style={styles.benefit}>Antihistamínicos:</Text> Para alergias
          {"\n\n"}
          <Text style={styles.subtitle}>📋 Receta médica:</Text>{"\n"}
          • <Text style={styles.benefit}>Prescripción obligatoria:</Text> Para medicamentos controlados{"\n"}
          • <Text style={styles.benefit}>Dosis y frecuencia:</Text> Instrucciones específicas{"\n"}
          • <Text style={styles.benefit}>Duración del tratamiento:</Text> Tiempo de toma{"\n"}
          • <Text style={styles.benefit}>Efectos secundarios:</Text> Posibles reacciones
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Tratamientos médicos:</Text>{"\n"}
          • <Text style={styles.benefit}>Fisioterapia:</Text> Para lesiones y rehabilitación{"\n"}
          • <Text style={styles.benefit}>Cirugía:</Text> Intervenciones quirúrgicas{"\n"}
          • <Text style={styles.benefit}>Terapia:</Text> Tratamiento psicológico{"\n"}
          • <Text style={styles.benefit}>Vacunación:</Text> Prevención de enfermedades
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💊 أنواع الأدوية:</Text>{"\n"}
          • <Text style={styles.benefit}>مسكنات:</Text> للألم (باراسيتامول، إيبوبروفين){"\n"}
          • <Text style={styles.benefit}>مضادات حيوية:</Text> للالتهابات البكتيرية{"\n"}
          • <Text style={styles.benefit}>مضادات التهاب:</Text> لتقليل الالتهاب{"\n"}
          • <Text style={styles.benefit}>مضادات الهيستامين:</Text> للحساسية
          {"\n\n"}
          <Text style={styles.subtitle}>📋 وصفة طبية:</Text>{"\n"}
          • <Text style={styles.benefit}>وصفة إلزامية:</Text> للأدوية الخاضعة للرقابة{"\n"}
          • <Text style={styles.benefit}>جرعة وتكرار:</Text> تعليمات محددة{"\n"}
          • <Text style={styles.benefit}>مدة العلاج:</Text> وقت التناول{"\n"}
          • <Text style={styles.benefit}>آثار جانبية:</Text> ردود فعل محتملة
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 علاجات طبية:</Text>{"\n"}
          • <Text style={styles.benefit}>علاج طبيعي:</Text> للإصابات وإعادة التأهيل{"\n"}
          • <Text style={styles.benefit}>جراحة:</Text> تدخلات جراحية{"\n"}
          • <Text style={styles.benefit}>علاج نفسي:</Text> علاج نفسي{"\n"}
          • <Text style={styles.benefit}>تطعيم:</Text> الوقاية من الأمراض
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏃‍♂️ Hábitos saludables</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🥗 Alimentación saludable:</Text>{"\n"}
          • <Text style={styles.tip}>Dieta equilibrada:</Text> Frutas, verduras, proteínas{"\n"}
          • <Text style={styles.tip}>Hidratación:</Text> Beber suficiente agua{"\n"}
          • <Text style={styles.tip}>Horarios regulares:</Text> Comer a horas fijas{"\n"}
          • <Text style={styles.tip}>Evitar excesos:</Text> Moderación en grasas y azúcares
          {"\n\n"}
          <Text style={styles.subtitle}>🏃‍♂️ Ejercicio físico:</Text>{"\n"}
          • <Text style={styles.tip}>Actividad regular:</Text> 30 minutos diarios{"\n"}
          • <Text style={styles.tip}>Variedad:</Text> Caminar, nadar, correr, yoga{"\n"}
          • <Text style={styles.tip}>Progresión:</Text> Aumentar intensidad gradualmente{"\n"}
          • <Text style={styles.tip}>Consistencia:</Text> Mantener rutina regular
          {"\n\n"}
          <Text style={styles.subtitle}>😴 Descanso y sueño:</Text>{"\n"}
          • <Text style={styles.tip}>Horas de sueño:</Text> 7-9 horas por noche{"\n"}
          • <Text style={styles.tip}>Rutina nocturna:</Text> Hábitos antes de dormir{"\n"}
          • <Text style={styles.tip}>Ambiente relajado:</Text> Dormitorio tranquilo{"\n"}
          • <Text style={styles.tip}>Evitar pantallas:</Text> Antes de acostarse
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🥗 تغذية صحية:</Text>{"\n"}
          • <Text style={styles.tip}>حمية متوازنة:</Text> فواكه، خضروات، بروتينات{"\n"}
          • <Text style={styles.tip}>ترطيب:</Text> شرب كمية كافية من الماء{"\n"}
          • <Text style={styles.tip}>مواعيد منتظمة:</Text> الأكل في أوقات ثابتة{"\n"}
          • <Text style={styles.tip}>تجنب الإفراط:</Text> اعتدال في الدهون والسكريات
          {"\n\n"}
          <Text style={styles.subtitle}>🏃‍♂️ تمرين بدني:</Text>{"\n"}
          • <Text style={styles.tip}>نشاط منتظم:</Text> 30 دقيقة يومياً{"\n"}
          • <Text style={styles.tip}>تنوع:</Text> مشي، سباحة، جري، يوغا{"\n"}
          • <Text style={styles.tip}>تدرج:</Text> زيادة الشدة تدريجياً{"\n"}
          • <Text style={styles.tip}>استمرارية:</Text> الحفاظ على روتين منتظم
          {"\n\n"}
          <Text style={styles.subtitle}>😴 راحة ونوم:</Text>{"\n"}
          • <Text style={styles.tip}>ساعات النوم:</Text> 7-9 ساعات ليلاً{"\n"}
          • <Text style={styles.tip}>روتين ليلي:</Text> عادات قبل النوم{"\n"}
          • <Text style={styles.tip}>بيئة مريحة:</Text> غرفة نوم هادئة{"\n"}
          • <Text style={styles.tip}>تجنب الشاشات:</Text> قبل النوم
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de salud</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏥 Conceptos básicos:</Text>{"\n"}
          salud = صحة{"\n"}
          enfermedad = مرض{"\n"}
          síntoma = عرض{"\n"}
          dolor = ألم{"\n"}
          fiebre = حمى{"\n"}
          tos = سعال{"\n"}
          médico = طبيب{"\n"}
          farmacia = صيدلية
          {"\n\n"}
          <Text style={styles.subtitle}>💊 Medicamentos:</Text>{"\n"}
          medicamento = دواء{"\n"}
          receta = وصفة طبية{"\n"}
          pastilla = حبة{"\n"}
          jarabe = شراب{"\n"}
          pomada = مرهم{"\n"}
          antibiótico = مضاد حيوي{"\n"}
          analgésico = مسكن{"\n"}
          vitamina = فيتامين
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 Servicios médicos:</Text>{"\n"}
          consulta = عيادة{"\n"}
          emergencia = طوارئ{"\n"}
          tratamiento = علاج{"\n"}
          prevención = وقاية{"\n"}
          vacuna = لقاح{"\n"}
          análisis = تحليل{"\n"}
          radiografía = أشعة سينية{"\n"}
          operación = عملية
          {"\n\n"}
          <Text style={styles.subtitle}>🩺 Profesionales:</Text>{"\n"}
          enfermero = ممرض{"\n"}
          dentista = طبيب أسنان{"\n"}
          farmacéutico = صيدلي{"\n"}
          especialista = أخصائي{"\n"}
          cirujano = جراح{"\n"}
          psicólogo = طبيب نفسي{"\n"}
          fisioterapeuta = معالج طبيعي{"\n"}
          pediatra = طبيب أطفال
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏥 المفاهيم الأساسية:</Text>{"\n"}
          صحة = salud{"\n"}
          مرض = enfermedad{"\n"}
          عرض = síntoma{"\n"}
          ألم = dolor{"\n"}
          حمى = fiebre{"\n"}
          سعال = tos{"\n"}
          طبيب = médico{"\n"}
          صيدلية = farmacia
          {"\n\n"}
          <Text style={styles.subtitle}>💊 أدوية:</Text>{"\n"}
          دواء = medicamento{"\n"}
          وصفة طبية = receta{"\n"}
          حبة = pastilla{"\n"}
          شراب = jarabe{"\n"}
          مرهم = pomada{"\n"}
          مضاد حيوي = antibiótico{"\n"}
          مسكن = analgésico{"\n"}
          فيتامين = vitamina
          {"\n\n"}
          <Text style={styles.subtitle}>🏥 خدمات طبية:</Text>{"\n"}
          عيادة = consulta{"\n"}
          طوارئ = emergencia{"\n"}
          علاج = tratamiento{"\n"}
          وقاية = prevención{"\n"}
          لقاح = vacuna{"\n"}
          تحليل = análisis{"\n"}
          أشعة سينية = radiografía{"\n"}
          عملية = operación
          {"\n\n"}
          <Text style={styles.subtitle}>🩺 متخصصون:</Text>{"\n"}
          ممرض = enfermero{"\n"}
          طبيب أسنان = dentista{"\n"}
          صيدلي = farmacéutico{"\n"}
          أخصائي = especialista{"\n"}
          جراح = cirujano{"\n"}
          طبيب نفسي = psicólogo{"\n"}
          معالج طبيعي = fisioterapeuta{"\n"}
          طبيب أطفال = pediatra
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles sobre salud</Text>
        <Text style={styles.sectionText}>
          • "¿Me duele la cabeza" = أشعر بألم في رأسي{"\n"}
          • "Tengo fiebre" = لدي حمى{"\n"}
          • "Necesito una cita médica" = أحتاج موعد طبي{"\n"}
          • "¿Dónde está la farmacia más cercana?" = أين أقرب صيدلية؟{"\n"}
          • "¿Es grave?" = هل هو خطير؟{"\n"}
          • "¿Qué medicamento debo tomar?" = ما الدواء الذي يجب أن أتناوله؟{"\n"}
          • "¿Cuánto tiempo dura el tratamiento?" = كم مدة العلاج؟{"\n"}
          • "¿Tengo que volver a la consulta?" = هل يجب أن أعود للعيادة؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "أشعر بألم في رأسي" = Me duele la cabeza{"\n"}
          • "لدي حمى" = Tengo fiebre{"\n"}
          • "أحتاج موعد طبي" = Necesito una cita médica{"\n"}
          • "أين أقرب صيدلية؟" = ¿Dónde está la farmacia más cercana?{"\n"}
          • "هل هو خطير؟" = ¿Es grave?{"\n"}
          • "ما الدواء الذي يجب أن أتناوله؟" = ¿Qué medicamento debo tomar?{"\n"}
          • "كم مدة العلاج؟" = ¿Cuánto tiempo dura el tratamiento?{"\n"}
          • "هل يجب أن أعود للعيادة؟" = ¿Tengo que volver a la consulta?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Salud en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏥 Sistema sanitario:</Text>{"\n"}
          • <Text style={styles.benefit}>Cobertura universal:</Text> Para todos los residentes{"\n"}
          • <Text style={styles.benefit}>Calidad alta:</Text> Reconocida internacionalmente{"\n"}
          • <Text style={styles.benefit}>Accesibilidad:</Text> Centros de salud en cada barrio{"\n"}
          • <Text style={styles.benefit}>Innovación:</Text> Tecnología médica avanzada
          {"\n\n"}
          <Text style={styles.subtitle}>👨‍⚕️ Profesionales:</Text>{"\n"}
          • <Text style={styles.benefit}>Médicos especializados:</Text> Formación de alta calidad{"\n"}
          • <Text style={styles.benefit}>Enfermeros cualificados:</Text> Atención profesional{"\n"}
          • <Text style={styles.benefit}>Farmacéuticos:</Text> Consejos y orientación{"\n"}
          • <Text style={styles.benefit}>Especialistas:</Text> En todas las áreas médicas
          {"\n\n"}
          <Text style={styles.subtitle}>💊 Medicamentos:</Text>{"\n"}
          • <Text style={styles.benefit}>Control de calidad:</Text> Estrictos estándares{"\n"}
          • <Text style={styles.benefit}>Precios regulados:</Text> Accesibles para todos{"\n"}
          • <Text style={styles.benefit}>Farmacias 24h:</Text> Servicio continuo{"\n"}
          • <Text style={styles.benefit}>Medicamentos genéricos:</Text> Alternativas económicas
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏥 النظام الصحي:</Text>{"\n"}
          • <Text style={styles.benefit}>تغطية شاملة:</Text> لجميع المقيمين{"\n"}
          • <Text style={styles.benefit}>جودة عالية:</Text> معترف بها دولياً{"\n"}
          • <Text style={styles.benefit}>سهولة الوصول:</Text> مراكز صحية في كل حي{"\n"}
          • <Text style={styles.benefit}>ابتكار:</Text> تكنولوجيا طبية متقدمة
          {"\n\n"}
          <Text style={styles.subtitle}>👨‍⚕️ متخصصون:</Text>{"\n"}
          • <Text style={styles.benefit}>أطباء متخصصون:</Text> تدريب عالي الجودة{"\n"}
          • <Text style={styles.benefit}>ممرضون مؤهلون:</Text> رعاية مهنية{"\n"}
          • <Text style={styles.benefit}>صيادلة:</Text> نصائح وتوجيه{"\n"}
          • <Text style={styles.benefit}>أخصائيون:</Text> في جميع المجالات الطبية
          {"\n\n"}
          <Text style={styles.subtitle}>💊 أدوية:</Text>{"\n"}
          • <Text style={styles.benefit}>مراقبة الجودة:</Text> معايير صارمة{"\n"}
          • <Text style={styles.benefit}>أسعار منظمة:</Text> متاحة للجميع{"\n"}
          • <Text style={styles.benefit}>صيدليات 24 ساعة:</Text> خدمة مستمرة{"\n"}
          • <Text style={styles.benefit}>أدوية عامة:</Text> بدائل اقتصادية
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
