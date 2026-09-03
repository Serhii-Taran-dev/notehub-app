import { cookies } from 'next/headers';

import type { FetchNotesResponse, Note } from '@/types/note';
import type { User } from '@/types/user';

import api from './api';

interface SessionResponse {
  success: boolean;
}

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  return cookieStore.toString();
};

export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.data?.id) {
    throw new Error('Note not found');
  }

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const checkSession = async (): Promise<boolean> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<SessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data.success;
};
