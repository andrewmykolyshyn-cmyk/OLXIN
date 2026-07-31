/**
 * Protected Route Component
 * Redirects unauthenticated users to /auth with return URL.
 * Optionally requires admin role.
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span className="spinner" role="status" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
