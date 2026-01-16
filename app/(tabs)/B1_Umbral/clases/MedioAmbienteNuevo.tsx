import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { LinearGradient } from 'expo-linear-gradient';

export default function MedioAmbienteNuevo() {
  const router = useRouter();

  const ejercicios = [
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "sostenibilidad"?',
      opciones: ['Crecimiento económico sin límites', 'Uso responsable de los recursos naturales', 'Contaminación del aire', 'Producción de basura'],
      respuestaCorrecta: 1
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es el "reciclaje"?',
      opciones: ['Tirar basura', 'Procesar materiales usados para crear nuevos productos', 'Comprar productos nuevos', 'Contaminar el medio ambiente'],
      respuestaCorrecta: 1
    },
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada acción con su beneficio ambiental:',
      pares: [
        { izquierda: 'Usar bolsas reutilizables', derecha: 'Reducir residuos plásticos' },
        { izquierda: 'Ir en bicicleta al trabajo', derecha: 'Disminuir la contaminación del aire' },
        { izquierda: 'Comprar productos locales', derecha: 'Reducir la huella de carbono' },
        { izquierda: 'Ahorrar agua', derecha: 'Conservar recursos naturales' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué son las "energías renovables"?',
      opciones: ['Energías que se agotan', 'Energías que no se agotan y son limpias', 'Energías contaminantes', 'Energías caras'],
      respuestaCorrecta: 1
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "cambio climático"?',
      opciones: ['Cambio de estaciones', 'Alteración del clima global por actividades humanas', 'Cambio de temperatura diario', 'Cambio de viento'],
      respuestaCorrecta: 1
    },
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de energía con su descripción:',
      pares: [
        { izquierda: 'Energía solar', derecha: 'Energía del sol captada por paneles' },
        { izquierda: 'Energía eólica', derecha: 'Energía del viento captada por molinos' },
        { izquierda: 'Energía hidráulica', derecha: 'Energía del agua en movimiento' },
        { izquierda: 'Energía geotérmica', derecha: 'Energía del calor de la tierra' }
      ]
    },
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "contaminación"?',
      opciones: ['Limpieza del medio ambiente', 'Introducción de sustancias nocivas en el medio ambiente', 'Reciclaje de materiales', 'Ahorro de energía'],
      respuestaCorrecta: 1
    },
    {
      tipo: 'reflexion',
      titulo: 'Carta al alcalde',
      texto: 'Escribe una carta al alcalde de tu ciudad proponiendo tres medidas para mejorar el medio ambiente. Incluye acciones específicas y explica por qué son importantes.'
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
        source={{ uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de medio ambiente y naturaleza"
      />
      
      <Text style={styles.title}>Medio ambiente y sostenibilidad</Text>
      <Text style={styles.titleAr}>البيئة والاستدامة</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contexto</Text>
        <Text style={styles.sectionText}>
          El medio ambiente es fundamental para la vida en la Tierra. 
          {"\n\n"}
          Los problemas ambientales como el cambio climático, la contaminación y la pérdida de biodiversidad requieren acciones urgentes de todos los ciudadanos. 
          {"\n\n"}
          La sostenibilidad busca satisfacer las necesidades actuales sin comprometer las de las generaciones futuras, promoviendo un desarrollo equilibrado entre economía, sociedad y medio ambiente.
        </Text>
        <Text style={styles.sectionTextAr}>
          البيئة أساسية للحياة على الأرض.
          {"\n\n"}
          المشاكل البيئية مثل تغير المناخ والتلوث وفقدان التنوع البيولوجي تتطلب إجراءات عاجلة من جميع المواطنين.
          {"\n\n"}
          تسعى الاستدامة إلى تلبية الاحتياجات الحالية دون المساس باحتياجات الأجيال القادمة، وتعزيز التنمية المتوازنة بين الاقتصاد والمجتمع والبيئة.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulario clave</Text>
        <Text style={styles.sectionText}>
          medio ambiente = بيئة{"\n"}
          sostenibilidad = استدامة{"\n"}
          reciclaje = إعادة تدوير{"\n"}
          contaminación = تلوث{"\n"}
          cambio climático = تغير المناخ{"\n"}
          energías renovables = طاقات متجددة{"\n"}
          biodiversidad = تنوع بيولوجي{"\n"}
          residuos = نفايات{"\n"}
          conservación = حماية{"\n"}
          ecología = علم البيئة{"\n"}
          huella de carbono = البصمة الكربونية{"\n"}
          desarrollo sostenible = تنمية مستدامة{"\n"}
          recursos naturales = موارد طبيعية{"\n"}
          protección ambiental = حماية البيئة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problemas ambientales principales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Cambio climático:</Text>{"\n"}
          • Aumento de temperaturas globales{"\n"}
          • Derretimiento de glaciares{"\n"}
          • Aumento del nivel del mar{"\n"}
          • Fenómenos meteorológicos extremos
          {"\n\n"}
          <Text style={styles.subtitle}>Contaminación:</Text>{"\n"}
          • Contaminación del aire{"\n"}
          • Contaminación del agua{"\n"}
          • Contaminación del suelo{"\n"}
          • Contaminación acústica
          {"\n\n"}
          <Text style={styles.subtitle}>Pérdida de biodiversidad:</Text>{"\n"}
          • Extinción de especies{"\n"}
          • Destrucción de hábitats{"\n"}
          • Deforestación{"\n"}
          • Sobreexplotación de recursos
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>تغير المناخ:</Text>{"\n"}
          • ارتفاع درجات الحرارة العالمية{"\n"}
          • ذوبان الأنهار الجليدية{"\n"}
          • ارتفاع مستوى سطح البحر{"\n"}
          • ظواهر مناخية متطرفة
          {"\n\n"}
          <Text style={styles.subtitle}>التلوث:</Text>{"\n"}
          • تلوث الهواء{"\n"}
          • تلوث الماء{"\n"}
          • تلوث التربة{"\n"}
          • التلوث الضوضائي
          {"\n\n"}
          <Text style={styles.subtitle}>فقدان التنوع البيولوجي:</Text>{"\n"}
          • انقراض الأنواع{"\n"}
          • تدمير الموائل{"\n"}
          • إزالة الغابات{"\n"}
          • الاستغلال المفرط للموارد
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Energías renovables</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Energía solar:</Text> Captada por paneles solares{"\n"}
          • <Text style={styles.benefit}>Energía eólica:</Text> Generada por el viento{"\n"}
          • <Text style={styles.benefit}>Energía hidráulica:</Text> Producida por el agua{"\n"}
          • <Text style={styles.benefit}>Energía geotérmica:</Text> Obtenida del calor de la tierra{"\n"}
          • <Text style={styles.benefit}>Energía mareomotriz:</Text> Generada por las mareas{"\n"}
          • <Text style={styles.benefit}>Biomasa:</Text> Energía de materia orgánica
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.benefit}>الطاقة الشمسية:</Text> يتم التقاطها بواسطة الألواح الشمسية{"\n"}
          • <Text style={styles.benefit}>طاقة الرياح:</Text> تولدها الرياح{"\n"}
          • <Text style={styles.benefit}>الطاقة الكهرومائية:</Text> تنتجها المياه{"\n"}
          • <Text style={styles.benefit}>الطاقة الحرارية الأرضية:</Text> تستخرج من حرارة الأرض{"\n"}
          • <Text style={styles.benefit}>طاقة المد والجزر:</Text> تولدها المد والجزر{"\n"}
          • <Text style={styles.benefit}>الكتلة الحيوية:</Text> طاقة من المواد العضوية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones para proteger el medio ambiente</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>En casa:</Text>{"\n"}
          1. <Text style={styles.tip}>Ahorrar energía:</Text> Usar bombillas LED{"\n"}
          2. <Text style={styles.tip}>Ahorrar agua:</Text> Cerrar grifos correctamente{"\n"}
          3. <Text style={styles.tip}>Reciclar:</Text> Separar residuos correctamente{"\n"}
          4. <Text style={styles.tip}>Reducir residuos:</Text> Usar productos reutilizables
          {"\n\n"}
          <Text style={styles.subtitle}>En el transporte:</Text>{"\n"}
          1. <Text style={styles.tip}>Transporte público:</Text> Usar autobús o metro{"\n"}
          2. <Text style={styles.tip}>Bicicleta:</Text> Para trayectos cortos{"\n"}
          3. <Text style={styles.tip}>Caminar:</Text> Para distancias cercanas{"\n"}
          4. <Text style={styles.tip}>Compartir coche:</Text> Reducir emisiones
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>في المنزل:</Text>{"\n"}
          1. <Text style={styles.tip}>توفير الطاقة:</Text> استخدام مصابيح LED{"\n"}
          2. <Text style={styles.tip}>توفير الماء:</Text> إغلاق الصنبور بشكل صحيح{"\n"}
          3. <Text style={styles.tip}>إعادة التدوير:</Text> فصل النفايات بشكل صحيح{"\n"}
          4. <Text style={styles.tip}>تقليل النفايات:</Text> استخدام منتجات قابلة لإعادة الاستخدام
          {"\n\n"}
          <Text style={styles.subtitle}>في النقل:</Text>{"\n"}
          1. <Text style={styles.tip}>النقل العام:</Text> استخدام الحافلة أو المترو{"\n"}
          2. <Text style={styles.tip}>الدراجة:</Text> للمسافات القصيرة{"\n"}
          3. <Text style={styles.tip}>المشي:</Text> للمسافات القريبة{"\n"}
          4. <Text style={styles.tip}>مشاركة السيارة:</Text> تقليل الانبعاثات
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejemplo de diálogo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.dialogueTitle}>Conversación sobre medio ambiente:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>María:</Text> ¿Qué haces para proteger el medio ambiente?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Reciclo en casa y uso transporte público.{"\n"}
          <Text style={styles.speaker}>María:</Text> ¿Qué más podríamos hacer?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Podríamos usar energías renovables y reducir el consumo de plástico.{"\n"}
          <Text style={styles.speaker}>María:</Text> ¿Te preocupa el cambio climático?{"\n"}
          <Text style={styles.speaker}>Ahmed:</Text> Sí, mucho. Necesitamos actuar ahora para proteger el futuro.
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.dialogueTitle}>محادثة حول البيئة:</Text>
          {"\n\n"}
          <Text style={styles.speaker}>ماريا:</Text> ماذا تفعل لحماية البيئة؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> أعيد التدوير في المنزل وأستخدم النقل العام.{"\n"}
          <Text style={styles.speaker}>ماريا:</Text> ماذا يمكننا أن نفعل أكثر؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> يمكننا استخدام الطاقات المتجددة وتقليل استهلاك البلاستيك.{"\n"}
          <Text style={styles.speaker}>ماريا:</Text> هل يقلقك تغير المناخ؟{"\n"}
          <Text style={styles.speaker}>أحمد:</Text> نعم، كثيراً. نحتاج للعمل الآن لحماية المستقبل.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad de reflexión</Text>
        <Text style={styles.sectionText}>
          Reflexiona sobre el medio ambiente:{"\n\n"}
          • ¿Qué problemas ambientales te preocupan más?{"\n"}
          • ¿Qué acciones realizas para proteger el medio ambiente?{"\n"}
          • ¿Cómo podrías mejorar tus hábitos ambientales?{"\n"}
          • ¿Qué medidas ambientales te gustaría que implementara tu ciudad?
        </Text>
        <Text style={styles.sectionTextAr}>
          فكر في البيئة:{"\n\n"}
          • ما المشاكل البيئية التي تقلقك أكثر؟{"\n"}
          • ما الإجراءات التي تتخذها لحماية البيئة؟{"\n"}
          • كيف يمكنك تحسين عاداتك البيئية؟{"\n"}
          • ما التدابير البيئية التي تود أن تطبقها مدينتك؟
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} />
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
});

