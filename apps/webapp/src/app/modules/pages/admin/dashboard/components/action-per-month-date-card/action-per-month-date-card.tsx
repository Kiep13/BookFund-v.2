import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';

import { LINE_CHART_OPTIONS } from '@core/constants';
import { LINE_CHART_DATA_MOCK } from '@mocks/line-chart-data.mock';
import Card from '@shared/components/card';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ActionPerMonthDateCard() {
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
        New actions statistic
      </Typography>
      <Line options={LINE_CHART_OPTIONS} data={LINE_CHART_DATA_MOCK} />
    </Card>
  );
}
