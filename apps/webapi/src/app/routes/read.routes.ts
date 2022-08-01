import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { readController } from '@controllers/read.controller';
import { authMiddleware } from '@middlewares/index';

const router = Router();

router.get(`/:id`, authMiddleware, readController.getInfo);
router.post(`/${ApiRoutesModifiers.UPDATE}`, authMiddleware, readController.updateReadingInfo);

export default router;
