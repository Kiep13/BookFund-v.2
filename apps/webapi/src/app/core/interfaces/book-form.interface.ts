import { AuthorEntity } from '@entities/author.entity';
import { GenreEntity } from '@entities/genre.entity';

export interface IBookForm {
  title: string,
  amountPages: number,
  year: number,
  genres: GenreEntity[],
  description: string,
  author?: AuthorEntity,
  imageUrl?: string,
  fileName?: string,
  fileUrl?: string
}
