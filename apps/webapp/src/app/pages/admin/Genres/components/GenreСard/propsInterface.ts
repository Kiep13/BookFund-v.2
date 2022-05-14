import { IGenre } from '@utils/interfaces';

export interface IProps {
  genre: IGenre;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onAddSubgenreClick: () => void;
}
