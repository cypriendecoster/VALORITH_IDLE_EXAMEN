import { getAllBadges } from '../models/badgeModel.js';

export async function getBadgesController(req, res) {
  try {
    const badges = await getAllBadges();
    return res.status(200).json(badges);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
