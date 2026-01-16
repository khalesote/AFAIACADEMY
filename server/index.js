require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de logs
app.use(morgan('dev'));

// Configuración de CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilitar solicitudes OPTIONS
app.use(express.json());

// Ruta para crear un PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  console.log('Solicitud recibida en /create-payment-intent');
  console.log('Cuerpo de la solicitud:', JSON.stringify(req.body));
  
  try {
    const { amount, currency = 'usd' } = req.body;
    
    if (!amount) {
      console.error('Falta el campo amount');
      return res.status(400).json({ error: 'El campo amount es requerido' });
    }

    console.log('Creando PaymentIntent con Stripe...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('PaymentIntent creado:', paymentIntent.id);
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Ruta de verificación
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send(`
    <h1>API de pagos de Academia de Inmigrantes</h1>
    <p>Estado: En línea</p>
    <p>Hora del servidor: ${new Date().toISOString()}</p>
    <p>Versión: 1.0.0</p>
    <p>Rutas disponibles:</p>
    <ul>
      <li>GET /health - Verificar estado del servidor</li>
      <li>POST /create-payment-intent - Crear intención de pago</li>
    </ul>
  `);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});
