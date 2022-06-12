import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { genreController } from '@controllers/genre.controller';
import { moderatorMiddleware,authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, genreController.getGenres);
router.get(`/${ApiRoutesModifiers.TREE}`, genreController.getGenresTree);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, moderatorMiddleware,genreController.createGenre);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, moderatorMiddleware,genreController.updateGenre);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, moderatorMiddleware, genreController.deleteGenre);
router.get(`/:id`, genreController.getGenre);

export default router;

