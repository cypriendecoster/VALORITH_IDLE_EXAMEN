import { getPlayerSessions } from '../models/playerSessionModel.js';

export async function getPlayerSessionsController(req, res) {
  try {
    const sessions = await getPlayerSessions(req.user.id);
    return res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

