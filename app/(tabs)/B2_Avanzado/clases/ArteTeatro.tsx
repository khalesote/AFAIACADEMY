import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

const ejercicios = [
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién pintó 'Las Meninas'?",
    opciones: ["Diego Velázquez", "Francisco de Goya", "El Greco", "Salvador Dalí"],
    respuesta_correcta: "Diego Velázquez"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué artista español es conocido por el surrealismo?",
    opciones: ["Pablo Picasso", "Salvador Dalí", "Joan Miró", "Antoni Gaudí"],
    respuesta_correcta: "Salvador Dalí"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién diseñó la Sagrada Familia en Barcelona?",
    opciones: ["Antoni Gaudí", "Santiago Calatrava", "Ricardo Bofill", "Rafael Moneo"],
    respuesta_correcta: "Antoni Gaudí"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra de teatro escribió Federico García Lorca?",
    opciones: ["La casa de Bernarda Alba", "Don Quijote", "La vida es sueño", "Fuenteovejuna"],
    respuesta_correcta: "La casa de Bernarda Alba"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué siglo vivió El Greco?",
    opciones: ["Siglo XV", "Siglo XVI", "Siglo XVII", "Siglo XVIII"],
    respuesta_correcta: "Siglo XVI"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué estilo arquitectónico desarrolló Antoni Gaudí?",
    opciones: ["Gótico", "Renacentista", "Modernismo", "Barroco"],
    respuesta_correcta: "Modernismo"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién pintó 'El Guernica'?",
    opciones: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Francisco de Goya"],
    respuesta_correcta: "Pablo Picasso"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra de teatro escribió Calderón de la Barca?",
    opciones: ["La vida es sueño", "Fuenteovejuna", "La casa de Bernarda Alba", "Don Quijote"],
    respuesta_correcta: "La vida es sueño"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué ciudad nació Salvador Dalí?",
    opciones: ["Madrid", "Barcelona", "Figueres", "Valencia"],
    respuesta_correcta: "Figueres"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué artista español es conocido como 'El Greco'?",
    opciones: ["Domenikos Theotokopoulos", "Diego Velázquez", "Francisco de Goya", "Bartolomé Esteban Murillo"],
    respuesta_correcta: "Domenikos Theotokopoulos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra de teatro escribió Lope de Vega?",
    opciones: ["Fuenteovejuna", "La vida es sueño", "La casa de Bernarda Alba", "Don Quijote"],
    respuesta_correcta: "Fuenteovejuna"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué año se inició la construcción de la Sagrada Familia?",
    opciones: ["1882", "1892", "1902", "1912"],
    respuesta_correcta: "1882"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué movimiento artístico fundó Pablo Picasso junto con Georges Braque?",
    opciones: ["Surrealismo", "Cubismo", "Expresionismo", "Fauvismo"],
    respuesta_correcta: "Cubismo"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué artista español pintó 'Los fusilamientos del 3 de mayo'?",
    opciones: ["Francisco de Goya", "Diego Velázquez", "El Greco", "Salvador Dalí"],
    respuesta_correcta: "Francisco de Goya"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué ciudad se encuentra el Museo del Prado?",
    opciones: ["Barcelona", "Madrid", "Valencia", "Sevilla"],
    respuesta_correcta: "Madrid"
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada artista con su estilo:",
    pares: [
      {"izquierda": "🎨 Pablo Picasso", "derecha": "Cubismo"},
      {"izquierda": "🖼️ Salvador Dalí", "derecha": "Surrealismo"},
      {"izquierda": "🏛️ Antoni Gaudí", "derecha": "Modernismo"},
      {"izquierda": "🎭 Lope de Vega", "derecha": "Teatro barroco"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada obra con su autor:",
    pares: [
      {"izquierda": "🖼️ Las Meninas", "derecha": "Diego Velázquez"},
      {"izquierda": "🏛️ Sagrada Familia", "derecha": "Antoni Gaudí"},
      {"izquierda": "🎭 La casa de Bernarda Alba", "derecha": "Federico García Lorca"},
      {"izquierda": "🎨 El Guernica", "derecha": "Pablo Picasso"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada período artístico con su época:",
    pares: [
      {"izquierda": "🎭 Siglo de Oro", "derecha": "Siglos XVI-XVII"},
      {"izquierda": "🏛️ Modernismo", "derecha": "Finales del XIX"},
      {"izquierda": "🎨 Vanguardias", "derecha": "Siglo XX"},
      {"izquierda": "🖼️ Barroco", "derecha": "Siglo XVII"}
    ]
  }
];

export default function ArteTeatro() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[5] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 5);
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
        accessibilityLabel="Imagen de arte y teatro"
      />
      
      <Text style={styles.title}>🎨 Arte y Teatro</Text>
      <Text style={styles.titleAr}>🎨 الفن والمسرح</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia del arte y teatro español</Text>
        <Text style={styles.sectionText}>
          El arte y teatro español han sido fundamentales en el desarrollo 
          de la cultura occidental. Desde los pintores del Siglo de Oro 
          hasta los artistas contemporáneos, España ha producido obras 
          maestras que han influido en el arte mundial.
          {"\n\n"}
          El teatro español, especialmente durante el Siglo de Oro, 
          creó formas dramáticas únicas que siguen siendo representadas 
          en todo el mundo. La tradición teatral española combina 
          elementos populares con profundidad filosófica.
        </Text>
        <Text style={styles.sectionTextAr}>
          الفن والمسرح الإسباني كانا أساسيين في تطوير الثقافة
          الغربية. من رسامي العصر الذهبي حتى الفنانين المعاصرين،
          أنتجت إسبانيا روائع أثرت في الفن العالمي.
          {"\n\n"}
          المسرح الإسباني، خاصة خلال العصر الذهبي، خلق
          أشكالاً درامية فريدة ما زالت تُعرض في جميع أنحاء
          العالم. التقليد المسرحي الإسباني يجمع بين العناصر
          الشعبية والعمق الفلسفي.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de arte y teatro</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎨 Términos artísticos:</Text>{"\n"}
          pintura = رسم{"\n"}
          escultura = نحت{"\n"}
          arquitectura = عمارة{"\n"}
          lienzo = قماش{"\n"}
          pincel = فرشاة{"\n"}
          paleta = لوحة ألوان{"\n"}
          perspectiva = منظور{"\n"}
          composición = تكوين{"\n"}
          estilo = أسلوب{"\n"}
          movimiento = حركة فنية
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Términos teatrales:</Text>{"\n"}
          obra = مسرحية{"\n"}
          acto = فصل{"\n"}
          escena = مشهد{"\n"}
          personaje = شخصية{"\n"}
          diálogo = حوار{"\n"}
          monólogo = مونولوج{"\n"}
          escenario = خشبة المسرح{"\n"}
          telón = ستارة{"\n"}
          vestuario = أزياء{"\n"}
          iluminación = إضاءة
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ Estilos arquitectónicos:</Text>{"\n"}
          románico = رومانسكي{"\n"}
          gótico = قوطي{"\n"}
          renacentista = نهضوي{"\n"}
          barroco = باروك{"\n"}
          neoclásico = كلاسيكي جديد{"\n"}
          modernismo = حداثة{"\n"}
          contemporáneo = معاصر{"\n"}
          vanguardista = طليعي{"\n"}
          minimalista = بسيط{"\n"}
          posmoderno = ما بعد الحداثة
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎨 المصطلحات الفنية:</Text>{"\n"}
          رسم = pintura{"\n"}
          نحت = escultura{"\n"}
          عمارة = arquitectura{"\n"}
          قماش = lienzo{"\n"}
          فرشاة = pincel{"\n"}
          لوحة ألوان = paleta{"\n"}
          منظور = perspectiva{"\n"}
          تكوين = composición{"\n"}
          أسلوب = estilo{"\n"}
          حركة فنية = movimiento
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 المصطلحات المسرحية:</Text>{"\n"}
          مسرحية = obra{"\n"}
          فصل = acto{"\n"}
          مشهد = escena{"\n"}
          شخصية = personaje{"\n"}
          حوار = diálogo{"\n"}
          مونولوج = monólogo{"\n"}
          خشبة المسرح = escenario{"\n"}
          ستارة = telón{"\n"}
          أزياء = vestuario{"\n"}
          إضاءة = iluminación
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ الأنماط المعمارية:</Text>{"\n"}
          رومانسكي = románico{"\n"}
          قوطي = gótico{"\n"}
          نهضوي = renacentista{"\n"}
          باروك = barroco{"\n"}
          كلاسيكي جديد = neoclásico{"\n"}
          حداثة = modernismo{"\n"}
          معاصر = contemporáneo{"\n"}
          طليعي = vanguardista{"\n"}
          بسيط = minimalista{"\n"}
          ما بعد الحداثة = posmoderno
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Pintura del Siglo de Oro</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🖼️ Diego Velázquez (1599-1660):</Text>{"\n"}
          • <Text style={styles.benefit}>Las Meninas:</Text> Obra maestra del arte universal{"\n"}
          • <Text style={styles.benefit}>Pintor de cámara:</Text> Artista oficial de Felipe IV{"\n"}
          • <Text style={styles.benefit}>Realismo:</Text> Captura la realidad con precisión{"\n"}
          • <Text style={styles.benefit}>Técnica:</Text> Pincelada suelta y luminosa{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Precursor del impresionismo{"\n"}
          • <Text style={styles.benefit}>Obras:</Text> Retratos, mitología, historia
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 El Greco (1541-1614):</Text>{"\n"}
          • <Text style={styles.benefit}>Domenikos Theotokopoulos:</Text> Nombre real{"\n"}
          • <Text style={styles.benefit}>Origen:</Text> Creta, formación en Italia{"\n"}
          • <Text style={styles.benefit}>Estilo único:</Text> Figuras alargadas y expresivas{"\n"}
          • <Text style={styles.benefit}>Toledo:</Text> Ciudad donde desarrolló su obra{"\n"}
          • <Text style={styles.benefit}>Misticismo:</Text> Pintura religiosa intensa{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Influencia en el expresionismo
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 Francisco de Goya (1746-1828):</Text>{"\n"}
          • <Text style={styles.benefit}>Pintor de la corte:</Text> Carlos III y Carlos IV{"\n"}
          • <Text style={styles.benefit}>Los fusilamientos:</Text> Denuncia de la guerra{"\n"}
          • <Text style={styles.benefit}>Pinturas negras:</Text> Obras oscuras y dramáticas{"\n"}
          • <Text style={styles.benefit}>Grabados:</Text> Los caprichos y los desastres{"\n"}
          • <Text style={styles.benefit}>Transición:</Text> Del rococó al romanticismo{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Precursor del arte moderno
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🖼️ دييغو فيلاثكيث (1599-1660):</Text>{"\n"}
          • <Text style={styles.benefit}>لاس مينيناس:</Text> تحفة الفن العالمي{"\n"}
          • <Text style={styles.benefit}>رسام البلاط:</Text> فنان فيليب الرابع الرسمي{"\n"}
          • <Text style={styles.benefit}>الواقعية:</Text> يلتقط الواقع بدقة{"\n"}
          • <Text style={styles.benefit}>التقنية:</Text> ضربة فرشاة فضفاضة ومضيئة{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> سابق الانطباعية{"\n"}
          • <Text style={styles.benefit}>الأعمال:</Text> صور، أساطير، تاريخ
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 إل غريكو (1541-1614):</Text>{"\n"}
          • <Text style={styles.benefit}>دومينيكوس ثيوتوكوبولوس:</Text> الاسم الحقيقي{"\n"}
          • <Text style={styles.benefit}>الأصل:</Text> كريت، تدريب في إيطاليا{"\n"}
          • <Text style={styles.benefit}>أسلوب فريد:</Text> شخصيات ممدودة ومعبرة{"\n"}
          • <Text style={styles.benefit}>طليطلة:</Text> المدينة حيث طور عمله{"\n"}
          • <Text style={styles.benefit}>التصوف:</Text> رسم ديني مكثف{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> تأثير في التعبيرية
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 فرانسيسكو دي غويا (1746-1828):</Text>{"\n"}
          • <Text style={styles.benefit}>رسام البلاط:</Text> كارلوس الثالث والرابع{"\n"}
          • <Text style={styles.benefit}>الإعدامات:</Text> إدانة الحرب{"\n"}
          • <Text style={styles.benefit}>اللوحات السوداء:</Text> أعمال مظلمة ودرامية{"\n"}
          • <Text style={styles.benefit}>النقوش:</Text> النزوات والكوارث{"\n"}
          • <Text style={styles.benefit}>الانتقال:</Text> من الروكوكو إلى الرومانسية{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> سابق الفن الحديث
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Teatro del Siglo de Oro</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎭 Lope de Vega (1562-1635):</Text>{"\n"}
          • <Text style={styles.benefit}>Fénix de los Ingenios:</Text> Apodo por su productividad{"\n"}
          • <Text style={styles.benefit}>Fuenteovejuna:</Text> Drama sobre la rebelión popular{"\n"}
          • <Text style={styles.benefit}>Comedia nueva:</Text> Creó el género teatral español{"\n"}
          • <Text style={styles.benefit}>Productividad:</Text> Más de 1.500 obras{"\n"}
          • <Text style={styles.benefit}>Temas:</Text> Honor, amor, justicia social{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Padre del teatro español
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Calderón de la Barca (1600-1681):</Text>{"\n"}
          • <Text style={styles.benefit}>La vida es sueño:</Text> Drama filosófico{"\n"}
          • <Text style={styles.benefit}>Autos sacramentales:</Text> Teatro religioso{"\n"}
          • <Text style={styles.benefit}>Barroco literario:</Text> Máximo exponente{"\n"}
          • <Text style={styles.benefit}>Temas:</Text> Libertad, destino, honor{"\n"}
          • <Text style={styles.benefit}>Estructura:</Text> Obras complejas y simbólicas{"\n"}
          • <Text style={styles.benefit}>Legado:</Text> Profundidad filosófica
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Tirso de Molina (1579-1648):</Text>{"\n"}
          • <Text style={styles.benefit}>El burlador de Sevilla:</Text> Creó el mito de Don Juan{"\n"}
          • <Text style={styles.benefit}>Comedias:</Text> Obras de enredo y humor{"\n"}
          • <Text style={styles.benefit}>Temas:</Text> Amor, honor, justicia{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Combinación de serio y cómico{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Precursor de Molière{"\n"}
          • <Text style={styles.benefit}>Obras:</Text> Más de 300 piezas teatrales
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎭 لوبي دي فيغا (1562-1635):</Text>{"\n"}
          • <Text style={styles.benefit}>فينيكس دي لوس إنجينيوس:</Text> لقب لإنتاجيته{"\n"}
          • <Text style={styles.benefit}>فونت أوفيخونا:</Text> دراما عن التمرد الشعبي{"\n"}
          • <Text style={styles.benefit}>كوميديا جديدة:</Text> خلق النوع المسرحي الإسباني{"\n"}
          • <Text style={styles.benefit}>الإنتاجية:</Text> أكثر من 1500 عمل{"\n"}
          • <Text style={styles.benefit}>المواضيع:</Text> الشرف، الحب، العدالة الاجتماعية{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> أب المسرح الإسباني
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 كالديرون دي لا باركا (1600-1681):</Text>{"\n"}
          • <Text style={styles.benefit}>الحياة حلم:</Text> دراما فلسفية{"\n"}
          • <Text style={styles.benefit}>أوتوس ساكرامنتاليس:</Text> مسرح ديني{"\n"}
          • <Text style={styles.benefit}>الباروك الأدبي:</Text> أبرز ممثل{"\n"}
          • <Text style={styles.benefit}>المواضيع:</Text> الحرية، المصير، الشرف{"\n"}
          • <Text style={styles.benefit}>البنية:</Text> أعمال معقدة ورمزية{"\n"}
          • <Text style={styles.benefit}>الإرث:</Text> عمق فلسفي
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 تيرسو دي مولينا (1579-1648):</Text>{"\n"}
          • <Text style={styles.benefit}>إل بورلادور دي سيفيا:</Text> خلق أسطورة دون خوان{"\n"}
          • <Text style={styles.benefit}>كوميديات:</Text> أعمال من نوع الالتباس والفكاهة{"\n"}
          • <Text style={styles.benefit}>المواضيع:</Text> الحب، الشرف، العدالة{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> مزيج من الجاد والهزلي{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> سابق مولير{"\n"}
          • <Text style={styles.benefit}>الأعمال:</Text> أكثر من 300 قطعة مسرحية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏛️ Arquitectura española</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🏛️ Antoni Gaudí (1852-1926):</Text>{"\n"}
          • <Text style={styles.benefit}>Sagrada Familia:</Text> Obra maestra inacabada{"\n"}
          • <Text style={styles.benefit}>Modernismo catalán:</Text> Estilo único{"\n"}
          • <Text style={styles.benefit}>Naturaleza:</Text> Inspiración en formas orgánicas{"\n"}
          • <Text style={styles.benefit}>Casa Batlló:</Text> Arquitectura fantástica{"\n"}
          • <Text style={styles.benefit}>Park Güell:</Text> Parque público artístico{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Arquitectura orgánica
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ Santiago Calatrava (1951-):</Text>{"\n"}
          • <Text style={styles.benefit}>Arquitecto e ingeniero:</Text> Formación dual{"\n"}
          • <Text style={styles.benefit}>Ciudad de las Artes:</Text> Valencia{"\n"}
          • <Text style={styles.benefit}>Puentes:</Text> Obras de ingeniería artística{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Futurista y orgánico{"\n"}
          • <Text style={styles.benefit}>Materiales:</Text> Hormigón y acero{"\n"}
          • <Text style={styles.benefit}>Internacional:</Text> Obras en todo el mundo
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ Rafael Moneo (1937-):</Text>{"\n"}
          • <Text style={styles.benefit}>Museo del Prado:</Text> Ampliación{"\n"}
          • <Text style={styles.benefit}>Premio Pritzker:</Text> 1996{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Contemporáneo y contextual{"\n"}
          • <Text style={styles.benefit}>Teoría:</Text> Arquitectura como disciplina{"\n"}
          • <Text style={styles.benefit}>Obras:</Text> Museos, auditorios, estaciones{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Arquitectura racional
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🏛️ أنطوني غاودي (1852-1926):</Text>{"\n"}
          • <Text style={styles.benefit}>ساغرادا فاميليا:</Text> تحفة غير مكتملة{"\n"}
          • <Text style={styles.benefit}>الحداثة الكاتالونية:</Text> أسلوب فريد{"\n"}
          • <Text style={styles.benefit}>الطبيعة:</Text> إلهام من الأشكال العضوية{"\n"}
          • <Text style={styles.benefit}>كاسا باتيو:</Text> عمارة خيالية{"\n"}
          • <Text style={styles.benefit}>بارك غويل:</Text> حديقة عامة فنية{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> عمارة عضوية
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ سانتياغو كالاترافا (1951-):</Text>{"\n"}
          • <Text style={styles.benefit}>مهندس معماري ومهندس:</Text> تدريب مزدوج{"\n"}
          • <Text style={styles.benefit}>مدينة الفنون:</Text> بلنسية{"\n"}
          • <Text style={styles.benefit}>جسور:</Text> أعمال هندسية فنية{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> مستقبلي وعضوي{"\n"}
          • <Text style={styles.benefit}>المواد:</Text> خرسانة وفولاذ{"\n"}
          • <Text style={styles.benefit}>دولي:</Text> أعمال في جميع أنحاء العالم
          {"\n\n"}
          <Text style={styles.subtitle}>🏛️ رافائيل مونيو (1937-):</Text>{"\n"}
          • <Text style={styles.benefit}>متحف ديل برادو:</Text> توسعة{"\n"}
          • <Text style={styles.benefit}>جائزة بريتزكر:</Text> 1996{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> معاصر وسياقي{"\n"}
          • <Text style={styles.benefit}>النظرية:</Text> العمارة كتخصص{"\n"}
          • <Text style={styles.benefit}>الأعمال:</Text> متاحف، قاعات، محطات{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> عمارة عقلانية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Vanguardias del siglo XX</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎨 Pablo Picasso (1881-1973):</Text>{"\n"}
          • <Text style={styles.benefit}>Cubismo:</Text> Fundador junto con Braque{"\n"}
          • <Text style={styles.benefit}>El Guernica:</Text> Denuncia de la guerra{"\n"}
          • <Text style={styles.benefit}>Períodos:</Text> Azul, rosa, cubista, surrealista{"\n"}
          • <Text style={styles.benefit}>Málaga:</Text> Ciudad natal{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Revolucionó el arte moderno{"\n"}
          • <Text style={styles.benefit}>Obras:</Text> Pintura, escultura, cerámica
          {"\n\n"}
          <Text style={styles.subtitle}>🖼️ Salvador Dalí (1904-1989):</Text>{"\n"}
          • <Text style={styles.benefit}>Surrealismo:</Text> Máximo exponente español{"\n"}
          • <Text style={styles.benefit}>Figueres:</Text> Ciudad natal y museo{"\n"}
          • <Text style={styles.benefit}>Relojes blandos:</Text> Símbolo surrealista{"\n"}
          • <Text style={styles.benefit}>Cine:</Text> Colaboración con Buñuel{"\n"}
          • <Text style={styles.benefit}>Personalidad:</Text> Eccéntrico y mediático{"\n"}
          • <Text style={styles.benefit}>Técnica:</Text> Realismo mágico
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 Joan Miró (1893-1983):</Text>{"\n"}
          • <Text style={styles.benefit}>Barcelona:</Text> Ciudad natal{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Abstracción lírica{"\n"}
          • <Text style={styles.benefit}>Símbolos:</Text> Luna, estrellas, pájaros{"\n"}
          • <Text style={styles.benefit}>Fundación Miró:</Text> Museo en Barcelona{"\n"}
          • <Text style={styles.benefit}>Técnicas:</Text> Pintura, escultura, tapices{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Arte naif y surrealista
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎨 بابلو بيكاسو (1881-1973):</Text>{"\n"}
          • <Text style={styles.benefit}>التكعيبية:</Text> مؤسس مع براك{"\n"}
          • <Text style={styles.benefit}>غويرنيكا:</Text> إدانة الحرب{"\n"}
          • <Text style={styles.benefit}>الفترات:</Text> أزرق، وردي، تكعيبي، سريالي{"\n"}
          • <Text style={styles.benefit}>مالقة:</Text> المدينة الأصلية{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> ثورة الفن الحديث{"\n"}
          • <Text style={styles.benefit}>الأعمال:</Text> رسم، نحت، خزف
          {"\n\n"}
          <Text style={styles.subtitle}>🖼️ سلفادور دالي (1904-1989):</Text>{"\n"}
          • <Text style={styles.benefit}>السريالية:</Text> أبرز ممثل إسباني{"\n"}
          • <Text style={styles.benefit}>فيغيراس:</Text> المدينة الأصلية والمتحف{"\n"}
          • <Text style={styles.benefit}>الساعات اللينة:</Text> رمز سريالي{"\n"}
          • <Text style={styles.benefit}>السينما:</Text> تعاون مع بونويل{"\n"}
          • <Text style={styles.benefit}>الشخصية:</Text> غريب الأطوار وإعلامي{"\n"}
          • <Text style={styles.benefit}>التقنية:</Text> واقعية سحرية
          {"\n\n"}
          <Text style={styles.subtitle}>🎨 خوان ميرو (1893-1983):</Text>{"\n"}
          • <Text style={styles.benefit}>برشلونة:</Text> المدينة الأصلية{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> تجريد غنائي{"\n"}
          • <Text style={styles.benefit}>الرموز:</Text> قمر، نجوم، طيور{"\n"}
          • <Text style={styles.benefit}>مؤسسة ميرو:</Text> متحف في برشلونة{"\n"}
          • <Text style={styles.benefit}>التقنيات:</Text> رسم، نحت، نسيج{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> فن ساذج وسريالي
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido sobre el arte y teatro español con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته حول الفن والمسرح الإسباني مع هذه التمارين التفاعلية.</Text>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />

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
