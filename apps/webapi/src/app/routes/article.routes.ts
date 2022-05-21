import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { articleController } from "@controllers/article.controller";
import { authMiddleware } from '@middlewares/auth-middleware';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, articleController.getArticles);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, articleController.createArticle);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, articleController.deleteArticle);
router.get(`/:id`, authMiddleware, articleController.getArticle);

export default router;
