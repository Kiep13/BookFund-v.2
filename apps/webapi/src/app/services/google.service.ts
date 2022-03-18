import axios from 'axios';
import * as queryString from 'query-string';

import { ApiRoutes, AuthProviders } from '@core/enums';
import { IGoogleAuthTokens, IGoogleUser, ITokens } from '@core/interfaces';
import { connection } from '@core/connection';
import { tokenService } from '@services/token.service';
import { AccountEntity } from '@entities/account.entity';
import { environment } from '@environments/environment';

class GoogleService {
  public async login(code: string): Promise<ITokens> {
    const {id_token, access_token}: IGoogleAuthTokens = await this.getGoogleTokens(code);
    const user: IGoogleUser = await this.getUser(access_token, id_token);

    const candidate = await connection.manager.getRepository(AccountEntity).findOne({
      email: user.email
    });

    const account = candidate ? await this.synchronize(candidate.id, user) : await this.register(user);

    return tokenService.generateTokens({
      email: account.email,
      name: account.name,
      surname: account.surname,
      image: account.image,
      role: account.role
    });
  }

  private getGoogleTokens(code: string): Promise<IGoogleAuthTokens> {
    const options = {
      code,
      client_id: environment.googleClientId,
      client_secret: environment.googleClientSecret,
      redirect_uri: `${environment.selfUrl}/v1/${ApiRoutes.AUTH}/${AuthProviders.GOOGLE}`,
      grant_type: 'authorization_code'
    };

    return axios.post(`https://oauth2.googleapis.com/token`, queryString.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  private getUser(accessToken: string, idToken: string): Promise<IGoogleUser> {
    return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      }
    })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  private register(user: IGoogleUser): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();

    accountEntity.email = user.email;
    accountEntity.name = user.given_name;
    accountEntity.surname = user.family_name;
    accountEntity.image = user.picture;

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
