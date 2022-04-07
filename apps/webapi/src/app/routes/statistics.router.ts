import { Router } from 'express';

import { statisticsController } from '@controllers/statistics.controller';

const router = new Router();

router.get(`/genres`, statisticsController.getGenresStatistics);

export default router;
