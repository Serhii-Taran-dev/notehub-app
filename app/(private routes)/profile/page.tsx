import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getMe } from '@/lib/api/serverApi';

import css from './ProfilePage.module.css';

const description =
  'View your NoteHub profile information and manage your account.';

export const metadata: Metadata = {
  title: 'Profile',
  description,
  openGraph: {
    title: 'Profile | NoteHub',
    description,
    url: 'https://notehub-app-plum.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub profile page',
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.glow} aria-hidden="true" />

      <section className={css.profileCard} aria-labelledby="profile-title">
        <div className={css.heading}>
          <div>
            <p className={css.eyebrow}>Account overview</p>

            <h1 className={css.title} id="profile-title">
              Your profile
            </h1>

            <p className={css.description}>
              Manage your personal information and continue to your notes.
            </p>
          </div>

          <span className={css.status}>
            <span aria-hidden="true" />
            Active account
          </span>
        </div>

        <div className={css.profileContent}>
          <div className={css.avatarSection}>
            <div className={css.avatarWrapper}>
              <Image
                src={user.avatar}
                alt={`${user.username} profile avatar`}
                width={128}
                height={128}
                className={css.avatar}
                priority
              />

              <span className={css.avatarBadge} aria-hidden="true">
                ✓
              </span>
            </div>

            <div className={css.identity}>
              <p className={css.username}>{user.username}</p>
              <p className={css.memberLabel}>NoteHub member</p>
            </div>
          </div>

          <dl className={css.profileInfo}>
            <div className={css.infoRow}>
              <dt>Username</dt>
              <dd>{user.username}</dd>
            </div>

            <div className={css.infoRow}>
              <dt>Email address</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </div>

        <div className={css.actions}>
          <Link
            href="/profile/edit"
            className={css.primaryAction}
            prefetch={false}
          >
            Edit profile
          </Link>

          <Link href="/notes/filter/all" className={css.secondaryAction}>
            Open notes
          </Link>
        </div>
      </section>
    </main>
  );
}
