import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Cultura y Arte - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el patrimonio cultural?",
    opciones: ["Solo monumentos antiguos", "Herencia colectiva de una sociedad que incluye arte, tradiciones y valores", "Exclusivamente obras de arte", "Solo edificios históricos"],
    respuesta_correcta: "Herencia colectiva de una sociedad que incluye arte, tradiciones y valores"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué caracteriza principalmente al arte contemporáneo?",
    opciones: ["Solo pinturas al óleo tradicionales", "La experimentación y la ruptura con convenciones establecidas", "Exclusivamente esculturas clásicas", "Solo música instrumental"],
    respuesta_correcta: "La experimentación y la ruptura con convenciones establecidas"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es una corriente artística?",
    opciones: ["Solo un estilo de pintura", "Movimiento con características estéticas y conceptuales comunes", "Exclusivamente música clásica", "Solo arquitectura moderna"],
    respuesta_correcta: "Movimiento con características estéticas y conceptuales comunes"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la crítica de arte?",
    opciones: ["Solo opiniones negativas", "Análisis y valoración profesional de obras artísticas", "Exclusivamente reseñas de museos", "Solo comentarios de espectadores"],
    respuesta_correcta: "Análisis y valoración profesional de obras artísticas"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'interpretación' en el contexto artístico?",
    opciones: ["Solo traducir textos", "Proceso de dar significado y sentido a una obra de arte", "Exclusivamente explicar técnicas", "Solo describir colores"],
    respuesta_correcta: "Proceso de dar significado y sentido a una obra de arte"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la composición en una obra de arte?",
    opciones: ["Solo el color", "Organización y disposición de los elementos visuales", "Exclusivamente el tamaño", "Solo la técnica utilizada"],
    respuesta_correcta: "Organización y disposición de los elementos visuales"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el impresionismo?",
    opciones: ["Solo pinturas oscuras", "Movimiento artístico que captura la luz y el momento", "Exclusivamente esculturas", "Solo arte abstracto"],
    respuesta_correcta: "Movimiento artístico que captura la luz y el momento"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el cubismo?",
    opciones: ["Solo pinturas cuadradas", "Movimiento que representa objetos desde múltiples perspectivas", "Exclusivamente esculturas geométricas", "Solo arte digital"],
    respuesta_correcta: "Movimiento que representa objetos desde múltiples perspectivas"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el surrealismo?",
    opciones: ["Solo arte realista", "Movimiento que explora el subconsciente y los sueños", "Exclusivamente pinturas de paisajes", "Solo esculturas clásicas"],
    respuesta_correcta: "Movimiento que explora el subconsciente y los sueños"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la textura en una obra de arte?",
    opciones: ["Solo el color", "Cualidad táctil o visual de la superficie", "Exclusivamente el brillo", "Solo la forma"],
    respuesta_correcta: "Cualidad táctil o visual de la superficie"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el arte abstracto?",
    opciones: ["Solo pinturas confusas", "Arte que no representa objetos reconocibles de la realidad", "Exclusivamente esculturas modernas", "Solo arte digital"],
    respuesta_correcta: "Arte que no representa objetos reconocibles de la realidad"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la perspectiva en el arte?",
    opciones: ["Solo el punto de vista", "Técnica para crear sensación de profundidad y espacio", "Exclusivamente el fondo", "Solo la línea del horizonte"],
    respuesta_correcta: "Técnica para crear sensación de profundidad y espacio"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el arte conceptual?",
    opciones: ["Solo ideas escritas", "Arte donde la idea es más importante que el objeto físico", "Exclusivamente instalaciones", "Solo performances"],
    respuesta_correcta: "Arte donde la idea es más importante que el objeto físico"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la instalación artística?",
    opciones: ["Solo esculturas grandes", "Obra de arte que transforma un espacio específico", "Exclusivamente pinturas murales", "Solo arte digital"],
    respuesta_correcta: "Obra de arte que transforma un espacio específico"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el performance art?",
    opciones: ["Solo teatro tradicional", "Arte que involucra acciones del artista en tiempo real", "Exclusivamente danza", "Solo música en vivo"],
    respuesta_correcta: "Arte que involucra acciones del artista en tiempo real"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el arte digital?",
    opciones: ["Solo fotos digitales", "Arte creado con herramientas y tecnologías digitales", "Exclusivamente videos", "Solo animaciones"],
    respuesta_correcta: "Arte creado con herramientas y tecnologías digitales"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la conservación del patrimonio cultural?",
    opciones: ["Solo limpiar objetos", "Protección y preservación del legado cultural para futuras generaciones", "Exclusivamente restaurar edificios", "Solo guardar en museos"],
    respuesta_correcta: "Protección y preservación del legado cultural para futuras generaciones"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto artístico con su definición correcta:",
    pares: [
      { izquierda: "Patrimonio cultural", derecha: "Herencia colectiva de una sociedad" },
      { izquierda: "Crítica de arte", derecha: "Análisis profesional de obras" },
      { izquierda: "Corriente artística", derecha: "Movimiento con características comunes" },
      { izquierda: "Interpretación", derecha: "Proceso de dar significado" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada movimiento artístico con su característica principal:",
    pares: [
      { izquierda: "Impresionismo", derecha: "Captura de luz y momento" },
      { izquierda: "Cubismo", derecha: "Múltiples perspectivas" },
      { izquierda: "Surrealismo", derecha: "Exploración del subconsciente" },
      { izquierda: "Arte abstracto", derecha: "No representa realidad" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada elemento artístico con su función principal:",
    pares: [
      { izquierda: "Composición", derecha: "Organización de elementos" },
      { izquierda: "Perspectiva", derecha: "Crear sensación de profundidad" },
      { izquierda: "Textura", derecha: "Cualidad táctil de superficie" },
      { izquierda: "Color", derecha: "Expresar emociones y atmósfera" }
    ]
  }
];

export default function CulturaArte() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[4] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 4);
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
        <Text style={styles.title}>🎨 Cultura y Arte</Text>
        <Text style={styles.titleAr}>الثقافة والفن</Text>
        <Text style={styles.subtitle}>Expresiones artísticas y patrimonio cultural</Text>
        <Text style={styles.subtitleAr}>التعبيرات الفنية والتراث الثقافي</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la cultura y el arte</Text>
        <Text style={styles.sectionText}>
          La cultura y el arte son fundamentales para el desarrollo humano y la comprensión 
          de nuestra identidad como individuos y como sociedad. A través de las expresiones 
          artísticas, los seres humanos han comunicado sus emociones, pensamientos y visiones 
          del mundo desde los albores de la civilización.
          {"\n\n"}
          El arte no solo es una forma de expresión personal, sino también un reflejo de 
          la sociedad en la que se crea. Cada obra de arte, desde las pinturas rupestres 
          hasta las instalaciones digitales contemporáneas, nos cuenta una historia sobre 
          su época, sus valores y sus aspiraciones.
          {"\n\n"}
          La cultura, por su parte, abarca todas las manifestaciones humanas que dan sentido 
          a nuestra existencia: desde las tradiciones y costumbres hasta las creencias y 
          formas de vida. Es a través de la cultura que construimos nuestra identidad y 
          establecemos conexiones con otros seres humanos.
        </Text>
        <Text style={styles.sectionTextAr}>
          الثقافة والفن أساسيان لتطور الإنسان وفهم هويتنا كأفراد وكمجتمع.
          من خلال التعبيرات الفنية، عبر البشر عن مشاعرهم وأفكارهم ورؤيتهم
          للعالم منذ فجر الحضارة.
          {"\n\n"}
          الفن ليس فقط وسيلة للتعبير الشخصي، بل أيضاً انعكاس للمجتمع
          الذي خُلق فيه. كل عمل فني، من الرسوم الصخرية إلى التثبيتات
          الرقمية المعاصرة، يحكي لنا قصة عن عصره وقيمه وتطلعاته.
          {"\n\n"}
          الثقافة، من جانبها، تشمل جميع المظاهر الإنسانية التي تعطي
          معنى لوجودنا: من التقاليد والعادات إلى المعتقدات وأساليب
          الحياة. من خلال الثقافة نبني هويتنا ونقيم روابط مع البشر الآخرين.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de cultura y arte</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🎨 Conceptos artísticos básicos:</Text>{"\n"}
          arte = فن{"\n"}
          obra = عمل{"\n"}
          artista = فنان{"\n"}
          exposición = معرض{"\n"}
          galería = صالة عرض{"\n"}
          museo = متحف{"\n"}
          colección = مجموعة{"\n"}
          autor = مؤلف{"\n"}
          creador = مبدع{"\n"}
          inspiración = إلهام
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎭 Movimientos y estilos:</Text>{"\n"}
          movimiento artístico = حركة فنية{"\n"}
          corriente artística = تيار فني{"\n"}
          estilo = أسلوب{"\n"}
          escuela = مدرسة{"\n"}
          vanguardia = طليعة{"\n"}
          clásico = كلاسيكي{"\n"}
          moderno = حديث{"\n"}
          contemporáneo = معاصر{"\n"}
          tradicional = تقليدي{"\n"}
          experimental = تجريبي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎨 Elementos visuales:</Text>{"\n"}
          composición = تكوين{"\n"}
          color = لون{"\n"}
          forma = شكل{"\n"}
          línea = خط{"\n"}
          textura = ملمس{"\n"}
          espacio = مساحة{"\n"}
          volumen = حجم{"\n"}
          perspectiva = منظور{"\n"}
          luz = ضوء{"\n"}
          sombra = ظل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏛️ Patrimonio cultural:</Text>{"\n"}
          patrimonio = تراث{"\n"}
          herencia = إرث{"\n"}
          legado = تركة{"\n"}
          conservación = حفظ{"\n"}
          restauración = ترميم{"\n"}
          preservación = صيانة{"\n"}
          monumento = نصب تذكاري{"\n"}
          sitio histórico = موقع تاريخي{"\n"}
          tradición = تقليد{"\n"}
          costumbre = عادة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💭 Análisis e interpretación:</Text>{"\n"}
          crítica = نقد{"\n"}
          análisis = تحليل{"\n"}
          interpretación = تفسير{"\n"}
          significado = معنى{"\n"}
          símbolo = رمز{"\n"}
          mensaje = رسالة{"\n"}
          contexto = سياق{"\n"}
          influencia = تأثير{"\n"}
          valoración = تقييم{"\n"}
          apreciación = تقدير
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🎨 المفاهيم الفنية الأساسية:</Text>{"\n"}
          فن = arte{"\n"}
          عمل = obra{"\n"}
          فنان = artista{"\n"}
          معرض = exposición{"\n"}
          صالة عرض = galería{"\n"}
          متحف = museo{"\n"}
          مجموعة = colección{"\n"}
          مؤلف = autor{"\n"}
          مبدع = creador{"\n"}
          إلهام = inspiración
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎭 الحركات والأساليب:</Text>{"\n"}
          حركة فنية = movimiento artístico{"\n"}
          تيار فني = corriente artística{"\n"}
          أسلوب = estilo{"\n"}
          مدرسة = escuela{"\n"}
          طليعة = vanguardia{"\n"}
          كلاسيكي = clásico{"\n"}
          حديث = moderno{"\n"}
          معاصر = contemporáneo{"\n"}
          تقليدي = tradicional{"\n"}
          تجريبي = experimental
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎨 العناصر البصرية:</Text>{"\n"}
          تكوين = composición{"\n"}
          لون = color{"\n"}
          شكل = forma{"\n"}
          خط = línea{"\n"}
          ملمس = textura{"\n"}
          مساحة = espacio{"\n"}
          حجم = volumen{"\n"}
          منظور = perspectiva{"\n"}
          ضوء = luz{"\n"}
          ظل = sombra
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏛️ التراث الثقافي:</Text>{"\n"}
          تراث = patrimonio{"\n"}
          إرث = herencia{"\n"}
          تركة = legado{"\n"}
          حفظ = conservación{"\n"}
          ترميم = restauración{"\n"}
          صيانة = preservación{"\n"}
          نصب تذكاري = monumento{"\n"}
          موقع تاريخي = sitio histórico{"\n"}
          تقليد = tradición{"\n"}
          عادة = costumbre
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💭 التحليل والتفسير:</Text>{"\n"}
          نقد = crítica{"\n"}
          تحليل = análisis{"\n"}
          تفسير = interpretación{"\n"}
          معنى = significado{"\n"}
          رمز = símbolo{"\n"}
          رسالة = mensaje{"\n"}
          سياق = contexto{"\n"}
          تأثير = influencia{"\n"}
          تقييم = valoración{"\n"}
          تقدير = apreciación
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Disciplinas artísticas principales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🎨 Artes visuales:</Text>{"\n"}
          • <Text style={styles.benefit}>Pintura:</Text> Expresión artística sobre superficies planas{"\n"}
          • <Text style={styles.benefit}>Escultura:</Text> Creación de formas tridimensionales{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Diseño y construcción de espacios{"\n"}
          • <Text style={styles.benefit}>Fotografía:</Text> Captura de imágenes mediante luz{"\n"}
          • <Text style={styles.benefit}>Grabado:</Text> Técnicas de impresión artística{"\n"}
          • <Text style={styles.benefit}>Dibujo:</Text> Representación gráfica a mano
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎵 Artes escénicas:</Text>{"\n"}
          • <Text style={styles.benefit}>Teatro:</Text> Representación dramática en vivo{"\n"}
          • <Text style={styles.benefit}>Danza:</Text> Expresión corporal rítmica{"\n"}
          • <Text style={styles.benefit}>Música:</Text> Arte de los sonidos organizados{"\n"}
          • <Text style={styles.benefit}>Ópera:</Text> Drama musical cantado{"\n"}
          • <Text style={styles.benefit}>Performance:</Text> Arte de acción en tiempo real{"\n"}
          • <Text style={styles.benefit}>Circo:</Text> Artes acrobáticas y circenses
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📚 Artes literarias:</Text>{"\n"}
          • <Text style={styles.benefit}>Poesía:</Text> Expresión lírica y rítmica{"\n"}
          • <Text style={styles.benefit}>Narrativa:</Text> Relatos y novelas{"\n"}
          • <Text style={styles.benefit}>Drama:</Text> Literatura para representación{"\n"}
          • <Text style={styles.benefit}>Ensayo:</Text> Reflexión literaria{"\n"}
          • <Text style={styles.benefit}>Crónica:</Text> Relato de eventos reales{"\n"}
          • <Text style={styles.benefit}>Biografía:</Text> Historia de vida escrita
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎬 Artes audiovisuales:</Text>{"\n"}
          • <Text style={styles.benefit}>Cine:</Text> Arte cinematográfico{"\n"}
          • <Text style={styles.benefit}>Televisión:</Text> Contenido audiovisual masivo{"\n"}
          • <Text style={styles.benefit}>Videoarte:</Text> Arte en formato video{"\n"}
          • <Text style={styles.benefit}>Animación:</Text> Creación de movimiento{"\n"}
          • <Text style={styles.benefit}>Documental:</Text> Registro de realidad{"\n"}
          • <Text style={styles.benefit}>Publicidad:</Text> Comunicación comercial creativa
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💻 Artes digitales:</Text>{"\n"}
          • <Text style={styles.benefit}>Arte digital:</Text> Creación con herramientas digitales{"\n"}
          • <Text style={styles.benefit}>Diseño gráfico:</Text> Comunicación visual digital{"\n"}
          • <Text style={styles.benefit}>Animación 3D:</Text> Creación tridimensional digital{"\n"}
          • <Text style={styles.benefit}>Videojuegos:</Text> Arte interactivo digital{"\n"}
          • <Text style={styles.benefit}>Arte generativo:</Text> Creación algorítmica{"\n"}
          • <Text style={styles.benefit}>Realidad virtual:</Text> Arte inmersivo digital
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🎨 الفنون البصرية:</Text>{"\n"}
          • <Text style={styles.benefit}>الرسم:</Text> تعبير فني على أسطح مسطحة{"\n"}
          • <Text style={styles.benefit}>النحت:</Text> خلق أشكال ثلاثية الأبعاد{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> تصميم وبناء المساحات{"\n"}
          • <Text style={styles.benefit}>التصوير:</Text> التقاط الصور بواسطة الضوء{"\n"}
          • <Text style={styles.benefit}>الطباعة:</Text> تقنيات الطباعة الفنية{"\n"}
          • <Text style={styles.benefit}>الرسم:</Text> تمثيل رسومي باليد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎵 الفنون الأدائية:</Text>{"\n"}
          • <Text style={styles.benefit}>المسرح:</Text> تمثيل درامي مباشر{"\n"}
          • <Text style={styles.benefit}>الرقص:</Text> تعبير جسدي إيقاعي{"\n"}
          • <Text style={styles.benefit}>الموسيقى:</Text> فن الأصوات المنظمة{"\n"}
          • <Text style={styles.benefit}>الأوبرا:</Text> دراما موسيقية مغناة{"\n"}
          • <Text style={styles.benefit}>الأداء:</Text> فن الفعل في الوقت الفعلي{"\n"}
          • <Text style={styles.benefit}>السيرك:</Text> الفنون البهلوانية والسيركية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📚 الفنون الأدبية:</Text>{"\n"}
          • <Text style={styles.benefit}>الشعر:</Text> تعبير غنائي وإيقاعي{"\n"}
          • <Text style={styles.benefit}>السرد:</Text> قصص وروايات{"\n"}
          • <Text style={styles.benefit}>الدراما:</Text> أدب للتمثيل{"\n"}
          • <Text style={styles.benefit}>المقال:</Text> تأمل أدبي{"\n"}
          • <Text style={styles.benefit}>الوقائع:</Text> رواية أحداث حقيقية{"\n"}
          • <Text style={styles.benefit}>السيرة الذاتية:</Text> تاريخ حياة مكتوب
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎬 الفنون السمعية البصرية:</Text>{"\n"}
          • <Text style={styles.benefit}>السينما:</Text> الفن السينمائي{"\n"}
          • <Text style={styles.benefit}>التلفزيون:</Text> محتوى سمعي بصري جماهيري{"\n"}
          • <Text style={styles.benefit}>فيديو آرت:</Text> فن بصيغة فيديو{"\n"}
          • <Text style={styles.benefit}>الرسوم المتحركة:</Text> خلق الحركة{"\n"}
          • <Text style={styles.benefit}>الوثائقي:</Text> تسجيل الواقع{"\n"}
          • <Text style={styles.benefit}>الإعلان:</Text> اتصال تجاري إبداعي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💻 الفنون الرقمية:</Text>{"\n"}
          • <Text style={styles.benefit}>الفن الرقمي:</Text> خلق بأدوات رقمية{"\n"}
          • <Text style={styles.benefit}>التصميم الجرافيكي:</Text> اتصال بصري رقمي{"\n"}
          • <Text style={styles.benefit}>الرسوم المتحركة ثلاثية الأبعاد:</Text> خلق ثلاثي الأبعاد رقمي{"\n"}
          • <Text style={styles.benefit}>ألعاب الفيديو:</Text> فن تفاعلي رقمي{"\n"}
          • <Text style={styles.benefit}>الفن التوليدي:</Text> خلق خوارزمي{"\n"}
          • <Text style={styles.benefit}>الواقع الافتراضي:</Text> فن غامر رقمي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏛️ Movimientos artísticos importantes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>🎨 Movimientos clásicos:</Text>{"\n"}
          • <Text style={styles.benefit}>Renacimiento:</Text> Recuperación de la cultura clásica{"\n"}
          • <Text style={styles.benefit}>Barroco:</Text> Arte dramático y emocional{"\n"}
          • <Text style={styles.benefit}>Neoclasicismo:</Text> Retorno a la antigüedad clásica{"\n"}
          • <Text style={styles.benefit}>Romanticismo:</Text> Expresión de emociones intensas{"\n"}
          • <Text style={styles.benefit}>Realismo:</Text> Representación objetiva de la realidad{"\n"}
          • <Text style={styles.benefit}>Impresionismo:</Text> Captura de luz y momento
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎭 Movimientos modernos:</Text>{"\n"}
          • <Text style={styles.benefit}>Cubismo:</Text> Múltiples perspectivas simultáneas{"\n"}
          • <Text style={styles.benefit}>Surrealismo:</Text> Exploración del subconsciente{"\n"}
          • <Text style={styles.benefit}>Expresionismo:</Text> Expresión de emociones internas{"\n"}
          • <Text style={styles.benefit}>Dadaísmo:</Text> Rechazo de la lógica convencional{"\n"}
          • <Text style={styles.benefit}>Futurismo:</Text> Celebración de la velocidad y tecnología{"\n"}
          • <Text style={styles.benefit}>Constructivismo:</Text> Arte al servicio de la sociedad
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎨 Movimientos contemporáneos:</Text>{"\n"}
          • <Text style={styles.benefit}>Arte abstracto:</Text> No representación de la realidad{"\n"}
          • <Text style={styles.benefit}>Pop Art:</Text> Arte inspirado en la cultura popular{"\n"}
          • <Text style={styles.benefit}>Minimalismo:</Text> Reducción a elementos esenciales{"\n"}
          • <Text style={styles.benefit}>Arte conceptual:</Text> Idea más importante que el objeto{"\n"}
          • <Text style={styles.benefit}>Performance art:</Text> Arte de acción en tiempo real{"\n"}
          • <Text style={styles.benefit}>Arte digital:</Text> Creación con tecnologías digitales
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Movimientos globales:</Text>{"\n"}
          • <Text style={styles.benefit}>Arte indígena:</Text> Expresiones de pueblos originarios{"\n"}
          • <Text style={styles.benefit}>Arte africano:</Text> Tradiciones artísticas africanas{"\n"}
          • <Text style={styles.benefit}>Arte asiático:</Text> Tradiciones orientales{"\n"}
          • <Text style={styles.benefit}>Arte islámico:</Text> Expresiones del mundo musulmán{"\n"}
          • <Text style={styles.benefit}>Arte latinoamericano:</Text> Expresiones de América Latina{"\n"}
          • <Text style={styles.benefit}>Arte contemporáneo global:</Text> Diálogo intercultural
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>🎨 الحركات الكلاسيكية:</Text>{"\n"}
          • <Text style={styles.benefit}>النهضة:</Text> استعادة الثقافة الكلاسيكية{"\n"}
          • <Text style={styles.benefit}>الباروك:</Text> فن درامي وعاطفي{"\n"}
          • <Text style={styles.benefit}>الكلاسيكية الجديدة:</Text> العودة إلى العصور القديمة{"\n"}
          • <Text style={styles.benefit}>الرومانسية:</Text> تعبير عن مشاعر شديدة{"\n"}
          • <Text style={styles.benefit}>الواقعية:</Text> تمثيل موضوعي للواقع{"\n"}
          • <Text style={styles.benefit}>الانطباعية:</Text> التقاط الضوء واللحظة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎭 الحركات الحديثة:</Text>{"\n"}
          • <Text style={styles.benefit}>التكعيبية:</Text> منظورات متعددة متزامنة{"\n"}
          • <Text style={styles.benefit}>السريالية:</Text> استكشاف اللاوعي{"\n"}
          • <Text style={styles.benefit}>التعبيرية:</Text> تعبير عن المشاعر الداخلية{"\n"}
          • <Text style={styles.benefit}>الدادية:</Text> رفض المنطق التقليدي{"\n"}
          • <Text style={styles.benefit}>المستقبلية:</Text> احتفال بالسرعة والتكنولوجيا{"\n"}
          • <Text style={styles.benefit}>البنائية:</Text> فن في خدمة المجتمع
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🎨 الحركات المعاصرة:</Text>{"\n"}
          • <Text style={styles.benefit}>الفن التجريدي:</Text> عدم تمثيل الواقع{"\n"}
          • <Text style={styles.benefit}>البوب آرت:</Text> فن مستوحى من الثقافة الشعبية{"\n"}
          • <Text style={styles.benefit}>التقليلية:</Text> تقليل إلى العناصر الأساسية{"\n"}
          • <Text style={styles.benefit}>الفن المفاهيمي:</Text> الفكرة أهم من الشيء{"\n"}
          • <Text style={styles.benefit}>فن الأداء:</Text> فن الفعل في الوقت الفعلي{"\n"}
          • <Text style={styles.benefit}>الفن الرقمي:</Text> خلق بتقنيات رقمية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 الحركات العالمية:</Text>{"\n"}
          • <Text style={styles.benefit}>الفن الأصلي:</Text> تعبيرات الشعوب الأصلية{"\n"}
          • <Text style={styles.benefit}>الفن الأفريقي:</Text> التقاليد الفنية الأفريقية{"\n"}
          • <Text style={styles.benefit}>الفن الآسيوي:</Text> التقاليد الشرقية{"\n"}
          • <Text style={styles.benefit}>الفن الإسلامي:</Text> تعبيرات العالم المسلم{"\n"}
          • <Text style={styles.benefit}>الفن اللاتيني الأمريكي:</Text> تعبيرات أمريكا اللاتينية{"\n"}
          • <Text style={styles.benefit}>الفن المعاصر العالمي:</Text> حوار بين الثقافات
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre cultura y arte</Text>
        <Text style={styles.dialogo}>
          — ¿Qué opinas sobre el papel del arte en la sociedad actual? ¿Crees que sigue siendo relevante?{"\n\n"}
          — En mi opinión, el arte es fundamental en la sociedad contemporánea porque nos permite reflexionar sobre nuestra realidad, cuestionar las normas establecidas y conectar con nuestras emociones más profundas. Aunque las formas de expresión han evolucionado, el arte sigue siendo un vehículo esencial para la expresión humana y el diálogo cultural.{"\n\n"}
          — ¿Cómo crees que la tecnología está cambiando el arte y la cultura?{"\n\n"}
          — La tecnología está transformando radicalmente el arte. El arte digital, la realidad virtual y la inteligencia artificial están abriendo nuevas posibilidades creativas. Sin embargo, creo que la esencia del arte - la expresión humana y la conexión emocional - permanece igual. La tecnología es solo una nueva herramienta para crear y compartir arte.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما رأيك في دور الفن في المجتمع الحالي؟ هل تعتقد أنه لا يزال مهماً؟{"\n\n"}
          — في رأيي، الفن أساسي في المجتمع المعاصر لأنه يسمح لنا بالتأمل في واقعنا، وتحدي المعايير المقررة والاتصال بمشاعرنا العميقة. رغم أن أشكال التعبير تطورت، الفن لا يزال وسيلة أساسية للتعبير الإنساني والحوار الثقافي.{"\n\n"}
          — كيف تعتقد أن التكنولوجيا تغير الفن والثقافة؟{"\n\n"}
          — التكنولوجيا تحول الفن بشكل جذري. الفن الرقمي والواقع الافتراضي والذكاء الاصطناعي يفتحون إمكانيات إبداعية جديدة. لكنني أعتقد أن جوهر الفن - التعبير الإنساني والاتصال العاطفي - يبقى كما هو. التكنولوجيا مجرد أداة جديدة لخلق ومشاركة الفن.
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
