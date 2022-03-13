import { IGenre } from '@core/interfaces';
import { GENRES_MOCK } from '@mocks/genres.mock';

export const DOUGHNUT_STATISTIC_MOCK = {
  labels: GENRES_MOCK.slice(0, 5).map((genre: IGenre) => {
    return genre.name
  }),
  datasets: [
    {
      label: 'Genres statistic',
      data: GENRES_MOCK.slice(0, 5).map((genre: IGenre) => {
        return genre.amountBooks
      }),
      backgroundColor: [
        'rgb(255,161,161)',
        'rgb(161,219,255)',
        'rgb(255,240,161)',
        'rgb(170,255,156)',
        'rgb(174,137,255)',
      ],
      borderColor: [
        'rgb(255,47,47)',
        'rgb(75,178,255)',
        'rgb(255,230,75)',
        'rgb(28,255,63)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
