import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import CursoIndividualPayment from '../../components/CursoIndividualPayment';

const { width } = Dimensions.get('window');

export default function PreFormacionScreen() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const checkCourseAccess = useCallback(async (cursoKey: string) => {
    try {
      const accessKey = `@curso_${cursoKey}_access`;
      const accessData = await AsyncStorage.getItem(accessKey);
      return accessData !== null;
    } catch (error) {
      console.error('Error checking course access:', error);
      return false;
    }
  }, []);

  const manejarAccesoCurso = useCallback(async (curso: any) => {
    const hasAccess = await checkCourseAccess(curso.key);
    if (hasAccess) {
      router.push(curso.screen);
    } else {
      setSelectedCourse(curso);
      setShowPaymentModal(true);
    }
  }, [router, checkCourseAccess]);

  
  const cursos = [
    { 
      key: 'CuidadoMayores', 
      label: 'Cuidado de Personas Mayores', 
      labelAr: 'رعاية المسنين',
      screen: '/(tabs)/CursoCuidadoMayoresScreen',
      icon: 'people' as any,
      color: '#000'
    },
    { 
      key: 'ManipulacionAlimentos', 
      label: 'Manipulación de Alimentos', 
      labelAr: 'تداول الأغذية',
      screen: '/(tabs)/CursoManipulacionAlimentosScreen',
      icon: 'restaurant' as any,
      color: '#000'
    },
    { 
      key: 'Jardineria', 
      label: 'Jardinería y Paisajismo', 
      labelAr: 'الحدائق وتنسيقها',
      screen: '/(tabs)/CursoJardineriaScreen',
      icon: 'leaf' as any,
      color: '#000'
    },
    { 
      key: 'Fontanero', 
      label: 'Fontanero', 
      labelAr: 'سباك',
      screen: '/(tabs)/CursoFontaneroScreen',
      icon: 'water' as any,
      color: '#000'
    },
    { 
      key: 'Electricidad', 
      label: 'Electricidad', 
      labelAr: 'كهرباء',
      screen: '/(tabs)/CursoElectricidadScreen',
      icon: 'flash' as any,
      color: '#000'
    },
    { 
      key: 'Cocina', 
      label: 'Ayudante de Cocina', 
      labelAr: 'مساعد مطبخ',
      screen: '/(tabs)/CursoCocinaScreen',
      icon: 'restaurant' as any,
      color: '#000'
    },
    { 
      key: 'Limpieza', 
      label: 'Limpieza', 
      labelAr: 'تنظيف',
      screen: '/(tabs)/CursoLimpiezaScreen',
      icon: 'sparkles' as any,
      color: '#000'
    },
    { 
      key: 'Carpinteria', 
      label: 'Carpintería', 
      labelAr: 'نجارة',
      screen: '/(tabs)/CursoCarpinteriaScreen',
      icon: 'hammer' as any,
      color: '#000'
    },
    { 
      key: 'Albañileria', 
      label: 'Albañilería', 
      labelAr: 'بناء',
      screen: '/(tabs)/CursoAlbanileriaScreen',
      icon: 'construct' as any,
      color: '#000'
    },
    { 
      key: 'Word', 
      label: 'Microsoft Word', 
      labelAr: 'مايكروسوفت وورد',
      screen: '/(tabs)/CursoWordScreen',
      icon: 'document-text' as any,
      color: '#000'
    },
    { 
      key: 'Excel', 
      label: 'Microsoft Excel', 
      labelAr: 'مايكروسوفت إكسل',
      screen: '/(tabs)/CursoExcelScreen',
      icon: 'grid' as any,
      color: '#000'
    },
    { 
      key: 'Comercio', 
      label: 'Comercio y Atención', 
      labelAr: 'تجارة وخدمة عملاء',
      screen: '/(tabs)/CursoComercioScreen',
      icon: 'cart' as any,
      color: '#000'
    },
    { 
      key: 'Informatica', 
      label: 'Informática Básica', 
      labelAr: 'حاسوب',
      screen: '/(tabs)/CursoInformaticaScreen',
      icon: 'laptop' as any,
      color: '#000'
    },
    { 
      key: 'Almacen', 
      label: 'Almacén', 
      labelAr: 'مستودع',
      screen: '/(tabs)/CursoAlmacenScreen',
      icon: 'cube' as any,
      color: '#000'
    },
    { 
      key: 'Agricultura', 
      label: 'Agricultura', 
      labelAr: 'زراعة',
      screen: '/(tabs)/CursoAgriculturaScreen',
      icon: 'leaf' as any,
      color: '#000'
    },
    {
      key: 'AtencionCliente',
      label: 'Atención al Cliente',
      labelAr: 'خدمة العملاء',
      screen: '/(tabs)/CursoAtencionClienteScreen',
      icon: 'headset' as any,
      color: '#000'
    },
    {
      key: 'Carretillero',
      label: 'Carretillero',
      labelAr: 'سائق الرافعة الشوكية',
      screen: '/(tabs)/CursoCarretilleroScreen',
      icon: 'car' as any,
      color: '#000'
    },
    {
      key: 'Pintura',
      label: 'Pintura y Decoración',
      labelAr: 'دهان وزخرفة',
      screen: '/(tabs)/CursoPinturaScreen',
      icon: 'brush' as any,
      color: '#000'
    },
    {
      key: 'Soldadura',
      label: 'Soldadura',
      labelAr: 'لحام',
      screen: '/(tabs)/CursoSoldaduraScreen',
      icon: 'build' as any,
      color: '#000'
    },
    {
      key: 'Mecanica',
      label: 'Mecánica Básica',
      labelAr: 'ميكانيكا أساسية',
      screen: '/(tabs)/CursoMecanicaScreen',
      icon: 'cog' as any,
      color: '#000'
    },
    {
      key: 'Peluqueria',
      label: 'Peluquería',
      labelAr: 'تصفيف الشعر',
      screen: '/(tabs)/CursoPeluqueriaScreen',
      icon: 'cut' as any,
      color: '#000'
    },
    {
      key: 'Estetica',
      label: 'Estética',
      labelAr: 'تجميل',
      screen: '/(tabs)/CursoEsteticaScreen',
      icon: 'flower' as any,
      color: '#000'
    },
    {
      key: 'InglesTrabajo',
      label: 'Inglés para Trabajo',
      labelAr: 'الإنجليزية للعمل',
      screen: '/(tabs)/CursoInglesTrabajoScreen',
      icon: 'language' as any,
      color: '#000'
    },
    {
      key: 'SeguridadLaboral',
      label: 'Seguridad Laboral',
      labelAr: 'السلامة في العمل',
      screen: '/(tabs)/CursoSeguridadLaboralScreen',
      icon: 'shield-checkmark' as any,
      color: '#000'
    },
    {
      key: 'ProductosQuimicos',
      label: 'Manipulación de Productos Químicos',
      labelAr: 'تداول المواد الكيميائية',
      screen: '/(tabs)/CursoProductosQuimicosScreen',
      icon: 'flask' as any,
      color: '#000'
    },
    {
      key: 'Recepcionista',
      label: 'Recepcionista Hotelera',
      labelAr: 'موظف استقبال فندقي',
      screen: '/(tabs)/CursoRecepcionistaScreen',
      icon: 'business' as any,
      color: '#000'
    },
    {
      key: 'Camarero',
      label: 'Camarero',
      labelAr: 'نادل',
      screen: '/(tabs)/CursoCamareroScreen',
      icon: 'wine' as any,
      color: '#000'
    },
    {
      key: 'Repartidor',
      label: 'Repartidor',
      labelAr: 'سائق توصيل',
      screen: '/(tabs)/CursoRepartidorScreen',
      icon: 'bicycle' as any,
      color: '#000'
    },
    {
      key: 'CuidadoInfantil',
      label: 'Cuidado de Niños',
      labelAr: 'رعاية الأطفال',
      screen: '/(tabs)/CursoCuidadoInfantilScreen',
      icon: 'heart' as any,
      color: '#000'
    },
    {
      key: 'Panaderia',
      label: 'Panadería y Repostería',
      labelAr: 'مخابز وحلويات',
      screen: '/(tabs)/CursoPanaderiaScreen',
      icon: 'cafe' as any,
      color: '#000'
    },
    {
      key: 'Carniceria',
      label: 'Carnicería',
      labelAr: 'جزارة',
      screen: '/(tabs)/CursoCarniceriaScreen',
      icon: 'cut' as any,
      color: '#000'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header con botón de regreso */}
      <View style={[styles.header, {backgroundColor: '#000'}]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              // Intentar volver atrás, si no hay pantalla a la que volver, ir al inicio
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/home');
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              Formación Profesional
            </Text>
            <Text style={styles.headerSubtitle}>Cursos de Formación Profesional</Text>
            <Text style={styles.headerSubtitleAr}>دورات التدريب المهني</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.coursesGrid}>
            {cursos.map((curso) => (
              <View key={curso.key} style={styles.courseCardContainer}>
                <TouchableOpacity
                  style={styles.courseCard}
                  onPress={() => manejarAccesoCurso(curso)}
                >
                  <LinearGradient
                    colors={['#000', '#000']}
                    style={[styles.courseGradient, { borderWidth: 1, borderColor: '#FFD700' }]}
                  >
                    <View style={styles.courseIcon}>
                      <Ionicons name={curso.icon} size={32} color="#fff" />
                    </View>
                    <Text style={styles.courseTitle}>{curso.label}</Text>
                    <Text style={styles.courseTitleAr}>{curso.labelAr}</Text>
                    <View style={styles.courseArrow}>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#000" />
            <Text style={styles.infoText}>
              Estos cursos están diseñados para ayudarte a prepararte para el mercado laboral español. 
              Cada curso incluye vocabulario específico y conocimientos prácticos.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal de pago para cursos individuales */}
      {selectedCourse && (
        <CursoIndividualPayment
          curso={selectedCourse}
          onPaymentSuccess={(cursoKey) => {
            setShowPaymentModal(false);
            setSelectedCourse(null);
            // Navigate to the course
            const curso = cursos.find(c => c.key === cursoKey);
            if (curso) {
              router.push(curso.screen);
            }
          }}
          onCancel={() => {
            setShowPaymentModal(false);
            setSelectedCourse(null);
          }}
          onPaymentError={(error) => {
            Alert.alert('Error de pago', error);
          }}
          visible={showPaymentModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header styles
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFD700',
    opacity: 0.9,
    marginBottom: 4,
  },
  headerSubtitleAr: {
    fontSize: 14,
    color: '#FFD700',
    opacity: 0.8,
    textAlign: 'center',
  },
  
  // Content styles
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    width: '100%',
    overflow: 'scroll',
  },
  content: {
    padding: 8,
    width: '100%',
  },
  // Course grid and cards
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 30,
    width: '100%',
  },
  courseCardContainer: {
    position: 'relative',
    width: '48%', // Slightly less than half to account for spacing
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
    aspectRatio: 0.9, // Maintain aspect ratio for all cards
  },
  courseCard: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  courseGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    position: 'relative',
  },
  courseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  courseTitleAr: {
    fontSize: 13,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Arial',
  },
  courseArrow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Info card styles
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  
});
