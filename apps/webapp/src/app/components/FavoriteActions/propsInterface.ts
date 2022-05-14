import { IBook } from '@utils/interfaces';

export interface IProps {
  book: IBook;
  handleAddedToFavorite?: Function;
  handleRemovedFromFavorite?: Function;
}
