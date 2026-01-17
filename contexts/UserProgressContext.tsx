import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LevelKey = 'A1' | 'A2' | 'B1' | 'B2';

type LevelProgress = {
  unlocked: boolean;
  unitsCompleted: boolean[];
  oralPassed: boolean;
  writtenPassed: boolean;
  diplomaReady: boolean;
};

type UserProgress = Record<LevelKey, LevelProgress>;

type UserProgressContextType = {
  progress: UserProgress;
  isLoading: boolean;
  unlockLevel: (level: LevelKey) => void;
  markUnitCompleted: (level: LevelKey, unitIndex: number) => Promise<void>;
  markOralPassed: (level: LevelKey) => void;
  markWrittenPassed: (level: LevelKey) => void;
  resetLevel: (level: LevelKey) => Promise<void>;
  resetAll: () => void;
  reloadProgress: () => Promise<void>;
};

const USER_PROGRESS_KEY = 'userProgress_v2';

const LEVEL_CONFIG: Record<LevelKey, { units: number }> = {
  A1: { units: 7 },
  A2: { units: 10 },
  B1: { units: 20 },
  B2: { units: 16 }
};

const LEVEL_ADVANCEMENTS: Partial<Record<LevelKey, LevelKey>> = {
  A1: 'A2',
  B1: 'B2'
};

const createLevelProgress = (units: number): LevelProgress => ({
  unlocked: false,
  unitsCompleted: Array(units).fill(false),
  oralPassed: false,
  writtenPassed: false,
  diplomaReady: false
});

const createDefaultProgress = (): UserProgress => ({
  A1: createLevelProgress(LEVEL_CONFIG.A1.units),
  A2: createLevelProgress(LEVEL_CONFIG.A2.units),
  B1: createLevelProgress(LEVEL_CONFIG.B1.units),
  B2: createLevelProgress(LEVEL_CONFIG.B2.units)
});

const ensureLevelShape = (level: LevelProgress, units: number): LevelProgress => {
  const nextUnits = level.unitsCompleted.length === units
    ? level.unitsCompleted
    : Array(units)
        .fill(false)
        .map((_, idx) => level.unitsCompleted[idx] ?? false);
  return {
    unlocked: !!level.unlocked,
    unitsCompleted: nextUnits,
    oralPassed: !!level.oralPassed,
    writtenPassed: !!level.writtenPassed,
    diplomaReady: !!level.diplomaReady || (!!level.oralPassed && !!level.writtenPassed)
  };
};

const normalizeProgress = (data: unknown): UserProgress => {
  const base = createDefaultProgress();
  if (!data || typeof data !== 'object') {
    return base;
  }

  const source = data as Partial<Record<LevelKey, Partial<LevelProgress>>>;
  (Object.keys(base) as LevelKey[]).forEach((levelKey) => {
    const maybeLevel = source[levelKey];
    if (maybeLevel && typeof maybeLevel === 'object') {
      base[levelKey] = ensureLevelShape(maybeLevel as LevelProgress, LEVEL_CONFIG[levelKey].units);
    }
  });
  return base;
};

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(createDefaultProgress());
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      if (__DEV__) {
        // En modo desarrollo, resetear progreso en cada carga para testing
        console.log('📂 [DEV] Reseteando progreso a valores por defecto');
        const defaultProgress = createDefaultProgress();
        setProgress(defaultProgress);
        return defaultProgress;
      }

      const stored = await AsyncStorage.getItem(USER_PROGRESS_KEY);
      console.log('📂 Cargando progreso desde AsyncStorage');
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('📂 Datos almacenados encontrados:', parsed);
        const normalized = normalizeProgress(parsed);
        console.log('📂 Datos normalizados:', normalized);
        setProgress(normalized);
        return normalized;
      } else {
        console.log('📂 No hay datos almacenados, usando progreso por defecto');
        const defaultProgress = createDefaultProgress();
        setProgress(defaultProgress);
        return defaultProgress;
      }
    } catch (error) {
      console.error('❌ Error al cargar el progreso:', error);
      const defaultProgress = createDefaultProgress();
      setProgress(defaultProgress);
      return defaultProgress;
    }
  }, []);

  useEffect(() => {
    loadProgress().finally(() => {
      setIsLoading(false);
    });
  }, [loadProgress]);

  const reloadProgress = useCallback(async () => {
    await loadProgress();
  }, [loadProgress]);

  const persistProgress = useCallback(async (nextState: UserProgress) => {
    try {
      await AsyncStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(nextState));
      console.log('💾 Progreso persistido en AsyncStorage');
    } catch (error) {
      console.error('❌ Error al persistir el progreso:', error);
    }
  }, []);

  // NO guardar automáticamente aquí porque markUnitCompleted ya guarda directamente
  // Esto evitaba condiciones de carrera donde el useEffect guardaba un estado viejo

  const applyLevelUpdate = useCallback((level: LevelKey, updater: (prev: LevelProgress) => LevelProgress) => {
    setProgress((prev) => {
      const current = ensureLevelShape(prev[level], LEVEL_CONFIG[level].units);
      const updated = ensureLevelShape(updater(current), LEVEL_CONFIG[level].units);
      const nextLevel = LEVEL_ADVANCEMENTS[level];
      const nextState: UserProgress = {
        ...prev,
        [level]: updated,
        ...(nextLevel && updated.diplomaReady ? { [nextLevel]: { ...prev[nextLevel], unlocked: true } } : {})
      };
      return nextState;
    });
  }, [persistProgress]);

  const unlockLevel = useCallback((level: LevelKey) => {
    applyLevelUpdate(level, (prevLevel) => ({
      ...prevLevel,
      unlocked: true
    }));
  }, [applyLevelUpdate]);

  const markUnitCompleted = useCallback(async (level: LevelKey, unitIndex: number) => {
    const units = LEVEL_CONFIG[level].units;
    if (unitIndex < 0 || unitIndex >= units) {
      console.warn(`⚠️ markUnitCompleted: índice inválido ${unitIndex} para nivel ${level}`);
      return;
    }
    console.log(`✅ Marcando unidad ${unitIndex} como completada en nivel ${level}`);
    
    return new Promise<void>((resolve) => {
      setProgress((prev) => {
        const current = ensureLevelShape(prev[level], LEVEL_CONFIG[level].units);
        const nextUnits = [...current.unitsCompleted];
        nextUnits[unitIndex] = true;
        const updated = {
          ...current,
          unitsCompleted: nextUnits
        };
        const nextState: UserProgress = {
          ...prev,
          [level]: ensureLevelShape(updated, LEVEL_CONFIG[level].units)
        };
        
        console.log(`✅ Estado actualizado: unidades completadas para ${level}:`, nextUnits);
        console.log(`📊 Estado completo guardado:`, JSON.stringify(nextState));
        
        // Guardar inmediatamente en AsyncStorage
        AsyncStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(nextState))
          .then(async () => {
            console.log(`💾 Progreso guardado en AsyncStorage para ${level}`);
            // Verificar que se guardó correctamente
            const verify = await AsyncStorage.getItem(USER_PROGRESS_KEY);
            if (verify) {
              const parsed = JSON.parse(verify);
              console.log(`✅ Verificación: Datos guardados correctamente:`, parsed[level]?.unitsCompleted);
              // Recargar desde AsyncStorage para asegurar sincronización completa
              // Esto asegura que el estado en memoria esté sincronizado con AsyncStorage
              loadProgress().then(() => {
                console.log(`🔄 Progreso recargado desde AsyncStorage después del guardado`);
              });
            }
            resolve();
          })
          .catch((error) => {
            console.error('❌ Error al guardar progreso:', error);
            resolve();
          });
        
        return nextState;
      });
    });
  }, [loadProgress]);

  const markOralPassed = useCallback((level: LevelKey) => {
    applyLevelUpdate(level, (prevLevel) => ({
      ...prevLevel,
      oralPassed: true,
      diplomaReady: prevLevel.writtenPassed || prevLevel.diplomaReady
    }));
  }, [applyLevelUpdate]);

  const markWrittenPassed = useCallback((level: LevelKey) => {
    applyLevelUpdate(level, (prevLevel) => ({
      ...prevLevel,
      writtenPassed: true,
      diplomaReady: prevLevel.oralPassed || prevLevel.diplomaReady
    }));
  }, [applyLevelUpdate]);

  const resetLevel = useCallback(async (level: LevelKey) => {
    const resetProgress = createLevelProgress(LEVEL_CONFIG[level].units);
    
    return new Promise<void>((resolve) => {
      setProgress((prev) => {
        const nextState: UserProgress = {
          ...prev,
          [level]: resetProgress
        };
        
        // Guardar en AsyncStorage
        AsyncStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(nextState))
          .then(() => {
            console.log(`💾 Progreso de ${level} reseteado y guardado en AsyncStorage`);
            resolve();
          })
          .catch((error) => {
            console.error(`❌ Error al guardar progreso reseteado de ${level}:`, error);
            resolve();
          });
        
        return nextState;
      });
    });
  }, []);

  const resetAll = useCallback(() => {
    setProgress(createDefaultProgress());
  }, []);

  const value = useMemo<UserProgressContextType>(() => ({
    progress,
    isLoading,
    unlockLevel,
    markUnitCompleted,
    markOralPassed,
    markWrittenPassed,
    resetLevel,
    resetAll,
    reloadProgress
  }), [progress, isLoading, unlockLevel, markUnitCompleted, markOralPassed, markWrittenPassed, resetLevel, resetAll, reloadProgress]);

  return (
    <UserProgressContext.Provider value={value}>
      {!isLoading ? children : null}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress debe usarse dentro de un UserProgressProvider');
  }
  return context;
};
