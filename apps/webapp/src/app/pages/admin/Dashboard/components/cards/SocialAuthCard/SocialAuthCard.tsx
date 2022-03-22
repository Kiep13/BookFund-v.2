import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { VERTICAL_BAR_STATISTICS } from '@mocks/vericalBarStatisticsMock';
import { BAR_CHART_OPTIONS } from '@utils/constants';

import { DashboardCardWrapper } from '../../shared';
import { SOCIAL_AUTH_CARD_TITLE } from '../../../constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SocialAuthCard = () =>
  <DashboardCardWrapper title={SOCIAL_AUTH_CARD_TITLE}>
    <Bar options={BAR_CHART_OPTIONS} data={VERTICAL_BAR_STATISTICS} />
  </DashboardCardWrapper>
