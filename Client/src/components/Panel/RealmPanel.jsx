export default function RealmPanel({
  realms,
  loading,
  error,
  onUnlock,
  onActivate,
  playerRealms,
  resources,
  playerResources
}) {
  const unlockedIds = new Set((playerRealms || []).map((r) => r.realm_id));
  const activeRealmId = (playerRealms || []).find((r) => r.is_active === 1)?.realm_id ?? null;
  const resourceNameById = new Map((resources || []).map((r) => [r.id, r.name]));
  const playerAmountById = new Map(
    (playerResources || []).map((r) => [
      r.resource_id,
      Number(r.amount || 0) + Number(r.amount_carry || 0)
    ])
  );

  return (
    <section className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Royaumes</h2>
        <span className="text-xs text-[var(--color-muted)]">
          {unlockedIds.size} / {realms?.length || 0}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading && (
          <p className="text-sm text-[var(--color-muted)]" aria-live="polite">
            Chargement...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-400" aria-live="polite">
            {error}
          </p>
        )}

        {!loading && !error && realms && (
          <>
            {realms.map((r) => {
              const isUnlocked = unlockedIds.has(r.id);
              const isActive = activeRealmId === r.id;

              return (
                <div key={r.id} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading">{r.name}</span>
                    {!isUnlocked && <span className="text-xs text-[var(--color-gold)]">LOCK</span>}
                    {isUnlocked && isActive && (
                      <span className="rounded-full border border-[var(--color-gold)]/40 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
                        Actif
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-2 text-xs text-[var(--color-muted)]">
                    {(r.unlockCosts || []).length === 0 && <p>Aucune condition</p>}
                    {(r.unlockCosts || []).map((cost) => {
                      const name = resourceNameById.get(cost.resource_id) || 'Ressource';
                      const required = Number(cost.amount) || 0;
                      const current = playerAmountById.get(cost.resource_id) || 0;
                      const progress =
                        required > 0 ? Math.min(100, Math.floor((current / required) * 100)) : 0;

                      return (
                        <div key={cost.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>{name}</span>
                            <span>
                              {Math.floor(current)}/{required}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/50">
                            <div
                              className="h-full bg-[var(--color-gold)]/80"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!isUnlocked && (
                    <button
                      className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-3 py-2 text-sm font-semibold text-black"
                      onClick={() => onUnlock(r.id)}
                    >
                      Débloquer
                    </button>
                  )}

                  {isUnlocked && !isActive && (
                    <button
                      className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 px-3 py-2 text-sm font-semibold text-[var(--color-text)]"
                      onClick={() => onActivate(r.id)}
                    >
                      Activer
                    </button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}


