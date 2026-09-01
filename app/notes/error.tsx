'use client';

import { useEffect } from 'react';

interface NotesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotesError({ error, reset }: NotesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <div role="alert">
        <h2>Unable to load notes</h2>
        <p>Something went wrong while loading your notes. Please try again.</p>

        <button type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
