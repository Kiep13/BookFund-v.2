import { BookEntity } from '@entities/book.entity';

export interface ICollectionForm {
  title: string,
  subtitle: string,
  description: string,
  books: BookEntity[],
  imageUrl: string,
}
