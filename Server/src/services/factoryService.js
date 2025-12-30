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

export async function upgradeFactory(userId, factoryId) {
  try {
    const factory = await getFactoryById(factoryId);
    if (!factory) {
      throw new Error('Factory not found');
    }

    const realm = await getPlayerRealm(userId, factory.realm_id);
    if (!realm) {
      throw new Error('Realm not unlocked');
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
      throw new Error('Not enough resources');
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
    throw new Error(error.message || 'Factory upgrade failed');
  }
}
