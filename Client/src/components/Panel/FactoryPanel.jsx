const normalizeKey = (value = '') =>
  value
    .toLowerCase()
    .replace(/[œ]/g, 'oe')
    .replace(/[æ]/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export default function FactoryPanel({ data, loading, error, onUpgrade, inlineError }) {
  const formatNumber = (value) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(Number(value || 0));
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

  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ?? null;
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  const activeRealmName = activeRealm ? activeRealm.name : 'Royaume';
  const normalizedRealmName = normalizeKey(activeRealmName);
  const isAshkarRealm = normalizedRealmName.includes('ashkar');
  const isAquerusRealm = normalizedRealmName.includes('aquerus');
  const ashkarFactoryImages = {
    'mine de scories': '/ASHKAR/Mine_scories.png',
    'four de basalte': '/ASHKAR/Four_basalte.png',
    'foreuse de magma': '/ASHKAR/Foreuse_magma.png',
    'fonderie des cendres': '/ASHKAR/Fonderie_cendres.png',
    'extracteur obsidienne': '/ASHKAR/Extracteur_obsidienne.png',
    'extracteur d obsidienne': '/ASHKAR/Extracteur_obsidienne.png',
    'pyro forge': '/ASHKAR/Pyro_Forge.png',
    'coeur volcanique': '/ASHKAR/Coeur_Volcanique.png',
  };
  const aquerusFactoryImages = {
    'source abyssale': '/AQUERUS/Source_abyssale.png',
    'puit profond': '/AQUERUS/Puit_profond.png',
    'puits profond': '/AQUERUS/Puit_profond.png',
    'foreuse marine': '/AQUERUS/Foreuse_marine.png',
    'distillateur noir': '/AQUERUS/Distillateur_noir.png',
    'extracteur du gouffre': '/AQUERUS/Extracteur_du_gouffre.png',
    'forge abyssale': '/AQUERUS/Forge_abyssale.png',
    'coeur de leviathan': '/AQUERUS/Coeur_de_leviathan.png',
    'coeur du leviathan': '/AQUERUS/Coeur_de_leviathan.png',
  };
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
          <span title={formatNumber(Math.floor(totalProduction))}>
            Prod/s: {formatCompact(Math.floor(totalProduction))}
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        Royaume actif: {activeRealmName}
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

      {!loading && !error && data && !isActiveUnlocked && activeRealmId && (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Royaume non débloqué. Débloquez-le pour accéder aux usines.
        </p>
      )}

      {!loading && !error && data && isActiveUnlocked && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {visibleFactories.map((f) => {
            const playerRes = data.player.resources.find((r) => r.resource_id === f.resource_id);
            const amount = playerRes ? Number(playerRes.amount) + Number(playerRes.amount_carry) : 0;
            const canAfford = amount >= f.cost;
            const isUnlocked = f.level > 0;
            const costResource = data.resources.find((res) => res.id === f.resource_id);
            const costResourceName = costResource ? costResource.name : 'Ressource';
            const factoryImage = isAshkarRealm
              ? ashkarFactoryImages[normalizeKey(f.name)]
              : isAquerusRealm
                ? aquerusFactoryImages[normalizeKey(f.name)]
                : null;

            const baseProduction = isUnlocked
              ? Number(f.base_production) * (1 + Number(f.level))
              : 0;
            const bonusProduction = isUnlocked
              ? Math.max(0, Number(f.production || 0) - baseProduction)
              : 0;

            return (
              <div
                key={f.id}
                className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-black/40 p-4"
              >
                {factoryImage && (
                  <img
                    src={factoryImage}
                    alt={f.name}
                    className="h-20 w-full rounded-[var(--radius-sm)] object-cover"
                    loading="lazy"
                  />
                )}
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading">{f.name}</p>
                  <span className="rounded-full border border-[var(--color-border)] bg-black/40 px-2 py-0.5 text-center text-xs text-[var(--color-text)]">
                    Niveau {f.level}
                  </span>
                </div>
                {!isUnlocked && <span className="text-xs text-[var(--color-gold)]">LOCK</span>}
                <p className="text-xs text-[var(--color-muted)]">{f.description}</p>
                <p className="text-xs text-[var(--color-text)]/80">
                  Ressource: <span className="text-[var(--color-gold)]">{costResourceName}</span>
                </p>
                <div className="grid gap-1 text-[var(--color-muted)]">
                  <div className="grid grid-cols-[52px_1fr] items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wide text-[var(--color-text)]/80">Prod</span>
                    <span
                      className="text-sm font-semibold text-[var(--color-text)]"
                      title={`${isUnlocked ? formatNumber(f.production) : '0'} ${costResourceName} / s`}
                    >
                      {isUnlocked ? formatCompact(f.production) : '0'} / s
                    </span>
                  </div>
                  {isUnlocked && (
                    <>
                      <div className="grid grid-cols-[52px_1fr] items-baseline gap-2 text-xs">
                        <span className="text-xs uppercase tracking-wide text-[var(--color-text)]/80">Base</span>
                        <span title={`${formatNumber(Math.floor(baseProduction))}`}>
                          {formatCompact(Math.floor(baseProduction))}
                        </span>
                      </div>
                      <div className="grid grid-cols-[52px_1fr] items-baseline gap-2 text-xs">
                        <span className="text-xs uppercase tracking-wide text-[var(--color-text)]/80">Bonus</span>
                        <span title={`${formatNumber(Math.floor(bonusProduction))}`}>
                          {formatCompact(Math.floor(bonusProduction))}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-[52px_1fr] items-baseline gap-2 text-xs">
                    <span className="text-xs uppercase tracking-wide text-[var(--color-text)]/80">Coût</span>
                    <span title={`${formatNumber(f.cost)} ${costResourceName}`}>
                      {formatCompact(f.cost)}
                    </span>
                  </div>
                </div>
                <button
                  className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--color-gold)] px-3 py-2 text-sm font-semibold text-[#0a0a0a] hover:brightness-110 disabled:bg-gray-600 disabled:text-gray-200 disabled:opacity-80"
                  disabled={!canAfford}
                  title={!canAfford ? 'Ressources insuffisantes pour améliorer.' : undefined}
                  onClick={() => onUpgrade(f.id)}
                >
                  {isUnlocked ? 'Améliorer' : 'Débloquer'}
                </button>
                {inlineError?.scope === 'factory' && inlineError.id === f.id && (
                  <p className="mt-2 text-sm text-red-300">{inlineError.message}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
