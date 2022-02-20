import { IGenre } from '@core/interfaces';

export interface IBookForm {
  title: string,
  amountPages: number,
  year: number,
  genres: IGenre[],
  description: string,
  author?: number,
  imageUrl?: string,
  imageFile?: File
}
