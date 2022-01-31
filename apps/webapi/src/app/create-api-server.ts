import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import { ApiRoutes } from '@core/enums';
import { environment } from '@environments/environment';
import authorRoutes from '@routes/author.routes';

const apiServer = express();
apiServer.use(cors({
  credentials: true,
  origin: environment.clientUrl
}));
apiServer.use(express.json());
apiServer.use(cookieParser());

apiServer.use(`/v1/${ApiRoutes.AUTHOR}`, authorRoutes)

export default apiServer;
