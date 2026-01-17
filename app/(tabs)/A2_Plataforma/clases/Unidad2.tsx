import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '@/app/components/AudioButton';
import EjerciciosInteractivos from '@/app/components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

function Unidad2() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 1;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A2', unitIndex);
    }
    // Navegar directamente a la siguiente unidad (Unidad3)
    router.push('/A2_Plataforma/clases/Unidad3');
  };

  const ejercicios = [
    // Ejercicios de opción múltiple (17)
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما الذي تحتاجه لحضور موعد طبي؟',
      opciones: [
        'La tarjeta sanitaria',
        'Un libro',
        'Un paraguas',
        'Unos zapatos'
      ],
      respuesta_correcta: 'La tarjeta sanitaria'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se llama el profesional que te atiende en el hospital?',
      opciones: [
        'El médico',
        'El panadero',
        'El profesor',
        'El taxista'
      ],
      respuesta_correcta: 'El médico'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué debes hacer si necesitas medicamentos?',
      opciones: [
        'Ir a la farmacia con la receta',
        'Comprarlos en el supermercado',
        'Pedírselos a un amigo',
        'Tomar cualquier pastilla'
      ],
      respuesta_correcta: 'Ir a la farmacia con la receta'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se dice "صداع" en español?',
      opciones: [
        'Dolor de cabeza',
        'Dolor de estómago',
        'Dolor de espalda',
        'Tos'
      ],
      respuesta_correcta: 'Dolor de cabeza'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "me duele"?',
      opciones: [
        'يؤلمني',
        'أنا مريض',
        'أنا متعب',
        'أنا جائع'
      ],
      respuesta_correcta: 'يؤلمني'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se pide una cita médica?',
      opciones: [
        '¿Puedo pedir una cita?',
        '¿Qué hora es?',
        '¿Dónde está el baño?',
        '¿Cuánto cuesta?'
      ],
      respuesta_correcta: '¿Puedo pedir una cita?'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "receta médica"?',
      opciones: [
        'وصفة طبية',
        'موعد طبي',
        'تأمين طبي',
        'شهادة طبية'
      ],
      respuesta_correcta: 'وصفة طبية'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se dice "صيدلية" en español?',
      opciones: [
        'Farmacia',
        'Hospital',
        'Clínica',
        'Consulta'
      ],
      respuesta_correcta: 'Farmacia'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tengo fiebre"?',
      opciones: [
        'لدي حُمّى',
        'لدي زكام',
        'لدي صداع',
        'لدي سعال'
      ],
      respuesta_correcta: 'لدي حُمّى'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se dice "معدة" en español?',
      opciones: [
        'Estómago',
        'Cabeza',
        'Garganta',
        'Espalda'
      ],
      respuesta_correcta: 'Estómago'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "me siento mal"?',
      opciones: [
        'أشعر بالسوء',
        'أنا متعب',
        'أنا جائع',
        'أنا عطشان'
      ],
      respuesta_correcta: 'أشعر بالسوء'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se dice "طوارئ" en español?',
      opciones: [
        'Urgencias',
        'Consulta',
        'Recepción',
        'Farmacia'
      ],
      respuesta_correcta: 'Urgencias'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tengo que tomar"?',
      opciones: [
        'عليّ أن أتناول',
        'أريد أن آكل',
        'أحتاج أن أشرب',
        'ينبغي أن أنام'
      ],
      respuesta_correcta: 'عليّ أن أتناول'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se dice "حلق" en español?',
      opciones: [
        'Garganta',
        'Nariz',
        'Oreja',
        'Espalda'
      ],
      respuesta_correcta: 'Garganta'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "cada 8 horas"?',
      opciones: [
        'كل 8 ساعات',
        '8 مرات في اليوم',
        'قبل 8 ساعات',
        'بعد 8 ساعات'
      ],
      respuesta_correcta: 'كل 8 ساعات'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se dice "مضاد حيوي" en español?',
      opciones: [
        'Antibiótico',
        'Analgésico',
        'Antiinflamatorio',
        'Jarabe'
      ],
      respuesta_correcta: 'Antibiótico'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "descansar"?',
      opciones: [
        'أن أرتاح',
        'أن أنام',
        'أن آكل',
        'أن أشرب'
      ],
      respuesta_correcta: 'أن أرتاح'
    },
    // Ejercicios de relacionar (3)
    {
      tipo: 'vocabulario',
      titulo: 'اربط أجزاء الجسم بأسمائها',
      pares: [
        { "izquierda": "Cabeza", "derecha": "رأس" },
        { "izquierda": "Estómago", "derecha": "معدة" },
        { "izquierda": "Garganta", "derecha": "حلق" },
        { "izquierda": "Espalda", "derecha": "ظهر" },
        { "izquierda": "Brazo", "derecha": "ذراع" }
      ],
      opciones: [
        "Cabeza", "Estómago", "Garganta", "Espalda", "Brazo",
        "رأس", "معدة", "حلق", "ظهر", "ذراع"
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'اربط الأعراض بمعانيها',
      pares: [
        { "izquierda": "Fiebre", "derecha": "حُمّى" },
        { "izquierda": "Tos", "derecha": "سعال" },
        { "izquierda": "Dolor", "derecha": "ألم" },
        { "izquierda": "Mareo", "derecha": "دوار" },
        { "izquierda": "Cansancio", "derecha": "تعب" }
      ],
      opciones: [
        "Fiebre", "Tos", "Dolor", "Mareo", "Cansancio",
        "حُمّى", "سعال", "ألم", "دوار", "تعب"
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'اربط المصطلحات الطبية',
      pares: [
        { "izquierda": "Médico", "derecha": "طبيب" },
        { "izquierda": "Farmacia", "derecha": "صيدلية" },
        { "izquierda": "Receta", "derecha": "وصفة طبية" },
        { "izquierda": "Cita", "derecha": "موعد" },
        { "izquierda": "Urgencias", "derecha": "طوارئ" }
      ],
      opciones: [
        "Médico", "Farmacia", "Receta", "Cita", "Urgencias",
        "طبيب", "صيدلية", "وصفة طبية", "موعد", "طوارئ"
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/A2_Plataforma')}
        accessibilityLabel="Volver al menú A2: Plataforma"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1505751172876-faee0fddd5da?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de un médico y paciente"
      />

      <Text style={styles.title}>🏥 Unidad 2: En el Médico</Text>
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <AudioButton text="Unidad 2: En el Médico" size="small" showText={false} color="#79A890" />
      </View>
      <Text style={styles.titleAr}>الوحدة 2: في الطبيب</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🌟 Cuidando tu Salud</Text>
          <AudioButton text="Cuidando tu salud" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.sectionText}>
          En esta unidad aprenderás a comunicarte efectivamente en situaciones médicas. Descubrirás cómo pedir citas, describir síntomas, entender diagnósticos y seguir las indicaciones del médico. Es esencial para cuidar tu salud en España.
        </Text>
        <Text style={styles.sectionTextAr}>
          في هذه الوحدة ستتعلم التواصل بفعالية في المواقف الطبية. ستكتشف كيفية طلب المواعيد ووصف الأعراض وفهم التشخيصات واتباع تعليمات الطبيب. هذا أساسي لرعاية صحتك في إسبانيا.
        </Text>
      </View>

      {/* Diálogo (por líneas) con Audio por línea */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>💬 Diálogo (por líneas): En la Consulta</Text>
          <AudioButton text="Diálogo por líneas: En la consulta" size="small" showText={false} color="#79A890" />
        </View>

        {/* Audio global del diálogo */}
        <View style={{ alignItems: 'flex-start', marginBottom: 8 }}>
          <AudioButton 
            text="Buenos días, tengo cita con el doctor López. ¿Tiene su tarjeta sanitaria? Sí, aquí la tiene. Siéntese, el médico le atenderá enseguida. ¿Qué le pasa? ¿Cómo se siente? Tengo dolor de garganta y fiebre desde ayer." 
            size="medium" 
            showText={false} 
            color="#79A890" 
          />
        </View>

        <View style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Paciente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Buenos días, tengo cita con el doctor López.</Text>
              <AudioButton text="Buenos días, tengo cita con el doctor López." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>صباح الخير، لدي موعد مع الدكتور لوبيز.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Recepcionista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>¿Tiene su tarjeta sanitaria?</Text>
              <AudioButton text="¿Tiene su tarjeta sanitaria?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل لديك بطاقة التأمين الصحي؟</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Paciente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Sí, aquí la tiene.</Text>
              <AudioButton text="Sí, aquí la tiene." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، ها هي.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Recepcionista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Siéntese, el médico le atenderá enseguida.</Text>
              <AudioButton text="Siéntese, el médico le atenderá enseguida." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>اجلس، الطبيب سيراك قريباً.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Médico:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>¿Qué le pasa? ¿Cómo se siente?</Text>
              <AudioButton text="¿Qué le pasa? ¿Cómo se siente?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>ما المشكلة؟ كيف تشعر؟</Text>
          </View>

          <View style={{ marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Paciente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Tengo dolor de garganta y fiebre desde ayer.</Text>
              <AudioButton text="Tengo dolor de garganta y fiebre desde ayer." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لدي ألم في الحلق وحرارة منذ أمس.</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>📚 Vocabulario Esencial</Text>
          <AudioButton text="Vocabulario esencial" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>👨‍⚕️ Profesionales de la Salud</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Médico</Text> = طبيب - Doctor{'\n'}
          • <Text style={styles.benefit}>Enfermero/a</Text> = ممرض/ممرضة - Nurse{'\n'}
          • <Text style={styles.benefit}>Farmacéutico/a</Text> = صيدلي/صيدلية - Pharmacist{'\n'}
          • <Text style={styles.benefit}>Especialista</Text> = أخصائي - Specialist{'\n'}
          • <Text style={styles.benefit}>Dentista</Text> = طبيب أسنان - Dentist{'\n'}
          • <Text style={styles.benefit}>Pediatra</Text> = طبيب أطفال - Pediatrician
        </Text>

        <Text style={styles.sectionSubtitle}>🏥 Lugares Médicos</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Centro de salud</Text> = مركز صحي - Health center{'\n'}
          • <Text style={styles.benefit}>Hospital</Text> = مستشفى - Hospital{'\n'}
          • <Text style={styles.benefit}>Farmacia</Text> = صيدلية - Pharmacy{'\n'}
          • <Text style={styles.benefit}>Urgencias</Text> = طوارئ - Emergency room{'\n'}
          • <Text style={styles.benefit}>Consulta</Text> = عيادة - Medical office{'\n'}
          • <Text style={styles.benefit}>Laboratorio</Text> = مختبر - Laboratory
        </Text>

        <Text style={styles.sectionSubtitle}>🩺 Partes del Cuerpo</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Cabeza</Text> = رأس - Head{'\n'}
          • <Text style={styles.benefit}>Garganta</Text> = حلق - Throat{'\n'}
          • <Text style={styles.benefit}>Estómago</Text> = معدة - Stomach{'\n'}
          • <Text style={styles.benefit}>Espalda</Text> = ظهر - Back{'\n'}
          • <Text style={styles.benefit}>Brazo</Text> = ذراع - Arm{'\n'}
          • <Text style={styles.benefit}>Pierna</Text> = ساق - Leg
        </Text>

        <Text style={styles.sectionSubtitle}>🤒 Síntomas Comunes</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Fiebre</Text> = حرارة - Fever{'\n'}
          • <Text style={styles.benefit}>Tos</Text> = سعال - Cough{'\n'}
          • <Text style={styles.benefit}>Dolor</Text> = ألم - Pain{'\n'}
          • <Text style={styles.benefit}>Mareo</Text> = دوار - Dizziness{'\n'}
          • <Text style={styles.benefit}>Cansancio</Text> = تعب - Tiredness{'\n'}
          • <Text style={styles.benefit}>Alergia</Text> = حساسية - Allergy
        </Text>

        <Text style={styles.sectionSubtitle}>💊 Medicamentos</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Antibiótico</Text> = مضاد حيوي - Antibiotic{'\n'}
          • <Text style={styles.benefit}>Analgésico</Text> = مسكن - Painkiller{'\n'}
          • <Text style={styles.benefit}>Antiinflamatorio</Text> = مضاد التهاب - Anti-inflammatory{'\n'}
          • <Text style={styles.benefit}>Receta</Text> = وصفة طبية - Prescription{'\n'}
          • <Text style={styles.benefit}>Pastilla</Text> = حبة - Pill{'\n'}
          • <Text style={styles.benefit}>Jarabe</Text> = شراب - Syrup
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🎯 Gramática Básica</Text>
          <AudioButton text="Gramática básica" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🤕 Expresar Dolencias</Text>
        <Text style={styles.sectionText}>
          Estructuras para describir síntomas:{'\n\n'}
          • <Text style={styles.benefit}>Tengo + síntoma</Text> = لدي + عرض - I have + symptom{'\n'}
          • <Text style={styles.benefit}>Me duele + parte del cuerpo</Text> = يؤلمني + جزء من الجسم - My + body part hurts{'\n'}
          • <Text style={styles.benefit}>Me siento + adjetivo</Text> = أشعر + صفة - I feel + adjective{'\n'}
          • <Text style={styles.benefit}>Estoy + adjetivo</Text> = أنا + صفة - I am + adjective
        </Text>

        <Text style={styles.sectionSubtitle}>📅 Formas de Obligación</Text>
        <Text style={styles.sectionText}>
          Expresiones para indicar necesidad:{'\n\n'}
          • <Text style={styles.benefit}>Tengo que + verbo</Text> = عليّ أن + فعل - I have to + verb{'\n'}
          • <Text style={styles.benefit}>Debo + verbo</Text> = يجب أن + فعل - I must + verb{'\n'}
          • <Text style={styles.benefit}>Necesito + verbo/sustantivo</Text> = أحتاج إلى + فعل/اسم - I need + verb/noun{'\n'}
          • <Text style={styles.benefit}>Es importante + verbo</Text> = من المهم + فعل - It's important to + verb
        </Text>

        <Text style={styles.sectionSubtitle}>⏰ Adverbios de Frecuencia</Text>
        <Text style={styles.sectionText}>
          Para describir la frecuencia de síntomas:{'\n\n'}
          • <Text style={styles.benefit}>Siempre</Text> = دائماً - Always{'\n'}
          • <Text style={styles.benefit}>A menudo</Text> = غالباً - Often{'\n'}
          • <Text style={styles.benefit}>A veces</Text> = أحياناً - Sometimes{'\n'}
          • <Text style={styles.benefit}>Raramente</Text> = نادراً - Rarely{'\n'}
          • <Text style={styles.benefit}>Nunca</Text> = أبداً - Never
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🗣️ Expresiones Útiles</Text>
          <AudioButton text="Expresiones útiles" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>📞 Pedir Cita</Text>
        <Text style={styles.sectionText}>
          Frases para solicitar atención médica:{'\n\n'}
          • <Text style={styles.benefit}>¿Puedo pedir una cita?</Text> = هل يمكنني طلب موعد؟{'\n'}
          • <Text style={styles.benefit}>Necesito ver al médico</Text> = أحتاج لرؤية الطبيب{'\n'}
          • <Text style={styles.benefit}>¿Tiene cita disponible?</Text> = هل لديك موعد متاح؟{'\n'}
          • <Text style={styles.benefit}>¿Cuándo puedo venir?</Text> = متى يمكنني المجيء؟{'\n'}
          • <Text style={styles.benefit}>¿Es urgente?</Text> = هل هو عاجل؟
        </Text>

        <Text style={styles.sectionSubtitle}>🤒 Describir Síntomas</Text>
        <Text style={styles.sectionText}>
          Cómo explicar cómo te sientes:{'\n\n'}
          • <Text style={styles.benefit}>Tengo dolor de cabeza</Text> = لدي ألم في الرأس{'\n'}
          • <Text style={styles.benefit}>Me duele la garganta</Text> = يؤلمني الحلق{'\n'}
          • <Text style={styles.benefit}>Me siento mal</Text> = أشعر بالسوء{'\n'}
          • <Text style={styles.benefit}>Tengo fiebre</Text> = لدي حرارة{'\n'}
          • <Text style={styles.benefit}>No puedo dormir</Text> = لا أستطيع النوم
        </Text>

        <Text style={styles.sectionSubtitle}>💊 En la Farmacia</Text>
        <Text style={styles.sectionText}>
          Expresiones para comprar medicamentos:{'\n\n'}
          • <Text style={styles.benefit}>Tengo una receta</Text> = لدي وصفة طبية{'\n'}
          • <Text style={styles.benefit}>¿Tiene algo para el dolor?</Text> = هل لديك شيء للألم؟{'\n'}
          • <Text style={styles.benefit}>¿Cómo se toma?</Text> = كيف يؤخذ؟{'\n'}
          • <Text style={styles.benefit}>¿Tiene efectos secundarios?</Text> = هل له آثار جانبية؟{'\n'}
          • <Text style={styles.benefit}>¿Cuánto cuesta?</Text> = كم ثمنه؟
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🇪🇸 Sistema de Salud en España</Text>
          <AudioButton text="Sistema de salud en España" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🏥 Atención Primaria</Text>
        <Text style={styles.sectionText}>
          El sistema de salud español es público y de calidad:{'\n\n'}
          • <Text style={styles.benefit}>Centros de salud</Text>: Atención básica gratuita{'\n'}
          • <Text style={styles.benefit}>Tarjeta sanitaria</Text>: Documento necesario{'\n'}
          • <Text style={styles.benefit}>Médico de cabecera</Text>: Tu médico principal{'\n'}
          • <Text style={styles.benefit}>Especialistas</Text>: Derivación desde atención primaria{'\n'}
          • <Text style={styles.benefit}>Horarios</Text>: Generalmente de 8:00 a 20:00
        </Text>

        <Text style={styles.sectionSubtitle}>💊 Farmacias</Text>
        <Text style={styles.sectionText}>
          Las farmacias en España son muy accesibles:{'\n\n'}
          • <Text style={styles.benefit}>Ubicación</Text>: En todos los barrios{'\n'}
          • <Text style={styles.benefit}>Horarios</Text>: De 9:00 a 21:00{'\n'}
          • <Text style={styles.benefit}>Farmacias de guardia</Text>: 24 horas{'\n'}
          • <Text style={styles.benefit}>Consejo farmacéutico</Text>: Gratuito y profesional{'\n'}
          • <Text style={styles.benefit}>Medicamentos sin receta</Text>: Para síntomas leves
        </Text>

        <Text style={styles.sectionSubtitle}>🚨 Urgencias</Text>
        <Text style={styles.sectionText}>
          Para situaciones de emergencia:{'\n\n'}
          • <Text style={styles.benefit}>Teléfono 112</Text>: Emergencias generales{'\n'}
          • <Text style={styles.benefit}>Hospitales</Text>: Atención 24 horas{'\n'}
          • <Text style={styles.benefit}>Ambulancias</Text>: Servicio gratuito{'\n'}
          • <Text style={styles.benefit}>Puntos de urgencia</Text>: En centros de salud{'\n'}
          • <Text style={styles.benefit}>Tiempo de espera</Text>: Varía según la urgencia
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>💬 Diálogo de Ejemplo: En la Consulta</Text>
          <AudioButton text="Diálogo de ejemplo: En la consulta" size="small" showText={false} color="#79A890" />
        </View>
        {/* Diálogo por líneas con audio y traducción por línea */}
        <View style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          {/* Línea 1 */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Paciente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Buenos días, tengo cita con el doctor López.</Text>
              <AudioButton text="Buenos días, tengo cita con el doctor López." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>صباح الخير، لدي موعد مع الدكتور لوبيز.</Text>
          </View>

          {/* Línea 2 */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Recepcionista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>¿Tiene su tarjeta sanitaria?</Text>
              <AudioButton text="¿Tiene su tarjeta sanitaria?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>هل لديك بطاقة التأمين الصحي؟</Text>
          </View>

          {/* Línea 3 */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Paciente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Sí, aquí la tiene.</Text>
              <AudioButton text="Sí, aquí la tiene." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، ها هي.</Text>
          </View>

          {/* Línea 4 */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Recepcionista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Siéntese, el médico le atenderá enseguida.</Text>
              <AudioButton text="Siéntese, el médico le atenderá enseguida." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>اجلس، الطبيب سيراك قريباً.</Text>
          </View>

          {/* Línea 5 */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Médico:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>¿Qué le pasa? ¿Cómo se siente?</Text>
              <AudioButton text="¿Qué le pasa? ¿Cómo se siente?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>ما المشكلة؟ كيف تشعر؟</Text>
          </View>

          {/* Línea 6 */}
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 120 }]}>Paciente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Tengo dolor de garganta y fiebre desde ayer.</Text>
              <AudioButton text="Tengo dolor de garganta y fiebre desde ayer." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لدي ألم في الحلق وحرارة منذ أمس.</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🎯 Consejos Prácticos</Text>
          <AudioButton text="Consejos prácticos" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Lleva siempre tu tarjeta sanitaria</Text>: Es obligatoria{'\n'}
          • <Text style={styles.benefit}>Aprende vocabulario básico</Text>: Para comunicarte mejor{'\n'}
          • <Text style={styles.benefit}>Lleva un traductor</Text>: Si no hablas bien español{'\n'}
          • <Text style={styles.benefit}>Pide cita con anticipación</Text>: Evita esperas largas{'\n'}
          • <Text style={styles.benefit}>Guarda las recetas</Text>: Para futuras consultas
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.benefit}>احمل دائماً بطاقة التأمين الصحي</Text>: إلزامية{'\n'}
          • <Text style={styles.benefit}>تعلم المفردات الأساسية</Text>: للتواصل بشكل أفضل{'\n'}
          • <Text style={styles.benefit}>احمل مترجماً</Text>: إذا كنت لا تتحدث الإسبانية جيداً{'\n'}
          • <Text style={styles.benefit}>اطلب موعداً مسبقاً</Text>: تجنب الانتظار الطويل{'\n'}
          • <Text style={styles.benefit}>احتفظ بالوصفات</Text>: للمراجعات المستقبلية
        </Text>
      </View>

      {/* Ejemplos escritos */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
        <View style={{ gap: 10 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>Quiero pedir una cita para mañana.</Text>
              <AudioButton text="Quiero pedir una cita para mañana." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>أريد أن أحجز موعداً للغد.</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>Me duele la garganta.</Text>
              <AudioButton text="Me duele la garganta." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>حلقي يؤلمني.</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>¿Cómo debo tomar este medicamento?</Text>
              <AudioButton text="¿Cómo debo tomar este medicamento?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>كيف يجب أن أتناول هذا الدواء؟</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>Tengo fiebre desde ayer.</Text>
              <AudioButton text="Tengo fiebre desde ayer." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>لدي حرارة منذ أمس.</Text>
          </View>
        </View>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} />

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
  backButton: {
    position: 'absolute',
    left: 10,
    top: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 3,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  titleAr: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    writingDirection: 'rtl',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  dialogo: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  dialogoAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
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

export default Unidad2;
