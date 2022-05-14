import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { BAR_CHART_OPTIONS } from '@utils/constants';

import { NO_DATA_TEXT, SOCIAL_AUTH_CARD_TITLE } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';
import { IProps } from './propsInterface';
import { useSocialAuthCard } from './useSocialAuthCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SocialAuthCard = ({selectedMonth}: IProps) => {
  const {
    cardState,
    chartData,
    loadStatistic
  } = useSocialAuthCard(selectedMonth);

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth])

  return (
    <DashboardCardWrapper title={SOCIAL_AUTH_CARD_TITLE}>
      <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
        {chartData && <Bar options={BAR_CHART_OPTIONS} data={chartData}/>}
      </StatefulCard>
    </DashboardCardWrapper>
  )
}

