import { Router } from 'express';

import { searchController } from '@controllers/search.controller';

const router = new Router();

router.get(``, searchController.search);

export default router;
