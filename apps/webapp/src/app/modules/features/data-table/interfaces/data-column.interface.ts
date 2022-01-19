import { CellTypes } from '../enums/cell-types';
import { IAlignType } from './align-type.interface';

export interface IDataColumn {
  id: string,
  name?: string,
  numeric: boolean,
  label: string,
  align: IAlignType,
  type: CellTypes
}
