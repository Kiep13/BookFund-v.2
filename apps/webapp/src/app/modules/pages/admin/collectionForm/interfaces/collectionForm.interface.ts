import { IBook } from '@core/interfaces';

export interface ICollectionForm {
  title: string,
  subtitle: string,
  description: string,
  books: IBook[],
  imageUrl?: string,
  imageFile?: File,
  bookAutocomplete?: IBook
}
