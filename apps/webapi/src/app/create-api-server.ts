import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';

import { environment } from '@environments/environment';
import { errorMiddleware } from '@middlewares/error-middleware';
import routes from '@routes/index';

const apiServer = express();

apiServer.set('trust proxy', 1);
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

apiServer.use(routes);

apiServer.use(errorMiddleware);

export default apiServer;
