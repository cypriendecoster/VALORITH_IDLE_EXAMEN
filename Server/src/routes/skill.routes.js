import { Router } from 'express';
import {
  getSkillsController,
  getSkillsByRealmController
} from '../controllers/skillController.js';

const router = Router();

router.get('/', getSkillsController);
router.get('/realm/:realmId', getSkillsByRealmController);

export default router;
