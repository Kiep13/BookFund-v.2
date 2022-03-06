import { IGenre } from '@core/interfaces';

export interface IProps {
  genre: IGenre,
  onEditClick: Function,
  onDeleteClick: Function,
  onAddSubgenreClick: Function,
}
