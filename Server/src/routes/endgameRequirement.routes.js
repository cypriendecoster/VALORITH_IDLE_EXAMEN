import { Router } from 'express';
import { getEndgameRequirementsController } from '../controllers/endgameRequirementController.js';

const router = Router();

router.get('/', getEndgameRequirementsController);

export default router;
