import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoCocinaScreen() {
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
            <Text style={styles.headerTitleAr}>مساعد مطبخ</Text>
            <Text style={styles.headerTitle}>Ayudante de Cocina</Text>
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
            1. التقنيات الأساسية في المطبخ{'\n'}
            2. تحضير المكونات{'\n'}
            3. استخدام أدوات المطبخ{'\n'}
            4. التنظيف والتنظيم{'\n'}
            5. السلامة في المطبخ
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas básicas de cocina{'\n'}
            2. Preparación de ingredientes{'\n'}
            3. Uso de utensilios de cocina{'\n'}
            4. Limpieza y organización{'\n'}
            5. Seguridad en la cocina
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • التقنيات الأساسية{'\n'}
            • تحضير الطعام{'\n'}
            • الأدوات والمعدات{'\n'}
            • التنظيف والنظافة{'\n'}
            • السلامة
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Técnicas básicas{'\n'}
            • Preparación de alimentos{'\n'}
            • Utensilios y equipos{'\n'}
            • Limpieza e higiene{'\n'}
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
            <Text style={styles.vocabAr}>مطبخ</Text>
            <Text style={styles.vocabEs}>Cocina</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سكين</Text>
            <Text style={styles.vocabEs}>Cuchillo</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مقلاة</Text>
            <Text style={styles.vocabEs}>Sartén</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مكون</Text>
            <Text style={styles.vocabEs}>Ingrediente</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>تنظيف</Text>
            <Text style={styles.vocabEs}>Limpieza</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات المطبخ</Text>
            <Text style={styles.moduleContentAr}>
              • تنظيم وتنظيف مساحة العمل:{'\n'}
              - ترتيب الأدوات والمعدات{'\n'}
              - تنظيف الأسطح قبل البدء{'\n'}
              - إعداد منطقة العمل{'\n'}
              - الحفاظ على النظام{'\n'}
              • الاستخدام الصحيح للأدوات الأساسية:{'\n'}
              - أنواع السكاكين واستخداماتها{'\n'}
              - أدوات القياس{'\n'}
              - الأواني والمقالي{'\n'}
              - العناية بالأدوات{'\n'}
              • تقنيات القطع والتقطيع:{'\n'}
              - القطع الأساسية (خيوط، مكعبات){'\n'}
              - تقنيات التقطيع الآمنة{'\n'}
              - استخدام لوح التقطيع{'\n'}
              - الحفاظ على حدة السكين{'\n'}
              • قياس المكونات:{'\n'}
              - استخدام الموازين{'\n'}
              - القياسات الحجمية{'\n'}
              - تحويل الوحدات{'\n'}
              - الدقة في القياس{'\n'}
              • السلامة والنظافة في المطبخ:{'\n'}
              - غسل اليدين{'\n'}
              - استخدام القفازات{'\n'}
              - منع التلوث المتبادل{'\n'}
              - إدارة النفايات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA COCINA</Text>
            <Text style={styles.moduleContent}>
              • Organización y limpieza del espacio de trabajo:{'\n'}
              - Ordenar herramientas y equipos{'\n'}
              - Limpiar superficies antes de empezar{'\n'}
              - Preparar el área de trabajo{'\n'}
              - Mantener el orden{'\n'}
              • Uso correcto de utensilios básicos:{'\n'}
              - Tipos de cuchillos y sus usos{'\n'}
              - Herramientas de medición{'\n'}
              - Ollas y sartenes{'\n'}
              - Cuidado de herramientas{'\n'}
              • Técnicas de corte y picado:{'\n'}
              - Cortes básicos (juliana, brunoise){'\n'}
              - Técnicas de corte seguras{'\n'}
              - Uso de tabla de corte{'\n'}
              - Mantener el filo del cuchillo{'\n'}
              • Medición de ingredientes:{'\n'}
              - Uso de básculas{'\n'}
              - Medidas volumétricas{'\n'}
              - Conversión de unidades{'\n'}
              - Precisión en la medición{'\n'}
              • Seguridad e higiene en la cocina:{'\n'}
              - Lavado de manos{'\n'}
              - Uso de guantes{'\n'}
              - Prevención de contaminación cruzada{'\n'}
- Gestión de residuos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: تقنيات القطع والتحضير</Text>
            <Text style={styles.moduleContentAr}>
              • القطع الأساسية:{'\n'}
              - قطع خيوط (Juliana){'\n'}
              - قطع مكعبات صغيرة (Brunoise){'\n'}
              - قطع خضار (Mirepoix){'\n'}
              - قطع شرائح (Chiffonade){'\n'}
              - قطع مربعات (Paysanne){'\n'}
              • تقنيات التقطيع والبشر:{'\n'}
              - فرم ناعم للثوم والأعشاب{'\n'}
              - فرم خشن للخضار{'\n'}
              - بشر الجبن والجزر{'\n'}
              - تقنيات التقطيع المتقدمة{'\n'}
              • تحضير الخضار والبقوليات:{'\n'}
              - تنظيف الخضار{'\n'}
              - تقشير الخضار{'\n'}
              - إزالة البذور{'\n'}
              - تحضير البقوليات{'\n'}
              • تنظيف وتحضير الأسماك:{'\n'}
              - تنظيف الأسماك{'\n'}
              - إزالة القشور{'\n'}
              - نزع الأحشاء{'\n'}
              - تقطيع الأسماك{'\n'}
              • نزع العظام وتقطيع اللحوم:{'\n'}
              - تقنيات نزع العظام{'\n'}
              - تقطيع اللحوم{'\n'}
              - إزالة الدهون{'\n'}
              - تحضير اللحوم للطهي
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: TÉCNICAS DE CORTE Y PREPARACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Cortes básicos:{'\n'}
              - Juliana (tiras finas){'\n'}
              - Brunoise (cubos pequeños){'\n'}
              - Mirepoix (verduras en dados){'\n'}
              - Chiffonade (hojas en tiras){'\n'}
              - Paysanne (cubos de 1cm){'\n'}
              • Técnicas de picado y rallado:{'\n'}
              - Picado fino para ajo y hierbas{'\n'}
              - Picado grueso para verduras{'\n'}
              - Rallado de queso y zanahoria{'\n'}
              - Técnicas de corte avanzadas{'\n'}
              • Preparación de verduras y hortalizas:{'\n'}
              - Limpieza de verduras{'\n'}
              - Pelado de verduras{'\n'}
              - Eliminación de semillas{'\n'}
              - Preparación de legumbres{'\n'}
              • Limpieza y preparación de pescados:{'\n'}
              - Limpieza de pescados{'\n'}
              - Eliminación de escamas{'\n'}
              - Evisceración{'\n'}
              - Fileteado de pescados{'\n'}
              • Deshuesado y fileteado de carnes:{'\n'}
              - Técnicas de deshuesado{'\n'}
              - Fileteado de carnes{'\n'}
              - Eliminación de grasa{'\n'}
              - Preparación de carnes para cocción
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: تقنيات الطهي الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • الطهي في الماء:{'\n'}
              - الغلي (Hervido){'\n'}
              - السلق (Escaldado){'\n'}
              - التبييض (Blanqueado){'\n'}
              - الطهي بالبخار{'\n'}
              - الكونفي (Confitado){'\n'}
              • الطهي في الدهون:{'\n'}
              - القلي (Fritura){'\n'}
              - القلي السريع (Salteado){'\n'}
              - السوتيه (Sofrito){'\n'}
              - التحمير (Rehogado){'\n'}
              - إعطاء اللون (Dorado){'\n'}
              • الطهي الجاف:{'\n'}
              - الشوي (Asado){'\n'}
              - الشوي على الصفيحة (Plancha){'\n'}
              - الغراتين (Gratinado){'\n'}
              - التدخين (Ahumado){'\n'}
              - التجفيف (Deshidratado){'\n'}
              • الطهي المختلط:{'\n'}
              - اليخنة (Guisado){'\n'}
              - الطاجن (Estofado){'\n'}
              - البراسادو (Brasado){'\n'}
              - التحضير البطيء{'\n'}
              • الطهي بالبخار والورق:{'\n'}
              - تقنيات البخار{'\n'}
              - البابيلوت (Papillote){'\n'}
              - الحفاظ على النكهات{'\n'}
              - التحكم في الحرارة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: TÉCNICAS DE COCCIÓN BÁSICAS</Text>
            <Text style={styles.moduleContent}>
              • Cocción en agua:{'\n'}
              - Hervido{'\n'}
              - Escaldado{'\n'}
              - Blanqueado{'\n'}
              - Al vapor{'\n'}
              - Confitado{'\n'}
              • Cocción en grasa:{'\n'}
              - Fritura{'\n'}
              - Salteado{'\n'}
              - Sofrito{'\n'}
              - Rehogado{'\n'}
              - Dorado{'\n'}
              • Cocción en seco:{'\n'}
              - Asado{'\n'}
              - Plancha{'\n'}
              - Gratinado{'\n'}
              - Ahumado{'\n'}
              - Deshidratado{'\n'}
              • Cocción mixta:{'\n'}
              - Guisado{'\n'}
              - Estofado{'\n'}
              - Brasado{'\n'}
              - Cocción lenta{'\n'}
              • Cocción al vapor y papillote:{'\n'}
              - Técnicas de vapor{'\n'}
              - Papillote{'\n'}
              - Preservación de sabores{'\n'}
              - Control de temperatura
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: تحضير الصلصات والأسس</Text>
            <Text style={styles.moduleContentAr}>
              • الأسس الأساسية:{'\n'}
              - الأساس الأبيض (Fondo blanco){'\n'}
              - الأساس البني (Fondo marrón){'\n'}
              - أساس السمك (Fondo de pescado){'\n'}
              - أساس الخضار{'\n'}
              - تقنيات التحضير{'\n'}
              • الصلصات الأم:{'\n'}
              - البشاميل (Bechamel){'\n'}
              - الفيلوتيه (Velouté){'\n'}
              - الإسبانيول (Española){'\n'}
              - الهولانديز (Hollandaise){'\n'}
              - الطماطم (Tomate){'\n'}
              • الصلصات المشتقة والمستحلبات:{'\n'}
              - الصلصات المشتقة من الأم{'\n'}
              - المستحلبات (Emulsiones){'\n'}
              - المايونيز{'\n'}
              - الصلصات المركبة{'\n'}
              • المرق والشوربات:{'\n'}
              - تحضير المرق{'\n'}
              - أنواع الشوربات{'\n'}
              - تقنيات التصفية{'\n'}
              - إزالة الدهون{'\n'}
              • التكثيف والجلاسيه:{'\n'}
              - تقنيات التكثيف{'\n'}
              - الجلاسيه (Glacé){'\n'}
              - الريديوكسيون (Reducción){'\n'}
              - التحكم في القوام
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: PREPARACIÓN DE SALSAS Y FONDOS</Text>
            <Text style={styles.moduleContent}>
              • Fondos básicos:{'\n'}
              - Fondo blanco{'\n'}
              - Fondo marrón{'\n'}
              - Fondo de pescado{'\n'}
              - Fondo de verduras{'\n'}
              - Técnicas de preparación{'\n'}
              • Salsas madre:{'\n'}
              - Bechamel{'\n'}
              - Velouté{'\n'}
              - Española{'\n'}
              - Hollandaise{'\n'}
              - Tomate{'\n'}
              • Salsas derivadas y emulsiones:{'\n'}
              - Salsas derivadas de las madres{'\n'}
              - Emulsiones{'\n'}
              - Mayonesa{'\n'}
              - Salsas compuestas{'\n'}
              • Caldos y consomés:{'\n'}
              - Preparación de caldos{'\n'}
              - Tipos de sopas{'\n'}
              - Técnicas de clarificación{'\n'}
              - Desgrasado{'\n'}
              • Reducciones y glasés:{'\n'}
              - Técnicas de reducción{'\n'}
              - Glacé{'\n'}
              - Reducción{'\n'}
              - Control de consistencia
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: تحضير الأطباق الرئيسية</Text>
            <Text style={styles.moduleContentAr}>
              • أطباق اللحوم:{'\n'}
              - لحم العجل (Ternera){'\n'}
              - لحم الخنزير (Cerdo){'\n'}
              - لحم الغنم (Cordero){'\n'}
              - الدجاج (Pollo){'\n'}
              - الديك الرومي (Pavo){'\n'}
              • أطباق السمك والمأكولات البحرية:{'\n'}
              - السمك الأبيض{'\n'}
              - السمك الأزرق{'\n'}
              - المحار{'\n'}
              - القشريات{'\n'}
              - الرخويات{'\n'}
              • الأطباق النباتية:{'\n'}
              - البقوليات{'\n'}
              - الحبوب{'\n'}
              - الخضار{'\n'}
              - الفطر{'\n'}
              - البروتينات النباتية{'\n'}
              • المعكرونة والأرز:{'\n'}
              - تحضير المعكرونة{'\n'}
              - أنواع الأرز{'\n'}
              - تقنيات الطهي{'\n'}
              - الصلصات المناسبة{'\n'}
              • المقبلات والمرافقات:{'\n'}
              - أنواع المقبلات{'\n'}
              - تحضير المرافقات{'\n'}
              - التوازن الغذائي{'\n'}
              - التقديم
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: PREPARACIÓN DE PLATOS PRINCIPALES</Text>
            <Text style={styles.moduleContent}>
              • Platos de carne:{'\n'}
              - Ternera{'\n'}
              - Cerdo{'\n'}
              - Cordero{'\n'}
              - Pollo{'\n'}
              - Pavo{'\n'}
              • Platos de pescado y marisco:{'\n'}
              - Pescado blanco{'\n'}
              - Pescado azul{'\n'}
              - Mariscos{'\n'}
              - Crustáceos{'\n'}
              - Moluscos{'\n'}
              • Platos vegetarianos:{'\n'}
              - Legumbres{'\n'}
              - Cereales{'\n'}
              - Verduras{'\n'}
              - Setas{'\n'}
              - Proteínas vegetales{'\n'}
              • Pasta y arroces:{'\n'}
              - Preparación de pasta{'\n'}
              - Tipos de arroz{'\n'}
              - Técnicas de cocción{'\n'}
              - Salsas adecuadas{'\n'}
              • Guarniciones y acompañamientos:{'\n'}
              - Tipos de guarniciones{'\n'}
              - Preparación de acompañamientos{'\n'}
              - Equilibrio nutricional{'\n'}
              - Presentación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: الحلويات الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • العجائن الأساسية:{'\n'}
              - الكيك الإسفنجي (Bizcocho){'\n'}
              - العجين الفطير (Hojaldre){'\n'}
              - البريوش (Brioche){'\n'}
              - عجين الكسر (Pasta quebrada){'\n'}
              - عجين الشو (Pasta choux){'\n'}
              • الكريمات والحشوات:{'\n'}
              - كريمة الباتيسيري{'\n'}
              - كريمة الزبدة{'\n'}
              - الغاناش{'\n'}
              - المربى{'\n'}
              - الكراميل{'\n'}
              • التزيين الأساسي:{'\n'}
              - تقنيات التزيين{'\n'}
              - استخدام الفواكه{'\n'}
              - الشوكولاتة{'\n'}
              - الكريمة المخفوقة{'\n'}
              • الحلويات التقليدية:{'\n'}
              - الحلويات الإسبانية{'\n'}
              - الحلويات العربية{'\n'}
              - الحلويات الفرنسية{'\n'}
              - الحلويات الإيطالية{'\n'}
              • الخبز الأساسي:{'\n'}
              - أنواع الخبز{'\n'}
              - تقنيات الخبز{'\n'}
              - العجين المخمر{'\n'}
              - الخبز السريع
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: REPOSTERÍA BÁSICA</Text>
            <Text style={styles.moduleContent}>
              • Masas básicas:{'\n'}
              - Bizcocho{'\n'}
              - Hojaldre{'\n'}
              - Brioche{'\n'}
              - Pasta quebrada{'\n'}
              - Pasta choux{'\n'}
              • Cremas y rellenos:{'\n'}
              - Crema pastelera{'\n'}
              - Crema de mantequilla{'\n'}
              - Ganache{'\n'}
              - Mermelada{'\n'}
              - Caramelo{'\n'}
              • Decoración básica:{'\n'}
              - Técnicas de decoración{'\n'}
              - Uso de frutas{'\n'}
              - Chocolate{'\n'}
              - Nata montada{'\n'}
              • Postres tradicionales:{'\n'}
              - Postres españoles{'\n'}
              - Postres árabes{'\n'}
              - Postres franceses{'\n'}
              - Postres italianos{'\n'}
              • Panadería básica:{'\n'}
              - Tipos de pan{'\n'}
              - Técnicas de panadería{'\n'}
              - Masa fermentada{'\n'}
              - Pan rápido
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السابعة: التقديم والخدمة</Text>
            <Text style={styles.moduleContentAr}>
              • تقنيات التقديم:{'\n'}
              - التكوين (Composición){'\n'}
              - الألوان (Color){'\n'}
              - الملمس (Textura){'\n'}
              - الارتفاع (Altura){'\n'}
              - المساحة (Espacio){'\n'}
              • تزيين الأطباق:{'\n'}
              - الأعشاب الطازجة{'\n'}
              - الخضار الصغير{'\n'}
              - الزهور الصالحة للأكل{'\n'}
              - الصلصات التزيينية{'\n'}
              - المساحيق والبذور{'\n'}
              • مراقبة درجات الحرارة:{'\n'}
              - الحفاظ على الحرارة{'\n'}
              - التبريد السريع{'\n'}
              - إعادة التسخين{'\n'}
              - استخدام موازين الحرارة{'\n'}
              • تنسيق الخدمة:{'\n'}
              - التنسيق مع النوادل{'\n'}
              - إدارة الوقت{'\n'}
              - الأولويات{'\n'}
              - التواصل{'\n'}
              • الاهتمام بالعميل:{'\n'}
              - فهم الطلبات{'\n'}
              - التكيف مع الاحتياجات{'\n'}
              - الجودة في كل طبق{'\n'}
              - الاحترافية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 7: PRESENTACIÓN Y SERVICIO</Text>
            <Text style={styles.moduleContent}>
              • Técnicas de emplatado:{'\n'}
              - Composición{'\n'}
              - Color{'\n'}
              - Textura{'\n'}
              - Altura{'\n'}
              - Espacio{'\n'}
              • Decoración de platos:{'\n'}
              - Hierbas frescas{'\n'}
              - Microvegetales{'\n'}
              - Flores comestibles{'\n'}
              - Salsas decorativas{'\n'}
              - Polvos y semillas{'\n'}
              • Control de temperaturas:{'\n'}
              - Mantenimiento de temperatura{'\n'}
              - Enfriamiento rápido{'\n'}
              - Recalentamiento{'\n'}
              - Uso de termómetros{'\n'}
              • Coordinación de servicio:{'\n'}
              - Coordinación con camareros{'\n'}
              - Gestión del tiempo{'\n'}
              - Prioridades{'\n'}
              - Comunicación{'\n'}
              • Atención al cliente:{'\n'}
              - Entender pedidos{'\n'}
              - Adaptarse a necesidades{'\n'}
              - Calidad en cada plato{'\n'}
              - Profesionalismo
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثامنة: إدارة المطبخ</Text>
            <Text style={styles.moduleContentAr}>
              • مراقبة المخزون:{'\n'}
              - تسجيل المدخلات{'\n'}
              - مراقبة المخرجات{'\n'}
              - المخزون الأدنى{'\n'}
              - دوران المنتجات (FIFO){'\n'}
              - العد الدوري{'\n'}
              • إدارة النفايات:{'\n'}
              - فصل النفايات{'\n'}
              - إعادة التدوير{'\n'}
              - تقليل الهدر{'\n'}
              - التخلص الآمن{'\n'}
              • تحسين التكاليف:{'\n'}
              - مراقبة المرماس{'\n'}
              - تحسين الحصص{'\n'}
              - تحليل التكاليف{'\n'}
              - التفاوض مع الموردين{'\n'}
              • العمل الجماعي:{'\n'}
              - التواصل الفعال{'\n'}
              - تنسيق المهام{'\n'}
              - حل النزاعات{'\n'}
              - بناء الفريق{'\n'}
              • لوائح سلامة الغذاء:{'\n'}
              - القوانين المعمول بها{'\n'}
              - معايير الجودة{'\n'}
              - الشهادات المطلوبة{'\n'}
              - التفتيش والامتثال
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 8: GESTIÓN DE COCINA</Text>
            <Text style={styles.moduleContent}>
              • Control de inventario:{'\n'}
              - Registro de entradas{'\n'}
              - Control de salidas{'\n'}
              - Stock mínimo{'\n'}
              - Rotación de productos (FIFO){'\n'}
              - Conteo periódico{'\n'}
              • Gestión de residuos:{'\n'}
              - Separación de residuos{'\n'}
              - Reciclaje{'\n'}
              - Reducción de desperdicios{'\n'}
              - Eliminación segura{'\n'}
              • Optimización de costos:{'\n'}
              - Control de mermas{'\n'}
              - Optimización de porciones{'\n'}
              - Análisis de costos{'\n'}
              - Negociación con proveedores{'\n'}
              • Trabajo en equipo:{'\n'}
              - Comunicación efectiva{'\n'}
              - Coordinación de tareas{'\n'}
              - Resolución de conflictos{'\n'}
              - Construcción de equipo{'\n'}
              • Normativas de seguridad alimentaria:{'\n'}
              - Leyes aplicables{'\n'}
              - Estándares de calidad{'\n'}
              - Certificaciones requeridas{'\n'}
              - Inspección y cumplimiento
            </Text>
          </View>
        </View>

        {/* TÉCNICAS DE CORTE */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cut" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🔪 تقنيات القطع</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>القطع الأساسية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قطع خيوط</Text>
              <Text style={styles.vocabEs}>Juliana</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قطع مكعبات صغيرة</Text>
              <Text style={styles.vocabEs}>Brunoise</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قطع خضار</Text>
              <Text style={styles.vocabEs}>Mirepoix</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قطع شرائح</Text>
              <Text style={styles.vocabEs}>Chiffonade</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قطع مربعات</Text>
              <Text style={styles.vocabEs}>Paysanne</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Cortes Básicos</Text>
          </View>
        </View>

        {/* UTENSILIOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="restaurant" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🥄 الأدوات والمعدات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأدوات الأساسية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>سكاكين</Text>
              <Text style={styles.vocabEs}>Cuchillos</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>ألواح تقطيع</Text>
              <Text style={styles.vocabEs}>Tablas de corte</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أواني ومقالي</Text>
              <Text style={styles.vocabEs}>Ollas y sartenes</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>خلاطات</Text>
              <Text style={styles.vocabEs}>Batidoras</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Utensilios Básicos</Text>
          </View>
        </View>

        {/* HIGIENE Y SEGURIDAD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🧼 النظافة والسلامة</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>النظافة الشخصية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>غسل اليدين</Text>
              <Text style={styles.vocabEs}>Lavado de manos</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>استخدام قفازات</Text>
              <Text style={styles.vocabEs}>Uso de guantes</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قبعة ومريول</Text>
              <Text style={styles.vocabEs}>Gorro y delantal</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أحذية مناسبة</Text>
              <Text style={styles.vocabEs}>Calzado adecuado</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Higiene Personal</Text>
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
              • مساعد مطبخ{'\n'}
              • طباخ{'\n'}
              • شيف قسم{'\n'}
              • شيف مساعد{'\n'}
              • شيف تنفيذي
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Ayudante de cocina{'\n'}
              • Cocinero{'\n'}
              • Chef de partida{'\n'}
              • Sous chef{'\n'}
              • Chef ejecutivo
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
