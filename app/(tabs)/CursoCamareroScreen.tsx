import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoCamareroScreen() {
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
            <Text style={styles.headerTitleAr}>نادل</Text>
            <Text style={styles.headerTitle}>Camarero</Text>
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
            1. تقنيات الخدمة المهنية في المطاعم{'\n'}
            2. معرفة القوائم وتوصيات الأطباق{'\n'}
            3. خدمة المائدة الفعالة والأنيقة{'\n'}
            4. إدارة الطلبات وأنظمة نقطة البيع{'\n'}
            5. خدمة العملاء في قطاع الضيافة{'\n'}
            6. بروتوكولات النظافة وسلامة الأغذية{'\n'}
            7. إدارة المدفوعات والفواتير{'\n'}
            8. العمل الجماعي في بيئات الضغط العالي
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas profesionales de servicio en restaurantes{'\n'}
            2. Conocimiento de menús y recomendaciones de platos{'\n'}
            3. Servicio de mesa eficiente y elegante{'\n'}
            4. Manejo de comandas y sistemas de punto de venta{'\n'}
            5. Atención al cliente en el sector hostelero{'\n'}
            6. Protocolos de higiene y seguridad alimentaria{'\n'}
            7. Gestión de pagos y facturación{'\n'}
            8. Trabajo en equipo en entornos de alta presión
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • أساسيات الخدمة{'\n'}
            • معرفة المنتجات{'\n'}
            • تقنيات الخدمة{'\n'}
            • النظافة والسلامة{'\n'}
            • خدمة العملاء{'\n'}
            • الإدارة والإدارة
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Fundamentos del servicio{'\n'}
            • Conocimiento de productos{'\n'}
            • Técnicas de servicio{'\n'}
            • Higiene y seguridad{'\n'}
            • Atención al cliente{'\n'}
            • Gestión y administración
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>نادل</Text>
            <Text style={styles.vocabEs}>Camarero</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>مائدة</Text>
            <Text style={styles.vocabEs}>Mesa</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>طلب</Text>
            <Text style={styles.vocabEs}>Comanda</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>فاتورة</Text>
            <Text style={styles.vocabEs}>Factura</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>بقشيش</Text>
            <Text style={styles.vocabEs}>Propina</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات الخدمة</Text>
            <Text style={styles.moduleContentAr}>
              • تاريخ خدمة المائدة:{'\n'}
              - التطور التاريخي{'\n'}
              - التقاليد المختلفة{'\n'}
              - المعايير الحديثة{'\n'}
              • أنواع المؤسسات:{'\n'}
              - المطاعم التقليدية{'\n'}
              - البارات والمقاهي{'\n'}
              - الفنادق{'\n'}
              • قانون الملبس:{'\n'}
              - الزي الموحد{'\n'}
              - النظافة الشخصية{'\n'}
              - المظهر المهني{'\n'}
              • الوضعية والحركات:{'\n'}
              - الوضعية الصحيحة{'\n'}
              - الحركات الأنيقة{'\n'}
              - البروتوكول
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DEL SERVICIO</Text>
            <Text style={styles.moduleContent}>
              • Historia del servicio:{'\n'}
              - Evolución histórica{'\n'}
              - Diferentes tradiciones{'\n'}
              - Estándares modernos{'\n'}
              • Tipos de establecimientos:{'\n'}
              - Restaurantes tradicionales{'\n'}
              - Bares y cafeterías{'\n'}
              - Hoteles{'\n'}
              • Código de vestimenta:{'\n'}
              - Uniforme{'\n'}
              - Higiene personal{'\n'}
              - Apariencia profesional{'\n'}
              • Postura y movimientos:{'\n'}
              - Postura correcta{'\n'}
              - Movimientos elegantes{'\n'}
              - Protocolo
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: معرفة المنتجات</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع المشروبات:{'\n'}
              - النبيذ الأحمر والأبيض{'\n'}
              - الشمبانيا والكافا{'\n'}
              - البيرة{'\n'}
              - الكوكتيلات{'\n'}
              • قائمة النبيذ:{'\n'}
              - أنواع النبيذ{'\n'}
              - التوفيق مع الأطباق{'\n'}
              - درجات الحرارة{'\n'}
              • الأطباق الرئيسية:{'\n'}
              - المكونات{'\n'}
              - طرق التحضير{'\n'}
              - التوصيات{'\n'}
              • المواد المسببة للحساسية:{'\n'}
              - التعرف عليها{'\n'}
              - الإعلان عنها{'\n'}
              - التعامل معها
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: CONOCIMIENTO DE PRODUCTOS</Text>
            <Text style={styles.moduleContent}>
              • Tipos de bebidas:{'\n'}
              - Vinos tintos y blancos{'\n'}
              - Champagnes y cavas{'\n'}
              - Cervezas{'\n'}
              - Cócteles{'\n'}
              • Carta de vinos:{'\n'}
              - Tipos de vinos{'\n'}
              - Maridaje con platos{'\n'}
              - Temperaturas{'\n'}
              • Platos principales:{'\n'}
              - Ingredientes{'\n'}
              - Métodos de preparación{'\n'}
              - Recomendaciones{'\n'}
              • Alérgenos:{'\n'}
              - Identificación{'\n'}
              - Declaración{'\n'}
              - Manejo
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: تقنيات الخدمة</Text>
            <Text style={styles.moduleContentAr}>
              • خدمة المائدة:{'\n'}
              - التحضير{'\n'}
              - ترتيب الأدوات{'\n'}
              - ترتيب الخدمة{'\n'}
              • خدمة المشروبات:{'\n'}
              - درجات الحرارة{'\n'}
              - الكؤوس المناسبة{'\n'}
              - طريقة التقديم{'\n'}
              • أخذ الطلبات:{'\n'}
              - الاستماع بعناية{'\n'}
              - التدوين بوضوح{'\n'}
              - التأكيد{'\n'}
              • خدمة الحلويات:{'\n'}
              - التقديم{'\n'}
              - القهوة والمشروبات{'\n'}
              - التوصيات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: TÉCNICAS DE SERVICIO</Text>
            <Text style={styles.moduleContent}>
              • Servicio de mesa:{'\n'}
              - Preparación{'\n'}
              - Colocación de cubiertos{'\n'}
              - Orden de servicio{'\n'}
              • Servicio de bebidas:{'\n'}
              - Temperaturas{'\n'}
              - Copas apropiadas{'\n'}
              - Forma de servir{'\n'}
              • Toma de comandas:{'\n'}
              - Escuchar atentamente{'\n'}
              - Anotar claramente{'\n'}
              - Confirmar{'\n'}
              • Servicio de postres:{'\n'}
              - Presentación{'\n'}
              - Cafés e infusiones{'\n'}
              - Recomendaciones
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: النظافة والسلامة</Text>
            <Text style={styles.moduleContentAr}>
              • بروتوكولات النظافة:{'\n'}
              - غسل اليدين المتكرر{'\n'}
              - استخدام القفازات{'\n'}
              - نظافة الزي{'\n'}
              • سلامة الأغذية:{'\n'}
              - مراقبة درجات الحرارة{'\n'}
              - تجنب التلوث{'\n'}
              - التخزين الصحيح{'\n'}
              • منع التسمم:{'\n'}
              - التعرف على المخاطر{'\n'}
              - الإجراءات الوقائية{'\n'}
              - البروتوكولات{'\n'}
              • الإسعافات الأولية:{'\n'}
              - الإجراءات الأساسية{'\n'}
              - حالات الطوارئ{'\n'}
              - الاتصال بالمساعدة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: HIGIENE Y SEGURIDAD</Text>
            <Text style={styles.moduleContent}>
              • Protocolos de higiene:{'\n'}
              - Lavado frecuente de manos{'\n'}
              - Uso de guantes{'\n'}
              - Limpieza de uniformes{'\n'}
              • Seguridad alimentaria:{'\n'}
              - Control de temperaturas{'\n'}
              - Evitar contaminación{'\n'}
              - Almacenamiento correcto{'\n'}
              • Prevención de intoxicaciones:{'\n'}
              - Identificar riesgos{'\n'}
              - Medidas preventivas{'\n'}
              - Protocolos{'\n'}
              • Primeros auxilios:{'\n'}
              - Procedimientos básicos{'\n'}
              - Emergencias{'\n'}
              - Llamar ayuda
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: خدمة العملاء</Text>
            <Text style={styles.moduleContentAr}>
              • التواصل الفعال:{'\n'}
              - التحية المهنية{'\n'}
              - اللغة الواضحة{'\n'}
              - نبرة الصوت{'\n'}
              • التعامل مع الشكاوى:{'\n'}
              - الاستماع{'\n'}
              - التعاطف{'\n'}
              - الحلول{'\n'}
              • الخدمة الشخصية:{'\n'}
              - فهم الاحتياجات{'\n'}
              - التوصيات{'\n'}
              - الاهتمام{'\n'}
              • ولاء العملاء:{'\n'}
              - بناء العلاقات{'\n'}
              - المتابعة{'\n'}
              - التقدير
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: ATENCIÓN AL CLIENTE</Text>
            <Text style={styles.moduleContent}>
              • Comunicación efectiva:{'\n'}
              - Saludo profesional{'\n'}
              - Lenguaje claro{'\n'}
              - Tono de voz{'\n'}
              • Manejo de quejas:{'\n'}
              - Escuchar{'\n'}
              - Empatía{'\n'}
              - Soluciones{'\n'}
              • Servicio personalizado:{'\n'}
              - Entender necesidades{'\n'}
              - Recomendaciones{'\n'}
              - Atención{'\n'}
              • Fidelización:{'\n'}
              - Construir relaciones{'\n'}
              - Seguimiento{'\n'}
              - Apreciación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: الإدارة والإدارة</Text>
            <Text style={styles.moduleContentAr}>
              • أنظمة نقطة البيع:{'\n'}
              - الاستخدام{'\n'}
              - إدارة الطلبات{'\n'}
              - التقارير{'\n'}
              • إدارة المدفوعات:{'\n'}
              - النقد{'\n'}
              - البطاقات{'\n'}
              - التطبيقات{'\n'}
              • إدارة البقشيش:{'\n'}
              - التوزيع{'\n'}
              - المعايير{'\n'}
              - الإدارة{'\n'}
              • العمل الجماعي:{'\n'}
              - التنسيق{'\n'}
              - التواصل{'\n'}
              - الدعم
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: GESTIÓN Y ADMINISTRACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Sistemas TPV:{'\n'}
              - Uso{'\n'}
              - Gestión de pedidos{'\n'}
              - Reportes{'\n'}
              • Gestión de pagos:{'\n'}
              - Efectivo{'\n'}
              - Tarjetas{'\n'}
              - Apps{'\n'}
              • Gestión de propinas:{'\n'}
              - Distribución{'\n'}
              - Estándares{'\n'}
              - Administración{'\n'}
              • Trabajo en equipo:{'\n'}
              - Coordinación{'\n'}
              - Comunicación{'\n'}
              - Apoyo
            </Text>
          </View>
        </View>

        {/* SERVICIO DE MESA */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="restaurant" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🍽️ خدمة المائدة</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>تحضير المائدة</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أدوات المائدة</Text>
              <Text style={styles.vocabEs}>Cubiertos</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>الأطباق</Text>
              <Text style={styles.vocabEs}>Vajilla</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>الكؤوس</Text>
              <Text style={styles.vocabEs}>Cristalería</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>غطاء المائدة</Text>
              <Text style={styles.vocabEs}>Mantel</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Preparación de la Mesa</Text>
          </View>
        </View>

        {/* OPORTUNIDADES LABORALES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="briefcase" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>💼 فرص العمل</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الوظائف</Text>
            <Text style={styles.textBlockAr}>
              • نادل صالة{'\n'}
              • نادل بار{'\n'}
              • رئيس الصالة{'\n'}
              • خبير نبيذ{'\n'}
              • مدير الطعام{'\n'}
              • نادل غرف
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Camarero de sala{'\n'}
              • Camarero de barra{'\n'}
              • Jefe de sala{'\n'}
              • Sommelier{'\n'}
              • Maître{'\n'}
              • Camarero de habitaciones
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
    opacity: 1,
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
