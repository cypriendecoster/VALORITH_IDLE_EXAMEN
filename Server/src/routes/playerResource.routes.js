import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerResourcesController } from '../controllers/playerResourceController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerResourcesController);

export default router;
