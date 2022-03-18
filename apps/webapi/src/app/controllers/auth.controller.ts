import { ITokens } from "@core/interfaces";
import { Request, Response } from 'express';

import { REFRESH_TOKEN_COOKIE_NAME, TOKEN_DURATION } from '@core/constants';
import { ResponseStatuses } from '@core/enums';
import { environment } from '@environments/environment';
import { googleService } from '@services/google.service';

class AuthController {
  public async signInViaGoogle(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;

      const tokens: ITokens = await googleService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_REDIRECT).redirect(`${environment.clientUrl}/`);
    } catch (error) {
      return response.redirect(`${environment.clientUrl}/login`)
    }
  }
}

export const authController = new AuthController();
