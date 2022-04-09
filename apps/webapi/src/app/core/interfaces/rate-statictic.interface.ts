export interface ITypedRateStatistic {
  type: string,
  date: string,
  amount: number
}

export interface IRateStatisticItem {
  date: string,
  amount: number
}

export interface IRateStatisticResponse {
  positive: IRateStatisticItem[],
  neutral: IRateStatisticItem[],
  negative: IRateStatisticItem[],
}
