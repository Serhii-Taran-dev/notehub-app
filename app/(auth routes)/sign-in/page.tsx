'use client';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from '../AuthForm.module.css';

interface ApiErrorResponse {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
}

export default function SignInPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    setError('');
    setIsSubmitting(true);

    try {
      const user = await login({ email, password });

      queryClient.setQueryData(['auth', 'session'], user);
      setUser(user);
      router.replace('/profile');
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        setError(
          error.response?.data.response?.message ??
            error.response?.data.message ??
            error.response?.data.error ??
            'Login failed'
        );
      } else {
        setError('Login failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form
        className={css.form}
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
      >
        <div className={css.heading}>
          <p className={css.eyebrow}>Welcome back</p>
          <h1 className={css.formTitle}>Continue to NoteHub</h1>

          <p className={css.description}>
            Sign in to access your notes and continue where you left off.
          </p>
        </div>

        <div className={css.fields}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <p className={css.error} role="alert" aria-live="polite">
          {error}
        </p>

        <p className={css.switchText}>
          New to NoteHub?{' '}
          <Link className={css.switchLink} href="/sign-up" prefetch={false}>
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
