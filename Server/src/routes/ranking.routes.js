import { Router } from 'express';
import {
  getEndgameRankingController,
  getResourceRankingController
} from '../controllers/rankingController.js';

const router = Router();

router.get('/endgame', getEndgameRankingController);
router.get('/resources', getResourceRankingController);

export default router;
