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

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [endgameData, resourceData] = await Promise.all([
          getEndgameRanking(50),
          getResourceRanking(50)
        ]);
        setEndgame(endgameData || []);
        setResources(resourceData || []);
      } catch (err) {
        setError(err.message || 'API error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
        <h1 className="text-3xl font-heading">Classement global</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Fin du jeu et ressources collectees.
        </p>

        {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Chargement...</p>}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

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
                  <div key={`${row.user_id}-${row.obtained_at}`} className="flex items-center justify-between">
                    <span>#{index + 1} {row.username || 'Joueur'}</span>
                    <span>{formatDate(row.obtained_at)}</span>
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
                  <div key={`${row.user_id}-${row.total_lifetime}`} className="flex items-center justify-between">
                    <span>#{index + 1} {row.username || 'Joueur'}</span>
                    <span>{Math.floor(Number(row.total_lifetime) || 0)}</span>
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
