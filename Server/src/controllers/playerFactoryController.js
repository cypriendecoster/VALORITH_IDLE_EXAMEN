import { getPlayerFactories } from '../models/playerFactoryModel.js';

export async function getPlayerFactoriesController(req, res) {
  try {
    const factories = await getPlayerFactories(req.user.id);
    return res.status(200).json(factories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

