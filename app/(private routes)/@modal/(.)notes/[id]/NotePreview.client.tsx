'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Modal from '@/components/Modal/Modal';
import NoteView from '@/components/NoteView/NoteView';
import { fetchNoteById } from '@/lib/api/clientApi';

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
        <div className={css.loading} role="status" aria-live="polite">
          <span className={css.loadingEyebrow} />
          <span className={css.loadingTitle} />
          <span className={css.loadingTag} />
          <span className={css.loadingLine} />
          <span className={css.loadingLine} />
          <span className={css.loadingShortLine} />

          <span className={css.visuallyHidden}>Loading note details…</span>
        </div>
      </Modal>
    );
  }

  if (isError) {
    throw error;
  }

  if (!note) {
    throw new Error('Note not found');
  }

  return (
    <Modal onClose={handleClose} ariaLabel={`Preview of ${note.title}`}>
      <NoteView
        note={note}
        headingLevel="h2"
        variant="modal"
        actions={
          <button
            type="button"
            className={css.closeAction}
            onClick={handleClose}
          >
            Back to notes
          </button>
        }
      />
    </Modal>
  );
}
