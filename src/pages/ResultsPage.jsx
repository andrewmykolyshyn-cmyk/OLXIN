/**
 * Results Page
 * Shows listings by category (/c/:catId) or search (/search?q=...).
 * Filter bar with shipping, seller type, sort.
 * Infinite scroll loading.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useT } from '@/i18n/i18n';
import { getListings } from '@/lib/api';
import ListingGrid from '@/components/ListingGrid';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import Spinner from '@/components/Spinner';

export default function ResultsPage({ favorites, onToggleFavorite }) {
  const { catId } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t } = useT();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [envio, setEnvio] = useState(false);
  const [sellerType, setSellerType] = useState('all');
  const [sort, setSort] = useState('recommended');

  const isSearch = !catId && query;
  const isAll = catId === 'todo' || (!catId && !query);

  // Build title
  const title = isSearch
    ? `"${query}"`
    : isAll
    ? t('filters.all')
    : t(`categories.${catId}`);

  const fetchListings = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const newOffset = reset ? 0 : offset;

      const filters = {
        limit: 20,
        offset: newOffset,
        sort,
      };

      if (!isAll && catId && catId !== 'todo') {
        filters.cat = catId;
      }

      if (isSearch) {
        filters.q = query;
      }

      if (envio) filters.envio = true;

      const data = await getListings(filters);

      // Client-side filter for seller type
      let filtered = data;
      if (sellerType === 'business') {
        filtered = data.filter((l) => l.seller?.is_pro);
      } else if (sellerType === 'private') {
        filtered = data.filter((l) => !l.seller?.is_pro);
      }

      if (reset) {
        setListings(filtered);
      } else {
        setListings((prev) => [...prev, ...filtered]);
      }

      setHasMore(data.length === 20);
      setOffset(newOffset + 20);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [catId, query, isSearch, isAll, envio, sellerType, sort, offset]);

  // Reset and refetch when filters change
  useEffect(() => {
    setOffset(0);
    fetchListings(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId, query, envio, sellerType, sort]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        fetchListings(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, fetchListings]);

  return (
    <div className="container">
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>
        {title} · {listings.length} resultados
      </h1>

      <FilterBar
        envio={envio}
        onToggleEnvio={() => setEnvio((v) => !v)}
        sellerType={sellerType}
        onChangeSellerType={setSellerType}
        sort={sort}
        onChangeSort={setSort}
      />

      {listings.length === 0 && !loading && (
        <EmptyState
          icon="🔍"
          title={t('errors.noResults')}
          message={t('errors.removeFilter')}
        />
      )}

      <ListingGrid
        listings={listings}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Spinner size="large" />
        </div>
      )}
    </div>
  );
}
