import { getAllSkills, getSkillsByRealm } from '../models/skillModel.js';
import { toResponseError } from '../utils/errors.js';

// Recupere la liste complete des competences du jeu
export async function getSkillsController(req, res) {
  try {
    const skills = await getAllSkills();
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les competences.',
      'SKILLS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

// Recupere les competences associees a un royaume precis
export async function getSkillsByRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({
        message: 'Identifiant de royaume manquant.',
        code: 'REALM_ID_MISSING'
      });
    }
    const skills = await getSkillsByRealm(realmId);
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger les competences.',
      'SKILLS_FETCH_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

