import { IAccount } from './accountInterface';
import { IBook } from './bookInterface';

export interface IComment {
  book: IBook,
  rate: number,
  user?: IAccount,
  text?: string
}
