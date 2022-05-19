import { Request, Response } from 'express';

import { ResponseStatuses, SortDirections } from '@core/enums';
import { connection } from '@core/connection';
import { ERROR_NO_ACCESS_FOLDER } from '@core/constants';
import { IListApiView } from '@core/interfaces';
import { FolderEntity } from '@entities/folder.entity';
import { ApiError } from '@exceptions/api-error';
import { folderService } from '@services/folder.service';

class FolderController {
  public async createFolder(request: Request, response: Response, next: Function): Response {
    try {
      const folder = folderService.buildFolderFromBody(request.body);
      folder.account = request.account;

      await connection.manager.save(folder);
      return response.status(ResponseStatuses.STATUS_CREATED).json(folder);
    } catch (error) {
      next(error)
    }
  }

  public async updateFolder(request: Request, response: Response, next: Function): Response {
    try {
      const folderId = +request.params.id;

      const folder = folderService.buildFolderFromBody(request.body);

      await connection.manager.update(FolderEntity, folderId, folder);
      return response.status(ResponseStatuses.STATUS_CREATED).json(folder);
    } catch (error) {
      next(error)
    }
  }

  public async getFolder(request: Request, response: Response, next: Function): Response {
    try {
      const folderId = +request.params.id;
      const accountId = +request.account.id;

      const folder = await connection.manager.getRepository(FolderEntity).findOne({
        relations: ['account'],
        where: {
          id: folderId
        }
      });

      if(!folder || +folder.account.id !== accountId) {
        return next(ApiError.BadRequest(ERROR_NO_ACCESS_FOLDER));
      }

      return response.status(ResponseStatuses.STATUS_OK).json(folder);
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
