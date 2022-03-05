import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { genreController } from '@controllers/genre.controller';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, genreController.getGenres);
router.get(`/${ApiRoutesModifiers.TREE}`, genreController.getGenresTree);
router.post(`/${ApiRoutesModifiers.NEW}`, genreController.createGenre);
router.get(`/:id`, genreController.getGenre);

export default router;

