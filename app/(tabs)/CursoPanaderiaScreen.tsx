import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoPanaderiaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/PreFormacionScreen")}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitleAr}>مخابز وحلويات</Text>
            <Text style={styles.headerTitle}>Panadería y Repostería</Text>
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
            1. تقنيات أساسية للخبز والحلويات{'\n'}
            2. معرفة المكونات والنسب وعمليات التخمر{'\n'}
            3. استخدام الأدوات والآلات المتخصصة{'\n'}
            4. تحضير العجين والخبز والمعجنات{'\n'}
            5. التحكم في درجات الحرارة والأوقات{'\n'}
            6. التزيين الفني والعرض{'\n'}
            7. إدارة الجودة والنظافة{'\n'}
            8. ريادة الأعمال وإدارة الأعمال
          </Text>
          <View style={styles.divider} />
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
          <Text style={styles.textBlock}>
            1. Técnicas fundamentales de panadería artesanal y repostería{'\n'}
            2. Conocimiento de ingredientes, proporciones y procesos de fermentación{'\n'}
            3. Uso profesional de herramientas y maquinaria especializada{'\n'}
            4. Preparación de masas, panes, bollería y productos de pastelería{'\n'}
            5. Control de temperaturas, tiempos y técnicas de cocción{'\n'}
            6. Decoración artística y presentación de productos{'\n'}
            7. Gestión de calidad, higiene y seguridad alimentaria{'\n'}
            8. Emprendimiento y gestión de negocio de panadería
          </Text>
        </View>

        {/* MÓDULOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات</Text>
          </View>
          <Text style={styles.textBlockAr}>
            • المكونات والأساسيات{'\n'}
            • العجين والتخمر{'\n'}
            • الخبز الحرفي{'\n'}
            • الحلويات الأساسية{'\n'}
            • الحلويات المتقدمة{'\n'}
            • الأدوات والمعدات{'\n'}
            • النظافة والسلامة{'\n'}
            • إدارة الأعمال
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>📚 Módulos</Text>
          <Text style={styles.textBlock}>
            • Ingredientes y bases{'\n'}
            • Masas y fermentación{'\n'}
            • Panadería artesanal{'\n'}
            • Repostería básica{'\n'}
            • Repostería avanzada{'\n'}
            • Herramientas y equipos{'\n'}
            • Higiene y seguridad{'\n'}
            • Gestión de negocio
          </Text>
        </View>

        {/* VOCABULARIO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🗣️ المفردات المهمة</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>خبز</Text>
            <Text style={styles.vocabEs}>Pan</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>عجين</Text>
            <Text style={styles.vocabEs}>Masa</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>خميرة</Text>
            <Text style={styles.vocabEs}>Levadura</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>فرن</Text>
            <Text style={styles.vocabEs}>Horno</Text>
          </View>
          <View style={styles.vocabItem}>
            <Text style={styles.vocabAr}>حلويات</Text>
            <Text style={styles.vocabEs}>Repostería</Text>
          </View>
        </View>

        {/* MÓDULOS DETALLADOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة</Text>
          </View>
          
          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الأولى: المكونات والأساسيات</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الدقيق:{'\n'}
              - دقيق القمح الأبيض{'\n'}
              - دقيق القمح الكامل{'\n'}
              - دقيق القوة{'\n'}
              - الخصائص والاستخدامات{'\n'}
              • الخميرة:{'\n'}
              - الخميرة الطبيعية{'\n'}
              - الخميرة الكيميائية{'\n'}
              - الخميرة الفورية{'\n'}
              • السوائل:{'\n'}
              - الماء{'\n'}
              - الحليب{'\n'}
              - البيض{'\n'}
              - الزبدة{'\n'}
              • السكريات:{'\n'}
              - أنواع السكر{'\n'}
              - المحليات{'\n'}
              - الخصائص
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 1: INGREDIENTES Y BASES</Text>
            <Text style={styles.moduleContent}>
              • Harinas:{'\n'}
              - Harina de trigo blanca{'\n'}
              - Harina de trigo integral{'\n'}
              - Harina de fuerza{'\n'}
              - Características y usos{'\n'}
              • Levaduras:{'\n'}
              - Levadura natural{'\n'}
              - Levadura química{'\n'}
              - Levadura instantánea{'\n'}
              • Líquidos:{'\n'}
              - Agua{'\n'}
              - Leche{'\n'}
              - Huevos{'\n'}
              - Mantequilla{'\n'}
              • Azúcares:{'\n'}
              - Tipos de azúcar{'\n'}
              - Edulcorantes{'\n'}
              - Propiedades
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثانية: العجين والتخمر</Text>
            <Text style={styles.moduleContentAr}>
              • العجين الأم:{'\n'}
              - التحضير{'\n'}
              - التخمر{'\n'}
              - الاستخدام{'\n'}
              • تقنيات العجن:{'\n'}
              - العجن اليدوي{'\n'}
              - العجن الميكانيكي{'\n'}
              - التقنيات{'\n'}
              • عمليات التخمر:{'\n'}
              - التخمر المتحكم{'\n'}
              - الوقت{'\n'}
              - درجة الحرارة{'\n'}
              • التحكم في الحرارة:{'\n'}
              - درجات الحرارة{'\n'}
              - الرطوبة{'\n'}
              - الشروط
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 2: MASAS Y FERMENTACIÓN</Text>
            <Text style={styles.moduleContent}>
              • Masas madres:{'\n'}
              - Preparación{'\n'}
              - Fermentación{'\n'}
              - Uso{'\n'}
              • Técnicas de amasado:{'\n'}
              - Amasado manual{'\n'}
              - Amasado mecánico{'\n'}
              - Técnicas{'\n'}
              • Procesos de fermentación:{'\n'}
              - Fermentación controlada{'\n'}
              - Tiempo{'\n'}
              - Temperatura{'\n'}
              • Control de temperatura:{'\n'}
              - Temperaturas{'\n'}
              - Humedad{'\n'}
              - Condiciones
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الثالثة: الخبز الحرفي</Text>
            <Text style={styles.moduleContentAr}>
              • أنواع الخبز:{'\n'}
              - خبز العجين الأم{'\n'}
              - خبز الخميرة{'\n'}
              - الخبز التقليدي{'\n'}
              • المعجنات:{'\n'}
              - المعجنات الحلوة{'\n'}
              - المعجنات المالحة{'\n'}
              - التحضير{'\n'}
              • منتجات الفرن:{'\n'}
              - المنتجات التقليدية{'\n'}
              - الأنواع المختلفة{'\n'}
              • تقنيات التشكيل:{'\n'}
              - التشكيل اليدوي{'\n'}
              - التزيين{'\n'}
              - التقنيات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 3: PANADERÍA ARTESANAL</Text>
            <Text style={styles.moduleContent}>
              • Tipos de pan:{'\n'}
              - Pan de masa madre{'\n'}
              - Pan de levadura{'\n'}
              - Pan tradicional{'\n'}
              • Bollería:{'\n'}
              - Bollería dulce{'\n'}
              - Bollería salada{'\n'}
              - Preparación{'\n'}
              • Productos de horno:{'\n'}
              - Productos tradicionales{'\n'}
              - Variedades{'\n'}
              • Técnicas de moldeado:{'\n'}
              - Moldeado manual{'\n'}
              - Decoración{'\n'}
              - Técnicas
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الرابعة: الحلويات الأساسية</Text>
            <Text style={styles.moduleContentAr}>
              • الكعك والكعك الصغير:{'\n'}
              - التحضير{'\n'}
              - الخبز{'\n'}
              - التزيين{'\n'}
              • البسكويت:{'\n'}
              - الأنواع{'\n'}
              - التحضير{'\n'}
              - الخبز{'\n'}
              • الكريمات والحشوات:{'\n'}
              - الأنواع{'\n'}
              - التحضير{'\n'}
              - الاستخدام{'\n'}
              • التغطيات:{'\n'}
              - التغطيات المختلفة{'\n'}
              - التطبيق{'\n'}
              - التقنيات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 4: REPOSTERÍA BÁSICA</Text>
            <Text style={styles.moduleContent}>
              • Bizcochos y magdalenas:{'\n'}
              - Preparación{'\n'}
              - Horneado{'\n'}
              - Decoración{'\n'}
              • Galletas:{'\n'}
              - Tipos{'\n'}
              - Preparación{'\n'}
              - Horneado{'\n'}
              • Cremas y rellenos:{'\n'}
              - Tipos{'\n'}
              - Preparación{'\n'}
              - Uso{'\n'}
              • Coberturas:{'\n'}
              - Diferentes coberturas{'\n'}
              - Aplicación{'\n'}
              - Técnicas
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة الخامسة: الحلويات المتقدمة</Text>
            <Text style={styles.moduleContentAr}>
              • الفطائر المزينة:{'\n'}
              - الفطائر بالفواكه{'\n'}
              - الفطائر المزينة{'\n'}
              - التقنيات{'\n'}
              • الكعك المتقدم:{'\n'}
              - الكعك المعقد{'\n'}
              - التزيين{'\n'}
              - التقنيات{'\n'}
              • الشوكولاتة:{'\n'}
              - العمل مع الشوكولاتة{'\n'}
              - الحلويات{'\n'}
              - التقنيات{'\n'}
              • منتجات الموسم:{'\n'}
              - المنتجات الخاصة{'\n'}
              - التخصصات{'\n'}
              - الابتكار
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 5: REPOSTERÍA AVANZADA</Text>
            <Text style={styles.moduleContent}>
              • Tartas decoradas:{'\n'}
              - Tartas de frutas{'\n'}
              - Tartas decoradas{'\n'}
              - Técnicas{'\n'}
              • Pasteles elaborados:{'\n'}
              - Cakes complejos{'\n'}
              - Decoración{'\n'}
              - Técnicas{'\n'}
              • Chocolate:{'\n'}
              - Trabajo con chocolate{'\n'}
              - Confitería{'\n'}
              - Técnicas{'\n'}
              • Productos de temporada:{'\n'}
              - Productos especiales{'\n'}
              - Especialidades{'\n'}
              - Innovación
            </Text>
          </View>

          <View style={styles.moduleCard}>
            <Text style={styles.moduleTitleAr}>الوحدة السادسة: النظافة والسلامة</Text>
            <Text style={styles.moduleContentAr}>
              • بروتوكولات النظافة:{'\n'}
              - النظافة الغذائية{'\n'}
              - البروتوكولات{'\n'}
              - المعايير{'\n'}
              • التعامل الآمن:{'\n'}
              - التعامل مع الأغذية{'\n'}
              - السلامة{'\n'}
              - الإجراءات{'\n'}
              • التحكم في المواد المسببة للحساسية:{'\n'}
              - التعرف{'\n'}
              - الإعلان{'\n'}
              - الإدارة{'\n'}
              • التشريعات:{'\n'}
              - القوانين الصحية{'\n'}
              - المتطلبات{'\n'}
              - الالتزام
            </Text>
            <View style={styles.divider} />
            <Text style={styles.moduleTitle}>MÓDULO 6: HIGIENE Y SEGURIDAD</Text>
            <Text style={styles.moduleContent}>
              • Protocolos de higiene:{'\n'}
              - Higiene alimentaria{'\n'}
              - Protocolos{'\n'}
              - Estándares{'\n'}
              • Manipulación segura:{'\n'}
              - Manejo de alimentos{'\n'}
              - Seguridad{'\n'}
              - Procedimientos{'\n'}
              • Control de alérgenos:{'\n'}
              - Identificación{'\n'}
              - Declaración{'\n'}
              - Gestión{'\n'}
              • Legislación:{'\n'}
              - Leyes sanitarias{'\n'}
              - Requisitos{'\n'}
              - Cumplimiento
            </Text>
          </View>
        </View>

        {/* INGREDIENTES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={24} color="#79A890" />
            <Text style={styles.sectionTitleAr}>🌾 المكونات الرئيسية</Text>
          </View>
          
          <View style={styles.subsectionCard}>
            <Text style={styles.subsectionTitleAr}>الدقيق والحبوب</Text>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>دقيق قمح أبيض</Text>
              <Text style={styles.vocabEs}>Harina de trigo blanca</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>دقيق قمح كامل</Text>
              <Text style={styles.vocabEs}>Harina de trigo integral</Text>
            </View>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabAr}>دقيق قوة</Text>
              <Text style={styles.vocabEs}>Harina de fuerza</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Harinas y Cereales</Text>
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
              • خباز{'\n'}
              • صانع حلويات{'\n'}
              • مساعد خباز{'\n'}
              • مدير مخبز{'\n'}
              • صاحب مخبز{'\n'}
              • فني حلويات
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subsectionTitle}>Puestos de Trabajo</Text>
            <Text style={styles.textBlock}>
              • Panadero{'\n'}
              • Pastelero{'\n'}
              • Ayudante de panadero{'\n'}
              • Gerente de panadería{'\n'}
              • Propietario de panadería{'\n'}
              • Técnico en repostería
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
