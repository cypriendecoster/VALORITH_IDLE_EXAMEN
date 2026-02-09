import { getPlayerSessions } from '../models/playerSessionModel.js';
import { toResponseError } from '../utils/errors.js';

// Récupère l’historique des sessions du joueur connecté
export async function getPlayerSessionsController(req, res) {
  try {
    const sessions = await getPlayerSessions(req.user.id);
    return res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les sessions du joueur.',
      'PLAYER_SESSIONS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
