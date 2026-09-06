import type { ElementType, ReactNode } from 'react';

import css from './SystemState.module.css';

interface SystemStateProps {
  variant: 'error' | 'not-found' | 'loading';
  eyebrow: string;
  title: string;
  description: string;
  headingLevel?: 'h1' | 'h2';
  compact?: boolean;
  children?: ReactNode;
}

export default function SystemState({
  variant,
  eyebrow,
  title,
  description,
  headingLevel = 'h1',
  compact = false,
  children,
}: SystemStateProps) {
  const Heading = headingLevel as ElementType;
  const Wrapper = compact ? 'section' : 'main';

  return (
    <Wrapper
      className={`${css.screen} ${compact ? css.compact : ''}`}
      role={variant === 'error' ? 'alert' : undefined}
      aria-live={variant === 'loading' ? 'polite' : undefined}
    >
      {!compact && <div className={css.glow} aria-hidden="true" />}

      <div className={css.card}>
        <div
          className={`${css.icon} ${
            variant === 'error'
              ? css.errorIcon
              : variant === 'not-found'
                ? css.notFoundIcon
                : css.loadingIcon
          }`}
          aria-hidden="true"
        >
          {variant === 'error' && (
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 8v5M12 17h.01" />
              <path d="M10.3 3.8 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.8a2 2 0 0 0-3.4 0Z" />
            </svg>
          )}

          {variant === 'not-found' && (
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4M9 9l4 4M13 9l-4 4" />
            </svg>
          )}

          {variant === 'loading' && <span />}
        </div>

        <p className={css.eyebrow}>{eyebrow}</p>
        <Heading className={css.title}>{title}</Heading>
        <p className={css.description}>{description}</p>

        {children && <div className={css.actions}>{children}</div>}
      </div>
    </Wrapper>
  );
}
