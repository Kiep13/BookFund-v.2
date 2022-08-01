import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { articleController } from "@controllers/article.controller";
import { authMiddleware } from '@middlewares/auth-middleware';

const router = Router();

router.get(`/${ApiRoutesModifiers.LIST}`, authMiddleware, articleController.getArticles);
router.post(`/${ApiRoutesModifiers.NEW}`, authMiddleware, articleController.createArticle);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, articleController.updateArticle);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`, authMiddleware, articleController.deleteArticle);
router.get(`/:id`, authMiddleware, articleController.getArticle);

export default router;
