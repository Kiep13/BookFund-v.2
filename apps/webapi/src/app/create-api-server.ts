import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';

import { ApiRoutes } from '@core/enums';
import { environment } from '@environments/environment';
import { errorMiddleware } from '@middlewares/error-middleware';
import authRoutes from '@routes/auth.routes';
import authorRoutes from '@routes/author.routes';
import bookRoutes from '@routes/book.routes';
import collectionRoutes from '@routes/collection.routes';
import commentRoutes from '@routes/comment.routes';
import genreRoutes from '@routes/genre.routes';
import imageRoutes from '@routes/image.routes';

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

apiServer.use(`/v1/${ApiRoutes.AUTH}`, authRoutes);
apiServer.use(`/v1/${ApiRoutes.AUTHOR}`, authorRoutes);
apiServer.use(`/v1/${ApiRoutes.BOOK}`, bookRoutes);
apiServer.use(`/v1/${ApiRoutes.GENRE}`, genreRoutes);
apiServer.use(`/v1/${ApiRoutes.COLLECTION}`, collectionRoutes);
apiServer.use(`/v1/${ApiRoutes.COMMENT}`, commentRoutes);
apiServer.use(`/v1/${ApiRoutes.IMAGE}`, imageRoutes);

apiServer.use(errorMiddleware);

export default apiServer;
