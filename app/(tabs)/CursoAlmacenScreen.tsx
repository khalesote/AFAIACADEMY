import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoAlmacenScreen() {
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
            <Text style={styles.headerTitle}>Curso de Almacén</Text>
            <Text style={styles.headerTitleAr}>دورة المستودع</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
        <Text style={styles.textBlock}>{`
1. Gestión integral de inventarios y control de stock.
2. Organización eficiente de productos y sistemas de ubicación.
3. Operación y mantenimiento de equipos de almacén.
4. Control de entrada y salida con sistemas informatizados.
5. Seguridad laboral y prevención de riesgos.
6. Gestión de calidad y trazabilidad de productos.
7. Optimización de espacios y flujos de trabajo.
8. Gestión de proveedores y cadena de suministro.
9. Sistemas de picking y preparación de pedidos.
10. Gestión de devoluciones y productos defectuosos.`}</Text>

        <Text style={styles.sectionTitle}>📚 MÓDULOS DEL CURSO:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 1: FUNDAMENTOS DE GESTIÓN DE ALMACÉN
- Tipos de almacenes y sus funciones
- Estructura organizativa del almacén
- Documentación básica (albaranes, facturas)
- Normativas de seguridad y calidad
- Sistemas de codificación de productos

MÓDULO 2: GESTIÓN DE INVENTARIOS
- Métodos de valoración de inventarios (FIFO, LIFO, PMP)
- Control de stock mínimo y máximo
- Rotación de inventarios
- Inventarios físicos y cíclicos
- Gestión de productos perecederos

MÓDULO 3: ORGANIZACIÓN Y UBICACIÓN
- Sistemas de ubicación (aleatorio, fijo, ABC)
- Zonificación del almacén
- Optimización de espacios
- Gestión de pasillos y accesos
- Sistemas de identificación visual

MÓDULO 4: EQUIPOS Y MAQUINARIA
- Carretillas elevadoras (tipos y usos)
- Transpaletas manuales y eléctricas
- Estanterías y sistemas de almacenamiento
- Equipos de embalaje y etiquetado
- Mantenimiento preventivo

MÓDULO 5: OPERACIONES DE ALMACÉN
- Recepción de mercancías
- Almacenamiento y ubicación
- Picking y preparación de pedidos
- Expedición y carga
- Gestión de devoluciones

MÓDULO 6: SISTEMAS INFORMÁTICOS
- Software de gestión de almacén (WMS)
- Códigos de barras y RFID
- Terminales de radiofrecuencia
- Integración con ERP
- Reportes y análisis de datos

MÓDULO 7: SEGURIDAD Y CALIDAD
- Prevención de riesgos laborales
- Gestión de productos peligrosos
- Control de calidad en almacén
- Trazabilidad de productos
- Auditorías de almacén

MÓDULO 8: GESTIÓN AVANZADA
- Lean Warehousing
- Cross-docking
- Gestión de proveedores
- KPIs de almacén
- Optimización de costos`}</Text>

        <Text style={styles.sectionTitle}>🛠️ EQUIPOS PRINCIPALES:</Text>
        <Text style={styles.textBlock}>{`CARETILLAS ELEVADORAS:
- Contrapesada: Para cargas pesadas y alturas medias
- Retráctil: Para pasillos estrechos
- Apiladora: Para alturas elevadas
- Lateral: Para cargas largas
- Telescópica: Para alcances largos

TRANSPALETAS:
- Manual: Para cargas ligeras y cortas distancias
- Eléctrica: Para mayor comodidad y eficiencia
- Semieléctrica: Compromiso entre manual y eléctrica

SISTEMAS DE ALMACENAJE:
- Estanterías selectivas: Acceso directo a cada paleta
- Estanterías compactas: Máximo aprovechamiento del espacio
- Estanterías móviles: Espacios reducidos
- Estanterías cantilever: Para cargas largas
- Estanterías para cajas: Productos pequeños

EQUIPOS AUXILIARES:
- Escaleras de mano y plataformas
- Carros y carretillas manuales
- Equipos de embalaje y etiquetado
- Sistemas de pesaje
- Equipos de limpieza`}</Text>

        <Text style={styles.sectionTitle}>📦 TIPOS DE PRODUCTOS Y ALMACENAJE:</Text>
        <Text style={styles.textBlock}>{`PRODUCTOS SECOS:
- Características: No perecederos, larga duración
- Almacenamiento: Estanterías convencionales
- Control: Inventarios cíclicos
- Ejemplos: Electrónicos, ropa, libros

PRODUCTOS REFRIGERADOS:
- Características: Temperatura controlada (2-8°C)
- Almacenamiento: Cámaras frigoríficas
- Control: Monitoreo continuo de temperatura
- Ejemplos: Lácteos, carnes, medicamentos

PRODUCTOS CONGELADOS:
- Características: Temperatura bajo cero (-18°C)
- Almacenamiento: Túneles de congelación
- Control: Sistema de alarma de temperatura
- Ejemplos: Helados, pescados, verduras

PRODUCTOS PELIGROSOS:
- Características: Inflamables, tóxicos, corrosivos
- Almacenamiento: Zonas especiales con ventilación
- Control: Documentación específica y formación
- Ejemplos: Productos químicos, baterías

PRODUCTOS DE ALTO VALOR:
- Características: Robo, deterioro, obsolescencia
- Almacenamiento: Zonas de seguridad
- Control: Acceso restringido y CCTV
- Ejemplos: Joyas, electrónicos, medicamentos`}</Text>

        <Text style={styles.sectionTitle}>📊 SISTEMAS DE GESTIÓN:</Text>
        <Text style={styles.textBlock}>{`MÉTODOS DE VALORACIÓN:
FIFO (First In, First Out):
- Ventajas: Rotación natural, menor obsolescencia
- Uso: Productos perecederos, moda
- Control: Identificación por lotes

LIFO (Last In, First Out):
- Ventajas: Costos actualizados
- Uso: Productos no perecederos
- Control: Gestión de precios

PMP (Precio Medio Ponderado):
- Ventajas: Costo promedio estable
- Uso: Productos homogéneos
- Control: Cálculo automático

SISTEMAS DE UBICACIÓN:
Aleatorio:
- Ventajas: Flexibilidad total
- Desventajas: Dificultad de localización
- Uso: Almacenes pequeños

Fijo:
- Ventajas: Localización rápida
- Desventajas: Espacio no optimizado
- Uso: Productos de alta rotación

ABC:
- A: Productos de alto valor (20% productos, 80% valor)
- B: Productos de valor medio (30% productos, 15% valor)
- C: Productos de bajo valor (50% productos, 5% valor)`}</Text>

        <Text style={styles.sectionTitle}>🔍 OPERACIONES DETALLADAS:</Text>
        <Text style={styles.textBlock}>{`RECEPCIÓN DE MERCANCÍAS:
1. Verificación de documentación
2. Inspección visual de mercancía
3. Conteo y pesaje
4. Control de calidad básico
5. Asignación de ubicación
6. Registro en sistema

ALMACENAMIENTO:
1. Análisis de características del producto
2. Selección de ubicación óptima
3. Aplicación de etiquetas
4. Registro en sistema
5. Actualización de inventario

PICKING (PREPARACIÓN DE PEDIDOS):
1. Recepción de orden de picking
2. Planificación de ruta
3. Recogida de productos
4. Verificación de cantidades
5. Empaquetado
6. Etiquetado para expedición

EXPEDICIÓN:
1. Consolidación de pedidos
2. Verificación final
3. Carga en vehículo
4. Generación de documentación
5. Registro de salida

GESTIÓN DE DEVOLUCIONES:
1. Recepción de devolución
2. Inspección de estado
3. Clasificación (reparable, scrap, reventa)
4. Proceso según clasificación
5. Actualización de inventario`}</Text>

        <Text style={styles.sectionTitle}>💻 TECNOLOGÍAS DE ALMACÉN:</Text>
        <Text style={styles.textBlock}>{`SISTEMAS WMS (WAREHOUSE MANAGEMENT SYSTEM):
Funcionalidades principales:
- Gestión de ubicaciones
- Control de inventarios
- Gestión de picking
- Integración con ERP
- Reportes y análisis

CÓDIGOS DE BARRAS:
- Código EAN-13: Productos de consumo
- Código Code 128: Logística interna
- Código QR: Información ampliada
- Código DataMatrix: Espacios reducidos

RFID (RADIO FREQUENCY IDENTIFICATION):
- Ventajas: Lectura sin contacto, múltiples lecturas
- Aplicaciones: Control de acceso, tracking
- Limitaciones: Costo, interferencias

TERMINALES DE RADIOFRECUENCIA:
- Funciones: Picking, recepción, inventarios
- Ventajas: Tiempo real, precisión
- Características: Resistente, batería larga duración

AUTOMATIZACIÓN:
- Transportadores automáticos
- Sistemas de clasificación
- Robots de picking
- Almacenes automáticos (AS/RS)`}</Text>

        <Text style={styles.sectionTitle}>⚠️ SEGURIDAD Y PREVENCIÓN:</Text>
        <Text style={styles.textBlock}>{`RIESGOS LABORALES:
Riesgos físicos:
- Caídas desde altura
- Golpes por objetos
- Atrapamientos
- Sobreesfuerzos

Riesgos químicos:
- Exposición a productos tóxicos
- Inhalación de vapores
- Contacto con sustancias corrosivas

Riesgos ergonómicos:
- Manipulación manual de cargas
- Posturas forzadas
- Movimientos repetitivos

MEDIDAS PREVENTIVAS:
Equipos de protección individual:
- Casco: Protección de cabeza
- Calzado de seguridad: Protección de pies
- Guantes: Protección de manos
- Gafas: Protección ocular
- Ropa de trabajo: Protección corporal

Normas de seguridad:
- Formación obligatoria en equipos
- Mantenimiento preventivo
- Señalización clara
- Procedimientos de emergencia
- Revisiones médicas periódicas`}</Text>

        <Text style={styles.sectionTitle}>📈 KPIs Y MÉTRICAS:</Text>
        <Text style={styles.textBlock}>{`INDICADORES DE PRODUCTIVIDAD:
- Picking rate: Líneas por hora
- Receiving rate: Paletas por hora
- Shipping rate: Pedidos por hora
- Inventory accuracy: Precisión del inventario
- Space utilization: Utilización del espacio

INDICADORES DE CALIDAD:
- Order accuracy: Precisión de pedidos
- Damage rate: Tasa de daños
- Return rate: Tasa de devoluciones
- Customer satisfaction: Satisfacción del cliente
- On-time delivery: Entrega a tiempo

INDICADORES DE COSTOS:
- Cost per order: Costo por pedido
- Cost per line: Costo por línea
- Labor cost: Costo de mano de obra
- Equipment utilization: Utilización de equipos
- Storage cost: Costo de almacenamiento

BENCHMARKING:
- Comparación con estándares del sector
- Análisis de tendencias
- Identificación de oportunidades
- Establecimiento de objetivos
- Seguimiento de mejoras`}</Text>

        <Text style={styles.sectionTitle}>🚀 TÉCNICAS AVANZADAS:</Text>
        <Text style={styles.textBlock}>{`LEAN WAREHOUSING:
Principios:
- Eliminación de desperdicios
- Flujo continuo
- Pull system (sistema de arrastre)
- Mejora continua
- Estandarización

Herramientas:
- 5S (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)
- Value Stream Mapping
- Kanban
- Poka-yoke (a prueba de errores)

CROSS-DOCKING:
Definición: Transferencia directa sin almacenamiento
Tipos:
- Pre-distribution: Clasificación previa
- Post-distribution: Clasificación posterior
- Flow-through: Flujo continuo

Ventajas:
- Reducción de inventarios
- Menor tiempo de entrega
- Menor costo de almacenamiento
- Mayor rotación

GESTIÓN DE PROVEEDORES:
- Evaluación de proveedores
- Negociación de condiciones
- Seguimiento de entregas
- Gestión de incidencias
- Desarrollo de proveedores`}</Text>

        <Text style={styles.sectionTitle}>📖 GUÍAS PRÁCTICAS:</Text>
        <Text style={styles.textBlock}>{`GUÍA 1: IMPLEMENTAR SISTEMA 5S
Seiri (Clasificar):
- Separar lo necesario de lo innecesario
- Etiquetar elementos dudosos
- Eliminar elementos innecesarios

Seiton (Ordenar):
- Organizar elementos necesarios
- Establecer ubicaciones fijas
- Crear sistema de identificación

Seiso (Limpiar):
- Mantener limpieza constante
- Identificar fuentes de suciedad
- Establecer estándares de limpieza

Seiketsu (Estandarizar):
- Crear procedimientos estándar
- Documentar mejores prácticas
- Capacitar al personal

Shitsuke (Disciplina):
- Seguimiento continuo
- Auditorías regulares
- Reconocimiento de logros

GUÍA 2: OPTIMIZAR PICKING
Estrategias:
- Picking por zonas
- Picking por lotes
- Picking por oleadas
- Picking por voz

Mejores prácticas:
- Organizar productos por frecuencia
- Minimizar distancias de recorrido
- Usar equipos adecuados
- Capacitar operadores`}</Text>

        <Text style={styles.sectionTitle}>🎥 RECURSOS MULTIMEDIA:</Text>
        <Text style={styles.textBlock}>{`VIDEOS EDUCATIVOS:
- Operación de carretillas elevadoras
- Técnicas de picking eficiente
- Mantenimiento de equipos
- Procedimientos de seguridad

APLICACIONES ÚTILES:
- WMS móvil para picking
- Calculadora de capacidad de carga
- Gestor de inventarios
- Scanner de códigos de barras

PÁGINAS WEB RECOMENDADAS:
- Asociaciones de logística
- Fabricantes de equipos
- Revistas especializadas
- Plataformas de formación

PODCASTS Y CANALES:
- "Logística y Supply Chain"
- "Warehouse Management"
- "Operaciones Logísticas"
- "Tecnología en Almacenes"`}</Text>

        <Text style={styles.sectionTitle}>📋 CERTIFICACIONES:</Text>
        <Text style={styles.textBlock}>{`CERTIFICACIONES DISPONIBLES:
- Operador de carretillas elevadoras
- Gestor de almacén certificado
- Auditor de calidad en almacén
- Especialista en WMS

PROCESO DE CERTIFICACIÓN:
1. Formación teórica y práctica
2. Evaluación de competencias
3. Examen teórico
4. Prueba práctica
5. Emisión de certificado

BENEFICIOS:
- Mayor empleabilidad
- Mejores salarios
- Reconocimiento profesional
- Desarrollo de carrera`}</Text>

        <Text style={styles.sectionTitle}>💼 OPORTUNIDADES LABORALES:</Text>
        <Text style={styles.textBlock}>{`PUESTOS DISPONIBLES:
- Operador de almacén
- Supervisor de almacén
- Gestor de inventarios
- Coordinador de picking
- Responsable de recepción
- Técnico de equipos
- Analista de datos
- Jefe de almacén

SECTORES DE EMPLEO:
- E-commerce y retail
- Industria manufacturera
- Logística y transporte
- Distribución farmacéutica
- Alimentación y bebidas
- Automoción
- Textil y moda

SALARIOS PROMEDIO:
- Operador: 18,000-25,000€/año
- Supervisor: 25,000-35,000€/año
- Gestor: 35,000-50,000€/año
- Jefe: 45,000-70,000€/año`}</Text>

        <Text style={styles.sectionTitleAr}>📌 ماذا ستتعلم؟</Text>
        <Text style={styles.textBlockAr}>{`
1. إدارة شاملة للمخزون ومراقبة الموجودات.
2. تنظيم فعال للمنتجات وأنظمة الموقع.
3. تشغيل وصيانة معدات المستودع.
4. مراقبة الدخول والخروج مع الأنظمة المحوسبة.
5. السلامة المهنية والوقاية من المخاطر.
6. إدارة الجودة وتتبع المنتجات.
7. تحسين المساحات وتدفقات العمل.
8. إدارة الموردين وسلسلة التوريد.
9. أنظمة الجمع وإعداد الطلبات.
10. إدارة المرتجعات والمنتجات المعيبة.`}</Text>

        <Text style={styles.sectionTitleAr}>📚 وحدات الدورة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة الأولى: أساسيات إدارة المستودع
- أنواع المستودعات ووظائفها
- الهيكل التنظيمي للمستودع
- الوثائق الأساسية (إيصالات، فواتير)
- لوائح السلامة والجودة
- أنظمة ترميز المنتجات

الوحدة الثانية: إدارة المخزون
- طرق تقييم المخزون (FIFO، LIFO، PMP)
- مراقبة الحد الأدنى والأقصى للمخزون
- دوران المخزون
- الجرد الفعلي والدوري
- إدارة المنتجات القابلة للتلف

الوحدة الثالثة: التنظيم والموقع
- أنظمة الموقع (عشوائي، ثابت، ABC)
- تقسيم المستودع إلى مناطق
- تحسين المساحات
- إدارة الممرات والمداخل
- أنظمة التعريف البصري

الوحدة الرابعة: المعدات والآلات
- الرافعات الشوكية (أنواعها واستخداماتها)
- الرافعات اليدوية والكهربائية
- الرفوف وأنظمة التخزين
- معدات التغليف والوسم
- الصيانة الوقائية

الوحدة الخامسة: عمليات المستودع
- استلام البضائع
- التخزين والموقع
- الجمع وإعداد الطلبات
- الشحن والتحميل
- إدارة المرتجعات

الوحدة السادسة: الأنظمة المحوسبة
- برامج إدارة المستودع (WMS)
- الرموز الشريطية وRFID
- أجهزة الراديو
- التكامل مع ERP
- التقارير وتحليل البيانات

الوحدة السابعة: السلامة والجودة
- الوقاية من المخاطر المهنية
- إدارة المنتجات الخطرة
- مراقبة الجودة في المستودع
- تتبع المنتجات
- تدقيق المستودع

الوحدة الثامنة: الإدارة المتقدمة
- المستودع الرشيق
- التبادل المباشر
- إدارة الموردين
- مؤشرات الأداء الرئيسية
- تحسين التكاليف`}</Text>

        <Text style={styles.sectionTitleAr}>🛠️ المعدات الرئيسية:</Text>
        <Text style={styles.textBlockAr}>{`الرافعات الشوكية:
- موازنة خلفية: للحملات الثقيلة والارتفاعات المتوسطة
- قابلة للانكماش: للممرات الضيقة
- مكدسة: للارتفاعات العالية
- جانبية: للحملات الطويلة
- تلسكوبية: للوصول الطويل

الرافعات:
- يدوية: للحملات الخفيفة والمسافات القصيرة
- كهربائية: لراحة وكفاءة أكبر
- شبه كهربائية: حل وسط بين اليدوية والكهربائية

أنظمة التخزين:
- رفوف انتقائية: وصول مباشر لكل منصة
- رفوف مدمجة: الاستفادة القصوى من المساحة
- رفوف متحركة: مساحات محدودة
- رفوف كابولي: للحملات الطويلة
- رفوف للصناديق: منتجات صغيرة

المعدات المساعدة:
- سلالم يدوية ومنصات
- عربات وعربات يدوية
- معدات التغليف والوسم
- أنظمة الوزن
- معدات التنظيف`}</Text>

        <Text style={styles.sectionTitleAr}>📦 أنواع المنتجات والتخزين:</Text>
        <Text style={styles.textBlockAr}>{`المنتجات الجافة:
- الخصائص: غير قابلة للتلف، مدة صلاحية طويلة
- التخزين: رفوف تقليدية
- المراقبة: جرد دوري
- أمثلة: إلكترونيات، ملابس، كتب

المنتجات المبردة:
- الخصائص: درجة حرارة محكومة (2-8°م)
- التخزين: غرف تبريد
- المراقبة: مراقبة مستمرة لدرجة الحرارة
- أمثلة: ألبان، لحوم، أدوية

المنتجات المجمدة:
- الخصائص: درجة حرارة تحت الصفر (-18°م)
- التخزين: أنفاق تجميد
- المراقبة: نظام إنذار درجة الحرارة
- أمثلة: آيس كريم، أسماك، خضروات

المنتجات الخطرة:
- الخصائص: قابلة للاشتعال، سامة، أكالة
- التخزين: مناطق خاصة مع تهوية
- المراقبة: وثائق خاصة وتدريب
- أمثلة: منتجات كيميائية، بطاريات

المنتجات عالية القيمة:
- الخصائص: سرقة، تلف، تقادم
- التخزين: مناطق أمان
- المراقبة: وصول مقيد وكاميرات
- أمثلة: مجوهرات، إلكترونيات، أدوية`}</Text>

        <Text style={styles.sectionTitleAr}>📊 أنظمة الإدارة:</Text>
        <Text style={styles.textBlockAr}>{`طرق التقييم:
FIFO (أول داخل، أول خارج):
- المزايا: دوران طبيعي، تقادم أقل
- الاستخدام: منتجات قابلة للتلف، أزياء
- المراقبة: تحديد بالدفعات

LIFO (آخر داخل، أول خارج):
- المزايا: تكاليف محدثة
- الاستخدام: منتجات غير قابلة للتلف
- المراقبة: إدارة الأسعار

PMP (متوسط مرجح):
- المزايا: متوسط تكلفة مستقر
- الاستخدام: منتجات متجانسة
- المراقبة: حساب آلي

أنظمة الموقع:
عشوائي:
- المزايا: مرونة كاملة
- العيوب: صعوبة في التحديد
- الاستخدام: مستودعات صغيرة

ثابت:
- المزايا: تحديد سريع
- العيوب: مساحة غير محسنة
- الاستخدام: منتجات دوران عالي

ABC:
- A: منتجات عالية القيمة (20% منتجات، 80% قيمة)
- B: منتجات قيمة متوسطة (30% منتجات، 15% قيمة)
- C: منتجات منخفضة القيمة (50% منتجات، 5% قيمة)`}</Text>

        <Text style={styles.sectionTitleAr}>🔍 العمليات التفصيلية:</Text>
        <Text style={styles.textBlockAr}>{`استلام البضائع:
1. التحقق من الوثائق
2. فحص بصري للبضائع
3. العد والوزن
4. مراقبة الجودة الأساسية
5. تعيين الموقع
6. التسجيل في النظام

التخزين:
1. تحليل خصائص المنتج
2. اختيار الموقع الأمثل
3. تطبيق الملصقات
4. التسجيل في النظام
5. تحديث المخزون

الجمع (إعداد الطلبات):
1. استلام أمر الجمع
2. تخطيط المسار
3. جمع المنتجات
4. التحقق من الكميات
5. التغليف
6. الوسم للشحن

الشحن:
1. توحيد الطلبات
2. التحقق النهائي
3. التحميل في المركبة
4. إنشاء الوثائق
5. تسجيل الخروج

إدارة المرتجعات:
1. استلام المرتجعات
2. فحص الحالة
3. التصنيف (قابل للإصلاح، خردة، إعادة بيع)
4. العملية حسب التصنيف
5. تحديث المخزون`}</Text>

        <Text style={styles.sectionTitleAr}>💻 تقنيات المستودع:</Text>
        <Text style={styles.textBlockAr}>{`أنظمة WMS (نظام إدارة المستودع):
الوظائف الرئيسية:
- إدارة المواقع
- مراقبة المخزون
- إدارة الجمع
- التكامل مع ERP
- التقارير والتحليل

الرموز الشريطية:
- رمز EAN-13: منتجات الاستهلاك
- رمز Code 128: لوجستيك داخلي
- رمز QR: معلومات موسعة
- رمز DataMatrix: مساحات محدودة

RFID (تحديد الهوية بتردد الراديو):
- المزايا: قراءة بدون تلامس، قراءات متعددة
- التطبيقات: مراقبة الوصول، التتبع
- القيود: التكلفة، التداخل

أجهزة الراديو:
- الوظائف: جمع، استلام، مخزون
- المزايا: وقت حقيقي، دقة
- الخصائص: مقاوم، بطارية طويلة المدة

الأتمتة:
- ناقلات آلية
- أنظمة التصنيف
- روبوتات الجمع
- مستودعات آلية (AS/RS)`}</Text>

        <Text style={styles.sectionTitleAr}>⚠️ السلامة والوقاية:</Text>
        <Text style={styles.textBlockAr}>{`المخاطر المهنية:
مخاطر فيزيائية:
- سقوط من ارتفاع
- ضربات من أجسام
- انحباس
- جهود زائدة

مخاطر كيميائية:
- التعرض لمنتجات سامة
- استنشاق أبخرة
- تلامس مع مواد أكالة

مخاطر إرجونومية:
- معالجة يدوية للحملات
- أوضاع قسرية
- حركات متكررة

الإجراءات الوقائية:
معدات الحماية الفردية:
- خوذة: حماية الرأس
- أحذية أمان: حماية القدمين
- قفازات: حماية اليدين
- نظارات: حماية العينين
- ملابس عمل: حماية الجسم

قواعد السلامة:
- تدريب إلزامي على المعدات
- صيانة وقائية
- إشارات واضحة
- إجراءات الطوارئ
- فحوصات طبية دورية`}</Text>

        <Text style={styles.sectionTitleAr}>📈 مؤشرات الأداء والمقاييس:</Text>
        <Text style={styles.textBlockAr}>{`مؤشرات الإنتاجية:
- معدل الجمع: خطوط في الساعة
- معدل الاستلام: منصات في الساعة
- معدل الشحن: طلبات في الساعة
- دقة المخزون: دقة المخزون
- استخدام المساحة: استخدام المساحة

مؤشرات الجودة:
- دقة الطلب: دقة الطلبات
- معدل التلف: معدل التلف
- معدل المرتجعات: معدل المرتجعات
- رضا العملاء: رضا العملاء
- التسليم في الوقت: التسليم في الوقت

مؤشرات التكاليف:
- تكلفة الطلب: تكلفة الطلب
- تكلفة الخط: تكلفة الخط
- تكلفة العمل: تكلفة العمل
- استخدام المعدات: استخدام المعدات
- تكلفة التخزين: تكلفة التخزين

المقارنة المرجعية:
- مقارنة مع معايير القطاع
- تحليل الاتجاهات
- تحديد الفرص
- وضع الأهداف
- متابعة التحسينات`}</Text>

        <Text style={styles.sectionTitleAr}>🚀 تقنيات متقدمة:</Text>
        <Text style={styles.textBlockAr}>{`المستودع الرشيق:
المبادئ:
- إزالة الهدر
- تدفق مستمر
- نظام السحب
- تحسين مستمر
- التوحيد القياسي

الأدوات:
- 5S (ترتيب، تنظيم، تنظيف، توحيد، انضباط)
- رسم خريطة تدفق القيمة
- كانبان
- بوكا-يوكي (مقاوم للأخطاء)

التبادل المباشر:
التعريف: نقل مباشر بدون تخزين
الأنواع:
- ما قبل التوزيع: تصنيف مسبق
- ما بعد التوزيع: تصنيف لاحق
- التدفق المستمر: تدفق مستمر

المزايا:
- تقليل المخزون
- وقت تسليم أقل
- تكلفة تخزين أقل
- دوران أكبر

إدارة الموردين:
- تقييم الموردين
- التفاوض على الشروط
- متابعة التسليمات
- إدارة الحوادث
- تطوير الموردين`}</Text>

        <Text style={styles.sectionTitleAr}>📖 أدلة عملية:</Text>
        <Text style={styles.textBlockAr}>{`الدليل الأول: تطبيق نظام 5S
Seiri (تصنيف):
- فصل الضروري من غير الضروري
- وسم العناصر المشكوك فيها
- إزالة العناصر غير الضرورية

Seiton (ترتيب):
- تنظيم العناصر الضرورية
- إنشاء مواقع ثابتة
- إنشاء نظام تعريف

Seiso (تنظيف):
- الحفاظ على النظافة المستمرة
- تحديد مصادر القذارة
- وضع معايير النظافة

Seiketsu (توحيد):
- إنشاء إجراءات قياسية
- توثيق أفضل الممارسات
- تدريب الموظفين

Shitsuke (انضباط):
- متابعة مستمرة
- تدقيق دوري
- الاعتراف بالإنجازات

الدليل الثاني: تحسين الجمع
الاستراتيجيات:
- جمع حسب المناطق
- جمع حسب الدفعات
- جمع حسب الموجات
- جمع بالصوت

أفضل الممارسات:
- تنظيم المنتجات حسب التكرار
- تقليل مسافات التنقل
- استخدام المعدات المناسبة
- تدريب المشغلين`}</Text>

        <Text style={styles.sectionTitleAr}>🎥 الموارد المتعددة الوسائط:</Text>
        <Text style={styles.textBlockAr}>{`الفيديوهات التعليمية:
- تشغيل الرافعات الشوكية
- تقنيات الجمع الفعال
- صيانة المعدات
- إجراءات السلامة

التطبيقات المفيدة:
- WMS محمول للجمع
- حاسبة سعة الحمل
- مدير المخزون
- ماسح الرموز الشريطية

المواقع الإلكترونية الموصى بها:
- جمعيات اللوجستيك
- مصنعي المعدات
- مجلات متخصصة
- منصات التدريب

البودكاست والقنوات:
- "اللوجستيك وسلسلة التوريد"
- "إدارة المستودع"
- "العمليات اللوجستية"
- "التكنولوجيا في المستودعات"`}</Text>

        <Text style={styles.sectionTitleAr}>📋 الشهادات:</Text>
        <Text style={styles.textBlockAr}>{`الشهادات المتاحة:
- مشغل الرافعات الشوكية
- مدير مستودع معتمد
- مدقق جودة في المستودع
- متخصص في WMS

عملية الحصول على الشهادة:
1. تدريب نظري وعملي
2. تقييم الكفاءات
3. امتحان نظري
4. اختبار عملي
5. إصدار الشهادة

المزايا:
- توظيف أكبر
- رواتب أفضل
- اعتراف مهني
- تطوير المسيرة`}</Text>

        <Text style={styles.sectionTitleAr}>💼 فرص العمل:</Text>
        <Text style={styles.textBlockAr}>{`الوظائف المتاحة:
- مشغل مستودع
- مشرف مستودع
- مدير مخزون
- منسق جمع
- مسؤول استلام
- فني معدات
- محلل بيانات
- رئيس مستودع

قطاعات التوظيف:
- التجارة الإلكترونية والتجزئة
- الصناعة التحويلية
- اللوجستيك والنقل
- توزيع الأدوية
- الغذاء والمشروبات
- السيارات
- النسيج والأزياء

الرواتب المتوسطة:
- مشغل: 18,000-25,000€/سنة
- مشرف: 25,000-35,000€/سنة
- مدير: 35,000-50,000€/سنة
- رئيس: 45,000-70,000€/سنة`}</Text>
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
