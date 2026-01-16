const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const { amount, currency = 'eur', email, bloque } = req.body || {};

    const validateAmount = (v) => Number.isInteger(v) && v > 0 && v < 1_000_000;
    if (!validateAmount(amount)) return res.status(400).json({ error: 'Invalid amount' });

    // Forzar español y asociar email al checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      locale: 'es',
      customer_email: typeof email === 'string' && email ? email : undefined,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: String(bloque || '').toUpperCase() === 'B1B2' ? 'Matrícula B1/B2' : 'Matrícula A1/A2',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: 'https://vercel.com?status=success',
      cancel_url: 'https://vercel.com?status=cancel',
      metadata: { bloque: String(bloque || ''), email: typeof email === 'string' ? email : '' },
    });

    return res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('stripe create error:', err);
    return res.status(500).json({ error: 'Unable to create session' });
  }
};
