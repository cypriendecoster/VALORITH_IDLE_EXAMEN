import { getPlayerResources } from '../models/playerResourceModel.js';
import { toResponseError } from '../utils/errors.js';

// Recupere les ressources possedees par le joueur connecte
export async function getPlayerResourcesController(req, res) {
  try {
    const resources = await getPlayerResources(req.user.id);
    return res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les ressources du joueur.',
      'PLAYER_RESOURCES_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

