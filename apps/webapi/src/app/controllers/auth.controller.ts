import { Request, Response } from 'express';

import { REFRESH_TOKEN_COOKIE_NAME, TOKEN_DURATION } from '@core/constants';
import { ResponseStatuses } from '@core/enums';
import { IAuthResponse } from '@core/interfaces';
import { environment } from '@environments/environment';
import { googleService } from '@services/google.service';

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
      return response.redirect(`${environment.clientUrl}/login`)
    }
  }
}

export const authController = new AuthController();
