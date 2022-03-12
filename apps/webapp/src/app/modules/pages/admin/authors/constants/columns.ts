import { AlignTypes, CellTypes } from '@features/dataTable/enums';
import { IDataColumn } from '@features/dataTable/interfaces';

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
