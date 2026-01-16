import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoSoldaduraScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/PreFormacionScreen")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitleAr}>لحام</Text>
            <Text style={styles.headerTitle}>Soldadura</Text>
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
            1. تقنيات أساسية للحام القوس الكهربائي{'\n'}
            2. الحام MIG/MAG مع الغاز الواقي{'\n'}
            3. الحام TIG مع قطب التنغستن{'\n'}
            4. القطع وإعداد القطع المعدنية{'\n'}
            5. قراءة المخططات التقنية{'\n'}
            6. السلامة المهنية للحام{'\n'}
            7. مراقبة الجودة والاختبارات{'\n'}
            8. صيانة المعدات وحل المشاكل
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas fundamentales de soldadura por arco eléctrico{'\n'}
            2. Soldadura MIG/MAG con gas protector{'\n'}
            3. Soldadura TIG con electrodo de tungsteno{'\n'}
            4. Corte y preparación de piezas metálicas{'\n'}
            5. Interpretación de planos técnicos{'\n'}
            6. Seguridad laboral específica{'\n'}
            7. Control de calidad y ensayos{'\n'}
            8. Mantenimiento de equipos y resolución de problemas
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • أساسيات اللحام{'\n'}
            • اللحام SMAW{'\n'}
            • اللحام MIG/MAG{'\n'}
            • اللحام TIG{'\n'}
            • القطع والإعداد{'\n'}
            • مراقبة الجودة{'\n'}
            • الصيانة والإصلاح
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Fundamentos de la soldadura{'\n'}
            • Soldadura SMAW{'\n'}
            • Soldadura MIG/MAG{'\n'}
            • Soldadura TIG{'\n'}
            • Corte y preparación{'\n'}
            • Control de calidad{'\n'}
            • Mantenimiento y reparación
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>لحام</Text>
            <Text style={styles.vocabEs}>Soldadura</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>قوس</Text>
            <Text style={styles.vocabEs}>Arco</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>قطب</Text>
            <Text style={styles.vocabEs}>Electrodo</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>قطع</Text>
            <Text style={styles.vocabEs}>Corte</Text>
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
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات اللحام</Text>
            <Text style={styles.moduleContentAr}>
              • عمليات اللحام:{'\n'}
              - الأنواع المختلفة{'\n'}
              - التطبيقات{'\n'}
              - الاختيار{'\n'}
              • المواد الأساسية:{'\n'}
              - المعادن{'\n'}
              - الأقطاب{'\n'}
              - الخصائص{'\n'}
              • المعدات:{'\n'}
              - المعدات الأساسية{'\n'}
              - الأدوات{'\n'}
              - الاستخدام{'\n'}
              • السلامة:{'\n'}
              - البروتوكولات{'\n'}
              - معدات الحماية{'\n'}
              - الإجراءات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA SOLDADURA</Text>
            <Text style={styles.moduleContent}>
              • Procesos de soldadura:{'\n'}
              - Diferentes tipos{'\n'}
              - Aplicaciones{'\n'}
              - Selección{'\n'}
              • Materiales base:{'\n'}
              - Metales{'\n'}
              - Electrodos{'\n'}
              - Características{'\n'}
              • Equipos:{'\n'}
              - Equipos básicos{'\n'}
              - Herramientas{'\n'}
              - Uso{'\n'}
              • Seguridad:{'\n'}
              - Protocolos{'\n'}
              - Equipos de protección{'\n'}
              - Procedimientos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: اللحام SMAW</Text>
            <Text style={styles.moduleContentAr}>
              • تقنية القوس الكهربائي:{'\n'}
              - الأساسيات{'\n'}
              - التقنيات{'\n'}
              - التحكم{'\n'}
              • تحضير الأقطاب:{'\n'}
              - الاختيار{'\n'}
              - التحضير{'\n'}
              - الاستخدام{'\n'}
              • أوضاع اللحام:{'\n'}
              - الأوضاع المختلفة{'\n'}
              - التقنيات{'\n'}
              - الممارسة{'\n'}
              • التحكم في المعاملات:{'\n'}
              - الجهد{'\n'}
              - التيار{'\n'}
              - السرعة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: SOLDADURA SMAW (ARCO MANUAL)</Text>
            <Text style={styles.moduleContent}>
              • Técnica de arco eléctrico:{'\n'}
              - Fundamentos{'\n'}
              - Técnicas{'\n'}
              - Control{'\n'}
              • Preparación de electrodos:{'\n'}
              - Selección{'\n'}
              - Preparación{'\n'}
              - Uso{'\n'}
              • Posiciones de soldadura:{'\n'}
              - Diferentes posiciones{'\n'}
              - Técnicas{'\n'}
              - Práctica{'\n'}
              • Control de parámetros:{'\n'}
              - Voltaje{'\n'}
              - Corriente{'\n'}
              - Velocidad
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: اللحام MIG/MAG</Text>
            <Text style={styles.moduleContentAr}>
              • المعدات شبه الآلية:{'\n'}
              - المعدات{'\n'}
              - الإعداد{'\n'}
              - الاستخدام{'\n'}
              • الغازات الواقية:{'\n'}
              - الأنواع{'\n'}
              - الاختيار{'\n'}
              - الاستخدام{'\n'}
              • الأسلاك المستمرة:{'\n'}
              - الأنواع{'\n'}
              - الاختيار{'\n'}
              - التطبيق{'\n'}
              • التطبيقات الصناعية:{'\n'}
              - الاستخدامات{'\n'}
              - التقنيات{'\n'}
              - الممارسة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: SOLDADURA MIG/MAG</Text>
            <Text style={styles.moduleContent}>
              • Equipo semiautomático:{'\n'}
              - Equipos{'\n'}
              - Configuración{'\n'}
              - Uso{'\n'}
              • Gases protectores:{'\n'}
              - Tipos{'\n'}
              - Selección{'\n'}
              - Uso{'\n'}
              • Alambres continuos:{'\n'}
              - Tipos{'\n'}
              - Selección{'\n'}
              - Aplicación{'\n'}
              • Aplicaciones industriales:{'\n'}
              - Usos{'\n'}
              - Técnicas{'\n'}
              - Práctica
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: اللحام TIG</Text>
            <Text style={styles.moduleContentAr}>
              • تقنية الدقة العالية:{'\n'}
              - الأساسيات{'\n'}
              - التقنيات{'\n'}
              - التحكم{'\n'}
              • قطب التنغستن:{'\n'}
              - الأنواع{'\n'}
              - التحضير{'\n'}
              - الاستخدام{'\n'}
              • المعادن غير الحديدية:{'\n'}
              - الألومنيوم{'\n'}
              - النحاس{'\n'}
              - التقنيات{'\n'}
              • التطبيقات المتخصصة:{'\n'}
              - الاستخدامات{'\n'}
              - التقنيات{'\n'}
              - الممارسة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: SOLDADURA TIG</Text>
            <Text style={styles.moduleContent}>
              • Técnica de alta precisión:{'\n'}
              - Fundamentos{'\n'}
              - Técnicas{'\n'}
              - Control{'\n'}
              • Electrodo de tungsteno:{'\n'}
              - Tipos{'\n'}
              - Preparación{'\n'}
              - Uso{'\n'}
              • Metales no ferrosos:{'\n'}
              - Aluminio{'\n'}
              - Cobre{'\n'}
              - Técnicas{'\n'}
              • Aplicaciones especializadas:{'\n'}
              - Usos{'\n'}
              - Técnicas{'\n'}
              - Práctica
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: القطع والإعداد</Text>
            <Text style={styles.moduleContentAr}>
              • الأوكسي والبلازما:{'\n'}
              - التقنيات{'\n'}
              - الاستخدام{'\n'}
              - التحكم{'\n'}
              • تحضير الحواف:{'\n'}
              - التقنيات{'\n'}
              - التحضير{'\n'}
              - الجودة{'\n'}
              • محاذاة القطع:{'\n'}
              - التقنيات{'\n'}
              - المحاذاة{'\n'}
              - الدقة{'\n'}
              • تنظيف الأسطح:{'\n'}
              - التنظيف{'\n'}
              - التحضير{'\n'}
              - الجودة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: CORTE Y PREPARACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Oxicorte y plasma:{'\n'}
              - Técnicas{'\n'}
              - Uso{'\n'}
              - Control{'\n'}
              • Preparación de bordes:{'\n'}
              - Técnicas{'\n'}
              - Preparación{'\n'}
              - Calidad{'\n'}
              • Alineación de piezas:{'\n'}
              - Técnicas{'\n'}
              - Alineación{'\n'}
              - Precisión{'\n'}
              • Limpieza de superficies:{'\n'}
              - Limpieza{'\n'}
              - Preparación{'\n'}
              - Calidad
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: مراقبة الجودة</Text>
            <Text style={styles.moduleContentAr}>
              • الفحص البصري:{'\n'}
              - التقنيات{'\n'}
              - الفحص{'\n'}
              - التقييم{'\n'}
              • الاختبارات:{'\n'}
              - الاختبارات التدميرية{'\n'}
              - الاختبارات غير التدميرية{'\n'}
              - التقييم{'\n'}
              • اللوائح:{'\n'}
              - المعايير{'\n'}
              - المتطلبات{'\n'}
              - الالتزام{'\n'}
              • شهادة اللحامين:{'\n'}
              - المتطلبات{'\n'}
              - الإجراءات{'\n'}
              - الشهادات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: CONTROL DE CALIDAD</Text>
            <Text style={styles.moduleContent}>
              • Inspección visual:{'\n'}
              - Técnicas{'\n'}
              - Inspección{'\n'}
              - Evaluación{'\n'}
              • Ensayos:{'\n'}
              - Ensayos destructivos{'\n'}
              - Ensayos no destructivos{'\n'}
              - Evaluación{'\n'}
              • Normativas:{'\n'}
              - Estándares{'\n'}
              - Requisitos{'\n'}
              - Cumplimiento{'\n'}
              • Certificación:{'\n'}
              - Requisitos{'\n'}
              - Procedimientos{'\n'}
              - Certificados
            </Text>
          </View>
        </View>

        {/* SEGURIDAD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🛡️ السلامة</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>معدات الحماية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>خوذة</Text>
              <Text style={styles.vocabEs}>Casco</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نظارات</Text>
              <Text style={styles.vocabEs}>Gafas</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>قفازات</Text>
              <Text style={styles.vocabEs}>Guantes</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مئزر</Text>
              <Text style={styles.vocabEs}>Delantal</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Equipos de Protección</Text>
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
              • لحام{'\n'}
              • لحام متخصص{'\n'}
              • فني لحام{'\n'}
              • مشرف لحام{'\n'}
              • مدير ورشة{'\n'}
              • فني صيانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Soldador{'\n'}
              • Soldador especializado{'\n'}
              • Técnico de soldadura{'\n'}
              • Supervisor de soldadura{'\n'}
              • Jefe de taller{'\n'}
              • Técnico de mantenimiento
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
