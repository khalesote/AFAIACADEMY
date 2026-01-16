import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoJardineriaScreen() {
  const router = useRouter();

  const openVideo = (url: string) => {
    Linking.openURL(url).catch(err => console.error("No se pudo abrir el enlace", err));
  };

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
            onPress={() => router.replace('/(tabs)/PreFormacionScreen')}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Jardinería y Paisajismo</Text>
            <Text style={styles.headerTitleAr}>الحدائق وتنسيقها</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 Certificado de Profesionalidad / شهادة الكفاءة المهنية</Text>
        <Text style={styles.textBlock}>
          Este curso está basado en el Certificado de Profesionalidad AGAO0108 de Actividades Auxiliares en Viveros, Jardines y Centros de Jardinería, según el catálogo del SEPE (Servicio Público de Empleo Estatal).
          {'\n\n'}
          <Text style={styles.arabicText}>
            يستند هذه الدورة إلى شهادة الكفاءة المهنية AGAO0108 للأنشطة المساعدة في المشاتل والحدائق ومراكز البستنة، وفقًا لكاتالوج SEPE (هيئة الخدمة العامة للتوظيف الحكومي).
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>
        
        <Text style={styles.moduleTitle}>MÓDULO 1: Operaciones básicas en viveros y centros de jardinería / الوحدة 1: العمليات الأساسية في المشاتل ومراكز البستنة</Text>
        <Text style={styles.textBlock}>
          • Infraestructuras de viveros y centros de jardinería / بنية تحتية للمشاتل ومراكز البستنة
          • Preparación del medio de cultivo / تحضير وسط الزراعة
          • Producción de plantas / إنتاج النباتات
          • Manejo de plantas en viveros / التعامل مع النباتات في المشاتل
          • Comercialización de plantas / تسويق النباتات
          • Normativa básica vigente / اللوائح الأساسية السارية
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 2: Instalación de jardines, parques y zonas verdes / الوحدة 2: تركيب الحدائق والمتنزهات والمناطق الخضراء</Text>
        <Text style={styles.textBlock}>
          • Preparación del terreno / تجهيز التربة
          • Trabajات de replanteo / أعمال إعادة التخطيط
          • Construcción de infraestructuras / إنشاء البنية التحتية
          • Utilización de plantas ornamentales / استخدام النباتات الزينة
          • Establecimiento de elementos vegetales / إنشاء العناصر النباتية
          • Implantación de céspedes / زراعة المروج
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 3: Mantenimiento de jardines / الوحدة 3: صيانة الحدائق</Text>
        <Text style={styles.textBlock}>
          • Mantenimiento de elementos vegetales / صيانة العناصر النباتية
          • Control fitosanitario / المكافحة الصحية النباتية
          • Mantenimiento de infraestructuras / صيانة البنية التحتية
          • Normativa de mantenimiento / لوائح الصيانة
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 4: Prácticas profesionales / الوحدة 4: الممارسات المهنية</Text>
        <Text style={styles.textBlock}>
          • Actividades en viveros / أنشطة في المشاتل
          • Mantenimiento de jardines / صيانة الحدائق
          • Integración laboral / الاندماج المهني
        </Text>

        <Text style={styles.sectionTitle}>🎥 Videos Educativos / مقاطع فيديو تعليمية</Text>
        <View style={styles.videoContainer}>
          <TouchableOpacity 
            style={styles.videoButton}
            onPress={() => openVideo('https://www.youtube.com/watch?v=ejemplo1')}
          >
            <Ionicons name="play-circle" size={24} color="#79A890" />
            <Text style={styles.videoButtonText}>Introducción a la Jardinería / مقدمة في البستنة</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.videoButton}
            onPress={() => openVideo('https://www.youtube.com/watch?v=ejemplo2')}
          >
            <Ionicons name="play-circle" size={24} color="#79A890" />
            <Text style={styles.videoButtonText}>Técnicas de Poda / تقنيات التقليم</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.videoButton}
            onPress={() => openVideo('https://www.youtube.com/watch?v=ejemplo3')}>
            <Ionicons name="play-circle" size={24} color="#79A890" />
            <Text style={styles.videoButtonText}>Diseño de Jardines / تصميم الحدائق</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>📝 Actividades Prácticas / الأنشطة العملية</Text>
        <Text style={styles.textBlock}>
          • Diseña un pequeño jardín en un espacio de 4x4 metros. / صمم حديقة صغيرة في مساحة 4×4 أمتار.
          • Realiza un calendario de mantenimiento mensual. / أعد جدولاً شهرياً للصيانة.
          • Prepara una presentación sobre una planta ornamental. / أعد عرضاً تقديمياً عن نبات زينة.
          • Crea un semillero y registra su crecimiento. / أنشئ مشتلاً وسجل نموه.
        </Text>

        <Text style={styles.sectionTitle}>📌 Vocabulario Técnico / المصطلحات الفنية</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Poda / تقليم</Text>
            <Text style={styles.vocabularyTranslation}>التقليم</Text>
            <Text style={styles.vocabularyDefinition}>Corte de ramas para mantener la salud y forma de las plantas. / قطع الفروع للحفاظ على صحة النباتات وشكلها.</Text>
          </View>
          
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Riego por goteo / ري بالتنقيط</Text>
            <Text style={styles.vocabularyTranslation}>الري بالتنقيط</Text>
            <Text style={styles.vocabularyDefinition}>Sistema de riego que suministra agua directamente a las raíces. / نظام ري يوفر الماء مباشرة إلى الجذور.</Text>
          </View>
          
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Plaga / آفة</Text>
            <Text style={styles.vocabularyTranslation}>آفة زراعية</Text>
            <Text style={styles.vocabularyDefinition}>Organismos que dañan las plantas cultivadas. / كائنات حية تضر النباتات المزروعة.</Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Abono / سماد</Text>
            <Text style={styles.vocabularyTranslation}>سماد</Text>
            <Text style={styles.vocabularyDefinition}>Sustancia que mejora la calidad del suelo para el crecimiento de las plantas. / مادة تحسن نوعية التربة لنمو النباتات.</Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Semillero / مشتل</Text>
            <Text style={styles.vocabularyTranslation}>مشتل</Text>
            <Text style={styles.vocabularyDefinition}>Lugar donde se siembran las semillas para su germinación. / المكان الذي تُزرع فيه البذور للإنبات.</Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Césped / عشب</Text>
            <Text style={styles.vocabularyTranslation}>حشيش</Text>
            <Text style={styles.vocabularyDefinition}>Superficie cubierta de hierba que se mantiene cortada al ras. / سطح مغطى بالعشب يتم قصه بانتظام.</Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Maceta / أصيص</Text>
            <Text style={styles.vocabularyTranslation}>أصيص</Text>
            <Text style={styles.vocabularyDefinition}>Recipiente para cultivar plantas ornamentales. / وعاء لزراعة النباتات الزينة.</Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Tijeras de podar / مقص تقليم</Text>
            <Text style={styles.vocabularyTranslation}>مقص تقليم</Text>
            <Text style={styles.vocabularyDefinition}>Herramienta para cortar ramas y hojas de plantas. / أداة لقطع الفروع والأوراق من النباتات.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🛠️ Herramientas y Productos de Jardinería / أدوات ومنتجات البستنة</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Tijeras de podar / مقص تقليم</Text>
            <Text style={styles.vocabularyDefinition}>
              Herramienta esencial para cortar ramas pequeñas y dar forma a las plantas. / أداة أساسية لقطع الفروع الصغيرة وتشكيل النباتات.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Pala de jardín / مجرفة الحديقة</Text>
            <Text style={styles.vocabularyDefinition}>
              Para cavar, mover tierra y trasplantar plantas. / للحفر ونقل التربة وزراعة النباتات.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Rastrillo / مِدَمَّاة</Text>
            <Text style={styles.vocabularyDefinition}>
              Para nivelar el suelo y recoger hojas secas. / لتسوية التربة وجمع الأوراق الجافة.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Manguera de riego / خرطوم الري</Text>
            <Text style={styles.vocabularyDefinition}>
              Para regar las plantas de manera eficiente. / لري النباتات بكفاءة.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Guantes de jardinería / قفازات البستنة</Text>
            <Text style={styles.vocabularyDefinition}>
              Protegen las manos durante el trabajo. / تحمي اليدين أثناء العمل.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Tijeras de césped / مقص العشب</Text>
            <Text style={styles.vocabularyDefinition}>
              Para recortar el césped en áreas pequeñas. / لتقليم العشب في المناطق الصغيرة.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Pulverizador / بخاخ</Text>
            <Text style={styles.vocabularyDefinition}>
              Para aplicar productos fitosanitarios. / لرش المنتجات الصحية النباتية.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Carretilla / عربة يدوية</Text>
            <Text style={styles.vocabularyDefinition}>
              Para transportar tierra, plantas o herramientas. / لنقل التربة أو النباتات أو الأدوات.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Sustrato para macetas / تربة الأصص</Text>
            <Text style={styles.vocabularyDefinition}>
              Tierra especial para el cultivo en macetas. / تربة خاصة للزراعة في الأصص.
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Fertilizante orgánico / سماد عضوي</Text>
            <Text style={styles.vocabularyDefinition}>
              Nutrientes naturales para las plantas. / مغذيات طبيعية للنباتات.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🌱 Técnicas de Cultivo Específicas / تقنيات الزراعة المحددة</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Propagación de plantas / تكاثر النباتات</Text>
            <Text style={styles.vocabularyDefinition}>
              • Semillas: selección, almacenamiento y siembra / البذور: الاختيار والتخزين والزراعة
              {'\n'}• Esquejes: preparación y enraizamiento / العقل: التحضير والتجذير
              {'\n'}• División de matas: separación de plantas perennes / تقسيم النباتات: فصل النباتات المعمرة
              {'\n'}• Injertos: técnicas de unión de plantas / التطعيم: تقنيات ربط النباتات
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Sistemas de riego / أنظمة الري</Text>
            <Text style={styles.vocabularyDefinition}>
              • Riego por goteo: eficiencia hídrica / الري بالتنقيط: كفاءة المياه
              {'\n'}• Riego por aspersión: para céspedes / الري بالرش: للمروج
              {'\n'}• Riego manual: control preciso / الري اليدوي: تحكم دقيق
              {'\n'}• Programadores automáticos: ahorro de tiempo / المبرمجات التلقائية: توفير الوقت
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Control de plagas y enfermedades / مكافحة الآفات والأمراض</Text>
            <Text style={styles.vocabularyDefinition}>
              • Identificación de plagas comunes / تحديد الآفات الشائعة
              {'\n'}• Tratamientos ecológicos: jabón potásico, aceite de neem / العلاجات البيئية: صابون البوتاس، زيت النيم
              {'\n'}• Control biológico: insectos beneficiosos / المكافحة البيولوجية: الحشرات المفيدة
              {'\n'}• Prevención: rotación de cultivos, plantas compañeras / الوقاية: تناوب المحاصيل، النباتات المرافقة
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🌳 Paisajismo y Diseño / تنسيق الحدائق والتصميم</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Principios de diseño / مبادئ التصميم</Text>
            <Text style={styles.vocabularyDefinition}>
              • Equilibrio: simétrico y asimétrico / التوازن: متماثل وغير متماثل
              {'\n'}• Color: paletas estacionales / اللون: لوحات موسمية
              {'\n'}• Textura: combinación de hojas / الملمس: مزيج الأوراق
              {'\n'}• Altura: niveles y estratificación / الارتفاع: المستويات والطبقات
              {'\n'}• Forma: geometría natural / الشكل: الهندسة الطبيعية
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Tipos de jardines / أنواع الحدائق</Text>
            <Text style={styles.vocabularyDefinition}>
              • Jardín mediterráneo: plantas resistentes a sequía / حديقة متوسطية: نباتات مقاومة للجفاف
              {'\n'}• Jardín inglés: estilo natural y romántico / حديقة إنجليزية: نمط طبيعي ورومانسي
              {'\n'}• Jardín japonés: minimalismo y armonía / حديقة يابانية: الحد الأدنى والانسجام
              {'\n'}• Jardín vertical: aprovechamiento de espacios / حديقة عمودية: استغلال المساحات
              {'\n'}• Jardín de rocalla: plantas alpinas / حديقة صخرية: نباتات جبلية
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Plantas ornamentales por estación / نباتات زينة موسمية</Text>
            <Text style={styles.vocabularyDefinition}>
              • Primavera: tulipanes, narcisos, jacintos / الربيع: التوليب، النرجس، الزنبق
              {'\n'}• Verano: petunias, geranios, begonias / الصيف: البتونيا، إبرة الراعي، البغونية
              {'\n'}• Otoño: crisantemos, ásteres, pensamientos / الخريف: الأقحوان، الأستر، زهور الثالوث
              {'\n'}• Invierno: ciclamen, brezo, hiedra / الشتاء: بخور مريم، الخلنج، اللبلاب
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🌿 Mantenimiento Especializado / الصيانة المتخصصة</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Técnicas de poda avanzadas / تقنيات التقليم المتقدمة</Text>
            <Text style={styles.vocabularyDefinition}>
              • Poda de formación: dar estructura a árboles jóvenes / تقليم التكوين: إعطاء هيكل للأشجار الصغيرة
              {'\n'}• Poda de mantenimiento: eliminar ramas muertas / تقليم الصيانة: إزالة الفروع الميتة
              {'\n'}• Poda de floración: estimular producción de flores / تقليم الإزهار: تحفيز إنتاج الزهور
              {'\n'}• Poda de rejuvenecimiento: renovar plantas viejas / تقليم التجديد: تجديد النباتات القديمة
              {'\n'}• Épocas de poda según especie / مواسم التقليم حسب النوع
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Cuidado del césped / رعاية العشب</Text>
            <Text style={styles.vocabularyDefinition}>
              • Siega: altura y frecuencia según tipo / القص: الارتفاع والتكرار حسب النوع
              {'\n'}• Escarificado: eliminar fieltro / التهوية: إزالة الحصير
              {'\n'}• Resiembra: renovar zonas dañadas / إعادة البذر: تجديد المناطق التالفة
              {'\n'}• Abonado: fertilización estacional / التسميد: التسميد الموسمي
              {'\n'}• Control de malas hierbas / مكافحة الأعشاب الضارة
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Gestión de suelos / إدارة التربة</Text>
            <Text style={styles.vocabularyDefinition}>
              • Análisis de pH: determinar acidez o alcalinidad / تحليل الأس الهيدروجيني: تحديد الحموضة أو القلوية
              {'\n'}• Mejora de drenaje: evitar encharcamientos / تحسين الصرف: تجنب التشبع بالماء
              {'\n'}• Enmiendas orgánicas: compost, estiércol / التعديلات العضوية: السماد، الروث
              {'\n'}• Mulching: cobertura protectora / التغطية: غطاء واقي
              {'\n'}• Rotación de cultivos en huertos / تناوب المحاصيل في الحدائق
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>💼 Oportunidades Laborales / فرص العمل</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Sectores de empleo / قطاعات التوظيف</Text>
            <Text style={styles.vocabularyDefinition}>
              • Viveros comerciales: producción y venta / المشاتل التجارية: الإنتاج والبيع
              {'\n'}• Empresas de jardinería: mantenimiento de espacios verdes / شركات البستنة: صيانة المساحات الخضراء
              {'\n'}• Ayuntamientos: parques y jardines públicos / البلديات: الحدائق والمتنزهات العامة
              {'\n'}• Hoteles y resorts: jardines ornamentales / الفنادق والمنتجعات: الحدائق الزينة
              {'\n'}• Autónomo: servicios de jardinería a domicilio / العمل الحر: خدمات البستنة المنزلية
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Competencias profesionales / الكفاءات المهنية</Text>
            <Text style={styles.vocabularyDefinition}>
              • Conocimiento de plantas autóctonas y exóticas / معرفة النباتات المحلية والغريبة
              {'\n'}• Manejo de maquinaria: cortacésped, motosierra / التعامل مع الآلات: جزازة العشب، المنشار
              {'\n'}• Lectura de planos de jardinería / قراءة مخططات البستنة
              {'\n'}• Presupuestos y facturación / الميزانيات والفواتير
              {'\n'}• Atención al cliente y comunicación / خدمة العملاء والتواصل
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>📋 Calendario de Trabajos Anuales / تقويم الأعمال السنوية</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Primavera (Marzo-Mayo) / الربيع (مارس-مايو)</Text>
            <Text style={styles.vocabularyDefinition}>
              • Siembra de plantas anuales / زراعة النباتات السنوية
              {'\n'}• Poda de rosales y arbustos / تقليم الورود والشجيرات
              {'\n'}• Abonado general / التسميد العام
              {'\n'}• Preparación del césped / تحضير العشب
              {'\n'}• Control temprano de plagas / المكافحة المبكرة للآفات
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Verano (Junio-Agosto) / الصيف (يونيو-أغسطس)</Text>
            <Text style={styles.vocabularyDefinition}>
              • Riego intensivo / الري المكثف
              {'\n'}• Siega frecuente del césped / القص المتكرر للعشب
              {'\n'}• Eliminación de flores marchitas / إزالة الزهور الذابلة
              {'\n'}• Control de malas hierbas / مكافحة الأعشاب الضارة
              {'\n'}• Protección contra el sol intenso / الحماية من الشمس الشديدة
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Otoño (Septiembre-Noviembre) / الخريف (سبتمبر-نوفمبر)</Text>
            <Text style={styles.vocabularyDefinition}>
              • Plantación de árboles y arbustos / زراعة الأشجار والشجيرات
              {'\n'}• Recolección de hojas / جمع الأوراق
              {'\n'}• Preparación para el invierno / التحضير للشتاء
              {'\n'}• Poda de árboles caducifolios / تقليم الأشجار المتساقطة
              {'\n'}• Resiembra del césped / إعادة بذر العشب
            </Text>
          </View>

          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Invierno (Diciembre-Febrero) / الشتاء (ديسمبر-فبراير)</Text>
            <Text style={styles.vocabularyDefinition}>
              • Poda de árboles frutales / تقليم أشجار الفاكهة
              {'\n'}• Protección de plantas sensibles / حماية النباتات الحساسة
              {'\n'}• Planificación del año siguiente / تخطيط السنة القادمة
              {'\n'}• Mantenimiento de herramientas / صيانة الأدوات
              {'\n'}• Estudio de catálogos de plantas / دراسة كتالوجات النباتات
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🎓 Certificación y Formación Continua / الشهادة والتدريب المستمر</Text>
        <View style={styles.vocabularyContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.vocabularyTerm}>Certificaciones disponibles / الشهادات المتاحة</Text>
            <Text style={styles.vocabularyDefinition}>
              • Certificado de Profesionalidad AGAO0108 / شهادة الكفاءة المهنية AGAO0108
              {'\n'}• Especialización en paisajismo / التخصص في تنسيق الحدائق
              {'\n'}• Manejo de productos fitosanitarios / التعامل مع المنتجات الصحية النباتية
              {'\n'}• Diseño de jardines sostenibles / تصميم الحدائق المستدامة
              {'\n'}• Xerojardinería: jardines de bajo consumo / الحدائق منخفضة الاستهلاك
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
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  headerTitleAr: {
    fontSize: 16,
    color: '#FFD700',
    textAlign: 'right',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#F1F8E9',
    padding: 10,
    borderRadius: 5,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
    paddingLeft: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  textBlock: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
    textAlign: 'justify',
  },
  videoContainer: {
    marginVertical: 10,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  videoButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  vocabularyContainer: {
    marginTop: 10,
  },
  vocabularyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  vocabularyTerm: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  vocabularyTranslation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginBottom: 8,
  },
  vocabularyDefinition: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  examButton: {
    backgroundColor: '#79A890',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
    elevation: 3,
  },
  examButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  arabicText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
