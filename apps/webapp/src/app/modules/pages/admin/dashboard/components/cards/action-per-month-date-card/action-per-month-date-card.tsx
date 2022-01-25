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

import { LINE_CHART_OPTIONS } from '@core/constants';
import { LINE_CHART_DATA_MOCK } from '@mocks/line-chart-data.mock';

import DashboardCardWrapper from '../../shared/dashboard-card-wrapper';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ActionPerMonthDateCard() {
  return (
    <DashboardCardWrapper title={'New actions statistic'}>
      <Line options={LINE_CHART_OPTIONS} data={LINE_CHART_DATA_MOCK} />
    </DashboardCardWrapper>
  );
}
