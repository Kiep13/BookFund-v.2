import { Box, Typography } from '@mui/material';

import { shortenNumber } from '@utils/helpers';
import { IOverallStatistic } from '@utils/interfaces';

import { STYLES } from './constants';

export const StatisticCard = ({title, difference, total}: IOverallStatistic) =>
  <Box>
    <Box sx={STYLES.wrapper}>
      <Typography
        variant='h6'
        gutterBottom
        component='div'
        sx={STYLES.title}>
        {title}
      </Typography>

      <Typography
        variant='h6'
        gutterBottom
        component='div'
        sx={{
          ...STYLES.difference,
          color: difference > 0 ? 'green' : 'red',
        }}>
        {difference > 0 ? '+' : ''}{difference}%
      </Typography>
    </Box>

    <Typography
      variant='h5'
      gutterBottom
      component='div'
      sx={STYLES.value}>
      {shortenNumber(total)}
    </Typography>
  </Box>
