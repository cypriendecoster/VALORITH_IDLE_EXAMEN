import { useEffect, useRef, useState } from 'react';

export default function ProgressPanel({ data, loading, error }) {
  const formatNumber = (value) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Number(value || 0));
  const formatCompact = (value) => {
    const numeric = Number(value || 0);
    const abs = Math.abs(numeric);
    if (!Number.isFinite(numeric)) return '0';
    if (abs >= 1e12) return `${formatNumber(numeric / 1e12)} Bn`;
    if (abs >= 1e9) return `${formatNumber(numeric / 1e9)} Md`;
    if (abs >= 1e6) return `${formatNumber(numeric / 1e6)} M`;
    if (abs >= 1e3) return `${formatNumber(numeric / 1e3)} K`;
    return formatNumber(numeric);
  };
  const totalRealms = data?.realms?.length || 0;
  const unlockedRealms = data?.player?.realms?.length || 0;
  const allRealmsUnlocked = totalRealms > 0 && unlockedRealms >= totalRealms;
  const realmProgress = totalRealms > 0 ? Math.round((unlockedRealms / totalRealms) * 100) : 0;

  const requirements = data?.endgameRequirements || [];
  const resources = data?.resources || [];
  const playerResources = data?.player?.resources || [];

  const requirementsMet = requirements.every((req) => {
    const playerRes = playerResources.find((r) => r.resource_id === req.resource_id);
    const amount = playerRes ? Number(playerRes.amount) + Number(playerRes.amount_carry) : 0;
    return amount >= Number(req.amount);
  });

  const finalBadge = (data?.badges || []).find((b) => b.code === 'MONSTRE_DU_IDLE');
  const userBadges = data?.userBadges || [];
  const finalBadgeUnlocked = finalBadge
    ? userBadges.some((ub) => ub.badge_id === finalBadge.id)
    : false;
  const overallProgress = Math.round(
    ((allRealmsUnlocked ? 1 : 0) + (requirementsMet ? 1 : 0) + (finalBadgeUnlocked ? 1 : 0)) / 3 * 100
  );
  const badges = data?.badges || [];
  const earnedBadges = badges.filter((b) => userBadges.some((ub) => ub.badge_id === b.id));
  const [showVictory, setShowVictory] = useState(
    () => finalBadgeUnlocked && localStorage.getItem('victoryDismissed') !== '1'
  );
  const victoryButtonRef = useRef(null);

  useEffect(() => {
    if (showVictory && victoryButtonRef.current) {
      victoryButtonRef.current.focus();
    }
  }, [showVictory]);

  return (
    <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Progression</h2>
        <span className="text-sm text-[var(--color-muted)]">
          Royaumes: {unlockedRealms} / {totalRealms}
        </span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Progression globale: {overallProgress}% (Royaumes: {realmProgress}%)
      </p>

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
        <div className="mt-4 grid gap-4">
          {finalBadgeUnlocked && (
            <div className="rounded-[var(--radius-md)] border border-[var(--color-gold)] bg-[var(--color-gold)]/15 p-4 text-[var(--color-text)]">
              <p className="text-sm font-heading">Victoire</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Badge final obtenu. Valorith Idle est terminé.
              </p>
            </div>
          )}
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Objectif 1</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Débloquer tous les royaumes.
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              Statut: {allRealmsUnlocked ? 'Terminé' : 'En cours'}
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Objectif 2</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Exigences de fin de jeu.
            </p>
            <div className="mt-2 grid gap-2 text-sm text-[var(--color-muted)]">
              {requirements.map((req) => {
                const res = resources.find((r) => r.id === req.resource_id);
                const name = res ? res.name : 'Ressource';
                const playerRes = playerResources.find((r) => r.resource_id === req.resource_id);
                const amount = playerRes ? Number(playerRes.amount) + Number(playerRes.amount_carry) : 0;
                const target = Number(req.amount);
                const done = amount >= target;

                return (
                  <div key={req.id} className="flex items-center justify-between">
                    <span>{name}</span>
                    <span
                      className="text-right tabular-nums"
                      title={`${formatNumber(Math.floor(amount))} / ${formatNumber(target)}`}
                    >
                      {formatCompact(Math.floor(amount))} / {formatCompact(target)}
                      {done ? ' ✓' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Badge final</p>
            <div className="mt-2 flex items-center gap-3">
              {finalBadge?.icon && (
                <img
                  src={`/BADGES/${finalBadge.icon}`}
                  alt={finalBadge.name}
                  className={`h-10 w-10 rounded-full border border-[var(--color-border)] object-cover ${
                    finalBadgeUnlocked ? '' : 'opacity-60 grayscale'
                  }`}
                  loading="lazy"
                />
              )}
              <p className="text-sm text-[var(--color-muted)]">
                {finalBadge ? finalBadge.name : 'Monstre du Idle'}
              </p>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Statut: {finalBadgeUnlocked ? 'Débloqué' : 'Verrouillé'}
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Badges obtenus</p>
            {earnedBadges.length === 0 && (
              <p className="mt-1 text-sm text-[var(--color-muted)]">Aucun badge obtenu.</p>
            )}
            {earnedBadges.length > 0 && (
              <div className="mt-2 grid gap-2 text-sm text-[var(--color-muted)]">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center justify-between">
                    <span>{badge.name}</span>
                    <span className="text-right tabular-nums">✓</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {showVictory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="victory-title"
          aria-describedby="victory-desc"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              localStorage.setItem('victoryDismissed', '1');
              setShowVictory(false);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-panel)] p-6 text-[var(--color-text)]">
            <h3 id="victory-title" className="text-xl font-heading">Victoire</h3>
            <p id="victory-desc" className="mt-2 text-sm text-[var(--color-muted)]">
              Tu as terminé Valorith Idle. Le badge final est débloqué.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
                ref={victoryButtonRef}
                onClick={() => {
                  localStorage.setItem('victoryDismissed', '1');
                  setShowVictory(false);
                }}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
