import { AlignTypes, CellTypes } from '@features/dataTable/enums';
import { IDataColumn } from '@features/dataTable/interfaces';

export const COLUMNS: IDataColumn[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
    name: 'title',
    width: '40%',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'authorFullName',
    numeric: true,
    label: 'Author',
    name: 'authorFullName',
    width: '10%',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'amountPages',
    numeric: true,
    label: 'Amount of pages',
    name: 'amountPages',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
  {
    id: 'year',
    numeric: true,
    label: 'Year',
    name: 'year',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
  {
    id: 'avgRate',
    numeric: true,
    label: 'Average rate',
    name: 'avgRate',
    align: AlignTypes.Right,
    type: CellTypes.Float,
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
