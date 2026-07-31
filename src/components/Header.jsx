/**
 * Header Component
 * Sticky header: admin bar (conditional), logo, search, language,
 * actions (chat, my ads, favorites, admin, publish).
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { showToast } from './Toast';

const PROVINCES = [
  'Toda Espana',
  'Alicante',
  'Elche',
  'Torrevieja',
  'Benidorm',
  'Madrid',
  'Barcelona',
  'Valencia',
  'Murcia',
  'Sevilla',
  'Malaga',
];

export default function Header({ favoritesCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { t, lang, setLang, languages } = useT();

  const [query, setQuery] = useState('');
  const [province, setProvince] = useState('Toda Espana');

  const handleSearch = () => {
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set('q', query.trim());
    if (province !== 'Toda Espana') params.set('prov', province);
    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleNav = (path) => {
    if (path === '/chat') {
      showToast(t('comingSoon'));
      return;
    }
    navigate(path);
  };

  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

  const handleAdmin = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      showToast(t('admin.wrong'));
    }
  };

  const handlePublish = () => {
    navigate('/publish');
  };

  return (
    <header className={`header ${isAdmin ? 'has-admin' : ''}`}>
      {isAdmin && (
        <div className="admin-bar">
          <span>Admin · {t('admin.adminMode')}</span>
          <button onClick={() => navigate('/admin')}>{t('admin.panel')}</button>
          <button onClick={() => signOut()}>{t('admin.exit')}</button>
        </div>
      )}
      <div className="header-main container">
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          OL·XIN <span className="pill">{lang === 'es' ? 'ESPANA' : lang === 'ca' ? 'ESPANYA' : lang === 'uk' ? 'ISPANIYA' : lang === 'ru' ? 'ISPANIYA' : 'SPAIN'}</span>
        </a>

        <div className="search-box">
          <input
            type="text"
            placeholder={t('home.seeMore')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search"
          />
          <select value={province} onChange={(e) => setProvince(e.target.value)} aria-label="Province">
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button onClick={handleSearch} aria-label="Search">🔍</button>
        </div>

        <div className="header-actions">
          <select className="lang-select" value={lang} onChange={handleLangChange} aria-label="Language">
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>

          <button onClick={() => handleNav('/chat')} aria-label={t('nav.chat')} title={t('nav.chat')}>
            💬
            <span className="badge-count">2</span>
          </button>

          <button onClick={() => handleNav('/my-ads')} aria-label={t('nav.myAds')} title={t('nav.myAds')}>
            📋
          </button>

          <button onClick={() => navigate('/favorites')} aria-label={t('nav.favorites')} title={t('nav.favorites')}>
            ❤
            {favoritesCount > 0 && <span className="badge-count">{favoritesCount}</span>}
          </button>

          {user && (
            <button onClick={handleAdmin} aria-label={t('nav.admin')} title={t('nav.admin')}>
              🔐
            </button>
          )}

          <button
            className="btn primary"
            onClick={handlePublish}
            style={{ padding: '8px 16px', fontSize: 14 }}
          >
            <span className="hide-mobile">+ {t('nav.publish')}</span>
            <span className="show-mobile">+</span>
          </button>
        </div>
      </div>
    </header>
  );
}
