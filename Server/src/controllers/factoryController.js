import { getAllFactories, getFactoriesByRealm } from '../models/factoryModel.js';
import { toResponseError } from '../utils/errors.js';

// Récupère la liste complète des usines disponibles
export async function getFactoriesController(req, res) {
  try {
    const factories = await getAllFactories();
    return res.status(200).json(factories);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les usines.',
      'FACTORIES_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

// Récupère les usines associées à un royaume précis
export async function getFactoriesByRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({
        message: 'Identifiant de royaume manquant.',
        code: 'REALM_ID_MISSING'
      });
    }

    const factories = await getFactoriesByRealm(realmId);
    return res.status(200).json(factories);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les usines.',
      'FACTORIES_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
