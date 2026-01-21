import { useEffect, useState } from 'react';
import { getEndgameRanking, getResourceRanking } from '../services/rankingService.js';

function formatDate(value) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString();
}

export default function Rankings() {
  const [endgame, setEndgame] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      setError('');
      const [endgameData, resourceData] = await Promise.all([
        getEndgameRanking(50),
        getResourceRanking(50),
      ]);
      setEndgame(endgameData || []);
      setResources(resourceData || []);
    } catch (err) {
      setError(err.message || 'API error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="relative min-h-screen text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/ROYAUMES/HERO%20HEADER%20ASHKAR.png"
          alt="Illustration du royaume d'Ashkar"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading">Classement global</h1>
            <p className="mt-2 text-[var(--color-muted)]">
              Fin du jeu et ressources collectees.
            </p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/30 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Rafraichir
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
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl">Fin du jeu</h2>
                <span className="text-xs text-[var(--color-muted)]">Top 50</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-[var(--color-muted)]">
                {endgame.length === 0 && <p>Aucune entree.</p>}
                {endgame.map((row, index) => (
                  <div
                    key={`${row.user_id}-${row.obtained_at}`}
                    className="flex items-center justify-between"
                  >
                    <span className={index < 3 ? 'text-[var(--color-gold-strong)]' : undefined}>
                      #{index + 1} {row.username || 'Joueur'}
                    </span>
                    <span className="text-right tabular-nums">{formatDate(row.obtained_at)}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl">Ressources totales</h2>
                <span className="text-xs text-[var(--color-muted)]">Top 50</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-[var(--color-muted)]">
                {resources.length === 0 && <p>Aucune entree.</p>}
                {resources.map((row, index) => (
                  <div
                    key={`${row.user_id}-${row.total_lifetime}`}
                    className="flex items-center justify-between"
                  >
                    <span className={index < 3 ? 'text-[var(--color-gold-strong)]' : undefined}>
                      #{index + 1} {row.username || 'Joueur'}
                    </span>
                    <span className="text-right tabular-nums">
                      {Math.floor(Number(row.total_lifetime) || 0)}
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
