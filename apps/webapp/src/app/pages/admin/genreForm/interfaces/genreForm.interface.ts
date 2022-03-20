import { IGenre } from '@utils/interfaces';

export interface IGenreForm {
  name: string,
  parent?: IGenre
}
