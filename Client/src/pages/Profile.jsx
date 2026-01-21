import { useGameData } from '../hooks/useGameData.js';
import { useRequireAuth } from '../hooks/useRequireAuth.js';
import { useMe } from '../hooks/useMe.js';
import ProgressPanel from '../components/Panel/ProgressPanel.jsx';

function formatPlayTime(seconds) {
  const total = Number(seconds || 0);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function formatDate(value) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString();
}

export default function Profile() {
  useRequireAuth();
  const { data, loading, error, reload } = useGameData();
  const { data: me } = useMe();
  const stats = data?.player?.stats || {};
  const badges = data?.badges || [];
  const userBadges = data?.userBadges || [];
  const earnedBadges = badges.filter((b) => userBadges.some((ub) => ub.badge_id === b.id));

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

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading">Profil joueur</h1>
            <p className="mt-2 text-[var(--color-muted)]">
              Statistiques, progression et badges.
            </p>
            {me?.last_login_at && (
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Derniere connexion: {formatDate(me.last_login_at)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/30 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Rafraichir
          </button>
        </div>

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl">Statistiques</h2>
          </div>

          {loading && (
            <p className="mt-3 text-sm text-[var(--color-muted)]" aria-live="polite">
              Chargement...
            </p>
          )}
          {error && (
            <p className="mt-3 text-sm text-red-400" aria-live="polite">
              {error}
            </p>
          )}

          {!loading && !error && data && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-3">
                <p className="text-xs text-[var(--color-muted)]">Temps de jeu</p>
                <p className="font-heading text-sm">{formatPlayTime(stats.total_play_time_seconds)}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-3">
                <p className="text-xs text-[var(--color-muted)]">Connexions</p>
                <p className="font-heading text-sm">{stats.total_logins || 0}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-3">
                <p className="text-xs text-[var(--color-muted)]">Royaume max</p>
                <p className="font-heading text-sm">{stats.max_realm_unlocked_id || 0}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-3">
                <p className="text-xs text-[var(--color-muted)]">Usine max</p>
                <p className="font-heading text-sm">{stats.max_factory_level_reached || 0}</p>
              </div>
            </div>
          )}
        </section>

        <ProgressPanel data={data} loading={loading} error={error} />

        <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl">Badges</h2>
            <span className="text-xs text-[var(--color-muted)]">
              {earnedBadges.length} / {badges.length}
            </span>
          </div>

          {loading && (
            <p className="mt-3 text-sm text-[var(--color-muted)]" aria-live="polite">
              Chargement...
            </p>
          )}
          {error && (
            <p className="mt-3 text-sm text-red-400" aria-live="polite">
              {error}
            </p>
          )}

          {!loading && !error && data && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {earnedBadges.length === 0 && (
                <p className="text-sm text-[var(--color-muted)]">Aucun badge obtenu.</p>
              )}
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
                >
                  <p className="font-heading">{badge.name}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{badge.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
