'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import SystemState from '@/components/SystemState/SystemState';

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SystemState
      variant="error"
      eyebrow="Unexpected error"
      title="Something went wrong"
      description="We couldn’t complete your request. Please try again or return to the Home page."
    >
      <button type="button" onClick={reset}>
        Try again
      </button>

      <Link href="/">Go home</Link>
    </SystemState>
  );
}
