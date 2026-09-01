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

  return (
    <input
      className={css.input}
      type="search"
      name="search"
      aria-label="Search notes"
      placeholder="Search notes..."
      autoComplete="off"
      value={query}
      onChange={handleChange}
    />
  );
}
