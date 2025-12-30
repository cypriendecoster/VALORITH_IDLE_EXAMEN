import { getPlayerState } from '../models/playerStateModel.js';

export async function getPlayerStateController(req, res) {
  try {
    const state = await getPlayerState(req.user.id);
    return res.status(200).json(state);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

