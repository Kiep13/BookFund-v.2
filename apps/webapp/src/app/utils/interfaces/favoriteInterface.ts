import { BookStatuses } from '@utils/enums';

import { IAccount } from './accountInterface';
import { IBook } from './bookInterface';

export interface IFavorite {
  book: IBook;
  status: BookStatuses;
  id?: number;
  account?: IAccount;
  bookmarkPage?: number;
}
