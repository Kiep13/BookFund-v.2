import { Box, IconButton, Typography } from '@mui/material';
import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const ActionButtons = ({ pageNumber, amountPages, handlePageChange}: IProps) => {
  const goFirst = () => {
    handlePageChange(1);
  }

  const goPreviousPage = () => {
    handlePageChange(pageNumber - 1);
  }

  const goNextPage = () => {
    handlePageChange(pageNumber + 1);
  }

  const goLast = () => {
    handlePageChange(amountPages);
  }

  return (
    <Box  sx={STYLES.document.actionButtons}>
      <IconButton
        aria-label='First'
        disabled={pageNumber <= 1}
        onClick={goFirst}>
        <KeyboardDoubleArrowLeftTwoToneIcon/>
      </IconButton>

      <IconButton
        aria-label='Previous'
        disabled={pageNumber <= 1}
        onClick={goPreviousPage}>
        <KeyboardArrowLeftTwoToneIcon/>
      </IconButton>

      <Typography component='legend'>
        {pageNumber || (amountPages ? 1 : '--')} of {amountPages || '--'}
      </Typography>

      <IconButton
        aria-label='Next'
        disabled={pageNumber >= amountPages}
        onClick={goNextPage}>
        <KeyboardArrowRightTwoToneIcon/>
      </IconButton>

      <IconButton
        aria-label='Last'
        disabled={pageNumber >= amountPages}
        onClick={goLast}>
        <KeyboardDoubleArrowRightTwoToneIcon/>
      </IconButton>
    </Box>
  )
}
