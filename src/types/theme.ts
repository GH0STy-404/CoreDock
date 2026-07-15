export interface ColorPalette {
  bgBase: string;
  bgSurface: string;
  bgGlass: string;
  borderPrimary: string;
  borderGlass: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  brandAccent: string;
  brandPrimary: string;
  gridLine: string;
}

export interface DesignTheme {
  mode: 'dark' | 'light';
  colors: ColorPalette;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  transition: {
    fast: string;
    normal: string;
    slow: string;
  };
}
