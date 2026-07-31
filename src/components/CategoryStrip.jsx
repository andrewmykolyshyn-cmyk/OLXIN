/**
 * Category Strip Component
 * Horizontally scrollable bar of category pills.
 * "Todo" (all) + all 16 categories.
 */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useT } from '@/i18n/i18n';

const CAT_ICONS = {
  motor: '🚗', motos: '🏍', inmo: '🏠', empleo: '💼', reformas: '🔨',
  electro: '📺', hogar: '🪑', moda: '👗', deporte: '⚽', bebes: '🍼',
  animales: '🐕', servicios: '🛠', coleccion: '🎮', agro: '🌾', gratis: '🎁', alquiler: '🔑',
};

export default function CategoryStrip({ categories }) {
  const navigate = useNavigate();
  const { catId } = useParams();
  const { t } = useT();

  const isActive = (id) => catId === id;

  const handleClick = (id) => {
    if (id === 'todo') {
      navigate('/');
    } else {
      navigate(`/c/${id}`);
    }
  };

  return (
    <nav className="category-strip" aria-label="Categories">
      <button
        className={`chip ${!catId ? 'on' : ''}`}
        onClick={() => handleClick('todo')}
      >
        Todo
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`chip ${isActive(cat.id) ? 'on' : ''}`}
          onClick={() => handleClick(cat.id)}
        >
          {CAT_ICONS[cat.id]} {t(`categories.${cat.id}`)}
        </button>
      ))}
    </nav>
  );
}
