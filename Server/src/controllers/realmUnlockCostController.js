import {
  getAllRealmUnlockCosts,
  getRealmUnlockCostsByRealm
} from '../models/realmUnlockCostModel.js';
import { toResponseError } from '../utils/errors.js';

export async function getRealmUnlockCostsController(req, res) {
  try {
    const costs = await getAllRealmUnlockCosts();
    return res.status(200).json(costs);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les coûts de déblocage.',
      'REALM_UNLOCK_COSTS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

export async function getRealmUnlockCostsByRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({
        message: 'Identifiant de royaume manquant.',
        code: 'REALM_ID_MISSING'
      });
    }
    const costs = await getRealmUnlockCostsByRealm(realmId);
    return res.status(200).json(costs);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les coûts de déblocage.',
      'REALM_UNLOCK_COSTS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
