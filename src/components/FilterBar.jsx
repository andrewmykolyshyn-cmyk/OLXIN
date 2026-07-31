/**
 * Filter Bar Component
 * Sticky bar with shipping chip, seller type segmented control, and sort dropdown.
 */
import React from 'react';
import { useT } from '@/i18n/i18n';

export default function FilterBar({
  envio,
  onToggleEnvio,
  sellerType,
  onChangeSellerType,
  sort,
  onChangeSort,
  resultCount,
}) {
  const { t } = useT();

  return (
    <div className="filter-bar">
      <button
        className={`chip ${envio ? 'on' : ''}`}
        onClick={onToggleEnvio}
        aria-pressed={envio}
      >
        🚚 {t('filters.shipping')}
      </button>

      <div className="segmented" role="group" aria-label="Seller type filter">
        <button
          className={sellerType === 'all' ? 'active' : ''}
          onClick={() => onChangeSellerType('all')}
        >
          {t('filters.all')}
        </button>
        <button
          className={sellerType === 'business' ? 'active' : ''}
          onClick={() => onChangeSellerType('business')}
        >
          {t('filters.businesses')}
        </button>
        <button
          className={sellerType === 'private' ? 'active' : ''}
          onClick={() => onChangeSellerType('private')}
        >
          {t('filters.private')}
        </button>
      </div>

      <select
        value={sort}
        onChange={(e) => onChangeSort(e.target.value)}
        aria-label={t('filters.sort')}
        style={{ marginLeft: 'auto' }}
      >
        <option value="recommended">{t('filters.recommended')}</option>
        <option value="newest">{t('filters.newest')}</option>
        <option value="price_asc">{t('filters.priceAsc')}</option>
        <option value="price_desc">{t('filters.priceDesc')}</option>
      </select>

      {resultCount !== undefined && (
        <span style={{ fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          · {resultCount} resultados
        </span>
      )}
    </div>
  );
}
