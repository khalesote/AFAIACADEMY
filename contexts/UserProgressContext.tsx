import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../config/firebase';

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
  unlockLevel: (level: LevelKey) => Promise<void>;
  markUnitCompleted: (level: LevelKey, unitIndex: number) => Promise<void>;
  markOralPassed: (level: LevelKey) => Promise<void>;
  markWrittenPassed: (level: LevelKey) => Promise<void>;
  resetLevel: (level: LevelKey) => Promise<void>;
  resetAll: () => void;
  reloadProgress: () => Promise<void>;
};

const USER_PROGRESS_KEY = 'userProgress_v2';

const getProgressStorageKey = (userId?: string | null) =>
  userId ? `${USER_PROGRESS_KEY}_${userId}` : `${USER_PROGRESS_KEY}_guest`;

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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const loadProgressFromFirebase = useCallback(async (userId: string): Promise<UserProgress | null> => {
    try {
      if (!firestore) return null;
      const docRef = doc(firestore, 'userProgress', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('☁️ Progreso cargado desde Firebase para usuario:', userId);
        return normalizeProgress(docSnap.data());
      }
      return null;
    } catch (error) {
      console.error('❌ Error cargando progreso desde Firebase:', error);
      return null;
    }
  }, []);

  const saveProgressToFirebase = useCallback(async (userId: string, progressData: UserProgress) => {
    try {
      if (!firestore) return;
      const docRef = doc(firestore, 'userProgress', userId);
      await setDoc(docRef, {
        ...progressData,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log('☁️ Progreso guardado en Firebase para usuario:', userId);
    } catch (error) {
      console.error('❌ Error guardando progreso en Firebase:', error);
    }
  }, []);

  const loadProgressFromLocal = useCallback(async (userId?: string | null): Promise<UserProgress> => {
    try {
      const storageKey = getProgressStorageKey(userId);
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        return normalizeProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('❌ Error cargando progreso local:', error);
    }
    return createDefaultProgress();
  }, []);

  const saveProgressToLocal = useCallback(async (progressData: UserProgress, userId?: string | null) => {
    try {
      const storageKey = getProgressStorageKey(userId);
      await AsyncStorage.setItem(storageKey, JSON.stringify(progressData));
      console.log('💾 Progreso guardado en AsyncStorage:', storageKey);
    } catch (error) {
      console.error('❌ Error guardando progreso local:', error);
    }
  }, []);

  const loadProgress = useCallback(async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    
    if (user) {
      setCurrentUserId(user.uid);
      console.log('👤 Usuario autenticado:', user.uid);
      
      const firebaseProgress = await loadProgressFromFirebase(user.uid);
      if (firebaseProgress) {
        setProgress(firebaseProgress);
        await saveProgressToLocal(firebaseProgress, user.uid);
        setIsLoading(false);
        return firebaseProgress;
      }
      
      const localProgress = await loadProgressFromLocal(user.uid);
      if (localProgress.A1.unlocked || localProgress.A2.unlocked || localProgress.B1.unlocked || localProgress.B2.unlocked) {
        await saveProgressToFirebase(user.uid, localProgress);
      }
      setProgress(localProgress);
      setIsLoading(false);
      return localProgress;
    } else {
      setCurrentUserId(null);
      console.log('👤 Usuario no autenticado, usando progreso local');
      const localProgress = await loadProgressFromLocal(null);
      setProgress(localProgress);
      setIsLoading(false);
      return localProgress;
    }
  }, [loadProgressFromFirebase, loadProgressFromLocal, saveProgressToFirebase, saveProgressToLocal]);

  useEffect(() => {
    loadProgress();

    const unsubscribe = auth.onAuthStateChanged((user: typeof auth.currentUser) => {
      if (user?.uid !== currentUserId) {
        console.log('🔄 Cambio de usuario detectado, recargando progreso...');
        loadProgress();
      }
    });

    return () => unsubscribe();
  }, []);

  const reloadProgress = useCallback(async () => {
    await loadProgress();
  }, [loadProgress]);

  const persistProgress = useCallback(async (nextState: UserProgress) => {
    const currentUser = auth.currentUser;
    await saveProgressToLocal(nextState, currentUser?.uid ?? null);
    
    if (currentUser) {
      await saveProgressToFirebase(currentUser.uid, nextState);
    }
  }, [saveProgressToLocal, saveProgressToFirebase]);

  const applyLevelUpdate = useCallback(async (level: LevelKey, updater: (prev: LevelProgress) => LevelProgress) => {
    return new Promise<void>((resolve) => {
      setProgress((prev) => {
        const current = ensureLevelShape(prev[level], LEVEL_CONFIG[level].units);
        const updated = ensureLevelShape(updater(current), LEVEL_CONFIG[level].units);
        const nextLevel = LEVEL_ADVANCEMENTS[level];
        const nextState: UserProgress = {
          ...prev,
          [level]: updated,
          ...(nextLevel && updated.diplomaReady ? { [nextLevel]: { ...prev[nextLevel], unlocked: true } } : {})
        };
        
        persistProgress(nextState).then(() => resolve());
        return nextState;
      });
    });
  }, [persistProgress]);

  const unlockLevel = useCallback(async (level: LevelKey) => {
    console.log(`🔓 Desbloqueando nivel ${level}`);
    await applyLevelUpdate(level, (prevLevel) => ({
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
    
    await applyLevelUpdate(level, (prevLevel) => {
      const nextUnits = [...prevLevel.unitsCompleted];
      nextUnits[unitIndex] = true;
      return {
        ...prevLevel,
        unitsCompleted: nextUnits
      };
    });
  }, [applyLevelUpdate]);

  const markOralPassed = useCallback(async (level: LevelKey) => {
    await applyLevelUpdate(level, (prevLevel) => ({
      ...prevLevel,
      oralPassed: true,
      diplomaReady: prevLevel.writtenPassed || prevLevel.diplomaReady
    }));
  }, [applyLevelUpdate]);

  const markWrittenPassed = useCallback(async (level: LevelKey) => {
    await applyLevelUpdate(level, (prevLevel) => ({
      ...prevLevel,
      writtenPassed: true,
      diplomaReady: prevLevel.oralPassed || prevLevel.diplomaReady
    }));
  }, [applyLevelUpdate]);

  const resetLevel = useCallback(async (level: LevelKey) => {
    const resetProgressData = createLevelProgress(LEVEL_CONFIG[level].units);
    
    return new Promise<void>((resolve) => {
      setProgress((prev) => {
        const nextState: UserProgress = {
          ...prev,
          [level]: resetProgressData
        };
        
        persistProgress(nextState).then(() => resolve());
        return nextState;
      });
    });
  }, [persistProgress]);

  const resetAll = useCallback(() => {
    const defaultProgress = createDefaultProgress();
    setProgress(defaultProgress);
    persistProgress(defaultProgress);
  }, [persistProgress]);

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
      {children}
      {isLoading ? (
        <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
          <ActivityIndicator size="large" color="#9DC3AA" />
        </View>
      ) : null}
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
