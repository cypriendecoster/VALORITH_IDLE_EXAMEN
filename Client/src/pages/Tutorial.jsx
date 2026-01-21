import { Link } from 'react-router-dom';

export default function Tutorial() {
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

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-heading">Tutoriel</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Guide rapide pour démarrer dans Valorith Idle.
        </p>

        <ol className="mt-6 grid gap-4 text-base text-[var(--color-muted)]">
          <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--color-border)] bg-black/30 p-2 text-[var(--color-gold)]">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M2.5 12h19" />
                  <path d="M12 2.5c3 3 3 15 0 19" />
                </svg>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-sm uppercase tracking-[0.12em] text-[var(--color-gold)]">
                  Étape 1
                </span>
                <p className="font-heading text-[var(--color-text)]">Débloquer un royaume</p>
              </div>
            </div>
            <p className="mt-1">
              Gagne des ressources pour débloquer le prochain royaume.
            </p>
          </li>
          <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--color-border)] bg-black/30 p-2 text-[var(--color-gold)]">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18" />
                  <path d="M6 21v-8l6-3v11" />
                  <path d="M18 21v-9l-6-3" />
                </svg>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-sm uppercase tracking-[0.12em] text-[var(--color-gold)]">
                  Étape 2
                </span>
                <p className="font-heading text-[var(--color-text)]">Monter les usines</p>
              </div>
            </div>
            <p className="mt-1">
              Chaque usine augmente la production de sa ressource principale.
            </p>
          </li>
          <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--color-border)] bg-black/30 p-2 text-[var(--color-gold)]">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l2.2 4.4L19 8l-3.5 3.4.8 4.8L12 14l-4.3 2.2.8-4.8L5 8l4.8-.6L12 3z" />
                </svg>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-sm uppercase tracking-[0.12em] text-[var(--color-gold)]">
                  Étape 3
                </span>
                <p className="font-heading text-[var(--color-text)]">Acheter des skills</p>
              </div>
            </div>
            <p className="mt-1">
              Les skills boostent la production et réduisent les coûts.
            </p>
          </li>
          <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--color-border)] bg-black/30 p-2 text-[var(--color-gold)]">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 20h16" />
                  <path d="M6 20V10l6-4 6 4v10" />
                  <path d="M10 14h4v6h-4z" />
                </svg>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-sm uppercase tracking-[0.12em] text-[var(--color-gold)]">
                  Étape 4
                </span>
                <span className="rounded-full border border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  Final
                </span>
                <p className="font-heading text-[var(--color-text)]">Fin de jeu</p>
              </div>
            </div>
            <p className="mt-1">
              Remplis toutes les exigences et débloque le badge final.
            </p>
          </li>
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/game"
            className="inline-block rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
          >
            Commencer le jeu
          </Link>
          <Link
            to="/"
            className="inline-block rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)] hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
          >
            Retour accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
