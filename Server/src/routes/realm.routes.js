import { Router } from 'express';
import { getRealmsController } from '../controllers/realmController.js';

const router = Router();

router.get('/', getRealmsController);

export default router;
