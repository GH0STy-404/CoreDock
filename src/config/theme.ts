import { DesignTheme } from '../types/theme';

export const THEME_CONFIG: DesignTheme = {
  mode: 'dark',
  colors: {
    bgBase: '#0A0A0A', // Matte Black
    bgSurface: '#121212', // Dark Grey Surface
    bgGlass: 'rgba(18, 18, 18, 0.85)',
    borderPrimary: '#27272A', // Zinc Border
    borderGlass: 'rgba(255, 255, 255, 0.05)',
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textMuted: '#52525B',
    brandPrimary: '#EA580C', // Safety Orange
    brandAccent: '#F97316',  // Accent Orange
    gridLine: 'rgba(255, 255, 255, 0.01)'
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px'
  },
  transition: {
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
};
