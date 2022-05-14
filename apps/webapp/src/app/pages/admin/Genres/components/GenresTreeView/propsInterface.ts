import { IGenre } from '@utils/interfaces';

export interface IProps {
  genres: IGenre[];
  onSelectGenre: Function;
}
