import { Router } from 'express';

import {  ApiRoutesModifiers } from '@core/enums';
import { userController } from '@controllers/user.controller';
import { adminMiddleware, authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, adminMiddleware, userController.getUsers);

export default router;
