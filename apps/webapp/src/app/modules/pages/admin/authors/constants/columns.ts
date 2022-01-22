import { AlignTypes, CellTypes } from '@features/data-table/enums';
import { IDataColumn } from '@features/data-table/interfaces';

export const COLUMNS: IDataColumn[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    name: 'fullName',
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
    id: 'avgRate',
    numeric: true,
    label: 'Average rate',
    name: 'avgRate',
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
