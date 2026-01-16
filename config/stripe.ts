// Stripe configuration for the Academy app
// In a production app, these should come from environment variables

const BASE_STRIPE_CONFIG = {
  PUBLISHABLE_KEY: 'pk_live_51SECbuATPcVqOL4zeD5sgJxtvmuTRSgnGSuqwyi5xcc3zxdVVfHP0LNPD4uJByJFc5p8yGtUzyK3rjP8xZhaMAmc002yORQIWX',
  MERCHANT_ID: 'merchant.com.academiadeinmigrantes',
} as const;

export const STRIPE_CONFIG = BASE_STRIPE_CONFIG;

// Payment interfaces
export interface PaymentInfo {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
  level: string;
  userId: string;
  timestamp: string;
}

// Helper function to get Stripe configuration for different environments
export const getStripeConfig = () => {
  if (__DEV__) {
    return {
      publishableKey: STRIPE_CONFIG.PUBLISHABLE_KEY,
      merchantIdentifier: STRIPE_CONFIG.MERCHANT_ID,
      // Enable debug mode in development
      debug: true,
    };
  }

  return {
    publishableKey: STRIPE_CONFIG.PUBLISHABLE_KEY,
    merchantIdentifier: STRIPE_CONFIG.MERCHANT_ID,
    // Production settings
    debug: false,
  };
};

// Validate configuration
export const validateStripeConfig = () => {
  const errors: string[] = [];

  if (!STRIPE_CONFIG.PUBLISHABLE_KEY || STRIPE_CONFIG.PUBLISHABLE_KEY.startsWith('pk_test_')) {
    errors.push('STRIPE_PUBLISHABLE_KEY no está configurada correctamente. Usa una clave de producción válida.');
  }

  if (!STRIPE_CONFIG.MERCHANT_ID || STRIPE_CONFIG.MERCHANT_ID === 'merchant.com.academiadeinmigrantes') {
    errors.push('STRIPE_MERCHANT_ID debe ser configurado con tu Merchant ID real de Apple Pay.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
