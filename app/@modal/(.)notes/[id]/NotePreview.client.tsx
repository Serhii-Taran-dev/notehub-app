'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';

import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

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
      <Modal onClose={handleClose} ariaLabel="Note preview">
        <p role="status">Loading note details…</p>
      </Modal>
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
    <Modal onClose={handleClose} ariaLabel={`Preview of ${note.title}`}>
      <div className={css.container}>
        <article className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            Created: <time dateTime={note.createdAt}>{formattedDate} UTC</time>
          </p>

          <button type="button" className={css.backBtn} onClick={handleClose}>
            Go back
          </button>
        </article>
      </div>
    </Modal>
  );
}
