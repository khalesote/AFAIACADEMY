/**
 * Configuración de Bizum para pagos
 * 
 * IMPORTANTE: Para usar Bizum, necesitas:
 * 1. Contratar el servicio Bizum para empresas con tu banco
 * 2. Obtener credenciales de API de tu banco o pasarela de pago
 * 3. Configurar las variables de entorno necesarias
 * 
 * Bizum se integra típicamente a través de:
 * - Pasarelas de pago que lo soporten (Redsys, Adyen, etc.)
 * - APIs bancarias directas
 * - Algunos TPVs virtuales modernos
 */

export const BIZUM_CONFIG = {
  // URL del backend para procesar pagos Bizum
  API_URL: process.env.EXPO_PUBLIC_BIZUM_API_URL || 'https://academia-backend-s9np.onrender.com',
  
  // URL de retorno después del pago
  RETURN_URL: process.env.EXPO_PUBLIC_BIZUM_RETURN_URL || 'academiadeinmigrantes://bizum-redirect',
  
  // Precios (igual que otros métodos de pago)
  PRICES: {
    A1: 15,
    A2: 15,
    B1: 15,
    B2: 15,
    FORMACION_PROFESIONAL: 10,
  },
  
  // IVA en España (21%)
  IVA_RATE: 0.21,
  
  // Configuración de Bizum (obtener de tu banco o pasarela)
  MERCHANT_ID: process.env.EXPO_PUBLIC_BIZUM_MERCHANT_ID || '',
  API_KEY: process.env.EXPO_PUBLIC_BIZUM_API_KEY || '',
  SECRET_KEY: process.env.EXPO_PUBLIC_BIZUM_SECRET_KEY || '',
  
  // Entorno (sandbox/production)
  ENVIRONMENT: process.env.EXPO_PUBLIC_BIZUM_ENVIRONMENT || 'sandbox',
} as const;

export type BizumLevel = keyof typeof BIZUM_CONFIG.PRICES;

// Obtener precio base (sin IVA)
export const getBizumPrice = (level: BizumLevel): number => {
  return BIZUM_CONFIG.PRICES[level] || 0;
};

// Calcular IVA
export const calculateBizumIVA = (price: number): number => {
  return price * BIZUM_CONFIG.IVA_RATE;
};

// Obtener precio con IVA incluido
export const getBizumPriceWithIVA = (level: BizumLevel): number => {
  const basePrice = getBizumPrice(level);
  const iva = calculateBizumIVA(basePrice);
  return basePrice + iva;
};

// Obtener precio total (base + IVA) redondeado a 2 decimales
export const getBizumTotalPrice = (level: BizumLevel): number => {
  return Math.round(getBizumPriceWithIVA(level) * 100) / 100;
};

// Validar configuración de Bizum
export const validateBizumConfig = () => {
  const errors: string[] = [];
  
  if (!BIZUM_CONFIG.MERCHANT_ID) {
    errors.push('BIZUM_MERCHANT_ID no está configurado');
  }
  
  if (!BIZUM_CONFIG.API_KEY) {
    errors.push('BIZUM_API_KEY no está configurado');
  }
  
  if (!BIZUM_CONFIG.SECRET_KEY) {
    errors.push('BIZUM_SECRET_KEY no está configurado');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Exportar configuración por defecto
export default BIZUM_CONFIG;

























