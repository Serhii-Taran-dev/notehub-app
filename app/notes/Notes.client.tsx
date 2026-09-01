'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from './Notes.module.css';

export default function NotesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const requestedPage = Number(searchParams.get('page'));

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const search = searchParams.get('search')?.trim() ?? '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
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

        <button type="button" className={css.createButton} onClick={openModal}>
          Create Note +
        </button>
      </div>

      <div className={css.notes}>
        {notes.length === 0 ? (
          <p className={css.empty}>No notes found</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>

      {isOpen && (
        <Modal onClose={closeModal} ariaLabel="Create note">
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </main>
  );
}
