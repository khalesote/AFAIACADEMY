import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoPinturaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/PreFormacionScreen")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitleAr}>دهان وزخرفة</Text>
            <Text style={styles.headerTitle}>Pintura y Decoración</Text>
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
            1. تقنيات مهنية للدهان الداخلي والخارجي{'\n'}
            2. معرفة أنواع الدهانات والتشطيبات المختلفة{'\n'}
            3. تحضير الأسطح والتطبيق الصحيح{'\n'}
            4. تقنيات زخرفية متقدمة وتأثيرات خاصة{'\n'}
            5. السلامة في التعامل مع المواد الكيميائية{'\n'}
            6. التصميم وتخطيط مشاريع الديكور{'\n'}
            7. الصيانة وإصلاح الأسطح المطلية{'\n'}
            8. إدارة المشاريع وميزانيات الدهان
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas profesionales de pintura interior y exterior{'\n'}
            2. Conocimiento de diferentes tipos de pinturas y acabados{'\n'}
            3. Preparación de superficies y aplicación correcta{'\n'}
            4. Técnicas decorativas avanzadas y efectos especiales{'\n'}
            5. Seguridad en el manejo de productos químicos y equipos{'\n'}
            6. Diseño y planificación de proyectos de decoración{'\n'}
            7. Mantenimiento y reparación de superficies pintadas{'\n'}
            8. Gestión de proyectos y presupuestos de pintura
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • المواد والأدوات{'\n'}
            • تحضير الأسطح{'\n'}
            • تقنيات الدهان الأساسية{'\n'}
            • الدهان الخارجي{'\n'}
            • التقنيات الزخرفية{'\n'}
            • السلامة والبيئة{'\n'}
            • إدارة المشاريع
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Materiales y herramientas{'\n'}
            • Preparación de superficies{'\n'}
            • Técnicas de pintura básica{'\n'}
            • Pintura exterior{'\n'}
            • Técnicas decorativas{'\n'}
            • Seguridad y medio ambiente{'\n'}
            • Gestión de proyectos
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>دهان</Text>
            <Text style={styles.vocabEs}>Pintura</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>فرشاة</Text>
            <Text style={styles.vocabEs}>Brocha</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>أسطوانة</Text>
            <Text style={styles.vocabEs}>Rodillo</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>سطح</Text>
            <Text style={styles.vocabEs}>Superficie</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>زخرفة</Text>
            <Text style={styles.vocabEs}>Decoración</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: المواد والأدوات</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الدهانات:{'\n'}
              - الدهانات المائية{'\n'}
              - الدهانات الزيتية{'\n'}
              - الدهانات الخاصة{'\n'}
              • الأدوات:{'\n'}
              - الفرشاة{'\n'}
              - الأسطوانة{'\n'}
              - البخاخ{'\n'}
              • معدات الحماية:{'\n'}
              - القفازات{'\n'}
              - النظارات{'\n'}
              - القناع{'\n'}
              • المنتجات المساعدة:{'\n'}
              - المعجون{'\n'}
              - الأساس{'\n'}
              - المذيبات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: MATERIALES Y HERRAMIENTAS</Text>
            <Text style={styles.moduleContent}>
              • Tipos de pinturas:{'\n'}
              - Pinturas al agua{'\n'}
              - Pinturas al aceite{'\n'}
              - Pinturas especiales{'\n'}
              • Herramientas:{'\n'}
              - Brochas{'\n'}
              - Rodillos{'\n'}
              - Pistolas{'\n'}
              • Equipos de protección:{'\n'}
              - Guantes{'\n'}
              - Gafas{'\n'}
              - Mascarilla{'\n'}
              • Productos auxiliares:{'\n'}
              - Masillas{'\n'}
              - Imprimaciones{'\n'}
              - Disolventes
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: تحضير الأسطح</Text>
            <Text style={styles.moduleContentAr}>
              • تقييم حالة الأسطح:{'\n'}
              - الفحص{'\n'}
              - تحديد المشاكل{'\n'}
              - التقييم{'\n'}
              • التنظيف:{'\n'}
              - إزالة الأوساخ{'\n'}
              - إزالة العيوب{'\n'}
              - التحضير{'\n'}
              • المعجون:{'\n'}
              - تطبيق المعجون{'\n'}
              - الملء{'\n'}
              - التسوية{'\n'}
              • الأساس:{'\n'}
              - تطبيق الأساس{'\n'}
              - المعالجات{'\n'}
              - التحضير
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: PREPARACIÓN DE SUPERFICIES</Text>
            <Text style={styles.moduleContent}>
              • Evaluación del estado:{'\n'}
              - Inspección{'\n'}
              - Identificar problemas{'\n'}
              - Evaluación{'\n'}
              • Limpieza:{'\n'}
              - Eliminar suciedad{'\n'}
              - Eliminar imperfecciones{'\n'}
              - Preparación{'\n'}
              • Masillas:{'\n'}
              - Aplicar masillas{'\n'}
              - Rellenos{'\n'}
              - Alisado{'\n'}
              • Imprimación:{'\n'}
              - Aplicar imprimación{'\n'}
              - Tratamientos{'\n'}
              - Preparación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: تقنيات الدهان الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • الدهان بالفرشاة:{'\n'}
              - التقنيات{'\n'}
              - الاتجاهات{'\n'}
              - التطبيق{'\n'}
              • الدهان بالأسطوانة:{'\n'}
              - التقنيات{'\n'}
              - التطبيق{'\n'}
              - التغطية{'\n'}
              • الدهان بالبخاخ:{'\n'}
              - الإعداد{'\n'}
              - التطبيق{'\n'}
              - التحكم{'\n'}
              • التشطيبات:{'\n'}
              - التشطيبات الناعمة{'\n'}
              - التشطيبات الملمسية{'\n'}
              - التحكم
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: TÉCNICAS DE PINTURA BÁSICA</Text>
            <Text style={styles.moduleContent}>
              • Pintura con brocha:{'\n'}
              - Técnicas{'\n'}
              - Direcciones{'\n'}
              - Aplicación{'\n'}
              • Pintura con rodillo:{'\n'}
              - Técnicas{'\n'}
              - Aplicación{'\n'}
              - Cobertura{'\n'}
              • Pintura con pistola:{'\n'}
              - Preparación{'\n'}
              - Aplicación{'\n'}
              - Control{'\n'}
              • Acabados:{'\n'}
              - Acabados lisos{'\n'}
              - Acabados texturados{'\n'}
              - Control
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الدهان الخارجي</Text>
            <Text style={styles.moduleContentAr}>
              • دهانات الواجهات:{'\n'}
              - الأنواع{'\n'}
              - الخصائص{'\n'}
              - التطبيق{'\n'}
              • الحماية:{'\n'}
              - الحماية من الرطوبة{'\n'}
              - الحماية من المناخ{'\n'}
              - المعالجات{'\n'}
              • دهان الخشب:{'\n'}
              - التحضير{'\n'}
              - التطبيق{'\n'}
              - الحماية{'\n'}
              • دهان المعادن:{'\n'}
              - التحضير{'\n'}
              - التطبيق{'\n'}
              - الحماية
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: PINTURA EXTERIOR</Text>
            <Text style={styles.moduleContent}>
              • Pinturas para fachadas:{'\n'}
              - Tipos{'\n'}
              - Características{'\n'}
              - Aplicación{'\n'}
              • Protección:{'\n'}
              - Protección contra humedad{'\n'}
              - Protección contra clima{'\n'}
              - Tratamientos{'\n'}
              • Pintura de madera:{'\n'}
              - Preparación{'\n'}
              - Aplicación{'\n'}
              - Protección{'\n'}
              • Pintura de metales:{'\n'}
              - Preparación{'\n'}
              - Aplicación{'\n'}
              - Protección
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: التقنيات الزخرفية</Text>
            <Text style={styles.moduleContentAr}>
              • التأثيرات الخاصة:{'\n'}
              - الإسفنج{'\n'}
              - الستارة{'\n'}
              - التقنيات{'\n'}
              • الدهان الزخرفي:{'\n'}
              - اللمعان{'\n'}
              - اللؤلؤ{'\n'}
              - التأثيرات{'\n'}
              • التقنيات الفنية:{'\n'}
              - الدهان الزيتي{'\n'}
              - الأكريليك{'\n'}
              - التقنيات{'\n'}
              • الترميم:{'\n'}
              - ترميم الدهانات القديمة{'\n'}
              - التقنيات{'\n'}
              - الحفظ
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: TÉCNICAS DECORATIVAS</Text>
            <Text style={styles.moduleContent}>
              • Efectos especiales:{'\n'}
              - Esponjado{'\n'}
              - Veladura{'\n'}
              - Técnicas{'\n'}
              • Pintura decorativa:{'\n'}
              - Glitter{'\n'}
              - Perlado{'\n'}
              - Efectos{'\n'}
              • Técnicas artísticas:{'\n'}
              - Pintura al óleo{'\n'}
              - Acrílico{'\n'}
              - Técnicas{'\n'}
              • Restauración:{'\n'}
              - Restaurar pinturas antiguas{'\n'}
              - Técnicas{'\n'}
              - Conservación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: السلامة والبيئة</Text>
            <Text style={styles.moduleContentAr}>
              • التعامل الآمن:{'\n'}
              - المواد الكيميائية{'\n'}
              - الإجراءات{'\n'}
              - الحماية{'\n'}
              • التهوية:{'\n'}
              - التهوية المناسبة{'\n'}
              - الحماية التنفسية{'\n'}
              - الإجراءات{'\n'}
              • إدارة النفايات:{'\n'}
              - التصنيف{'\n'}
              - إعادة التدوير{'\n'}
              - التخلص{'\n'}
              • اللوائح البيئية:{'\n'}
              - القوانين{'\n'}
              - المتطلبات{'\n'}
              - الالتزام
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: SEGURIDAD Y MEDIO AMBIENTE</Text>
            <Text style={styles.moduleContent}>
              • Manipulación segura:{'\n'}
              - Productos químicos{'\n'}
              - Procedimientos{'\n'}
              - Protección{'\n'}
              • Ventilación:{'\n'}
              - Ventilación adecuada{'\n'}
              - Protección respiratoria{'\n'}
              - Procedimientos{'\n'}
              • Gestión de residuos:{'\n'}
              - Clasificación{'\n'}
              - Reciclaje{'\n'}
              - Eliminación{'\n'}
              • Normativas ambientales:{'\n'}
              - Leyes{'\n'}
              - Requisitos{'\n'}
              - Cumplimiento
            </Text>
          </View>
        </View>

        {/* TIPOS DE PINTURAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🎨 أنواع الدهانات</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الدهانات المائية</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>طلاء بلاستيكي</Text>
              <Text style={styles.vocabEs}>Emulsión plástica</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>أكريليك</Text>
              <Text style={styles.vocabEs}>Acrílica</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>لاتكس</Text>
              <Text style={styles.vocabEs}>Látex</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Pinturas al Agua</Text>
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
              • دهان{'\n'}
              • ديكور{'\n'}
              • مساعد دهان{'\n'}
              • فني دهان{'\n'}
              • مدير مشروع{'\n'}
              • مقدر تكاليف
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Pintor{'\n'}
              • Decorador{'\n'}
              • Ayudante de pintor{'\n'}
              • Técnico de pintura{'\n'}
              • Gestor de proyectos{'\n'}
              • Presupuestista
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
