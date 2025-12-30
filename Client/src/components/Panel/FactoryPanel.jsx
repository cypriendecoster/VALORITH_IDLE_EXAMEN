export default function FactoryPanel({ data, loading, error, onUpgrade }) {
  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ?? null;
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  const activeRealmName = activeRealm ? activeRealm.name : 'Royaume';
  const unlockedRealmIds = new Set((data?.player?.realms || []).map((r) => r.realm_id));
  const isActiveUnlocked = activeRealmId ? unlockedRealmIds.has(activeRealmId) : false;
  const factoriesInRealm = data?.factories
    ? data.factories.filter((f) => (activeRealmId ? f.realm_id === activeRealmId : true))
    : [];
  const visibleFactories = isActiveUnlocked ? factoriesInRealm : [];
  const activeFactories = visibleFactories.filter((f) => f.level > 0);
  const totalProduction = activeFactories.reduce(
    (sum, f) => sum + Number(f.production || 0),
    0
  );

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Usines</h2>
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <span>Actives: {activeFactories.length}</span>
          <span>Prod/s: {Math.floor(totalProduction)}</span>
        </div>
      </div>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        Royaume actif: {activeRealmName}
      </p>

      {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Chargement...</p>}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {!loading && !error && data && !isActiveUnlocked && activeRealmId && (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Royaume non debloque. Debloquez-le pour acceder aux usines.
        </p>
      )}

      {!loading && !error && data && isActiveUnlocked && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {visibleFactories.map((f) => {
            const playerRes = data.player.resources.find((r) => r.resource_id === f.resource_id);
            const amount = playerRes ? Number(playerRes.amount) + Number(playerRes.amount_carry) : 0;
            const canAfford = amount >= f.cost;
            const isUnlocked = f.level > 0;
            const costResource = data.resources.find((res) => res.id === f.resource_id);
            const costResourceName = costResource ? costResource.name : 'Ressource';

            const baseProduction = isUnlocked
              ? Number(f.base_production) * (1 + Number(f.level))
              : 0;
            const bonusProduction = isUnlocked
              ? Math.max(0, Number(f.production || 0) - baseProduction)
              : 0;

            return (
              <div
                key={f.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-heading">{f.name}</p>
                  {!isUnlocked && <span className="text-xs text-[var(--color-gold)]">LOCK</span>}
                </div>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{f.description}</p>
                <p className="text-xs text-[var(--color-muted)]">
                  Prod: {isUnlocked ? f.production : 0} {costResourceName}/s
                </p>
                {isUnlocked && (
                  <p className="text-xs text-[var(--color-muted)]">
                    Base: {Math.floor(baseProduction)} + Bonus: {Math.floor(bonusProduction)}
                  </p>
                )}
                <p className="text-xs text-[var(--color-muted)]">
                  Cout: {f.cost} {costResourceName}
                </p>
                <p className="text-xs text-[var(--color-muted)]">Niveau: {f.level}</p>

                <button
                  className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-3 py-2 text-sm font-semibold text-black disabled:opacity-40"
                  disabled={!canAfford}
                  onClick={() => onUpgrade(f.id)}
                >
                  {isUnlocked ? 'Ameliorer' : 'Debloquer'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
