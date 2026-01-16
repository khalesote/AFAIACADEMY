import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoCarretilleroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/PreFormacionScreen")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitleAr}>سائق الرافعة الشوكية</Text>
            <Text style={styles.headerTitle}>Carretillero</Text>
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
            1. تشغيل آمن للرافعات الشوكية والرافعات{'\n'}
            2. معرفة أنواع الرافعات وخصائصها التقنية{'\n'}
            3. لوائح السلامة والوقاية من الحوادث{'\n'}
            4. تقنيات التحميل والتفريغ والنقل{'\n'}
            5. الصيانة الأساسية والفحوصات اليومية{'\n'}
            6. التشريعات والشهادات المطلوبة{'\n'}
            7. إدارة المخزون ومراقبة الموجودات{'\n'}
            8. العمل الفعال في المستودعات والمراكز اللوجستية
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Operación segura de carretillas elevadoras y transpaletas{'\n'}
            2. Conocimiento de tipos de carretillas y sus características técnicas{'\n'}
            3. Normativas de seguridad y prevención de accidentes{'\n'}
            4. Técnicas de carga, descarga y transporte de mercancías{'\n'}
            5. Mantenimiento básico y revisiones diarias{'\n'}
            6. Legislación aplicable y certificaciones requeridas{'\n'}
            7. Gestión de inventarios y control de stocks{'\n'}
            8. Trabajo eficiente en almacenes y centros logísticos
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • أساسيات الرافعات{'\n'}
            • التشغيل الآمن{'\n'}
            • التحميل والتفريغ{'\n'}
            • الصيانة والإصلاحات{'\n'}
            • التشريعات والشهادات{'\n'}
            • الإدارة اللوجستية
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Fundamentos de carretillas{'\n'}
            • Operación segura{'\n'}
            • Carga y descarga{'\n'}
            • Mantenimiento y reparaciones{'\n'}
            • Legislación y certificación{'\n'}
            • Gestión logística
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>رافعة شوكية</Text>
            <Text style={styles.vocabEs}>Carretilla elevadora</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>منصة</Text>
            <Text style={styles.vocabEs}>Paleta</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>تحميل</Text>
            <Text style={styles.vocabEs}>Carga</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>تفريغ</Text>
            <Text style={styles.vocabEs}>Descarga</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سلامة</Text>
            <Text style={styles.vocabEs}>Seguridad</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات الرافعات</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الرافعات الشوكية:{'\n'}
              - المتوازنة{'\n'}
              - القابلة للطي{'\n'}
              - المكدسة{'\n'}
              - ذات السارية العالية{'\n'}
              • المكونات والوظائف:{'\n'}
              - الشوكات{'\n'}
              - المرفاع{'\n'}
              - المحرك{'\n'}
              • لوائح السلامة:{'\n'}
              - المعايير الأوروبية{'\n'}
              - البروتوكولات{'\n'}
              • معدات الحماية:{'\n'}
              - الخوذة{'\n'}
              - الأحذية{'\n'}
              - القفازات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE CARRETILLAS</Text>
            <Text style={styles.moduleContent}>
              • Tipos de carretillas:{'\n'}
              - Contrapesadas{'\n'}
              - Retráctiles{'\n'}
              - Apiladoras{'\n'}
              - De mástil alto{'\n'}
              • Componentes y funcionamiento:{'\n'}
              - Horquillas{'\n'}
              - Mástil{'\n'}
              - Motor{'\n'}
              • Normativas de seguridad:{'\n'}
              - Estándares europeos{'\n'}
              - Protocolos{'\n'}
              • Equipos de protección:{'\n'}
              - Casco{'\n'}
              - Botas{'\n'}
              - Guantes
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: التشغيل الآمن</Text>
            <Text style={styles.moduleContentAr}>
              • الفحص قبل الاستخدام:{'\n'}
              - الفحص البصري{'\n'}
              - فحص المكونات{'\n'}
              - فحص السوائل{'\n'}
              • تقنيات القيادة الآمنة:{'\n'}
              - الوضعية الصحيحة{'\n'}
              - السرعة المناسبة{'\n'}
              - الانتباه{'\n'}
              • التعامل مع الأحمال:{'\n'}
              - توزيع الوزن{'\n'}
              - الاستقرار{'\n'}
              - التوازن{'\n'}
              • الإشارات والاتصالات:{'\n'}
              - الإشارات اليدوية{'\n'}
              - التواصل{'\n'}
              - التنسيق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: OPERACIÓN SEGURA</Text>
            <Text style={styles.moduleContent}>
              • Inspección previa:{'\n'}
              - Inspección visual{'\n'}
              - Verificar componentes{'\n'}
              - Verificar fluidos{'\n'}
              • Técnicas de conducción:{'\n'}
              - Postura correcta{'\n'}
              - Velocidad adecuada{'\n'}
              - Atención{'\n'}
              • Manejo de cargas:{'\n'}
              - Distribución de peso{'\n'}
              - Estabilidad{'\n'}
              - Equilibrio{'\n'}
              • Señales y comunicaciones:{'\n'}
              - Señales manuales{'\n'}
              - Comunicación{'\n'}
              - Coordinación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: التحميل والتفريغ</Text>
            <Text style={styles.moduleContentAr}>
              • تقنيات التكديس:{'\n'}
              - الوضع الصحيح{'\n'}
              - الارتفاع المناسب{'\n'}
              - الاستقرار{'\n'}
              • التخزين الآمن:{'\n'}
              - توزيع الأحمال{'\n'}
              - المسافات{'\n'}
              - التنظيم{'\n'}
              • استخدام الملحقات:{'\n'}
              - الملحقات الخاصة{'\n'}
              - الاستخدام الصحيح{'\n'}
              • تحسين المساحة:{'\n'}
              - التنظيم{'\n'}
              - الاستفادة القصوى{'\n'}
              - الكفاءة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: CARGA Y DESCARGA</Text>
            <Text style={styles.moduleContent}>
              • Técnicas de apilamiento:{'\n'}
              - Posición correcta{'\n'}
              - Altura adecuada{'\n'}
              - Estabilidad{'\n'}
              • Estiba segura:{'\n'}
              - Distribución de cargas{'\n'}
              - Distancias{'\n'}
              - Organización{'\n'}
              • Uso de accesorios:{'\n'}
              - Accesorios especiales{'\n'}
              - Uso correcto{'\n'}
              • Optimización del espacio:{'\n'}
              - Organización{'\n'}
              - Máximo aprovechamiento{'\n'}
              - Eficiencia
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الصيانة والإصلاحات</Text>
            <Text style={styles.moduleContentAr}>
              • الفحوصات اليومية:{'\n'}
              - القائمة اليومية{'\n'}
              - الفحص البصري{'\n'}
              - الاختبارات{'\n'}
              • الفحوصات الدورية:{'\n'}
              - الجدول الزمني{'\n'}
              - الصيانة الوقائية{'\n'}
              - الاستبدال{'\n'}
              • تحديد الأعطال:{'\n'}
              - الأعراض{'\n'}
              - التشخيص{'\n'}
              - الإبلاغ{'\n'}
              • إجراءات الطوارئ:{'\n'}
              - الحالات الطارئة{'\n'}
              - الإجراءات{'\n'}
              - الاتصال
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: MANTENIMIENTO Y REPARACIONES</Text>
            <Text style={styles.moduleContent}>
              • Revisiones diarias:{'\n'}
              - Lista diaria{'\n'}
              - Inspección visual{'\n'}
              - Pruebas{'\n'}
              • Revisiones periódicas:{'\n'}
              - Calendario{'\n'}
              - Mantenimiento preventivo{'\n'}
              - Reemplazo{'\n'}
              • Identificación de averías:{'\n'}
              - Síntomas{'\n'}
              - Diagnóstico{'\n'}
              - Reporte{'\n'}
              • Procedimientos de emergencia:{'\n'}
              - Situaciones de emergencia{'\n'}
              - Procedimientos{'\n'}
              - Contacto
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: التشريعات والشهادات</Text>
            <Text style={styles.moduleContentAr}>
              • اللوائح الإسبانية:{'\n'}
              - القوانين{'\n'}
              - المعايير{'\n'}
              - المتطلبات{'\n'}
              • واجبات المشغل:{'\n'}
              - المسؤوليات{'\n'}
              - الواجبات{'\n'}
              - الالتزام{'\n'}
              • الشهادة الرسمية:{'\n'}
              - المتطلبات{'\n'}
              - التدريب{'\n'}
              - الامتحان{'\n'}
              • تجديد الرخص:{'\n'}
              - الجدول الزمني{'\n'}
              - المتطلبات{'\n'}
              - الإجراءات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: LEGISLACIÓN Y CERTIFICACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Normativa española:{'\n'}
              - Leyes{'\n'}
              - Estándares{'\n'}
              - Requisitos{'\n'}
              • Obligaciones del operador:{'\n'}
              - Responsabilidades{'\n'}
              - Deberes{'\n'}
              - Cumplimiento{'\n'}
              • Certificación oficial:{'\n'}
              - Requisitos{'\n'}
              - Formación{'\n'}
              - Examen{'\n'}
              • Renovación de carnés:{'\n'}
              - Calendario{'\n'}
              - Requisitos{'\n'}
              - Procedimientos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: الإدارة اللوجستية</Text>
            <Text style={styles.moduleContentAr}>
              • تنظيم المستودعات:{'\n'}
              - التخطيط{'\n'}
              - التنظيم{'\n'}
              - الكفاءة{'\n'}
              • مراقبة المخزون:{'\n'}
              - التسجيل{'\n'}
              - المتابعة{'\n'}
              - التقارير{'\n'}
              • تحسين المسارات:{'\n'}
              - التخطيط{'\n'}
              - المسافات{'\n'}
              - الوقت{'\n'}
              • العمل الجماعي:{'\n'}
              - التنسيق{'\n'}
              - التواصل{'\n'}
              - التعاون
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: GESTIÓN LOGÍSTICA</Text>
            <Text style={styles.moduleContent}>
              • Organización de almacenes:{'\n'}
              - Planificación{'\n'}
              - Organización{'\n'}
              - Eficiencia{'\n'}
              • Control de inventarios:{'\n'}
              - Registro{'\n'}
              - Seguimiento{'\n'}
              - Reportes{'\n'}
              • Optimización de rutas:{'\n'}
              - Planificación{'\n'}
              - Distancias{'\n'}
              - Tiempo{'\n'}
              • Trabajo en equipo:{'\n'}
              - Coordinación{'\n'}
              - Comunicación{'\n'}
              - Cooperación
            </Text>
          </View>
        </View>

        {/* TIPOS DE CARRETILLAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🚛 أنواع الرافعات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الرافعات الشوكية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>متوازنة</Text>
              <Text style={styles.vocabEs}>Contrapesada</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قابلة للطي</Text>
              <Text style={styles.vocabEs}>Retráctil</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مكدسة</Text>
              <Text style={styles.vocabEs}>Apiladora</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Carretillas Elevadoras</Text>
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
              • مشغل رافعة شوكية{'\n'}
              • مشغل مستودع{'\n'}
              • منسق لوجستي{'\n'}
              • مشرف مستودع{'\n'}
              • مدير مخزون{'\n'}
              • فني رافعات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Operador de carretilla elevadora{'\n'}
              • Operador de almacén{'\n'}
              • Coordinador logístico{'\n'}
              • Supervisor de almacén{'\n'}
              • Gestor de inventarios{'\n'}
              • Técnico de carretillas
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
