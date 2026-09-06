'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import Modal from '@/components/Modal/Modal';
import SystemState from '@/components/SystemState/SystemState';

interface NotePreviewErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotePreviewError({
  error,
  reset,
}: NotePreviewErrorProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Modal onClose={handleClose} ariaLabel="Unable to load note">
      <SystemState
        variant="error"
        eyebrow="Note preview"
        title="Unable to load note"
        description="The note preview could not be loaded. Please try again or return to your notes."
        headingLevel="h2"
        compact
      >
        <button type="button" onClick={reset}>
          Try again
        </button>

        <button type="button" onClick={handleClose}>
          Back to notes
        </button>
      </SystemState>
    </Modal>
  );
}
