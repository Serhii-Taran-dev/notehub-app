import type { Metadata } from 'next';

import css from './not-found.module.css';

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
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>

        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
