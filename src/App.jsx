/**
 * OLXIN App
 * Routes, layout (Header + CategoryStrip + Footer), Toast.
 * Manages favorites in localStorage.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import CategoryStrip from '@/components/CategoryStrip';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getCategories } from '@/lib/api';

// Pages
import HomePage from '@/pages/HomePage';
import ResultsPage from '@/pages/ResultsPage';
import ListingPage from '@/pages/ListingPage';
import PublishPage from '@/pages/PublishPage';
import MyAdsPage from '@/pages/MyAdsPage';
import SellerPage from '@/pages/SellerPage';
import AuthPage from '@/pages/AuthPage';
import AdminPage from '@/pages/AdminPage';
import NotFoundPage from '@/pages/NotFoundPage';
import FavoritesPage from '@/pages/FavoritesPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function FavoritesRoute() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('olxin-favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem('olxin-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { favorites, toggleFavorite };
}

export default function App() {
  const [categories, setCategories] = useState([]);
  const { favorites, toggleFavorite } = FavoritesRoute();

  useEffect(() => {
    getCategories().then((cats) => {
      // Sort by order field
      const sorted = [...cats].sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(sorted);
    }).catch(() => setCategories([]));
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header favoritesCount={favorites.size} />
      <CategoryStrip categories={categories} />

      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage categories={categories} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/c/:catId" element={<ResultsPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/search" element={<ResultsPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/ad/:id" element={<ListingPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/publish" element={<ProtectedRoute><PublishPage /></ProtectedRoute>} />
          <Route path="/my-ads" element={<ProtectedRoute><MyAdsPage /></ProtectedRoute>} />
          <Route path="/seller/:id" element={<SellerPage />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage categories={categories} /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <Toast />
    </>
  );
}
