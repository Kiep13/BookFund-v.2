import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { collectionController } from '@controllers/colllection.controller';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, collectionController.getCollections);
router.post(`/${ApiRoutesModifiers.NEW}`, collectionController.createCollection);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, collectionController.deleteCollection);

export default router;
