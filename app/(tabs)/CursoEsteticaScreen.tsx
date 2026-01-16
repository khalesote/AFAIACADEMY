import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoEsteticaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Curso de Estética Profesional</Text>
            <Text style={styles.headerTitleAr}>دورة التجميل المهنية</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>🎯 Objetivos del curso / أهداف الدورة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Comprender la anatomía de la piel y sus necesidades.</Text>
          <Text style={styles.arabicText}>فهم تشريح الجلد واحتياجاته.</Text>
          <Text style={styles.bulletPoint}>• Dominar protocolos de tratamientos faciales y corporales.</Text>
          <Text style={styles.arabicText}>إتقان بروتوكولات العلاجات للوجه والجسم.</Text>
          <Text style={styles.bulletPoint}>• Aplicar normas de higiene, bioseguridad y ética profesional.</Text>
          <Text style={styles.arabicText}>تطبيق معايير النظافة والسلامة الحيوية والأخلاقيات المهنية.</Text>
          <Text style={styles.bulletPoint}>• Desarrollar habilidades de asesoría, venta de productos y fidelización.</Text>
          <Text style={styles.arabicText}>تطوير مهارات الاستشارة وبيع المنتجات وكسب ولاء العملاء.</Text>
        </View>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>

        <Text style={styles.subsectionTitle}>MÓDULO 1: ANATOMÍA Y FISIOLOGÍA DE LA PIEL / الوحدة 1: تشريح وفسيولوجيا الجلد</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Capas de la piel: epidermis, dermis e hipodermis.</Text>
          <Text style={styles.arabicText}>طبقات الجلد: البشرة، الأدمة، ما تحت الجلد.</Text>
          <Text style={styles.bulletPoint}>• Anexos cutáneos: glándulas sebáceas, sudoríparas y folículos.</Text>
          <Text style={styles.arabicText}>ملحقات الجلد: الغدد الدهنية والعرقية وبصيلات الشعر.</Text>
          <Text style={styles.bulletPoint}>• Tipologías cutáneas: normal, seca, grasa, mixta y sensible.</Text>
          <Text style={styles.arabicText}>أنواع البشرة: العادية، الجافة، الدهنية، المختلطة، الحساسة.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Diagnóstico básico de la piel</Text>
            <Text style={styles.tableHeader}>Tipo | Signos | Recomendación inicial</Text>
            <Text style={styles.tableRow}>Seca | Tirantez, descamación | Limpieza suave + crema nutritiva</Text>
            <Text style={styles.tableRow}>Grasa | Brillos, poros dilatados | Gel seborregulador + exfoliación suave</Text>
            <Text style={styles.tableRow}>Sensible | Enrojecimiento, reactividad | Productos calmantes sin fragancias</Text>
            <Text style={styles.tableNote}>Realiza el diagnóstico con la piel limpia, sin maquillaje y bajo luz blanca.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 2: HIGIENE Y BIOSEGURIDAD / الوحدة 2: النظافة والسلامة الحيوية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Lavado de manos clínico y uso de guantes.</Text>
          <Text style={styles.arabicText}>غسل اليدين سريريًا واستخدام القفازات.</Text>
          <Text style={styles.bulletPoint}>• Desinfección y esterilización de instrumental.</Text>
          <Text style={styles.arabicText}>تعقيم الأدوات وتطهيرها.</Text>
          <Text style={styles.bulletPoint}>• Gestión de residuos biológicos.</Text>
          <Text style={styles.arabicText}>التخلص من النفايات البيولوجية.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Checklist de bioseguridad</Text>
            <Text style={styles.tableHeader}>Acción | Frecuencia | Responsable</Text>
            <Text style={styles.tableRow}>Sanitizar cabinas | Antes de cada cliente | Esteticista asignada</Text>
            <Text style={styles.tableRow}>Reemplazar sábanas | Uso único | Personal de apoyo</Text>
            <Text style={styles.tableRow}>Control UV de equipos | Semanal | Encargada técnica</Text>
            <Text style={styles.tableNote}>Registra cada control en un cuaderno de bioseguridad.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 3: COSMETOLOGÍA Y PRODUCTOS / الوحدة 3: علم التجميل والمنتجات</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Principios activos: hidratantes, antioxidantes, despigmentantes.</Text>
          <Text style={styles.arabicText}>المكونات الفعالة: مرطبة، مضادة للأكسدة، مفتحة للبشرة.</Text>
          <Text style={styles.bulletPoint}>• Tipos de cosméticos: limpiadores, tónicos, sérums, mascarillas.</Text>
          <Text style={styles.arabicText}>أنواع مستحضرات التجميل: منظفات، تونر، سيروم، أقنعة.</Text>
          <Text style={styles.bulletPoint}>• Criterios de selección según biotipo y biocondición.</Text>
          <Text style={styles.arabicText}>معايير اختيار المنتجات حسب نوع وحالة البشرة.</Text>
          <Text style={styles.exampleText}>Ejemplo: para piel mixta con deshidratación usa gel limpiador suave, tónico equilibrante y sérum con ácido hialurónico + niacinamida.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 4: TRATAMIENTOS FACIALES / الوحدة 4: علاجات الوجه</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Limpieza facial profunda paso a paso.</Text>
          <Text style={styles.arabicText}>تنظيف عميق للوجه خطوة بخطوة.</Text>
          <Text style={styles.bulletPoint}>• Protocolos para pieles sensibles, acneicas y maduras.</Text>
          <Text style={styles.arabicText}>بروتوكولات للبشرة الحساسة والمعرضة لحب الشباب والمتقدمة في العمر.</Text>
          <Text style={styles.bulletPoint}>• Uso de aparatología: vapor ozono, alta frecuencia, ultrasonido.</Text>
          <Text style={styles.arabicText}>استخدام أجهزة: البخار بالأوزون، التردد العالي، الموجات فوق الصوتية.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Protocolo facial anti-edad</Text>
            <Text style={styles.tableHeader}>Paso | Objetivo | Producto/aparato</Text>
            <Text style={styles.tableRow}>1. Doble limpieza | Retirar impurezas | Aceite desmaquillante + gel suave</Text>
            <Text style={styles.tableRow}>2. Exfoliación enzimática | Renovación | Peel suave de papaya</Text>
            <Text style={styles.tableRow}>3. Masaje lifting | Estimular circulación | Crema con colágeno</Text>
            <Text style={styles.tableRow}>4. Máscara antiedad | Nutrir e hidratar | Mascarilla de ácido hialurónico</Text>
            <Text style={styles.tableRow}>5. Protección solar | Sellar tratamiento | SPF 50 amplio espectro</Text>
            <Text style={styles.tableNote}>Adapta el protocolo según alergias y condiciones médicas.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 5: TRATAMIENTOS CORPORALES / الوحدة 5: علاجات الجسم</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Exfoliaciones corporales y envolturas.</Text>
          <Text style={styles.arabicText}>تقشير الجسم واللفافات.</Text>
          <Text style={styles.bulletPoint}>• Masajes reductores, drenaje linfático y relajantes.</Text>
          <Text style={styles.arabicText}>جلسات التدليك للتنحيف، التصريف اللمفاوي والاسترخاء.</Text>
          <Text style={styles.bulletPoint}>• Uso de aparatología: cavitación, radiofrecuencia, presoterapia.</Text>
          <Text style={styles.arabicText}>استخدام الأجهزة: التفجّر الدهني، التردد الحراري، الضغط الهوائي.</Text>
          <Text style={styles.exampleText}>Ejemplo: sesión corporal anticelulítica combinando exfoliación de café, masaje reductor con ventosas y presoterapia de 20 minutos.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 6: DEPILACIÓN Y DISEÑO DE CEJAS / الوحدة 6: إزالة الشعر وتصميم الحواجب</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Técnicas de depilación: cera caliente, tibia, azúcar e hilo.</Text>
          <Text style={styles.arabicText}>تقنيات إزالة الشعر: الشمع الساخن والدافئ، السكر، الخيط.</Text>
          <Text style={styles.bulletPoint}>• Diseños personalizados de cejas según morfología.</Text>
          <Text style={styles.arabicText}>تصاميم الحواجب حسب شكل الوجه.</Text>
          <Text style={styles.bulletPoint}>• Cuidados posteriores para evitar irritaciones.</Text>
          <Text style={styles.arabicText}>العناية بعد إزالة الشعر لتجنب الالتهابات.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 7: MAQUILLAJE PROFESIONAL / الوحدة 7: المكياج الاحترافي</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Tipos de maquillaje: social, novias, fotografía, editorial.</Text>
          <Text style={styles.arabicText}>أنواع المكياج: الاجتماعي، العرائس، التصوير، التحريري.</Text>
          <Text style={styles.bulletPoint}>• Técnica de visagismo para realzar rasgos.</Text>
          <Text style={styles.arabicText}>تقنية الفيزاج لتحديد وإبراز ملامح الوجه.</Text>
          <Text style={styles.bulletPoint}>• Gestión de iluminación y productos de larga duración.</Text>
          <Text style={styles.arabicText}>إدارة الإضاءة ومنتجات طويلة الأمد.</Text>
          <Text style={styles.exampleText}>Propuesta: maquillaje glam de noche con piel glow, ojos ahumados en tonos borgoña y labios nude satinado.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 8: TRATAMIENTOS ESPECIALES / الوحدة 8: العلاجات الخاصة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Tratamientos despigmentantes y antiacné.</Text>
          <Text style={styles.arabicText}>علاجات تفتيح البشرة ومكافحة حب الشباب.</Text>
          <Text style={styles.bulletPoint}>• Procedimientos para pieles maduras y pieles masculinas.</Text>
          <Text style={styles.arabicText}>إجراءات للبشرة المتقدمة عمريًا والبشرة الرجالية.</Text>
          <Text style={styles.bulletPoint}>• Spa urbano: rituales express para clientes con poco tiempo.</Text>
          <Text style={styles.arabicText}>منتجع حضري: طقوس سريعة للعملاء ذوي الوقت المحدود.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 9: ASESORÍA DE IMAGEN Y VENTA CRUZADA / الوحدة 9: استشارة الصورة والبيع المتقاطع</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Análisis de colorimetría personal.</Text>
          <Text style={styles.arabicText}>تحليل الألوان الشخصية.</Text>
          <Text style={styles.bulletPoint}>• Argumentarios para recomendar productos y planes de tratamiento.</Text>
          <Text style={styles.arabicText}>كيفية التوصية بالمنتجات والخطط العلاجية.</Text>
          <Text style={styles.bulletPoint}>• Fidelización: programas de puntos, seguimiento post-servicio.</Text>
          <Text style={styles.arabicText}>كسب ولاء العملاء: برامج النقاط والمتابعة بعد الخدمة.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Plantilla de recomendación en cabina</Text>
            <Text style={styles.tableHeader}>Necesidad detectada | Servicio sugerido | Producto en venta</Text>
            <Text style={styles.tableRow}>Deshidratación | Ritual facial hidratante 60' | Sérum ácido hialurónico</Text>
            <Text style={styles.tableRow}>Estrés | Masaje relajante + aromaterapia | Aceite corporal relajante</Text>
            <Text style={styles.tableRow}>Manchas | Tratamiento despigmentante | Protector solar SPF 50</Text>
            <Text style={styles.tableNote}>Anota en la ficha del cliente para futuras visitas.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 10: GESTIÓN DEL CENTRO ESTÉTICO / الوحدة 10: إدارة مركز التجميل</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Organización de cabinas, agenda y tiempos muertos.</Text>
          <Text style={styles.arabicText}>تنظيم الغرف، الجدول الزمني، وأوقات الفراغ.</Text>
          <Text style={styles.bulletPoint}>• Control de inventario y proveedores.</Text>
          <Text style={styles.arabicText}>التحكم في المخزون والموردين.</Text>
          <Text style={styles.bulletPoint}>• Marketing digital: Instagram, TikTok, Google My Business.</Text>
          <Text style={styles.arabicText}>التسويق الرقمي: إنستغرام، تيك توك، غوغل ماي بزنس.</Text>
          <Text style={styles.exampleText}>Ideas: crea reels de “antes y después”, comparte rutinas express, ofrece descuentos en horarios valle.</Text>
        </View>

        <Text style={styles.sectionTitle}>💼 Recursos y plantillas / الموارد والقوالب</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Guion de entrevista inicial (anamnesis, contraindicaciones).</Text>
          <Text style={styles.bulletPoint}>• Checklist de apertura y cierre del centro.</Text>
          <Text style={styles.bulletPoint}>• Tabla orientativa de precios (IVA incl.):</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Ejemplo para mercado español</Text>
            <Text style={styles.tableHeader}>Servicio | Duración | Precio sugerido</Text>
            <Text style={styles.tableRow}>Limpieza facial profunda | 75 min | 45 €</Text>
            <Text style={styles.tableRow}>Masaje relajante | 50 min | 30 €</Text>
            <Text style={styles.tableRow}>Depilación media pierna | 30 min | 16 €</Text>
            <Text style={styles.tableRow}>Maquillaje novia | 120 min | 95 €</Text>
            <Text style={styles.tableNote}>Ajusta los precios según tu ciudad, experiencia y costos.</Text>
          </View>
          <Text style={styles.arabicText}>نماذج للمقابلات الأولى، قوائم التحقق اليومية، وجدول أسعار استرشادي.</Text>
        </View>

        <Text style={styles.sectionTitle}>🎓 Certificación / الشهادة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Al finalizar todos los módulos, recibirás un certificado de aprovechamiento.</Text>
          <Text style={styles.arabicText}>عند إكمال جميع الوحدات ستحصل على شهادة إتمام.</Text>
          <Text style={styles.bulletPoint}>• Recomendamos crear un portafolio con fotos, protocolos y testimonios.</Text>
          <Text style={styles.arabicText}>ننصحك بإنشاء ملف يضم صورًا، بروتوكولات، وشهادات العملاء.</Text>
          <Text style={styles.exampleText}>Portafolio ideal: ficha del cliente, objetivo del tratamiento, productos usados, resultados observados y seguimiento.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  headerTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
  },
  textBlock: {
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 24,
  },
  arabicText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    lineHeight: 24,
    writingDirection: 'rtl',
  },
  exampleText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tableExample: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  tableRow: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  tableNote: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 5,
  },
});
