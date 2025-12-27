import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getPlayerSkillsController } from '../controllers/playerSkillController.js';

const router = Router();

router.get('/', authMiddleware, getPlayerSkillsController);

export default router;
