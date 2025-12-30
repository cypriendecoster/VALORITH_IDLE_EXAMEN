import { useMemo, useState } from 'react';
import { useGameData } from '../hooks/useGameData.js';
import { useRequireAuth } from '../hooks/useRequireAuth.js';

export default function Badges() {
  useRequireAuth();
  const { data, loading, error } = useGameData();
  const badges = data?.badges || [];
  const userBadges = data?.userBadges || [];
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState('name');

  const earnedIds = useMemo(() => {
    return new Set(userBadges.map((ub) => ub.badge_id));
  }, [userBadges]);

  const filteredBadges = useMemo(() => {
    return badges.filter((badge) => {
      const earned = earnedIds.has(badge.id);
      if (statusFilter === 'earned') return earned;
      if (statusFilter === 'locked') return !earned;
      return true;
    });
  }, [badges, earnedIds, statusFilter]);

  const sortedBadges = useMemo(() => {
    const copy = [...filteredBadges];
    if (sortKey === 'status') {
      copy.sort((a, b) => {
        const aEarned = earnedIds.has(a.id);
        const bEarned = earnedIds.has(b.id);
        if (aEarned === bEarned) return a.name.localeCompare(b.name);
        return aEarned ? -1 : 1;
      });
      return copy;
    }
    copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy;
  }, [filteredBadges, earnedIds, sortKey]);
  const earnedCount = earnedIds.size;

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
        <p className="mt-2 text-[var(--color-text)] opacity-80">
          Collection detaillee des badges. {earnedCount}/{badges.length} obtenus.
        </p>

        {loading && <p className="mt-3 text-sm text-[var(--color-text)] opacity-80">Chargement...</p>}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {!loading && !error && data && (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text)] opacity-90">
              <label className="flex items-center gap-2">
                Statut
                <select
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1 text-[var(--color-text)]"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="all">Tous</option>
                  <option value="earned">Obtenus</option>
                  <option value="locked">Verrouilles</option>
                </select>
              </label>
              <label className="flex items-center gap-2">
                Tri
                <select
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-black/40 px-2 py-1 text-[var(--color-text)]"
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value)}
                >
                  <option value="name">Nom</option>
                  <option value="status">Statut</option>
                </select>
              </label>
            </div>

            <ul className="mt-4 grid gap-4 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {sortedBadges.map((badge) => {
                const earned = userBadges.some((ub) => ub.badge_id === badge.id);
                const iconSrc = badge.icon ? `/BADGES/${badge.icon}` : '/BADGES/badge_idle.png';
                const cardClass = earned
                  ? 'rounded-[var(--radius-md)] border border-[var(--color-gold)]/60 bg-[var(--color-panel)]/80 p-4 shadow-[0_0_18px_rgba(214,159,59,0.12)]'
                  : 'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4';

                return (
                  <li
                    key={badge.id}
                    className={cardClass}
                    aria-label={`${badge.name} - ${earned ? 'obtenu' : 'verrouille'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full border border-[var(--color-border)] bg-black/50">
                        <img
                          src={iconSrc}
                          alt={badge.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading">{badge.name}</p>
                        <p className="mt-1 text-[11px] text-[var(--color-text)] opacity-80 sm:text-xs">
                          {badge.description}
                        </p>
                      </div>
                      <span
                        className={
                          earned
                            ? 'ml-auto text-xs font-semibold text-[var(--color-gold)]'
                            : 'ml-auto text-xs text-[var(--color-text)] opacity-70'
                        }
                      >
                        {earned ? 'Obtenu' : 'Verrouille'}
                        <span className="sr-only">
                          {earned ? ' - Badge obtenu' : ' - Badge verrouille'}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
