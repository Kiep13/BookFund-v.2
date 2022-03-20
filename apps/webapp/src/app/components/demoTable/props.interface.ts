import { IDataColumn } from '@components/dataTable/interfaces';

export interface IProps {
  columns: IDataColumn[],
  data: any[],
  onDeleteClick: Function
}
