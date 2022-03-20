import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { bookController } from '@controllers/book.controller';
import { adminMiddleware, authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, bookController.getBooks);
router.post(`/${ApiRoutesModifiers.NEW}`,  authMiddleware, adminMiddleware, bookController.createBook);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, adminMiddleware, bookController.updateBook);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`,  authMiddleware, adminMiddleware, bookController.deleteBook);
router.get(`/:id`, bookController.getBook);

export default router;
