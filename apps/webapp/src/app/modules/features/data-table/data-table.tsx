import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow  } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useState } from 'react';

import { PageSizes } from '@core/enums';

import { DataTableHead } from './components/data-table-head';
import { STYLES } from './constants';
import { AlignTypes, SortDirections } from './enums';
import { IDataColumn } from './interfaces';
import { dataFormatterService } from './services';
import { IProps } from './props.interface';

export const DataTable = (props: IProps) => {
  const columns = props.columns;

  const [order, setOrder] = useState(SortDirections.Asc);
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const data = props.data;

  const rowsPerPageOptions = Object.values(PageSizes).map(value => +value).filter((value) => value);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === SortDirections.Asc;
    setOrder(isAsc ? SortDirections.Desc : SortDirections.Asc);
    setOrderBy(property);
    props.onHandleSortRequest();
  };

  const handleClick = (event: any, name: string) => {
    props.onHandleClick();
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
    props.onHandlePageChange();
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    props.onHandleRowsPerPageChanged();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={STYLES.tableBox}>
      <Paper sx={STYLES.tablePaper}>
        <TableContainer>
          <Table
            sx={STYLES.table}
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
                            return <TableCell component='td' align={cell.align} key={cell.id}>
                              {dataFormatterService.formatData(row[cell.name || ''], cell.type)}
                            </TableCell>;
                          })
                        }
                        <TableCell component='td' align={AlignTypes.Right}>
                          <IconButton aria-label='View' sx={STYLES.iconButton}>
                            <VisibilityTwoToneIcon/>
                          </IconButton>
                          <IconButton aria-label='Edit' sx={STYLES.iconButton}>
                            <EditTwoToneIcon/>
                          </IconButton>
                          <IconButton aria-label='Delete' sx={STYLES.iconButton}>
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
