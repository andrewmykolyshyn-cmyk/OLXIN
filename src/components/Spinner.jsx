/**
 * Spinner Component
 * Loading indicator. Sizes: small, default, large.
 */
import React from 'react';

export default function Spinner({ size = 'default' }) {
  return <span className={`spinner ${size}`} aria-label="Loading" role="status" />;
}
