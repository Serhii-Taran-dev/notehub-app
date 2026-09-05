'use client';

import { useThemeStore } from '@/lib/store/themeStore';

import css from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      className={css.toggle}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <svg
        className={css.sunIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>

      <svg
        className={css.moonIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
      </svg>
    </button>
  );
}
