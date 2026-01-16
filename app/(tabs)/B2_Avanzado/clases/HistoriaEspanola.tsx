import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

const ejercicios = [
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año terminó la Reconquista con la toma de Granada?",
    opciones: ["1492", "1469", "1516", "1479"],
    respuesta_correcta: "1492"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién fue el primer rey de la dinastía de los Borbones en España?",
    opciones: ["Felipe V", "Carlos III", "Fernando VI", "Carlos IV"],
    respuesta_correcta: "Felipe V"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año comenzó la Guerra Civil Española?",
    opciones: ["1936", "1939", "1931", "1945"],
    respuesta_correcta: "1936"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué imperio gobernó España durante el siglo XVI?",
    opciones: ["Imperio Romano", "Imperio Español", "Imperio Austrohúngaro", "Imperio Otomano"],
    respuesta_correcta: "Imperio Español"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién fue el primer emperador del Sacro Imperio Romano Germánico de la dinastía Habsburgo?",
    opciones: ["Carlos I", "Felipe II", "Fernando el Católico", "Isabel la Católica"],
    respuesta_correcta: "Carlos I"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año se descubrió América?",
    opciones: ["1492", "1493", "1491", "1494"],
    respuesta_correcta: "1492"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué reyes unificaron España en 1469?",
    opciones: ["Isabel y Fernando", "Carlos y Juana", "Felipe y María", "Alfonso y Leonor"],
    respuesta_correcta: "Isabel y Fernando"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué dinastía gobernó España durante el Siglo de Oro?",
    opciones: ["Los Borbones", "Los Habsburgo", "Los Trastámara", "Los Austrias"],
    respuesta_correcta: "Los Habsburgo"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año se proclamó la Segunda República Española?",
    opciones: ["1931", "1936", "1923", "1939"],
    respuesta_correcta: "1931"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién fue el primer rey de la dinastía Habsburgo en España?",
    opciones: ["Carlos I", "Felipe II", "Fernando el Católico", "Maximiliano I"],
    respuesta_correcta: "Carlos I"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué tratado puso fin a la Guerra de los Treinta Años?",
    opciones: ["Tratado de Westfalia", "Tratado de Utrecht", "Tratado de París", "Tratado de Versalles"],
    respuesta_correcta: "Tratado de Westfalia"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año se promulgó la Constitución de Cádiz?",
    opciones: ["1812", "1808", "1814", "1820"],
    respuesta_correcta: "1812"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué rey español fue conocido como 'El Rey Planeta'?",
    opciones: ["Felipe II", "Felipe IV", "Carlos II", "Felipe III"],
    respuesta_correcta: "Felipe IV"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año terminó la Guerra Civil Española?",
    opciones: ["1936", "1939", "1940", "1938"],
    respuesta_correcta: "1939"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué rey español abdicó en 2014?",
    opciones: ["Juan Carlos I", "Felipe VI", "Alfonso XIII", "Carlos IV"],
    respuesta_correcta: "Juan Carlos I"
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada período histórico con su época:",
    pares: [
      {"izquierda": "🏰 Edad Media", "derecha": "Siglos V-XV"},
      {"izquierda": "🌟 Renacimiento", "derecha": "Siglos XV-XVI"},
      {"izquierda": "💎 Siglo de Oro", "derecha": "Siglos XVI-XVII"},
      {"izquierda": "🌹 Ilustración", "derecha": "Siglo XVIII"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada rey con su período:",
    pares: [
      {"izquierda": "👑 Isabel la Católica", "derecha": "Reconquista y descubrimiento"},
      {"izquierda": "⚡ Carlos I", "derecha": "Imperio universal"},
      {"izquierda": "💎 Felipe II", "derecha": "Máximo esplendor"},
      {"izquierda": "🏛️ Carlos III", "derecha": "Reformas ilustradas"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada evento histórico con su fecha:",
    pares: [
      {"izquierda": "🗺️ Descubrimiento de América", "derecha": "1492"},
      {"izquierda": "⚔️ Toma de Granada", "derecha": "1492"},
      {"izquierda": "📜 Constitución de Cádiz", "derecha": "1812"},
      {"izquierda": "🏛️ Segunda República", "derecha": "1931"}
    ]
  }
];

export default function HistoriaEspanola() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[2] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 2);
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
        source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de historia y monumentos"
      />
      
      <Text style={styles.title}>🏛️ Historia Española</Text>
      <Text style={styles.titleAr}>🏛️ التاريخ الإسباني</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la historia española</Text>
        <Text style={styles.sectionText}>
          La historia de España es una de las más ricas y complejas de Europa, 
          marcada por la convivencia de diferentes culturas y civilizaciones. 
          Desde los primeros pobladores hasta la actualidad, España ha sido 
          un cruce de caminos entre Europa, África y América.
          {"\n\n"}
          La historia española ha influido profundamente en la historia mundial, 
          especialmente durante el período del Imperio Español, cuando España 
          fue la primera potencia global. El legado cultural, artístico y 
          lingüístico de España se extiende por todo el mundo hispanohablante.
        </Text>
        <Text style={styles.sectionTextAr}>
          تاريخ إسبانيا هو واحد من أغنى وأكثر التواريخ تعقيداً في أوروبا،
          مميز بالتعايش بين ثقافات وحضارات مختلفة. من أول السكان
          حتى الوقت الحاضر، كانت إسبانيا تقاطع طرق بين أوروبا
          وأفريقيا وأمريكا.
          {"\n\n"}
          أثر التاريخ الإسباني بعمق في التاريخ العالمي، خاصة
          خلال فترة الإمبراطورية الإسبانية، عندما كانت إسبانيا
          القوة العالمية الأولى. الإرث الثقافي والفني واللغوي
          لإسبانيا يمتد عبر العالم الناطق بالإسبانية.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de historia</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>👑 Términos monárquicos:</Text>{"\n"}
          rey = ملك{"\n"}
          reina = ملكة{"\n"}
          dinastía = سلالة{"\n"}
          corona = تاج{"\n"}
          trono = عرش{"\n"}
          monarquía = ملكية{"\n"}
          reinado = حكم{"\n"}
          abdicación = تنازل{"\n"}
          sucesión = خلافة{"\n"}
          nobleza = نبلاء
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ Términos militares:</Text>{"\n"}
          guerra = حرب{"\n"}
          batalla = معركة{"\n"}
          conquista = فتح{"\n"}
          reconquista = استرداد{"\n"}
          imperio = إمبراطورية{"\n"}
          colonia = مستعمرة{"\n"}
          territorio = إقليم{"\n"}
          frontera = حدود{"\n"}
          alianza = تحالف{"\n"}
          tratado = معاهدة
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ Términos políticos:</Text>{"\n"}
          república = جمهورية{"\n"}
          democracia = ديمقراطية{"\n"}
          constitución = دستور{"\n"}
          parlamento = برلمان{"\n"}
          gobierno = حكومة{"\n"}
          revolución = ثورة{"\n"}
          reforma = إصلاح{"\n"}
          independencia = استقلال{"\n"}
          soberanía = سيادة{"\n"}
          autonomía = حكم ذاتي
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>👑 المصطلحات الملكية:</Text>{"\n"}
          ملك = rey{"\n"}
          ملكة = reina{"\n"}
          سلالة = dinastía{"\n"}
          تاج = corona{"\n"}
          عرش = trono{"\n"}
          ملكية = monarquía{"\n"}
          حكم = reinado{"\n"}
          تنازل = abdicación{"\n"}
          خلافة = sucesión{"\n"}
          نبلاء = nobleza
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ المصطلحات العسكرية:</Text>{"\n"}
          حرب = guerra{"\n"}
          معركة = batalla{"\n"}
          فتح = conquista{"\n"}
          استرداد = reconquista{"\n"}
          إمبراطورية = imperio{"\n"}
          مستعمرة = colonia{"\n"}
          إقليم = territorio{"\n"}
          حدود = frontera{"\n"}
          تحالف = alianza{"\n"}
          معاهدة = tratado
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ المصطلحات السياسية:</Text>{"\n"}
          جمهورية = república{"\n"}
          ديمقراطية = democracia{"\n"}
          دستور = constitución{"\n"}
          برلمان = parlamento{"\n"}
          حكومة = gobierno{"\n"}
          ثورة = revolución{"\n"}
          إصلاح = reforma{"\n"}
          استقلال = independencia{"\n"}
          سيادة = soberanía{"\n"}
          حكم ذاتي = autonomía
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏰 La Reconquista (Siglos VIII-XV)</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⚔️ Orígenes de la Reconquista:</Text>{"\n"}
          • <Text style={styles.benefit}>711:</Text> Invasión musulmana de la península{"\n"}
          • <Text style={styles.benefit}>722:</Text> Batalla de Covadonga, inicio de la resistencia{"\n"}
          • <Text style={styles.benefit}>Reinos cristianos:</Text> Asturias, León, Castilla, Aragón{"\n"}
          • <Text style={styles.benefit}>Al-Ándalus:</Text> Territorio musulmán en la península{"\n"}
          • <Text style={styles.benefit}>Proceso gradual:</Text> Ocho siglos de lucha
          {"\n\n"}
          <Text style={styles.subtitle}>👑 Reyes Católicos (1469-1516):</Text>{"\n"}
          • <Text style={styles.benefit}>Isabel de Castilla:</Text> Reina de Castilla desde 1474{"\n"}
          • <Text style={styles.benefit}>Fernando de Aragón:</Text> Rey de Aragón desde 1479{"\n"}
          • <Text style={styles.benefit}>Unificación:</Text> Matrimonio en 1469{"\n"}
          • <Text style={styles.benefit}>1492:</Text> Toma de Granada, fin de la Reconquista{"\n"}
          • <Text style={styles.benefit}>Descubrimiento:</Text> Colón llega a América{"\n"}
          • <Text style={styles.benefit}>Inquisición:</Text> Tribunal religioso establecido
          {"\n\n"}
          <Text style={styles.subtitle}>🌟 Legado de la Reconquista:</Text>{"\n"}
          • <Text style={styles.benefit}>Arquitectura:</Text> Estilo mudéjar y gótico{"\n"}
          • <Text style={styles.benefit}>Lengua:</Text> Influencia árabe en el español{"\n"}
          • <Text style={styles.benefit}>Cultura:</Text> Convivencia de tres religiones{"\n"}
          • <Text style={styles.benefit}>Gastronomía:</Text> Influencias árabes y judías{"\n"}
          • <Text style={styles.benefit}>Ciencia:</Text> Avances en matemáticas y medicina
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⚔️ أصول الاسترداد:</Text>{"\n"}
          • <Text style={styles.benefit}>711:</Text> الغزو الإسلامي لشبه الجزيرة{"\n"}
          • <Text style={styles.benefit}>722:</Text> معركة كوفادونغا، بداية المقاومة{"\n"}
          • <Text style={styles.benefit}>الممالك المسيحية:</Text> أستورياس، ليون، قشتالة، أراغون{"\n"}
          • <Text style={styles.benefit}>الأندلس:</Text> الأراضي الإسلامية في شبه الجزيرة{"\n"}
          • <Text style={styles.benefit}>عملية تدريجية:</Text> ثمانية قرون من النضال
          {"\n\n"}
          <Text style={styles.subtitle}>👑 الملوك الكاثوليك (1469-1516):</Text>{"\n"}
          • <Text style={styles.benefit}>إيزابيلا من قشتالة:</Text> ملكة قشتالة من 1474{"\n"}
          • <Text style={styles.benefit}>فرناندو من أراغون:</Text> ملك أراغون من 1479{"\n"}
          • <Text style={styles.benefit}>التوحيد:</Text> زواج في 1469{"\n"}
          • <Text style={styles.benefit}>1492:</Text> فتح غرناطة، نهاية الاسترداد{"\n"}
          • <Text style={styles.benefit}>الاكتشاف:</Text> كولومبوس يصل إلى أمريكا{"\n"}
          • <Text style={styles.benefit}>محاكم التفتيش:</Text> محكمة دينية أنشئت
          {"\n\n"}
          <Text style={styles.subtitle}>🌟 إرث الاسترداد:</Text>{"\n"}
          • <Text style={styles.benefit}>العمارة:</Text> الطراز المدجن والقوطي{"\n"}
          • <Text style={styles.benefit}>اللغة:</Text> التأثير العربي في الإسبانية{"\n"}
          • <Text style={styles.benefit}>الثقافة:</Text> تعايش ثلاث ديانات{"\n"}
          • <Text style={styles.benefit}>المطبخ:</Text> تأثيرات عربية ويهودية{"\n"}
          • <Text style={styles.benefit}>العلم:</Text> تقدم في الرياضيات والطب
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💎 El Imperio Español (Siglos XVI-XVII)</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⚡ Carlos I (1516-1556):</Text>{"\n"}
          • <Text style={styles.benefit}>Herencia:</Text> España, Países Bajos, Austria{"\n"}
          • <Text style={styles.benefit}>Coronación:</Text> Emperador del Sacro Imperio Romano{"\n"}
          • <Text style={styles.benefit}>Guerras:</Text> Contra Francia y los turcos{"\n"}
          • <Text style={styles.benefit}>Reforma:</Text> Lucha contra el protestantismo{"\n"}
          • <Text style={styles.benefit}>Abdicación:</Text> En 1556, divide el imperio{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Primer imperio global
          {"\n\n"}
          <Text style={styles.subtitle}>💎 Felipe II (1556-1598):</Text>{"\n"}
          • <Text style={styles.benefit}>Máximo esplendor:</Text> España como primera potencia{"\n"}
          • <Text style={styles.benefit}>Armada Invencible:</Text> Derrota contra Inglaterra (1588){"\n"}
          • <Text style={styles.benefit}>Guerras:</Text> Contra Países Bajos, Francia, Inglaterra{"\n"}
          • <Text style={styles.benefit}>Felipe II:</Text> Rey más poderoso de Europa{"\n"}
          • <Text style={styles.benefit}>El Escorial:</Text> Palacio-monasterio construido{"\n"}
          • <Text style={styles.benefit}>Crisis:</Text> Inicio del declive económico
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Expansión colonial:</Text>{"\n"}
          • <Text style={styles.benefit}>América:</Text> Conquista de México y Perú{"\n"}
          • <Text style={styles.benefit}>Filipinas:</Text> Colonización desde 1565{"\n"}
          • <Text style={styles.benefit}>Comercio:</Text> Ruta de las especias{"\n"}
          • <Text style={styles.benefit}>Plata:</Text> Minas de Potosí y Zacatecas{"\n"}
          • <Text style={styles.benefit}>Cultura:</Text> Evangelización y mestizaje{"\n"}
          • <Text style={styles.benefit}>Lengua:</Text> Difusión del español
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⚡ كارلوس الأول (1516-1556):</Text>{"\n"}
          • <Text style={styles.benefit}>الميراث:</Text> إسبانيا، هولندا، النمسا{"\n"}
          • <Text style={styles.benefit}>التتويج:</Text> إمبراطور الإمبراطورية الرومانية المقدسة{"\n"}
          • <Text style={styles.benefit}>الحروب:</Text> ضد فرنسا والأتراك{"\n"}
          • <Text style={styles.benefit}>الإصلاح:</Text> النضال ضد البروتستانتية{"\n"}
          • <Text style={styles.benefit}>التنازل:</Text> في 1556، يقسم الإمبراطورية{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> أول إمبراطورية عالمية
          {"\n\n"}
          <Text style={styles.subtitle}>💎 فيليب الثاني (1556-1598):</Text>{"\n"}
          • <Text style={styles.benefit}>أقصى ازدهار:</Text> إسبانيا كأول قوة{"\n"}
          • <Text style={styles.benefit}>الأرمادا المنهزمة:</Text> هزيمة ضد إنجلترا (1588){"\n"}
          • <Text style={styles.benefit}>الحروب:</Text> ضد هولندا، فرنسا، إنجلترا{"\n"}
          • <Text style={styles.benefit}>فيليب الثاني:</Text> أقوى ملك في أوروبا{"\n"}
          • <Text style={styles.benefit}>الإسكوريال:</Text> قصر-دير مبني{"\n"}
          • <Text style={styles.benefit}>الأزمة:</Text> بداية الانحدار الاقتصادي
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 التوسع الاستعماري:</Text>{"\n"}
          • <Text style={styles.benefit}>أمريكا:</Text> فتح المكسيك وبيرو{"\n"}
          • <Text style={styles.benefit}>الفلبين:</Text> استعمار من 1565{"\n"}
          • <Text style={styles.benefit}>التجارة:</Text> طريق التوابل{"\n"}
          • <Text style={styles.benefit}>الفضة:</Text> مناجم بوتوسي وزاكاتيكاس{"\n"}
          • <Text style={styles.benefit}>الثقافة:</Text> التبشير والاختلاط{"\n"}
          • <Text style={styles.benefit}>اللغة:</Text> انتشار الإسبانية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌹 La Ilustración y el siglo XVIII</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏛️ Carlos III (1759-1788):</Text>{"\n"}
          • <Text style={styles.benefit}>Rey ilustrado:</Text> Promotor de reformas{"\n"}
          • <Text style={styles.benefit}>Reformas:</Text> Modernización del estado{"\n"}
          • <Text style={styles.benefit}>Educación:</Text> Mejora de la enseñanza{"\n"}
          • <Text style={styles.benefit}>Infraestructura:</Text> Carreteras y canales{"\n"}
          • <Text style={styles.benefit}>Madrid:</Text> Transformación urbanística{"\n"}
          • <Text style={styles.benefit}>Cultura:</Text> Apoyo a las artes y ciencias
          {"\n\n"}
          <Text style={styles.subtitle}>📚 La Ilustración española:</Text>{"\n"}
          • <Text style={styles.benefit}>Feijoo:</Text> Escritor y pensador ilustrado{"\n"}
          • <Text style={styles.benefit}>Jovellanos:</Text> Político y reformador{"\n"}
          • <Text style={styles.benefit}>Real Academia:</Text> Fundación de academias{"\n"}
          • <Text style={styles.benefit}>Ciencia:</Text> Avances en medicina y botánica{"\n"}
          • <Text style={styles.benefit}>Arte:</Text> Estilo neoclásico{"\n"}
          • <Text style={styles.benefit}>Pensamiento:</Text> Racionalismo y progreso
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ Guerras del siglo XVIII:</Text>{"\n"}
          • <Text style={styles.benefit}>Guerra de Sucesión:</Text> 1701-1714{"\n"}
          • <Text style={styles.benefit}>Tratado de Utrecht:</Text> 1713, pérdida de territorios{"\n"}
          • <Text style={styles.benefit}>Guerra de los Siete Años:</Text> 1756-1763{"\n"}
          • <Text style={styles.benefit}>Independencia de EE.UU.:</Text> Apoyo español{"\n"}
          • <Text style={styles.benefit}>Declive:</Text> Pérdida de hegemonía europea{"\n"}
          • <Text style={styles.benefit}>Crisis:</Text> Preparación para el siglo XIX
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏛️ كارلوس الثالث (1759-1788):</Text>{"\n"}
          • <Text style={styles.benefit}>ملك مستنير:</Text> داعم للإصلاحات{"\n"}
          • <Text style={styles.benefit}>الإصلاحات:</Text> تحديث الدولة{"\n"}
          • <Text style={styles.benefit}>التعليم:</Text> تحسين التدريس{"\n"}
          • <Text style={styles.benefit}>البنية التحتية:</Text> طرق وقنوات{"\n"}
          • <Text style={styles.benefit}>مدريد:</Text> تحول عمراني{"\n"}
          • <Text style={styles.benefit}>الثقافة:</Text> دعم الفنون والعلوم
          {"\n\n"}
          <Text style={styles.subtitle}>📚 التنوير الإسباني:</Text>{"\n"}
          • <Text style={styles.benefit}>فيخو:</Text> كاتب ومفكر مستنير{"\n"}
          • <Text style={styles.benefit}>خوفيلانوس:</Text> سياسي ومصلح{"\n"}
          • <Text style={styles.benefit}>الأكاديمية الملكية:</Text> تأسيس أكاديميات{"\n"}
          • <Text style={styles.benefit}>العلم:</Text> تقدم في الطب وعلم النبات{"\n"}
          • <Text style={styles.benefit}>الفن:</Text> الطراز الكلاسيكي الجديد{"\n"}
          • <Text style={styles.benefit}>الفكر:</Text> العقلانية والتقدم
          {"\n\n"}
          <Text style={styles.subtitle}>⚔️ حروب القرن الثامن عشر:</Text>{"\n"}
          • <Text style={styles.benefit}>حرب الخلافة:</Text> 1701-1714{"\n"}
          • <Text style={styles.benefit}>معاهدة أوترخت:</Text> 1713، خسارة أراضي{"\n"}
          • <Text style={styles.benefit}>حرب السبع سنوات:</Text> 1756-1763{"\n"}
          • <Text style={styles.benefit}>استقلال الولايات المتحدة:</Text> دعم إسباني{"\n"}
          • <Text style={styles.benefit}>الانحدار:</Text> خسارة الهيمنة الأوروبية{"\n"}
          • <Text style={styles.benefit}>الأزمة:</Text> استعداد للقرن التاسع عشر
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📜 El siglo XIX: Revoluciones y cambios</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⚔️ Guerra de la Independencia (1808-1814):</Text>{"\n"}
          • <Text style={styles.benefit}>Invasión francesa:</Text> Napoleón ocupa España{"\n"}
          • <Text style={styles.benefit}>2 de Mayo:</Text> Levantamiento en Madrid{"\n"}
          • <Text style={styles.benefit}>Guerrillas:</Text> Resistencia popular{"\n"}
          • <Text style={styles.benefit}>Constitución de Cádiz:</Text> 1812, primera constitución{"\n"}
          • <Text style={styles.benefit}>Wellington:</Text> Ejército británico ayuda{"\n"}
          • <Text style={styles.benefit}>Independencia:</Text> Restauración de Fernando VII
          {"\n\n"}
          <Text style={styles.subtitle}>🔄 El siglo XIX turbulento:</Text>{"\n"}
          • <Text style={styles.benefit}>Fernando VII:</Text> Absolutismo restaurado{"\n"}
          • <Text style={styles.benefit}>Isabel II:</Text> Reinado conflictivo (1833-1868){"\n"}
          • <Text style={styles.benefit}>Guerras carlistas:</Text> Conflictos dinásticos{"\n"}
          • <Text style={styles.benefit}>Revolución de 1868:</Text> "La Gloriosa"{"\n"}
          • <Text style={styles.benefit}>Primera República:</Text> 1873-1874{"\n"}
          • <Text style={styles.benefit}>Restauración:</Text> Alfonso XII (1874-1885)
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Pérdida del imperio colonial:</Text>{"\n"}
          • <Text style={styles.benefit}>Independencias:</Text> América Latina (1810-1825){"\n"}
          • <Text style={styles.benefit}>Cuba:</Text> Guerra de 1898{"\n"}
          • <Text style={styles.benefit}>Filipinas:</Text> Pérdida en 1898{"\n"}
          • <Text style={styles.benefit}>Puerto Rico:</Text> Cedido a EE.UU.{"\n"}
          • <Text style={styles.benefit}>Desastre del 98:</Text> Crisis nacional{"\n"}
          • <Text style={styles.benefit}>Regeneracionismo:</Text> Movimiento intelectual
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⚔️ حرب الاستقلال (1808-1814):</Text>{"\n"}
          • <Text style={styles.benefit}>الغزو الفرنسي:</Text> نابليون يحتل إسبانيا{"\n"}
          • <Text style={styles.benefit}>2 مايو:</Text> انتفاضة في مدريد{"\n"}
          • <Text style={styles.benefit}>حرب العصابات:</Text> مقاومة شعبية{"\n"}
          • <Text style={styles.benefit}>دستور قادس:</Text> 1812، أول دستور{"\n"}
          • <Text style={styles.benefit}>ويلينغتون:</Text> الجيش البريطاني يساعد{"\n"}
          • <Text style={styles.benefit}>الاستقلال:</Text> استعادة فرناندو السابع
          {"\n\n"}
          <Text style={styles.subtitle}>🔄 القرن التاسع عشر المضطرب:</Text>{"\n"}
          • <Text style={styles.benefit}>فرناندو السابع:</Text> استعادة الاستبداد{"\n"}
          • <Text style={styles.benefit}>إيزابيل الثانية:</Text> حكم صراعي (1833-1868){"\n"}
          • <Text style={styles.benefit}>حروب الكارلية:</Text> صراعات سلالية{"\n"}
          • <Text style={styles.benefit}>ثورة 1868:</Text> "المجيدة"{"\n"}
          • <Text style={styles.benefit}>الجمهورية الأولى:</Text> 1873-1874{"\n"}
          • <Text style={styles.benefit}>الاستعادة:</Text> ألفونسو الثاني عشر (1874-1885)
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 خسارة الإمبراطورية الاستعمارية:</Text>{"\n"}
          • <Text style={styles.benefit}>الاستقلالات:</Text> أمريكا اللاتينية (1810-1825){"\n"}
          • <Text style={styles.benefit}>كوبا:</Text> حرب 1898{"\n"}
          • <Text style={styles.benefit}>الفلبين:</Text> خسارة في 1898{"\n"}
          • <Text style={styles.benefit}>بورتوريكو:</Text> تنازل للولايات المتحدة{"\n"}
          • <Text style={styles.benefit}>كارثة 98:</Text> أزمة وطنية{"\n"}
          • <Text style={styles.benefit}>التجديد:</Text> حركة فكرية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏛️ El siglo XX: Dictadura y democracia</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⚔️ Guerra Civil Española (1936-1939):</Text>{"\n"}
          • <Text style={styles.benefit}>Golpe de Estado:</Text> 18 de julio de 1936{"\n"}
          • <Text style={styles.benefit}>Bando nacional:</Text> Franco y los sublevados{"\n"}
          • <Text style={styles.benefit}>Bando republicano:</Text> Gobierno legítimo{"\n"}
          • <Text style={styles.benefit}>Intervención extranjera:</Text> Alemania e Italia{"\n"}
          • <Text style={styles.benefit}>Brigadas Internacionales:</Text> Voluntarios extranjeros{"\n"}
          • <Text style={styles.benefit}>Victoria franquista:</Text> 1 de abril de 1939
          {"\n\n"}
          <Text style={styles.subtitle}>👑 Dictadura de Franco (1939-1975):</Text>{"\n"}
          • <Text style={styles.benefit}>Régimen autoritario:</Text> 36 años de dictadura{"\n"}
          • <Text style={styles.benefit}>Aislamiento internacional:</Text> 1945-1953{"\n"}
          • <Text style={styles.benefit}>Desarrollo económico:</Text> Planes de desarrollo{"\n"}
          • <Text style={styles.benefit}>Turismo:</Text> Apertura económica en los 60{"\n"}
          • <Text style={styles.benefit}>Represión:</Text> Censura y persecución política{"\n"}
          • <Text style={styles.benefit}>Muerte de Franco:</Text> 20 de noviembre de 1975
          {"\n\n"}
          <Text style={styles.subtitle}>🌹 Transición democrática:</Text>{"\n"}
          • <Text style={styles.benefit}>Juan Carlos I:</Text> Rey desde 1975{"\n"}
          • <Text style={styles.benefit}>Adolfo Suárez:</Text> Presidente del gobierno{"\n"}
          • <Text style={styles.benefit}>Constitución de 1978:</Text> Nueva democracia{"\n"}
          • <Text style={styles.benefit}>Estado de las Autonomías:</Text> Descentralización{"\n"}
          • <Text style={styles.benefit}>Integración europea:</Text> UE desde 1986{"\n"}
          • <Text style={styles.benefit}>Modernización:</Text> España contemporánea
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⚔️ الحرب الأهلية الإسبانية (1936-1939):</Text>{"\n"}
          • <Text style={styles.benefit}>انقلاب عسكري:</Text> 18 يوليو 1936{"\n"}
          • <Text style={styles.benefit}>الجانب الوطني:</Text> فرانكو والمتمردون{"\n"}
          • <Text style={styles.benefit}>الجانب الجمهوري:</Text> الحكومة الشرعية{"\n"}
          • <Text style={styles.benefit}>التدخل الأجنبي:</Text> ألمانيا وإيطاليا{"\n"}
          • <Text style={styles.benefit}>الألوية الدولية:</Text> متطوعون أجانب{"\n"}
          • <Text style={styles.benefit}>انتصار فرانكو:</Text> 1 أبريل 1939
          {"\n\n"}
          <Text style={styles.subtitle}>👑 ديكتاتورية فرانكو (1939-1975):</Text>{"\n"}
          • <Text style={styles.benefit}>نظام استبدادي:</Text> 36 سنة من الديكتاتورية{"\n"}
          • <Text style={styles.benefit}>العزلة الدولية:</Text> 1945-1953{"\n"}
          • <Text style={styles.benefit}>التنمية الاقتصادية:</Text> خطط التنمية{"\n"}
          • <Text style={styles.benefit}>السياحة:</Text> الانفتاح الاقتصادي في الستينيات{"\n"}
          • <Text style={styles.benefit}>القمع:</Text> الرقابة والاضطهاد السياسي{"\n"}
          • <Text style={styles.benefit}>وفاة فرانكو:</Text> 20 نوفمبر 1975
          {"\n\n"}
          <Text style={styles.subtitle}>🌹 الانتقال الديمقراطي:</Text>{"\n"}
          • <Text style={styles.benefit}>خوان كارلوس الأول:</Text> ملك من 1975{"\n"}
          • <Text style={styles.benefit}>أدولفو سواريز:</Text> رئيس الحكومة{"\n"}
          • <Text style={styles.benefit}>دستور 1978:</Text> ديمقراطية جديدة{"\n"}
          • <Text style={styles.benefit}>دولة الحكم الذاتي:</Text> اللامركزية{"\n"}
          • <Text style={styles.benefit}>الاندماج الأوروبي:</Text> الاتحاد الأوروبي من 1986{"\n"}
          • <Text style={styles.benefit}>التحديث:</Text> إسبانيا المعاصرة
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
