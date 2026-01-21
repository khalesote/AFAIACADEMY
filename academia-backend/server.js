require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const vision = require('@google-cloud/vision');
const Tesseract = require('tesseract.js');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 10000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const FORMACION_PRICE_EUR = parseFloat(process.env.FORMACION_PRICE_EUR || '10');

// Configurar SMTP2GO con nodemailer
let transporter;
if (process.env.SMTP2GO_USERNAME && process.env.SMTP2GO_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
      user: process.env.SMTP2GO_USERNAME,
      pass: process.env.SMTP2GO_PASSWORD,
    },
  });
  console.log('✅ Credenciales de SMTP2GO configuradas');
} else {
  console.log('⚠️ Credenciales de SMTP2GO no configuradas');
}

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Google Vision + Firebase Admin setup
let visionClient = null;
let firestore = null;
let storageBucket = null;

const getServiceAccount = () => {
  const raw = process.env.VISION_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('❌ JSON de servicio inválido:', error);
    return null;
  }
};

const initGoogleClients = () => {
  if (visionClient) {
    return;
  }
  const serviceAccount = getServiceAccount();
  if (!serviceAccount) {
    console.warn('⚠️ VISION_SERVICE_ACCOUNT_JSON no configurado');
    return;
  }

  visionClient = new vision.ImageAnnotatorClient({
    credentials: {
      client_email: serviceAccount.client_email,
      private_key: serviceAccount.private_key,
    },
    projectId: serviceAccount.project_id,
  });

  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!admin.apps.length) {
    const firebaseOptions = {
      credential: admin.credential.cert(serviceAccount),
    };
    if (bucketName) {
      firebaseOptions.storageBucket = bucketName;
    } else {
      console.warn('⚠️ FIREBASE_STORAGE_BUCKET no configurado, se omite subida de imágenes.');
    }
    admin.initializeApp(firebaseOptions);
  }
  firestore = admin.firestore();
  storageBucket = bucketName ? admin.storage().bucket(bucketName) : null;
};

const normalizeText = (text = '') => text
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9ñáéíóúü\s]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const isSupportedImageBuffer = (buffer) => {
  if (!buffer || buffer.length < 8) {
    return false;
  }
  const isPng = buffer[0] === 0x89
    && buffer[1] === 0x50
    && buffer[2] === 0x4e
    && buffer[3] === 0x47;
  const isJpeg = buffer[0] === 0xff
    && buffer[1] === 0xd8
    && buffer[2] === 0xff;
  return isPng || isJpeg;
};

// Middleware de logging para todas las peticiones
app.use((req, res, next) => {
  console.log('📥 Petición recibida:', {
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
    headers: {
      'content-type': req.get('content-type'),
      'user-agent': req.get('user-agent')
    }
  });
  next();
});

// ============================================
// ENDPOINTS CECABANK (TPV VIRTUAL)
// ============================================

app.get('/api/cecabank/ok', (req, res) => {
  try {
    console.log('✅ Cecabank OK recibido (GET)');
    const Num_operacion = req.query.Num_operacion || req.query.num_operacion || '';
    const Importe = req.query.Importe || req.query.importe || '';
    const Descripcion = req.query.Descripcion || req.query.descripcion || '';
    
    // Detectar el nivel desde la descripción
    let levelUnlocked = null;
    const descripcionLower = (Descripcion || '').toLowerCase();
    if (descripcionLower.includes('a1') || descripcionLower.includes('nivel a1')) {
      levelUnlocked = 'A1';
    } else if (descripcionLower.includes('a2') || descripcionLower.includes('nivel a2')) {
      levelUnlocked = 'A2';
    } else if (descripcionLower.includes('b1') || descripcionLower.includes('nivel b1')) {
      levelUnlocked = 'B1';
    } else if (descripcionLower.includes('b2') || descripcionLower.includes('nivel b2')) {
      levelUnlocked = 'B2';
    }
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pago Confirmado</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding: 40px;">
        <div style="font-size:48px;">✅</div>
        <h1>Pago Confirmado</h1>
        <p>Tu pago ha sido procesado correctamente. Puedes cerrar esta ventana y volver a la aplicación.</p>
        <script>
          try {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'PAYMENT_SUCCESS',
                orderId: '${Num_operacion}',
                levelUnlocked: '${levelUnlocked || ''}',
                importe: '${Importe}'
              }));
            }
          } catch (e) {
            console.error('Error enviando mensaje:', e);
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Error en Cecabank OK (GET):', error);
    res.status(500).send('Error procesando pago');
  }
});

app.post('/api/cecabank/ok', express.urlencoded({ extended: true }), (req, res) => {
  try {
    console.log('✅ Cecabank OK recibido');
    const Num_operacion = req.body.Num_operacion || req.body.num_operacion || '';
    const Importe = req.body.Importe || req.body.importe || '';
    const Descripcion = req.body.Descripcion || req.body.descripcion || '';
    
    // Detectar el nivel desde la descripción
    let levelUnlocked = null;
    const descripcionLower = (Descripcion || '').toLowerCase();
    if (descripcionLower.includes('a1') || descripcionLower.includes('nivel a1')) {
      levelUnlocked = 'A1';
    } else if (descripcionLower.includes('a2') || descripcionLower.includes('nivel a2')) {
      levelUnlocked = 'A2';
    } else if (descripcionLower.includes('b1') || descripcionLower.includes('nivel b1')) {
      levelUnlocked = 'B1';
    } else if (descripcionLower.includes('b2') || descripcionLower.includes('nivel b2')) {
      levelUnlocked = 'B2';
    }
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pago Exitoso</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding: 40px;">
        <div style="font-size:48px;">✅</div>
        <h1>Pago Procesado Correctamente</h1>
        <p>Puedes cerrar esta ventana y volver a la aplicación.</p>
        <script>
          try {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'PAYMENT_SUCCESS',
                orderId: '${Num_operacion}',
                levelUnlocked: '${levelUnlocked || ''}',
                importe: '${Importe}'
              }));
            }
          } catch (e) {
            console.error('Error enviando mensaje:', e);
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Error en Cecabank OK:', error);
    res.status(500).send('Error procesando pago');
  }
});

app.get('/api/cecabank/ko', (req, res) => {
  try {
    console.log('❌ Cecabank KO recibido (GET)');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>Pago Fallido</title></head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding: 40px;">
        <div style="font-size:48px;">❌</div>
        <h1>Pago No Procesado</h1>
        <p>Puedes cerrar esta ventana y volver a la aplicación.</p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Error en Cecabank KO (GET):', error);
    res.status(500).send('Error procesando pago');
  }
});

app.post('/api/cecabank/ko', express.urlencoded({ extended: true }), (req, res) => {
  try {
    console.log('❌ Cecabank KO recibido');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>Pago Fallido</title></head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding: 40px;">
        <div style="font-size:48px;">❌</div>
        <h1>Pago No Procesado</h1>
        <p>Puedes cerrar esta ventana y volver a la aplicación.</p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Error en Cecabank KO:', error);
    res.status(500).send('Error procesando pago');
  }
});

app.get('/api/cecabank/status', (req, res) => {
  const merchantId = process.env.CECABANK_MERCHANT_ID || '';
  const acquirerBin = process.env.CECABANK_ACQUIRER_BIN || '';
  const terminalId = process.env.CECABANK_TERMINAL_ID || '';
  const clave = process.env.CECABANK_CLAVE || '';
  const entorno = process.env.CECABANK_ENTORNO || '';
  res.json({
    ok: true,
    vars: {
      merchantId: !!merchantId,
      acquirerBin: !!acquirerBin,
      terminalId: !!terminalId,
      clave: !!clave,
      entorno: entorno || 'produccion',
      claveLength: clave.length,
      claveInicio: clave ? `${clave.substring(0, 4)}...` : '',
    },
  });
});

app.post('/api/cecabank/redirect', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const formData = req.body || {};
    console.log('📥 Cecabank redirect body recibido:', Object.keys(formData));

    const requiredVars = [
      'CECABANK_MERCHANT_ID',
      'CECABANK_ACQUIRER_BIN',
      'CECABANK_TERMINAL_ID',
      'CECABANK_CLAVE',
    ];
    const missingVars = requiredVars.filter((v) => !process.env[v]);
    if (missingVars.length) {
      console.error('❌ Cecabank vars faltantes:', missingVars);
      return res.status(500).send(`Faltan variables Cecabank: ${missingVars.join(', ')}`);
    }

    const requiredFields = [
      'MerchantID', 'AcquirerBIN', 'TerminalID', 'Num_operacion',
      'Importe', 'TipoMoneda', 'Exponente', 'Cifrado',
      'URL_OK', 'Pago_soportado'
    ];
    const missingFields = requiredFields.filter((f) => !formData[f]);
    if (missingFields.length) {
      console.error('❌ Campos faltantes en formulario:', missingFields);
      return res.status(400).send(`Campos faltantes: ${missingFields.join(', ')}`);
    }

    let urlNok = formData.URL_NOK || formData.URL_KO;
    if (!urlNok) {
      console.error('❌ Falta URL_NOK/URL_KO en formulario');
      return res.status(400).send('Campos faltantes: URL_NOK');
    }
    if (process.env.CECABANK_ONLY_URL_OK === 'true') {
      urlNok = formData.URL_OK;
    }

    const importeFirma = String(formData.Importe || '').trim();
    const referencia = String(formData.Num_operacion || '').trim();

    if (!formData.Cifrado || formData.Cifrado === 'HMAC_SHA256' || formData.Cifrado === 'SHA256' || formData.Cifrado === 'HMAC') {
      formData.Cifrado = 'SHA2';
    }

    console.log('🧾 Cecabank datos firma:', {
      numOperacion: String(formData.Num_operacion || '').trim(),
      importe: importeFirma,
      urlOkLength: String(formData.URL_OK || '').length,
      urlKoLength: String(formData.URL_KO || '').length,
      referencia,
    });

    const merchantIdForm = String(formData.MerchantID || '').trim();
    const acquirerBinForm = String(formData.AcquirerBIN || '').trim();
    const terminalIdForm = String(formData.TerminalID || '').trim();
    const merchantIdEnv = String(process.env.CECABANK_MERCHANT_ID || '').trim();
    const acquirerBinEnv = String(process.env.CECABANK_ACQUIRER_BIN || '').trim();
    const terminalIdEnv = String(process.env.CECABANK_TERMINAL_ID || '').trim();

    if (merchantIdEnv && merchantIdForm && merchantIdEnv !== merchantIdForm) {
      console.warn('⚠️ MerchantID difiere entre frontend y backend');
    }
    if (acquirerBinEnv && acquirerBinForm && acquirerBinEnv !== acquirerBinForm) {
      console.warn('⚠️ AcquirerBIN difiere entre frontend y backend');
    }
    if (terminalIdEnv && terminalIdForm && terminalIdEnv !== terminalIdForm) {
      console.warn('⚠️ TerminalID difiere entre frontend y backend');
    }

    const merchantId = String(merchantIdForm || merchantIdEnv).padStart(9, '0');
    const acquirerBin = String(acquirerBinForm || acquirerBinEnv).padStart(10, '0');
    const terminalId = String(terminalIdForm || terminalIdEnv).padStart(8, '0');

    console.log('🧾 Cecabank firma inputs:', {
      merchantId,
      acquirerBin,
      terminalId,
      numOperacion: formData.Num_operacion,
      importe: importeFirma,
      tipoMoneda: formData.TipoMoneda,
      exponente: formData.Exponente,
      cifrado: formData.Cifrado,
      urlOk: formData.URL_OK,
      urlNok: urlNok,
    });

    const firma = generateCecabankSignature(
      formData.Num_operacion,
      importeFirma,
      formData.URL_OK,
      urlNok,
      merchantId,
      acquirerBin,
      terminalId,
      formData.Cifrado
    );

    formData.MerchantID = merchantId;
    formData.AcquirerBIN = acquirerBin;
    formData.TerminalID = terminalId;
    formData.Firma = firma;
    formData.Referencia = referencia;
    formData.URL_NOK = urlNok;
    if (process.env.CECABANK_ONLY_URL_OK === 'true') {
      formData.URL_KO = urlNok;
    }

    const urlCecabank = getCecabankGatewayUrl();
    const ordenCampos = [
      'MerchantID',
      'AcquirerBIN',
      'TerminalID',
      'Num_operacion',
      'Importe',
      'TipoMoneda',
      'Exponente',
      'Referencia',
      'Cifrado',
      'Firma',
      'URL_OK',
      'URL_NOK',
      'Idioma',
      'Descripcion',
      'Email',
      'Nombre',
      'Pago_soportado',
    ];

    const formFields = ordenCampos
      .filter((campo) => formData[campo] !== undefined)
      .map((campo) => {
        const fieldName = campo;
        const value = String(formData[campo] || '');
        const escapedKey = String(fieldName)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
        const escapedValue = value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
        return `            <input type="hidden" name="${escapedKey}" value="${escapedValue}" />`;
      })
      .join('\n');

    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Redirigiendo a Cecabank...</title>
    <style>
      body { font-family: Arial, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:#f5f5f5; }
      .container { text-align:center; padding:20px; }
      .spinner { border:4px solid #f3f3f3; border-top:4px solid #4CAF50; border-radius:50%; width:40px; height:40px; animation: spin 1s linear infinite; margin:20px auto; }
      @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Redirigiendo al TPV de Cecabank...</h2>
      <div class="spinner"></div>
      <p>Por favor, espera mientras se procesa tu pago.</p>
    </div>
    <form id="cecabankForm" method="POST" action="${urlCecabank}" enctype="application/x-www-form-urlencoded" style="display:none;">
${formFields}
    </form>
    <script>
      (function(){
        function submitForm(){ try { const f = document.getElementById('cecabankForm'); if (f) { f.submit(); } } catch(e) {} }
        if (document.readyState === 'complete' || document.readyState === 'interactive') submitForm();
        else document.addEventListener('DOMContentLoaded', submitForm);
        setTimeout(submitForm, 100);
      })();
    </script>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('❌ Error en Cecabank redirect:', error);
    res.status(500).send(`Error calcular firma: ${error.message || 'desconocido'}`);
  }
});

// Endpoint limpio Cecabank (firma según módulo Prestashop)
app.post('/api/cecabank/redirect-clean', express.urlencoded({ extended: true }), (req, res) => {
  try {
    const formData = req.body || {};
    console.log('🧼 Cecabank CLEAN body recibido:', Object.keys(formData));

    const requiredVars = [
      'CECABANK_MERCHANT_ID',
      'CECABANK_ACQUIRER_BIN',
      'CECABANK_TERMINAL_ID',
      'CECABANK_CLAVE',
    ];
    const missingVars = requiredVars.filter((v) => !process.env[v]);
    if (missingVars.length) {
      return res.status(500).send(`Faltan variables Cecabank: ${missingVars.join(', ')}`);
    }

    const requiredFields = [
      'MerchantID', 'AcquirerBIN', 'TerminalID', 'Num_operacion',
      'Importe', 'TipoMoneda', 'Exponente', 'Cifrado',
      'URL_OK', 'Pago_soportado'
    ];
    const missingFields = requiredFields.filter((f) => !formData[f]);
    if (missingFields.length) {
      return res.status(400).send(`Campos faltantes: ${missingFields.join(', ')}`);
    }

    const urlOk = String(formData.URL_OK || '').trim();
    let urlNok = String(formData.URL_NOK || formData.URL_KO || '').trim();
    if (!urlNok) {
      urlNok = urlOk;
      console.log('ℹ️ URL_NOK no enviada; usando URL_OK para firma.');
    }

    const merchantId = String(formData.MerchantID || process.env.CECABANK_MERCHANT_ID || '').padStart(9, '0');
    const acquirerBin = String(formData.AcquirerBIN || process.env.CECABANK_ACQUIRER_BIN || '').padStart(10, '0');
    const terminalId = String(formData.TerminalID || process.env.CECABANK_TERMINAL_ID || '').padStart(8, '0');
    const numOperacion = String(formData.Num_operacion || '').trim();
    const importe = String(formData.Importe || '').trim();
    const tipoMoneda = String(formData.TipoMoneda || '978').trim();
    const exponente = String(formData.Exponente || '2').trim();
    const cifrado = String(formData.Cifrado || 'SHA2').trim();

    if (cifrado !== 'SHA2') {
      return res.status(400).send('Cifrado inválido. Debe ser SHA2.');
    }

    const clave = String(process.env.CECABANK_CLAVE || '').trim();
    const cadenaBase =
      merchantId +
      acquirerBin +
      terminalId +
      numOperacion +
      importe +
      tipoMoneda +
      exponente +
      cifrado +
      urlOk +
      urlNok;
    console.log('🔐 Cecabank CLEAN cadena firma (sin clave):', cadenaBase);
    const cadenaFirma = clave + cadenaBase;
    const firma = crypto.createHash('sha256').update(cadenaFirma, 'utf8').digest('hex').toLowerCase();

    const formClean = {
      ...formData,
      MerchantID: merchantId,
      AcquirerBIN: acquirerBin,
      TerminalID: terminalId,
      URL_OK: urlOk,
      URL_NOK: urlNok,
      URL_KO: urlNok,
      Firma: firma,
    };

    const ordenCampos = [
      'MerchantID',
      'AcquirerBIN',
      'TerminalID',
      'Num_operacion',
      'Importe',
      'TipoMoneda',
      'Exponente',
      'Cifrado',
      'URL_OK',
      'URL_NOK',
      'Idioma',
      'Pago_soportado',
      'Descripcion',
      'Email',
      'Nombre',
      'Firma',
    ];

    const formFields = ordenCampos
      .filter((campo) => formClean[campo] !== undefined)
      .map((campo) => {
        const fieldName = campo;
        const value = String(formClean[campo] || '');
        const escapedKey = String(fieldName)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
        const escapedValue = value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
        return `            <input type="hidden" name="${escapedKey}" value="${escapedValue}" />`;
      })
      .join('\n');

    const urlCecabank = getCecabankGatewayUrl();
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Redirigiendo a Cecabank...</title>
    <style>
      body { font-family: Arial, sans-serif; text-align: center; padding: 32px; }
      button { padding: 12px 20px; font-size: 16px; cursor: pointer; }
    </style>
  </head>
  <body>
    <h2>Redirigiendo al TPV de Cecabank...</h2>
    <p>Si no se abre automáticamente, pulsa el botón.</p>
    <form id="cecabankForm" method="POST" action="${urlCecabank}" enctype="application/x-www-form-urlencoded" style="display:none;">
${formFields}
    </form>
    <button onclick="document.getElementById('cecabankForm').submit()">Continuar</button>
    <script>
      (function(){
        function submitForm(){ try { const f = document.getElementById('cecabankForm'); if (f) { f.submit(); } } catch(e) {} }
        if (document.readyState === 'complete' || document.readyState === 'interactive') submitForm();
        else document.addEventListener('DOMContentLoaded', submitForm);
        setTimeout(submitForm, 100);
      })();
    </script>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('❌ Error en Cecabank redirect-clean:', error);
    res.status(500).send(`Error calcular firma: ${error.message || 'desconocido'}`);
  }
});

function getCecabankGatewayUrl() {
  const entorno = (process.env.CECABANK_ENTORNO || 'produccion').toLowerCase();
  if (entorno === 'test' || entorno === 'testing' || entorno === 'sandbox') {
    return 'https://tpv.ceca.es/tpvweb/tpv/compra.action';
  }
  return 'https://pgw.ceca.es/tpvweb/tpv/compra.action';
}

function generateCecabankSignature(numOperacion, importe, urlOk, urlKo, merchantIdValue, acquirerBinValue, terminalIdValue, cifradoValue) {
  const merchantId = String(merchantIdValue || process.env.CECABANK_MERCHANT_ID || '').trim();
  const acquirerBin = String(acquirerBinValue || process.env.CECABANK_ACQUIRER_BIN || '').trim();
  const terminalId = String(terminalIdValue || process.env.CECABANK_TERMINAL_ID || '').trim();
  const clave = String(process.env.CECABANK_CLAVE || '').trim();

  if (!merchantId || !acquirerBin || !terminalId || !clave) {
    throw new Error('CECABANK_* no configurado en backend');
  }

  const tipoMoneda = '978';
  const exponente = '2';
  const cifradoStr = String(cifradoValue || 'SHA2').trim() || 'SHA2';

  const numOpStr = String(numOperacion || '').trim();
  const importeStr = String(importe || '').trim();

  const urlOkFirma = String(urlOk || '').trim();
  const urlKoFirma = String(urlKo || '').trim();

  const cadenaBase =
    merchantId +
    acquirerBin +
    terminalId +
    numOpStr +
    importeStr +
    tipoMoneda +
    exponente +
    cifradoStr +
    urlOkFirma +
    urlKoFirma;

  let cadenaFirma = clave + cadenaBase;
  if (cifradoStr === 'SHA2') {
    cadenaFirma = cadenaFirma.replace(/&amp;/g, '&').replace(/#038;/g, '');
  }

  console.log('🔐 Cecabank cadena firma (sin clave):', cadenaBase);
  console.log('🔐 Cecabank longitudes:', {
    merchantId: merchantId.length,
    acquirerBin: acquirerBin.length,
    terminalId: terminalId.length,
    numOp: numOpStr.length,
    importe: importeStr.length,
    urlOk: urlOkFirma.length,
    urlKo: urlKoFirma.length,
    totalSinClave: cadenaBase.length,
    cifrado: cifradoStr,
  });

  const firma = crypto.createHash('sha256').update(cadenaFirma, 'utf8').digest('hex').toLowerCase();
  console.log('🔐 Cecabank firma generada (sha256 hex):', firma.substring(0, 12) + '...');
  return firma;
}

// Configurar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123456789', {
  apiVersion: '2023-10-16',
});

// ============================================
// ENDPOINTS PRINCIPALES (STRIPE, EMAIL, ETC)
// ============================================

// Endpoint raíz
app.get('/', (req, res) => {
  console.log('🏠 Endpoint raíz llamado');
  res.json({
    message: 'Academia Backend API',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      createPaymentIntent: '/api/create-payment-intent'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check llamado');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    port: PORT,
    services: {
      stripe: !!process.env.STRIPE_SECRET_KEY,
      smtp2go: !!transporter
    }
  });
});

// Endpoint para crear Payment Intent de Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    if (!amount || !description) {
      return res.status(400).json({ error: 'Amount and description are required' });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      description,
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('❌ Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para solicitar inscripción al examen presencial
app.post('/api/solicitar-examen-presencial', async (req, res) => {
  try {
    console.log('📧 Iniciando solicitud de inscripción al examen presencial...');
    const { nombre, email, telefono, nivel, documento, mensaje } = req.body;
    console.log('📝 Datos recibidos:', { nombre, email, telefono, nivel, documento, mensaje });
    console.log('📝 Nombre recibido (tipo y valor):', typeof nombre, nombre);
    console.log('📝 Nombre completo recibido:', JSON.stringify(nombre));

    // Validar datos requeridos
    if (!nombre || !email || !nivel) {
      console.log('❌ Validación fallida: faltan campos obligatorios');
      return res.status(400).json({
        error: 'Faltan campos obligatorios',
        required: ['nombre', 'email', 'nivel']
      });
    }

    // Verificar configuración de SMTP2GO
    if (!process.env.SMTP2GO_USERNAME || !process.env.SMTP2GO_PASSWORD) {
      console.error('❌ Credenciales de SMTP2GO no configuradas');
      return res.status(500).json({
        error: 'Configuración de email incompleta',
        details: 'Credenciales de SMTP2GO no configuradas'
      });
    }

    // Configurar el email
    const mailOptions = {
      from: 'admin@academiadeinmigrantes.es',
      to: 'admin@academiadeinmigrantes.es',
      replyTo: email,
      subject: `Solicitud de examen presencial - Nivel ${nivel} - ${nombre}`,
      html: `
        <h2>Solicitud de Inscripción al Examen Presencial</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Datos del Estudiante:</h3>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
          ${documento ? `<p><strong>Documento:</strong> ${documento}</p>` : ''}
          <p><strong>Nivel:</strong> ${nivel}</p>
          <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleString('es-ES')}</p>
        </div>
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
          <h3 style="color: #2e7d32; margin-top: 0;">Mensaje del Estudiante:</h3>
          <p style="font-size: 16px; font-weight: bold; color: #1b5e20;">${mensaje || 'ME APUNTO EN EXAMEN PRESENCIAL'}</p>
        </div>
        <p style="color: #666;">Este email fue enviado desde la app Academia de Inmigrantes.</p>
        <p style="color: #666;">El estudiante ha completado exitosamente el examen final del nivel ${nivel} y solicita inscribirse al examen presencial.</p>
      `,
    };

    console.log('📤 Enviando email a:', mailOptions.to);
    console.log('📤 Desde:', mailOptions.from);
    console.log('📤 Asunto:', mailOptions.subject);

    // Enviar el email usando SMTP2GO
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado exitosamente:', result.messageId);

    res.json({
      success: true,
      message: 'Solicitud de examen presencial enviada correctamente',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Error enviando solicitud de examen presencial:', error);

    // Manejo de errores específico para SMTP2GO
    let errorMessage = 'Error al enviar la solicitud';
    let errorDetails = error.message;
    let errorCode = error.code;

    if (error.responseCode) {
      const responseCode = error.responseCode;
      console.error('❌ Código de respuesta SMTP:', responseCode);

      if (responseCode === 535) {
        errorMessage = 'Error de autenticación con SMTP2GO';
        errorDetails = 'Las credenciales de SMTP2GO son incorrectas.';
        errorCode = 'EAUTH';
      } else if (responseCode === 550) {
        errorMessage = 'Email rechazado';
        errorDetails = 'El servidor SMTP rechazó el email. Verifica el dominio y email remitente.';
        errorCode = 'EREJECTED';
      } else if (responseCode === 421) {
        errorMessage = 'Servicio temporalmente no disponible';
        errorDetails = 'SMTP2GO no está disponible temporalmente. Inténtalo más tarde.';
        errorCode = 'ETEMP';
      }
    } else {
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') {
        errorMessage = 'Timeout de conexión con SMTP2GO';
        errorDetails = 'El servidor de SMTP2GO no responde. Verificar conexión a internet.';
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        errorMessage = 'Servidor de SMTP2GO no encontrado';
        errorDetails = 'No se puede conectar al servidor de SMTP2GO.';
      }
    }

    res.status(500).json({
      error: errorMessage,
      details: errorDetails,
      code: errorCode
    });
  }
});

const runTesseractOcr = async (buffer) => {
  const lang = process.env.OCR_LANGUAGE || 'spa';
  const { data } = await Tesseract.recognize(buffer, lang);
  return data?.text || '';
};

// OCR Aprende a Escribir (Render + Google Vision o Tesseract)
app.post('/api/ocr-aprende-escribir', async (req, res) => {
  try {
    const { imageBase64, expectedText, exerciseId, userId } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 es requerido' });
    }

    const cleanedBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanedBase64, 'base64');
    const minBytes = parseInt(process.env.OCR_MIN_BYTES || '2048', 10);
    if (!buffer.length || buffer.length < minBytes || !isSupportedImageBuffer(buffer)) {
      return res.status(400).json({ error: 'Imagen inválida o demasiado pequeña' });
    }

    let storagePath = null;
    if (storageBucket) {
      storagePath = `aprende_escribir/${userId || 'anon'}/${Date.now()}.jpg`;
      const file = storageBucket.file(storagePath);
      await file.save(buffer, {
        contentType: 'image/jpeg',
        resumable: false,
      });
    }

    const ocrProvider = (process.env.OCR_PROVIDER || 'tesseract').toLowerCase();
    let detectedText = '';

    if (ocrProvider === 'vision') {
      initGoogleClients();
      if (!visionClient) {
        return res.status(500).json({ error: 'Vision no configurado' });
      }
      const [result] = await visionClient.textDetection(buffer);
      detectedText = result?.fullTextAnnotation?.text || '';
    } else {
      detectedText = await runTesseractOcr(buffer);
    }
    const normalizedDetected = normalizeText(detectedText);
    const normalizedExpected = normalizeText(expectedText || '');
    const matched = normalizedExpected
      ? normalizedDetected.includes(normalizedExpected)
      : false;

    if (firestore) {
      await firestore.collection('aprende_escribir_submissions').add({
        storagePath,
        expectedText: expectedText || null,
        detectedText,
        matched,
        exerciseId: exerciseId || null,
        userId: userId || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.json({
      detectedText,
      matched,
      storagePath,
    });
  } catch (error) {
    console.error('❌ Error OCR:', error);
    res.status(500).json({ error: 'No se pudo procesar la imagen' });
  }
});

// Endpoint para enviar email de asesoría de inmigración
app.post('/api/enviar-solicitud-asesoria', async (req, res) => {
  try {
    console.log('📧 Iniciando envío de email de asesoría...');
    const {
      nombre,
      name,
      email,
      telefono,
      phone,
      tipoConsulta,
      appointmentType,
      date,
      time,
      mensaje,
      notes
    } = req.body;

    const nombreFinal = nombre || name;
    const telefonoFinal = telefono || phone;
    const tipoConsultaFinal = tipoConsulta || appointmentType;
    const mensajeFinal = mensaje || notes || 'Sin notas adicionales';

    // Validar datos requeridos (soporta ambos formatos)
    if (!nombreFinal || !email || !telefonoFinal || !tipoConsultaFinal || !date || !time) {
      console.log('❌ Validación fallida: faltan campos obligatorios');
      return res.status(400).json({
        error: 'Faltan campos obligatorios',
        required: ['nombre/name', 'email', 'telefono/phone', 'tipoConsulta/appointmentType', 'date', 'time']
      });
    }

    // Verificar configuración de SMTP2GO
    if (!process.env.SMTP2GO_USERNAME || !process.env.SMTP2GO_PASSWORD || !transporter) {
      console.error('❌ Credenciales de SMTP2GO no configuradas');
      return res.status(500).json({
        error: 'Configuración de email incompleta',
        details: 'Credenciales de SMTP2GO no configuradas'
      });
    }

    const mailOptions = {
      from: 'admin@academiadeinmigrantes.es',
      to: 'admin@academiadeinmigrantes.es',
      replyTo: email,
      subject: `Nueva solicitud de asesoría - ${nombreFinal}`,
      html: `
        <h2>Nueva Solicitud de Asesoría de Inmigración</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Datos del Solicitante:</h3>
          <p><strong>Nombre:</strong> ${nombreFinal}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefonoFinal}</p>
          <p><strong>Tipo de cita:</strong> ${tipoConsultaFinal}</p>
          <p><strong>Fecha solicitada:</strong> ${date}</p>
          <p><strong>Hora solicitada:</strong> ${time}</p>
          <h3>Notas adicionales:</h3>
          <p>${mensajeFinal}</p>
        </div>
        <p style="color: #666;">Este email fue enviado desde la app Academia de Inmigrantes.</p>
      `,
    };

    console.log('📤 Enviando email a:', mailOptions.to);
    console.log('📤 Desde:', mailOptions.from);
    console.log('📤 Asunto:', mailOptions.subject);

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado exitosamente:', result.messageId);

    res.json({
      success: true,
      message: 'Solicitud de asesoría enviada correctamente',
      messageId: result.messageId
    });
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    res.status(500).json({ error: error.message });
  }
});


// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log('🚀 Servidor iniciado en puerto', PORT);
  console.log('🌍 Entorno:', NODE_ENV);
  console.log('🔗 URL: http://localhost:' + PORT);
  console.log('💳 Stripe configurado:', !!process.env.STRIPE_SECRET_KEY);
  console.log('📧 Email configurado:', !!transporter);
});
