import moment from 'moment';

import {
  IBarData,
  IBarDataset,
  IBarRaw,
  IDoughnutData,
  IDoughnutRaw,
  ILineData,
  ILineDataset,
  ILineRaw
} from '@utils/interfaces';
import { BLUE_PALETTE, DATE_API_FORMAT } from '@utils/constants';
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
          return moment(statisticItem.date, DATE_API_FORMAT).startOf('date').format('MMM D') === dateLabel;
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

  return {
    transformToDoughnutData,
    transformToLineData,
    transformToBarData
  }
}
