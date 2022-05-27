import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { folderController } from '@controllers/folder.controller';
import { authMiddleware } from '@middlewares/index';
const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, folderController.getFolders);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, folderController.createFolder);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, folderController.updateFolder);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, folderController.deleteFolder);

router.get(`/:id`, authMiddleware, folderController.getFolder);

export default router;
