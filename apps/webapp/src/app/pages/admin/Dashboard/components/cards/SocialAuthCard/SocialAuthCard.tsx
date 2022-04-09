import {
  IAdminDashboardSearchOptions,
  IBarData, IBarRaw,
  IProviderStatistic
} from "@utils/interfaces";
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
import moment from 'moment';
import { useEffect, useState } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { API_TOOLTIP_ERROR, BAR_CHART_OPTIONS, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useCharts } from '@utils/hooks';

import { NO_DATA_TEXT, SOCIAL_AUTH_CARD_TITLE } from '../../../constants';
import { useDashboardApi } from '../../../hooks';
import { DashboardCardWrapper } from '../../shared';
import { IProps } from './propsInterface';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SocialAuthCard = ({ selectedMonth }: IProps) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [chartData, setChartData] = useState<IBarData>();

  const { getProvidersStatistic } = useDashboardApi();
  const { addError } = useAlerts();
  const { transformToBarData } = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getProvidersStatistic(searchOptions)
      .then((response: IProviderStatistic[]) => {
        if(!response.length) {
          setCardState(CardStates.NO_CONTENT);
          return;
        }

        const barRawData: IBarRaw[] = response.map((item: IProviderStatistic) => {
          return {
            label: item.provider,
            value: item.amount
          }
        })
        setChartData(transformToBarData(barRawData));
        setCardState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth])

  return (
    <DashboardCardWrapper title={SOCIAL_AUTH_CARD_TITLE}>
      <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
        { chartData && <Bar options={BAR_CHART_OPTIONS} data={chartData} /> }
      </StatefulCard>
    </DashboardCardWrapper>
  )
}

