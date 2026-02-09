import { getAllRealms } from '../models/realmModel.js';
import { toResponseError } from '../utils/errors.js';

export async function getRealmsController(req, res) {
  try {
    const realms = await getAllRealms();
    return res.status(200).json(realms);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les royaumes.',
      'REALMS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
