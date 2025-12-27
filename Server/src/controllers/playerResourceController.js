import { getPlayerResources } from '../models/playerResourceModel.js';

export async function getPlayerResourcesController(req, res) {
  try {
    const resources = await getPlayerResources(req.user.id);
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
