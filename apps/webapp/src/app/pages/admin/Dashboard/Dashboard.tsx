import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { Card } from '@components/cards/Card';
import { OVERALL_STATISTIC_MOCK } from '@mocks/overallStatisticsMock';
import { IOverallStatistic } from '@utils/interfaces';
import { useStorage } from '@utils/hooks';

import { DashboardHeader } from './components/shared';
import {
  ActionPerMonthDateCard,
  CommentsCard,
  GenresCard,
  SocialAuthCard,
  StatisticCard,
  PopularBookCard
} from './components/cards';
import { SELECTED_MONTH_STORAGE_KEY, STYLES } from './constants';

export const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const { doesStorageHave, getFromStorage, saveToStorage } = useStorage();

  const readMonthFromLocalStorage = () => {
    if(doesStorageHave(SELECTED_MONTH_STORAGE_KEY)) {
      setSelectedMonth(getFromStorage(SELECTED_MONTH_STORAGE_KEY));
    }
  }

  const handleSelectedMonthChange = (date: Date) => {
    saveToStorage(SELECTED_MONTH_STORAGE_KEY, date);
    setSelectedMonth(date);
  }

  useEffect(() => {
    readMonthFromLocalStorage();
  }, []);

  return (
    <>
      <DashboardHeader selectedMonth={selectedMonth} handleSelectedMonthChange={handleSelectedMonthChange}/>

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
          <GenresCard selectedMonth={selectedMonth}/>
        </Box>

        <Box sx={STYLES.actionsStatisticCard}>
          <ActionPerMonthDateCard selectedMonth={selectedMonth}/>
        </Box>

        <Box sx={STYLES.popularBookCard}>
          <PopularBookCard selectedMonth={selectedMonth}/>
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
  )
}


