import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
  
// Datos de ejercicios para Ciencia y Tecnología - Nivel B2
  const ejercicios = [
    // Ejercicio 1: Opción múltiple
    {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la inteligencia artificial (IA)?",
    opciones: ["Solo robots humanoides", "Sistemas que pueden realizar tareas que requieren inteligencia humana", "Exclusivamente software de computadora", "Solo algoritmos matemáticos"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué significa 'machine learning'?",
    opciones: ["Aprender a usar máquinas", "Algoritmos que aprenden de datos sin programación explícita", "Reparar computadoras", "Programar robots"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es el método científico?",
    opciones: ["Solo experimentos en laboratorio", "Proceso sistemático de investigación basado en evidencia", "Leer libros de ciencia", "Usar microscopios"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la blockchain?",
    opciones: ["Una cadena de metal", "Tecnología de registro distribuido e inmutable", "Un tipo de computadora", "Software de contabilidad"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué significa 'IoT'?",
    opciones: ["Internet of Things (Internet de las cosas)", "International Organization of Technology", "Internet Online Tools", "Information Over Technology"],
    respuestaCorrecta: 0
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la ciberseguridad?",
    opciones: ["Solo usar contraseñas", "Protección de sistemas informáticos contra ataques digitales", "Navegar por internet", "Descargar software"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la sostenibilidad tecnológica?",
    opciones: ["Solo reciclar computadoras", "Desarrollo tecnológico que respeta el medio ambiente", "Usar energía solar", "Comprar productos caros"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la automatización?",
    opciones: ["Solo robots industriales", "Proceso de hacer que las tareas se ejecuten automáticamente", "Usar computadoras", "Programar software"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la realidad virtual (VR)?",
    opciones: ["Solo videojuegos", "Entorno simulado que puede ser similar o completamente diferente al mundo real", "Ver televisión", "Usar internet"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la computación cuántica?",
    opciones: ["Computadoras muy rápidas", "Computación basada en principios de la mecánica cuántica", "Supercomputadoras", "Computadoras del futuro"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la nanotecnología?",
    opciones: ["Tecnología muy pequeña", "Manipulación de materia a escala nanométrica", "Microscopios avanzados", "Chips de computadora"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la biotecnología?",
    opciones: ["Solo medicina", "Uso de sistemas biológicos para desarrollar productos y tecnologías", "Cultivar plantas", "Estudiar animales"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la energía renovable?",
    opciones: ["Solo energía solar", "Energía que se obtiene de fuentes naturales inagotables", "Electricidad barata", "Energía nuclear"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la robótica?",
    opciones: ["Solo robots humanoides", "Diseño, construcción y operación de robots", "Jugar con juguetes", "Usar máquinas"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la impresión 3D?",
    opciones: ["Imprimir en papel", "Crear objetos tridimensionales capa por capa", "Dibujar en 3D", "Fotografiar objetos"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la computación en la nube?",
    opciones: ["Nubes digitales", "Acceso a recursos informáticos a través de internet", "Almacenar archivos", "Usar internet"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué es la ética en la tecnología?",
    opciones: ["Solo leyes", "Principios morales que guían el desarrollo y uso de la tecnología", "Regulaciones gubernamentales", "Contratos de software"],
    respuestaCorrecta: 1
  },
  
  // Ejercicio 18: Vocabulario - Conceptos tecnológicos
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada concepto tecnológico con su definición correcta:",
    pares: [
      { izquierda: "Machine Learning", derecha: "Algoritmos que aprenden de datos" },
      { izquierda: "Blockchain", derecha: "Registro distribuido inmutable" },
      { izquierda: "IoT", derecha: "Dispositivos conectados a internet" },
      { izquierda: "Big Data", derecha: "Conjuntos masivos de información" }
    ]
  },
  
  // Ejercicio 19: Vocabulario - Campos científicos
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada campo científico con su aplicación principal:",
    pares: [
      { izquierda: "Biotecnología", derecha: "Desarrollo de medicamentos" },
      { izquierda: "Nanotecnología", derecha: "Materiales a escala molecular" },
      { izquierda: "Robótica", derecha: "Automatización industrial" },
      { izquierda: "Computación cuántica", derecha: "Cálculos ultra-rápidos" }
    ]
  },
  
  // Ejercicio 20: Vocabulario - Tecnologías emergentes
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada tecnología emergente con su característica principal:",
      pares: [
      { izquierda: "Realidad Virtual", derecha: "Entornos inmersivos" },
      { izquierda: "Impresión 3D", derecha: "Fabricación aditiva" },
      { izquierda: "Computación en la nube", derecha: "Recursos compartidos" },
      { izquierda: "Energía renovable", derecha: "Fuentes sostenibles" }
    ]
  }
];

export default function CienciaTecnologia() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[6] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 6);
    }
    Alert.alert(
      'Unidad finalizada',
      'Vuelve al menú de B2 para continuar con la siguiente unidad.\nارجع إلى قائمة مستوى B2 لمتابعة الوحدة التالية.',
      [
        { text: 'Seguir estudiando', style: 'cancel' },
      { text: 'Ir al menú B2 / الذهاب إلى قائمة B2', onPress: () => router.replace('/B2_Avanzado') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#79A890" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>🔬 Ciencia y Tecnología</Text>
        <Text style={styles.titleAr}>العلم والتكنولوجيا</Text>
        <Text style={styles.subtitle}>Innovación y progreso científico</Text>
        <Text style={styles.subtitleAr}>الابتكار والتقدم العلمي</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Importancia de la ciencia y tecnología</Text>
        <Text style={styles.sectionText}>
          La ciencia y la tecnología son los motores del progreso humano en el siglo XXI. 
          Estos campos no solo han transformado la forma en que vivimos, trabajamos y nos 
          comunicamos, sino que también han abierto nuevas posibilidades para resolver 
          los desafíos más complejos de la humanidad.
          {"\n\n"}
          La investigación científica es fundamental para el desarrollo de nuevas 
          tecnologías que mejoran la calidad de vida, desde avances médicos hasta 
          soluciones para el cambio climático. La innovación tecnológica, por su parte, 
          acelera el ritmo del descubrimiento científico y permite la aplicación 
          práctica de los hallazgos de la investigación.
          {"\n\n"}
          En la era digital, la comprensión de la ciencia y la tecnología es esencial 
          para participar activamente en la sociedad, tomar decisiones informadas y 
          contribuir al desarrollo sostenible del planeta.
        </Text>
        <Text style={styles.sectionTextAr}>
          العلم والتكنولوجيا هما محركات التقدم البشري في القرن الحادي والعشرين.
          هذه المجالات لم تحول فقط الطريقة التي نعيش ونعمل ونتواصل بها، بل فتحت
          أيضاً إمكانيات جديدة لحل أكثر التحديات تعقيداً للإنسانية.
          {"\n\n"}
          البحث العلمي أساسي لتطوير تقنيات جديدة تحسن جودة الحياة، من التقدم
          الطبي إلى حلول تغير المناخ. الابتكار التكنولوجي، من جانبه، يسرع
          وتيرة الاكتشاف العلمي ويسمح بالتطبيق العملي لنتائج البحث.
          {"\n\n"}
          في العصر الرقمي، فهم العلم والتكنولوجيا أساسي للمشاركة النشطة في
          المجتمع، واتخاذ قرارات مدروسة، والمساهمة في التنمية المستدامة للكوكب.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de ciencia y tecnología</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🤖 Inteligencia Artificial y Machine Learning:</Text>{"\n"}
          inteligencia artificial = ذكاء اصطناعي{"\n"}
          machine learning = تعلم آلي{"\n"}
          algoritmo = خوارزمية{"\n"}
          deep learning = تعلم عميق{"\n"}
          neural network = شبكة عصبية{"\n"}
          automatización = أتمتة{"\n"}
          procesamiento de datos = معالجة البيانات{"\n"}
          análisis predictivo = تحليل تنبؤي{"\n"}
          reconocimiento de patrones = التعرف على الأنماط{"\n"}
          optimización = تحسين
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 Investigación científica:</Text>{"\n"}
          método científico = الطريقة العلمية{"\n"}
          hipótesis = فرضية{"\n"}
          experimento = تجربة{"\n"}
          laboratorio = مختبر{"\n"}
          teoría = نظرية{"\n"}
          evidencia = دليل{"\n"}
          análisis = تحليل{"\n"}
          conclusiones = استنتاجات{"\n"}
          peer review = مراجعة الأقران{"\n"}
          publicación científica = نشر علمي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💡 Innovación tecnológica:</Text>{"\n"}
          innovación = ابتكار{"\n"}
          desarrollo = تطوير{"\n"}
          prototipo = نموذج أولي{"\n"}
          patente = براءة اختراع{"\n"}
          investigación = بحث{"\n"}
          descubrimiento = اكتشاف{"\n"}
          invención = اختراع{"\n"}
          tecnología emergente = تقنية ناشئة{"\n"}
          disrupción tecnológica = اضطراب تكنولوجي{"\n"}
          transferencia de tecnología = نقل التكنولوجيا
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌐 Tecnologías digitales:</Text>{"\n"}
          blockchain = بلوك تشين{"\n"}
          IoT = إنترنت الأشياء{"\n"}
          big data = البيانات الضخمة{"\n"}
          computación en la nube = الحوسبة السحابية{"\n"}
          ciberseguridad = الأمن السيبراني{"\n"}
          realidad virtual = الواقع الافتراضي{"\n"}
          realidad aumentada = الواقع المعزز{"\n"}
          impresión 3D = الطباعة ثلاثية الأبعاد{"\n"}
          robótica = الروبوتات{"\n"}
          nanotecnología = النانوتكنولوجيا
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ Energía y sostenibilidad:</Text>{"\n"}
          energía renovable = طاقة متجددة{"\n"}
          sostenibilidad = استدامة{"\n"}
          eficiencia energética = كفاءة الطاقة{"\n"}
          cambio climático = تغير المناخ{"\n"}
          biotecnología = التكنولوجيا الحيوية{"\n"}
          computación cuántica = الحوسبة الكمية{"\n"}
          materiales inteligentes = مواد ذكية{"\n"}
          economía circular = الاقتصاد الدائري{"\n"}
          huella de carbono = البصمة الكربونية{"\n"}
          desarrollo sostenible = التنمية المستدامة
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🤖 الذكاء الاصطناعي والتعلم الآلي:</Text>{"\n"}
          ذكاء اصطناعي = inteligencia artificial{"\n"}
          تعلم آلي = machine learning{"\n"}
          خوارزمية = algoritmo{"\n"}
          تعلم عميق = deep learning{"\n"}
          شبكة عصبية = neural network{"\n"}
          أتمتة = automatización{"\n"}
          معالجة البيانات = procesamiento de datos{"\n"}
          تحليل تنبؤي = análisis predictivo{"\n"}
          التعرف على الأنماط = reconocimiento de patrones{"\n"}
          تحسين = optimización
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 البحث العلمي:</Text>{"\n"}
          الطريقة العلمية = método científico{"\n"}
          فرضية = hipótesis{"\n"}
          تجربة = experimento{"\n"}
          مختبر = laboratorio{"\n"}
          نظرية = teoría{"\n"}
          دليل = evidencia{"\n"}
          تحليل = análisis{"\n"}
          استنتاجات = conclusiones{"\n"}
          مراجعة الأقران = peer review{"\n"}
          نشر علمي = publicación científica
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💡 الابتكار التكنولوجي:</Text>{"\n"}
          ابتكار = innovación{"\n"}
          تطوير = desarrollo{"\n"}
          نموذج أولي = prototipo{"\n"}
          براءة اختراع = patente{"\n"}
          بحث = investigación{"\n"}
          اكتشاف = descubrimiento{"\n"}
          اختراع = invención{"\n"}
          تقنية ناشئة = tecnología emergente{"\n"}
          اضطراب تكنولوجي = disrupción tecnológica{"\n"}
          نقل التكنولوجيا = transferencia de tecnología
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌐 التقنيات الرقمية:</Text>{"\n"}
          بلوك تشين = blockchain{"\n"}
          إنترنت الأشياء = IoT{"\n"}
          البيانات الضخمة = big data{"\n"}
          الحوسبة السحابية = computación en la nube{"\n"}
          الأمن السيبراني = ciberseguridad{"\n"}
          الواقع الافتراضي = realidad virtual{"\n"}
          الواقع المعزز = realidad aumentada{"\n"}
          الطباعة ثلاثية الأبعاد = impresión 3D{"\n"}
          الروبوتات = robótica{"\n"}
          النانوتكنولوجيا = nanotecnología
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ الطاقة والاستدامة:</Text>{"\n"}
          طاقة متجددة = energía renovable{"\n"}
          استدامة = sostenibilidad{"\n"}
          كفاءة الطاقة = eficiencia energética{"\n"}
          تغير المناخ = cambio climático{"\n"}
          التكنولوجيا الحيوية = biotecnología{"\n"}
          الحوسبة الكمية = computación cuántica{"\n"}
          مواد ذكية = materiales inteligentes{"\n"}
          الاقتصاد الدائري = economía circular{"\n"}
          البصمة الكربونية = huella de carbono{"\n"}
          التنمية المستدامة = desarrollo sostenible
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔬 Áreas principales de la ciencia y tecnología</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🤖 Inteligencia Artificial y Automatización:</Text>{"\n"}
          • <Text style={styles.benefit}>Machine Learning:</Text> Algoritmos que aprenden de datos{"\n"}
          • <Text style={styles.benefit}>Deep Learning:</Text> Redes neuronales complejas{"\n"}
          • <Text style={styles.benefit}>Procesamiento de lenguaje natural:</Text> Comprensión del lenguaje humano{"\n"}
          • <Text style={styles.benefit}>Visión por computadora:</Text> Análisis de imágenes y videos{"\n"}
          • <Text style={styles.benefit}>Robótica autónoma:</Text> Robots que toman decisiones{"\n"}
          • <Text style={styles.benefit}>Automatización inteligente:</Text> Sistemas que se adaptan
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌐 Tecnologías de la información:</Text>{"\n"}
          • <Text style={styles.benefit}>Computación en la nube:</Text> Recursos informáticos compartidos{"\n"}
          • <Text style={styles.benefit}>Big Data:</Text> Análisis de grandes volúmenes de datos{"\n"}
          • <Text style={styles.benefit}>Blockchain:</Text> Registros distribuidos seguros{"\n"}
          • <Text style={styles.benefit}>IoT:</Text> Dispositivos conectados inteligentes{"\n"}
          • <Text style={styles.benefit}>5G y conectividad:</Text> Comunicaciones ultra-rápidas{"\n"}
          • <Text style={styles.benefit}>Ciberseguridad:</Text> Protección de sistemas digitales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 Ciencias de la vida:</Text>{"\n"}
          • <Text style={styles.benefit}>Biotecnología:</Text> Aplicaciones biológicas{"\n"}
          • <Text style={styles.benefit}>Genómica:</Text> Estudio del ADN{"\n"}
          • <Text style={styles.benefit}>Medicina personalizada:</Text> Tratamientos individualizados{"\n"}
          • <Text style={styles.benefit}>Nanomedicina:</Text> Aplicaciones médicas a nanoescala{"\n"}
          • <Text style={styles.benefit}>Bioinformática:</Text> Análisis de datos biológicos{"\n"}
          • <Text style={styles.benefit}>Síntesis de proteínas:</Text> Creación de proteínas artificiales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ Energía y medio ambiente:</Text>{"\n"}
          • <Text style={styles.benefit}>Energías renovables:</Text> Solar, eólica, hidroeléctrica{"\n"}
          • <Text style={styles.benefit}>Almacenamiento de energía:</Text> Baterías avanzadas{"\n"}
          • <Text style={styles.benefit}>Captura de carbono:</Text> Reducción de emisiones{"\n"}
          • <Text style={styles.benefit}>Materiales sostenibles:</Text> Alternativas ecológicas{"\n"}
          • <Text style={styles.benefit}>Agricultura inteligente:</Text> Tecnología agrícola{"\n"}
          • <Text style={styles.benefit}>Monitoreo ambiental:</Text> Sensores y análisis
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 Tecnologías emergentes:</Text>{"\n"}
          • <Text style={styles.benefit}>Computación cuántica:</Text> Procesamiento cuántico{"\n"}
          • <Text style={styles.benefit}>Nanotecnología:</Text> Manipulación molecular{"\n"}
          • <Text style={styles.benefit}>Realidad virtual/aumentada:</Text> Entornos inmersivos{"\n"}
          • <Text style={styles.benefit}>Impresión 3D:</Text> Fabricación aditiva{"\n"}
          • <Text style={styles.benefit}>Materiales inteligentes:</Text> Materiales adaptativos{"\n"}
          • <Text style={styles.benefit}>Fotónica:</Text> Tecnología de la luz
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🤖 الذكاء الاصطناعي والأتمتة:</Text>{"\n"}
          • <Text style={styles.benefit}>التعلم الآلي:</Text> خوارزميات تتعلم من البيانات{"\n"}
          • <Text style={styles.benefit}>التعلم العميق:</Text> شبكات عصبية معقدة{"\n"}
          • <Text style={styles.benefit}>معالجة اللغة الطبيعية:</Text> فهم اللغة البشرية{"\n"}
          • <Text style={styles.benefit}>رؤية الحاسوب:</Text> تحليل الصور والفيديوهات{"\n"}
          • <Text style={styles.benefit}>الروبوتات المستقلة:</Text> روبوتات تتخذ قرارات{"\n"}
          • <Text style={styles.benefit}>الأتمتة الذكية:</Text> أنظمة تتكيف
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌐 تقنيات المعلومات:</Text>{"\n"}
          • <Text style={styles.benefit}>الحوسبة السحابية:</Text> موارد حاسوبية مشتركة{"\n"}
          • <Text style={styles.benefit}>البيانات الضخمة:</Text> تحليل أحجام كبيرة من البيانات{"\n"}
          • <Text style={styles.benefit}>بلوك تشين:</Text> سجلات موزعة آمنة{"\n"}
          • <Text style={styles.benefit}>إنترنت الأشياء:</Text> أجهزة متصلة ذكية{"\n"}
          • <Text style={styles.benefit}>5G والاتصال:</Text> اتصالات فائقة السرعة{"\n"}
          • <Text style={styles.benefit}>الأمن السيبراني:</Text> حماية الأنظمة الرقمية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🔬 علوم الحياة:</Text>{"\n"}
          • <Text style={styles.benefit}>التكنولوجيا الحيوية:</Text> تطبيقات بيولوجية{"\n"}
          • <Text style={styles.benefit}>علم الجينوم:</Text> دراسة الحمض النووي{"\n"}
          • <Text style={styles.benefit}>الطب الشخصي:</Text> علاجات فردية{"\n"}
          • <Text style={styles.benefit}>النانو طب:</Text> تطبيقات طبية على نطاق النانو{"\n"}
          • <Text style={styles.benefit}>المعلوماتية الحيوية:</Text> تحليل البيانات البيولوجية{"\n"}
          • <Text style={styles.benefit}>تخليق البروتينات:</Text> إنشاء بروتينات اصطناعية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>⚡ الطاقة والبيئة:</Text>{"\n"}
          • <Text style={styles.benefit}>الطاقات المتجددة:</Text> شمسية، رياح، كهرومائية{"\n"}
          • <Text style={styles.benefit}>تخزين الطاقة:</Text> بطاريات متقدمة{"\n"}
          • <Text style={styles.benefit}>احتجاز الكربون:</Text> تقليل الانبعاثات{"\n"}
          • <Text style={styles.benefit}>مواد مستدامة:</Text> بدائل صديقة للبيئة{"\n"}
          • <Text style={styles.benefit}>الزراعة الذكية:</Text> تكنولوجيا زراعية{"\n"}
          • <Text style={styles.benefit}>المراقبة البيئية:</Text> أجهزة استشعار وتحليل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🚀 التقنيات الناشئة:</Text>{"\n"}
          • <Text style={styles.benefit}>الحوسبة الكمية:</Text> معالجة كمية{"\n"}
          • <Text style={styles.benefit}>النانوتكنولوجيا:</Text> التلاعب الجزيئي{"\n"}
          • <Text style={styles.benefit}>الواقع الافتراضي/المعزز:</Text> بيئات غامرة{"\n"}
          • <Text style={styles.benefit}>الطباعة ثلاثية الأبعاد:</Text> تصنيع إضافي{"\n"}
          • <Text style={styles.benefit}>مواد ذكية:</Text> مواد تكيفية{"\n"}
          • <Text style={styles.benefit}>الفوتونيات:</Text> تكنولوجيا الضوء
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚖️ Desafíos éticos y sociales de la tecnología</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🔒 Privacidad y seguridad:</Text>{"\n"}
          • <Text style={styles.benefit}>Protección de datos:</Text> Garantizar la privacidad personal{"\n"}
          • <Text style={styles.benefit}>Ciberseguridad:</Text> Prevenir ataques digitales{"\n"}
          • <Text style={styles.benefit}>Vigilancia masiva:</Text> Equilibrio entre seguridad y libertad{"\n"}
          • <Text style={styles.benefit}>Consentimiento informado:</Text> Derecho a conocer el uso de datos{"\n"}
          • <Text style={styles.benefit}>Transparencia algorítmica:</Text> Comprensión de decisiones automatizadas{"\n"}
          • <Text style={styles.benefit}>Derecho al olvido:</Text> Eliminación de información personal
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤖 Inteligencia Artificial responsable:</Text>{"\n"}
          • <Text style={styles.benefit}>Sesgos algorítmicos:</Text> Evitar discriminación en IA{"\n"}
          • <Text style={styles.benefit}>Responsabilidad:</Text> Quién responde por decisiones de IA{"\n"}
          • <Text style={styles.benefit}>Transparencia:</Text> Explicabilidad de sistemas de IA{"\n"}
          • <Text style={styles.benefit}>Control humano:</Text> Supervisión de sistemas autónomos{"\n"}
          • <Text style={styles.benefit}>Valores humanos:</Text> Alineación con principios éticos{"\n"}
          • <Text style={styles.benefit}>Desarrollo inclusivo:</Text> IA que beneficie a todos
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Impacto ambiental:</Text>{"\n"}
          • <Text style={styles.benefit}>Huella de carbono:</Text> Impacto ambiental de la tecnología{"\n"}
          • <Text style={styles.benefit}>Economía circular:</Text> Reducir, reutilizar, reciclar{"\n"}
          • <Text style={styles.benefit}>Tecnología verde:</Text> Desarrollo sostenible{"\n"}
          • <Text style={styles.benefit}>Desechos electrónicos:</Text> Gestión responsable{"\n"}
          • <Text style={styles.benefit}>Eficiencia energética:</Text> Optimizar el consumo{"\n"}
          • <Text style={styles.benefit}>Materiales sostenibles:</Text> Alternativas ecológicas
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>👥 Impacto social:</Text>{"\n"}
          • <Text style={styles.benefit}>Brecha digital:</Text> Acceso desigual a la tecnología{"\n"}
          • <Text style={styles.benefit}>Automatización del empleo:</Text> Impacto en el trabajo{"\n"}
          • <Text style={styles.benefit}>Educación tecnológica:</Text> Alfabetización digital{"\n"}
          • <Text style={styles.benefit}>Inclusión digital:</Text> Tecnología para todos{"\n"}
          • <Text style={styles.benefit}>Dependencia tecnológica:</Text> Uso saludable de la tecnología{"\n"}
          • <Text style={styles.benefit}>Bienestar digital:</Text> Salud mental en la era digital
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🔒 الخصوصية والأمان:</Text>{"\n"}
          • <Text style={styles.benefit}>حماية البيانات:</Text> ضمان الخصوصية الشخصية{"\n"}
          • <Text style={styles.benefit}>الأمن السيبراني:</Text> منع الهجمات الرقمية{"\n"}
          • <Text style={styles.benefit}>المراقبة الجماعية:</Text> توازن بين الأمان والحرية{"\n"}
          • <Text style={styles.benefit}>الموافقة المستنيرة:</Text> الحق في معرفة استخدام البيانات{"\n"}
          • <Text style={styles.benefit}>شفافية الخوارزميات:</Text> فهم القرارات الآلية{"\n"}
          • <Text style={styles.benefit}>الحق في النسيان:</Text> حذف المعلومات الشخصية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤖 الذكاء الاصطناعي المسؤول:</Text>{"\n"}
          • <Text style={styles.benefit}>التحيزات الخوارزمية:</Text> تجنب التمييز في الذكاء الاصطناعي{"\n"}
          • <Text style={styles.benefit}>المسؤولية:</Text> من يتحمل مسؤولية قرارات الذكاء الاصطناعي{"\n"}
          • <Text style={styles.benefit}>الشفافية:</Text> قابلية شرح أنظمة الذكاء الاصطناعي{"\n"}
          • <Text style={styles.benefit}>التحكم البشري:</Text> إشراف على الأنظمة المستقلة{"\n"}
          • <Text style={styles.benefit}>القيم البشرية:</Text> محاذاة مع المبادئ الأخلاقية{"\n"}
          • <Text style={styles.benefit}>التطوير الشامل:</Text> ذكاء اصطناعي يفيد الجميع
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 التأثير البيئي:</Text>{"\n"}
          • <Text style={styles.benefit}>البصمة الكربونية:</Text> التأثير البيئي للتكنولوجيا{"\n"}
          • <Text style={styles.benefit}>الاقتصاد الدائري:</Text> تقليل، إعادة استخدام، إعادة تدوير{"\n"}
          • <Text style={styles.benefit}>التكنولوجيا الخضراء:</Text> التنمية المستدامة{"\n"}
          • <Text style={styles.benefit}>النفايات الإلكترونية:</Text> إدارة مسؤولة{"\n"}
          • <Text style={styles.benefit}>كفاءة الطاقة:</Text> تحسين الاستهلاك{"\n"}
          • <Text style={styles.benefit}>مواد مستدامة:</Text> بدائل صديقة للبيئة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>👥 التأثير الاجتماعي:</Text>{"\n"}
          • <Text style={styles.benefit}>الفجوة الرقمية:</Text> وصول غير متساوٍ للتكنولوجيا{"\n"}
          • <Text style={styles.benefit}>أتمتة العمل:</Text> التأثير على العمل{"\n"}
          • <Text style={styles.benefit}>التعليم التكنولوجي:</Text> محو الأمية الرقمية{"\n"}
          • <Text style={styles.benefit}>الشمول الرقمي:</Text> تكنولوجيا للجميع{"\n"}
          • <Text style={styles.benefit}>الاعتماد على التكنولوجيا:</Text> استخدام صحي للتكنولوجيا{"\n"}
          • <Text style={styles.benefit}>الرفاهية الرقمية:</Text> الصحة النفسية في العصر الرقمي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre ciencia y tecnología</Text>
        <Text style={styles.dialogo}>
          — ¿Qué opinas sobre el desarrollo de la inteligencia artificial? ¿Crees que los beneficios superan los riesgos?{"\n\n"}
          — En mi opinión, la IA tiene un potencial enorme para mejorar nuestras vidas, especialmente en campos como la medicina y la educación. Sin embargo, es fundamental establecer regulaciones éticas y garantizar que el desarrollo tecnológico beneficie a toda la sociedad, no solo a unos pocos. Los riesgos existen, pero creo que con la gobernanza adecuada podemos maximizar los beneficios y minimizar los peligros.{"\n\n"}
          — ¿Cómo crees que la tecnología puede ayudar a resolver problemas ambientales como el cambio climático?{"\n\n"}
          — La tecnología es crucial para abordar el cambio climático. Las energías renovables, la eficiencia energética, los materiales sostenibles y la captura de carbono son tecnologías que ya están demostrando su efectividad. Además, la IA puede optimizar el uso de recursos y predecir patrones climáticos. Lo importante es que estas tecnologías se desarrollen de manera responsable y accesible para todos los países.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما هو رأيك في التأثير الاجتماعي للتكنولوجيا؟ هل تعتقد أن التقدم التكنولوجي يحسن حياتنا دائمًا؟{
"\n\n"}
          — في رأيي، الذكاء الاصطناعي لديه إمكانيات هائلة لتحسين حياتنا، خاصة في مجالات مثل الطب والتعليم. لكن من الأساسي وضع لوائح أخلاقية وضمان أن التطور التكنولوجي يفيد المجتمع كله، وليس قلة فقط. المخاطر موجودة، لكنني أعتقد أنه مع الحكم الرشيد المناسب يمكننا تعظيم الفوائد وتقليل المخاطر.{"\n\n"}
          — كيف تعتقد أن التكنولوجيا يمكن أن تساعد في حل المشاكل البيئية مثل تغير المناخ؟{"\n\n"}
          — التكنولوجيا حاسمة لمعالجة تغير المناخ. الطاقات المتجددة، كفاءة الطاقة، المواد المستدامة واحتجاز الكربون هي تقنيات أثبتت بالفعل فعاليتها. بالإضافة إلى ذلك، يمكن للذكاء الاصطناعي تحسين استخدام الموارد والتنبؤ بالأنماط المناخية. المهم هو أن تتطور هذه التقنيات بطريقة مسؤولة ومتاحة لجميع البلدان.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Ejercicios Interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
      </View>

      <View style={styles.finishContainer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Unidad finalizada</Text>
          <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#79A890',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleAr: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  dialogo: {
    fontSize: 16,
    color: '#79A890',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  dialogoAr: {
    fontSize: 16,
    color: '#79A890',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: '#79A890',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
});
