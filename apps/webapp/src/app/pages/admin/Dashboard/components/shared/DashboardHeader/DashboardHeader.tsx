import { TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';

import { Card } from '@components/cards/Card';

import { MIN_STATISTIC_DATE } from '../../../constants';
import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const DashboardHeader = ({ selectedMonth, handleSelectedMonthChange }: IProps) => {

  const maxDate = moment(new Date()).endOf('month').endOf('day').toDate();

  return (
    <Card styles={STYLES.wrapper}>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={STYLES.title}>
        Overall statistic
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={['year', 'month']}
          openTo={'month'}
          label='Statistic period'
          minDate={MIN_STATISTIC_DATE}
          maxDate={maxDate}
          value={selectedMonth}
          onChange={(newValue: Date | null) => {
            handleSelectedMonthChange(newValue || new Date());
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Card>
  )
}
