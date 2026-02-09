import { getPlayerSkills } from '../models/playerSkillModel.js';
import { toResponseError } from '../utils/errors.js';

// Récupère les compétences débloquées par le joueur connecté
export async function getPlayerSkillsController(req, res) {
  try {
    const skills = await getPlayerSkills(req.user.id);
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les compétences du joueur.',
      'PLAYER_SKILLS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
