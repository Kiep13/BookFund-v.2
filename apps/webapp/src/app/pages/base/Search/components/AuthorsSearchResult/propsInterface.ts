import { IAuthor, IListApiView } from '@utils/interfaces';

export interface IProps {
  searchResults: IListApiView<IAuthor>;
  searchTerm: string;
}
