import { PageSizes } from '@core/enums';
import { ISortOptions } from '@core/interfaces';

import { IDataColumn } from './interfaces';

export interface IProps {
  columns: IDataColumn[],
  data: any[],
  count: number,
  sortOptions: ISortOptions;
  page: number;
  rowsPerPage: PageSizes;
  onHandleClick: Function,
  onHandleSortRequest: Function,
  onHandleRowsPerPageChanged: Function
  onHandlePageChange: Function,
}
