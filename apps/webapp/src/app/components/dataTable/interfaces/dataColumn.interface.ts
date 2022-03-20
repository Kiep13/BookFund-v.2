import { CellTypes } from '../enums/cellTypes';
import { IAlignType } from './alignType.interface';

export interface IDataColumn {
  id: string,
  name?: string,
  numeric: boolean,
  label: string,
  align: IAlignType,
  type: CellTypes,
  width?: string
}
