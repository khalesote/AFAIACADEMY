import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LEVEL_KEY = 'B2';

const UNIT_LIST = [
  { id: 'LiteraturaEspanola', es: '📚 Literatura Española', ar: 'الأدب الإسباني' },
  { id: 'MundoLaboral', es: '💼 Mundo laboral', ar: 'سوق العمل' },
  { id: 'HistoriaEspanola', es: '🏛️ Historia de España', ar: 'تاريخ إسبانيا' },
  { id: 'EconomiaConsumo', es: '💰 Economía y consumo', ar: 'الاقتصاد والاستهلاك' },
  { id: 'CulturaArte', es: '🎭 Cultura y arte', ar: 'الثقافة والفن' },
  { id: 'ArteTeatro', es: '🎟️ Arte y teatro', ar: 'الفنون والمسرح' },
  { id: 'CienciaTecnologia', es: '💻 Ciencia y tecnología', ar: 'العلم والتكنولوجيا' },
  { id: 'ActualidadInternacional', es: '📰 Actualidad internacional', ar: 'الأحداث الدولية' },
  { id: 'DebatesSociales', es: '🗣️ Debates sociales', ar: 'النقاشات الاجتماعية' },
  { id: 'EstudiosSuperiores', es: '🎓 Estudios superiores', ar: 'الدراسات العليا' },
  { id: 'RelacionesInterculturales', es: '🌐 Relaciones interculturales', ar: 'العلاقات بين الثقافات' },
  { id: 'SaludMental', es: '🧠 Salud mental', ar: 'الصحة النفسية' },
  { id: 'Civilizacion', es: '🏺 Civilización y patrimonio', ar: 'الحضارة والتراث' },
  { id: 'Liderazgo', es: '🤝 Liderazgo y gestión', ar: 'القيادة والإدارة' },
  { id: 'Poesia', es: '✒️ Poesía y análisis', ar: 'الشعر والتحليل' },
  { id: 'ViajesLargos', es: '✈️ Viajes y turismo', ar: 'السفر والسياحة' },
];

export default function B2Avanzado() {
  const router = useRouter();
  const { progress, isLoading, reloadProgress } = useUserProgress();
  const [localProgress, setLocalProgress] = useState<boolean[]>(Array(UNIT_LIST.length).fill(false));
  
  // Cargar progreso directamente desde AsyncStorage al montar y enfocar
  const loadProgressFromStorage = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('userProgress_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        const unitsCompleted = parsed.B2?.unitsCompleted ?? Array(UNIT_LIST.length).fill(false);
        setLocalProgress(unitsCompleted);
        console.log('📂 Progreso B2 cargado desde AsyncStorage:', unitsCompleted);
      }
    } catch (error) {
      console.error('Error cargando progreso B2:', error);
    }
  }, []);
  
  // Obtener el progreso del nivel B2, priorizando localProgress
  const levelProgress = progress[LEVEL_KEY];
  const unitsDone = localProgress.length > 0 ? localProgress : (levelProgress?.unitsCompleted ?? Array(UNIT_LIST.length).fill(false));
  const oralPassed = levelProgress?.oralPassed ?? false;
  const writtenPassed = levelProgress?.writtenPassed ?? false;
  const diplomaReady = levelProgress?.diplomaReady ?? false;
  const isUnlocked = levelProgress?.unlocked ?? false;
  const allUnitsCompleted = unitsDone.length > 0 && unitsDone.every(Boolean);

  const handleUnitPress = (unitId: string) => {
    router.push(`/B2_Avanzado/clases/${unitId}`);
  };

  // Lógica de desbloqueo: todas las unidades desbloqueadas
  const isUnitAccessible = useCallback((index: number) => {
    return true;
  }, []);

  // Verificar y cargar progreso al cargar y refrescar cuando se vuelve a la pantalla
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 useFocusEffect: Refrescando menú B2');
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
    console.log('📊 Progreso B2 actualizado:', progress[LEVEL_KEY]?.unitsCompleted);
  }, [progress[LEVEL_KEY]?.unitsCompleted]);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#9DC3AA" />
      </View>
    );
  }

  // B2 siempre accesible - sin verificación de bloqueo

  return (
    <View style={styles.container}>
      <View style={styles.topActions}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/SchoolScreen')}>
          <Text style={styles.backButtonText}>← Regresar al Menú Principal</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>B2: Avanzado</Text>
      <Text style={styles.titleAr}>B2: المتقدم</Text>
      <ScrollView style={{ width: '100%', marginTop: 24 }}>
        {/* Botones de las unidades B2 con sistema de progreso */}
        {UNIT_LIST.map((unidad, index) => {
          const accessible = isUnitAccessible(index);
          const isCompleted = localProgress[index] === true;
          // Usar una key que incluya el estado de completado para forzar re-render cuando cambie
          const unitKey = `unit-${unidad.id}-${isCompleted ? 'done' : 'pending'}-${accessible ? 'accessible' : 'locked'}`;
          return (
            <TouchableOpacity
              key={unitKey}
              style={styles.unitButton}
              onPress={() => accessible && handleUnitPress(unidad.id)}
              disabled={!accessible}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={accessible ? ['#000', '#000'] : ['#333', '#333']}
                style={styles.unitButtonGradient}
              >
                <View style={styles.unitButtonContent}>
                  <View style={styles.unitTextContainer}>
                    <Text style={styles.unitButtonText}>
                      {unidad.es}{isCompleted ? ' ✓' : ''}
                    </Text>
                    <Text style={styles.unitButtonTextAr}>
                      {unidad.ar}
                    </Text>
                  </View>
                  <View style={styles.statusIcon}>
                    {isCompleted && (
                      <Ionicons name="checkmark-circle" size={24} color="#FFD700" />
                    )}
                    {!isCompleted && accessible && (
                      <Ionicons name="play-circle" size={24} color="#FFD700" />
                    )}
                    {!accessible && (
                      <Ionicons name="lock-closed" size={24} color="#FFD700" />
                    )}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.unitButton}
          onPress={() => router.push('/B2_Avanzado/clases/ExpresionOral')}
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
        
        {/* Examen Final B2 - siempre accesible */}
        <TouchableOpacity
          style={styles.examButton}
          onPress={() => router.push('/(tabs)/B2_Avanzado/clases/ExamenFinal')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.examButtonGradient}
          >
            <View style={styles.unitButtonContent}>
              <View style={styles.unitTextContainer}>
                <Text style={styles.examButtonText}>Examen Final{writtenPassed ? ' ✓' : ''}</Text>
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
  topActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  backButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
