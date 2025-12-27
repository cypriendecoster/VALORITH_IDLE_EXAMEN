import { Router } from 'express';
import { getResourcesController } from '../controllers/resourceController.js';

const router = Router();

router.get('/', getResourcesController);

export default router;
