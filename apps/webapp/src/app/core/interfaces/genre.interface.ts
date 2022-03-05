import { IBook } from '@core/interfaces';

export interface IGenre {
  id: number,
  name: string,
  amountBooks?: number,
  parentGenreId?: number,
  parentGenre?: IGenre,
  subGenres?: IGenre[],
  books?: IBook[],
}
