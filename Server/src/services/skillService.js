import { getSkillById } from '../models/skillModel.js';
import { getPlayerResource, updatePlayerResource } from '../models/playerResourceModel.js';
import {
  getPlayerSkill,
  insertPlayerSkill,
  updatePlayerSkillLevel
} from '../models/playerSkillModel.js';
import { getPlayerRealm } from '../models/playerRealmModel.js';

export async function upgradeSkill(userId, skillId) {
  try {
    const skill = await getSkillById(skillId);
    if (!skill) {
      throw new Error('Skill not found');
    }

    const realm = await getPlayerRealm(userId, skill.realm_id);
    if (!realm) {
      throw new Error('Realm not unlocked');
    }

    const playerSkill = await getPlayerSkill(userId, skill.id);
    const currentLevel = playerSkill ? Number(playerSkill.level) : 0;

    if (currentLevel >= Number(skill.max_level)) {
      throw new Error('Skill max level reached');
    }

    const cost = Math.ceil(
      Number(skill.base_cost_amount) * Math.pow(Number(skill.cost_growth_factor), currentLevel)
    );

    const resource = await getPlayerResource(userId, skill.base_cost_resource_id);
    const currentAmount = resource ? Number(resource.amount) : 0;
    const currentCarry = resource ? Number(resource.amount_carry) : 0;
    const total = currentAmount + currentCarry;

    if (total < cost) {
      throw new Error('Not enough resources');
    }

    const newTotal = total - cost;
    const newAmount = Math.floor(newTotal);
    const newCarry = newTotal - newAmount;

    if (!playerSkill) {
      await insertPlayerSkill(userId, skill.id, 1);
    } else {
      await updatePlayerSkillLevel(userId, skill.id, currentLevel + 1);
    }

    await updatePlayerResource({
      userId,
      resourceId: skill.base_cost_resource_id,
      amount: newAmount,
      amountCarry: newCarry,
      addLifetime: 0
    });

    return {
      skillId: skill.id,
      newLevel: currentLevel + 1,
      resourceId: skill.base_cost_resource_id,
      amount: newAmount,
      amountCarry: newCarry,
      cost
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Skill upgrade failed');
  }
}
