export interface ILineDataset {
  label: string,
  data: number[],
  borderColor: string,
  backgroundColor: string,
  lineTension: number
}

export interface ILineData {
  labels: string[],
  datasets: ILineDataset[]
}
