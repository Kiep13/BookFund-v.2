import { IDataColumn } from '@utils/interfaces';

export interface IProps {
  columns: IDataColumn[],
  data: any[],
  onDeleteClick: Function
}
