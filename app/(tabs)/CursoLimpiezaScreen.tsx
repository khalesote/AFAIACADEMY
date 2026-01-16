import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoLimpiezaScreen() {
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
            <Text style={styles.headerTitleAr}>دورة التنظيف</Text>
            <Text style={styles.headerTitle}>Curso de Limpieza</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INTRODUCCIÓN */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📌 ماذا ستتعلم؟</Text>
          </View>
          <Text style={styles.textBlockAr}>
            1. تقنيات التنظيف المهني{'\n'}
            2. استخدام منتجات التنظيف{'\n'}
            3. تنظيف الأسطح المختلفة{'\n'}
            4. تنظيم العمل{'\n'}
            5. السلامة في التنظيف
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas de limpieza profesional{'\n'}
            2. Uso de productos de limpieza{'\n'}
            3. Limpieza de diferentes superficies{'\n'}
            4. Organización del trabajo{'\n'}
            5. Seguridad en la limpieza
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • تقنيات التنظيف{'\n'}
            • المنتجات والمعدات{'\n'}
            • الأسطح المحددة{'\n'}
            • التنظيم{'\n'}
            • السلامة
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Técnicas de limpieza{'\n'}
            • Productos y equipos{'\n'}
            • Superficies específicas{'\n'}
            • Organización{'\n'}
            • Seguridad
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>تنظيف</Text>
            <Text style={styles.vocabEs}>Limpieza</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>منتج</Text>
            <Text style={styles.vocabEs}>Producto</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سطح</Text>
            <Text style={styles.vocabEs}>Superficie</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>معدات</Text>
            <Text style={styles.vocabEs}>Equipo</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سلامة</Text>
            <Text style={styles.vocabEs}>Seguridad</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات التنظيف المهني</Text>
            <Text style={styles.moduleContentAr}>
              • المفاهيم الأساسية للتنظيف والنظافة:{'\n'}
              - الفرق بين التنظيف والتطهير{'\n'}
              - أهمية النظافة في البيئات المختلفة{'\n'}
              - معايير النظافة المهنية{'\n'}
              • أنواع الأوساخ والتلوث:{'\n'}
              - الأوساخ العضوية وغير العضوية{'\n'}
              - التلوث البكتيري والفيروسي{'\n'}
              - البقع والرواسب المختلفة{'\n'}
              • مبادئ التنظيف الفعال:{'\n'}
              - الترتيب الصحيح للتنظيف{'\n'}
              - من الأعلى إلى الأسفل{'\n'}
              - من النظيف إلى القذر{'\n'}
              • تنظيم عمل التنظيف:{'\n'}
              - تخطيط المهام اليومية{'\n'}
              - توزيع المناطق{'\n'}
              - إدارة الوقت بكفاءة{'\n'}
              • لوائح السلامة والنظافة:{'\n'}
              - القوانين والأنظمة المعمول بها{'\n'}
              - معايير الجودة{'\n'}
              - شهادات النظافة المهنية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA LIMPIEZA PROFESIONAL</Text>
            <Text style={styles.moduleContent}>
              • Conceptos básicos de limpieza e higiene:{'\n'}
              - Diferencia entre limpieza y desinfección{'\n'}
              - Importancia de la higiene en diferentes entornos{'\n'}
              - Estándares de limpieza profesional{'\n'}
              • Tipos de suciedad y contaminación:{'\n'}
              - Suciedad orgánica e inorgánica{'\n'}
              - Contaminación bacteriana y viral{'\n'}
              - Diferentes tipos de manchas y residuos{'\n'}
              • Principios de limpieza eficiente:{'\n'}
              - Orden correcto de limpieza{'\n'}
              - De arriba hacia abajo{'\n'}
              - De lo limpio a lo sucio{'\n'}
              • Organización del trabajo de limpieza:{'\n'}
              - Planificación de tareas diarias{'\n'}
              - Distribución de zonas{'\n'}
              - Gestión eficiente del tiempo{'\n'}
              • Normativas de seguridad e higiene:{'\n'}
              - Leyes y regulaciones aplicables{'\n'}
              - Estándares de calidad{'\n'}
              - Certificaciones de limpieza profesional
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: منتجات التنظيف</Text>
            <Text style={styles.moduleContentAr}>
              • تصنيف منتجات التنظيف:{'\n'}
              - المنظفات القلوية والحامضية{'\n'}
              - المطهرات والمعقمات{'\n'}
              - مزيلات الدهون والزيوت{'\n'}
              - الملمعات والمنظفات المتخصصة{'\n'}
              • منتجات متعددة الاستخدامات ومتخصصة:{'\n'}
              - متى تستخدم كل نوع{'\n'}
              - مزايا وعيوب كل منتج{'\n'}
              - اختيار المنتج المناسب{'\n'}
              • منتجات صديقة للبيئة ومستدامة:{'\n'}
              - المنتجات القابلة للتحلل{'\n'}
              - المنتجات بدون فوسفات{'\n'}
              - البدائل الطبيعية{'\n'}
              • تخفيف وتحضير المنتجات:{'\n'}
              - نسب التخفيف الصحيحة{'\n'}
              - طرق التحضير الآمنة{'\n'}
              - قراءة التعليمات{'\n'}
              • تخزين وإدارة المنتجات:{'\n'}
              - ظروف التخزين المناسبة{'\n'}
              - تواريخ الصلاحية{'\n'}
              - منع التلوث المتبادل{'\n'}
              - إدارة المخزون
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: PRODUCTOS DE LIMPIEZA</Text>
            <Text style={styles.moduleContent}>
              • Clasificación de productos de limpieza:{'\n'}
              - Detergentes alcalinos y ácidos{'\n'}
              - Desinfectantes y antisépticos{'\n'}
              - Desengrasantes y disolventes{'\n'}
              - Abrillantadores y productos especializados{'\n'}
              • Productos multiuso y especializados:{'\n'}
              - Cuándo usar cada tipo{'\n'}
              - Ventajas y desventajas de cada producto{'\n'}
              - Selección del producto adecuado{'\n'}
              • Productos ecológicos y sostenibles:{'\n'}
              - Productos biodegradables{'\n'}
              - Productos sin fosfatos{'\n'}
              - Alternativas naturales{'\n'}
              • Dilución y preparación de productos:{'\n'}
              - Proporciones correctas de dilución{'\n'}
              - Métodos de preparación seguros{'\n'}
              - Lectura de instrucciones{'\n'}
              • Almacenamiento y gestión de productos:{'\n'}
              - Condiciones de almacenamiento adecuadas{'\n'}
              - Fechas de caducidad{'\n'}
              - Prevención de contaminación cruzada{'\n'}
              - Gestión de inventario
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: المعدات والأدوات</Text>
            <Text style={styles.moduleContentAr}>
              • معدات التنظيف اليدوية:{'\n'}
              - المكانس والفرش{'\n'}
              - الممسحات والمناشف{'\n'}
              - الدلاء والخراطيم{'\n'}
              - الأدوات الصغيرة المتخصصة{'\n'}
              • المعدات الكهربائية والميكانيكية:{'\n'}
              - المكانس الكهربائية بأنواعها{'\n'}
              - آلات غسل الأرضيات{'\n'}
              - آلات التلميع{'\n'}
              - مولدات البخار{'\n'}
              • آلات التنظيف المهنية:{'\n'}
              - آلات تنظيف السجاد{'\n'}
              - منظفات الضغط العالي{'\n'}
              - آلات تنظيف النوافذ{'\n'}
              - معدات التنظيف الصناعي{'\n'}
              • أدوات متخصصة:{'\n'}
              - أدوات تنظيف الزجاج{'\n'}
              - أدوات تنظيف الأماكن الضيقة{'\n'}
              - أدوات تنظيف المراحيض{'\n'}
              - أدوات تنظيف المطابخ{'\n'}
              • صيانة المعدات:{'\n'}
              - التنظيف اليومي للمعدات{'\n'}
              - الصيانة الدورية{'\n'}
              - استبدال القطع التالفة{'\n'}
              - حفظ المعدات بشكل صحيح
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: EQUIPOS Y HERRAMIENTAS</Text>
            <Text style={styles.moduleContent}>
              • Equipos manuales de limpieza:{'\n'}
              - Escobas y cepillos{'\n'}
              - Fregonas y bayetas{'\n'}
              - Cubos y mangueras{'\n'}
              - Herramientas pequeñas especializadas{'\n'}
              • Equipos eléctricos y mecánicos:{'\n'}
              - Aspiradoras de diferentes tipos{'\n'}
              - Máquinas de limpieza de suelos{'\n'}
              - Pulidoras{'\n'}
              - Generadores de vapor{'\n'}
              • Máquinas de limpieza profesional:{'\n'}
              - Máquinas de limpieza de alfombras{'\n'}
              - Limpiadoras de alta presión{'\n'}
              - Máquinas de limpieza de ventanas{'\n'}
              - Equipos de limpieza industrial{'\n'}
              • Herramientas especializadas:{'\n'}
              - Herramientas para limpieza de cristales{'\n'}
              - Herramientas para espacios estrechos{'\n'}
              - Herramientas para sanitarios{'\n'}
              - Herramientas para cocinas{'\n'}
              • Mantenimiento de equipos:{'\n'}
              - Limpieza diaria de equipos{'\n'}
              - Mantenimiento periódico{'\n'}
              - Reemplazo de piezas dañadas{'\n'}
              - Almacenamiento correcto de equipos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: تقنيات التنظيف الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • تنظيف الأرضيات والأرصفة:{'\n'}
              - تقنيات الكنس والشفط{'\n'}
              - طرق الغسل والتجفيف{'\n'}
              - تنظيف أنواع الأرضيات المختلفة{'\n'}
              - إزالة البقع المستعصية{'\n'}
              • تنظيف الجدران والأسقف:{'\n'}
              - تنظيف الجدران المطلية{'\n'}
              - تنظيف البلاط والرخام{'\n'}
              - إزالة العناكب والغبار{'\n'}
              - تنظيف الأسقف المعلقة{'\n'}
              • تنظيف النوافذ والزجاج:{'\n'}
              - تقنيات تنظيف الزجاج بدون بقع{'\n'}
              - تنظيف الإطارات والزوايا{'\n'}
              - تنظيف الستائر والمظلات{'\n'}
              - استخدام الأدوات المناسبة{'\n'}
              • تنظيف الأثاث والأسطح:{'\n'}
              - تنظيف الأثاث الخشبي{'\n'}
              - تنظيف الأثاث المنجد{'\n'}
              - تنظيف الأسطح المختلفة{'\n'}
              - حماية الأثاث أثناء التنظيف{'\n'}
              • تنظيف الحمامات والمطابخ:{'\n'}
              - تنظيف المراحيض والأحواض{'\n'}
              - تنظيف الدش والجاكوزي{'\n'}
              - تنظيف الأجهزة الكهربائية{'\n'}
              - إزالة الدهون والرواسب
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: TÉCNICAS DE LIMPIEZA BÁSICAS</Text>
            <Text style={styles.moduleContent}>
              • Limpieza de suelos y pavimentos:{'\n'}
              - Técnicas de barrido y aspiración{'\n'}
              - Métodos de fregado y secado{'\n'}
              - Limpieza de diferentes tipos de suelo{'\n'}
              - Eliminación de manchas persistentes{'\n'}
              • Limpieza de paredes y techos:{'\n'}
              - Limpieza de paredes pintadas{'\n'}
              - Limpieza de azulejos y mármol{'\n'}
              - Eliminación de telarañas y polvo{'\n'}
              - Limpieza de techos suspendidos{'\n'}
              • Limpieza de ventanas y cristales:{'\n'}
              - Técnicas de limpieza sin marcas{'\n'}
              - Limpieza de marcos y esquinas{'\n'}
              - Limpieza de cortinas y persianas{'\n'}
              - Uso de herramientas adecuadas{'\n'}
              • Limpieza de muebles y superficies:{'\n'}
              - Limpieza de muebles de madera{'\n'}
              - Limpieza de muebles tapizados{'\n'}
              - Limpieza de diferentes superficies{'\n'}
              - Protección de muebles durante la limpieza{'\n'}
              • Limpieza de baños y cocinas:{'\n'}
              - Limpieza de sanitarios y lavabos{'\n'}
              - Limpieza de duchas y jacuzzis{'\n'}
              - Limpieza de electrodomésticos{'\n'}
              - Eliminación de grasa y residuos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: التنظيف المتخصص</Text>
            <Text style={styles.moduleContentAr}>
              • تنظيف السجاد والموكيت:{'\n'}
              - طرق التنظيف الجاف والرطب{'\n'}
              - إزالة البقع المختلفة{'\n'}
              - استخدام آلات التنظيف المتخصصة{'\n'}
              - العناية بأنواع السجاد المختلفة{'\n'}
              • تنظيف الستائر والمنسوجات:{'\n'}
              - تنظيف الستائر القماشية{'\n'}
              - تنظيف الستائر المعدنية{'\n'}
              - تنظيف المفروشات{'\n'}
              - طرق التجفيف والحفظ{'\n'}
              • تنظيف الأجهزة الإلكترونية:{'\n'}
              - تنظيف الشاشات والشاشات{'\n'}
              - تنظيف لوحات المفاتيح{'\n'}
              - تنظيف الطابعات والماسحات{'\n'}
              - استخدام منتجات آمنة{'\n'}
              • تنظيف المساحات الخارجية:{'\n'}
              - تنظيف الممرات والسلالم{'\n'}
              - تنظيف الساحات والحدائق{'\n'}
              - تنظيف مواقف السيارات{'\n'}
              - إزالة الأوراق والقمامة{'\n'}
              • التنظيف بعد البناء:{'\n'}
              - إزالة بقايا البناء{'\n'}
              - تنظيف الغبار والجص{'\n'}
              - تنظيف الدهانات والطلاء{'\n'}
              - تنظيف شامل للمكان
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: LIMPIEZA ESPECIALIZADA</Text>
            <Text style={styles.moduleContent}>
              • Limpieza de alfombras y moquetas:{'\n'}
              - Métodos de limpieza en seco y húmedo{'\n'}
              - Eliminación de diferentes manchas{'\n'}
              - Uso de máquinas especializadas{'\n'}
              - Cuidado de diferentes tipos de alfombras{'\n'}
              • Limpieza de cortinas y textiles:{'\n'}
              - Limpieza de cortinas de tela{'\n'}
              - Limpieza de cortinas metálicas{'\n'}
              - Limpieza de tapicerías{'\n'}
              - Métodos de secado y almacenamiento{'\n'}
              • Limpieza de equipos electrónicos:{'\n'}
              - Limpieza de pantallas y monitores{'\n'}
              - Limpieza de teclados{'\n'}
              - Limpieza de impresoras y escáneres{'\n'}
              - Uso de productos seguros{'\n'}
              • Limpieza de espacios exteriores:{'\n'}
              - Limpieza de pasillos y escaleras{'\n'}
              - Limpieza de patios y jardines{'\n'}
              - Limpieza de aparcamientos{'\n'}
              - Eliminación de hojas y basura{'\n'}
              • Limpieza post-construcción:{'\n'}
              - Eliminación de restos de construcción{'\n'}
              - Limpieza de polvo y yeso{'\n'}
              - Limpieza de pinturas y barnices{'\n'}
              - Limpieza profunda del espacio
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: التنظيف في قطاعات محددة</Text>
            <Text style={styles.moduleContentAr}>
              • التنظيف في المكاتب والشركات:{'\n'}
              - تنظيف المكاتب والمقصورات{'\n'}
              - تنظيف قاعات الاجتماعات{'\n'}
              - تنظيف المناطق المشتركة{'\n'}
              - إدارة النفايات المكتبية{'\n'}
              • التنظيف في الفنادق والضيافة:{'\n'}
              - تنظيف الغرف اليومي{'\n'}
              - تنظيف ما بعد المغادرة{'\n'}
              - تنظيف المناطق العامة{'\n'}
              - معايير الفنادق{'\n'}
              • التنظيف في المراكز الصحية:{'\n'}
              - بروتوكولات التنظيف الطبي{'\n'}
              - التطهير والتعقيم{'\n'}
              - تنظيف غرف العمليات{'\n'}
              - إدارة النفايات الطبية{'\n'}
              • التنظيف في المراكز التعليمية:{'\n'}
              - تنظيف الفصول الدراسية{'\n'}
              - تنظيف المختبرات{'\n'}
              - تنظيف الملاعب والصالات{'\n'}
              - تنظيف دورات المياه{'\n'}
              • التنظيف في المساحات الصناعية:{'\n'}
              - تنظيف الآلات والمعدات{'\n'}
              - تنظيف المستودعات{'\n'}
              - تنظيف مناطق الإنتاج{'\n'}
              - إدارة النفايات الصناعية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: LIMPIEZA EN SECTORES ESPECÍFICOS</Text>
            <Text style={styles.moduleContent}>
              • Limpieza en oficinas y empresas:{'\n'}
              - Limpieza de escritorios y cubículos{'\n'}
              - Limpieza de salas de reuniones{'\n'}
              - Limpieza de áreas comunes{'\n'}
              - Gestión de residuos de oficina{'\n'}
              • Limpieza en hoteles y hostelería:{'\n'}
              - Limpieza diaria de habitaciones{'\n'}
              - Limpieza post-checkout{'\n'}
              - Limpieza de áreas públicas{'\n'}
              - Estándares hoteleros{'\n'}
              • Limpieza en centros sanitarios:{'\n'}
              - Protocolos de limpieza médica{'\n'}
              - Desinfección y esterilización{'\n'}
              - Limpieza de quirófanos{'\n'}
              - Gestión de residuos médicos{'\n'}
              • Limpieza en centros educativos:{'\n'}
              - Limpieza de aulas{'\n'}
              - Limpieza de laboratorios{'\n'}
              - Limpieza de patios y gimnasios{'\n'}
              - Limpieza de baños{'\n'}
              • Limpieza en espacios industriales:{'\n'}
              - Limpieza de maquinaria y equipos{'\n'}
              - Limpieza de almacenes{'\n'}
              - Limpieza de áreas de producción{'\n'}
              - Gestión de residuos industriales
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السابعة: الإدارة والتنظيم</Text>
            <Text style={styles.moduleContentAr}>
              • تخطيط مهام التنظيف:{'\n'}
              - إعداد الجداول الزمنية{'\n'}
              - تحديد الأولويات{'\n'}
              - توزيع المهام على الفريق{'\n'}
              - مراقبة التقدم{'\n'}
              • مراقبة الجودة في التنظيف:{'\n'}
              - معايير الجودة{'\n'}
              - قوائم المراجعة{'\n'}
              - التفتيش والتحقق{'\n'}
              - تحسين مستمر{'\n'}
              • إدارة النفايات وإعادة التدوير:{'\n'}
              - فصل النفايات{'\n'}
              - إعادة التدوير{'\n'}
              - التخلص الآمن{'\n'}
              - تقليل النفايات{'\n'}
              • تحسين الأوقات والموارد:{'\n'}
              - إدارة الوقت بكفاءة{'\n'}
              - تحسين العمليات{'\n'}
              - تقليل الهدر{'\n'}
              - استخدام التكنولوجيا{'\n'}
              • العمل الجماعي والتنسيق:{'\n'}
              - التواصل الفعال{'\n'}
              - تنسيق المهام{'\n'}
              - حل المشاكل{'\n'}
              - بناء الفريق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 7: GESTIÓN Y ORGANIZACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Planificación de tareas de limpieza:{'\n'}
              - Elaboración de cronogramas{'\n'}
              - Establecimiento de prioridades{'\n'}
              - Distribución de tareas al equipo{'\n'}
              - Seguimiento del progreso{'\n'}
              • Control de calidad en limpieza:{'\n'}
              - Estándares de calidad{'\n'}
              - Listas de verificación{'\n'}
              - Inspección y verificación{'\n'}
              - Mejora continua{'\n'}
              • Gestión de residuos y reciclaje:{'\n'}
              - Separación de residuos{'\n'}
              - Reciclaje{'\n'}
              - Eliminación segura{'\n'}
              - Reducción de residuos{'\n'}
              • Optimización de tiempos y recursos:{'\n'}
              - Gestión eficiente del tiempo{'\n'}
              - Mejora de procesos{'\n'}
              - Reducción de desperdicios{'\n'}
              - Uso de tecnología{'\n'}
              • Trabajo en equipo y coordinación:{'\n'}
              - Comunicación efectiva{'\n'}
              - Coordinación de tareas{'\n'}
              - Resolución de problemas{'\n'}
              - Construcción de equipo
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثامنة: السلامة والوقاية</Text>
            <Text style={styles.moduleContentAr}>
              • المخاطر المهنية في التنظيف:{'\n'}
              - المخاطر الكيميائية{'\n'}
              - المخاطر البيولوجية{'\n'}
              - مخاطر السقوط{'\n'}
              - المخاطر الكهربائية{'\n'}
              - المخاطر البيئية{'\n'}
              • معدات الحماية الشخصية:{'\n'}
              - القفازات المناسبة{'\n'}
              - الأقنعة والكمامات{'\n'}
              - النظارات الواقية{'\n'}
              - الأحذية الآمنة{'\n'}
              - الملابس الواقية{'\n'}
              • التعامل الآمن مع المواد الكيميائية:{'\n'}
              - قراءة الملصقات{'\n'}
              - التخزين الصحيح{'\n'}
              - التخفيف الآمن{'\n'}
              - منع الاختلاط{'\n'}
              - التهوية الكافية{'\n'}
              • منع الحوادث:{'\n'}
              - التدريب على السلامة{'\n'}
              - الإشارات والتحذيرات{'\n'}
              - إجراءات الطوارئ{'\n'}
              - الصيانة الدورية{'\n'}
              • الإسعافات الأولية الأساسية:{'\n'}
              - التعامل مع الحروق{'\n'}
              - التعامل مع الجروح{'\n'}
              - التعامل مع التسمم{'\n'}
              - الإنعاش القلبي الرئوي{'\n'}
              - الاتصال بالطوارئ
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 8: SEGURIDAD Y PREVENCIÓN</Text>
            <Text style={styles.moduleContent}>
              • Riesgos laborales en limpieza:{'\n'}
              - Riesgos químicos{'\n'}
              - Riesgos biológicos{'\n'}
              - Riesgos de caídas{'\n'}
              - Riesgos eléctricos{'\n'}
              - Riesgos ergonómicos{'\n'}
              • Equipos de protección personal:{'\n'}
              - Guantes adecuados{'\n'}
              - Mascarillas y respiradores{'\n'}
              - Gafas de protección{'\n'}
              - Calzado de seguridad{'\n'}
              - Ropa de protección{'\n'}
              • Manejo seguro de productos químicos:{'\n'}
              - Lectura de etiquetas{'\n'}
              - Almacenamiento correcto{'\n'}
              - Dilución segura{'\n'}
              - Prevención de mezclas{'\n'}
              - Ventilación adecuada{'\n'}
              • Prevención de accidentes:{'\n'}
              - Formación en seguridad{'\n'}
              - Señalización y advertencias{'\n'}
              - Procedimientos de emergencia{'\n'}
              - Mantenimiento periódico{'\n'}
              • Primeros auxilios básicos:{'\n'}
              - Tratamiento de quemaduras{'\n'}
              - Tratamiento de heridas{'\n'}
              - Tratamiento de intoxicaciones{'\n'}
              - RCP básico{'\n'}
              - Llamada a emergencias
            </Text>
          </View>
        </View>

        {/* PRODUCTOS DE LIMPIEZA */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="sparkles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🧹 منتجات التنظيف</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>المنتجات الأساسية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منظف متعدد الاستخدامات</Text>
              <Text style={styles.vocabEs}>Detergente multiuso</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مطهر</Text>
              <Text style={styles.vocabEs}>Desinfectante</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مزيل للدهون</Text>
              <Text style={styles.vocabEs}>Desengrasante</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>ملمع</Text>
              <Text style={styles.vocabEs}>Abrillantador</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>معطر</Text>
              <Text style={styles.vocabEs}>Ambientador</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Productos Básicos</Text>
          </View>

          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>المنتجات المتخصصة</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منظف زجاج</Text>
              <Text style={styles.vocabEs}>Limpiador de cristales</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منظف حمامات</Text>
              <Text style={styles.vocabEs}>Limpiador de baños</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منظف مطابخ</Text>
              <Text style={styles.vocabEs}>Limpiador de cocinas</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منظف أرضيات</Text>
              <Text style={styles.vocabEs}>Limpiador de suelos</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Productos Especializados</Text>
          </View>
        </View>

        {/* EQUIPOS Y HERRAMIENTAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="construct" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🛠️ المعدات والأدوات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأدوات اليدوية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مكنسة</Text>
              <Text style={styles.vocabEs}>Escoba</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>ممسحة</Text>
              <Text style={styles.vocabEs}>Fregona</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قطعة قماش</Text>
              <Text style={styles.vocabEs}>Bayeta</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>إسفنجة</Text>
              <Text style={styles.vocabEs}>Esponja</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>فرشاة</Text>
              <Text style={styles.vocabEs}>Cepillo</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Herramientas Manuales</Text>
          </View>

          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>المعدات الكهربائية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مكنسة كهربائية</Text>
              <Text style={styles.vocabEs}>Aspiradora</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>آلة غسل الأرضيات</Text>
              <Text style={styles.vocabEs}>Fregadora</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>آلة تلميع</Text>
              <Text style={styles.vocabEs}>Pulidora</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Equipos Eléctricos</Text>
          </View>
        </View>

        {/* TÉCNICAS DE LIMPIEZA */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="home" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>🏠 تقنيات التنظيف</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>تنظيف الأرضيات</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كنس</Text>
              <Text style={styles.vocabEs}>Barrido</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>شفط</Text>
              <Text style={styles.vocabEs}>Aspirado</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>غسل</Text>
              <Text style={styles.vocabEs}>Fregado</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>شطف</Text>
              <Text style={styles.vocabEs}>Enjuagado</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>تجفيف</Text>
              <Text style={styles.vocabEs}>Secado</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Limpieza de Suelos</Text>
          </View>
        </View>

        {/* SEGURIDAD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>⚠️ السلامة والوقاية</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>معدات الحماية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قفازات</Text>
              <Text style={styles.vocabEs}>Guantes</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أقنعة</Text>
              <Text style={styles.vocabEs}>Mascarillas</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نظارات أمان</Text>
              <Text style={styles.vocabEs}>Gafas de seguridad</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أحذية أمان</Text>
              <Text style={styles.vocabEs}>Calzado de seguridad</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Equipos de Protección</Text>
          </View>
        </View>

        {/* OPORTUNIDADES LABORALES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="briefcase" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>💼 فرص العمل</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الوظائف</Text>
            <Text style={styles.textBlockAr}>
              • عامل تنظيف عام{'\n'}
              • عامل تنظيف متخصص{'\n'}
              • مشرف تنظيف{'\n'}
              • فني تنظيف{'\n'}
              • منسق خدمات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Limpiador/a general{'\n'}
              • Limpiador/a especializado{'\n'}
              • Supervisor de limpieza{'\n'}
              • Técnico de limpieza{'\n'}
              • Coordinador de servicios
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginTop: 4,
    textAlign: 'left',
  },
  headerTitleAr: {
    fontSize: 18,
    color: '#FFD700',
    opacity: 0.95,
    textAlign: 'right',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginLeft: 8,
    textAlign: 'right',
  },
  textBlock: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginTop: 4,
  },
  textBlockAr: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  vocabItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 6,
  },
  vocabAr: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  vocabEs: {
    fontSize: 15,
    color: '#666',
    textAlign: 'left',
    flex: 1,
  },
  moduleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  moduleTitleAr: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
    textAlign: 'right',
  },
  moduleContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  moduleContentAr: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: 8,
  },
  subsectionCard: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
  subsectionTitleAr: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'right',
  },
});
