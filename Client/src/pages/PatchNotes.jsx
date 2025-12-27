import { Link } from 'react-router-dom';

export default function PatchNotes() {
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-[var(--color-muted)]">Accueil / PatchNotes</p>

        <h1 className="mt-6 text-4xl font-heading">PatchNotes</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Dernières mises à jour de la forge.
        </p>

        <div className="mt-10 space-y-6">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl">Version 0.0.2</h2>
              <span className="text-xs text-[var(--color-muted)]">10/12/2025</span>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Barre x10 / x100 / max pour les améliorations.</li>
              <li>Bonus x2 tous les 50 niveaux sur les usines.</li>
              <li>Ressource unique affichée par royaume.</li>
              <li>Amélioration de lisibilité de la Game Page.</li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl">Version 0.0.1</h2>
              <span className="text-xs text-[var(--color-muted)]">01/12/2025</span>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Déblocage des premiers royaumes.</li>
              <li>Système d’usines + premières compétences.</li>
              <li>Idle gains hors‑ligne.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-block rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
