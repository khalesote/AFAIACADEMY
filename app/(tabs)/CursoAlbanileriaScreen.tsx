import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoAlbanileriaScreen() {
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
            <Text style={styles.headerTitleAr}>دورة البناء</Text>
            <Text style={styles.headerTitle}>Curso de Albañilería</Text>
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
            1. التقنيات الأساسية للبناء{'\n'}
            2. العمل مع الإسمنت والطوب{'\n'}
            3. إصلاح الجدران والجدران{'\n'}
            4. استخدام أدوات البناء{'\n'}
            5. السلامة في البناء
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas básicas de construcción{'\n'}
            2. Trabajo con cemento y ladrillos{'\n'}
            3. Reparación de paredes y muros{'\n'}
            4. Uso de herramientas de construcción{'\n'}
            5. Seguridad en construcción
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • تقنيات البناء{'\n'}
            • المواد الأساسية{'\n'}
            • الأدوات{'\n'}
            • الإصلاحات الأساسية{'\n'}
            • السلامة
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Técnicas de construcción{'\n'}
            • Materiales básicos{'\n'}
            • Herramientas{'\n'}
            • Reparaciones básicas{'\n'}
            • Seguridad
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>طوبة</Text>
            <Text style={styles.vocabEs}>Ladrillo</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>إسمنت</Text>
            <Text style={styles.vocabEs}>Cemento</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>جدار</Text>
            <Text style={styles.vocabEs}>Pared</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>أداة</Text>
            <Text style={styles.vocabEs}>Herramienta</Text>
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
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: أساسيات البناء</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع التربة والأساسات:{'\n'}
              - أنواع التربة{'\n'}
              - الأساسات{'\n'}
              - التحضير{'\n'}
              • قراءة المخططات:{'\n'}
              - فهم المخططات{'\n'}
              - الرموز{'\n'}
              - القياسات{'\n'}
              • القياسات والتسوية:{'\n'}
              - أدوات القياس{'\n'}
              - التسوية{'\n'}
              - الدقة{'\n'}
              • الهندسة التطبيقية:{'\n'}
              - الحسابات{'\n'}
              - الزوايا{'\n'}
              - المنحدرات{'\n'}
              • لوائح البناء:{'\n'}
              - القوانين{'\n'}
              - المعايير{'\n'}
              - التصاريح
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: FUNDAMENTOS DE LA CONSTRUCCIÓN</Text>
            <Text style={styles.moduleContent}>
              • Tipos de suelo y cimentación:{'\n'}
              - Tipos de suelo{'\n'}
              - Cimentaciones{'\n'}
              - Preparación{'\n'}
              • Lectura de planos:{'\n'}
              - Comprensión de planos{'\n'}
              - Símbolos{'\n'}
              - Medidas{'\n'}
              • Medidas y nivelación:{'\n'}
              - Herramientas de medición{'\n'}
              - Nivelación{'\n'}
              - Precisión{'\n'}
              • Geometría aplicada:{'\n'}
              - Cálculos{'\n'}
              - Ángulos{'\n'}
              - Pendientes{'\n'}
              • Normativas de construcción:{'\n'}
              - Leyes{'\n'}
              - Estándares{'\n'}
              - Permisos
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: مواد البناء</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الإسمنت:{'\n'}
              - الإسمنت البورتلاندي{'\n'}
              - الإسمنت المختلط{'\n'}
              - الاستخدامات{'\n'}
              • الركام:{'\n'}
              - الرمل{'\n'}
              - الحصى{'\n'}
              - الحجر{'\n'}
              • الطوب:{'\n'}
              - الطوب السيراميكي{'\n'}
              - طوب الخرسانة{'\n'}
              - الطوب المقاوم للحرارة{'\n'}
              • كتل الخرسانة:{'\n'}
              - الأنواع{'\n'}
              - الأبعاد{'\n'}
              • المواد العازلة:{'\n'}
              - أنواع العزل{'\n'}
              - مواد التشطيب
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: MATERIALES DE CONSTRUCCIÓN</Text>
            <Text style={styles.moduleContent}>
              • Tipos de cemento:{'\n'}
              - Cemento Portland{'\n'}
              - Cemento mixto{'\n'}
              - Usos{'\n'}
              • Agregados:{'\n'}
              - Arena{'\n'}
              - Grava{'\n'}
              - Piedra{'\n'}
              • Ladrillos:{'\n'}
              - Ladrillos cerámicos{'\n'}
              - Ladrillos de hormigón{'\n'}
              - Ladrillos refractarios{'\n'}
              • Bloques de hormigón:{'\n'}
              - Tipos{'\n'}
              - Dimensiones{'\n'}
              • Materiales aislantes:{'\n'}
              - Tipos de aislamiento{'\n'}
              - Materiales de acabado
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: الأدوات والمعدات</Text>
            <Text style={styles.moduleContentAr}>
              • الأدوات اليدوية:{'\n'}
              - المجرفة{'\n'}
              - الإزميل{'\n'}
              - المطرقة{'\n'}
              - الميزان{'\n'}
              - الشاقول{'\n'}
              • الأدوات الكهربائية:{'\n'}
              - المثقاب{'\n'}
              - الطاحونة{'\n'}
              - الهزاز{'\n'}
              - المنشار الدائري{'\n'}
              • معدات القياس:{'\n'}
              - الميزان الليزري{'\n'}
              - الشريط الليزري{'\n'}
              • صيانة الأدوات:{'\n'}
              - التنظيف{'\n'}
              - الصيانة{'\n'}
              - التخزين
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: HERRAMIENTAS Y EQUIPOS</Text>
            <Text style={styles.moduleContent}>
              • Herramientas manuales:{'\n'}
              - Paleta{'\n'}
              - Cincel{'\n'}
              - Martillo{'\n'}
              - Nivel{'\n'}
              - Plomada{'\n'}
              • Herramientas eléctricas:{'\n'}
              - Taladro{'\n'}
              - Amoladora{'\n'}
              - Vibrador{'\n'}
              - Sierra circular{'\n'}
              • Equipos de medición:{'\n'}
              - Nivel láser{'\n'}
              - Cinta láser{'\n'}
              • Mantenimiento:{'\n'}
              - Limpieza{'\n'}
              - Mantenimiento{'\n'}
              - Almacenamiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: تقنيات البناء</Text>
            <Text style={styles.moduleContentAr}>
              • تحضير الملاط:{'\n'}
              - نسب الخلط{'\n'}
              - التحضير{'\n'}
              - الخرسانة{'\n'}
              • تقنيات وضع الطوب:{'\n'}
              - النمط الطولي{'\n'}
              - النمط العرضي{'\n'}
              - النمط المختلط{'\n'}
              • بناء الأعمدة:{'\n'}
              - أعمدة الطوب{'\n'}
              - أعمدة الخرسانة{'\n'}
              - التعزيزات{'\n'}
              • الفتحات:{'\n'}
              - العتبات{'\n'}
              - الأقواس{'\n'}
              - النوافذ والأبواب{'\n'}
              • التعزيزات:{'\n'}
              - الشبكات{'\n'}
              - التسليح
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: TÉCNICAS DE ALBAÑILERÍA</Text>
            <Text style={styles.moduleContent}>
              • Preparación de morteros:{'\n'}
              - Proporciones{'\n'}
              - Preparación{'\n'}
              - Hormigones{'\n'}
              • Técnicas de asentado:{'\n'}
              - Aparejo a soga{'\n'}
              - Aparejo a tizón{'\n'}
              - Aparejo palomero{'\n'}
              • Construcción de pilares:{'\n'}
              - Pilares de ladrillo{'\n'}
              - Pilares de hormigón{'\n'}
              - Refuerzos{'\n'}
              • Aberturas:{'\n'}
              - Dinteles{'\n'}
              - Arcos{'\n'}
              - Ventanas y puertas{'\n'}
              • Refuerzos:{'\n'}
              - Mallas{'\n'}
              - Armaduras
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: بناء الجدران</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الأنماط:{'\n'}
              - النمط الطولي{'\n'}
              - النمط العرضي{'\n'}
              - النمط المختلط{'\n'}
              • الجدران الحاملة:{'\n'}
              - البناء{'\n'}
              - التعزيزات{'\n'}
              • الجدران الفاصلة:{'\n'}
              - البناء{'\n'}
              - الحواجز{'\n'}
              • الفتحات:{'\n'}
              - الأبواب{'\n'}
              - النوافذ{'\n'}
              - التركيب{'\n'}
              • مفاصل التمدد:{'\n'}
              - الأنواع{'\n'}
              - التطبيق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: CONSTRUCCIÓN DE MUROS</Text>
            <Text style={styles.moduleContent}>
              • Tipos de aparejo:{'\n'}
              - Aparejo a soga{'\n'}
              - Aparejo a tizón{'\n'}
              - Aparejo palomero{'\n'}
              • Muros de carga:{'\n'}
              - Construcción{'\n'}
              - Refuerzos{'\n'}
              • Muros divisorios:{'\n'}
              - Construcción{'\n'}
              - Tabiques{'\n'}
              • Aberturas:{'\n'}
              - Puertas{'\n'}
              - Ventanas{'\n'}
              - Instalación{'\n'}
              • Juntas de dilatación:{'\n'}
              - Tipos{'\n'}
              - Aplicación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: التشطيبات والطلاء</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الطلاء:{'\n'}
              - طلاء الإسمنت{'\n'}
              - طلاء الجير{'\n'}
              - طلاء الجبس{'\n'}
              • تحضير الأسطح:{'\n'}
              - التنظيف{'\n'}
              - التحضير{'\n'}
              • تقنيات التطبيق:{'\n'}
              - التطبيق اليدوي{'\n'}
              - الرش الميكانيكي{'\n'}
              - التشطيب{'\n'}
              • التشطيبات الخاصة:{'\n'}
              - الجص{'\n'}
              - الملمس{'\n'}
              • الطلاء:{'\n'}
              - الأنواع{'\n'}
              - التطبيق
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: ACABADOS Y REVOCOS</Text>
            <Text style={styles.moduleContent}>
              • Tipos de revoco:{'\n'}
              - Revoco de cemento{'\n'}
              - Revoco de cal{'\n'}
              - Revoco de yeso{'\n'}
              • Preparación de superficies:{'\n'}
              - Limpieza{'\n'}
              - Preparación{'\n'}
              • Técnicas de aplicación:{'\n'}
              - Aplicación manual{'\n'}
              - Proyección mecánica{'\n'}
              - Acabado{'\n'}
              • Acabados especiales:{'\n'}
              - Estuco{'\n'}
              - Texturizado{'\n'}
              • Pintura:{'\n'}
              - Tipos{'\n'}
              - Aplicación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السابعة: الإصلاحات والصيانة</Text>
            <Text style={styles.moduleContentAr}>
              • تشخيص المشاكل:{'\n'}
              - تحديد المشاكل{'\n'}
              - التقييم{'\n'}
              • إصلاح الشقوق:{'\n'}
              - أنواع الشقوق{'\n'}
              - الإصلاح{'\n'}
              • إعادة بناء الجدران:{'\n'}
              - الهدم{'\n'}
              - إعادة البناء{'\n'}
              • العزل المائي:{'\n'}
              - المعالجة{'\n'}
              - التطبيق{'\n'}
              • الصيانة الوقائية:{'\n'}
              - الفحص{'\n'}
              - الصيانة
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 7: REPARACIONES Y MANTENIMIENTO</Text>
            <Text style={styles.moduleContent}>
              • Diagnóstico de problemas:{'\n'}
              - Identificación{'\n'}
              - Evaluación{'\n'}
              • Reparación de grietas:{'\n'}
              - Tipos de grietas{'\n'}
              - Reparación{'\n'}
              • Reconstrucción de muros:{'\n'}
              - Demolición{'\n'}
              - Reconstrucción{'\n'}
              • Impermeabilización:{'\n'}
              - Tratamiento{'\n'}
              - Aplicación{'\n'}
              • Mantenimiento preventivo:{'\n'}
              - Inspección{'\n'}
              - Mantenimiento
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثامنة: السلامة والوقاية</Text>
            <Text style={styles.moduleContentAr}>
              • معدات الحماية:{'\n'}
              - الخوذة{'\n'}
              - النظارات{'\n'}
              - القفازات{'\n'}
              - الأحذية{'\n'}
              - الحزام{'\n'}
              • لوائح السلامة:{'\n'}
              - القوانين{'\n'}
              - البروتوكولات{'\n'}
              • منع الحوادث:{'\n'}
              - فحص الأدوات{'\n'}
              - النظام{'\n'}
              - التواصل{'\n'}
              • الإسعافات الأولية:{'\n'}
              - صندوق الإسعافات{'\n'}
              - الإجراءات{'\n'}
              • إدارة النفايات:{'\n'}
              - الفصل{'\n'}
              - التخلص
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 8: SEGURIDAD Y NORMATIVAS</Text>
            <Text style={styles.moduleContent}>
              • Equipos de protección:{'\n'}
              - Casco{'\n'}
              - Gafas{'\n'}
              - Guantes{'\n'}
              - Botas{'\n'}
              - Arnés{'\n'}
              • Normativas de seguridad:{'\n'}
              - Leyes{'\n'}
              - Protocolos{'\n'}
              • Prevención de accidentes:{'\n'}
              - Revisión de herramientas{'\n'}
              - Orden{'\n'}
              - Comunicación{'\n'}
              • Primeros auxilios:{'\n'}
              - Botiquín{'\n'}
              - Procedimientos{'\n'}
              • Gestión de residuos:{'\n'}
              - Separación{'\n'}
              - Eliminación
            </Text>
          </View>
        </View>

        {/* MATERIALES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>🧱 المواد</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>المواد الأساسية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>طوبة</Text>
              <Text style={styles.vocabEs}>Ladrillo</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>إسمنت</Text>
              <Text style={styles.vocabEs}>Cemento</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>رمل</Text>
              <Text style={styles.vocabEs}>Arena</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>حصى</Text>
              <Text style={styles.vocabEs}>Grava</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Materiales Básicos</Text>
          </View>
        </View>

        {/* HERRAMIENTAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="construct" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>🛠️ الأدوات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الأدوات اليدوية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مجرفة</Text>
              <Text style={styles.vocabEs}>Paleta</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>مطرقة</Text>
              <Text style={styles.vocabEs}>Martillo</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>ميزان</Text>
              <Text style={styles.vocabEs}>Nivel</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>شاقول</Text>
              <Text style={styles.vocabEs}>Plomada</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Herramientas Manuales</Text>
          </View>
        </View>

        {/* SEGURIDAD */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#000" />
            <Text style={styles.sectionTitleAr}>⚠️ السلامة</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>معدات الحماية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>خوذة أمان</Text>
              <Text style={styles.vocabEs}>Casco de seguridad</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>نظارات حماية</Text>
              <Text style={styles.vocabEs}>Gafas de protección</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أحذية أمان</Text>
              <Text style={styles.vocabEs}>Botas de seguridad</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Equipos de Protección</Text>
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
              • بناء متخصص{'\n'}
              • معلم أعمال{'\n'}
              • مسؤول موقع{'\n'}
              • فني مراقبة جودة{'\n'}
              • مشرف بناء
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Albañil especializado{'\n'}
              • Maestro de obras{'\n'}
              • Encargado de obra{'\n'}
              • Técnico de control de calidad{'\n'}
              • Supervisor de construcción
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
