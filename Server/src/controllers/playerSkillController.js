import { getPlayerSkills } from '../models/playerSkillModel.js';

export async function getPlayerSkillsController(req, res) {
  try {
    const skills = await getPlayerSkills(req.user.id);
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

