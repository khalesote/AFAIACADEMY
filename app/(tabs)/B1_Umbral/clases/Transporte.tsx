import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Transporte() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[4] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 4);
    }
    // Navegar directamente a la siguiente unidad (Cultura)
    router.push('/B1_Umbral/clases/Cultura');
  };

  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es el medio de transporte más rápido en la ciudad?',
      opciones: ['El autobús', 'El metro', 'El taxi', 'La bicicleta'],
      respuesta_correcta: 'El metro'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "transporte público"?',
      opciones: ['Transporte privado', 'Transporte disponible para todos los ciudadanos', 'Transporte de mercancías', 'Transporte militar'],
      respuesta_correcta: 'Transporte disponible para todos los ciudadanos'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada medio de transporte con su característica:',
      pares: [
        { izquierda: 'Metro', derecha: 'Transporte subterráneo rápido' },
        { izquierda: 'Autobús', derecha: 'Transporte público flexible' },
        { izquierda: 'Taxi', derecha: 'Transporte privado costoso' },
        { izquierda: 'Bicicleta', derecha: 'Transporte ecológico y saludable' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "estación"?',
      opciones: ['Un coche', 'Un lugar donde paran los transportes', 'Una carretera', 'Un semáforo'],
      respuesta_correcta: 'Un lugar donde paran los transportes'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "billete"?',
      opciones: ['Un coche', 'Un documento que permite viajar', 'Una estación', 'Una parada'],
      respuesta_correcta: 'Un documento que permite viajar'
    },
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada concepto con su definición:',
      pares: [
        { izquierda: 'Horario', derecha: 'Tiempo de salida y llegada' },
        { izquierda: 'Frecuencia', derecha: 'Tiempo entre cada transporte' },
        { izquierda: 'Tarifa', derecha: 'Precio del billete' },
        { izquierda: 'Ruta', derecha: 'Camino que sigue el transporte' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es el "tráfico"?',
      opciones: ['Un tipo de coche', 'La circulación de vehículos en las calles', 'Una estación', 'Un billete'],
      respuesta_correcta: 'La circulación de vehículos en las calles'
    },
    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tarifa"?',
      opciones: ['Un horario', 'El precio del billete', 'Una ruta', 'Una estación'],
      respuesta_correcta: 'El precio del billete'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "parada"?',
      opciones: ['Un coche', 'Un lugar donde se detiene el transporte', 'Una carretera', 'Un billete'],
      respuesta_correcta: 'Un lugar donde se detiene el transporte'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "frecuencia"?',
      opciones: ['El precio', 'El tiempo entre cada transporte', 'La ruta', 'El horario'],
      respuesta_correcta: 'El tiempo entre cada transporte'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "conductor"?',
      opciones: ['Un pasajero', 'La persona que maneja el vehículo', 'Un billete', 'Una estación'],
      respuesta_correcta: 'La persona que maneja el vehículo'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "pasajero"?',
      opciones: ['Un conductor', 'Una persona que viaja en el transporte', 'Un billete', 'Una ruta'],
      respuesta_correcta: 'Una persona que viaja en el transporte'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es "carsharing"?',
      opciones: ['Comprar un coche', 'Compartir un coche con otros', 'Vender un coche', 'Alquilar un coche'],
      respuesta_correcta: 'Compartir un coche con otros'
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "hora punta"?',
      opciones: ['La hora de comer', 'Las horas de mayor tráfico', 'La hora de dormir', 'La hora de trabajar'],
      respuesta_correcta: 'Las horas de mayor tráfico'
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "abono"?',
      opciones: ['Un billete de un viaje', 'Un pase para múltiples viajes', 'Una tarjeta de crédito', 'Un documento de identidad'],
      respuesta_correcta: 'Un pase para múltiples viajes'
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "movilidad sostenible"?',
      opciones: ['Usar solo coches', 'Transporte que respeta el medio ambiente', 'Viajar siempre en avión', 'No moverse nunca'],
      respuesta_correcta: 'Transporte que respeta el medio ambiente'
    },

    // Ejercicio 16: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada concepto con su definición:',
      pares: [
        { izquierda: '⏰ Horario', derecha: 'Tiempo de salida y llegada' },
        { izquierda: '🔄 Frecuencia', derecha: 'Tiempo entre cada transporte' },
        { izquierda: '💰 Tarifa', derecha: 'Precio del billete' },
        { izquierda: '🗺️ Ruta', derecha: 'Camino que sigue el transporte' }
      ]
    },

    // Ejercicio 17: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada tipo de billete con su descripción:',
      pares: [
        { izquierda: '🎫 Billete sencillo', derecha: 'Para un solo viaje' },
        { izquierda: '📅 Abono diario', derecha: 'Viajes ilimitados por un día' },
        { izquierda: '📆 Abono mensual', derecha: 'Viajes ilimitados por un mes' },
        { izquierda: '👥 Abono familiar', derecha: 'Para varios miembros de la familia' }
      ]
    },

    // Ejercicio 18: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada ventaja del transporte público:',
      pares: [
        { izquierda: '🌱 Ecológico', derecha: 'Reduce la contaminación' },
        { izquierda: '💰 Económico', derecha: 'Más barato que el coche privado' },
        { izquierda: '⏱️ Puntual', derecha: 'Horarios fijos y regulares' },
        { izquierda: '👥 Social', derecha: 'Permite conocer gente' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es importante para usar el transporte público?',
      opciones: ['Llegar tarde', 'Conocer los horarios y rutas', 'No pagar el billete', 'Molestar a otros pasajeros'],
      respuesta_correcta: 'Conocer los horarios y rutas'
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué ventaja tiene el transporte público en España?',
      opciones: ['Es muy caro', 'Buena cobertura y frecuencia', 'Solo funciona de día', 'No hay descuentos'],
      respuesta_correcta: 'Buena cobertura y frecuencia'
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
        source={{ uri: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de transporte público"
      />
      
      <Text style={styles.title}>🚇 Transporte y movilidad</Text>
      <Text style={styles.titleAr}>🚇 النقل والتنقل</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia del transporte</Text>
        <Text style={styles.sectionText}>
          El transporte es fundamental para la movilidad en las ciudades modernas y 
          para conectar personas, lugares y oportunidades. Es un elemento esencial 
          del desarrollo urbano y la calidad de vida de los ciudadanos.
          {"\n\n"}
          Los diferentes medios de transporte ofrecen opciones para desplazarse de 
          manera eficiente, económica, segura y sostenible, adaptándose a las 
          necesidades específicas de cada persona y situación.
          {"\n\n"}
          Es esencial conocer las opciones disponibles, horarios, tarifas, rutas 
          y normativas para poder planificar nuestros desplazamientos de manera 
          óptima y contribuir a una movilidad más sostenible.
        </Text>
        <Text style={styles.sectionTextAr}>
          النقل أساسي للتنقل في المدن الحديثة
          وربط الناس والأماكن والفرص. إنه عنصر أساسي
          من التطور الحضري ونوعية حياة المواطنين.
          {"\n\n"}
          وسائل النقل المختلفة تقدم خيارات للتنقل
          بكفاءة واقتصاد وأمان واستدامة، متكيفة مع
          الاحتياجات المحددة لكل شخص وموقف.
          {"\n\n"}
          من الضروري معرفة الخيارات المتاحة والجداول الزمنية
          والرسوم والطرق واللوائح لتخطيط تنقلاتنا
          بشكل مثالي والمساهمة في تنقل أكثر استدامة.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial del transporte</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🚇 Medios de transporte:</Text>{"\n"}
          transporte = نقل{"\n"}
          metro = مترو{"\n"}
          autobús = حافلة{"\n"}
          taxi = تاكسي{"\n"}
          bicicleta = دراجة{"\n"}
          coche = سيارة{"\n"}
          moto = دراجة نارية{"\n"}
          tren = قطار
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 Lugares e infraestructura:</Text>{"\n"}
          estación = محطة{"\n"}
          parada = موقف{"\n"}
          terminal = محطة نهائية{"\n"}
          andén = رصيف{"\n"}
          vía = مسار{"\n"}
          carretera = طريق{"\n"}
          autopista = طريق سريع{"\n"}
          rotonda = دوار
          {"\n\n"}
          <Text style={styles.subtitle}>🎫 Billetes y tarifas:</Text>{"\n"}
          billete = تذكرة{"\n"}
          tarifa = رسوم{"\n"}
          abono = اشتراك{"\n"}
          descuento = خصم{"\n"}
          recarga = شحن{"\n"}
          tarjeta = بطاقة{"\n"}
          pase = تصريح{"\n"}
          multa = غرامة
          {"\n\n"}
          <Text style={styles.subtitle}>⏰ Horarios y frecuencia:</Text>{"\n"}
          horario = جدول زمني{"\n"}
          frecuencia = تكرار{"\n"}
          ruta = مسار{"\n"}
          tráfico = مرور{"\n"}
          conductor = سائق{"\n"}
          pasajero = راكب{"\n"}
          retraso = تأخير{"\n"}
          cancelación = إلغاء
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🚇 وسائل النقل:</Text>{"\n"}
          نقل = transporte{"\n"}
          مترو = metro{"\n"}
          حافلة = autobús{"\n"}
          تاكسي = taxi{"\n"}
          دراجة = bicicleta{"\n"}
          سيارة = coche{"\n"}
          دراجة نارية = moto{"\n"}
          قطار = tren
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 الأماكن والبنية التحتية:</Text>{"\n"}
          محطة = estación{"\n"}
          موقف = parada{"\n"}
          محطة نهائية = terminal{"\n"}
          رصيف = andén{"\n"}
          مسار = vía{"\n"}
          طريق = carretera{"\n"}
          طريق سريع = autopista{"\n"}
          دوار = rotonda
          {"\n\n"}
          <Text style={styles.subtitle}>🎫 التذاكر والرسوم:</Text>{"\n"}
          تذكرة = billete{"\n"}
          رسوم = tarifa{"\n"}
          اشتراك = abono{"\n"}
          خصم = descuento{"\n"}
          شحن = recarga{"\n"}
          بطاقة = tarjeta{"\n"}
          تصريح = pase{"\n"}
          غرامة = multa
          {"\n\n"}
          <Text style={styles.subtitle}>⏰ الجداول والتكرار:</Text>{"\n"}
          جدول زمني = horario{"\n"}
          تكرار = frecuencia{"\n"}
          مسار = ruta{"\n"}
          مرور = tráfico{"\n"}
          سائق = conductor{"\n"}
          راكب = pasajero{"\n"}
          تأخير = retraso{"\n"}
          إلغاء = cancelación
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚇 Medios de transporte público</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🚇 Metro:</Text>{"\n"}
          • <Text style={styles.benefit}>Transporte subterráneo:</Text> Circula bajo tierra{"\n"}
          • <Text style={styles.benefit}>Muy rápido y puntual:</Text> No se ve afectado por el tráfico{"\n"}
          • <Text style={styles.benefit}>Frecuencia alta:</Text> Pasa cada pocos minutos en hora punta{"\n"}
          • <Text style={styles.benefit}>Gran capacidad:</Text> Transporta muchas personas{"\n"}
          • <Text style={styles.benefit}>Cobertura extensa:</Text> Llega a muchas zonas de la ciudad
          {"\n\n"}
          <Text style={styles.subtitle}>🚌 Autobús:</Text>{"\n"}
          • <Text style={styles.benefit}>Transporte en superficie:</Text> Circula por las calles{"\n"}
          • <Text style={styles.benefit}>Flexibilidad de rutas:</Text> Puede cambiar itinerarios{"\n"}
          • <Text style={styles.benefit}>Económico:</Text> Precio accesible para todos{"\n"}
          • <Text style={styles.benefit}>Cobertura amplia:</Text> Llega a zonas sin metro{"\n"}
          • <Text style={styles.benefit}>Accesible:</Text> Adaptado para personas con movilidad reducida
          {"\n\n"}
          <Text style={styles.subtitle}>🚊 Tranvía:</Text>{"\n"}
          • <Text style={styles.benefit}>Transporte sobre raíles:</Text> Circula por vías fijas{"\n"}
          • <Text style={styles.benefit}>Ecológico:</Text> Contaminación mínima{"\n"}
          • <Text style={styles.benefit}>Capacidad media:</Text> Transporta más que el autobús{"\n"}
          • <Text style={styles.benefit}>Rutas fijas:</Text> Itinerarios predecibles{"\n"}
          • <Text style={styles.benefit}>Suave:</Text> Viaje cómodo y estable
          {"\n\n"}
          <Text style={styles.subtitle}>🚆 Tren de cercanías:</Text>{"\n"}
          • <Text style={styles.benefit}>Conecta ciudades:</Text> Une el centro con la periferia{"\n"}
          • <Text style={styles.benefit}>Velocidad alta:</Text> Más rápido que el metro{"\n"}
          • <Text style={styles.benefit}>Frecuencia regular:</Text> Horarios fijos{"\n"}
          • <Text style={styles.benefit}>Comodidad:</Text> Asientos cómodos y espacio{"\n"}
          • <Text style={styles.benefit}>Conexiones:</Text> Enlaza con otros transportes
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🚇 المترو:</Text>{"\n"}
          • <Text style={styles.benefit}>نقل تحت الأرض:</Text> يسير تحت الأرض{"\n"}
          • <Text style={styles.benefit}>سريع جداً ودقيق:</Text> لا يتأثر بالمرور{"\n"}
          • <Text style={styles.benefit}>تكرار عالي:</Text> يمر كل بضع دقائق في ساعات الذروة{"\n"}
          • <Text style={styles.benefit}>سعة كبيرة:</Text> ينقل الكثير من الناس{"\n"}
          • <Text style={styles.benefit}>تغطية واسعة:</Text> يصل إلى مناطق كثيرة من المدينة
          {"\n\n"}
          <Text style={styles.subtitle}>🚌 الحافلة:</Text>{"\n"}
          • <Text style={styles.benefit}>نقل على السطح:</Text> يسير في الشوارع{"\n"}
          • <Text style={styles.benefit}>مرونة في المسارات:</Text> يمكن تغيير المسارات{"\n"}
          • <Text style={styles.benefit}>اقتصادي:</Text> سعر في متناول الجميع{"\n"}
          • <Text style={styles.benefit}>تغطية واسعة:</Text> يصل إلى مناطق بدون مترو{"\n"}
          • <Text style={styles.benefit}>سهل الوصول:</Text> متكيف مع ذوي الاحتياجات الخاصة
          {"\n\n"}
          <Text style={styles.subtitle}>🚊 الترام:</Text>{"\n"}
          • <Text style={styles.benefit}>نقل على قضبان:</Text> يسير على مسارات ثابتة{"\n"}
          • <Text style={styles.benefit}>صديق للبيئة:</Text> تلوث ضئيل{"\n"}
          • <Text style={styles.benefit}>سعة متوسطة:</Text> ينقل أكثر من الحافلة{"\n"}
          • <Text style={styles.benefit}>مسارات ثابتة:</Text> مسارات متوقعة{"\n"}
          • <Text style={styles.benefit}>مريح:</Text> رحلة مريحة ومستقرة
          {"\n\n"}
          <Text style={styles.subtitle}>🚆 قطار الضواحي:</Text>{"\n"}
          • <Text style={styles.benefit}>يربط المدن:</Text> يربط المركز بالضواحي{"\n"}
          • <Text style={styles.benefit}>سرعة عالية:</Text> أسرع من المترو{"\n"}
          • <Text style={styles.benefit}>تكرار منتظم:</Text> جداول ثابتة{"\n"}
          • <Text style={styles.benefit}>راحة:</Text> مقاعد مريحة ومساحة{"\n"}
          • <Text style={styles.benefit}>اتصالات:</Text> يربط مع وسائل نقل أخرى
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚗 Transporte privado y alternativo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🚗 Coche privado:</Text>{"\n"}
          • <Text style={styles.benefit}>Flexibilidad total:</Text> Ir donde quieras cuando quieras{"\n"}
          • <Text style={styles.benefit}>Comodidad:</Text> Viaje privado y confortable{"\n"}
          • <Text style={styles.benefit}>Capacidad:</Text> Transportar personas y equipaje{"\n"}
          • <Text style={styles.tip}>Costoso:</Text> Combustible, mantenimiento, seguro{"\n"}
          • <Text style={styles.tip}>Contaminación:</Text> Impacto ambiental negativo
          {"\n\n"}
          <Text style={styles.subtitle}>🚕 Taxi:</Text>{"\n"}
          • <Text style={styles.benefit}>Servicio puerta a puerta:</Text> Te recoge y te deja donde quieras{"\n"}
          • <Text style={styles.benefit}>Disponibilidad 24h:</Text> Servicio continuo{"\n"}
          • <Text style={styles.benefit}>Conductor profesional:</Text> Experiencia y conocimiento{"\n"}
          • <Text style={styles.tip}>Costoso:</Text> Precio elevado para distancias largas{"\n"}
          • <Text style={styles.tip}>Dependencia:</Text> No siempre disponible
          {"\n\n"}
          <Text style={styles.subtitle}>🚲 Bicicleta:</Text>{"\n"}
          • <Text style={styles.benefit}>Ecológica:</Text> Cero contaminación{"\n"}
          • <Text style={styles.benefit}>Saludable:</Text> Ejercicio físico diario{"\n"}
          • <Text style={styles.benefit}>Económica:</Text> Coste mínimo de mantenimiento{"\n"}
          • <Text style={styles.tip}>Limitada por distancia:</Text> No ideal para trayectos largos{"\n"}
          • <Text style={styles.tip}>Dependiente del clima:</Text> Problemas con lluvia o calor
          {"\n\n"}
          <Text style={styles.subtitle}>🏍️ Moto:</Text>{"\n"}
          • <Text style={styles.benefit}>Ágil en el tráfico:</Text> Fácil aparcamiento y maniobrabilidad{"\n"}
          • <Text style={styles.benefit}>Económica:</Text> Menor consumo de combustible{"\n"}
          • <Text style={styles.benefit}>Rápida:</Text> Evita atascos{"\n"}
          • <Text style={styles.tip}>Menos segura:</Text> Mayor riesgo de accidentes{"\n"}
          • <Text style={styles.tip}>Expuesta al clima:</Text> Sin protección contra lluvia
          {"\n\n"}
          <Text style={styles.subtitle}>🚗 Carsharing:</Text>{"\n"}
          • <Text style={styles.benefit}>Compartir coche:</Text> Uso compartido de vehículos{"\n"}
          • <Text style={styles.benefit}>Económico:</Text> Solo pagas por el tiempo de uso{"\n"}
          • <Text style={styles.benefit}>Flexibilidad:</Text> Sin responsabilidades de propiedad{"\n"}
          • <Text style={styles.tip}>Disponibilidad limitada:</Text> No siempre hay coches disponibles{"\n"}
          • <Text style={styles.tip}>Zonas limitadas:</Text> Solo en ciertas áreas
          {"\n\n"}
          <Text style={styles.subtitle}>🚶 Caminar:</Text>{"\n"}
          • <Text style={styles.benefit}>Gratis:</Text> Sin coste alguno{"\n"}
          • <Text style={styles.benefit}>Saludable:</Text> Ejercicio cardiovascular{"\n"}
          • <Text style={styles.benefit}>Ecológico:</Text> Impacto ambiental cero{"\n"}
          • <Text style={styles.tip}>Distancia limitada:</Text> Solo para trayectos cortos{"\n"}
          • <Text style={styles.tip}>Tiempo:</Text> Puede ser lento para distancias largas
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🚗 السيارة الخاصة:</Text>{"\n"}
          • <Text style={styles.benefit}>مرونة كاملة:</Text> الذهاب حيث تريد متى تريد{"\n"}
          • <Text style={styles.benefit}>راحة:</Text> رحلة خاصة ومريحة{"\n"}
          • <Text style={styles.benefit}>سعة:</Text> نقل الناس والأمتعة{"\n"}
          • <Text style={styles.tip}>مكلفة:</Text> الوقود، الصيانة، التأمين{"\n"}
          • <Text style={styles.tip}>تلويث:</Text> تأثير بيئي سلبي
          {"\n\n"}
          <Text style={styles.subtitle}>🚕 التاكسي:</Text>{"\n"}
          • <Text style={styles.benefit}>خدمة من الباب إلى الباب:</Text> يأخذك ويتركك حيث تريد{"\n"}
          • <Text style={styles.benefit}>توفر 24 ساعة:</Text> خدمة مستمرة{"\n"}
          • <Text style={styles.benefit}>سائق محترف:</Text> خبرة ومعرفة{"\n"}
          • <Text style={styles.tip}>مكلف:</Text> سعر مرتفع للمسافات الطويلة{"\n"}
          • <Text style={styles.tip}>الاعتماد:</Text> غير متوفر دائماً
          {"\n\n"}
          <Text style={styles.subtitle}>🚲 الدراجة:</Text>{"\n"}
          • <Text style={styles.benefit}>صديقة للبيئة:</Text> تلوث صفر{"\n"}
          • <Text style={styles.benefit}>صحية:</Text> تمرين بدني يومي{"\n"}
          • <Text style={styles.benefit}>اقتصادية:</Text> تكلفة صيانة ضئيلة{"\n"}
          • <Text style={styles.tip}>محدودة بالمسافة:</Text> غير مثالية للمسافات الطويلة{"\n"}
          • <Text style={styles.tip}>تعتمد على الطقس:</Text> مشاكل مع المطر أو الحر
          {"\n\n"}
          <Text style={styles.subtitle}>🏍️ الدراجة النارية:</Text>{"\n"}
          • <Text style={styles.benefit}>رشيقة في المرور:</Text> وقوف سهل وقابلية للمناورة{"\n"}
          • <Text style={styles.benefit}>اقتصادية:</Text> استهلاك وقود أقل{"\n"}
          • <Text style={styles.benefit}>سريعة:</Text> تتجنب الاختناقات{"\n"}
          • <Text style={styles.tip}>أقل أماناً:</Text> مخاطر حوادث أكبر{"\n"}
          • <Text style={styles.tip}>معرضة للطقس:</Text> بدون حماية من المطر
          {"\n\n"}
          <Text style={styles.subtitle}>🚗 مشاركة السيارة:</Text>{"\n"}
          • <Text style={styles.benefit}>مشاركة السيارة:</Text> استخدام مشترك للمركبات{"\n"}
          • <Text style={styles.benefit}>اقتصادي:</Text> تدفع فقط لوقت الاستخدام{"\n"}
          • <Text style={styles.benefit}>مرونة:</Text> بدون مسؤوليات الملكية{"\n"}
          • <Text style={styles.tip}>توفر محدود:</Text> السيارات غير متوفرة دائماً{"\n"}
          • <Text style={styles.tip}>مناطق محدودة:</Text> فقط في مناطق معينة
          {"\n\n"}
          <Text style={styles.subtitle}>🚶 المشي:</Text>{"\n"}
          • <Text style={styles.benefit}>مجاني:</Text> بدون أي تكلفة{"\n"}
          • <Text style={styles.benefit}>صحي:</Text> تمرين قلبي وعائي{"\n"}
          • <Text style={styles.benefit}>صديق للبيئة:</Text> تأثير بيئي صفر{"\n"}
          • <Text style={styles.tip}>مسافة محدودة:</Text> فقط للمسافات القصيرة{"\n"}
          • <Text style={styles.tip}>الوقت:</Text> قد يكون بطيئاً للمسافات الطويلة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Información práctica del transporte</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⏰ Horarios y frecuencia:</Text>{"\n"}
          • <Text style={styles.tip}>Hora punta:</Text> 7:00-9:00 y 17:00-19:00 (mayor frecuencia){"\n"}
          • <Text style={styles.tip}>Hora valle:</Text> Resto del día (frecuencia normal){"\n"}
          • <Text style={styles.tip}>Servicio nocturno:</Text> Algunas líneas limitadas (24:00-6:00){"\n"}
          • <Text style={styles.tip}>Fines de semana:</Text> Horarios reducidos y menos frecuencia{"\n"}
          • <Text style={styles.tip}>Festivos:</Text> Horarios especiales, consultar antes
          {"\n\n"}
          <Text style={styles.subtitle}>💰 Tarifas y billetes:</Text>{"\n"}
          • <Text style={styles.tip}>Billete sencillo:</Text> Para un solo viaje (precio base){"\n"}
          • <Text style={styles.tip}>Abono diario:</Text> Viajes ilimitados por un día{"\n"}
          • <Text style={styles.tip}>Abono mensual:</Text> Viajes ilimitados por un mes{"\n"}
          • <Text style={styles.tip}>Abono anual:</Text> Descuento por compra anual{"\n"}
          • <Text style={styles.tip}>Descuentos:</Text> Jóvenes, mayores, estudiantes, familias numerosas
          {"\n\n"}
          <Text style={styles.subtitle}>🎫 Tipos de tarjetas:</Text>{"\n"}
          • <Text style={styles.tip}>Tarjeta personal:</Text> Con foto y datos del usuario{"\n"}
          • <Text style={styles.tip}>Tarjeta anónima:</Text> Sin datos personales{"\n"}
          • <Text style={styles.tip}>Tarjeta turística:</Text> Para visitantes temporales{"\n"}
          • <Text style={styles.tip}>Tarjeta familiar:</Text> Para varios miembros de la familia{"\n"}
          • <Text style={styles.tip}>Recarga:</Text> Añadir saldo a la tarjeta existente
          {"\n\n"}
          <Text style={styles.subtitle}>🗺️ Planificación de rutas:</Text>{"\n"}
          • <Text style={styles.tip}>Aplicaciones móviles:</Text> Google Maps, Moovit, oficiales{"\n"}
          • <Text style={styles.tip}>Páginas web:</Text> Información oficial de transportes{"\n"}
          • <Text style={styles.tip}>Información en estaciones:</Text> Mapas y horarios{"\n"}
          • <Text style={styles.tip}>Atención al cliente:</Text> Teléfonos y puntos de información{"\n"}
          • <Text style={styles.tip}>Redes sociales:</Text> Actualizaciones en tiempo real
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⏰ الجداول والتكرار:</Text>{"\n"}
          • <Text style={styles.tip}>ساعات الذروة:</Text> 7:00-9:00 و 17:00-19:00 (تكرار أكبر){"\n"}
          • <Text style={styles.tip}>الساعات العادية:</Text> باقي اليوم (تكرار عادي){"\n"}
          • <Text style={styles.tip}>الخدمة الليلية:</Text> بعض الخطوط محدودة (24:00-6:00){"\n"}
          • <Text style={styles.tip}>عطلات نهاية الأسبوع:</Text> جداول مخفضة وتكرار أقل{"\n"}
          • <Text style={styles.tip}>الأعياد:</Text> جداول خاصة، استفسر مسبقاً
          {"\n\n"}
          <Text style={styles.subtitle}>💰 الرسوم والتذاكر:</Text>{"\n"}
          • <Text style={styles.tip}>تذكرة واحدة:</Text> لرحلة واحدة (السعر الأساسي){"\n"}
          • <Text style={styles.tip}>اشتراك يومي:</Text> رحلات غير محدودة ليوم واحد{"\n"}
          • <Text style={styles.tip}>اشتراك شهري:</Text> رحلات غير محدودة لشهر واحد{"\n"}
          • <Text style={styles.tip}>اشتراك سنوي:</Text> خصم للشراء السنوي{"\n"}
          • <Text style={styles.tip}>خصومات:</Text> الشباب، كبار السن، الطلاب، العائلات الكبيرة
          {"\n\n"}
          <Text style={styles.subtitle}>🎫 أنواع البطاقات:</Text>{"\n"}
          • <Text style={styles.tip}>بطاقة شخصية:</Text> مع صورة وبيانات المستخدم{"\n"}
          • <Text style={styles.tip}>بطاقة مجهولة:</Text> بدون بيانات شخصية{"\n"}
          • <Text style={styles.tip}>بطاقة سياحية:</Text> للزوار المؤقتين{"\n"}
          • <Text style={styles.tip}>بطاقة عائلية:</Text> لعدة أعضاء من العائلة{"\n"}
          • <Text style={styles.tip}>شحن:</Text> إضافة رصيد للبطاقة الموجودة
          {"\n\n"}
          <Text style={styles.subtitle}>🗺️ تخطيط المسارات:</Text>{"\n"}
          • <Text style={styles.tip}>تطبيقات الهاتف:</Text> Google Maps، Moovit، الرسمية{"\n"}
          • <Text style={styles.tip}>مواقع الويب:</Text> معلومات رسمية للنقل{"\n"}
          • <Text style={styles.tip}>معلومات في المحطات:</Text> خرائط وجداول{"\n"}
          • <Text style={styles.tip}>خدمة العملاء:</Text> هواتف ونقاط معلومات{"\n"}
          • <Text style={styles.tip}>وسائل التواصل الاجتماعي:</Text> تحديثات في الوقت الفعلي
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles sobre transporte</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🚇 Preguntar por transporte:</Text>{"\n"}
          • "¿Cómo llego a...?" = كيف أصل إلى...؟{"\n"}
          • "¿Dónde está la parada más cercana?" = أين أقرب موقف؟{"\n"}
          • "¿Cuánto cuesta el billete?" = كم تكلفة التذكرة؟{"\n"}
          • "¿Con qué frecuencia pasa el metro?" = كم مرة يمر المترو؟{"\n"}
          • "¿Cuánto tiempo tardo en llegar?" = كم من الوقت أستغرق للوصول؟
          {"\n\n"}
          <Text style={styles.subtitle}>🎫 Comprar billetes:</Text>{"\n"}
          • "Quiero un billete para..." = أريد تذكرة لـ...{"\n"}
          • "¿Tienes abonos mensuales?" = هل لديك اشتراكات شهرية؟{"\n"}
          • "¿Hay descuentos para estudiantes?" = هل هناك خصومات للطلاب؟{"\n"}
          • "¿Puedo recargar mi tarjeta?" = هل يمكنني شحن بطاقتي؟{"\n"}
          • "¿Cuál es la tarifa más económica?" = ما هي الرسوم الأكثر اقتصاداً؟
          {"\n\n"}
          <Text style={styles.subtitle}>⏰ Horarios y rutas:</Text>{"\n"}
          • "¿A qué hora sale el próximo?" = في أي ساعة يخرج التالي؟{"\n"}
          • "¿Cuál es la mejor ruta?" = ما هو أفضل مسار؟{"\n"}
          • "¿Hay conexión con..." = هل هناك اتصال مع...{"\n"}
          • "¿Cuánto tiempo tarda?" = كم من الوقت يستغرق؟{"\n"}
          • "¿Funciona los domingos?" = هل يعمل أيام الأحد؟
          {"\n\n"}
          <Text style={styles.subtitle}>🚕 Taxi y transporte privado:</Text>{"\n"}
          • "¿Puede llevarme a...?" = هل يمكنك أخذي إلى...؟{"\n"}
          • "¿Cuánto cuesta hasta...?" = كم التكلفة حتى...؟{"\n"}
          • "¿Tiene taxímetro?" = هل لديك عداد؟{"\n"}
          • "¿Puede esperarme?" = هل يمكنك انتظاري؟{"\n"}
          • "¿Acepta tarjeta de crédito?" = هل تقبل بطاقة الائتمان؟
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🚇 السؤال عن النقل:</Text>{"\n"}
          • "كيف أصل إلى...؟" = ¿Cómo llego a...?{"\n"}
          • "أين أقرب موقف؟" = ¿Dónde está la parada más cercana?{"\n"}
          • "كم تكلفة التذكرة؟" = ¿Cuánto cuesta el billete?{"\n"}
          • "كم مرة يمر المترو؟" = ¿Con qué frecuencia pasa el metro?{"\n"}
          • "كم من الوقت أستغرق للوصول؟" = ¿Cuánto tiempo tardo en llegar?
          {"\n\n"}
          <Text style={styles.subtitle}>🎫 شراء التذاكر:</Text>{"\n"}
          • "أريد تذكرة لـ..." = Quiero un billete para...{"\n"}
          • "هل لديك اشتراكات شهرية؟" = ¿Tienes abonos mensuales?{"\n"}
          • "هل هناك خصومات للطلاب؟" = ¿Hay descuentos para estudiantes?{"\n"}
          • "هل يمكنني شحن بطاقتي؟" = ¿Puedo recargar mi tarjeta?{"\n"}
          • "ما هي الرسوم الأكثر اقتصاداً؟" = ¿Cuál es la tarifa más económica?
          {"\n\n"}
          <Text style={styles.subtitle}>⏰ الجداول والمسارات:</Text>{"\n"}
          • "في أي ساعة يخرج التالي؟" = ¿A qué hora sale el próximo?{"\n"}
          • "ما هو أفضل مسار؟" = ¿Cuál es la mejor ruta?{"\n"}
          • "هل هناك اتصال مع..." = ¿Hay conexión con...{"\n"}
          • "كم من الوقت يستغرق؟" = ¿Cuánto tiempo tarda?{"\n"}
          • "هل يعمل أيام الأحد؟" = ¿Funciona los domingos?
          {"\n\n"}
          <Text style={styles.subtitle}>🚕 التاكسي والنقل الخاص:</Text>{"\n"}
          • "هل يمكنك أخذي إلى...؟" = ¿Puede llevarme a...?{"\n"}
          • "كم التكلفة حتى...؟" = ¿Cuánto cuesta hasta...?{"\n"}
          • "هل لديك عداد؟" = ¿Tiene taxímetro?{"\n"}
          • "هل يمكنك انتظاري؟" = ¿Puede esperarme?{"\n"}
          • "هل تقبل بطاقة الائتمان؟" = ¿Acepta tarjeta de crédito?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Transporte en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🚇 Metro en ciudades principales:</Text>{"\n"}
          • <Text style={styles.benefit}>Madrid:</Text> 12 líneas, 302 estaciones, 294 km{"\n"}
          • <Text style={styles.benefit}>Barcelona:</Text> 12 líneas, 186 estaciones, 166 km{"\n"}
          • <Text style={styles.benefit}>Valencia:</Text> 9 líneas, 138 estaciones, 156 km{"\n"}
          • <Text style={styles.benefit}>Bilbao:</Text> 3 líneas, 48 estaciones, 45 km{"\n"}
          • <Text style={styles.benefit}>Sevilla:</Text> 1 línea, 22 estaciones, 18 km
          {"\n\n"}
          <Text style={styles.subtitle}>🚌 Autobuses urbanos:</Text>{"\n"}
          • <Text style={styles.benefit}>Cobertura extensa:</Text> Llegan a todos los barrios{"\n"}
          • <Text style={styles.benefit}>Frecuencia alta:</Text> Cada 5-15 minutos en hora punta{"\n"}
          • <Text style={styles.benefit}>Accesibilidad:</Text> Adaptados para personas con movilidad reducida{"\n"}
          • <Text style={styles.benefit}>Servicio nocturno:</Text> Líneas especiales por la noche{"\n"}
          • <Text style={styles.benefit}>Aire acondicionado:</Text> Comodidad en verano
          {"\n\n"}
          <Text style={styles.subtitle}>🚆 Trenes de cercanías:</Text>{"\n"}
          • <Text style={styles.benefit}>Cercanías Madrid:</Text> 9 líneas, 89 estaciones{"\n"}
          • <Text style={styles.benefit}>Rodalies Barcelona:</Text> 8 líneas, 95 estaciones{"\n"}
          • <Text style={styles.benefit}>Cercanías Valencia:</Text> 6 líneas, 66 estaciones{"\n"}
          • <Text style={styles.benefit}>Cercanías Bilbao:</Text> 3 líneas, 44 estaciones{"\n"}
          • <Text style={styles.benefit}>Cercanías Sevilla:</Text> 4 líneas, 19 estaciones
          {"\n\n"}
          <Text style={styles.subtitle}>🚊 Tranvías modernos:</Text>{"\n"}
          • <Text style={styles.benefit}>Valencia:</Text> 6 líneas, 156 paradas{"\n"}
          • <Text style={styles.benefit}>Barcelona:</Text> 6 líneas, 77 paradas{"\n"}
          • <Text style={styles.benefit}>Madrid:</Text> 3 líneas, 47 paradas{"\n"}
          • <Text style={styles.benefit}>Bilbao:</Text> 2 líneas, 28 paradas{"\n"}
          • <Text style={styles.benefit}>Vitoria:</Text> 4 líneas, 42 paradas
          {"\n\n"}
          <Text style={styles.subtitle}>🚲 Bicicletas públicas:</Text>{"\n"}
          • <Text style={styles.benefit}>BiciMAD:</Text> Madrid, 2.000 bicicletas{"\n"}
          • <Text style={styles.benefit}>Bicing:</Text> Barcelona, 6.000 bicicletas{"\n"}
          • <Text style={styles.benefit}>Valenbisi:</Text> Valencia, 2.750 bicicletas{"\n"}
          • <Text style={styles.benefit}>Sevici:</Text> Sevilla, 2.500 bicicletas{"\n"}
          • <Text style={styles.benefit}>Bilbaobizi:</Text> Bilbao, 1.000 bicicletas
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🚇 المترو في المدن الرئيسية:</Text>{"\n"}
          • <Text style={styles.benefit}>مدريد:</Text> 12 خط، 302 محطة، 294 كم{"\n"}
          • <Text style={styles.benefit}>برشلونة:</Text> 12 خط، 186 محطة، 166 كم{"\n"}
          • <Text style={styles.benefit}>فالنسيا:</Text> 9 خطوط، 138 محطة، 156 كم{"\n"}
          • <Text style={styles.benefit}>بلباو:</Text> 3 خطوط، 48 محطة، 45 كم{"\n"}
          • <Text style={styles.benefit}>إشبيلية:</Text> خط واحد، 22 محطة، 18 كم
          {"\n\n"}
          <Text style={styles.subtitle}>🚌 الحافلات الحضرية:</Text>{"\n"}
          • <Text style={styles.benefit}>تغطية واسعة:</Text> تصل إلى جميع الأحياء{"\n"}
          • <Text style={styles.benefit}>تكرار عالي:</Text> كل 5-15 دقيقة في ساعات الذروة{"\n"}
          • <Text style={styles.benefit}>سهولة الوصول:</Text> متكيفة مع ذوي الاحتياجات الخاصة{"\n"}
          • <Text style={styles.benefit}>خدمة ليلية:</Text> خطوط خاصة في الليل{"\n"}
          • <Text style={styles.benefit}>تكييف الهواء:</Text> راحة في الصيف
          {"\n\n"}
          <Text style={styles.subtitle}>🚆 قطارات الضواحي:</Text>{"\n"}
          • <Text style={styles.benefit}>سيركانياس مدريد:</Text> 9 خطوط، 89 محطة{"\n"}
          • <Text style={styles.benefit}>روداليس برشلونة:</Text> 8 خطوط، 95 محطة{"\n"}
          • <Text style={styles.benefit}>سيركانياس فالنسيا:</Text> 6 خطوط، 66 محطة{"\n"}
          • <Text style={styles.benefit}>سيركانياس بلباو:</Text> 3 خطوط، 44 محطة{"\n"}
          • <Text style={styles.benefit}>سيركانياس إشبيلية:</Text> 4 خطوط، 19 محطة
          {"\n\n"}
          <Text style={styles.subtitle}>🚊 الترام الحديث:</Text>{"\n"}
          • <Text style={styles.benefit}>فالنسيا:</Text> 6 خطوط، 156 موقف{"\n"}
          • <Text style={styles.benefit}>برشلونة:</Text> 6 خطوط، 77 موقف{"\n"}
          • <Text style={styles.benefit}>مدريد:</Text> 3 خطوط، 47 موقف{"\n"}
          • <Text style={styles.benefit}>بلباو:</Text> خطان، 28 موقف{"\n"}
          • <Text style={styles.benefit}>فيتوريا:</Text> 4 خطوط، 42 موقف
          {"\n\n"}
          <Text style={styles.subtitle}>🚲 الدراجات العامة:</Text>{"\n"}
          • <Text style={styles.benefit}>بيسي ماد:</Text> مدريد، 2000 دراجة{"\n"}
          • <Text style={styles.benefit}>بيسينغ:</Text> برشلونة، 6000 دراجة{"\n"}
          • <Text style={styles.benefit}>فالينبيسي:</Text> فالنسيا، 2750 دراجة{"\n"}
          • <Text style={styles.benefit}>سيفيسي:</Text> إشبيلية، 2500 دراجة{"\n"}
          • <Text style={styles.benefit}>بيلباوبيزي:</Text> بلباو، 1000 دراجة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 Movilidad sostenible</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌍 Beneficios ambientales:</Text>{"\n"}
          • <Text style={styles.benefit}>Reducción de emisiones:</Text> Menos CO2 y contaminación{"\n"}
          • <Text style={styles.benefit}>Ahorro energético:</Text> Menor consumo de combustibles{"\n"}
          • <Text style={styles.benefit}>Menos tráfico:</Text> Reducción de atascos{"\n"}
          • <Text style={styles.benefit}>Mejor calidad del aire:</Text> Ciudades más saludables{"\n"}
          • <Text style={styles.benefit}>Conservación de recursos:</Text> Uso eficiente de energía
          {"\n\n"}
          <Text style={styles.subtitle}>💚 Opciones sostenibles:</Text>{"\n"}
          • <Text style={styles.benefit}>Transporte público:</Text> Compartir vehículos eficientes{"\n"}
          • <Text style={styles.benefit}>Bicicleta:</Text> Cero emisiones, ejercicio saludable{"\n"}
          • <Text style={styles.benefit}>Caminar:</Text> Movimiento natural, sin coste{"\n"}
          • <Text style={styles.benefit}>Carsharing:</Text> Uso compartido de vehículos{"\n"}
          • <Text style={styles.benefit}>Vehículos eléctricos:</Text> Sin emisiones directas
          {"\n\n"}
          <Text style={styles.subtitle}>🏙️ Planificación urbana:</Text>{"\n"}
          • <Text style={styles.benefit}>Carriles bici:</Text> Infraestructura para ciclistas{"\n"}
          • <Text style={styles.benefit}>Zonas peatonales:</Text> Espacios sin coches{"\n"}
          • <Text style={styles.benefit}>Transporte público prioritario:</Text> Carriles exclusivos{"\n"}
          • <Text style={styles.benefit}>Intermodalidad:</Text> Conexión entre diferentes transportes{"\n"}
          • <Text style={styles.benefit}>Tecnología inteligente:</Text> Aplicaciones y sistemas avanzados
          {"\n\n"}
          <Text style={styles.subtitle}>👥 Beneficios sociales:</Text>{"\n"}
          • <Text style={styles.benefit}>Accesibilidad:</Text> Transporte para todos{"\n"}
          • <Text style={styles.benefit}>Equidad:</Text> Opciones económicas disponibles{"\n"}
          • <Text style={styles.benefit}>Salud pública:</Text> Menos contaminación, más ejercicio{"\n"}
          • <Text style={styles.benefit}>Comunidad:</Text> Espacios de encuentro social{"\n"}
          • <Text style={styles.benefit}>Seguridad:</Text> Menos accidentes de tráfico
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌍 الفوائد البيئية:</Text>{"\n"}
          • <Text style={styles.benefit}>تقليل الانبعاثات:</Text> أقل CO2 وتلوث{"\n"}
          • <Text style={styles.benefit}>توفير الطاقة:</Text> استهلاك أقل للوقود{"\n"}
          • <Text style={styles.benefit}>مرور أقل:</Text> تقليل الاختناقات{"\n"}
          • <Text style={styles.benefit}>جودة هواء أفضل:</Text> مدن أكثر صحة{"\n"}
          • <Text style={styles.benefit}>حفظ الموارد:</Text> استخدام فعال للطاقة
          {"\n\n"}
          <Text style={styles.subtitle}>💚 الخيارات المستدامة:</Text>{"\n"}
          • <Text style={styles.benefit}>النقل العام:</Text> مشاركة مركبات فعالة{"\n"}
          • <Text style={styles.benefit}>الدراجة:</Text> انبعاثات صفر، تمرين صحي{"\n"}
          • <Text style={styles.benefit}>المشي:</Text> حركة طبيعية، بدون تكلفة{"\n"}
          • <Text style={styles.benefit}>مشاركة السيارة:</Text> استخدام مشترك للمركبات{"\n"}
          • <Text style={styles.benefit}>المركبات الكهربائية:</Text> بدون انبعاثات مباشرة
          {"\n\n"}
          <Text style={styles.subtitle}>🏙️ التخطيط الحضري:</Text>{"\n"}
          • <Text style={styles.benefit}>مسارات الدراجات:</Text> بنية تحتية للدراجين{"\n"}
          • <Text style={styles.benefit}>المناطق المشاة:</Text> مساحات بدون سيارات{"\n"}
          • <Text style={styles.benefit}>أولوية النقل العام:</Text> مسارات حصرية{"\n"}
          • <Text style={styles.benefit}>التعددية:</Text> اتصال بين وسائل نقل مختلفة{"\n"}
          • <Text style={styles.benefit}>التكنولوجيا الذكية:</Text> تطبيقات وأنظمة متقدمة
          {"\n\n"}
          <Text style={styles.subtitle}>👥 الفوائد الاجتماعية:</Text>{"\n"}
          • <Text style={styles.benefit}>سهولة الوصول:</Text> نقل للجميع{"\n"}
          • <Text style={styles.benefit}>الإنصاف:</Text> خيارات اقتصادية متاحة{"\n"}
          • <Text style={styles.benefit}>الصحة العامة:</Text> تلوث أقل، تمرين أكثر{"\n"}
          • <Text style={styles.benefit}>المجتمع:</Text> مساحات للقاء الاجتماعي{"\n"}
          • <Text style={styles.benefit}>الأمان:</Text> حوادث مرور أقل
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
