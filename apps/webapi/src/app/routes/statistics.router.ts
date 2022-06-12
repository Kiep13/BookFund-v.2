import { Router } from 'express';

import { statisticsController } from '@controllers/statistics.controller';
import { authMiddleware } from '@middlewares/auth-middleware';
import { moderatorMiddleware } from '@middlewares/moderator-middleware';

const router = new Router();

router.get(`/overall`, authMiddleware, moderatorMiddleware, statisticsController.getOverallStatistics);
router.get(`/genres`, authMiddleware, moderatorMiddleware, statisticsController.getGenresStatistics);
router.get(`/actions`, authMiddleware, moderatorMiddleware, statisticsController.getActionsStatistics);
router.get(`/book`, authMiddleware, moderatorMiddleware, statisticsController.getPopularBook);
router.get(`/providers`, authMiddleware, moderatorMiddleware, statisticsController.getProvidersStatistic);
router.get(`/rates`, authMiddleware, moderatorMiddleware, statisticsController.getRatesStatistic);

export default router;
