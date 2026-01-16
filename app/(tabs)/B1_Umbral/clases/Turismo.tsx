import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Turismo() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[12] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 12);
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
      enunciado: '¿Qué necesitas para reservar una habitación de hotel?',
      opciones: ['Un billete de avión', 'Una reserva', 'Un equipaje facturado', 'Un visado'],
      respuesta_correcta: 'Una reserva'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Dónde recoges las maletas al llegar a un aeropuerto?',
      opciones: ['En la terminal de salidas', 'En la cinta de equipajes', 'En el mostrador de facturación', 'En la aduana'],
      respuesta_correcta: 'En la cinta de equipajes'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada palabra con su definición:',
      pares: [
        { izquierda: 'Facturación', derecha: 'Proceso de registrar el equipaje en el aeropuerto' },
        { izquierda: 'Tarjeta de embarque', derecha: 'Documento necesario para subir al avión' },
        { izquierda: 'Check-in', derecha: 'Registro de llegada al hotel' },
        { izquierda: 'Reserva', derecha: 'Confirmación de una habitación o vuelo' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es el "check-in" en un hotel?',
      opciones: ['Salir del hotel', 'Registrar la llegada al hotel', 'Hacer la maleta', 'Pagar la factura'],
      respuesta_correcta: 'Registrar la llegada al hotel'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "turismo"?',
      opciones: ['Trabajar en un hotel', 'Viajar por placer o descanso', 'Vivir en otro país', 'Estudiar idiomas'],
      respuesta_correcta: 'Viajar por placer o descanso'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada tipo de alojamiento con su descripción:',
      pares: [
        { izquierda: 'Hotel', derecha: 'Alojamiento con servicios completos' },
        { izquierda: 'Hostal', derecha: 'Alojamiento económico y básico' },
        { izquierda: 'Apartamento', derecha: 'Alojamiento con cocina y más independencia' },
        { izquierda: 'Camping', derecha: 'Alojamiento al aire libre con tienda' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "guía turística"?',
      opciones: ['Un mapa', 'Una persona que explica los lugares de interés', 'Un billete de avión', 'Una maleta'],
      respuesta_correcta: 'Una persona que explica los lugares de interés'
    },
    {
      tipo: 'escribir',
      enunciado: 'Escribe un correo electrónico a un hotel para hacer una reserva. Incluye fechas de estancia, tipo de habitación, número de personas y algún requerimiento especial.'
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
        source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de turismo y viajes"
      />
      
      <Text style={styles.title}>Turismo y viajes</Text>
      <Text style={styles.titleAr}>السياحة والسفر</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contexto</Text>
        <Text style={styles.sectionText}>
          El turismo es una actividad fundamental en España, siendo uno de los países más visitados del mundo. 
          {"\n\n"}
          España ofrece una gran variedad de destinos turísticos: playas, montañas, ciudades históricas, gastronomía única y una rica cultura. 
          {"\n\n"}
          Es importante conocer el vocabulario y las situaciones típicas del turismo para poder disfrutar plenamente de los viajes y comunicarse efectivamente.
        </Text>
        <Text style={styles.sectionTextAr}>
          السياحة نشاط أساسي في إسبانيا، كونها واحدة من أكثر البلدان زيارة في العالم.
          {"\n\n"}
          تقدم إسبانيا مجموعة متنوعة من الوجهات السياحية: الشواطئ والجبال والمدن التاريخية والمطبخ الفريد والثقافة الغنية.
          {"\n\n"}
          من المهم معرفة المفردات والمواقف النموذجية للسياحة للاستمتاع الكامل بالسفر والتواصل بفعالية.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulario clave</Text>
        <Text style={styles.sectionText}>
          turismo = سياحة{"\n"}
          viaje = سفر{"\n"}
          reserva = حجز{"\n"}
          hotel = فندق{"\n"}
          habitación = غرفة{"\n"}
          check-in = تسجيل الوصول{"\n"}
          check-out = تسجيل المغادرة{"\n"}
          equipaje = أمتعة{"\n"}
          maleta = حقيبة{"\n"}
          billete = تذكرة{"\n"}
          aeropuerto = مطار{"\n"}
          terminal = مبنى المطار{"\n"}
          facturación = تسجيل الأمتعة{"\n"}
          guía turística = دليل سياحي{"\n"}
          monumento = نصب تذكاري{"\n"}
          museo = متحف
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos de turismo en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Turismo de playa:</Text>{"\n"}
          • Costa del Sol (Málaga){"\n"}
          • Islas Baleares{"\n"}
          • Islas Canarias{"\n"}
          • Costa Brava (Cataluña)
          {"\n\n"}
          <Text style={styles.subtitle}>Turismo cultural:</Text>{"\n"}
          • Madrid (museos y arte){"\n"}
          • Barcelona (arquitectura){"\n"}
          • Sevilla (historia y flamenco){"\n"}
          • Granada (Alhambra)
          {"\n\n"}
          <Text style={styles.subtitle}>Turismo rural:</Text>{"\n"}
          • Pueblos de montaña{"\n"}
          • Casas rurales{"\n"}
          • Rutas de senderismo{"\n"}
          • Gastronomía local
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>سياحة الشاطئ:</Text>{"\n"}
          • كوستا ديل سول (ملقة){"\n"}
          • جزر البليار{"\n"}
          • جزر الكناري{"\n"}
          • كوستا برافا (كاتالونيا)
          {"\n\n"}
          <Text style={styles.subtitle}>السياحة الثقافية:</Text>{"\n"}
          • مدريد (المتاحف والفن){"\n"}
          • برشلونة (العمارة){"\n"}
          • إشبيلية (التاريخ والفلامنكو){"\n"}
          • غرناطة (الحمراء)
          {"\n\n"}
          <Text style={styles.subtitle}>السياحة الريفية:</Text>{"\n"}
          • قرى الجبال{"\n"}
          • البيوت الريفية{"\n"}
          • مسارات المشي{"\n"}
          • المطبخ المحلي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proceso de reserva y viaje</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Planificación:</Text> Elegir destino, fechas y presupuesto{"\n"}
          • <Text style={styles.benefit}>Reserva de transporte:</Text> Avión, tren, autobús o coche{"\n"}
          • <Text style={styles.benefit}>Reserva de alojamiento:</Text> Hotel, hostal, apartamento{"\n"}
          • <Text style={styles.benefit}>Documentación:</Text> Pasaporte, visado si es necesario{"\n"}
          • <Text style={styles.benefit}>Seguro de viaje:</Text> Cobertura médica y equipaje{"\n"}
          • <Text style={styles.benefit}>Actividades:</Text> Excursiones, visitas guiadas, entradas
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.benefit}>التخطيط:</Text> اختيار الوجهة والتواريخ والميزانية{"\n"}
          • <Text style={styles.benefit}>حجز النقل:</Text> طائرة، قطار، حافلة أو سيارة{"\n"}
          • <Text style={styles.benefit}>حجز الإقامة:</Text> فندق، نزل، شقة{"\n"}
          • <Text style={styles.benefit}>الوثائق:</Text> جواز سفر، تأشيرة إذا لزم الأمر{"\n"}
          • <Text style={styles.benefit}>تأمين السفر:</Text> تغطية طبية وأمتعة{"\n"}
          • <Text style={styles.benefit}>الأنشطة:</Text> رحلات، زيارات مرشدة، تذاكر
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Situaciones típicas del turismo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>En el aeropuerto:</Text>{"\n"}
          1. <Text style={styles.tip}>Facturación:</Text> Entregar equipaje y recibir tarjeta de embarque{"\n"}
          2. <Text style={styles.tip}>Control de seguridad:</Text> Pasar por el escáner{"\n"}
          3. <Text style={styles.tip}>Embarque:</Text> Subir al avión{"\n"}
          4. <Text style={styles.tip}>Recogida de equipaje:</Text> Recoger maletas al llegar
          {"\n\n"}
          <Text style={styles.subtitle}>En el hotel:</Text>{"\n"}
          1. <Text style={styles.tip}>Check-in:</Text> Registrarse y recibir llaves{"\n"}
          2. <Text style={styles.tip}>Servicios:</Text> Informarse sobre instalaciones{"\n"}
          3. <Text style={styles.tip}>Check-out:</Text> Salir y pagar la factura{"\n"}
          4. <Text style={styles.tip}>Almacenaje:</Text> Dejar equipaje si es necesario
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>في المطار:</Text>{"\n"}
          1. <Text style={styles.tip}>تسجيل الأمتعة:</Text> تسليم الأمتعة واستلام بطاقة الصعود{"\n"}
          2. <Text style={styles.tip}>الفحص الأمني:</Text> المرور عبر الماسح الضوئي{"\n"}
          3. <Text style={styles.tip}>الصعود:</Text> الصعود إلى الطائرة{"\n"}
          4. <Text style={styles.tip}>استلام الأمتعة:</Text> استلام الحقائب عند الوصول
          {"\n\n"}
          <Text style={styles.subtitle}>في الفندق:</Text>{"\n"}
          1. <Text style={styles.tip}>تسجيل الوصول:</Text> التسجيل واستلام المفاتيح{"\n"}
          2. <Text style={styles.tip}>الخدمات:</Text> الاستعلام عن المرافق{"\n"}
          3. <Text style={styles.tip}>تسجيل المغادرة:</Text> الخروج ودفع الفاتورة{"\n"}
          4. <Text style={styles.tip}>التخزين:</Text> ترك الأمتعة إذا لزم الأمر
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejemplo de diálogo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.dialogueTitle}>Conversación en un hotel:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>Recepcionista:</Text> Buenos días, ¿tiene una reserva?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Sí، tengo una reserva a nombre de Ahmed Hassan.{"\n"}
          <Text style={styles.speaker}>Recepcionista:</Text> Perfecto، veo su reserva para 3 noches.{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> ¿A qué hora es el check-out?{"\n"}
          <Text style={styles.speaker}>Recepcionista:</Text> El check-out es a las 12:00 del mediodía.{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> ¿El desayuno está incluido?{"\n"}
          <Text style={styles.speaker}>Recepcionista:</Text> Sí، el desayuno está incluido de 7:00 a 10:00.
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.dialogueTitle}>محادثة في فندق:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>الموظف:</Text> صباح الخير، هل لديك حجز؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> نعم، لدي حجز باسم أحمد حسن.{"\n"}
          <Text style={styles.speaker}>الموظف:</Text> ممتاز، أرى حجزك لـ 3 ليالٍ.{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> في أي ساعة تسجيل المغادرة؟{"\n"}
          <Text style={styles.speaker}>الموظف:</Text> تسجيل المغادرة في الساعة 12:00 ظهراً.{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> هل الإفطار مشمول؟{"\n"}
          <Text style={styles.speaker}>الموظف:</Text> نعم، الإفطار مشمول من 7:00 إلى 10:00.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad de reflexión</Text>
        <Text style={styles.sectionText}>
          Reflexiona sobre el turismo:{"\n\n"}
          • ¿Qué tipo de turismo te interesa más y por qué?{"\n"}
          • ¿Qué destinos te gustaría visitar en España?{"\n"}
          • ¿Qué dificultades has encontrado al viajar?{"\n"}
          • ¿Cómo puedes prepararte mejor para un viaje?
        </Text>
        <Text style={styles.sectionTextAr}>
          فكر في السياحة:{"\n\n"}
          • ما نوع السياحة الذي يهمك أكثر ولماذا؟{"\n"}
          • ما الوجهات التي تود زيارتها في إسبانيا؟{"\n"}
          • ما الصعوبات التي واجهتها عند السفر؟{"\n"}
          • كيف يمكنك التحضير بشكل أفضل لرحلة؟
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
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
    color: '#ff7043',
  },
  dialogueTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#79A890',
  },
  speaker: {
    fontWeight: 'bold',
    color: '#4a90e2',
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
