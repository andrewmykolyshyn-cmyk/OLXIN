/**
 * Not Found Page (404)
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '@/i18n/i18n';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useT();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('errors.notFound')}</p>
      <button className="btn primary" onClick={() => navigate('/')}>
        {t('errors.goHome')}
      </button>
    </div>
  );
}
