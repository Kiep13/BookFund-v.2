import * as jwt from'jsonwebtoken';

import { IAccount, ITokens } from '@core/interfaces';
import { environment } from '@environments/environment';

class TokenService {
  public generateTokens(account: IAccount): ITokens {
    const accessToken = jwt.sign(account, environment.jwtAccessSecret, {expiresIn: '15m'});
    const refreshToken = jwt.sign(account, environment.jwtRefreshSecret, {expiresIn: '30d'});

    return {
      accessToken,
      refreshToken
    }
  }

  public async validateAccessToken(token: string): Promise<IAccount> {
    return jwt.verify(token, environment.jwtAccessSecret);
  }

  public async validateRefreshToken(token: string): Promise<IAccount> {
    return jwt.verify(token, environment.jwtRefreshSecret);
  }
}

export const tokenService = new TokenService();
