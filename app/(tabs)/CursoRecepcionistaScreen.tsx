import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoRecepcionistaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/PreFormacionScreen")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitleAr}>دورة الاستقبال المهني</Text>
            <Text style={styles.headerTitle}>Curso de Recepcionista Profesional</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INTRODUCCIÓN */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>📌 ماذا ستتعلم؟</Text>
          </View>
          <Text style={styles.textBlockAr}>
            1. تطوير مهارات خدمة العملاء الممتازة{'\n'}
            2. إدارة المواعيد والجدول الزمني والحجوزات بكفاءة{'\n'}
            3. تعلم تقنيات البيع وكسب ولاء العملاء{'\n'}
            4. التعامل مع الأدوات الإدارية والاتصال{'\n'}
            5. إدارة المهام الإدارية{'\n'}
            6. التواصل المهني{'\n'}
            7. التسويق والعلاقات العامة{'\n'}
            8. إدارة الوقت والتنظيم
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Desarrollar habilidades de atención al cliente excepcional{'\n'}
            2. Gestionar citas, agendas y reservas de manera eficiente{'\n'}
            3. Aprender técnicas de venta y fidelización de clientes{'\n'}
            4. Manejar herramientas administrativas y de comunicación{'\n'}
            5. Gestionar tareas administrativas{'\n'}
            6. Comunicación profesional{'\n'}
            7. Marketing y relaciones públicas{'\n'}
            8. Gestión del tiempo y organización
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • خدمة العملاء{'\n'}
            • إدارة المواعيد والجدول{'\n'}
            • البيع وكسب الولاء{'\n'}
            • الإدارة والمحاسبة{'\n'}
            • الاتصال والتسويق{'\n'}
            • المهارات المهنية
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Atención al cliente{'\n'}
            • Gestión de citas y agendas{'\n'}
            • Ventas y fidelización{'\n'}
            • Administración y contabilidad{'\n'}
            • Comunicación y marketing{'\n'}
            • Habilidades profesionales
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>استقبال</Text>
            <Text style={styles.vocabEs}>Recepción</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>موعد</Text>
            <Text style={styles.vocabEs}>Cita</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>حجز</Text>
            <Text style={styles.vocabEs}>Reserva</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>فاتورة</Text>
            <Text style={styles.vocabEs}>Factura</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>عميل</Text>
            <Text style={styles.vocabEs}>Cliente</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: خدمة العملاء</Text>
            <Text style={styles.moduleContentAr}>
              • التواصل الفعال:{'\n'}
              - التحية المهنية{'\n'}
              - التعاطف{'\n'}
              - الاستماع النشط{'\n'}
              • التعامل مع الشكاوى:{'\n'}
              - الاستماع بعناية{'\n'}
              - إظهار التعاطف{'\n'}
              - حل النزاعات{'\n'}
              • تخصيص الخدمة:{'\n'}
              - فهم ملف العميل{'\n'}
              - التوصيات الشخصية{'\n'}
              - الاهتمام الفردي{'\n'}
              • بروتوكولات الخدمة:{'\n'}
              - الخطوات الأساسية{'\n'}
              - التوقيت{'\n'}
              - اللغة الجسدية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: ATENCIÓN AL CLIENTE</Text>
            <Text style={styles.moduleContent}>
              • Comunicación efectiva:{'\n'}
              - Saludo profesional{'\n'}
              - Empatía{'\n'}
              - Escucha activa{'\n'}
              • Manejo de quejas:{'\n'}
              - Escuchar atentamente{'\n'}
              - Mostrar empatía{'\n'}
              - Resolver conflictos{'\n'}
              • Personalización:{'\n'}
              - Entender perfil del cliente{'\n'}
              - Recomendaciones personalizadas{'\n'}
              - Atención individualizada{'\n'}
              • Protocolos de servicio:{'\n'}
              - Pasos básicos{'\n'}
              - Tiempos{'\n'}
              - Lenguaje corporal
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: إدارة المواعيد والجدول</Text>
            <Text style={styles.moduleContentAr}>
              • استخدام برامج الجدول:{'\n'}
              - البرامج المتاحة{'\n'}
              - إدخال البيانات{'\n'}
              - إدارة المواعيد{'\n'}
              • تحسين الجدول:{'\n'}
              - تقليل أوقات الفراغ{'\n'}
              - توزيع المواعيد{'\n'}
              - التحسين المستمر{'\n'}
              • التعامل مع الإلغاءات:{'\n'}
              - بروتوكولات الإلغاء{'\n'}
              - إعادة الجدولة{'\n'}
              - المتابعة{'\n'}
              • إدارة الحجوزات:{'\n'}
              - تأكيد الحجوزات{'\n'}
              - التذكيرات{'\n'}
              - المتابعة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: GESTIÓN DE CITAS Y AGENDAS</Text>
            <Text style={styles.moduleContent}>
              • Uso de software:{'\n'}
              - Programas disponibles{'\n'}
              - Ingreso de datos{'\n'}
              - Gestión de citas{'\n'}
              • Optimización:{'\n'}
              - Reducir tiempos muertos{'\n'}
              - Distribuir citas{'\n'}
              - Mejora continua{'\n'}
              • Manejo de cancelaciones:{'\n'}
              - Protocolos de cancelación{'\n'}
              - Reprogramación{'\n'}
              - Seguimiento{'\n'}
              • Gestión de reservas:{'\n'}
              - Confirmación{'\n'}
              - Recordatorios{'\n'}
              - Seguimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: البيع وكسب الولاء</Text>
            <Text style={styles.moduleContentAr}>
              • تقنيات البيع المقترح:{'\n'}
              - الترقية{'\n'}
              - البيع الإضافي{'\n'}
              - التوصيات{'\n'}
              • برامج الولاء:{'\n'}
              - النقاط والمكافآت{'\n'}
              - الخصومات{'\n'}
              - الهدايا{'\n'}
              • المتابعة بعد الخدمة:{'\n'}
              - الاتصال{'\n'}
              - طلب التغذية الراجعة{'\n'}
              - بناء العلاقات{'\n'}
              • التسويق العلاقي:{'\n'}
              - العلاقات طويلة الأمد{'\n'}
              - التوصيات{'\n'}
              - الولاء
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: VENTAS Y FIDELIZACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Técnicas de venta:{'\n'}
              - Upselling{'\n'}
              - Venta adicional{'\n'}
              - Recomendaciones{'\n'}
              • Programas de fidelización:{'\n'}
              - Puntos y recompensas{'\n'}
              - Descuentos{'\n'}
              - Regalos{'\n'}
              • Seguimiento post-servicio:{'\n'}
              - Contacto{'\n'}
              - Solicitar feedback{'\n'}
              - Construir relaciones{'\n'}
              • Marketing relacional:{'\n'}
              - Relaciones a largo plazo{'\n'}
              - Referidos{'\n'}
              - Lealtad
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الإدارة والمحاسبة</Text>
            <Text style={styles.moduleContentAr}>
              • التحكم في المخزون:{'\n'}
              - إدارة المنتجات{'\n'}
              - الطلبات{'\n'}
              - الجرد{'\n'}
              • تسجيل الإيرادات:{'\n'}
              - الفواتير{'\n'}
              - المدفوعات{'\n'}
              - التقارير{'\n'}
              • الأدوات الرقمية:{'\n'}
              - إكسل{'\n'}
              - برامج المحاسبة{'\n'}
              - الأنظمة الإدارية{'\n'}
              • إدارة المصروفات:{'\n'}
              - التسجيل{'\n'}
              - التصنيف{'\n'}
              - التحليل
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: ADMINISTRACIÓN Y CONTABILIDAD</Text>
            <Text style={styles.moduleContent}>
              • Control de inventario:{'\n'}
              - Gestión de productos{'\n'}
              - Pedidos{'\n'}
              - Inventarios{'\n'}
              • Registro de ingresos:{'\n'}
              - Facturación{'\n'}
              - Pagos{'\n'}
              - Reportes{'\n'}
              • Herramientas digitales:{'\n'}
              - Excel{'\n'}
              - Software contable{'\n'}
              - Sistemas administrativos{'\n'}
              • Gestión de gastos:{'\n'}
              - Registro{'\n'}
              - Clasificación{'\n'}
              - Análisis
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: الاتصال والتسويق</Text>
            <Text style={styles.moduleContentAr}>
              • الشبكات الاجتماعية:{'\n'}
              - إدارة الملفات{'\n'}
              - المنشورات{'\n'}
              - التفاعل{'\n'}
              • الخدمة الهاتفية:{'\n'}
              - الرد المهني{'\n'}
              - أخذ الرسائل{'\n'}
              - التحويل{'\n'}
              • البريد الإلكتروني:{'\n'}
              - الرسائل المهنية{'\n'}
              - الردود{'\n'}
              - التنظيم{'\n'}
              • التسويق:{'\n'}
              - الحملات{'\n'}
              - العروض{'\n'}
              - المتابعة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: COMUNICACIÓN Y MARKETING</Text>
            <Text style={styles.moduleContent}>
              • Redes sociales:{'\n'}
              - Gestión de perfiles{'\n'}
              - Publicaciones{'\n'}
              - Interacción{'\n'}
              • Atención telefónica:{'\n'}
              - Respuesta profesional{'\n'}
              - Toma de mensajes{'\n'}
              - Transferencias{'\n'}
              • Correo electrónico:{'\n'}
              - Mensajes profesionales{'\n'}
              - Respuestas{'\n'}
              - Organización{'\n'}
              • Marketing:{'\n'}
              - Campañas{'\n'}
              - Promociones{'\n'}
              - Seguimiento
            </Text>
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
              • موظف استقبال{'\n'}
              • مساعد إداري{'\n'}
              • منسق مواعيد{'\n'}
              • مساعد مبيعات{'\n'}
              • مدير علاقات العملاء{'\n'}
              • مساعد مكتب
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Recepcionista{'\n'}
              • Asistente administrativo{'\n'}
              • Coordinador de citas{'\n'}
              • Asistente de ventas{'\n'}
              • Gestor de relaciones con clientes{'\n'}
              • Asistente de oficina
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
    color: '#79A890',
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
    borderLeftColor: '#000',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  moduleTitleAr: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
