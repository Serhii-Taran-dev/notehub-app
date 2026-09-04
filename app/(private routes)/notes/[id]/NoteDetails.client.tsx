'use client';

import { useQuery } from '@tanstack/react-query';

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
        <p role="status">Loading note details…</p>
      </main>
    );
  }

  if (isError) {
    throw error;
  }

  if (!note) {
    throw new Error('Note not found');
  }

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(note.createdAt));

  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.item}>
          <div className={css.header}>
            <h1>{note.title}</h1>
          </div>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            Created: <time dateTime={note.createdAt}>{formattedDate} UTC</time>
          </p>
        </article>
      </div>
    </main>
  );
}
