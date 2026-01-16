export const STRIPE_MATRICULAS = {
  API_URL: 'https://academia-backend-s9np.onrender.com',
  RETURN_URL: 'academiadeinmigrantes://stripe-redirect',
  PRICES: {
    A1: 18,
    A2: 24,
    B1: 30,
    B2: 40,
    A1A2: 30,
    B1B2: 60,
  },
} as const;

export type MatriculaLevel = keyof typeof STRIPE_MATRICULAS.PRICES;

export const getMatriculaPrice = (level: MatriculaLevel): number => STRIPE_MATRICULAS.PRICES[level];
