import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/HERO_HEADER/HERO_HEADER_ACCUEIL.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <span className="rounded-full border border-[var(--color-border)] bg-black/30 px-4 py-1 text-xs tracking-[0.2em] text-[var(--color-gold)]">
          404
        </span>
        <h1 className="mt-4 font-heading text-3xl">Page introuvable</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          La page demandée n'existe pas. Retournez à l'accueil.
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
