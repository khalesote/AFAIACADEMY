import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Vivienda() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[1] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 1);
    }
    // Navegar directamente a la siguiente unidad (Salud)
    router.push('/B1_Umbral/clases/Salud');
  };

  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "alquiler"?',
      opciones: ['Comprar una casa', 'Pagar por vivir en una casa que no es tuya', 'Vender una casa', 'Construir una casa'],
      respuesta_correcta: 'Pagar por vivir en una casa que no es tuya'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "piso"?',
      opciones: ['Una casa individual', 'Un apartamento en un edificio', 'Una habitación', 'Un jardín'],
      respuesta_correcta: 'Un apartamento en un edificio'
    },
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de vivienda con su descripción',
      pares: [
        { izquierda: 'Piso', derecha: 'شقة في مبنى' },
        { izquierda: 'Casa', derecha: 'سكن فردي مع حديقة' },
        { izquierda: 'Estudio', derecha: 'مسكن صغير بغرفة واحدة' },
        { izquierda: 'Habitación', derecha: 'غرفة للنوم في سكن مشترك' }
      ],
      opciones: [
        'Piso', 'Casa', 'Estudio', 'Habitación',
        'شقة في مبنى', 'سكن فردي مع حديقة', 'مسكن صغير بغرفة واحدة', 'غرفة للنوم في سكن مشترك'
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "compañero de piso"?',
      opciones: ['Un vecino', 'Una persona que comparte la vivienda contigo', 'Un familiar', 'Un amigo que visita'],
      respuesta_correcta: 'Una persona que comparte la vivienda contigo'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "mudanza"?',
      opciones: ['Limpiar la casa', 'Cambiar de vivienda', 'Decorar la casa', 'Comprar muebles'],
      respuesta_correcta: 'Cambiar de vivienda'
    },
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada concepto con su definición',
      pares: [
        { izquierda: 'Fianza', derecha: 'مال يترك كضمان' },
        { izquierda: 'Contrato', derecha: 'وثيقة تحدد شروط الإيجار' },
        { izquierda: 'Barrio', derecha: 'منطقة في المدينة يعيش فيها الناس' },
        { izquierda: 'Propietario', derecha: 'مالك العقار' }
      ],
      opciones: [
        'Fianza', 'Contrato', 'Barrio', 'Propietario',
        'مال يترك كضمان', 'وثيقة تحدد شروط الإيجار', 'منطقة في المدينة يعيش فيها الناس', 'مالك العقار'
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "fianza"?',
      opciones: ['El alquiler mensual', 'Dinero que se deja como garantía', 'Los gastos de luz', 'La comida'],
      respuesta_correcta: 'Dinero que se deja como garantía'
    },
    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "propietario"?',
      opciones: ['Una persona que alquila', 'Una persona que es dueña de la vivienda', 'Un vecino', 'Un inquilino'],
      respuesta_correcta: 'Una persona que es dueña de la vivienda'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "inquilino"?',
      opciones: ['El dueño de la casa', 'Una persona que alquila una vivienda', 'Un vecino', 'Un familiar'],
      respuesta_correcta: 'Una persona que alquila una vivienda'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "hipoteca"?',
      opciones: ['Un tipo de alquiler', 'Un préstamo para comprar una casa', 'Un seguro', 'Un contrato'],
      respuesta_correcta: 'Un préstamo para comprar una casa'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "comunidad"?',
      opciones: ['Un barrio', 'Un grupo de vecinos en un edificio', 'Una ciudad', 'Un país'],
      respuesta_correcta: 'Un grupo de vecinos en un edificio'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "gastos"?',
      opciones: ['El alquiler', 'Los costos adicionales como luz y agua', 'La comida', 'Los muebles'],
      respuesta_correcta: 'Los costos adicionales como luz y agua'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "contrato"?',
      opciones: ['Un recibo', 'Un documento que establece las condiciones del alquiler', 'Una factura', 'Un anuncio'],
      respuesta_correcta: 'Un documento que establece las condiciones del alquiler'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "barrio"?',
      opciones: ['Una habitación', 'Una zona de una ciudad donde viven las personas', 'Un edificio', 'Una casa'],
      respuesta_correcta: 'Una zona de una ciudad donde viven las personas'
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es un "estudio"?',
      opciones: ['Una casa grande', 'Una vivienda pequeña de una habitación', 'Un jardín', 'Un garaje'],
      respuesta_correcta: 'Una vivienda pequeña de una habitación'
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "compra"?',
      opciones: ['Alquilar una casa', 'Comprar una vivienda para ser propietario', 'Visitar una casa', 'Limpiar una casa'],
      respuesta_correcta: 'Comprar una vivienda para ser propietario'
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "habitación"?',
      opciones: ['Una casa completa', 'Un espacio para dormir en una vivienda', 'Un jardín', 'Un garaje'],
      respuesta_correcta: 'Un espacio para dormir en una vivienda'
    },

    // Ejercicio 16: Vocabulario
    {
      tipo: 'vocabulario',
      titulo: 'أنواع المساكن',
      pares: [
        { izquierda: 'Piso', derecha: 'شقة في مبنى' },
        { izquierda: 'Casa', derecha: 'منزل منفصل مع حديقة' },
        { izquierda: 'Estudio', derecha: 'استوديو صغير' },
        { izquierda: 'Habitación', derecha: 'غرفة في سكن مشترك' }
      ],
      opciones: [
        'Piso', 'Casa', 'Estudio', 'Habitación',
        'شقة في مبنى', 'منزل منفصل مع حديقة', 'استوديو صغير', 'غرفة في سكن مشترك'
      ]
    },

    // Ejercicio 17: Vocabulario
    {
      tipo: 'vocabulario',
      titulo: 'مصطلحات الإيجار',
      pares: [
        { izquierda: 'Fianza', derecha: 'كفالة مالية' },
        { izquierda: 'Contrato', derecha: 'عقد إيجار' },
        { izquierda: 'Barrio', derecha: 'حي سكني' },
        { izquierda: 'Propietario', derecha: 'المالك' }
      ],
      opciones: [
        'Fianza', 'Contrato', 'Barrio', 'Propietario',
        'كفالة مالية', 'عقد إيجار', 'حي سكني', 'المالك'
      ]
    },

    // Ejercicio 18: Vocabulario
    {
      tipo: 'vocabulario',
      titulo: 'خصائص المساكن',
      pares: [
        { izquierda: 'Casa unifamiliar', derecha: 'منزل عائلي منفصل' },
        { izquierda: 'Ático', derecha: 'شقة علوية' },
        { izquierda: 'Loft', derecha: 'شقة علوية مفتوحة' },
        { izquierda: 'Casa adosada', derecha: 'منزل متلاصق' }
      ],
      opciones: [
        'Casa unifamiliar', 'Ático', 'Loft', 'Casa adosada',
        'منزل عائلي منفصل', 'شقة علوية', 'شقة علوية مفتوحة', 'منزل متلاصق'
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es importante al buscar una vivienda?',
      opciones: ['Solo el precio', 'La ubicación, precio y condiciones', 'Solo el tamaño', 'Solo la decoración'],
      respuesta_correcta: 'La ubicación, precio y condiciones'
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué ventaja tiene vivir con compañeros?',
      opciones: ['Es más caro', 'Es más económico y social', 'Es más solitario', 'Es más complicado'],
      respuesta_correcta: 'Es más económico y social'
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
        source={{ uri: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de vivienda y hogar"
      />
      
      <Text style={styles.title}>🏠 Vivienda y hogar</Text>
      <Text style={styles.titleAr}>🏠 السكن والمنزل</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la vivienda</Text>
        <Text style={styles.sectionText}>
          La vivienda es fundamental para la estabilidad, el bienestar personal y la 
          calidad de vida. Es más que un simple espacio físico; es nuestro hogar, 
          nuestro refugio y el lugar donde construimos nuestra vida diaria.
          {"\n\n"}
          En España, encontrar una vivienda adecuada puede ser un desafío, especialmente 
          en las grandes ciudades donde los precios son altos y la oferta es limitada. 
          Es importante conocer las opciones disponibles, los derechos como inquilino 
          y cómo buscar y elegir la vivienda que mejor se adapte a nuestras necesidades 
          y presupuesto.
          {"\n\n"}
          La vivienda también está relacionada con la integración social, el acceso 
          a servicios básicos y la estabilidad económica de las familias.
        </Text>
        <Text style={styles.sectionTextAr}>
          السكن أساسي للاستقرار والرفاهية الشخصية وجودة الحياة.
          إنه أكثر من مجرد مساحة فيزيائية؛ إنه منزلنا وملاذنا
          والمكان الذي نبني فيه حياتنا اليومية.
          {"\n\n"}
          في إسبانيا، العثور على سكن مناسب قد يكون تحدياً، خاصة
          في المدن الكبيرة حيث الأسعار مرتفعة والعرض محدود.
          من المهم معرفة الخيارات المتاحة والحقوق كمستأجر
          وكيفية البحث واختيار السكن الذي يناسب احتياجاتنا
          وميزانيتنا بشكل أفضل.
          {"\n\n"}
          السكن أيضاً مرتبط بالتكامل الاجتماعي والوصول
          للخدمات الأساسية والاستقرار الاقتصادي للأسر.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de vivienda</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏠 Tipos de vivienda:</Text>{"\n"}
          vivienda = سكن{"\n"}
          piso = شقة{"\n"}
          casa = منزل{"\n"}
          estudio = استوديو{"\n"}
          loft = لوفت{"\n"}
          ático = علية{"\n"}
          habitación = غرفة{"\n"}
          chalet = فيلا{"\n"}
          casa adosada = منزل متصل{"\n"}
          casa unifamiliar = منزل عائلي
          {"\n\n"}
          <Text style={styles.subtitle}>💰 Aspectos económicos:</Text>{"\n"}
          alquiler = إيجار{"\n"}
          compra = شراء{"\n"}
          hipoteca = رهن عقاري{"\n"}
          fianza = كفالة{"\n"}
          gastos = نفقات{"\n"}
          comunidad = مجتمع سكني{"\n"}
          propietario = مالك{"\n"}
          inquilino = مستأجر{"\n"}
          contrato = عقد{"\n"}
          recibo = إيصال
          {"\n\n"}
          <Text style={styles.subtitle}>🏘️ Ubicación y entorno:</Text>{"\n"}
          barrio = حي{"\n"}
          zona = منطقة{"\n"}
          urbanización = تجمع سكني{"\n"}
          calle = شارع{"\n"}
          plaza = ساحة{"\n"}
          edificio = مبنى{"\n"}
          portal = مدخل{"\n"}
          escalera = سلالم{"\n"}
          ascensor = مصعد{"\n"}
          garaje = مرآب
          {"\n\n"}
          <Text style={styles.subtitle}>🛠️ Servicios y comodidades:</Text>{"\n"}
          luz = كهرباء{"\n"}
          agua = ماء{"\n"}
          gas = غاز{"\n"}
          calefacción = تدفئة{"\n"}
          aire acondicionado = تكييف{"\n"}
          internet = إنترنت{"\n"}
          wifi = واي فاي{"\n"}
          ascensor = مصعد{"\n"}
          terraza = تراس{"\n"}
          jardín = حديقة
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏠 أنواع السكن:</Text>{"\n"}
          سكن = vivienda{"\n"}
          شقة = piso{"\n"}
          منزل = casa{"\n"}
          استوديو = estudio{"\n"}
          لوفت = loft{"\n"}
          علية = ático{"\n"}
          غرفة = habitación{"\n"}
          فيلا = chalet{"\n"}
          منزل متصل = casa adosada{"\n"}
          منزل عائلي = casa unifamiliar
          {"\n\n"}
          <Text style={styles.subtitle}>💰 الجوانب الاقتصادية:</Text>{"\n"}
          إيجار = alquiler{"\n"}
          شراء = compra{"\n"}
          رهن عقاري = hipoteca{"\n"}
          كفالة = fianza{"\n"}
          نفقات = gastos{"\n"}
          مجتمع سكني = comunidad{"\n"}
          مالك = propietario{"\n"}
          مستأجر = inquilino{"\n"}
          عقد = contrato{"\n"}
          إيصال = recibo
          {"\n\n"}
          <Text style={styles.subtitle}>🏘️ الموقع والبيئة:</Text>{"\n"}
          حي = barrio{"\n"}
          منطقة = zona{"\n"}
          تجمع سكني = urbanización{"\n"}
          شارع = calle{"\n"}
          ساحة = plaza{"\n"}
          مبنى = edificio{"\n"}
          مدخل = portal{"\n"}
          سلالم = escalera{"\n"}
          مصعد = ascensor{"\n"}
          مرآب = garaje
          {"\n\n"}
          <Text style={styles.subtitle}>🛠️ الخدمات والراحة:</Text>{"\n"}
          كهرباء = luz{"\n"}
          ماء = agua{"\n"}
          غاز = gas{"\n"}
          تدفئة = calefacción{"\n"}
          تكييف = aire acondicionado{"\n"}
          إنترنت = internet{"\n"}
          واي فاي = wifi{"\n"}
          مصعد = ascensor{"\n"}
          تراس = terraza{"\n"}
          حديقة = jardín
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏘️ Tipos de vivienda y características</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏠 Vivienda individual:</Text>{"\n"}
          • <Text style={styles.benefit}>Casa unifamiliar:</Text> Vivienda independiente con jardín{"\n"}
          • <Text style={styles.benefit}>Chalet:</Text> Casa de dos plantas con terreno{"\n"}
          • <Text style={styles.benefit}>Casa adosada:</Text> Casa conectada a otras casas{"\n"}
          • <Text style={styles.benefit}>Casa de campo:</Text> Vivienda rural con terreno{"\n"}
          • <Text style={styles.benefit}>Casa pareada:</Text> Dos casas unidas por una pared{"\n"}
          • <Text style={styles.benefit}>Villa:</Text> Casa de lujo con jardín y piscina
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 Vivienda colectiva:</Text>{"\n"}
          • <Text style={styles.benefit}>Piso en edificio:</Text> Apartamento en bloque residencial{"\n"}
          • <Text style={styles.benefit}>Estudio:</Text> Vivienda pequeña de una habitación{"\n"}
          • <Text style={styles.benefit}>Loft:</Text> Espacio industrial convertido en vivienda{"\n"}
          • <Text style={styles.benefit}>Ático:</Text> Apartamento en la última planta{"\n"}
          • <Text style={styles.benefit}>Dúplex:</Text> Apartamento de dos plantas{"\n"}
          • <Text style={styles.benefit}>Apartamento:</Text> Vivienda en edificio con servicios
          {"\n\n"}
          <Text style={styles.subtitle}>👥 Vivienda compartida:</Text>{"\n"}
          • <Text style={styles.benefit}>Habitación en piso compartido:</Text> Compartir vivienda con otros{"\n"}
          • <Text style={styles.benefit}>Residencia de estudiantes:</Text> Alojamiento universitario{"\n"}
          • <Text style={styles.benefit}>Coliving:</Text> Espacios de convivencia moderna{"\n"}
          • <Text style={styles.benefit}>Casa de huéspedes:</Text> Alojamiento temporal{"\n"}
          • <Text style={styles.benefit}>Pensión:</Text> Alojamiento económico con comidas{"\n"}
          • <Text style={styles.benefit}>Hostal:</Text> Alojamiento turístico económico
          {"\n\n"}
          <Text style={styles.subtitle}>🏗️ Vivienda especializada:</Text>{"\n"}
          • <Text style={styles.benefit}>Vivienda protegida:</Text> Vivienda social con ayudas{"\n"}
          • <Text style={styles.benefit}>Vivienda para mayores:</Text> Residencias y apartamentos{"\n"}
          • <Text style={styles.benefit}>Vivienda accesible:</Text> Adaptada para personas con discapacidad{"\n"}
          • <Text style={styles.benefit}>Vivienda temporal:</Text> Alojamiento de corta duración{"\n"}
          • <Text style={styles.benefit}>Vivienda de emergencia:</Text> Para situaciones urgentes{"\n"}
          • <Text style={styles.benefit}>Vivienda cooperativa:</Text> Propiedad compartida entre miembros
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏠 السكن الفردي:</Text>{"\n"}
          • <Text style={styles.benefit}>منزل عائلي:</Text> سكن مستقل مع حديقة{"\n"}
          • <Text style={styles.benefit}>فيلا:</Text> منزل من طابقين مع أرض{"\n"}
          • <Text style={styles.benefit}>منزل متصل:</Text> منزل متصل بمنازل أخرى{"\n"}
          • <Text style={styles.benefit}>منزل ريفي:</Text> سكن ريفي مع أرض{"\n"}
          • <Text style={styles.benefit}>منزل مزدوج:</Text> منزلان متصلان بجدار{"\n"}
          • <Text style={styles.benefit}>فيلا فاخرة:</Text> منزل فاخر مع حديقة ومسبح
          {"\n\n"}
          <Text style={styles.subtitle}>🏢 السكن الجماعي:</Text>{"\n"}
          • <Text style={styles.benefit}>شقة في مبنى:</Text> شقة في مجمع سكني{"\n"}
          • <Text style={styles.benefit}>استوديو:</Text> سكن صغير من غرفة واحدة{"\n"}
          • <Text style={styles.benefit}>لوفت:</Text> مساحة صناعية محولة إلى سكن{"\n"}
          • <Text style={styles.benefit}>علية:</Text> شقة في الطابق الأخير{"\n"}
          • <Text style={styles.benefit}>دوبلكس:</Text> شقة من طابقين{"\n"}
          • <Text style={styles.benefit}>شقة:</Text> سكن في مبنى مع خدمات
          {"\n\n"}
          <Text style={styles.subtitle}>👥 السكن المشترك:</Text>{"\n"}
          • <Text style={styles.benefit}>غرفة في شقة مشتركة:</Text> مشاركة السكن مع آخرين{"\n"}
          • <Text style={styles.benefit}>سكن طلابي:</Text> إقامة جامعية{"\n"}
          • <Text style={styles.benefit}>كوليفينغ:</Text> مساحات عيش مشترك حديثة{"\n"}
          • <Text style={styles.benefit}>بيت ضيوف:</Text> إقامة مؤقتة{"\n"}
          • <Text style={styles.benefit}>نزل:</Text> إقامة اقتصادية مع وجبات{"\n"}
          • <Text style={styles.benefit}>فندق صغير:</Text> إقامة سياحية اقتصادية
          {"\n\n"}
          <Text style={styles.subtitle}>🏗️ السكن المتخصص:</Text>{"\n"}
          • <Text style={styles.benefit}>سكن محمي:</Text> سكن اجتماعي مع مساعدات{"\n"}
          • <Text style={styles.benefit}>سكن للمسنين:</Text> دور رعاية وشقق{"\n"}
          • <Text style={styles.benefit}>سكن قابل للوصول:</Text> مكيف للأشخاص ذوي الإعاقة{"\n"}
          • <Text style={styles.benefit}>سكن مؤقت:</Text> إقامة قصيرة المدة{"\n"}
          • <Text style={styles.benefit}>سكن طوارئ:</Text> لحالات الطوارئ{"\n"}
          • <Text style={styles.benefit}>سكن تعاوني:</Text> ملكية مشتركة بين الأعضاء
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles para la vivienda</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏠 Hablando de vivienda:</Text>{"\n"}
          • "¿Dónde vives?" = أين تعيش؟{"\n"}
          • "¿Vives solo o con compañeros?" = هل تعيش بمفردك أم مع زملاء؟{"\n"}
          • "¿Cuánto pagas de alquiler?" = كم تدفع من إيجار؟{"\n"}
          • "¿Te gusta tu barrio?" = هل تحب حيك؟{"\n"}
          • "¿Tienes ascensor en tu edificio?" = هل لديك مصعد في مبناك؟
          {"\n\n"}
          <Text style={styles.subtitle}>💰 Aspectos económicos:</Text>{"\n"}
          • "¿Está incluida la luz en el alquiler?" = هل الكهرباء مشمولة في الإيجار؟{"\n"}
          • "¿Cuánto es la fianza?" = كم الكفالة؟{"\n"}
          • "¿Hay gastos de comunidad?" = هل هناك نفقات مجتمع؟{"\n"}
          • "¿Cuándo se paga el alquiler?" = متى يدفع الإيجار؟{"\n"}
          • "¿Aceptan mascotas?" = هل يقبلون الحيوانات الأليفة؟
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 Buscando vivienda:</Text>{"\n"}
          • "¿Tienes alguna vivienda disponible?" = هل لديك أي سكن متاح؟{"\n"}
          • "¿Puedo ver la vivienda?" = هل يمكنني رؤية السكن؟{"\n"}
          • "¿Cuántas habitaciones tiene?" = كم غرفة لديه؟{"\n"}
          • "¿Está amueblado?" = هل هو مفروش؟{"\n"}
          • "¿Hay parking disponible?" = هل هناك موقف سيارات متاح؟
          {"\n\n"}
          <Text style={styles.subtitle}>📋 Contratos y documentos:</Text>{"\n"}
          • "¿Puedo ver el contrato?" = هل يمكنني رؤية العقد؟{"\n"}
          • "¿Cuál es la duración del contrato?" = ما مدة العقد؟{"\n"}
          • "¿Puedo subarrendar?" = هل يمكنني التأجير من الباطن؟{"\n"}
          • "¿Qué documentos necesito?" = ما الوثائق التي أحتاجها؟{"\n"}
          • "¿Hay cláusula de salida?" = هل هناك بند خروج؟
          {"\n\n"}
          <Text style={styles.subtitle}>🏘️ Problemas y mantenimiento:</Text>{"\n"}
          • "Hay una fuga de agua" = هناك تسرب ماء{"\n"}
          • "No funciona la calefacción" = التدفئة لا تعمل{"\n"}
          • "Necesito una reparación" = أحتاج إصلاح{"\n"}
          • "¿Cuándo vienen a arreglarlo?" = متى يأتون لإصلاحه؟{"\n"}
          • "¿Quién paga la reparación?" = من يدفع الإصلاح؟
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏠 التحدث عن السكن:</Text>{"\n"}
          • "أين تعيش؟" = ¿Dónde vives?{"\n"}
          • "هل تعيش بمفردك أم مع زملاء؟" = ¿Vives solo o con compañeros?{"\n"}
          • "كم تدفع من إيجار؟" = ¿Cuánto pagas de alquiler?{"\n"}
          • "هل تحب حيك؟" = ¿Te gusta tu barrio?{"\n"}
          • "هل لديك مصعد في مبناك؟" = ¿Tienes ascensor en tu edificio?
          {"\n\n"}
          <Text style={styles.subtitle}>💰 الجوانب الاقتصادية:</Text>{"\n"}
          • "هل الكهرباء مشمولة في الإيجار؟" = ¿Está incluida la luz en el alquiler?{"\n"}
          • "كم الكفالة؟" = ¿Cuánto es la fianza?{"\n"}
          • "هل هناك نفقات مجتمع؟" = ¿Hay gastos de comunidad?{"\n"}
          • "متى يدفع الإيجار؟" = ¿Cuándo se paga el alquiler?{"\n"}
          • "هل يقبلون الحيوانات الأليفة؟" = ¿Aceptan mascotas?
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 البحث عن السكن:</Text>{"\n"}
          • "هل لديك أي سكن متاح؟" = ¿Tienes alguna vivienda disponible?{"\n"}
          • "هل يمكنني رؤية السكن؟" = ¿Puedo ver la vivienda?{"\n"}
          • "كم غرفة لديه؟" = ¿Cuántas habitaciones tiene?{"\n"}
          • "هل هو مفروش؟" = ¿Está amueblado?{"\n"}
          • "هل هناك موقف سيارات متاح؟" = ¿Hay parking disponible?
          {"\n\n"}
          <Text style={styles.subtitle}>📋 العقود والوثائق:</Text>{"\n"}
          • "هل يمكنني رؤية العقد؟" = ¿Puedo ver el contrato?{"\n"}
          • "ما مدة العقد؟" = ¿Cuál es la duración del contrato?{"\n"}
          • "هل يمكنني التأجير من الباطن؟" = ¿Puedo subarrendar?{"\n"}
          • "ما الوثائق التي أحتاجها؟" = ¿Qué documentos necesito?{"\n"}
          • "هل هناك بند خروج؟" = ¿Hay cláusula de salida?
          {"\n\n"}
          <Text style={styles.subtitle}>🏘️ المشاكل والصيانة:</Text>{"\n"}
          • "هناك تسرب ماء" = Hay una fuga de agua{"\n"}
          • "التدفئة لا تعمل" = No funciona la calefacción{"\n"}
          • "أحتاج إصلاح" = Necesito una reparación{"\n"}
          • "متى يأتون لإصلاحه؟" = ¿Cuándo vienen a arreglarlo?{"\n"}
          • "من يدفع الإصلاح؟" = ¿Quién paga la reparación?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Proceso completo de búsqueda de vivienda</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎯 Fase de planificación:</Text>{"\n"}
          • <Text style={styles.benefit}>Definir necesidades:</Text> Presupuesto, ubicación, tamaño, servicios{"\n"}
          • <Text style={styles.benefit}>Establecer prioridades:</Text> Qué es esencial vs. deseable{"\n"}
          • <Text style={styles.benefit}>Investigar zonas:</Text> Seguridad, transporte, servicios{"\n"}
          • <Text style={styles.benefit}>Calcular costos totales:</Text> Alquiler, gastos, fianza, mudanza{"\n"}
          • <Text style={styles.benefit}>Preparar documentación:</Text> DNI, nóminas, avales
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 Fase de búsqueda:</Text>{"\n"}
          • <Text style={styles.benefit}>Portales inmobiliarios:</Text> Idealista, Fotocasa, Habitaclia{"\n"}
          • <Text style={styles.benefit}>Agencias inmobiliarias:</Text> Profesionales especializados{"\n"}
          • <Text style={styles.benefit}>Anuncios particulares:</Text> Dueños directos{"\n"}
          • <Text style={styles.benefit}>Redes sociales:</Text> Grupos de Facebook, WhatsApp{"\n"}
          • <Text style={styles.benefit}>Boca a boca:</Text> Recomendaciones de conocidos
          {"\n\n"}
          <Text style={styles.subtitle}>👀 Fase de visita:</Text>{"\n"}
          • <Text style={styles.benefit}>Visitar en persona:</Text> Ver la vivienda y el entorno{"\n"}
          • <Text style={styles.benefit}>Hacer preguntas:</Text> Estado, servicios, vecinos{"\n"}
          • <Text style={styles.benefit}>Revisar instalaciones:</Text> Luz, agua, calefacción{"\n"}
          • <Text style={styles.benefit}>Verificar documentación:</Text> Licencia de habitabilidad{"\n"}
          • <Text style={styles.benefit}>Tomar fotos:</Text> Para recordar detalles
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 Fase de negociación:</Text>{"\n"}
          • <Text style={styles.benefit}>Negociar precio:</Text> Alquiler y condiciones{"\n"}
          • <Text style={styles.benefit}>Discutir duración:</Text> Plazo del contrato{"\n"}
          • <Text style={styles.benefit}>Acordar condiciones:</Text> Mascotas, reformas, subarriendo{"\n"}
          • <Text style={styles.benefit}>Clarificar gastos:</Text> Qué incluye el precio{"\n"}
          • <Text style={styles.benefit}>Establecer fechas:</Text> Entrada y pago de fianza
          {"\n\n"}
          <Text style={styles.subtitle}>📄 Fase de contrato:</Text>{"\n"}
          • <Text style={styles.benefit}>Leer cuidadosamente:</Text> Todas las cláusulas{"\n"}
          • <Text style={styles.benefit}>Verificar datos:</Text> Propietario, vivienda, condiciones{"\n"}
          • <Text style={styles.benefit}>Consultar dudas:</Text> Con abogado si es necesario{"\n"}
          • <Text style={styles.benefit}>Firmar contrato:</Text> Con testigos si es requerido{"\n"}
          • <Text style={styles.benefit}>Registrar contrato:</Text> En el registro correspondiente
          {"\n\n"}
          <Text style={styles.subtitle}>📦 Fase de mudanza:</Text>{"\n"}
          • <Text style={styles.benefit}>Organizar traslado:</Text> Empresa de mudanzas o amigos{"\n"}
          • <Text style={styles.benefit}>Cambiar direcciones:</Text> Correo, bancos, servicios{"\n"}
          • <Text style={styles.benefit}>Conectar servicios:</Text> Luz, agua, internet{"\n"}
          • <Text style={styles.benefit}>Decorar y organizar:</Text> Hacer el hogar acogedor{"\n"}
          • <Text style={styles.benefit}>Conocer vecinos:</Text> Integrarse en la comunidad
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎯 مرحلة التخطيط:</Text>{"\n"}
          • <Text style={styles.benefit}>تحديد الاحتياجات:</Text> الميزانية، الموقع، الحجم، الخدمات{"\n"}
          • <Text style={styles.benefit}>تحديد الأولويات:</Text> ما هو أساسي مقابل مرغوب{"\n"}
          • <Text style={styles.benefit}>البحث عن المناطق:</Text> الأمان، النقل، الخدمات{"\n"}
          • <Text style={styles.benefit}>حساب التكاليف الإجمالية:</Text> الإيجار، النفقات، الكفالة، الانتقال{"\n"}
          • <Text style={styles.benefit}>تحضير الوثائق:</Text> الهوية، الرواتب، الضمانات
          {"\n\n"}
          <Text style={styles.subtitle}>🔍 مرحلة البحث:</Text>{"\n"}
          • <Text style={styles.benefit}>المواقع العقارية:</Text> إيداليستا، فوتوكاسا، هابيتاكلية{"\n"}
          • <Text style={styles.benefit}>الوكالات العقارية:</Text> متخصصون محترفون{"\n"}
          • <Text style={styles.benefit}>إعلانات خاصة:</Text> ملاك مباشرون{"\n"}
          • <Text style={styles.benefit}>الشبكات الاجتماعية:</Text> مجموعات فيسبوك، واتساب{"\n"}
          • <Text style={styles.benefit}>التوصيات الشفهية:</Text> توصيات من معارف
          {"\n\n"}
          <Text style={styles.subtitle}>👀 مرحلة الزيارة:</Text>{"\n"}
          • <Text style={styles.benefit}>الزيارة شخصياً:</Text> رؤية السكن والبيئة{"\n"}
          • <Text style={styles.benefit}>طرح الأسئلة:</Text> الحالة، الخدمات، الجيران{"\n"}
          • <Text style={styles.benefit}>مراجعة المرافق:</Text> الكهرباء، الماء، التدفئة{"\n"}
          • <Text style={styles.benefit}>التحقق من الوثائق:</Text> رخصة السكن{"\n"}
          • <Text style={styles.benefit}>التقاط الصور:</Text> لتذكر التفاصيل
          {"\n\n"}
          <Text style={styles.subtitle}>🤝 مرحلة التفاوض:</Text>{"\n"}
          • <Text style={styles.benefit}>التفاوض على السعر:</Text> الإيجار والشروط{"\n"}
          • <Text style={styles.benefit}>مناقشة المدة:</Text> مدة العقد{"\n"}
          • <Text style={styles.benefit}>الاتفاق على الشروط:</Text> الحيوانات الأليفة، الإصلاحات، التأجير من الباطن{"\n"}
          • <Text style={styles.benefit}>توضيح النفقات:</Text> ما يشمله السعر{"\n"}
          • <Text style={styles.benefit}>تحديد التواريخ:</Text> الدخول ودفع الكفالة
          {"\n\n"}
          <Text style={styles.subtitle}>📄 مرحلة العقد:</Text>{"\n"}
          • <Text style={styles.benefit}>القراءة بعناية:</Text> جميع البنود{"\n"}
          • <Text style={styles.benefit}>التحقق من البيانات:</Text> المالك، السكن، الشروط{"\n"}
          • <Text style={styles.benefit}>استشارة الشكوك:</Text> مع محامي إذا لزم الأمر{"\n"}
          • <Text style={styles.benefit}>توقيع العقد:</Text> مع شهود إذا كان مطلوباً{"\n"}
          • <Text style={styles.benefit}>تسجيل العقد:</Text> في السجل المختص
          {"\n\n"}
          <Text style={styles.subtitle}>📦 مرحلة الانتقال:</Text>{"\n"}
          • <Text style={styles.benefit}>تنظيم النقل:</Text> شركة نقل أو أصدقاء{"\n"}
          • <Text style={styles.benefit}>تغيير العناوين:</Text> البريد، البنوك، الخدمات{"\n"}
          • <Text style={styles.benefit}>ربط الخدمات:</Text> الكهرباء، الماء، الإنترنت{"\n"}
          • <Text style={styles.benefit}>التزيين والتنظيم:</Text> جعل المنزل مريحاً{"\n"}
          • <Text style={styles.benefit}>معرفة الجيران:</Text> الاندماج في المجتمع
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Derechos y obligaciones del inquilino</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Derechos:</Text>{"\n"}
          1. <Text style={styles.tip}>Vivienda habitable:</Text> Condiciones mínimas de habitabilidad{"\n"}
          2. <Text style={styles.tip}>Privacidad:</Text> El propietario no puede entrar sin avisar{"\n"}
          3. <Text style={styles.tip}>Seguridad:</Text> Reparaciones necesarias por parte del propietario{"\n"}
          4. <Text style={styles.tip}>Estabilidad:</Text> Protección contra desahucios injustos
          {"\n\n"}
          <Text style={styles.subtitle}>Obligaciones:</Text>{"\n"}
          1. <Text style={styles.tip}>Pagar el alquiler:</Text> En fecha y forma acordada{"\n"}
          2. <Text style={styles.tip}>Cuidar la vivienda:</Text> Mantenerla en buen estado{"\n"}
          3. <Text style={styles.tip}>Comunicar problemas:</Text> Informar de averías o daños{"\n"}
          4. <Text style={styles.tip}>Respetar normas:</Text> Cumplir las reglas de la comunidad
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>الحقوق:</Text>{"\n"}
          1. <Text style={styles.tip}>سكن صالح للسكن:</Text> شروط الحد الأدنى للسكن{"\n"}
          2. <Text style={styles.tip}>الخصوصية:</Text> المالك لا يمكنه الدخول دون إشعار{"\n"}
          3. <Text style={styles.tip}>الأمان:</Text> الإصلاحات الضرورية من جانب المالك{"\n"}
          4. <Text style={styles.tip}>الاستقرار:</Text> الحماية ضد الإخلاء غير العادل
          {"\n\n"}
          <Text style={styles.subtitle}>الالتزامات:</Text>{"\n"}
          1. <Text style={styles.tip}>دفع الإيجار:</Text> في التاريخ والشكل المتفق عليه{"\n"}
          2. <Text style={styles.tip}>العناية بالسكن:</Text> الحفاظ عليه في حالة جيدة{"\n"}
          3. <Text style={styles.tip}>إبلاغ المشاكل:</Text> إخبار الأعطال أو الأضرار{"\n"}
          4. <Text style={styles.tip}>احترام القواعد:</Text> الالتزام بقواعد المجتمع
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejemplo de diálogo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.dialogueTitle}>Conversación sobre vivienda:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>María:</Text> ¿Dónde vives actualmente?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Vivo en un piso compartido con dos compañeros.{"\n"}
          <Text style={styles.speaker}>María:</Text> ¿Te gusta vivir con compañeros?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Sí, es más económico y tenemos buena relación.{"\n"}
          <Text style={styles.speaker}>María:</Text> ¿Cuánto pagas de alquiler?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Pago 400 euros al mes, incluyendo gastos.{"\n"}
          <Text style={styles.speaker}>María:</Text> ¿Qué tal es el barrio?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Es muy tranquilo y bien comunicado con el centro.
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.dialogueTitle}>محادثة حول السكن:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>ماريا:</Text> أين تعيش حالياً؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> أعيش في شقة مشتركة مع زميلين.{"\n"}
          <Text style={styles.speaker}>ماريا:</Text> هل تحب العيش مع زملاء؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> نعم، إنه أكثر اقتصاداً ولدينا علاقة جيدة.{"\n"}
          <Text style={styles.speaker}>ماريا:</Text> كم تدفع من إيجار؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> أدفع 400 يورو شهرياً، شاملة النفقات.{"\n"}
          <Text style={styles.speaker}>ماريا:</Text> كيف هو الحي؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> إنه هادئ جداً ومتصل جيداً بالمركز.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido sobre la vivienda y el hogar con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته حول السكن والمنزل مع هذه التمارين التفاعلية.</Text>
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
