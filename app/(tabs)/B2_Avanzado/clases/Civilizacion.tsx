import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

const ejercicios = [
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización construyó la Alhambra de Granada?",
    opciones: ["Los romanos", "Los árabes", "Los visigodos", "Los celtas"],
    respuesta_correcta: "Los árabes"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización introdujo el cristianismo en España?",
    opciones: ["Los romanos", "Los visigodos", "Los árabes", "Los fenicios"],
    respuesta_correcta: "Los romanos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización gobernó España durante 800 años?",
    opciones: ["Los romanos", "Los visigodos", "Los árabes", "Los celtas"],
    respuesta_correcta: "Los árabes"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización construyó el acueducto de Segovia?",
    opciones: ["Los romanos", "Los árabes", "Los visigodos", "Los fenicios"],
    respuesta_correcta: "Los romanos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización fundó Cartago Nova (Cartagena)?",
    opciones: ["Los cartagineses", "Los romanos", "Los fenicios", "Los griegos"],
    respuesta_correcta: "Los cartagineses"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización introdujo el sistema de numeración decimal en Europa?",
    opciones: ["Los árabes", "Los romanos", "Los griegos", "Los fenicios"],
    respuesta_correcta: "Los árabes"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización construyó el teatro de Mérida?",
    opciones: ["Los romanos", "Los griegos", "Los árabes", "Los visigodos"],
    respuesta_correcta: "Los romanos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización introdujo el cultivo de la vid en España?",
    opciones: ["Los fenicios", "Los romanos", "Los griegos", "Los cartagineses"],
    respuesta_correcta: "Los fenicios"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización estableció el primer reino cristiano en España?",
    opciones: ["Los visigodos", "Los romanos", "Los suevos", "Los vándalos"],
    respuesta_correcta: "Los visigodos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización introdujo el sistema de riego en Al-Ándalus?",
    opciones: ["Los árabes", "Los romanos", "Los visigodos", "Los beréberes"],
    respuesta_correcta: "Los árabes"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización fundó Ampurias (Emporion)?",
    opciones: ["Los griegos", "Los fenicios", "Los cartagineses", "Los romanos"],
    respuesta_correcta: "Los griegos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización introdujo el latín en la península?",
    opciones: ["Los romanos", "Los visigodos", "Los árabes", "Los fenicios"],
    respuesta_correcta: "Los romanos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización construyó la mezquita de Córdoba?",
    opciones: ["Los árabes", "Los visigodos", "Los romanos", "Los beréberes"],
    respuesta_correcta: "Los árabes"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización introdujo el cultivo del olivo en España?",
    opciones: ["Los fenicios", "Los griegos", "Los romanos", "Los cartagineses"],
    respuesta_correcta: "Los fenicios"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué civilización estableció la capital en Toledo?",
    opciones: ["Los visigodos", "Los romanos", "Los árabes", "Los suevos"],
    respuesta_correcta: "Los visigodos"
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada civilización con su legado:",
    pares: [
      {"izquierda": "🏛️ Romanos", "derecha": "Derecho, arquitectura, latín"},
      {"izquierda": "🕌 Árabes", "derecha": "Ciencia, matemáticas, arte"},
      {"izquierda": "⚔️ Visigodos", "derecha": "Cristianismo, monarquía"},
      {"izquierda": "🌊 Fenicios", "derecha": "Comercio, navegación"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada monumento con su civilización:",
    pares: [
      {"izquierda": "🏛️ Acueducto de Segovia", "derecha": "Romanos"},
      {"izquierda": "🕌 Alhambra de Granada", "derecha": "Árabes"},
      {"izquierda": "⚔️ Iglesia de San Juan de Baños", "derecha": "Visigodos"},
      {"izquierda": "🏺 Teatro de Ampurias", "derecha": "Griegos"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada aportación con su civilización:",
    pares: [
      {"izquierda": "📚 Sistema de numeración decimal", "derecha": "Árabes"},
      {"izquierda": "🏛️ Derecho romano", "derecha": "Romanos"},
      {"izquierda": "⚔️ Monarquía electiva", "derecha": "Visigodos"},
      {"izquierda": "🌊 Comercio marítimo", "derecha": "Fenicios"}
    ]
  }
];

export default function Civilizacion() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[12] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 12);
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
    <ScrollView style={{ backgroundColor: '#f5f7fa' }} contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B2_Avanzado')}
        accessibilityLabel="Volver al menú B2: Avanzado"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de civilización y monumentos"
      />
      
      <Text style={styles.title}>🏛️ Civilización Española</Text>
      <Text style={styles.titleAr}>🏛️ الحضارة الإسبانية</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la civilización española</Text>
        <Text style={styles.sectionText}>
          La civilización española es el resultado de la fusión de múltiples 
          culturas y civilizaciones que han dejado su huella en la península 
          ibérica a lo largo de los siglos. Desde los primeros pobladores 
          hasta la actualidad, España ha sido un crisol de culturas.
          {"\n\n"}
          La riqueza cultural de España se debe a la influencia de romanos, 
          visigodos, árabes, judíos y otras civilizaciones que han 
          contribuido a crear una identidad cultural única y diversa. 
          Este legado se refleja en el arte, la arquitectura, la lengua 
          y las tradiciones españolas.
        </Text>
        <Text style={styles.sectionTextAr}>
          الحضارة الإسبانية هي نتيجة اندماج ثقافات وحضارات متعددة
          تركت بصمتها في شبه الجزيرة الأيبيرية عبر القرون. من أول
          السكان حتى الوقت الحاضر، كانت إسبانيا بوتقة انصهار للثقافات.
          {"\n\n"}
          ثراء إسبانيا الثقافي يرجع لتأثير الرومان والقوط الغربيين
          والعرب واليهود وحضارات أخرى ساهمت في خلق هوية ثقافية
          فريدة ومتنوعة. هذا الإرث ينعكس في الفن والعمارة واللغة
          والتقاليد الإسبانية.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de civilización</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏛️ Términos históricos:</Text>{"\n"}
          civilización = حضارة{"\n"}
          cultura = ثقافة{"\n"}
          imperio = إمبراطورية{"\n"}
          reino = مملكة{"\n"}
          colonia = مستعمرة{"\n"}
          conquista = فتح{"\n"}
          invasión = غزو{"\n"}
          legado = إرث{"\n"}
          influencia = تأثير{"\n"}
          tradición = تقليد
          {"\n\n"}
          <Text style={styles.subtitle}>🏺 Términos arqueológicos:</Text>{"\n"}
          yacimiento = موقع أثري{"\n"}
          ruinas = أطلال{"\n"}
          monumento = نصب تذكاري{"\n"}
          templo = معبد{"\n"}
          palacio = قصر{"\n"}
          fortaleza = قلعة{"\n"}
          muralla = سور{"\n"}
          acueducto = قناة مياه{"\n"}
          teatro = مسرح{"\n"}
          anfiteatro = مدرج
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Términos culturales:</Text>{"\n"}
          mestizaje = اختلاط{"\n"}
          sincretismo = توفيقية{"\n"}
          convivencia = تعايش{"\n"}
          tolerancia = تسامح{"\n"}
          diversidad = تنوع{"\n"}
          identidad = هوية{"\n"}
          patrimonio = تراث{"\n"}
          herencia = ميراث{"\n"}
          evolución = تطور{"\n"}
          transformación = تحول
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏛️ المصطلحات التاريخية:</Text>{"\n"}
          حضارة = civilización{"\n"}
          ثقافة = cultura{"\n"}
          إمبراطورية = imperio{"\n"}
          مملكة = reino{"\n"}
          مستعمرة = colonia{"\n"}
          فتح = conquista{"\n"}
          غزو = invasión{"\n"}
          إرث = legado{"\n"}
          تأثير = influencia{"\n"}
          تقليد = tradición
          {"\n\n"}
          <Text style={styles.subtitle}>🏺 المصطلحات الأثرية:</Text>{"\n"}
          موقع أثري = yacimiento{"\n"}
          أطلال = ruinas{"\n"}
          نصب تذكاري = monumento{"\n"}
          معبد = templo{"\n"}
          قصر = palacio{"\n"}
          قلعة = fortaleza{"\n"}
          سور = muralla{"\n"}
          قناة مياه = acueducto{"\n"}
          مسرح = teatro{"\n"}
          مدرج = anfiteatro
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 المصطلحات الثقافية:</Text>{"\n"}
          اختلاط = mestizaje{"\n"}
          توفيقية = sincretismo{"\n"}
          تعايش = convivencia{"\n"}
          تسامح = tolerancia{"\n"}
          تنوع = diversidad{"\n"}
          هوية = identidad{"\n"}
          تراث = patrimonio{"\n"}
          ميراث = herencia{"\n"}
          تطور = evolución{"\n"}
          تحول = transformación
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌊 Civilizaciones prerromanas</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌊 Fenicios (Siglos XII-VI a.C.):</Text>{"\n"}
          • <Text style={styles.benefit}>Origen:</Text> Líbano, navegantes comerciales{"\n"}
          • <Text style={styles.benefit}>Colonias:</Text> Gadir (Cádiz), Malaka (Málaga){"\n"}
          • <Text style={styles.benefit}>Comercio:</Text> Metales, sal, productos del mar{"\n"}
          • <Text style={styles.benefit}>Aportaciones:</Text> Alfabeto, cultivo de la vid{"\n"}
          • <Text style={styles.benefit}>Navegación:</Text> Técnicas marítimas avanzadas{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Base del comercio mediterráneo
          {"\n\n"}
          <Text style={styles.subtitle}>🏺 Griegos (Siglos VIII-III a.C.):</Text>{"\n"}
          • <Text style={styles.benefit}>Emporion:</Text> Ampurias, colonia comercial{"\n"}
          • <Text style={styles.benefit}>Cultura:</Text> Arte, filosofía, democracia{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Templos y teatros{"\n"}
          • <Text style={styles.benefit}>Comercio:</Text> Cerámica, aceite, vino{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Arte y pensamiento helénico{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Conceptos democráticos
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ Cartagineses (Siglos VI-III a.C.):</Text>{"\n"}
          • <Text style={styles.benefit}>Cartago Nova:</Text> Cartagena, capital{"\n"}
          • <Text style={styles.benefit}>Guerras púnicas:</Text> Conflictos con Roma{"\n"}
          • <Text style={styles.benefit}>Comercio:</Text> Metales, sal, productos agrícolas{"\n"}
          • <Text style={styles.benefit}>Aníbal:</Text> General famoso{"\n"}
          • <Text style={styles.benefit}>Derrota:</Text> 202 a.C., fin de la presencia{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Técnicas militares y comerciales
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌊 الفينيقيون (القرون 12-6 ق.م):</Text>{"\n"}
          • <Text style={styles.benefit}>الأصل:</Text> لبنان، تجار بحريون{"\n"}
          • <Text style={styles.benefit}>المستعمرات:</Text> غادير (قادس)، مالاكا (مالقة){"\n"}
          • <Text style={styles.benefit}>التجارة:</Text> معادن، ملح، منتجات بحرية{"\n"}
          • <Text style={styles.benefit}>المساهمات:</Text> الأبجدية، زراعة العنب{"\n"}
          • <Text style={styles.benefit}>الملاحة:</Text> تقنيات بحرية متقدمة{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> أساس التجارة المتوسطية
          {"\n\n"}
          <Text style={styles.subtitle}>🏺 الإغريق (القرون 8-3 ق.م):</Text>{"\n"}
          • <Text style={styles.benefit}>إمبوريوم:</Text> أمبورياس، مستعمرة تجارية{"\n"}
          • <Text style={styles.benefit}>الثقافة:</Text> فن، فلسفة، ديمقراطية{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> معابد ومسارح{"\n"}
          • <Text style={styles.benefit}>التجارة:</Text> خزف، زيت، نبيذ{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> الفن والفكر الهيليني{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> مفاهيم ديمقراطية
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ القرطاجيون (القرون 6-3 ق.م):</Text>{"\n"}
          • <Text style={styles.benefit}>قرطاجنة الجديدة:</Text> قرطاجنة، العاصمة{"\n"}
          • <Text style={styles.benefit}>الحروب البونية:</Text> صراعات مع روما{"\n"}
          • <Text style={styles.benefit}>التجارة:</Text> معادن، ملح، منتجات زراعية{"\n"}
          • <Text style={styles.benefit}>حنبعل:</Text> قائد مشهور{"\n"}
          • <Text style={styles.benefit}>الهزيمة:</Text> 202 ق.م، نهاية الوجود{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> تقنيات عسكرية وتجارية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏛️ Hispania Romana (Siglos III a.C.-V d.C.)</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⚔️ Conquista romana:</Text>{"\n"}
          • <Text style={styles.benefit}>218 a.C.:</Text> Desembarco en Ampurias{"\n"}
          • <Text style={styles.benefit}>Guerras púnicas:</Text> Derrota de Cartago{"\n"}
          • <Text style={styles.benefit}>Resistencia:</Text> Numancia, Viriato{"\n"}
          • <Text style={styles.benefit}>19 a.C.:</Text> Conquista completa{"\n"}
          • <Text style={styles.benefit}>Romanización:</Text> Proceso cultural{"\n"}
          • <Text style={styles.benefit}>División:</Text> Hispania Citerior y Ulterior
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ Aportaciones romanas:</Text>{"\n"}
          • <Text style={styles.benefit}>Derecho:</Text> Sistema legal romano{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Acueductos, teatros, calzadas{"\n"}
          • <Text style={styles.benefit}>Lengua:</Text> Latín, origen del español{"\n"}
          • <Text style={styles.benefit}>Religión:</Text> Cristianismo desde el siglo IV{"\n"}
          • <Text style={styles.benefit}>Administración:</Text> Sistema provincial{"\n"}
          • <Text style={styles.benefit}>Urbanismo:</Text> Ciudades planificadas
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ Ciudades romanas:</Text>{"\n"}
          • <Text style={styles.benefit}>Tarraco:</Text> Tarragona, capital provincial{"\n"}
          • <Text style={styles.benefit}>Emerita Augusta:</Text> Mérida, capital{"\n"}
          • <Text style={styles.benefit}>Hispalis:</Text> Sevilla, importante puerto{"\n"}
          • <Text style={styles.benefit}>Corduba:</Text> Córdoba, centro cultural{"\n"}
          • <Text style={styles.benefit}>Barcino:</Text> Barcelona, colonia{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Monumentos y urbanismo
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⚔️ الفتح الروماني:</Text>{"\n"}
          • <Text style={styles.benefit}>218 ق.م:</Text> إنزال في أمبورياس{"\n"}
          • <Text style={styles.benefit}>الحروب البونية:</Text> هزيمة قرطاج{"\n"}
          • <Text style={styles.benefit}>المقاومة:</Text> نومانسيا، فيرياتوس{"\n"}
          • <Text style={styles.benefit}>19 ق.م:</Text> فتح كامل{"\n"}
          • <Text style={styles.benefit}>الرومنة:</Text> عملية ثقافية{"\n"}
          • <Text style={styles.benefit}>التقسيم:</Text> هيسبانيا القريبة والبعيدة
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ المساهمات الرومانية:</Text>{"\n"}
          • <Text style={styles.benefit}>القانون:</Text> النظام القانوني الروماني{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> قنوات مياه، مسارح، طرق{"\n"}
          • <Text style={styles.benefit}>اللغة:</Text> اللاتينية، أصل الإسبانية{"\n"}
          • <Text style={styles.benefit}>الدين:</Text> المسيحية من القرن الرابع{"\n"}
          • <Text style={styles.benefit}>الإدارة:</Text> النظام الإقليمي{"\n"}
          • <Text style={styles.benefit}>التخطيط العمراني:</Text> مدن مخطط لها
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ المدن الرومانية:</Text>{"\n"}
          • <Text style={styles.benefit}>تاراكو:</Text> طراغونة، عاصمة إقليمية{"\n"}
          • <Text style={styles.benefit}>إميريتا أوغوستا:</Text> ميريدا، عاصمة{"\n"}
          • <Text style={styles.benefit}>هيسباليس:</Text> إشبيلية، ميناء مهم{"\n"}
          • <Text style={styles.benefit}>كوردوبا:</Text> قرطبة، مركز ثقافي{"\n"}
          • <Text style={styles.benefit}>بارسينو:</Text> برشلونة، مستعمرة{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> نصب تذكارية وتخطيط عمراني
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚔️ Reino Visigodo (Siglos V-VIII)</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⚔️ Llegada de los visigodos:</Text>{"\n"}
          • <Text style={styles.benefit}>410:</Text> Saqueo de Roma por Alarico{"\n"}
          • <Text style={styles.benefit}>418:</Text> Establecimiento en Aquitania{"\n"}
          • <Text style={styles.benefit}>507:</Text> Derrota ante los francos{"\n"}
          • <Text style={styles.benefit}>Toledo:</Text> Capital del reino{"\n"}
          • <Text style={styles.benefit}>Unificación:</Text> Control de toda Hispania{"\n"}
          • <Text style={styles.benefit}>Conversión:</Text> Al catolicismo en 589
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ Organización política:</Text>{"\n"}
          • <Text style={styles.benefit}>Monarquía electiva:</Text> Reyes elegidos{"\n"}
          • <Text style={styles.benefit}>Aula Regia:</Text> Consejo de nobles{"\n"}
          • <Text style={styles.benefit}>Concilios:</Text> Asambleas eclesiásticas{"\n"}
          • <Text style={styles.benefit}>Código de Leovigildo:</Text> Primera legislación{"\n"}
          • <Text style={styles.benefit}>Liber Iudiciorum:</Text> Código legal unificado{"\n"}
          • <Text style={styles.benefit}>Inestabilidad:</Text> Luchas internas
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ Legado visigodo:</Text>{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Iglesias prerrománicas{"\n"}
          • <Text style={styles.benefit}>Arte:</Text> Orfebrería y escultura{"\n"}
          • <Text style={styles.benefit}>Derecho:</Text> Influencia en el derecho medieval{"\n"}
          • <Text style={styles.benefit}>Religión:</Text> Consolidación del catolicismo{"\n"}
          • <Text style={styles.benefit}>Lengua:</Text> Influencia germánica{"\n"}
          • <Text style={styles.benefit}>Cultura:</Text> Fusión romano-germánica
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⚔️ وصول القوط الغربيين:</Text>{"\n"}
          • <Text style={styles.benefit}>410:</Text> نهب روما من قبل ألاريك{"\n"}
          • <Text style={styles.benefit}>418:</Text> استقرار في آكيتانيا{"\n"}
          • <Text style={styles.benefit}>507:</Text> هزيمة أمام الفرنجة{"\n"}
          • <Text style={styles.benefit}>طليطلة:</Text> عاصمة المملكة{"\n"}
          • <Text style={styles.benefit}>التوحيد:</Text> السيطرة على كل هيسبانيا{"\n"}
          • <Text style={styles.benefit}>التحول:</Text> إلى الكاثوليكية في 589
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ التنظيم السياسي:</Text>{"\n"}
          • <Text style={styles.benefit}>ملكية انتخابية:</Text> ملوك منتخبون{"\n"}
          • <Text style={styles.benefit}>أولا ريجيا:</Text> مجلس النبلاء{"\n"}
          • <Text style={styles.benefit}>المجالس:</Text> جمعيات كنسية{"\n"}
          • <Text style={styles.benefit}>قانون ليوفيجيلدو:</Text> أول تشريع{"\n"}
          • <Text style={styles.benefit}>ليبر إيوديسيوروم:</Text> قانون موحد{"\n"}
          • <Text style={styles.benefit}>عدم الاستقرار:</Text> صراعات داخلية
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ إرث القوط الغربيين:</Text>{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> كنائس ما قبل الرومانسكية{"\n"}
          • <Text style={styles.benefit}>الفن:</Text> صياغة ونحت{"\n"}
          • <Text style={styles.benefit}>القانون:</Text> تأثير في القانون الوسيطي{"\n"}
          • <Text style={styles.benefit}>الدين:</Text> ترسيخ الكاثوليكية{"\n"}
          • <Text style={styles.benefit}>اللغة:</Text> تأثير جرماني{"\n"}
          • <Text style={styles.benefit}>الثقافة:</Text> اندماج روماني-جرماني
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🕌 Al-Ándalus (Siglos VIII-XV)</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🕌 Conquista musulmana:</Text>{"\n"}
          • <Text style={styles.benefit}>711:</Text> Desembarco de Tariq ibn Ziyad{"\n"}
          • <Text style={styles.benefit}>Batalla de Guadalete:</Text> Derrota visigoda{"\n"}
          • <Text style={styles.benefit}>Expansión rápida:</Text> Control en 5 años{"\n"}
          • <Text style={styles.benefit}>Emirato:</Text> Dependiente de Damasco{"\n"}
          • <Text style={styles.benefit}>Califato:</Text> Independiente desde 929{"\n"}
          • <Text style={styles.benefit}>Reinos de taifas:</Text> Fragmentación
          {"\n\n"}
          <Text style={styles.subtitle}>🕌 Aportaciones culturales:</Text>{"\n"}
          • <Text style={styles.benefit}>Ciencia:</Text> Matemáticas, medicina, astronomía{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Mezquitas, palacios, alcazabas{"\n"}
          • <Text style={styles.benefit}>Agricultura:</Text> Sistemas de riego{"\n"}
          • <Text style={styles.benefit}>Lengua:</Text> Influencia árabe en español{"\n"}
          • <Text style={styles.benefit}>Filosofía:</Text> Averroes, Maimónides{"\n"}
          • <Text style={styles.benefit}>Arte:</Text> Geometría, arabescos
          {"\n\n"}
          <Text style={styles.subtitle}>🕌 Ciudades andalusíes:</Text>{"\n"}
          • <Text style={styles.benefit}>Córdoba:</Text> Capital del califato{"\n"}
          • <Text style={styles.benefit}>Granada:</Text> Reino nazarí{"\n"}
          • <Text style={styles.benefit}>Sevilla:</Text> Importante centro{"\n"}
          • <Text style={styles.benefit}>Toledo:</Text> Ciudad de las tres culturas{"\n"}
          • <Text style={styles.benefit}>Zaragoza:</Text> Reino de taifa{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Monumentos y cultura
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🕌 الفتح الإسلامي:</Text>{"\n"}
          • <Text style={styles.benefit}>711:</Text> إنزال طارق بن زياد{"\n"}
          • <Text style={styles.benefit}>معركة وادي لكه:</Text> هزيمة القوط الغربيين{"\n"}
          • <Text style={styles.benefit}>توسع سريع:</Text> سيطرة في 5 سنوات{"\n"}
          • <Text style={styles.benefit}>الإمارة:</Text> تابعة لدمشق{"\n"}
          • <Text style={styles.benefit}>الخلافة:</Text> مستقلة من 929{"\n"}
          • <Text style={styles.benefit}>ملوك الطوائف:</Text> تجزؤ
          {"\n\n"}
          <Text style={styles.subtitle}>🕌 المساهمات الثقافية:</Text>{"\n"}
          • <Text style={styles.benefit}>العلم:</Text> رياضيات، طب، فلك{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> مساجد، قصور، قصبات{"\n"}
          • <Text style={styles.benefit}>الزراعة:</Text> أنظمة ري{"\n"}
          • <Text style={styles.benefit}>اللغة:</Text> تأثير عربي في الإسبانية{"\n"}
          • <Text style={styles.benefit}>الفلسفة:</Text> ابن رشد، موسى بن ميمون{"\n"}
          • <Text style={styles.benefit}>الفن:</Text> هندسة، زخارف عربية
          {"\n\n"}
          <Text style={styles.subtitle}>🕌 المدن الأندلسية:</Text>{"\n"}
          • <Text style={styles.benefit}>قرطبة:</Text> عاصمة الخلافة{"\n"}
          • <Text style={styles.benefit}>غرناطة:</Text> مملكة بني نصر{"\n"}
          • <Text style={styles.benefit}>إشبيلية:</Text> مركز مهم{"\n"}
          • <Text style={styles.benefit}>طليطلة:</Text> مدينة الثقافات الثلاث{"\n"}
          • <Text style={styles.benefit}>سرقسطة:</Text> مملكة طائفة{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> نصب تذكارية وثقافة
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Ejercicios Interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido sobre la civilización española con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته حول الحضارة الإسبانية مع هذه التمارين التفاعلية.</Text>
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
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    width: '100%',
    overflow: 'hidden',
  },
  finishButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
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
