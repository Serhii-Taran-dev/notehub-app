import type { Metadata } from 'next';
import Link from 'next/link';

import SystemState from '@/components/SystemState/SystemState';

export const metadata: Metadata = {
  title: {
    absolute: '404 - Page not found | NoteHub',
  },
  description:
    'The requested page could not be found. Return to NoteHub to continue managing your notes.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description:
      'The requested page could not be found. Return to NoteHub to continue managing your notes.',
    url: 'https://notehub-app-plum.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub page not found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <SystemState
      variant="not-found"
      eyebrow="Error 404"
      title="Page not found"
      description="The page you’re looking for doesn’t exist or may have been moved."
    >
      <Link href="/">Go home</Link>
      <Link href="/notes/filter/all">Open notes</Link>
    </SystemState>
  );
}
