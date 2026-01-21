import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore, auth } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';

/**
 * Obtiene el userId del usuario autenticado
 * @returns userId o null si no hay usuario autenticado
 */
function getCurrentUserId(): string | null {
  return auth.currentUser?.uid || null;
}

const ACCESS_CODES_KEY = 'access_codes_valid';
const USED_CODES_KEY = 'access_codes_used';
const FIRESTORE_COLLECTION = 'access_codes_used';
const FIRESTORE_VALID_CODES_COLLECTION = 'access_codes_valid';

/**
 * Estructura para códigos de acceso de la escuela virtual
 * Cada código está vinculado a UN SOLO usuario (cuenta Firebase) y nivel
 * IMPORTANTE: El progreso se vincula a la cuenta del usuario, no al dispositivo
 */
interface AccessCodeInfo {
  code: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'ALL';
  used: boolean;
  usedBy?: {
    documento: string;
    userId: string;
    usedAt: Date;
  };
}

/**
 * Lista de códigos de acceso válidos para escuela virtual
 * Cada código está vinculado a UN SOLO documento, usuario, dispositivo y nivel
 * Formato: NIVEL-XXXX (ej: A1-0001, A2-0001, B1-0001, B2-0001)
 * Total: 1000 códigos por nivel = 4000 códigos en total
 */
const VALID_ACCESS_CODES: AccessCodeInfo[] = (() => {
  const codes: AccessCodeInfo[] = [];
  const levels: Array<'A1' | 'A2' | 'B1' | 'B2'> = ['A1', 'A2', 'B1', 'B2'];
  
  levels.forEach(level => {
    for (let i = 1; i <= 1000; i++) {
      const codeNumber = String(i).padStart(4, '0');
      codes.push({
        code: `${level}-${codeNumber}`,
        level: level,
        used: false
      });
    }
  });
  
  return codes;
})();

async function getValidAccessCodeFromFirestore(code: string): Promise<AccessCodeInfo | null> {
  if (!firestore) return null;
  try {
    const codeDocRef = doc(firestore, FIRESTORE_VALID_CODES_COLLECTION, code);
    const codeDoc = await getDoc(codeDocRef);
    if (!codeDoc.exists()) return null;
    const data = codeDoc.data();
    if (data.active === false) return null;
    const level = (data.level || 'ALL') as AccessCodeInfo['level'];
    return {
      code,
      level,
      used: false
    };
  } catch (error) {
    console.warn('Error obteniendo código válido desde Firebase:', error);
    return null;
  }
}

/**
 * Lista de códigos de acceso válidos para formación profesional y preformación
 * IMPORTANTE: Cada código está vinculado a UN SOLO documento, usuario y dispositivo
 * Total: 30 códigos de formación profesional + 1000 códigos de preformación
 */
const VALID_PREFORMACION_CODES: string[] = (() => {
  const codes: string[] = [];
  for (let i = 1; i <= 1000; i += 1) {
    codes.push(`PRE-${String(i).padStart(3, '0')}`);
  }
  return codes;
})();

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
  ...VALID_PREFORMACION_CODES,
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
 * Ahora verifica por userId (cuenta de usuario) en lugar de deviceId
 */
async function getCodeUsageInfo(code: string): Promise<{
  documento: string;
  userId: string;
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
        userId: data.userId || data.usedBy?.userId || 'sin userId',
        usadoEn: data.usadoEn ? 'sí' : 'no'
      });
      return {
        documento: data.documento || '',
        userId: data.userId || data.usedBy?.userId || '',
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
    try {
      const usedCodes = await getUsedAccessCodes();
      if (usedCodes[code]) {
        const localInfo = JSON.parse(usedCodes[code]);
        console.log(`⚠️ Usando información local del código ${code} (Firebase no disponible)`);
        return {
          documento: localInfo.documento || '',
          userId: localInfo.userId || localInfo.usedBy?.userId || '',
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
 * IMPORTANTE: Cada código solo se puede usar UNA VEZ, por UN SOLO USUARIO (cuenta Firebase) y para UN SOLO NIVEL
 * El código queda vinculado a la cuenta del usuario, permitiendo acceso desde cualquier dispositivo
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
    const currentUserId = getCurrentUserId();
    
    if (!currentUserId) {
      return {
        valid: false,
        message: 'Debes iniciar sesión para usar un código de acceso.'
      };
    }
    
    const codeUsageInfo = await getCodeUsageInfo(normalizedCode);
    
    let codeInfo = await getValidAccessCodeFromFirestore(normalizedCode);
    
    if (!codeInfo) {
      const validCodes = await getValidAccessCodes();
      codeInfo = validCodes.find(c => c.code === normalizedCode) || null;
    }
    
    if (!codeInfo) {
      return {
        valid: false,
        message: 'Código de acceso no válido.'
      };
    }
    
    if (codeInfo.level !== level && codeInfo.level !== 'ALL') {
      return {
        valid: false,
        message: `Este código es para nivel ${codeInfo.level}, no para ${level}.`,
        codeInfo
      };
    }
    
    if (codeUsageInfo) {
      if (codeUsageInfo.userId !== currentUserId) {
        return {
          valid: false,
          message: 'Este código ya ha sido utilizado por otro usuario.',
          codeInfo
        };
      }
      
      if (firestore) {
        try {
          const codeDocRef = doc(firestore, FIRESTORE_COLLECTION, normalizedCode);
          const codeDoc = await getDoc(codeDocRef);
          
          if (codeDoc.exists()) {
            const data = codeDoc.data();
            const usedLevel = data.usedLevel || data.level;
            
            if (usedLevel && usedLevel !== 'ALL' && usedLevel !== level) {
              return {
                valid: false,
                message: `Este código ya fue usado para el nivel ${usedLevel}. No se puede usar para ${level}.`,
                codeInfo
              };
            }
            
            if (usedLevel === level || usedLevel === 'ALL' || codeInfo.level === 'ALL') {
              return {
                valid: true,
                message: 'Código ya activado para tu cuenta en este nivel.',
                codeInfo
              };
            }
          }
        } catch (firebaseError) {
          console.warn('Error obteniendo información de Firebase, continuando con validación local:', firebaseError);
        }
      }
    }
    
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
 * IMPORTANTE: Cada código solo se puede usar UNA VEZ, por UN SOLO USUARIO (cuenta Firebase) y para UN SOLO NIVEL
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
    const currentUserId = getCurrentUserId();
    const now = new Date();
    
    if (!currentUserId) {
      throw new Error('Debes iniciar sesión para usar un código de acceso');
    }
    
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
          const storedUserId = data.userId || data.usedBy?.userId;
          
          // Verificar usuario
          if (storedUserId && storedUserId !== currentUserId) {
            throw new Error('Este código de acceso ya ha sido utilizado por otro usuario');
          }
          
          // Verificar nivel - si ya fue usado para un nivel específico, no permitir otro nivel
          if (usedLevel && usedLevel !== 'ALL' && usedLevel !== level) {
            throw new Error(`Este código ya fue usado para el nivel ${usedLevel}. No se puede usar para ${level}.`);
          }
          
          // Si es el mismo nivel o código ALL, ya está registrado
          if (usedLevel === level || usedLevel === 'ALL' || codeInfo.level === 'ALL') {
            console.log(`✅ Código ${normalizedCode} ya estaba marcado para este usuario y nivel`);
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
          userId: currentUserId, // Guardar userId a nivel de documento
          usedBy: {
            documento: documento || '',
            userId: currentUserId,
            usedAt: serverTimestamp()
          },
          createdAt: serverTimestamp()
        }, { merge: true });
        
        console.log(`✅ Código ${normalizedCode} marcado como usado en Firebase para nivel ${levelToStore} por usuario ${currentUserId}`);
        
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
      userId: currentUserId,
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
        userId: currentUserId,
        usedBy: {
          documento: documento || '',
          userId: currentUserId,
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

export async function seedValidAccessCodesToFirestore(): Promise<void> {
  if (!firestore) {
    throw new Error('Firestore no está disponible');
  }
  const batchSize = 400;
  let batch = writeBatch(firestore);
  let opCount = 0;
  let total = 0;

  for (const codeInfo of VALID_ACCESS_CODES) {
    const codeDocRef = doc(firestore, FIRESTORE_VALID_CODES_COLLECTION, codeInfo.code);
    batch.set(codeDocRef, {
      code: codeInfo.code,
      level: codeInfo.level,
      active: true,
      createdAt: serverTimestamp()
    }, { merge: true });
    opCount += 1;
    total += 1;

    if (opCount >= batchSize) {
      await batch.commit();
      batch = writeBatch(firestore);
      opCount = 0;
    }
  }

  if (opCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Códigos válidos enviados a Firebase: ${total}`);
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
      const parsed = JSON.parse(stored) as string[];
      const merged = Array.from(new Set([...(parsed || []), ...VALID_FORMACION_CODES]));
      if (merged.length !== parsed.length) {
        await AsyncStorage.setItem('formacion_codes_valid', JSON.stringify(merged));
      }
      return merged;
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
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      return {
        valid: false,
        message: 'Por favor, introduce un código de acceso'
      };
    }

    const validCodes = await getValidFormacionCodes();

    if (!validCodes.includes(normalizedCode)) {
      return {
        valid: false,
        message: 'El código de acceso no es válido'
      };
    }

    const currentUserId = getCurrentUserId();
    
    if (!currentUserId) {
      return {
        valid: false,
        message: 'Debes iniciar sesión para usar un código de acceso'
      };
    }

    const codeInfo = await getCodeUsageInfo(normalizedCode);
    
    if (codeInfo) {
      if (codeInfo.userId === currentUserId) {
        return {
          valid: true,
          message: 'Código válido'
        };
      } else {
        return {
          valid: false,
          message: 'Este código de acceso ya ha sido utilizado por otro usuario'
        };
      }
    }

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
  try {
    const normalizedCode = code.trim().toUpperCase();
    const currentUserId = getCurrentUserId();
    const now = new Date();

    if (!currentUserId) {
      throw new Error('Debes iniciar sesión para usar un código de acceso');
    }

    const validCodes = await getValidFormacionCodes();
    if (!validCodes.includes(normalizedCode)) {
      throw new Error('Código no válido');
    }

    if (firestore) {
      try {
        const codeDocRef = doc(firestore, FIRESTORE_COLLECTION, normalizedCode);
        const codeDoc = await getDoc(codeDocRef);

        if (codeDoc.exists()) {
          const data = codeDoc.data();
          const storedUserId = data.userId || data.usedBy?.userId;

          if (storedUserId && storedUserId !== currentUserId) {
            throw new Error('Este código de acceso ya ha sido utilizado por otro usuario');
          }

          if (data.used === true || data.usedBy) {
            console.log(`✅ Código ${normalizedCode} ya estaba marcado para este usuario`);
            return;
          }
        }

        await setDoc(codeDocRef, {
          code: normalizedCode,
          level: 'FORMACION',
          usedLevel: 'FORMACION',
          used: true,
          userId: currentUserId,
          usedBy: {
            documento: documento || '',
            userId: currentUserId,
            usedAt: serverTimestamp(),
          },
          createdAt: serverTimestamp(),
        }, { merge: true });

        console.log(`✅ Código ${normalizedCode} marcado como usado en Firebase para formación/preformación`);
      } catch (firebaseError: any) {
        if (firebaseError.code === 'permission-denied') {
          throw new Error('No tienes permisos para marcar este código como usado');
        }

        if (firebaseError.message) {
          throw firebaseError;
        }

        console.error('Error guardando código en Firebase:', firebaseError);
        throw new Error('Error al guardar el código en el servidor. Por favor, inténtalo de nuevo.');
      }
    }

    try {
      const usedCodes = await getUsedAccessCodes();
      usedCodes[normalizedCode] = JSON.stringify({
        code: normalizedCode,
        level: 'FORMACION',
        usedLevel: 'FORMACION',
        used: true,
        userId: currentUserId,
        usedBy: {
          documento: documento || '',
          userId: currentUserId,
          usedAt: now.toISOString(),
        },
      });

      await AsyncStorage.setItem(USED_CODES_KEY, JSON.stringify(usedCodes));
      console.log(`✅ Código ${normalizedCode} guardado en caché local para formación/preformación`);
    } catch (storageError) {
      console.warn('Error guardando en AsyncStorage (no crítico):', storageError);
    }
  } catch (error) {
    console.error('Error marcando código de formación:', error);
    throw error;
  }
}
