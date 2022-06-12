import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { imageController } from '@controllers/image.controller';
import { moderatorMiddleware,authMiddleware } from '@middlewares/index'

const router = new Router();

router.post(`/${ApiRoutesModifiers.SAVE}`, authMiddleware, moderatorMiddleware, imageController.saveImage);
router.get(`/:name`, imageController.getImage);

export default router;
