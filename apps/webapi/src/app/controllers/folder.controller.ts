import { Request, Response } from 'express';

import { ResponseStatuses, SortDirections } from '@core/enums';
import { connection } from '@core/connection';
import { IListApiView } from '@core/interfaces';
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

  public async getFolders(request: Request, response: Response, next: Function): Response {
    try {
      const account = request.account;

      const [folders, count] = await connection.createQueryBuilder(FolderEntity, 'folder')
        .select([
          'folder.id',
          'folder.name',
          'folder.createdAt',
        ])
        .orderBy({
          'folder.id': SortDirections.DESC
        })
        .where({
          account: {
            id: account.id
          }
        })
        .getManyAndCount();

      const result: IListApiView<FolderEntity> = {
        data: folders,
        count: count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteFolder(request: Request, response: Response, next: Function): Response {
    try {
      const folderId = +request.params.id;

      const folder = await connection.manager.findOne(FolderEntity, folderId);
      await connection.manager.remove(folder);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const folderController = new FolderController();
