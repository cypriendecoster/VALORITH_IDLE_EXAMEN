import { getAllRealms } from '../models/realmModel.js';
import { getFactoriesByRealm } from '../models/factoryModel.js';
import { getPlayerRealms, insertPlayerRealm, setActiveRealm } from '../models/playerRealmModel.js';
import { getPlayerFactory, insertPlayerFactory } from '../models/playerFactoryModel.js';
import { getPlayerResource, insertPlayerResource } from '../models/playerResourceModel.js';
import { upsertPlayerState } from '../models/playerStateModel.js';

export async function bootstrapNewPlayer(userId) {
  try {
    const existingRealms = await getPlayerRealms(userId);
    if (existingRealms.length > 0) {
      return { skipped: true };
    }

    const realms = await getAllRealms();
    if (!realms.length) {
      throw new Error('No realms found');
    }

    const defaultRealm = realms.find((r) => r.is_default_unlocked === 1) || realms[0];

    const factories = await getFactoriesByRealm(defaultRealm.id);
    if (!factories.length) {
      throw new Error('No factories found for default realm');
    }

    const starterFactory = factories[0];

    await insertPlayerRealm(userId, defaultRealm.id);
    await setActiveRealm(userId, defaultRealm.id);

    const existingFactory = await getPlayerFactory(userId, starterFactory.id);
    if (!existingFactory) {
      await insertPlayerFactory(userId, starterFactory.id, 1);
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

    await upsertPlayerState(userId, new Date());

    return {
      realmId: defaultRealm.id,
      factoryId: starterFactory.id
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Player bootstrap failed');
  }
}

