import { Box, TableCell, TableRow, TableSortLabel, TableHead  } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { AlignTypes, SortDirections } from '@utils/enums';
import { IDataColumn } from '@utils/interfaces';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const DataTableHead = (props: IProps) => {
  const { columns, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column: IDataColumn) => (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
            width={column.width}>
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : SortDirections.Asc}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === SortDirections.Desc ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align={AlignTypes.Right} width={STYLES.actionsColumn.width} sx={STYLES.actionsColumn}>
          <TableSortLabel>Action</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
