import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import { environment } from '@environments/environment';

const apiServer = express();
apiServer.use(cors({
  credentials: true,
  origin: environment.clientUrl
}));
apiServer.use(express.json());
apiServer.use(cookieParser());

export default apiServer;
