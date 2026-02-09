import { getPlayerSkills } from '../models/playerSkillModel.js';
import { toResponseError } from '../utils/errors.js';

// Recupere les competences debloquees par le joueur connecte
export async function getPlayerSkillsController(req, res) {
  try {
    const skills = await getPlayerSkills(req.user.id);
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les competences du joueur.',
      'PLAYER_SKILLS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

