import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoCarpinteriaScreen() {
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
            <Text style={styles.headerTitleAr}>دورة النجارة</Text>
            <Text style={styles.headerTitle}>Curso de Carpintería</Text>
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
            1. العمل مع الخشب والأدوات{'\n'}
            2. تقنيات القطع والتجميع{'\n'}
            3. إصلاح الأثاث الأساسي{'\n'}
            4. استخدام الأدوات الكهربائية{'\n'}
            5. السلامة في النجارة
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Trabajo con madera y herramientas{'\n'}
            2. Técnicas de corte y ensamblaje{'\n'}
            3. Reparación de muebles básicos{'\n'}
            4. Uso de herramientas eléctricas{'\n'}
            5. Seguridad en carpintería
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • العمل مع الخشب{'\n'}
            • الأدوات اليدوية{'\n'}
            • الأدوات الكهربائية{'\n'}
            • الإصلاحات الأساسية{'\n'}
            • السلامة
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Trabajo con madera{'\n'}
            • Herramientas manuales{'\n'}
            • Herramientas eléctricas{'\n'}
            • Reparaciones básicas{'\n'}
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
            <Text style={styles.vocabAr}>خشب</Text>
            <Text style={styles.vocabEs}>Madera</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>أداة</Text>
            <Text style={styles.vocabEs}>Herramienta</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>منشار</Text>
            <Text style={styles.vocabEs}>Sierra</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مسمار</Text>
            <Text style={styles.vocabEs}>Clavo</Text>
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
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات النجارة</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الخشب وخصائصها:{'\n'}
              - الأخشاب اللينة (الصنوبر، الشوح){'\n'}
              - الأخشاب الصلبة (البلوط، الجوز){'\n'}
              - الأخشاب الاستوائية{'\n'}
              - اختيار النوع المناسب{'\n'}
              • الخصائص الفيزيائية والميكانيكية:{'\n'}
              - الكثافة{'\n'}
              - الصلابة{'\n'}
              - المرونة{'\n'}
              - المقاومة{'\n'}
              • تجفيف واستقرار الخشب:{'\n'}
              - طرق التجفيف{'\n'}
              - محتوى الرطوبة{'\n'}
              - الاستقرار{'\n'}
              • العيوب وكيفية تحديدها:{'\n'}
              - العقد{'\n'}
              - التشقق{'\n'}
              - الانحناء{'\n'}
              - العفن{'\n'}
              • اختيار الخشب للمشاريع:{'\n'}
              - حسب الاستخدام{'\n'}
              - حسب الميزانية{'\n'}
              - حسب المتانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA CARPINTERÍA</Text>
            <Text style={styles.moduleContent}>
              • Tipos de madera y sus características:{'\n'}
              - Maderas blandas (pino, abeto){'\n'}
              - Maderas duras (roble, nogal){'\n'}
              - Maderas exóticas{'\n'}
              - Selección del tipo adecuado{'\n'}
              • Propiedades físicas y mecánicas:{'\n'}
              - Densidad{'\n'}
              - Dureza{'\n'}
              - Flexibilidad{'\n'}
              - Resistencia{'\n'}
              • Secado y estabilización:{'\n'}
              - Métodos de secado{'\n'}
              - Contenido de humedad{'\n'}
              - Estabilización{'\n'}
              • Defectos y cómo identificarlos:{'\n'}
              - Nudos{'\n'}
              - Grietas{'\n'}
              - Deformaciones{'\n'}
              - Hongos{'\n'}
              • Selección de madera para proyectos:{'\n'}
              - Según uso{'\n'}
              - Según presupuesto{'\n'}
              - Según durabilidad
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: الأدوات اليدوية الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • المناشير والمناشير اليدوية:{'\n'}
              - منشار الظهر{'\n'}
              - منشار السن{'\n'}
              - منشار المنحني{'\n'}
              - اختيار المنشار المناسب{'\n'}
              • المخرطة والصنفرة اليدوية:{'\n'}
              - المخرطة اليدوية{'\n'}
              - الصنفرة اليدوية{'\n'}
              - استخدامها{'\n'}
              • المطارق والمفكات:{'\n'}
              - أنواع المطارق{'\n'}
              - المفكات{'\n'}
              - الكماشة{'\n'}
              • أدوات القياس:{'\n'}
              - الشريط{'\n'}
              - الزوايا{'\n'}
              - الميزان{'\n'}
              - البرجل{'\n'}
              • صيانة الأدوات:{'\n'}
              - التنظيف{'\n'}
              - الشحذ{'\n'}
              - التخزين
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: HERRAMIENTAS MANUALES BÁSICAS</Text>
            <Text style={styles.moduleContent}>
              • Serruchos y sierras de mano:{'\n'}
              - Serrucho de costilla{'\n'}
              - Serrucho de punta{'\n'}
              - Sierra de calar{'\n'}
              - Selección adecuada{'\n'}
              • Cepillos y lijadoras manuales:{'\n'}
              - Cepillo manual{'\n'}
              - Lijadora manual{'\n'}
              - Uso correcto{'\n'}
              • Martillos, destornilladores:{'\n'}
              - Tipos de martillos{'\n'}
              - Destornilladores{'\n'}
              - Alicates{'\n'}
              • Escuadras, niveles y metros:{'\n'}
              - Metro{'\n'}
              - Escuadras{'\n'}
              - Niveles{'\n'}
              - Compás{'\n'}
              • Mantenimiento de herramientas:{'\n'}
              - Limpieza{'\n'}
              - Afilado{'\n'}
              - Almacenamiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: الأدوات الكهربائية المحمولة</Text>
            <Text style={styles.moduleContentAr}>
              • منشار دائري ومنشار منحني:{'\n'}
              - منشار دائري{'\n'}
              - منشار منحني{'\n'}
              - الاستخدام الآمن{'\n'}
              • مثقاب ومفك براغي:{'\n'}
              - المثقاب{'\n'}
              - المفك الكهربائي{'\n'}
              - الاستخدام{'\n'}
              • الصنفرة:{'\n'}
              - الصنفرة المدارية{'\n'}
              - الصنفرة الشريطية{'\n'}
              - الاستخدام{'\n'}
              • الراوتر والطاحونة:{'\n'}
              - الراوتر{'\n'}
              - الطاحونة{'\n'}
              - الاستخدامات{'\n'}
              • السلامة في الأدوات الكهربائية:{'\n'}
              - معدات الحماية{'\n'}
              - الإجراءات الآمنة{'\n'}
              - الصيانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: HERRAMIENTAS ELÉCTRICAS PORTÁTILES</Text>
            <Text style={styles.moduleContent}>
              • Sierra circular y sierra de calar:{'\n'}
              - Sierra circular{'\n'}
              - Sierra de calar{'\n'}
              - Uso seguro{'\n'}
              • Taladro y atornillador:{'\n'}
              - Taladro{'\n'}
              - Atornillador eléctrico{'\n'}
              - Uso correcto{'\n'}
              • Lijadoras:{'\n'}
              - Lijadora orbital{'\n'}
              - Lijadora de banda{'\n'}
              - Aplicaciones{'\n'}
              • Router y fresadora:{'\n'}
              - Router{'\n'}
              - Fresadora{'\n'}
              - Usos{'\n'}
              • Seguridad en herramientas eléctricas:{'\n'}
              - Equipos de protección{'\n'}
              - Procedimientos seguros{'\n'}
              - Mantenimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: تقنيات القطع والتجميع</Text>
            <Text style={styles.moduleContentAr}>
              • القطع المستقيم والقطع الزاوي:{'\n'}
              - القطع المستقيم{'\n'}
              - القطع الزاوي{'\n'}
              - التقنيات{'\n'}
              • التجميعات الأساسية:{'\n'}
              - الغراء والدبوس{'\n'}
              - الغراء واللسان{'\n'}
              - التقنيات{'\n'}
              • التجميعات المتقدمة:{'\n'}
              - ذيل الحمامة{'\n'}
              - التجميعات المعقدة{'\n'}
              • وصلات الزاوية:{'\n'}
              - وصلات الزاوية{'\n'}
              - وصلات T{'\n'}
              • تقنيات اللصق:{'\n'}
              - أنواع الغراء{'\n'}
              - التطبيق{'\n'}
              - الضغط
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: TÉCNICAS DE CORTE Y ENSAMBLAJE</Text>
            <Text style={styles.moduleContent}>
              • Corte recto y corte angular:{'\n'}
              - Corte recto{'\n'}
              - Corte angular{'\n'}
              - Técnicas{'\n'}
              • Ensamblajes básicos:{'\n'}
              - Cola y clavija{'\n'}
              - Cola y mortaja{'\n'}
              - Técnicas{'\n'}
              • Ensamblajes avanzados:{'\n'}
              - Cola de milano{'\n'}
              - Ensamblajes complejos{'\n'}
              • Uniones de esquina:{'\n'}
              - Uniones de esquina{'\n'}
              - Uniones en T{'\n'}
              • Técnicas de encolado:{'\n'}
              - Tipos de cola{'\n'}
              - Aplicación{'\n'}
              - Prensado
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: التشطيبات والمعالجات</Text>
            <Text style={styles.moduleContentAr}>
              • الصنفرة وتحضير الأسطح:{'\n'}
              - الصنفرة التدريجية{'\n'}
              - التنظيف{'\n'}
              - التحضير{'\n'}
              • الورنيش واللك:{'\n'}
              - أنواع الورنيش{'\n'}
              - التطبيق{'\n'}
              - التشطيب{'\n'}
              • الزيوت والشموع:{'\n'}
              - الزيوت الطبيعية{'\n'}
              - الشموع{'\n'}
              - التطبيق{'\n'}
              • الصبغات والألوان:{'\n'}
              - أنواع الصبغات{'\n'}
              - التطبيق{'\n'}
              • تقنيات التقادم:{'\n'}
              - التقنيات{'\n'}
              - التطبيق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: ACABADOS Y TRATAMIENTOS</Text>
            <Text style={styles.moduleContent}>
              • Lijado y preparación:{'\n'}
              - Lijado progresivo{'\n'}
              - Limpieza{'\n'}
              - Preparación{'\n'}
              • Barnices y lacas:{'\n'}
              - Tipos de barniz{'\n'}
              - Aplicación{'\n'}
              - Acabado{'\n'}
              • Aceites y ceras:{'\n'}
              - Aceites naturales{'\n'}
              - Ceras{'\n'}
              - Aplicación{'\n'}
              • Tintes y colorantes:{'\n'}
              - Tipos de tintes{'\n'}
              - Aplicación{'\n'}
              • Técnicas de envejecimiento:{'\n'}
              - Técnicas{'\n'}
              - Aplicación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: المشاريع العملية</Text>
            <Text style={styles.moduleContentAr}>
              • الرفوف والأرفف:{'\n'}
              - التصميم{'\n'}
              - التنفيذ{'\n'}
              • الطاولات والكراسي:{'\n'}
              - التصميم{'\n'}
              - التنفيذ{'\n'}
              • الصناديق والدرج:{'\n'}
              - التصميم{'\n'}
              - التنفيذ{'\n'}
              • الإطارات والقوالب:{'\n'}
              - التصميم{'\n'}
              - التنفيذ{'\n'}
              • المشاريع المخصصة:{'\n'}
              - التخطيط{'\n'}
              - التنفيذ
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: PROYECTOS PRÁCTICOS</Text>
            <Text style={styles.moduleContent}>
              • Estanterías y repisas:{'\n'}
              - Diseño{'\n'}
              - Ejecución{'\n'}
              • Mesas y sillas:{'\n'}
              - Diseño{'\n'}
              - Ejecución{'\n'}
              • Cajas y cajones:{'\n'}
              - Diseño{'\n'}
              - Ejecución{'\n'}
              • Marcos y molduras:{'\n'}
              - Diseño{'\n'}
              - Ejecución{'\n'}
              • Proyectos personalizados:{'\n'}
              - Planificación{'\n'}
              - Ejecución
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السابعة: الإصلاح والترميم</Text>
            <Text style={styles.moduleContentAr}>
              • تشخيص الأضرار:{'\n'}
              - تحديد المشاكل{'\n'}
              - التقييم{'\n'}
              • إصلاح الأثاث القديم:{'\n'}
              - التقنيات{'\n'}
              - التنفيذ{'\n'}
              • ترميم الأسطح:{'\n'}
              - التقنيات{'\n'}
              - التنفيذ{'\n'}
              • تثبيت الهياكل:{'\n'}
              - التقنيات{'\n'}
              - التنفيذ{'\n'}
              • الحفظ الوقائي:{'\n'}
              - التقنيات{'\n'}
              - الصيانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 7: REPARACIÓN Y RESTAURACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Diagnóstico de daños:{'\n'}
              - Identificación de problemas{'\n'}
              - Evaluación{'\n'}
              • Reparación de muebles antiguos:{'\n'}
              - Técnicas{'\n'}
              - Ejecución{'\n'}
              • Restauración de superficies:{'\n'}
              - Técnicas{'\n'}
              - Ejecución{'\n'}
              • Consolidación de estructuras:{'\n'}
              - Técnicas{'\n'}
              - Ejecución{'\n'}
              • Conservación preventiva:{'\n'}
              - Técnicas{'\n'}
              - Mantenimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثامنة: السلامة في النجارة</Text>
            <Text style={styles.moduleContentAr}>
              • معدات الحماية:{'\n'}
              - النظارات{'\n'}
              - القناع{'\n'}
              - القفازات{'\n'}
              - الحماية السمعية{'\n'}
              • قواعد السلامة:{'\n'}
              - النظام والنظافة{'\n'}
              - فحص الأدوات{'\n'}
              - الاستخدام الصحيح{'\n'}
              • منع الحوادث:{'\n'}
              - إيقاف الآلات{'\n'}
              - الحفاظ على الكابلات{'\n'}
              - الإضاءة{'\n'}
              - التهوية{'\n'}
              • الإسعافات الأولية:{'\n'}
              - صندوق الإسعافات{'\n'}
              - الإجراءات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 8: SEGURIDAD EN CARPINTERÍA</Text>
            <Text style={styles.moduleContent}>
              • Equipos de protección:{'\n'}
              - Gafas{'\n'}
              - Mascarilla{'\n'}
              - Guantes{'\n'}
              - Protección auditiva{'\n'}
              • Normas de seguridad:{'\n'}
              - Orden y limpieza{'\n'}
              - Revisión de herramientas{'\n'}
              - Uso correcto{'\n'}
              • Prevención de accidentes:{'\n'}
              - Bloquear máquinas{'\n'}
              - Mantener cables{'\n'}
              - Iluminación{'\n'}
              - Ventilación{'\n'}
              • Primeros auxilios:{'\n'}
              - Botiquín{'\n'}
              - Procedimientos
            </Text>
          </View>
        </View>

        {/* TIPOS DE MADERA */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🪵 أنواع الخشب</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأخشاب اللينة</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>صنوبر</Text>
              <Text style={styles.vocabEs}>Pino</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>شوح</Text>
              <Text style={styles.vocabEs}>Abeto</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أرز</Text>
              <Text style={styles.vocabEs}>Cedro</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Maderas Blandas</Text>
          </View>

          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأخشاب الصلبة</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>بلوط</Text>
              <Text style={styles.vocabEs}>Roble</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>جوز</Text>
              <Text style={styles.vocabEs}>Nogal</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كرز</Text>
              <Text style={styles.vocabEs}>Cerezo</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Maderas Duras</Text>
          </View>
        </View>

        {/* HERRAMIENTAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="construct" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>🛠️ الأدوات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>أدوات القطع</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منشار ظهر</Text>
              <Text style={styles.vocabEs}>Serrucho de costilla</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منشار منحني</Text>
              <Text style={styles.vocabEs}>Sierra de calar</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>منشار دائري</Text>
              <Text style={styles.vocabEs}>Sierra circular</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Herramientas de Corte</Text>
          </View>
        </View>

        {/* SEGURIDAD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>⚠️ السلامة</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>معدات الحماية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نظارات أمان</Text>
              <Text style={styles.vocabEs}>Gafas de seguridad</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قناع مضاد للغبار</Text>
              <Text style={styles.vocabEs}>Mascarilla antipolvo</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قفازات عمل</Text>
              <Text style={styles.vocabEs}>Guantes de trabajo</Text>
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
              • نجار بناء{'\n'}
              • صانع أثاث{'\n'}
              • مرمم أثاث{'\n'}
              • مركب مطابخ{'\n'}
              • صانع قوالب
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Carpintero de obra{'\n'}
              • Ebanista{'\n'}
              • Restaurador de muebles{'\n'}
              • Instalador de cocinas{'\n'}
              • Fabricante de molduras
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
