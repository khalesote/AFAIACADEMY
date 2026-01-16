import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoRepartidorScreen() {
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
            <Text style={styles.headerTitle}>Repartidor</Text>
            <Text style={styles.headerTitleAr}>سائق توصيل</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
        <Text style={styles.textBlock}>{`
1. Técnicas de conducción segura con moto, bicicleta y vehículo ligero.
2. Gestión eficiente de rutas y tiempos de entrega óptimos.
3. Manejo de pedidos digitales y aplicaciones de delivery.
4. Comunicación efectiva con clientes y restaurantes.
5. Seguridad vial específica para repartidores urbanos.
6. Cuidado y mantenimiento básico de vehículos de reparto.
7. Gestión económica y optimización de propinas.
8. Protocolos de higiene y manipulación de alimentos en tránsito.`}</Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 1: CONDUCCIÓN SEGURA
- Normas de circulación urbana
- Técnicas de conducción defensiva
- Seguridad con moto y bicicleta
- Prevención de accidentes

MÓDULO 2: GESTIÓN DE PEDIDOS
- Aplicaciones de delivery
- Organización de rutas óptimas
- Control de tiempos de entrega
- Gestión de múltiples pedidos

MÓDULO 3: COMUNICACIÓN PROFESIONAL
- Atención al cliente telefónica
- Comunicación con restaurantes
- Resolución de incidencias
- Idiomas básicos para delivery

MÓDULO 4: SEGURIDAD Y SALUD
- Seguridad vial urbana
- Protección personal
- Manipulación de alimentos
- Primeros auxilios básicos

MÓDULO 5: GESTIÓN ECONÓMICA
- Optimización de rutas
- Gestión de propinas
- Control de gastos
- Impuestos y declaraciones

MÓDULO 6: TECNOLOGÍA Y HERRAMIENTAS
- Apps de navegación GPS
- Aplicaciones de reparto
- Dispositivos móviles
- Mantenimiento de equipos`}</Text>

        <Text style={styles.sectionTitle}>🏍️ Vehículos de Reparto:</Text>
        <Text style={styles.textBlock}>{`MOTOS DE REPARTO:
- Scooter urbana / سكوتر حضري – 50cc, maniobrable
- Moto eléctrica / دراجة نارية كهربائية – Silenciosa, ecológica
- Moto térmica / دراجة نارية حرارية – 125cc, autonomía amplia
- Maxi-scooter / ماكسي سكوتر – Mayor capacidad de carga

BICICLETAS ELÉCTRICAS:
- E-bike urbana / دراجة كهربائية حضرية – Asistencia al pedaleo
- Cargo bike / دراجة شحن – Mayor capacidad de carga
- Bicicleta eléctrica plegable / دراجة كهربائية قابلة للطي – Transporte público
- Bicicleta con remolque / دراجة مع مقطورة – Grandes volúmenes

VEHÍCULOS LIGEROS:
- Ciclomotor / سيكلوموتور – Hasta 50cc
- Cuadriciclo ligero / رباعي خفيف – Mayor estabilidad
- Furgoneta pequeña / شاحنة صغيرة – Grandes volúmenes
- Vehículo eléctrico / مركبة كهربائية – Sostenibilidad

ACCESORIOS ESENCIALES:
- Baúl térmico / صندوق حراري – Conservación de alimentos
- Bolsas isotérmicas / حقائب عازلة – Mantenimiento de temperatura
- Soportes para teléfonos / حاملات هواتف – Navegación GPS
- Candados y alarmas / أقفال وإنذارات – Seguridad antirrobo`}</Text>

        <Text style={styles.sectionTitle}>🛣️ Conducción Segura:</Text>
        <Text style={styles.textBlock}>{`NORMAS DE CIRCULACIÓN:
- Prioridad de peatones / أولوية المشاة – Respeto absoluto
- Señales de tráfico / إشارات المرور – Conocimiento completo
- Límites de velocidad urbana / حدود السرعة الحضرية – Máximo 50km/h
- Carriles bici / مسارات الدراجات – Compartir espacio

TÉCNICAS DEFENSIVAS:
- Anticipación de maniobras / توقع المناورات – Observación 360°
- Distancia de seguridad / مسافة الأمان – 2 segundos mínimo
- Punto ciego / نقطة عمياء – Verificación constante
- Frenada de emergencia / الفرملة الطارئة – Técnicas específicas

CONDUCCIÓN EN CLIMA ADVERSO:
- Lluvia / مطر – Reducción de velocidad, visibilidad
- Viento / رياح – Estabilidad y control
- Niebla / ضباب – Luces y precaución extrema
- Calor / حرارة – Hidratación y ventilación

USO DE CASCO Y EQUIPACIÓN:
- Casco homologado / خوذة معتمدة – Protección CE obligatoria
- Chaqueta reflectante / سترة عاكسة – Visibilidad nocturna
- Guantes antideslizantes / قفازات مضادة للانزلاق – Control en lluvia
- Calzado adecuado / حذاء مناسب – Estabilidad y confort`}</Text>

        <Text style={styles.sectionTitle}>📱 Gestión Digital:</Text>
        <Text style={styles.textBlock}>{`APLICACIONES DE DELIVERY:
- Glovo / جلوبو – Reparto urbano general
- Uber Eats / أوبر إيتس – Grandes restaurantes
- Deliveroo / ديليفيرو – Servicio premium
- Just Eat / جست إيت – Cadena nacional
- Propias de restaurantes / تطبيقات المطاعم – Servicio directo

GESTIÓN DE PEDIDOS:
- Recepción automática / استقبال تلقائي – Notificaciones push
- Confirmación inmediata / تأكيد فوري – Tiempo de aceptación
- Seguimiento GPS / تتبع GPS – Ubicación en tiempo real
- Actualización de estado / تحديث الحالة – Preparado, en camino, entregado

OPTIMIZACIÓN DE RUTAS:
- Algoritmos inteligentes / خوارزميات ذكية – Rutas más eficientes
- Agrupación de pedidos / تجميع الطلبات – Múltiples entregas
- Estimación de tiempos / تقدير الأوقات – Precisión horaria
- Predicción de demanda / توقع الطلب – Horarios punta

COMUNICACIÓN DIGITAL:
- Chat con cliente / دردشة مع العميل – Confirmación de entrega
- Mensajes de voz / رسائل صوتية – Comunicación rápida
- Fotos de entrega / صور التسليم – Prueba de recepción
- Valoraciones / تقييمات – Feedback del servicio`}</Text>

        <Text style={styles.sectionTitle}>🕐 Optimización de Tiempos:</Text>
        <Text style={styles.textBlock}>{`PLANIFICACIÓN HORARIA:
- Horarios de mayor demanda / أوقات الذروة – 13:00-15:00, 20:00-22:00
- Zonas de reparto / مناطق التوصيل – Agrupación geográfica
- Tiempos de preparación / أوقات التحضير – Espera en restaurantes
- Márgenes de tolerancia / هوامش التسامح – ±5 minutos estándar

ESTRATEGIAS DE EFICIENCIA:
- Agrupación inteligente / تجميع ذكي – Pedidos cercanos
- Anticipación de rutas / توقع المسارات – Conocimiento urbano
- Comunicación preventiva / تواصل وقائي – Alertar de retrasos
- Trabajo en equipo / عمل جماعي – Cobertura de zonas

GESTIÓN DE INCIDENCIAS:
- Pedidos incorrectos / طلبات خاطئة – Verificación inmediata
- Direcciones erróneas / عناوين خاطئة – Contacto con cliente
- Retrasos en preparación / تأخير في التحضير – Comunicación transparente
- Problemas de pago / مشاكل الدفع – Soluciones alternativas

CONTROL DE PRODUCTIVIDAD:
- Pedidos por hora / طلبات بالساعة – Meta realista 8-12/hora
- Kilómetros recorridos / كيلومترات المقطوعة – Optimización de rutas
- Tasa de entregas exitosas / معدل التسليمات الناجحة – >95%
- Satisfacción del cliente / رضا العميل – Valoraciones positivas`}</Text>

        <Text style={styles.sectionTitle}>💰 Gestión Económica:</Text>
        <Text style={styles.textBlock}>{`INGRESOS Y GASTOS:
- Propinas por entrega / إكراميات التوصيل – 1-2€ por pedido
- Tarifa base por pedido / تعرفة أساسية – 2-4€ según plataforma
- Bonos por rendimiento / مكافآت الأداء – Metas cumplidas
- Incentivos especiales / حوافز خاصة – Horarios punta

GASTOS OPERATIVOS:
- Combustible / وقود – Moto térmica vs eléctrica
- Mantenimiento / صيانة – Revisiones periódicas
- Seguro obligatorio / تأمين إلزامي – Cobertura específica
- Apps y tecnología / تطبيقات وتكنولوجيا – Tarjetas SIM, GPS

OPTIMIZACIÓN FINANCIERA:
- Elección de zonas rentables / اختيار المناطق المربحة – Alta densidad pedidos
- Horarios estratégicos / أوقات استراتيجية – Máxima demanda
- Combinación de plataformas / دمج المنصات – Diversificación ingresos
- Control de kilometraje / مراقبة الكيلومترات – Eficiencia económica

IMPUESTOS Y LEGALIDAD:
- Declaración de ingresos / إعلان الدخل – Autónomos o empleados
- IVA de entregas / ضريبة القيمة المضافة – 10% en alimentación
- Retenciones fiscales / الاستقطاعات الضريبية – IRPF aplicable
- Seguridad Social / الضمان الاجتماعي – Cobertura obligatoria`}</Text>

        <Text style={styles.sectionTitle}>🛡️ Seguridad y Salud:</Text>
        <Text style={styles.textBlock}>{`SEGURIDAD VIAL:
- Respeto al código de circulación / احترام قانون المرور
- Conducción defensiva / القيادة الدفاعية – Anticipación de riesgos
- Visibilidad nocturna / الرؤية الليلية – Luces y reflectantes
- Compartir calzada / مشاركة الطريق – Con otros vehículos

PROTECCIÓN PERSONAL:
- Equipo homologado / معدات معتمدة – Casco, guantes, chaleco
- Protección climática / حماية من الطقس – Ropa impermeable
- Higiene personal / النظافة الشخصية – Salud e imagen
- Primeros auxilios / الإسعافات الأولية – Botiquín básico

MANIPULACIÓN DE ALIMENTOS:
- Temperatura de conservación / درجة حرارة الحفظ – Cadena de frío
- Evitar contaminación / تجنب التلوث – Manipulación higiénica
- Embalaje adecuado / تغليف مناسب – Protección de alimentos
- Tiempo máximo de entrega / الحد الأقصى للتوصيل – 30-45 minutos

SALUD Y CONDICIONES FÍSICAS:
- Postura correcta / وضعية صحيحة – Evitar lesiones espalda
- Hidratación constante / ترطيب مستمر – Especialmente en calor
- Pausas regulares / فترات راحة منتظمة – Prevención fatiga
- Alimentación saludable / تغذية صحية – Energía para el trabajo`}</Text>

        <Text style={styles.sectionTitle}>📞 Comunicación Profesional:</Text>
        <Text style={styles.textBlock}>{`ATENCIÓN AL CLIENTE:
- Saludo amable / تحية ودية – Identificación personal
- Confirmación de pedido / تأكيد الطلب – Detalles específicos
- Información de llegada / معلومات الوصول – Tiempo estimado
- Despedida cortés / خاتمة مهذبة – Invitación a repetir

COMUNICACIÓN CON RESTAURANTES:
- Coordinación de recogida / تنسيق الاستلام – Puntualidad
- Verificación de pedidos / التحقق من الطلبات – Calidad y cantidad
- Comunicación de incidencias / الإبلاغ عن الحوادث – Soluciones rápidas
- Feedback constructivo / تغذية راجعة بناءة – Mejora continua

IDIOMAS PARA REPARTO:
- Español básico / إسبانية أساسية – Comunicación esencial
- Inglés turístico / إنجليزية سياحية – Clientes extranjeros
- Árabe para inmigrantes / عربية للمهاجرين – Comunidad local
- Apps traductoras / تطبيقات الترجمة – Comunicación universal

GESTIÓN DE CONFLICTOS:
- Problemas con pedidos / مشاكل الطلبات – Soluciones inmediatas
- Retrasos inevitables / تأخيرات حتمية – Comunicación transparente
- Quejas de clientes / شكاوى العملاء – Actitud positiva
- Discrepancias de pago / خلافات الدفع – Resolución amistosa`}</Text>

        <Text style={styles.sectionTitle}>💼 Oportunidades Laborales:</Text>
        <Text style={styles.textBlock}>{`PUESTOS DE TRABAJO:
- Repartidor autónomo / سائق توصيل مستقل – Múltiples plataformas
- Repartidor de empresa / سائق توصيل شركة – Contrato estable
- Rider especializado / رايدر متخصص – Alta gama o delivery
- Coordinador de reparto / منسق التوصيل – Gestión de equipo
- Formador de nuevos repartidores / مدرب سائقين جدد – Entrenamiento

PLATAFORMAS DIGITALES:
- Glovo, Uber Eats, Deliveroo / جلوبو، أوبر إيتس، ديليفيرو – Grandes compañías
- Startups locales / شركات محلية ناشئة – Servicios especializados
- Apps de restaurantes / تطبيقات المطاعم – Servicio directo
- Marketplaces / أسواق إلكترونية – Comercio electrónico

INGRESOS PROMEDIO:
- Ingresos mensuales / الدخل الشهري – 800-1500€ según zona/horas
- Horas de trabajo / ساعات العمل – 6-10 horas diarias
- Propinas adicionales / إكراميات إضافية – 20-30% del ingreso total
- Bonos por rendimiento / مكافآت الأداء – Incentivos extras

CERTIFICACIONES:
- Carné de moto / رخصة الدراجة النارية – Obligatorio AM/B
- Certificado de manipulador alimentos / شهادة معالج أغذية – Recomendado
- Formación en primeros auxilios / تدريب الإسعافات الأولية – Valor añadido
- Capacitación en apps de reparto / تدريب تطبيقات التوصيل – Específica`}</Text>

        <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة الأولى: القيادة الآمنة
- قوانين المرور الحضري
- تقنيات القيادة الدفاعية
- السلامة بالدراجة النارية والدراجة
- منع الحوادث

الوحدة الثانية: إدارة الطلبات
- تطبيقات التوصيل
- تنظيم المسارات المثالية
- مراقبة أوقات التسليم
- إدارة الطلبات المتعددة

الوحدة الثالثة: التواصل المهني
- خدمة العملاء الهاتفية
- التواصل مع المطاعم
- حل الحوادث
- اللغات الأساسية للتوصيل

الوحدة الرابعة: السلامة والصحة
- السلامة المرورية الحضرية
- الحماية الشخصية
- التعامل مع الأغذية
- الإسعافات الأولية الأساسية

الوحدة الخامسة: الإدارة الاقتصادية
- تحسين المسارات
- إدارة الإكراميات
- مراقبة النفقات
- الضرائب والإعلانات

الوحدة السادسة: التكنولوجيا والأدوات
- تطبيقات الملاحة GPS
- تطبيقات التوصيل
- الأجهزة المحمولة
- صيانة المعدات`}</Text>

        <Text style={styles.sectionTitleAr}>🏍️ مركبات التوصيل:</Text>
        <Text style={styles.textBlockAr}>{`الدراجات النارية للتوصيل:
- سكوتر حضري – 50cc، قابل للمناورة
- دراجة نارية كهربائية – هادئة، بيئية
- دراجة نارية حرارية – 125cc، استقلالية واسعة
- ماكسي سكوتر – سعة تحميل أكبر

الدراجات الكهربائية:
- دراجة كهربائية حضرية – مساعدة الدواسة
- دراجة شحن – سعة تحميل أكبر
- دراجة كهربائية قابلة للطي – نقل عام
- دراجة مع مقطورة – كميات كبيرة

المركبات الخفيفة:
- سيكلوموتور – حتى 50cc
- رباعي خفيف – استقرار أكبر
- شاحنة صغيرة – كميات كبيرة
- مركبة كهربائية – استدامة

الملحقات الأساسية:
- صندوق حراري – حفظ الأغذية
- حقائب عازلة – الحفاظ على درجة الحرارة
- حاملات هواتف – ملاحة GPS
- أقفال وإنذارات – أمان مضاد للسرقة`}</Text>

        <Text style={styles.sectionTitleAr}>💼 فرص العمل:</Text>
        <Text style={styles.textBlockAr}>{`الوظائف:
- سائق توصيل مستقل – منصات متعددة
- سائق توصيل شركة – عقد مستقر
- رايدر متخصص – عالي الجودة أو توصيل
- منسق التوصيل – إدارة الفريق
- مدرب سائقين جدد – تدريب

المنصات الرقمية:
- جلوبو، أوبر إيتس، ديليفيرو – شركات كبيرة
- شركات محلية ناشئة – خدمات متخصصة
- تطبيقات المطاعم – خدمة مباشرة
- أسواق إلكترونية – تجارة إلكترونية

الدخل المتوسط:
- الدخل الشهري – 800-1500 يورو حسب المنطقة/الساعات
- ساعات العمل – 6-10 ساعات يومياً
- إكراميات إضافية – 20-30% من الدخل الإجمالي
- مكافآت الأداء – حوافز إضافية

الشهادات:
- رخصة الدراجة النارية – إلزامي AM/B
- شهادة معالج أغذية – موصى به
- تدريب الإسعافات الأولية – قيمة مضافة
- تدريب تطبيقات التوصيل – محدد`}</Text>
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
    opacity: 0.9,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
