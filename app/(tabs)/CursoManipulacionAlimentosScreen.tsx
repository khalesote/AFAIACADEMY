import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoManipulacionAlimentosScreen() {
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
            <Text style={styles.headerTitle}>Manipulación de Alimentos</Text>
            <Text style={styles.headerTitleAr}>التعامل مع الأغذية</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás? / ما الذي ستتعلمه؟</Text>
        <Text style={styles.textBlock}>
          <Text>• Fundamentos de higiene alimentaria y su importancia en la salud pública</Text>
          <Text style={styles.arabicText}>أساسيات النظافة الغذائية وأهميتها في الصحة العامة</Text>
          
          <Text>\n• Identificación y prevención de peligros alimentarios (biológicos, químicos y físicos)</Text>
          <Text style={styles.arabicText}>تحديد ومنع مخاطر الأغذية (البيولوجية والكيميائية والفيزيائية)</Text>
          
          <Text>\n• Técnicas avanzadas de conservación y almacenamiento de alimentos</Text>
          <Text style={styles.arabicText}>تقنيات متقدمة في حفظ وتخزين الأغذية</Text>
          
          <Text>\n• Legislación alimentaria actual y normativas internacionales (APPCC, ISO 22000)</Text>
          <Text style={styles.arabicText}>التشريعات الغذائية الحالية والمعايير الدولية (نظام HACCP، الأيزو 22000)</Text>
          
          <Text>\n• Buenas prácticas de manipulación en cada etapa de la cadena alimentaria</Text>
          <Text style={styles.arabicText}>الممارسات الجيدة في التعامل مع الأغذية في كل مرحلة من سلسلة التوريد</Text>
          
          <Text>\n• Procedimientos de limpieza, desinfección y control de plagas</Text>
          <Text style={styles.arabicText}>إجراءات التنظيف والتطهير ومكافحة الآفات</Text>
          
          <Text>\n• Gestión de alérgenos e intolerancias alimentarias</Text>
          <Text style={styles.arabicText}>إدارة المواد المسببة للحساسية وعدم تحمل الأغذية</Text>
          
          <Text>\n• Técnicas de envasado y etiquetado correcto de alimentos</Text>
          <Text style={styles.arabicText}>تقنيات التغليف ووضع البطاقات التعريفية الصحيحة على الأغذية</Text>
        </Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>
        
        <Text style={styles.subsectionTitle}>MÓDULO 1: INTRODUCCIÓN A LA SEGURIDAD ALIMENTARIA / الوحدة 1: مقدمة في سلامة الأغذية</Text>
        <Text style={styles.textBlock}>
          <Text>• Conceptos fundamentales de seguridad alimentaria y su evolución histórica</Text>
          <Text style={styles.arabicText}>المفاهيم الأساسية لسلامة الأغذية وتطورها التاريخي</Text>
          
          <Text>\n• Importancia de la higiene en la manipulación: impacto en la salud pública y económica</Text>
          <Text style={styles.arabicText}>أهمية النظافة في التعامل مع الأغذية: التأثير على الصحة العامة والاقتصاد</Text>
          
          <Text>\n• Enfermedades transmitidas por alimentos (ETAs): causas, síntomas y prevención</Text>
          <Text style={styles.arabicText}>الأمراض المنقولة بالغذاء: الأسباب والأعراض والوقاية</Text>
          
          <Text>\n• Grupos de riesgo: niños, ancianos, embarazadas y personas inmunodeprimidas</Text>
          <Text style={styles.arabicText}>الفئات المعرضة للخطر: الأطفال، كبار السن، الحوامل وذوو المناعة الضعيفة</Text>
          
          <Text>\n• Cadena alimentaria: desde la producción hasta el consumo</Text>
          <Text style={styles.arabicText}>سلسلة التوريد الغذائي: من الإنتاج إلى الاستهلاك</Text>
          
          <Text>\n• Responsabilidades del manipulador de alimentos</Text>
          <Text style={styles.arabicText}>مسؤوليات العاملين في مجال الأغذية</Text>
          
          <Text>\n• Casos prácticos: análisis de brotes alimentarios</Text>
          <Text style={styles.arabicText}>دراسات حالة: تحليل حالات تفشي الأمراض المنقولة بالغذاء</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 2: PELIGROS ALIMENTARIOS / الوحدة 2: مخاطر الأغذية</Text>
        <Text style={styles.textBlock}>
          <Text>• Análisis detallado de peligros:</Text>
          <Text style={styles.arabicText}>تحليل مفصل للمخاطر:</Text>
          
          <Text>\n  - Biológicos: </Text>
          <Text style={styles.arabicText}>  - البيولوجية:</Text>
          
          <Text>\n    • Bacterias patógenas (Salmonella, E. coli, Listeria)</Text>
          <Text style={styles.arabicText}>    • البكتيريا الممرضة (السالمونيلا، الإشريكية القولونية، الليستيريا)</Text>
          
          <Text>\n    • Virus (Norovirus, Hepatitis A)</Text>
          <Text style={styles.arabicText}>    • الفيروسات (نوروفيروس، التهاب الكبد الوبائي أ)</Text>
          
          <Text>\n    • Parásitos (Toxoplasma, Trichinella)</Text>
          <Text style={styles.arabicText}>    • الطفيليات (التوكسوبلازما، الترايكينيلا)</Text>
          
          <Text>\n    • Hongos y micotoxinas</Text>
          <Text style={styles.arabicText}>    • الفطريات والسموم الفطرية</Text>
          
          <Text>\n  - Químicos: </Text>
          <Text style={styles.arabicText}>  - الكيميائية:</Text>
          
          <Text>\n    • Pesticidas y herbicidas</Text>
          <Text style={styles.arabicText}>    • المبيدات الحشرية والأعشاب</Text>
          
          <Text>\n    • Metales pesados (plomo, mercurio, cadmio)</Text>
          <Text style={styles.arabicText}>    • المعادن الثقيلة (الرصاص، الزئبق، الكادميوم)</Text>
          
          <Text>\n    • Aditivos alimentarios no autorizados</Text>
          <Text style={styles.arabicText}>    • الإضافات الغذائية غير المصرح بها</Text>
          
          <Text>\n    • Alérgenos no declarados</Text>
          <Text style={styles.arabicText}>    • مسببات الحساسية غير المعلنة</Text>
          
          <Text>\n  - Físicos: </Text>
          <Text style={styles.arabicText}>  - الفيزيائية:</Text>
          
          <Text>\n    • Cuerpos extraños (vidrio, metal, plástico)</Text>
          <Text style={styles.arabicText}>    • أجسام غريبة (زجاج، معدن، بلاستيك)</Text>
          
          <Text>\n    • Huesos y espinas</Text>
          <Text style={styles.arabicText}>    • العظام والأشواك</Text>
          
          <Text>\n    • Madera y piedras</Text>
          <Text style={styles.arabicText}>    • الخشب والحجارة</Text>
          
          <Text>\n• Factores que favorecen el crecimiento bacteriano (FACTORES INTRÍNSECOS Y EXTRÍNSECOS):</Text>
          <Text style={styles.arabicText}>العوامل التي تعزز نمو البكتيريا (عوامل داخلية وخارجية):</Text>
          
          <Text>\n  - Actividad de agua (aw)</Text>
          <Text style={styles.arabicText}>  - نشاط الماء (aw)</Text>
          
          <Text>\n  - Nivel de acidez (pH)</Text>
          <Text style={styles.arabicText}>  - مستوى الحموضة (الأس الهيدروجيني)</Text>
          
          <Text>\n  - Potencial de oxidación-reducción</Text>
          <Text style={styles.arabicText}>  - جهد الأكسدة والاختزال</Text>
          
          <Text>\n  - Temperatura y tiempo</Text>
          <Text style={styles.arabicText}>  - درجة الحرارة والوقت</Text>
          
          <Text>\n  - Presencia de nutrientes</Text>
          <Text style={styles.arabicText}>  - وجود العناصر الغذائية</Text>
          
          <Text>\n  - Presencia de microorganismos competidores</Text>
          <Text style={styles.arabicText}>  - وجود كائنات دقيقة منافسة</Text>
          
          <Text>\n• Toxiinfecciones alimentarias más comunes:</Text>
          <Text style={styles.arabicText}>أكثر التسممات الغذائية شيوعاً:</Text>
          
          <Text>\n  - Salmonelosis</Text>
          <Text style={styles.arabicText}>  - السالمونيلا</Text>
          
          <Text>\n  - Campylobacteriosis</Text>
          <Text style={styles.arabicText}>  - العطيفة</Text>
          
          <Text>\n  - Listeriosis</Text>
          <Text style={styles.arabicText}>  - الليستيريا</Text>
          
          <Text>\n  - Intoxicación por estafilococo</Text>
          <Text style={styles.arabicText}>  - التسمم بالمكورات العنقودية</Text>
          
          <Text>\n  - Botulismo</Text>
          <Text style={styles.arabicText}>  - التسمم الوشيقي</Text>
          
          <Text>\n• Prácticas de laboratorio: identificación de microorganismos</Text>
          <Text style={styles.arabicText}>الممارسات المخبرية: تحديد الكائنات الحية الدقيقة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 3: HIGIENE PERSONAL / الوحدة 3: النظافة الشخصية</Text>
        <Text style={styles.textBlock}>
          <Text>• Técnica correcta de lavado de manos (6 pasos de la OMS):</Text>
          <Text style={styles.arabicText}>تقنية غسل اليدين الصحيحة (6 خطوات من منظمة الصحة العالمية):</Text>
          
          <Text>\n  1. Mojar las manos con agua limpia</Text>
          <Text style={styles.arabicText}>  1. تبليل اليدين بالماء النظيف</Text>
          
          <Text>\n  2. Aplicar jabón suficiente</Text>
          <Text style={styles.arabicText}>  2. وضع كمية كافية من الصابون</Text>
          
          <Text>\n  3. Frotar palma con palma</Text>
          <Text style={styles.arabicText}>  3. دعك راحة اليد بالراحة</Text>
          
          <Text>\n  4. Frotar dorso y entre dedos</Text>
          <Text style={styles.arabicText}>  4. دعك ظهر اليد وبين الأصابع</Text>
          
          <Text>\n  5. Limpiar uñas y pulgares</Text>
          <Text style={styles.arabicText}>  5. تنظيف الأظافر والإبهام</Text>
          
          <Text>\n  6. Enjuagar y secar con toalla desechable</Text>
          <Text style={styles.arabicText}>  6. الشطف والتجفيف بمنشفة ورقية</Text>
          
          <Text>\n• Equipo de protección personal (EPP) obligatorio:</Text>
          <Text style={styles.arabicText}>معدات الحماية الشخصية الإلزامية:</Text>
          
          <Text>\n  - Gorro o redecilla para el cabello</Text>
          <Text style={styles.arabicText}>  - غطاء الرأس أو الشبكة</Text>
          
          <Text>\n  - Mascarilla y/o protector facial</Text>
          <Text style={styles.arabicText}>  - قناع و/أو واقي للوجه</Text>
          
          <Text>\n  - Delantal limpio de color claro</Text>
          <Text style={styles.arabicText}>  - مريلة نظيفة بلون فاتح</Text>
          
          <Text>\n  - Calzado cerrado antideslizante</Text>
          <Text style={styles.arabicText}>  - أحذية مغلقة مضادة للانزلاق</Text>
          
          <Text>\n  - Guantes de un solo uso (cuando sea necesario)</Text>
          <Text style={styles.arabicText}>  - قفازات لمرة واحدة (عند الحاجة)</Text>
          
          <Text>\n• Protocolos de higiene personal:</Text>
          <Text style={styles.arabicText}>بروتوكولات النظافة الشخصية:</Text>
          
          <Text>\n  - Ducha diaria obligatoria</Text>
          <Text style={styles.arabicText}>  - الاستحمام اليومي الإلزامي</Text>
          
          <Text>\n  - Uñas cortas, limpias y sin esmalte</Text>
          <Text style={styles.arabicText}>  - أظافر قصيرة ونظيفة وخالية من الطلاء</Text>
          
          <Text>\n  - No usar perfumes ni cosméticos fuertes</Text>
          <Text style={styles.arabicText}>  - عدم استخدام العطور أو مستحضرات التجميل القوية</Text>
          
          <Text>\n  - Prohibición de fumar, comer o beber en zonas de manipulación</Text>
          <Text style={styles.arabicText}>  - منع التدخين أو الأكل أو الشرب في مناطق التعامل مع الأغذية</Text>
          
          <Text>\n• Control médico del personal:</Text>
          <Text style={styles.arabicText}>الفحص الطبي للعاملين:</Text>
          
          <Text>\n  - Reconocimiento médico inicial</Text>
          <Text style={styles.arabicText}>  - فحص طبي أولي</Text>
          
          <Text>\n  - Revisiones periódicas (anuales o según normativa local)</Text>
          <Text style={styles.arabicText}>  - فحوصات دورية (سنوية أو حسب اللوائح المحلية)</Text>
          
          <Text>\n  - Carné de manipulador de alimentos actualizado</Text>
          <Text style={styles.arabicText}>  - بطاقة العاملين في مجال الأغذية محدثة</Text>
          
          <Text>\n  - Control de enfermedades transmisibles</Text>
          <Text style={styles.arabicText}>  - مراقبة الأمراض المعدية</Text>
          
          <Text>\n• Protocolo de exclusión por enfermedad:</Text>
          <Text style={styles.arabicText}>بروتوكول الاستبعاد بسبب المرض:</Text>
          
          <Text>\n  - Diarrea o vómitos</Text>
          <Text style={styles.arabicText}>  - الإسهال أو القيء</Text>
          
          <Text>\n  - Infecciones cutáneas o heridas infectadas</Text>
          <Text style={styles.arabicText}>  - التهابات جلدية أو جروح مصابة</Text>
          
          <Text>\n  - Enfermedades respiratorias agudas</Text>
          <Text style={styles.arabicText}>  - أمراض الجهاز التنفسي الحادة</Text>
          
          <Text>\n  - Portadores de patógenos intestinales</Text>
          <Text style={styles.arabicText}>  - حاملي مسببات الأمراض المعوية</Text>
          
          <Text>\n• Prácticas higiénicas en el lugar de trabajo:</Text>
          <Text style={styles.arabicText}>الممارسات الصحية في مكان العمل:</Text>
          
          <Text>\n  - No tocar alimentos listos para consumir con las manos</Text>
          <Text style={styles.arabicText}>  - عدم لمس الأطعمة الجاهزة للأكل باليدين</Text>
          
          <Text>\n  - Usar utensilios limpios para probar alimentos</Text>
          <Text style={styles.arabicText}>  - استخدام أدوات نظيفة لتذوق الطعام</Text>
          
          <Text>\n  - Cubrir heridas con apósitos impermeables</Text>
          <Text style={styles.arabicText}>  - تغطية الجروح بضمادات مقاومة للماء</Text>
          
          <Text>\n  - Mantener una distancia adecuada al toser o estornudar</Text>
          <Text style={styles.arabicText}>  - الحفاظ على مسافة مناسبة عند السعال أو العطس</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 4: LIMPIEZA Y DESINFECCIÓN / الوحدة 4: التنظيف والتطهير</Text>
        <Text style={styles.textBlock}>
          <Text>• Conceptos fundamentales:</Text>
          <Text style={styles.arabicText}>المفاهيم الأساسية:</Text>
          
          <Text>\n  - Limpieza: Eliminación de suciedad visible</Text>
          <Text style={styles.arabicText}>  - التنظيف: إزالة الأوساخ المرئية</Text>
          
          <Text>\n  - Desinfección: Reducción de microorganismos a niveles seguros</Text>
          <Text style={styles.arabicText}>  - التطهير: تقليل الكائنات الحية الدقيقة إلى مستويات آمنة</Text>
          
          <Text>\n  - Esterilización: Eliminación total de microorganismos</Text>
          <Text style={styles.arabicText}>  - التعقيم: القضاء الكامل على الكائنات الحية الدقيقة</Text>
          
          <Text>\n• Productos de limpieza y desinfección:</Text>
          <Text style={styles.arabicText}>منتجات التنظيف والتطهير:</Text>
          
          <Text>\n  - Detergentes alcalinos y ácidos</Text>
          <Text style={styles.arabicText}>  - المنظفات القلوية والحمضية</Text>
          
          <Text>\n  - Desinfectantes (lejía, amonios cuaternarios, peróxidos)</Text>
          <Text style={styles.arabicText}>  - المطهرات (الكلور، الأمونيوم الرباعي، البيروكسيدات)</Text>
          
          <Text>\n  - Desengrasantes y desincrustantes</Text>
          <Text style={styles.arabicText}>  - مزيلات الدهون والترسبات</Text>
          
          <Text>\n  - Productos de limpieza enzimática</Text>
          <Text style={styles.arabicText}>  - منتجات التنظيف الإنزيمية</Text>
          
          <Text>\n• Métodos de limpieza:</Text>
          <Text style={styles.arabicText}>طرق التنظيف:</Text>
          
          <Text>\n  1. Prelavado: Eliminación de restos gruesos</Text>
          <Text style={styles.arabicText}>  1. الغسيل الأولي: إزالة المخلفات الكبيرة</Text>
          
          <Text>\n  2. Lavado con agua caliente y detergente</Text>
          <Text style={styles.arabicText}>  2. الغسيل بالماء الساخن والمنظف</Text>
          
          <Text>\n  3. Enjuague con agua potable</Text>
          <Text style={styles.arabicText}>  3. الشطف بالماء الصالح للشرب</Text>
          
          <Text>\n  4. Desinfección con producto adecuado</Text>
          <Text style={styles.arabicText}>  4. التطهير بالمنتج المناسب</Text>
          
          <Text>\n  5. Aclarado final (según tipo de desinfectante)</Text>
          <Text style={styles.arabicText}>  5. الشطف النهائي (حسب نوع المطهر)</Text>
          
          <Text>\n  6. Secado al aire o con papel de un solo uso</Text>
          <Text style={styles.arabicText}>  6. التجفيف بالهواء أو بمناشف ورقية لمرة واحدة</Text>
          
          <Text>\n• Plan de limpieza y desinfección:</Text>
          <Text style={styles.arabicText}>خطة التنظيف والتطهير:</Text>
          
          <Text>\n  - Frecuencia de limpieza (diaria, semanal, mensual)</Text>
          <Text style={styles.arabicText}>  - تكرار التنظيف (يومي، أسبوعي، شهري)</Text>
          
          <Text>\n  - Responsables de cada tarea</Text>
          <Text style={styles.arabicText}>  - المسؤولون عن كل مهمة</Text>
          
          <Text>\n  - Productos a utilizar en cada caso</Text>
          <Text style={styles.arabicText}>  - المنتجات المستخدمة في كل حالة</Text>
          
          <Text>\n  - Método de aplicación</Text>
          <Text style={styles.arabicText}>  - طريقة التطبيق</Text>
          
          <Text>\n  - Verificación de la eficacia</Text>
          <Text style={styles.arabicText}>  - التحقق من الفعالية</Text>
          
          <Text>\n• Control integrado de plagas (CIP):</Text>
          <Text style={styles.arabicText}>التحكم المتكامل في الآفات:</Text>
          
          <Text>\n  - Medidas preventivas (sellado de grietas, mosquiteras)</Text>
          <Text style={styles.arabicText}>  - إجراءات وقائية (سد الشقوق، شبك النوافذ)</Text>
          
          <Text>\n  - Métodos de control físico (trampas, luz ultravioleta)</Text>
          <Text style={styles.arabicText}>  - طرق المكافحة الفيزيائية (المصائد، الأشعة فوق البنفسجية)</Text>
          
          <Text>\n  - Control químico (último recurso, por profesionales)</Text>
          <Text style={styles.arabicText}>  - المكافحة الكيميائية (كحل أخير، من قبل متخصصين)</Text>
          
          <Text>\n  - Registro de incidencias y tratamientos</Text>
          <Text style={styles.arabicText}>  - تسجيل الحوادث والعلاجات</Text>
          
          <Text>\n• Verificación de la limpieza:</Text>
          <Text style={styles.arabicText}>التحقق من النظافة:</Text>
          
          <Text>\n  - Inspección visual</Text>
          <Text style={styles.arabicText}>  - الفحص البصري</Text>
          
          <Text>\n  - Pruebas microbiológicas</Text>
          <Text style={styles.arabicText}>  - الاختبارات الميكروبيولوجية</Text>
          
          <Text>\n  - Tiras reactivas para desinfectantes</Text>
          <Text style={styles.arabicText}>  - شرائط تفاعلية للمطهرات</Text>
          
          <Text>\n  - Medición de ATP (Adenosín Trifosfato)</Text>
          <Text style={styles.arabicText}>  - قياس ATP (أدينوسين ثلاثي الفوسفات)</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MÓDULO 5: CONSERVACIÓN DE ALIMENTOS / الوحدة 5: حفظ الأغذية</Text>
        <Text style={styles.textBlock}>
          <Text>• Métodos de conservación por frío:</Text>
          <Text style={styles.arabicText}>طرق الحفظ بالتبريد:</Text>
          
          <Text>\n  - Refrigeración (0°C a 5°C):</Text>
          <Text style={styles.arabicText}>  - التبريد (0°C إلى 5°C):</Text>
          
          <Text>\n    • Carnes: 1-2 días (picada) / 2-4 días (entera)</Text>
          <Text style={styles.arabicText}>    • اللحوم: 1-2 يوم (مفرومة) / 2-4 أيام (قطعة كاملة)</Text>
          
          <Text>\n    • Pescado: 1-2 días</Text>
          <Text style={styles.arabicText}>    • الأسماك: 1-2 يوم</Text>
          
          <Text>\n    • Lácteos: según fecha de caducidad</Text>
          <Text style={styles.arabicText}>    • منتجات الألبان: حسب تاريخ انتهاء الصلاحية</Text>
          
          <Text>\n  - Congelación (-18°C o inferior):</Text>
          <Text style={styles.arabicText}>  - التجميد (-18°C أو أقل):</Text>
          
          <Text>\n    • Carnes: 6-12 meses</Text>
          <Text style={styles.arabicText}>    • اللحوم: 6-12 شهراً</Text>
          
          <Text>\n    • Pescado: 2-6 meses</Text>
          <Text style={styles.arabicText}>    • الأسماك: 2-6 أشهر</Text>
          
          <Text>\n    • Verduras: 8-12 meses</Text>
          <Text style={styles.arabicText}>    • الخضروات: 8-12 شهراً</Text>
          
          <Text>\n• Métodos de conservación por calor:</Text>
          <Text style={styles.arabicText}>طرق الحفظ بالحرارة:</Text>
          
          <Text>\n  - Pasteurización (72°C x 15 segundos):</Text>
          <Text style={styles.arabicText}>  - البسترة (72°C لمدة 15 ثانية):</Text>
          
          <Text>\n    • Líquidos (leche, zumos)</Text>
          <Text style={styles.arabicText}>    • السوائل (الحليب، العصائر)</Text>
          
          <Text>\n  - Esterilización (más de 100°C):</Text>
          <Text style={styles.arabicText}>  - التعقيم (أكثر من 100°C):</Text>
          
          <Text>\n    • Latas y conservas</Text>
          <Text style={styles.arabicText}>    • المعلبات والأطعمة المحفوظة</Text>
          
          <Text>\n    • Uperización (UHT) - 140°C x 2-4 segundos</Text>
          <Text style={styles.arabicText}>    • التعقيم الفائق (UHT) - 140°C لمدة 2-4 ثوانٍ</Text>
          
          <Text>\n• Otros métodos de conservación:</Text>
          <Text style={styles.arabicText}>طرق حفظ أخرى:</Text>
          
          <Text>\n  - Deshidratación (frutas, carnes secas)</Text>
          <Text style={styles.arabicText}>  - التجفيف (الفواكه المجففة، اللحوم المجففة)</Text>
          
          <Text>\n  - Salazón y curado (jamón, bacalao)</Text>
          <Text style={styles.arabicText}>  - التمليح والمعالجة (اللحوم المقددة، سمك القد المملح)</Text>
          
          <Text>\n  - Ahumado (pescados, carnes, quesos)</Text>
          <Text style={styles.arabicText}>  - التدخين (الأسماك، اللحوم، الأجبان)</Text>
          
          <Text>\n  - Encurtido (vinagre) - pepinillos, aceitunas</Text>
          <Text style={styles.arabicText}>  - التخليل (الخل) - الخيار المخلل، الزيتون</Text>
          
          <Text>\n  - Adición de azúcar (mermeladas, frutas en almíbar)</Text>
          <Text style={styles.arabicText}>  - إضافة السكر (المربى، الفواكه في الشراب السكري)</Text>
          
          <Text>\n  - Fermentación (yogur, chucrut, encurtidos)</Text>
          <Text style={styles.arabicText}>  - التخمر (الزبادي، مخلل الملفوف، المخللات)</Text>
          
          <Text>\n• Almacenamiento correcto de alimentos:</Text>
          <Text style={styles.arabicText}>التخزين الصحيح للأغذية:</Text>
          
          <Text>\n  - Nevera (orden de almacenamiento de arriba a abajo):</Text>
          <Text style={styles.arabicText}>  - الثلاجة (ترتيب التخزين من الأعلى إلى الأسفل):</Text>
          
          <Text>\n    1. Estante superior: alimentos cocinados</Text>
          <Text style={styles.arabicText}>    1. الرف العلوي: الأطعمة المطبوخة</Text>
          
          <Text>\n    2. Estante medio: lácteos y huevos</Text>
          <Text style={styles.arabicText}>    2. الرف الأوسط: منتجات الألبان والبيض</Text>
          
          <Text>\n    3. Estante inferior: carnes y pescados crudos</Text>
          <Text style={styles.arabicText}>    3. الرف السفلي: اللحوم والأسماك النيئة</Text>
          
          <Text>\n    4. Cajones: frutas y verduras</Text>
          <Text style={styles.arabicText}>    4. الأدراج: الفواكه والخضروات</Text>
          
          <Text>\n    5. Puerta: bebidas, salsas, mantequilla</Text>
          <Text style={styles.arabicText}>    5. الباب: المشروبات، الصلصات، الزبدة</Text>
          
          <Text>\n  - Despensa:</Text>
          <Text style={styles.arabicText}>  - المخزن:</Text>
          
          <Text>\n    • Almacenar en lugar fresco y seco</Text>
          <Text style={styles.arabicText}>    • التخزين في مكان بارد وجاف</Text>
          
          <Text>\n    • Separar alimentos crudos de cocinados</Text>
          <Text style={styles.arabicText}>    • فصل الأطعمة النيئة عن المطبوخة</Text>
          
          <Text>\n    • Usar recipientes herméticos</Text>
          <Text style={styles.arabicText}>    • استخدام حاويات محكمة الإغلاق</Text>
          
          <Text>\n    • Rotación de existencias (FIFO: primero en entrar, primero en salir)</Text>
          <Text style={styles.arabicText}>    • تدوير المخزون (أولاً يدخل أولاً يخرج)</Text>
          
          <Text>\n• Control de temperaturas:</Text>
          <Text style={styles.arabicText}>مراقبة درجات الحرارة:</Text>
          
          <Text>\n  - Zona de peligro: 5°C a 65°C (evitar mantener alimentos en este rango)</Text>
          <Text style={styles.arabicText}>  - منطقة الخطر: 5°C إلى 65°C (تجنب حفظ الأطعمة في هذا النطاق)</Text>
          
          <Text>\n  - Temperaturas seguras:</Text>
          <Text style={styles.arabicText}>  - درجات الحرارة الآمنة:</Text>
          
          <Text>\n    • Congelación: -18°C o inferior</Text>
          <Text style={styles.arabicText}>    • التجميد: -18°C أو أقل</Text>
          
          <Text>\n    • Refrigeración: 0°C a 5°C</Text>
          <Text style={styles.arabicText}>    • التبريد: 0°C إلى 5°C</Text>
          
          <Text>\n    • Cocción: mínimo 70°C en el centro del alimento</Text>
          <Text style={styles.arabicText}>    • الطهي: 70°C كحد أدنى في مركز المادة الغذائية</Text>
          
          <Text>\n    • Mantenimiento en caliente: por encima de 65°C</Text>
          <Text style={styles.arabicText}>    • الحفظ ساخناً: فوق 65°C</Text>
          
          <Text>\n  - Técnicas de descongelación seguras:</Text>
          <Text style={styles.arabicText}>  - طرق إذابة الثلج الآمنة:</Text>
          
          <Text>\n    1. En nevera (método más seguro)</Text>
          <Text style={styles.arabicText}>    1. في الثلاجة (الطريقة الأكثر أماناً)</Text>
          
          <Text>\n    2. En microondas (cocción inmediata después)</Text>
          <Text style={styles.arabicText}>    2. في الميكروويف (مع الطهي الفوري بعد ذلك)</Text>
          
          <Text>\n    3. En agua fría (envasado hermético, cambiando el agua cada 30 min)</Text>
          <Text style={styles.arabicText}>    3. في ماء بارد (في عبوة محكمة، مع تغيير الماء كل 30 دقيقة)</Text>
          
          <Text>\n    4. Nunca a temperatura ambiente</Text>
          <Text style={styles.arabicText}>    4. عدم تركها في درجة حرارة الغرفة أبداً</Text>
        </Text>

        <Text style={styles.sectionTitle}>⚠️ Prevención de Riesgos / الوقاية من المخاطر</Text>
        
        <Text style={styles.subsectionTitle}>CONTAMINACIÓN CRUZADA / التلوث المتبادل</Text>
        <Text style={styles.textBlock}>
          <Text>• Definición y tipos de contaminación cruzada:</Text>
          <Text style={styles.arabicText}>تعريف وأنواع التلوث المتبادل:</Text>
          
          <Text>\n  - Directa: contacto entre alimentos crudos y cocinados</Text>
          <Text style={styles.arabicText}>  - مباشرة: تلامس بين أطعمة نيئة ومطبوخة</Text>
          
          <Text>\n  - Indirecta: a través de utensilios, superficies o manos</Text>
          <Text style={styles.arabicText}>  - غير مباشرة: عبر الأدوات أو الأسطح أو الأيدي</Text>
          
          <Text>\n  - Por goteo: jugos de carnes crudas que caen sobre otros alimentos</Text>
          <Text style={styles.arabicText}>  - بالتساقط: عصائر اللحوم النيئة التي تسقط على أطعمة أخرى</Text>
          
          <Text>\n• Medidas preventivas en la cocina:</Text>
          <Text style={styles.arabicText}>إجراءات وقائية في المطبخ:</Text>
          
          <Text>\n  - Separación física de áreas:</Text>
          <Text style={styles.arabicText}>  - الفصل المادي للمناطق:</Text>
          
          <Text>\n    • Zona sucia (manipulación de crudos)</Text>
          <Text style={styles.arabicText}>    • منطقة العمل على الأطعمة النيئة</Text>
          
          <Text>\n    • Zona limpia (alimentos cocinados)</Text>
          <Text style={styles.arabicText}>    • منطقة الأطعمة المطبوخة</Text>
          
          <Text>\n  - Uso de tablas de cortar por colores:</Text>
          <Text style={styles.arabicText}>  - استخدام ألواح التقطيع الملونة:</Text>
          
          <Text>\n    • Rojo: carnes rojas crudas</Text>
          <Text style={styles.arabicText}>    • أحمر: اللحوم الحمراء النيئة</Text>
          
          <Text>\n    • Azul: pescados y mariscos crudos</Text>
          <Text style={styles.arabicText}>    • أزرق: الأسماك والمأكولات البحرية النيئة</Text>
          
          <Text>\n    • Verde: frutas y verduras</Text>
          <Text style={styles.arabicText}>    • أخضر: الفواكه والخضروات</Text>
          
          <Text>\n    • Amarillo: aves crudas</Text>
          <Text style={styles.arabicText}>    • أصفر: الدواجن النيئة</Text>
          
          <Text>\n    • Blanco: productos lácteos y pan</Text>
          <Text style={styles.arabicText}>    • أبيض: منتجات الألبان والخبز</Text>
          
          <Text>\n    • Marrón: carnes cocinadas</Text>
          <Text style={styles.arabicText}>    • بني: اللحوم المطبوخة</Text>
          
          <Text>\n  - Orden correcto en la nevera (de arriba a abajo):</Text>
          <Text style={styles.arabicText}>  - الترتيب الصحيح في الثلاجة (من الأعلى إلى الأسفل):</Text>
          
          <Text>\n    1. Alimentos cocinados y listos para consumir</Text>
          <Text style={styles.arabicText}>    1. الأطعمة المطبوخة والجاهزة للأكل</Text>
          
          <Text>\n    2. Productos lácteos y huevos</Text>
          <Text style={styles.arabicText}>    2. منتجات الألبان والبيض</Text>
          
          <Text>\n    3. Carnes y pescados crudos (en recipientes cerrados en la parte más fría)</Text>
          <Text style={styles.arabicText}>    3. اللحوم والأسماك النيئة (في حاويات مغلقة في أبرد منطقة)</Text>
          
          <Text>\n    4. Frutas y verduras (en cajones específicos)</Text>
          <Text style={styles.arabicText}>    4. الفواكه والخضروات (في أدراج مخصصة)</Text>
          
          <Text>\n• Manejo de alérgenos (14 alérgenos de declaración obligatoria en UE):</Text>
          <Text style={styles.arabicText}>التعامل مع مسببات الحساسية (14 مسبباً للحساسية يجب الإعلان عنها في الاتحاد الأوروبي):</Text>
          
          <Text>\n  1. Cereales con gluten (trigo, centeno, cebada, avena)</Text>
          <Text style={styles.arabicText}>  1. الحبوب المحتوية على الغلوتين (القمح، الجاودار، الشعير، الشوفان)</Text>
          
          <Text>\n  2. Crustáceos y productos a base de crustáceos</Text>
          <Text style={styles.arabicText}>  2. القشريات ومنتجاتها</Text>
          
          <Text>\n  3. Huevos y productos a base de huevo</Text>
          <Text style={styles.arabicText}>  3. البيض ومنتجاته</Text>
          
          <Text>\n  4. Pescado y productos a base de pescado</Text>
          <Text style={styles.arabicText}>  4. السمك ومنتجاته</Text>
          
          <Text>\n  5. Cacahuetes y productos a base de cacahuetes</Text>
          <Text style={styles.arabicText}>  5. الفول السوداني ومنتجاته</Text>
          
          <Text>\n  6. Soja y productos a base de soja</Text>
          <Text style={styles.arabicText}>  6. فول الصويا ومنتجاته</Text>
          
          <Text>\n  7. Leche y sus derivados (incluida la lactosa)</Text>
          <Text style={styles.arabicText}>  7. الحليب ومشتقاته (بما في ذلك اللاكتوز)</Text>
          
          <Text>\n  8. Frutos de cáscara (almendras, avellanas, nueces, etc.)</Text>
          <Text style={styles.arabicText}>  8. المكسرات (اللوز، البندق، الجوز، إلخ)</Text>
          
          <Text>\n  9. Apio y productos derivados</Text>
          <Text style={styles.arabicText}>  9. الكرفس ومنتجاته</Text>
          
          <Text>\n  10. Mostaza y productos derivados</Text>
          <Text style={styles.arabicText}>  10. الخردل ومنتجاته</Text>
          
          <Text>\n  11. Granos de sésamo y productos a base de granos de sésamo</Text>
          <Text style={styles.arabicText}>  11. بذور السمسم ومنتجاته</Text>
          
          <Text>\n  12. Dióxido de azufre y sulfitos en concentraciones superiores a 10 mg/kg o 10 mg/litro</Text>
          <Text style={styles.arabicText}>  12. ثاني أكسيد الكبريت والكبريتات بتركيزات تزيد عن 10 ملغ/كغ أو 10 ملغ/لتر</Text>
          
          <Text>\n  13. Altramuces y productos a base de altramuces</Text>
          <Text style={styles.arabicText}>  13. الترمس ومنتجاته</Text>
          
          <Text>\n  14. Moluscos y productos a base de moluscos</Text>
          <Text style={styles.arabicText}>  14. الرخويات ومنتجاتها</Text>
          
          <Text>\n• Protocolo para evitar la contaminación cruzada por alérgenos:</Text>
          <Text style={styles.arabicText}>بروتوكول لمنع التلوث المتبادل بمسببات الحساسية:</Text>
          
          <Text>\n  - Identificación clara de ingredientes</Text>
          <Text style={styles.arabicText}>  - تحديد المكونات بوضوح</Text>
          
          <Text>\n  - Almacenamiento separado</Text>
          <Text style={styles.arabicText}>  - تخزين منفصل</Text>
          
          <Text>\n  - Uso de utensilios exclusivos</Text>
          <Text style={styles.arabicText}>  - استخدام أدوات مخصصة</Text>
          
          <Text>\n  - Limpieza exhaustiva entre preparaciones</Text>
          <Text style={styles.arabicText}>  - تنظيف شامل بين عمليات التحضير</Text>
          
          <Text>\n  - Formación del personal</Text>
          <Text style={styles.arabicText}>  - تدريب العاملين</Text>
          
          <Text>\n  - Comunicación clara al consumidor</Text>
          <Text style={styles.arabicText}>  - توضيح المعلومات للمستهلك</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MANIPULACIÓN SEGURA / التعامل الآمن</Text>
        <Text style={styles.textBlock}>
          <Text>• Recepción de mercancías</Text>
          <Text style={styles.arabicText}>استلام البضائع</Text>
          
          <Text>\n• Almacenamiento adecuado</Text>
          <Text style={styles.arabicText}>التخزين المناسب</Text>
          
          <Text>\n• Preparación de alimentos</Text>
          <Text style={styles.arabicText}>تحضير الأطعمة</Text>
          
          <Text>\n• Cocción adecuada</Text>
          <Text style={styles.arabicText}>الطهي الجيد</Text>
          
          <Text>\n• Enfriamiento y recalentamiento</Text>
          <Text style={styles.arabicText}>التبريد وإعادة التسخين</Text>
          
          <Text>\n• Servicio de comidas</Text>
          <Text style={styles.arabicText}>تقديم الوجبات</Text>
        </Text>

        <Text style={styles.sectionTitle}>📋 Legislación y Normativa / التشريعات واللوائح</Text>
        
        <Text style={styles.subsectionTitle}>NORMATIVA VIGENTE / اللوائح الحالية</Text>
        <Text style={styles.textBlock}>
          <Text>• Reglamento (CE) 852/2004 sobre higiene de los alimentos</Text>
          <Text style={styles.arabicText}>اللائحة (EC) 852/2004 بشأن نظافة الأغذية</Text>
          
          <Text>\n• Sistema APPCC (Análisis de Peligros y Puntos de Control Crítico)</Text>
          <Text style={styles.arabicText}>نظام تحليل المخاطر ونقاط التحكم الحرجة (HACCP)</Text>
          
          <Text>\n• Normas de etiquetado</Text>
          <Text style={styles.arabicText}>معايير وضع البطاقات التعريفية</Text>
          
          <Text>\n• Alérgenos de declaración obligatoria</Text>
          <Text style={styles.arabicText}>مسببات الحساسية التي يجب الإعلان عنها</Text>
          
          <Text>\n• Trazabilidad alimentaria</Text>
          <Text style={styles.arabicText}>تتبع الأغذية</Text>
        </Text>

        <Text style={styles.sectionTitle}>📚 Recursos y Herramientas / الموارد والأدوات</Text>
        
        <Text style={styles.subsectionTitle}>DOCUMENTACIÓN / التوثيق</Text>
        <Text style={styles.textBlock}>
          <Text>• Registro de temperaturas</Text>
          <Text style={styles.arabicText}>سجل درجات الحرارة</Text>
          
          <Text>\n• Control de proveedores</Text>
          <Text style={styles.arabicText}>مراقبة الموردين</Text>
          
          <Text>\n• Registro de incidencias</Text>
          <Text style={styles.arabicText}>سجل الحوادث</Text>
          
          <Text>\n• Formación del personal</Text>
          <Text style={styles.arabicText}>تدريب العاملين</Text>
        </Text>

        <Text style={styles.subsectionTitle}>RECOMENDACIONES FINALES / توصيات ختامية</Text>
        <Text style={styles.textBlock}>
          <Text>• Mantener una actitud responsable</Text>
          <Text style={styles.arabicText}>الحفاظ على موقف مسؤول</Text>
          
          <Text>\n• Actualización continua</Text>
          <Text style={styles.arabicText}>التحديث المستمر</Text>
          
          <Text>\n• Importancia de la formación</Text>
          <Text style={styles.arabicText}>أهمية التدريب</Text>
          
          <Text>\n• Compromiso con la seguridad alimentaria</Text>
          <Text style={styles.arabicText}>الالتزام بسلامة الأغذية</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    marginRight: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerTitleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'left',
  },
  textBlock: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  arabicText: {
    textAlign: 'right',
    color: '#388E3C',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 2,
    marginBottom: 8,
    fontFamily: 'sans-serif',
    writingDirection: 'rtl',
  },
});
