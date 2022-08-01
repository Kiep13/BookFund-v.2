import { Response } from 'express';

import { Roles} from '@core/enums';
import { ICustomRequest } from '@core/interfaces';
import { ApiError } from '@exceptions/api-error';

export const moderatorMiddleware = (request: ICustomRequest, response: Response, next: Function): Response => {
  try {
    const role = request.account.role;

    if(role !== Roles.MODERATOR && role !== Roles.ADMIN) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch(e) {
    return next(ApiError.UnauthorizedError);
  }
}
