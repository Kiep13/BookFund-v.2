import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { folderController } from '@controllers/folder.controller';
import { authMiddleware } from '@middlewares/index';
const router = new Router();

router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, folderController.createFolder);

export default router;
