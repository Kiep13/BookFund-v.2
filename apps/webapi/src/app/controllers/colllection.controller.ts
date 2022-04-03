import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { IListApiView, ISearchOptions } from '@core/interfaces';
import { CollectionEntity } from '@entities/collection.entity';
import { environment } from '@environments/environment';
import { imageService } from '@services/image.service';
import { collectionService } from '@services/collection.service';

class CollectionController {
  public async createCollection(request: Request, response: Response, next: Function): Response {
    try {
      const collection: CollectionEntity = collectionService.buildBookFromBody(request.body);
      collection.books = request.body.books;

      await connection.manager.save(collection);
      return response.status(ResponseStatuses.STATUS_CREATED).json(collection);
    } catch (error) {
      next(error)
    }
  }

  public async updateCollection(request: Request, response: Response, next: Function): Response {
    try {
      const collectionId = +request.params.id;
      const currentCollection = await connection.manager.findOne(CollectionEntity, collectionId, {
        relations: ['books']
      });

      if (currentCollection.image !== request.body.imageUrl && currentCollection.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
        await imageService.deleteImage(currentCollection.image);
      }

      await connection.manager.createQueryBuilder(CollectionEntity, 'collection')
        .relation(CollectionEntity, 'books')
        .of(currentCollection)
        .addAndRemove(request.body.books, currentCollection.books);

      const collection: CollectionEntity = collectionService.buildBookFromBody(request.body);
      await connection.manager.update(CollectionEntity, collectionId, collection);

      return response.status(ResponseStatuses.STATUS_OK).json(collection);
    } catch (error) {
      next(error)
    }
  }

  public async getCollection(request: Request, response: Response, next: Function): Response {
    try {
      const collectionId = +request.params.id;
      const collection = await connection.manager.findOne(CollectionEntity, collectionId, {
        relations: ['books', 'books.author']
      });

      return response.status(ResponseStatuses.STATUS_OK).json(collection);
    } catch (error) {
      next(error)
    }
  }

  public async getCollections(request: Request, response: Response, next: Function): Response {
    try {
      const requestParams: ISearchOptions = request.query;

      const result: IListApiView<CollectionEntity> = await collectionService.getCollections(requestParams);

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteCollection(request: Request, response: Response, next: Function): Response {
    try {
      const collectionId = +request.params.id;

      const collection = await connection.manager.findOne(CollectionEntity, collectionId);
      await connection.manager.remove(collection);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const collectionController = new CollectionController();
