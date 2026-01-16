import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoElectricidadScreen() {
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
            <Text style={styles.headerTitleAr}>دورة الكهرباء</Text>
            <Text style={styles.headerTitle}>Curso de Electricidad</Text>
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
            1. التركيبات الكهربائية الأساسية{'\n'}
            2. إصلاح القوابس والمفاتيح{'\n'}
            3. تركيب المصابيح والأضواء{'\n'}
            4. صيانة لوحات الكهرباء{'\n'}
            5. السلامة في الأعمال الكهربائية
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Instalaciones eléctricas básicas{'\n'}
            2. Reparación de enchufes e interruptores{'\n'}
            3. Instalación de lámparas y luces{'\n'}
            4. Mantenimiento de cuadros eléctricos{'\n'}
            5. Seguridad en trabajos eléctricos
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • التركيبات الأساسية{'\n'}
            • القوابس والمفاتيح{'\n'}
            • الإضاءة{'\n'}
            • لوحات الكهرباء{'\n'}
            • السلامة
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Instalaciones básicas{'\n'}
            • Enchufes e interruptores{'\n'}
            • Iluminación{'\n'}
            • Cuadros eléctricos{'\n'}
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
            <Text style={styles.vocabAr}>كهرباء</Text>
            <Text style={styles.vocabEs}>Electricidad</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>قابس</Text>
            <Text style={styles.vocabEs}>Enchufe</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مفتاح</Text>
            <Text style={styles.vocabEs}>Interruptor</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مصباح</Text>
            <Text style={styles.vocabEs}>Lámpara</Text>
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
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات الكهرباء</Text>
            <Text style={styles.moduleContentAr}>
              • المفاهيم الأساسية:{'\n'}
              - الجهد الكهربائي (Voltaje){'\n'}
              - التيار الكهربائي (Corriente){'\n'}
              - المقاومة الكهربائية (Resistencia){'\n'}
              - القدرة الكهربائية (Potencia){'\n'}
              - التردد (Frecuencia){'\n'}
              • قانون أوم والقدرة:{'\n'}
              - الصيغة الأساسية: ج = ت × م{'\n'}
              - حساب التيار: ت = ج ÷ م{'\n'}
              - حساب المقاومة: م = ج ÷ ت{'\n'}
              - حساب القدرة: ق = ج × ت{'\n'}
              • أنواع التيار:{'\n'}
              - التيار المستمر (DC){'\n'}
              - التيار المتناوب (AC){'\n'}
              - الفرق بينهما{'\n'}
              - الاستخدامات المختلفة{'\n'}
              • قياس المقادير الكهربائية:{'\n'}
              - استخدام المقياس المتعدد{'\n'}
              - قياس الجهد{'\n'}
              - قياس التيار{'\n'}
              - قياس المقاومة{'\n'}
              • الرموز الكهربائية الأساسية:{'\n'}
              - رموز المكونات{'\n'}
              - قراءة المخططات{'\n'}
              - فهم الدوائر{'\n'}
              - التمثيل الرمزي
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA ELECTRICIDAD</Text>
            <Text style={styles.moduleContent}>
              • Conceptos básicos:{'\n'}
              - Voltaje (V){'\n'}
              - Corriente (A){'\n'}
              - Resistencia (Ω){'\n'}
              - Potencia (W){'\n'}
              - Frecuencia (Hz){'\n'}
              • Ley de Ohm y potencia:{'\n'}
              - Fórmula básica: V = I × R{'\n'}
              - Cálculo de corriente: I = V ÷ R{'\n'}
              - Cálculo de resistencia: R = V ÷ I{'\n'}
              - Cálculo de potencia: P = V × I{'\n'}
              • Tipos de corriente:{'\n'}
              - Corriente continua (DC){'\n'}
              - Corriente alterna (AC){'\n'}
              - Diferencias entre ambas{'\n'}
              - Usos diferentes{'\n'}
              • Medición de magnitudes eléctricas:{'\n'}
              - Uso del multímetro{'\n'}
              - Medición de voltaje{'\n'}
              - Medición de corriente{'\n'}
              - Medición de resistencia{'\n'}
              • Simbología eléctrica básica:{'\n'}
              - Símbolos de componentes{'\n'}
              - Lectura de esquemas{'\n'}
              - Comprensión de circuitos{'\n'}
              - Representación simbólica
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: المواد والأدوات</Text>
            <Text style={styles.moduleContentAr}>
              • الكابلات والموصلات:{'\n'}
              - الكابل الأحادي{'\n'}
              - الكابل الثنائي{'\n'}
              - الكابل الثلاثي{'\n'}
              - الكابل المرن{'\n'}
              - الكابل الصلب{'\n'}
              • الأنابيب والقنوات:{'\n'}
              - أنبوب PVC{'\n'}
              - الأنبوب المعدني{'\n'}
              - القناة{'\n'}
              - صينية الكابلات{'\n'}
              - القناة المرنة{'\n'}
              • صناديق التوصيل والوصلات:{'\n'}
              - صندوق التوصيل{'\n'}
              - صندوق التسجيل{'\n'}
              - صندوق التفرع{'\n'}
              - أنواع الوصلات{'\n'}
              - الأطراف{'\n'}
              • الأدوات اليدوية:{'\n'}
              - المفك{'\n'}
              - الكماشة{'\n'}
              - قاطع العزل{'\n'}
              - آلة الكبس{'\n'}
              - الشريط العازل{'\n'}
              • معدات القياس:{'\n'}
              - المقياس المتعدد{'\n'}
              - كاشف الجهد{'\n'}
              - مقياس الاستمرارية{'\n'}
              - أدوات القياس الأخرى
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: MATERIALES Y HERRAMIENTAS</Text>
            <Text style={styles.moduleContent}>
              • Cables y conductores:{'\n'}
              - Cable unipolar{'\n'}
              - Cable bipolar{'\n'}
              - Cable tripolar{'\n'}
              - Cable flexible{'\n'}
              - Cable rígido{'\n'}
              • Tubos y canalizaciones:{'\n'}
              - Tubo PVC{'\n'}
              - Tubo metálico{'\n'}
              - Canaleta{'\n'}
              - Bandeja portacables{'\n'}
              - Conduit{'\n'}
              • Cajas y empalmes:{'\n'}
              - Caja de conexión{'\n'}
              - Caja de registro{'\n'}
              - Caja de derivación{'\n'}
              - Tipos de empalmes{'\n'}
              - Terminales{'\n'}
              • Herramientas manuales:{'\n'}
              - Destornillador{'\n'}
              - Alicates{'\n'}
              - Pelacables{'\n'}
              - Crimpadora{'\n'}
              - Cinta aislante{'\n'}
              • Equipos de medición:{'\n'}
              - Multímetro{'\n'}
              - Buscador de tensión{'\n'}
              - Probador de continuidad{'\n'}
              - Otras herramientas de medición
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: التركيبات الكهربائية الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • تركيب القوابس:{'\n'}
              - القابس البسيط{'\n'}
              - القابس المزدوج{'\n'}
              - القابس مع المفتاح{'\n'}
              - القابس USB{'\n'}
              - القابس الخاص بالمطبخ{'\n'}
              • تركيب المفاتيح:{'\n'}
              - المفتاح البسيط{'\n'}
              - المفتاح المزدوج{'\n'}
              - المفتاح الثلاثي{'\n'}
              - المفتاح مع المؤشر{'\n'}
              - المفتاح التلقائي{'\n'}
              • توصيل المصابيح:{'\n'}
              - مصباح السقف{'\n'}
              - مصباح الحائط{'\n'}
              - مصباح الطاولة{'\n'}
              - مصباح الطوارئ{'\n'}
              - مصباح LED{'\n'}
              • تركيب المراوح:{'\n'}
              - مراوح السقف{'\n'}
              - توصيل المراوح{'\n'}
              - التحكم في السرعة{'\n'}
              - الصيانة{'\n'}
              • توصيل الأجهزة:{'\n'}
              - توصيل الأجهزة المنزلية{'\n'}
              - تركيب الأجراس{'\n'}
              - تركيب الإنذارات{'\n'}
              - السلامة في التوصيل
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: INSTALACIONES ELÉCTRICAS BÁSICAS</Text>
            <Text style={styles.moduleContent}>
              • Instalación de enchufes:{'\n'}
              - Enchufe simple{'\n'}
              - Enchufe doble{'\n'}
              - Enchufe con interruptor{'\n'}
              - Enchufe USB{'\n'}
              - Enchufe de cocina{'\n'}
              • Instalación de interruptores:{'\n'}
              - Interruptor simple{'\n'}
              - Interruptor doble{'\n'}
              - Interruptor de tres vías{'\n'}
              - Interruptor con indicador{'\n'}
              - Interruptor automático{'\n'}
              • Conexión de lámparas:{'\n'}
              - Lámpara de techo{'\n'}
              - Lámpara de pared{'\n'}
              - Lámpara de mesa{'\n'}
              - Lámpara de emergencia{'\n'}
              - Lámpara LED{'\n'}
              • Instalación de ventiladores:{'\n'}
              - Ventiladores de techo{'\n'}
              - Conexión de ventiladores{'\n'}
              - Control de velocidad{'\n'}
              - Mantenimiento{'\n'}
              • Conexión de electrodomésticos:{'\n'}
              - Conexión de electrodomésticos{'\n'}
              - Instalación de timbres{'\n'}
              - Instalación de alarmas{'\n'}
              - Seguridad en conexiones
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: لوحات الكهرباء</Text>
            <Text style={styles.moduleContentAr}>
              • مكونات اللوحة:{'\n'}
              - المفتاح العام{'\n'}
              - القاطع التلقائي{'\n'}
              - القاطع التفاضلي{'\n'}
              - الصمامات{'\n'}
              - المرحل الحراري{'\n'}
              • تركيب اللوحة:{'\n'}
              - اختيار الموقع{'\n'}
              - توصيل الدخول{'\n'}
              - توزيع الدوائر{'\n'}
              - توصيل المخارج{'\n'}
              - الاختبارات{'\n'}
              • الحماية الكهربائية:{'\n'}
              - الحماية من الزيادة{'\n'}
              - الحماية من التسرب{'\n'}
              - الحماية من القصر{'\n'}
              - التأريض{'\n'}
              • صيانة اللوحة:{'\n'}
              - الفحص الدوري{'\n'}
              - التنظيف{'\n'}
              - التحقق من الوصلات{'\n'}
              - اختبار الحماية{'\n'}
              - التحديث عند الحاجة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: CUADROS ELÉCTRICOS</Text>
            <Text style={styles.moduleContent}>
              • Componentes del cuadro:{'\n'}
              - Interruptor general{'\n'}
              - Interruptor automático{'\n'}
              - Interruptor diferencial{'\n'}
              - Fusibles{'\n'}
              - Relé térmico{'\n'}
              • Instalación del cuadro:{'\n'}
              - Selección de ubicación{'\n'}
              - Conexión de entrada{'\n'}
              - Distribución de circuitos{'\n'}
              - Conexión de salidas{'\n'}
              - Pruebas{'\n'}
              • Protecciones eléctricas:{'\n'}
              - Protección contra sobrecargas{'\n'}
              - Protección contra fugas{'\n'}
              - Protección contra cortocircuitos{'\n'}
              - Puesta a tierra{'\n'}
              • Mantenimiento del cuadro:{'\n'}
              - Revisión periódica{'\n'}
              - Limpieza{'\n'}
              - Verificación de conexiones{'\n'}
              - Prueba de protecciones{'\n'}
              - Actualización cuando sea necesario
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: الإضاءة الكهربائية</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع المصابيح:{'\n'}
              - المصباح المتوهج{'\n'}
              - المصباح الفلوري{'\n'}
              - مصباح LED{'\n'}
              - المصباح الهالوجين{'\n'}
              - مصباح التفريغ{'\n'}
              • تركيب الإضاءة الداخلية:{'\n'}
              - إضاءة السقف{'\n'}
              - إضاءة الجدران{'\n'}
              - الإضاءة المحلية{'\n'}
              - الإضاءة التزيينية{'\n'}
              • تركيب الإضاءة الخارجية:{'\n'}
              - إضاءة الواجهات{'\n'}
              - إضاءة الحدائق{'\n'}
              - إضاءة الأمان{'\n'}
              - الحماية من الماء{'\n'}
              • أنظمة التحكم:{'\n'}
              - المفاتيح البسيطة{'\n'}
              - المنظمات (Dimmers){'\n'}
              - المستشعرات{'\n'}
              - التحكم عن بعد{'\n'}
              • إضاءة الطوارئ:{'\n'}
              - المصابيح المستقلة{'\n'}
              - النظام المركزي{'\n'}
              - وقت الاستقلالية{'\n'}
              - الصيانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: ILUMINACIÓN ELÉCTRICA</Text>
            <Text style={styles.moduleContent}>
              • Tipos de lámparas:{'\n'}
              - Incandescente{'\n'}
              - Fluorescente{'\n'}
              - LED{'\n'}
              - Halógena{'\n'}
              - Descarga{'\n'}
              • Instalación de iluminación interior:{'\n'}
              - Iluminación de techo{'\n'}
              - Iluminación de paredes{'\n'}
              - Iluminación local{'\n'}
              - Iluminación decorativa{'\n'}
              • Instalación de iluminación exterior:{'\n'}
              - Iluminación de fachadas{'\n'}
              - Iluminación de jardines{'\n'}
              - Iluminación de seguridad{'\n'}
              - Protección contra agua{'\n'}
              • Sistemas de control:{'\n'}
              - Interruptores simples{'\n'}
              - Reguladores (Dimmers){'\n'}
              - Sensores{'\n'}
              - Control remoto{'\n'}
              • Iluminación de emergencia:{'\n'}
              - Lámparas independientes{'\n'}
              - Sistema centralizado{'\n'}
              - Tiempo de autonomía{'\n'}
              - Mantenimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: التركيبات الخاصة</Text>
            <Text style={styles.moduleContentAr}>
              • تركيب مكيف الهواء:{'\n'}
              - اختيار الموقع{'\n'}
              - التوصيل الكهربائي{'\n'}
              - الحماية{'\n'}
              - الصيانة{'\n'}
              • تركيب التدفئة:{'\n'}
              - التدفئة الكهربائية{'\n'}
              - أنواع السخانات{'\n'}
              - التوصيل{'\n'}
              - السلامة{'\n'}
              • أنظمة الأمان:{'\n'}
              - أنظمة الإنذار{'\n'}
              - أنظمة المراقبة{'\n'}
              - التوصيل{'\n'}
              - الصيانة{'\n'}
              • تركيب الهوائيات:{'\n'}
              - هوائيات التلفاز{'\n'}
              - التوصيل{'\n'}
              - التوزيع{'\n'}
              - الصيانة{'\n'}
              • الأتمتة المنزلية:{'\n'}
              - الأنظمة الأساسية{'\n'}
              - التحكم الذكي{'\n'}
              - التطبيقات{'\n'}
              - التكامل
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: INSTALACIONES ESPECIALES</Text>
            <Text style={styles.moduleContent}>
              • Instalación de aire acondicionado:{'\n'}
              - Selección de ubicación{'\n'}
              - Conexión eléctrica{'\n'}
              - Protección{'\n'}
              - Mantenimiento{'\n'}
              • Instalación de calefacción:{'\n'}
              - Calefacción eléctrica{'\n'}
              - Tipos de calefactores{'\n'}
              - Conexión{'\n'}
              - Seguridad{'\n'}
              • Sistemas de seguridad:{'\n'}
              - Sistemas de alarma{'\n'}
              - Sistemas de vigilancia{'\n'}
              - Conexión{'\n'}
              - Mantenimiento{'\n'}
              • Instalación de antenas:{'\n'}
              - Antenas de TV{'\n'}
              - Conexión{'\n'}
              - Distribución{'\n'}
              - Mantenimiento{'\n'}
              • Domótica básica:{'\n'}
              - Sistemas básicos{'\n'}
              - Control inteligente{'\n'}
              - Aplicaciones{'\n'}
              - Integración
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السابعة: الصيانة والإصلاح</Text>
            <Text style={styles.moduleContentAr}>
              • تشخيص الأعطال:{'\n'}
              - انعدام الجهد{'\n'}
              - الدارة القصيرة{'\n'}
              - التسرب للأرض{'\n'}
              - ارتفاع الحرارة{'\n'}
              - الضوضاء الكهربائية{'\n'}
              • إصلاح القوابس:{'\n'}
              - تغيير القابس{'\n'}
              - إصلاح الوصلات{'\n'}
              - تنظيف نقاط التلامس{'\n'}
              - التحقق من العزل{'\n'}
              - الاختبار{'\n'}
              • إصلاح المفاتيح:{'\n'}
              - تغيير المفتاح{'\n'}
              - ضبط الآلية{'\n'}
              - تنظيف التلامس{'\n'}
              - التحقق من الوصلات{'\n'}
              - الاختبار{'\n'}
              • تغيير المصابيح:{'\n'}
              - اختيار المصباح المناسب{'\n'}
              - التثبيت{'\n'}
              - التوصيل{'\n'}
              - الاختبار{'\n'}
              • الصيانة الوقائية:{'\n'}
              - الفحص الدوري{'\n'}
              - التنظيف{'\n'}
              - استبدال المكونات{'\n'}
              - التوثيق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 7: MANTENIMIENTO Y REPARACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Diagnóstico de averías:{'\n'}
              - Falta de tensión{'\n'}
              - Cortocircuito{'\n'}
              - Fuga a tierra{'\n'}
              - Sobrecalentamiento{'\n'}
              - Ruidos eléctricos{'\n'}
              • Reparación de enchufes:{'\n'}
              - Cambio de enchufe{'\n'}
              - Reparación de conexiones{'\n'}
              - Limpieza de contactos{'\n'}
              - Verificación de aislamiento{'\n'}
              - Prueba{'\n'}
              • Reparación de interruptores:{'\n'}
              - Cambio de interruptor{'\n'}
              - Ajuste de mecanismo{'\n'}
              - Limpieza de contactos{'\n'}
              - Verificación de conexiones{'\n'}
              - Prueba{'\n'}
              • Cambio de lámparas:{'\n'}
              - Selección de lámpara adecuada{'\n'}
              - Instalación{'\n'}
              - Conexión{'\n'}
              - Prueba{'\n'}
              • Mantenimiento preventivo:{'\n'}
              - Revisión periódica{'\n'}
              - Limpieza{'\n'}
              - Reemplazo de componentes{'\n'}
              - Documentación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثامنة: السلامة الكهربائية</Text>
            <Text style={styles.moduleContentAr}>
              • قواعد السلامة:{'\n'}
              - قطع التيار قبل العمل{'\n'}
              - استخدام الأدوات المعزولة{'\n'}
              - التحقق من انعدام الجهد{'\n'}
              - العمل بيد واحدة{'\n'}
              - الحفاظ على النظام{'\n'}
              • معدات الحماية:{'\n'}
              - القفازات العازلة{'\n'}
              - النظارات الواقية{'\n'}
              - الأحذية العازلة{'\n'}
              - الملابس المناسبة{'\n'}
              - الخوذة{'\n'}
              • إجراءات العمل الآمن:{'\n'}
              - التخطيط{'\n'}
              - العزل{'\n'}
              - الإشارات{'\n'}
              - التحقق{'\n'}
              - التحرير{'\n'}
              • الإسعافات الأولية:{'\n'}
              - التعامل مع الصعق{'\n'}
              - التعامل مع الحروق{'\n'}
              - الاتصال بالطوارئ{'\n'}
              - الإنعاش القلبي الرئوي{'\n'}
              • منع الحرائق:{'\n'}
              - أسباب الحرائق الكهربائية{'\n'}
              - الوقاية{'\n'}
              - أجهزة الإطفاء{'\n'}
              - خطط الطوارئ
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 8: SEGURIDAD ELÉCTRICA</Text>
            <Text style={styles.moduleContent}>
              • Normas de seguridad:{'\n'}
              - Cortar corriente antes de trabajar{'\n'}
              - Usar herramientas aisladas{'\n'}
              - Verificar ausencia de tensión{'\n'}
              - Trabajar con una sola mano{'\n'}
              - Mantener orden{'\n'}
              • Equipos de protección:{'\n'}
              - Guantes aislantes{'\n'}
              - Gafas de seguridad{'\n'}
              - Calzado aislante{'\n'}
              - Ropa adecuada{'\n'}
              - Casco{'\n'}
              • Procedimientos de trabajo seguro:{'\n'}
              - Planificación{'\n'}
              - Aislamiento{'\n'}
              - Señalización{'\n'}
              - Verificación{'\n'}
              - Liberación{'\n'}
              • Primeros auxilios:{'\n'}
              - Tratamiento de electrocución{'\n'}
              - Tratamiento de quemaduras{'\n'}
              - Llamada a emergencias{'\n'}
              - RCP{'\n'}
              • Prevención de incendios:{'\n'}
              - Causas de incendios eléctricos{'\n'}
              - Prevención{'\n'}
              - Extintores{'\n'}
              - Planes de emergencia
            </Text>
          </View>
        </View>

        {/* MATERIALES ELÉCTRICOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🔌 المواد الكهربائية</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الكابلات</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كابل أحادي</Text>
              <Text style={styles.vocabEs}>Cable unipolar</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كابل ثنائي</Text>
              <Text style={styles.vocabEs}>Cable bipolar</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كابل ثلاثي</Text>
              <Text style={styles.vocabEs}>Cable tripolar</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كابل مرن</Text>
              <Text style={styles.vocabEs}>Cable flexible</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Cables</Text>
          </View>
        </View>

        {/* HERRAMIENTAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="construct" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🛠️ الأدوات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأدوات اليدوية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مفك براغي</Text>
              <Text style={styles.vocabEs}>Destornillador</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>كماشة</Text>
              <Text style={styles.vocabEs}>Alicates</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قاطع عزل</Text>
              <Text style={styles.vocabEs}>Pelacables</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>شريط عازل</Text>
              <Text style={styles.vocabEs}>Cinta aislante</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Herramientas Manuales</Text>
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
              <Text style={styles.vocabAr}>قفازات عازلة</Text>
              <Text style={styles.vocabEs}>Guantes aislantes</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نظارات أمان</Text>
              <Text style={styles.vocabEs}>Gafas de seguridad</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أحذية عازلة</Text>
              <Text style={styles.vocabEs}>Calzado aislante</Text>
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
              • كهربائي تركيبات{'\n'}
              • كهربائي صيانة{'\n'}
              • فني لوحات كهربائية{'\n'}
              • مركب أنظمة شمسية{'\n'}
              • فني أتمتة منزلية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Electricista de instalaciones{'\n'}
              • Electricista de mantenimiento{'\n'}
              • Técnico de cuadros eléctricos{'\n'}
              • Instalador de sistemas solares{'\n'}
              • Técnico de domótica
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
