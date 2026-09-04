'use client';

import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/clientApi';

import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedPage = Number(searchParams.get('page'));

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const search = searchParams.get('search')?.trim() ?? '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: (prev) => prev,
  });

  const updatePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('page', String(newPage));

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const normalizedSearch = value.trim();
    const params = new URLSearchParams();

    if (normalizedSearch) {
      params.set('search', normalizedSearch);
    }

    params.set('page', '1');

    router.replace(`?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (data && data.totalPages > 0 && page > data.totalPages) {
      updatePage(data.totalPages);
    }
  }, [data, page, updatePage]);

  if (isLoading) {
    return (
      <main className={css.wrapper}>
        <p role="status">Loading notes...</p>
      </main>
    );
  }

  if (isError) {
    throw error;
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main className={css.wrapper}>
      <div className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} initialValue={search} />

        {totalPages > 1 && (
          <div className={css.center}>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={updatePage}
            />
          </div>
        )}

        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </div>

      <div className={css.notes}>
        {notes.length === 0 ? (
          <p className={css.empty}>No notes found</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
    </main>
  );
}
