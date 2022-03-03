import { IAuthor, IGenre } from '@core/interfaces';

export interface IBookForm {
  title: string,
  amountPages: number,
  year: number,
  genres: IGenre[],
  description: string,
  author?: IAuthor,
  imageUrl?: string,
  imageFile?: File
}
