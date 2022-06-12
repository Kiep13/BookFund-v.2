import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { authorController } from '@controllers/author.controller';
import { moderatorMiddleware,authMiddleware } from '@middlewares/index';
const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authorController.getAuthors);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, moderatorMiddleware, authorController.createAuthor);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, moderatorMiddleware, authorController.updateAuthor);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, moderatorMiddleware, authorController.deleteAuthor);
router.get(`/:id`, authorController.getAuthor);

export default router;
