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

import { LINE_CHART_DATA_MOCK } from '@mocks/lineChartDataMock';
import { LINE_CHART_OPTIONS } from '@utils/constants';

import { ACTION_PER_MONTH_DATE_CARD_TITLE } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ActionPerMonthDateCard = () =>
  <DashboardCardWrapper title={ACTION_PER_MONTH_DATE_CARD_TITLE}>
    <Line options={LINE_CHART_OPTIONS} data={LINE_CHART_DATA_MOCK}/>
  </DashboardCardWrapper>
