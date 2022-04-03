import { SortDirections } from '@core/enums';

export interface ISearchOptions {
  pageSize: number,
  keyId?: number,
  searchTerm?: string,
  page?: number,
  order?: SortDirections,
  orderBy?: string,
  skip?: number
}
