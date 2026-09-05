'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/clientApi';

import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

const subscribeToHydration = () => () => {};

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );

  const requestedPage = Number(searchParams.get('page'));

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const search = searchParams.get('search')?.trim() ?? '';

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: (previousData) => previousData,
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

  if (isError) {
    throw error;
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  const title = tag ? `${tag} notes` : 'All notes';
  const isUpdating = isHydrated && isFetching && !isLoading;

  return (
    <main className={css.wrapper}>
      <header className={css.pageHeader}>
        <div>
          <p className={css.eyebrow}>Notes workspace</p>
          <h1 className={css.title}>{title}</h1>

          <p className={css.description}>
            Capture ideas, organize your thoughts, and find what matters.
          </p>
        </div>

        {!isLoading && (
          <div className={css.summary}>
            <span>{notes.length}</span>
            {notes.length === 1 ? 'note on this page' : 'notes on this page'}
          </div>
        )}
      </header>

      <div className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} initialValue={search} />

        <Link href="/notes/action/create" className={css.createButton}>
          <span aria-hidden="true">+</span>
          New note
        </Link>
      </div>

      {isUpdating && (
        <p className={css.updatingStatus} role="status">
          Updating notes…
        </p>
      )}

      <section
        className={`${css.notes} ${isUpdating ? css.notesUpdating : ''}`}
        aria-label={title}
      >
        {isLoading ? (
          <div className={css.loadingGrid} role="status" aria-live="polite">
            {Array.from({ length: 6 }, (_, index) => (
              <div className={css.loadingCard} key={index}>
                <span className={css.loadingTag} />
                <span className={css.loadingTitle} />
                <span className={css.loadingLine} />
                <span className={css.loadingLine} />
                <span className={css.loadingShortLine} />
              </div>
            ))}

            <span className={css.visuallyHidden}>Loading notes...</span>
          </div>
        ) : notes.length === 0 ? (
          <div className={css.empty}>
            <div className={css.emptyIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 3h7l4 4v14H7V3Z" />
                <path d="M14 3v5h5M10 13h5M10 17h4" />
              </svg>
            </div>

            <h2>{search ? 'No matching notes' : 'No notes yet'}</h2>

            <p>
              {search
                ? `We couldn’t find notes matching “${search}”.`
                : 'Create your first note and start building your workspace.'}
            </p>

            {!search && (
              <Link href="/notes/action/create" className={css.emptyAction}>
                Create your first note
              </Link>
            )}
          </div>
        ) : (
          <NoteList notes={notes} />
        )}
      </section>

      {!isLoading && totalPages > 1 && (
        <div className={css.paginationWrapper}>
          <p className={css.pageIndicator}>
            Page {page} of {totalPages}
          </p>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={updatePage}
          />
        </div>
      )}
    </main>
  );
}
