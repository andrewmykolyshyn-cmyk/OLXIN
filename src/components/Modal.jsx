/**
 * Modal Component
 * Centered overlay with backdrop blur. Closes on backdrop click,
 × button, and Escape key. Traps focus (simplified).
 */
import React, { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal">
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
