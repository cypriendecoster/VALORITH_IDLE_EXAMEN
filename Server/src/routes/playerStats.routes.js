import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerStatsController } from '../controllers/playerStatsController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerStatsController);

export default router;
