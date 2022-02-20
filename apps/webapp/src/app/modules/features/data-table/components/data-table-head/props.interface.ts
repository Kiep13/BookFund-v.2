import { SortDirections } from '../../enums';
import { IDataColumn } from '../../interfaces';


export interface IProps {
  columns: IDataColumn[],
  onRequestSort: Function,
  order: SortDirections,
  orderBy: string,
}
