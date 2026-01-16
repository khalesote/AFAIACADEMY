import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Deportes() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[8] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 8);
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
      enunciado: '¿Qué deporte se juega con una pelota y dos porterías?',
      opciones: ['Baloncesto', 'Fútbol', 'Tenis', 'Voleibol'],
      respuesta_correcta: 'Fútbol'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "entrenar"?',
      opciones: ['Dormir', 'Practicar deporte', 'Comer', 'Estudiar'],
      respuesta_correcta: 'Practicar deporte'
    },
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada deporte con su característica principal:',
      pares: [
        { izquierda: 'Fútbol', derecha: 'Deporte de equipo con 11 jugadores' },
        { izquierda: 'Baloncesto', derecha: 'Deporte con canasta y pelota naranja' },
        { izquierda: 'Tenis', derecha: 'Deporte individual con raqueta' },
        { izquierda: 'Natación', derecha: 'Deporte acuático individual' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es el beneficio principal del ejercicio físico?',
      opciones: ['Gastar dinero', 'Mejorar la salud', 'Perder amigos', 'Dormir menos'],
      respuesta_correcta: 'Mejorar la salud'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "competir"?',
      opciones: ['Dormir', 'Participar en una competición', 'Comer', 'Estudiar'],
      respuesta_correcta: 'Participar en una competición'
    },
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona las actividades deportivas con su frecuencia:',
      pares: [
        { izquierda: 'Entrenamiento diario', derecha: 'Todos los días' },
        { izquierda: 'Partido semanal', derecha: 'Una vez por semana' },
        { izquierda: 'Competición mensual', derecha: 'Una vez al mes' },
        { izquierda: 'Torneo anual', derecha: 'Una vez al año' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué deporte se practica en una piscina?',
      opciones: ['Fútbol', 'Baloncesto', 'Natación', 'Tenis'],
      respuesta_correcta: 'Natación'
    },
    {
      tipo: 'reflexion',
      titulo: 'Describe tu deporte favorito',
      texto: 'Describe tu deporte favorito, incluyendo las reglas básicas, el equipamiento necesario y por qué te gusta practicarlo.'
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
        source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de deportes y actividad física"
      />
      
      <Text style={styles.title}>Deportes y actividad física</Text>
      <Text style={styles.titleAr}>الرياضة والنشاط البدني</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contexto</Text>
        <Text style={styles.sectionText}>
          Los deportes y la actividad física son fundamentales para mantener una vida saludable y activa. 
          {"\n\n"}
          Los deportes pueden ser individuales o de equipo, y cada uno tiene sus propias reglas, equipamiento y beneficios. 
          {"\n\n"}
          Practicar deportes regularmente mejora la salud física y mental, desarrolla habilidades sociales y enseña valores como el trabajo en equipo, la disciplina y la perseverancia.
        </Text>
        <Text style={styles.sectionTextAr}>
          الرياضة والنشاط البدني أساسيان للحفاظ على حياة صحية ونشطة.
          {"\n\n"}
          يمكن أن تكون الرياضات فردية أو جماعية، ولكل منها قواعدها ومعداتها وفوائدها.
          {"\n\n"}
          ممارسة الرياضة بانتظام تحسن الصحة الجسدية والعقلية، وتطور المهارات الاجتماعية وتعلم قيمًا مثل العمل الجماعي والانضباط والمثابرة.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulario clave</Text>
        <Text style={styles.sectionText}>
          deporte = رياضة{"\n"}
          entrenar = تدريب{"\n"}
          competir = منافسة{"\n"}
          ganar = فوز{"\n"}
          perder = خسارة{"\n"}
          equipo = فريق{"\n"}
          partido = مباراة{"\n"}
          campeonato = بطولة{"\n"}
          árbitro = حكم{"\n"}
          estadio = ملعب{"\n"}
          pelota = كرة{"\n"}
          portería = مرمى{"\n"}
          canasta = سلة{"\n"}
          raqueta = مضرب
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos de deportes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Deportes de equipo:</Text>{"\n"}
          • Fútbol: 11 jugadores por equipo{"\n"}
          • Baloncesto: 5 jugadores por equipo{"\n"}
          • Voleibol: 6 jugadores por equipo{"\n"}
          • Balonmano: 7 jugadores por equipo
          {"\n\n"}
          <Text style={styles.subtitle}>Deportes individuales:</Text>{"\n"}
          • Tenis: Individual o dobles{"\n"}
          • Natación: Diferentes estilos{"\n"}
          • Atletismo: Carreras y saltos{"\n"}
          • Gimnasia: Ejercicios acrobáticos
          {"\n\n"}
          <Text style={styles.subtitle}>Deportes de contacto:</Text>{"\n"}
          • Boxeo: Combate con guantes{"\n"}
          • Judo: Arte marcial japonés{"\n"}
          • Karate: Defensa personal{"\n"}
          • Lucha libre: Deporte olímpico
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>الرياضات الجماعية:</Text>{"\n"}
          • كرة القدم: 11 لاعب لكل فريق{"\n"}
          • كرة السلة: 5 لاعبين لكل فريق{"\n"}
          • الكرة الطائرة: 6 لاعبين لكل فريق{"\n"}
          • كرة اليد: 7 لاعبين لكل فريق
          {"\n\n"}
          <Text style={styles.subtitle}>الرياضات الفردية:</Text>{"\n"}
          • التنس: فردي أو زوجي{"\n"}
          • السباحة: أنماط مختلفة{"\n"}
          • ألعاب القوى: سباقات وقفزات{"\n"}
          • الجمباز: تمارين بهلوانية
          {"\n\n"}
          <Text style={styles.subtitle}>رياضات الاحتكاك:</Text>{"\n"}
          • الملاكمة: قتال بقفازات{"\n"}
          • الجودو: فن قتالي ياباني{"\n"}
          • الكاراتيه: دفاع عن النفس{"\n"}
          • المصارعة الحرة: رياضة أولمبية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beneficios del deporte</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Salud física:</Text> Fortalece músculos y corazón{"\n"}
          • <Text style={styles.benefit}>Salud mental:</Text> Reduce estrés y ansiedad{"\n"}
          • <Text style={styles.benefit}>Habilidades sociales:</Text> Trabajo en equipo{"\n"}
          • <Text style={styles.benefit}>Disciplina:</Text> Desarrolla constancia{"\n"}
          • <Text style={styles.benefit}>Confianza:</Text> Mejora autoestima{"\n"}
          • <Text style={styles.benefit}>Diversión:</Text> Actividad entretenida
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.benefit}>الصحة الجسدية:</Text> يقوي العضلات والقلب{"\n"}
          • <Text style={styles.benefit}>الصحة العقلية:</Text> يقلل التوتر والقلق{"\n"}
          • <Text style={styles.benefit}>المهارات الاجتماعية:</Text> العمل الجماعي{"\n"}
          • <Text style={styles.benefit}>الانضباط:</Text> يطور المثابرة{"\n"}
          • <Text style={styles.benefit}>الثقة:</Text> يحسن احترام الذات{"\n"}
          • <Text style={styles.benefit}>المرح:</Text> نشاط مسلي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos para practicar deporte</Text>
        <Text style={styles.sectionText}>
          1. <Text style={styles.tip}>Elige un deporte que te guste:</Text> La motivación es clave{"\n"}
          2. <Text style={styles.tip}>Empieza gradualmente:</Text> No te exijas demasiado al principio{"\n"}
          3. <Text style={styles.tip}>Mantén constancia:</Text> Es mejor poco pero regular{"\n"}
          4. <Text style={styles.tip}>Usa equipamiento adecuado:</Text> Protege tu seguridad{"\n"}
          5. <Text style={styles.tip}>Calienta antes:</Text> Previene lesiones{"\n"}
          6. <Text style={styles.tip}>Hidrátate bien:</Text> Bebe agua durante el ejercicio
        </Text>
        <Text style={styles.sectionTextAr}>
          1. <Text style={styles.tip}>اختر رياضة تحبها:</Text> الدافع هو المفتاح{"\n"}
          2. <Text style={styles.tip}>ابدأ تدريجياً:</Text> لا تطلب من نفسك الكثير في البداية{"\n"}
          3. <Text style={styles.tip}>حافظ على الاستمرارية:</Text> الأفضل قليل لكن منتظم{"\n"}
          4. <Text style={styles.tip}>استخدم المعدات المناسبة:</Text> حافظ على سلامتك{"\n"}
          5. <Text style={styles.tip}>احرص على الإحماء:</Text> يمنع الإصابات{"\n"}
          6. <Text style={styles.tip}>رطب جيداً:</Text> اشرب الماء أثناء التمرين
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejemplo de diálogo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.dialogueTitle}>Conversación sobre deportes:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>Carlos:</Text> ¿Qué deporte practicas?{"\n"}
          <Text style={styles.speaker}>Sara:</Text> Juego al fútbol en un equipo local. ¿Y tú?{"\n"}
          <Text style={styles.speaker}>Carlos:</Text> Yo prefiero el tenis. ¿Con qué frecuencia entrenas?{"\n"}
          <Text style={styles.speaker}>Sara:</Text> Entreno tres veces por semana. ¿Has participado en alguna competición?{"\n"}
          <Text style={styles.speaker}>Carlos:</Text> Sí, el año pasado gané un torneo local. Me encanta la sensación de competir.
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.dialogueTitle}>محادثة حول الرياضة:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>كارلوس:</Text> ما الرياضة التي تمارسها؟{"\n"}
          <Text style={styles.speaker}>سارة:</Text> ألعب كرة القدم في فريق محلي. وأنت؟{"\n"}
          <Text style={styles.speaker}>كارلوس:</Text> أنا أفضل التنس. كم مرة تتدرب؟{"\n"}
          <Text style={styles.speaker}>سارة:</Text> أتدرب ثلاث مرات في الأسبوع. هل شاركت في أي منافسة؟{"\n"}
          <Text style={styles.speaker}>كارلوس:</Text> نعم، العام الماضي فزت ببطولة محلية. أحب شعور المنافسة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad de reflexión</Text>
        <Text style={styles.sectionText}>
          Reflexiona sobre tu experiencia con los deportes:{"\n\n"}
          • ¿Qué deportes has practicado o te gustaría practicar?{"\n"}
          • ¿Qué beneficios has notado al hacer ejercicio?{"\n"}
          • ¿Prefieres deportes individuales o de equipo?{"\n"}
          • ¿Qué valores crees que enseña el deporte?
        </Text>
        <Text style={styles.sectionTextAr}>
          فكر في تجربتك مع الرياضة:{"\n\n"}
          • ما الرياضات التي مارستها أو تود ممارستها؟{"\n"}
          • ما الفوائد التي لاحظتها عند ممارسة الرياضة؟{"\n"}
          • هل تفضل الرياضات الفردية أم الجماعية؟{"\n"}
          • ما القيم التي تعتقد أن الرياضة تعلمها؟
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
      </View>

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

