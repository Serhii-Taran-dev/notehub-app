'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { deleteNote } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const tagClasses: Record<string, string> = {
  Todo: css.todoTag,
  Work: css.workTag,
  Personal: css.personalTag,
  Meeting: css.meetingTag,
  Shopping: css.shoppingTag,
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return dateFormatter.format(parsedDate);
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: async () => {
      toast.success('Note deleted');

      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },

    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  const handleDelete = (id: string) => {
    if (mutation.isPending) {
      return;
    }

    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeleting = mutation.isPending && mutation.variables === note.id;

        const tagClass = tagClasses[note.tag] ?? css.defaultTag;
        const updatedDate = formatDate(note.updatedAt);

        return (
          <li key={note.id} className={css.listItem}>
            <article className={css.card}>
              <div className={css.cardHeader}>
                <span className={`${css.tag} ${tagClass}`}>{note.tag}</span>

                {updatedDate && (
                  <time className={css.date} dateTime={note.updatedAt}>
                    {updatedDate}
                  </time>
                )}
              </div>

              <div className={css.cardContent}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
              </div>

              <div className={css.cardFooter}>
                <Link href={`/notes/${note.id}`} className={css.detailsLink}>
                  View note
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M14 7l5 5-5 5" />
                  </svg>
                </Link>

                <button
                  type="button"
                  className={css.deleteButton}
                  aria-label={`Delete note ${note.title}`}
                  aria-busy={isDeleting}
                  onClick={() => handleDelete(note.id)}
                  disabled={mutation.isPending}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" />
                  </svg>

                  <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
