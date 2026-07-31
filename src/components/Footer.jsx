/**
 * Footer Component
 * Four-column layout with links, province list, disclaimer.
 * All footer links are placeholders (toast or #).
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '@/i18n/i18n';
import { showToast } from './Toast';

export default function Footer() {
  const { t } = useT();
  const navigate = useNavigate();

  const handleLink = () => showToast(t('comingSoon'));

  const provinces = [
    'Alicante', 'Elche', 'Torrevieja', 'Benidorm', 'Madrid',
    'Barcelona', 'Valencia', 'Murcia', 'Sevilla', 'Malaga',
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>{t('footer.about')}</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.howToBuy')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.howToSell')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.paymentServices')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.forBusiness')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.shipping')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.blog')}</a>
        </div>

        <div className="footer-col">
          <h4>{t('footer.help')}</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.helpCenter')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.safety')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.terms')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.privacy')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.cookies')}</a>
        </div>

        <div className="footer-col">
          <h4>{t('footer.work')}</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.jobs')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.advertising')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.press')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.sitemap')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>{t('footer.contact')}</a>
        </div>

        <div className="footer-col">
          <h4>{t('footer.app')}</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>Google Play</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLink(); }}>App Store</a>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginTop: 8 }}>
            {t('footer.appNote')}
          </p>
        </div>
      </div>

      <div className="footer-province-list">
        {provinces.map((p) => (
          <a key={p} href="#" onClick={(e) => e.preventDefault()}>{p}</a>
        ))}
      </div>

      <div className="footer-bottom">
        © 2026 OLXIN · {t('footer.disclaimer')}
      </div>
    </footer>
  );
}
