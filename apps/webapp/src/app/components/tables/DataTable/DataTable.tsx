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

import { TableActions } from '@utils/enums';
import { IDataColumn } from '@utils/interfaces';
import { AlignTypes } from '@utils/enums';
import { formatData } from '@utils/helpers';

import { DataTableHead } from './components/DataTableHead';
import { STYLES } from './constants';
import { IProps } from './propsInterface';
import { useDataTable } from './useDataTable';

export const DataTable = (props: IProps) => {
  const {
    data,
    page,
    columns,
    sortOptions,
    loading,
    rowsPerPage,
    rowsPerPageOptions,
    count,
    handleRequestSort,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage
  } = useDataTable(props);

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
              {loading && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} sx={STYLES.loadingProgressBar}>
                    <LinearProgress/>
                  </TableCell>
                </TableRow>
              )}
              {data.map((row: any) => {
                return (
                  <TableRow
                    hover
                    role='tr'
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((cell: IDataColumn) => {
                      return <TableCell component='td' align={cell.align} key={cell.id}>
                        {formatData(row[cell.name || ''], cell.type)}
                      </TableCell>;
                    })}
                    <TableCell component='td' align={AlignTypes.Right}>
                      <IconButton
                        aria-label='View'
                        sx={STYLES.iconButton}
                        onClick={() => {
                          handleClick(TableActions.VIEW, row.id)
                        }}>
                        <VisibilityTwoToneIcon/>
                      </IconButton>
                      <IconButton
                        aria-label='Edit'
                        sx={STYLES.iconButton}
                        onClick={() => {
                          handleClick(TableActions.EDIT, row.id)
                        }}>
                        <EditTwoToneIcon/>
                      </IconButton>
                      <IconButton
                        aria-label='Delete'
                        sx={STYLES.iconButton}
                        onClick={() => {
                          handleClick(TableActions.DELETE, row.id)
                        }}>
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
                  <TableCell colSpan={columns.length + 1} sx={STYLES.noItems}>
                    Don't have items to display
                  </TableCell>
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
