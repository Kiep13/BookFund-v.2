import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';

import { ApiRoutes } from '@core/enums';
import { environment } from '@environments/environment';
import { errorMiddleware } from '@middlewares/error-middleware';
import articleRoutes from '@routes/article.routes';
import authRoutes from '@routes/auth.routes';
import authorRoutes from '@routes/author.routes';
import bookRoutes from '@routes/book.routes';
import genreRoutes from '@routes/genre.routes';
import favoriteRoutes from '@routes/favorite.routes';
import folderRoutes from '@routes/folder.routes';
import collectionRoutes from '@routes/collection.routes';
import commentRoutes from '@routes/comment.routes';
import imageRoutes from '@routes/image.routes';
import readRoutes from '@routes/read.routes';
import searchRoutes from '@routes/search.routes';
import statisticsRouter from '@routes/statistics.router';

const apiServer = express();

apiServer.use(fileUpload({
  createParentPath: true
}));
apiServer.use(cors({
  credentials: true,
  origin: environment.clientUrl
}));
apiServer.use(express.json());
apiServer.use(cookieParser());
apiServer.use(express.static(`../${environment.imagesFolder}`));
apiServer.use(express.static(`../${environment.booksFolder}`));
apiServer.use(express.static(`../${environment.articlesFolder}`));

apiServer.use(`/v1/${ApiRoutes.ARTICLE}`, articleRoutes);
apiServer.use(`/v1/${ApiRoutes.AUTH}`, authRoutes);
apiServer.use(`/v1/${ApiRoutes.AUTHOR}`, authorRoutes);
apiServer.use(`/v1/${ApiRoutes.BOOK}`, bookRoutes);
apiServer.use(`/v1/${ApiRoutes.GENRE}`, genreRoutes);
apiServer.use(`/v1/${ApiRoutes.FAVORITE}`, favoriteRoutes);
apiServer.use(`/v1/${ApiRoutes.FOLDER}`, folderRoutes);
apiServer.use(`/v1/${ApiRoutes.COLLECTION}`, collectionRoutes);
apiServer.use(`/v1/${ApiRoutes.COMMENT}`, commentRoutes);
apiServer.use(`/v1/${ApiRoutes.IMAGE}`, imageRoutes);
apiServer.use(`/v1/${ApiRoutes.READ}`, readRoutes);
apiServer.use(`/v1/${ApiRoutes.SEARCH}`, searchRoutes);
apiServer.use(`/v1/${ApiRoutes.STATISTIC}`, statisticsRouter);

apiServer.use(errorMiddleware);

export default apiServer;
