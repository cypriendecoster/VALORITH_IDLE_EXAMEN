import { getAllSkills } from '../models/skillModel.js';
import {
  getPlayerResource,
  insertPlayerResource,
  updatePlayerResource
} from '../models/playerResourceModel.js';
import { getPlayerFactoriesForIdle } from '../models/playerFactoryModel.js';
import { getPlayerSkills } from '../models/playerSkillModel.js';
import { getPlayerState, upsertPlayerState } from '../models/playerStateModel.js';
import { buildSkillLevelMap, getFactorySkillModifiers } from './skillEffectsService.js';

export async function idleTick(userId) {
  try {
    const now = new Date();

    const state = await getPlayerState(userId);
    const lastUpdate = state?.last_idle_update ? new Date(state.last_idle_update) : now;
    const rawDeltaSeconds = Math.max(0, Math.floor((now - lastUpdate) / 1000));
    const offlineThreshold = Number(process.env.IDLE_OFFLINE_THRESHOLD_SECONDS || 30);
    const isOffline = rawDeltaSeconds > Math.max(1, offlineThreshold);
    const cappedDeltaSeconds = Math.min(rawDeltaSeconds, 2 * 60 * 60);
    const deltaSeconds = isOffline ? cappedDeltaSeconds : rawDeltaSeconds;
    const offlineMultiplier = isOffline ? 0.3 : 1;

    if (deltaSeconds === 0) {
      return { deltaSeconds: 0, updated: [] };
    }

    const [factories, skills, playerSkills] = await Promise.all([
      getPlayerFactoriesForIdle(userId),
      getAllSkills(),
      getPlayerSkills(userId)
    ]);

    const playerSkillLevels = buildSkillLevelMap(playerSkills);

    const gainsByResource = {};
    for (const f of factories) {
      const { productionMultiplier } = getFactorySkillModifiers(
        f,
        skills,
        playerSkillLevels,
        { includeIdleBonus: isOffline }
      );
      const gain = Number(f.base_production) * Number(f.level) * deltaSeconds
        * productionMultiplier * offlineMultiplier;
      if (!gainsByResource[f.resource_id]) {
        gainsByResource[f.resource_id] = 0;
      }
      gainsByResource[f.resource_id] += gain;
    }

    const updated = [];

    for (const [resourceIdStr, gain] of Object.entries(gainsByResource)) {
      const resourceId = Number(resourceIdStr);
      const existing = await getPlayerResource(userId, resourceId);

      const currentAmount = existing ? Number(existing.amount) : 0;
      const currentCarry = existing ? Number(existing.amount_carry) : 0;

      const total = currentAmount + currentCarry + gain;
      const newAmount = Math.floor(total);
      const newCarry = total - newAmount;

      if (!existing) {
        await insertPlayerResource({
          userId,
          resourceId,
          amount: newAmount,
          amountCarry: newCarry
        });
      } else {
        await updatePlayerResource({
          userId,
          resourceId,
          amount: newAmount,
          amountCarry: newCarry,
          addLifetime: gain
        });
      }

      updated.push({
        resourceId,
        amount: newAmount,
        amountCarry: newCarry,
        gain
      });
    }

    await upsertPlayerState(userId, now);

    return {
      deltaSeconds,
      updated,
      isOffline,
      offlineMultiplier,
      appliedSeconds: deltaSeconds,
      idleBonusApplied: isOffline
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Idle tick failed');
  }
}
