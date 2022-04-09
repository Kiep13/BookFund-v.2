export interface IRateStatistic {
  date: string,
  amount: number
}

export interface IRatesStatistic {
  positive: IRateStatistic[],
  negative: IRateStatistic[],
  neutral: IRateStatistic[]
}
