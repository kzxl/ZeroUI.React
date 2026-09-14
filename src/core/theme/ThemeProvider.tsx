import React, { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme, ZeroThemePalette } from './tokens';
import './theme.css';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  mode: ThemeMode;
  theme: ZeroThemePalette;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  theme: darkTheme,
  setMode: () => {},
  toggleTheme: () => {},
});

export interface ThemeProviderProps {
  initialMode?: ThemeMode;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialMode = 'dark',
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentTheme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, theme: currentTheme, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useZeroTheme = () => useContext(ThemeContext);
