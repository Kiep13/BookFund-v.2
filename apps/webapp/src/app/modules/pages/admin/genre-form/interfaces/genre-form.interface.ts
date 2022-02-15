import { IGenre } from '@core/interfaces';

export interface IGenreForm {
  name: string,
  parentGenre?: IGenre
}
