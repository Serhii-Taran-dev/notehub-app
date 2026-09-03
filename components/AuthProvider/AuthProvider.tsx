'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, type ReactNode } from 'react';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const {
    data: user,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const isSessionValid = await checkSession();

      if (!isSessionValid) {
        return null;
      }

      return getMe();
    },
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    }

    if (isError) {
      clearIsAuthenticated();
    }
  }, [user, isSuccess, isError, setUser, clearIsAuthenticated]);

  return children;
}
