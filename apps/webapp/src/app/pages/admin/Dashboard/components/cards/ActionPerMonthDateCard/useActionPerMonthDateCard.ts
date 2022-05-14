import moment from 'moment';
import { useState } from 'react';

import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IActionsStatistic, IActionStatistic, IAdminDashboardSearchOptions, ILineData } from '@utils/interfaces';
import { useAlerts, useCharts } from '@utils/hooks';

import { useDashboardApi } from '../../../hooks';
import { LABELS } from './constants';

export const useActionPerMonthDateCard = (selectedMonth: Date) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [chartData, setChartData] = useState<ILineData>();

  const {getActionsStatistic} = useDashboardApi();
  const {addError} = useAlerts();
  const {transformToLineData} = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getActionsStatistic(searchOptions)
      .then((response: IActionsStatistic) => {
        const sum = Object.values(response)
          .map((statisticItem: IActionStatistic[]) => statisticItem.length)
          .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
        if(!sum) {
          setCardState(CardStates.NO_CONTENT);
          return;
        }

        setChartData(transformToLineData(selectedMonth, response, LABELS));
        setCardState(CardStates.CONTENT)
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  return {
    cardState,
    chartData,
    loadStatistic
  }
}
