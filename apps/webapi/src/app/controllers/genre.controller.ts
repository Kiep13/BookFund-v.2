import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { connection } from '@core/connection';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { GenreEntity } from '@entities/genre.entity';
import { genreService } from '@services/genre.service';

class GenreController {
  public async createGenre(request: Request, response: Response, next: Function): Response {
    try {
      const genre: GenreEntity = genreService.buildGenreFromBody(request.body);

      await connection.manager.save(genre);
      return response.status(ResponseStatuses.STATUS_CREATED).json(genre);
    } catch (error) {
      next(error)
    }
  }

  public async updateGenre(request: Request, response: Response, next: Function): Response {
    try {
      const genreId = +request.params.id;

      const genre = genreService.buildGenreFromBody(request.body);

      await connection.manager.update(GenreEntity, genreId, genre);
      return response.status(ResponseStatuses.STATUS_OK).json(genre);
    } catch (error) {
      next(error)
    }
  }

  public async getGenre(request: Request, response: Response, next: Function): Response {
    try {
      const genreId = +request.params.id;
      const genre = await connection.manager.findOne(GenreEntity, genreId, {
        relations: ['subGenres', 'books', 'books.author', 'parent']
      });

      return response.status(ResponseStatuses.STATUS_OK).json(genre);
    } catch (error) {
      next(error)
    }
  }

  public async getGenres(request: Request, response: Response, next: Function): Response {
    try {
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
    } catch (error) {
      next(error)
    }
  }

  public async getGenresTree(request: Request, response: Response, next: Function): Response {
    try {
      const genresTree = await connection.getTreeRepository(GenreEntity).findTrees();
      return response.status(ResponseStatuses.STATUS_OK).json(genresTree);
    } catch (error) {
      next(error)
    }
  }

  public async deleteGenre(request: Request, response: Response, next: Function): Response {
    try {
      const genreId = +request.params.id;

      const genre = await connection.manager.findOne(GenreEntity, genreId);
      await connection.getTreeRepository(GenreEntity).findDescendants(genre);
      await connection.manager.remove(genre);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const genreController = new GenreController();
