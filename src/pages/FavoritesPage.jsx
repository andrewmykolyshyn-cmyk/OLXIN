/**
 * Favorites Page
 * Shows listings saved in localStorage. Client-side only.
 */
import React, { useState, useEffect } from 'react';
import { useT } from '@/i18n/i18n';
import { supabase } from '@/lib/supabase';
import ListingGrid from '@/components/ListingGrid';
import EmptyState from '@/components/EmptyState';
import Spinner from '@/components/Spinner';

export default function FavoritesPage({ favorites, onToggleFavorite }) {
  const { t } = useT();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (favorites.size === 0) {
        setListings([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const ids = [...favorites];
        // Fetch in batches if many
        const { data, error } = await supabase
          .from('listings')
          .select('*, seller:seller_id(name, is_pro, created_at)')
          .in('id', ids)
          .eq('status', 'active');
        if (error) throw error;
        setListings(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [favorites]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spinner size="large" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <EmptyState
          icon="❤"
          title={t('nav.favorites')}
          message="Guarda anuncios como favoritos para verlos aqui."
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>
        ❤ {t('nav.favorites')} · {listings.length}
      </h1>
      <ListingGrid listings={listings} favorites={favorites} onToggleFavorite={onToggleFavorite} />
    </div>
  );
}
