import * as React from 'react';
import { Box, TableCell, TableRow, TableSortLabel, TableHead  } from '@mui/material';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';

import { AlignTypes, SortDirections } from '../enums';
import { IDataColumn } from '../interfaces';

export default function DataTableHead(props: any) {
  const { columns, order, orderBy, onRequestSort } =
    props;

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

DataTableHead.propTypes = {
  columns: PropTypes.any.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf([SortDirections.Asc, SortDirections.Desc]).isRequired,
  orderBy: PropTypes.string.isRequired,
};
