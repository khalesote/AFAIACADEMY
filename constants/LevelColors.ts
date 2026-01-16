/**
 * Colores unificados para cada nivel de la academia
 * A1 y B1: Verde
 * A2 y B2: Azul
 */

/**
 * Colores unificados para cada nivel de la academia
 * Usa el verde #9DC3AA de la homepage para A1 y B1
 * A2 y B2 usan azul
 */
export const LevelColors = {
  A1: {
    primary: '#9DC3AA', // Verde de la homepage
    secondary: '#79A890', // Verde más oscuro para contraste
    light: '#e8f5e8',
    dark: '#6b8e7a',
    gradient: ['#9DC3AA', '#79A890'] as [string, string],
  },
  A2: {
    primary: '#1976d2',
    secondary: '#42a5f5',
    light: '#e3f2fd',
    dark: '#1565c0',
    gradient: ['#1976d2', '#42a5f5'] as [string, string],
  },
  B1: {
    primary: '#9DC3AA', // Verde de la homepage
    secondary: '#79A890', // Verde más oscuro para contraste
    light: '#e8f5e8',
    dark: '#6b8e7a',
    gradient: ['#9DC3AA', '#79A890'] as [string, string],
  },
  B2: {
    primary: '#1976d2',
    secondary: '#42a5f5',
    light: '#e3f2fd',
    dark: '#1565c0',
    gradient: ['#1976d2', '#42a5f5'] as [string, string],
  },
};

/**
 * Obtiene los colores para un nivel dado
 */
export function getLevelColors(level: 'A1' | 'A2' | 'B1' | 'B2') {
  return LevelColors[level];
}

