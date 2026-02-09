import { getPlayerStats } from '../models/playerStatsModel.js';
import { toResponseError } from '../utils/errors.js';

// Récupère les statistiques globales du joueur connecté
export async function getPlayerStatsController(req, res) {
  try {
    const stats = await getPlayerStats(req.user.id);
    return res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les statistiques du joueur.',
      'PLAYER_STATS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
