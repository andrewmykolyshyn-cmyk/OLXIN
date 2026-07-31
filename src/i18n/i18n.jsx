/**
 * OLXIN I18n Context & Hook
 * Hand-rolled dictionary approach (no external i18n lib).
 * Language persisted in localStorage.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LANGUAGES, getString } from './strings';

const I18nContext = createContext(null);

const STORAGE_KEY = 'olxin-lang';

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.some(l => l.code === saved)) return saved;
  } catch { /* localStorage unavailable */ }
  // Detect browser language
  const browser = navigator.language?.slice(0, 2);
  if (LANGUAGES.some(l => l.code === browser)) return browser;
  return 'es'; // default
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  // Persist language changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch { /* ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    if (LANGUAGES.some(l => l.code === code)) {
      setLangState(code);
    }
  }, []);

  // t(key) returns the translated string for current language
  const t = useCallback((key) => {
    return getString(key, lang);
  }, [lang]);

  const value = { lang, setLang, t, languages: LANGUAGES };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used within I18nProvider');
  return ctx;
}
