import { getAllSkills } from '../models/skillModel.js';
import { getFactoryById } from '../models/factoryModel.js';
import { getPlayerResource, updatePlayerResource } from '../models/playerResourceModel.js';
import { getPlayerSkills } from '../models/playerSkillModel.js';
import {
  getPlayerFactory,
  insertPlayerFactory,
  updatePlayerFactoryLevel
} from '../models/playerFactoryModel.js';
import { getPlayerRealm } from '../models/playerRealmModel.js';
import { buildSkillLevelMap, getFactorySkillModifiers } from './skillEffectsService.js';
import { createError } from '../utils/errors.js';

export async function upgradeFactory(userId, factoryId) {
  try {
    const factory = await getFactoryById(factoryId);
    if (!factory) {
      throw createError({
        code: 'FACTORY_NOT_FOUND',
        message: 'Usine introuvable.',
        status: 404
      });
    }

    const realm = await getPlayerRealm(userId, factory.realm_id);
    if (!realm) {
      throw createError({
        code: 'REALM_NOT_UNLOCKED',
        message: 'Royaume non débloqué.',
        status: 403
      });
    }

    const playerFactory = await getPlayerFactory(userId, factory.id);
    const currentLevel = playerFactory ? Number(playerFactory.level) : 0;

    const [skills, playerSkills] = await Promise.all([
      getAllSkills(),
      getPlayerSkills(userId)
    ]);

    const playerSkillLevels = buildSkillLevelMap(playerSkills);
    const { costMultiplier } = getFactorySkillModifiers(factory, skills, playerSkillLevels);

    const cost = Math.ceil(
      Number(factory.base_cost) * Math.pow(1.0175, currentLevel) * costMultiplier
    );

    const resource = await getPlayerResource(userId, factory.resource_id);
    const currentAmount = resource ? Number(resource.amount) : 0;
    const currentCarry = resource ? Number(resource.amount_carry) : 0;
    const total = currentAmount + currentCarry;

    if (total < cost) {
      throw createError({
        code: 'RESOURCES_INSUFFICIENT',
        message: 'Ressources insuffisantes.',
        status: 400
      });
    }

    const newTotal = total - cost;
    const newAmount = Math.floor(newTotal);
    const newCarry = newTotal - newAmount;

    if (!playerFactory) {
      await insertPlayerFactory(userId, factory.id, 1);
    } else {
      await updatePlayerFactoryLevel(userId, factory.id, currentLevel + 1);
    }

    await updatePlayerResource({
      userId,
      resourceId: factory.resource_id,
      amount: newAmount,
      amountCarry: newCarry,
      addLifetime: 0
    });

    return {
      factoryId: factory.id,
      newLevel: currentLevel + 1,
      resourceId: factory.resource_id,
      amount: newAmount,
      amountCarry: newCarry,
      cost
    };
  } catch (error) {
    console.error(error);
    if (error?.code) {
      throw error;
    }
    throw createError({
      code: 'FACTORY_UPGRADE_FAILED',
      message: 'Impossible d’améliorer l’usine pour le moment.',
      status: 500
    });
  }
}
