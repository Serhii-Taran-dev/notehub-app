'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { createNote } from '@/lib/api/clientApi';
import { useNoteStore } from '@/lib/store/noteStore';
import type { CreateNoteDto } from '@/types/note';

import css from './NoteForm.module.css';

const noteTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      toast.success('Note created');
      router.push('/notes/filter/all');
    },

    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const formAction = async (formData: FormData) => {
    const note: CreateNoteDto = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? '').trim(),
      tag: String(formData.get('tag') ?? ''),
    };

    if (note.title.length < 3) {
      toast.error('Title must contain at least 3 characters');
      return;
    }

    if (!noteTags.includes(note.tag)) {
      toast.error('Select a valid tag');
      return;
    }

    try {
      await mutation.mutateAsync(note);
    } catch {
      // The error notification is handled by mutation.onError.
    }
  };

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          name="title"
          type="text"
          minLength={3}
          maxLength={50}
          required
          defaultValue={draft.title}
          onChange={(event) => setDraft({ title: event.target.value })}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          name="content"
          rows={6}
          maxLength={500}
          defaultValue={draft.content}
          onChange={(event) => setDraft({ content: event.target.value })}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="note-tag">Tag</label>
        <select
          id="note-tag"
          name="tag"
          required
          defaultValue={draft.tag}
          onChange={(event) => setDraft({ tag: event.target.value })}
          className={css.select}
        >
          {noteTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
          disabled={mutation.isPending}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={css.submitButton}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
