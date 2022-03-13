import { IOverallStatistic } from '@core/interfaces';
import { Box } from '@mui/material';

import { OVERALL_STATISTIC_MOCK } from '@mocks/overallStatistics.mock';
import { Card } from '@shared/components/card';

import { DashboardHeader } from './components/shared/dashboardHeader';
import {
  ActionPerMonthDateCard,
  CommentsCard,
  GenresCard,
  SocialAuthCard,
  StatisticCard,
  PopularBookCard
} from './components/cards';
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
        <Box sx={STYLES.genresCard}>
          <GenresCard/>
        </Box>

        <Box sx={STYLES.actionsStatisticCard}>
          <ActionPerMonthDateCard/>
        </Box>

        <Box sx={STYLES.popularBookCard}>
          <PopularBookCard/>
        </Box>
      </Box>

      <Box sx={STYLES.cardRow}>
        <Box sx={STYLES.socialAuthCard}>
          <SocialAuthCard/>
        </Box>

        <Box sx={STYLES.commentsCard}>
          <CommentsCard/>
        </Box>
      </Box>
    </>
  );
}

