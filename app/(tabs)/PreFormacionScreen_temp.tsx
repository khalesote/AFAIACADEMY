import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert, 
  Dimensions, 
  SafeAreaView 
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormacionPayment from '@/components/FormacionPayment';

const { width } = Dimensions.get('window');

export default function PreFormacionScreen() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [tieneAcceso, setTieneAcceso] = useState(false);

  // Verificar si el usuario ya pagó por el acceso
  const verificarAcceso = async () => {
    try {
      const accesoGuardado = await AsyncStorage.getItem('@acceso_formacion_profesional');
      if (accesoGuardado) {
        const { tieneAcceso, expira } = JSON.parse(accesoGuardado);
        if (tieneAcceso && new Date(expira) > new Date()) {
          setTieneAcceso(true);
        } else if (new Date(expira) <= new Date()) {
          // El acceso expiró
          await AsyncStorage.removeItem('@acceso_formacion_profesional');
          setTieneAcceso(false);
        }
      } else {
        setTieneAcceso(false);
      }
    } catch (error) {
      console.error('Error al verificar acceso:', error);
      Alert.alert('Error', 'No se pudo verificar el acceso. Por favor, inténtalo de nuevo.');
      setTieneAcceso(false);
    } finally {
      setCargando(false);
    }
  };

  // Usar el hook useFocusEffect para manejar el foco
  useFocusEffect(
    React.useCallback(() => {
      verificarAcceso();
    }, [])
  );

  // Verificar acceso al montar el componente
  useEffect(() => {
    verificarAcceso();
  }, []);

  const cursos = [
    { 
      key: 'CuidadoMayores', 
      label: 'Cuidado de Personas Mayores', 
      labelAr: 'رعاية المسنين',
      screen: '/(tabs)/CursoCuidadoMayoresScreen',
      icon: 'people' as any,
      color: '#9C27B0'
    },
    { 
      key: 'ManipulacionAlimentos', 
      label: 'Manipulación de Alimentos', 
      labelAr: 'تداول الأغذية',
      screen: '/(tabs)/CursoManipulacionAlimentosScreen',
      icon: 'restaurant' as any,
      color: '#E91E63'
    },
    { 
      key: 'Jardineria', 
      label: 'Jardinería y Paisajismo', 
      labelAr: 'الحدائق وتنسيقها',
      screen: '/(tabs)/CursoJardineriaScreen',
      icon: 'leaf' as any,
      color: '#4CAF50'
    },
    { 
      key: 'Fontanero', 
      label: 'Fontanero', 
      labelAr: 'سباك',
      screen: '/(tabs)/CursoFontaneroScreen',
      icon: 'water' as any,
      color: '#2196F3'
    },
    { 
      key: 'Electricidad', 
      label: 'Electricidad', 
      labelAr: 'كهرباء',
      screen: '/(tabs)/CursoElectricidadScreen',
      icon: 'flash' as any,
      color: '#FF9800'
    },
    { 
      key: 'Cocina', 
      label: 'Ayudante de Cocina', 
      labelAr: 'مساعد مطبخ',
      screen: '/(tabs)/CursoCocinaScreen',
      icon: 'restaurant' as any,
      color: '#E91E63'
    },
    { 
      key: 'Limpieza', 
      label: 'Limpieza', 
      labelAr: 'تنظيف',
      screen: '/(tabs)/CursoLimpiezaScreen',
      icon: 'sparkles' as any,
      color: '#4CAF50'
    },
    { 
      key: 'Carpinteria', 
      label: 'Carpintería', 
      labelAr: 'نجارة',
      screen: '/(tabs)/CursoCarpinteriaScreen',
      icon: 'hammer' as any,
      color: '#795548'
    },
    { 
      key: 'Albañileria', 
      label: 'Albañilería', 
      labelAr: 'بناء',
      screen: '/(tabs)/CursoAlbanileriaScreen',
      icon: 'construct' as any,
      color: '#607D8B'
    },
    { 
      key: 'Word', 
      label: 'Microsoft Word', 
      labelAr: 'مايكروسوفت وورد',
      screen: '/(tabs)/CursoWordScreen',
      icon: 'document-text' as any,
      color: '#2B579A'
    },
    { 
      key: 'Excel', 
      label: 'Microsoft Excel', 
      labelAr: 'مايكروسوفت إكسل',
      screen: '/(tabs)/CursoExcelScreen',
      icon: 'grid' as any,
      color: '#217346'
    },
    { 
      key: 'Comercio', 
      label: 'Comercio y Atención', 
      labelAr: 'تجارة وخدمة عملاء',
      screen: '/(tabs)/CursoComercioScreen',
      icon: 'cart' as any,
      color: '#9C27B0'
    },
    { 
      key: 'Informatica', 
      label: 'Informática Básica', 
      labelAr: 'حاسوب',
      screen: '/(tabs)/CursoInformaticaScreen',
      icon: 'laptop' as any,
      color: '#00BCD4'
    },
    { 
      key: 'Almacen', 
      label: 'Almacén', 
      labelAr: 'مستودع',
      screen: '/(tabs)/CursoAlmacenScreen',
      icon: 'cube' as any,
      color: '#FF5722'
    },
    { 
      key: 'Agricultura', 
      label: 'Agricultura', 
      labelAr: 'زراعة',
      screen: '/(tabs)/CursoAgriculturaScreen',
      icon: 'leaf' as any,
      color: '#8BC34A'
    },
  ];

  if (cargando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contenedorCarga}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={styles.textoCarga}>Cargando cursos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient 
        colors={['#4CAF50', '#2E7D32']} 
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Formación Profesional</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {!tieneAcceso && (
            <View style={styles.paymentContainer}>
              <Text style={styles.description}>
                Para acceder a los cursos de formación profesional, adquiere tu acceso por solo 20€ al año.
              </Text>
              <FormacionPayment />
            </View>
          )}
          
          <Text style={styles.sectionTitle}>
            {tieneAcceso ? 'Selecciona un curso para comenzar' : 'Cursos disponibles con acceso completo'}
          </Text>
          
          <View style={styles.cursosContainer}>
            {cursos.map((curso) => (
              <TouchableOpacity
                key={curso.key}
                style={[styles.cursoCard, { 
                  backgroundColor: curso.color,
                  opacity: tieneAcceso ? 1 : 0.6
                }]}
                onPress={() => {
                  if (tieneAcceso) {
                    router.push(curso.screen);
                  } else {
                    Alert.alert(
                      'Acceso requerido',
                      'Por favor, adquiere tu acceso a la formación profesional para ver este curso.',
                      [{ text: 'Entendido' }]
                    );
                  }
                }}
                disabled={!tieneAcceso}
              >
                <Ionicons name={curso.icon} size={32} color="white" />
                <View style={styles.cursoInfo}>
                  <Text style={styles.cursoTitle}>{curso.label}</Text>
                  <Text style={styles.cursoTitleAr}>{curso.labelAr}</Text>
                </View>
                <Ionicons 
                  name={tieneAcceso ? "chevron-forward" : "lock-closed"} 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#ffffff" />
            <Text style={styles.infoText}>
              Estos cursos están diseñados para ayudarte a prepararte para el mercado laboral español. 
              Cada curso incluye vocabulario específico y conocimientos prácticos.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40, // Para centrar el título considerando el botón de atrás
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  paymentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  cursosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cursoCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cursoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cursoTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  cursoTitleAr: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'right',
  },
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  textoCarga: {
    marginTop: 16,
    color: 'white',
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
