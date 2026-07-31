/**
 * Listing Detail Page
 * Photo gallery, description, seller info, rating, similar ads.
 * Calls bump_views on mount.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { getListing, bumpViews, getRatings, upsertRating, getListings, deleteListing } from '@/lib/api';
import { formatPrice, timeAgo } from '@/lib/format';
import StarRating from '@/components/StarRating';
import ListingGrid from '@/components/ListingGrid';
import Modal from '@/components/Modal';
import { showToast } from '@/components/Toast';

const CAT_ICONS = {
  motor: '🚗', motos: '🏍', inmo: '🏠', empleo: '💼', reformas: '🔨',
  electro: '📺', hogar: '🪑', moda: '👗', deporte: '⚽', bebes: '🍼',
  animales: '🐕', servicios: '🛠', coleccion: '🎮', agro: '🌾', gratis: '🎁', alquiler: '🔑',
};

export default function ListingPage({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, lang } = useT();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainPhoto, setMainPhoto] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [similar, setSimilar] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const isOwner = user && listing && user.id === listing.seller_id;

  useEffect(() => {
    setIsFav(favorites?.has(Number(id)));
  }, [favorites, id]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getListing(id);
        setListing(data);
        setMainPhoto(0);

        // Bump views
        bumpViews(id).catch(() => {});

        // Load ratings
        const ratingsData = await getRatings(data.seller_id);
        setRatings(ratingsData);

        // Check if user already rated
        if (user) {
          const existing = ratingsData.find((r) => r.rater_id === user.id);
          if (existing) setUserRating(existing.stars);
        }

        // Load similar listings
        const similarData = await getListings({ cat: data.cat, limit: 4 });
        setSimilar(similarData.filter((l) => l.id !== data.id));
      } catch (err) {
        console.error(err);
        showToast(t('errors.generic'), 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, user, t]);

  const handleRate = async (stars) => {
    if (!user) {
      navigate(`/auth?next=/ad/${id}`);
      return;
    }
    if (!listing || isOwner) return;

    try {
      await upsertRating(listing.seller_id, user.id, stars);
      setUserRating(stars);
      // Refresh ratings
      const ratingsData = await getRatings(listing.seller_id);
      setRatings(ratingsData);
      showToast('⭐ ' + t('listing.thanksRating'), 'success');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteListing(id);
      showToast('Anuncio eliminado', 'success');
      navigate('/my-ads');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    }
  };

  const handleContact = () => showToast(t('comingSoon'));
  const handleShowPhone = () => showToast('📞 600 000 000');

  const avgStars = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span className="spinner large" role="status" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: 80 }}>
        <h2>{t('errors.notFound')}</h2>
        <button className="btn primary" onClick={() => navigate('/')} style={{ marginTop: 16 }}>
          {t('errors.goHome')}
        </button>
      </div>
    );
  }

  const photos = listing.photos || [];
  const hasPhotos = photos.length > 0;

  return (
    <div className="listing-detail">
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'var(--teal-ink)', cursor: 'pointer', marginBottom: 16, fontSize: 14 }}
        >
          {t('listing.back')}
        </button>

        {/* Gallery */}
        <div className="gallery">
          <div className="gallery-main">
            {hasPhotos ? (
              <img src={photos[mainPhoto]} alt={listing.title} />
            ) : (
              <span className="cat-icon">{CAT_ICONS[listing.cat] || '📦'}</span>
            )}
          </div>
          {photos.length > 1 && (
            <div className="gallery-thumbs">
              {photos.map((url, i) => (
                <button
                  key={i}
                  className={i === mainPhoto ? 'active' : ''}
                  onClick={() => setMainPhoto(i)}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img src={url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="detail-info">
          <h1>{listing.title}</h1>
          <div className="detail-meta">
            📍 {listing.city} · {timeAgo(listing.created_at, lang)} · {t(`categories.${listing.cat}`)} · {listing.views} {t('listing.visits')}
          </div>
          <div className="detail-price">
            {listing.price === 0 ? 'Gratis' : formatPrice(listing.price)}
            {!listing.seller?.is_pro && listing.price > 0 && (
              <span className="card-neg">{t('listing.negotiable')}</span>
            )}
          </div>
          {listing.envio && (
            <div style={{ fontSize: 13, color: 'var(--teal-ink)', marginBottom: 16 }}>
              🚚 {t('listing.shippingAvail')}
            </div>
          )}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{t('listing.description')}</h3>
          <div className="detail-description">{listing.description || 'Sin descripcion.'}</div>

          {/* Owner actions */}
          {isOwner && (
            <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
              <button className="btn ghost" onClick={() => showToast(t('comingSoon'))}>
                {t('listing.edit')}
              </button>
              <button className="btn primary" onClick={() => setShowDelete(true)}>
                {t('listing.delete')}
              </button>
            </div>
          )}
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="similar-section">
            <h3>{t('listing.similarAds')}</h3>
            <ListingGrid listings={similar} favorites={favorites} onToggleFavorite={onToggleFavorite} />
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        {/* Seller */}
        <div className="seller-box">
          <div className="seller-header">
            <div className={`seller-avatar ${listing.seller?.is_pro ? 'pro' : ''}`}>
              {(listing.seller?.name || 'U')[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{listing.seller?.name || 'Usuario'}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                En OLXIN desde {new Date(listing.seller?.created_at).getFullYear()}
              </div>
              <StarRating value={Math.round(avgStars)} readonly count={ratings.length} />
            </div>
          </div>
          <div className="seller-actions">
            <button className="btn primary" onClick={handleContact}>
              💬 {t('listing.contactChat')}
            </button>
            <button className="btn ghost" onClick={handleShowPhone}>
              📞 {t('listing.showPhone')}
            </button>
          </div>
        </div>

        {/* Rating */}
        {!isOwner && user && (
          <div className="rating-box">
            <h4 style={{ marginBottom: 12 }}>{t('listing.rateSeller')}</h4>
            {userRating > 0 ? (
              <p style={{ color: 'var(--teal-ink)', fontSize: 14 }}>⭐ {t('listing.thanksRating')}</p>
            ) : (
              <StarRating value={userRating} onChange={handleRate} />
            )}
          </div>
        )}

        {/* Safety */}
        <div className="safety-box">
          <strong>🛡️ {t('trust.protection')}</strong>
          <p style={{ marginTop: 4, fontSize: 12 }}>{t('listing.safetyTip')}</p>
        </div>

        {/* Reviews */}
        {ratings.length > 0 && (
          <div className="rating-box">
            <h4 style={{ marginBottom: 12 }}>{t('listing.reviews')} ({ratings.length})</h4>
            <div className="reviews-list">
              {ratings.slice(0, 3).map((r) => (
                <div key={r.id} className="review-item">
                  <div className="review-header">
                    <StarRating value={r.stars} readonly />
                    <span className="review-date">{timeAgo(r.created_at, lang)}</span>
                  </div>
                  <div className="review-text">{r.comment}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Delete confirmation modal */}
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title={t('listing.delete')}>
        <p>{t('listing.deleteConfirm')}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <button className="btn ghost" onClick={() => setShowDelete(false)}>
            Cancelar
          </button>
          <button className="btn primary" onClick={handleDelete}>
            {t('listing.delete')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
