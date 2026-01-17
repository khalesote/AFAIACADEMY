import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

const ACCESS_CODES_KEY = 'access_codes_valid';
const USED_CODES_KEY = 'access_codes_used';
const FIRESTORE_COLLECTION = 'access_codes_used';
const FIRESTORE_VALID_CODES_COLLECTION = 'access_codes_valid';

/**
 * Obtiene el ID único del dispositivo
 * Usa una combinación de identificadores del dispositivo para crear un ID único
 */
async function getDeviceId(): Promise<string> {
  try {
    // Intentar obtener ID nativo del dispositivo
    let nativeId: string | null = null;
    
    if (Platform.OS === 'android') {
      try {
        nativeId = Application.getAndroidId();
      } catch (e) {
        console.warn('No se pudo obtener Android ID:', e);
      }
    } else if (Platform.OS === 'ios') {
      try {
        nativeId = await Application.getIosIdForVendorAsync();
      } catch (e) {
        console.warn('No se pudo obtener iOS ID:', e);
      }
    }
    
    // Si tenemos un ID nativo, usarlo
    if (nativeId) {
      // Guardarlo en AsyncStorage para persistencia
      await AsyncStorage.setItem('device_id', nativeId);
      return nativeId;
    }
  } catch (error) {
    console.warn('Error obteniendo ID nativo del dispositivo:', error);
  }
  
  // Fallback: usar un ID generado y guardado en AsyncStorage
  try {
    let deviceId = await AsyncStorage.getItem('device_id');
    if (!deviceId) {
      // Generar un ID único basado en timestamp y random
      deviceId = `device_${Platform.OS}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  } catch (error) {
    console.error('Error obteniendo ID del dispositivo:', error);
    // Último fallback: generar un ID temporal
    return `device_${Platform.OS}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Estructura para códigos de acceso de la escuela virtual
 * Cada código está vinculado a UN SOLO documento, usuario, dispositivo y nivel
 */
interface AccessCodeInfo {
  code: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'ALL'; // Nivel al que da acceso el código
  used: boolean; // Si ya ha sido usado
  usedBy?: {
    documento: string;
    deviceId: string;
    usedAt: Date;
  };
}

/**
 * Lista de códigos de acceso válidos para escuela virtual
 * Cada código está vinculado a UN SOLO documento, usuario, dispositivo y nivel
 */
const VALID_ACCESS_CODES: AccessCodeInfo[] = [
  { code: 'ACADEMIA2024-001', level: 'A1', used: false },
  { code: 'ACADEMIA2024-002', level: 'A1', used: false },
  { code: 'ACADEMIA2024-003', level: 'A1', used: false },
  { code: 'ACADEMIA2024-004', level: 'A1', used: false },
  { code: 'ACADEMIA2024-005', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-001', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-002', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-003', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-004', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-005', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-006', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-007', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-008', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-009', level: 'A1', used: false },
  { code: 'ACADEMIA2025-A1-010', level: 'A1', used: false },
  
  // Nuevos códigos B1 2025
  { code: 'ACADEMIA2025-B1-001', level: 'B1', used: false },
  { code: 'ACADEMIA2025-B1-002', level: 'B1', used: false },
  { code: 'ACADEMIA2025-B1-003', level: 'B1', used: false },
  { code: 'ACADEMIA2025-B1-004', level: 'B1', used: false },
  { code: 'ACADEMIA2025-B1-005', level: 'B1', used: false },
  
  // Nuevos códigos B2 2025
  { code: 'ACADEMIA2025-B2-001', level: 'B2', used: false },
  { code: 'ACADEMIA2025-B2-002', level: 'B2', used: false },
  { code: 'ACADEMIA2025-B2-003', level: 'B2', used: false },
  { code: 'ACADEMIA2025-B2-004', level: 'B2', used: false },
  { code: 'ACADEMIA2025-B2-005', level: 'B2', used: false },
  
  { code: 'ACADEMIA2024-006', level: 'A2', used: false },
  { code: 'ACADEMIA2024-007', level: 'A2', used: false },
  { code: 'ACADEMIA2024-008', level: 'A2', used: false },
  { code: 'ACADEMIA2024-009', level: 'A2', used: false },
  { code: 'ACADEMIA2024-010', level: 'A2', used: false },
  { code: 'ACADEMIA2024-011', level: 'B1', used: false },
  { code: 'ACADEMIA2024-012', level: 'B1', used: false },
  { code: 'ACADEMIA2024-013', level: 'B1', used: false },
  { code: 'ACADEMIA2024-014', level: 'B1', used: false },
  { code: 'ACADEMIA2024-015', level: 'B1', used: false },
  { code: 'ACADEMIA2024-016', level: 'B2', used: false },
  { code: 'ACADEMIA2024-017', level: 'B2', used: false },
  { code: 'ACADEMIA2024-018', level: 'B2', used: false },
  { code: 'ACADEMIA2024-019', level: 'B2', used: false },
  { code: 'ACADEMIA2024-020', level: 'B2', used: false },
  // Códigos de respaldo
  { code: 'ACADEMIA2024-021', level: 'A1', used: false },
  { code: 'ACADEMIA2024-022', level: 'A2', used: false },
  { code: 'ACADEMIA2024-023', level: 'B1', used: false },
  { code: 'ACADEMIA2024-024', level: 'B2', used: false },
  { code: 'ACADEMIA2024-025', level: 'A1', used: false },
  { code: 'ACADEMIA2024-026', level: 'A2', used: false },
  { code: 'ACADEMIA2024-027', level: 'B1', used: false },
  { code: 'ACADEMIA2024-028', level: 'B2', used: false },
  { code: 'ACADEMIA2024-029', level: 'A1', used: false },
  { code: 'ACADEMIA2024-030', level: 'A2', used: false },
  // Código especial para pruebas (temporal)
  { code: 'TEST-ACCESS-2024', level: 'A1', used: false },
];

/**
 * Lista de códigos de acceso válidos para formación profesional
 * IMPORTANTE: Cada código está vinculado a UN SOLO documento, usuario y dispositivo
 * Total: 30 códigos para formación profesional
 */
const VALID_FORMACION_CODES = [
  'FORMACION2024-001',
  'FORMACION2024-002',
  'FORMACION2024-003',
  'FORMACION2024-004',
  'FORMACION2024-005',
  'FORMACION2024-006',
  'FORMACION2024-007',
  'FORMACION2024-008',
  'FORMACION2024-009',
  'FORMACION2024-010',
  'FORMACION2024-011',
  'FORMACION2024-012',
  'FORMACION2024-013',
  'FORMACION2024-014',
  'FORMACION2024-015',
  'FORMACION2024-016',
  'FORMACION2024-017',
  'FORMACION2024-018',
  'FORMACION2024-019',
  'FORMACION2024-020',
  'FORMACION2024-021',
  'FORMACION2024-022',
  'FORMACION2024-023',
  'FORMACION2024-024',
  'FORMACION2024-025',
  'FORMACION2024-026',
  'FORMACION2024-027',
  'FORMACION2024-028',
  'FORMACION2024-029',
  'FORMACION2024-030',
];

/**
 * Lista de códigos de acceso válidos para examen de nacionalidad
 * IMPORTANTE: Cada código está vinculado a UN SOLO documento, usuario y dispositivo
 * Total: 30 códigos para examen de nacionalidad CCSE
 */
const VALID_EXAMEN_NACIONALIDAD_CODES = [
  'EXAMEN2024-001',
  'EXAMEN2024-002',
  'EXAMEN2024-003',
  'EXAMEN2024-004',
  'EXAMEN2024-005',
  'EXAMEN2024-006',
  'EXAMEN2024-007',
  'EXAMEN2024-008',
  'EXAMEN2024-009',
  'EXAMEN2024-010',
  'EXAMEN2024-011',
  'EXAMEN2024-012',
  'EXAMEN2024-013',
  'EXAMEN2024-014',
  'EXAMEN2024-015',
  'EXAMEN2024-016',
  'EXAMEN2024-017',
  'EXAMEN2024-018',
  'EXAMEN2024-019',
  'EXAMEN2024-020',
  'EXAMEN2024-021',
  'EXAMEN2024-022',
  'EXAMEN2024-023',
  'EXAMEN2024-024',
  'EXAMEN2024-025',
  'EXAMEN2024-026',
  'EXAMEN2024-027',
  'EXAMEN2024-028',
  'EXAMEN2024-029',
  'EXAMEN2024-030',
  // Código especial para pruebas
  'TEST-EXAMEN-2024',
];

/**
 * RESETEA todos los códigos usados (solo para administración)
 * Elimina todos los registros de códigos usados en Firebase y AsyncStorage
 */
export async function resetAllAccessCodes(): Promise<void> {
  try {
    // Limpiar AsyncStorage
    await AsyncStorage.removeItem(USED_CODES_KEY);
    
    // Eliminar todos los documentos de Firebase
    if (firestore) {
      try {
        const codesRef = collection(firestore, FIRESTORE_COLLECTION);
        const q = query(codesRef);
        const querySnapshot = await getDocs(q);
        
        const deletePromises = querySnapshot.docs.map(docSnapshot => 
          deleteDoc(docSnapshot.ref)
        );
        
        await Promise.all(deletePromises);
        console.log(`✅ ${querySnapshot.docs.length} códigos eliminados de Firebase`);
      } catch (error) {
        console.error('Error eliminando códigos de Firebase:', error);
        throw error;
      }
    }
    
    console.log('✅ Todos los códigos han sido reseteados');
  } catch (error) {
    console.error('Error reseteando códigos:', error);
    throw error;
  }
}

/**
 * Inicializa los códigos válidos en AsyncStorage si no existen
 */
export async function initializeAccessCodes(): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem(ACCESS_CODES_KEY);
    if (!existing) {
      await AsyncStorage.setItem(ACCESS_CODES_KEY, JSON.stringify(VALID_ACCESS_CODES));
    }
  } catch (error) {
    console.error('Error inicializando códigos de acceso:', error);
  }
}

/**
 * Obtiene la lista de códigos válidos con su estado actual
 */
async function getValidAccessCodes(): Promise<AccessCodeInfo[]> {
  try {
    // Obtener códigos usados para actualizar el estado
    const usedCodes = await getUsedAccessCodes();
    
    // Crear una copia de los códigos válidos
    const validCodes = [...VALID_ACCESS_CODES];
    
    // Actualizar el estado de los códigos usados
    for (let i = 0; i < validCodes.length; i++) {
      const code = validCodes[i].code;
      if (usedCodes[code]) {
        const usedInfo = JSON.parse(usedCodes[code]);
        validCodes[i] = {
          ...validCodes[i],
          used: true,
          usedBy: usedInfo.usedBy
        };
      }
    }
    
    return validCodes;
    
  } catch (error) {
    console.error('Error obteniendo códigos válidos:', error);
    return [];
  }
}

/**
 * Obtiene información de un código usado desde Firebase
 */
async function getCodeUsageInfo(code: string): Promise<{
  documento: string;
  deviceId: string;
  usadoEn: any;
} | null> {
  if (!firestore) {
    console.warn('⚠️ Firestore no está disponible, usando solo AsyncStorage');
    return null;
  }
  
  try {
    const codeDocRef = doc(firestore, FIRESTORE_COLLECTION, code);
    const codeDoc = await getDoc(codeDocRef);
    
    if (codeDoc.exists()) {
      const data = codeDoc.data();
      console.log(`✅ Código ${code} encontrado en Firebase:`, {
        documento: data.documento || 'sin documento',
        deviceId: data.deviceId || 'sin deviceId',
        usadoEn: data.usadoEn ? 'sí' : 'no'
      });
      return {
        documento: data.documento || '',
        deviceId: data.deviceId || '',
        usadoEn: data.usadoEn || null
      };
    }
    console.log(`ℹ️ Código ${code} no encontrado en Firebase (disponible para usar)`);
    return null;
  } catch (error: any) {
    console.error('❌ Error obteniendo información del código desde Firebase:', error);
    console.error('❌ Detalles del error:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack
    });
    // Si hay un error de Firebase, intentar usar AsyncStorage como fallback
    try {
      const usedCodes = await getUsedAccessCodes();
      if (usedCodes[code]) {
        const localInfo = JSON.parse(usedCodes[code]);
        console.log(`⚠️ Usando información local del código ${code} (Firebase no disponible)`);
        return {
          documento: localInfo.documento || '',
          deviceId: localInfo.deviceId || '',
          usadoEn: localInfo.timestamp ? new Date(localInfo.timestamp) : null
        };
      }
    } catch (localError) {
      console.error('❌ Error obteniendo información local del código:', localError);
    }
    return null;
  }
}

/**
 * Valida un código de acceso para un nivel específico
 * Verifica que el código sea válido, que no haya sido usado y que sea para el nivel correcto
 * IMPORTANTE: Cada código solo se puede usar UNA VEZ, en UN SOLO DISPOSITIVO y para UN SOLO NIVEL
 * @param code - El código a validar
 * @param level - El nivel para el que se está validando el código
 * @param documento - El documento del usuario (opcional)
 * @returns Objeto con validación y mensaje
 */
export async function validateAccessCode(
  code: string, 
  level: 'A1' | 'A2' | 'B1' | 'B2',
  documento?: string
): Promise<{
  valid: boolean;
  message: string;
  codeInfo?: AccessCodeInfo;
}> {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const deviceId = await getDeviceId();
    
    // Obtener información del código desde Firebase (fuente de verdad)
    const codeUsageInfo = await getCodeUsageInfo(normalizedCode);
    
    // Obtener códigos válidos
    const validCodes = await getValidAccessCodes();
    
    // Buscar el código en la lista de válidos
    const codeInfo = validCodes.find(c => c.code === normalizedCode);
    
    // Verificar si el código existe
    if (!codeInfo) {
      return {
        valid: false,
        message: 'Código de acceso no válido.'
      };
    }
    
    // Verificar que el código sea para el nivel solicitado o para todos los niveles
    if (codeInfo.level !== level && codeInfo.level !== 'ALL') {
      return {
        valid: false,
        message: `Este código es para nivel ${codeInfo.level}, no para ${level}.`,
        codeInfo
      };
    }
    
    // Si el código ya fue usado, verificar restricciones
    if (codeUsageInfo) {
      // El código ya fue usado - verificar dispositivo y nivel
      if (codeUsageInfo.deviceId !== deviceId) {
        // Diferente dispositivo - rechazar
        return {
          valid: false,
          message: 'Este código ya ha sido utilizado en otro dispositivo.',
          codeInfo
        };
      }
      
      // Mismo dispositivo - verificar si se está intentando usar para el mismo nivel
      // Obtener el nivel usado desde Firebase
      if (firestore) {
        try {
          const codeDocRef = doc(firestore, FIRESTORE_COLLECTION, normalizedCode);
          const codeDoc = await getDoc(codeDocRef);
          
          if (codeDoc.exists()) {
            const data = codeDoc.data();
            const usedLevel = data.usedLevel || data.level;
            
            // Si el código ya fue usado para un nivel específico, solo permitir ese nivel
            if (usedLevel && usedLevel !== 'ALL' && usedLevel !== level) {
              return {
                valid: false,
                message: `Este código ya fue usado para el nivel ${usedLevel}. No se puede usar para ${level}.`,
                codeInfo
              };
            }
            
            // Si es el mismo nivel o es código ALL, permitir (ya está activado)
            if (usedLevel === level || usedLevel === 'ALL' || codeInfo.level === 'ALL') {
              return {
                valid: true,
                message: 'Código ya activado en este dispositivo para este nivel.',
                codeInfo
              };
            }
          }
        } catch (firebaseError) {
          console.warn('Error obteniendo información de Firebase, continuando con validación local:', firebaseError);
        }
      }
    }
    
    // Si llegamos aquí, el código es válido y no ha sido usado
    return {
      valid: true,
      message: 'Código válido.',
      codeInfo
    };
  } catch (error: any) {
    console.error('❌ Error validando código de acceso:', error);
    console.error('❌ Detalles del error:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack
    });
    return {
      valid: false,
      message: `Error al validar el código: ${error?.message || 'Error desconocido'}. Por favor, inténtalo de nuevo.`
    };
  }
}

/**
 * Marca un código como usado para un nivel específico
 * IMPORTANTE: Cada código solo se puede usar UNA VEZ, en UN SOLO DISPOSITIVO y para UN SOLO NIVEL
 * Guarda en Firebase (global) y en AsyncStorage (cache local)
 * @param code - El código usado
 * @param level - El nivel específico para el que se usa el código (A1, A2, B1, B2)
 * @param documento - El documento del usuario (opcional)
 */
export async function markAccessCodeAsUsed(
  code: string, 
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'ALL',
  documento?: string
): Promise<void> {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const deviceId = await getDeviceId();
    const now = new Date();
    
    // Obtener códigos válidos para actualizar el estado local
    const validCodes = await getValidAccessCodes();
    const codeIndex = validCodes.findIndex(c => c.code === normalizedCode);
    
    if (codeIndex === -1) {
      throw new Error('Código no válido');
    }
    
    const codeInfo = validCodes[codeIndex];
    
    // Verificar que el código sea para el nivel correcto o para todos los niveles
    if (codeInfo.level !== level && codeInfo.level !== 'ALL') {
      throw new Error(`Este código es para nivel ${codeInfo.level}, no para ${level}`);
    }
    
    // Guardar en Firebase PRIMERO (fuente de verdad)
    if (firestore) {
      try {
        const codeDocRef = doc(firestore, FIRESTORE_COLLECTION, normalizedCode);
        
        // Verificar si el código ya existe en Firebase
        const codeDoc = await getDoc(codeDocRef);
        
        if (codeDoc.exists()) {
          // El código ya existe - verificar restricciones
          const data = codeDoc.data();
          const usedLevel = data.usedLevel || data.level; // Nivel específico para el que se usó
          
          // Verificar dispositivo
          if (data.deviceId !== deviceId) {
            throw new Error('Este código de acceso ya ha sido utilizado en otro dispositivo');
          }
          
          // Verificar nivel - si ya fue usado para un nivel específico, no permitir otro nivel
          if (usedLevel && usedLevel !== 'ALL' && usedLevel !== level) {
            throw new Error(`Este código ya fue usado para el nivel ${usedLevel}. No se puede usar para ${level}.`);
          }
          
          // Si es el mismo nivel o código ALL, ya está registrado
          if (usedLevel === level || usedLevel === 'ALL' || codeInfo.level === 'ALL') {
            console.log(`✅ Código ${normalizedCode} ya estaba marcado para este dispositivo y nivel`);
            return; // Ya está registrado, no hacer nada
          }
        }
        
        // El código no existe o necesita actualización - guardarlo/actualizarlo en Firebase
        // Guardar el nivel específico para el que se usa (usedLevel)
        const levelToStore = codeInfo.level === 'ALL' ? level : codeInfo.level;
        
        await setDoc(codeDocRef, {
          code: normalizedCode,
          level: codeInfo.level, // Nivel original del código
          usedLevel: levelToStore, // Nivel específico para el que se usa
          used: true,
          usedBy: {
            documento: documento || '',
            deviceId,
            usedAt: serverTimestamp()
          },
          createdAt: serverTimestamp()
        }, { merge: true });
        
        console.log(`✅ Código ${normalizedCode} marcado como usado en Firebase para nivel ${levelToStore}`);
        
      } catch (firebaseError: any) {
        // Si es un error de permisos
        if (firebaseError.code === 'permission-denied') {
          throw new Error('No tienes permisos para marcar este código como usado');
        }
        
        // Re-lanzar errores conocidos
        if (firebaseError.message) {
          throw firebaseError;
        }
        
        // Otro error de Firebase
        console.error('Error guardando código en Firebase:', firebaseError);
        throw new Error('Error al guardar el código en el servidor. Por favor, inténtalo de nuevo.');
      }
    }
    
    // Marcar como usado localmente
    codeInfo.used = true;
    const levelToStore = codeInfo.level === 'ALL' ? level : codeInfo.level;
    codeInfo.usedBy = {
      documento: documento || '',
      deviceId,
      usedAt: now
    };
    
    // Guardar en AsyncStorage como caché local
    try {
      const usedCodes = await getUsedAccessCodes();
      usedCodes[normalizedCode] = JSON.stringify({
        code: normalizedCode,
        level: codeInfo.level,
        usedLevel: levelToStore, // Nivel específico usado
        used: true,
        usedBy: {
          documento: documento || '',
          deviceId,
          usedAt: now.toISOString()
        }
      });
      
      await AsyncStorage.setItem(USED_CODES_KEY, JSON.stringify(usedCodes));
      console.log(`✅ Código ${normalizedCode} guardado en caché local para nivel ${levelToStore}`);
      
    } catch (storageError) {
      console.warn('Error guardando en AsyncStorage (no crítico):', storageError);
      // No lanzar error, Firebase es la fuente de verdad
    }
    
  } catch (error) {
    console.error('Error marcando código como usado:', error);
    throw error;
  }
}

/**
 * Obtiene la lista de códigos ya usados desde Firebase (con fallback a AsyncStorage)
 */
export async function getUsedAccessCodes(): Promise<Record<string, string>> {
  const usedCodes: Record<string, string> = {};
  
  try {
    // Intentar obtener desde Firebase primero
    if (firestore) {
      try {
        const codesRef = collection(firestore, FIRESTORE_COLLECTION);
        const q = query(codesRef, where('used', '==', true));
        const querySnapshot = await getDocs(q);
        
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          if (data.code) {
            usedCodes[data.code] = JSON.stringify({
              code: data.code,
              level: data.level || 'ALL',
              used: true,
              usedBy: {
                documento: data.usedBy?.documento || '',
                deviceId: data.usedBy?.deviceId || '',
                usedAt: data.usedBy?.usedAt?.toDate?.()?.toISOString() || new Date().toISOString()
              }
            });
          }
        }
        
        // Guardar en caché local
        if (Object.keys(usedCodes).length > 0) {
          await AsyncStorage.setItem(USED_CODES_KEY, JSON.stringify(usedCodes));
        }
        
        return usedCodes;
        
      } catch (firebaseError) {
        console.warn('Error obteniendo códigos usados de Firebase, usando caché local:', firebaseError);
        // Continuar con la obtención desde caché local
      }
    }
    
    // Si no hay Firebase o falló, intentar desde AsyncStorage
    const localUsed = await AsyncStorage.getItem(USED_CODES_KEY);
    if (localUsed) {
      try {
        return JSON.parse(localUsed);
      } catch (e) {
        console.error('Error parseando códigos usados de caché local:', e);
      }
    }
    
    // Si no hay datos en ningún lado, devolver objeto vacío
    return {};
  } catch (error) {
    console.error('Error obteniendo códigos usados:', error);
    // Fallback a AsyncStorage
    try {
      const stored = await AsyncStorage.getItem(USED_CODES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error en fallback AsyncStorage:', e);
    }
    return {};
  }
}

/**
 * Agrega nuevos códigos válidos (útil para administración)
 * @param newCodes - Array de nuevos códigos a agregar
 */
export async function addValidAccessCodes(newCodes: string[]): Promise<void> {
  try {
    const validCodes = await getValidAccessCodes();
    const normalizedNewCodes = newCodes.map(code => code.trim().toUpperCase());
    
    // Agregar solo los códigos que no existen ya
    const uniqueCodes = [...new Set([...validCodes, ...normalizedNewCodes])];
    
    await AsyncStorage.setItem(ACCESS_CODES_KEY, JSON.stringify(uniqueCodes));
  } catch (error) {
    console.error('Error agregando códigos válidos:', error);
    throw error;
  }
}

/**
 * Obtiene la lista de códigos válidos para formación profesional
 */
export async function getValidFormacionCodes(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem('formacion_codes_valid');
    if (stored) {
      return JSON.parse(stored);
    }
    // Inicializar con los códigos por defecto
    await AsyncStorage.setItem('formacion_codes_valid', JSON.stringify(VALID_FORMACION_CODES));
    return VALID_FORMACION_CODES;
  } catch (error) {
    console.error('Error obteniendo códigos de formación:', error);
    return VALID_FORMACION_CODES;
  }
}

/**
 * Valida un código de acceso para formación profesional
 * @param code - El código a validar
 * @param documento - El documento del usuario
 */
export async function validateFormacionCode(code: string, documento: string): Promise<{
  valid: boolean;
  message: string;
}> {
  try {
    // Normalizar el código (mayúsculas, sin espacios)
    const normalizedCode = code.trim().toUpperCase();

    // Verificar que el código no esté vacío
    if (!normalizedCode) {
      return {
        valid: false,
        message: 'Por favor, introduce un código de acceso'
      };
    }

    // Obtener códigos válidos de formación profesional
    const validCodes = await getValidFormacionCodes();

    // Verificar si el código es válido
    if (!validCodes.includes(normalizedCode)) {
      return {
        valid: false,
        message: 'El código de acceso no es válido'
      };
    }

    // Obtener ID del dispositivo actual
    const currentDeviceId = await getDeviceId();

    // Verificar en Firebase si el código ya ha sido usado
    const codeInfo = await getCodeUsageInfo(normalizedCode);
    
    if (codeInfo) {
      // El código ya fue usado
      // Verificar si es el mismo documento Y el mismo dispositivo
      if (codeInfo.documento === documento && codeInfo.deviceId === currentDeviceId) {
        // Mismo usuario, mismo dispositivo - permitir (ya lo usó antes)
        return {
          valid: true,
          message: 'Código válido'
        };
      } else {
        // Diferente documento o dispositivo - rechazar
        if (codeInfo.documento !== documento) {
          return {
            valid: false,
            message: 'Este código de acceso ya ha sido utilizado por otro usuario con otro documento'
          };
        }
        if (codeInfo.deviceId !== currentDeviceId) {
          return {
            valid: false,
            message: 'Este código de acceso ya ha sido utilizado en otro dispositivo'
          };
        }
      }
    }

    // El código es válido y no ha sido usado (o fue usado por el mismo usuario en el mismo dispositivo)
    return {
      valid: true,
      message: 'Código válido'
    };
  } catch (error) {
    console.error('Error validando código de formación:', error);
    return {
      valid: false,
      message: 'Error al validar el código. Por favor, inténtalo de nuevo.'
    };
  }
}

/**
 * Marca un código de formación profesional como usado
 * @param code - El código usado
 * @param documento - El documento del usuario
 */
export async function markFormacionCodeAsUsed(code: string, documento: string): Promise<void> {
  // Reutilizar la función que marca códigos normales con nivel 'ALL'
  // ya que los códigos de formación profesional no están asociados a un nivel específico
  return markAccessCodeAsUsed(code, 'ALL', documento);
}

/**
 * Obtiene la lista de códigos válidos para examen de nacionalidad
 */
export async function getValidExamenNacionalidadCodes(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem('examen_nacionalidad_codes_valid');
    if (stored) {
      return JSON.parse(stored);
    }
    // Inicializar con los códigos por defecto
    await AsyncStorage.setItem('examen_nacionalidad_codes_valid', JSON.stringify(VALID_EXAMEN_NACIONALIDAD_CODES));
    return VALID_EXAMEN_NACIONALIDAD_CODES;
  } catch (error) {
    console.error('Error obteniendo códigos de examen de nacionalidad:', error);
    return VALID_EXAMEN_NACIONALIDAD_CODES;
  }
}

/**
 * Valida un código de acceso para examen de nacionalidad
 * @param code - El código a validar
 * @param documento - El documento del usuario (opcional para códigos de prueba)
 */
export async function validateExamenNacionalidadCode(code: string, documento?: string): Promise<{
  valid: boolean;
  message: string;
}> {
  try {
    // Normalizar el código (mayúsculas, sin espacios)
    const normalizedCode = code.trim().toUpperCase();

    // Verificar que el código no esté vacío
    if (!normalizedCode) {
      return {
        valid: false,
        message: 'Por favor, introduce un código de acceso'
      };
    }

    // Obtener códigos válidos de examen de nacionalidad
    const validCodes = await getValidExamenNacionalidadCodes();

    // Verificar si el código es válido
    if (!validCodes.includes(normalizedCode)) {
      return {
        valid: false,
        message: 'El código de acceso no es válido'
      };
    }

    // Si es un código de prueba (TEST-EXAMEN-2024), permitir sin documento
    if (normalizedCode === 'TEST-EXAMEN-2024') {
      return {
        valid: true,
        message: 'Código válido (prueba)'
      };
    }

    // Para códigos normales, verificar documento y dispositivo
    if (!documento) {
      return {
        valid: false,
        message: 'Se requiere documento de identidad para este código'
      };
    }

    // Obtener ID del dispositivo actual
    const currentDeviceId = await getDeviceId();

    // Verificar en Firebase si el código ya ha sido usado
    const codeInfo = await getCodeUsageInfo(normalizedCode);
    
    if (codeInfo) {
      // El código ya fue usado
      // Verificar si es el mismo documento Y el mismo dispositivo
      if (codeInfo.documento === documento && codeInfo.deviceId === currentDeviceId) {
        // Mismo usuario, mismo dispositivo - permitir (ya lo usó antes)
        return {
          valid: true,
          message: 'Código válido'
        };
      } else {
        // Diferente documento o dispositivo - rechazar
        if (codeInfo.documento !== documento) {
          return {
            valid: false,
            message: 'Este código de acceso ya ha sido utilizado por otro usuario con otro documento'
          };
        }
        if (codeInfo.deviceId !== currentDeviceId) {
          return {
            valid: false,
            message: 'Este código de acceso ya ha sido utilizado en otro dispositivo'
          };
        }
      }
    }

    // El código es válido y no ha sido usado (o fue usado por el mismo usuario en el mismo dispositivo)
    return {
      valid: true,
      message: 'Código válido'
    };
  } catch (error) {
    console.error('Error validando código de examen de nacionalidad:', error);
    return {
      valid: false,
      message: 'Error al validar el código. Por favor, inténtalo de nuevo.'
    };
  }
}

/**
 * Marca un código de examen de nacionalidad como usado
 * @param code - El código usado
 * @param documento - El documento del usuario (opcional para códigos de prueba)
 */
/**
 * Marca un código de examen de nacionalidad como usado
 * @param code - El código usado
 * @param documento - El documento del usuario (opcional para códigos de prueba)
 */
export async function markExamenNacionalidadCodeAsUsed(code: string, documento?: string): Promise<void> {
  try {
    const normalizedCode = code.trim().toUpperCase();
    
    // Si es código de prueba, no requiere documento ni marca en Firebase
    if (normalizedCode === 'TEST-EXAMEN-2024') {
      console.log('✅ Código de prueba usado (no se marca en Firebase)');
      return;
    }

    // Para códigos normales, usar la función estándar con nivel 'B1' como predeterminado
    // ya que el examen de nacionalidad es equivalente a nivel B1
    if (documento) {
      return markAccessCodeAsUsed(normalizedCode, 'B1', documento);
    } else {
      throw new Error('Se requiere documento de identidad para marcar este código como usado');
    }
  } catch (error) {
    console.error('Error marcando código de examen de nacionalidad:', error);
    throw error;
  }
}
