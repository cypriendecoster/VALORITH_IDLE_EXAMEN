import { getAllResources } from '../models/resourceModel.js';

export async function getResourcesController(req, res) {
  try {
    const resources = await getAllResources();
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
