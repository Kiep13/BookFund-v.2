import { IGenreForm } from '@core/interfaces';
import { GenreEntity } from '@entities/genre.entity';

class GenreService {
  public buildGenreFromBody(requestBody: IGenreForm): GenreEntity {
    const genre: GenreEntity = new GenreEntity();

    genre.name = requestBody.name;
    genre.parent = requestBody.parent ? requestBody.parent : undefined;

    return genre;
  }
}

export const genreService = new GenreService();
