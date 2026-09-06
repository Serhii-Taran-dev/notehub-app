'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import SystemState from '@/components/SystemState/SystemState';

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
    <SystemState
      variant="error"
      eyebrow="Note details"
      title="Unable to load note"
      description="The note may no longer exist, or a connection error may have occurred."
    >
      <button type="button" onClick={reset}>
        Try again
      </button>

      <Link href="/notes/filter/all">Back to notes</Link>
    </SystemState>
  );
}
