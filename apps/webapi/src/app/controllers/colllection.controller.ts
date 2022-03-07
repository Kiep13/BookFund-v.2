import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { ResponseStatuses } from '@core/enums';
import { CollectionEntity } from '@entities/collection.entity';

class CollectionController {
  public async createCollection(request: Request, response: Response, next: Function): Response {
    try {
      const collection: CollectionEntity = new CollectionEntity();

      collection.title = request.body.title;
      collection.image = request.body.imageUrl;
      collection.description = request.body.description;
      collection.books = request.body.books;

      await connection.manager.save(collection);
      return response.status(ResponseStatuses.STATUS_CREATED).json(collection);
    } catch (error) {
      next(error)
    }
  }
}

export const collectionController = new CollectionController();
