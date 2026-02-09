import { getRealmUnlockCostsByRealm } from '../models/realmUnlockCostModel.js';
import { getFactoriesByRealm } from '../models/factoryModel.js';
import { getPlayerFactory, insertPlayerFactory, updatePlayerFactoryLevel } from '../models/playerFactoryModel.js';
import { getPlayerResource, insertPlayerResource, updatePlayerResource } from '../models/playerResourceModel.js';
import { getPlayerRealm, insertPlayerRealm, setActiveRealm } from '../models/playerRealmModel.js';
import { createError } from '../utils/errors.js';

export async function unlockRealm(userId, realmId) {
  const existing = await getPlayerRealm(userId, realmId);
  if (existing) {
    throw createError({
      code: 'REALM_ALREADY_UNLOCKED',
      message: 'Royaume deja debloque.',
      status: 400
    });
  }

  const costs = await getRealmUnlockCostsByRealm(realmId);
  if (costs.length === 0) {
    throw createError({
      code: 'REALM_UNLOCK_COSTS_MISSING',
      message: 'Deblocage indisponible pour ce royaume.',
      status: 500
    });
  }

  // Verifie que le joueur a assez de ressources
  for (const cost of costs) {
    const res = await getPlayerResource(userId, cost.resource_id);
    const amount = res ? Number(res.amount) + Number(res.amount_carry) : 0;
    if (amount < Number(cost.amount)) {
      throw createError({
        code: 'RESOURCES_INSUFFICIENT',
        message: 'Ressources insuffisantes.',
        status: 400
      });
    }
  }

  // Retire le cout des ressources
  for (const cost of costs) {
    const res = await getPlayerResource(userId, cost.resource_id);
    const total = Number(res.amount) + Number(res.amount_carry) - Number(cost.amount);

    const newAmount = Math.floor(total);
    const newCarry = total - newAmount;

    await updatePlayerResource({
      userId,
      resourceId: cost.resource_id,
      amount: newAmount,
      amountCarry: newCarry,
      addLifetime: 0
    });
  }

  await insertPlayerRealm(userId, realmId);
  await setActiveRealm(userId, realmId);

  // Donne une usine de depart si besoin
  const factories = await getFactoriesByRealm(realmId);
  if (factories.length > 0) {
    const starterFactory = factories[0];
    const existingFactory = await getPlayerFactory(userId, starterFactory.id);
    if (!existingFactory) {
      await insertPlayerFactory(userId, starterFactory.id, 1);
    } else if (Number(existingFactory.level) < 1) {
      await updatePlayerFactoryLevel(userId, starterFactory.id, 1);
    }
    const existingResource = await getPlayerResource(userId, starterFactory.resource_id);
    if (!existingResource) {
      await insertPlayerResource({
        userId,
        resourceId: starterFactory.resource_id,
        amount: 0,
        amountCarry: 0
      });
    }
  }

  return { realmId };
}

export async function activateRealm(userId, realmId) {
  const existing = await getPlayerRealm(userId, realmId);
  if (!existing) {
    throw createError({
      code: 'REALM_NOT_UNLOCKED',
      message: 'Royaume non debloque.',
      status: 400
    });
  }

  await setActiveRealm(userId, realmId);

  return { realmId };
}

