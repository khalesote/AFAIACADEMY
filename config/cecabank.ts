/**
 * Configuración Cecabank (TPV virtual)
 * NOTA: Valores sensibles se configuran vía variables de entorno.
 */

export const CECABANK_CONFIG = {
  // Backend en Render
  apiUrl: process.env.EXPO_PUBLIC_CECABANK_API_URL || 'https://academia-backend-s9np.onrender.com',

  // URLs OK/KO (configuradas en el backend)
  urlOk: process.env.EXPO_PUBLIC_CECABANK_SUCCESS_URL || '',
  urlKo: process.env.EXPO_PUBLIC_CECABANK_ERROR_URL || '',

  // Datos de comercio (solo lectura en frontend)
  merchantId: process.env.EXPO_PUBLIC_CECABANK_MERCHANT_ID || '',
  acquirerBin: process.env.EXPO_PUBLIC_CECABANK_ACQUIRER_BIN || '',
  terminalId: process.env.EXPO_PUBLIC_CECABANK_TERMINAL_ID || '',

  // Configuración general
  tipoMoneda: '978', // EUR
  idioma: '1', // Español
  entorno: process.env.EXPO_PUBLIC_CECABANK_ENTORNO || 'produccion',
} as const;

export const CECABANK_PRICES = {
  MATRICULA_A1: 36,
  MATRICULA_A2: 48,
  MATRICULA_B1: 60,
  MATRICULA_B2: 80,
  MATRICULA_A1A2: 60,
  MATRICULA_B1B2: 120,
  FORMACION_PROFESIONAL: 10,
} as const;

export type CecabankOperationType =
  | 'matricula-a1'
  | 'matricula-a2'
  | 'matricula-b1'
  | 'matricula-b2'
  | 'matricula-a1a2'
  | 'matricula-b1b2'
  | 'formacion-profesional';

export interface CecabankPaymentData {
  amount: number;
  orderId?: string;
  description?: string;
  customerEmail?: string;
  customerName?: string;
}

export const validateCecabankConfig = () => {
  const errors: string[] = [];

  if (!CECABANK_CONFIG.merchantId) errors.push('CECABANK_MERCHANT_ID no está configurado');
  if (!CECABANK_CONFIG.acquirerBin) errors.push('CECABANK_ACQUIRER_BIN no está configurado');
  if (!CECABANK_CONFIG.terminalId) errors.push('CECABANK_TERMINAL_ID no está configurado');
  if (!CECABANK_CONFIG.urlOk) errors.push('CECABANK_SUCCESS_URL no está configurado');
  if (!CECABANK_CONFIG.urlKo) errors.push('CECABANK_ERROR_URL no está configurado');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default CECABANK_CONFIG;
