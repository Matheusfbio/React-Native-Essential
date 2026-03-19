import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [accentColor, setAccentColorState] = useState('#4f46e5');
  const systemColorScheme = useSystemColorScheme();

  const colorScheme = theme === 'system' ? (systemColorScheme ?? 'light') : theme;

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [savedTheme, savedAccent] = await Promise.all([
        AsyncStorage.getItem('theme'),
        AsyncStorage.getItem('accentColor'),
      ]);
      if (savedTheme) setTheme(savedTheme as Theme);
      if (savedAccent) setAccentColorState(savedAccent);
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const handleSetTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const handleSetAccentColor = async (color: string) => {
    try {
      await AsyncStorage.setItem('accentColor', color);
      setAccentColorState(color);
    } catch (error) {
      console.log('Error saving accent color:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setTheme: handleSetTheme, accentColor, setAccentColor: handleSetAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}