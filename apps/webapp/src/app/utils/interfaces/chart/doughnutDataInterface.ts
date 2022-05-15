export interface IDoughnutDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface IDoughnutData {
  labels: string[];
  datasets: IDoughnutDataset[];
}
