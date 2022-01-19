import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import DataTableHead from './data-table-head';
import { AlignTypes, RowsPerPageOptions, SortDirections } from './enums';
import { IDataColumn } from './interfaces';
import { dataFormatterService } from './services';

export default function DataTable(props: any) {
  const data = props.data;
  const columns = props.columns;

  const [order, setOrder] = React.useState(SortDirections.Asc);
  const [orderBy, setOrderBy] = React.useState(columns[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(RowsPerPageOptions.Ten);

  const rowsPerPageOptions = Object.values(RowsPerPageOptions).map(value => +value).filter((value) => value);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === SortDirections.Asc;
    setOrder(isAsc ? SortDirections.Desc : SortDirections.Asc);
    setOrderBy(property);
  };

  const handleClick = (event: any, name: string) => {

  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <DataTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: any) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role='tr'
                        tabIndex={-1}
                        key={row.name}
                      >
                        {
                          columns.map((cell: IDataColumn) => {
                            return <TableCell component='td' align={cell.align}>
                              {dataFormatterService.formatData(row[cell.name || ''], cell.type)}
                            </TableCell>;
                          })
                        }
                        <TableCell component='td' align={AlignTypes.Right}>
                          <IconButton aria-label='View' sx={{p: 0.5}}>
                            <VisibilityTwoToneIcon/>
                          </IconButton>
                          <IconButton aria-label='Edit' sx={{p: 0.5}}>
                            <EditTwoToneIcon/>
                          </IconButton>
                          <IconButton aria-label='Delete' sx={{p: 0.5}}>
                            <DeleteTwoToneIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={props.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleSortRequest: PropTypes.func.isRequired,
  onHandleRowsPerPageChanged: PropTypes.func.isRequired,
  onHandlePageChange: PropTypes.func.isRequired,
};
