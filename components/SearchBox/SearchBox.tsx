'use client';

import { useEffect, useState, type ChangeEvent } from 'react';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchBox({
  onSearch,
  initialValue = '',
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={css.searchBox}>
      <svg
        className={css.searchIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>

      <input
        className={css.input}
        type="search"
        name="search"
        aria-label="Search notes"
        placeholder="Search your notes..."
        autoComplete="off"
        value={query}
        onChange={handleChange}
      />

      {query && (
        <button
          className={css.clearButton}
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
        </button>
      )}
    </div>
  );
}
