import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { useStorage } from '@utils/hooks';

import { DashboardHeader } from './components/shared';
import {
  ActionPerMonthDateCard,
  CommentsCard,
  GenresCard,
  SocialAuthCard,
  PopularBookCard, OverallStatisticCardsRow
} from './components/cards';
import { SELECTED_MONTH_STORAGE_KEY, STYLES } from './constants';

export const Dashboard = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [selectedMonth, setSelectedMonth] = useState<Date>();
  const {doesStorageHave, getFromStorage, saveToStorage} = useStorage();

  const readMonthFromLocalStorage = (): void => {
    if (doesStorageHave(SELECTED_MONTH_STORAGE_KEY)) {
      setSelectedMonth(getFromStorage(SELECTED_MONTH_STORAGE_KEY));
    } else {
      setSelectedMonth(new Date());
    }

    setPageState(CardStates.CONTENT);
  }

  const handleSelectedMonthChange = (date: Date): void => {
    saveToStorage(SELECTED_MONTH_STORAGE_KEY, date);
    setSelectedMonth(date);
  }

  useEffect(() => {
    readMonthFromLocalStorage();
  }, []);

  if (!selectedMonth) {
    return (
      <Box sx={STYLES.loaderWrapper}>
        <StatefulCard state={pageState}>
          <Box/>
        </StatefulCard>
      </Box>
    )
  }

  return (
    <>
      <DashboardHeader selectedMonth={selectedMonth} handleSelectedMonthChange={handleSelectedMonthChange}/>

      <Box sx={STYLES.content}>
        <OverallStatisticCardsRow selectedMonth={selectedMonth}/>
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
          <SocialAuthCard selectedMonth={selectedMonth}/>
        </Box>

        <Box sx={STYLES.commentsCard}>
          <CommentsCard selectedMonth={selectedMonth}/>
        </Box>
      </Box>
    </>
  )
}


