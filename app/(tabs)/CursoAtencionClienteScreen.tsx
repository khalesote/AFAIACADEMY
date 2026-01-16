import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoAtencionClienteScreen() {
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
            <Text style={styles.headerTitleAr}>خدمة العملاء</Text>
            <Text style={styles.headerTitle}>Atención al Cliente</Text>
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
            1. تقنيات التواصل الفعال مع العملاء{'\n'}
            2. التعامل مع المواقف الصعبة والشكاوى{'\n'}
            3. بروتوكولات خدمة العملاء المهنية{'\n'}
            4. استخدام الأدوات الرقمية للخدمة{'\n'}
            5. استراتيجيات ولاء العملاء{'\n'}
            6. حل النزاعات والتفاوض{'\n'}
            7. التواصل بين الثقافات والتنوع{'\n'}
            8. إدارة الوقت وتنظيم العمل
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas de comunicación efectiva con clientes{'\n'}
            2. Manejo de situaciones difíciles y quejas{'\n'}
            3. Protocolos de atención al cliente profesional{'\n'}
            4. Uso de herramientas digitales para el servicio{'\n'}
            5. Estrategias de fidelización de clientes{'\n'}
            6. Resolución de conflictos y negociación{'\n'}
            7. Comunicación intercultural y diversidad{'\n'}
            8. Gestión del tiempo y organización del trabajo
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • أساسيات خدمة العملاء{'\n'}
            • التواصل الفعال{'\n'}
            • التعامل مع المواقف الصعبة{'\n'}
            • الأدوات والتقنيات{'\n'}
            • استراتيجيات الولاء{'\n'}
            • الجوانب القانونية والأخلاقية
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Fundamentos de la atención al cliente{'\n'}
            • Comunicación efectiva{'\n'}
            • Manejo de situaciones difíciles{'\n'}
            • Herramientas y tecnologías{'\n'}
            • Estrategias de fidelización{'\n'}
            • Aspectos legales y éticos
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>عميل</Text>
            <Text style={styles.vocabEs}>Cliente</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>خدمة</Text>
            <Text style={styles.vocabEs}>Servicio</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>شكوى</Text>
            <Text style={styles.vocabEs}>Queja</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>تواصل</Text>
            <Text style={styles.vocabEs}>Comunicación</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>رضا</Text>
            <Text style={styles.vocabEs}>Satisfacción</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات خدمة العملاء</Text>
            <Text style={styles.moduleContentAr}>
              • أهمية العميل في الأعمال:{'\n'}
              - العميل هو محور النجاح{'\n'}
              - رضا العميل يولد الولاء{'\n'}
              - خدمة ممتازة تخلق سمعة جيدة{'\n'}
              • أنواع العملاء:{'\n'}
              - العملاء الراضون{'\n'}
              - العملاء المحتملون{'\n'}
              - العملاء الصعبون{'\n'}
              • ثقافة خدمة العملاء:{'\n'}
              - القيم الأساسية{'\n'}
              - المعايير المهنية{'\n'}
              - التزام الفريق{'\n'}
              • حقوق وواجبات العميل:{'\n'}
              - الحق في الخدمة الجيدة{'\n'}
              - الحق في الشكوى{'\n'}
              - الواجبات الأساسية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA ATENCIÓN AL CLIENTE</Text>
            <Text style={styles.moduleContent}>
              • Importancia del cliente:{'\n'}
              - El cliente es el centro del éxito{'\n'}
              - Cliente satisfecho genera lealtad{'\n'}
              - Excelente servicio crea buena reputación{'\n'}
              • Tipos de clientes:{'\n'}
              - Clientes satisfechos{'\n'}
              - Clientes potenciales{'\n'}
              - Clientes difíciles{'\n'}
              • Cultura del servicio:{'\n'}
              - Valores fundamentales{'\n'}
              - Estándares profesionales{'\n'}
              - Compromiso del equipo{'\n'}
              • Derechos y deberes:{'\n'}
              - Derecho a buen servicio{'\n'}
              - Derecho a quejarse{'\n'}
              - Deberes básicos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: التواصل الفعال</Text>
            <Text style={styles.moduleContentAr}>
              • تقنيات الاستماع النشط:{'\n'}
              - الاهتمام الكامل{'\n'}
              - طرح الأسئلة التوضيحية{'\n'}
              - عكس ما سمع{'\n'}
              • اللغة اللفظية:{'\n'}
              - التحية المهنية{'\n'}
              - اللغة الواضحة{'\n'}
              - نبرة الصوت المناسبة{'\n'}
              • التواصل غير اللفظي:{'\n'}
              - التواصل البصري{'\n'}
              - الوضعية والإيماءات{'\n'}
              - التعبير الوجهي{'\n'}
              • التواصل الهاتفي:{'\n'}
              - الرد السريع{'\n'}
              - تحديد واضح{'\n'}
              - تسجيل البيانات{'\n'}
              • التواصل الرقمي:{'\n'}
              - البريد الإلكتروني{'\n'}
              - الرسائل الفورية{'\n'}
              - الشبكات الاجتماعية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: COMUNICACIÓN EFECTIVA</Text>
            <Text style={styles.moduleContent}>
              • Técnicas de escucha activa:{'\n'}
              - Atención completa{'\n'}
              - Preguntas aclaratorias{'\n'}
              - Reflejar lo escuchado{'\n'}
              • Lenguaje verbal:{'\n'}
              - Saludo profesional{'\n'}
              - Lenguaje claro{'\n'}
              - Tono adecuado{'\n'}
              • Comunicación no verbal:{'\n'}
              - Contacto visual{'\n'}
              - Postura y gestos{'\n'}
              - Expresión facial{'\n'}
              • Comunicación telefónica:{'\n'}
              - Respuesta rápida{'\n'}
              - Identificación{'\n'}
              - Toma de datos{'\n'}
              • Comunicación digital:{'\n'}
              - Email{'\n'}
              - Mensajería instantánea{'\n'}
              - Redes sociales
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: التعامل مع المواقف الصعبة</Text>
            <Text style={styles.moduleContentAr}>
              • تقنيات التعامل مع الشكاوى:{'\n'}
              - الاستماع بعناية{'\n'}
              - إظهار التعاطف{'\n'}
              - تحمل المسؤولية{'\n'}
              - تقديم حلول{'\n'}
              • السيطرة العاطفية:{'\n'}
              - الحفاظ على الهدوء{'\n'}
              - تجنب الردود الدفاعية{'\n'}
              - إدارة التوتر{'\n'}
              • حل المشكلات:{'\n'}
              - تحديد المشكلة{'\n'}
              - البحث عن الحلول{'\n'}
              - الاتفاق على الإجراءات{'\n'}
              • تصعيد النزاعات:{'\n'}
              - متى التصعيد{'\n'}
              - كيفية التصعيد{'\n'}
              - المتابعة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: MANEJO DE SITUACIONES DIFÍCILES</Text>
            <Text style={styles.moduleContent}>
              • Técnicas para manejar quejas:{'\n'}
              - Escuchar atentamente{'\n'}
              - Mostrar empatía{'\n'}
              - Asumir responsabilidad{'\n'}
              - Ofrecer soluciones{'\n'}
              • Control emocional:{'\n'}
              - Mantener la calma{'\n'}
              - Evitar respuestas defensivas{'\n'}
              - Gestionar el estrés{'\n'}
              • Resolución de problemas:{'\n'}
              - Identificar el problema{'\n'}
              - Buscar soluciones{'\n'}
              - Acordar acciones{'\n'}
              • Escalada de conflictos:{'\n'}
              - Cuándo escalar{'\n'}
              - Cómo escalar{'\n'}
              - Seguimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الأدوات والتقنيات</Text>
            <Text style={styles.moduleContentAr}>
              • أنظمة إدارة العملاء (CRM):{'\n'}
              - إدارة المعلومات{'\n'}
              - متابعة التفاعلات{'\n'}
              - تحليل البيانات{'\n'}
              • الشبكات الاجتماعية:{'\n'}
              - الرد الفوري{'\n'}
              - النبرة المناسبة{'\n'}
              - إدارة التعليقات{'\n'}
              • تطبيقات المراسلة:{'\n'}
              - الرسائل الفورية{'\n'}
              - الدعم الفني{'\n'}
              - المتابعة{'\n'}
              • أدوات الإنتاجية:{'\n'}
              - إدارة المهام{'\n'}
              - الجداول الزمنية{'\n'}
              - التقارير
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: HERRAMIENTAS Y TECNOLOGÍAS</Text>
            <Text style={styles.moduleContent}>
              • Sistemas CRM:{'\n'}
              - Gestión de información{'\n'}
              - Seguimiento de interacciones{'\n'}
              - Análisis de datos{'\n'}
              • Redes sociales:{'\n'}
              - Respuesta oportuna{'\n'}
              - Tono apropiado{'\n'}
              - Gestión de comentarios{'\n'}
              • Apps de mensajería:{'\n'}
              - Mensajería instantánea{'\n'}
              - Soporte técnico{'\n'}
              - Seguimiento{'\n'}
              • Herramientas de productividad:{'\n'}
              - Gestión de tareas{'\n'}
              - Calendarios{'\n'}
              - Reportes
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: استراتيجيات الولاء</Text>
            <Text style={styles.moduleContentAr}>
              • برامج الولاء:{'\n'}
              - النقاط والمكافآت{'\n'}
              - الخصومات{'\n'}
              - العضوية{'\n'}
              • المتابعة بعد البيع:{'\n'}
              - الاتصال بعد الخدمة{'\n'}
              - طلب التغذية الراجعة{'\n'}
              - حل المشكلات{'\n'}
              • تخصيص الخدمة:{'\n'}
              - فهم الاحتياجات{'\n'}
              - التوصيات الشخصية{'\n'}
              - الخدمة المخصصة{'\n'}
              • قياس الرضا:{'\n'}
              - الاستطلاعات{'\n'}
              - التقييمات{'\n'}
              - التحليل
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: ESTRATEGIAS DE FIDELIZACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Programas de fidelización:{'\n'}
              - Puntos y recompensas{'\n'}
              - Descuentos{'\n'}
              - Membresías{'\n'}
              • Seguimiento post-venta:{'\n'}
              - Contacto después del servicio{'\n'}
              - Solicitar feedback{'\n'}
              - Resolver problemas{'\n'}
              • Personalización:{'\n'}
              - Entender necesidades{'\n'}
              - Recomendaciones personalizadas{'\n'}
              - Servicio a medida{'\n'}
              • Medición de satisfacción:{'\n'}
              - Encuestas{'\n'}
              - Evaluaciones{'\n'}
              - Análisis
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: الجوانب القانونية والأخلاقية</Text>
            <Text style={styles.moduleContentAr}>
              • حماية البيانات الشخصية:{'\n'}
              - القانون العام لحماية البيانات{'\n'}
              - حقوق العملاء{'\n'}
              - السرية{'\n'}
              • لوائح الاستهلاك:{'\n'}
              - حقوق المستهلك{'\n'}
              - الضمانات{'\n'}
              - الإرجاع{'\n'}
              • الأخلاق المهنية:{'\n'}
              - النزاهة{'\n'}
              - الشفافية{'\n'}
              - الاحترام{'\n'}
              • المسؤولية الاجتماعية:{'\n'}
              - الالتزام المجتمعي{'\n'}
              - الاستدامة{'\n'}
              - المسؤولية الأخلاقية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: ASPECTOS LEGALES Y ÉTICOS</Text>
            <Text style={styles.moduleContent}>
              • Protección de datos:{'\n'}
              - RGPD{'\n'}
              - Derechos del cliente{'\n'}
              - Confidencialidad{'\n'}
              • Normativas de consumo:{'\n'}
              - Derechos del consumidor{'\n'}
              - Garantías{'\n'}
              - Devoluciones{'\n'}
              • Ética profesional:{'\n'}
              - Integridad{'\n'}
              - Transparencia{'\n'}
              - Respeto{'\n'}
              • Responsabilidad social:{'\n'}
              - Compromiso comunitario{'\n'}
              - Sostenibilidad{'\n'}
              - Responsabilidad ética
            </Text>
          </View>
        </View>

        {/* COMUNICACIÓN INTERCULTURAL */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="globe" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🌍 التواصل بين الثقافات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>التكيف الثقافي</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>احترام الاختلافات</Text>
              <Text style={styles.vocabEs}>Respeto a las diferencias</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>معرفة العادات المحلية</Text>
              <Text style={styles.vocabEs}>Conocimiento de costumbres locales</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>لغة شاملة</Text>
              <Text style={styles.vocabEs}>Lenguaje inclusivo</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Adaptación Cultural</Text>
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
              • موظف خدمة عملاء{'\n'}
              • موظف استقبال{'\n'}
              • موظف خدمة هاتفية{'\n'}
              • مساعد تجاري{'\n'}
              • مدير علاقات العملاء{'\n'}
              • مشرف خدمة العملاء
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Atendedor de clientes{'\n'}
              • Recepcionista{'\n'}
              • Teleoperador{'\n'}
              • Asistente comercial{'\n'}
              • Gestor de relaciones con clientes{'\n'}
              • Supervisor de atención al cliente
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
