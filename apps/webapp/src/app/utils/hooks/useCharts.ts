import moment from 'moment';

import {
  IBarData,
  IBarDataset,
  IBarRaw,
  IDoughnutData,
  IDoughnutRaw,
  ILineData,
  ILineDataset,
  ILineRaw, IOverallRaw, IOverallStatistic, IOverallStatisticRaw
} from '@utils/interfaces';
import { BLUE_PALETTE, DATE_API_FORMAT, DATE_LINE_CHART_FORMAT } from '@utils/constants';
import { useDates } from '@utils/hooks';

export const useCharts = () => {
  const {buildMonthDates} = useDates();

  const transformToDoughnutData = (label: string, statistic: IDoughnutRaw[]): IDoughnutData => {
    return {
      labels: statistic.map((item: IDoughnutRaw) => item.name),
        datasets: [
        {
          label: label,
          data: statistic.map((item: IDoughnutRaw) => item.amount),
          backgroundColor: BLUE_PALETTE.slice(0, statistic.length),
          borderColor: BLUE_PALETTE.slice(0, statistic.length),
          borderWidth: 1
        }
      ]
    }
  }

  const transformToLineData = (selectedDate: Date, statistic: object, labels: object): ILineData => {
    const dateLabels: string[] = buildMonthDates(selectedDate);

    const datasets: ILineDataset[] = [];

    for(const [key, value] of Object.entries(statistic)) {
      const currentIndex = datasets.length;

      const data = dateLabels.map((dateLabel: string) => {
        const statisticItem = (value as ILineRaw[]).find((statisticItem: ILineRaw) => {
          return moment(statisticItem.date, DATE_API_FORMAT).startOf('date').format(DATE_LINE_CHART_FORMAT) === dateLabel;
        })

        return statisticItem?.amount || 0;
      });

      const dataset: ILineDataset = {
        label: labels[key],
        data,
        borderColor: BLUE_PALETTE[currentIndex],
        backgroundColor: BLUE_PALETTE[currentIndex],
        lineTension: 0.7
      }

      datasets.push(dataset);
    }

    return {
      labels: dateLabels,
      datasets
    }
  }

  const transformToBarData = (data: IBarRaw[]): IBarData => {
    const datasets: IBarDataset[] = data.map((item: IBarRaw, index: number) => {
      return {
        label: item.label,
        data: [item.value],
        borderColor: BLUE_PALETTE[index],
        backgroundColor: BLUE_PALETTE[index]
      }
    });

    return {
      labels: [''],
      datasets
    }
  }

  const transformToOverallStatistic = (data: IOverallStatisticRaw, labels: object): IOverallStatistic[] => {
    const result: IOverallStatistic[] = [];

    for(const [key, value] of Object.entries(data)) {
      let difference = solveDifference(value);

      const overallItem: IOverallStatistic = {
        title: labels[key],
        total: value.total,
        difference
      }

      result.push(overallItem);
    }

    return result;
  }

  const solveDifference = (value: IOverallRaw): number => {
    if(!value.current) {
      return 0;
    } else if(!value.previous) {
      return 100;
    } else if(value.current >= value.previous) {
      return Math.ceil(((value.current/value.previous) * 100))
    } else {
      return Math.ceil(((value.previous/value.current) * -100))
    }
  }

  return {
    transformToDoughnutData,
    transformToLineData,
    transformToBarData,
    transformToOverallStatistic
  }
}
