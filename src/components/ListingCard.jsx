/**
 * Listing Card Component
 * Displays a listing preview: photo, badge, price, title, meta.
 * Favorite heart toggles localStorage.
 * Click navigates to /ad/:id.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, timeAgo } from '@/lib/format';
import { useT } from '@/i18n/i18n';

// Category emoji icons mapping
const CAT_ICONS = {
  motor: '🚗', motos: '🏍', inmo: '🏠', empleo: '💼', reformas: '🔨',
  electro: '📺', hogar: '🪑', moda: '👗', deporte: '⚽', bebes: '🍼',
  animales: '🐕', servicios: '🛠', coleccion: '🎮', agro: '🌾', gratis: '🎁', alquiler: '🔑',
};

function getCatIcon(catId) {
  return CAT_ICONS[catId] || '📦';
}

export default function ListingCard({ listing, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const { t, lang } = useT();

  const handleCardClick = () => {
    navigate(`/ad/${listing.id}`);
  };

  const handleFavClick = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(listing.id);
  };

  const firstPhoto = listing.photos?.[0];
  const isFree = listing.price === 0;

  return (
    <div className="card hoverable listing-card" onClick={handleCardClick}>
      <div className="card-img">
        {firstPhoto ? (
          <img src={firstPhoto} alt={listing.title} loading="lazy" />
        ) : (
          <span className="cat-icon" aria-hidden="true">{getCatIcon(listing.cat)}</span>
        )}

        {listing.badge && (
          <span className={`card-badge badge ${listing.badge}`}>
            {listing.badge === 'vip' ? 'VIP' : listing.badge === 'destacado' ? 'Destacado' : listing.badge === 'free' ? 'Gratis' : listing.badge}
          </span>
        )}

        <button
          className={`card-fav ${isFavorite ? 'on' : ''}`}
          onClick={handleFavClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="card-body">
        <div className="card-price">
          {isFree ? (
            <span className="free-tag">Gratis</span>
          ) : (
            <>
              {formatPrice(listing.price)}
              {!listing.seller?.is_pro && (
                <span className="card-neg">{t('listing.negotiable')}</span>
              )}
            </>
          )}
        </div>
        <div className="card-title">{listing.title}</div>
        <div className="card-meta">
          {listing.city} · {timeAgo(listing.created_at, lang)}
        </div>
      </div>
    </div>
  );
}
