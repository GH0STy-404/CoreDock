import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MotionContextProps {
  reducedMotion: boolean;
  activeAnimations: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const MotionContext = createContext<MotionContextProps | undefined>(undefined);

export const MotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeAnimations, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Detect OS reduced motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <MotionContext.Provider
      value={{
        reducedMotion,
        activeAnimations: activeAnimations && !reducedMotion,
        setAnimationsEnabled
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useAppMotion = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useAppMotion must be used within a MotionProvider');
  }
  return context;
};
