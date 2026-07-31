/**
 * Auth Page
 * Tabbed login/signup with email/password.
 * Optional Google OAuth. Redirects to ?next= after success.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { showToast } from '@/components/Toast';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useT();
  const { user, signIn, signUp, signInWithGoogle } = useAuth();

  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const next = searchParams.get('next') || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(next);
    }
  }, [user, navigate, next]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(next);
    } catch (err) {
      setError(err.message || t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(email, password, { name });
      setCheckEmail(true);
    } catch (err) {
      setError(err.message || t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || t('errors.generic'));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-tabs">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); setError(''); }}>
            {t('auth.signIn')}
          </button>
          <button className={tab === 'signup' ? 'active' : ''} onClick={() => { setTab('signup'); setError(''); }}>
            {t('auth.signUp')}
          </button>
        </div>

        {checkEmail ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <p>{t('auth.checkEmail')}</p>
            <button className="btn primary" style={{ marginTop: 16 }} onClick={() => { setCheckEmail(false); setTab('login'); }}>
              {t('auth.signIn')}
            </button>
          </div>
        ) : (
          <>
            {tab === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>{t('auth.email')}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('auth.password')}</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <div className="form-error" style={{ marginBottom: 12 }}>{error}</div>}
                <button type="submit" className="btn primary full" disabled={loading}>
                  {loading ? '...' : t('auth.signIn')}
                </button>
                <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13 }}>
                  {t('auth.noAccount')}{' '}
                  <button type="button" style={{ background: 'none', border: 'none', color: 'var(--teal-ink)', cursor: 'pointer', fontWeight: 700 }} onClick={() => setTab('signup')}>
                    {t('auth.signUp')}
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label>{t('auth.name')}</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('auth.email')}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>{t('auth.password')}</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
                {error && <div className="form-error" style={{ marginBottom: 12 }}>{error}</div>}
                <button type="submit" className="btn primary full" disabled={loading}>
                  {loading ? '...' : t('auth.createAccount')}
                </button>
                <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13 }}>
                  {t('auth.hasAccount')}{' '}
                  <button type="button" style={{ background: 'none', border: 'none', color: 'var(--teal-ink)', cursor: 'pointer', fontWeight: 700 }} onClick={() => setTab('login')}>
                    {t('auth.signIn')}
                  </button>
                </p>
              </form>
            )}

            <div style={{ textAlign: 'center', margin: '20px 0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--line)' }} />
              <span style={{ position: 'relative', background: 'var(--card)', padding: '0 12px', color: 'var(--muted)', fontSize: 12 }}>o</span>
            </div>

            <button className="btn ghost full" onClick={handleGoogle}>
              🔍 {t('auth.google')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
