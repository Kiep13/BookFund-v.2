import { PageSizes } from '@utils/enums';
import { IDataColumn, ISortOptions } from '@utils/interfaces';

export interface IProps {
  columns: IDataColumn[];
  count: number;
  data: any[];
  loading: boolean;
  onHandleClick: Function;
  onHandlePageChange: Function;
  onHandleRowsPerPageChanged: Function;
  onHandleSortRequest: Function;
  page: number;
  rowsPerPage: PageSizes;
  sortOptions: ISortOptions;
}
