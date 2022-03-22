import { IBook } from './bookInterface';

export interface IGenre {
  id: number,
  name: string,
  amountBooks?: number,
  parentId?: number,
  parent?: IGenre,
  subGenres?: IGenre[],
  books?: IBook[],
}
