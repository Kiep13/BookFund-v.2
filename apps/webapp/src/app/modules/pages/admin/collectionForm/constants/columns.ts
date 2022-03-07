import { AlignTypes, CellTypes } from '@features/dataTable/enums';
import { IDataColumn } from '@features/dataTable/interfaces';

export const COLUMNS: IDataColumn[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
    name: 'title',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'authorFullName',
    numeric: true,
    label: 'Author',
    name: 'authorFullName',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'year',
    numeric: true,
    label: 'Year',
    name: 'year',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
];
