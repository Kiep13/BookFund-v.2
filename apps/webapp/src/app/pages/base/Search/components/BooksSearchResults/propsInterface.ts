import { IBook, IListApiView } from '@utils/interfaces';

export interface IProps {
  searchResults: IListApiView<IBook>,
  searchTerm: string
}
