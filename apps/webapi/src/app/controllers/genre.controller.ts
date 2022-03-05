import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { connection } from '@core/connection';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { GenreEntity } from '@entities/genre.entity';

class GenreController {
  public async createGenre(request: Request, response: Response, next: Function): Response {
    const genre: GenreEntity = new GenreEntity();

    genre.name = request.body.name;

    if (request.body.parentGenre) {
      genre.parent = request.body.parentGenre;
    }

    await connection.manager.save(genre);
    return response.status(ResponseStatuses.STATUS_CREATED).json(genre);
  }

  public async getGenre(request: Request, response: Response, next: Function): Response {
    const genreId = +request.params.id;
    const genre = await connection.manager.findOne(GenreEntity, genreId, {
      relations: ['subGenres', 'books']
    });

    return response.status(ResponseStatuses.STATUS_OK).json(genre);
  }

  public async getGenres(request: Request, response: Response, next: Function): Response {
    const requestParams = request.query;

    const genres = await connection.getRepository(GenreEntity).find({
      select: ['id', 'name'],
      order: {
        name: SortDirections.ASC
      },
      take: +requestParams.pageSize,
      where: {
        name: ILike(`%${requestParams.searchTerm || ''}%`)
      }
    });

    return response.status(ResponseStatuses.STATUS_OK).json(genres);
  }

  public async getGenresTree(request: Request, response: Response, next: Function): Response {
    const genresTree = await connection.getTreeRepository(GenreEntity).findTrees();
    return response.status(ResponseStatuses.STATUS_OK).json(genresTree);
  }
}

export const genreController = new GenreController();
