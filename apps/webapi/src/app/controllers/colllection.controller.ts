import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { connection } from '@core/connection';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView } from '@core/interfaces';
import { CollectionEntity } from '@entities/collection.entity';

class CollectionController {
  public async createCollection(request: Request, response: Response, next: Function): Response {
    try {
      const collection: CollectionEntity = new CollectionEntity();

      collection.title = request.body.title;
      collection.subtitle = request.body.subtitle;
      collection.image = request.body.imageUrl;
      collection.description = request.body.description;
      collection.books = request.body.books;

      await connection.manager.save(collection);
      return response.status(ResponseStatuses.STATUS_CREATED).json(collection);
    } catch (error) {
      next(error)
    }
  }

  public async getCollections(request: Request, response: Response, next: Function): Response {
    try {
      const requestParams = request.query;

      const [collections, count] = await connection.getRepository(CollectionEntity).findAndCount({
        select: ['id', 'title', 'subtitle', 'image', 'description', 'createdAt'],
        relations: ['books'],
        order: {
          createdAt: SortDirections.DESC
        },
        take: +requestParams.pageSize,
        skip: (+requestParams.pageSize * +requestParams.page),
        where: {
          title: ILike(`%${requestParams.searchTerm || ''}%`)
        }
      });

      const result: IListApiView<CollectionEntity> = {
        data: collections,
        count: count
      };

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }
}

export const collectionController = new CollectionController();
