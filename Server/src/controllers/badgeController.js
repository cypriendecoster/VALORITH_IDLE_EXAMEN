import { getAllBadges } from '../models/badgeModel.js';
import { toResponseError } from '../utils/errors.js';

// Recupere la liste des badges disponibles dans le jeu
export async function getBadgesController(req, res) {
  try {
    const badges = await getAllBadges();
    return res.status(200).json(badges);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Impossible de charger les badges.', 'BADGES_FETCH_FAILED');
    return res.status(status).json({ message, code });
  }
}

