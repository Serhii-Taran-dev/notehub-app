import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'NoteHub',
    template: '%s | NoteHub',
  },
  description:
    'A modern application for creating, organizing, and managing notes.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
