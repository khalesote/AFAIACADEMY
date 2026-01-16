import {
  CECABANK_CONFIG,
  CECABANK_PRICES,
  CecabankPaymentData,
  CecabankOperationType,
} from '../config/cecabank';

/**
 * Genera un ID de operación único para Cecabank
 * Debe ser exactamente 12 dígitos numéricos.
 */
export const generateOrderId = (operationType: CecabankOperationType): string => {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const orderId = (timestamp + randomSuffix).slice(-12);

  console.log('🔢 Order ID generado:', {
    operationType,
    orderId,
    length: orderId.length,
    esNumerico: /^\d+$/.test(orderId),
  });

  return orderId;
};

/**
 * Formatea el importe para Cecabank (12 dígitos con ceros a la izquierda).
 */
export const formatAmount = (amount: number): string => {
  const centimos = Math.round(amount * 100);
  return centimos.toString().padStart(12, '0');
};

/**
 * Obtiene la fecha y hora actual en formato Cecabank.
 */
export const getCecabankDateTime = (): { fecha: string; hora: string } => {
  const now = new Date();
  const fecha =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0');
  const hora =
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0');

  return { fecha, hora };
};

/**
 * La firma real se calcula en el backend.
 * El frontend envía un placeholder.
 */
export const generateSignature = (): string => 'PLACEHOLDER_FRONTEND';

/**
 * Obtiene el precio según el tipo de operación.
 */
export const getPriceByOperationType = (operationType: CecabankOperationType): number => {
  const priceMap = {
    'matricula-a1': CECABANK_PRICES.MATRICULA_A1,
    'matricula-a2': CECABANK_PRICES.MATRICULA_A2,
    'matricula-b1': CECABANK_PRICES.MATRICULA_B1,
    'matricula-b2': CECABANK_PRICES.MATRICULA_B2,
    'matricula-a1a2': CECABANK_PRICES.MATRICULA_A1A2,
    'matricula-b1b2': CECABANK_PRICES.MATRICULA_B1B2,
    'formacion-profesional': CECABANK_PRICES.FORMACION_PROFESIONAL,
  };

  const price = priceMap[operationType] || 0;
  console.log('💰 Precio para', operationType, ':', price);
  return price;
};

/**
 * Crea los datos del formulario de pago para Cecabank.
 * Este helper es solo informativo; la firma se recalcula en el backend.
 */
export const createCecabankPaymentForm = (paymentData: CecabankPaymentData) => {
  const { fecha, hora } = getCecabankDateTime();
  const importe = formatAmount(paymentData.amount);
  const numOperacion = paymentData.orderId || generateOrderId('matricula-a1' as CecabankOperationType);
  const firma = generateSignature();

  const formData = {
    MerchantID: CECABANK_CONFIG.merchantId,
    AcquirerBIN: CECABANK_CONFIG.acquirerBin,
    TerminalID: CECABANK_CONFIG.terminalId,
    Num_operacion: numOperacion,
    Importe: importe,
    TipoMoneda: CECABANK_CONFIG.tipoMoneda,
    Exponente: '2',
    Cifrado: 'HMAC_SHA256',
    URL_OK: CECABANK_CONFIG.urlOk,
    URL_KO: CECABANK_CONFIG.urlKo,
    Idioma: CECABANK_CONFIG.idioma,
    Descripcion: paymentData.description || 'Pago Academia de Inmigrantes',
    FechaOperacion: fecha,
    HoraOperacion: hora,
    Firma: firma,
    ...(paymentData.customerEmail && { Email: paymentData.customerEmail }),
    ...(paymentData.customerName && { Nombre: paymentData.customerName }),
  };

  return { formData, orderId: numOperacion };
};
