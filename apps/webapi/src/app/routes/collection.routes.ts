import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { collectionController } from '@controllers/colllection.controller';
import { adminMiddleware,authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, collectionController.getCollections);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, adminMiddleware, collectionController.createCollection);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, adminMiddleware, collectionController.updateCollection);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, adminMiddleware, collectionController.deleteCollection);
router.get(`/:id`, collectionController.getCollection);

export default router;
