import type { Metadata } from 'next';

import HomeActions from '@/components/HomeActions/HomeActions';

import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Capture, organize, and find your personal notes in one focused workspace.',
};

const features = [
  {
    number: '01',
    title: 'Quick capture',
    description: 'Save an idea before it disappears and return to it anytime.',
  },
  {
    number: '02',
    title: 'Easy organization',
    description: 'Group notes by topic and find what you need with search.',
  },
  {
    number: '03',
    title: 'Private workspace',
    description: 'Keep your notes connected to your personal account.',
  },
];

export default function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div className={css.heroContent}>
          <p className={css.eyebrow}>Your ideas, clearly organized</p>

          <h1 className={css.title}>
            Capture ideas.
            <span>Keep what matters.</span>
          </h1>

          <p className={css.description}>
            A focused workspace for writing, organizing, and finding your
            personal notes without the clutter.
          </p>

          <HomeActions />
        </div>

        <div className={css.preview} aria-hidden="true">
          <div className={css.previewGlow} />

          <div className={css.workspace}>
            <div className={css.workspaceHeader}>
              <div>
                <p className={css.workspaceLabel}>Workspace</p>
                <p className={css.workspaceTitle}>My notes</p>
              </div>

              <span className={css.noteCount}>3 notes</span>
            </div>

            <div className={css.searchPreview}>
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4" />
              </svg>

              <span>Search your notes...</span>
            </div>

            <div className={css.noteList}>
              <article className={`${css.noteCard} ${css.featuredNote}`}>
                <div className={css.noteMeta}>
                  <span className={css.workTag}>Work</span>
                  <span>Today</span>
                </div>

                <h2>Project ideas</h2>
                <p>Outline the next features and prepare the release plan.</p>
              </article>

              <article className={css.noteCard}>
                <div className={css.noteMeta}>
                  <span className={css.personalTag}>Personal</span>
                  <span>Yesterday</span>
                </div>

                <h2>Portfolio improvements</h2>
                <p>Review project pages and update the presentation.</p>
              </article>

              <article className={css.noteCard}>
                <div className={css.noteMeta}>
                  <span className={css.learningTag}>Learning</span>
                  <span>Sep 2</span>
                </div>

                <h2>Topics to revisit</h2>
                <p>Server components, caching, and route handlers.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className={css.features}
        id="features"
        aria-labelledby="features-title"
      >
        <div className={css.featuresHeading}>
          <p className={css.eyebrow}>Designed for focus</p>
          <h2 id="features-title">Everything you need to stay organized</h2>
        </div>

        <div className={css.featureGrid}>
          {features.map((feature) => (
            <article className={css.featureCard} key={feature.number}>
              <span className={css.featureNumber}>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
