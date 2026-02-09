import { getPlayerRealms } from '../models/playerRealmModel.js';
import { activateRealm } from '../services/realmService.js';
import { toResponseError } from '../utils/errors.js';

export async function getPlayerRealmsController(req, res) {
  try {
    const realms = await getPlayerRealms(req.user.id);
    return res.status(200).json(realms);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les royaumes du joueur.',
      'PLAYER_REALMS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

export async function activatePlayerRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({
        message: 'Identifiant de royaume manquant.',
        code: 'REALM_ID_MISSING'
      });
    }

    const result = await activateRealm(req.user.id, realmId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible d’activer le royaume.',
      'REALM_ACTIVATE_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
