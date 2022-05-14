import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { LINE_CHART_OPTIONS } from '@utils/constants';

import { COMMENTS_CARD_TITLE, NO_DATA_TEXT } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';
import { IProps } from './propsInterface';
import { useCommentsCard } from './useCommentsCard';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const CommentsCard = ({selectedMonth}: IProps) => {
  const {
    cardState,
    chartData,
    loadStatistic
  } = useCommentsCard(selectedMonth);

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth]);

  return (
    <DashboardCardWrapper title={COMMENTS_CARD_TITLE}>
      <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
        {chartData && <Line options={LINE_CHART_OPTIONS} data={chartData}/>}
      </StatefulCard>
    </DashboardCardWrapper>
  )
}

