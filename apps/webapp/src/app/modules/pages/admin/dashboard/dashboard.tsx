import { IOverallStatistic } from '@core/interfaces';
import { Box } from '@mui/material';

import { OVERALL_STATISTIC_MOCK } from '@mocks/overall-statistics.mock';
import Card from '@shared/components/card';

import DashboardHeader from './components/shared/dashboard-header';
import ActionPerMonthDateCard from './components/cards/action-per-month-date-card';
import GenresCard from './components/cards/genres-card';
import StatisticCard from './components/shared/statistic-card';
import PopularBookCard from './components/cards/popular-book-card';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader/>

      <Box sx={{
        display: 'flex',
        gap: 2,
        mb: 3
      }}>
        {
          OVERALL_STATISTIC_MOCK.map((overallStatistic: IOverallStatistic) => {
            return <Card styles={{
              flex: 1
            }}>
              <StatisticCard {...overallStatistic}/>
            </Card>
          })
        }
      </Box>

      <Box sx={{
        display: 'flex',
        gap: 2,
        mb: 3
      }}>
        <Box sx={{flex: 2.05}}>
          <ActionPerMonthDateCard/>
        </Box>

        <Box sx={{flex: 1}}>
          <GenresCard/>
        </Box>
        <Box sx={{flex: 1}}>
          <PopularBookCard/>
        </Box>
      </Box>
    </>
  );
}

