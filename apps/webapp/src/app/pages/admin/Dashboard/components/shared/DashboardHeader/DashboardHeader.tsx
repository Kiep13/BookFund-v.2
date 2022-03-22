import { TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import { useState } from 'react';

import { Card } from '@components/cards/Card';

import { MIN_STATISTIC_DATE } from '../../../constants';
import { STYLES } from './constants';

export const DashboardHeader = () => {
  const [value, setValue] = useState(new Date());

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
          value={value}
          onChange={(newValue: Date | null) => {
            setValue(newValue || new Date());
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Card>
  )
}
