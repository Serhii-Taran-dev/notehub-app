'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import NoteView from '@/components/NoteView/NoteView';
import { fetchNoteById } from '@/lib/api/clientApi';

import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <main className={css.main}>
        <div className={css.glow} aria-hidden="true" />

        <div className={css.loadingCard} role="status" aria-live="polite">
          <span className={css.loadingEyebrow} />
          <span className={css.loadingTitle} />
          <span className={css.loadingMeta} />
          <span className={css.loadingLine} />
          <span className={css.loadingLine} />
          <span className={css.loadingShortLine} />

          <span className={css.visuallyHidden}>Loading note details…</span>
        </div>
      </main>
    );
  }

  if (isError) {
    throw error;
  }

  if (!note) {
    throw new Error('Note not found');
  }

  return (
    <main className={css.main}>
      <div className={css.glow} aria-hidden="true" />

      <div className={css.container}>
        <NoteView
          note={note}
          headingLevel="h1"
          variant="page"
          actions={
            <Link href="/notes/filter/all" className={css.backLink}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M10 7l-5 5 5 5" />
              </svg>
              Back to notes
            </Link>
          }
        />
      </div>
    </main>
  );
}
