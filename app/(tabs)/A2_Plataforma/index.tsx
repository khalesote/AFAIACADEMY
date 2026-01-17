import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LEVEL_KEY = 'A2';

export default function A2Plataforma() {
  const router = useRouter();
  const { progress, isLoading, reloadProgress } = useUserProgress();
  const [localProgress, setLocalProgress] = useState<boolean[]>(Array(10).fill(false));
  
  // Cargar progreso directamente desde AsyncStorage al montar y enfocar
  const loadProgressFromStorage = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('userProgress_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        const unitsCompleted = parsed.A2?.unitsCompleted ?? Array(10).fill(false);
        setLocalProgress(unitsCompleted);
        console.log('📂 Progreso A2 cargado desde AsyncStorage:', unitsCompleted);
      }
    } catch (error) {
      console.error('Error cargando progreso A2:', error);
    }
  }, []);
  
  // Obtener el progreso del nivel A2, priorizando localProgress
  const levelProgress = progress[LEVEL_KEY];
  const unitsDone = localProgress.length > 0 ? localProgress : (levelProgress?.unitsCompleted ?? Array(10).fill(false));
  const allUnitsCompleted = unitsDone.length > 0 && unitsDone.every(Boolean);
  const oralPassed = levelProgress?.oralPassed ?? false;
  const writtenPassed = levelProgress?.writtenPassed ?? false;

  const handleOpenUnidad = (n: number) => {
    router.push(`/A2_Plataforma/clases/${encodeURIComponent('Unidad' + n)}` as any);
  };

  // LÓGICA DE DESBLOQUEO:
  // - Todas las unidades están desbloqueadas
  const isUnitAccessible = useCallback((index: number) => {
    return true;
  }, []);

  // Verificar y cargar progreso al cargar y refrescar cuando se vuelve a la pantalla
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 useFocusEffect: Refrescando menú A2');
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
    console.log('📊 Progreso A2 actualizado:', progress[LEVEL_KEY]?.unitsCompleted);
  }, [progress[LEVEL_KEY]?.unitsCompleted]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9DC3AA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/SchoolScreen')}>
        <Text style={styles.backButtonText}>← Regresar al Menú Principal</Text>
      </TouchableOpacity>
      <Text style={styles.title}>A2: Plataforma</Text>
      <Text style={styles.titleAr}>A2: المنصة</Text>
      <ScrollView style={{ width: '100%', marginTop: 24 }}>
        {/* Gramática - Primera posición */}
        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => router.push('/(tabs)/GramaticaScreen?nivel=A2')}
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

        {[...Array(10)].map((_, i) => {
          const n = i + 1;
          const accessible = isUnitAccessible(i);
          const isCompleted = localProgress[i] === true;
          // Usar una key que incluya el estado de completado para forzar re-render cuando cambie
          const unitKey = `unit-${n}-${isCompleted ? 'done' : 'pending'}-${accessible ? 'accessible' : 'locked'}`;
          return (
            <TouchableOpacity
              key={unitKey}
              style={styles.unitButton}
              onPress={() => accessible && handleOpenUnidad(n)}
              disabled={!accessible}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={accessible ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.unitButtonGradient}
              >
                <Text style={styles.unitButtonText}>{`Unidad ${n}${isCompleted ? ' ✓' : ''}`}</Text>
                <Text style={styles.unitButtonTextAr}>{`الوحدة ${n}`}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => router.push("/(tabs)/VocabularioScreen")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.unitButtonGradient}
          >
            <Text style={styles.unitButtonText}>Vocabulario</Text>
            <Text style={styles.unitButtonTextAr}>المفردات</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => router.push('/A2_Plataforma/clases/ExpresionOral')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.unitButtonGradient}
          >
            <Text style={styles.unitButtonText}>Expresión Oral</Text>
            <Text style={styles.unitButtonTextAr}>التعبير الشفوي</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.examButton}
          onPress={() => {
            router.push('/A2_Plataforma/clases/ExamenFinal');
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.examButtonGradient}
          >
            <Text style={styles.examButtonText}>Examen Final</Text>
            <Text style={styles.examButtonTextAr}>الاختبار النهائي</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  infoBox: {
    width: '100%',
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  infoText: {
    color: '#1b5e20',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  infoTextAr: {
    color: '#1b5e20',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
