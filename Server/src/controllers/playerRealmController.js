import { getPlayerRealms } from '../models/playerRealmModel.js';

export async function getPlayerRealmsController(req, res) {
  try {
    const realms = await getPlayerRealms(req.user.id);
    return res.status(200).json(realms);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
