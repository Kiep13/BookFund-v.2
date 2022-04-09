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
import moment from 'moment';
import { useEffect, useState } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { API_TOOLTIP_ERROR, DATE_API_FORMAT, LINE_CHART_OPTIONS } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useCharts } from '@utils/hooks';
import { IActionStatistic, IAdminDashboardSearchOptions, ILineData, IRatesStatistic } from '@utils/interfaces';

import { COMMENTS_CARD_TITLE, NO_DATA_TEXT } from '../../../constants';
import { useDashboardApi } from '../../../hooks';
import { DashboardCardWrapper } from '../../shared';
import { LABELS } from './constants';
import { IProps } from './propsInterface';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const CommentsCard = ({ selectedMonth }: IProps ) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [chartData, setChartData] = useState<ILineData>();

  const { getRatesStatistic } = useDashboardApi();
  const { addError } = useAlerts();
  const { transformToLineData } = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getRatesStatistic(searchOptions)
      .then((response: IRatesStatistic) => {
        const sum = Object.values(response)
          .map((statisticItem: IActionStatistic[]) => statisticItem.length)
          .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
        if(!sum) {
          setCardState(CardStates.NO_CONTENT);
          return;
        }

        setChartData(transformToLineData(selectedMonth, response, LABELS));
        setCardState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth]);

  return (
    <DashboardCardWrapper title={COMMENTS_CARD_TITLE}>
      <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
        { chartData && <Line options={LINE_CHART_OPTIONS} data={chartData}/>}
      </StatefulCard>
    </DashboardCardWrapper>
  )
}

