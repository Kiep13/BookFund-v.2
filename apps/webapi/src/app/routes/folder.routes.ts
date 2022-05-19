import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { folderController } from '@controllers/folder.controller';
import { authMiddleware } from '@middlewares/index';
const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, folderController.getFolders);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, folderController.createFolder);

export default router;
