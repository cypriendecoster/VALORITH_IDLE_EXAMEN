import { Router } from 'express';
import { getBadgesController } from '../controllers/badgeController.js';

const router = Router();

router.get('/', getBadgesController);

export default router;
