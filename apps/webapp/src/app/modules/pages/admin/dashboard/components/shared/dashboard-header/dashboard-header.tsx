import { TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import * as React from 'react';

import Card from '@shared/components/card';

import { MIN_STATISTIC_DATE } from '../../../constants';

export default function DashboardHeader() {
  const [value, setValue] = React.useState(new Date());

  const maxDate = moment(new Date()).endOf('month').endOf('day').toDate();

  return (
    <Card styles={{
      mb: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Typography variant='h5'
                  gutterBottom
                  component='div'
                  sx={{
                    fontWeight: 100,
                    m: 0
                  }}>
        Overall statistic
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={['year', 'month']}
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
