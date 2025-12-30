import { getRealmUnlockCostsByRealm } from '../models/realmUnlockCostModel.js';
import { getPlayerResource, updatePlayerResource } from '../models/playerResourceModel.js';
import { getPlayerRealm, insertPlayerRealm, setActiveRealm } from '../models/playerRealmModel.js';

export async function unlockRealm(userId, realmId) {
  try {
    const existing = await getPlayerRealm(userId, realmId);
    if (existing) {
      throw new Error('Realm already unlocked');
    }

    const costs = await getRealmUnlockCostsByRealm(realmId);
    if (costs.length === 0) {
      throw new Error('No unlock costs found');
    }

    for (const cost of costs) {
      const res = await getPlayerResource(userId, cost.resource_id);
      const amount = res ? Number(res.amount) + Number(res.amount_carry) : 0;
      if (amount < Number(cost.amount)) {
        throw new Error('Not enough resources');
      }
    }

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

    return { realmId };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Realm unlock failed');
  }
}

export async function activateRealm(userId, realmId) {
  try {
    const existing = await getPlayerRealm(userId, realmId);
    if (!existing) {
      throw new Error('Realm not unlocked');
    }

    await setActiveRealm(userId, realmId);

    return { realmId };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Activate realm failed');
  }
}
