import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoFontaneroScreen() {
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
            <Text style={styles.headerTitleAr}>دورة السباكة</Text>
            <Text style={styles.headerTitle}>Curso de Fontanería</Text>
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
            1. تركيب وإصلاح أنظمة الأنابيب{'\n'}
            2. صيانة أنظمة الماء الصالح للشرب والصرف الصحي{'\n'}
            3. إصلاح الصنابير والمراحيض والأجهزة المنزلية{'\n'}
            4. تركيب سخانات الماء وأنظمة التدفئة{'\n'}
            5. السلامة في أعمال السباكة واللوائح{'\n'}
            6. تشخيص المشاكل والحلول العملية{'\n'}
            7. استخدام الأدوات المتخصصة ومعدات السلامة{'\n'}
            8. إدارة المواد والميزانيات الأساسية
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Instalación y reparación de sistemas de tuberías{'\n'}
            2. Mantenimiento de sistemas de agua potable y saneamiento{'\n'}
            3. Reparación de grifos, sanitarios y electrodomésticos{'\n'}
            4. Instalación de calentadores de agua y sistemas de calefacción{'\n'}
            5. Seguridad en trabajos de fontanería y normativas{'\n'}
            6. Diagnóstico de problemas y soluciones prácticas{'\n'}
            7. Uso de herramientas especializadas y equipos de seguridad{'\n'}
            8. Gestión de materiales y presupuestos básicos
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • أساسيات السباكة{'\n'}
            • أنظمة الماء الصالح للشرب{'\n'}
            • أنظمة الصرف الصحي{'\n'}
            • الإصلاحات الأساسية{'\n'}
            • أنظمة الماء الساخن{'\n'}
            • التشخيص وحل المشاكل
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Fundamentos de fontanería{'\n'}
            • Sistemas de agua potable{'\n'}
            • Sistemas de saneamiento{'\n'}
            • Reparaciones básicas{'\n'}
            • Sistemas de agua caliente{'\n'}
            • Diagnóstico y solución de problemas
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سباكة</Text>
            <Text style={styles.vocabEs}>Fontanería</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>أنبوب</Text>
            <Text style={styles.vocabEs}>Tubería</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>صنبور</Text>
            <Text style={styles.vocabEs}>Grifo</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مرحاض</Text>
            <Text style={styles.vocabEs}>Inodoro</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>تسرب</Text>
            <Text style={styles.vocabEs}>Fuga</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات السباكة</Text>
            <Text style={styles.moduleContentAr}>
              • المواد وأنواع الأنابيب:{'\n'}
              - أنابيب PVC (بلاستيك){'\n'}
              - أنابيب النحاس{'\n'}
              - أنابيب PEX (بلاستيك مرن){'\n'}
              - الأنابيب المعدنية{'\n'}
              - اختيار النوع المناسب{'\n'}
              • الأدوات الأساسية:{'\n'}
              - المفاتيح (إنجليزي، أنبوبي){'\n'}
              - الكماشة{'\n'}
              - المفكات{'\n'}
              - قاطع الأنابيب{'\n'}
              - الأدوات المتخصصة{'\n'}
              • لوائح السلامة:{'\n'}
              - معدات الحماية الشخصية{'\n'}
              - إجراءات العمل الآمن{'\n'}
              - القوانين المعمول بها{'\n'}
              - التصاريح المطلوبة{'\n'}
              • مفاهيم الضغط والتدفق:{'\n'}
              - ضغط الماء{'\n'}
              - تدفق الماء{'\n'}
              - حساب الأحجام{'\n'}
              - التحكم في الضغط{'\n'}
              • الوصلات والملحقات:{'\n'}
              - أنواع الوصلات{'\n'}
              - الصمامات{'\n'}
              - التجهيزات{'\n'}
              - طرق الربط
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA FONTANERÍA</Text>
            <Text style={styles.moduleContent}>
              • Materiales y tipos de tuberías:{'\n'}
              - Tuberías PVC{'\n'}
              - Tuberías de cobre{'\n'}
              - Tuberías PEX{'\n'}
              - Tuberías metálicas{'\n'}
              - Selección del tipo adecuado{'\n'}
              • Herramientas básicas:{'\n'}
              - Llaves (inglesa, de tubo){'\n'}
              - Alicates{'\n'}
              - Destornilladores{'\n'}
              - Cortatubos{'\n'}
              - Herramientas especializadas{'\n'}
              • Normativas de seguridad:{'\n'}
              - Equipos de protección personal{'\n'}
              - Procedimientos de trabajo seguro{'\n'}
              - Leyes aplicables{'\n'}
              - Permisos requeridos{'\n'}
              • Conceptos de presión y caudal:{'\n'}
              - Presión de agua{'\n'}
              - Caudal de agua{'\n'}
              - Cálculo de volúmenes{'\n'}
              - Control de presión{'\n'}
              • Conexiones y accesorios:{'\n'}
              - Tipos de conexiones{'\n'}
              - Válvulas{'\n'}
              - Accesorios{'\n'}
              - Métodos de unión
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: أنظمة الماء الصالح للشرب</Text>
            <Text style={styles.moduleContentAr}>
              • التركيب الرئيسي:{'\n'}
              - عداد الماء{'\n'}
              - صمام الإغلاق الرئيسي{'\n'}
              - الفلتر الرئيسي{'\n'}
              - مخفض الضغط{'\n'}
              - نقطة الدخول{'\n'}
              • توزيع الأنابيب:{'\n'}
              - الأنبوب الرئيسي{'\n'}
              - الفروع للغرف{'\n'}
              - التوزيع المتوازن{'\n'}
              - الصمامات الفرعية{'\n'}
              • الوصلات والربط:{'\n'}
              - طرق الربط المختلفة{'\n'}
              - الربط باللحام{'\n'}
              - الربط بالضغط{'\n'}
              - الربط باللولبة{'\n'}
              • صمامات التحكم:{'\n'}
              - صمامات القطع{'\n'}
              - صمامات التحكم{'\n'}
              - صمامات الأمان{'\n'}
              - صمامات التخفيض{'\n'}
              • أنظمة التصفية:{'\n'}
              - الفلاتر الأساسية{'\n'}
              - أنظمة التنقية{'\n'}
              - معالجة الماء{'\n'}
              - الصيانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: SISTEMAS DE AGUA POTABLE</Text>
            <Text style={styles.moduleContent}>
              • Instalación principal:{'\n'}
              - Contador de agua{'\n'}
              - Válvula de paso principal{'\n'}
              - Filtro principal{'\n'}
              - Reductor de presión{'\n'}
              - Punto de entrada{'\n'}
              • Distribución de tuberías:{'\n'}
              - Tubería principal{'\n'}
              - Derivaciones a habitaciones{'\n'}
              - Distribución equilibrada{'\n'}
              - Válvulas secundarias{'\n'}
              • Conexiones y empalmes:{'\n'}
              - Diferentes métodos de unión{'\n'}
              - Unión por soldadura{'\n'}
              - Unión por presión{'\n'}
              - Unión por rosca{'\n'}
              • Válvulas de control:{'\n'}
              - Válvulas de corte{'\n'}
              - Válvulas de control{'\n'}
              - Válvulas de seguridad{'\n'}
              - Válvulas reductoras{'\n'}
              • Sistemas de filtración:{'\n'}
              - Filtros básicos{'\n'}
              - Sistemas de purificación{'\n'}
              - Tratamiento de agua{'\n'}
              - Mantenimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: أنظمة الصرف الصحي</Text>
            <Text style={styles.moduleContentAr}>
              • تركيب المصارف:{'\n'}
              - المصارف الداخلية{'\n'}
              - المصارف الخارجية{'\n'}
              - الأنابيب الرأسية{'\n'}
              - التدرج الصحيح{'\n'}
              • أنظمة التهوية:{'\n'}
              - أنابيب التهوية{'\n'}
              - أهمية التهوية{'\n'}
              - منع الروائح{'\n'}
              - الحفاظ على الضغط{'\n'}
              • السيفونات ومصائد الماء:{'\n'}
              - أنواع السيفونات{'\n'}
              - مبدأ العمل{'\n'}
              - التركيب{'\n'}
              - الصيانة{'\n'}
              • الاتصال بالشبكة:{'\n'}
              - الاتصال بالشبكة البلدية{'\n'}
              - نقطة الاتصال{'\n'}
              - التصاريح المطلوبة{'\n'}
              - المعايير{'\n'}
              • الصيانة والتنظيف:{'\n'}
              - تنظيف المصارف{'\n'}
              - إزالة الانسدادات{'\n'}
              - الصيانة الوقائية{'\n'}
              - أدوات التنظيف
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: SISTEMAS DE SANEAMIENTO</Text>
            <Text style={styles.moduleContent}>
              • Instalación de desagües:{'\n'}
              - Desagües interiores{'\n'}
              - Desagües exteriores{'\n'}
              - Bajantes{'\n'}
              - Pendiente correcta{'\n'}
              • Sistemas de ventilación:{'\n'}
              - Tuberías de ventilación{'\n'}
              - Importancia de la ventilación{'\n'}
              - Prevención de olores{'\n'}
              - Mantenimiento de presión{'\n'}
              • Sifones y trampas:{'\n'}
              - Tipos de sifones{'\n'}
              - Principio de funcionamiento{'\n'}
              - Instalación{'\n'}
              - Mantenimiento{'\n'}
              • Conexión a la red:{'\n'}
              - Conexión a red municipal{'\n'}
              - Punto de conexión{'\n'}
              - Permisos requeridos{'\n'}
              - Estándares{'\n'}
              • Mantenimiento y limpieza:{'\n'}
              - Limpieza de desagües{'\n'}
              - Eliminación de obstrucciones{'\n'}
              - Mantenimiento preventivo{'\n'}
              - Herramientas de limpieza
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الإصلاحات الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • إصلاح الصنابير:{'\n'}
              - أنواع الصنابير{'\n'}
              - تشخيص المشاكل{'\n'}
              - تغيير الحلقات{'\n'}
              - تنظيف الفلاتر{'\n'}
              - إصلاح الخراطيش{'\n'}
              • إصلاح المراحيض:{'\n'}
              - تشخيص المشاكل{'\n'}
              - إصلاح التسربات{'\n'}
              - تغيير الحلقات{'\n'}
              - تنظيف المرحاض{'\n'}
              - إصلاح آلية التصريف{'\n'}
              • إصلاح التسربات:{'\n'}
              - تحديد مكان التسرب{'\n'}
              - أنواع التسربات{'\n'}
              - طرق الإصلاح{'\n'}
              - المواد المستخدمة{'\n'}
              - الاختبار بعد الإصلاح{'\n'}
              • صيانة الأجهزة:{'\n'}
              - صيانة الغسالات{'\n'}
              - صيانة غسالات الأطباق{'\n'}
              - صيانة الأجهزة الأخرى{'\n'}
              - استبدال القطع{'\n'}
              • الصيانة الوقائية:{'\n'}
              - الفحص الدوري{'\n'}
              - التنظيف{'\n'}
              - استبدال القطع البالية{'\n'}
              - التوثيق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: REPARACIONES BÁSICAS</Text>
            <Text style={styles.moduleContent}>
              • Reparación de grifos:{'\n'}
              - Tipos de grifos{'\n'}
              - Diagnóstico de problemas{'\n'}
              - Cambio de juntas{'\n'}
              - Limpieza de filtros{'\n'}
              - Reparación de cartuchos{'\n'}
              • Reparación de sanitarios:{'\n'}
              - Diagnóstico de problemas{'\n'}
              - Reparación de fugas{'\n'}
              - Cambio de juntas{'\n'}
              - Limpieza de inodoro{'\n'}
              - Reparación de mecanismo de descarga{'\n'}
              • Reparación de fugas:{'\n'}
              - Localización de fugas{'\n'}
              - Tipos de fugas{'\n'}
              - Métodos de reparación{'\n'}
              - Materiales utilizados{'\n'}
              - Prueba después de reparación{'\n'}
              • Mantenimiento de electrodomésticos:{'\n'}
              - Mantenimiento de lavadoras{'\n'}
              - Mantenimiento de lavavajillas{'\n'}
              - Mantenimiento de otros electrodomésticos{'\n'}
              - Reemplazo de piezas{'\n'}
              • Mantenimiento preventivo:{'\n'}
              - Revisión periódica{'\n'}
              - Limpieza{'\n'}
              - Reemplazo de piezas desgastadas{'\n'}
              - Documentación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: أنظمة الماء الساخن</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع السخانات:{'\n'}
              - السخان الكهربائي{'\n'}
              - السخان بالغاز{'\n'}
              - السخان الشمسي{'\n'}
              - السخان الفوري{'\n'}
              - السخان المختلط{'\n'}
              • تركيب السخانات:{'\n'}
              - اختيار الموقع{'\n'}
              - التوصيل الكهربائي{'\n'}
              - التوصيل بالماء{'\n'}
              - التوصيل بالغاز (إن وجد){'\n'}
              - التهوية{'\n'}
              • أنظمة التدفئة:{'\n'}
              - التدفئة بالماء{'\n'}
              - المشعات{'\n'}
              - الأرضية المشعة{'\n'}
              - التوزيع{'\n'}
              • منظمات الحرارة:{'\n'}
              - أنواع المنظمات{'\n'}
              - المعايرة{'\n'}
              - الصيانة{'\n'}
              - الاستبدال{'\n'}
              • الصيانة الوقائية:{'\n'}
              - تنظيف الخزانات{'\n'}
              - إزالة الترسبات{'\n'}
              - فحص الصمامات{'\n'}
              - اختبار الأمان
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: SISTEMAS DE AGUA CALIENTE</Text>
            <Text style={styles.moduleContent}>
              • Tipos de calentadores:{'\n'}
              - Calentador eléctrico{'\n'}
              - Calentador de gas{'\n'}
              - Calentador solar{'\n'}
              - Calentador instantáneo{'\n'}
              - Calentador mixto{'\n'}
              • Instalación de calentadores:{'\n'}
              - Selección de ubicación{'\n'}
              - Conexión eléctrica{'\n'}
              - Conexión de agua{'\n'}
              - Conexión de gas (si aplica){'\n'}
              - Ventilación{'\n'}
              • Sistemas de calefacción:{'\n'}
              - Calefacción por agua{'\n'}
              - Radiadores{'\n'}
              - Suelo radiante{'\n'}
              - Distribución{'\n'}
              • Termostatos:{'\n'}
              - Tipos de termostatos{'\n'}
              - Calibración{'\n'}
              - Mantenimiento{'\n'}
              - Reemplazo{'\n'}
              • Mantenimiento preventivo:{'\n'}
              - Limpieza de depósitos{'\n'}
              - Eliminación de sedimentos{'\n'}
              - Revisión de válvulas{'\n'}
              - Prueba de seguridad
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: التشخيص وحل المشاكل</Text>
            <Text style={styles.moduleContentAr}>
              • تحديد المشاكل الشائعة:{'\n'}
              - تسرب الماء{'\n'}
              - ضغط منخفض{'\n'}
              - ماء ساخن غير كافي{'\n'}
              - انسدادات{'\n'}
              - أصوات غير طبيعية{'\n'}
              • أدوات التشخيص:{'\n'}
              - كاشف التسرب{'\n'}
              - مقياس الضغط{'\n'}
              - كاميرا الفحص{'\n'}
              - مقياس الحرارة{'\n'}
              - أدوات أخرى{'\n'}
              • الحلول العملية:{'\n'}
              - حل التسربات{'\n'}
              - تحسين الضغط{'\n'}
              - حل مشاكل الماء الساخن{'\n'}
              - إزالة الانسدادات{'\n'}
              - حل المشاكل الصوتية{'\n'}
              • الوقاية من الأعطال:{'\n'}
              - الصيانة الدورية{'\n'}
              - الفحص المنتظم{'\n'}
              - الاستخدام الصحيح{'\n'}
              - استبدال القطع البالية{'\n'}
              • التوثيق:{'\n'}
              - تسجيل المشاكل{'\n'}
              - تسجيل الحلول{'\n'}
              - الصيانة المستقبلية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: DIAGNÓSTICO Y SOLUCIÓN DE PROBLEMAS</Text>
            <Text style={styles.moduleContent}>
              • Identificación de problemas comunes:{'\n'}
              - Fugas de agua{'\n'}
              - Baja presión{'\n'}
              - Agua caliente insuficiente{'\n'}
              - Obstrucciones{'\n'}
              - Ruidos anormales{'\n'}
              • Herramientas de diagnóstico:{'\n'}
              - Detector de fugas{'\n'}
              - Manómetro{'\n'}
              - Cámara de inspección{'\n'}
              - Termómetro{'\n'}
              - Otras herramientas{'\n'}
              • Soluciones prácticas:{'\n'}
              - Solución de fugas{'\n'}
              - Mejora de presión{'\n'}
              - Solución de problemas de agua caliente{'\n'}
              - Eliminación de obstrucciones{'\n'}
              - Solución de problemas de ruido{'\n'}
              • Prevención de averías:{'\n'}
              - Mantenimiento periódico{'\n'}
              - Inspección regular{'\n'}
              - Uso correcto{'\n'}
              - Reemplazo de piezas desgastadas{'\n'}
              • Documentación:{'\n'}
              - Registro de problemas{'\n'}
              - Registro de soluciones{'\n'}
              - Mantenimiento futuro
            </Text>
          </View>
        </View>

        {/* HERRAMIENTAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="construct" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🛠️ الأدوات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأدوات الأساسية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مفتاح إنجليزي</Text>
              <Text style={styles.vocabEs}>Llave inglesa</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مفتاح أنبوبي</Text>
              <Text style={styles.vocabEs}>Llave de tubo</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كماشة</Text>
              <Text style={styles.vocabEs}>Alicates</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قاطع أنابيب</Text>
              <Text style={styles.vocabEs}>Cortatubos</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Herramientas Básicas</Text>
          </View>
        </View>

        {/* MATERIALES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🔧 المواد والأنابيب</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>أنواع الأنابيب</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>بلاستيك PVC</Text>
              <Text style={styles.vocabEs}>PVC</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نحاس</Text>
              <Text style={styles.vocabEs}>Cobre</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>بلاستيك مرن PEX</Text>
              <Text style={styles.vocabEs}>PEX</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>حديد مجلفن</Text>
              <Text style={styles.vocabEs}>Hierro galvanizado</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Tipos de Tuberías</Text>
          </View>
        </View>

        {/* SEGURIDAD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>⚠️ السلامة</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>معدات الحماية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قفازات عمل</Text>
              <Text style={styles.vocabEs}>Guantes de trabajo</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نظارات أمان</Text>
              <Text style={styles.vocabEs}>Gafas de seguridad</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قناع</Text>
              <Text style={styles.vocabEs}>Mascarilla</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أحذية أمان</Text>
              <Text style={styles.vocabEs}>Botas de seguridad</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Equipos de Protección</Text>
          </View>
        </View>

        {/* OPORTUNIDADES LABORALES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="briefcase" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>💼 فرص العمل</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الوظائف</Text>
            <Text style={styles.textBlockAr}>
              • سباك تركيبات{'\n'}
              • سباك صيانة{'\n'}
              • فني أنظمة الماء{'\n'}
              • مركب سخانات{'\n'}
              • فني صرف صحي
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Fontanero de instalaciones{'\n'}
              • Fontanero de mantenimiento{'\n'}
              • Técnico de sistemas de agua{'\n'}
              • Instalador de calentadores{'\n'}
              • Técnico de saneamiento
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
    color: '#79A890',
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
