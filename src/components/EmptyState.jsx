/**
 * Empty State Component
 * Icon + message + optional CTA button.
 */
import React from 'react';

export default function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && onAction && (
        <button className="btn primary" onClick={onAction} style={{ marginTop: 16 }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
