import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';

/**
 * Lista de todas las claves de AsyncStorage que deben limpiarse
 * para empezar desde cero en desarrollo
 */
const STORAGE_KEYS_TO_CLEAR = [
  // Claves de Firebase Auth (importante limpiarlas primero)
  'firebase:authUser',
  'firebase:host:academia-inmigrantes-movil.firebaseapp.com',
  'firebase:authUser:academia-inmigrantes-movil.firebaseapp.com',
  '@firebase/auth',
  'FirebaseAuthUser',
  'FirebaseAuthUser:academia-inmigrantes-movil.firebaseapp.com',
  
  // Datos de usuario y autenticación
  '@profile_image',
  'temp_matricula_data',
  'user_reference_current',
  
  // Datos de matrícula
  'matricula_A1_completada',
  'matricula_A2_completada',
  'matricula_B1_completada',
  'matricula_B2_completada',
  'matricula_A1A2_completada',
  'matricula_B1B2_completada',
  'unlockedLevels',
  
  // Progreso del usuario
  'userProgress_v2',
  
  // Acceso a cursos
  '@acceso_formacion_profesional',
  '@acceso_examen_nacionalidad',
  '@profesional_training_access',
  
  // Progreso de unidades (legacy)
  'A1_unidadesCompletadas',
  'A2_unidadesCompletadas',
  'B1_unidadesCompletadas',
  'B2_unidadesCompletadas',
  'userProgress',
  
  // Progreso de unidades por nivel
  'unitProgress_A1',
  'unitProgress_A2',
  'unitProgress_B1',
  'unitProgress_B2',
  
  // Datos de acceso y códigos
  'device_id',
  'ACCESS_CODES_KEY',
  'USED_CODES_KEY',
  'formacion_codes_valid',
  'examen_nacionalidad_codes_valid',
  
  // Referencias
  'app_reference_oepm',
  'app_reference_oepm_generated_at',
  
  // Datos de agenda
  'user_agenda',
  
  // Datos de diplomas
  'nombreParticipante',
  'apellido1Participante',
  'apellido2Participante',
  'apellidoParticipante',
  'documentoParticipante',
  
  // Progreso de clases completadas
  'A1_ExpresionEscrita_Completed',
  'A1_Letreros_Completed',
  'A1_Formularios_Completed',
  'A1_oral_progress',
  'A1_oral_gate_passed',
  'A2_MenusHorarios_Completed',
  'A2_Anuncios_Completed',
  
  // Datos de instalación
  'installation_timestamp',
  'installation_verified',
  
  // Acceso a cursos individuales (pueden tener formato @curso_${curso.key}_access)
  // Estos se limpiarán con un patrón
];

export async function clearUserLocalData(): Promise<{ success: boolean; error?: string }> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();

    // Claves de cursos individuales (pueden tener formato @curso_${curso.key}_access)
    const cursoKeys = allKeys.filter((key) => key.startsWith('@curso_') && key.endsWith('_access'));

    // Evitar borrar claves de Firebase Auth (sesión)
    const firebaseAuthKeys = allKeys.filter((key) =>
      key.includes('firebase') ||
      key.includes('FirebaseAuth') ||
      key.includes('@firebase')
    );

    const keysToRemoveBase = [...STORAGE_KEYS_TO_CLEAR, ...cursoKeys];
    const keysToRemove = keysToRemoveBase
      .filter((key) => !firebaseAuthKeys.includes(key))
      .filter((key) => key !== 'firebase:authUser');

    if (keysToRemove.length > 0) {
      await AsyncStorage.multiRemove(keysToRemove);
    }

    return { success: true };
  } catch (error: any) {
    console.error('❌ Error limpiando datos locales de usuario:', error);
    return { success: false, error: error?.message || 'Error desconocido' };
  }
}

/**
 * Limpia todos los datos de desarrollo (AsyncStorage + sesión de Firebase)
 * Útil para empezar desde cero después de recompilar
 */
export async function clearAllDevelopmentData(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🧹 Iniciando limpieza de datos de desarrollo...');
    
    // 1. PRIMERO: Limpiar las claves de Firebase Auth en AsyncStorage
    // Esto es crítico porque Firebase Auth restaura la sesión automáticamente
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const firebaseAuthKeys = allKeys.filter(key => 
        key.includes('firebase') || 
        key.includes('FirebaseAuth') ||
        key.includes('@firebase')
      );
      
      if (firebaseAuthKeys.length > 0) {
        console.log(`🔐 Eliminando ${firebaseAuthKeys.length} claves de Firebase Auth...`);
        await AsyncStorage.multiRemove(firebaseAuthKeys);
        console.log('✅ Claves de Firebase Auth eliminadas');
      }
    } catch (keysError: any) {
      console.warn('⚠️ Error al limpiar claves de Firebase Auth:', keysError.message);
    }
    
    // 2. Cerrar sesión de Firebase (si existe)
    try {
      if (auth && auth.currentUser) {
        console.log('🔐 Cerrando sesión de Firebase...');
        await auth.signOut();
        console.log('✅ Sesión de Firebase cerrada');
      } else {
        console.log('ℹ️ No hay sesión de Firebase activa');
      }
    } catch (authError: any) {
      console.warn('⚠️ Error al cerrar sesión de Firebase:', authError.message);
      // Continuar con la limpieza aunque falle el cierre de sesión
    }
    
    // 3. Obtener todas las claves de AsyncStorage (después de limpiar Firebase Auth)
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(`📋 Total de claves en AsyncStorage: ${allKeys.length}`);
    
    // 4. Filtrar claves relacionadas con cursos individuales
    const cursoKeys = allKeys.filter(key => key.startsWith('@curso_') && key.endsWith('_access'));
    const keysToRemove = [...STORAGE_KEYS_TO_CLEAR, ...cursoKeys];
    
    // 5. También buscar otras claves que puedan contener datos de usuario
    // (búsqueda más agresiva para desarrollo)
    const additionalKeys = allKeys.filter(key => {
      // Incluir claves que no están en nuestra lista pero pueden ser relevantes
      return !keysToRemove.includes(key) && (
        key.includes('user') ||
        key.includes('matricula') ||
        key.includes('progress') ||
        key.includes('acceso') ||
        key.includes('profile') ||
        key.includes('agenda')
      );
    });
    
    const allKeysToRemove = [...new Set([...keysToRemove, ...additionalKeys])];
    
    // 6. Eliminar todas las claves
    if (allKeysToRemove.length > 0) {
      console.log(`🗑️ Eliminando ${allKeysToRemove.length} claves de AsyncStorage...`);
      await AsyncStorage.multiRemove(allKeysToRemove);
      console.log('✅ Claves eliminadas de AsyncStorage');
    } else {
      console.log('ℹ️ No hay claves para eliminar');
    }
    
    // 7. En desarrollo, NO limpiar TODO AsyncStorage para evitar perder sesiones de Firebase
    // Comentar esta línea para mantener persistencia en desarrollo
    // if (__DEV__) {
    //   console.log('🧹 [DEV] Limpiando TODO AsyncStorage para desarrollo...');
    //   await AsyncStorage.clear();
    //   console.log('✅ [DEV] AsyncStorage completamente limpiado');
    // }
    
    console.log('✅ Limpieza de datos de desarrollo completada');
    return { success: true };
    
  } catch (error: any) {
    console.error('❌ Error durante la limpieza de datos:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
}

/**
 * Limpia solo la sesión de Firebase (más rápido)
 */
export async function clearFirebaseSession(): Promise<{ success: boolean; error?: string }> {
  try {
    if (auth?.currentUser) {
      await auth?.signOut();
      console.log('✅ Sesión de Firebase cerrada');
      return { success: true };
    } else {
      console.log('ℹ️ No hay sesión activa para cerrar');
      return { success: true };
    }
  } catch (error: any) {
    console.error('❌ Error al cerrar sesión:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
}

