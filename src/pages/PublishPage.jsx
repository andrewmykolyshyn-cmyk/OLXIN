/**
 * Publish Page
 * Multi-step form: title, category, price, province, photos, description,
 * seller type. Validates then opens CheckoutModal for Stripe payment.
 * Auth required (guarded by ProtectedRoute).
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { getCategories, getSiteSettings } from '@/lib/api';
import PhotoUploader from '@/components/PhotoUploader';
import CheckoutModal from './CheckoutModal';
import { showToast } from '@/components/Toast';

const PROVINCES = [
  'Alicante', 'Elche', 'Torrevieja', 'Benidorm', 'Madrid',
  'Barcelona', 'Valencia', 'Murcia', 'Sevilla', 'Malaga',
];

export default function PublishPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useT();

  const [categories, setCategories] = useState([]);
  const [feeCents, setFeeCents] = useState(100);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [province, setProvince] = useState('Alicante');
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [cats, settings] = await Promise.all([
          getCategories(),
          getSiteSettings(),
        ]);
        setCategories(cats.sort((a, b) => (a.order || 0) - (b.order || 0)));
        setFeeCents(settings?.fee_cents || 100);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = t('publish.titleRequired');
    if (!cat) errs.cat = 'Selecciona una categoria';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setShowCheckout(true);
  };

  const buildAdData = () => ({
    seller_id: user.id,
    cat,
    title: title.trim(),
    description: description.trim(),
    price: isFree ? 0 : parseInt(price || '0', 10),
    city: province,
    badge: '',
    envio: true,
    photos,
  });

  const feeEuros = (feeCents / 100).toFixed(2);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span className="spinner large" role="status" />
      </div>
    );
  }

  return (
    <div className="publish-page">
      <h1>{t('publish.title')}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>{t('publish.titleLabel')} <small>({t('publish.titleHint')})</small></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 70))}
            placeholder="Ej: Sofa de piel 3 plazas"
            maxLength={70}
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label>{t('publish.category')}</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">{t('publish.selectCategory')}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{t(`categories.${c.id}`)}</option>
            ))}
          </select>
          {errors.cat && <div className="form-error">{errors.cat}</div>}
        </div>

        <div className="form-group">
          <label>{t('publish.price')} (€)</label>
          <input
            type="number"
            value={isFree ? '' : price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isFree}
            placeholder="0"
            min="0"
          />
          <label className="checkbox-row" style={{ marginTop: 8 }}>
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            />
            {t('publish.giveAway')}
          </label>
        </div>

        <div className="form-group">
          <label>{t('publish.province')}</label>
          <select value={province} onChange={(e) => setProvince(e.target.value)}>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t('publish.photos')}</label>
          <PhotoUploader photos={photos} onChange={setPhotos} t={t} />
        </div>

        <div className="form-group">
          <label>{t('publish.description')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu articulo..."
          />
        </div>

        <div className="form-group">
          <label>{t('publish.sellerType')}</label>
          <div className="segmented" role="group">
            <button
              type="button"
              className={!isPro ? 'active' : ''}
              onClick={() => setIsPro(false)}
            >
              {t('publish.private')}
            </button>
            <button
              type="button"
              className={isPro ? 'active' : ''}
              onClick={() => setIsPro(true)}
            >
              {t('publish.business')}
            </button>
          </div>
        </div>

        {/* Fee bar */}
        <div className="fee-bar">
          <span>{t('publish.feeNote')}</span>
          <span className="amount">{feeEuros} €</span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn primary full">
            💳 {t('publish.payAndPublish')} · {feeEuros} €
          </button>
          <button type="button" className="btn ghost" onClick={() => navigate(-1)}>
            {t('publish.cancel')}
          </button>
        </div>
      </form>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        adData={buildAdData()}
        feeCents={feeCents}
      />
    </div>
  );
}
