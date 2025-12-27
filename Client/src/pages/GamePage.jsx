import { useFactoriesByRealm } from '../hooks/useFactoriesByRealm.js';
import { useRealms } from '../hooks/useRealms.js';

export default function GamePage() {

  const { data: realms, loading: realmsLoading, error: realmsError } = useRealms();
  const { data: factories, loading, error } = useFactoriesByRealm(1);
  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      {/* Background Ashkar */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/ROYAUMES/HERO%20HEADER%20ASHKAR.png"
          alt="Ashkar"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-heading">Ashkar — Forge Active</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Interface de jeu (UX). Les données seront branchées ensuite.
        </p>

        {/* Royaumes (horizontal full width) */}
        <section className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl">Royaumes</h2>
            <span className="text-xs text-[var(--color-muted)]">0 / 12</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {realmsLoading && <p className="text-sm text-[var(--color-muted)]">Chargement...</p>}
            {realmsError && <p className="text-sm text-red-400">{realmsError}</p>}

            {!realmsLoading && !realmsError && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {realms.map((r) => (
                  <div key={r.id} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-heading">{r.name}</span>
                      <span className="text-xs text-[var(--color-gold)]">LOCK</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      Conditions: {r.unlockCosts.length} ressources
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Ressources (horizontal full width) */}
        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl">Ressources</h2>
            <span className="text-xs text-[var(--color-muted)]">12 total</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
              <div
                key={i}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-3 text-center"
              >
                <p className="text-sm font-heading">Ressource {i}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">0</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usines (left) + Skills (right) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Usines */}
          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl">Usines</h2>
              <span className="text-xs text-[var(--color-muted)]">Actives: 0</span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {loading && <p className="text-sm text-[var(--color-muted)]">Chargement...</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}

              {!loading && !error && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {factories.map((f) => (
                    <div
                      key={f.id}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
                    >
                      <p className="font-heading">{f.name}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">{f.description}</p>
                      <p className="text-xs text-[var(--color-muted)]">Prod: {f.base_production}</p>
                      <p className="text-xs text-[var(--color-muted)]">Coût: {f.base_cost}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl">Skills</h2>
              <span className="text-xs text-[var(--color-muted)]">10 total</span>
            </div>

            <div className="mt-4 grid gap-6">
              <div>
                <h3 className="mb-3 text-sm text-[var(--color-muted)]">Passifs</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                    <div
                      key={`p-${i}`}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
                    >
                      <p className="font-heading">Passif {i}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">Effet: ---</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm text-[var(--color-muted)]">Actifs</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                    <div
                      key={`a-${i}`}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
                    >
                      <p className="font-heading">Actif {i}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">Effet: ---</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}




