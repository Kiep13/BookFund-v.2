export interface IOverallRaw {
  previous: number,
  current: number,
  total: number
}

export interface IOverallStatisticRaw {
  users: IOverallRaw,
  favorites: IOverallRaw,
  comments: IOverallRaw
}
