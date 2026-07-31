/**
 * Toast Component
 * Bottom-center auto-dismissing notification.
 * aria-live for accessibility.
 */
import React, { useEffect, useState } from 'react';

let toastId = 0;
const listeners = new Set();

export function showToast(message, type = 'info') {
  const id = ++toastId;
  listeners.forEach((fn) => fn({ id, message, type }));
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 1800);
    };
    listeners.add(handleToast);
    return () => listeners.delete(handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role="status">
          {t.message}
        </div>
      ))}
    </div>
  );
}
