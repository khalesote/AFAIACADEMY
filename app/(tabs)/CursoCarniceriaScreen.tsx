import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoCarniceriaScreen() {
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
            <Text style={styles.headerTitle}>Curso de Carnicería</Text>
            <Text style={styles.headerTitleAr}>دورة الجزارة</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
        <Text style={styles.textBlock}>{`
1. Técnicas profesionales de corte y despiece de carnes.
2. Conocimiento de diferentes tipos de carne y sus características.
3. Higiene y seguridad en el manejo de alimentos cárnicos.
4. Uso correcto de herramientas y equipos de carnicería.
5. Preparación de productos cárnicos elaborados.
6. Legislación y normativas del sector cárnico.
7. Gestión de inventarios y control de calidad.
8. Atención al cliente y servicio profesional.`}</Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 1: FUNDAMENTOS DE LA CARNICERÍA
- Historia y evolución de la profesión
- Tipos de carnes y sus características
- Anatomía animal básica
- Normativas sanitarias y de calidad

MÓDULO 2: HERRAMIENTAS Y EQUIPOS
- Cuchillos y utensilios de corte
- Equipos de refrigeración y conservación
- Máquinas de picado y embutido
- Mantenimiento y afilado de herramientas

MÓDULO 3: TÉCNICAS DE CORTE Y DESPIECE
- Cortes básicos de vacuno, porcino y ovino
- Técnicas de despiece profesional
- Fileteado y preparación de piezas
- Minimización de desperdicios

MÓDULO 4: HIGIENE Y SEGURIDAD
- Protocolos de higiene personal
- Limpieza y desinfección del local
- Prevención de contaminaciones cruzadas
- Manipulación segura de alimentos

MÓDULO 5: PRODUCTOS ELABORADOS
- Embutidos y salazones
- Preparación de hamburguesas y albóndigas
- Conservas y ahumados
- Productos gourmet y especializados

MÓDULO 6: GESTIÓN Y COMERCIALIZACIÓN
- Control de inventarios
- Precios y márgenes de beneficio
- Atención al cliente
- Marketing y venta de productos`}</Text>

        <Text style={styles.sectionTitle}>🛠️ Herramientas Principales:</Text>
        <Text style={styles.textBlock}>{`CUCHILLOS ESPECIALIZADOS:
- Cuchillo carnicero / سكين الجزار – Para cortes grandes
- Cuchillo de deshuesar / سكين إزالة العظم – Para separar carne del hueso
- Cuchillo jamonero / سكين الخنزير المقدد – Para cortes finos
- Cuchillo de filetear / سكين الشرائح – Para lonchas delgadas
- Piedra de afilar / حجر الشحذ – Para mantener el filo

EQUIPOS PROFESIONALES:
- Sierra de carne / منشار اللحم – Para huesos grandes
- Picadora eléctrica / ماكينة فرم كهربائية – Para elaborar productos
- Báscula digital / ميزان رقمي – Para pesaje preciso
- Cámara frigorífica / ثلاجة حفظ – Para conservación
- Embutidora / ماكينة حشو – Para embutidos`}</Text>

        <Text style={styles.sectionTitle}>🥩 Tipos de Carne:</Text>
        <Text style={styles.textBlock}>{`VACUNO:
- Solomillo / لوز الخاصرة – Corte premium, tierno
- Entrecot / قطعة الضلع – Jugosa y sabrosa
- Morcillo / الرقبة – Para guisos
- Falda / الحجاب الحجابي – Para rellenos

PORCINO:
- Lomo / الخاصرة – Corte magro
- Costillas / الأضلاع – Para barbacoa
- Jamón / الخنزير المقدد – Producto curado
- Panceta / الدهن – Para embutidos

OVINO/CAPRINO:
- Cordero lechal / حمل حلوب – Tierno y suave
- Ternasco / حمل رضيع – Muy tierno
- Carnero / كبش – Sabor intenso
- Cabrito / جدي – Sabor característico`}</Text>

        <Text style={styles.sectionTitle}>🔪 Técnicas de Corte:</Text>
        <Text style={styles.textBlock}>{`CORTE BÁSICO:
- Separación de cuartos / فصل الأرباع
- Deshuesado sistemático / إزالة العظام المنهجية
- Eliminación de nervios y grasa / إزالة الأعصاب والدهون
- Fileteado uniforme / تقطيع شرائح متساوية

TÉCNICAS AVANZADAS:
- Corte a la francesa / القطع الفرنسي – Para costillas
- Corte a la americana / القطع الأمريكي – Para chuletas
- Despiece japonés / التقطيع الياباني – Cortes finos
- Preparación de piezas especiales / تحضير قطع خاصة`}</Text>

        <Text style={styles.sectionTitle}>🧊 Conservación y Almacenamiento:</Text>
        <Text style={styles.textBlock}>{`TEMPERATURAS DE CONSERVACIÓN:
- Carne fresca: 0-4°C / اللحم الطازج: 0-4 درجة مئوية
- Carne congelada: -18°C / اللحم المجمد: -18 درجة مئوية
- Descongelación controlada / إذابة محكومة
- Caducidad y fechas de consumo / تواريخ الصلاحية

TÉCNICAS DE PRESERVACIÓN:
- Envasado al vacío / تغليف بالفراغ
- Atmósfera modificada / جو معدل
- Salazón y ahumado / تمليح وتدخين
- Refrigeración y congelación / تبريد وتجميد`}</Text>

        <Text style={styles.sectionTitle}>⚠️ Seguridad e Higiene:</Text>
        <Text style={styles.textBlock}>{`PROTOCOLOS DE HIGIENE:
- Lavado de manos frecuente / غسل اليدين المتكرر
- Uso de guantes y delantales / استخدام القفازات والمآزر
- Limpieza diaria del local / تنظيف المحل يومياً
- Desinfección de superficies / تعقيم الأسطح

PREVENCIÓN DE CONTAMINACIONES:
- Separación de carnes crudas / فصل اللحوم النيئة
- Evitar contacto cruzado / تجنب الاتصال المتقاطع
- Control de temperaturas / مراقبة درجات الحرارة
- Eliminación de residuos / التخلص من النفايات`}</Text>

        <Text style={styles.sectionTitle}>🏪 Gestión del Negocio:</Text>
        <Text style={styles.textBlock}>{`CONTROL DE INVENTARIOS:
- Rotación de productos (FIFO) / دوران المنتجات
- Pedidos a proveedores / طلبات من الموردين
- Control de pérdidas / مراقبة الخسائر
- Inventarios periódicos / جرد دوري

COMERCIALIZACIÓN:
- Precios competitivos / أسعار تنافسية
- Atención personalizada / خدمة شخصية
- Fidelización de clientes / ولاء العملاء
- Marketing local / تسويق محلي`}</Text>

        <Text style={styles.sectionTitle}>💼 Oportunidades Laborales:</Text>
        <Text style={styles.textBlock}>{`PUESTOS DE TRABAJO:
- Carnicero especializado / جزار متخصص
- Maestro carnicero / جزار رئيسي
- Dependiente de carnicería / موظف محل جزارة
- Supervisor de carnicería / مشرف محل جزارة
- Técnico en industria cárnica / فني في صناعة اللحوم

ESPECIALIZACIONES:
- Carnicería halal / جزارة حلال
- Productos gourmet / منتجات فاخرة
- Carnicería artesanal / جزارة حرفية
- Charcutería especializada / منتجات لحمية متخصصة

CERTIFICACIONES:
- Certificado de manipulador de alimentos / شهادة معالج أغذية
- Especialización en corte profesional / تخصص في التقطيع المهني
- Formación en seguridad alimentaria / تدريب في سلامة الأغذية
- Certificación en carnicería artesanal / شهادة في الجزارة الحرفية`}</Text>

        <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة الأولى: أساسيات الجزارة
- تاريخ وتطور المهنة
- أنواع اللحوم وخصائصها
- علم التشريح الحيواني الأساسي
- اللوائح الصحية وجودة المنتجات

الوحدة الثانية: الأدوات والمعدات
- السكاكين وأدوات التقطيع
- معدات التبريد والحفظ
- آلات الفرم والحشو
- صيانة وشحذ الأدوات

الوحدة الثالثة: تقنيات التقطيع والتقسيم
- القطع الأساسي للحم البقري والخنزير والغنم
- تقنيات التقسيم المهني
- تقطيع الشرائح وتحضير القطع
- تقليل الفاقد

الوحدة الرابعة: النظافة والسلامة
- بروتوكولات النظافة الشخصية
- تنظيف وتعقيم المحل
- الوقاية من التلوث المتقاطع
- التعامل الآمن مع الأغذية

الوحدة الخامسة: المنتجات المصنعة
- اللحوم المعلبة والمملحة
- تحضير الهامبرغر والكرات اللحمية
- المعلبات والمدخنة
- المنتجات الفاخرة والمتخصصة

الوحدة السادسة: الإدارة والتسويق
- مراقبة المخزون
- الأسعار وهوامش الربح
- خدمة العملاء
- التسويق وبيع المنتجات`}</Text>

        <Text style={styles.sectionTitleAr}>🥩 أنواع اللحوم:</Text>
        <Text style={styles.textBlockAr}>{`لحم البقر:
- لوز الخاصرة – قطعة فاخرة، طرية
- قطعة الضلع – عصيرية ولذيذة
- الرقبة – للطبخ
- الحجاب الحجابي – للحشو

لحم الخنزير:
- الخاصرة – قطعة خالية من الدهون
- الأضلاع – للشواء
- الخنزير المقدد – منتج مملح
- الدهن – للمعلبات

لحم الغنم/الماعز:
- حمل حلوب – طري ولطيف
- حمل رضيع – طري جداً
- كبش – طعم قوي
- جدي – طعم مميز`}</Text>

        <Text style={styles.sectionTitleAr}>🔪 تقنيات التقطيع:</Text>
        <Text style={styles.textBlockAr}>{`القطع الأساسي:
- فصل الأرباع
- إزالة العظام المنهجية
- إزالة الأعصاب والدهون
- تقطيع شرائح متساوية

التقنيات المتقدمة:
- القطع الفرنسي – للأضلاع
- القطع الأمريكي – للكستليت
- التقطيع الياباني – قطع ناعمة
- تحضير قطع خاصة`}</Text>

        <Text style={styles.sectionTitleAr}>🧊 الحفظ والتخزين:</Text>
        <Text style={styles.textBlockAr}>{`درجات حرارة الحفظ:
- اللحم الطازج: 0-4 درجة مئوية
- اللحم المجمد: -18 درجة مئوية
- إذابة محكومة
- تواريخ الصلاحية

تقنيات الحفظ:
- التغليف بالفراغ
- جو معدل
- التمليح والتدخين
- التبريد والتجميد`}</Text>

        <Text style={styles.sectionTitleAr}>⚠️ السلامة والنظافة:</Text>
        <Text style={styles.textBlockAr}>{`بروتوكولات النظافة:
- غسل اليدين المتكرر
- استخدام القفازات والمآزر
- تنظيف المحل يومياً
- تعقيم الأسطح

الوقاية من التلوث:
- فصل اللحوم النيئة
- تجنب الاتصال المتقاطع
- مراقبة درجات الحرارة
- التخلص من النفايات`}</Text>

        <Text style={styles.sectionTitleAr}>💼 فرص العمل:</Text>
        <Text style={styles.textBlockAr}>{`الوظائف:
- جزار متخصص
- جزار رئيسي
- موظف محل جزارة
- مشرف محل جزارة
- فني في صناعة اللحوم

التخصصات:
- جزارة حلال
- منتجات فاخرة
- جزارة حرفية
- منتجات لحمية متخصصة

الشهادات:
- شهادة معالج أغذية
- تخصص في التقطيع المهني
- تدريب في سلامة الأغذية
- شهادة في الجزارة الحرفية`}</Text>

        <Text style={styles.sectionTitle}>🔪 Cortes y Despieces Detallados:</Text>
        <Text style={styles.textBlock}>{`CORTE DE VACUNO:
- Solomillo / لوز الخاصرة – Corte premium, sin hueso ni grasa
- Entrecot / قطعة الضلع – Con hueso, marmoleado perfecto
- Morcillo / الرقبة – Para guisos, con hueso
- Falda / الحجاب الحجابي – Para rellenos, fibra larga
- Costillas / الأضلاع – Para parrilla, con hueso
- Babilla / الفخذ – Para asados, magra
- Aguja / الكتف – Para estofados, con tendones

CORTE DE PORCINO:
- Lomo / الخاصرة – Corte magro, tierno
- Costillas / الأضلاع – Para barbacoa, con hueso
- Panceta / الدهن – Para embutidos, entreverada
- Jamón / الخنزير المقدد – Para curar, pieza entera
- Paletilla / الكتف – Para asados, con hueso
- Secreto / السري – Corte premium, marmoleado
- Carrilleras / الخدود – Para guisos, gelatinosas

CORTE DE CORDERO:
- Paletilla / الكتف – Tierna, para asados
- Costillas / الأضلاع – Para parrilla, pequeñas
- Pierna / الفخذ – Para asados o guisos
- Chuletillas / الضلع الصغير – Premium, con hueso
- Falda / الحجاب – Para rellenos
- Hígado / الكبد – Para frituras rápidas

TÉCNICAS DE DESPIECE:
- Separación de cuartos / فصل الأرباع – Delanteros y traseros
- Deshuesado sistemático / إزالة العظام المنهجية – Músculos limpios
- Eliminación de nervios / إزالة الأعصاب – Carne tierna
- Corte de grasa / قطع الدهون – Según requerimientos
- Fileteado preciso / تقطيع شرائح دقيق – Grosor uniforme`}</Text>

        <Text style={styles.sectionTitle}>👨‍🍳 Procesos de Preparación:</Text>
        <Text style={styles.textBlock}>{`MADURACIÓN DE LA CARNE:
- Carne fresca / اللحم الطازج – Reposo 24-48 horas en nevera
- Envejecimiento húmedo / النضج الرطب – Envasado al vacío
- Envejecimiento seco / النضج الجاف – Exposición controlada al aire
- Maduración enzimática / النضج الإنزيمي – Desarrollo de sabor

LIMPIEZA Y PREPARACIÓN:
- Retirada de pieles y plumas / إزالة الجلود والريش
- Eliminación de vísceras / إزالة الأحشاء
- Corte de extremidades / قطع الأطراف
- Desangrado completo / النزف الكامل
- Lavado y secado / غسل وتجفيف

DESPIECE PROFESIONAL:
- Identificación de músculos / تحديد العضلات
- Corte siguiendo fibras / قطع باتباع الألياف
- Separación de piezas / فصل القطع
- Etiquetado y pesado / وضع البطاقات والوزن
- Almacenamiento inmediato / التخزين الفوري`}</Text>

        <Text style={styles.sectionTitle}>🥩 Productos Cárnicos Elaborados:</Text>
        <Text style={styles.textBlock}>{`EMBUTIDOS FRESCOS:
- Chorizo criollo / شوريزو كريولو – Picante, ahumado
- Salchichas parrilleras / سجق شواء – Para asar
- Morcillas dulces / مركلة حلوة – Con sangre y arroz
- Longaniza pampeana / لونغانيزا بامبيانا – Ahumada
- Salame milán / سلامي ميلان – Seco, curado

EMBUTIDOS CURADOS:
- Jamón serrano / خنزير مقدد سرانو – 12-18 meses
- Jamón ibérico / خنزير إيبيري – Bellota, premium
- Cecina de León / سيسينا ليون – Vacuno curado
- Chorizo riojano / شوريزو ريوجانو – Picante, curado
- Fuet catalán / فوت كاتالوني – Delgado, curado

PRODUCTOS ENLATADOS:
- Carne mechada / لحم مفروم – Para guisos
- Paté de hígado / باتيه كبد – Cremoso
- Carne en conserva / لحم معلب – Estéril
- Caldo concentrado / مرق مركز – Base para salsas

ESPECIALIDADES REGIONALES:
- Asado argentino / أسادو أرجنتيني – Costillas y vacío
- Churrasco uruguayo / تشوراسكو أوروجواي – Corte delgado
- Picanha brasileña / بيكانيا برازيلية – Punta del lomo
- T-bone americano / تي بون أمريكي – Con hueso en T`}</Text>

        <Text style={styles.sectionTitle}>📊 Gestión Económica del Negocio:</Text>
        <Text style={styles.textBlock}>{`CÁLCULO DE COSTES:
- Coste por kilo de carne / تكلفة كل كيلو لحم – Compra mayorista
- Gastos de personal / مصاريف الشخصي – Salarios y cargas sociales
- Costes de local / تكاليف المحل – Alquiler, servicios
- Gastos de conservación / مصاريف الحفظ – Refrigeración, energía
- Costes de transporte / تكاليف النقل – Distribución

MARGENES DE BENEFICIO:
- Carne fresca / اللحم الطازج – 20-30% margen
- Productos elaborados / المنتجات المصنعة – 40-60% margen
- Especialidades / التخصصات – 50-80% margen
- Cortes premium / القطع الفاخرة – 30-50% margen

CONTROL DE INVENTARIOS:
- Sistema FIFO / نظام أول دخول أول خروج – Rotación de productos
- Control de caducidades / مراقبة تواريخ الصلاحية – Alertas automáticas
- Inventario semanal / جرد أسبوعي – Verificación física
- Pedidos automáticos / طلبات تلقائية – Según consumo
- Reducción de mermas / تقليل الفاقد – Optimización de cortes`}</Text>

        <Text style={styles.sectionTitleAr}>🔪 القطع والتقسيم المفصل:</Text>
        <Text style={styles.textBlockAr}>{`قطع اللحم البقري:
- لوز الخاصرة – قطعة فاخرة، بدون عظم أو دهون
- قطعة الضلع – مع عظم، رخامي مثالي
- الرقبة – للطبخ، مع عظم
- الحجاب الحجابي – للحشو، ألياف طويلة
- الأضلاع – للشواء، مع عظم
- الفخذ – للأسادو، خالي من الدهون
- الكتف – للطبخ بالبطيء، مع أوتار

قطع اللحم الخنزير:
- الخاصرة – قطعة خالية من الدهون، طرية
- الأضلاع – للشواء، مع عظم
- الدهن – للمعلبات، متخلل
- الخنزير المقدد – للتمليح، قطعة كاملة
- الكتف – للأسادو، مع عظم
- السري – قطعة فاخرة، رخامي
- الخدود – للطبخ بالبطيء، جلاتيني

قطع اللحم الغنمي:
- الكتف – طري، للأسادو
- الأضلاع – للشواء، صغيرة
- الفخذ – للأسادو أو الطبخ بالبطيء
- الضلع الصغير – فاخر، مع عظم
- الحجاب – للحشو
- الكبد – للقلي السريع

تقنيات التقسيم:
- فصل الأرباع – أمامية وخلفية
- إزالة العظام المنهجية – عضلات نظيفة
- إزالة الأعصاب – لحم طري
- قطع الدهون – حسب المتطلبات
- تقطيع شرائح دقيق – سمك متساوي`}</Text>

        <Text style={styles.sectionTitleAr}>👨‍🍳 عمليات التحضير:</Text>
        <Text style={styles.textBlockAr}>{`نضج اللحم:
- اللحم الطازج – راحة 24-48 ساعة في الثلاجة
- النضج الرطب – مغلف بالفراغ
- النضج الجاف – تعرض منضبط للهواء
- النضج الإنزيمي – تطوير الطعم

التنظيف والتحضير:
- إزالة الجلود والريش
- إزالة الأحشاء
- قطع الأطراف
- النزف الكامل
- الغسل والتجفيف

التقسيم المهني:
- تحديد العضلات
- القطع باتباع الألياف
- فصل القطع
- وضع البطاقات والوزن
- التخزين الفوري`}</Text>

        <Text style={styles.sectionTitleAr}>💰 الإدارة الاقتصادية للأعمال:</Text>
        <Text style={styles.textBlockAr}>{`حساب التكاليف:
- تكلفة كل كيلو لحم – شراء بالجملة
- مصاريف الشخصي – رواتب وأعباء اجتماعية
- تكاليف المحل – إيجار، خدمات
- مصاريف الحفظ – تبريد، طاقة
- تكاليف النقل – توزيع

هوامش الربح:
- اللحم الطازج – 20-30% هامش
- المنتجات المصنعة – 40-60% هامش
- التخصصات – 50-80% هامش
- القطع الفاخرة – 30-50% هامش

مراقبة المخزون:
- نظام أول دخول أول خروج – دوران المنتجات
- مراقبة تواريخ الصلاحية – تنبيهات تلقائية
- جرد أسبوعي – فحص مادي
- طلبات تلقائية – حسب الاستهلاك
- تقليل الفاقد – تحسين القطع`}</Text>
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
