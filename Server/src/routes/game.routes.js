import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  getGameSnapshotController,
  idleTickController,
  upgradeFactoryController,
  unlockRealmController,
  upgradeSkillController,
} from '../controllers/gameController.js';

const router = Router();

router.get('/snapshot', authMiddleware, getGameSnapshotController);
router.post('/idle-tick', authMiddleware, idleTickController);
router.post('/factories/:factoryId/upgrade', authMiddleware, upgradeFactoryController);
router.post('/skills/:skillId/upgrade', authMiddleware, upgradeSkillController);
router.post('/realms/:realmId/unlock', authMiddleware, unlockRealmController);

export default router;


