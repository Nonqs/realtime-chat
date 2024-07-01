import { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: amber[500],
      ...(mode === 'dark' && {
        main: amber[300],
      }),
    },
    background: {
      ...(mode === 'dark'
        ? {
            default: '#1a202c', // Gray 900
            paper: '#2d3748', // Gray 800
          }
        : {
            default: '#f7fafc', // Gray 50
            paper: '#ffffff', // White
          }),
    },
    text: {
      ...(mode === 'light'
        ? {
            primary: '#1a202c', // Gray 900
            secondary: '#4a5568', // Gray 700
          }
        : {
            primary: '#edf2f7', // Gray 200
            secondary: '#a0aec0', // Gray 400
          }),
    },
  },
});

const ThemeContext = createContext()

export const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState('light')

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
