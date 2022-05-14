import { useEffect } from 'react';

import { Card } from '@components/cards/Card';
import { StatefulCard } from '@components/cards/StatefulCard';
import { IOverallStatistic } from '@utils/interfaces';

import { STYLES } from '../../../constants';
import { StatisticCard } from '../StatisticСard';
import { IProps } from './propsInterface';
import { useOverallStatisticCardsRow } from './useOverallStatisticCardsRow';

export const OverallStatisticCardsRow = ({selectedMonth}: IProps) => {
  const {
    cardState,
    overallStatisticData,
    loadStatistic
  } = useOverallStatisticCardsRow(selectedMonth);

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth]);

  return (
    <>
      {overallStatisticData.map((item: IOverallStatistic) => {
        return <Card styles={STYLES.overallStatisticCard} key={item.title}>
          <StatefulCard state={cardState}>
            <StatisticCard {...item}/>
          </StatefulCard>
        </Card>
      })}
    </>
  )
}
