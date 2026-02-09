import { getGameSnapshot } from '../services/gameSnapshotService.js';
import { idleTick } from '../services/idleService.js';
import { upgradeFactory } from '../services/factoryService.js';
import { upgradeSkill } from '../services/skillService.js';
import { unlockRealm } from '../services/realmService.js';
import { toResponseError } from '../utils/errors.js';

export async function getGameSnapshotController(req, res) {
  try {
    const data = await getGameSnapshot(req.user.id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de charger le jeu.',
      'GAME_SNAPSHOT_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

export async function idleTickController(req, res) {
  try {
    const result = await idleTick(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de calculer le hors-ligne.',
      'IDLE_TICK_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

export async function upgradeFactoryController(req, res) {
  try {
    const { factoryId } = req.params;
    if (!factoryId) {
      return res.status(400).json({
        message: 'Identifiant d’usine manquant.',
        code: 'FACTORY_ID_MISSING'
      });
    }

    const result = await upgradeFactory(req.user.id, factoryId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible d’améliorer l’usine.',
      'FACTORY_UPGRADE_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

export async function upgradeSkillController(req, res) {
  try {
    const { skillId } = req.params;
    if (!skillId) {
      return res.status(400).json({
        message: 'Identifiant de compétence manquant.',
        code: 'SKILL_ID_MISSING'
      });
    }

    const result = await upgradeSkill(req.user.id, skillId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible d’améliorer la compétence.',
      'SKILL_UPGRADE_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
export async function unlockRealmController(req, res) {
  try {
    const { realmId } = req.params;
    if (!realmId) {
      return res.status(400).json({
        message: 'Identifiant de royaume manquant.',
        code: 'REALM_ID_MISSING'
      });
    }

    const result = await unlockRealm(req.user.id, realmId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de débloquer le royaume.',
      'REALM_UNLOCK_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}






