import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { authorController } from '@controllers/author.controller';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authorController.getAuthors);
router.get(`/:id`, authorController.getAuthor);
router.post(`/${ApiRoutesModifiers.NEW}`, authorController.createAuthor);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authorController.updateAuthor);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authorController.deleteAuthor)

export default router;
