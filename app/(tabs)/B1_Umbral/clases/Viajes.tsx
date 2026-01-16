import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Viajes() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[13] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 13);
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
      enunciado: '¿Qué necesitas para hacer una reserva de hotel?',
      opciones: ['Un billete de avión', 'Una reserva', 'Un equipaje facturado', 'Un visado'],
      respuesta_correcta: 'Una reserva'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "destino"?',
      opciones: ['Un billete', 'Un lugar al que se viaja', 'Una maleta', 'Un hotel'],
      respuesta_correcta: 'Un lugar al que se viaja'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada palabra de viajes con su definición:',
      pares: [
        { izquierda: 'Destino', derecha: 'Lugar al que se viaja' },
        { izquierda: 'Alojamiento', derecha: 'Lugar donde dormir durante el viaje' },
        { izquierda: 'Excursión', derecha: 'Visita turística organizada' },
        { izquierda: 'Guía', derecha: 'Persona que explica los lugares turísticos' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "vacaciones"?',
      opciones: ['Trabajar', 'Tiempo libre para descansar y viajar', 'Estudiar', 'Hacer deporte'],
      respuesta_correcta: 'Tiempo libre para descansar y viajar'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "excursión"?',
      opciones: ['Un viaje largo', 'Una visita turística organizada', 'Un hotel', 'Un billete'],
      respuesta_correcta: 'Una visita turística organizada'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada medio de transporte con su característica:',
      pares: [
        { izquierda: 'Avión', derecha: 'Transporte más rápido para largas distancias' },
        { izquierda: 'Tren', derecha: 'Transporte cómodo y puntual' },
        { izquierda: 'Autobús', derecha: 'Transporte económico para distancias medias' },
        { izquierda: 'Coche', derecha: 'Transporte con flexibilidad de horarios' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "itinerario"?',
      opciones: ['Un billete', 'Un plan detallado del viaje', 'Una maleta', 'Un hotel'],
      respuesta_correcta: 'Un plan detallado del viaje'
    },
    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "alojamiento"?',
      opciones: ['Un billete', 'Un lugar donde dormir', 'Una excursión', 'Un equipaje'],
      respuesta_correcta: 'Un lugar donde dormir'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "souvenir"?',
      opciones: ['Un billete', 'Un recuerdo del viaje', 'Un equipaje', 'Un hotel'],
      respuesta_correcta: 'Un recuerdo del viaje'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "equipaje"?',
      opciones: ['Un billete', 'Las maletas y objetos que llevas', 'Un hotel', 'Una excursión'],
      respuesta_correcta: 'Las maletas y objetos que llevas'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "visado"?',
      opciones: ['Un billete', 'Un permiso para entrar a un país', 'Un equipaje', 'Un hotel'],
      respuesta_correcta: 'Un permiso para entrar a un país'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "reserva"?',
      opciones: ['Un billete', 'Una reservación anticipada', 'Un equipaje', 'Una excursión'],
      respuesta_correcta: 'Una reservación anticipada'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "guía turístico"?',
      opciones: ['Un turista', 'Una persona que explica los lugares', 'Un hotel', 'Un billete'],
      respuesta_correcta: 'Una persona que explica los lugares'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "pasaporte"?',
      opciones: ['Un billete', 'Un documento de identidad para viajar', 'Un equipaje', 'Un hotel'],
      respuesta_correcta: 'Un documento de identidad para viajar'
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "seguro de viaje"?',
      opciones: ['Un billete', 'Una protección para emergencias', 'Un equipaje', 'Una excursión'],
      respuesta_correcta: 'Una protección para emergencias'
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "experiencia"?',
      opciones: ['Un billete', 'Una vivencia o acontecimiento', 'Un equipaje', 'Un hotel'],
      respuesta_correcta: 'Una vivencia o acontecimiento'
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "tour"?',
      opciones: ['Un billete', 'Una visita guiada organizada', 'Un equipaje', 'Un hotel'],
      respuesta_correcta: 'Una visita guiada organizada'
    },

    // Ejercicio 16: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada palabra de viajes con su definición:',
      pares: [
        { izquierda: '🗺️ Destino', derecha: 'Lugar al que se viaja' },
        { izquierda: '🏨 Alojamiento', derecha: 'Lugar donde dormir durante el viaje' },
        { izquierda: '🚌 Excursión', derecha: 'Visita turística organizada' },
        { izquierda: '👨‍💼 Guía', derecha: 'Persona que explica los lugares turísticos' }
      ]
    },

    // Ejercicio 17: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada medio de transporte con su característica:',
      pares: [
        { izquierda: '✈️ Avión', derecha: 'Transporte más rápido para largas distancias' },
        { izquierda: '🚆 Tren', derecha: 'Transporte cómodo y puntual' },
        { izquierda: '🚌 Autobús', derecha: 'Transporte económico para distancias medias' },
        { izquierda: '🚗 Coche', derecha: 'Transporte con flexibilidad de horarios' }
      ]
    },

    // Ejercicio 18: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada tipo de viaje con su descripción:',
      pares: [
        { izquierda: '🏖️ Vacaciones', derecha: 'Tiempo libre para descansar y viajar' },
        { izquierda: '💼 Negocios', derecha: 'Viaje por motivos de trabajo' },
        { izquierda: '🎭 Cultural', derecha: 'Viaje para conocer arte e historia' },
        { izquierda: '🏔️ Aventura', derecha: 'Viaje con actividades emocionantes' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es importante hacer antes de viajar?',
      opciones: ['Comprar souvenirs', 'Investigar sobre el destino', 'Hacer fotos', 'Comer en restaurantes'],
      respuesta_correcta: 'Investigar sobre el destino'
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué ventaja tiene viajar?',
      opciones: ['Gastar mucho dinero', 'Conocer nuevas culturas y lugares', 'Perder tiempo', 'Estar cansado'],
      respuesta_correcta: 'Conocer nuevas culturas y lugares'
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
        source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de viajes y aventuras"
      />
      
      <Text style={styles.title}>✈️ Viajes y aventuras</Text>
      <Text style={styles.titleAr}>✈️ السفر والمغامرات</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de los viajes</Text>
        <Text style={styles.sectionText}>
          Los viajes son una forma maravillosa de conocer nuevos lugares, culturas, 
          personas y experiencias que enriquecen nuestra vida personal y profesional. 
          Son una oportunidad única para expandir horizontes y crear recuerdos inolvidables.
          {"\n\n"}
          España es un país ideal para viajar, con una gran diversidad de paisajes, 
          ciudades históricas, playas hermosas, montañas impresionantes y una rica 
          cultura que combina tradición y modernidad.
          {"\n\n"}
          Planificar un viaje requiere organización, investigación y flexibilidad 
          para disfrutar de las experiencias inesperadas que hacen que cada viaje 
          sea único y memorable.
        </Text>
        <Text style={styles.sectionTextAr}>
          السفر طريقة رائعة لمعرفة أماكن وثقافات وأشخاص وتجارب جديدة
          تثري حياتنا الشخصية والمهنية. إنها فرصة فريدة لتوسيع الآفاق
          وخلق ذكريات لا تنسى.
          {"\n\n"}
          إسبانيا بلد مثالي للسفر، مع تنوع كبير في المناظر الطبيعية
          والمدن التاريخية والشواطئ الجميلة والجبال المذهلة والثقافة
          الغنية التي تجمع بين التقاليد والحداثة.
          {"\n\n"}
          تخطيط الرحلة يتطلب تنظيماً وبحثاً ومرونة للاستمتاع
          بالتجارب غير المتوقعة التي تجعل كل رحلة فريدة
          ومرتبطة بالذكريات.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de viajes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>✈️ Conceptos básicos:</Text>{"\n"}
          viaje = سفر{"\n"}
          destino = وجهة{"\n"}
          vacaciones = عطلة{"\n"}
          alojamiento = إقامة{"\n"}
          reserva = حجز{"\n"}
          itinerario = برنامج رحلة{"\n"}
          excursión = رحلة{"\n"}
          tour = جولة{"\n"}
          guía = دليل{"\n"}
          experiencia = تجربة
          {"\n\n"}
          <Text style={styles.subtitle}>🎒 Equipaje y documentos:</Text>{"\n"}
          equipaje = أمتعة{"\n"}
          maleta = حقيبة{"\n"}
          pasaporte = جواز سفر{"\n"}
          visado = تأشيرة{"\n"}
          seguro = تأمين{"\n"}
          billete = تذكرة{"\n"}
          tarjeta de embarque = بطاقة صعود{"\n"}
          documentación = وثائق{"\n"}
          carnet de identidad = بطاقة هوية{"\n"}
          permiso de conducir = رخصة قيادة
          {"\n\n"}
          <Text style={styles.subtitle}>🏨 Alojamiento y servicios:</Text>{"\n"}
          hotel = فندق{"\n"}
          hostal = نزل{"\n"}
          apartamento = شقة{"\n"}
          camping = مخيم{"\n"}
          pensión = نزل رخيص{"\n"}
          habitación = غرفة{"\n"}
          recepción = استقبال{"\n"}
          conserje = بواب{"\n"}
          limpieza = تنظيف{"\n"}
          desayuno = إفطار
          {"\n\n"}
          <Text style={styles.subtitle}>🎁 Recuerdos y actividades:</Text>{"\n"}
          souvenir = تذكار{"\n"}
          foto = صورة{"\n"}
          postal = بطاقة بريدية{"\n"}
          museo = متحف{"\n"}
          monumento = نصب تذكاري{"\n"}
          plaza = ساحة{"\n"}
          calle = شارع{"\n"}
          restaurante = مطعم{"\n"}
          tienda = متجر{"\n"}
          mercado = سوق
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>✈️ المفاهيم الأساسية:</Text>{"\n"}
          سفر = viaje{"\n"}
          وجهة = destino{"\n"}
          عطلة = vacaciones{"\n"}
          إقامة = alojamiento{"\n"}
          حجز = reserva{"\n"}
          برنامج رحلة = itinerario{"\n"}
          رحلة = excursión{"\n"}
          جولة = tour{"\n"}
          دليل = guía{"\n"}
          تجربة = experiencia
          {"\n\n"}
          <Text style={styles.subtitle}>🎒 الأمتعة والوثائق:</Text>{"\n"}
          أمتعة = equipaje{"\n"}
          حقيبة = maleta{"\n"}
          جواز سفر = pasaporte{"\n"}
          تأشيرة = visado{"\n"}
          تأمين = seguro{"\n"}
          تذكرة = billete{"\n"}
          بطاقة صعود = tarjeta de embarque{"\n"}
          وثائق = documentación{"\n"}
          بطاقة هوية = carnet de identidad{"\n"}
          رخصة قيادة = permiso de conducir
          {"\n\n"}
          <Text style={styles.subtitle}>🏨 الإقامة والخدمات:</Text>{"\n"}
          فندق = hotel{"\n"}
          نزل = hostal{"\n"}
          شقة = apartamento{"\n"}
          مخيم = camping{"\n"}
          نزل رخيص = pensión{"\n"}
          غرفة = habitación{"\n"}
          استقبال = recepción{"\n"}
          بواب = conserje{"\n"}
          تنظيف = limpieza{"\n"}
          إفطار = desayuno
          {"\n\n"}
          <Text style={styles.subtitle}>🎁 التذكارات والأنشطة:</Text>{"\n"}
          تذكار = souvenir{"\n"}
          صورة = foto{"\n"}
          بطاقة بريدية = postal{"\n"}
          متحف = museo{"\n"}
          نصب تذكاري = monumento{"\n"}
          ساحة = plaza{"\n"}
          شارع = calle{"\n"}
          مطعم = restaurante{"\n"}
          متجر = tienda{"\n"}
          سوق = mercado
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗺️ Tipos de viajes y destinos</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏖️ Viajes de placer:</Text>{"\n"}
          • <Text style={styles.benefit}>Vacaciones familiares:</Text> Tiempo de calidad con la familia{"\n"}
          • <Text style={styles.benefit}>Viajes románticos:</Text> Experiencias para parejas{"\n"}
          • <Text style={styles.benefit}>Viajes con amigos:</Text> Aventuras compartidas{"\n"}
          • <Text style={styles.benefit}>Viajes de aventura:</Text> Actividades emocionantes{"\n"}
          • <Text style={styles.benefit}>Viajes de relax:</Text> Descanso y bienestar
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Viajes de trabajo:</Text>{"\n"}
          • <Text style={styles.benefit}>Viajes de negocios:</Text> Reuniones y presentaciones{"\n"}
          • <Text style={styles.benefit}>Conferencias:</Text> Eventos profesionales{"\n"}
          • <Text style={styles.benefit}>Formación profesional:</Text> Cursos y talleres{"\n"}
          • <Text style={styles.benefit}>Reuniones de trabajo:</Text> Encuentros corporativos{"\n"}
          • <Text style={styles.benefit}>Ferias comerciales:</Text> Networking y promoción
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Viajes culturales:</Text>{"\n"}
          • <Text style={styles.benefit}>Visitas a museos:</Text> Arte e historia{"\n"}
          • <Text style={styles.benefit}>Rutas históricas:</Text> Patrimonio cultural{"\n"}
          • <Text style={styles.benefit}>Festivales culturales:</Text> Eventos tradicionales{"\n"}
          • <Text style={styles.benefit}>Gastronomía local:</Text> Sabores auténticos{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Edificios y monumentos
          {"\n\n"}
          <Text style={styles.subtitle}>🏔️ Viajes de naturaleza:</Text>{"\n"}
          • <Text style={styles.benefit}>Turismo rural:</Text> Pueblos y naturaleza{"\n"}
          • <Text style={styles.benefit}>Senderismo:</Text> Rutas de montaña{"\n"}
          • <Text style={styles.benefit}>Turismo de playa:</Text> Costa y mar{"\n"}
          • <Text style={styles.benefit}>Parques naturales:</Text> Biodiversidad{"\n"}
          • <Text style={styles.benefit}>Observación de fauna:</Text> Vida silvestre
          {"\n\n"}
          <Text style={styles.subtitle}>🏙️ Viajes urbanos:</Text>{"\n"}
          • <Text style={styles.benefit}>Turismo de ciudad:</Text> Metrópolis y cultura{"\n"}
          • <Text style={styles.benefit}>Shopping:</Text> Compras y moda{"\n"}
          • <Text style={styles.benefit}>Vida nocturna:</Text> Entretenimiento{"\n"}
          • <Text style={styles.benefit}>Gastronomía urbana:</Text> Restaurantes y cafés{"\n"}
          • <Text style={styles.benefit}>Arte contemporáneo:</Text> Galerías y exposiciones
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏖️ رحلات الترفيه:</Text>{"\n"}
          • <Text style={styles.benefit}>عطلات عائلية:</Text> وقت جودة مع العائلة{"\n"}
          • <Text style={styles.benefit}>رحلات رومانسية:</Text> تجارب للأزواج{"\n"}
          • <Text style={styles.benefit}>رحلات مع الأصدقاء:</Text> مغامرات مشتركة{"\n"}
          • <Text style={styles.benefit}>رحلات المغامرة:</Text> أنشطة مثيرة{"\n"}
          • <Text style={styles.benefit}>رحلات الاسترخاء:</Text> راحة ورفاهية
          {"\n\n"}
          <Text style={styles.subtitle}>💼 رحلات العمل:</Text>{"\n"}
          • <Text style={styles.benefit}>رحلات العمل:</Text> اجتماعات وعروض{"\n"}
          • <Text style={styles.benefit}>المؤتمرات:</Text> أحداث مهنية{"\n"}
          • <Text style={styles.benefit}>التدريب المهني:</Text> دورات وورش عمل{"\n"}
          • <Text style={styles.benefit}>اجتماعات العمل:</Text> لقاءات شركات{"\n"}
          • <Text style={styles.benefit}>المعارض التجارية:</Text> شبكات وترويج
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 الرحلات الثقافية:</Text>{"\n"}
          • <Text style={styles.benefit}>زيارات المتاحف:</Text> فن وتاريخ{"\n"}
          • <Text style={styles.benefit}>المسارات التاريخية:</Text> تراث ثقافي{"\n"}
          • <Text style={styles.benefit}>المهرجانات الثقافية:</Text> أحداث تقليدية{"\n"}
          • <Text style={styles.benefit}>المطبخ المحلي:</Text> نكهات أصيلة{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> مباني ونصب تذكارية
          {"\n\n"}
          <Text style={styles.subtitle}>🏔️ رحلات الطبيعة:</Text>{"\n"}
          • <Text style={styles.benefit}>السياحة الريفية:</Text> قرى وطبيعة{"\n"}
          • <Text style={styles.benefit}>المشي لمسافات طويلة:</Text> مسارات جبلية{"\n"}
          • <Text style={styles.benefit}>سياحة الشاطئ:</Text> ساحل وبحر{"\n"}
          • <Text style={styles.benefit}>الحدائق الطبيعية:</Text> تنوع بيولوجي{"\n"}
          • <Text style={styles.benefit}>مراقبة الحياة البرية:</Text> حياة برية
          {"\n\n"}
          <Text style={styles.subtitle}>🏙️ الرحلات الحضرية:</Text>{"\n"}
          • <Text style={styles.benefit}>سياحة المدينة:</Text> مدن وثقافة{"\n"}
          • <Text style={styles.benefit}>التسوق:</Text> مشتريات وأزياء{"\n"}
          • <Text style={styles.benefit}>الحياة الليلية:</Text> ترفيه{"\n"}
          • <Text style={styles.benefit}>المطبخ الحضري:</Text> مطاعم ومقاهي{"\n"}
          • <Text style={styles.benefit}>الفن المعاصر:</Text> معارض وعروض
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Planificación completa de viajes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🔍 Fase de investigación:</Text>{"\n"}
          • <Text style={styles.benefit}>Información del destino:</Text> Clima, cultura, costumbres{"\n"}
          • <Text style={styles.benefit}>Documentación necesaria:</Text> Pasaporte, visado, seguro{"\n"}
          • <Text style={styles.benefit}>Mejor época para viajar:</Text> Temporada alta/baja{"\n"}
          • <Text style={styles.benefit}>Vacunas requeridas:</Text> Salud y prevención{"\n"}
          • <Text style={styles.benefit}>Moneda local:</Text> Cambio y métodos de pago
          {"\n\n"}
          <Text style={styles.subtitle}>💰 Presupuesto y finanzas:</Text>{"\n"}
          • <Text style={styles.benefit}>Transporte:</Text> Billetes de avión, tren, autobús{"\n"}
          • <Text style={styles.benefit}>Alojamiento:</Text> Hotel, hostal, apartamento{"\n"}
          • <Text style={styles.benefit}>Alimentación:</Text> Restaurantes, supermercados{"\n"}
          • <Text style={styles.benefit}>Actividades:</Text> Excursiones, entradas, tours{"\n"}
          • <Text style={styles.benefit}>Gastos imprevistos:</Text> Emergencias y extras
          {"\n\n"}
          <Text style={styles.subtitle}>🏨 Reservas y alojamiento:</Text>{"\n"}
          • <Text style={styles.benefit}>Comparar opciones:</Text> Precios, ubicación, servicios{"\n"}
          • <Text style={styles.benefit}>Leer reseñas:</Text> Experiencias de otros viajeros{"\n"}
          • <Text style={styles.benefit}>Confirmar reservas:</Text> Verificar fechas y detalles{"\n"}
          • <Text style={styles.benefit}>Políticas de cancelación:</Text> Flexibilidad{"\n"}
          • <Text style={styles.benefit}>Servicios incluidos:</Text> Desayuno, wifi, parking
          {"\n\n"}
          <Text style={styles.subtitle}>🗓️ Itinerario y actividades:</Text>{"\n"}
          • <Text style={styles.benefit}>Puntos de interés:</Text> Museos, monumentos, parques{"\n"}
          • <Text style={styles.benefit}>Rutas diarias:</Text> Organización por días{"\n"}
          • <Text style={styles.benefit}>Tiempo de transporte:</Text> Distancias y duración{"\n"}
          • <Text style={styles.benefit}>Reservas anticipadas:</Text> Restaurantes, espectáculos{"\n"}
          • <Text style={styles.benefit}>Plan B:</Text> Alternativas en caso de imprevistos
          {"\n\n"}
          <Text style={styles.subtitle}>🎒 Preparación del equipaje:</Text>{"\n"}
          • <Text style={styles.benefit}>Ropa adecuada:</Text> Clima y actividades{"\n"}
          • <Text style={styles.benefit}>Documentos importantes:</Text> Copias y digitales{"\n"}
          • <Text style={styles.benefit}>Medicamentos:</Text> Botiquín básico{"\n"}
          • <Text style={styles.benefit}>Electrónicos:</Text> Cargadores y adaptadores{"\n"}
          • <Text style={styles.benefit}>Artículos personales:</Text> Cosméticos y accesorios
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🔍 مرحلة البحث:</Text>{"\n"}
          • <Text style={styles.benefit}>معلومات الوجهة:</Text> مناخ، ثقافة، عادات{"\n"}
          • <Text style={styles.benefit}>الوثائق المطلوبة:</Text> جواز سفر، تأشيرة، تأمين{"\n"}
          • <Text style={styles.benefit}>أفضل وقت للسفر:</Text> موسم عالي/منخفض{"\n"}
          • <Text style={styles.benefit}>اللقاحات المطلوبة:</Text> صحة ووقاية{"\n"}
          • <Text style={styles.benefit}>العملة المحلية:</Text> صرف وطرق دفع
          {"\n\n"}
          <Text style={styles.subtitle}>💰 الميزانية والمالية:</Text>{"\n"}
          • <Text style={styles.benefit}>النقل:</Text> تذاكر طيران، قطار، حافلة{"\n"}
          • <Text style={styles.benefit}>الإقامة:</Text> فندق، نزل، شقة{"\n"}
          • <Text style={styles.benefit}>التغذية:</Text> مطاعم، محلات سوبرماركت{"\n"}
          • <Text style={styles.benefit}>الأنشطة:</Text> رحلات، تذاكر دخول، جولات{"\n"}
          • <Text style={styles.benefit}>مصروفات غير متوقعة:</Text> طوارئ وإضافات
          {"\n\n"}
          <Text style={styles.subtitle}>🏨 الحجوزات والإقامة:</Text>{"\n"}
          • <Text style={styles.benefit}>مقارنة الخيارات:</Text> أسعار، موقع، خدمات{"\n"}
          • <Text style={styles.benefit}>قراءة المراجعات:</Text> تجارب مسافرين آخرين{"\n"}
          • <Text style={styles.benefit}>تأكيد الحجوزات:</Text> التحقق من التواريخ والتفاصيل{"\n"}
          • <Text style={styles.benefit}>سياسات الإلغاء:</Text> مرونة{"\n"}
          • <Text style={styles.benefit}>الخدمات المشمولة:</Text> إفطار، واي فاي، موقف سيارات
          {"\n\n"}
          <Text style={styles.subtitle}>🗓️ البرنامج والأنشطة:</Text>{"\n"}
          • <Text style={styles.benefit}>نقاط الاهتمام:</Text> متاحف، نصب تذكارية، حدائق{"\n"}
          • <Text style={styles.benefit}>المسارات اليومية:</Text> تنظيم حسب الأيام{"\n"}
          • <Text style={styles.benefit}>وقت النقل:</Text> مسافات ومدة{"\n"}
          • <Text style={styles.benefit}>حجوزات مسبقة:</Text> مطاعم، عروض{"\n"}
          • <Text style={styles.benefit}>خطة بديلة:</Text> بدائل في حالة الطوارئ
          {"\n\n"}
          <Text style={styles.subtitle}>🎒 تحضير الأمتعة:</Text>{"\n"}
          • <Text style={styles.benefit}>ملابس مناسبة:</Text> مناخ وأنشطة{"\n"}
          • <Text style={styles.benefit}>وثائق مهمة:</Text> نسخ ورقمية{"\n"}
          • <Text style={styles.benefit}>أدوية:</Text> صندوق إسعافات أولية{"\n"}
          • <Text style={styles.benefit}>إلكترونيات:</Text> شواحن ومحولات{"\n"}
          • <Text style={styles.benefit}>أغراض شخصية:</Text> مستحضرات تجميل وملحقات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles para viajes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏨 En el hotel:</Text>{"\n"}
          • "Tengo una reserva a nombre de..." = لدي حجز باسم...{"\n"}
          • "¿A qué hora es el desayuno?" = في أي ساعة الإفطار؟{"\n"}
          • "¿Puedo cambiar mi habitación?" = هل يمكنني تغيير غرفتي؟{"\n"}
          • "¿Hay wifi gratuito?" = هل هناك واي فاي مجاني؟{"\n"}
          • "¿Dónde está la recepción?" = أين الاستقبال؟
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ En el aeropuerto:</Text>{"\n"}
          • "¿Dónde está la puerta de embarque?" = أين بوابة الصعود؟{"\n"}
          • "¿Cuál es el número de mi vuelo?" = ما رقم رحلتي؟{"\n"}
          • "¿Dónde facturo mi equipaje?" = أين أودع أمتعتي؟{"\n"}
          • "¿Cuánto tiempo de retraso?" = كم من الوقت تأخير؟{"\n"}
          • "¿Dónde puedo cambiar dinero?" = أين يمكنني صرف المال؟
          {"\n\n"}
          <Text style={styles.subtitle}>🗺️ Preguntando direcciones:</Text>{"\n"}
          • "¿Cómo llego a...?" = كيف أصل إلى...؟{"\n"}
          • "¿Está lejos de aquí?" = هل بعيد من هنا؟{"\n"}
          • "¿Puede mostrarme en el mapa?" = هل يمكنك إظهاره على الخريطة؟{"\n"}
          • "¿Cuánto tiempo tardo en llegar?" = كم من الوقت أستغرق للوصول؟{"\n"}
          • "¿Hay transporte público?" = هل هناك نقل عام؟
          {"\n\n"}
          <Text style={styles.subtitle}>🍽️ En restaurantes:</Text>{"\n"}
          • "¿Tiene menú en inglés?" = هل لديك قائمة باللغة الإنجليزية؟{"\n"}
          • "¿Qué recomienda?" = ماذا تنصح؟{"\n"}
          • "¿Tiene opciones vegetarianas?" = هل لديك خيارات نباتية؟{"\n"}
          • "¿Puede traer la cuenta?" = هل يمكنك إحضار الحساب؟{"\n"}
          • "¿Acepta tarjeta de crédito?" = هل تقبل بطاقة الائتمان؟
          {"\n\n"}
          <Text style={styles.subtitle}>🛍️ Compras y souvenirs:</Text>{"\n"}
          • "¿Cuánto cuesta?" = كم التكلفة؟{"\n"}
          • "¿Puede hacer un descuento?" = هل يمكنك عمل خصم؟{"\n"}
          • "¿Tiene esto en otro color?" = هل لديك هذا بلون آخر؟{"\n"}
          • "¿Es hecho a mano?" = هل مصنوع يدوياً؟{"\n"}
          • "¿Puede envolverlo como regalo?" = هل يمكنك تغليفه كهدية؟
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏨 في الفندق:</Text>{"\n"}
          • "لدي حجز باسم..." = Tengo una reserva a nombre de...{"\n"}
          • "في أي ساعة الإفطار؟" = ¿A qué hora es el desayuno?{"\n"}
          • "هل يمكنني تغيير غرفتي؟" = ¿Puedo cambiar mi habitación?{"\n"}
          • "هل هناك واي فاي مجاني؟" = ¿Hay wifi gratuito?{"\n"}
          • "أين الاستقبال؟" = ¿Dónde está la recepción?
          {"\n\n"}
          <Text style={styles.subtitle}>✈️ في المطار:</Text>{"\n"}
          • "أين بوابة الصعود؟" = ¿Dónde está la puerta de embarque?{"\n"}
          • "ما رقم رحلتي؟" = ¿Cuál es el número de mi vuelo?{"\n"}
          • "أين أودع أمتعتي؟" = ¿Dónde facturo mi equipaje?{"\n"}
          • "كم من الوقت تأخير؟" = ¿Cuánto tiempo de retraso?{"\n"}
          • "أين يمكنني صرف المال؟" = ¿Dónde puedo cambiar dinero?
          {"\n\n"}
          <Text style={styles.subtitle}>🗺️ السؤال عن الاتجاهات:</Text>{"\n"}
          • "كيف أصل إلى...؟" = ¿Cómo llego a...?{"\n"}
          • "هل بعيد من هنا؟" = ¿Está lejos de aquí?{"\n"}
          • "هل يمكنك إظهاره على الخريطة؟" = ¿Puede mostrarme en el mapa?{"\n"}
          • "كم من الوقت أستغرق للوصول؟" = ¿Cuánto tiempo tardo en llegar?{"\n"}
          • "هل هناك نقل عام؟" = ¿Hay transporte público?
          {"\n\n"}
          <Text style={styles.subtitle}>🍽️ في المطاعم:</Text>{"\n"}
          • "هل لديك قائمة باللغة الإنجليزية؟" = ¿Tiene menú en inglés?{"\n"}
          • "ماذا تنصح؟" = ¿Qué recomienda?{"\n"}
          • "هل لديك خيارات نباتية؟" = ¿Tiene opciones vegetarianas?{"\n"}
          • "هل يمكنك إحضار الحساب؟" = ¿Puede traer la cuenta?{"\n"}
          • "هل تقبل بطاقة الائتمان؟" = ¿Acepta tarjeta de crédito?
          {"\n\n"}
          <Text style={styles.subtitle}>🛍️ المشتريات والتذكارات:</Text>{"\n"}
          • "كم التكلفة؟" = ¿Cuánto cuesta?{"\n"}
          • "هل يمكنك عمل خصم؟" = ¿Puede hacer un descuento?{"\n"}
          • "هل لديك هذا بلون آخر؟" = ¿Tiene esto en otro color?{"\n"}
          • "هل مصنوع يدوياً؟" = ¿Es hecho a mano?{"\n"}
          • "هل يمكنك تغليفه كهدية؟" = ¿Puede envolverlo como regalo?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Destinos turísticos en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏛️ Ciudades históricas:</Text>{"\n"}
          • <Text style={styles.benefit}>Madrid:</Text> Capital, museos, vida nocturna{"\n"}
          • <Text style={styles.benefit}>Barcelona:</Text> Arquitectura de Gaudí, playas{"\n"}
          • <Text style={styles.benefit}>Sevilla:</Text> Flamenco, Semana Santa, Alcázar{"\n"}
          • <Text style={styles.benefit}>Granada:</Text> Alhambra, barrio del Albaicín{"\n"}
          • <Text style={styles.benefit}>Toledo:</Text> Ciudad medieval, sinagogas{"\n"}
          • <Text style={styles.benefit}>Salamanca:</Text> Universidad histórica, Plaza Mayor
          {"\n\n"}
          <Text style={styles.subtitle}>🏖️ Costa y playas:</Text>{"\n"}
          • <Text style={styles.benefit}>Costa del Sol:</Text> Málaga, Marbella, Benalmádena{"\n"}
          • <Text style={styles.benefit}>Costa Brava:</Text> Girona, Cadaqués, Tossa de Mar{"\n"}
          • <Text style={styles.benefit}>Islas Baleares:</Text> Mallorca, Menorca, Ibiza{"\n"}
          • <Text style={styles.benefit}>Islas Canarias:</Text> Tenerife, Gran Canaria, Lanzarote{"\n"}
          • <Text style={styles.benefit}>Costa Blanca:</Text> Alicante, Benidorm, Torrevieja{"\n"}
          • <Text style={styles.benefit}>Galicia:</Text> Santiago de Compostela, Rías Baixas
          {"\n\n"}
          <Text style={styles.subtitle}>🏔️ Montaña y naturaleza:</Text>{"\n"}
          • <Text style={styles.benefit}>Pirineos:</Text> Esquí, senderismo, pueblos pirenaicos{"\n"}
          • <Text style={styles.benefit}>Picos de Europa:</Text> Montañas, lagos, rutas{"\n"}
          • <Text style={styles.benefit}>Sierra Nevada:</Text> Esquí, Granada, Alpujarras{"\n"}
          • <Text style={styles.benefit}>Parque Nacional de Doñana:</Text> Naturaleza, aves{"\n"}
          • <Text style={styles.benefit}>Camino de Santiago:</Text> Peregrinación, cultura{"\n"}
          • <Text style={styles.benefit}>Ruta del Císter:</Text> Monasterios medievales
          {"\n\n"}
          <Text style={styles.subtitle}>🍷 Rutas gastronómicas:</Text>{"\n"}
          • <Text style={styles.benefit}>Ruta del Vino:</Text> Rioja, Ribera del Duero{"\n"}
          • <Text style={styles.benefit}>Ruta del Jamón:</Text> Jabugo, Guijuelo{"\n"}
          • <Text style={styles.benefit}>Ruta del Queso:</Text> Manchego, Cabrales{"\n"}
          • <Text style={styles.benefit}>Ruta del Aceite:</Text> Jaén, Córdoba{"\n"}
          • <Text style={styles.benefit}>Ruta del Marisco:</Text> Galicia, Huelva{"\n"}
          • <Text style={styles.benefit}>Ruta de la Tapa:</Text> País Vasco, Andalucía
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Festivales y eventos:</Text>{"\n"}
          • <Text style={styles.benefit}>San Fermín:</Text> Pamplona, encierros{"\n"}
          • <Text style={styles.benefit}>Fallas:</Text> Valencia, fuegos artificiales{"\n"}
          • <Text style={styles.benefit}>Semana Santa:</Text> Sevilla, procesiones{"\n"}
          • <Text style={styles.benefit}>Feria de Abril:</Text> Sevilla, flamenco{"\n"}
          • <Text style={styles.benefit}>Tomatina:</Text> Buñol, batalla de tomates{"\n"}
          • <Text style={styles.benefit}>Carnaval:</Text> Cádiz, Tenerife, disfraces
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏛️ المدن التاريخية:</Text>{"\n"}
          • <Text style={styles.benefit}>مدريد:</Text> العاصمة، متاحف، حياة ليلية{"\n"}
          • <Text style={styles.benefit}>برشلونة:</Text> عمارة غاودي، شواطئ{"\n"}
          • <Text style={styles.benefit}>إشبيلية:</Text> فلامنكو، أسبوع الآلام، القصر{"\n"}
          • <Text style={styles.benefit}>غرناطة:</Text> الحمراء، حي البيازين{"\n"}
          • <Text style={styles.benefit}>طليطلة:</Text> مدينة القرون الوسطى، كنائس يهودية{"\n"}
          • <Text style={styles.benefit}>سلامنكا:</Text> جامعة تاريخية، الساحة الكبرى
          {"\n\n"}
          <Text style={styles.subtitle}>🏖️ الساحل والشواطئ:</Text>{"\n"}
          • <Text style={styles.benefit}>كوستا ديل سول:</Text> مالقة، ماربيا، بينالمادينا{"\n"}
          • <Text style={styles.benefit}>كوستا برافا:</Text> جيرونا، كاداكيس، توسا دي مار{"\n"}
          • <Text style={styles.benefit}>جزر البليار:</Text> مايوركا، مينوركا، إيبيزا{"\n"}
          • <Text style={styles.benefit}>جزر الكناري:</Text> تنريف، غران كناريا، لانزاروت{"\n"}
          • <Text style={styles.benefit}>كوستا بلانكا:</Text> أليكانتي، بينيدورم، توريفيجا{"\n"}
          • <Text style={styles.benefit}>غاليسيا:</Text> سانتياغو دي كومبوستيلا، رياز باخاس
          {"\n\n"}
          <Text style={styles.subtitle}>🏔️ الجبال والطبيعة:</Text>{"\n"}
          • <Text style={styles.benefit}>البرانس:</Text> تزلج، مشي لمسافات طويلة، قرى برانسية{"\n"}
          • <Text style={styles.benefit}>بيكوس دي أوروبا:</Text> جبال، بحيرات، مسارات{"\n"}
          • <Text style={styles.benefit}>سييرا نيفادا:</Text> تزلج، غرناطة، الألبوخاراس{"\n"}
          • <Text style={styles.benefit}>حديقة دونيانا الوطنية:</Text> طبيعة، طيور{"\n"}
          • <Text style={styles.benefit}>طريق سانتياغو:</Text> حج، ثقافة{"\n"}
          • <Text style={styles.benefit}>طريق السيسترسي:</Text> أديرة القرون الوسطى
          {"\n\n"}
          <Text style={styles.subtitle}>🍷 مسارات الطعام:</Text>{"\n"}
          • <Text style={styles.benefit}>مسار النبيذ:</Text> ريوجا، ريبرا ديل دويرو{"\n"}
          • <Text style={styles.benefit}>مسار الخنزير:</Text> خابوغو، غيخويلو{"\n"}
          • <Text style={styles.benefit}>مسار الجبن:</Text> مانشغو، كابراليس{"\n"}
          • <Text style={styles.benefit}>مسار الزيتون:</Text> خاين، قرطبة{"\n"}
          • <Text style={styles.benefit}>مسار المأكولات البحرية:</Text> غاليسيا، ولبة{"\n"}
          • <Text style={styles.benefit}>مسار التاباس:</Text> إقليم الباسك، أندلسية
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 المهرجانات والأحداث:</Text>{"\n"}
          • <Text style={styles.benefit}>سان فيرمين:</Text> بامبلونا، سباقات الثيران{"\n"}
          • <Text style={styles.benefit}>فالاس:</Text> فالنسيا، ألعاب نارية{"\n"}
          • <Text style={styles.benefit}>أسبوع الآلام:</Text> إشبيلية، مواكب{"\n"}
          • <Text style={styles.benefit}>معرض أبريل:</Text> إشبيلية، فلامنكو{"\n"}
          • <Text style={styles.benefit}>توماتينا:</Text> بونيول، معركة الطماطم{"\n"}
          • <Text style={styles.benefit}>كرنفال:</Text> قادس، تنريف، أزياء تنكرية
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
