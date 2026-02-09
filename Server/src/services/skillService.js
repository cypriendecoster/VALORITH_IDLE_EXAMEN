import { getSkillById } from '../models/skillModel.js';
import { getPlayerResource, updatePlayerResource } from '../models/playerResourceModel.js';
import {
  getPlayerSkill,
  insertPlayerSkill,
  updatePlayerSkillLevel
} from '../models/playerSkillModel.js';
import { getPlayerRealm } from '../models/playerRealmModel.js';
import { createError } from '../utils/errors.js';

export async function upgradeSkill(userId, skillId) {
  const skill = await getSkillById(skillId);
  if (!skill) {
    throw createError({
      code: 'SKILL_NOT_FOUND',
      message: 'Competence introuvable.',
      status: 404
    });
  }

  const realm = await getPlayerRealm(userId, skill.realm_id);
  if (!realm) {
    throw createError({
      code: 'REALM_NOT_UNLOCKED',
      message: 'Royaume non debloque.',
      status: 403
    });
  }

  const playerSkill = await getPlayerSkill(userId, skill.id);
  const currentLevel = playerSkill ? Number(playerSkill.level) : 0;

  if (currentLevel >= Number(skill.max_level)) {
    throw createError({
      code: 'SKILL_MAX_LEVEL',
      message: 'Niveau maximum atteint.',
      status: 400
    });
  }

  // Calcul du cout d amelioration
  const baseCost = Number(skill.base_cost_amount);
  const growth = Number(skill.cost_growth_factor);
  const cost = Math.ceil(baseCost * Math.pow(growth, currentLevel));

  const resource = await getPlayerResource(userId, skill.base_cost_resource_id);
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

  // Met a jour la competence du joueur
  if (!playerSkill) {
    await insertPlayerSkill(userId, skill.id, 1);
  } else {
    await updatePlayerSkillLevel(userId, skill.id, currentLevel + 1);
  }

  // Retire le cout des ressources du joueur
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
}

