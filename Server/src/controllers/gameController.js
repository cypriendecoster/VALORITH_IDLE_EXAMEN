import { getGameSnapshot } from '../services/gameSnapshotService.js';
import { idleTick } from '../services/idleService.js';
import { upgradeFactory } from '../services/factoryService.js';
import { upgradeSkill } from '../services/skillService.js';
import { unlockRealm } from '../services/realmService.js';

export async function getGameSnapshotController(req, res) {
  try {
    const data = await getGameSnapshot(req.user.id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

export async function idleTickController(req, res) {
  try {
    const result = await idleTick(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

export async function upgradeFactoryController(req, res) {
  try {
    const { factoryId } = req.params;
    if (!factoryId) {
      return res.status(400).json({ message: 'Missing factoryId' });
    }

    const result = await upgradeFactory(req.user.id, factoryId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.message === 'Not enough resources' ? 400 : 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}

export async function upgradeSkillController(req, res) {
  try {
    const { skillId } = req.params;
    if (!skillId) {
      return res.status(400).json({ message: 'Missing skillId' });
    }

    const result = await upgradeSkill(req.user.id, skillId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.message === 'Not enough resources' || error.message === 'Skill max level reached'
      ? 400
      : 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}
export async function unlockRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({ message: 'Missing realmId' });
    }

    const result = await unlockRealm(req.user.id, realmId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.message === 'Not enough resources' ? 400 : 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}






