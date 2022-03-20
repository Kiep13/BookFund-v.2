import { IGenre } from '@utils/interfaces';

export interface IProps {
  genre: IGenre,
  onEditClick: Function,
  onDeleteClick: Function,
  onAddSubgenreClick: Function,
}
