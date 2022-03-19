import { Request, Response } from 'express';

import { REFRESH_TOKEN_COOKIE_NAME, TOKEN_DURATION } from '@core/constants';
import { ResponseStatuses } from '@core/enums';
import { IAuthResponse } from '@core/interfaces';
import { googleService, facebookService, githubService } from '@services/index';

class AuthController {
  public async signInViaGoogle(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;

      const authResponse: IAuthResponse = await googleService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  public async signInViaFacebook(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;
      const authResponse: IAuthResponse = await facebookService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  public async singInViaGitHub(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;
      const authResponse: IAuthResponse = await githubService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  public async logout(request, response, next): Response {
    try {
      response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

      return response.status(ResponseStatuses.STATUS_OK).json();
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
