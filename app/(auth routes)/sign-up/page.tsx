'use client';

import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';

import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import { useQueryClient } from '@tanstack/react-query';

import css from './SignUpPage.module.css';

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
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            autoComplete="email"
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
            autoComplete="new-password"
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>

        <p className={css.error} role="alert" aria-live="polite">
          {error}
        </p>
      </form>
    </main>
  );
}
