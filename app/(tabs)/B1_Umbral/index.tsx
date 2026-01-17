import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LevelLock } from '@/components/LevelLock';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LEVEL_KEY = 'B1';

export default function B1Umbral() {
  const router = useRouter();
  const { progress, isLoading, reloadProgress } = useUserProgress();
  // Estado local del progreso de unidades completadas
  const [localProgress, setLocalProgress] = useState<boolean[]>(Array(20).fill(false));
  
  // Cargar progreso desde AsyncStorage
  const loadProgressFromStorage = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('userProgress_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        const unitsCompleted = parsed.B1?.unitsCompleted ?? Array(20).fill(false);
        setLocalProgress(unitsCompleted);
        console.log('📂 Progreso B1 cargado:', unitsCompleted);
      } else {
        // Si no hay datos, inicializar todo en false (solo unidad 1 desbloqueada)
        setLocalProgress(Array(20).fill(false));
      }
    } catch (error) {
      console.error('Error cargando progreso B1:', error);
      setLocalProgress(Array(20).fill(false));
    }
  }, []);
  
  const levelProgress = progress[LEVEL_KEY];
  const unitsDone = localProgress;
  const oralPassed = levelProgress?.oralPassed ?? false;
  const diplomaReady = levelProgress?.diplomaReady ?? false;
  const isUnlocked = levelProgress?.unlocked ?? false;
  const allUnitsCompleted = unitsDone.length > 0 && unitsDone.every(Boolean);

  const handleUnitPress = (unitId: string) => {
    router.push(`/B1_Umbral/clases/${unitId}`);
  };

  const isUnitAccessible = (index: number) => {
    return true;
  };

  // Verificar y cargar progreso al cargar y refrescar cuando se vuelve a la pantalla
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 useFocusEffect: Refrescando menú B1');
      loadProgressFromStorage();
      reloadProgress();
    }, [loadProgressFromStorage, reloadProgress])
  );
  
  // Cargar progreso al montar
  useEffect(() => {
    loadProgressFromStorage();
  }, [loadProgressFromStorage]);
  
  // Log cuando cambia el progreso
  useEffect(() => {
    console.log('📊 Progreso B1 actualizado:', progress[LEVEL_KEY]?.unitsCompleted);
  }, [progress[LEVEL_KEY]?.unitsCompleted]);

  // Si está cargando, mostrar indicador
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9DC3AA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/SchoolScreen')}>
        <Text style={styles.backButtonText}>← Regresar al Menú Principal</Text>
      </TouchableOpacity>
      <Text style={styles.title}>B1: Umbral</Text>
      <Text style={styles.titleAr}>B1: العتبة</Text>
      <ScrollView style={{ width: '100%', marginTop: 24 }}>
        {/* Gramática - Primera posición */}
        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => router.push('/(tabs)/GramaticaScreen?nivel=B1')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.unitButtonGradient}
          >
            <Text style={styles.unitButtonText}>Gramática</Text>
            <Text style={styles.unitButtonTextAr}>القواعد</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Botones de las clases B1 con sistema de progreso */}
        {[
          { id: 'Trabajo', es: 'Trabajo', ar: 'العمل' },
          { id: 'Vivienda', es: 'Vivienda', ar: 'السكن' },
          { id: 'Salud', es: 'Salud', ar: 'الصحة' },
          { id: 'Tecnologia', es: 'Tecnología', ar: 'التكنولوجيا' },
          { id: 'Transporte', es: 'Transporte', ar: 'النقل' },
          { id: 'Cultura', es: 'Cultura', ar: 'الثقافة' },
          { id: 'Estudios', es: 'Estudios', ar: 'الدراسة' },
          { id: 'MedioAmbiente', es: 'Medio Ambiente', ar: 'البيئة' },
          { id: 'Deportes', es: 'Deportes', ar: 'الرياضة' },
          { id: 'GastronomiaHispana', es: 'Gastronomía Hispana', ar: 'فن الطبخ الإسباني' },
          { id: 'MediosComunicacion', es: 'Medios de Comunicación', ar: 'وسائل الإعلام' },
          { id: 'ProblemasSociales', es: 'Problemas Sociales', ar: 'المشاكل الاجتماعية' },
          { id: 'Turismo', es: 'Turismo', ar: 'السياحة' },
          { id: 'Viajes', es: 'Viajes', ar: 'السفر' },
          { id: 'VidaCotidiana', es: 'Vida Cotidiana', ar: 'الحياة اليومية' },
          { id: 'Voluntariado', es: 'Voluntariado', ar: 'التطوع' },
          { id: 'Experiencias', es: 'Experiencias', ar: 'التجارب' },
          { id: 'LiteraturaExpresiones', es: 'Literatura y Expresiones', ar: 'الأدب والتعبيرات' },
          { id: 'Alimentacion', es: 'Alimentación', ar: 'التغذية' },
          { id: 'Relaciones', es: 'Relaciones', ar: 'العلاقات' },
        ].map((clase, index) => {
          const accessible = isUnitAccessible(index);
          const isCompleted = localProgress[index] === true;
          // Usar una key que incluya el estado de completado para forzar re-render cuando cambie
          const unitKey = `unit-${clase.id}-${isCompleted ? 'done' : 'pending'}-${accessible ? 'accessible' : 'locked'}`;
          return (
            <TouchableOpacity
              key={unitKey}
              style={styles.unitButton}
              onPress={() => accessible && handleUnitPress(clase.id)}
              disabled={!accessible}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={accessible ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.unitButtonGradient}
              >
                <View style={styles.unitButtonContent}>
                  <View style={styles.unitTextContainer}>
                    <Text style={[styles.unitButtonText]}>
                      {clase.es}{isCompleted ? ' ✓' : ''}
                    </Text>
                    <Text style={[styles.unitButtonTextAr]}>
                      {clase.ar}
                    </Text>
                  </View>
                  <View style={styles.statusIcon}>
                    <Ionicons name="play-circle" size={24} color="#FFD700" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => router.push('/B1_Umbral/clases/ExpresionOral')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.unitButtonGradient}
          >
            <Text style={styles.unitButtonText}>Expresión Oral{oralPassed ? ' ✓' : ''}</Text>
            <Text style={styles.unitButtonTextAr}>التعبير الشفوي</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Examen Final - siempre accesible */}
        <TouchableOpacity
          style={styles.examButton}
          onPress={() => {
            router.push('/B1_Umbral/clases/ExamenFinal');
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.examButtonGradient}
          >
            <View style={styles.unitButtonContent}>
              <View style={styles.unitTextContainer}>
                <Text style={styles.examButtonText}>Examen Final</Text>
                <Text style={styles.examButtonTextAr}>الاختبار النهائي</Text>
              </View>
              <Ionicons name="school" size={24} color="#FFD700" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 12 },
  titleAr: { fontSize: 26, fontWeight: 'bold', color: '#000', marginBottom: 16, writingDirection: 'rtl' },
  subtitle: { fontSize: 18, color: '#444', marginBottom: 8, textAlign: 'center' },
  subtitleAr: { fontSize: 18, color: '#444', marginBottom: 8, textAlign: 'center', writingDirection: 'rtl' },
  unitButton: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    width: '100%',
    overflow: 'hidden',
  },
  unitButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  unitTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  statusIcon: {
    marginLeft: 12,
  },
  unitButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unitButtonTextAr: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'System',
  },
  examButton: {
    borderRadius: 16,
    marginTop: 18,
    marginBottom: 8,
    elevation: 3,
    width: '100%',
    overflow: 'hidden',
  },
  examButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examButtonText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  examButtonTextAr: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'System',
    letterSpacing: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  backButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
