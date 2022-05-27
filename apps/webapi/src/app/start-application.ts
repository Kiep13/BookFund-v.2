import { setConnection } from '@core/connection';
import { environment } from '@environments/environment';
import { fileService } from '@services/file.service';

import createConnectionPromise from './connect-to-database';
import apiServer from './create-api-server';

const PORT = environment.port || 8080;

createConnectionPromise.then(async connection => {
  fileService.checkFileStorageFolders();

  setConnection(connection);

  apiServer.listen(PORT, () => {
    console.log(`Server started on the port: ${PORT}`)
  });
}).catch(error => console.log(error));
