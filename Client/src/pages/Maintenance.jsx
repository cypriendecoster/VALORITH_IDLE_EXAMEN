import { Link } from 'react-router-dom';

export default function Maintenance() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL_2.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <span className="rounded-full border border-[var(--color-border)] bg-black/30 p-3 text-[var(--color-gold)]">
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4l-6.1 6.1a2 2 0 0 0 2.8 2.8l6.1-6.1a4 4 0 0 1 5.4-5.4l2.9-2.9-2.8-2.8z" />
          </svg>
        </span>
        <h1 className="font-heading text-3xl">Maintenance</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Le jeu est temporairement indisponible. Reviens plus tard.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/30 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
