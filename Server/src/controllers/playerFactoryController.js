import { getPlayerFactories } from '../models/playerFactoryModel.js';
import { toResponseError } from '../utils/errors.js';

export async function getPlayerFactoriesController(req, res) {
  try {
    const factories = await getPlayerFactories(req.user.id);
    return res.status(200).json(factories);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les usines du joueur.',
      'PLAYER_FACTORIES_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
