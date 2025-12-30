import {
  getAllRealmUnlockCosts,
  getRealmUnlockCostsByRealm
} from '../models/realmUnlockCostModel.js';

export async function getRealmUnlockCostsController(req, res) {
  try {
    const costs = await getAllRealmUnlockCosts();
    return res.status(200).json(costs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

export async function getRealmUnlockCostsByRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({ message: 'Missing realmId' });
    }
    const costs = await getRealmUnlockCostsByRealm(realmId);
    return res.status(200).json(costs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

