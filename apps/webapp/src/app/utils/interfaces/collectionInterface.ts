import { IBook } from './bookInterface';

export interface ICollection {
  id: number,
  title: string,
  subtitle: string,
  description: string,
  image: string,
  books: IBook[],
}
