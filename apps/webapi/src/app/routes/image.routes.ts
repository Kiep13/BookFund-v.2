import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { imageController } from '@controllers/image.controller';
import { adminMiddleware,authMiddleware } from '@middlewares/index'

const router = new Router();

router.post(`/${ApiRoutesModifiers.SAVE}`, authMiddleware, adminMiddleware, imageController.saveImage);
router.get(`/:name`, imageController.getImage);

export default router;
