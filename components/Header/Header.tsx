import Link from 'next/link';

import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.logo} href="/" aria-label="NoteHub home">
        Note<span>Hub</span>
      </Link>

      <nav className={css.nav} aria-label="Main navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>

          <AuthNavigation />

          <li className={css.themeItem}>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
