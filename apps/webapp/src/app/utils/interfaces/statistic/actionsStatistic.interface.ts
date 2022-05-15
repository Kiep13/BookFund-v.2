export interface IActionStatistic {
  date: string;
  amount: number;
}

export interface IActionsStatistic {
  users: IActionStatistic[];
  favorites: IActionStatistic[];
  comments: IActionStatistic[];
}
