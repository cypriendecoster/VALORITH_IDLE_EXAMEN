import { getPlayerStats } from '../models/playerStatsModel.js';

export async function meController(req, res) {
  try {
    const userId = req.user.id;
    const stats = await getPlayerStats(userId);

    return res.status(200).json({
      id: userId,
      stats
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}
