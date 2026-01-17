import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const A1_ACCESO_LEVEL = 'A1';

export default function A1Acceso() {
  const router = useRouter();
  const { progress, isLoading, reloadProgress, resetLevel } = useUserProgress();
  // Estado local del progreso de unidades completadas
  const [localProgress, setLocalProgress] = useState<boolean[]>(Array(7).fill(false));
  
  // Cargar progreso desde AsyncStorage
  const loadProgressFromStorage = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('userProgress_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        const unitsCompleted = parsed.A1?.unitsCompleted ?? Array(7).fill(false);
        setLocalProgress(unitsCompleted);
        console.log('📂 Progreso A1 cargado:', unitsCompleted);
      } else {
        // Si no hay datos, inicializar todo en false (solo unidad 1 desbloqueada)
        setLocalProgress(Array(7).fill(false));
      }
    } catch (error) {
      console.error('Error cargando progreso A1:', error);
      setLocalProgress(Array(7).fill(false));
    }
  }, []);
  
  // Función para resetear el progreso de A1
  const resetA1Progress = useCallback(async () => {
    try {
      Alert.alert(
        '¿Resetear progreso de A1?',
        'Esta acción eliminará todo el progreso de las unidades de A1. ¿Estás seguro?\nسيؤدي هذا الإجراء إلى حذف جميع تقدم وحدات A1. هل أنت متأكد؟',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Sí, resetear',
            style: 'destructive',
            onPress: async () => {
              // Resetear en AsyncStorage
              const stored = await AsyncStorage.getItem('userProgress_v2');
              if (stored) {
                const parsed = JSON.parse(stored);
                parsed.A1 = {
                  unlocked: true, // A1 está desbloqueado
                  unitsCompleted: Array(7).fill(false),
                  oralPassed: false,
                  writtenPassed: false,
                  diplomaReady: false
                };
                await AsyncStorage.setItem('userProgress_v2', JSON.stringify(parsed));
                console.log('✅ Progreso A1 reseteado en AsyncStorage');
              }
              
              // Resetear en el contexto
              await resetLevel('A1');
              
              // Actualizar estado local
              setLocalProgress(Array(7).fill(false));
              
              // Recargar progreso
              await reloadProgress();
              
              // Recargar desde storage también
              await loadProgressFromStorage();
              
              Alert.alert(
                '✅ Progreso reseteado',
                'El progreso de A1 ha sido reiniciado. Todas las unidades están bloqueadas excepto la Unidad 1.\nتم إعادة تعيين تقدم A1. جميع الوحدات مغلقة باستثناء الوحدة 1.',
                [{ text: 'OK' }]
              );
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error reseteando progreso A1:', error);
      Alert.alert('Error', 'No se pudo resetear el progreso de A1.');
    }
  }, [resetLevel, reloadProgress, loadProgressFromStorage]);
  
  // Obtener el progreso del nivel A1
  const levelProgress = progress[A1_ACCESO_LEVEL];
  const unitsDone = localProgress;
  const oralPassed = levelProgress?.oralPassed ?? false;
  const writtenPassed = levelProgress?.writtenPassed ?? false;
  const diplomaReady = levelProgress?.diplomaReady ?? false;
  const allUnitsCompleted = unitsDone.every(Boolean);
  
  const handlePressUnidad = useCallback(async (n: number) => {
    router.push(`/A1_Acceso/clases/Unidad${n}` as any);
  }, [router]);
  
  // LÓGICA DE DESBLOQUEO:
  // - Solo la unidad 1 (índice 0) está desbloqueada inicialmente
  // - Las demás unidades se desbloquean cuando completas la anterior
  const isUnitAccessible = useCallback((index: number) => {
    // Unidad 1 siempre desbloqueada
    if (index === 0) return true;
    // Resto de unidades: solo desbloqueadas si completaste la anterior
    return unitsDone[index - 1] === true;
  }, [unitsDone]);
  
  // Cargar progreso al cargar y refrescar cuando se vuelve a la pantalla
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 useFocusEffect: Refrescando menú A1');
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
    console.log('📊 Progreso A1 actualizado:', progress[A1_ACCESO_LEVEL]?.unitsCompleted);
  }, [progress[A1_ACCESO_LEVEL]?.unitsCompleted]);
  
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
      
      
      <Text style={styles.title}>A1: Acceso</Text>
      <Text style={styles.titleAr}>A1: الوصول</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Para abrir la unidad siguiente tienes que completar los ejercicios de la unidad anterior y pulsar "Unidad finalizada".</Text>
        <Text style={styles.infoTextAr}>لفتح الوحدة التالية يجب إكمال تمارين الوحدة السابقة والضغط على "انتهت الوحدة".</Text>
      </View>

      {/* Controles de testing eliminados para evitar bloqueos */}

      {/* (sin controles de prueba) */}
      
      <ScrollView
        style={{ width: '100%', marginTop: 24 }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Botones de Alfabeto y Fonética dentro del mismo scroll */}
        <View style={styles.specialButtonsContainer}>
          <TouchableOpacity
            style={styles.specialButton}
            onPress={() => router.push("/(tabs)/indice")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#000', '#000']}
              style={styles.specialButtonGradient}
            >
              <Ionicons name="text" size={24} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.specialButtonText}>Alfabeto Español</Text>
              <Text style={styles.specialButtonTextAr}>الأبجدية الإسبانية</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.specialButton}
            onPress={() => router.push("/(tabs)/FoneticaMenuScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#000', '#000']}
              style={styles.specialButtonGradient}
            >
              <Ionicons name="volume-high" size={24} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.specialButtonText}>Fonética y Pronunciación</Text>
              <Text style={styles.specialButtonTextAr}>الصوتيات والنطق</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specialButton}
            onPress={() => router.push("/(tabs)/AprendeComponerFrasesScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#000', '#000']}
              style={styles.specialButtonGradient}
            >
              <Ionicons name="create" size={24} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.specialButtonText}>Componer Frases</Text>
              <Text style={styles.specialButtonTextAr}>تكوين الجمل</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specialButton}
            onPress={() => router.push("/(tabs)/VocabularioScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#000', '#000']}
              style={styles.specialButtonGradient}
            >
              <Ionicons name="book" size={24} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.specialButtonText}>Vocabulario</Text>
              <Text style={styles.specialButtonTextAr}>المفردات</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specialButton}
            onPress={() => router.push('/(tabs)/GramaticaScreen?nivel=A1')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#000', '#000']}
              style={styles.specialButtonGradient}
            >
              <Ionicons name="library" size={24} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.specialButtonText}>Gramática</Text>
              <Text style={styles.specialButtonTextAr}>القواعد</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {[...Array(7)].map((_, i) => {
          const n = i + 1;
          const accessible = isUnitAccessible(i);
          // Solo mostrar como completada si está desbloqueada Y completada
          const isCompleted = accessible && localProgress[n - 1] === true;
          // Usar una key que incluya el estado de completado para forzar re-render cuando cambie
          const unitKey = `unit-${n}-${isCompleted ? 'done' : 'pending'}-${accessible ? 'accessible' : 'locked'}`;
          return (
            <TouchableOpacity
              key={unitKey}
              style={styles.unitButton}
              onPress={() => accessible && handlePressUnidad(n)}
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
          onPress={() => router.push('/A1_Acceso/clases/ExpresionOral')}
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

        <TouchableOpacity
          style={styles.examButton}
          onPress={() => {
            // Verificar que la unidad 7 esté desbloqueada Y completada
            // La unidad 7 está desbloqueada si la unidad 6 (índice 5) está completada
            const unidad6Completed = unitsDone[5] === true;
            const unidad7Accessible = unidad6Completed; // Unidad 7 desbloqueada si unidad 6 completada
            const unidad7Completed = unitsDone[6] === true;
            const examUnlocked = unidad7Accessible && unidad7Completed;
            
            if (!examUnlocked) {
              if (!unidad7Accessible) {
                Alert.alert(
                  'Examen final bloqueado',
                  'Completa la Unidad 6 y marca "Unidad finalizada" para acceder a la Unidad 7 y al examen final.\nأكمل الوحدة 6 واضغط "انتهت الوحدة" للوصول إلى الوحدة 7 والامتحان النهائي.',
                  [{ text: 'Entendido / فهمت', style: 'cancel' }]
                );
              } else {
                Alert.alert(
                  'Examen final bloqueado',
                  'Completa la Unidad 7 y marca "Unidad finalizada" para acceder al examen final.\nأكمل الوحدة 7 واضغط "انتهت الوحدة" للوصول إلى الامتحان النهائي.',
                  [{ text: 'Entendido / فهمت', style: 'cancel' }]
                );
              }
              return;
            }
            router.push('/A1_Acceso/clases/ExamenFinal');
          }}
          disabled={!unitsDone[5] || !unitsDone[6]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={(unitsDone[5] === true && unitsDone[6] === true) ? ['#000', '#000'] : ['#333', '#333']}
            style={styles.examButtonGradient}
          >
            <Ionicons name="school" size={20} color="#FFD700" style={{ marginRight: 8 }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.examButtonText}>Examen Final A1{writtenPassed ? ' ✓' : ''}</Text>
              <Text style={styles.examButtonTextAr}>الاختبار النهائي A1</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 32
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 12 },
  titleAr: { fontSize: 26, fontWeight: 'bold', color: '#000', marginBottom: 16, writingDirection: 'rtl' },
  infoBox: {
    width: '100%',
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#79A890',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
  subtitle: { fontSize: 18, color: '#444', marginBottom: 8, textAlign: 'center' },
  subtitleAr: { fontSize: 18, color: '#444', marginBottom: 8, textAlign: 'center', writingDirection: 'rtl' },
  specialButtonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  specialButton: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    width: '100%',
    overflow: 'hidden',
  },
  specialButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  specialButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialButtonTextAr: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginLeft: 8,
  },
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
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 24,
    zIndex: 10,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  backButtonText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '500',
  },
  examButton: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    width: '100%',
    overflow: 'hidden',
  },
  examButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  examButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  examButtonTextAr: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
