import moment from 'moment';
import { useState } from 'react';

import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useCharts } from '@utils/hooks';
import { IAdminDashboardSearchOptions, IBarData, IBarRaw, IProviderStatistic } from '@utils/interfaces';

import { useDashboardApi } from '../../../hooks';

export const useSocialAuthCard = (selectedMonth: Date) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [chartData, setChartData] = useState<IBarData>();

  const {getProvidersStatistic} = useDashboardApi();
  const {addError} = useAlerts();
  const {transformToBarData} = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getProvidersStatistic(searchOptions)
      .then((response: IProviderStatistic[]) => {
        if (!response.length) {
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

  return {
    cardState,
    chartData,
    loadStatistic
  }
}
