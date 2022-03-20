import { Request, Response } from 'express';

import { ApiError } from '@exceptions/api-error';
import { tokenService } from '@services/token.service';

export const authMiddleware = async (request: Request, response: Response, next: Function): Response => {
  try {
    const authorizationHeader = request.headers.authorization;

    if(!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if(!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const account = await tokenService.validateAccessToken(accessToken);
    if(!account) {
      return next(ApiError.UnauthorizedError());
    }

    request.account = account;
    next();
  } catch(e) {
    return next(ApiError.UnauthorizedError);
  }
}
