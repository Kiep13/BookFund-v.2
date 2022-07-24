import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { collectionController } from '@controllers/colllection.controller';
import { moderatorMiddleware,authMiddleware } from '@middlewares/index';

const router = Router();

router.get(`/${ApiRoutesModifiers.LIST}`, collectionController.getCollections);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, moderatorMiddleware, collectionController.createCollection);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, moderatorMiddleware, collectionController.updateCollection);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, moderatorMiddleware, collectionController.deleteCollection);
router.get(`/:id`, collectionController.getCollection);

export default router;
