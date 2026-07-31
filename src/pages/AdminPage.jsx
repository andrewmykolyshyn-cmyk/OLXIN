/**
 * Admin Page
 * Admin-only panel with tabs: Site, Categories, Ads, Pricing.
 * Edits site_settings and listings directly via Supabase.
 * Guarded by ProtectedRoute with adminOnly.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import {
  getSiteSettings,
  updateSiteSettings,
  getAllListings,
  adminUpdateListing,
  adminDeleteListing,
} from '@/lib/api';
import { showToast } from '@/components/Toast';
import Spinner from '@/components/Spinner';

const TABS = ['site', 'categories', 'ads', 'pricing'];

export default function AdminPage({ categories: propCategories }) {
  const navigate = useNavigate();
  const { t } = useT();
  const { signOut } = useAuth();

  const [tab, setTab] = useState('site');
  const [settings, setSettings] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [siteName, setSiteName] = useState('');
  const [siteColor, setSiteColor] = useState('');
  const [feeCents, setFeeCents] = useState(100);
  const [catList, setCatList] = useState([]);
  const [newCatIcon, setNewCatIcon] = useState('');
  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [settingsData, listingsData] = await Promise.all([
          getSiteSettings(),
          getAllListings(),
        ]);
        setSettings(settingsData);
        setSiteName(settingsData?.name || 'OLXIN');
        setSiteColor(settingsData?.color || '#002f34');
        setFeeCents(settingsData?.fee_cents || 100);
        setCatList(settingsData?.categories || []);
        setListings(listingsData);
      } catch (err) {
        console.error(err);
        showToast(t('errors.generic'), 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [t]);

  const handleSaveSite = async () => {
    setSaving(true);
    try {
      await updateSiteSettings({ name: siteName, color: siteColor });
      // Update CSS variable live
      document.documentElement.style.setProperty('--petrol', siteColor);
      showToast(t('admin.saved'), 'success');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePricing = async () => {
    setSaving(true);
    try {
      await updateSiteSettings({ fee_cents: parseInt(feeCents, 10) });
      showToast(t('admin.saved'), 'success');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCategory = (index, field, value) => {
    const updated = [...catList];
    updated[index] = { ...updated[index], [field]: value };
    setCatList(updated);
  };

  const handleDeleteCategory = (index) => {
    setCatList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    if (!newCatIcon || !newCatName) return;
    const id = newCatName.toLowerCase().replace(/\s+/g, '-').slice(0, 20);
    setCatList((prev) => [...prev, { id, ic: newCatIcon, order: prev.length + 1 }]);
    setNewCatIcon('');
    setNewCatName('');
  };

  const handleSaveCategories = async () => {
    setSaving(true);
    try {
      await updateSiteSettings({ categories: catList });
      showToast(t('admin.saved'), 'success');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateListing = async (id, updates) => {
    try {
      await adminUpdateListing(id, updates);
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
      );
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    }
  };

  const handleDeleteListing = async (id) => {
    if (!confirm('¿Eliminar este anuncio?')) return;
    try {
      await adminDeleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
      showToast('Anuncio eliminado', 'success');
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{t('admin.panel')}</h1>

      <div className="admin-tabs">
        {TABS.map((tKey) => (
          <button key={tKey} className={tab === tKey ? 'active' : ''} onClick={() => setTab(tKey)}>
            {t(`admin.${tKey}`)}
          </button>
        ))}
      </div>

      {/* Site Tab */}
      {tab === 'site' && (
        <div>
          <div className="form-group">
            <label>{t('admin.siteName')}</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('admin.primaryColor')}</label>
            <input type="color" value={siteColor} onChange={(e) => setSiteColor(e.target.value)} style={{ width: 60, height: 40, padding: 2 }} />
            <input type="text" value={siteColor} onChange={(e) => setSiteColor(e.target.value)} style={{ marginTop: 8 }} />
          </div>
          <button className="btn primary" onClick={handleSaveSite} disabled={saving}>
            {saving ? '...' : t('admin.save')}
          </button>
        </div>
      )}

      {/* Categories Tab */}
      {tab === 'categories' && (
        <div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icono</th>
                <th>ID</th>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {catList.map((cat, i) => (
                <tr key={cat.id}>
                  <td>
                    <input
                      value={cat.ic || ''}
                      onChange={(e) => handleUpdateCategory(i, 'ic', e.target.value)}
                      style={{ width: 50, textAlign: 'center' }}
                    />
                  </td>
                  <td>{cat.id}</td>
                  <td>
                    <input
                      value={t(`categories.${cat.id}`)}
                      onChange={() => {}}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>
                    <button className="btn ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleDeleteCategory(i)}>
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'flex-end' }}>
            <div className="form-group" style={{ margin: 0, flex: '0 0 60px' }}>
              <label>Icono</label>
              <input value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} placeholder="🆕" style={{ width: 60, textAlign: 'center' }} />
            </div>
            <div className="form-group" style={{ margin: 0, flex: 1 }}>
              <label>Nombre (ID auto)</label>
              <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Nueva categoria" />
            </div>
            <button className="btn primary" onClick={handleAddCategory} style={{ marginBottom: 16 }}>
              {t('admin.addCategory')}
            </button>
          </div>

          <button className="btn primary" onClick={handleSaveCategories} disabled={saving} style={{ marginTop: 16 }}>
            {saving ? '...' : t('admin.save')}
          </button>
        </div>
      )}

      {/* Ads Tab */}
      {tab === 'ads' && (
        <div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Precio</th>
                <th>Badge</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {l.title}
                  </td>
                  <td>{l.price} €</td>
                  <td>
                    <select
                      value={l.badge || ''}
                      onChange={(e) => handleUpdateListing(l.id, { badge: e.target.value })}
                    >
                      <option value="">—</option>
                      <option value="vip">VIP</option>
                      <option value="destacado">Destacado</option>
                      <option value="free">Gratis</option>
                    </select>
                  </td>
                  <td>{l.status}</td>
                  <td>
                    <button className="btn ghost" style={{ padding: '4px 10px', fontSize: 12, color: 'var(--coral)' }} onClick={() => handleDeleteListing(l.id)}>
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pricing Tab */}
      {tab === 'pricing' && (
        <div>
          <div className="form-group">
            <label>{t('admin.pricePerAd')} (€1.00 = 100)</label>
            <input
              type="number"
              value={feeCents}
              onChange={(e) => setFeeCents(e.target.value)}
              min={0}
              step={1}
            />
          </div>
          <button className="btn primary" onClick={handleSavePricing} disabled={saving}>
            {saving ? '...' : t('admin.save')}
          </button>
        </div>
      )}
    </div>
  );
}
