import { AuthorEntity } from '@entities/author.entity';

class AuthorService {
  public buildAuthorFromBody(requestBody: any): AuthorEntity {
    const author: AuthorEntity = new AuthorEntity();

    author.name = requestBody.name;
    author.surname = requestBody.surname;
    author.biography = requestBody.biography;

    if(requestBody.imageUrl) {
      author.image = requestBody.imageUrl;
    }

    return author;
  }
}

export const authorService = new AuthorService();
