import * as React from 'react';
import { GlobalProvider } from './context/GlobalContext';
import ThemeRegistry from './ThemeRegistry';

export const metadata = {
  title: 'Next.js',
  description: 'Application'
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <ThemeRegistry>{props.children}</ThemeRegistry>
        </GlobalProvider>
      </body>
    </html>
  );
}
