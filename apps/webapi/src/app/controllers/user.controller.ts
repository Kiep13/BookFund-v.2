import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { IListApiView, ISearchOptions } from '@core/interfaces';
import { BookStatuses, ResponseStatuses, SortDirections } from '@core/enums';
import { AccountEntity } from '@entities/account.entity';

class UserController {
  public async getUser(request: Request, response: Response, next: Function): Response {
    try {
      const userId = +request.params.id;

      const user = await Promise.all([
        connection.createQueryBuilder(AccountEntity, 'user')
          .leftJoinAndSelect('user.favorites', 'favorites')
          .groupBy('user.id')
          .select('COUNT(favorites.id)', 'favoritesAmount')
          .addSelect('CONCAT(user.surname, \' \', user.name)', 'fullName')
          .addSelect('user.id', 'id')
          .addSelect('user.name', 'name')
          .addSelect('user.surname', 'surname')
          .addSelect('user.image', 'image')
          .addSelect('user.role', 'role')
          .addSelect('user.provider', 'provider')
          .addSelect('user.createdAt', 'createdAt')
          .where(`user.id = ${userId}`)
          .getRawOne(),
        connection.createQueryBuilder(AccountEntity, 'user')
          .leftJoinAndSelect('user.favorites', 'inProgressFavorites', 'inProgressFavorites.status = :status', {
            status: BookStatuses.IN_PROGRESS
          })
          .groupBy('user.id')
          .select('COUNT(inProgressFavorites.id)', 'inProgressFavoritesAmount')
          .where(`user.id = ${userId}`)
          .getRawOne(),
        connection.createQueryBuilder(AccountEntity, 'user')
          .leftJoinAndSelect('user.favorites', 'doneFavorites', 'doneFavorites.status = :status', {
            status: BookStatuses.DONE
          })
          .groupBy('user.id')
          .select('COUNT(doneFavorites.id)', 'doneFavoritesAmount')
          .where(`user.id = ${userId}`)
          .getRawOne(),
        connection.createQueryBuilder(AccountEntity, 'user')
          .leftJoinAndSelect('user.comments', 'comments')
          .groupBy('user.id')
          .select('COUNT(comments.id)', 'commentsAmount')
          .where(`user.id = ${userId}`)
          .getRawOne(),
        connection.createQueryBuilder(AccountEntity, 'user')
          .leftJoinAndSelect('user.folders', 'folders')
          .leftJoinAndSelect('folders.articles', 'articles')
          .groupBy('user.id')
          .select('COUNT(articles.id)', 'articlesAmount')
          .where(`user.id = ${userId}`)
          .getRawOne()
      ]).then((result) => {
        return result.reduce((user, values) => {
          return {
            ...user,
            ...values
          }
        }, {});
      })

      return response.status(ResponseStatuses.STATUS_OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async getUsers(request: Request, response: Response, next: Function): Response {
    try {
      const requestParams: ISearchOptions = request.query;

      const baseRequestConfigurations = () => connection.createQueryBuilder(AccountEntity, 'user')
        .select('CONCAT(user.surname, \' \', user.name)', 'fullName')
        .addSelect('user.id', 'id')
        .addSelect('user.name', 'name')
        .addSelect('user.surname', 'surname')
        .addSelect('user.image', 'image')
        .addSelect('user.role', 'role')
        .addSelect('user.provider', 'provider')
        .addSelect('user.createdAt', 'createdAt')
        .orderBy(`\"${requestParams.orderBy || 'fullName'}\"`, requestParams.order || SortDirections.ASC)
        .where(`\"name\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
        .orWhere(`\"surname\" LIKE \'%${requestParams.searchTerm || ''}%\'`)

      const users = await baseRequestConfigurations()
        .limit(+requestParams.pageSize)
        .offset(+requestParams.pageSize * (+requestParams.page || 0))
        .getRawMany();

      const count = await baseRequestConfigurations()
        .getCount();

      const result: IListApiView<AccountEntity> = {
        data: users,
        count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(request: Request, response: Response, next: Function): Response {
    try {
      const userId = +request.params.id;
      await connection.manager.update(AccountEntity, userId, request.body);

      return response.status(ResponseStatuses.STATUS_OK).json(request.body);
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController();
