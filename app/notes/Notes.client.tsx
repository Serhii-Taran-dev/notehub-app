"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./Notes.module.css";

export default function NotesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: (prev) => prev,
  });

  const updatePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", String(newPage));

      if (search) params.set("search", search);

      router.push(`?${params.toString()}`);
    },
    [searchParams, search, router],
  );

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams();

    if (value) params.set("search", value);

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (data && data.totalPages > 0 && page > data.totalPages) {
      updatePage(data.totalPages);
    }
  }, [data, page, updatePage]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    throw new Error("Failed to fetch notes");
  }

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.wrapper}>
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

        <button className={css.createButton} onClick={() => setIsOpen(true)}>
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
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
