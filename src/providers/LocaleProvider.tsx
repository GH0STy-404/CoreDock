import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TranslationKeys } from '../types/translation';
import { en } from '../locales/en';
import { de } from '../locales/de';

type Locale = 'en' | 'de';

interface LocaleContextProps {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  };

  const getTranslationBundle = (): TranslationKeys => {
    switch (locale) {
      case 'de':
        return de;
      case 'en':
      default:
        return en;
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, t: getTranslationBundle(), setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }
  return context;
};
