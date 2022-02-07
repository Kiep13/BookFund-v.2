import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { ResponseStatuses } from '@core/enums';
import { Genre } from '@entities/genre.entity';

class GenreController {
  public async createGenre(request: Request, response: Response, next: Function): Response {
    const genre: Genre = new Genre();

    genre.name = request.body.name;

    if(request.body.parentGenre) {
      genre.parentGenre = request.body.parentGenre;
    }

    await connection.manager.save(genre);
    return response.status(ResponseStatuses.STATUS_CREATED).json(genre);
  }
}

export const genreController = new GenreController();
