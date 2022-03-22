import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DOUGHNUT_STATISTIC_MOCK } from '@mocks/doughnutStatisticMock';

import { GENRES_CARD_TITLE } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GenresCard = () =>
  <DashboardCardWrapper title={GENRES_CARD_TITLE}>
    <Doughnut data={DOUGHNUT_STATISTIC_MOCK}/>
  </DashboardCardWrapper>
