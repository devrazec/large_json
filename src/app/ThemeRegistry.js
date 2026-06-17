'use client';

import { useContext, useEffect, useMemo } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { createAppTheme } from '../theme';
import { GlobalContext } from './context/GlobalContext';

export default function ThemeRegistry({ children }) {
  const { darkMode, setMobileDevice } = useContext(GlobalContext);

  const theme = useMemo(
    () => createAppTheme(darkMode ? 'dark' : 'light'),
    [darkMode]
  );
  const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setMobileDevice(isMobileDevice);
  }, [isMobileDevice, setMobileDevice]);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
