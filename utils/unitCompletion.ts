import { completeUnit } from './unitProgress';

// Función helper para marcar una unidad como completada
export const markUnitAsCompleted = async (level: 'b1' | 'b2', unitId: string): Promise<void> => {
  try {
    await completeUnit(level, unitId);
    console.log(`Unit ${level}_${unitId} marked as completed`);
  } catch (error) {
    console.error(`Error completing unit ${level}_${unitId}:`, error);
  }
};

// Función para verificar si todos los ejercicios de una unidad están completados
export const checkUnitCompletion = (ejerciciosCompletados: boolean[]): boolean => {
  return ejerciciosCompletados.every(completado => completado);
};

// Función para calcular el progreso de una unidad
export const calculateUnitProgress = (ejerciciosCompletados: boolean[]): number => {
  const completados = ejerciciosCompletados.filter(completado => completado).length;
  const total = ejerciciosCompletados.length;
  return Math.round((completados / total) * 100);
};
