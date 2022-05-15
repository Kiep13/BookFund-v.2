import { IAuthor } from './authorInterface';
import { IBook } from './bookInterface';
import { ICollection } from './collectionInterface';
import { IListApiView } from './listApiViewInterface';

export interface ISearchResults {
  books: IListApiView<IBook>;
  authors: IListApiView<IAuthor>;
  collections: IListApiView<ICollection>;
}
