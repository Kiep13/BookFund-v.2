import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { authorController } from '@controllers/author.controller';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authorController.getAuthors);
router.post(`/${ApiRoutesModifiers.NEW}`, authorController.createAuthor);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authorController.updateAuthor);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authorController.deleteAuthor);
router.get(`/:id`, authorController.getAuthor);

export default router;
