import { Router } from 'express';
import {
  getRealmUnlockCostsController,
  getRealmUnlockCostsByRealmController
} from '../controllers/realmUnlockCostController.js';

const router = Router();

router.get('/', getRealmUnlockCostsController);
router.get('/realm/:realmId', getRealmUnlockCostsByRealmController);

export default router;
