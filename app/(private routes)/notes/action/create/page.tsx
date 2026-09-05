import type { Metadata } from 'next';

import NoteForm from '@/components/NoteForm/NoteForm';

import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note',
  description:
    'Create a new note, add its content, and organize it with a tag in NoteHub.',
  openGraph: {
    title: 'Create note | NoteHub',
    description:
      'Create a new note, add its content, and organize it with a tag in NoteHub.',
    url: 'https://notehub-app-plum.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create a new note in NoteHub',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.glow} aria-hidden="true" />

      <section className={css.container} aria-labelledby="create-note-title">
        <div className={css.heading}>
          <p className={css.eyebrow}>Notes workspace</p>

          <h1 className={css.title} id="create-note-title">
            Create a new note
          </h1>

          <p className={css.description}>
            Capture an idea, add the details, and choose a category to keep it
            organized.
          </p>
        </div>

        <NoteForm />
      </section>
    </main>
  );
}
