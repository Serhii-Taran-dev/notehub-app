'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import SystemState from '@/components/SystemState/SystemState';

interface NotesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotesError({ error, reset }: NotesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SystemState
      variant="error"
      eyebrow="Notes workspace"
      title="Unable to load notes"
      description="Something went wrong while loading your notes. Check your connection and try again."
    >
      <button type="button" onClick={reset}>
        Try again
      </button>

      <Link href="/">Go home</Link>
    </SystemState>
  );
}
