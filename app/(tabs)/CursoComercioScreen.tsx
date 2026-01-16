import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoComercioScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/PreFormacionScreen")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitleAr}>تجارة وخدمة عملاء</Text>
            <Text style={styles.headerTitle}>Comercio y Atención</Text>
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
            1. خدمة العملاء المهنية{'\n'}
            2. تقنيات البيع الأساسية{'\n'}
            3. إدارة المنتجات والمخزون{'\n'}
            4. استخدام الصندوق{'\n'}
            5. التواصل الفعال{'\n'}
            6. إدارة المبيعات{'\n'}
            7. عرض المنتجات{'\n'}
            8. إدارة المتجر
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Atención al cliente profesional{'\n'}
            2. Técnicas de venta básicas{'\n'}
            3. Gestión de productos y stock{'\n'}
            4. Uso de cajas registradoras{'\n'}
            5. Comunicación efectiva{'\n'}
            6. Gestión de ventas{'\n'}
            7. Exposición de productos{'\n'}
            8. Gestión de tienda
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
            • تقنيات البيع{'\n'}
            • إدارة المنتجات{'\n'}
            • الصندوق{'\n'}
            • التواصل{'\n'}
            • إدارة المبيعات
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Atención al cliente{'\n'}
            • Técnicas de venta{'\n'}
            • Gestión de productos{'\n'}
            • Cajas registradoras{'\n'}
            • Comunicación{'\n'}
            • Gestión de ventas
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>عميل</Text>
            <Text style={styles.vocabEs}>Cliente</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>منتج</Text>
            <Text style={styles.vocabEs}>Producto</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سعر</Text>
            <Text style={styles.vocabEs}>Precio</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>بيع</Text>
            <Text style={styles.vocabEs}>Venta</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>خدمة</Text>
            <Text style={styles.vocabEs}>Atención</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: خدمة العملاء</Text>
            <Text style={styles.moduleContentAr}>
              • التواصل الفعال:{'\n'}
              - التحية المهنية{'\n'}
              - الاستماع{'\n'}
              - الاهتمام{'\n'}
              • التعامل مع العملاء:{'\n'}
              - أنواع العملاء{'\n'}
              - التكيف{'\n'}
              - الخدمة{'\n'}
              • حل المشاكل:{'\n'}
              - التعرف على المشاكل{'\n'}
              - الحلول{'\n'}
              - المتابعة{'\n'}
              • بناء العلاقات:{'\n'}
              - التواصل{'\n'}
              - الثقة{'\n'}
              - الولاء
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: ATENCIÓN AL CLIENTE</Text>
            <Text style={styles.moduleContent}>
              • Comunicación efectiva:{'\n'}
              - Saludo profesional{'\n'}
              - Escucha{'\n'}
              - Atención{'\n'}
              • Manejo de clientes:{'\n'}
              - Tipos de clientes{'\n'}
              - Adaptación{'\n'}
              - Servicio{'\n'}
              • Resolución de problemas:{'\n'}
              - Identificar problemas{'\n'}
              - Soluciones{'\n'}
              - Seguimiento{'\n'}
              • Construir relaciones:{'\n'}
              - Comunicación{'\n'}
              - Confianza{'\n'}
              - Lealtad
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: تقنيات البيع</Text>
            <Text style={styles.moduleContentAr}>
              • تقنيات البيع:{'\n'}
              - التعرف على الاحتياجات{'\n'}
              - التوصيات{'\n'}
              - الإقناع{'\n'}
              • عرض المنتجات:{'\n'}
              - الميزات{'\n'}
              - الفوائد{'\n'}
              - العروض{'\n'}
              • التعامل مع الاعتراضات:{'\n'}
              - الاستماع{'\n'}
              - الرد{'\n'}
              - الحلول{'\n'}
              • إغلاق البيع:{'\n'}
              - التقنيات{'\n'}
              - التوقيت{'\n'}
              - الإجراءات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: TÉCNICAS DE VENTA</Text>
            <Text style={styles.moduleContent}>
              • Técnicas de venta:{'\n'}
              - Identificar necesidades{'\n'}
              - Recomendaciones{'\n'}
              - Persuasión{'\n'}
              • Presentación de productos:{'\n'}
              - Características{'\n'}
              - Beneficios{'\n'}
              - Ofertas{'\n'}
              • Manejo de objeciones:{'\n'}
              - Escuchar{'\n'}
              - Responder{'\n'}
              - Soluciones{'\n'}
              • Cierre de venta:{'\n'}
              - Técnicas{'\n'}
              - Momento{'\n'}
              - Procedimientos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: إدارة المنتجات</Text>
            <Text style={styles.moduleContentAr}>
              • إدارة المخزون:{'\n'}
              - التسجيل{'\n'}
              - المتابعة{'\n'}
              - التحكم{'\n'}
              • تنظيم المنتجات:{'\n'}
              - التصنيف{'\n'}
              - الترتيب{'\n'}
              - العرض{'\n'}
              • مراقبة الجودة:{'\n'}
              - الفحص{'\n'}
              - الجودة{'\n'}
              - الإدارة{'\n'}
              • إدارة الطلبات:{'\n'}
              - الطلبات{'\n'}
              - المتابعة{'\n'}
              - الاستلام
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: GESTIÓN DE PRODUCTOS</Text>
            <Text style={styles.moduleContent}>
              • Gestión de stock:{'\n'}
              - Registro{'\n'}
              - Seguimiento{'\n'}
              - Control{'\n'}
              • Organización de productos:{'\n'}
              - Clasificación{'\n'}
              - Orden{'\n'}
              - Exposición{'\n'}
              • Control de calidad:{'\n'}
              - Inspección{'\n'}
              - Calidad{'\n'}
              - Gestión{'\n'}
              • Gestión de pedidos:{'\n'}
              - Pedidos{'\n'}
              - Seguimiento{'\n'}
              - Recepción
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الصندوق</Text>
            <Text style={styles.moduleContentAr}>
              • استخدام الصندوق:{'\n'}
              - التشغيل{'\n'}
              - الإجراءات{'\n'}
              - الاستخدام{'\n'}
              • معالجة المدفوعات:{'\n'}
              - النقد{'\n'}
              - البطاقات{'\n'}
              - التطبيقات{'\n'}
              • إدارة الفواتير:{'\n'}
              - الإصدار{'\n'}
              - التسجيل{'\n'}
              - المتابعة{'\n'}
              • إدارة النقد:{'\n'}
              - التحكم{'\n'}
              - التسوية{'\n'}
              - التقارير
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: CAJAS REGISTRADORAS</Text>
            <Text style={styles.moduleContent}>
              • Uso de cajas:{'\n'}
              - Operación{'\n'}
              - Procedimientos{'\n'}
              - Uso{'\n'}
              • Procesamiento de pagos:{'\n'}
              - Efectivo{'\n'}
              - Tarjetas{'\n'}
              - Apps{'\n'}
              • Gestión de facturas:{'\n'}
              - Emisión{'\n'}
              - Registro{'\n'}
              - Seguimiento{'\n'}
              • Gestión de efectivo:{'\n'}
              - Control{'\n'}
              - Arqueo{'\n'}
              - Reportes
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
              • موظف مبيعات{'\n'}
              • كاشير{'\n'}
              • مساعد مبيعات{'\n'}
              • مدير متجر{'\n'}
              • منسق مبيعات{'\n'}
              • مستشار مبيعات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Dependiente{'\n'}
              • Cajero{'\n'}
              • Asistente de ventas{'\n'}
              • Gerente de tienda{'\n'}
              • Coordinador de ventas{'\n'}
              • Asesor comercial
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
    color: '#000',
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
