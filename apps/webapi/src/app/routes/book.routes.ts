import { Router } from 'express';

import { ApiRoutes, ApiRoutesModifiers } from '@core/enums';
import { bookController } from '@controllers/book.controller';
import { fileController } from '@controllers/file.controller';
import { moderatorMiddleware, authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, bookController.getBooks);
router.post(`/${ApiRoutesModifiers.NEW}`,  authMiddleware, moderatorMiddleware, bookController.createBook);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, moderatorMiddleware, bookController.updateBook);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`,  authMiddleware, moderatorMiddleware, bookController.deleteBook);

router.post(`/${ApiRoutes.FILE}/${ApiRoutesModifiers.SAVE}`, authMiddleware, moderatorMiddleware, fileController.saveFile);
router.get(`/${ApiRoutes.FILE}/:name`, fileController.getFile);

router.get(`/:id`, bookController.getBook);

export default router;
