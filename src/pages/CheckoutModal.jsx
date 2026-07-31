/**
 * CheckoutModal Page
 * Stripe Payment Element integration. Handles card + Apple Pay + Google Pay.
 * Falls back to demo mode if Stripe keys are missing.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useT } from '@/i18n/i18n';
import { createPaymentIntent } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import Modal from '@/components/Modal';
import { showToast } from '@/components/Toast';

// Lazy-load Stripe (may be null if key missing)
const stripePromise = (() => {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!key || !key.startsWith('pk_')) return null;
  return loadStripe(key);
})();

function CheckoutForm({ clientSecret, adData, feeCents, onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useT();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/my-ads`,
        },
      });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      // Payment succeeded
      onSuccess();
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  const feeEuros = (feeCents / 100).toFixed(2);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 16 }}>
        <strong>{adData.title}</strong>
        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>
          {t('checkout.total')}: {feeEuros} €
        </div>
      </div>

      <PaymentElement
        options={{
          layout: 'tabs',
          defaultValues: { billingDetails: { name: '' } },
        }}
      />

      {error && <div className="form-error" style={{ marginTop: 12 }}>{error}</div>}

      <button
        type="submit"
        className="btn primary full"
        disabled={!stripe || processing}
        style={{ marginTop: 20 }}
      >
        {processing ? `⏳ ${t('checkout.processing')}` : `🔒 ${t('checkout.pay')} ${feeEuros} €`}
      </button>
    </form>
  );
}

function DemoCheckout({ adData, feeCents, onClose, onSuccess }) {
  const { t } = useT();
  const [processing, setProcessing] = useState(false);

  const handleDemoPay = async () => {
    setProcessing(true);
    // Simulate payment delay then insert directly for demo
    await new Promise((r) => setTimeout(r, 1500));

    try {
      const { data, error } = await supabase
        .from('listings')
        .insert({
          seller_id: adData.seller_id,
          cat: adData.cat,
          title: adData.title,
          description: adData.description,
          price: adData.price,
          city: adData.city,
          badge: adData.badge || '',
          envio: adData.envio ?? true,
          photos: adData.photos || [],
          status: 'active',
          payment_id: 'demo_' + Date.now(),
        })
        .select()
        .single();

      if (error) throw error;
      onSuccess(data?.id);
    } catch (err) {
      showToast(t('errors.generic'), 'error');
      setProcessing(false);
    }
  };

  const feeEuros = (feeCents / 100).toFixed(2);

  return (
    <div>
      <div style={{ background: '#fff3e0', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
        ⚠️ {t('checkout.demoMode')}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>{adData.title}</strong>
        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>
          {t('checkout.total')}: {feeEuros} €
        </div>
      </div>
      <button
        className="btn primary full"
        onClick={handleDemoPay}
        disabled={processing}
      >
        {processing ? `⏳ ${t('checkout.processing')}` : `✓ ${t('checkout.pay')} ${feeEuros} € (Demo)`}
      </button>
    </div>
  );
}

export default function CheckoutModal({ isOpen, onClose, adData, feeCents }) {
  const navigate = useNavigate();
  const { t } = useT();
  const [clientSecret, setClientSecret] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newAdId, setNewAdId] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasStripe = !!stripePromise;

  useEffect(() => {
    if (!isOpen) {
      setClientSecret(null);
      setSuccess(false);
      setNewAdId(null);
      return;
    }

    if (hasStripe) {
      setLoading(true);
      createPaymentIntent({
        amount: feeCents,
        currency: 'eur',
        ad: adData,
      })
        .then((res) => {
          setClientSecret(res.clientSecret);
        })
        .catch((err) => {
          console.error(err);
          showToast(t('errors.generic'), 'error');
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, hasStripe, feeCents, adData, t]);

  const handleSuccess = (id) => {
    setNewAdId(id);
    setSuccess(true);
    showToast(t('checkout.successTitle'), 'success');
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={success ? onClose : () => {}} title={t('checkout.title')}>
      {success ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
            {t('checkout.successTitle')}
          </h3>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
            {t('checkout.successText')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {newAdId && (
              <button className="btn primary" onClick={() => navigate(`/ad/${newAdId}`)}>
                {t('checkout.viewAd')}
              </button>
            )}
            <button className="btn ghost" onClick={() => navigate('/my-ads')}>
              {t('checkout.myAds')}
            </button>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
              <span className="spinner" role="status" />
            </div>
          )}

          {!loading && hasStripe && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                clientSecret={clientSecret}
                adData={adData}
                feeCents={feeCents}
                onClose={onClose}
                onSuccess={() => handleSuccess()}
              />
            </Elements>
          )}

          {!loading && !hasStripe && (
            <DemoCheckout
              adData={adData}
              feeCents={feeCents}
              onClose={onClose}
              onSuccess={(id) => handleSuccess(id)}
            />
          )}
        </>
      )}
    </Modal>
  );
}
