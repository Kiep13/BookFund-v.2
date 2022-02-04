import { Request, Response } from 'express';

import { ResponseStatuses } from '@core/enums';
import { connection } from '@core/connection';
import { Author } from '@entities/author.entity';

class AuthorController {
  public async createAuthor(request: Request, response: Response, next: Function): Response {
    const author: Author = new Author();

    author.name = request.body.name;
    author.surname = request.body.surname;
    author.image = request.body.imageUrl;
    author.biography = request.body.biography;

    if(request.body.imageUrl) {
      author.image = request.body.image;
    }

    await connection.manager.save(author);
    return response.status(ResponseStatuses.STATUS_CREATED).json(author);
  }
}

export const authorController = new AuthorController();
