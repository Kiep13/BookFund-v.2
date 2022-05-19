import { Request, Response } from 'express';

import { ResponseStatuses } from '@core/enums';
import { connection } from '@core/connection';
import { FolderEntity } from '@entities/folder.entity';

class FolderController {
  public async createFolder(request: Request, response: Response, next: Function): Response {
    try {
      const folder = new FolderEntity();
      folder.name = request.body.name;
      folder.account = request.account;

      await connection.manager.save(folder);
      return response.status(ResponseStatuses.STATUS_CREATED).json(folder);
    } catch (error) {
      next(error)
    }
  }
}

export const folderController = new FolderController();
