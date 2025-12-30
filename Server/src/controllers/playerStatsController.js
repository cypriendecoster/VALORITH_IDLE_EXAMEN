import { getPlayerStats } from '../models/playerStatsModel.js';

export async function getPlayerStatsController(req, res) {
  try {
    const stats = await getPlayerStats(req.user.id);
    return res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

