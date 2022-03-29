import { AuthorEntity } from '@entities/author.entity';
import { BookEntity } from '@entities/book.entity';
import { CollectionEntity } from '@entities/collection.entity';

import { IListApiView } from './list-api-view.interface';

export interface ISearchResults {
  books: IListApiView<BookEntity>,
  authors: IListApiView<AuthorEntity>,
  collections: IListApiView<CollectionEntity>
}
