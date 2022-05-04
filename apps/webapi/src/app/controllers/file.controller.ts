import { Request, Response } from 'express';
import * as path from 'path';

import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { environment } from '@environments/environment';
import { fileService } from '@services/file.service';

class FileController {
  public async saveFile(request: Request, response: Response, next: Function): Response {
    try {
      const fileName = await fileService.saveFile(request.files.file);

      return response.status(ResponseStatuses.STATUS_CREATED).send(`${environment.selfUrl}/v1/${ApiRoutes.BOOK}/${ApiRoutes.FILE}/${fileName}`);
    } catch (error) {
      next(error)
    }
  }

  public async getFile(request: Request, response: Response, next: Function): Response {
    try {
      const fileName = request.params.name;
      const filePath = path.join(__dirname, environment.booksFolder, fileName);

      return response.sendFile(filePath);
    } catch (error) {
      next(error)
    }
  }
}

export const fileController = new FileController();
