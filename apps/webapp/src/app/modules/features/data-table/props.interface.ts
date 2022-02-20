import { IDataColumn } from './interfaces';

export interface IProps {
  columns: IDataColumn[],
  data: any[],
  count: number,
  onHandleClick: Function,
  onHandleSortRequest: Function,
  onHandleRowsPerPageChanged: Function
  onHandlePageChange: Function,
}
