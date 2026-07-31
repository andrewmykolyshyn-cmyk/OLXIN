/**
 * Star Rating Component
 * Interactive 5-star widget. Displays or allows rating input.
 * @param {number} value - current rating (1-5)
 * @param {function} onChange - callback when user clicks a star
 * @param {boolean} readonly - if true, no interaction
 * @param {number} count - optional review count to display
 */
import React, { useState } from 'react';

export default function StarRating({ value = 0, onChange, readonly = false, count }) {
  const [hover, setHover] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div
        className="star-rating"
        onMouseLeave={() => !readonly && setHover(0)}
        role={readonly ? 'img' : 'group'}
        aria-label={readonly ? `Rating: ${value} of 5 stars` : 'Rate this seller'}
      >
        {stars.map((s) => (
          <span
            key={s}
            className={`star ${s <= (hover || value) ? 'on' : ''}`}
            onClick={() => !readonly && onChange?.(s)}
            onMouseEnter={() => !readonly && setHover(s)}
            role={readonly ? undefined : 'button'}
            aria-label={readonly ? undefined : `${s} stars`}
            tabIndex={readonly ? -1 : 0}
            onKeyDown={(e) => {
              if (!readonly && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onChange?.(s);
              }
            }}
          >
            ★
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>({count})</span>
      )}
    </div>
  );
}
