import { Box, IconButton, TextField, Typography } from '@mui/material';
import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';

import { STYLES } from '../../constants';
import { PageViews } from '../../enums';
import { IProps } from './propsInterface';

export const ActionButtons = ({pageNumber, amountPages, pageView, handlePageChange}: IProps) => {
  const goFirst = (): void => {
    handlePageChange(1);
  }

  const handlePageNumberType = (event: any): void => {
    const value = +event.target.value;

    if (!value || value > amountPages) {
      return;
    }

    const valueForSave = pageView === PageViews.SinglePage ? value : value % 2 === 0 ? value - 1 : value;
    handlePageChange(valueForSave);
  }

  const goPreviousPage = (): void => {
    handlePageChange(pageNumber - pageView);
  }

  const goNextPage = (): void => {
    handlePageChange(pageNumber + pageView);
  }

  const goLast = (): void => {
    const finalPage = pageView === PageViews.SinglePage ? amountPages : amountPages % 2 === 0 ? amountPages - 1 : amountPages;
    handlePageChange(finalPage);
  }

  return (
    <Box sx={STYLES.document.actionButtons}>
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

      <TextField
        size='small'
        type='tel'
        value={pageNumber}
        InputProps={{
          inputProps: {
            min: 1,
            max: amountPages
          }
        }}
        sx={STYLES.document.pageInput}
        onChange={handlePageNumberType}
      />
      <Typography component='legend'>
        of {amountPages || '--'}
      </Typography>

      <IconButton
        aria-label='Next'
        disabled={pageNumber + pageView > amountPages}
        onClick={goNextPage}>
        <KeyboardArrowRightTwoToneIcon/>
      </IconButton>

      <IconButton
        aria-label='Last'
        disabled={pageNumber + pageView > amountPages}
        onClick={goLast}>
        <KeyboardDoubleArrowRightTwoToneIcon/>
      </IconButton>
    </Box>
  )
}
