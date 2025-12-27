import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerStateController } from '../controllers/playerStateController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerStateController);

export default router;
