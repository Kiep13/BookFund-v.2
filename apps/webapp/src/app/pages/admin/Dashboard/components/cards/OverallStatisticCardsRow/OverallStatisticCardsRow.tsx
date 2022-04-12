import moment from 'moment';
import { useEffect, useState } from 'react';

import { Card } from '@components/cards/Card';
import { StatefulCard } from '@components/cards/StatefulCard';
import { OVERALL_STATISTIC_MOCK } from '@mocks/overallStatisticsMock';
import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useCharts } from '@utils/hooks';
import { IAdminDashboardSearchOptions, IOverallStatistic, IOverallStatisticRaw } from '@utils/interfaces';

import { STYLES } from '../../../constants';
import { useDashboardApi } from '../../../hooks';
import { StatisticCard } from '../StatisticСard';
import { LABELS } from './constants';
import { IProps } from './propsInterface';

export const OverallStatisticCardsRow = ({ selectedMonth }: IProps) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [overallStatisticData, setOverallStatisticData] = useState<IOverallStatistic[]>(OVERALL_STATISTIC_MOCK);

  const { getOverallStatistic } = useDashboardApi();
  const { addError } = useAlerts();
  const { transformToOverallStatistic } = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getOverallStatistic(searchOptions)
      .then((response: IOverallStatisticRaw) => {
        const data: IOverallStatistic[] = transformToOverallStatistic(response, LABELS);
        data.push(OVERALL_STATISTIC_MOCK[3]);
        setOverallStatisticData(data);

        setCardState(CardStates.CONTENT)
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
    <>
      {
        overallStatisticData.map((item: IOverallStatistic) => {
          return <Card styles={STYLES.overallStatisticCard} key={item.title}>
            <StatefulCard state={cardState}>
              <StatisticCard {...item}/>
            </StatefulCard>
          </Card>
        })
      }
    </>
  )
}
