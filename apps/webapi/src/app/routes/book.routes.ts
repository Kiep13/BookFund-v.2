import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { bookController } from '@controllers/book.controller';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, bookController.getBooks);
router.post(`/${ApiRoutesModifiers.NEW}`, bookController.createBook);

export default router;
