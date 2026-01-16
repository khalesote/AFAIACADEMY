import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Literatura Española - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién escribió 'Don Quijote de la Mancha'?",
    opciones: ["Miguel de Cervantes", "Federico García Lorca", "Gabriel García Márquez", "Pablo Neruda"],
    respuesta_correcta: "Miguel de Cervantes"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿En qué siglo se escribió 'Don Quijote'?",
    opciones: ["Siglo XV", "Siglo XVI", "Siglo XVII", "Siglo XVIII"],
    respuesta_correcta: "Siglo XVII"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué movimiento literario surgió en España en el siglo XVII?",
    opciones: ["Romanticismo", "Barroco", "Renacimiento", "Realismo"],
    respuesta_correcta: "Barroco"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién es el autor de 'La Celestina'?",
    opciones: ["Fernando de Rojas", "Lope de Vega", "Calderón de la Barca", "Quevedo"],
    respuesta_correcta: "Fernando de Rojas"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué poeta español ganó el Premio Nobel de Literatura en 1956?",
    opciones: ["Federico García Lorca", "Juan Ramón Jiménez", "Antonio Machado", "Miguel Hernández"],
    respuesta_correcta: "Juan Ramón Jiménez"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra de teatro escribió Federico García Lorca?",
    opciones: ["La casa de Bernarda Alba", "Don Quijote", "El Lazarillo de Tormes", "La vida es sueño"],
    respuesta_correcta: "La casa de Bernarda Alba"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué género literario cultivó principalmente Lope de Vega?",
    opciones: ["Novela", "Poesía épica", "Teatro", "Ensayo"],
    respuesta_correcta: "Teatro"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'Siglo de Oro' en la literatura española?",
    opciones: ["El siglo XIX", "Los siglos XVI y XVII", "El siglo XVIII", "El siglo XX"],
    respuesta_correcta: "Los siglos XVI y XVII"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién escribió 'El Lazarillo de Tormes'?",
    opciones: ["Anónimo", "Cervantes", "Quevedo", "Góngora"],
    respuesta_correcta: "Anónimo"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué poeta del Siglo de Oro escribió 'Soledades'?",
    opciones: ["Quevedo", "Góngora", "Lope de Vega", "Calderón"],
    respuesta_correcta: "Góngora"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué movimiento literario surgió en España a finales del siglo XIX?",
    opciones: ["Romanticismo", "Naturalismo", "Generación del 98", "Vanguardismo"],
    respuesta_correcta: "Generación del 98"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién es el autor de 'Platero y yo'?",
    opciones: ["Antonio Machado", "Juan Ramón Jiménez", "Federico García Lorca", "Miguel Hernández"],
    respuesta_correcta: "Juan Ramón Jiménez"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué poeta escribió 'Campos de Castilla'?",
    opciones: ["Antonio Machado", "Miguel Hernández", "Federico García Lorca", "Juan Ramón Jiménez"],
    respuesta_correcta: "Antonio Machado"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra de Calderón de la Barca es más famosa?",
    opciones: ["La vida es sueño", "El alcalde de Zalamea", "El médico de su honra", "La dama duende"],
    respuesta_correcta: "La vida es sueño"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué poeta del siglo XX escribió 'Romancero gitano'?",
    opciones: ["Federico García Lorca", "Antonio Machado", "Miguel Hernández", "Juan Ramón Jiménez"],
    respuesta_correcta: "Federico García Lorca"
  },
  
  // Ejercicio 16: Relacionar
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada autor con su obra más famosa:",
    pares: [
      {"izquierda": "📚 Miguel de Cervantes", "derecha": "Don Quijote de la Mancha"},
      {"izquierda": "🎭 Lope de Vega", "derecha": "Fuenteovejuna"},
      {"izquierda": "🎭 Calderón de la Barca", "derecha": "La vida es sueño"},
      {"izquierda": "📖 Fernando de Rojas", "derecha": "La Celestina"}
    ]
  },
  
  // Ejercicio 17: Relacionar
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada movimiento literario con su época:",
    pares: [
      {"izquierda": "🌟 Renacimiento", "derecha": "Siglo XVI"},
      {"izquierda": "💎 Barroco", "derecha": "Siglo XVII"},
      {"izquierda": "🌹 Romanticismo", "derecha": "Siglo XIX"},
      {"izquierda": "📝 Generación del 98", "derecha": "Finales del XIX"}
    ]
  },
  
  // Ejercicio 18: Relacionar
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada poeta con su estilo característico:",
    pares: [
      {"izquierda": "🎭 Federico García Lorca", "derecha": "Poesía popular y teatral"},
      {"izquierda": "🌾 Antonio Machado", "derecha": "Poesía filosófica y castellana"},
      {"izquierda": "🦋 Juan Ramón Jiménez", "derecha": "Poesía pura y simbolista"},
      {"izquierda": "💎 Luis de Góngora", "derecha": "Poesía culterana y compleja"}
    ]
  },
  
  // Ejercicio 19: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'culteranismo' en la literatura del Siglo de Oro?",
    opciones: ["Un estilo simple y directo", "Un estilo complejo y culto", "Un estilo popular", "Un estilo religioso"],
    respuesta_correcta: "Un estilo complejo y culto"
  },
  
  // Ejercicio 20: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra se considera la primera novela moderna?",
    opciones: ["La Celestina", "Don Quijote", "El Lazarillo", "La vida es sueño"],
    respuesta_correcta: "Don Quijote"
  }
];

export default function LiteraturaEspanola() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[0] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 0);
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
        source={{ uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de literatura y libros"
      />
      
      <Text style={styles.title}>📚 Literatura Española</Text>
      <Text style={styles.titleAr}>📚 الأدب الإسباني</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la literatura española</Text>
        <Text style={styles.sectionText}>
          La literatura española es una de las más ricas y diversas del mundo, 
          con una tradición que abarca más de mil años. Desde las primeras 
          manifestaciones literarias hasta la actualidad, ha producido obras 
          maestras que han influido en la literatura universal.
          {"\n\n"}
          El español es la segunda lengua más hablada del mundo, y su literatura 
          refleja la diversidad cultural de los países hispanohablantes. La 
          literatura española ha sido fundamental en el desarrollo de géneros 
          como la novela, el teatro y la poesía, creando obras que trascienden 
          el tiempo y las fronteras.
          {"\n\n"}
          Estudiar la literatura española permite comprender mejor la cultura, 
          la historia y los valores de España y del mundo hispánico, además de 
          mejorar significativamente el dominio del idioma español.
        </Text>
        <Text style={styles.sectionTextAr}>
          الأدب الإسباني هو واحد من أغنى وأكثر الآداب تنوعاً في العالم،
          مع تقليد يمتد لأكثر من ألف عام. من أولى المظاهر الأدبية
          حتى الوقت الحاضر، أنتج روائع أثرت في الأدب العالمي.
          {"\n\n"}
          الإسبانية هي ثاني أكثر لغة تحدثاً في العالم، وأدبها
          يعكس التنوع الثقافي للبلدان الناطقة بالإسبانية. كان الأدب
          الإسباني أساسياً في تطوير الأجناس الأدبية مثل الرواية
          والمسرح والشعر، مخلقاً أعمالاً تتجاوز الزمان والحدود.
          {"\n\n"}
          دراسة الأدب الإسباني تسمح بفهم أفضل للثقافة والتاريخ
          والقيم في إسبانيا والعالم الناطق بالإسبانية، بالإضافة
          إلى تحسين كبير في إتقان اللغة الإسبانية.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de literatura</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📖 Géneros literarios:</Text>{"\n"}
          novela = رواية{"\n"}
          poesía = شعر{"\n"}
          teatro = مسرح{"\n"}
          ensayo = مقال{"\n"}
          cuento = قصة قصيرة{"\n"}
          crónica = سرد تاريخي{"\n"}
          romance = رومانس{"\n"}
          soneto = سونيتة{"\n"}
          comedia = كوميديا{"\n"}
          tragedia = مأساة
          {"\n\n"}
          <Text style={styles.subtitle}>✍️ Elementos literarios:</Text>{"\n"}
          autor = مؤلف{"\n"}
          obra = عمل أدبي{"\n"}
          personaje = شخصية{"\n"}
          trama = حبكة{"\n"}
          argumento = حجة{"\n"}
          estilo = أسلوب{"\n"}
          tema = موضوع{"\n"}
          símbolo = رمز{"\n"}
          metáfora = استعارة{"\n"}
          alegoría = رمزية
          {"\n\n"}
          <Text style={styles.subtitle}>📅 Períodos históricos:</Text>{"\n"}
          Edad Media = العصور الوسطى{"\n"}
          Renacimiento = عصر النهضة{"\n"}
          Barroco = الباروك{"\n"}
          Romanticismo = الرومانسية{"\n"}
          Realismo = الواقعية{"\n"}
          Modernismo = الحداثة{"\n"}
          Vanguardismo = الطليعية{"\n"}
          Posmodernismo = ما بعد الحداثة{"\n"}
          Siglo de Oro = العصر الذهبي{"\n"}
          Generación del 98 = جيل 98
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Técnicas literarias:</Text>{"\n"}
          narrador = راوي{"\n"}
          diálogo = حوار{"\n"}
          monólogo = مونولوج{"\n"}
          descripción = وصف{"\n"}
          flashback = استرجاع{"\n"}
          ironía = سخرية{"\n"}
          hipérbole = مبالغة{"\n"}
          personificación = تجسيد{"\n"}
          onomatopeya = محاكاة صوتية{"\n"}
          aliteración = جناس
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📖 الأجناس الأدبية:</Text>{"\n"}
          رواية = novela{"\n"}
          شعر = poesía{"\n"}
          مسرح = teatro{"\n"}
          مقال = ensayo{"\n"}
          قصة قصيرة = cuento{"\n"}
          سرد تاريخي = crónica{"\n"}
          رومانس = romance{"\n"}
          سونيتة = soneto{"\n"}
          كوميديا = comedia{"\n"}
          مأساة = tragedia
          {"\n\n"}
          <Text style={styles.subtitle}>✍️ العناصر الأدبية:</Text>{"\n"}
          مؤلف = autor{"\n"}
          عمل أدبي = obra{"\n"}
          شخصية = personaje{"\n"}
          حبكة = trama{"\n"}
          حجة = argumento{"\n"}
          أسلوب = estilo{"\n"}
          موضوع = tema{"\n"}
          رمز = símbolo{"\n"}
          استعارة = metáfora{"\n"}
          رمزية = alegoría
          {"\n\n"}
          <Text style={styles.subtitle}>📅 الفترات التاريخية:</Text>{"\n"}
          العصور الوسطى = Edad Media{"\n"}
          عصر النهضة = Renacimiento{"\n"}
          الباروك = Barroco{"\n"}
          الرومانسية = Romanticismo{"\n"}
          الواقعية = Realismo{"\n"}
          الحداثة = Modernismo{"\n"}
          الطليعية = Vanguardismo{"\n"}
          ما بعد الحداثة = Posmodernismo{"\n"}
          العصر الذهبي = Siglo de Oro{"\n"}
          جيل 98 = Generación del 98
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 التقنيات الأدبية:</Text>{"\n"}
          راوي = narrador{"\n"}
          حوار = diálogo{"\n"}
          مونولوج = monólogo{"\n"}
          وصف = descripción{"\n"}
          استرجاع = flashback{"\n"}
          سخرية = ironía{"\n"}
          مبالغة = hipérbole{"\n"}
          تجسيد = personificación{"\n"}
          محاكاة صوتية = onomatopeya{"\n"}
          جناس = aliteración
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 El Siglo de Oro (Siglos XVI-XVII)</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📚 Miguel de Cervantes (1547-1616):</Text>{"\n"}
          • <Text style={styles.benefit}>Don Quijote de la Mancha:</Text> La primera novela moderna{"\n"}
          • <Text style={styles.benefit}>Novelas ejemplares:</Text> Colección de relatos breves{"\n"}
          • <Text style={styles.benefit}>La Galatea:</Text> Su primera novela pastoril{"\n"}
          • <Text style={styles.benefit}>Los trabajos de Persiles y Sigismunda:</Text> Su última obra{"\n"}
          • <Text style={styles.benefit}>Influencia universal:</Text> Traducida a más de 50 idiomas{"\n"}
          • <Text style={styles.benefit}>Legado cultural:</Text> Símbolo de la literatura española
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Lope de Vega (1562-1635):</Text>{"\n"}
          • <Text style={styles.benefit}>Fuenteovejuna:</Text> Drama histórico sobre la rebelión popular{"\n"}
          • <Text style={styles.benefit}>El perro del hortelano:</Text> Comedia de enredo{"\n"}
          • <Text style={styles.benefit}>La dama boba:</Text> Comedia sobre la educación femenina{"\n"}
          • <Text style={styles.benefit}>El caballero de Olmedo:</Text> Tragicomedia{"\n"}
          • <Text style={styles.benefit}>Productividad:</Text> Escribió más de 1.500 obras{"\n"}
          • <Text style={styles.benefit}>Reforma teatral:</Text> Creó la comedia nueva española
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Calderón de la Barca (1600-1681):</Text>{"\n"}
          • <Text style={styles.benefit}>La vida es sueño:</Text> Drama filosófico sobre la libertad{"\n"}
          • <Text style={styles.benefit}>El alcalde de Zalamea:</Text> Drama sobre el honor{"\n"}
          • <Text style={styles.benefit}>El médico de su honra:</Text> Tragedia de honor{"\n"}
          • <Text style={styles.benefit}>Autos sacramentales:</Text> Teatro religioso{"\n"}
          • <Text style={styles.benefit}>Barroco literario:</Text> Máximo exponente del estilo barroco{"\n"}
          • <Text style={styles.benefit}>Influencia filosófica:</Text> Profundidad metafísica
          {"\n\n"}
          <Text style={styles.subtitle}>📖 Fernando de Rojas (1470-1541):</Text>{"\n"}
          • <Text style={styles.benefit}>La Celestina:</Text> Tragicomedia en prosa{"\n"}
          • <Text style={styles.benefit}>Realismo social:</Text> Retrato de la sociedad renacentista{"\n"}
          • <Text style={styles.benefit}>Personajes complejos:</Text> Celestina, Calisto, Melibea{"\n"}
          • <Text style={styles.benefit}>Influencia posterior:</Text> Precursora de la novela moderna{"\n"}
          • <Text style={styles.benefit}>Temas universales:</Text> Amor, muerte, codicia{"\n"}
          • <Text style={styles.benefit}>Estilo único:</Text> Mezcla de prosa y diálogo
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📚 ميغيل دي سرفانتس (1547-1616):</Text>{"\n"}
          • <Text style={styles.benefit}>دون كيخوتي دي لا مانشا:</Text> أول رواية حديثة{"\n"}
          • <Text style={styles.benefit}>روايات مثالية:</Text> مجموعة من القصص القصيرة{"\n"}
          • <Text style={styles.benefit}>غالاتيا:</Text> روايته الأولى الرعوية{"\n"}
          • <Text style={styles.benefit}>أعمال بيرسيلس وسيغسموندا:</Text> عمله الأخير{"\n"}
          • <Text style={styles.benefit}>تأثير عالمي:</Text> مترجمة لأكثر من 50 لغة{"\n"}
          • <Text style={styles.benefit}>إرث ثقافي:</Text> رمز الأدب الإسباني
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 لوبي دي فيغا (1562-1635):</Text>{"\n"}
          • <Text style={styles.benefit}>فونت أوفيخونا:</Text> دراما تاريخية عن التمرد الشعبي{"\n"}
          • <Text style={styles.benefit}>كلب البستاني:</Text> كوميديا من نوع الالتباس{"\n"}
          • <Text style={styles.benefit}>السيدة البلهاء:</Text> كوميديا عن تعليم المرأة{"\n"}
          • <Text style={styles.benefit}>فارس أولميدو:</Text> تراجيكوميديا{"\n"}
          • <Text style={styles.benefit}>الإنتاجية:</Text> كتب أكثر من 1500 عمل{"\n"}
          • <Text style={styles.benefit}>إصلاح مسرحي:</Text> خلق الكوميديا الإسبانية الجديدة
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 كالديرون دي لا باركا (1600-1681):</Text>{"\n"}
          • <Text style={styles.benefit}>الحياة حلم:</Text> دراما فلسفية عن الحرية{"\n"}
          • <Text style={styles.benefit}>عمدة زالاميا:</Text> دراما عن الشرف{"\n"}
          • <Text style={styles.benefit}>طبيب شرفه:</Text> مأساة الشرف{"\n"}
          • <Text style={styles.benefit}>أوتوس ساكرامنتاليس:</Text> مسرح ديني{"\n"}
          • <Text style={styles.benefit}>الباروك الأدبي:</Text> أبرز ممثل للباروك{"\n"}
          • <Text style={styles.benefit}>تأثير فلسفي:</Text> عمق ميتافيزيقي
          {"\n\n"}
          <Text style={styles.subtitle}>📖 فرناندو دي روجاس (1470-1541):</Text>{"\n"}
          • <Text style={styles.benefit}>لا سيليستينا:</Text> تراجيكوميديا نثرية{"\n"}
          • <Text style={styles.benefit}>واقعية اجتماعية:</Text> صورة المجتمع النهضوي{"\n"}
          • <Text style={styles.benefit}>شخصيات معقدة:</Text> سيليستينا، كاليستو، ميليبيا{"\n"}
          • <Text style={styles.benefit}>تأثير لاحق:</Text> سابقة للرواية الحديثة{"\n"}
          • <Text style={styles.benefit}>مواضيع عالمية:</Text> الحب، الموت، الجشع{"\n"}
          • <Text style={styles.benefit}>أسلوب فريد:</Text> مزيج من النثر والحوار
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌹 Poesía del Siglo de Oro</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💎 Luis de Góngora (1561-1627):</Text>{"\n"}
          • <Text style={styles.benefit}>Soledades:</Text> Poema extenso de estilo culterano{"\n"}
          • <Text style={styles.benefit}>Fábula de Polifemo y Galatea:</Text> Poema mitológico{"\n"}
          • <Text style={styles.benefit}>Sonetos:</Text> Más de 200 sonetos{"\n"}
          • <Text style={styles.benefit}>Culteranismo:</Text> Estilo complejo y culto{"\n"}
          • <Text style={styles.benefit}>Metáforas complejas:</Text> Uso de referencias clásicas{"\n"}
          • <Text style={styles.benefit}>Influencia posterior:</Text> Admirado por los poetas modernos
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ Francisco de Quevedo (1580-1645):</Text>{"\n"}
          • <Text style={styles.benefit}>Poemas satíricos:</Text> Crítica social y política{"\n"}
          • <Text style={styles.benefit}>Poemas amorosos:</Text> Sonetos a Lisi{"\n"}
          • <Text style={styles.benefit}>Poemas filosóficos:</Text> Reflexiones sobre la muerte{"\n"}
          • <Text style={styles.benefit}>Conceptismo:</Text> Estilo basado en conceptos ingeniosos{"\n"}
          • <Text style={styles.benefit}>Prosa satírica:</Text> Los sueños, La hora de todos{"\n"}
          • <Text style={styles.benefit}>Polémica literaria:</Text> Rivalidad con Góngora
          {"\n\n"}
          <Text style={styles.subtitle}>📖 Garcilaso de la Vega (1501-1536):</Text>{"\n"}
          • <Text style={styles.benefit}>Églogas:</Text> Poemas pastoriles{"\n"}
          • <Text style={styles.benefit}>Sonetos:</Text> Introducción del soneto en España{"\n"}
          • <Text style={styles.benefit}>Canzoniere:</Text> Influencia del petrarquismo{"\n"}
          • <Text style={styles.benefit}>Renacimiento:</Text> Máximo exponente del Renacimiento{"\n"}
          • <Text style={styles.benefit}>Elegías:</Text> Poemas de tema amoroso{"\n"}
          • <Text style={styles.benefit}>Influencia italiana:</Text> Adaptación de formas italianas
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Lope de Vega (Poeta):</Text>{"\n"}
          • <Text style={styles.benefit}>Rimas:</Text> Colección de poemas líricos{"\n"}
          • <Text style={styles.benefit}>Romances:</Text> Poemas narrativos populares{"\n"}
          • <Text style={styles.benefit}>Sonetos:</Text> Más de 3.000 sonetos{"\n"}
          • <Text style={styles.benefit}>Poesía religiosa:</Text> Rimas sacras{"\n"}
          • <Text style={styles.benefit}>Variedad temática:</Text> Amor, religión, naturaleza{"\n"}
          • <Text style={styles.benefit}>Estilo natural:</Text> Claridad y musicalidad
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💎 لويس دي غونغورا (1561-1627):</Text>{"\n"}
          • <Text style={styles.benefit}>الخلوات:</Text> قصيدة طويلة بأسلوب كلتيراني{"\n"}
          • <Text style={styles.benefit}>أسطورة بوليفيمو وغالاتيا:</Text> قصيدة أسطورية{"\n"}
          • <Text style={styles.benefit}>سونيتات:</Text> أكثر من 200 سونيتة{"\n"}
          • <Text style={styles.benefit}>الكلتيرانية:</Text> أسلوب معقد ومثقف{"\n"}
          • <Text style={styles.benefit}>استعارات معقدة:</Text> استخدام مراجع كلاسيكية{"\n"}
          • <Text style={styles.benefit}>تأثير لاحق:</Text> معجب به الشعراء المحدثون
          {"\n\n"}
          <Text style={styles.subtitle}>⚡ فرانسيسكو دي كيفيدو (1580-1645):</Text>{"\n"}
          • <Text style={styles.benefit}>قصائد هجائية:</Text> نقد اجتماعي وسياسي{"\n"}
          • <Text style={styles.benefit}>قصائد حب:</Text> سونيتات لليزي{"\n"}
          • <Text style={styles.benefit}>قصائد فلسفية:</Text> تأملات حول الموت{"\n"}
          • <Text style={styles.benefit}>الكونسبتية:</Text> أسلوب قائم على مفاهيم ذكية{"\n"}
          • <Text style={styles.benefit}>نثر هجائي:</Text> الأحلام، ساعة الجميع{"\n"}
          • <Text style={styles.benefit}>جدل أدبي:</Text> منافسة مع غونغورا
          {"\n\n"}
          <Text style={styles.subtitle}>📖 غارسيلاسو دي لا فيغا (1501-1536):</Text>{"\n"}
          • <Text style={styles.benefit}>إكلوغات:</Text> قصائد رعوية{"\n"}
          • <Text style={styles.benefit}>سونيتات:</Text> إدخال السونيتة إلى إسبانيا{"\n"}
          • <Text style={styles.benefit}>كانزونيير:</Text> تأثير البتراركية{"\n"}
          • <Text style={styles.benefit}>النهضة:</Text> أبرز ممثل النهضة{"\n"}
          • <Text style={styles.benefit}>مراثي:</Text> قصائد بموضوع الحب{"\n"}
          • <Text style={styles.benefit}>تأثير إيطالي:</Text> تكييف الأشكال الإيطالية
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 لوبي دي فيغا (شاعر):</Text>{"\n"}
          • <Text style={styles.benefit}>قوافي:</Text> مجموعة من القصائد الغنائية{"\n"}
          • <Text style={styles.benefit}>رومانسات:</Text> قصائد سردية شعبية{"\n"}
          • <Text style={styles.benefit}>سونيتات:</Text> أكثر من 3000 سونيتة{"\n"}
          • <Text style={styles.benefit}>شعر ديني:</Text> قوافي مقدسة{"\n"}
          • <Text style={styles.benefit}>تنوع موضوعي:</Text> الحب، الدين، الطبيعة{"\n"}
          • <Text style={styles.benefit}>أسلوب طبيعي:</Text> وضوح وموسيقية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Literatura del siglo XX</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌹 Generación del 98:</Text>{"\n"}
          • <Text style={styles.benefit}>Miguel de Unamuno:</Text> Niebla, San Manuel Bueno{"\n"}
          • <Text style={styles.benefit}>Pío Baroja:</Text> El árbol de la ciencia{"\n"}
          • <Text style={styles.benefit}>Azorín:</Text> Castilla, La ruta de Don Quijote{"\n"}
          • <Text style={styles.benefit}>Antonio Machado:</Text> Campos de Castilla{"\n"}
          • <Text style={styles.benefit}>Temas comunes:</Text> Crisis de España, regeneracionismo{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Lenguaje sobrio y reflexivo
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Federico García Lorca (1898-1936):</Text>{"\n"}
          • <Text style={styles.benefit}>Romancero gitano:</Text> Poesía popular andaluza{"\n"}
          • <Text style={styles.benefit}>Poeta en Nueva York:</Text> Poesía surrealista{"\n"}
          • <Text style={styles.benefit}>La casa de Bernarda Alba:</Text> Drama rural{"\n"}
          • <Text style={styles.benefit}>Bodas de sangre:</Text> Tragedia rural{"\n"}
          • <Text style={styles.benefit}>Yerma:</Text> Drama sobre la maternidad{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Símbolo de la literatura española
          {"\n\n"}
          <Text style={styles.subtitle}>🦋 Juan Ramón Jiménez (1881-1958):</Text>{"\n"}
          • <Text style={styles.benefit}>Platero y yo:</Text> Prosa poética{"\n"}
          • <Text style={styles.benefit}>Diario de un poeta recién casado:</Text> Poesía pura{"\n"}
          • <Text style={styles.benefit}>Eternidades:</Text> Poesía simbolista{"\n"}
          • <Text style={styles.benefit}>Premio Nobel:</Text> 1956{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Poesía pura y depurada{"\n"}
          • <Text style={styles.benefit}>Influencia:</Text> Maestro de la Generación del 27
          {"\n\n"}
          <Text style={styles.subtitle}>🌾 Antonio Machado (1875-1939):</Text>{"\n"}
          • <Text style={styles.benefit}>Campos de Castilla:</Text> Poesía filosófica{"\n"}
          • <Text style={styles.benefit}>Soledades:</Text> Poesía modernista{"\n"}
          • <Text style={styles.benefit}>Nuevas canciones:</Text> Poesía popular{"\n"}
          • <Text style={styles.benefit}>Juan de Mairena:</Text> Prosa filosófica{"\n"}
          • <Text style={styles.benefit}>Temas:</Text> Castilla, tiempo, muerte{"\n"}
          • <Text style={styles.benefit}>Estilo:</Text> Sencillez y profundidad
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🌹 جيل 98:</Text>{"\n"}
          • <Text style={styles.benefit}>ميغيل دي أونامونو:</Text> الضباب، سان مانويل بونو{"\n"}
          • <Text style={styles.benefit}>بيو باروخا:</Text> شجرة العلم{"\n"}
          • <Text style={styles.benefit}>أزورين:</Text> قشتالة، طريق دون كيخوتي{"\n"}
          • <Text style={styles.benefit}>أنطونيو ماشادو:</Text> حقول قشتالة{"\n"}
          • <Text style={styles.benefit}>مواضيع مشتركة:</Text> أزمة إسبانيا، التجديد{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> لغة متزنة وتأملية
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 فيديريكو غارثيا لوركا (1898-1936):</Text>{"\n"}
          • <Text style={styles.benefit}>رومانسيرو الغجر:</Text> شعر أندلسي شعبي{"\n"}
          • <Text style={styles.benefit}>شاعر في نيويورك:</Text> شعر سريالي{"\n"}
          • <Text style={styles.benefit}>بيت برناردا ألبا:</Text> دراما ريفية{"\n"}
          • <Text style={styles.benefit}>عرس الدم:</Text> مأساة ريفية{"\n"}
          • <Text style={styles.benefit}>يرما:</Text> دراما حول الأمومة{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> رمز الأدب الإسباني
          {"\n\n"}
          <Text style={styles.subtitle}>🦋 خوان رامون خيمينيث (1881-1958):</Text>{"\n"}
          • <Text style={styles.benefit}>بلاتيرو وأنا:</Text> نثر شعري{"\n"}
          • <Text style={styles.benefit}>يوميات شاعر متزوج حديثاً:</Text> شعر نقي{"\n"}
          • <Text style={styles.benefit}>الأبديات:</Text> شعر رمزي{"\n"}
          • <Text style={styles.benefit}>جائزة نوبل:</Text> 1956{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> شعر نقي ومصقول{"\n"}
          • <Text style={styles.benefit}>التأثير:</Text> معلم جيل 27
          {"\n\n"}
          <Text style={styles.subtitle}>🌾 أنطونيو ماشادو (1875-1939):</Text>{"\n"}
          • <Text style={styles.benefit}>حقول قشتالة:</Text> شعر فلسفي{"\n"}
          • <Text style={styles.benefit}>الخلوات:</Text> شعر حداثي{"\n"}
          • <Text style={styles.benefit}>أغاني جديدة:</Text> شعر شعبي{"\n"}
          • <Text style={styles.benefit}>خوان دي مايرينا:</Text> نثر فلسفي{"\n"}
          • <Text style={styles.benefit}>المواضيع:</Text> قشتالة، الزمن، الموت{"\n"}
          • <Text style={styles.benefit}>الأسلوب:</Text> البساطة والعمق
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido sobre la literatura española con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته حول الأدب الإسباني مع هذه التمارين التفاعلية.</Text>
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
