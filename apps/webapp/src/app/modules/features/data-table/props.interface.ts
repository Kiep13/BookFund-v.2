import { ISortOptions } from '@core/interfaces';

import { IDataColumn } from './interfaces';

export interface IProps {
  columns: IDataColumn[],
  data: any[],
  count: number,
  sortOptions: ISortOptions;
  onHandleClick: Function,
  onHandleSortRequest: Function,
  onHandleRowsPerPageChanged: Function
  onHandlePageChange: Function,
}
