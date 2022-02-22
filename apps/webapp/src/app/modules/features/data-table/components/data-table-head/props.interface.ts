import { SortDirections } from '@core/enums';

import { IDataColumn } from '../../interfaces';

export interface IProps {
  columns: IDataColumn[],
  onRequestSort: Function,
  order: SortDirections,
  orderBy: string,
}
