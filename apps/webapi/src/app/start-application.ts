import * as https from 'https';
import * as fs from 'fs';

import { environment } from '@environments/environment';
import { fileService } from '@services/file.service';
import { setConnection } from '@core/connection';

import createConnectionPromise from './connect-to-database';
import apiServer from './create-api-server';

createConnectionPromise.then(async connection => {
  fileService.checkFileStorageFolders();

  setConnection(connection);

  if (environment.production) {
    https.createServer({
      key: fs.readFileSync('server.key', 'utf8'),
      cert: fs.readFileSync('server.crt', 'utf8')
    }, apiServer)
      .listen(environment.port, () => {
        console.log(`Server started on the port: ${environment.port}`);
      });
  } else {
    apiServer.listen(environment.port, () => {
      console.log(`Server started on the port: ${environment.port}`);
    });
  }
}).catch(error => console.log(error));
