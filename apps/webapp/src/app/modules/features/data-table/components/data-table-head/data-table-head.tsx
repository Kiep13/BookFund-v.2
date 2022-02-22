import { Box, TableCell, TableRow, TableSortLabel, TableHead  } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { SortDirections } from '@core/enums';

import { AlignTypes  } from '../../enums';
import { IDataColumn } from '../../interfaces';
import { IProps } from './props.interface';

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
          >
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
        <TableCell align={AlignTypes.Right}>
          <TableSortLabel>Action</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
