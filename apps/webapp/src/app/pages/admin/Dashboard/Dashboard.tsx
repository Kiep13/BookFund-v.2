import { Box } from '@mui/material';

import { Card } from '@components/Card';
import { OVERALL_STATISTIC_MOCK } from '@mocks/overallStatisticsMock';
import { IOverallStatistic } from '@utils/interfaces';

import { DashboardHeader } from './components/shared';
import {
  ActionPerMonthDateCard,
  CommentsCard,
  GenresCard,
  SocialAuthCard,
  StatisticCard,
  PopularBookCard
} from './components/cards';
import { STYLES } from './constants';

export const Dashboard = () =>
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

