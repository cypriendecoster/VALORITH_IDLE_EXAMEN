const normalizeKey = (value = '') =>
  value
    .toLowerCase()
    .replace(/[œ]/g, 'oe')
    .replace(/[æ]/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

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

const formatTitle = (value = '') =>
  value
    .toLocaleLowerCase('fr-FR')
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase('fr-FR'));

export default function SkillPanel({ data, loading, error, onUpgrade, inlineError }) {
  const formatEffect = (type, value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 'Effet inconnu';
    const percent = Math.round(numeric * 100);
    switch (type) {
      case 'PROD_MULTIPLIER':
        return `${percent >= 0 ? '+' : ''}${percent}% production`;
      case 'GLOBAL_MULTIPLIER':
        return `${percent >= 0 ? '+' : ''}${percent}% production globale`;
      case 'COST_REDUCTION':
        return `${percent}% coût`;
      case 'IDLE_BONUS':
        return `${percent >= 0 ? '+' : ''}${percent}% gains hors connexion`;
      default:
        return `${type} (${numeric})`;
    }
  };
  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ?? null;
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  const activeRealmName = activeRealm ? activeRealm.name : 'Royaume';
  const normalizedRealmName = normalizeKey(activeRealmName);
  const isAshkarRealm = normalizedRealmName.includes('ashkar');
  const isAquerusRealm = normalizedRealmName.includes('aquerus');
  const ashkarSkillImages = {
    'souffle des forges': '/ASHKAR/Souffle_des_forges.png',
    'optimisation des fours': '/ASHKAR/Optimisation_des_fours.png',
    'brasiers persistants': '/ASHKAR/Brasiers_persistants.png',
    'maitrise pyroclastique': '/ASHKAR/Maitre_pyroclastique.png',
    'coeur d ashkar': '/ASHKAR/Coeur_ashkar.png',
  };
  const aquerusSkillImages = {
    'courants profonds': '/AQUERUS/Courants_profonds.png',
    'flux persistant': '/AQUERUS/Flux_persistant.png',
    'pression optimale': '/AQUERUS/Pression_optimale.png',
    'saturation abyssale': '/AQUERUS/Saturation_abyssale.png',
    'coeur abyssal': '/AQUERUS/Coeur_abyssal.png',
    'coeur des abysses': '/AQUERUS/Coeur_abyssal.png',
  };
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
          Royaume non débloqué. Débloquez-le pour accéder aux skills.
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
              const skillImage = isAshkarRealm
                ? ashkarSkillImages[normalizeKey(s.name)]
                : isAquerusRealm
                  ? aquerusSkillImages[normalizeKey(s.name)]
                  : null;

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
                  {skillImage && (
                    <img
                      src={skillImage}
                      alt={s.name}
                      className="h-20 w-full rounded-[var(--radius-sm)] object-cover"
                      loading="lazy"
                    />
                  )}
                  <p className="font-heading">{formatTitle(s.name)}</p>
                  <p className="text-sm text-[var(--color-text)]/85">{s.description}</p>
                  <div className="grid gap-2">
                    <p className="text-sm text-[var(--color-text)]/85">
                      Effet: {formatEffect(s.effect_type, s.effect_value)}
                    </p>
                    <span className="inline-flex w-fit rounded-full border border-[var(--color-border)] bg-black/30 px-2 py-0.5 text-xs text-[var(--color-text)]/85">
                      Niveau {level} / {s.max_level}
                      {isMax ? ' · Max' : ''}
                    </span>
                  </div>
                  <div className="grid gap-1">
                    <p
                      className="text-sm text-[var(--color-text)]/85"
                      title={`${formatNumber(cost)} ${costResourceName}`}
                    >
                      Coût: {formatCompact(cost)} {costResourceName}
                    </p>
                  </div>
                  {!canAfford && (
                    <p className="text-sm text-red-300">Ressources insuffisantes.</p>
                  )}

                  <button
                    className={`mt-2 w-full rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${
                      isMax
                        ? 'bg-gray-600 text-gray-200'
                        : 'bg-[var(--color-gold)] text-black hover:brightness-110'
                    } disabled:opacity-40`}
                    disabled={!canAfford || isMax}
                    onClick={() => onUpgrade(s.id)}
                  >
                    {isMax ? 'Max atteint' : level > 0 ? 'Améliorer' : 'Débloquer'}
                  </button>
                  {inlineError?.scope === 'skill' && inlineError.id === s.id && (
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
