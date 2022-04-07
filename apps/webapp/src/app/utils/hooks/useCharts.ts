import { IDoughnutData, IDoughnutRaw } from '@utils/interfaces';
import { COLORS } from '@utils/constants';

export const useCharts = () => {
  const transformToDoughnutData = (label: string, statistic: IDoughnutRaw[]): IDoughnutData => {
    return {
      labels: statistic.map((item: IDoughnutRaw) => item.name),
        datasets: [
        {
          label: label,
          data: statistic.map((item: IDoughnutRaw) => item.amount),
          backgroundColor: COLORS.slice(0, statistic.length),
          borderColor: COLORS.slice(0, statistic.length),
          borderWidth: 1
        }
      ]
    }
  }

  return {
    transformToDoughnutData,
  }
}
