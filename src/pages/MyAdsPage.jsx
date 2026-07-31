/**
 * My Ads Page
 * Shows current user's listings (any status). Delete action.
 * Auth required.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { getMyListings, deleteListing } from '@/lib/api';
import EmptyState from '@/components/EmptyState';
import { showToast } from '@/components/Toast';

export default function MyAdsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useT();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getMyListings();
        setListings(data);
      } catch (err) {
        console.error(err);
        showToast(t('errors.generic'), 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [t]);

  const handleDelete = async (id) => {
    if (!confirm(t('listing.deleteConfirm'))) return;
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
      showToast('Anuncio eliminado', 'success');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span className="spinner large" role="status" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <EmptyState
          icon="📭"
          title={t('myAds.empty')}
          actionLabel={t('myAds.publishFirst')}
          onAction={() => navigate('/publish')}
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>
        📋 {t('nav.myAds')} · {listings.length}
      </h1>

      <div className="listing-grid">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="card listing-card"
            onClick={() => navigate(`/ad/${listing.id}`)}
          >
            <div className="card-img" style={{ background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {listing.photos?.[0] ? (
                <img src={listing.photos[0]} alt={listing.title} />
              ) : (
                <span style={{ fontSize: 40, opacity: 0.3 }}>📷</span>
              )}
              {listing.status === 'pending' && (
                <span className="card-badge badge pending">{t('myAds.pending')}</span>
              )}
            </div>
            <div className="card-body">
              <div className="card-price">
                {listing.price === 0 ? 'Gratis' : `${listing.price} €`}
              </div>
              <div className="card-title">{listing.title}</div>
              <div className="my-ads-actions">
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  👁 {listing.views} {t('myAds.views')}
                </span>
                <button
                  className="btn ghost"
                  style={{ padding: '4px 10px', fontSize: 12, marginLeft: 'auto' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(listing.id);
                  }}
                >
                  🗑 {t('myAds.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
