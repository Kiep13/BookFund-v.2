import { ILike } from 'typeorm';

import { connection } from '@core/connection';
import { SortDirections } from '@core/enums';
import { ICollectionForm, IListApiView, ISearchOptions } from '@core/interfaces';
import { CollectionEntity } from '@entities/collection.entity';

class CollectionService {
  public buildBookFromBody(requestBody: ICollectionForm): CollectionEntity {
    const collection: CollectionEntity = new CollectionEntity();

    collection.title = requestBody.title;
    collection.subtitle = requestBody.subtitle;
    collection.image = requestBody.imageUrl;
    collection.description = requestBody.description;

    return collection;
  }

  public async getCollections(requestParams: ISearchOptions): Promise<IListApiView<CollectionEntity>> {
    const [collections, count] = await connection.getRepository(CollectionEntity).findAndCount({
      select: ['id', 'title', 'subtitle', 'image', 'description', 'createdAt'],
      order: {
        createdAt: SortDirections.DESC
      },
      take: +requestParams.pageSize,
      skip: (+requestParams.pageSize * +requestParams.page),
      where: {
        title: ILike(`%${requestParams.searchTerm || ''}%`)
      }
    });

    return {
      data: collections,
      count: count
    };
  }
}

export const collectionService = new CollectionService();
