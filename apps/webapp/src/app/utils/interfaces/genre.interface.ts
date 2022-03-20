import { IBook } from './book.interface';

export interface IGenre {
  id: number,
  name: string,
  amountBooks?: number,
  parentId?: number,
  parent?: IGenre,
  subGenres?: IGenre[],
  books?: IBook[],
}
