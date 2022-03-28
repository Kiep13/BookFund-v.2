import { Request, Response } from 'express';

import { FavoriteEntity } from '@entities/favorite.entity';
import { connection } from '@core/connection';
import { BookStatuses, ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView } from '@core/interfaces';

class FavoritesController {
  public async createFavorite(request: Request, response: Response, next: Function): Response {
    try {
      const favorite = new FavoriteEntity();
      favorite.book = request.body;
      favorite.account = request.account;
      favorite.status = BookStatuses.WANT_TO_READ;

      await connection.manager.insert(FavoriteEntity, favorite);

      delete favorite.account;
      delete favorite.book;

      return response.status(ResponseStatuses.STATUS_CREATED).json(favorite);
    } catch (error) {
      next(error)
    }
  }

  public async getFavorites(request: Request, response: Response, next: Function): Response {
    try {
      const account = request.account;
      const requestParams = request.query;

      const [favorites, count] = await connection.createQueryBuilder(FavoriteEntity, 'favorite')
        .select([
          'favorite.id',
          'favorite.status',
        ])
        .leftJoinAndSelect('favorite.book', 'book')
        .leftJoinAndSelect('book.author', 'author')
        .orderBy({
          ...(
            requestParams.orderBy ?
              {
                [requestParams.orderBy]: requestParams.order || SortDirections.ASC
              } :
              {
                'favorite.id': requestParams.order || SortDirections.DESC
              }
          )
        })
        .take(+requestParams.pageSize)
        .skip(+requestParams.pageSize * (+requestParams.page || 0))
        .where({
          ...(requestParams.searchTerm ? {status: requestParams.searchTerm} : {}),
          account: {
            id: account.id
          }
        })
        .getManyAndCount();

      const result: IListApiView<FavoriteEntity> = {
        data: favorites,
        count: count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteFavorite(request: Request, response: Response, next: Function): Response {
    try {
      const favoriteId = +request.params.id;

      const favorite = await connection.manager.findOne(FavoriteEntity, favoriteId);
      await connection.manager.remove(favorite);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const favoriteController = new FavoritesController();
