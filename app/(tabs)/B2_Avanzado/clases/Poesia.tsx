import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

const ejercicios = [
  {
    tipo: "opcion_multiple",
    enunciado: "¿Quién escribió 'Romancero gitano'?",
    opciones: ["Federico García Lorca", "Antonio Machado", "Juan Ramón Jiménez", "Miguel Hernández"],
    respuesta_correcta: "Federico García Lorca"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué poeta español ganó el Premio Nobel en 1956?",
    opciones: ["Federico García Lorca", "Juan Ramón Jiménez", "Antonio Machado", "Miguel Hernández"],
    respuesta_correcta: "Juan Ramón Jiménez"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué obra poética escribió Juan Ramón Jiménez?",
    opciones: ["Platero y yo", "Campos de Castilla", "Romancero gitano", "Soledades"],
    respuesta_correcta: "Platero y yo"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué poeta del Siglo de Oro escribió 'Soledades'?",
    opciones: ["Luis de Góngora", "Francisco de Quevedo", "Garcilaso de la Vega", "Lope de Vega"],
    respuesta_correcta: "Luis de Góngora"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuántos versos tiene un soneto?",
    opciones: ["10 versos", "12 versos", "14 versos", "16 versos"],
    respuesta_correcta: "14 versos"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué tipo de rima tiene el romance?",
    opciones: ["Rima consonante", "Rima asonante", "Rima libre", "Sin rima"],
    respuesta_correcta: "Rima asonante"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Cuál es el esquema de rima del soneto?",
    opciones: ["ABAB CDCD", "ABBA ABBA CDC DCD", "AABB CCDD", "ABCD EFGH"],
    respuesta_correcta: "ABBA ABBA CDC DCD"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué figura retórica es 'Tus ojos son estrellas'?",
    opciones: ["Símil", "Metáfora", "Hipérbole", "Personificación"],
    respuesta_correcta: "Metáfora"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué tipo de verso es el endecasílabo?",
    opciones: ["8 sílabas", "10 sílabas", "11 sílabas", "12 sílabas"],
    respuesta_correcta: "11 sílabas"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'rima abrazada'?",
    opciones: ["El primer verso rima con el tercero", "El primer verso rima con el cuarto", "Versos consecutivos riman", "Sin esquema fijo"],
    respuesta_correcta: "El primer verso rima con el cuarto"
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada poeta con su estilo:",
    pares: [
      {"izquierda": "🌹 Federico García Lorca", "derecha": "Poesía popular y surrealista"},
      {"izquierda": "🌾 Antonio Machado", "derecha": "Poesía filosófica y castellana"},
      {"izquierda": "🦋 Juan Ramón Jiménez", "derecha": "Poesía pura y simbolista"},
      {"izquierda": "💎 Luis de Góngora", "derecha": "Poesía culterana y compleja"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada forma poética con su estructura:",
    pares: [
      {"izquierda": "🔄 Soneto", "derecha": "14 versos endecasílabos"},
      {"izquierda": "🌹 Romance", "derecha": "Versos octosílabos"},
      {"izquierda": "💎 Décima", "derecha": "10 versos octosílabos"},
      {"izquierda": "🎭 Silva", "derecha": "Versos de 7 y 11 sílabas"}
    ]
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada tipo de rima con su definición:",
    pares: [
      {"izquierda": "🔤 Rima consonante", "derecha": "Coincidencia total de sonidos"},
      {"izquierda": "🎵 Rima asonante", "derecha": "Coincidencia solo de vocales"},
      {"izquierda": "🆓 Rima libre", "derecha": "Sin esquema de rima fijo"},
      {"izquierda": "⚪ Verso blanco", "derecha": "Sin rima pero con métrica"}
    ]
  }
];

export default function Poesia() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[14] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 14);
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
        source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de poesía y literatura"
      />
      
      <Text style={styles.title}>🌹 Poesía Española</Text>
      <Text style={styles.titleAr}>🌹 الشعر الإسباني</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la poesía española</Text>
        <Text style={styles.sectionText}>
          La poesía española es una de las tradiciones poéticas más ricas 
          y diversas del mundo. Desde los romances medievales hasta la 
          poesía contemporánea, España ha producido poetas de talla mundial 
          que han influido en la literatura universal.
          {"\n\n"}
          La poesía española se caracteriza por su diversidad de estilos, 
          desde la poesía popular y tradicional hasta las vanguardias 
          más experimentales. Cada época ha aportado su propia voz 
          y sensibilidad al rico patrimonio poético español.
        </Text>
        <Text style={styles.sectionTextAr}>
          الشعر الإسباني هو واحد من أغنى وأكثر التقاليد الشعرية
          تنوعاً في العالم. من الرومانسات القرون الوسطى حتى
          الشعر المعاصر، أنتجت إسبانيا شعراء من الطراز العالمي
          أثرت في الأدب العالمي.
          {"\n\n"}
          يتميز الشعر الإسباني بتنوع أساليبه، من الشعر الشعبي
          والتقليدي حتى الطليعيات الأكثر تجريبية. كل عصر
          أضاف صوته وحساسيته الخاصة للتراث الشعري الإسباني الغني.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Estructura y composición poética</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎵 Elementos básicos de la poesía:</Text>{"\n"}
          • <Text style={styles.benefit}>Verso:</Text> Cada línea del poema{"\n"}
          • <Text style={styles.benefit}>Estrofa:</Text> Grupo de versos con estructura similar{"\n"}
          • <Text style={styles.benefit}>Rima:</Text> Semejanza de sonidos al final de los versos{"\n"}
          • <Text style={styles.benefit}>Ritmo:</Text> Cadencia musical creada por la métrica{"\n"}
          • <Text style={styles.benefit}>Métrica:</Text> Medida y estructura de los versos
          {"\n\n"}
          <Text style={styles.subtitle}>🔤 Tipos de rima:</Text>{"\n"}
          • <Text style={styles.benefit}>Rima consonante:</Text> Coincidencia total de sonidos (amor-dolor){"\n"}
          • <Text style={styles.benefit}>Rima asonante:</Text> Coincidencia solo de vocales (casa-pasa){"\n"}
          • <Text style={styles.benefit}>Rima libre:</Text> Sin esquema de rima fijo{"\n"}
          • <Text style={styles.benefit}>Verso blanco:</Text> Sin rima pero con métrica
          {"\n\n"}
          <Text style={styles.subtitle}>📏 Esquemas de rima:</Text>{"\n"}
          • <Text style={styles.benefit}>Rima abrazada (ABBA):</Text> El primer verso rima con el cuarto{"\n"}
          • <Text style={styles.benefit}>Rima cruzada (ABAB):</Text> Versos alternos riman{"\n"}
          • <Text style={styles.benefit}>Rima gemela (AABB):</Text> Versos consecutivos riman{"\n"}
          • <Text style={styles.benefit}>Rima encadenada (ABA BCB):</Text> El tercer verso rima con el primero de la siguiente estrofa
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎵 العناصر الأساسية للشعر:</Text>{"\n"}
          • <Text style={styles.benefit}>البيت:</Text> كل سطر من القصيدة{"\n"}
          • <Text style={styles.benefit}>المقطع:</Text> مجموعة من الأبيات ببنية متشابهة{"\n"}
          • <Text style={styles.benefit}>القافية:</Text> تشابه الأصوات في نهاية الأبيات{"\n"}
          • <Text style={styles.benefit}>الإيقاع:</Text> النغمة الموسيقية الناتجة عن العروض{"\n"}
          • <Text style={styles.benefit}>العروض:</Text> قياس وبنية الأبيات
          {"\n\n"}
          <Text style={styles.subtitle}>🔤 أنواع القافية:</Text>{"\n"}
          • <Text style={styles.benefit}>قافية تامة:</Text> تطابق كامل للأصوات (amor-dolor){"\n"}
          • <Text style={styles.benefit}>قافية ناقصة:</Text> تطابق الحروف المتحركة فقط (casa-pasa){"\n"}
          • <Text style={styles.benefit}>قافية حرة:</Text> بدون نظام قافية ثابت{"\n"}
          • <Text style={styles.benefit}>بيت أبيض:</Text> بدون قافية لكن مع عروض
          {"\n\n"}
          <Text style={styles.subtitle}>📏 أنماط القافية:</Text>{"\n"}
          • <Text style={styles.benefit}>قافية محيطة (ABBA):</Text> البيت الأول يقافي البيت الرابع{"\n"}
          • <Text style={styles.benefit}>قافية متقاطعة (ABAB):</Text> الأبيات المتناوبة تقافي{"\n"}
          • <Text style={styles.benefit}>قافية مزدوجة (AABB):</Text> الأبيات المتتالية تقافي{"\n"}
          • <Text style={styles.benefit}>قافية متسلسلة (ABA BCB):</Text> البيت الثالث يقافي البيت الأول من المقطع التالي
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Formas poéticas tradicionales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🔄 Soneto:</Text>{"\n"}
          • <Text style={styles.benefit}>Estructura:</Text> 14 versos endecasílabos{"\n"}
          • <Text style={styles.benefit}>Esquema:</Text> ABBA ABBA CDC DCD{"\n"}
          • <Text style={styles.benefit}>Origen:</Text> Italia, introducido por Garcilaso{"\n"}
          • <Text style={styles.benefit}>Ejemplo:</Text> Sonetos de Quevedo y Góngora
          {"\n\n"}
          <Text style={styles.subtitle}>🌹 Romance:</Text>{"\n"}
          • <Text style={styles.benefit}>Estructura:</Text> Versos octosílabos{"\n"}
          • <Text style={styles.benefit}>Esquema:</Text> Rima asonante en versos pares{"\n"}
          • <Text style={styles.benefit}>Característica:</Text> Narrativo y popular{"\n"}
          • <Text style={styles.benefit}>Ejemplo:</Text> Romancero gitano de Lorca
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 Silva:</Text>{"\n"}
          • <Text style={styles.benefit}>Estructura:</Text> Versos de 7 y 11 sílabas{"\n"}
          • <Text style={styles.benefit}>Esquema:</Text> Rima libre{"\n"}
          • <Text style={styles.benefit}>Característica:</Text> Flexible y expresiva{"\n"}
          • <Text style={styles.benefit}>Ejemplo:</Text> Soledades de Góngora
          {"\n\n"}
          <Text style={styles.subtitle}>💎 Décima:</Text>{"\n"}
          • <Text style={styles.benefit}>Estructura:</Text> 10 versos octosílabos{"\n"}
          • <Text style={styles.benefit}>Esquema:</Text> ABBAACCDDC{"\n"}
          • <Text style={styles.benefit}>Característica:</Text> Popular en América{"\n"}
          • <Text style={styles.benefit}>Ejemplo:</Text> Décimas de Lope de Vega
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🔄 السونيتة:</Text>{"\n"}
          • <Text style={styles.benefit}>البنية:</Text> 14 بيت من 11 مقطع{"\n"}
          • <Text style={styles.benefit}>النمط:</Text> ABBA ABBA CDC DCD{"\n"}
          • <Text style={styles.benefit}>الأصل:</Text> إيطاليا، أدخله غارسيلاسو{"\n"}
          • <Text style={styles.benefit}>مثال:</Text> سونيتات كيفيدو وغونغورا
          {"\n\n"}
          <Text style={styles.subtitle}>🌹 الرومانس:</Text>{"\n"}
          • <Text style={styles.benefit}>البنية:</Text> أبيات من 8 مقاطع{"\n"}
          • <Text style={styles.benefit}>النمط:</Text> قافية ناقصة في الأبيات الزوجية{"\n"}
          • <Text style={styles.benefit}>الميزة:</Text> سردي وشعبي{"\n"}
          • <Text style={styles.benefit}>مثال:</Text> رومانسيرو الغجر للوركا
          {"\n\n"}
          <Text style={styles.subtitle}>🎭 السيلفا:</Text>{"\n"}
          • <Text style={styles.benefit}>البنية:</Text> أبيات من 7 و11 مقطع{"\n"}
          • <Text style={styles.benefit}>النمط:</Text> قافية حرة{"\n"}
          • <Text style={styles.benefit}>الميزة:</Text> مرنة ومعبرة{"\n"}
          • <Text style={styles.benefit}>مثال:</Text> الخلوات لغونغورا
          {"\n\n"}
          <Text style={styles.subtitle}>💎 الديسيما:</Text>{"\n"}
          • <Text style={styles.benefit}>البنية:</Text> 10 أبيات من 8 مقاطع{"\n"}
          • <Text style={styles.benefit}>النمط:</Text> ABBAACCDDC{"\n"}
          • <Text style={styles.benefit}>الميزة:</Text> شعبية في أمريكا{"\n"}
          • <Text style={styles.benefit}>مثال:</Text> ديسيمات لوبي دي فيغا
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Ejemplos prácticos de análisis</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎭 Ejemplo 1: Soneto de Quevedo</Text>{"\n"}
          <Text style={styles.benefit}>"Amor constante más allá de la muerte"</Text>{"\n"}
          Cerrar podrá mis ojos la postrera{"\n"}
          sombra que me llevare el blanco día,{"\n"}
          y podrá desatar esta alma mía{"\n"}
          hora a su afán ansioso lisonjera;{"\n"}
          {"\n"}
          <Text style={styles.benefit}>Análisis:</Text>{"\n"}
          • <Text style={styles.benefit}>Métrica:</Text> Endecasílabos (11 sílabas){"\n"}
          • <Text style={styles.benefit}>Rima:</Text> ABBA (rima abrazada){"\n"}
          • <Text style={styles.benefit}>Tema:</Text> Amor eterno más allá de la muerte
          {"\n\n"}
          <Text style={styles.subtitle}>🌹 Ejemplo 2: Romance de Lorca</Text>{"\n"}
          <Text style={styles.benefit}>"Romance de la luna, luna"</Text>{"\n"}
          La luna vino a la fragua{"\n"}
          con su polisón de nardos.{"\n"}
          El niño la mira, mira.{"\n"}
          El niño la está mirando.{"\n"}
          {"\n"}
          <Text style={styles.benefit}>Análisis:</Text>{"\n"}
          • <Text style={styles.benefit}>Métrica:</Text> Octosílabos (8 sílabas){"\n"}
          • <Text style={styles.benefit}>Rima:</Text> Asonante en versos pares (-a-o){"\n"}
          • <Text style={styles.benefit}>Tema:</Text> Muerte y poesía popular
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>🎭 مثال 1: سونيتة كيفيدو</Text>{"\n"}
          <Text style={styles.benefit}>"حب ثابت يتجاوز الموت"</Text>{"\n"}
          Cerrar podrá mis ojos la postrera{"\n"}
          sombra que me llevare el blanco día,{"\n"}
          y podrá desatar esta alma mía{"\n"}
          hora a su afán ansioso lisonjera;{"\n"}
          {"\n"}
          <Text style={styles.benefit}>التحليل:</Text>{"\n"}
          • <Text style={styles.benefit}>العروض:</Text> 11 مقطع{"\n"}
          • <Text style={styles.benefit}>القافية:</Text> ABBA (قافية محيطة){"\n"}
          • <Text style={styles.benefit}>الموضوع:</Text> الحب الأبدي يتجاوز الموت
          {"\n\n"}
          <Text style={styles.subtitle}>🌹 مثال 2: رومانس لوركا</Text>{"\n"}
          <Text style={styles.benefit}>"رومانس القمر، قمر"</Text>{"\n"}
          La luna vino a la fragua{"\n"}
          con su polisón de nardos.{"\n"}
          El niño la mira, mira.{"\n"}
          El niño la está mirando.{"\n"}
          {"\n"}
          <Text style={styles.benefit}>التحليل:</Text>{"\n"}
          • <Text style={styles.benefit}>العروض:</Text> 8 مقاطع{"\n"}
          • <Text style={styles.benefit}>القافية:</Text> ناقصة في الأبيات الزوجية (-a-o){"\n"}
          • <Text style={styles.benefit}>الموضوع:</Text> الموت والشعر الشعبي
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Recursos literarios en poesía</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>✨ Figuras retóricas principales:</Text>{"\n"}
          • <Text style={styles.benefit}>Metáfora:</Text> Comparación implícita (Tus ojos son estrellas){"\n"}
          • <Text style={styles.benefit}>Símil:</Text> Comparación explícita (Tus ojos como estrellas){"\n"}
          • <Text style={styles.benefit}>Hipérbole:</Text> Exageración (Te amo más que las estrellas){"\n"}
          • <Text style={styles.benefit}>Personificación:</Text> Atribuir cualidades humanas a objetos{"\n"}
          • <Text style={styles.benefit}>Aliteración:</Text> Repetición de sonidos (El viento vuela){"\n"}
          • <Text style={styles.benefit}>Onomatopeya:</Text> Imitación de sonidos (Tic-tac del reloj)
          {"\n\n"}
          <Text style={styles.subtitle}>🎵 Recursos fónicos:</Text>{"\n"}
          • <Text style={styles.benefit}>Rima:</Text> Semejanza de sonidos finales{"\n"}
          • <Text style={styles.benefit}>Ritmo:</Text> Cadencia musical del verso{"\n"}
          • <Text style={styles.benefit}>Métrica:</Text> Medida y estructura silábica{"\n"}
          • <Text style={styles.benefit}>Encabalgamiento:</Text> Continuación de una frase en el verso siguiente
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>✨ البلاغة الرئيسية:</Text>{"\n"}
          • <Text style={styles.benefit}>الاستعارة:</Text> تشبيه ضمني (عيونك نجوم){"\n"}
          • <Text style={styles.benefit}>التشبيه:</Text> تشبيه صريح (عيونك مثل النجوم){"\n"}
          • <Text style={styles.benefit}>المبالغة:</Text> مبالغة (أحبك أكثر من النجوم){"\n"}
          • <Text style={styles.benefit}>التجسيد:</Text> إعطاء صفات بشرية للأشياء{"\n"}
          • <Text style={styles.benefit}>الجناس:</Text> تكرار الأصوات (الريح تطير){"\n"}
          • <Text style={styles.benefit}>المحاكاة الصوتية:</Text> تقليد الأصوات (تيك تاك الساعة)
          {"\n\n"}
          <Text style={styles.subtitle}>🎵 الموارد الصوتية:</Text>{"\n"}
          • <Text style={styles.benefit}>القافية:</Text> تشابه الأصوات النهائية{"\n"}
          • <Text style={styles.benefit}>الإيقاع:</Text> النغمة الموسيقية للبيت{"\n"}
          • <Text style={styles.benefit}>العروض:</Text> قياس وبنية المقاطع{"\n"}
          • <Text style={styles.benefit}>التعاند:</Text> استمرار جملة في البيت التالي
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido sobre la poesía española con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته حول الشعر الإسباني مع هذه التمارين التفاعلية.</Text>
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
