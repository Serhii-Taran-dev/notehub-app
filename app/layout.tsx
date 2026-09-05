import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';

import './globals.css';

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin', 'cyrillic'],
});

const themeScript = `
  (() => {
    const storageKey = 'notehub-theme';
    let theme;

    try {
      const storedValue = localStorage.getItem(storageKey);
      const persistedState = storedValue ? JSON.parse(storedValue) : null;
      const savedTheme = persistedState?.state?.theme;

      if (savedTheme === 'light' || savedTheme === 'dark') {
        theme = savedTheme;
      }
    } catch {
  try {
    localStorage.removeItem(storageKey);
  } catch {}
}

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            state: { theme },
            version: 0,
          })
        );
      } catch {}
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;

export const metadata: Metadata = {
  title: {
    default: 'NoteHub',
    template: '%s | NoteHub',
  },
  description:
    'A modern application for creating, organizing, and managing notes.',
  openGraph: {
    title: 'NoteHub',
    description:
      'A modern application for creating, organizing, and managing notes.',
    url: 'https://notehub-app-plum.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub application preview',
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>

      <body className={`${manrope.className} ${manrope.variable}`}>
        <ThemeProvider>
          <TanStackProvider>
            <AuthProvider>
              <Header />
              <Toaster position="top-right" />
              {children}
              <Footer />
            </AuthProvider>
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
