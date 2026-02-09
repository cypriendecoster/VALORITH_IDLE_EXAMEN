import { getAllResources } from '../models/resourceModel.js';
import { toResponseError } from '../utils/errors.js';

// Recupere la liste des ressources disponibles dans le jeu
export async function getResourcesController(req, res) {
  try {
    const resources = await getAllResources();
    return res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les ressources.',
      'RESOURCES_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

