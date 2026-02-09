import { getEndgameRanking, getResourceRanking } from '../models/rankingModel.js';
import { toResponseError } from '../utils/errors.js';

// Recupere le classement de fin de jeu
export async function getEndgameRankingController(req, res) {
  try {
    const limit = Number(req.query.limit) || 50;
    const ranking = await getEndgameRanking(limit);
    return res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger le classement.',
      'ENDGAME_RANKING_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

// Recupere le classement des joueurs par ressources cumulees
export async function getResourceRankingController(req, res) {
  try {
    const limit = Number(req.query.limit) || 50;
    const ranking = await getResourceRanking(limit);
    return res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger le classement.',
      'RESOURCE_RANKING_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

