export interface IOverallRaw {
  amount: number
}

export interface IOverallItem {
  current: number,
  total: number
}

export interface IOverallStatistic {
  users: IOverallItem,
  favorites: IOverallItem,
  comments: IOverallItem
}
