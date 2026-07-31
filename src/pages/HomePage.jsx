/**
 * Home Page
 * Categories grid, business promo banner, featured listings grid,
 * trust tiles. Skeleton loading state.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '@/i18n/i18n';
import { getListings } from '@/lib/api';
import ListingGrid from '@/components/ListingGrid';
import Spinner from '@/components/Spinner';
import EmptyState from '@/components/EmptyState';

const CAT_ICONS = {
  motor: '🚗', motos: '🏍', inmo: '🏠', empleo: '💼', reformas: '🔨',
  electro: '📺', hogar: '🪑', moda: '👗', deporte: '⚽', bebes: '🍼',
  animales: '🐕', servicios: '🛠', coleccion: '🎮', agro: '🌾', gratis: '🎁', alquiler: '🔑',
};

function CategoryCard({ cat, onClick, t }) {
  return (
    <div className="card category-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}>
      <span className="icon" aria-hidden="true">{cat.ic || CAT_ICONS[cat.id]}</span>
      <span className="name">{t(`categories.${cat.id}`)}</span>
    </div>
  );
}

export default function HomePage({ categories, favorites, onToggleFavorite }) {
  const navigate = useNavigate();
  const { t } = useT();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(false);
        const data = await getListings({ sort: 'recommended', limit: 8 });
        setListings(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      {/* Categories */}
      <section className="page-section">
        <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 16 }}>{t('home.categoriesTitle')}</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              t={t}
              onClick={() => navigate(`/c/${cat.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Business Promo */}
      <section className="page-section">
        <div className="business-promo">
          <span className="icon" aria-hidden="true">🏗</span>
          <div>
            <h3>{t('home.businessPromo')}</h3>
            <p>{t('home.businessCta')}</p>
            <button className="btn primary" onClick={() => navigate('/publish')}>
              {t('nav.publish')}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="page-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800 }}>{t('home.featured')}</h2>
          <button className="btn ghost" onClick={() => navigate('/c/todo')}>
            {t('home.seeMore')} →
          </button>
        </div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card" style={{ height: 280 }}>
                <div className="skeleton" style={{ height: '60%' }} />
                <div style={{ padding: 12 }}>
                  <div className="skeleton" style={{ height: 20, width: '60%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <EmptyState
            icon="⚠️"
            title={t('errors.generic')}
            message=""
            actionLabel={t('errors.retry')}
            onAction={() => window.location.reload()}
          />
        )}

        {!loading && !error && (
          <ListingGrid listings={listings} favorites={favorites} onToggleFavorite={onToggleFavorite} />
        )}
      </section>

      {/* Trust Section */}
      <section className="page-section">
        <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 16 }}>{t('home.trustTitle')}</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="icon">💬</div>
            <h4>{t('trust.chat')}</h4>
          </div>
          <div className="trust-card">
            <div className="icon">🚚</div>
            <h4>{t('trust.shipping')}</h4>
            <p>{t('trust.shippingDesc')}</p>
          </div>
          <div className="trust-card">
            <div className="icon">🛡️</div>
            <h4>{t('trust.protection')}</h4>
          </div>
          <div className="trust-card">
            <div className="icon">🔒</div>
            <h4>{t('trust.payment')}</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
