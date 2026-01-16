const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const event = req.body;
    if (!event || !event.type) return res.status(400).json({ error: 'Invalid event' });

    if (event.type === 'checkout.session.completed') {
      const session = event.data?.object || {};
      const email = (session.customer_details?.email || session.customer_email || '').toLowerCase();
      console.log('[webhook] checkout.session.completed email=', email, 'session=', session.id);
    }

    return res.json({ received: true });
  } catch (err) {
    console.error('stripe webhook error:', err);
    return res.status(500).json({ error: 'Webhook error' });
  }
};
