import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../GlobalStyles';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeColors: {
    background: string;
    cardBackground: string;
    elevatedBackground: string;
    text: string;
    subText: string;
    divider: string;
    headerBg: string;
    icon: string;
    border: string;
    primary: string;
  };
};

const THEME_STORAGE_KEY = 'isDarkMode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'true');
        }
      } catch {
        // Ignore storage failures and keep the default theme.
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, String(isDarkMode));
      } catch {
        // Ignore storage failures; the UI can still function.
      }
    };

    saveTheme();
  }, [isDarkMode]);

  const themeColors = {
    background: isDarkMode ? "#121212" : Color.colorGainsboro || "#DDE3EB",
    cardBackground: isDarkMode ? "#1e1e1e" : Color.colorWhite,
    elevatedBackground: isDarkMode ? "#262626" : "#f7f9fc",
    text: isDarkMode ? "#ffffff" : Color.colorBlack,
    subText: isDarkMode ? "#c4c4c4" : "#5f6368",
    divider: isDarkMode ? "#353535" : "#d8dee8",
    headerBg: isDarkMode ? "#121212" : Color.colorGainsboro || "#DDE3EB",
    icon: isDarkMode ? "#ffffff" : Color.colorBlack,
    border: isDarkMode ? "#4a4a4a" : "#1f2937",
    primary: Color.colorRoyalblue,
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
