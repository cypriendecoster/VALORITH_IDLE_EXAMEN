import { getPlayerState } from '../models/playerStateModel.js';
import { toResponseError } from '../utils/errors.js';

export async function getPlayerStateController(req, res) {
  try {
    const state = await getPlayerState(req.user.id);
    return res.status(200).json(state);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger l’état du joueur.',
      'PLAYER_STATE_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
