import { IAuthor, IGenre } from '@utils/interfaces';

export interface IBookForm {
  title: string,
  amountPages: number,
  year: number,
  genres: IGenre[],
  description: string,
  author?: IAuthor,
  imageUrl?: string,
  imageFile?: File,
  fileName?: string,
  file?: File,
  fileUrl?: string
}
