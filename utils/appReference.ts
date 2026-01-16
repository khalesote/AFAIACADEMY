/**
 * Utilidades para gestión de referencia alfanumérica de la aplicación
 * Esta referencia se usa para registro en OEPM (Oficina Española de Patentes y Marcas)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_REFERENCE_KEY = 'app_reference_oepm';
const APP_REFERENCE_PREFIX = 'ACAD';

/**
 * Genera una referencia alfanumérica única para la aplicación
 * Formato: ACAD-XXXX-XXXX-XXXX-XXXX (donde X es alfanumérico)
 * Ejemplo: ACAD-A3B7-9F2C-4D8E-1G5H
 * 
 * Esta referencia es única por instalación de la aplicación
 * y se usa para registro en OEPM
 */
export function generateAppReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  const randomSegment = (): string => {
    let segment = '';
    for (let i = 0; i < 4; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  };
  
  // Incluir timestamp para mayor unicidad
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random1 = randomSegment();
  const random2 = randomSegment();
  const random3 = randomSegment();
  
  return `${APP_REFERENCE_PREFIX}-${timestamp}-${random1}-${random2}-${random3}`;
}

/**
 * Obtiene la referencia alfanumérica de la aplicación para OEPM
 * Si no existe, genera una nueva y la guarda permanentemente
 * 
 * IMPORTANTE: Esta referencia debe ser la misma para toda la vida de la aplicación
 */
export async function getAppReference(): Promise<string> {
  try {
    // Intentar obtener la referencia existente
    const existing = await AsyncStorage.getItem(APP_REFERENCE_KEY);
    
    if (existing) {
      console.log('✅ Referencia de aplicación encontrada:', existing);
      return existing;
    }
    
    // Si no existe, generar una nueva
    const newReference = generateAppReference();
    await AsyncStorage.setItem(APP_REFERENCE_KEY, newReference);
    
    console.log('✅ Nueva referencia de aplicación generada para OEPM:', newReference);
    return newReference;
  } catch (error) {
    console.error('❌ Error obteniendo/generando referencia de aplicación:', error);
    // En caso de error, generar una referencia temporal
    return generateAppReference();
  }
}

/**
 * Obtiene la referencia existente sin generar una nueva si no existe
 */
export async function getExistingAppReference(): Promise<string | null> {
  try {
    const reference = await AsyncStorage.getItem(APP_REFERENCE_KEY);
    return reference;
  } catch (error) {
    console.error('❌ Error obteniendo referencia de aplicación:', error);
    return null;
  }
}

/**
 * Establece una referencia específica (útil para migraciones o configuración manual)
 */
export async function setAppReference(reference: string): Promise<void> {
  try {
    // Validar formato antes de guardar
    if (!validateAppReference(reference)) {
      throw new Error('Formato de referencia inválido');
    }
    
    await AsyncStorage.setItem(APP_REFERENCE_KEY, reference);
    console.log('✅ Referencia de aplicación establecida:', reference);
  } catch (error) {
    console.error('❌ Error estableciendo referencia de aplicación:', error);
    throw error;
  }
}

/**
 * Valida el formato de una referencia alfanumérica de aplicación
 * Formato esperado: ACAD-XXXX-XXXX-XXXX-XXXX
 */
export function validateAppReference(reference: string): boolean {
  const pattern = /^ACAD-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(reference);
}

/**
 * Formatea la referencia para mostrar (con espacios opcionales)
 */
export function formatAppReference(reference: string, withSpaces: boolean = false): string {
  if (!validateAppReference(reference)) {
    return reference; // Devolver tal cual si no es válida
  }
  
  if (withSpaces) {
    return reference.replace(/-/g, ' - ');
  }
  
  return reference;
}

/**
 * Obtiene información completa de la referencia para documentación OEPM
 */
export async function getAppReferenceInfo(): Promise<{
  reference: string;
  formatted: string;
  isValid: boolean;
  generatedAt?: string;
}> {
  const reference = await getAppReference();
  const formatted = formatAppReference(reference, true);
  const isValid = validateAppReference(reference);
  
  try {
    const generatedAt = await AsyncStorage.getItem(`${APP_REFERENCE_KEY}_generated_at`);
    return {
      reference,
      formatted,
      isValid,
      generatedAt: generatedAt || undefined
    };
  } catch {
    return {
      reference,
      formatted,
      isValid
    };
  }
}


















































