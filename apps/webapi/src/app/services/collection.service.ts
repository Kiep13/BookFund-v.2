import { ICollectionForm } from '@core/interfaces';
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
}

export const collectionService = new CollectionService();
