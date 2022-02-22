import { SortDirections } from '@core/enums';

export interface ISearchOptions {
  pageSize: number,
  searchTerm?: string,
  page?: number,
  order?: SortDirections,
  orderBy?: string,
}
