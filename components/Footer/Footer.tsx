import Link from 'next/link';

import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <div className={css.brand}>
          <Link className={css.logo} href="/" aria-label="NoteHub home">
            Note<span>Hub</span>
          </Link>

          <p className={css.copyright}>
            © {new Date().getFullYear()} NoteHub. All rights reserved.
          </p>
        </div>

        <div className={css.details}>
          <p>
            Developed by <span>Serhii Taran</span>
          </p>

          <a className={css.contact} href="mailto:serg.taran1970@gmail.com">
            serg.taran1970@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
