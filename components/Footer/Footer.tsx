import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>

        <div className={css.wrap}>
          <p>Developed by Serhii Taran</p>
          <p>
            Contact:{' '}
            <a href="mailto:serg.taran1970@gmail.com">
              serg.taran1970@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
