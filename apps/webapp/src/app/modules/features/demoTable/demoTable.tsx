import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';

import { AlignTypes } from '@features/dataTable/enums';
import { IDataColumn } from '@features/dataTable/interfaces';
import { formatData } from '@features/dataTable/utils';

import { STYLES } from './constants';
import { IProps } from './props.interface';

export const DemoTable = ({data, columns, onDeleteClick}: IProps) => {

  const isDataEmpty = data.length === 0;

  return <Paper sx={STYLES.tablePaper}>
    <TableContainer>
      <Table
        aria-labelledby='tableTitle'
        size='medium'>
        <TableHead>
          <TableRow>
            {columns.map((column: IDataColumn) => (
              <TableCell
                key={column.id}
                align={column.align}>
                {column.label}
              </TableCell>
            ))}
            <TableCell align={AlignTypes.Right}/>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row: any) => {
              return (
                <TableRow
                  hover
                  role='tr'
                  tabIndex={-1}
                  key={row.id}>
                  {
                    columns.map((cell: IDataColumn) => {
                      return <TableCell component='td' align={cell.align} key={cell.id}>
                        {formatData(row[cell.name || ''], cell.type)}
                      </TableCell>;
                    })
                  }
                  <TableCell component='td' align={AlignTypes.Right}>
                    <IconButton
                      aria-label='Delete'
                      sx={STYLES.iconButton}
                      onClick={() => onDeleteClick(row.id)}>
                      <DeleteTwoToneIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          {isDataEmpty && (
            <TableRow style={STYLES.tableRow}>
              <TableCell colSpan={columns.length + 1} sx={STYLES.noItems}>
                Don't have items to display
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
}
