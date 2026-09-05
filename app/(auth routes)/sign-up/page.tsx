'use client';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';

import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from '../AuthForm.module.css';

interface ApiErrorResponse {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
}

export default function SignUpPage() {
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
      const user = await register({ email, password });

      queryClient.setQueryData(['auth', 'session'], user);
      setUser(user);
      router.replace('/profile');
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        setError(
          error.response?.data.response?.message ??
            error.response?.data.message ??
            error.response?.data.error ??
            'Registration failed'
        );
      } else {
        setError('Registration failed');
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
          <p className={css.eyebrow}>Start organizing</p>
          <h1 className={css.formTitle}>Create your account</h1>

          <p className={css.description}>
            Build a private workspace for your ideas, plans, and everyday notes.
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
              placeholder="Create a secure password"
              autoComplete="new-password"
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </div>

        <p className={css.error} role="alert" aria-live="polite">
          {error}
        </p>

        <p className={css.switchText}>
          Already have an account?{' '}
          <Link className={css.switchLink} href="/sign-in" prefetch={false}>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
