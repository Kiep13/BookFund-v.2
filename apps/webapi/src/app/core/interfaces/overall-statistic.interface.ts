export interface IOverallRaw {
  type: string,
  amount: number
}

export interface IOverallItem {
  previous: number,
  current: number,
  total: number
}

export interface IOverallStatistic {
  users: IOverallItem,
  favorites: IOverallItem,
  comments: IOverallItem
}
