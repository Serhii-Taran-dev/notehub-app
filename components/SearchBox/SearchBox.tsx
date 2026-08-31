"use client";

import { useState, useEffect } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchBox({
  onSearch,
  initialValue = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (query !== initialValue) {
      onSearch(query);
    }
  }, [query, initialValue, onSearch]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}
