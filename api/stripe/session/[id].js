const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'Missing session id' });
    const session = await stripe.checkout.sessions.retrieve(id);
    return res.json({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email || session.customer_email || null,
      mode: session.mode,
    });
  } catch (err) {
    console.error('stripe retrieve error:', err);
    return res.status(500).json({ error: 'Unable to retrieve session' });
  }
};
