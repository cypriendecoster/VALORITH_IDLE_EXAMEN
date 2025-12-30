import { getPlayerRealms } from '../models/playerRealmModel.js';
import { activateRealm } from '../services/realmService.js';

export async function getPlayerRealmsController(req, res) {
  try {
    const realms = await getPlayerRealms(req.user.id);
    return res.status(200).json(realms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

export async function activatePlayerRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({ message: 'Missing realmId' });
    }

    const result = await activateRealm(req.user.id, realmId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.message === 'Realm not unlocked' ? 400 : 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}

