'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface NoteDetailsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteDetailsError({
  error,
  reset,
}: NoteDetailsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <div role="alert">
        <h2>Unable to load note</h2>

        <p>
          The note could not be loaded. It may no longer exist, or a connection
          error may have occurred.
        </p>

        <button type="button" onClick={reset}>
          Try again
        </button>

        <Link href="/notes">Back to notes</Link>
      </div>
    </main>
  );
}
