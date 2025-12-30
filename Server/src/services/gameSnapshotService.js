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

export async function getGameSnapshot(userId) {
  try {
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

    const factoryLevels = playerFactories.reduce((acc, pf) => {
      acc[pf.factory_id] = pf.level;
      return acc;
    }, {});

    const playerSkillLevels = buildSkillLevelMap(playerSkills);

    const factoriesWithComputed = factories.map((f) => {
      const level = factoryLevels[f.id] || 0;
      const { productionMultiplier, costMultiplier } = getFactorySkillModifiers(
        f,
        skills,
        playerSkillLevels
      );
      const production = Number(f.base_production) * (1 + level) * productionMultiplier;
      const cost = Math.ceil(Number(f.base_cost) * Math.pow(1.0175, level) * costMultiplier);
      return { ...f, level, production, cost };
    });

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

    if (finalBadge && allRealmsUnlocked && requirementsMet && !hasFinalBadge) {
      await insertUserBadge(userId, finalBadge.id);
      userBadges.push({
        badge_id: finalBadge.id,
        user_id: userId,
        obtained_at: new Date()
      });
    }

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
        stats: playerStats
      }
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Game snapshot failed');
  }
}
