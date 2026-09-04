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
    mutation.mutate(id);
  };

  return (
    <div className={css.listWrapper}>
      <ul className={css.list}>
        {notes.map((note) => {
          const isDeleting =
            mutation.isPending && mutation.variables === note.id;

          return (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>

              <p className={css.content}>{note.content}</p>

              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>

                <div className={css.actions}>
                  <Link href={`/notes/${note.id}`} className={css.link}>
                    View details
                  </Link>

                  <button
                    type="button"
                    className={css.button}
                    aria-label={`Delete note ${note.title}`}
                    aria-busy={isDeleting}
                    onClick={() => handleDelete(note.id)}
                    disabled={mutation.isPending}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
