import type { CreateNoteDto, FetchNotesResponse, Note } from '@/types/note';

import { api } from './client';

export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);

  if (!response.data?.id) {
    throw new Error('Note not found');
  }

  return response.data;
};
