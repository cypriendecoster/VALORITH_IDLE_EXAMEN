import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerRealmsController, activatePlayerRealmController } from '../controllers/playerRealmController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerRealmsController);
router.post('/:realmId/activate', authMiddleware, activatePlayerRealmController);

export default router;
