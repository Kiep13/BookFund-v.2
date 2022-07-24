import { Request, Response } from 'express';
import * as path from 'path';

import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { ICustomRequest } from '@core/interfaces';
import { environment } from '@environments/environment';
import { fileService } from '@services/file.service';

class FileController {
  public async saveFile(request: ICustomRequest, response: Response, next: Function): Promise<Response> {
    try {
      const fileName = await fileService.saveFile(request.files.file);

      return response.status(ResponseStatuses.STATUS_CREATED).send(`/v1/${ApiRoutes.BOOK}/${ApiRoutes.FILE}/${fileName}`);
    } catch (error) {
      next(error)
    }
  }

  public async getFile(request: Request, response: Response, next: Function): Promise<void> {
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
