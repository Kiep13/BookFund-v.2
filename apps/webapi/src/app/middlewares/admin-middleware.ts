import { Request, Response } from 'express';

import { Roles} from '@core/enums';
import { ApiError } from '@exceptions/api-error';

export const adminMiddleware = (request: Request, response: Response, next: Function): Response => {
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
