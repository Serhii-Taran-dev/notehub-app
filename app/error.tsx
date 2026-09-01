'use client';

import { useEffect } from 'react';

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <div role="alert">
        <h2>Something went wrong</h2>
        <p>An unexpected error occurred. Please try again.</p>

        <button type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
