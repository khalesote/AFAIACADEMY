const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const email = (req.query.email || '').toString().trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'Missing email' });

    // Buscar sesiones recientes por email y confirmar si alguna está pagada
    // Nota: la API de list con filtro por email no está documentada oficialmente; alternativa: buscar PaymentIntents por customer
    let paid = false, sid = null, ts = null;
    try {
      const sessions = await stripe.checkout.sessions.list({ limit: 20 });
      for (const s of sessions.data) {
        const sMail = (s.customer_details?.email || s.customer_email || '').toLowerCase();
        if (sMail === email && (s.payment_status === 'paid' || s.payment_status === 'succeeded')) {
          paid = true;
          sid = s.id;
          ts = s.created ? s.created * 1000 : null;
          break;
        }
      }
    } catch {}

    return res.json({ paid, session_id: sid, ts });
  } catch (err) {
    console.error('stripe paid check error:', err);
    return res.status(500).json({ error: 'Unable to check paid' });
  }
};
