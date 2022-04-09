import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { environment } from '@environments/environment';
import { axios} from '@utils/constants';
import {
  IBook,
  IAdminDashboardSearchOptions,
  IGenreStatistic,
  IActionsStatistic,
  IProviderStatistic,
  IRatesStatistic, IOverallStatisticRaw
} from '@utils/interfaces';

export const useDashboardApi = () => {
  const getOverallStatistic = async (searchOptions: IAdminDashboardSearchOptions): Promise<IOverallStatisticRaw> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IOverallStatisticRaw>(`${environment.backEndUrl}/v1/statistic/overall/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getGenresStatistic = async (searchOptions: IAdminDashboardSearchOptions): Promise<IGenreStatistic[]> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IGenreStatistic[]>(`${environment.backEndUrl}/v1/statistic/genres/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getActionsStatistic = async (searchOptions: IAdminDashboardSearchOptions): Promise<IActionsStatistic> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IActionsStatistic>(`${environment.backEndUrl}/v1/statistic/actions/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getMostPopularBook = async (searchOptions: IAdminDashboardSearchOptions): Promise<IBook> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IBook>(`${environment.backEndUrl}/v1/statistic/book/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getProvidersStatistic = async (searchOptions: IAdminDashboardSearchOptions): Promise<IProviderStatistic[]> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IProviderStatistic[]>(`${environment.backEndUrl}/v1/statistic/providers/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getRatesStatistic = async (searchOptions: IAdminDashboardSearchOptions): Promise<IRatesStatistic> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IRatesStatistic>(`${environment.backEndUrl}/v1/statistic/rates/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  return {
    getOverallStatistic,
    getGenresStatistic,
    getActionsStatistic,
    getMostPopularBook,
    getProvidersStatistic,
    getRatesStatistic
  }
}
