import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@mui/material';

import { DOUGHNUT_STATISTIC_MOCK } from '@mocks/doughnut-statistic.mock';
import Card from '@shared/components/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenresCard() {

  return (
    <Card styles={{
      minHeight: 'fit-content',
      height: '100%'
    }}>
      <Typography variant='h6'
                  gutterBottom
                  component='div'
                  sx={{
                    fontWeight: 100,
                    textAlign: 'center'
                  }}>
        Genres statistic
      </Typography>
      <Doughnut data={DOUGHNUT_STATISTIC_MOCK} />
    </Card>
  )
}
