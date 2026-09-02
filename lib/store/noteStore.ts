import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CreateNoteDto } from '@/types/note';

interface NoteStore {
  draft: CreateNoteDto;
  setDraft: (note: Partial<CreateNoteDto>) => void;
  clearDraft: () => void;
}

const initialDraft: CreateNoteDto = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-draft',
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);
