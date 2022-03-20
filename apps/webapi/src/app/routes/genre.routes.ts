import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { genreController } from '@controllers/genre.controller';
import { adminMiddleware,authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, genreController.getGenres);
router.get(`/${ApiRoutesModifiers.TREE}`, genreController.getGenresTree);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, adminMiddleware,genreController.createGenre);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, adminMiddleware,genreController.updateGenre);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, adminMiddleware, genreController.deleteGenre);
router.get(`/:id`, genreController.getGenre);

export default router;

