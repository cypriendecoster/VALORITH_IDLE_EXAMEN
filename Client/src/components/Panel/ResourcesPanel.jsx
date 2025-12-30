export default function ResourcesPanel({ data, loading, error }) {
  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ?? null;
  const factoriesInRealm = data?.factories
    ? data.factories.filter((f) => (activeRealmId ? f.realm_id === activeRealmId : true))
    : [];
  const activeFactories = factoriesInRealm.filter((f) => f.level > 0);
  const totalProduction = activeFactories.reduce(
    (sum, f) => sum + Number(f.production || 0),
    0
  );

  return (
    <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Ressources</h2>
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <span>{data?.resources?.length || 0} total</span>
          <span>Gain/s: {Math.floor(totalProduction)}</span>
        </div>
      </div>

      {loading && <p className="mt-3 text-sm text-[var(--color-muted)]">Chargement...</p>}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {!loading && !error && data && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {data.resources.map((res) => {
            const playerRes = data.player.resources.find((r) => r.resource_id === res.id);
            const amount = playerRes ? playerRes.amount : 0;

            return (
              <div
                key={res.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-3 text-center"
              >
                <p className="text-sm font-heading">{res.name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{amount}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
