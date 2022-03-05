import { IGenre } from '@core/interfaces';

export interface IGenreForm {
  name: string,
  parent?: IGenre
}
