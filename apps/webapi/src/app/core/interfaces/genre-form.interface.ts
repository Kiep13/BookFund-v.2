import { GenreEntity } from '@entities/genre.entity';

export interface IGenreForm {
  name: string,
  parent: GenreEntity;
}
