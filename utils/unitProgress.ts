// Progreso simplificado: sin bloqueo ni almacenamiento persistente.

// Claves para AsyncStorage
const UNIT_PROGRESS_KEY = 'unit_progress';
const B1_COMPLETED_KEY = 'b1_completed';
const B2_UNLOCKED_KEY = 'b2_unlocked';
const B2_COMPLETED_KEY = 'b2_completed';

// Tipos
export type UnitStatus = 'locked' | 'unlocked' | 'completed';
export type Level = 'a1' | 'a2' | 'b1' | 'b2';

export interface UnitProgress {
  [unitId: string]: UnitStatus;
}

// Unidades A1 en orden
export const A1_UNITS = [
  'presentaciones',
  'saludos',
  'nacionalidades',
  'numeros',
  'horas',
  'familia',
  'descripcion',
  'tiempo',
  'comida',
  'ciudad',
  'compras',
  'trabajo',
  'vivienda',
  'salud',
  'viajes',
  'cultura',
  'examen_final'
];

// Unidades B1 en orden
export const B1_UNITS = [
  'trabajo',
  'vivienda',
  'salud',
  'tecnologia',
  'transporte',
  'cultura',
  'estudios',
  'medioambiente',
  'deportes',
  'gastronomia',
  'medios',
  'sociales',
  'turismo',
  'viajes',
  'vidacotidiana',
  'voluntariado',
  'experiencias',
  'fiestas',
  'literatura',
  'alimentacion',
  'relaciones'
];

// Unidades B2 en orden
export const B2_UNITS = [
  'literatura_espanola', // Primera unidad desbloqueada
  'trabajo_avanzado',
  'vivienda_avanzada',
  'salud_avanzada',
  'tecnologia_avanzada',
  'educacion_avanzada',
  'medioambiente_avanzado',
  'economia',
  'politica',
  'cultura_avanzada',
  'ciencia'
];

// Inicializar progreso B1/B2 (solo primera unidad B1 desbloqueada)
export const initializeB1Progress = async (): Promise<void> => {
  // No-op: ya no inicializamos progreso ni bloqueos.
};



// Desbloquear la primera unidad de un nivel si aún está bloqueada (helper general)
export const unlockFirstUnit = async (level: 'b1' | 'b2'): Promise<void> => {
  // No-op: todas las unidades están accesibles.
};
// Helper para obtener el array de unidades según el nivel
export const getUnitsForLevel = (level: Level): string[] => {
  switch (level) {
    case 'a1':
      return A1_UNITS;
    case 'a2':
      // Progreso eliminado para A1/A2: no hay lista de unidades
      return [];
    case 'b1':
      return B1_UNITS;
    case 'b2':
      return B2_UNITS;
    default:
      return [];
  }
};

// Obtener progreso de todas las unidades
export const getUnitProgress = async (): Promise<UnitProgress> => {
  // Sin almacenamiento: no devolvemos estados por unidad.
  return {};
};

// Marcar unidad como completada y desbloquear la siguiente
export const completeUnit = async (level: Level, unitId: string): Promise<void> => {
  // No-op: completar unidad no cambia estado global.
};

// Verificar si una unidad está desbloqueada
export const isUnitUnlocked = async (level: Level, unitId: string): Promise<boolean> => {
  // Siempre desbloqueado para todos los niveles.
  return true;
};

// Verificar si una unidad está completada
export const isUnitCompleted = async (level: Level, unitId: string): Promise<boolean> => {
  // Sin seguimiento de completado global.
  return false;
};



// Completar nivel B1 y desbloquear B2
export const completeB1Level = async (): Promise<void> => {
  // No-op.
};

// Verificar si B1 está completado
export const isB1Completed = async (): Promise<boolean> => {
  // No se bloquea por niveles; devolver false para no alterar UI que dependa de esto.
  return false;
};

// Verificar si B2 está desbloqueado
export const isB2Unlocked = async (): Promise<boolean> => {
  // Siempre desbloqueado.
  return true;
};

// Completar nivel B2
export const completeB2Level = async (): Promise<void> => {
  // No-op.
};

// Verificar si B2 está completado
export const isB2Completed = async (): Promise<boolean> => {
  // Sin seguimiento de finalización global de B2.
  return false;
};

// Obtener progreso de un nivel específico
export const getLevelProgress = async (level: 'b1' | 'b2'): Promise<{ completed: number; total: number; percentage: number }> => {
  // Sin seguimiento, devolvemos 0s.
  return { completed: 0, total: 0, percentage: 0 };
};

// Reset para desarrollo/testing
export const resetProgress = async (): Promise<void> => {
  // No-op.
};

// Función para sincronizar progreso de A1/A2 desde el sistema legacy
export const syncA1A2FromLegacy = async (): Promise<void> => {
  // No-op: no hay sistema legacy para sincronizar.
};
