import { IOverallStatistic } from '@core/interfaces';
import { Box } from '@mui/material';

import { OVERALL_STATISTIC_MOCK } from '@mocks/overallStatistics.mock';
import { Card } from '@shared/components/card';

import { DashboardHeader } from './components/shared/dashboardHeader';
import { ActionPerMonthDateCard } from './components/cards/actionPerMonthDateCard';
import { GenresCard } from './components/cards/genresCard';
import { StatisticCard } from './components/cards/statisticСard';
import { PopularBookCard } from './components/cards/popularBookCard';
import { STYLES } from './constants';

export const Dashboard = () => {
  return (
    <>
      <DashboardHeader/>

      <Box sx={STYLES.content}>
        {
          OVERALL_STATISTIC_MOCK.map((overallStatistic: IOverallStatistic) => {
            return <Card styles={STYLES.overallStatisticCard} key={overallStatistic.total}>
              <StatisticCard {...overallStatistic}/>
            </Card>
          })
        }
      </Box>

      <Box sx={STYLES.cardRow}>
        <Box sx={STYLES.actionsStatisticCard}>
          <ActionPerMonthDateCard/>
        </Box>

        <Box sx={STYLES.genresCard}>
          <GenresCard/>
        </Box>

        <Box sx={STYLES.popularBookCard}>
          <PopularBookCard/>
        </Box>
      </Box>
    </>
  );
}

