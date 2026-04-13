import React, { createContext, useState, useContext, useEffect } from 'react';
import { Color } from '../GlobalStyles';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeColors: {
    background: string;
    cardBackground: string;
    text: string;
    subText: string;
    divider: string;
    headerBg: string;
    icon: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const themeColors = {
    background: isDarkMode ? "#121212" : Color.colorGainsboro || "#DDE3EB",
    cardBackground: isDarkMode ? "#1e1e1e" : Color.colorWhite,
    text: isDarkMode ? "#ffffff" : Color.colorBlack,
    subText: isDarkMode ? "#aaaaaa" : "#888",
    divider: isDarkMode ? "#333333" : "#f0f0f0",
    headerBg: isDarkMode ? "#121212" : Color.colorGainsboro || "#DDE3EB",
    icon: isDarkMode ? "#ffffff" : Color.colorBlack,
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
