import { create } from 'zustand';

import type { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthReady: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isAuthReady: true,
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAuthReady: true,
    }),
}));
