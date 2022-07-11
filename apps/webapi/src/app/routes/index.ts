import { Router } from 'express';

import { ApiRoutes } from '@core/enums';
import articleRoutes from './article.routes';
import authRoutes from './auth.routes';
import authorRoutes from './author.routes';
import bookRoutes from './book.routes';
import genreRoutes from './genre.routes';
import favoriteRoutes from './favorite.routes';
import folderRoutes from './folder.routes';
import collectionRoutes from './collection.routes';
import commentRoutes from './comment.routes';
import imageRoutes from './image.routes';
import readRoutes from './read.routes';
import searchRoutes from './search.routes';
import statisticsRouter from './statistics.router';
import userRoutes from './user.router';

const router = new Router();

router.use(`/v1/${ApiRoutes.ARTICLE}`, articleRoutes);
router.use(`/v1/${ApiRoutes.AUTH}`, authRoutes);
router.use(`/v1/${ApiRoutes.AUTHOR}`, authorRoutes);
router.use(`/v1/${ApiRoutes.BOOK}`, bookRoutes);
router.use(`/v1/${ApiRoutes.GENRE}`, genreRoutes);
router.use(`/v1/${ApiRoutes.FAVORITE}`, favoriteRoutes);
router.use(`/v1/${ApiRoutes.FOLDER}`, folderRoutes);
router.use(`/v1/${ApiRoutes.COLLECTION}`, collectionRoutes);
router.use(`/v1/${ApiRoutes.COMMENT}`, commentRoutes);
router.use(`/v1/${ApiRoutes.IMAGE}`, imageRoutes);
router.use(`/v1/${ApiRoutes.READ}`, readRoutes);
router.use(`/v1/${ApiRoutes.SEARCH}`, searchRoutes);
router.use(`/v1/${ApiRoutes.STATISTIC}`, statisticsRouter);
router.use(`/v1/${ApiRoutes.USER}`, userRoutes);

export default router;
