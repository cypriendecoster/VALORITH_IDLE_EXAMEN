import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerFactoriesController } from '../controllers/playerFactoryController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerFactoriesController);

export default router;
