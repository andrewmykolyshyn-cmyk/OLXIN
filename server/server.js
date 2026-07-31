/**
 * OLXIN Express Server
 * Handles Stripe PaymentIntents and webhook for ad publishing.
 * Assumption: Supabase service role key is used for admin DB operations (webhook).
 * The client uses anon key with RLS for normal operations.
 */
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

// Supabase admin client (service role) for webhook operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const AD_FEE_CENTS = parseInt(process.env.AD_FEE_EUR || '1') * 100;

// --------------------------------------------------------------
// Middleware
// --------------------------------------------------------------
// CORS for API routes (allow frontend origin)
app.use(cors({ origin: true }));

// JSON parsing for regular API routes
app.use('/api/config', express.json());
app.use('/api/create-payment-intent', express.json());

// Webhook route needs raw body for Stripe signature verification
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle payment success
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const adDataStr = paymentIntent.metadata?.ad_data;

    if (!adDataStr) {
      console.error('No ad_data in payment intent metadata');
      return res.json({ received: true });
    }

    try {
      const ad = JSON.parse(adDataStr);

      // Insert the listing with active status using admin client
      // This bypasses RLS and sets the ad as paid/active
      const { error } = await supabaseAdmin
        .from('listings')
        .insert({
          seller_id: ad.seller_id,
          cat: ad.cat,
          title: ad.title,
          description: ad.description || '',
          price: ad.price || 0,
          city: ad.city || 'Alicante',
          badge: ad.badge || '',
          envio: ad.envio ?? true,
          photos: ad.photos || [],
          status: 'active',
          payment_id: paymentIntent.id,
        });

      if (error) {
        console.error('Failed to insert listing from webhook:', error);
        return res.status(500).json({ error: 'Failed to create listing' });
      }

      console.log('Listing created from webhook for payment:', paymentIntent.id);
    } catch (e) {
      console.error('Error parsing ad data or inserting listing:', e);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  res.json({ received: true });
});

// --------------------------------------------------------------
// GET /api/config - Frontend config (fee, Stripe status)
// --------------------------------------------------------------
app.get('/api/config', async (req, res) => {
  const stripeEnabled = !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_');

  // Fetch current fee from site_settings
  const { data } = await supabaseAdmin
    .from('site_settings')
    .select('fee_cents')
    .eq('id', 1)
    .single();

  const feeCents = data?.fee_cents ?? AD_FEE_CENTS;

  res.json({
    fee_cents: feeCents,
    currency: 'eur',
    stripeEnabled,
  });
});

// --------------------------------------------------------------
// POST /api/create-payment-intent
// --------------------------------------------------------------
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, ad } = req.body;

    // Validate required ad fields
    if (!ad || !ad.seller_id || !ad.cat || !ad.title) {
      return res.status(400).json({ error: 'Missing required ad data' });
    }

    // Serialize ad data into metadata (Stripe metadata values have 500 char limit each)
    // Photos array may be large, so we join with a separator
    const adDataForMeta = {
      ...ad,
      photos: ad.photos ? ad.photos.join('|') : '',
    };

    // Stripe metadata has 500 char limit per value, 50 keys max
    // We stringify the whole ad object into one key
    const metaString = JSON.stringify(adDataForMeta);

    // Create PaymentIntent with automatic payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || AD_FEE_CENTS,
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        ad_data: metaString,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------------------
// Health check
// --------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// --------------------------------------------------------------
// Start server
// --------------------------------------------------------------
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`OLXIN server running on port ${PORT}`);
  console.log(`Stripe ${process.env.STRIPE_SECRET_KEY ? 'enabled' : 'DISABLED'}`);
});
