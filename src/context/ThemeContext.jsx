/**
 * OLXIN Theme Context
 * Manages site theming: primary color override from admin settings.
 * Also handles dark mode preference detection (no toggle, just system).
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteSettings } from '@/lib/api';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    name: 'OLXIN',
    color: '#002f34',
  });

  // Load site settings on mount
  useEffect(() => {
    getSiteSettings()
      .then((settings) => {
        if (settings) {
          setTheme({
            name: settings.name || 'OLXIN',
            color: settings.color || '#002f34',
          });
        }
      })
      .catch(() => {
        // Silently fail - use defaults
      });
  }, []);

  // Apply CSS variable when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty('--petrol', theme.color);
  }, [theme.color]);

  const updateTheme = (updates) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  const value = { theme, updateTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
