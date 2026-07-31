/**
 * Seller Page
 * Public seller profile: name, PRO status, member since,
 * average rating + count, active listings, reviews.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useT } from '@/i18n/i18n';
import { getProfile, getSellerListings, getRatings } from '@/lib/api';
import { getYear } from '@/lib/format';
import StarRating from '@/components/StarRating';
import ListingGrid from '@/components/ListingGrid';
import Spinner from '@/components/Spinner';

export default function SellerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useT();

  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [profileData, listingsData, ratingsData] = await Promise.all([
          getProfile(id),
          getSellerListings(id),
          getRatings(id),
        ]);
        setSeller(profileData);
        setListings(listingsData);
        setRatings(ratingsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spinner size="large" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: 80 }}>
        <h2>{t('errors.notFound')}</h2>
        <button className="btn primary" onClick={() => navigate('/')}>
          {t('errors.goHome')}
        </button>
      </div>
    );
  }

  const avgStars = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <div className="seller-page">
      {/* Seller Profile */}
      <div className="seller-profile">
        <div className={`avatar ${seller.is_pro ? 'pro' : ''}`}>
          {(seller.name || 'U')[0].toUpperCase()}
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>
            {seller.name}
            {seller.is_pro && <span className="badge vip" style={{ marginLeft: 8, fontSize: 10 }}>PRO</span>}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            En OLXIN desde {getYear(seller.created_at)}
          </p>
          <StarRating value={Math.round(avgStars)} readonly count={ratings.length} />
        </div>
      </div>

      {/* Listings */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>
          Anuncios activos ({listings.length})
        </h2>
        {listings.length > 0 ? (
          <ListingGrid listings={listings} />
        ) : (
          <p style={{ color: 'var(--muted)' }}>Sin anuncios activos.</p>
        )}
      </section>

      {/* Reviews */}
      {ratings.length > 0 && (
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>
            {t('listing.reviews')} ({ratings.length})
          </h2>
          <div className="reviews-list">
            {ratings.map((r) => (
              <div key={r.id} className="review-item">
                <div className="review-header">
                  <StarRating value={r.stars} readonly />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.rater?.name || 'Usuario'}</span>
                  <span className="review-date">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
                <div className="review-text">{r.comment}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
