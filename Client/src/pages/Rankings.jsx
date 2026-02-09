import { useCallback, useEffect, useState } from 'react';
import { getEndgameRanking } from '../services/rankingService.js';
import { formatDurationHms } from '../utils/format.js';
import { normalizeError } from '../utils/errors.js';

export default function Rankings() {
  const [endgame, setEndgame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const endgameData = await getEndgameRanking(50);
      setEndgame(endgameData || []);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading">Classement fin du jeu</h1>
            <p className="mt-2 text-[var(--color-muted)]">
              Les joueurs qui terminent le plus vite. Temps calculé depuis la création du compte.
            </p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/30 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Rafraîchir
          </button>
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

        {!loading && !error && (
          <div className="mt-6">
            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl">Fin du jeu</h2>
                <span className="text-xs text-[var(--color-muted)]">Top 50</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-[var(--color-muted)]">
                {endgame.length === 0 && <p>Aucune entrée.</p>}
                {endgame.map((row, index) => (
                  <div
                    key={`${row.user_id}-${row.obtained_at}`}
                    className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span
                      className={`min-w-0 truncate${
                        index < 3 ? ' text-[var(--color-gold-strong)]' : ''
                      }`}
                    >
                      #{index + 1} {row.username || 'Joueur'}
                    </span>
                    <span className="text-left tabular-nums sm:text-right sm:whitespace-nowrap">
                      {formatDurationHms(row.duration_seconds)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
