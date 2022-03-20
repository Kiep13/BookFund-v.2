import { IDataColumn } from '@utils/interfaces';
import { AlignTypes, CellTypes } from '@utils/enums';

export const COLUMNS: IDataColumn[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    name: 'fullName',
    width: '30%',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'amountBooks',
    numeric: true,
    label: 'Amount of books',
    name: 'amountBooks',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Created date',
    name: 'createdAt',
    align: AlignTypes.Right,
    type: CellTypes.Date,
  },
  {
    id: 'updatedAt',
    numeric: true,
    label: 'Updated date',
    name: 'updatedAt',
    align: AlignTypes.Right,
    type: CellTypes.Date
  },
];
