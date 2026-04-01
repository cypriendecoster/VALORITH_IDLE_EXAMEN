import { getAllRealms } from '../models/realmModel.js';
import { getAllRealmUnlockCosts } from '../models/realmUnlockCostModel.js';
import { getAllResources } from '../models/resourceModel.js';
import { getAllFactories } from '../models/factoryModel.js';
import { getAllSkills } from '../models/skillModel.js';
import { getAllEndgameRequirements } from '../models/endgameRequirementModel.js';
import { getAllBadges } from '../models/badgeModel.js';
import { getUserBadges, insertUserBadge } from '../models/userBadgeModel.js';
import { getPlayerResources } from '../models/playerResourceModel.js';
import { getPlayerFactories } from '../models/playerFactoryModel.js';
import { getPlayerSkills } from '../models/playerSkillModel.js';
import { getPlayerRealms } from '../models/playerRealmModel.js';
import { getPlayerState } from '../models/playerStateModel.js';
import { getPlayerStats } from '../models/playerStatsModel.js';
import { buildSkillLevelMap, getFactorySkillModifiers } from './skillEffectsService.js';

function toNonNegativeInt(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.floor(num));
}

function normalizePlayerStats(userId, playerStats, playerRealms, playerFactories) {
  const maxRealmFromProgress = playerRealms.reduce((max, realm) => {
    return Math.max(max, toNonNegativeInt(realm?.realm_id));
  }, 0);

  const maxFactoryFromProgress = playerFactories.reduce((max, factory) => {
    return Math.max(max, toNonNegativeInt(factory?.level));
  }, 0);

  return {
    user_id: userId,
    total_play_time_seconds: toNonNegativeInt(playerStats?.total_play_time_seconds),
    total_logins: toNonNegativeInt(playerStats?.total_logins),
    max_realm_unlocked_id: Math.max(
      toNonNegativeInt(playerStats?.max_realm_unlocked_id),
      maxRealmFromProgress
    ),
    max_factory_level_reached: Math.max(
      toNonNegativeInt(playerStats?.max_factory_level_reached),
      maxFactoryFromProgress
    ),
    created_at: playerStats?.created_at || null,
    updated_at: playerStats?.updated_at || null
  };
}

export async function getGameSnapshot(userId) {
  // Charge toutes les donnees utiles en une fois
  const [
    realms,
    realmUnlockCosts,
    resources,
    factories,
    skills,
    playerResources,
    playerFactories,
    playerSkills,
    playerRealms,
    playerState,
    playerStats,
    endgameRequirements,
    badges,
    userBadges
  ] = await Promise.all([
    getAllRealms(),
    getAllRealmUnlockCosts(),
    getAllResources(),
    getAllFactories(),
    getAllSkills(),
    getPlayerResources(userId),
    getPlayerFactories(userId),
    getPlayerSkills(userId),
    getPlayerRealms(userId),
    getPlayerState(userId),
    getPlayerStats(userId),
    getAllEndgameRequirements(),
    getAllBadges(),
    getUserBadges(userId)
  ]);

  // Carte factory_id -> level
  const factoryLevels = {};
  for (const pf of playerFactories) {
    factoryLevels[pf.factory_id] = pf.level;
  }

  const playerSkillLevels = buildSkillLevelMap(playerSkills);

  // Calcule production et cout pour chaque usine
  const factoriesWithComputed = [];
  for (const f of factories) {
    const level = factoryLevels[f.id] || 0;
    const { productionMultiplier, costMultiplier } = getFactorySkillModifiers(
      f,
      skills,
      playerSkillLevels
    );
    const production = Number(f.base_production) * (1 + level) * productionMultiplier;
    const cost = Math.ceil(Number(f.base_cost) * Math.pow(1.0175, level) * costMultiplier);
    factoriesWithComputed.push({ ...f, level, production, cost });
  }

  // Verifie si le joueur a tout debloque et rempli les conditions finales
  const allRealmsUnlocked = realms.length > 0 && playerRealms.length >= realms.length;
  const requirementsMet = endgameRequirements.every((req) => {
    const playerRes = playerResources.find((r) => r.resource_id === req.resource_id);
    const amount = playerRes ? Number(playerRes.amount) + Number(playerRes.amount_carry) : 0;
    return amount >= Number(req.amount);
  });

  const finalBadge = badges.find((b) => b.code === 'MONSTRE_DU_IDLE');
  const hasFinalBadge = finalBadge
    ? userBadges.some((ub) => ub.badge_id === finalBadge.id)
    : false;

  // Attribue le badge final si tout est valide
  if (finalBadge && allRealmsUnlocked && requirementsMet && !hasFinalBadge) {
    await insertUserBadge(userId, finalBadge.id);
    userBadges.push({
      badge_id: finalBadge.id,
      user_id: userId,
      obtained_at: new Date()
    });
  }

  const normalizedStats = normalizePlayerStats(userId, playerStats, playerRealms, playerFactories);

  return {
    realms,
    realmUnlockCosts,
    resources,
    factories: factoriesWithComputed,
    skills,
    endgameRequirements,
    badges,
    userBadges,
    player: {
      resources: playerResources,
      factories: playerFactories,
      skills: playerSkills,
      realms: playerRealms,
      state: playerState,
      stats: normalizedStats
    }
  };
}
