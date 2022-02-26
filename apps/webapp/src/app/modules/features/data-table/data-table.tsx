import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import { PageSizes, SortDirections, TableActions } from '@core/enums';
import { ISortOptions, ITableItemAction } from '@core/interfaces';

import { DataTableHead } from './components/data-table-head';
import { STYLES } from './constants';
import { AlignTypes } from './enums';
import { IDataColumn } from './interfaces';
import { dataFormatterService } from './services';
import { IProps } from './props.interface';

export const DataTable = (props: IProps) => {
  const { columns, sortOptions, page, rowsPerPage, data, count, loading } = props;

  const rowsPerPageOptions = Object.values(PageSizes).map(value => +value).filter((value) => value);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = sortOptions.orderBy === property && sortOptions.order === SortDirections.Asc;

    const newSortOptions: ISortOptions = {
      order: isAsc ? SortDirections.Desc : SortDirections.Asc,
      orderBy: property
    }

    props.onHandleSortRequest(newSortOptions);
  };

  const handleClick = (actionType: TableActions, id: number) => {
    const tableItemAction: ITableItemAction = { id, actionType };
    props.onHandleClick(tableItemAction);
  };

  const handleChangePage = (event: any, newPage: number) => {
    props.onHandlePageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    props.onHandleRowsPerPageChanged(parseInt(event.target.value, 10));
  };

  const isDataEmpty = data.length === 0;

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
              order={sortOptions.order}
              orderBy={sortOptions.orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                loading && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{
                      padding: 0
                    }}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                )
              }
              {
                 data.map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role='tr'
                        tabIndex={-1}
                        key={row.id}
                      >
                        {
                          columns.map((cell: IDataColumn) => {
                            return <TableCell component='td' align={cell.align} key={cell.id}>
                              {dataFormatterService.formatData(row[cell.name || ''], cell.type)}
                            </TableCell>;
                          })
                        }
                        <TableCell component='td' align={AlignTypes.Right}>
                          <IconButton
                            aria-label='View'
                            sx={STYLES.iconButton}
                            onClick={() => {handleClick(TableActions.VIEW, row.id)}}>
                            <VisibilityTwoToneIcon/>
                          </IconButton>
                          <IconButton
                            aria-label='Edit'
                            sx={STYLES.iconButton}
                            onClick={() => {handleClick(TableActions.EDIT, row.id)}}>
                            <EditTwoToneIcon/>
                          </IconButton>
                          <IconButton
                            aria-label='Delete'
                            sx={STYLES.iconButton}
                            onClick={() => {handleClick(TableActions.DELETE, row.id)}}>
                            <DeleteTwoToneIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {isDataEmpty && (
                <TableRow
                  style={{
                    height: 53 * rowsPerPage,
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
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
