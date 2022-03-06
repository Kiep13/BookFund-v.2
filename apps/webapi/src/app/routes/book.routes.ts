import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { bookController } from '@controllers/book.controller';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, bookController.getBooks);
router.post(`/${ApiRoutesModifiers.NEW}`, bookController.createBook);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, bookController.updateBook);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, bookController.deleteBook);
router.get(`/:id`, bookController.getBook);

export default router;
