import { useState } from 'react';

export default function ProgressPanel({ data, loading, error }) {
  const totalRealms = data?.realms?.length || 0;
  const unlockedRealms = data?.player?.realms?.length || 0;
  const allRealmsUnlocked = totalRealms > 0 && unlockedRealms >= totalRealms;

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
  const badges = data?.badges || [];
  const earnedBadges = badges.filter((b) => userBadges.some((ub) => ub.badge_id === b.id));
  const [showVictory, setShowVictory] = useState(
    () => finalBadgeUnlocked && localStorage.getItem('victoryDismissed') !== '1'
  );

  return (
    <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Progression</h2>
        <span className="text-xs text-[var(--color-muted)]">
          Royaumes: {unlockedRealms} / {totalRealms}
        </span>
      </div>

      {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Chargement...</p>}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {!loading && !error && data && (
        <div className="mt-4 grid gap-4">
          {finalBadgeUnlocked && (
            <div className="rounded-[var(--radius-md)] border border-[var(--color-gold)] bg-[var(--color-gold)]/15 p-4 text-[var(--color-text)]">
              <p className="text-sm font-heading">Victoire</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">
                Badge final obtenu. Valorith Idle est termine.
              </p>
            </div>
          )}
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Objectif 1</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              Debloquer tous les royaumes.
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Statut: {allRealmsUnlocked ? 'Termine' : 'En cours'}
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Objectif 2</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              Endgame requirements.
            </p>
            <div className="mt-2 grid gap-2 text-xs text-[var(--color-muted)]">
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
                    <span>
                      {Math.floor(amount)} / {target} {done ? 'OK' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Badge final</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              {finalBadge ? finalBadge.name : 'Monstre du Idle'}
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Statut: {finalBadgeUnlocked ? 'Debloque' : 'Verrouille'}
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
            <p className="text-sm font-heading">Badges obtenus</p>
            {earnedBadges.length === 0 && (
              <p className="mt-1 text-xs text-[var(--color-muted)]">Aucun badge obtenu.</p>
            )}
            {earnedBadges.length > 0 && (
              <div className="mt-2 grid gap-2 text-xs text-[var(--color-muted)]">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center justify-between">
                    <span>{badge.name}</span>
                    <span>OK</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {showVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-panel)] p-6 text-[var(--color-text)]">
            <h3 className="text-xl font-heading">Victoire</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Tu as termine Valorith Idle. Le badge final est debloque.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-[var(--radius-md)] bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
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
