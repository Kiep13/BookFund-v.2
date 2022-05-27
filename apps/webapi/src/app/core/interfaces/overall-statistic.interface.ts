export interface IOverallItem {
  current: number,
  total: number
}

export interface IOverallStatistic {
  users: IOverallItem,
  favorites: IOverallItem,
  comments: IOverallItem,
  articles: IOverallItem
}
