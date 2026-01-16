import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoPeluqueriaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Curso de Peluquería Profesional</Text>
            <Text style={styles.headerTitleAr}>دورة تصفيف الشعر المهنية</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>🎯 Objetivos del curso / أهداف الدورة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Conocer la anatomía del cabello y su ciclo de crecimiento.</Text>
          <Text style={styles.arabicText}>معرفة تشريح الشعر ودورة نموه.</Text>
          <Text style={styles.bulletPoint}>• Dominar técnicas básicas y avanzadas de corte, color y peinado.</Text>
          <Text style={styles.arabicText}>إتقان تقنيات القص والتلوين والتصفيف الأساسية والمتقدمة.</Text>
          <Text style={styles.bulletPoint}>• Desarrollar habilidades de asesoría de imagen y atención al cliente.</Text>
          <Text style={styles.arabicText}>تطوير مهارات استشارة الصورة وخدمة العملاء.</Text>
          <Text style={styles.bulletPoint}>• Gestionar el salón con estándares de seguridad e higiene europeos.</Text>
          <Text style={styles.arabicText}>إدارة الصالون وفق معايير السلامة والنظافة الأوروبية.</Text>
        </View>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>

        <Text style={styles.subsectionTitle}>MÓDULO 1: FUNDAMENTOS DEL CABELLO / الوحدة 1: أساسيات الشعر</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Estructura del cabello: cutícula, corteza y médula.</Text>
          <Text style={styles.arabicText}>تركيب الشعر: القشرة واللب والغلاف الخارجي.</Text>
          <Text style={styles.bulletPoint}>• Tipologías de cabello (liso, ondulado, rizado, afro).</Text>
          <Text style={styles.arabicText}>أنواع الشعر: المستقيم، المموج، المجعد، الأفرو.</Text>
          <Text style={styles.bulletPoint}>• Salud capilar: hidratación, nutrición y reconstrucción.</Text>
          <Text style={styles.arabicText}>صحة الشعر: الترطيب، التغذية، إعادة البناء.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Diagnóstico inicial del cabello</Text>
            <Text style={styles.tableHeader}>Observación | Indicador | Recomendación</Text>
            <Text style={styles.tableRow}>Porosidad | Cutícula levantada | Tratamiento hidratante semanal</Text>
            <Text style={styles.tableRow}>Elasticidad | Se rompe al estirar | Terapia reparadora con proteínas</Text>
            <Text style={styles.tableRow}>Densidad | Cuero cabelludo visible | Corte con volumen y productos densificadores</Text>
            <Text style={styles.tableNote}>Realiza el diagnóstico con cabello limpio, sin productos y bajo luz natural.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 2: HIGIENE Y PREPARACIÓN / الوحدة 2: النظافة والتحضير</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Protocolos de higiene y desinfección de herramientas.</Text>
          <Text style={styles.arabicText}>بروتوكولات النظافة وتعقيم الأدوات.</Text>
          <Text style={styles.bulletPoint}>• Lavado profesional: diagnóstico, productos y técnicas.</Text>
          <Text style={styles.arabicText}>الغسل الاحترافي: التشخيص، المنتجات والتقنيات.</Text>
          <Text style={styles.bulletPoint}>• Masajes capilares y preparación del cuero cabelludo.</Text>
          <Text style={styles.arabicText}>التدليك الفروة والتحضير قبل الخدمات.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Ficha de sanitización diaria</Text>
            <Text style={styles.tableHeader}>Área | Acción | Frecuencia | Producto</Text>
            <Text style={styles.tableRow}>Sillones | Limpiar y desinfectar | Cada cliente | Antiséptico de uso profesional</Text>
            <Text style={styles.tableRow}>Herramientas de corte | Esterilizar por inmersión | Cada servicio | Solución barbicida</Text>
            <Text style={styles.tableRow}>Lavacabezas | Enjuague anti-cal | Fin de jornada | Vinagre cosmético o antical</Text>
            <Text style={styles.tableNote}>Registra la sanitización en un checklist visible para el cliente.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 3: TÉCNICAS DE CORTE / الوحدة 3: تقنيات القص</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Herramientas: tijeras, navajas, máquinas y peines.</Text>
          <Text style={styles.arabicText}>الأدوات: المقصات، الشفرات، الآلات، الأمشاط.</Text>
          <Text style={styles.bulletPoint}>• Cortes básicos: recto, degradado, capas y bob.</Text>
          <Text style={styles.arabicText}>القصات الأساسية: المستقيم، التدرج، الطبقات، كاريه.</Text>
          <Text style={styles.bulletPoint}>• Técnicas de texturizado y personalización.</Text>
          <Text style={styles.arabicText}>تقنيات تفتيح وتخصيص القص.</Text>
          <Text style={styles.exampleText}>Secuencia de corte bob clásico: secciones horizontales, control del ángulo de elevación a 0°, pulido con tijera de entresacar al 20 %.</Text>
          <Text style={styles.exampleText}>Personalización avanzada: utiliza "point cutting" para suavizar líneas y "slicing" para aportar movimiento sin perder densidad.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 4: COLORIMETRÍA / الوحدة 4: تلوين الشعر</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Teoría del color: círculo cromático y alturas de color.</Text>
          <Text style={styles.arabicText}>نظرية اللون: الدائرة اللونية ودرجات اللون.</Text>
          <Text style={styles.bulletPoint}>• Técnicas de coloración: global, mechas, balayage y babylights.</Text>
          <Text style={styles.arabicText}>تقنيات التلوين: الشامل، الخصلات، بالياج، بايبي لايتس.</Text>
          <Text style={styles.bulletPoint}>• Decoloración y cuidados posteriores.</Text>
          <Text style={styles.arabicText}>تفتيح الشعر والعناية بعد التلوين.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Formulación express</Text>
            <Text style={styles.tableHeader}>Objetivo | Base natural | Fórmula sugerida | Tono matiz</Text>
            <Text style={styles.tableRow}>Rubio beige | Altura 5 cálida | Decoloración + matiz 9.13 | Reflejo frío beige</Text>
            <Text style={styles.tableRow}>Cobre intenso | Altura 7 neutra | Color directo 7.44 + oxidante 20 vol | Refuerzo de cobre</Text>
            <Text style={styles.tableRow}>Castaño frío | Altura 4 con canas | Mezcla 4.1 + 4N + oxidante 10 vol | Cobertura total</Text>
            <Text style={styles.tableNote}>Ajusta el oxidante según la porosidad y el porcentaje de canas.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 5: PEINADOS Y ESTILISMO / الوحدة 5: التسريحات والأناقة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Brushing, planchado y ondas con herramientas térmicas.</Text>
          <Text style={styles.arabicText}>التسريح بالتجفيف، التمليس، والتموج باستخدام الأدوات الحرارية.</Text>
          <Text style={styles.bulletPoint}>• Recogidos clásicos y modernos para eventos.</Text>
          <Text style={styles.arabicText}>تسريحات مرفوعة كلاسيكية وحديثة للمناسبات.</Text>
          <Text style={styles.bulletPoint}>• Uso de accesorios y productos de fijación.</Text>
          <Text style={styles.arabicText}>استخدام الإكسسوارات ومنتجات التثبيت.</Text>
          <Text style={styles.exampleText}>Ejemplo de recogido romántico: base ondulada, cardado suave en coronilla, torsiones laterales fijadas con horquillas invisibles, acabado con spray flexible.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 6: BARBERÍA Y CUIDADO MASCULINO / الوحدة 6: الحلاقة والعناية الرجالية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Diseño de barba y bigote.</Text>
          <Text style={styles.arabicText}>تصميم اللحية والشارب.</Text>
          <Text style={styles.bulletPoint}>• Cortes clásicos y fades.</Text>
          <Text style={styles.arabicText}>قصات كلاسيكية وقصات "فَيْد" الحديثة.</Text>
          <Text style={styles.bulletPoint}>• Tratamientos capilares masculinos.</Text>
          <Text style={styles.arabicText}>علاجات الشعر الرجالية.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Mapa de cortes masculinos</Text>
            <Text style={styles.tableHeader}>Estilo | Altura | Transición | Recomendación</Text>
            <Text style={styles.tableRow}>Fade bajo | Nivel 1-2 | Suave | Ideal para rostros redondeados</Text>
            <Text style={styles.tableRow}>Pompadour | Laterales nivel 3 | Marcada | Perfecto para cabellos densos</Text>
            <Text style={styles.tableRow}>Clásico ejecutivo | Nivel uniforme 4 | Sin transición | Apariencia profesional</Text>
            <Text style={styles.tableNote}>Complementa con aceites para barba y bálsamos moldeadores.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 7: TRATAMIENTOS CAPILARES / الوحدة 7: العلاجات الشعرية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Hidrataciones profundas y botox capilar.</Text>
          <Text style={styles.arabicText}>ترطيب عميق وبوتوكس للشعر.</Text>
          <Text style={styles.bulletPoint}>• Keratina y alisados progresivos.</Text>
          <Text style={styles.arabicText}>الكيراتين والتمليس التدريجي.</Text>
          <Text style={styles.bulletPoint}>• Terapias anti-caída y detox capilar.</Text>
          <Text style={styles.arabicText}>علاجات ضد التساقط وإزالة السموم من الشعر.</Text>
          <Text style={styles.exampleText}>Protocolo detox: exfoliante prelavado, champú purificante, mascarilla detox con arcilla blanca, sellado con spray ácido.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 8: ASESORÍA DE IMAGEN / الوحدة 8: استشارة الصورة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Morfología del rostro y elección de cortes.</Text>
          <Text style={styles.arabicText}>شكل الوجه واختيار القصات المناسبة.</Text>
          <Text style={styles.bulletPoint}>• Armonía entre color de piel, ojos y cabello.</Text>
          <Text style={styles.arabicText}>التناغم بين لون البشرة والعينين والشعر.</Text>
          <Text style={styles.bulletPoint}>• Protocolo de atención al cliente y fidelización.</Text>
          <Text style={styles.arabicText}>بروتوكول خدمة العملاء وبناء الولاء.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Guía rápida morfología</Text>
            <Text style={styles.tableHeader}>Rostro | Corte recomendado | Color sugerido</Text>
            <Text style={styles.tableRow}>Ovalado | Casi todos los estilos | Libertad para experimentar</Text>
            <Text style={styles.tableRow}>Cuadrado | Capas suaves y flequillos largos | Mechas suaves alrededor del rostro</Text>
            <Text style={styles.tableRow}>Triangular | Volumen en la parte superior | Tonos cálidos para equilibrar</Text>
            <Text style={styles.tableNote}>Usa fichas de color y fotos de referencia durante la asesoría.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 9: GESTIÓN DEL SALÓN / الوحدة 9: إدارة صالون التجميل</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Organización del espacio y flujo de trabajo.</Text>
          <Text style={styles.arabicText}>تنظيم المكان وتدفق العمل.</Text>
          <Text style={styles.bulletPoint}>• Control de inventario y compras inteligentes.</Text>
          <Text style={styles.arabicText}>التحكم بالمخزون والمشتريات الذكية.</Text>
          <Text style={styles.bulletPoint}>• Marketing básico y redes sociales para peluquerías.</Text>
          <Text style={styles.arabicText}>التسويق الأساسي ووسائل التواصل الاجتماعي لصالونات التجميل.</Text>
          <Text style={styles.exampleText}>Tips de marketing: crea contenido antes/después, ofrece promociones combinadas (color + tratamiento), gestiona reseñas en Google My Business.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 10: TENDENCIAS Y MODA CAPILAR / الوحدة 10: أحدث صيحات الشعر</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Observación de tendencias globales y locales.</Text>
          <Text style={styles.arabicText}>مراقبة الصيحات العالمية والمحلية.</Text>
          <Text style={styles.bulletPoint}>• Inspiración en pasarelas y editoriales.</Text>
          <Text style={styles.arabicText}>الاستلهام من عروض الأزياء والمجلات.</Text>
          <Text style={styles.bulletPoint}>• Adaptación al estilo personal del cliente.</Text>
          <Text style={styles.arabicText}>التكيف مع أسلوب العميل الشخصي.</Text>
        </View>

        <Text style={styles.sectionTitle}>💼 Recursos y plantillas / الموارد والقوالب</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Guiones de asesoría inicial para entrevistas con el cliente.</Text>
          <Text style={styles.bulletPoint}>• Checklist de higiene y mantenimiento diario del salón.</Text>
          <Text style={styles.bulletPoint}>• Guía rápida de combinaciones de color según estilos.</Text>
          <Text style={styles.bulletPoint}>• Tabla de precios sugeridos por servicio (orientada al mercado español).</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Ejemplo orientativo (IVA incl.)</Text>
            <Text style={styles.tableHeader}>Servicio | Duración | Precio sugerido</Text>
            <Text style={styles.tableRow}>Corte y peinado | 45 min | 28 €</Text>
            <Text style={styles.tableRow}>Coloración global | 90 min | 48 €</Text>
            <Text style={styles.tableRow}>Keratina | 150 min | 120 €</Text>
            <Text style={styles.tableRow}>Barbería premium | 40 min | 22 €</Text>
            <Text style={styles.tableNote}>Adapta los precios a tu ciudad y a tu posicionamiento.</Text>
          </View>
          <Text style={styles.arabicText}>كتيبات للاستشارة، قوائم التحقق للنظافة، ودليل ألوان سريع.</Text>
        </View>

        <Text style={styles.sectionTitle}>🎓 Certificación / الشهادة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Tras completar todos los módulos, obtendrás un certificado de aprovechamiento.</Text>
          <Text style={styles.arabicText}>بعد إكمال جميع الوحدات ستحصل على شهادة إتمام الدورة.</Text>
          <Text style={styles.bulletPoint}>• Te recomendamos crear un portafolio fotográfico de tus trabajos.</Text>
          <Text style={styles.arabicText}>ننصحك بإنشاء ملف صور لأعمالك كجزء من tu desarrollo profesional.</Text>
          <Text style={styles.exampleText}>Portafolio recomendado: incluye fotos en alta resolución, descripción del servicio, productos utilizados y testimonios de clientes.</Text>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
    textAlign: 'left',
  },
  headerTitleAr: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#F5EEF8',
    padding: 10,
    borderRadius: 8,
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
  exampleText: {
    fontSize: 14,
    color: '#5B2C6F',
    fontStyle: 'italic',
    marginBottom: 12,
    backgroundColor: '#F8F0FF',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#8E44AD',
  },
  arabicText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Arial',
    lineHeight: 24,
  },
  tableExample: {
    backgroundColor: '#F4ECF7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#7D3C98',
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B2C6F',
    marginBottom: 6,
  },
  tableHeader: {
    fontSize: 14,
    color: '#6C3483',
    marginBottom: 4,
  },
  tableRow: {
    fontSize: 14,
    color: '#2F4F4F',
    marginBottom: 3,
    lineHeight: 20,
  },
  tableNote: {
    fontSize: 13,
    color: '#4A235A',
    fontStyle: 'italic',
    marginTop: 6,
  },
});
