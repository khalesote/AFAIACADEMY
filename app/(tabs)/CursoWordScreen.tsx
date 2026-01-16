import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoWordScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header con botón de regreso */}
      <LinearGradient
        colors={['#000', '#000']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/PreFormacionScreen")}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Curso de Microsoft Word</Text>
            <Text style={styles.headerTitleAr}>دورة مايكروسوفت وورد</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás? / ما الذي ستتعلمه؟</Text>
        <Text style={styles.textBlock}>
          <Text>• Fundamentos de Microsoft Word y su interfaz</Text>
          <Text style={styles.arabicText}>أساسيات برنامج مايكروسوفت وورد وواجهته</Text>
          
          <Text>\n• Creación y formato de documentos profesionales</Text>
          <Text style={styles.arabicText}>إنشاء وتنسيق المستندات المهنية</Text>
          
          <Text>\n• Trabajo con imágenes, tablas y gráficos</Text>
          <Text style={styles.arabicText}>العمل مع الصور والجداول والرسوم البيانية</Text>
          
          <Text>\n• Estilos, plantillas y automatizaciones</Text>
          <Text style={styles.arabicText}>الأنماط والقوالب والأتمتة</Text>
          
          <Text>\n• Herramientas de revisión y colaboración</Text>
          <Text style={styles.arabicText}>أدوات المراجعة والتعاون</Text>
        </Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>
        
        <Text style={styles.subsectionTitle}>MÓDULO 1: INTRODUCCIÓN A WORD / الوحدة 1: مقدمة في وورد</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Elementos principales de la interfaz:</Text>
          <Text style={styles.subBulletPoint}>- Cinta de opciones (Ribbon): Contiene todas las herramientas organizadas en pestañas</Text>
          <Text style={styles.subBulletPoint}>- Barra de herramientas de acceso rápido: Personalizable con tus herramientas más usadas</Text>
          <Text style={styles.subBulletPoint}>- Barra de título: Muestra el nombre del documento</Text>
          <Text style={styles.subBulletPoint}>- Regla: Para ajustar márgenes y sangrías</Text>
          <Text style={styles.subBulletPoint}>- Barra de estado: Muestra información del documento</Text>
          <Text style={styles.arabicText}>العناصر الرئيسية للواجهة: الشريط، شريط الأدوات السريع، شريط العنوان، المسطرة، شريط الحالة</Text>
          
          <Text style={styles.bulletPoint}>• Gestión de documentos:</Text>
          <Text style={styles.subBulletPoint}>- Nuevo: Crear un documento en blanco o desde plantilla</Text>
          <Text style={styles.subBulletPoint}>- Abrir: Documentos recientes o desde ubicación específica</Text>
          <Text style={styles.subBulletPoint}>- Guardar: Guardar cambios (Ctrl + G)</Text>
          <Text style={styles.subBulletPoint}>- Guardar como: Para crear una copia con otro nombre/formato</Text>
          <Text style={styles.subBulletPoint}>- Exportar: Guardar como PDF u otros formatos</Text>
          <Text style={styles.arabicText}>إدارة المستندات: جديد، فتح، حفظ، تصدير</Text>
          
          <Text style={styles.bulletPoint}>• Vistas de documento:</Text>
          <Text style={styles.subBulletPoint}>- Vista de lectura: Para leer documentos largos</Text>
          <Text style={styles.subBulletPoint}>- Vista de diseño de impresión: Ver cómo se imprimirá</Text>
          <Text style={styles.subBulletPoint}>- Vista web: Cómo se verá en navegador</Text>
          <Text style={styles.subBulletPoint}>- Vista esquema: Para documentos estructurados</Text>
          <Text style={styles.subBulletPoint}>- Borrador: Enfocarse solo en el texto</Text>
          <Text style={styles.arabicText}>عرض المستند: قراءة، طباعة، ويب، مسودة، هيكل</Text>
          
          <Text style={styles.bulletPoint}>• Herramientas básicas:</Text>
          <Text style={styles.subBulletPoint}>- Portapapeles: Cortar, copiar, pear, formato</Text>
          <Text style={styles.subBulletPoint}>- Fuente: Tipo, tamaño, color, efectos</Text>
          <Text style={styles.subBulletPoint}>- Párrafo: Alineación, interlineado, sangrías</Text>
          <Text style={styles.subBulletPoint}>- Estilos: Aplicar formatos predefinidos</Text>
          <Text style={styles.subBulletPoint}>- Buscar/Reemplazar: Localizar texto rápidamente</Text>
          <Text style={styles.arabicText}>أدوات أساسية: الحافظة، الخط، الفقرة، الأنماط، البحث والاستبدال</Text>
          
          <Text style={styles.bulletPoint}>• Navegación por el documento:</Text>
          <Text style={styles.subBulletPoint}>- Panel de navegación: Ver encabezados y páginas</Text>
          <Text style={styles.subBulletPoint}>- Zoom: Acercar/alejar la vista</Text>
          <Text style={styles.subBulletPoint}>- Ventana: Trabajar con múltiples documentos</Text>
          <Text style={styles.subBulletPoint}>- Dividir: Ver dos partes del documento</Text>
          <Text style={styles.arabicText}>التنقل في المستند: لوحة التنقل، التكبير/التصغير، النوافذ، التقسيم</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 2: FORMATO DE TEXTO / الوحدة 2: تنسيق النص</Text>
        <Text style={styles.textBlock}>
          <Text>• Fuentes, tamaños y colores</Text>
          <Text style={styles.arabicText}>الخطوط، الأحجام، والألوان</Text>
          
          <Text>\n• Alineación y espaciado</Text>
          <Text style={styles.arabicText}>المحاذاة والتباعد</Text>
          
          <Text>\n• Viñetas y numeración</Text>
          <Text style={styles.arabicText}>التعداد النقطي والرقمي</Text>
          
          <Text>\n• Bordes y sombreado</Text>
          <Text style={styles.arabicText}>الحدود والتظليل</Text>
          
          <Text>\n• Copiar formato con el pincel</Text>
          <Text style={styles.arabicText}>نسخ التنسيق باستخدام الفرشاة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 3: DISEÑO DE PÁGINA / الوحدة 3: تخطيط الصفحة</Text>
        <Text style={styles.textBlock}>
          <Text>• Márgenes, orientación y tamaño</Text>
          <Text style={styles.arabicText}>هوامش الصفحة، الاتجاه، والحجم</Text>
          
          <Text>\n• Encabezados y pies de página</Text>
          <Text style={styles.arabicText}>رؤوس وتذييلات الصفحات</Text>
          
          <Text>\n• Saltos de página y sección</Text>
          <Text style={styles.arabicText}>فصل الصفحات والمقاطع</Text>
          
          <Text>\n• Columnas y saltos de texto</Text>
          <Text style={styles.arabicText}>الأعمدة وفواصل النص</Text>
          
          <Text>\n• Fondo de página y marcas de agua</Text>
          <Text style={styles.arabicText}>خلفية الصفحة والعلامات المائية</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 4: TABLAS Y GRÁFICOS / الوحدة 4: الجداول والرسوم البيانية</Text>
        <Text style={styles.textBlock}>
          <Text>• Insertar y formatear tablas</Text>
          <Text style={styles.arabicText}>إدراج الجداول وتنسيقها</Text>
          
          <Text>\n• Fórmulas básicas en tablas</Text>
          <Text style={styles.arabicText}>الصيغ الأساسية في الجداول</Text>
          
          <Text>\n• Crear y modificar gráficos</Text>
          <Text style={styles.arabicText}>إنشاء وتعديل الرسوم البيانية</Text>
          
          <Text>\n• Organigramas y diagramas SmartArt</Text>
          <Text style={styles.arabicText}>المخططات التنظيمية والرسوم الذكية</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 5: HERRAMIENTAS AVANZADAS / الوحدة 5: أدوات متقدمة</Text>
        <Text style={styles.textBlock}>
          <Text>• Estilos y temas</Text>
          <Text style={styles.arabicText}>الأنماط والسمات</Text>
          
          <Text>\n• Tabla de contenidos e índices</Text>
          <Text style={styles.arabicText}>جدول المحتويات والفهارس</Text>
          
          <Text>\n• Notas al pie y citas</Text>
          <Text style={styles.arabicText}>الحواشي السفلية والاقتباسات</Text>
          
          <Text>\n• Combinar correspondencia</Text>
          <Text style={styles.arabicText}>دمج المراسلات</Text>
          
          <Text>\n• Macros y automatizaciones</Text>
          <Text style={styles.arabicText}>وحدات الماكرو والأتمتة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 6: COLABORACIÓN Y REVISIÓN / الوحدة 6: التعاون والمراجعة</Text>
        <Text style={styles.textBlock}>
          <Text>• Control de cambios</Text>
          <Text style={styles.arabicText}>تتبع التغييرات</Text>
          
          <Text>\n• Comentarios y resaltado</Text>
          <Text style={styles.arabicText}>التعليقات والتظليل</Text>
          
          <Text>\n• Comparar y combinar documentos</Text>
          <Text style={styles.arabicText}>مقارنة ودمج المستندات</Text>
          
          <Text>\n• Proteger documentos</Text>
          <Text style={styles.arabicText}>حماية المستندات</Text>
          
          <Text>\n• Compartir en la nube</Text>
          <Text style={styles.arabicText}>المشاركة عبر السحابة</Text>
        </Text>

        <Text style={styles.sectionTitle}>💡 Beneficios del Curso / فوائد الدورة</Text>
        <Text style={styles.textBlock}>
          <Text>• Certificado de finalización</Text>
          <Text style={styles.arabicText}>شهادة إتمام الدورة</Text>
          
          <Text>\n• Material didáctico en español y árabe</Text>
          <Text style={styles.arabicText}>مواد تعليمية باللغتين الإسبانية والعربية</Text>
          
          <Text>\n• Ejercicios prácticos</Text>
          <Text style={styles.arabicText}>تمارين عملية</Text>
          
          <Text>\n• Acceso a plantillas profesionales</Text>
          <Text style={styles.arabicText}>الوصول إلى قوالب احترافية</Text>
          
          <Text>\n• Soporte durante el curso</Text>
          <Text style={styles.arabicText}>دعم فني خلال مدة الدورة</Text>
        </Text>

        <Text style={styles.sectionTitle}>📈 Proyecto integrador</Text>
        <Text style={styles.textBlock}>
          <Text>• Crear un currículum profesional usando secciones, tablas y estilos personalizados.</Text>
          <Text>• Elaborar un informe corporativo con portada, encabezados automáticos y referencias cruzadas.</Text>
          <Text>• Diseñar un manual de marca aplicando plantillas, índices y marcas de agua.</Text>
          <Text>• Configurar un flujo de revisión colaborativa con control de cambios y comentarios.</Text>
          <Text>• Exportar a PDF y preparar el documento para impresión profesional.</Text>
        </Text>

        <Text style={styles.sectionTitle}>🧩 Recursos descargables</Text>
        <Text style={styles.textBlock}>
          <Text>• Plantillas de currículum, carta de presentación e informes.</Text>
          <Text>• Listado de atajos de teclado esenciales en Word.</Text>
          <Text>• Guía rápida de estilos y formato consistente.</Text>
          <Text>• Fichas de referencias y citas en distintos formatos.</Text>
          <Text>• Checklist de revisión antes de entregar un documento.</Text>
        </Text>

        <Text style={styles.sectionTitle}>🧭 Siguientes pasos profesionales</Text>
        <Text style={styles.textBlock}>
          <Text>• Preparación para la certificación Microsoft Office Specialist (MOS) Word Associate/Expert.</Text>
          <Text>• Aplicación en roles administrativos, secretaría, documentación técnica y educación.</Text>
          <Text>• Integración con Excel y PowerPoint para paquetes de informes completos.</Text>
          <Text>• Uso de Word Online, SharePoint y OneDrive para colaboración.</Text>
          <Text>• Comunidades recomendadas: Microsoft Learn, LinkedIn Learning, foros MOS.</Text>
        </Text>

        <Text style={styles.sectionTitle}>📝 Evaluación del curso</Text>
        <Text style={styles.textBlock}>
          <Text>• Quiz diagnóstico inicial para adaptar el itinerario.</Text>
          <Text>• Micro ejercicios prácticos por unidad con retroalimentación inmediata.</Text>
          <Text>• Proyecto final con rúbrica detallada y revisión del tutor.</Text>
          <Text>• Sesión opcional de preguntas y respuestas en vivo.</Text>
          <Text>• Certificado digital con código QR verificable.</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 7: TRABAJO CON IMÁGENES Y OBJETOS / الوحدة 7: العمل مع الصور والكائنات</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Insertar imágenes y ajustar tamaño:</Text>
          <Text style={styles.subBulletPoint}>- Insertar {'>'} Imágenes: desde archivo, online o captura</Text>
          <Text style={styles.subBulletPoint}>- Ajustar tamaño: mantener proporción con Shift</Text>
          <Text style={styles.subBulletPoint}>- Recortar: eliminar partes no deseadas</Text>
          <Text style={styles.arabicText}>إدراج الصور وتعديل الحجم: من ملف، عبر الإنترنت، أو لقطة شاشة</Text>
          
          <Text style={styles.bulletPoint}>• Ajuste de texto alrededor de imágenes:</Text>
          <Text style={styles.subBulletPoint}>- En línea con el texto</Text>
          <Text style={styles.subBulletPoint}>- Cuadrado: texto alrededor de un rectángulo</Text>
          <Text style={styles.subBulletPoint}>- Estrecho: texto sigue el contorno</Text>
          <Text style={styles.subBulletPoint}>- Detrás del texto / Delante del texto</Text>
          <Text style={styles.arabicText}>تعديل النص حول الصور: في السطر، مربع، ضيق، خلف/أمام النص</Text>
          
          <Text style={styles.bulletPoint}>• Efectos y correcciones de imagen:</Text>
          <Text style={styles.subBulletPoint}>- Corrección de color: brillo, contraste, saturación</Text>
          <Text style={styles.subBulletPoint}>- Efectos artísticos: acuarela, lápiz, etc.</Text>
          <Text style={styles.subBulletPoint}>- Estilos de imagen: bordes, sombras, reflejos</Text>
          <Text style={styles.arabicText}>تأثيرات وتصحيحات الصورة: الألوان، التأثيرات الفنية، الأنماط</Text>
          
          <Text style={styles.bulletPoint}>• Formas y SmartArt:</Text>
          <Text style={styles.subBulletPoint}>- Insertar formas: rectángulos, círculos, flechas</Text>
          <Text style={styles.subBulletPoint}>- SmartArt: diagramas profesionales predefinidos</Text>
          <Text style={styles.subBulletPoint}>- Agrupar objetos: trabajar con múltiples elementos</Text>
          <Text style={styles.arabicText}>الأشكال والرسوم الذكية: إدراج أشكال، رسوم بيانية، تجميع</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 8: PLANTILLAS Y AUTOMATIZACIÓN / الوحدة 8: القوالب والأتمتة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Crear y usar plantillas:</Text>
          <Text style={styles.subBulletPoint}>- Diseñar plantilla personalizada</Text>
          <Text style={styles.subBulletPoint}>- Guardar como .dotx (plantilla de Word)</Text>
          <Text style={styles.subBulletPoint}>- Usar plantillas de Office.com</Text>
          <Text style={styles.subBulletPoint}>- Modificar plantillas existentes</Text>
          <Text style={styles.arabicText}>إنشاء واستخدام القوالب: تصميم، حفظ، استخدام، تعديل</Text>
          
          <Text style={styles.bulletPoint}>• Campos y códigos de campo:</Text>
          <Text style={styles.subBulletPoint}>- Fecha automática: Insertar {'>'} Fecha y hora</Text>
          <Text style={styles.subBulletPoint}>- Numeración automática de páginas</Text>
          <Text style={styles.subBulletPoint}>- Referencias cruzadas: vincular títulos y números</Text>
          <Text style={styles.subBulletPoint}>- Campos calculados: fórmulas en tablas</Text>
          <Text style={styles.arabicText}>الحقول ورموز الحقول: التاريخ، الترقيم، المراجع، الحسابات</Text>
          
          <Text style={styles.bulletPoint}>• Macros básicas:</Text>
          <Text style={styles.subBulletPoint}>- Grabar macro: automatizar tareas repetitivas</Text>
          <Text style={styles.subBulletPoint}>- Ejecutar macro: asignar a botón o tecla</Text>
          <Text style={styles.subBulletPoint}>- Editar macro: modificar código VBA</Text>
          <Text style={styles.arabicText}>وحدات الماكرو: التسجيل، التنفيذ، التعديل</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 9: DOCUMENTOS LARGOS Y ACADÉMICOS / الوحدة 9: المستندات الطويلة والأكاديمية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Estructura de documentos largos:</Text>
          <Text style={styles.subBulletPoint}>- Usar estilos de título (Título 1, 2, 3...)</Text>
          <Text style={styles.subBulletPoint}>- Panel de navegación: ver estructura completa</Text>
          <Text style={styles.subBulletPoint}>- Mover secciones: reorganizar fácilmente</Text>
          <Text style={styles.arabicText}>هيكل المستندات الطويلة: أنماط العناوين، لوحة التنقل، إعادة التنظيم</Text>
          
          <Text style={styles.bulletPoint}>• Tabla de contenidos automática:</Text>
          <Text style={styles.subBulletPoint}>- Referencias {'>'} Tabla de contenido</Text>
          <Text style={styles.subBulletPoint}>- Actualizar automáticamente al cambiar títulos</Text>
          <Text style={styles.subBulletPoint}>- Personalizar formato y niveles</Text>
          <Text style={styles.arabicText}>جدول المحتويات التلقائي: الإدراج، التحديث، التخصيص</Text>
          
          <Text style={styles.bulletPoint}>• Índices y referencias:</Text>
          <Text style={styles.subBulletPoint}>- Índice alfabético: marcar entradas</Text>
          <Text style={styles.subBulletPoint}>- Tabla de ilustraciones: listar figuras y tablas</Text>
          <Text style={styles.subBulletPoint}>- Notas al pie y notas al final</Text>
          <Text style={styles.subBulletPoint}>- Bibliografía: gestionar citas</Text>
          <Text style={styles.arabicText}>الفهارس والمراجع: الفهرس الأبجدي، جدول الرسوم، الحواشي، المراجع</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 10: IMPRESIÓN Y EXPORTACIÓN / الوحدة 10: الطباعة والتصدير</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Configuración de impresión:</Text>
          <Text style={styles.subBulletPoint}>- Vista previa: ver antes de imprimir</Text>
          <Text style={styles.subBulletPoint}>- Configurar páginas: márgenes, orientación</Text>
          <Text style={styles.subBulletPoint}>- Imprimir rangos específicos</Text>
          <Text style={styles.subBulletPoint}>- Impresión a doble cara</Text>
          <Text style={styles.arabicText}>إعدادات الطباعة: المعاينة، التكوين، النطاقات، الوجهين</Text>
          
          <Text style={styles.bulletPoint}>• Exportar a otros formatos:</Text>
          <Text style={styles.subBulletPoint}>- PDF: mantener formato exacto</Text>
          <Text style={styles.subBulletPoint}>- HTML: para páginas web</Text>
          <Text style={styles.subBulletPoint}>- TXT: solo texto sin formato</Text>
          <Text style={styles.subBulletPoint}>- Compatibilidad con versiones anteriores</Text>
          <Text style={styles.arabicText}>التصدير إلى صيغ أخرى: PDF، HTML، TXT، التوافق</Text>
        </View>

        <Text style={styles.sectionTitleAr}>📈 مشروع تطبيقي متكامل</Text>
        <Text style={styles.textBlockAr}>
          <Text>• إنشاء سيرة ذاتية احترافية باستخدام الأقسام والجداول والأنماط المخصصة.</Text>
          <Text>• إعداد تقرير مؤسسي مع صفحة غلاف ورؤوس تلقائية ومراجع متقاطعة.</Text>
          <Text>• تصميم دليل للعلامة التجارية يطبق القوالب والفهارس والعلامات المائية.</Text>
          <Text>• تنظيم عملية مراجعة تعاونية باستخدام تتبع التغييرات والتعليقات.</Text>
          <Text>• تصدير المستند إلى PDF وتجهيزه للطباعة الاحترافية.</Text>
        </Text>

        <Text style={styles.sectionTitleAr}>🧩 موارد قابلة للتحميل</Text>
        <Text style={styles.textBlockAr}>
          <Text>• قوالب للسيرة الذاتية ورسائل التعريف والتقارير.</Text>
          <Text>• قائمة بأهم اختصارات لوحة المفاتيح في وورد.</Text>
          <Text>• دليل سريع للأنماط والتنسيق المهني.</Text>
          <Text>• بطاقات مرجعية للاستشهادات والهوامش.</Text>
          <Text>• قائمة تحقق للمراجعة قبل تسليم أي مستند.</Text>
        </Text>

        <Text style={styles.sectionTitleAr}>🧭 خطوات مهنية لاحقة</Text>
        <Text style={styles.textBlockAr}>
          <Text>• الاستعداد لشهادة Microsoft Office Specialist (MOS).</Text>
          <Text>• تطبيق عملي في الوظائف الإدارية والتوثيقية والتعليمية.</Text>
          <Text>• الدمج مع إكسل وباوربوينت لإنتاج تقارير متكاملة.</Text>
          <Text>• استخدام وورد عبر الإنترنت وSharePoint وOneDrive للتعاون.</Text>
          <Text>• الانضمام إلى مجتمعات Microsoft Learn وLinkedIn Learning.</Text>
        </Text>

        <Text style={styles.sectionTitleAr}>📝 تقييم الدورة</Text>
        <Text style={styles.textBlockAr}>
          <Text>• اختبار تشخيصي في البداية لتحديد مستوى المتعلم.</Text>
          <Text>• تمارين قصيرة لكل وحدة مع تغذية راجعة فورية.</Text>
          <Text>• مشروع نهائي يُقيّم وفق معايير واضحة.</Text>
          <Text>• جلسة اختيارية للأسئلة والأجوبة عبر البث المباشر.</Text>
          <Text>• شهادة رقمية برمز QR للتحقق من صحتها.</Text>
        </Text>

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
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#F0F8F0',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  textBlock: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
  textBlockAr: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  arabicText: {
    writingDirection: 'rtl',
    textAlign: 'right',
    display: 'flex',
    marginBottom: 8,
    color: '#555',
    fontFamily: 'Arial',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 24,
    fontWeight: '600',
  },
  subBulletPoint: {
    fontSize: 15,
    color: '#444',
    marginLeft: 20,
    marginBottom: 4,
    lineHeight: 22,
  },
  exampleText: {
    fontSize: 14,
    color: '#000',
    backgroundColor: '#F0F8F0',
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
    fontStyle: 'italic',
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  enrollButton: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  enrollButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
