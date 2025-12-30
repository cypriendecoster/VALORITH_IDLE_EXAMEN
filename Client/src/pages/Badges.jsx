import { useGameData } from '../hooks/useGameData.js';

export default function Badges() {
  const { data, loading, error } = useGameData();
  const badges = data?.badges || [];
  const userBadges = data?.userBadges || [];

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/ROYAUMES/HERO%20HEADER%20ASHKAR.png"
          alt="Valorith"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-heading">Badges</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Collection detaillee des achievements.
        </p>

        {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Chargement...</p>}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {!loading && !error && data && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => {
              const earned = userBadges.some((ub) => ub.badge_id === badge.id);
              return (
                <div
                  key={badge.id}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-heading">{badge.name}</p>
                    <span className="text-xs text-[var(--color-muted)]">
                      {earned ? 'OK' : 'LOCK'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{badge.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
