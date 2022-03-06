import { IAuthorForm } from '@core/interfaces';
import { AuthorEntity } from '@entities/author.entity';

class AuthorService {
  public buildAuthorFromBody(requestBody: IAuthorForm): AuthorEntity {
    const author: AuthorEntity = new AuthorEntity();

    author.name = requestBody.name;
    author.surname = requestBody.surname;
    author.biography = requestBody.biography;
    author.image = requestBody.imageUrl;

    return author;
  }
}

export const authorService = new AuthorService();
