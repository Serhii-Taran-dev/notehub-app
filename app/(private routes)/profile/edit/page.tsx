'use client';

import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';
import toast from 'react-hot-toast';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

import css from './EditProfilePage.module.css';

interface ApiErrorResponse {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
}

interface EditProfileFormProps {
  user: User;
}

function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState(user.username);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const normalizedUsername = username.trim();

    if (!normalizedUsername) {
      toast.error('Username is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedUser = await updateMe({
        username: normalizedUsername,
      });

      setUser(updatedUser);
      toast.success('Profile updated successfully.');
      router.replace('/profile');
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        toast.error(
          error.response?.data.response?.message ??
            error.response?.data.message ??
            error.response?.data.error ??
            'Failed to update profile'
        );
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.glow} aria-hidden="true" />

      <section className={css.profileCard} aria-labelledby="edit-profile-title">
        <div className={css.heading}>
          <p className={css.eyebrow}>Account settings</p>

          <h1 className={css.title} id="edit-profile-title">
            Edit your profile
          </h1>

          <p className={css.description}>
            Update how your name appears across your NoteHub workspace.
          </p>
        </div>

        <form
          className={css.form}
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
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

            <p className={css.avatarNote}>
              Your avatar is connected to your account.
            </p>
          </div>

          <div className={css.fields}>
            <div className={css.formGroup}>
              <label htmlFor="username">Username</label>

              <input
                id="username"
                type="text"
                name="username"
                className={css.input}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                disabled={isSubmitting}
                required
              />

              <p className={css.fieldHint}>
                This name will be displayed on your profile.
              </p>
            </div>

            <div className={css.readOnlyField}>
              <span className={css.readOnlyLabel}>Email address</span>
              <span className={css.readOnlyValue}>{user.email}</span>
              <span className={css.readOnlyBadge}>Verified</span>
            </div>
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving changes...' : 'Save changes'}
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.glow} aria-hidden="true" />

        <div className={css.loadingCard} role="status" aria-live="polite">
          <div className={css.loadingHeader}>
            <span />
            <span />
            <span />
          </div>

          <div className={css.loadingContent}>
            <span className={css.loadingAvatar} />

            <div className={css.loadingFields}>
              <span />
              <span />
            </div>
          </div>

          <span className={css.visuallyHidden}>Loading profile...</span>
        </div>
      </main>
    );
  }

  return <EditProfileForm user={user} />;
}
