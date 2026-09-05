'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import css from './SidebarNotes.module.css';

const filters = [
  {
    label: 'All notes',
    value: 'all',
  },
  {
    label: 'Todo',
    value: 'Todo',
  },
  {
    label: 'Work',
    value: 'Work',
  },
  {
    label: 'Personal',
    value: 'Personal',
  },
  {
    label: 'Meeting',
    value: 'Meeting',
  },
  {
    label: 'Shopping',
    value: 'Shopping',
  },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <div className={css.navigation}>
      <div className={css.heading}>
        <p className={css.eyebrow}>Workspace</p>
        <h2 className={css.title}>Filters</h2>
      </div>

      <ul className={css.menuList}>
        {filters.map((filter) => {
          const href = `/notes/filter/${filter.value}`;
          const isActive = pathname === href;

          return (
            <li key={filter.value} className={css.menuItem}>
              <Link
                href={href}
                className={`${css.menuLink} ${isActive ? css.activeLink : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={css.filterDot} aria-hidden="true" />
                <span>{filter.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
