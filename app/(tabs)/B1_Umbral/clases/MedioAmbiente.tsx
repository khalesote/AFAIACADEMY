import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function MedioAmbiente() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[7] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 7);
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
    // Ejercicio 1: Vocabulario - Relacionar problemas ambientales con soluciones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada problema ambiental con su solución',
      pares: [
        { izquierda: '🗑️ Basura', derecha: 'Reciclaje y reducción de residuos' },
        { izquierda: '🚗 Contaminación del aire', derecha: 'Transporte público y vehículos eléctricos' },
        { izquierda: '💧 Desperdicio de agua', derecha: 'Ahorro y reutilización del agua' },
        { izquierda: '🌲 Deforestación', derecha: 'Reforestación y protección de bosques' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "medio ambiente"?',
      opciones: ['Solo el aire', 'El entorno natural que nos rodea', 'Solo el agua', 'Solo los árboles'],
      respuestaCorrecta: 1
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es el "reciclaje"?',
      opciones: ['Solo tirar basura', 'Procesar materiales para reutilizarlos', 'Solo comprar', 'Solo vender'],
      respuestaCorrecta: 1
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "contaminación"?',
      opciones: ['Limpieza', 'Deterioro del medio ambiente por sustancias nocivas', 'Mejora', 'Protección'],
      respuestaCorrecta: 1
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué son las "energías renovables"?',
      opciones: ['Solo petróleo', 'Energías que se regeneran naturalmente', 'Solo carbón', 'Solo gas'],
      respuestaCorrecta: 1
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "sostenible"?',
      opciones: ['Que no dura', 'Que puede mantenerse sin agotar recursos', 'Que contamina', 'Que es caro'],
      respuestaCorrecta: 1
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "biodiversidad"?',
      opciones: ['Solo plantas', 'Variedad de vida en la Tierra', 'Solo animales', 'Solo humanos'],
      respuestaCorrecta: 1
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "ahorrar energía"?',
      opciones: ['Gastar más', 'Reducir el consumo de energía', 'Contaminar más', 'Desperdiciar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es el "cambio climático"?',
      opciones: ['Solo calor', 'Alteración del clima global', 'Solo frío', 'Solo lluvia'],
      respuestaCorrecta: 1
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "ecológico"?',
      opciones: ['Que contamina', 'Que respeta el medio ambiente', 'Que es caro', 'Que es feo'],
      respuestaCorrecta: 1
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "deforestación"?',
      opciones: ['Plantar árboles', 'Destrucción de bosques', 'Cuidar plantas', 'Regar jardines'],
      respuestaCorrecta: 1
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "reutilizar"?',
      opciones: ['Tirar', 'Usar algo de nuevo', 'Comprar', 'Vender'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "huella de carbono"?',
      opciones: ['Una marca en el suelo', 'Impacto ambiental de nuestras actividades', 'Un tipo de contaminación', 'Un tipo de energía'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "proteger" el medio ambiente?',
      opciones: ['Destruirlo', 'Cuidarlo y preservarlo', 'Contaminarlo', 'Ignorarlo'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué son los "residuos"?',
      opciones: ['Comida', 'Materiales que ya no se usan', 'Agua', 'Aire'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Tipos de energía
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de energía con su característica',
      pares: [
        { izquierda: '☀️ Energía solar', derecha: 'Energía del sol' },
        { izquierda: '💨 Energía eólica', derecha: 'Energía del viento' },
        { izquierda: '💧 Energía hidráulica', derecha: 'Energía del agua' },
        { izquierda: '🌱 Energía biomasa', derecha: 'Energía de materia orgánica' }
      ]
    },

    // Ejercicio 17: Vocabulario - Acciones ambientales
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada acción con su beneficio ambiental',
      pares: [
        { izquierda: '🚶‍♂️ Caminar', derecha: 'Reduce contaminación del aire' },
        { izquierda: '💡 Apagar luces', derecha: 'Ahorra energía' },
        { izquierda: '🚰 Cerrar grifos', derecha: 'Ahorra agua' },
        { izquierda: '♻️ Reciclar', derecha: 'Reduce residuos' }
      ]
    },

    // Ejercicio 18: Vocabulario - Reciclaje
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada material con su contenedor de reciclaje',
      pares: [
        { izquierda: '📰 Papel', derecha: 'Contenedor azul' },
        { izquierda: '🥤 Plástico', derecha: 'Contenedor amarillo' },
        { izquierda: '🍎 Orgánico', derecha: 'Contenedor marrón' },
        { izquierda: '🥫 Vidrio', derecha: 'Contenedor verde' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "desarrollo sostenible"?',
      opciones: ['Solo crecimiento económico', 'Desarrollo que satisface necesidades sin comprometer el futuro', 'Solo contaminación', 'Solo deforestación'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es importante para cuidar el medio ambiente?',
      opciones: ['Solo reciclar', 'Acciones diarias de todos (reciclar, ahorrar, reutilizar)', 'Solo contaminar', 'Solo ignorar'],
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
        source={{ uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de medio ambiente y ecología"
      />
      
      <Text style={styles.title}>🌍 Medio ambiente y ecología</Text>
      <Text style={styles.titleAr}>🌍 البيئة والإيكولوجيا</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 Importancia del medio ambiente</Text>
        <Text style={styles.sectionText}>
          El medio ambiente es el conjunto de elementos naturales y artificiales que nos rodean 
          y que son esenciales para la vida en la Tierra. Incluye el aire que respiramos, 
          el agua que bebemos, la tierra donde crecen nuestros alimentos y todos los seres vivos.
          {"\n\n"}
          Cuidar el medio ambiente es fundamental para garantizar un futuro sostenible 
          para las próximas generaciones y mantener el equilibrio ecológico del planeta.
        </Text>
        <Text style={styles.sectionTextAr}>
          البيئة هي مجموعة العناصر الطبيعية والاصطناعية التي تحيط بنا
          وهي ضرورية للحياة على الأرض. تشمل الهواء الذي نتنفسه،
          والماء الذي نشربه، والأرض التي تنمو عليها طعامنا وجميع الكائنات الحية.
          {"\n\n"}
          رعاية البيئة أمر أساسي لضمان مستقبل مستدام
          للأجيال القادمة والحفاظ على التوازن البيئي للكوكب.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Principales problemas ambientales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌫️ Contaminación del aire:</Text>{"\n"}
          • <Text style={styles.benefit}>Causas:</Text> Emisiones de vehículos, industrias, quema de combustibles{"\n"}
          • <Text style={styles.benefit}>Efectos:</Text> Problemas respiratorios, cambio climático{"\n"}
          • <Text style={styles.benefit}>Soluciones:</Text> Transporte público, energías limpias, filtros
          {"\n\n"}
          <Text style={styles.subtitle}>💧 Contaminación del agua:</Text>{"\n"}
          • <Text style={styles.benefit}>Causas:</Text> Vertidos industriales, residuos domésticos, pesticidas{"\n"}
          • <Text style={styles.benefit}>Efectos:</Text> Enfermedades, muerte de especies acuáticas{"\n"}
          • <Text style={styles.benefit}>Soluciones:</Text> Tratamiento de aguas, reducción de vertidos
          {"\n\n"}
          <Text style={styles.subtitle}>🗑️ Residuos y basura:</Text>{"\n"}
          • <Text style={styles.benefit}>Causas:</Text> Consumo excesivo, productos no reciclables{"\n"}
          • <Text style={styles.benefit}>Efectos:</Text> Contaminación del suelo y agua, problemas de salud{"\n"}
          • <Text style={styles.benefit}>Soluciones:</Text> Reducir, reutilizar, reciclar
          {"\n\n"}
          <Text style={styles.subtitle}>🌲 Deforestación:</Text>{"\n"}
          • <Text style={styles.benefit}>Causas:</Text> Agricultura, urbanización, tala ilegal{"\n"}
          • <Text style={styles.benefit}>Efectos:</Text> Pérdida de biodiversidad, cambio climático{"\n"}
          • <Text style={styles.benefit}>Soluciones:</Text> Reforestación, protección de bosques
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌫️ تلوث الهواء:</Text>{"\n"}
          • <Text style={styles.benefit}>الأسباب:</Text> انبعاثات المركبات، الصناعات، حرق الوقود{"\n"}
          • <Text style={styles.benefit}>الآثار:</Text> مشاكل تنفسية، تغير المناخ{"\n"}
          • <Text style={styles.benefit}>الحلول:</Text> النقل العام، طاقة نظيفة، فلاتر
          {"\n\n"}
          <Text style={styles.subtitle}>💧 تلوث الماء:</Text>{"\n"}
          • <Text style={styles.benefit}>الأسباب:</Text> تصريفات صناعية، نفايات منزلية، مبيدات{"\n"}
          • <Text style={styles.benefit}>الآثار:</Text> أمراض، موت الكائنات المائية{"\n"}
          • <Text style={styles.benefit}>الحلول:</Text> معالجة المياه، تقليل التصريفات
          {"\n\n"}
          <Text style={styles.subtitle}>🗑️ النفايات والقمامة:</Text>{"\n"}
          • <Text style={styles.benefit}>الأسباب:</Text> استهلاك مفرط، منتجات غير قابلة للتدوير{"\n"}
          • <Text style={styles.benefit}>الآثار:</Text> تلوث التربة والماء، مشاكل صحية{"\n"}
          • <Text style={styles.benefit}>الحلول:</Text> تقليل، إعادة استخدام، إعادة تدوير
          {"\n\n"}
          <Text style={styles.subtitle}>🌲 إزالة الغابات:</Text>{"\n"}
          • <Text style={styles.benefit}>الأسباب:</Text> الزراعة، التحضر، قطع غير قانوني{"\n"}
          • <Text style={styles.benefit}>الآثار:</Text> فقدان التنوع البيولوجي، تغير المناخ{"\n"}
          • <Text style={styles.benefit}>الحلول:</Text> إعادة التشجير، حماية الغابات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>♻️ Soluciones ambientales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>♻️ Las 3 R del reciclaje:</Text>{"\n"}
          • <Text style={styles.benefit}>Reducir:</Text> Disminuir el consumo de productos{"\n"}
          • <Text style={styles.benefit}>Reutilizar:</Text> Usar productos varias veces{"\n"}
          • <Text style={styles.benefit}>Reciclar:</Text> Procesar materiales para nuevos usos
          {"\n\n"}
          <Text style={styles.subtitle}>☀️ Energías renovables:</Text>{"\n"}
          • <Text style={styles.benefit}>Energía solar:</Text> Paneles que captan la luz del sol{"\n"}
          • <Text style={styles.benefit}>Energía eólica:</Text> Molinos que aprovechan el viento{"\n"}
          • <Text style={styles.benefit}>Energía hidráulica:</Text> Centrales que usan el agua{"\n"}
          • <Text style={styles.benefit}>Energía geotérmica:</Text> Calor del interior de la Tierra
          {"\n\n"}
          <Text style={styles.subtitle}>🚶‍♂️ Transporte sostenible:</Text>{"\n"}
          • <Text style={styles.benefit}>Transporte público:</Text> Autobuses, metro, tren{"\n"}
          • <Text style={styles.benefit}>Vehículos eléctricos:</Text> Coches que no contaminan{"\n"}
          • <Text style={styles.benefit}>Bicicletas:</Text> Transporte saludable y ecológico{"\n"}
          • <Text style={styles.benefit}>Caminar:</Text> Opción más natural y saludable
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>♻️ الـ 3 R لإعادة التدوير:</Text>{"\n"}
          • <Text style={styles.benefit}>تقليل:</Text> تقليل استهلاك المنتجات{"\n"}
          • <Text style={styles.benefit}>إعادة استخدام:</Text> استخدام المنتجات عدة مرات{"\n"}
          • <Text style={styles.benefit}>إعادة تدوير:</Text> معالجة المواد لاستخدامات جديدة
          {"\n\n"}
          <Text style={styles.subtitle}>☀️ الطاقة المتجددة:</Text>{"\n"}
          • <Text style={styles.benefit}>الطاقة الشمسية:</Text> ألواح تلتقط ضوء الشمس{"\n"}
          • <Text style={styles.benefit}>الطاقة الريحية:</Text> طواحين تستفيد من الريح{"\n"}
          • <Text style={styles.benefit}>الطاقة المائية:</Text> محطات تستخدم الماء{"\n"}
          • <Text style={styles.benefit}>الطاقة الحرارية الأرضية:</Text> حرارة من باطن الأرض
          {"\n\n"}
          <Text style={styles.subtitle}>🚶‍♂️ النقل المستدام:</Text>{"\n"}
          • <Text style={styles.benefit}>النقل العام:</Text> حافلات، مترو، قطار{"\n"}
          • <Text style={styles.benefit}>المركبات الكهربائية:</Text> سيارات لا تلوث{"\n"}
          • <Text style={styles.benefit}>الدراجات:</Text> نقل صحي وإيكولوجي{"\n"}
          • <Text style={styles.benefit}>المشي:</Text> الخيار الأكثر طبيعية وصحة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌿 Acciones diarias para cuidar el medio ambiente</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏠 En casa:</Text>{"\n"}
          • <Text style={styles.tip}>Ahorrar energía:</Text> Apagar luces, usar electrodomésticos eficientes{"\n"}
          • <Text style={styles.tip}>Ahorrar agua:</Text> Cerrar grifos, reparar fugas, duchas cortas{"\n"}
          • <Text style={styles.tip}>Reciclar:</Text> Separar residuos en contenedores apropiados{"\n"}
          • <Text style={styles.tip}>Comprar responsable:</Text> Productos locales y con menos embalaje
          {"\n\n"}
          <Text style={styles.subtitle}>🚶‍♂️ En el transporte:</Text>{"\n"}
          • <Text style={styles.tip}>Usar transporte público:</Text> Autobús, metro, tren{"\n"}
          • <Text style={styles.tip}>Caminar o usar bici:</Text> Para trayectos cortos{"\n"}
          • <Text style={styles.tip}>Compartir coche:</Text> Reducir el número de vehículos{"\n"}
          • <Text style={styles.tip}>Conducir eficientemente:</Text> Velocidad moderada, mantenimiento
          {"\n\n"}
          <Text style={styles.subtitle}>🛒 En las compras:</Text>{"\n"}
          • <Text style={styles.tip}>Bolsas reutilizables:</Text> Evitar bolsas de plástico{"\n"}
          • <Text style={styles.tip}>Productos locales:</Text> Reducir transporte de mercancías{"\n"}
          • <Text style={styles.tip}>Menos embalaje:</Text> Elegir productos con menos plástico{"\n"}
          • <Text style={styles.tip}>Segunda mano:</Text> Comprar productos usados
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏠 في البيت:</Text>{"\n"}
          • <Text style={styles.tip}>توفير الطاقة:</Text> إطفاء الأنوار، استخدام أجهزة فعالة{"\n"}
          • <Text style={styles.tip}>توفير الماء:</Text> إغلاق الصنبور، إصلاح التسريبات، دش قصير{"\n"}
          • <Text style={styles.tip}>إعادة التدوير:</Text> فصل النفايات في حاويات مناسبة{"\n"}
          • <Text style={styles.tip}>شراء مسؤول:</Text> منتجات محلية وبتغليف أقل
          {"\n\n"}
          <Text style={styles.subtitle}>🚶‍♂️ في النقل:</Text>{"\n"}
          • <Text style={styles.tip}>استخدام النقل العام:</Text> حافلة، مترو، قطار{"\n"}
          • <Text style={styles.tip}>المشي أو الدراجة:</Text> للمسافات القصيرة{"\n"}
          • <Text style={styles.tip}>مشاركة السيارة:</Text> تقليل عدد المركبات{"\n"}
          • <Text style={styles.tip}>القيادة الفعالة:</Text> سرعة معتدلة، صيانة
          {"\n\n"}
          <Text style={styles.subtitle}>🛒 في التسوق:</Text>{"\n"}
          • <Text style={styles.tip}>أكياس قابلة لإعادة الاستخدام:</Text> تجنب أكياس البلاستيك{"\n"}
          • <Text style={styles.tip}>منتجات محلية:</Text> تقليل نقل البضائع{"\n"}
          • <Text style={styles.tip}>تغليف أقل:</Text> اختيار منتجات ببلاستيك أقل{"\n"}
          • <Text style={styles.tip}>مستعمل:</Text> شراء منتجات مستعملة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial del medio ambiente</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌍 Conceptos básicos:</Text>{"\n"}
          medio ambiente = بيئة{"\n"}
          naturaleza = طبيعة{"\n"}
          ecología = إيكولوجيا{"\n"}
          sostenible = مستدام{"\n"}
          biodiversidad = تنوع بيولوجي{"\n"}
          ecosistema = نظام بيئي{"\n"}
          contaminación = تلوث{"\n"}
          residuos = نفايات
          {"\n\n"}
          <Text style={styles.subtitle}>♻️ Reciclaje:</Text>{"\n"}
          reciclar = إعادة تدوير{"\n"}
          reutilizar = إعادة استخدام{"\n"}
          reducir = تقليل{"\n"}
          basura = قمامة{"\n"}
          contenedor = حاوية{"\n"}
          papel = ورق{"\n"}
          plástico = بلاستيك{"\n"}
          vidrio = زجاج
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ Energía:</Text>{"\n"}
          energía = طاقة{"\n"}
          renovable = متجددة{"\n"}
          solar = شمسية{"\n"}
          eólica = ريحية{"\n"}
          hidráulica = مائية{"\n"}
          ahorrar = توفير{"\n"}
          eficiente = فعال{"\n"}
          consumo = استهلاك
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 Protección:</Text>{"\n"}
          proteger = حماية{"\n"}
          conservar = الحفاظ{"\n"}
          cuidar = رعاية{"\n"}
          preservar = الحفاظ على{"\n"}
          reforestar = إعادة تشجير{"\n"}
          limpiar = تنظيف{"\n"}
          purificar = تنقية{"\n"}
          descontaminar = إزالة التلوث
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌍 المفاهيم الأساسية:</Text>{"\n"}
          بيئة = medio ambiente{"\n"}
          طبيعة = naturaleza{"\n"}
          إيكولوجيا = ecología{"\n"}
          مستدام = sostenible{"\n"}
          تنوع بيولوجي = biodiversidad{"\n"}
          نظام بيئي = ecosistema{"\n"}
          تلوث = contaminación{"\n"}
          نفايات = residuos
          {"\n\n"}
          <Text style={styles.subtitle}>♻️ إعادة التدوير:</Text>{"\n"}
          إعادة تدوير = reciclar{"\n"}
          إعادة استخدام = reutilizar{"\n"}
          تقليل = reducir{"\n"}
          قمامة = basura{"\n"}
          حاوية = contenedor{"\n"}
          ورق = papel{"\n"}
          بلاستيك = plástico{"\n"}
          زجاج = vidrio
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ الطاقة:</Text>{"\n"}
          طاقة = energía{"\n"}
          متجددة = renovable{"\n"}
          شمسية = solar{"\n"}
          ريحية = eólica{"\n"}
          مائية = hidráulica{"\n"}
          توفير = ahorrar{"\n"}
          فعال = eficiente{"\n"}
          استهلاك = consumo
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 الحماية:</Text>{"\n"}
          حماية = proteger{"\n"}
          الحفاظ = conservar{"\n"}
          رعاية = cuidar{"\n"}
          الحفاظ على = preservar{"\n"}
          إعادة تشجير = reforestar{"\n"}
          تنظيف = limpiar{"\n"}
          تنقية = purificar{"\n"}
          إزالة التلوث = descontaminar
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles sobre medio ambiente</Text>
        <Text style={styles.sectionText}>
          • "¿Qué haces para cuidar el medio ambiente?" = ماذا تفعل لحماية البيئة؟{"\n"}
          • "¿Reciclas en casa?" = هل تعيد التدوير في البيت؟{"\n"}
          • "¿Cómo ahorras energía?" = كيف توفر الطاقة؟{"\n"}
          • "¿Usas transporte público?" = هل تستخدم النقل العام؟{"\n"}
          • "¿Qué opinas del cambio climático?" = ما رأيك في تغير المناخ؟{"\n"}
          • "¿Compras productos ecológicos?" = هل تشتري منتجات إيكولوجية؟{"\n"}
          • "¿Qué podemos hacer para reducir la contaminación?" = ماذا يمكننا أن نفعل لتقليل التلوث؟{"\n"}
          • "¿Te preocupa el medio ambiente?" = هل تهتم بالبيئة؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "ماذا تفعل لحماية البيئة؟" = ¿Qué haces para cuidar el medio ambiente?{"\n"}
          • "هل تعيد التدوير في البيت؟" = ¿Reciclas en casa?{"\n"}
          • "كيف توفر الطاقة؟" = ¿Cómo ahorras energía?{"\n"}
          • "هل تستخدم النقل العام؟" = ¿Usas transporte público?{"\n"}
          • "ما رأيك في تغير المناخ؟" = ¿Qué opinas del cambio climático?{"\n"}
          • "هل تشتري منتجات إيكولوجية؟" = ¿Compras productos ecológicos?{"\n"}
          • "ماذا يمكننا أن نفعل لتقليل التلوث؟" = ¿Qué podemos hacer para reducir la contaminación?{"\n"}
          • "هل تهتم بالبيئة؟" = ¿Te preocupa el medio ambiente?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Medio ambiente en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏞️ Parques naturales:</Text>{"\n"}
          • <Text style={styles.benefit}>Parque Nacional de Doñana:</Text> Humedales y aves migratorias{"\n"}
          • <Text style={styles.benefit}>Parque Nacional de Picos de Europa:</Text> Montañas y biodiversidad{"\n"}
          • <Text style={styles.benefit}>Parque Nacional de Sierra Nevada:</Text> Alta montaña mediterránea{"\n"}
          • <Text style={styles.benefit}>Parque Nacional de las Islas Atlánticas:</Text> Ecosistemas marinos
          {"\n\n"}
          <Text style={styles.subtitle}>♻️ Políticas ambientales:</Text>{"\n"}
          • <Text style={styles.benefit}>Reciclaje obligatorio:</Text> Separación de residuos{"\n"}
          • <Text style={styles.benefit}>Energías renovables:</Text> Parques solares y eólicos{"\n"}
          • <Text style={styles.benefit}>Transporte público:</Text> Redes de metro y autobuses{"\n"}
          • <Text style={styles.benefit}>Protección de especies:</Text> Programas de conservación
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 Iniciativas ciudadanas:</Text>{"\n"}
          • <Text style={styles.benefit}>Huertos urbanos:</Text> Agricultura en las ciudades{"\n"}
          • <Text style={styles.benefit}>Comercio justo:</Text> Productos sostenibles{"\n"}
          • <Text style={styles.benefit}>Movilidad sostenible:</Text> Bicicletas y caminar{"\n"}
          • <Text style={styles.benefit}>Educación ambiental:</Text> Programas en escuelas
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏞️ الحدائق الطبيعية:</Text>{"\n"}
          • <Text style={styles.benefit}>الحديقة الوطنية دوينيانا:</Text> أراضي رطبة وطيور مهاجرة{"\n"}
          • <Text style={styles.benefit}>الحديقة الوطنية بيكوس دي أوروبا:</Text> جبال وتنوع بيولوجي{"\n"}
          • <Text style={styles.benefit}>الحديقة الوطنية سييرا نيفادا:</Text> جبال عالية متوسطية{"\n"}
          • <Text style={styles.benefit}>الحديقة الوطنية جزر الأطلسي:</Text> أنظمة بيئية بحرية
          {"\n\n"}
          <Text style={styles.subtitle}>♻️ السياسات البيئية:</Text>{"\n"}
          • <Text style={styles.benefit}>إعادة تدوير إلزامية:</Text> فصل النفايات{"\n"}
          • <Text style={styles.benefit}>طاقة متجددة:</Text> حدائق شمسية وريحية{"\n"}
          • <Text style={styles.benefit}>نقل عام:</Text> شبكات مترو وحافلات{"\n"}
          • <Text style={styles.benefit}>حماية الأنواع:</Text> برامج الحفاظ
          {"\n\n"}
          <Text style={styles.subtitle}>🌱 المبادرات المدنية:</Text>{"\n"}
          • <Text style={styles.benefit}>حدائق حضرية:</Text> زراعة في المدن{"\n"}
          • <Text style={styles.benefit}>تجارة عادلة:</Text> منتجات مستدامة{"\n"}
          • <Text style={styles.benefit}>تنقل مستدام:</Text> دراجات ومشي{"\n"}
          • <Text style={styles.benefit}>تعليم بيئي:</Text> برامج في المدارس
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
};

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
