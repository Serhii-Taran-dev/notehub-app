import type { ReactNode } from 'react';

import css from './AuthLayout.module.css';

interface AuthRoutesLayoutProps {
  children: ReactNode;
}

export default function AuthRoutesLayout({ children }: AuthRoutesLayoutProps) {
  return (
    <div className={css.layout}>
      <div className={css.glowPrimary} aria-hidden="true" />
      <div className={css.glowSecondary} aria-hidden="true" />

      {children}
    </div>
  );
}
