export const STRIPE_EXAMEN_NACIONALIDAD = {
  API_URL: 'https://academia-backend-s9np.onrender.com',
  RETURN_URL: 'academiadeinmigrantes://stripe-redirect',
  BASE_PRICE: 20, // Precio base sin IVA
  // IVA en España (21%)
  IVA_RATE: 0.21,
} as const;

// Calcular IVA
export const calculateIVA = (price: number): number => {
  return price * STRIPE_EXAMEN_NACIONALIDAD.IVA_RATE;
};

// Obtener precio con IVA incluido
export const getExamenNacionalidadPriceWithIVA = (): number => {
  const basePrice = STRIPE_EXAMEN_NACIONALIDAD.BASE_PRICE;
  const iva = calculateIVA(basePrice);
  return basePrice + iva;
};

// Obtener precio total (base + IVA) redondeado a 2 decimales
export const getExamenNacionalidadTotalPrice = (): number => {
  return Math.round(getExamenNacionalidadPriceWithIVA() * 100) / 100;
};

