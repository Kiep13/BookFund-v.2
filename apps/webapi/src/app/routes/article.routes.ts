import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { articleController } from "@controllers/article.controller";
const router = new Router();

router.post(`/${ApiRoutesModifiers.NEW}`, articleController.createArticle);

export default router;
