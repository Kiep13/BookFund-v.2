import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DOUGHNUT_STATISTIC_MOCK } from '@mocks/doughnut-statistic.mock';

import { DashboardCardWrapper } from '../../shared/dashboardСardWrapper';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GenresCard = () => {
  return (
    <DashboardCardWrapper title={'Genres statistic'}>
      <Doughnut data={DOUGHNUT_STATISTIC_MOCK} />
    </DashboardCardWrapper>
  )
}
