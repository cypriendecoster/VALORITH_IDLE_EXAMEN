import { getAllSkills, getSkillsByRealm } from '../models/skillModel.js';

export async function getSkillsController(req, res) {
  try {
    const skills = await getAllSkills();
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

export async function getSkillsByRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({ message: 'Missing realmId' });
    }
    const skills = await getSkillsByRealm(realmId);
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
