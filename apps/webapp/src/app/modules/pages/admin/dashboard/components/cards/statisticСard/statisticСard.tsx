import { Box, Typography } from '@mui/material';

import { IOverallStatistic } from '@core/interfaces';
import shortenNumber from '@features/shortenNumber';

import { STYLES } from './constants';

export const StatisticCard = (props: IOverallStatistic) => {
  const { title, difference, total } = props;

  return (
    <Box>
      <Box sx={STYLES.wrapper}>
        <Typography
          variant='h6'
          gutterBottom
          component='div'
          sx={STYLES.title}>
          { title }
        </Typography>

        <Typography
          variant='h6'
          gutterBottom
          component='div'
          sx={{
            ...STYLES.difference,
            color: difference > 0 ? 'green' : 'red',
          }}>
          { difference > 0 ? '+' : ''}{ difference }%
        </Typography>
      </Box>

      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={STYLES.value}>
        { shortenNumber(total) }
      </Typography>
    </Box>
  )
}
