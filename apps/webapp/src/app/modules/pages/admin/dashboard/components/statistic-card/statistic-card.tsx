import { Box, Typography } from '@mui/material';
import * as React from 'react';

import { IOverallStatistic } from '@core/interfaces';
import shortenNumber from '@features/shorten-number';

export default function StatisticCard(props: IOverallStatistic) {
  const { title, difference, total } = props;

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6'
                    gutterBottom
                    component='div'
                    sx={{
                      fontWeight: 100,
                      m: 0
                    }}>
          { title }
        </Typography>
        <Typography variant='h6'
                    gutterBottom
                    component='div'
                    sx={{
                      fontWeight: 300,
                      color: difference > 0 ? 'green' : 'red',
                      m: 0
                    }}>
          { difference > 0 ? '+' : ''}{ difference }%
        </Typography>
      </Box>
      <Typography variant='h5'
                  gutterBottom
                  component='div'
                  sx={{
                    m: 0
                  }}>
        { shortenNumber(total) }
      </Typography>
    </Box>
  )
}
