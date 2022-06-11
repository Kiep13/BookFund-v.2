import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { IListApiView, ISearchOptions } from '@core/interfaces';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { AccountEntity } from '@entities/account.entity';

class UserController {
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
}

export const userController = new UserController();
