import { Router } from 'express';
import {
  meController,
  resetProgressController,
  deleteAccountController
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, meController);
router.post('/reset-progress', authMiddleware, resetProgressController);
router.delete('/me', authMiddleware, deleteAccountController);

export default router;
