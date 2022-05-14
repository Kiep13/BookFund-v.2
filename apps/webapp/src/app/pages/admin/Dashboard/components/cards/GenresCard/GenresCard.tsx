import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';

import { GENRES_CARD_TITLE, NO_DATA_TEXT } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';
import { IProps } from './propsInterface';
import { useGenresCard } from './useGenresCard';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GenresCard = ({selectedMonth}: IProps) => {
  const {
    cardState,
    chartData,
    loadStatistic
  } = useGenresCard(selectedMonth);

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth]);

  return (
    <DashboardCardWrapper title={GENRES_CARD_TITLE}>
      <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
        { chartData && <Doughnut data={chartData}/> }
      </StatefulCard>
    </DashboardCardWrapper>
  )
}

