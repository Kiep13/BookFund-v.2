import { PageSizes } from '@utils/enums';
import { ISortOptions } from '@utils/interfaces';

import { IDataColumn } from './interfaces';

export interface IProps {
  columns: IDataColumn[],
  count: number,
  data: any[],
  loading: boolean;
  onHandleClick: Function,
  onHandlePageChange: Function,
  onHandleRowsPerPageChanged: Function
  onHandleSortRequest: Function,
  page: number;
  rowsPerPage: PageSizes;
  sortOptions: ISortOptions;
}
