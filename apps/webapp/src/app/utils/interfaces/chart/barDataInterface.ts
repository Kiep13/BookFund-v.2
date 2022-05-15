export interface IBarDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface IBarData {
  labels: string[];
  datasets: IBarDataset[];
}
