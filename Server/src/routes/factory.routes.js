import { Router } from 'express';
import {
  getFactoriesController,
  getFactoriesByRealmController
} from '../controllers/factoryController.js';

const router = Router();

router.get('/', getFactoriesController);
router.get('/realm/:realmId', getFactoriesByRealmController);

export default router;


