import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import {
  getAdminTablesController,
  getAdminTableSchemaController,
  listAdminRowsController,
  getAdminRowController,
  createAdminRowController,
  updateAdminRowController,
  deleteAdminRowController
} from '../controllers/adminController.js';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/tables', getAdminTablesController);
router.get('/:table/schema', getAdminTableSchemaController);
router.get('/:table', listAdminRowsController);
router.get('/:table/:id', getAdminRowController);
router.post('/:table', createAdminRowController);
router.put('/:table/:id', updateAdminRowController);
router.delete('/:table/:id', deleteAdminRowController);

export default router;
