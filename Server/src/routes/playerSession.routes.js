import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerSessionsController } from '../controllers/playerSessionController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerSessionsController);

export default router;
