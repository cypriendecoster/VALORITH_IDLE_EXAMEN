export function buildSkillLevelMap(playerSkills) {
  return playerSkills.reduce((acc, ps) => {
    acc[ps.skill_id] = Number(ps.level);
    return acc;
  }, {});
}

export function getFactorySkillModifiers(factory, skills, playerSkillLevels, options = {}) {
  const { includeIdleBonus = false } = options;
  let productionMultiplier = 1;
  let costMultiplier = 1;

  for (const skill of skills) {
    if (skill.realm_id !== factory.realm_id) continue;

    const level = playerSkillLevels[skill.id] || 0;
    if (level <= 0) continue;

    const effectType = String(skill.effect_type || '').toUpperCase();
    const delta = Number(skill.effect_value) * level;

    if (effectType === 'PROD_MULTIPLIER' || effectType === 'GLOBAL_MULTIPLIER') {
      productionMultiplier *= 1 + delta;
    }

    if (effectType === 'COST_REDUCTION') {
      costMultiplier *= Math.max(0.05, 1 - Math.abs(delta));
    }

    if (includeIdleBonus && effectType === 'IDLE_BONUS') {
      productionMultiplier *= 1 + delta;
    }
  }

  return { productionMultiplier, costMultiplier };
}
