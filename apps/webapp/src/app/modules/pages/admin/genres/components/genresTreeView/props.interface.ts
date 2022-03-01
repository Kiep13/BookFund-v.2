import { IGenre } from '@core/interfaces';

export interface IProps {
  genres: IGenre[],
  onSelectGenre: Function
}
