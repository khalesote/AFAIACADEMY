import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoAgriculturaScreen() {
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
            <Text style={styles.headerTitle}>Curso de Agricultura</Text>
            <Text style={styles.headerTitleAr}>دورة الزراعة</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
        <Text style={styles.textBlock}>{`
1. Técnicas de cultivo ecológico y sostenible.
2. Uso y mantenimiento de herramientas agrícolas.
3. Siembra, riego y cuidado de diferentes cultivos.
4. Control ecológico de plagas y enfermedades.
5. Seguridad en el trabajo agrícola.
6. Gestión de invernaderos y cultivos protegidos.
7. Técnicas de poda y mantenimiento de plantas.
8. Preparación del suelo y fertilización orgánica.`}</Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 1: FUNDAMENTOS DE LA AGRICULTURA
- Tipos de suelo y su preparación
- Clima y estaciones de cultivo
- Herramientas básicas y su uso
- Seguridad en el trabajo agrícola

MÓDULO 2: TÉCNICAS DE CULTIVO
- Siembra directa y en semillero
- Riego por goteo y aspersión
- Control de malezas
- Rotación de cultivos

MÓDULO 3: PROTECCIÓN DE CULTIVOS
- Identificación de plagas comunes
- Control biológico de insectos
- Prevención de enfermedades
- Uso de productos ecológicos

MÓDULO 4: CULTIVOS ESPECÍFICOS
- Hortalizas de hoja (lechuga, espinaca)
- Hortalizas de fruto (tomate, pimiento)
- Cultivos de raíz (zanahoria, patata)
- Hierbas aromáticas

MÓDULO 5: GESTIÓN AVANZADA
- Invernaderos y cultivos protegidos
- Técnicas de poda y formación
- Fertilización orgánica
- Cosecha y post-cosecha`}</Text>

        <Text style={styles.sectionTitle}>🛠️ Herramientas Principales:</Text>
        <Text style={styles.textBlock}>{`- Azada / معول – Para cavar y preparar el suelo
- Pala / مجرفة – Para mover tierra y compost
- Rastrillo / مشط – Para nivelar y limpiar el suelo
- Tijeras de podar / مقص تقليم – Para podar plantas
- Manguera / خرطوم – Para riego manual
- Sistema de riego por goteo / نظام ري بالتنقيط
- Carretilla / عربة يدوية – Para transportar materiales
- Guantes / قفازات – Para protección personal`}</Text>

        <Text style={styles.sectionTitle}>🌱 Cultivos Principales:</Text>
        <Text style={styles.textBlock}>{`HORTALIZAS:
- Tomate / طماطم – Cultivo de verano, necesita sol
- Lechuga / خس – Cultivo de primavera/otoño
- Zanahoria / جزر – Cultivo de raíz, suelo suelto
- Pimiento / فلفل – Cultivo de verano, riego regular
- Pepino / خيار – Cultivo trepador, humedad alta

HIERBAS AROMÁTICAS:
- Albahaca / ريحان – Aroma intenso, sol directo
- Romero / إكليل الجبل – Resistente a sequía
- Menta / نعناع – Crecimiento rápido, sombra
- Perejil / بقدونس – Cultivo todo el año`}</Text>

        <Text style={styles.sectionTitle}>🐛 Control de Plagas Ecológico:</Text>
        <Text style={styles.textBlock}>{`PLAGAS COMUNES:
- Pulgones / المن – Control con agua jabonosa
- Caracoles / حلزون – Trampas con cerveza
- Orugas / ديدان – Bacillus thuringiensis
- Araña roja / العنكبوت الأحمر – Aumentar humedad

MÉTODOS ECOLÓGICOS:
- Plantas repelentes (albahaca, caléndula)
- Insectos beneficiosos (mariquitas, crisopas)
- Rotación de cultivos
- Barreras físicas (mallas)`}</Text>

        <Text style={styles.sectionTitle}>💧 Técnicas de Riego:</Text>
        <Text style={styles.textBlock}>{`RIEGO POR GOTEO:
- Ventajas: Ahorro de agua, precisión
- Instalación: Tuberías con goteros
- Programación: Según necesidades del cultivo

RIEGO POR ASPERSIÓN:
- Ventajas: Cobertura amplia
- Uso: Para cultivos de hoja
- Horario: Mañana o tarde

RIEGO MANUAL:
- Herramientas: Manguera, regadera
- Control: Directo del agricultor
- Frecuencia: Según clima y suelo`}</Text>

        <Text style={styles.sectionTitle}>🌿 Fertilización Orgánica:</Text>
        <Text style={styles.textBlock}>{`COMPOST:
- Materiales: Restos vegetales, estiércol
- Proceso: Descomposición natural
- Aplicación: Antes de la siembra

HUMUS DE LOMBRIZ:
- Ventajas: Rico en nutrientes
- Producción: Vermicompostaje
- Uso: Para plantas jóvenes

ABONOS VERDES:
- Plantas: Leguminosas (trébol, alfalfa)
- Función: Fijar nitrógeno en el suelo
- Incorporación: Antes de la floración`}</Text>

        <Text style={styles.sectionTitle}>📋 Calendario de Cultivos:</Text>
        <Text style={styles.textBlock}>{`PRIMAVERA (Marzo-Mayo):
- Siembra: Tomate, pimiento, pepino
- Trasplante: Plantas de semillero
- Preparación: Limpieza de invernaderos

VERANO (Junio-Agosto):
- Cuidado: Riego frecuente
- Control: Plagas y enfermedades
- Cosecha: Hortalizas de verano

OTOÑO (Septiembre-Noviembre):
- Siembra: Lechuga, espinaca, zanahoria
- Preparación: Abonado del suelo
- Limpieza: Restos de cultivos

INVIERNO (Diciembre-Febrero):
- Protección: Cultivos del frío
- Planificación: Rotación de cultivos
- Mantenimiento: Herramientas`}</Text>

        <Text style={styles.sectionTitle}>⚠️ Seguridad en el Trabajo:</Text>
        <Text style={styles.textBlock}>{`PROTECCIÓN PERSONAL:
- Guantes: Para manipular herramientas
- Botas: Impermeables y antideslizantes
- Gafas: Para trabajos con productos
- Mascarilla: Para aplicar tratamientos

NORMAS DE SEGURIDAD:
- Revisar herramientas antes de usar
- Mantener orden en el lugar de trabajo
- Usar escaleras seguras para poda
- Almacenar productos correctamente
- Conocer primeros auxilios básicos`}</Text>

        <Text style={styles.sectionTitle}>📊 Gestión de Calidad:</Text>
        <Text style={styles.textBlock}>{`CONTROL DE CALIDAD:
- Inspección regular de cultivos
- Registro de tratamientos aplicados
- Control de fechas de cosecha
- Verificación de condiciones de almacenamiento

CERTIFICACIÓN ECOLÓGICA:
- Cumplimiento de normativas
- Registro de prácticas agrícolas
- Trazabilidad de productos
- Auditorías periódicas`}</Text>

        <Text style={styles.sectionTitleAr}>📌 ماذا ستتعلم؟</Text>
        <Text style={styles.textBlockAr}>{`
1. تقنيات الزراعة البيئية والمستدامة.
2. استخدام وصيانة الأدوات الزراعية.
3. الزراعة والري ورعاية المحاصيل المختلفة.
4. المكافحة البيئية للآفات والأمراض.
5. السلامة في العمل الزراعي.
6. إدارة البيوت المحمية والمحاصيل المحمية.
7. تقنيات التقليم وصيانة النباتات.
8. تحضير التربة والتسميد العضوي.`}</Text>

        <Text style={styles.sectionTitleAr}>📚 وحدات الدورة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة الأولى: أساسيات الزراعة
- أنواع التربة وتحضيرها
- المناخ وفصول الزراعة
- الأدوات الأساسية واستخدامها
- السلامة في العمل الزراعي

الوحدة الثانية: تقنيات الزراعة
- الزراعة المباشرة وفي المشاتل
- الري بالتنقيط والرش
- مكافحة الأعشاب الضارة
- تناوب المحاصيل

الوحدة الثالثة: حماية المحاصيل
- تحديد الآفات الشائعة
- المكافحة البيولوجية للحشرات
- الوقاية من الأمراض
- استخدام المنتجات البيئية

الوحدة الرابعة: محاصيل محددة
- الخضروات الورقية (الخس، السبانخ)
- خضروات الثمار (الطماطم، الفلفل)
- محاصيل الجذور (الجزر، البطاطا)
- الأعشاب العطرية

الوحدة الخامسة: الإدارة المتقدمة
- البيوت المحمية والمحاصيل المحمية
- تقنيات التقليم والتشكيل
- التسميد العضوي
- الحصاد وما بعد الحصاد`}</Text>

        <Text style={styles.sectionTitleAr}>🛠️ الأدوات الرئيسية:</Text>
        <Text style={styles.textBlockAr}>{`- معول – للحفر وتحضير التربة
- مجرفة – لتحريك التربة والسماد
- مشط – لتسوية وتنظيف التربة
- مقص تقليم – لتقليم النباتات
- خرطوم – للري اليدوي
- نظام ري بالتنقيط
- عربة يدوية – لنقل المواد
- قفازات – للحماية الشخصية`}</Text>

        <Text style={styles.sectionTitleAr}>🌱 المحاصيل الرئيسية:</Text>
        <Text style={styles.textBlockAr}>{`الخضروات:
- طماطم – محصول صيفي، يحتاج الشمس
- خس – محصول ربيعي/خريفي
- جزر – محصول جذري، تربة رخوة
- فلفل – محصول صيفي، ري منتظم
- خيار – محصول متسلق، رطوبة عالية

الأعشاب العطرية:
- ريحان – رائحة قوية، شمس مباشرة
- إكليل الجبل – مقاوم للجفاف
- نعناع – نمو سريع، ظل
- بقدونس – محصول طوال السنة`}</Text>

        <Text style={styles.sectionTitleAr}>🐛 المكافحة البيئية للآفات:</Text>
        <Text style={styles.textBlockAr}>{`الآفات الشائعة:
- المن – مكافحة بالماء والصابون
- حلزون – مصائد بالبيرة
- ديدان – بكتيريا Bacillus thuringiensis
- العنكبوت الأحمر – زيادة الرطوبة

الطرق البيئية:
- نباتات طاردة (ريحان، آذريون)
- حشرات مفيدة (خنافس، أسد المن)
- تناوب المحاصيل
- حواجز فيزيائية (شبكات)`}</Text>

        <Text style={styles.sectionTitleAr}>💧 تقنيات الري:</Text>
        <Text style={styles.textBlockAr}>{`الري بالتنقيط:
- المزايا: توفير الماء، دقة
- التركيب: أنابيب مع نقاطات
- البرمجة: حسب احتياجات المحصول

الري بالرش:
- المزايا: تغطية واسعة
- الاستخدام: للمحاصيل الورقية
- التوقيت: صباحاً أو مساءً

الري اليدوي:
- الأدوات: خرطوم، إبريق
- التحكم: مباشر من المزارع
- التكرار: حسب المناخ والتربة`}</Text>

        <Text style={styles.sectionTitleAr}>🌿 التسميد العضوي:</Text>
        <Text style={styles.textBlockAr}>{`السماد العضوي:
- المواد: بقايا نباتية، روث
- العملية: تحلل طبيعي
- التطبيق: قبل الزراعة

سماد الديدان:
- المزايا: غني بالمغذيات
- الإنتاج: التسميد بالديدان
- الاستخدام: للنباتات الصغيرة

الأسمدة الخضراء:
- النباتات: بقوليات (برسيم، فصة)
- الوظيفة: تثبيت النيتروجين في التربة
- الدمج: قبل الإزهار`}</Text>

        <Text style={styles.sectionTitleAr}>📋 تقويم المحاصيل:</Text>
        <Text style={styles.textBlockAr}>{`الربيع (مارس-مايو):
- الزراعة: طماطم، فلفل، خيار
- النقل: نباتات المشاتل
- التحضير: تنظيف البيوت المحمية

الصيف (يونيو-أغسطس):
- العناية: ري متكرر
- المراقبة: الآفات والأمراض
- الحصاد: خضروات الصيف

الخريف (سبتمبر-نوفمبر):
- الزراعة: خس، سبانخ، جزر
- التحضير: تسميد التربة
- التنظيف: بقايا المحاصيل

الشتاء (ديسمبر-فبراير):
- الحماية: محاصيل من البرد
- التخطيط: تناوب المحاصيل
- الصيانة: الأدوات`}</Text>

        <Text style={styles.sectionTitleAr}>⚠️ السلامة في العمل:</Text>
        <Text style={styles.textBlockAr}>{`الحماية الشخصية:
- قفازات: لاستخدام الأدوات
- أحذية: مقاومة للماء والانزلاق
- نظارات: للأعمال مع المنتجات
- قناع: لتطبيق المعالجات

قواعد السلامة:
- فحص الأدوات قبل الاستخدام
- الحفاظ على النظام في مكان العمل
- استخدام سلالم آمنة للتقليم
- تخزين المنتجات بشكل صحيح
- معرفة الإسعافات الأولية الأساسية`}</Text>

        <Text style={styles.sectionTitleAr}>📊 إدارة الجودة:</Text>
        <Text style={styles.textBlockAr}>{`مراقبة الجودة:
- فحص منتظم للمحاصيل
- تسجيل المعالجات المطبقة
- مراقبة تواريخ الحصاد
- التحقق من ظروف التخزين

الشهادة البيئية:
- الامتثال للوائح
- تسجيل الممارسات الزراعية
- تتبع المنتجات
- تدقيق دوري`}</Text>

        <Text style={styles.sectionTitle}>🚀 MÓDULOS AVANZADOS:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 6: HIDROPONÍA BÁSICA
- Sistemas NFT (Nutrient Film Technique)
- Cultivo en sustratos (lana de roca, perlita)
- Soluciones nutritivas y pH
- Ventajas y desventajas de la hidroponía

MÓDULO 7: AGRICULTURA VERTICAL
- Estructuras verticales y sistemas de soporte
- Cultivo en torres y paredes verdes
- Optimización del espacio urbano
- Tecnologías de iluminación LED

MÓDULO 8: AGRICULTURA DE PRECISIÓN
- Sensores de humedad y temperatura
- Sistemas de riego automatizado
- Drones para monitoreo de cultivos
- Análisis de datos y toma de decisiones

MÓDULO 9: AGRICULTURA URBANA
- Huertos en balcones y terrazas
- Compostaje urbano
- Cultivo en contenedores
- Comunidades de agricultores urbanos`}</Text>

        <Text style={styles.sectionTitle}>📖 GUÍAS PRÁCTICAS PASO A PASO:</Text>
        <Text style={styles.textBlock}>{`GUÍA 1: CREAR UN HUERTO DESDE CERO
Paso 1: Selección del sitio
- Evaluar exposición solar (mínimo 6 horas)
- Verificar drenaje del suelo
- Medir pH del suelo (6.0-7.0 ideal)

Paso 2: Preparación del terreno
- Limpiar malezas y escombros
- Labrar el suelo a 30cm de profundidad
- Incorporar compost (5kg/m²)

Paso 3: Diseño del huerto
- Crear caminos de acceso
- Dividir en parcelas de 1.2m de ancho
- Instalar sistema de riego

Paso 4: Primera siembra
- Elegir cultivos de temporada
- Seguir calendario de siembra
- Etiquetar cada parcela

GUÍA 2: CONSTRUIR UN INVERNADERO CASERO
Materiales necesarios:
- Tubos de PVC o madera
- Plástico transparente UV
- Tornillos y conectores
- Ventiladores y extractores

Proceso de construcción:
1. Preparar base nivelada
2. Instalar estructura metálica
3. Cubrir con plástico
4. Instalar sistema de ventilación
5. Configurar riego automático`}</Text>

        <Text style={styles.sectionTitle}>🎥 RECURSOS MULTIMEDIA:</Text>
        <Text style={styles.textBlock}>{`VIDEOS EDUCATIVOS:
- Técnicas de siembra y trasplante
- Identificación de plagas y enfermedades
- Construcción de sistemas de riego
- Mantenimiento de herramientas

APLICACIONES ÚTILES:
- PlantNet: Identificación de plantas
- Garden Compass: Guía de cultivos
- Smart Irrigation: Control de riego
- Agrobase: Base de datos agrícola

PÁGINAS WEB RECOMENDADAS:
- FAO (Organización de las Naciones Unidas)
- Ministerio de Agricultura local
- Universidades con programas agrícolas
- Asociaciones de agricultores ecológicos

PODCASTS Y CANALES:
- "Agricultura Regenerativa"
- "Huerto Urbano"
- "Agricultura Sostenible"
- "Técnicas Agrícolas Modernas"`}</Text>

        <Text style={styles.sectionTitle}>📋 EVALUACIONES Y CERTIFICACIONES:</Text>
        <Text style={styles.textBlock}>{`EVALUACIONES POR MÓDULO:
- Test teórico (20 preguntas)
- Práctica supervisada
- Proyecto final de aplicación
- Evaluación continua

CERTIFICACIONES DISPONIBLES:
- Técnico en Agricultura Ecológica
- Especialista en Hidroponía
- Gestor de Invernaderos
- Consultor Agrícola Urbano

PROCESO DE CERTIFICACIÓN:
1. Completar todos los módulos
2. Aprobar evaluaciones con 80% mínimo
3. Realizar prácticas en campo
4. Presentar proyecto final
5. Recibir certificado oficial

BENEFICIOS DE LA CERTIFICACIÓN:
- Mejores oportunidades laborales
- Mayor credibilidad profesional
- Acceso a redes de agricultores
- Posibilidad de enseñanza`}</Text>

        <Text style={styles.sectionTitle}>💼 MERCADO LABORAL Y EMPRENDIMIENTO:</Text>
        <Text style={styles.textBlock}>{`OPORTUNIDADES LABORALES:
- Técnico agrícola en empresas
- Gestor de invernaderos comerciales
- Consultor en agricultura urbana
- Instructor de cursos agrícolas
- Vendedor de productos agrícolas

IDEAS DE EMPRENDIMIENTO:
1. Servicio de instalación de huertos urbanos
2. Venta de productos orgánicos
3. Consultoría agrícola especializada
4. Talleres y cursos de agricultura
5. Venta de herramientas y equipos

PLAN DE NEGOCIO BÁSICO:
- Análisis de mercado local
- Identificación de competencia
- Definición de servicios/productos
- Estructura de costos y precios
- Estrategia de marketing

FINANCIAMIENTO DISPONIBLE:
- Microcréditos para emprendedores
- Subsidios para agricultura ecológica
- Programas de apoyo a jóvenes agricultores
- Fondos para innovación agrícola`}</Text>

        <Text style={styles.sectionTitle}>🌍 AGRICULTURA SOSTENIBLE Y CAMBIO CLIMÁTICO:</Text>
        <Text style={styles.textBlock}>{`IMPACTO DEL CAMBIO CLIMÁTICO:
- Alteración de temporadas de cultivo
- Aumento de plagas y enfermedades
- Escasez de agua en algunas regiones
- Eventos climáticos extremos

ADAPTACIÓN AGRÍCOLA:
- Cultivos resistentes a sequía
- Sistemas de riego eficientes
- Rotación de cultivos mejorada
- Uso de variedades locales

MITIGACIÓN DEL CAMBIO CLIMÁTICO:
- Secuestro de carbono en suelos
- Reducción de emisiones de CO2
- Uso de energías renovables
- Agricultura de conservación

TÉCNICAS REGENERATIVAS:
- Agricultura sin labranza
- Cultivos de cobertura
- Integración ganadería-agricultura
- Agroforestería`}</Text>

        <Text style={styles.sectionTitle}>🔬 INVESTIGACIÓN E INNOVACIÓN:</Text>
        <Text style={styles.textBlock}>{`TENDENCIAS ACTUALES:
- Agricultura inteligente (Smart Farming)
- Biotecnología agrícola
- Agricultura vertical automatizada
- Cultivos transgénicos resistentes

INVESTIGACIONES EN CURSO:
- Nuevas variedades de cultivos
- Sistemas de riego inteligente
- Control biológico de plagas
- Mejora de suelos degradados

OPORTUNIDADES DE INVESTIGACIÓN:
- Colaboración con universidades
- Participación en proyectos piloto
- Pruebas de nuevas tecnologías
- Publicación de resultados

RECURSOS PARA INVESTIGACIÓN:
- Bibliotecas especializadas
- Bases de datos científicas
- Revistas agrícolas
- Conferencias y seminarios`}</Text>

        <Text style={styles.sectionTitle}>🤝 REDES Y COMUNIDADES:</Text>
        <Text style={styles.textBlock}>{`ASOCIACIONES PROFESIONALES:
- Asociación de Agricultores Ecológicos
- Red de Agricultores Urbanos
- Sociedad de Técnicos Agrícolas
- Federación de Cooperativas Agrícolas

EVENTOS Y FERIAS:
- Ferias agrícolas anuales
- Exposiciones de maquinaria
- Seminarios de innovación
- Días de campo demostrativos

PLATAFORMAS DIGITALES:
- Foros de discusión agrícola
- Grupos de واتساب especializados
- Redes sociales profesionales
- Plataformas de e-learning

MENTORÍA Y TUTORÍA:
- Programa de mentores experimentados
- Tutorías personalizadas
- Grupos de estudio
- Seguimiento post-curso`}</Text>

        <Text style={styles.sectionTitleAr}>🚀 الوحدات المتقدمة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة السادسة: الزراعة المائية الأساسية
- أنظمة NFT (تقنية الفيلم المغذي)
- الزراعة في الركائز (صوف صخري، بيرلايت)
- المحاليل المغذية ودرجة الحموضة
- مزايا وعيوب الزراعة المائية

الوحدة السابعة: الزراعة العمودية
- الهياكل العمودية وأنظمة الدعم
- الزراعة في الأبراج والجدران الخضراء
- تحسين المساحة الحضرية
- تقنيات الإضاءة LED

الوحدة الثامنة: الزراعة الدقيقة
- أجهزة استشعار الرطوبة ودرجة الحرارة
- أنظمة الري الآلي
- الطائرات بدون طيار لمراقبة المحاصيل
- تحليل البيانات واتخاذ القرارات

الوحدة التاسعة: الزراعة الحضرية
- حدائق في الشرفات والتراسات
- التسميد الحضري
- الزراعة في الحاويات
- مجتمعات المزارعين الحضريين`}</Text>

        <Text style={styles.sectionTitleAr}>📖 أدلة عملية خطوة بخطوة:</Text>
        <Text style={styles.textBlockAr}>{`الدليل الأول: إنشاء حديقة من الصفر
الخطوة الأولى: اختيار الموقع
- تقييم التعرض للشمس (6 ساعات على الأقل)
- التحقق من تصريف التربة
- قياس درجة حموضة التربة (6.0-7.0 مثالية)

الخطوة الثانية: تحضير الأرض
- تنظيف الأعشاب والحطام
- حراثة التربة بعمق 30 سم
- دمج السماد العضوي (5 كجم/م²)

الخطوة الثالثة: تصميم الحديقة
- إنشاء مسارات للوصول
- تقسيم إلى قطع عرضها 1.2 متر
- تركيب نظام الري

الخطوة الرابعة: الزراعة الأولى
- اختيار محاصيل الموسم
- اتباع تقويم الزراعة
- وضع علامات على كل قطعة

الدليل الثاني: بناء بيت محمي منزلي
المواد المطلوبة:
- أنابيب PVC أو خشب
- بلاستيك شفاف مقاوم للأشعة فوق البنفسجية
- مسامير وموصلات
- مراوح ومستخرجات

عملية البناء:
1. تحضير قاعدة مستوية
2. تركيب الهيكل المعدني
3. تغطية بالبلاستيك
4. تركيب نظام التهوية
5. ضبط الري الآلي`}</Text>

        <Text style={styles.sectionTitleAr}>🎥 الموارد المتعددة الوسائط:</Text>
        <Text style={styles.textBlockAr}>{`الفيديوهات التعليمية:
- تقنيات الزراعة والنقل
- تحديد الآفات والأمراض
- بناء أنظمة الري
- صيانة الأدوات

التطبيقات المفيدة:
- PlantNet: تحديد النباتات
- Garden Compass: دليل المحاصيل
- Smart Irrigation: التحكم في الري
- Agrobase: قاعدة بيانات زراعية

المواقع الإلكترونية الموصى بها:
- منظمة الأغذية والزراعة (FAO)
- وزارة الزراعة المحلية
- الجامعات مع برامج زراعية
- جمعيات المزارعين البيئيين

البودكاست والقنوات:
- "الزراعة المتجددة"
- "الحديقة الحضرية"
- "الزراعة المستدامة"
- "التقنيات الزراعية الحديثة"`}</Text>

        <Text style={styles.sectionTitleAr}>📋 التقييمات والشهادات:</Text>
        <Text style={styles.textBlockAr}>{`التقييمات لكل وحدة:
- اختبار نظري (20 سؤال)
- ممارسة تحت الإشراف
- مشروع نهائي تطبيقي
- تقييم مستمر

الشهادات المتاحة:
- فني في الزراعة البيئية
- متخصص في الزراعة المائية
- مدير البيوت المحمية
- مستشار الزراعة الحضرية

عملية الحصول على الشهادة:
1. إكمال جميع الوحدات
2. اجتياز التقييمات بنسبة 80% على الأقل
3. إجراء الممارسات في الميدان
4. تقديم المشروع النهائي
5. الحصول على الشهادة الرسمية

مزايا الشهادة:
- فرص عمل أفضل
- مصداقية مهنية أكبر
- الوصول إلى شبكات المزارعين
- إمكانية التدريس`}</Text>

        <Text style={styles.sectionTitleAr}>💼 سوق العمل وريادة الأعمال:</Text>
        <Text style={styles.textBlockAr}>{`فرص العمل:
- فني زراعي في الشركات
- مدير البيوت المحمية التجارية
- مستشار في الزراعة الحضرية
- مدرب دورات زراعية
- بائع المنتجات الزراعية

أفكار ريادة الأعمال:
1. خدمة تركيب الحدائق الحضرية
2. بيع المنتجات العضوية
3. استشارات زراعية متخصصة
4. ورش عمل ودورات زراعية
5. بيع الأدوات والمعدات

خطة عمل أساسية:
- تحليل السوق المحلي
- تحديد المنافسة
- تعريف الخدمات/المنتجات
- هيكل التكاليف والأسعار
- استراتيجية التسويق

التمويل المتاح:
- قروض صغيرة للمشاريع
- إعانات للزراعة البيئية
- برامج دعم المزارعين الشباب
- أموال للابتكار الزراعي`}</Text>

        <Text style={styles.sectionTitleAr}>🌍 الزراعة المستدامة وتغير المناخ:</Text>
        <Text style={styles.textBlockAr}>{`تأثير تغير المناخ:
- تغيير مواسم الزراعة
- زيادة الآفات والأمراض
- ندرة المياه في بعض المناطق
- أحداث مناخية متطرفة

التكيف الزراعي:
- محاصيل مقاومة للجفاف
- أنظمة ري فعالة
- تحسين تناوب المحاصيل
- استخدام الأصناف المحلية

التخفيف من تغير المناخ:
- عزل الكربون في التربة
- تقليل انبعاثات CO2
- استخدام الطاقات المتجددة
- الزراعة الحافظة

التقنيات المتجددة:
- الزراعة بدون حراثة
- محاصيل الغطاء
- تكامل الثروة الحيوانية والزراعة
- الزراعة الحراجية`}</Text>

        <Text style={styles.sectionTitleAr}>🔬 البحث والابتكار:</Text>
        <Text style={styles.textBlockAr}>{`الاتجاهات الحالية:
- الزراعة الذكية (Smart Farming)
- التكنولوجيا الحيوية الزراعية
- الزراعة العمودية الآلية
- المحاصيل المعدلة وراثياً المقاومة

البحوث الجارية:
- أصناف جديدة من المحاصيل
- أنظمة ري ذكية
- المكافحة البيولوجية للآفات
- تحسين التربة المتدهورة

فرص البحث:
- التعاون مع الجامعات
- المشاركة في المشاريع التجريبية
- اختبار التقنيات الجديدة
- نشر النتائج

موارد البحث:
- مكتبات متخصصة
- قواعد البيانات العلمية
- المجلات الزراعية
- المؤتمرات والندوات`}</Text>

        <Text style={styles.sectionTitleAr}>🤝 الشبكات والمجتمعات:</Text>
        <Text style={styles.textBlockAr}>{`الجمعيات المهنية:
- جمعية المزارعين البيئيين
- شبكة المزارعين الحضريين
- جمعية الفنيين الزراعيين
- اتحاد التعاونيات الزراعية

الفعاليات والمعارض:
- المعارض الزراعية السنوية
- معارض الآلات الزراعية
- ندوات الابتكار
- أيام الحقل التوضيحية

المنصات الرقمية:
- منتديات النقاش الزراعي
- مجموعات واتساب متخصصة
- الشبكات الاجتماعية المهنية
- منصات التعلم الإلكتروني

التوجيه والتدريس:
- برنامج مرشدين ذوي خبرة
- دروس خصوصية
- مجموعات الدراسة
- المتابعة بعد الدورة`}</Text>
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
