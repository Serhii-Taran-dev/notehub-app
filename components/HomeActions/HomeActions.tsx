'use client';

import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';

import css from '@/app/Home.module.css';

export default function HomeActions() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return (
      <div className={css.actions} aria-hidden="true">
        <span className={css.actionSkeleton} />
        <span className={css.actionSkeleton} />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className={css.actions}>
        <Link className={css.primaryAction} href="/notes/filter/all">
          Open notes
        </Link>

        <Link className={css.secondaryAction} href="/profile">
          View profile
        </Link>
      </div>
    );
  }

  return (
    <div className={css.actions}>
      <Link className={css.primaryAction} href="/sign-up" prefetch={false}>
        Create account
      </Link>

      <Link className={css.secondaryAction} href="/sign-in" prefetch={false}>
        Sign in
      </Link>
    </div>
  );
}
