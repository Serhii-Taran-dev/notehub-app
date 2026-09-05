import type { ReactNode } from 'react';

import css from './LayoutNotes.module.css';

interface NotesFilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function NotesFilterLayout({
  children,
  sidebar,
}: NotesFilterLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar} aria-label="Note filters">
        {sidebar}
      </aside>

      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
