import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoInformaticaScreen() {
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
            <Text style={styles.headerTitle}>Curso de Informática Básica</Text>
            <Text style={styles.headerTitleAr}>دورة الحاسوب</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
        <Text style={styles.textBlock}>{`
1. Componentes básicos del ordenador y su funcionamiento.
2. Manejo del sistema operativo Windows y navegación.
3. Uso profesional de Microsoft Word para documentos.
4. Microsoft Excel para hojas de cálculo y datos.
5. Navegación segura por Internet y correo electrónico.
6. Seguridad informática y protección de datos.
7. Uso de aplicaciones móviles y herramientas digitales.
8. Mantenimiento básico del ordenador.`}</Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 1: FUNDAMENTOS DEL ORDENADOR
- Componentes hardware (CPU, RAM, disco duro)
- Periféricos (teclado, ratón, monitor, impresora)
- Encendido, apagado y reinicio seguro
- Conceptos básicos de software

MÓDULO 2: SISTEMA OPERATIVO WINDOWS
- Interfaz de usuario y escritorio
- Gestión de archivos y carpetas
- Configuración básica del sistema
- Instalación y desinstalación de programas

MÓDULO 3: MICROSOFT WORD
- Creación y edición de documentos
- Formato de texto y párrafos
- Inserción de imágenes y tablas
- Impresión y guardado de documentos

MÓDULO 4: MICROSOFT EXCEL
- Creación de hojas de cálculo
- Fórmulas y funciones básicas
- Gráficos y presentación de datos
- Filtros y ordenación de información

MÓDULO 5: INTERNET Y COMUNICACIÓN
- Navegación web segura
- Correo electrónico profesional
- Búsqueda efectiva de información
- Redes sociales y comunicación digital

MÓDULO 6: SEGURIDAD Y MANTENIMIENTO
- Protección contra virus y malware
- Copias de seguridad
- Mantenimiento del sistema
- Privacidad y protección de datos`}</Text>

        <Text style={styles.sectionTitle}>💻 Componentes del Ordenador:</Text>
        <Text style={styles.textBlock}>{`HARDWARE PRINCIPAL:
- CPU (Procesador) / معالج – Cerebro del ordenador
- RAM (Memoria) / ذاكرة – Almacenamiento temporal
- Disco Duro / قرص صلب – Almacenamiento permanente
- Placa Base / لوحة أم – Conecta todos los componentes

PERIFÉRICOS:
- Monitor / شاشة – Pantalla de visualización
- Teclado / لوحة المفاتيح – Entrada de texto
- Ratón / فأرة – Control del cursor
- Impresora / طابعة – Impresión de documentos
- Altavoces / مكبرات صوت – Salida de audio`}</Text>

        <Text style={styles.sectionTitle}>🖥️ Sistema Operativo Windows:</Text>
        <Text style={styles.textBlock}>{`INTERFAZ BÁSICA:
- Escritorio / سطح المكتب – Área principal de trabajo
- Barra de tareas / شريط المهام – Acceso rápido a programas
- Menú Inicio / قائمة البدء – Acceso a todas las aplicaciones
- Explorador de archivos / مستكشف الملفات – Gestión de archivos

GESTIÓN DE ARCHIVOS:
- Crear carpetas / إنشاء مجلدات – Organizar documentos
- Copiar y pegar / نسخ ولصق – Mover archivos
- Buscar archivos / البحث عن الملفات – Encontrar documentos
- Eliminar archivos / حذف الملفات – Limpiar espacio`}</Text>

        <Text style={styles.sectionTitle}>📝 Microsoft Word:</Text>
        <Text style={styles.textBlock}>{`FUNCIONES BÁSICAS:
- Crear documento nuevo / إنشاء مستند جديد
- Guardar documento / حفظ المستند
- Formato de texto / تنسيق النص – Negrita, cursiva, subrayado
- Tamaño y tipo de letra / حجم ونوع الخط

FUNCIONES AVANZADAS:
- Insertar imágenes / إدراج صور
- Crear tablas / إنشاء جداول
- Numeración y viñetas / ترقيم وتعداد نقطي
- Encabezado y pie de página / رأس وتذييل الصفحة
- Imprimir documento / طباعة المستند`}</Text>

        <Text style={styles.sectionTitle}>📊 Microsoft Excel:</Text>
        <Text style={styles.textBlock}>{`CONCEPTOS BÁSICOS:
- Celda / خلية – Unidad básica de datos
- Fila / صف – Línea horizontal de celdas
- Columna / عمود – Línea vertical de celdas
- Hoja de cálculo / ورقة حسابية – Documento completo

FÓRMULAS BÁSICAS:
- SUMA / مجموع – Sumar valores
- PROMEDIO / متوسط – Calcular media
- MÁXIMO / أقصى – Valor más alto
- MÍNIMO / أدنى – Valor más bajo
- CONTAR / عد – Contar elementos

GRÁFICOS:
- Gráfico de barras / رسم بياني بالأعمدة
- Gráfico circular / رسم بياني دائري
- Gráfico de líneas / رسم بياني بالخطوط
- Personalización de gráficos / تخصيص الرسوم البيانية`}</Text>

        <Text style={styles.sectionTitle}>🌐 Internet y Navegación:</Text>
        <Text style={styles.textBlock}>{`NAVEGADORES WEB:
- متصفح جوجل كروم / متصفح جوجل كروم
- متصفح فايرفوكس / متصفح فايرفوكس
- متصفح إيدج / متصفح إيدج
- متصفح سفاري / متصفح سفاري

BÚSQUEDA EFECTIVA:
- Palabras clave / كلمات مفتاحية
- Comillas para frases exactas / علامات اقتباس
- Filtros de búsqueda / فلاتر البحث
- Evaluación de fuentes / تقييم المصادر

SEGURIDAD WEB:
- HTTPS / بروتوكول آمن
- Certificados de seguridad / شهادات الأمان
- Contraseñas seguras / كلمات مرور قوية
- Verificación de enlaces / التحقق من الروابط`}</Text>

        <Text style={styles.sectionTitle}>📧 Correo Electrónico:</Text>
        <Text style={styles.textBlock}>{`PROVEEDORES DE CORREO:
- جيميل / جيميل – جوجل
- أوتلوك / أوتلوك – مايكروسوفت
- ياهو ميل / ياهو ميل
- Correo corporativo / بريد الشركة

FUNCIONES BÁSICAS:
- Enviar correo / إرسال بريد
- Recibir correo / استقبال بريد
- Adjuntar archivos / إرفاق ملفات
- Responder y reenviar / الرد وإعادة التوجيه

ETIQUETA PROFESIONAL:
- Asunto claro / موضوع واضح
- Saludo apropiado / تحية مناسبة
- Cuerpo del mensaje / محتوى الرسالة
- Despedida profesional / خاتمة مهنية
- Firma digital / توقيع رقمي`}</Text>

        <Text style={styles.sectionTitle}>🔒 Seguridad Informática:</Text>
        <Text style={styles.textBlock}>{`AMENAZAS COMUNES:
- Virus / فيروس – Software malicioso
- Phishing / التصيد الاحتيالي – Robo de datos
- Malware / برمجية خبيثة – Software dañino
- Ransomware / برمجية الفدية – Secuestro de datos

PROTECCIÓN:
- Antivirus / مضاد فيروسات – Protección automática
- Firewall / جدار حماية – Barrera de seguridad
- Actualizaciones / تحديثات – Parches de seguridad
- Copias de seguridad / نسخ احتياطية – Respaldo de datos

CONTRASEÑAS SEGURAS:
- Mínimo 8 caracteres / 8 أحرف على الأقل
- Combinación de letras y números / مزيج من الحروف والأرقام
- Símbolos especiales / رموز خاصة
- Cambio regular / تغيير دوري`}</Text>

        <Text style={styles.sectionTitle}>📱 Aplicaciones Móviles:</Text>
        <Text style={styles.textBlock}>{`APLICACIONES ESENCIALES:
- واتساب / واتساب – Mensajería instantánea
- خرائط جوجل / خرائط جوجل – Navegación
- جيميل / جيميل – Correo móvil
- جوجل درايف / جوجل درايف – Almacenamiento en la nube

HERRAMIENTAS DE PRODUCTIVIDAD:
- أوفيس موبايل / أوفيس موبايل
- مستندات جوجل / مستندات جوجل
- إيفرنوت / إيفرنوت – Notas
- تريلو / تريلو – Gestión de tareas

APLICACIONES DE COMUNICACIÓN:
- زوم / زوم – Videoconferencias
- تيمز / تيمز – Colaboración
- سكايب / سكايب – Llamadas
- تيليجرام / تيليجرام – Mensajería`}</Text>

        <Text style={styles.sectionTitle}>🛠️ Mantenimiento del Ordenador:</Text>
        <Text style={styles.textBlock}>{`MANTENIMIENTO DIARIO:
- Limpieza del escritorio / تنظيف سطح المكتب
- Cierre de programas no utilizados / إغلاق البرامج غير المستخدمة
- Verificación de actualizaciones / التحقق من التحديثات
- Escaneo rápido de virus / فحص سريع للفيروسات

MANTENIMIENTO SEMANAL:
- Limpieza de archivos temporales / تنظيف الملفات المؤقتة
- Desfragmentación del disco / إلغاء تجزئة القرص
- Verificación de espacio libre / التحقق من المساحة الحرة
- Actualización de antivirus / تحديث مضاد الفيروسات

MANTENIMIENTO MENSUAL:
- Limpieza física del ordenador / تنظيف مادي للحاسوب
- Verificación de cables / فحص الكابلات
- Respaldo completo de datos / نسخ احتياطي كامل
- Revisión de rendimiento / مراجعة الأداء`}</Text>

        <Text style={styles.sectionTitle}>📋 Consejos Prácticos:</Text>
        <Text style={styles.textBlock}>{`ORGANIZACIÓN DE ARCHIVOS:
- Crear carpetas por proyectos / إنشاء مجلدات حسب المشاريع
- Usar nombres descriptivos / استخدام أسماء وصفية
- Mantener estructura clara / الحفاظ على هيكل واضح
- Hacer copias de seguridad / عمل نسخ احتياطية

PRODUCTIVIDAD:
- Usar atajos de teclado / استخدام اختصارات لوحة المفاتيح
- Configurar escritorio eficiente / تكوين سطح مكتب فعال
- Aprender funciones avanzadas / تعلم الوظائف المتقدمة
- Mantener orden digital / الحفاظ على النظام الرقمي

RESOLUCIÓN DE PROBLEMAS:
- Reiniciar el ordenador / إعادة تشغيل الحاسوب
- Verificar conexiones / فحص الاتصالات
- Buscar ayuda en línea / البحث عن المساعدة عبر الإنترنت
- Contactar soporte técnico / الاتصال بالدعم الفني`}</Text>

        <Text style={styles.sectionTitleAr}>📌 ماذا ستتعلم؟</Text>
        <Text style={styles.textBlockAr}>{`
1. المكونات الأساسية للحاسوب وطريقة عملها.
2. التعامل مع نظام التشغيل ويندوز والتنقل.
3. الاستخدام المهني لمايكروسوفت وورد للمستندات.
4. مايكروسوفت إكسل لجداول البيانات.
5. التصفح الآمن للإنترنت والبريد الإلكتروني.
6. الأمن المعلوماتي وحماية البيانات.
7. استخدام التطبيقات المحمولة والأدوات الرقمية.
8. الصيانة الأساسية للحاسوب.`}</Text>

        <Text style={styles.sectionTitleAr}>📚 وحدات الدورة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة الأولى: أساسيات الحاسوب
- مكونات الهاردوير (المعالج، الذاكرة، القرص الصلب)
- الأجهزة الطرفية (لوحة المفاتيح، الفأرة، الشاشة)
- التشغيل والإيقاف الآمن
- المفاهيم الأساسية للبرمجيات

الوحدة الثانية: نظام التشغيل ويندوز
- واجهة المستخدم وسطح المكتب
- إدارة الملفات والمجلدات
- الإعدادات الأساسية للنظام
- تثبيت وإلغاء تثبيت البرامج

الوحدة الثالثة: مايكروسوفت وورد
- إنشاء وتحرير المستندات
- تنسيق النص والفقرات
- إدراج الصور والجداول
- الطباعة وحفظ المستندات

الوحدة الرابعة: مايكروسوفت إكسل
- إنشاء جداول البيانات
- الصيغ والدوال الأساسية
- الرسوم البيانية وعرض البيانات
- الفلاتر وترتيب المعلومات

الوحدة الخامسة: الإنترنت والتواصل
- التصفح الآمن للويب
- البريد الإلكتروني المهني
- البحث الفعال عن المعلومات
- الشبكات الاجتماعية والتواصل الرقمي

الوحدة السادسة: الأمن والصيانة
- الحماية من الفيروسات والبرمجيات الخبيثة
- النسخ الاحتياطية
- صيانة النظام
- الخصوصية وحماية البيانات`}</Text>

        <Text style={styles.sectionTitleAr}>💻 مكونات الحاسوب:</Text>
        <Text style={styles.textBlockAr}>{`الهاردوير الرئيسي:
- المعالج – دماغ الحاسوب
- الذاكرة – التخزين المؤقت
- القرص الصلب – التخزين الدائم
- اللوحة الأم – تربط جميع المكونات

الأجهزة الطرفية:
- الشاشة – عرض المعلومات
- لوحة المفاتيح – إدخال النصوص
- الفأرة – التحكم بالمؤشر
- الطابعة – طباعة المستندات
- مكبرات الصوت – إخراج الصوت`}</Text>

        <Text style={styles.sectionTitleAr}>🖥️ نظام التشغيل ويندوز:</Text>
        <Text style={styles.textBlockAr}>{`الواجهة الأساسية:
- سطح المكتب – منطقة العمل الرئيسية
- شريط المهام – الوصول السريع للبرامج
- قائمة البدء – الوصول لجميع التطبيقات
- مستكشف الملفات – إدارة الملفات

إدارة الملفات:
- إنشاء مجلدات – تنظيم المستندات
- نسخ ولصق – نقل الملفات
- البحث عن الملفات – العثور على المستندات
- حذف الملفات – تنظيف المساحة`}</Text>

        <Text style={styles.sectionTitleAr}>📝 مايكروسوفت وورد:</Text>
        <Text style={styles.textBlockAr}>{`الوظائف الأساسية:
- إنشاء مستند جديد
- حفظ المستند
- تنسيق النص – عريض، مائل، مسطر
- حجم ونوع الخط

الوظائف المتقدمة:
- إدراج صور
- إنشاء جداول
- ترقيم وتعداد نقطي
- رأس وتذييل الصفحة
- طباعة المستند`}</Text>

        <Text style={styles.sectionTitleAr}>📊 مايكروسوفت إكسل:</Text>
        <Text style={styles.textBlockAr}>{`المفاهيم الأساسية:
- خلية – وحدة البيانات الأساسية
- صف – خط أفقي من الخلايا
- عمود – خط عمودي من الخلايا
- ورقة حسابية – المستند الكامل

الصيغ الأساسية:
- مجموع – جمع القيم
- متوسط – حساب المتوسط
- أقصى – أعلى قيمة
- أدنى – أقل قيمة
- عد – عد العناصر

الرسوم البيانية:
- رسم بياني بالأعمدة
- رسم بياني دائري
- رسم بياني بالخطوط
- تخصيص الرسوم البيانية`}</Text>

        <Text style={styles.sectionTitleAr}>🌐 الإنترنت والتصفح:</Text>
        <Text style={styles.textBlockAr}>{`متصفحات الويب:
- جوجل كروم
- فايرفوكس
- إيدج
- سفاري

البحث الفعال:
- كلمات مفتاحية
- علامات اقتباس للعبارات الدقيقة
- فلاتر البحث
- تقييم المصادر

الأمن على الويب:
- بروتوكول آمن HTTPS
- شهادات الأمان
- كلمات مرور قوية
- التحقق من الروابط`}</Text>

        <Text style={styles.sectionTitleAr}>📧 البريد الإلكتروني:</Text>
        <Text style={styles.textBlockAr}>{`مزودو البريد:
- جيميل – جوجل
- أوتلوك – مايكروسوفت
- ياهو ميل
- بريد الشركة

الوظائف الأساسية:
- إرسال بريد
- استقبال بريد
- إرفاق ملفات
- الرد وإعادة التوجيه

آداب المهنة:
- موضوع واضح
- تحية مناسبة
- محتوى الرسالة
- خاتمة مهنية
- توقيع رقمي`}</Text>

        <Text style={styles.sectionTitleAr}>🔒 الأمن المعلوماتي:</Text>
        <Text style={styles.textBlockAr}>{`التهديدات الشائعة:
- فيروس – برمجية خبيثة
- التصيد الاحتيالي – سرقة البيانات
- برمجية خبيثة – برنامج ضار
- برمجية الفدية – اختطاف البيانات

الحماية:
- مضاد فيروسات – حماية تلقائية
- جدار حماية – حاجز الأمان
- تحديثات – رقع الأمان
- نسخ احتياطية – نسخ البيانات

كلمات مرور قوية:
- 8 أحرف على الأقل
- مزيج من الحروف والأرقام
- رموز خاصة
- تغيير دوري`}</Text>

        <Text style={styles.sectionTitleAr}>📱 التطبيقات المحمولة:</Text>
        <Text style={styles.textBlockAr}>{`التطبيقات الأساسية:
- واتساب – رسائل فورية
- خرائط جوجل – الملاحة
- جيميل – بريد محمول
- جوجل درايف – تخزين سحابي

أدوات الإنتاجية:
- أوفيس موبايل
- مستندات جوجل
- إيفرنوت – ملاحظات
- تريلو – إدارة المهام

تطبيقات التواصل:
- زوم – مؤتمرات فيديو
- تيمز – التعاون
- سكايب – مكالمات
- تيليجرام – رسائل`}</Text>

        <Text style={styles.sectionTitleAr}>🛠️ صيانة الحاسوب:</Text>
        <Text style={styles.textBlockAr}>{`الصيانة اليومية:
- تنظيف سطح المكتب
- إغلاق البرامج غير المستخدمة
- التحقق من التحديثات
- فحص سريع للفيروسات

الصيانة الأسبوعية:
- تنظيف الملفات المؤقتة
- إلغاء تجزئة القرص
- التحقق من المساحة الحرة
- تحديث مضاد الفيروسات

الصيانة الشهرية:
- تنظيف مادي للحاسوب
- فحص الكابلات
- نسخ احتياطي كامل للبيانات
- مراجعة الأداء`}</Text>

        <Text style={styles.sectionTitleAr}>📋 نصائح عملية:</Text>
        <Text style={styles.textBlockAr}>{`تنظيم الملفات:
- إنشاء مجلدات حسب المشاريع
- استخدام أسماء وصفية
- الحفاظ على هيكل واضح
- عمل نسخ احتياطية

الإنتاجية:
- استخدام اختصارات لوحة المفاتيح
- تكوين سطح مكتب فعال
- تعلم الوظائف المتقدمة
- الحفاظ على النظام الرقمي

حل المشاكل:
- إعادة تشغيل الحاسوب
- فحص الاتصالات
- البحث عن المساعدة عبر الإنترنت
- الاتصال بالدعم الفني`}</Text>
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
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  headerTitleAr: {
    fontSize: 16,
    color: '#FFD700',
    opacity: 1,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'right',
    alignSelf: 'flex-end',
    writingDirection: 'rtl',
    fontFamily: 'System',
  },
  textBlock: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
    lineHeight: 22,
  },
  textBlockAr: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'right',
    alignSelf: 'flex-end',
    writingDirection: 'rtl',
    fontFamily: 'System',
    lineHeight: 22,
  },
});
