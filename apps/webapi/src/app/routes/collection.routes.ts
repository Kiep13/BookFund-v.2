import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { collectionController } from '@controllers/colllection.controller';

const router = new Router();

router.post(`/${ApiRoutesModifiers.NEW}`, collectionController.createCollection);

export default router;
