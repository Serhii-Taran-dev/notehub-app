import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>

        <p className={css.description}>
          NoteHub is a simple and efficient application for managing personal
          notes. It keeps your ideas organized and accessible in one place,
          whether you are at home or on the go.
        </p>

        <p className={css.description}>
          Create notes, organize them by category, find information with keyword
          search, and open each note on a dedicated page. NoteHub provides a
          streamlined experience for anyone who values clarity and productivity.
        </p>
      </div>
    </main>
  );
}
