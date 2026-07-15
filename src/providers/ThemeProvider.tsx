import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { THEME_CONFIG } from '../config/theme';
import { DesignTheme } from '../types/theme';

interface ThemeContextProps {
  themeMode: 'dark' | 'light';
  theme: DesignTheme;
  toggleTheme: (event?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      // Set backdrop styling
      root.style.backgroundColor = '#F8FAFC';
      root.style.color = '#0F172A';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      // Set backdrop styling
      root.style.backgroundColor = '#0A0A0A';
      root.style.color = '#FFFFFF';
    }
    localStorage.setItem('theme-mode', themeMode);
  }, [themeMode]);

  const isTransitioningRef = useRef(false);

  const toggleTheme = (event?: React.MouseEvent) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : window.innerHeight / 2;

    const root = window.document.documentElement;
    root.style.setProperty('--click-x', `${x}px`);
    root.style.setProperty('--click-y', `${y}px`);

    const doc = document as any;
    if (!doc.startViewTransition) {
      setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
      isTransitioningRef.current = false;
      return;
    }

    root.classList.add('theme-transitioning');
    const transition = doc.startViewTransition.call(document, () => {
      setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    });

    const cleanUp = () => {
      root.classList.remove('theme-transitioning');
      isTransitioningRef.current = false;
    };

    transition.finished.then(cleanUp).catch(cleanUp);
    setTimeout(cleanUp, 500);
  };

  const getThemeConfig = (): DesignTheme => {
    const lightColors = {
      bgBase: '#F8FAFC',
      bgSurface: '#FFFFFF',
      bgGlass: 'rgba(255, 255, 255, 0.85)',
      borderPrimary: '#CBD5E1',
      borderGlass: 'rgba(15, 23, 42, 0.12)',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B',
      brandPrimary: '#EA580C',
      brandAccent: '#F97316',
      gridLine: 'rgba(15, 23, 42, 0.03)'
    };

    const darkColors = THEME_CONFIG.colors;

    return {
      ...THEME_CONFIG,
      mode: themeMode,
      colors: themeMode === 'dark' ? darkColors : lightColors
    };
  };

  return (
    <ThemeContext.Provider value={{ themeMode, theme: getThemeConfig(), toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
