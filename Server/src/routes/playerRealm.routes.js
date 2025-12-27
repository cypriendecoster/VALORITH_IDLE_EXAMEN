import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerRealmsController } from '../controllers/playerRealmController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerRealmsController);

export default router;
