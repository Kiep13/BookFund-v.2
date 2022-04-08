import { Router } from 'express';

import { statisticsController } from '@controllers/statistics.controller';
import { authMiddleware } from '@middlewares/auth-middleware';
import { adminMiddleware } from '@middlewares/admin-middleware';

const router = new Router();

router.get(`/genres`, authMiddleware, adminMiddleware, statisticsController.getGenresStatistics);
router.get(`/actions`, authMiddleware, adminMiddleware, statisticsController.getActionsStatistics);
router.get(`/book`, authMiddleware, adminMiddleware, statisticsController.getPopularBook);

export default router;
