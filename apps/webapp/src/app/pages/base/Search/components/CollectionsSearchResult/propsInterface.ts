import { ICollection, IListApiView } from '@utils/interfaces';

export interface IProps {
  searchResults: IListApiView<ICollection>,
  searchTerm: string
}
