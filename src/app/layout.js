import clsx from 'clsx';
import {
  Spline_Sans_Mono,
  Work_Sans,
} from 'next/font/google';

import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import { cookies } from 'next/headers';


import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

function RootLayout({ children }) {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';
  const themeColors = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={themeColors}
    >
      <Providers>
        <body>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}

export default RootLayout;
