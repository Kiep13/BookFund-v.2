import { Router } from 'express';

import { favoriteController } from '@controllers/favorites.controller';
import { ApiRoutesModifiers } from '@core/enums';
import { authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, favoriteController.getFavorites);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, favoriteController.createFavorite);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, favoriteController.deleteFavorite);

export default router;
