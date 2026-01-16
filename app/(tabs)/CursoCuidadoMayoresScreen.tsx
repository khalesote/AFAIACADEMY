import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoCuidadoMayoresScreen() {
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
            <Text style={styles.headerTitle}>Cuidado de Personas Mayores</Text>
            <Text style={styles.headerTitleAr}>رعاية المسنين</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás? / ما الذي ستتعلمه؟</Text>
        <Text style={styles.textBlock}>{`
1. Técnicas profesionales de cuidado y atención integral a personas mayores.
   تقنيات احترافية للعناية الشاملة بكبار السن

2. Técnicas seguras de movilización y cambios posturales para prevenir lesiones.
   تقنيات آمنة للتنقل وتغيير الوضعيات للوقاية من الإصابات

3. Protocolos de higiene y aseo personal adaptados a diferentes grados من بروتوكولات النظافة الشخصية المتكيفة مع درجات
   de dependencia.
   الاعتماد المختلفة

4. Planificación de dietas equilibradas y adaptación a patologías específicas.
   تخطيط وجبات متوازنة وتكييفها مع الحالات المرضية

5. Evaluación y adaptación del hogar para prevenir accidentes y caídas.
   تقييم وتكييف المنزل للوقاية من الحوادث والسقوط

6. Gestión y administración segura de medicamentos, incluyendo interacciones.
   إدارة الأدوية وإعطاؤها بشكل آمن بما في ذلك التفاعلات

7. Estrategias de comunicación efectiva y apoyo emocional.
   استراتيجيات التواصل الفعال والدعم العاطفي

8. Protocolos de primeros auxilios adaptados a la tercera edad.
   بروتوكولات الإسعافات الأولية لكبار السن

9. Manejo de situaciones de emergencia y protocolos de actuación.
   التعامل مع حالات الطوارئ وبروتوكولات التصرف

10. Cuidado del cuidador: prevención del síndrome del cuidador.
    رعاية مقدم الرعاية: الوقاية من متلازمة المُقدم الرعاية`}</Text>

        <Text style={styles.sectionTitle}>🎯 Objetivos del Curso / أهداف الدورة</Text>
        <Text style={styles.textBlock}>{`
• Desarrollar habilidades prácticas para el cuidado profesional de personas mayores.
  تطوير مهارات عملية للعناية المحترفة بكبار السن

• Aprender a mantener la dignidad y autonomía del adulto mayor.
  تعلم الحفاظ على كرامة وكبار السن واستقلاليتهم

• Conocer las patologías más comunes en la tercera edad y su manejo.
  معرفة أكثر الأمراض شيوعاً في الشيخوخة وكيفية التعامل معها

• Adquirir técnicas para prevenir complicaciones por inmovilidad.
  اكتساب تقنيات للوقاية من مضاعفات قلة الحركة

• Fomentar el envejecimiento activo y saludable.
  تعزيز الشيخوخة النشطة والصحية

• Capacitar en la identificación temprana de signos de alarma.
  تدريب على التعرف المبكر على علامات التحذير

• Proporcionar herramientas para el manejo del estrés y la sobrecarga del cuidador.
  توفير أدوات للتعامل مع التوتر وإرهاق مقدم الرعاية`}</Text>

        <Text style={styles.sectionTitle}>📚 Módulos Detallados:</Text>
        
        <Text style={styles.moduleTitle}>MÓDULO 1: INTRODUCCIÓN AL CUIDADO GERIÁTRICO / الوحدة 1: مقدمة في رعاية المسنين</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.bold}>• Teoría del envejecimiento:</Text> cambios fisiológicos y psicológicos
          <Text style={styles.arabicText}>
            
نظرية الشيخوخة: التغيرات الفسيولوجية والنفسية
          </Text>
          
          <Text style={styles.bold}>
\n• Aspectos legales y éticos en el cuidado de mayores
          </Text>
          <Text style={styles.arabicText}>
            
الجوانب القانونية والأخلاقية في رعاية كبار السن
          </Text>
          
          <Text style={styles.bold}>
\n• Derechos y deberes de la persona mayor
          </Text>
          <Text style={styles.arabicText}>
            
حقوق وواجبات الشخص المسن
          </Text>
          
          <Text style={styles.bold}>
\n• Comunicación terapéutica: técnicas y estrategias
          </Text>
          <Text style={styles.arabicText}>
            
التواصل العلاجي: تقنيات واستراتيجيات
          </Text>
          
          <Text style={styles.bold}>
\n• Manejo de situaciones difíciles: agresividad, depresión, duelo
          </Text>
          <Text style={styles.arabicText}>
            
التعامل مع المواقف الصعبة: العدوانية، الاكتئاب، الحزن
          </Text>
          
          <Text style={styles.bold}>
\n• Documentación básica: informes y registros de atención
          </Text>
          <Text style={styles.arabicText}>
            
التوثيق الأساسي: التقارير وسجلات الرعاية
          </Text>
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 2: HIGIENE Y CUIDADOS PERSONALES / الوحدة 2: النظافة والرعاية الشخصية</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.bold}>• Protocolos de higiene según grado de dependencia</Text>
          <Text style={styles.arabicText}>
            
بروتوكولات النظافة حسب درجة الاعتماد
          </Text>
          
          <Text style={styles.bold}>
\n• Técnicas de baño en cama y en ducha</Text>
          <Text style={styles.arabicText}>
            
تقنيات الاستحمام في السرير وفي الحمام
          </Text>
          
          <Text style={styles.bold}>
\n• Cuidado de la piel: prevención y tratamiento de úlceras</Text>
          <Text style={styles.arabicText}>
            
العناية بالبشرة: الوقاية من التقرحات وعلاجها
          </Text>
          
          <Text style={styles.bold}>
\n• Higiene bucal: técnicas especiales para prótesis dentales</Text>
          <Text style={styles.arabicText}>
            
نظافة الفم: تقنيات خاصة لأطقم الأسنان
          </Text>
          
          <Text style={styles.bold}>
\n• Cuidado de uñas وأقدام مرضى السكري</Text>
          <Text style={styles.arabicText}>
            
العناية بأظافر وأقدام مرضى السكري
          </Text>
          
          <Text style={styles.bold}>
\n• Cambio de pañales y manejo de incontinencia</Text>
          <Text style={styles.arabicText}>
            
تغيير الحفاضات والتعامل مع سلس البول
          </Text>
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 3: MOVILIZACIÓN Y POSICIONAMIENTO / الوحدة 3: التنقل والوضعيات</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.bold}>• Biomecánica corporal: principios básicos</Text>
          <Text style={styles.arabicText}>
            
الميكانيكا الحيوية للجسم: المبادئ الأساسية
          </Text>
          
          <Text style={styles.bold}>
\n• Técnicas de movilización seguras para el cuidador y el paciente
          </Text>
          <Text style={styles.arabicText}>
            
تقنيات التنقل الآمنة لمقدم الرعاية والمريض
          </Text>
          
          <Text style={styles.bold}>
\n• Uso correcto de ayudas técnicas: grúas, cinturones, etc.
          </Text>
          <Text style={styles.arabicText}>
            
الاستخدام الصحيح للمساعدات التقنية: الرافعات، الأحزمة، إلخ
          </Text>
          
          <Text style={styles.bold}>
\n• Prevención de úlceras por presión: cambios posturales programados
          </Text>
          <Text style={styles.arabicText}>
            
الوقاية من قرح الفراش: تغيير الوضعيات المبرمج
          </Text>
          
          <Text style={styles.bold}>
\n• Ejercicios de movilización pasiva y activa
          </Text>
          <Text style={styles.arabicText}>
            
تمارين التنقل السلبية والنشطة
          </Text>
          
          <Text style={styles.bold}>
\n• Técnicas de deambulación asistida
          </Text>
          <Text style={styles.arabicText}>
            
تقنيات المشي بمساعدة
          </Text>
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 4: NUTRICIÓN Y ALIMENTACIÓN / الوحدة 4: التغذية والتغذية</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.bold}>• Requerimientos nutricionales en la tercera edad</Text>
          <Text style={styles.arabicText}>
            
المتطلبات الغذائية لكبار السن
          </Text>
          
          <Text style={styles.bold}>
\n• Dietas terapéuticas: diabetes, hipertensión, disfagia, etc.
          </Text>
          <Text style={styles.arabicText}>
            
الأنظمة الغذائية العلاجية: السكري، ارتفاع ضغط الدم، عسر البلع، إلخ
          </Text>
          
          <Text style={styles.bold}>
\n• Técnicas de alimentación asistida
          </Text>
          <Text style={styles.arabicText}>
            
تقنيات التغذية المساعدة
          </Text>
          
          <Text style={styles.bold}>
\n• Prevención y detección de desnutrición
          </Text>
          <Text style={styles.arabicText}>
            
الوقاية من سوء التغذية والكشف عنه
          </Text>
          
          <Text style={styles.bold}>
\n• Manejo de la disfagia: texturas y espesantes
          </Text>
          <Text style={styles.arabicText}>
            
التعامل مع عسر البلع: القوام والمواد المكثفة
          </Text>
          
          <Text style={styles.bold}>
\n• Hidratación: importancia y control
          </Text>
          <Text style={styles.arabicText}>
            
الترطيب: الأهمية والمراقبة
          </Text>
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 5: SALUD Y MANEJO DE ENFERMEDADES / الوحدة 5: الصحة وإدارة الأمراض</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.bold}>• Control de constantes vitales: toma correcta</Text>
          <Text style={styles.arabicText}>
            
مراقبة العلامات الحيوية: الطريقة الصحيحة للقياس
          </Text>
          
          <Text style={styles.bold}>
\n• Manejo de medicación: administración y registro
          </Text>
          <Text style={styles.arabicText}>
            
إدارة الأدوية: إعطاؤها وتسجيلها
          </Text>
          
          <Text style={styles.bold}>
\n• Enfermedades crónicas más frecuentes
          </Text>
          <Text style={styles.arabicText}>
            
أكثر الأمراض المزمنة شيوعاً
          </Text>
          
          <Text style={styles.bold}>
\n• Reconocimiento de signos de alarma
          </Text>
          <Text style={styles.arabicText}>
            
التعرف على علامات التحذير
          </Text>
          
          <Text style={styles.bold}>
\n• Cuidados paliativos y acompañamiento en el final de la vida
          </Text>
          <Text style={styles.arabicText}>
            
الرعاية التلطيفية والمرافقة في نهاية العمر
          </Text>
          
          <Text style={styles.bold}>
\n• Manejo del dolor y síntomas molestos
          </Text>
          <Text style={styles.arabicText}>
            
التعامل مع الأعراض المزعجة والألم
          </Text>
        </Text>

        <Text style={styles.moduleTitle}>MÓDULO 6: SEGURIDAD والطوارئ / الوحدة 6: السلامة والطوارئ</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.bold}>• Evaluación de riesgos en el hogar</Text>
          <Text style={styles.arabicText}>
            
تقييم المخاطر في المنزل
          </Text>
          
          <Text style={styles.bold}>
\n• Prevención de caídas y accidentes
          </Text>
          <Text style={styles.arabicText}>
            
الوقاية من السقوط والحوادث
          </Text>
          
          <Text style={styles.bold}>
\n• Primeros auxilios en personas mayores
          </Text>
          <Text style={styles.arabicText}>
            
الإسعافات الأولية لكبار السن
          </Text>
          
          <Text style={styles.bold}>
\n• Protocolos de actuación en emergencias
          </Text>
          <Text style={styles.arabicText}>
            
بروتوكولات التصرف في حالات الطوارئ
          </Text>
          
          <Text style={styles.bold}>
\n• Plan de emergencia familiar
          </Text>
          <Text style={styles.arabicText}>
            
خطة الطوارئ العائلية
          </Text>
          
          <Text style={styles.bold}>
\n• Uso de dispositivos de alerta y teleasistencia
          </Text>
          <Text style={styles.arabicText}>
            
استخدام أجهزة التنبيه والمساعدة عن بُعد
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>👵 Técnicas Avanzadas de Cuidado / تقنيات متقدمة للرعاية</Text>
        
        <Text style={styles.subsectionTitle}>TÉCNICAS DE MOVILIZACIÓN SEGURA / تقنيات التنقل الآمن</Text>
        <Text style={styles.textBlock}>
          <Text>• Transferencias cama-silla-sillón con y sin ayudas técnicas</Text>
          <Text style={styles.arabicText}>نقل المريض بين السرير والكرسي مع وبدون مساعدات تقنية</Text>
          
          <Text>\n• Cambios posturales en la cama (decúbito supino, lateral, Fowler)</Text>
          <Text style={styles.arabicText}>تغيير وضعيات النوم (الاستلقاء على الظهر، الجانب، وضعية فاولر)</Text>
          
          <Text>\n• Técnicas para incorporar al paciente en la cama</Text>
          <Text style={styles.arabicText}>تقنيات مساعدة المريض على الجلوس في السرير</Text>
          
          <Text>\n• Movilización de pacientes con movilidad reducida</Text>
          <Text style={styles.arabicText}>تحريك المرضى ذوي الحركة المحدودة</Text>
          
          <Text>\n• Uso de grúas y sistemas de elevación</Text>
          <Text style={styles.arabicText}>استخدام الروافع والأنظمة الرفع</Text>
          
          <Text>\n• Técnicas para levantar del suelo de forma segura</Text>
          <Text style={styles.arabicText}>تقنيات الرفع الآمن من الأرض</Text>
        </Text>

        <Text style={styles.subsectionTitle}>CUIDADOS DIARIOS ESPECIALIZADOS / رعاية يومية متخصصة</Text>
        <Text style={styles.textBlock}>
          <Text>• Baño completo en cama con técnica de respeto a la intimidad</Text>
          <Text style={styles.arabicText}>الاستحمام الكامل في السرير مع مراعاة الخصوصية</Text>
          
          <Text>\n• Cuidado de la piel: prevención y tratamiento de úlceras</Text>
          <Text style={styles.arabicText}>العناية بالبشرة: الوقاية من التقرحات وعلاجها</Text>
          
          <Text>\n• Higiene íntima en pacientes con incontinencia</Text>
          <Text style={styles.arabicText}>النظافة الشخصية لمرضى سلس البول</Text>
          
          <Text>\n• Cuidado de la boca en pacientes con prótesis dental</Text>
          <Text style={styles.arabicText}>العناية بالفم لمرضى أطقم الأسنان</Text>
          
          <Text>\n• Aseo del cabello en cama y en lavabo</Text>
          <Text style={styles.arabicText}>العناية بالشعر في السرير وفي حوض الغسيل</Text>
          
          <Text>\n• Cuidado de uñas y pies (especial atención en diabéticos)</Text>
          <Text style={styles.arabicText}>العناية بالأظافر والقدمين (مع اهتمام خاص بمرضى السكري)</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MANEJO DE AYUDAS TÉCNICAS / التعامل مع الوسائل المساعدة</Text>
        <Text style={styles.textBlock}>
          <Text>• Sillas de ruedas: ajuste, transferencias y manejo</Text>
          <Text style={styles.arabicText}>الكراسي المتحركة: الضبط، النقل، والاستخدام</Text>
          
          <Text>\n• Andadores y bastones: elección y uso correcto</Text>
          <Text style={styles.arabicText}>المشايات والعصي: الاختيار والاستخدام الصحيح</Text>
          
          <Text>\n• Camas articuladas y colchones antiescaras</Text>
          <Text style={styles.arabicText}>الأسرة القابلة للضبط والمراتب المضادة للقروح</Text>
          
          <Text>\n• Grúas y sistemas de elevación</Text>
          <Text style={styles.arabicText}>الروافع وأنظمة الرفع</Text>
          
          <Text>\n• Sillas de ducha y asientos elevadores</Text>
          <Text style={styles.arabicText}>كراسي الاستحمام والمقاعد المرتفعة</Text>
          
          <Text>\n• Dispositivos de ayuda para la deambulación</Text>
          <Text style={styles.arabicText}>أجهزة المساعدة على المشي</Text>
        </Text>

        <Text style={styles.sectionTitle}>🏠 Adaptación del Hogar para Mayores / تأقلم المنزل لكبار السن</Text>
        
        <Text style={styles.subsectionTitle}>ZONA DE DESCANSO / منطقة الراحة</Text>
        <Text style={styles.textBlock}>
          <Text>• Cama a altura adecuada (entre 45-60 cm del suelo)</Text>
          <Text style={styles.arabicText}>سرير على ارتفاع مناسب (بين 45-60 سم من الأرضية)</Text>
          
          <Text>\n• Colchón ortopédico con base articulada</Text>
          <Text style={styles.arabicText}>مرتبة طبية مع قاعدة قابلة للضبط</Text>
          
          <Text>\n• Barandillas de seguridad ajustables</Text>
          <Text style={styles.arabicText}>درابزين أمان قابل للتعديل</Text>
          
          <Text>\n• Iluminación regulable con interruptores accesibles</Text>
          <Text style={styles.arabicText}>إضاءة قابلة للتعديل مع مفاتيح سهلة الوصول</Text>
          
          <Text>\n• Teléfono inalámbrico con números de emergencia programados</Text>
          <Text style={styles.arabicText}>هاتف لاسلكي مع أرقام الطوارئ المبرمجة</Text>
          
          <Text>\n• Control remoto para persianas y luces</Text>
          <Text style={styles.arabicText}>جهاز تحكم عن بعد للستائر والإضاءة</Text>
          
          <Text>\n• Suelo antideslizante y sin alfombras sueltas</Text>
          <Text style={styles.arabicText}>أرضية غير قابلة للانزلاق وخالية من السجاد المتحرك</Text>
        </Text>

        <Text style={styles.subsectionTitle}>ZONA DE BAÑO SEGURO / منطقة حمام آمن</Text>
        <Text style={styles.textBlock}>
          <Text>• Barras de apoyo en ducha e inodoro (soporte 150 kg mínimo)</Text>
          <Text style={styles.arabicText}>قضبان دعم في الحمام والمرحاض (تحمل 150 كجم على الأقل)</Text>
          
          <Text>\n• Suelo antideslizante en seco y mojado</Text>
          <Text style={styles.arabicText}>أرضية غير قابلة للانزلاق سواء كانت جافة أو مبللة</Text>
          
          <Text>\n• Asiento de ducha regulable con respaldo</Text>
          <Text style={styles.arabicText}>مقعد دش قابل للتعديل مع مسند ظهر</Text>
          
          <Text>\n• Grifería termostática para evitar quemaduras</Text>
          <Text style={styles.arabicText}>حنفيات حرارية للوقاية من الحروق</Text>
          
          <Text>\n• Inodoro elevado con apoyabrazos</Text>
          <Text style={styles.arabicText}>مرحاض مرتفع مع مساند للذراعين</Text>
          
          <Text>\n• Espejo inclinado para uso en silla de ruedas</Text>
          <Text style={styles.arabicText}>مرآة مائلة لاستخدام كرسي المتحرك</Text>
          
          <Text>\n• Alarma de emergencia accesible desde el suelo</Text>
          <Text style={styles.arabicText}>إنذار طوارئ يمكن الوصول إليه من الأرض</Text>
        </Text>

        <Text style={styles.subsectionTitle}>ZONA DE ESTANCIA / منطقة الجلوس</Text>
        <Text style={styles.textBlock}>
          <Text>• Muebles con bordes redondeados</Text>
          <Text style={styles.arabicText}>أثاث بحواف دائرية</Text>
          
          <Text>\n• Sillas con reposabrazos y asiento firme</Text>
          <Text style={styles.arabicText}>كراسي بمساند ذراعين ومقاعد صلبة</Text>
          
          <Text>\n• Espacio libre de obstáculos (mínimo 90 cm de paso)</Text>
          <Text style={styles.arabicText}>مساحة خالية من العوائق (90 سم على الأقل للمرور)</Text>
          
          <Text>\n• Iluminación uniforme sin deslumbramientos</Text>
          <Text style={styles.arabicText}>إضاءة موحدة بدون توهج</Text>
          
          <Text>\n• Interruptores a 90-110 cm del suelo</Text>
          <Text style={styles.arabicText}>مفاتيح على ارتفاع 90-110 سم من الأرضية</Text>
          
          <Text>\n• Pasamanos en pasillos y escaleras</Text>
          <Text style={styles.arabicText}>درابزين في الممرات والسلالم</Text>
          
          <Text>\n• Sistema de teleasistencia portátil</Text>
          <Text style={styles.arabicText}>نظام مساعدة عن بعد محمول</Text>
        </Text>

        <Text style={styles.subsectionTitle}>COCINA ADAPTADA / مطبخ مجهز</Text>
        <Text style={styles.textBlock}>
          <Text>• Encimera a altura regulable (70-85 cm)</Text>
          <Text style={styles.arabicText}>منضدة قابلة لضبط الارتفاع (70-85 سم)</Text>
          
          <Text>\n• Hornos y microondas a altura accesible</Text>
          <Text style={styles.arabicText}>أفران ومواقف ميكروويف في متناول اليد</Text>
          
          <Text>\n• Grifo monomando con sensor</Text>
          <Text style={styles.arabicText}>صنبور ذو ذراع واحدة مع حساس</Text>
          
          <Text>\n• Armarios con sistema de apertura fácil</Text>
          <Text style={styles.arabicText}>خزائن بنظام فتح سهل</Text>
          
          <Text>\n• Electrodomésticos con indicadores táctiles و sonoros</Text>
          <Text style={styles.arabicText}>أجهزة كهربائية بمؤشرات لمسية وسمعية</Text>
          
          <Text>\n• Detector de humo y gas</Text>
          <Text style={styles.arabicText}>كاشف للدخان والغاز</Text>
          
          <Text>\n• Sistema de corte automático de gas</Text>
          <Text style={styles.arabicText}>نظام قطع غاز آلي</Text>
        </Text>

        <Text style={styles.sectionTitle}>💊 Gestión Segura de Medicamentos / إدارة الأدوية الآمنة</Text>
        
        <Text style={styles.subsectionTitle}>ORGANIZACIÓN Y ALMACENAMIENTO / التنظيم والتخزين</Text>
        <Text style={styles.textBlock}>
          <Text>• Pastilleros semanales con división por tomas</Text>
          <Text style={styles.arabicText}>حافظات أسبوعية للأدوية مقسمة حسب الجرعات</Text>
          
          <Text>\n• Sistema de registro detallado (hora, dosis, efectos)</Text>
          <Text style={styles.arabicText}>نظام تسجيل مفصل (الوقت، الجرعة، الآثار الجانبية)</Text>
          
          <Text>\n• Almacenamiento según condiciones de conservación</Text>
          <Text style={styles.arabicText}>التخزين حسب شروط الحفظ</Text>
          
          <Text>\n• Control estricto de caducidades</Text>
          <Text style={styles.arabicText}>مراقبة صارمة لتواريخ الانتهاء</Text>
          
          <Text>\n• Separación de medicamentos por paciente</Text>
          <Text style={styles.arabicText}>فصل الأدوية حسب المريض</Text>
          
          <Text>\n• Lista actualizada de medicación</Text>
          <Text style={styles.arabicText}>قائمة محدثة بالأدوية</Text>
          
          <Text>\n• Documento de consentimiento informado</Text>
          <Text style={styles.arabicText}>مستند الموافقة المسبقة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>ADMINISTRACIÓN SEGURA</Text>
        <Text style={styles.textBlock}>{`
• Verificación de la regla de los 5 correctos:
  - Paciente correcto
  - Medicamento correcto
  - Dosis correcta
  - Vía correcta
  - Hora correcta
• Técnicas de administración por diferentes vías
• Manejo de dispositivos especiales (inhaladores, parches, etc.)`}
        </Text>

        <Text style={styles.subsectionTitle}>CONTROL Y SEGUIMIENTO / المتابعة والمراقبة</Text>
        <Text style={styles.textBlock}>
          <Text>• Registro de efectos secundarios</Text>
          <Text style={styles.arabicText}>تسجيل الآثار الجانبية</Text>
          
          <Text>\n• Control de constantes vitales relacionadas</Text>
          <Text style={styles.arabicText}>مراقبة العلامات الحيوية ذات الصلة</Text>
          
          <Text>\n• Detección de interacciones medicamentosas</Text>
          <Text style={styles.arabicText}>الكشف عن التفاعلات الدوائية</Text>
          
          <Text>\n• Comunicación con el equipo médico</Text>
          <Text style={styles.arabicText}>التواصل مع الفريق الطبي</Text>
          
          <Text>\n• Protocolo ante errores de medicación</Text>
          <Text style={styles.arabicText}>بروتوكول التعامل مع أخطاء الأدوية</Text>
          
          <Text>\n• Educación al paciente y familiares</Text>
          <Text style={styles.arabicText}>تثقيف المريض وأفراد العائلة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MEDIDAS DE SEGURIDAD / إجراءات السلامة</Text>
        <Text style={styles.textBlock}>
          <Text>• Almacenamiento en lugar seguro y cerrado</Text>
          <Text style={styles.arabicText}>التخزين في مكان آمن ومغلق</Text>
          
          <Text>\n• Control de medicación controlada</Text>
          <Text style={styles.arabicText}>التحكم في الأدوية الخاضعة للرقابة</Text>
          
          <Text>\n• Eliminación segura de medicamentos</Text>
          <Text style={styles.arabicText}>التخلص الآمن من الأدوية</Text>
          
          <Text>\n• Prevención de errores en la administración</Text>
          <Text style={styles.arabicText}>الوقاية من أخطاء إعطاء الأدوية</Text>
          
          <Text>\n• Protocolo ante sobredosis o intoxicación</Text>
          <Text style={styles.arabicText}>بروتوكول التعامل مع الجرعات الزائدة أو التسمم</Text>
          
          <Text>\n• Lista de alergias e intolerancias</Text>
          <Text style={styles.arabicText}>قائمة الحساسيات وعدم التحمل</Text>
        </Text>

        <Text style={styles.sectionTitle}>🧠 Apoyo Emocional y Cognitivo / الدعم العاطفي والمعرفي</Text>
        
        <Text style={styles.subsectionTitle}>COMUNICACIÓN TERAPÉUTICA / التواصل العلاجي</Text>
        <Text style={styles.textBlock}>
          <Text>• Técnicas de escucha activa y empática</Text>
          <Text style={styles.arabicText}>تقنيات الاستماع الفعال والتعاطفي</Text>
          
          <Text>\n• Comunicación no verbal: contacto visual, gestos, tono de voz</Text>
          <Text style={styles.arabicText}>التواصل غير اللفظي: التواصل البصري، الإيماءات، نبرة الصوت</Text>
          
          <Text>\n• Lenguaje claro, sencillo y respetuoso</Text>
          <Text style={styles.arabicText}>لغة واضحة وبسيطة ومحترمة</Text>
          
          <Text>\n• Validación de emociones y sentimientos</Text>
          <Text style={styles.arabicText}>الاعتراف بالمشاعر والعواطف</Text>
          
          <Text>\n• Estrategias para pacientes con deterioro cognitivo</Text>
          <Text style={styles.arabicText}>استراتيجيات لمرضى التدهور المعرفي</Text>
          
          <Text>\n• Comunicación con familiares y equipo interdisciplinar</Text>
          <Text style={styles.arabicText}>التواصل مع أفراد الأسرة والفريق متعدد التخصصات</Text>
        </Text>

        <Text style={styles.subsectionTitle}>ESTIMULACIÓN COGNITIVA / التحفيز المعرفي</Text>
        <Text style={styles.textBlock}>
          <Text>• Ejercicios de memoria a corto y largo plazo</Text>
          <Text style={styles.arabicText}>تمارين الذاكرة قصيرة وطويلة المدى</Text>
          
          <Text>\n• Actividades de orientación (tiempo, espacio, persona)</Text>
          <Text style={styles.arabicText}>أنشطة التوجيه (الوقت، المكان، الشخص)</Text>
          
          <Text>\n• Juegos de mesa adaptados</Text>
          <Text style={styles.arabicText}>ألعاب الطاولة المعدلة</Text>
          
          <Text>\n• Talleres de reminiscencia</Text>
          <Text style={styles.arabicText}>ورش عمل الذكريات</Text>
          
          <Text>\n• Terapia de validación</Text>
          <Text style={styles.arabicText}>علاج التحقق</Text>
          
          <Text>\n• Uso de nuevas tecnologías</Text>
          <Text style={styles.arabicText}>استخدام التقنيات الحديثة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>ACTIVIDADES TERAPÉUTICAS / الأنشطة العلاجية</Text>
        <Text style={styles.textBlock}>
          <Text>• Musicoterapia: selección de música significativa</Text>
          <Text style={styles.arabicText}>العلاج بالموسيقى: اختيار موسيقى ذات معنى</Text>
          
          <Text>\n• Terapia con mascotas</Text>
          <Text style={styles.arabicText}>العلاج بمساعدة الحيوانات الأليفة</Text>
          
          <Text>\n• Actividades de jardinería adaptada</Text>
          <Text style={styles.arabicText}>أنشطة البستنة المعدلة</Text>
          
          <Text>\n• Talleres de manualidades</Text>
          <Text style={styles.arabicText}>ورش العمل اليدوية</Text>
          
          <Text>\n• Ejercicio físico adaptado</Text>
          <Text style={styles.arabicText}>التمارين الرياضية المعدلة</Text>
          
          <Text>\n• Talleres de cocina terapéutica</Text>
          <Text style={styles.arabicText}>ورش عمل الطبخ العلاجي</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MANEJO DE CONDUCTAS DESAFIANTES / التعامل مع السلوكيات الصعبة</Text>
        <Text style={styles.textBlock}>
          <Text>• Estrategias para manejar la agitación y agresividad</Text>
          <Text style={styles.arabicText}>استراتيجيات للتعامل مع الهياج والعدوانية</Text>
          
          <Text>\n• Técnicas de distracción y redirección</Text>
          <Text style={styles.arabicText}>تقنيات الإلهاء وإعادة التوجيه</Text>
          
          <Text>\n• Manejo de la deambulación errática</Text>
          <Text style={styles.arabicText}>التعامل مع التجوال العشوائي</Text>
          
          <Text>\n• Estrategias para el insomnio y alteraciones del sueño</Text>
          <Text style={styles.arabicText}>استراتيجيات للأرق واضطرابات النوم</Text>
          
          <Text>\n• Manejo de la apatía y depresión</Text>
          <Text style={styles.arabicText}>التعامل مع اللامبالاة والاكتئاب</Text>
          
          <Text>\n• Técnicas de relajación y reducción de ansiedad</Text>
          <Text style={styles.arabicText}>تقنيات الاسترخاء وتقليل القلق</Text>
        </Text>

        <Text style={styles.sectionTitle}>⚠️ Prevención de Riesgos y Emergencias / الوقاية من المخاطر والطوارئ</Text>
        
        <Text style={styles.subsectionTitle}>PREVENCIÓN DE CAÍDAS / الوقاية من السقوط</Text>
        <Text style={styles.textBlock}>
          <Text>• Evaluación del riesgo de caídas (escala de Morse)</Text>
          <Text style={styles.arabicText}>تقييم مخاطر السقوط (مقياس مورس)</Text>
          
          <Text>\n• Modificaciones ambientales:</Text>
          <Text style={styles.arabicText}>تعديلات بيئية:</Text>
          
          <Text>\n  - Eliminación de barreras arquitectónicas</Text>
          <Text style={styles.arabicText}>  - إزالة الحواجز المعمارية</Text>
          
          <Text>\n  - Suelos antideslizantes</Text>
          <Text style={styles.arabicText}>  - أرضيات غير قابلة للانزلاق</Text>
          
          <Text>\n  - Iluminación adecuada</Text>
          <Text style={styles.arabicText}>  - إضاءة مناسبة</Text>
          
          <Text>\n  - Mobiliario estable y a altura adecuada</Text>
          <Text style={styles.arabicText}>  - أثاث مستقر وبارتفاع مناسب</Text>
          
          <Text>\n• Uso correcto de ayudas técnicas</Text>
          <Text style={styles.arabicText}>  الاستخدام الصحيح للمساعدات التقنية</Text>
          
          <Text>\n• Programa de ejercicios de equilibrio y fuerza</Text>
          <Text style={styles.arabicText}>  برنامج تمارين التوازن والقوة</Text>
          
          <Text>\n• Revisión periódica de la medicación que pueda afectar al equilibrio</Text>
          <Text style={styles.arabicText}>  مراجعة دورية للأدوية التي قد تؤثر على التوازن</Text>
        </Text>

        <Text style={styles.subsectionTitle}>SEÑALES DE ALARMA / علامات التحذير</Text>
        <Text style={styles.textBlock}>
          <Text>• Cambios en el estado mental:</Text>
          <Text style={styles.arabicText}>تغيرات في الحالة العقلية:</Text>
          
          <Text>\n  - Confusión repentina</Text>
          <Text style={styles.arabicText}>  - ارتباك مفاجئ</Text>
          
          <Text>\n  - Desorientación</Text>
          <Text style={styles.arabicText}>  - تشوش في المكان أو الزمان</Text>
          
          <Text>\n  - Somnolencia excesiva</Text>
          <Text style={styles.arabicText}>  - نعاس مفرط</Text>
          
          <Text>\n  - Cambios de comportamiento</Text>
          <Text style={styles.arabicText}>  - تغيرات في السلوك</Text>
          
          <Text>\n• Signos físicos de alarma:</Text>
          <Text style={styles.arabicText}>علامات تحذيرية جسدية:</Text>
          
          <Text>\n  - Dificultad para respirar</Text>
          <Text style={styles.arabicText}>  - صعوبة في التنفس</Text>
          
          <Text>\n  - Dolor torácico</Text>
          <Text style={styles.arabicText}>  - ألم في الصدر</Text>
          
          <Text>\n  - Pérdida de fuerza o sensibilidad</Text>
          <Text style={styles.arabicText}>  - فقدان القوة أو الإحساس</Text>
          
          <Text>\n  - Fiebre alta</Text>
          <Text style={styles.arabicText}>  - ارتفاع في درجة الحرارة</Text>
          
          <Text>\n  - Caídas o traumatismos</Text>
          <Text style={styles.arabicText}>  - سقوط أو إصابات</Text>
        </Text>

        <Text style={styles.subsectionTitle}>PRIMEROS AUXILIOS BÁSICOS / الإسعافات الأولية الأساسية</Text>
        <Text style={styles.textBlock}>
          <Text>• Protocolo PAS (Proteger, Avisar, Socorrer)</Text>
          <Text style={styles.arabicText}>بروتوكول PAS (حماية، تنبيه، إنقاذ)</Text>
          
          <Text>\n• Maniobra de Heimlich en adultos mayores</Text>
          <Text style={styles.arabicText}>مناورة هايمليخ لكبار السن</Text>
          
          <Text>\n• Posición lateral de seguridad</Text>
          <Text style={styles.arabicText}>وضعية الإفاقة</Text>
          
          <Text>\n• Reanimación cardiopulmonar básica</Text>
          <Text style={styles.arabicText}>إنعاش القلب والرئتين الأساسي</Text>
          
          <Text>\n• Manejo de heridas y quemaduras</Text>
          <Text style={styles.arabicText}>التعامل مع الجروح والحروق</Text>
          
          <Text>\n• Actuación ante convulsiones</Text>
          <Text style={styles.arabicText}>التصرف في حالات النوبات</Text>
          
          <Text>\n• Manejo de hipoglucemias</Text>
          <Text style={styles.arabicText}>التعامل مع انخفاض السكر في الدم</Text>
        </Text>

        <Text style={styles.subsectionTitle}>PROTOCOLO DE EMERGENCIAS / بروتوكول الطوارئ</Text>
        <Text style={styles.textBlock}>
          <Text>• Números de emergencia accesibles</Text>
          <Text style={styles.arabicText}>أرقام الطوارئ المتاحة بسهولة</Text>
          
          <Text>\n• Documentación médica actualizada</Text>
          <Text style={styles.arabicText}>توثيق طبي محدث</Text>
          
          <Text>\n• Mochila de emergencia con:</Text>
          <Text style={styles.arabicText}>حقيبة طوارئ تحتوي على:</Text>
          
          <Text>\n  - Información médica</Text>
          <Text style={styles.arabicText}>  - معلومات طبية</Text>
          
          <Text>\n  - Medicación de rescate</Text>
          <Text style={styles.arabicText}>  - أدوية الطوارئ</Text>
          
          <Text>\n  - Informes médicos recientes</Text>
          <Text style={styles.arabicText}>  - التقارير الطبية الحديثة</Text>
          
          <Text>\n  - Documentación importante</Text>
          <Text style={styles.arabicText}>  - وثائق مهمة</Text>
          
          <Text>\n• Plan de evacuación adaptado</Text>
          <Text style={styles.arabicText}>خطة إخلاء معدلة</Text>
          
          <Text>\n• Sistema de alerta médica</Text>
          <Text style={styles.arabicText}>نظام إنذار طبي</Text>
        </Text>

        <Text style={styles.sectionTitle}>🤝 Relación con la Familia y Equipo / العلاقة مع العائلة والفريق</Text>
        
        <Text style={styles.subsectionTitle}>COMUNICACIÓN EFECTIVA CON LA FAMILIA / تواصل فعال مع العائلة</Text>
        <Text style={styles.textBlock}>
          <Text>• Reuniones periódicas de seguimiento</Text>
          <Text style={styles.arabicText}>اجتماعات متابعة دورية</Text>
          
          <Text>\n• Informes diarios detallados</Text>
          <Text style={styles.arabicText}>تقارير يومية مفصلة</Text>
          
          <Text>\n• Escucha activa de preocupaciones</Text>
          <Text style={styles.arabicText}>الاستماع الفعال للمخاوف</Text>
          
          <Text>\n• Respeto por las decisiones familiares</Text>
          <Text style={styles.arabicText}>احترام القرارات العائلية</Text>
          
          <Text>\n• Manejo de expectativas realistas</Text>
          <Text style={styles.arabicText}>إدارة التوقعات الواقعية</Text>
          
          <Text>\n• Educación a la familia sobre cuidados</Text>
          <Text style={styles.arabicText}>تثقيف العائلة حول الرعاية</Text>
          
          <Text>\n• Apoyo en la toma de decisiones difíciles</Text>
          <Text style={styles.arabicText}>الدعم في اتخاذ القرارات الصعبة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>TRABAJO EN EQUIPO / العمل الجماعي</Text>
        <Text style={styles.textBlock}>
          <Text>• Coordinación con otros profesionales:</Text>
          <Text style={styles.arabicText}>التنسيق مع المختصين الآخرين:</Text>
          
          <Text>\n  - Médicos</Text>
          <Text style={styles.arabicText}>  - الأطباء</Text>
          
          <Text>\n  - Enfermería</Text>
          <Text style={styles.arabicText}>  - التمريض</Text>
          
          <Text>\n  - Fisioterapeutas</Text>
          <Text style={styles.arabicText}>  - أخصائيو العلاج الطبيعي</Text>
          
          <Text>\n  - Trabajadores sociales</Text>
          <Text style={styles.arabicText}>  - الأخصائيون الاجتماعيون</Text>
          
          <Text>\n  - Terapeutas ocupacionales</Text>
          <Text style={styles.arabicText}>  - أخصائيو العلاج الوظيفي</Text>
          
          <Text>\n• Reuniones de equipo multidisciplinar</Text>
          <Text style={styles.arabicText}>اجتماعات الفريق متعدد التخصصات</Text>
          
          <Text>\n• Registro compartido de información</Text>
          <Text style={styles.arabicText}>سجل مشترك للمعلومات</Text>
          
          <Text>\n• Protocolos de derivación</Text>
          <Text style={styles.arabicText}>بروتوكولات الإحالة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>CUIDADO DEL CUIDADOR / رعاية مقدم الرعاية</Text>
        <Text style={styles.textBlock}>
          <Text>• Señales de alerta del síndrome del cuidador:</Text>
          <Text style={styles.arabicText}>علامات تحذيرية لمتلازمة مقدم الرعاية:</Text>
          
          <Text>\n  - Agotamiento físico y emocional</Text>
          <Text style={styles.arabicText}>  - الإرهاق الجسدي والعاطفي</Text>
          
          <Text>\n  - Irritabilidad</Text>
          <Text style={styles.arabicText}>  - التهيج</Text>
          
          <Text>\n  - Aislamiento social</Text>
          <Text style={styles.arabicText}>  - العزلة الاجتماعية</Text>
          
          <Text>\n  - Problemas de sueño</Text>
          <Text style={styles.arabicText}>  - مشاكل النوم</Text>
          
          <Text>\n  - Cambios en el apetito</Text>
          <Text style={styles.arabicText}>  - تغيرات في الشهية</Text>
          
          <Text>\n• Estrategias de autocuidado:</Text>
          <Text style={styles.arabicText}>استراتيجيات الرعاية الذاتية:</Text>
          
          <Text>\n  - Técnicas de relajación</Text>
          <Text style={styles.arabicText}>  - تقنيات الاسترخاء</Text>
          
          <Text>\n  - Gestión del tiempo</Text>
          <Text style={styles.arabicText}>  - إدارة الوقت</Text>
          
          <Text>\n  - Establecimiento de límites</Text>
          <Text style={styles.arabicText}>  - وضع الحدود</Text>
          
          <Text>\n  - Búsqueda de apoyo</Text>
          <Text style={styles.arabicText}>  - البحث عن الدعم</Text>
          
          <Text>\n• Recursos de apoyo para cuidadores</Text>
          <Text style={styles.arabicText}>موارد الدعم لمقدمي الرعاية</Text>
        </Text>

        <Text style={styles.subsectionTitle}>RECURSOS COMUNITARIOS / الموارد المجتمعية</Text>
        <Text style={styles.textBlock}>
          <Text>• Centros de día y residencias</Text>
          <Text style={styles.arabicText}>مراكز النهار ودور الرعاية</Text>
          
          <Text>\n• Servicios de ayuda a domicilio</Text>
          <Text style={styles.arabicText}>خدمات المساعدة المنزلية</Text>
          
          <Text>\n• Programas de respiro familiar</Text>
          <Text style={styles.arabicText}>برامج الراحة للعائلات</Text>
          
          <Text>\n• Asociaciones de pacientes y familiares</Text>
          <Text style={styles.arabicText}>جمعيات المرضى والعائلات</Text>
          
          <Text>\n• Recursos económicos y ayudas</Text>
          <Text style={styles.arabicText}>الموارد المالية والمساعدات</Text>
          
          <Text>\n• Formación continua para cuidadores</Text>
          <Text style={styles.arabicText}>التدريب المستمر لمقدمي الرعاية</Text>
        </Text>

        <Text style={styles.sectionTitle}>📋 Recursos y Herramientas Prácticas / الموارد والأدوات العملية</Text>
        
        <Text style={styles.subsectionTitle}>TELÉFONOS Y CONTACTOS DE INTERÉS / أرقام هواتف واتصالات مهمة</Text>
        <Text style={styles.textBlock}>
          <Text>• Emergencias: 112 / الطوارئ</Text>
          <Text style={styles.arabicText}>• Emergencias: 112 / الطوارئ</Text>
          
          <Text>\n• Teléfono de la Esperanza: 717 003 717</Text>
          <Text style={styles.arabicText}>• هاتف الأمل: 717 003 717</Text>
          
          <Text>\n• Asociación de Familiares de Enfermos de Alzheimer: 915 533 041</Text>
          <Text style={styles.arabicText}>• جمعية أهالي مرضى الزهايمر: 915 533 041</Text>
          
          <Text>\n• Cruz Roja Mayores: 900 22 22 99</Text>
          <Text style={styles.arabicText}>• الصليب الأحمر لكبار السن: 900 22 22 99</Text>
          
          <Text>\n• IMSERSO: 901 16 65 65</Text>
          <Text style={styles.arabicText}>• المعهد الوطني للخدمات الاجتماعية: 901 16 65 65</Text>
          
          <Text>\n• Servicios Sociales Municipales: 010</Text>
          <Text style={styles.arabicText}>• الخدمات الاجتماعية البلدية: 010</Text>
          
          <Text>\n• Asociación Estatal de Enfermería Familiar y Comunitaria</Text>
          <Text style={styles.arabicText}>• الجمعية الوطنية للتمريض الأسري والمجتمعي</Text>
        </Text>

        <Text style={styles.subsectionTitle}>APLICACIONES ÚTILES / تطبيقات مفيدة</Text>
        <Text style={styles.textBlock}>
          <Text>• Recordatorio de medicación (Medisafe, MyTherapy)</Text>
          <Text style={styles.arabicText}>تذكير بالأدوية (Medisafe, MyTherapy)</Text>
          
          <Text>\n• Control de constantes vitales (Salud en Casa, Mi Salud)</Text>
          <Text style={styles.arabicText}>مراقبة العلامات الحيوية (الصحة في المنزل، صحتي)</Text>
          
          <Text>\n• Ejercicios de estimulación cognitiva (NeuronUP, Lumosity)</Text>
          <Text style={styles.arabicText}>تمارين التحفيز المعرفي (NeuronUP, Lumosity)</Text>
          
          <Text>\n• Localizadores GPS para personas con demencia</Text>
          <Text style={styles.arabicText}>أجهزة تتبع GPS لمرضى الخرف</Text>
          
          <Text>\n• Apps de teleasistencia y videollمكالمات</Text>
          <Text style={styles.arabicText}>تطبيقات المساعدة عن بُعد ومكالمات الفيديو</Text>
          
          <Text>\n• Calendarios y agendas digitales compartidas</Text>
          <Text style={styles.arabicText}>التقويمات والمفكرات الرقمية المشتركة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>MATERIAL IMPRESO RECOMENDADO / مواد مطبوعة موصى بها</Text>
        <Text style={styles.textBlock}>
          <Text>• Guía práctica para el cuidado de personas mayores dependientes</Text>
          <Text style={styles.arabicText}>دليل عملي لرعاية كبار السن المعتمدين على الآخرين</Text>
          
          <Text>\n• Manual de primeros auxilios para mayores</Text>
          <Text style={styles.arabicText}>كتيب الإسعافات الأولية لكبار السن</Text>
          
          <Text>\n• Cuaderno de seguimiento de salud</Text>
          <Text style={styles.arabicText}>دفتر متابعة الحالة الصحية</Text>
          
          <Text>\n• Guía de ejercicios de movilidad</Text>
          <Text style={styles.arabicText}>دليل تمارين الحركة</Text>
          
          <Text>\n• Recetario para dietas especiales</Text>
          <Text style={styles.arabicText}>كتاب وصفات للأنظمة الغذائية الخاصة</Text>
          
          <Text>\n• Agenda de contactos médicos y de emergencia</Text>
          <Text style={styles.arabicText}>مفكرة جهات اتصال طبية وطارئة</Text>
        </Text>

        <Text style={styles.subsectionTitle}>RECOMENDACIONES FINALES / توصيات ختامية</Text>
        <Text style={styles.textBlock}>
          <Text>• Mantener una actitud positiva y respetuosa</Text>
          <Text style={styles.arabicText}>الحفاظ على موقف إيجابي ومحترم</Text>
          
          <Text>\n• Fomentar la autonomía en la medida de lo posible</Text>
          <Text style={styles.arabicText}>تشجيع الاستقلالية قدر الإمكان</Text>
          
          <Text>\n• Establecer rutinas predecibles</Text>
          <Text style={styles.arabicText}>وضع روتينات يمكن التنبؤ بها</Text>
          
          <Text>\n• Adaptar el entorno a las necesidades cambiantes</Text>
          <Text style={styles.arabicText}>تكييف البيئة مع الاحتياجات المتغيرة</Text>
          
          <Text>\n• No descuidar la propia salud como cuidador</Text>
          <Text style={styles.arabicText}>عدم إهمال الصحة الشخصية كمقدم رعاية</Text>
          
          <Text>\n• Buscar apoyo cuando sea necesario</Text>
          <Text style={styles.arabicText}>اللجوء للدعم عند الحاجة</Text>
          
          <Text>\n• Mantenerse actualizado en técnicas de cuidado</Text>
          <Text style={styles.arabicText}>مواكبة أحدث تقنيات الرعاية</Text>
        </Text>

        <Text style={styles.subsectionTitle}>BIBLIOGRAFÍA RECOMENDADA / مراجع موصى بها</Text>
        <Text style={styles.textBlock}>
          <Text>• "Cuidar a los que cuidaron" - María Julia Añón</Text>
          <Text style={styles.arabicText}>• "رعاية من كانوا يرعوننا" - ماريا خوليا أنيون</Text>
          
          <Text>\n• "El arte de cuidar" - María Jesús Álava</Text>
          <Text style={styles.arabicText}>• "فن الرعاية" - ماريا خيسوس ألافا</Text>
          
          <Text>\n• "Manual para cuidadores de personas mayores" - IMSERSO</Text>
          <Text style={styles.arabicText}>• "دليل لمقدمي الرعاية لكبار السن" - معهد كبار السن والخدمات الاجتماعية</Text>
          
          <Text>\n• "El cuidador. Una guía práctica" - Sociedad Española de Geriatría</Text>
          <Text style={styles.arabicText}>• "مقدم الرعاية. دليل عملي" - الجمعية الإسبانية لطب الشيخوخة</Text>
          
          <Text>\n• "Cuidados paliativos en el domicilio" - SECPAL</Text>
          <Text style={styles.arabicText}>• "الرعاية التلطيفية في المنزل" - الجمعية الإسبانية للرعاية الملطفة</Text>
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
  bold: {
    fontWeight: 'bold',
    color: '#4A148C',
  },
  arabicText: {
    textAlign: 'right',
    color: '#E91E63',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 2,
    marginBottom: 8,
    fontFamily: 'sans-serif',
    writingDirection: 'rtl',
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
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#E1BEE7',
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#F3E5F5',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#BA68C8',
  },
  textBlock: {
    fontSize: 15,
    lineHeight: 24,
    color: '#424242',
    marginBottom: 12,
    textAlign: 'left',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    textAlignVertical: 'top',
  },
});
