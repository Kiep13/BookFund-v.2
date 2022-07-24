import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { commentController } from '@controllers/comment.controller';
import { authMiddleware } from '@middlewares/index';

const router = Router();

router.get(`/${ApiRoutesModifiers.LIST}`, commentController.getComments);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, commentController.createComment);

export default router;
