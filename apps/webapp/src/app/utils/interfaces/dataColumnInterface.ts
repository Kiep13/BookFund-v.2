import { CellTypes } from '@utils/enums';

import { IAlignType } from './alignTypeInterface';

export interface IDataColumn {
  id: string,
  name?: string,
  numeric: boolean,
  label: string,
  align: IAlignType,
  type: CellTypes,
  width?: string
}
