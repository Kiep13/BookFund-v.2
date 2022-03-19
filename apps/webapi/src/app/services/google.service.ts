import axios from 'axios';
import * as queryString from 'query-string';

import { connection } from '@core/connection';
import { AuthProviders } from '@core/enums';
import { IAuthResponse, IGoogleAuthTokens, IGoogleUser } from '@core/interfaces';
import { AccountEntity } from '@entities/account.entity';
import { environment } from '@environments/environment';
import { tokenService } from '@services/token.service';

class GoogleService {
  public async login(code: string): Promise<IAuthResponse> {
    const {id_token, access_token}: IGoogleAuthTokens = await this.getGoogleTokens(code);
    const user: IGoogleUser = await this.getUser(access_token, id_token);

    const candidate = await connection.manager.getRepository(AccountEntity).findOne({
      email: user.email,
      provider: AuthProviders.GOOGLE
    });

    const account = candidate ? await this.synchronize(candidate.id, user) : await this.register(user);

    const tokens = tokenService.generateTokens({
      email: account.email,
      name: account.name,
      surname: account.surname,
      image: account.image,
      role: account.role
    });

    return {
      account,
      ...tokens
    }
  }

  private getGoogleTokens(code: string): Promise<IGoogleAuthTokens> {
    const options = {
      code,
      client_id: environment.googleClientId,
      client_secret: environment.googleClientSecret,
      redirect_uri: `${environment.clientUrl}/auth/${AuthProviders.GOOGLE}`,
      grant_type: 'authorization_code'
    };

    return axios.post(`https://oauth2.googleapis.com/token`, queryString.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => response.data);
  }

  private getUser(accessToken: string, idToken: string): Promise<IGoogleUser> {
    return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      }
    })
      .then((response) => response.data);
  }

  private register(user: IGoogleUser): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();

    accountEntity.email = user.email;
    accountEntity.name = user.given_name;
    accountEntity.surname = user.family_name;
    accountEntity.image = user.picture;
    accountEntity.provider = AuthProviders.GOOGLE;

    return connection.manager.save(accountEntity);
  }

  private async synchronize(accountId: number, user: IGoogleUser): Promise<AccountEntity> {
    const accountEntity = await connection.manager.findOne(AccountEntity, accountId);

    accountEntity.email = user.email;
    accountEntity.name = user.given_name;
    accountEntity.surname = user.family_name;
    accountEntity.image = user.picture;

    return connection.manager.save(accountEntity);
  }
}

export const googleService = new GoogleService();
