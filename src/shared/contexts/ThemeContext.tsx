import { useState, useCallback, useMemo, useContext } from 'react';
import { createContext } from "react";
import { ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from "../themes";
import { Box } from '@mui/system';

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IThemeProviderProps {
  children: React.ReactNode;
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'dark' ? 'light' : 'dark');
  }, []);

  const theme = useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={DarkTheme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}