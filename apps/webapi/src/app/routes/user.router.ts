import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { userController } from '@controllers/user.controller';
import { moderatorMiddleware, authMiddleware, adminMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, moderatorMiddleware, userController.getUsers);
router.get(`/:id`, authMiddleware, moderatorMiddleware, userController.getUser);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, adminMiddleware, userController.updateUser);

export default router;
