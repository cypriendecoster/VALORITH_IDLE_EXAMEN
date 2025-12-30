export default function RealmPanel({ realms, loading, error, onUnlock, onActivate, playerRealms }) {
  const unlockedIds = new Set((playerRealms || []).map((r) => r.realm_id));
  const activeRealmId = (playerRealms || []).find((r) => r.is_active === 1)?.realm_id ?? null;

  return (
    <section className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Royaumes</h2>
        <span className="text-xs text-[var(--color-muted)]">0 / 12</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {loading && <p className="text-sm text-[var(--color-muted)]">Chargement...</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

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
                      <span className="text-xs text-[var(--color-muted)]">ACTIF</span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    Conditions: {r.unlockCosts?.length || 0} ressources
                  </p>

                  {!isUnlocked && (
                    <button
                      className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-3 py-2 text-sm font-semibold text-black"
                      onClick={() => onUnlock(r.id)}
                    >
                      DǸbloquer
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
