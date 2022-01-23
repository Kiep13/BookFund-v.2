import { IOverallStatistic } from '@core/interfaces';
import { Box } from '@mui/material';

import { OVERALL_STATISTIC_MOCK } from '@mocks/overall-statistics.mock';
import StatisticCard from '@pages/admin/dashboard/statistic-card';
import Card from '@shared/components/card';

import DashboardHeader from './dashboard-header';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader/>

      <Box sx={{
        display: 'flex',
        gap: 2
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
    </>
  );
}

