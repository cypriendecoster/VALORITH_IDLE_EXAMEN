export default function SkillPanel({ data, loading, error, onUpgrade }) {
  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ?? null;
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  const activeRealmName = activeRealm ? activeRealm.name : 'Royaume';
  const unlockedRealmIds = new Set((data?.player?.realms || []).map((r) => r.realm_id));
  const isActiveUnlocked = activeRealmId ? unlockedRealmIds.has(activeRealmId) : false;

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel)]/85 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl">Skills (Passifs)</h2>
        <span className="text-xs text-[var(--color-muted)]">{activeRealmName}</span>
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

      {!loading && !error && data && !isActiveUnlocked && activeRealmId && (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Royaume non debloque. Debloquez-le pour acceder aux skills.
        </p>
      )}

      {!loading && !error && data && isActiveUnlocked && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {data.skills
            .filter((s) => (activeRealmId ? s.realm_id === activeRealmId : true))
            .map((s) => {
              const playerSkill = data.player.skills.find((ps) => ps.skill_id === s.id);
              const level = playerSkill ? Number(playerSkill.level) : 0;
              const isMax = level >= Number(s.max_level);

              const cost = Math.ceil(
                Number(s.base_cost_amount) * Math.pow(Number(s.cost_growth_factor), level)
              );
              const resource = data.player.resources.find((r) => r.resource_id === s.base_cost_resource_id);
              const amount = resource ? Number(resource.amount) + Number(resource.amount_carry) : 0;
              const canAfford = amount >= cost;
              const costResource = data.resources.find((res) => res.id === s.base_cost_resource_id);
              const costResourceName = costResource ? costResource.name : 'Ressource';

              return (
                <div
                  key={s.id}
                  className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
                >
                  <p className="font-heading">{s.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{s.description}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    Effet: {s.effect_type} ({s.effect_value})
                  </p>
                  <span className="inline-flex w-fit rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-[10px] text-[var(--color-muted)]">
                    Niveau {level} / {s.max_level}
                  </span>
                  <p className="text-xs text-[var(--color-muted)]">
                    Cout: {cost} {costResourceName}
                  </p>
                  {!canAfford && (
                    <p className="text-xs text-red-300">Ressources insuffisantes.</p>
                  )}

                  <button
                    className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-3 py-2 text-sm font-semibold text-black disabled:opacity-40"
                    disabled={!canAfford || isMax}
                    onClick={() => onUpgrade(s.id)}
                  >
                    {isMax ? 'Max' : level > 0 ? 'Ameliorer' : 'Debloquer'}
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
}
