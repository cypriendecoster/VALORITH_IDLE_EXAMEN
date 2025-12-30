import { getAllRealms } from '../models/realmModel.js';

export async function getRealmsController(req, res) {
  try {
    const realms = await getAllRealms();
    return res.status(200).json(realms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}



