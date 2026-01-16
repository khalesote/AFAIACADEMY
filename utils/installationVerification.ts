import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import * as StoreReview from 'expo-store-review';

// Claves para almacenar estados
const INSTALLATION_VERIFIED_KEY = 'installation_verified';
const FIRST_LAUNCH_TIME_KEY = 'first_launch_time';
const TRIAL_PERIOD_HOURS = 24; // 24 horas de prueba

// Función para verificar si la app fue instalada desde TikTok
export const verifyInstallation = async (): Promise<boolean> => {
  try {
    // Verificar si ya está verificada
    const verified = await AsyncStorage.getItem(INSTALLATION_VERIFIED_KEY);
    if (verified === 'true') {
      return true;
    }

    // Verificar si es la primera vez que se abre la app
    const firstLaunchTime = await AsyncStorage.getItem(FIRST_LAUNCH_TIME_KEY);
    if (!firstLaunchTime) {
      // Guardar la hora de primer lanzamiento
      await AsyncStorage.setItem(FIRST_LAUNCH_TIME_KEY, Date.now().toString());
      return true; // Permitir uso inicial
    }

    // Calcular tiempo transcurrido
    const launchTime = parseInt(firstLaunchTime);
    const currentTime = Date.now();
    const hoursElapsed = (currentTime - launchTime) / (1000 * 60 * 60);

    // Si han pasado más de 2 horas, mostrar enlace de TikTok
    if (hoursElapsed > TRIAL_PERIOD_HOURS) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verificando instalación:', error);
    return false;
  }
};

// Función para marcar la instalación como verificada
export const markInstallationAsVerified = async () => {
  try {
    await AsyncStorage.setItem(INSTALLATION_VERIFIED_KEY, 'true');
  } catch (error) {
    console.error('Error marcando instalación como verificada:', error);
  }
};

// Función para obtener el tiempo restante de prueba
export const getRemainingTrialTime = async (): Promise<number> => {
  try {
    const firstLaunchTime = await AsyncStorage.getItem(FIRST_LAUNCH_TIME_KEY);
    if (!firstLaunchTime) return TRIAL_PERIOD_HOURS;

    const launchTime = parseInt(firstLaunchTime);
    const currentTime = Date.now();
    const hoursElapsed = (currentTime - launchTime) / (1000 * 60 * 60);
    const remainingHours = Math.max(0, TRIAL_PERIOD_HOURS - hoursElapsed);

    return Math.round(remainingHours);
  } catch (error) {
    console.error('Error obteniendo tiempo restante:', error);
    return 0;
  }
};

// Función para verificar si la app puede ser calificada
export const canRequestReview = async (): Promise<boolean> => {
  try {
    return await StoreReview.hasAction();
  } catch (error) {
    console.error('Error verificando si se puede solicitar calificación:', error);
    return false;
  }
};

// Función para solicitar calificación
export const requestReview = async () => {
  try {
    if (await canRequestReview()) {
      await StoreReview.requestReview();
    }
  } catch (error) {
    console.error('Error solicitando calificación:', error);
  }
}; 