import { IDataColumn } from '@features/dataTable/interfaces';

export interface IProps {
  columns: IDataColumn[],
  data: any[],
  onDeleteClick: Function
}
