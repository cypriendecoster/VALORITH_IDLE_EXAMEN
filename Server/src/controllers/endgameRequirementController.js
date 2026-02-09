import { getAllEndgameRequirements } from '../models/endgameRequirementModel.js';
import { toResponseError } from '../utils/errors.js';

// recupere les donnees de fin du jeu
export async function getEndgameRequirementsController(req, res) {
  try {
    const requirements = await getAllEndgameRequirements();
    return res.status(200).json(requirements);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les conditions de fin de jeu.',
      'ENDGAME_REQUIREMENTS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

