import type { ElementType, ReactNode } from 'react';

import type { Note } from '@/types/note';

import css from './NoteView.module.css';

interface NoteViewProps {
  note: Note;
  headingLevel: 'h1' | 'h2';
  variant: 'page' | 'modal';
  actions?: ReactNode;
}

const tagClasses: Record<string, string> = {
  Todo: css.todoTag,
  Work: css.workTag,
  Personal: css.personalTag,
  Meeting: css.meetingTag,
  Shopping: css.shoppingTag,
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
});

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return dateFormatter.format(parsedDate);
}

export default function NoteView({
  note,
  headingLevel,
  variant,
  actions,
}: NoteViewProps) {
  const Heading = headingLevel as ElementType;

  const createdDate = formatDate(note.createdAt);
  const updatedDate = formatDate(note.updatedAt);
  const wasUpdated =
    note.updatedAt &&
    note.updatedAt !== note.createdAt &&
    updatedDate !== createdDate;

  const tagClass = tagClasses[note.tag] ?? css.defaultTag;

  return (
    <article
      className={`${css.note} ${
        variant === 'page' ? css.pageVariant : css.modalVariant
      }`}
    >
      <header className={css.header}>
        <p className={css.eyebrow}>Note details</p>
        <Heading className={css.title}>{note.title}</Heading>
      </header>

      <div className={css.metadata}>
        <span className={`${css.tag} ${tagClass}`}>{note.tag}</span>

        <div className={css.dates}>
          {createdDate && (
            <p>
              <span>Created</span>
              <time dateTime={note.createdAt}>{createdDate} UTC</time>
            </p>
          )}

          {wasUpdated && (
            <p>
              <span>Updated</span>
              <time dateTime={note.updatedAt}>{updatedDate} UTC</time>
            </p>
          )}
        </div>
      </div>

      <div className={css.divider} />

      <div className={css.content}>
        {note.content ? (
          <p>{note.content}</p>
        ) : (
          <p className={css.emptyContent}>
            This note doesn’t have any content yet.
          </p>
        )}
      </div>

      {actions && <footer className={css.actions}>{actions}</footer>}
    </article>
  );
}
