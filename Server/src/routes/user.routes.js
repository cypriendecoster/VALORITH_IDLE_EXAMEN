import { Router } from 'express';
import { meController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, meController);

export default router;