/**
 * Utilidades para gestión de referencias alfanuméricas de usuario
 * Estas referencias se usan para registro en patentes y otros trámites oficiales
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_REFERENCE_KEY = 'user_reference_alphanumeric';
const USER_REFERENCE_PREFIX = 'ACAD';

/**
 * Genera una referencia alfanumérica única para el usuario
 * Formato: ACAD-XXXX-XXXX-XXXX (donde X es alfanumérico)
 * Ejemplo: ACAD-A3B7-9F2C-4D8E
 */
export function generateUserReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  const randomSegment = (): string => {
    let segment = '';
    for (let i = 0; i < 4; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  };
  
  const timestamp = Date.now().toString(36).toUpperCase().slice(-3);
  const random1 = randomSegment();
  const random2 = randomSegment();
  
  return `${USER_REFERENCE_PREFIX}-${timestamp}-${random1}-${random2}`;
}

/**
 * Obtiene la referencia alfanumérica del usuario actual
 * Si no existe, genera una nueva y la guarda
 */
export async function getUserReference(): Promise<string> {
  try {
    // Intentar obtener la referencia existente
    const existing = await AsyncStorage.getItem(USER_REFERENCE_KEY);
    
    if (existing) {
      return existing;
    }
    
    // Si no existe, generar una nueva
    const newReference = generateUserReference();
    await AsyncStorage.setItem(USER_REFERENCE_KEY, newReference);
    
    console.log('✅ Referencia de usuario generada:', newReference);
    return newReference;
  } catch (error) {
    console.error('❌ Error obteniendo/generando referencia de usuario:', error);
    // En caso de error, generar una referencia temporal
    return generateUserReference();
  }
}

/**
 * Obtiene la referencia alfanumérica sin generar una nueva si no existe
 */
export async function getExistingUserReference(): Promise<string | null> {
  try {
    const reference = await AsyncStorage.getItem(USER_REFERENCE_KEY);
    return reference;
  } catch (error) {
    console.error('❌ Error obteniendo referencia de usuario:', error);
    return null;
  }
}

/**
 * Establece una referencia alfanumérica específica (útil para migraciones)
 */
export async function setUserReference(reference: string): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_REFERENCE_KEY, reference);
    console.log('✅ Referencia de usuario establecida:', reference);
  } catch (error) {
    console.error('❌ Error estableciendo referencia de usuario:', error);
    throw error;
  }
}

/**
 * Valida el formato de una referencia alfanumérica
 */
export function validateUserReference(reference: string): boolean {
  const pattern = /^ACAD-[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(reference);
}

/**
 * Formatea la referencia para mostrar (con espacios opcionales)
 */
export function formatUserReference(reference: string, withSpaces: boolean = false): string {
  if (!validateUserReference(reference)) {
    return reference; // Devolver tal cual si no es válida
  }
  
  if (withSpaces) {
    return reference.replace(/-/g, ' - ');
  }
  
  return reference;
}


















































