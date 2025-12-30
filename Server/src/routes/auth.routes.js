import { Router } from 'express';
import {
  registerController,
  loginController,
  requestPasswordResetController,
  resetPasswordController
} from '../controllers/authController.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', requestPasswordResetController);
router.post('/reset-password', resetPasswordController);

export default router;
